---
layout  : wiki
title   : Mockito
summary : 
date    : 2020-04-26 23:56:14 +0900
updated : 2020-04-27 00:13:42 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

- 일명 가짜 객체
- 구현체가 없고 인터페이스만 있을 때, 인터페이스만으로 로직을 짜고 그것을 테스트하고 싶을 때가 `mock`을 쓰기 좋을 때다
- 직접 구현해도 되긴하지만 너무 길어지고 지저분해진다. 이걸 해주는 것이 `Mockito`.
- 어떤 서버가 테스트 환경이 갖추어져 있지 않다면 `mock`을 만드는 수 밖에 없다.
- `spring-boot-starter-test`는 자동으로 `Mockito`를 추가해준다.
- `jupiter`는 `mockito`와 `junit`을 연동할 수 있다.

### Mock 객체 만들기

- `Mockito.mock()` 을 사용할 수 있다.
- `@Mock` 어노테이션을 사용할 수 있다.

### Mock 객체 Stubbing

- `when(?).thenReturn(?);`
    - `any()` 를 통해 어떤 것이 들어와도 된다.
- `doThrow(?).when(?);`

### Mock 객체 확인

- `verify(memberService, times(1)).notify(?);`
- `verify(memberService, never()).validate(any());`

### BDD 스타일 Mockito API

1. `given(?).willReturn(?);`
2. when에 해당하는 로직
3. `then(?).should(?);`

### 출처

- 백기선님의 인프런 강의
