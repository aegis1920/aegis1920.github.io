---
layout  : wiki
title   : 나홀로 레거시 프로젝트 리팩토링 해보기 1편
summary : 
date    : 2021-03-06 14:20:34 +0900
updated : 2021-03-06 14:26:15 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

설렘으로 시작했던 레거시 프로젝트 리팩토링 해보기!

아직 조금밖에 리팩토링하지 않았지만 다시 한 번 느꼈습니다. 역시 달리고 있는 자동차의 바퀴를 바꾸는 일이란 정말 쉽지 않다는 거ㅎㅎ 그리고 왜 이렇게 작성했지? 라는 생각이 들기도 했었습니다. 그만큼 성장했다는 의미겠죠? 리팩토링할 게 많은 걸 알게 됐지만 현재 스터디를 4개나 하고있다보니 많이 바쁘네요ㅠ 추후에 시간이 된다면 2편도 작성해보겠습니다 :)

## S3Mock을 사용해 이미지 업로드 테스트하기

저희 프로젝트에 이미지 업로드 기능이 있는데 이 기능은 S3에 이미지를 올리고 링크를 DB에 저장하는 역할을 합니다. 이미지 업로드 기능을 테스트를 해야해서 테스트용 S3 버킷을 만들어 테스트를 했었습니다. (통합테스트할 때 테스트용 S3 버킷을 썼으며 단위테스트는 Mocking을 했습니다)

현재 저희 프로젝트는 AWS의 모든 인스턴스가 내려가있는 상태입니다. 모든 인스턴스가 내려가다보니 테스트용 S3 버킷을 사용했던 통합테스트가 깨졌습니다.

그때 당시에는 다른 곳을 먼저 리팩토링하고 싶은 생각에 테스트코드에 `@Disable`을 붙이고 다른 곳을 먼저 리팩토링하다가 [S3Mock](https://github.com/findify/s3mock)이라는 좋은 오픈소스를 발견하고 적용해보고 싶다는 생각이 들었습니다.

S3Mock은 로컬 PC의 메모리나 디렉토리를 이용해 S3를 테스트할 수 있는 오픈소스입니다. 즉, 가상의 파일 서버를 만들어 가상 서버를 가지고 테스트할 수 있습니다.

S3Mock을 사용하면 테스트용 S3 버킷이 아니라 각자 로컬 PC에 생기므로 개발자들끼리 충돌하지 않기 때문에 더 나은 방법 테스트 방법이었습니다. 게다가 Java 11도 상관없다고 하니, 추후 Java 11로 전환할 때도 괜찮겠다고 생각이 들었습니다.

### S3Mock을 사용하는 방법

S3용 `@TestConfiguration`을 만들고 `@Bean`으로 `S3Mock`과 `AmzaonS3`를 만들어주시면 됩니다.

여기서 조심해야할 건 기존 프로덕션 코드에 S3를 사용하는 Configuration이 있다면 해당 Bean도 똑같이 AmazonS3를 갖고있을테니 중복이 됩니다. 그래서 `@Primary`를 통해 Test에서는 TestConfiguration에 나온 Bean을 사용하겠다고 명시해줘야 합니다.
조심해야할 점이 또 있습니다. `s3Mock.start()` 를 호출하고 나서 AmazonS3 클라이언트를 만들어야 하기 때문에 `S3Mock`이 `AmazonS3`보다 먼저 등록되어야 합니다. 그래서 `@DependsOn("s3Mock")`을 붙여줬습니다.

```java
@TestConfiguration
public class S3MockConfig {

    private static final int S3_PORT = 8001;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.region}")
    private String region;

    @Bean
    public S3Mock s3Mock() {
        S3Mock s3Mock = new Builder()
            .withPort(S3_PORT)
            .withInMemoryBackend()
            .build();

        s3Mock.start();
        return s3Mock;
    }

    @Primary
    @Bean
    @DependsOn("s3Mock")
    public AmazonS3 amazonS3() {
        AwsClientBuilder.EndpointConfiguration endpoint = new AwsClientBuilder.EndpointConfiguration(
            "http://localhost:" + S3_PORT, region);

        AmazonS3 client = AmazonS3ClientBuilder
            .standard()
            .withPathStyleAccessEnabled(true)
            .withEndpointConfiguration(endpoint)
            .withCredentials(new AWSStaticCredentialsProvider(new AnonymousAWSCredentials()))
            .build();

        client.createBucket(bucket);

        return client;
    }
}
```

TestConfiguration을 다 만들었다면 

1. 이미지 업로드를 테스트하고 싶은 곳에 `@Import(S3MockConfig.class)` 를 추가해 Config를 Import 시키고
2. `@Autowired private S3Mock s3Mock;` 를 통해 빈을 주입한 후
3. 테스트의 멱등성을위해 `@AfterEach` 에 `s3Mock.stop();` 를 해주시면 깔끔하게 테스트가 됩니다!

```java
@Import(S3MockConfig.class)
class PostAcceptanceTest extends AcceptanceTest {

    @Autowired
    private S3Mock s3Mock;

    // ...

    @AfterEach
    void tearDown() {
        s3Mock.stop();
    }

    // ...
```

## @ManyToOne, @OneToOne 연관관계 fetch 전략을 LAZY로 수정하기

`@XXXToOne` 은 fetch 전략의 default가 EAGER이기 때문에 항상 조회해서 같이 갖고 오게 됩니다. 연관관계에서 EAGER로 설정하면 추후 엔티티가 많아질 때 엄청나게 꼬일 위험이 있다고 판단했고 `@XXXToOne`의 fetch 전략을 모두 LAZY로 수정했습니다.

그런데 이렇게 하니 테스트에서 영속성 컨텍스트에서 벗어난 프록시 객체가 있어서 에러가 뜨더라고요... 그래서 많은 테스트가 깨졌습니다. 이 부분은 비즈니스 로직 자체를 손 봐야할 부분이 있어 오래걸릴 것 같아 테스트코드에 `@Transactional`을 붙이고 일단 넘어갔습니다ㅜ... 테스트코드에 `@Transactional`을 쓰는 게 좋은 건 아니라서(그 이유는  [여기](https://aegis1920.github.io/wiki/jpa-and-transactional.html) 있습니다.) 추후에 다시 리팩토링 할 예정입니다.

## 스프링 시큐리티에 사용되는 loadUserByUsername() 메서드 조회 쿼리 횟수 줄이기 (좀 더 공부해봐야 함)

fetch 전략을 모두 LAZY로 수정했기때문에 본격적으로 쿼리를 수정하려고 했습니다. Post부터 차근차근히 하려고 했는데 컨트롤러에 접근할 때마다 기본적으로 `loadUserByUsername()` 메서드가 호출이 되더라고요? 제가 스프링 시큐리티를 따로 적용해보지 않아서 몰랐었는데 `PostController`에 들어오기 전부터 3번의 쿼리가 나갔습니다. 유저랑 유저 이미지랑 유저의 Role을 구하는 쿼리가 나가더라고요. 스프링 시큐리티에 있는 `UserDetailsService`를 구현(implements)하면 `loadUserByUsername()` 메서드가 컨트롤러에 들어가기 전에 자동으로 호출됩니다.

이 기능은 페이징 쿼리를 사용하지 않으므로 fetch join을 써도 무방하고 distinct로 카티션 곱을 막을 수 있다고 생각해서 fetch join를 사용했습니다.

```java
@Query("select distinct u from User u left join fetch u.image left join fetch u.roles where u.email = :email")
Optional<User> findByEmailWithUserImageAndRolesByJoinFetch(@Param("email") Email email);
```

fetch join을 이용해서 스프링 시큐리티에서 매번 유저를 조회할 때 세 번의 쿼리로 가져오던 것을 한 번으로 줄였습니다. 다만 이 부분은 왜 3번의 쿼리가 나가는지, 어디서 그 쿼리가 나가는지 아직 모르겠습니다. 스프링 시큐리티를 좀 더 살펴봐야될 것 같습니다. 나중에 수정할게요! (그래서 블로그에 쓸까말까 고민하긴 했는데 이걸 통해서 도움을 조금이라도 얻는 사람이 있겠죠?)

## Lombok의 생성자 생성 전략을 @AllArgsConstructor에서 @RequiredArgsConstructor로 수정

모든 필드가 final로 선언됐음에도 불구하고 롬복의 생성자 생성 전략이 모두 `@AllArgsConstructor` 로 되어있었습니다.

final로만 선언되어 있다면  `@AllArgsConstructor` 을 사용할 이유가 없기에 `@RequiredArgsConstructor`  를 사용했습니다.

## URL을 FullText로 적기

저희 팀은 원래 URL 상수 클래스를 따로 만들어서 URL을 관리했습니다.

```java
public class UrlPathConstants {

    public static final String PATH_DELIMITER = "/";
    public static final String ADMIN = "admin";

    public static final String ADMIN_PATH = PATH_DELIMITER + ADMIN;
    // ...
}

@RestController
@RequestMapping(ADMIN_PATH + POST_REPORTS_PATH)
@AllArgsConstructor
public class PostReportAdminController {

    private final PostReportService postReportService;

    @GetMapping("/{id}")
    public ResponseEntity<PostReportResponse> findPostReport(@PathVariable Long id) {
        PostReportResponse postReport = postReportService.findPostReport(id);

        return ResponseEntity
            .ok(postReport);
    }
}
```

이렇게 관리한 이유는 어느정도 코드가 중복되었기 때문입니다. `Controller`에서도 쓰이고 `Swagger`에 문서화하는데도 쓰였으니까요. 그런데 블로그를 읽어보니 다른 의견이 있었습니다. (아마 우아한 형제들 기술블로그 였던 것 같습니다)

- `@RequestMapping`과 `@PostMapping`이 혼합되어있으면 한 눈에 보기가 어렵다
- URL의 경우에는 FullText로 보여줘야 개발자 입장에서 찾기 쉽다

오오... 바로 이해가 갔고 적용했습니다.

```java
@RestController
@RequiredArgsConstructor
public class PostReportAdminController {

    private final PostReportService postReportService;

    @GetMapping("/admin/post-reports/{id}")
    public ResponseEntity<PostReportResponse> findPostReport(@PathVariable Long id) {
        PostReportResponse postReport = postReportService.findPostReport(id);

        return ResponseEntity
            .ok(postReport);
    }
}
```

## BaseEntity를 BaseEntity와 DateTimeEntity로 분리

처음에 작성했던 `BaseEntity`는 엔티티가 기본적으로 가지고 있는 `id` 필드와 `DateTime`에 관련된 필드 모두 갖고있었습니다. 그런데 생성일자와 수정일자는 정말 테이블에서나 쓰인다고 하더라고요. (어디서 봤는지는 기억이 잘 나지 않습니다... 게다가 저도 아직 실무를 경험해보지 못해서 확신은 못하겠습니다ㅠ)

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id")
@ToString
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    private LocalDateTime deletedAt;

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
```

그래서 어디에서나 쓰이는 생성일자와 수정일자를 분리하기로 했습니다. `BaseEntity`는 `id`를 가지고 있고 `DateTimeEntity`는 생성 일자와 수정일자를 가지고 있도록요.

`BaseEntity`같은 경우, `Long` 타입이 아닌 `String`타입의 `id`를 받을 수도 있으니 분리하는 게 더 낫다고 판단했습니다.

그리고 분리하면서 중요한 부분이 있었습니다. `BaseEntity`에서 `equalsAndHashCode`에서 `id`만으로 판단되도록하는 건 맞는데 여기서 `callSuper = false`를 통해 상위 클래스를 부르지 않도록 하는 것입니다. 엔티티들은 `id`를 통해서 같냐 아니냐가 판단되어야 합니다. `id`로 하되 이보다 더 상위 클래스에 있는 필드로 비교하면 안되기에 `callSuper = false` 를 추가했습니다.

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@ToString
public abstract class BaseEntity extends DateTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime deletedAt;
}

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public abstract class DateTimeEntity {

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
```

## SoftDelete를 LocalDateTime이 아니라 boolean 타입으로 만들기

처음에 SoftDelete를 생각했을 때 고민을 많이했습니다. `boolean`으로 만들까 `LocalDateTime`으로 만들까.

`LocalDateTime`으로 만들면 삭제한 시간도 알 수 있고, SoftDelete의 Flag값도 하기 때문에 좋다고 생각했습니다. 그런데 [여기](https://woowabros.github.io/experience/2019/09/10/pilot-project.html)에 피드백이 있더라고요!

### LocalDateTime을 Soft Delete Flag로 만들 때의 단점

1. 해당 칼럼은 SoftDelete의 Flag와 삭제된 시간을 기록하는 두 가지 역할을 하게 된다
2. null은 인덱스를 타지 않는다([찾아본 바](https://use-the-index-luke.com/sql/where-clause/null/index)로는 Oracle DBMS에서만 index를 타지 않는다네요.)

이런 단점을 이해하고 `boolean` 타입으로 바꾸려고 했습니다. 그리고 다시 고민이 되더라고요 `Boolean`으로 만들어야 하나 `boolean`으로 만들어야 하나?

어차피 `false`를 넣을거면 `boolean`으로 해도 상관없지 않나? 라는 생각이 들었다가 [Hibernate 공식 문서](https://docs.jboss.org/hibernate/orm/3.3/reference/en/html/persistent-classes.html#persistent-classes-pojo-identifier)에 기본타입보다는 참조 타입을 사용하라고 하는데... 그 이유는 나와있지 않네요

제 생각에는 Entity 필드와 DB 컬럼간에 괴리가 있다고 생각합니다. DB 컬럼은 바뀌었는데 Entity 필드는 바뀌지 않는 그런 경험처럼요. 그래서 필드에 null이 들어갈 수 있게(참조타입으로) 만들고 @Column의 속성을 통해서 관리를 하는 거죠. (제 개인적인 추측입니다)

어쨌든 그렇게 만들어주기 위해서 BaseEntity에 필드를 바꿔주고 SQL 쿼리문을 추가했습니다. (저희는 flyway를 쓰고 있기 때문에 SQL문을 작성했습니다)

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@ToString
public abstract class BaseEntity extends DateTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean deleted = false;
}
```

```sql
ALTER TABLE `post` MODIFY COLUMN `deleted_at` BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE `post` RENAME COLUMN `deleted_at` TO `deleted`;
```

