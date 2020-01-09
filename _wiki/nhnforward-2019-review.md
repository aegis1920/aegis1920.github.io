---
layout  : wiki
title   : NHN FORWARD 2019 리뷰
summary : 
date    : 2020-01-10 02:05:13 +0900
updated : 2020-01-10 02:05:52 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# NHN FORWARD 2019 후기

## PAYCO 쇼핑 마이크로 서비스 아키텍처(MSA)

PAYCO 쇼핑의 아키텍처를 MSA로 변경하면서 겪은 일들을 말해주는 세션이었다.

### 기존의 PAYCO 쇼핑 아키텍처

![KakaoTalk_20191211_205003400](/wiki-img/nhnforward2019/KakaoTalk_20191211_205003400.jpg)

- 공통 소스들은 common이라는 모듈 안에 들어가게 했지만 이 모듈이 너무 커져버렸다.
- 그러다보니 빌드를 한 번 하는데 2분이나 걸리고 소스가 수정되면 단위테스트를 하는데 시간이 10분이나 걸렸다.

- 그래서 도메인 별 Micro Service를 생성했다. MSA를 고려했고 코틀린으로 도전했다.
- 프로젝트를 시작하기 전 기술스택을 모두 조사하고 시작했다.

![KakaoTalk_20191211_205003400_01](/wiki-img/nhnforward2019/KakaoTalk_20191211_205003400_01.jpg)

- 서킷 브레이킹, 카프카, 주키퍼, 젠킨스, 앤써블, Spring Cloud, Netflix Zuul(API Gateway), Eureka(Service Discovery), Ribbon(Client side Load Balancing), Histrix(Circuid Breaker), Netflix Eureka, Spring Webflux Non-blocking
- 뭘로 할지 고민을 많이 했다고 한다.
- 고민하다가 Netflix Zuul에서 Spring Cloud로 그리고 모든 것을 도커 이미지화했다.

### Build & Deploy

![KakaoTalk_20191211_205003400_12](/wiki-img/nhnforward2019/KakaoTalk_20191211_205003400_12.jpg)

- 모니터링 툴도 사용했다. nSight, Scouter - Zipkin, Grafana, Scouter - xlog
- Spring REST Docs, OpenAPI 3.0, Swagger UI
- Swagger Annotation을 사용했다.

![KakaoTalk_20191211_205003400_15](/wiki-img/nhnforward2019/KakaoTalk_20191211_205003400_15.jpg)

- 근데 서비스를 종료를 했다? 띠용...

### 결론

- 기술스택에 너무 욕심부리지 말자
- 서비스는 안정성이 중요하다
- 장애를 두려워하지 말자

> 이 세션은 정말 인기가 많아서 자리가 꽉 차고도 뒤에 사람이 줄지어 있었다. 줄지어 있던 사람이 나다. 그래서 사진이 조금 흐릿하다.

## HTTP API 설계, 후회, 고민

조직(Organizations)과 프로젝트(Projects), 업무(Tasks)가 있을 때 URL 경로를 어떻게 줘야할지 에 대한 고민

- Content Negotiation Header를 사용하는 것이 표준을 따르는 방식
- 써 놓은 글이 있었는데 사라졌다;;

![KakaoTalk_20191211_205003400_19](/wiki-img/nhnforward2019/KakaoTalk_20191211_205003400_19.jpg)

## Spring JPA의 사실과 오해

- 연관 관계 매핑과 Spring Data JPA Repository
- 어노테이션을 통해 관계 설정 가능

### 양방향 매핑보다 단방향 매핑이 좋다?

- 대개의 경우 단방향 매핑이면 충분하다
    - 객체 그래프 탐색의 관점에선...
- 일대다(1:N) 단방향 연관관계 매핑에서 CASCADE를 통한 insert 시
    - 일대다(1:N) 관계의 외래 키(FK) 지정을 위해 추가적인 update 쿼리가 발생하는 문제가 있다.
    - 이 경우, 일대다(1:N) 양방향 연관관계로 변경하면 추가적인 update 쿼리가 없어진다.

### JPA Repository 메소드로 JOIN 쿼리를 실행할 수 있다?

- JPA는 데이터베이스 테이블 간의 관계를 Entity 클래스의 속성으로 모델링
- JPA Repository 메소드에서는 "_"를 통해 내부 속성값을 접근할 수 있다.

```java
@Entity
public class Member{
	@OneToMany
    private List<MemberDetail> details
}

@Entity
public class MemberDetail{
    @EmbeddedId
    private Pk pk;
    
    @Embeddedable
    public static class Pk{
        private String type;
    }
}

public interface MemberRepository extends JpaRepository<Member, Long> {
    // select * from Member m
    // inner join MemberDetail md
    // on m.member_id = md.member_id
    // where md.type = {type}
    List<Member> findByDetails_Pk_Type(String type);
}

```

### Page vs Slice

- 리턴 타입이 다르다.

```java
public interface MemberRepository extends JpaRepository<Member, Long> {
    // select * from Members where name = {name} offset {offset} limit {limit}
    // select count(*) from Members where name = {name}
    Page<Member> getAllByName(String name, Pageable pageable);
    
    // select * from Members where name = {name} offset {offset} limit {limit_plus_1}
    Slice<Member> readAllByName(String name, Pageable pageable);
}
```

### 연관관계 매핑

- 사실상 단방향 매핑만으로 연관관계 매핑은 이미 완료
- 대개의 경우 단방향 매핑이면 충분하다
    - 대개의 경우 단방향 매핑을 하고 양방향이 필요한지 확인
- 1:N 단방향 연관관계 매핑에서 영속성 전이(CASCADE)를 사용할 경우 양방향으로 변경

### Spring Data JPA Repository

- JpaRepository 상속 - 웬만한 CRUD, Paging, Sorting 메소드 사용
- 메소드 이름 규칙을 통한 쿼리 생성 - 이름 규칙에 따라 interface에 메소드 선언만 하면 쿼리 생성
- JPA Repository 메소드로도 JOIN 쿼리 수행 가능 - 이름 규칙에 따라 Entity 내 연관관계 필드 탐색
- JPA Repository 메소드에서도 다양한 DTO Projection 지원

### 그 외

- pagenation  + fetch join은 매우 위험. 어느 레코드가 들어갈지 모른다. 분리해서 사용해야된다.
- Limit보다 적다면 카운트 쿼리가 날라가지 않는다.
- Fetch전략. 즉시가져오려면 eager, 참조하고 난 뒤에 가져오려면 lazy

## 낮에는 개발자, 밤에는 DJ : 두 마리 토끼를 잡다

- DJ를 **직접 찾아가서** 개인레슨을 받고 싶다고 말했고 그게 성공했다.
- 하루에 2~3시간씩 **꾸준히** 투자했다.

## 후기

예전에 DEVIEW 2018을 갔었는데 그 때도 어려운 키워드를 접하면서 '이건 천재들만 할 수 있겠다...' 싶었던 기억이 난다. 그리고나서 NHN FORWARD 2019(DEVIEW 2019는 티켓팅 실패 ㅠㅠ)에 참가하게 됐는데 아직도 여전히 어렵다... 직접 적용해보진 못하고 개념만 알고있었던 MSA는 직접 들어보니 역시 차원이 달랐다. 배포하는 거라든지, Spring Cloud 등.., 내겐 아직 어려운 키워드가 많았다. 그래도 이런 컨퍼런스를 다녀오면서 개발에 대한 의지라든지, 키워드, 회사에 대한 생각들을 알 수 있어서 좋았다. 

![KakaoTalk_20191211_205003400_17](/wiki-img/nhnforward2019/KakaoTalk_20191211_205003400_17.jpg)

게다가 이 날 면접을 보고 후다닥 와서 정신이 없었기도 없었고 모든 좌석에 책상이 있진 않아서 노트북을 제대로 사용하지 못 했다. 인기있는 세션에는 사람이 너무 많아서 일어서서 들어야했다. 무엇보다 그 때 쓴 게 있는데 지금 찾아보니까 날라갔다;; 찾으면 추후에 더 적도록 하겠습니다 :) 
