---
layout  : wiki
title   : 우아한 테크코스 스프링으로 구현하는 체스 리뷰
summary : 
date    : 2020-05-02 21:22:06 +0900
updated : 2020-07-12 21:26:04 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

처음으로 새로운 크루와 상호 리뷰를 했다. 신선했다. 직접 코드리뷰를 해보니 코드리뷰가 생각보다 많이 힘든 일이구나 생각했다. 한 줄 한 줄 다 따라가고 그 코드 자체도 이해하는 게 쉽지 않았다. 

## 백엔드에서 프론트엔드로 데이터를 요청받고 응답하는 방법

### @PathVariable

- URL의 Path에 따라 변수를 Mapping하는 어노테이션

```java
@GetMapping("/lines/{id}")
public void getLine(@PathVariable(name = "id") int id) {
    lineService.getLine(id);
}
```

### @RequestParam

- HTTP request의 parameter에 접근할 수 있는 어노테이션
- `@RequestParam(name = "value1", required = true) int value1`
- 모든 파라미터를 받고 싶으면 @RequestParam Map<String,String> allParams 을 통해 한 번에 받을 수 있다.
- 주소값에 Param이 올 때 쓴다. 근데 DTO로 받고 싶으면 오히려 이 어노테이션을 쓰면 안된다. 안 써야 제대로 바인딩된다;; 그리고 DTO로 받고싶다면 @RequestParam는 쓰지말고 setter를 꼮!!!!!!!!!!! 써줘야 한다.
- 그 주소값대로만 받아오고 싶을 때 쓴다.

### 그냥 DTO로 받는 방법

- 받고 싶은 DTO에 기본 생성자와 getter, setter를 써준다

### @RequestHeader

- 요청 정보의 헤더 정보를 읽어들 일 때 사용
- @RequestHeader(name="헤더명") String 변수명

### @RequestBody

- HTTP request의 Body를 객체로 만들어준다.
- GET 방식일 때 사용하면 Null이 나오므로 POST 방식을 사용할 때만 사용해준다.
- POST 방식으로 보낼 때 받으려고 하는 DTO에 기본 생성자가 있어야 하며 보내는 데이터를 JSON.stringify()로 감싸고 header의 Content-Type을 application/json으로 지정해줘야 한다.

### @ModelAttribute

- User라는 DTO가 있다면 @ModelAttribute를 사용해서 객체를 받을 수 있다.
- @ModelAttribute User user
- 받아오고자 하는 데이터를 지정해줄 수 있다.
    - 여러 데이터를 주더라도 받아오고자 하는 데이터를 지정해줄 수 있다는 점에서 @RequestBody와 차이가 있다.

### 서버에서 Exception이 발생할 때 response(HTTP Status)를 어떻게 주는 게 좋을까?

- 400번대가 오면 프론트가 잘못한 것이다.
- 500번대가 오면 백엔드가 잘못한 것이다.
- 200번대를 주고 왜 그런지 말해준다
- 사실 정답이 없다. 사람마다 다르다.

### 프론트엔드와 백엔드에서 유효성 검사는 어디서 해줘야 할까?

- 프론트엔드와 백엔드 둘 다 해줘야 한다.
- 특히나 백엔드에서 유효성 체크는 무.조.건 해줘야 한다.
- 클라이언트가 브라우저 뿐만 아니라 다양해질 수 있기 때문. HTTP 표준에만 맞으면 어떻게든 쏠 수 있다. (프론트엔드 개발자를 믿지 마라 ㅎㅎ)
- 또한 유효성을 해주는 비용보다 DB에 잘못 들어갔을 때 다시 정제하는 비용이 더 비싸다.
- 유효성 체크는 도메인에서, DB에서 어디서든 해줄 수 있다. 이건 정답이 없기에 자신의 철학을 만들어야 한다.
- 최대한의 방어로직을 작성하자.

### 스프링이 객체를 관리해주면 왜 좋을까?

- 객체의 생명주기(생성, 삭제, 관계)를 고려하지 않고 비즈니스 로직에만 집중할 수 있게 한다.
- 의존성을 Mocking하기 편해 테스트가 쉬워진다
- 필요할 때만 객체를 가지고 온다.

### 스프링을 사용하면 의존성에 있어서 왜 좋을까?

- 직접적인 의존(`new`)을 하면 테스트에 좋지 않다.
- 생성자 의존성 주입으로 하면 테스트하기 쉬워진다.

### 스프링에게 객체 관리를 어떻게 맡길까?

1. 프로젝트의 최상단 클래스에 `@SpringBootApplication`을 붙인다.
2. `@Component`, `@Repository`, `@Service`, `@Controller` 등의 어노테이션을 통해 스프링에게 관리하라고 지정한다
3. `@Autowired`, 생성자 주입 등을 통해 DI를 해서 빈으로 등록한다
4. `@SpringBootApplication`안에 있는 `@ComponentScan` 으로 지정한 객체들을 스캔한다
5. 스프링 빈 컨테이너가 빈으로 등록하고 관리한다.

### 어떤 객체를 스프링에게 맡겨야 할까?

- 공유되는 객체들
- 재사용되는 객체들
- 상태값이 없는 객체들

### 왜 공유되는 객체들, 재사용되는 객체들, 상태값이 없는 객체를 Bean으로 등록해야할까?

- 백엔드 입장에서는 항상 다수의 사용자 요청을 받아야 한다.
- 요청을 받을 때마다 인스턴스를 매번 생성하는 게 나을까? 아니면 인스턴스를 한 번 생성하고 재사용하는 게 나을까?
- 인스턴스를 매번 생성하다보면 메모리가 터진다. 재사용하는 게 좋다.
- 재사용하는데 상태를 가진 객체를 빈에 등록하면?
- 모든 요청에 상태를 공유하기 때문에 모든 클라이언트에서 접근 가능하다.

### 의존성 주입을 할 수 있는 객체는 필드로 가져도 될까?

- 의존성 주입을 할 수 있는 객체는 필드로 가져도 된다(일단은ㅎㅎ...)

### 코드를 다른 패키지로 옮겼을 때 적용이 안 되는 이유는?

- 프로그램이 실행되면 클래스 파일을 이용해서 실행된다
- 다른 패키지로 이동시켰을 때 이동 시키기 전의 패키지(폴더)에 기존의 쓰레기 클래스 파일이 남아있을 수 있다.
- 그러면 `Bean`이 두 개로 되어 빌드가 안 된다.

### Redirect와 Forward(건네주기)의 차이는?

**Forward**

- forward에 의해 호출되는 페이지는 서버 안에서 request, response 객체를 공유한다
- 요청 정보가 그대로 유지된다. (다음 URL에서도 정보가 유지된다)
- 즉, 객체를 재사용하고 URL에 변화가 없다

**Redirect**

- 새로운 페이지에서는 request, response 객체가 새롭게 생성된다.
- 요청 정보가 유지되지 않는다.
- 즉, 객체가 새롭게 생성되고 URL에 변화가 있다.

예를 들어, 글쓰기 기능인 경우 응답 페이지를 redirect로 사용해야 된다. forward를 사용하게 되면 새로고침을 눌렀을 때 요청 정보가 살아있어 똑같은 글이 여러 번 등록될 수 있다.

시스템(session, DB)에 변화가 생기는 요청(로그인, 회원가입, 글쓰기)의 경우 redirect 방식으로 응답해야 하며, 시스템에 변화가 생기지 않는 단순 조회(리스트 보기, 검색)의 경우 forward 방식으로 응답하는 것이 바람직하다.

### 클라이언트에서 받으려면?

- JSON.stringify() 로 문자열로 받을 수 있다.
- JSON.parse() 로 객체로 받을 수 있다.

### 컨트롤러에서 객체를 그냥 리턴해도 되는 이유

- 스프링 3.0 이후부터 Jackson의 API가 spring starter에 담겨있다.
- 자바가 자동적으로 Jackson과 리플렉션을 사용해 Object Mapper API로 JSON의 데이터를 완성시킨다.
- Jackson은 데이터 매핑을 클래스의 Getter를 통해 하기 때문에 보내려고 하는 객체에 Getter가 있어야 한다.

## Spring 관련 정보

### Spring Framework의 구조

- `static` 디렉토리
    - 컨트롤러를 거치지 않는다.
    - 주소창에 치면 그대로 나온다
    - 보통 정적 파일들(css, js, img 등)을 넣는다.
- `templates` 디렉토리
    - 컨트롤러를 거치고 간다.
    - `RequestMapping`을 해줘서 보내고 싶다면 여기에 파일을 넣으면 된다.

### 레이어드 아키텍쳐(Layered Architecture)

- Presentation Layer(Controller) -> Service Layer(Service) -> Repository Layer(DAO) 순으로 들어간다.

### MVC 순서

1. 모든 요청을 Dispatcher Servlet이라는 서블릿 클래스가 받는다.
2. Dispatcher Servlet은 요청을 처리해줄 컨트롤러와 메소드가 뭔지 Handler Mapping에게 물어본다
3. Handler mapping 객체들은 우리가 설정한 xml이나 java파일을 통해 요청에 맞는 컨트롤러가 무엇인지, 해당되는 메소드가 어떤 건지 dispatcher Servlet에게 알려준다.
4. dispatcher Servlet은 Handler Adapter에게 실행을 요청한다
5. Handler Adapter는 Controller에게 실행하도록 하고 Controller는 view name을 handler Adapter에게 리턴한다. Handler Adapter는 Dispatcher Servlet에게 말해주고 리턴된 view name을 view resolver에게 건네준다.
6. ViewResolver는 view name을 받아 해당하는 View 객체를 return 한다.
7. View는 Model 객체를 받아 rendering한다.

### DispatcherServlet

- 유일한 Front Controller
- 모든 웹 요청의 진입점, 웹 요청을 처리하며, 결과 데이터를 Client에게 응답한다.
- spring MVC Framework를 사용하기 위해선 web.xml에 DispatchServlet을 설정하고, DispatchServlet이 WebApplicationContext를 생성할 수 있도록 빈(Bean) 정보가 있는 파일들도 설정해줘야 한다.

### 페이지를 보여주고 싶다면?

1. `static` 폴더에 있다면 `localhost:8080/index.html`을 통해 바로 접근할 수 있다
2. 컨트롤러 클래스에서 `@Controller` 를 사용하고 리턴값을 `String` 으로 주면 `templates` 폴더에 있는 `html` 파일을 열 수 있다.
    1. `gradle`에 `handlebars`에 대한 의존성(`implementation 'pl.allegro.tech.boot:handlebars-spring-boot-starter:0.3.0'`)이 있다면  파일 기본 확장자가 hbs로 되어있어서 hbs 파일만 인식을 한다. 이것도 html 파일을 인식할 수 있도록 바꿔줄 수 있는 방법이 있다. `[application.properties](http://application.properties)` 에 `handlebars.suffix=.html` 를 추가하면 확장자를 `hbs`에서 `html`로 바꿀 수 있다
    2. `gradle`에 `thymeleaf`에 대한 의존성 (`compile('org.springframework.boot:spring-boot-starter-thymeleaf')`)을 추가해도 된다.
    3. `WebMvcConfigurer` 를 구현한 클래스에 `addResourceHandlers` 메서드를 오버라이드 하는 방법도 있다.

### Spring에서 제공하는 IoC/DI 컨테이너

- BeanFactory : IoC/DI에 대한 기본 기능을 갖고 있다
- ApplicationContext : BeanFactory의 모든 기능을 포함하며, 일반적으로 BeanFactory보다 추천된다. 트랜잭션처리, AOP등에 대한 처리를 할 수 있다.

### Bean 규약

- 기본 생성자를 가지고 있다
- 필드는 private으로 선언한다
- getter, setter 메소드를 가진다
- Spring 컨테이너가 관리하는 객체를 Bean이라고 말한다
- spring framework에서 Bean은 어플리케이션을 구성하고, IoC container에 의해 관리되어 지는 객체를 의미한다.
- Bean들과 Bean들 간의 종속성은 container가 사용하는 설정 메타데이터(configuration metadata)에 의해 결정된다.

### 설정 정보 및  ApplicationContext

- 이 설정 정보는 'spring IoC container가 객체를 생성하고, 객체간의 종속성을 이어줄 수 있도록' 필요한 정보를 제공한다. 설정 정보는 일반적으로 xml 형태로 작성된다.
- 그리고 이 설정 정보는 xml이 아닌 java annotation을 이용해도 설정이 가능하다.
- container를 context 객체로 인스턴스화하면 getBean(String) 메소드를 사용해서 bean을 가져올 수 있다.
- ApplicationContext는 시작시에 모든 bean을 객체화하는데 lazy-init을 사용하면 시작 시가 아니라 처음으로 필요로 했을 때 생성되게 할 수 있다. 그러나 시작 시에 객체화 하는 게 잘못된 설정이 있는 경우 즉시 발견할 수 있기 때문에 더 좋다.
- ApplicationContext는 BeanFactory를 확장한 것으로 BeanFactory의 기능 외, 여러 기능을 제공한다.
- BeanFactory보다는 ApplicationContext를 사용한다.

### Bean scope

- Bean정의는 실제 bean 객체를 생성하는 방식을 정의하는 것이다. 하나의 bean 정의에는 다수의 객체가 생성될 수 있다. 그래서 객체의 범위또한 정의할 수 있다.
- spring framework는 5가지의 scope를 제공한다.
- `singleton(default)` - 하나의 Bean 정의에 대해서 단 하나의 인스턴스만 존재한다. 그래서 ref로 공유하는 형식
- `prototype` - 하나의 Bean 정의에 대해서 다수의 객체. 매순간 새로운 bean 객체
- `request` - 하나의 Bean 정의에 대해서 HTTP request 생명주기 안에 자신만의 하나의 객체만 존재
- `session` - 하나의 Bean 정의에 대해서 HTTP session 생명주기 안에 자신만의 하나의 객체만 존재
- `global session` - 하나의 Bean 정의에 대해서 HTTP global session 생명주기 안에 자신만의 하나의 객체만 존재

### AOP(Aspect Oriented Programming)

자기가 관심있는 로직만 신경쓸 수 있도록 logging과 같은 공통 로직을 분리하는 것

### IoC(Inversion of Control)

- 컨테이너가 코드 대신 Object의 제어권을 갖고 있어 IoC(제어의 역전)이라 한다
- 예를 들어, 서블릿 클래스는 개발자가 만들지만, 그 서블릿 메소드를 알맞게 호출하는 것은 WAS다
- 이렇게 개발자가 만든 클래스나 메소드를 다른 프로그램이 대신 실행해주는 것을 제어의 역전이라고 한다.

## DI(Dependency Injection)

- 클래스 사이의 의존 관계를 빈(Bean)설정 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것
- 개발자가 직접 코드로 new를 써서 인스턴스를 생성하는 것이 아니라 컨테이너가 어노테이션을 통해 인스턴스를 할당해줄 수 있는 것

## ConnectionPool

- DB연결은 비용이 많이 든다
- ConnectionPool은 미리 Connection을 여러 개 맺어둔다
- Connection이 필요하면 ConnectionPool에게 빌려서 사용한 후 반납한다
- Connection이 제한적이기 때문에 가능한 빨리 사용하고 빨리 반납해야 한다

### DataSource

- ConnectionPool을 관리하는 목적으로 사용되는 객체
- Connection을 얻어오고 반납하는 등의 작업을 수행한다

## Spring Data JDBC

### SQL 중심으로 개발하면 뭐가 안 좋을까?

- SQL을 확인하기 전까지 엔티티를 신뢰하기 어렵다.
- SQL에 의존적인 개발을 하게 된다

### Spring Data 프로젝트

- 테이블과 객체를 맵핑하는데 많은 부분이 추상화되어 있다.
    - Repository를 활용해 테이블과 객체의 맵핑을 제공한다.
    - 즉, DB 설정만 해주면 기본적인 CRUD쿼리는 다 제공해준다.
- `[application.properties](http://application.properties)` 에서 DataSource 설정을 해줄 수 있다.
- Spring Data에 많은 하위 프로젝트가 있다. (JPA, MongoDB 등등...)

### Spring Data JDBC

- 기본적으로 Spring Data JDBC는 서로 다른 엔티티를 그룹화하고 강한 결합을 가진다.
- 그룹화된 것들은 모두 단방향이어야 한다. 이는 최상위 엔티티에서 관계를 따라가다보면 모든 엔티티를 찾을 수 있다는 뜻이다
- 데이터를 Insert하거나 Update할 경우, 전체 엔티티를 저장해야된다.
    - 최상위 엔티티의 `save` 메서드를 호출하면 최상위 엔티티를 저장한 다음, 참조된 모든 엔티티가 저장된다.
- 일부의 엔티티만 Insert 하려고 해도 전체 엔티티가 업데이트되고 삭제되며 삽입된다.
- Spring Data JDBC를 사용하면서 좋은 점은 DDD 디자인 규칙을 강제 적용한다는 것이다.

### 게시글과 댓글의 예시

하나의 게시글에 여러 개의 댓글을 달 수 있으므로 1:N 관계가 된다.

```java
// Entity
public class Article {
    @Id
    private Long id;
    private String title;
    private String content;
    private Set<Comment> comments;
    ...
}

public class Comment {
    private String content;
    ...
}

// SQL Table
create table article(
    id bigint auto_increment primary key,
    title varchar(255) not null,
    content varchar(255) not null
);

create table comment(
    article bigint not null,
    content varchar(255) not null
);
```

- `Comment` 엔티티와 테이블에 id 값이 없어도 된다.
    - 엔티티끼리 참조하는 여부를 판단하는 것은 id가 아니라 `Comment` 테이블의 `article` 값이기 때문에

### 1 대 N 관계를 맺고 싶다면?

- 참조하는 여부를 판단하는 건 **테이블**이다.
- 테이블에서 **1:N 관계라면 N쪽에서 1의 테이블 명을 칼럼명으로 가져야 한다.**
- 엔티티에서는 `Article`이 `Comment`를 `Set`으로 가지고 있다.
- `article`이 `comment`를 참조한다는 말은 `comment`가 `article`에게 포함되어야 한다는 뜻과 같으며 `article`이 삭제되면 `comment`도 삭제된다.
- 엔티티에서 `Article`이 `Comment`를 필드로 갖고 테이블은 N 쪽에 외래키를 가져야하기 때문에 N쪽에서 1의 테이블 명을 칼럼으로 정해준다.
- 객체가 참조 여부를 판단하는 것은 id가 아니라 `Comment` 테이블의 `ariticle` 값이다.

### 1 대 1 관계를 맺고 싶다면?

- 두 테이블을 연결시켜주는 참조 테이블(Ref)을 만들어준다.

### 출처

- [https://doublesprogramming.tistory.com/63](https://doublesprogramming.tistory.com/63)
