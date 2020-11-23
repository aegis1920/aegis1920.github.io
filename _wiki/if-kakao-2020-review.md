---
layout  : wiki
title   : if(kakao) 2020 정리
summary : 
date    : 2020-11-23 14:53:01 +0900
updated : 2020-11-23 14:53:52 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

개인적으로 흥미가 가는 세션을 정리해봤습니다. 어쩌다보니 테스트에 관련된 내용이 많은데 아직 안 본 세션도 있어서 조금씩 추가하도록 하겠습니다 :)

## TDD 묻고 BDD로 가!

- TDD를 하게 된다면 테스트가 가능한 설계로 짜여진 코드가 작성된다.
- 테스트 가능한 코드가 된다면 모듈의 역할이 명확해야된다. 그래서 모듈의 크기와 커플링을 줄이게 된다. 그래서 TDD를 하게 되면 장점이 알아서 찾아옴
- 테스트 케이스를 만들면 유지보수가 증가한다. 이러면 일정이 지연된다. 그래서 TDD를 하기 어려움.

### BDD

- 사용자 행위로 정의하는 개발 방법론
- Given, When, Then으로 작성
- BDD로 작성되면 기획서처럼 하게 돼 서비스의 이해도가 증가한다.
- TDD보다도 더 넓은 테스트 커버리지 확보할 수 있다

### TDD, BDD 중 뭘 해야하나?

- BDD는 TDD에 파생된 개념으로 사용자 액션이 껴있다.
- TDD와 BDD는 상호보완적인 관계다.
- BDD에서 설계 누락을 확인할 수 있기때문에 좋다. 어떤 기획이 필요한 지 알 수 있다.

### kotest

- 코틀린 테스트 프레임워크
- BDD, TDD로 둘 다 쓸 수 있다.
- BehaviorSpec()
    - Given, When, Then 형식으로 쓸 수 있다.
- FeatureSpec()
    - Given, When, Then으로 만들지 않고 기능과 시나리오로 만드는 것.
- AnnotationSpec()
    - TDD형태로 사용할 수 있다.
- ExpectSpec()

### Mockk

- Mocking 라이브러리
- 외부서비스를 사용할 때

## Junit5를 시작하며

### Junit5의 핵심

- 단순하며 기능보다는 확장성을
- Ex) Junit4에서는 `public void`를 사용했는데 Junit5에서는 `void`만 사용

### Junit5에 추가된 것들

- assertAll
    - assert 하나가 실패하면 다음 assert를 실행하지 않았는데 assertAll을 활용하면 여러 개의 assert 가능
    - 첫 번째 매개변수에 String으로 assertAll의 이름을 줄 수 있음
- assertThrows
    - assertThrows를 사용해 Exception을 검증할 수 있음
    - assertDoesNotThrows를 사용해 예외가 발생하지 않는 것도 검증 가능
- assertTimeout
    - 테스트 실행시간에 대한 assert 기능
    - assertTimeoutPreemptively는 기대하는 시간을 초과하면 테스트 실패
- @Nested
    - 클래스 위에 @DisplayName과 함께 사용해서 BDD 처럼 사용가능
- Dynamic Test
    - 외부의 자원을 활용하거나, 랜덤 데이터를 생성하여 활용 가능
    - 타이틀을 활용해 좀 더 가독성이 높은 테스트 작성 가능
- Parallel Execution
    - Class, Method로 테스트 병렬 실행 가능

## 카카오톡 시스템의 진화 - 테스트 자동화로 자신감 찾기

"레거시 시스템의 부담감을 어떻게 덜 수 있을까?"

### 장애의 근본적인 원인

1. 요구사항 충족을 위한 기능 개발에 집중
2. 클래스 세분화 실패, 테스트 부재
3. 개발 및 배포에 대한 부담감 증폭

### 우선 목표 : 테스트가 있어야 한다

- 테스트가 있으면 리펙토링의 기반을 마련할 수 있고, 배포의 부담감에서 벗어날 수 있다

### Cucumber

- BDD 기반
- Gherkin 파서를 이용해 일반인도 쉽게 이해 가능
- 통합 테스트에 적합
- 클라이언트를 Mocking 해서 가입, 친구 추가 등의 행위는 의존성을 제거해서 진행

### Gradle, Jenkins로 CI 구축

- 메시징 서버가 필요한 환경을 Docker 명령 하나로 띄울 수 있도록 함
    - 모든 컴포넌트를 로컬에 띄우니 확실히 테스트 시간이 빨라짐
- 젠킨스 빌드가 일어날 때마다 통합 테스트가 일어나고, 통합 테스트의 결과가 리포트로 만들어짐
    - cucumber report plugin 사용
        - 코드 커버리지는 Jacoco로 설정
        - 통합 테스트를 진행할 때 Jacoco의 의존성을 추가해줄 수 있음
    - 젠킨스에 Jacoco 플러그인을 사용

