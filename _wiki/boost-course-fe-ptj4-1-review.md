---
layout  : wiki
title   : FE_PJT4-1 부스트코스 첫 번째 리뷰
summary : 
date    : 2019-09-02 08:47:42 +0900
updated : 2019-09-02 09:59:03 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## FE_PJT4-1 부스트코스 Fail 리뷰

### 코드 리뷰

- 코드 컨벤션. 모든 메소드 중에 딱 하나가 메소드 첫 글자에 대문자가 있었다... 왜 못 봤을까ㅠㅠ 그리고 메소드 명에 너무 직관적인 select같은 이름은 안 주는 게 좋다고 한다.
- 불필요한 변수 사용
- `private`을 써서 내부에서만 사용하는 것임을 명시적으료 표현하자
- return 시킬 때 선언, 초기화 하지 않고 바로 new하고 쓰는 것이 코드 흐름상 더 좋다. 
- `@PathVariable`의 name을 웬만하면 생략하자.
- 최대한 foreach를 쓸 수 있는 환경이면 foreach를 쓰도록 노력하자.
- 내가 만든 메소드는 private으로 선언하자.
- 메소드명은 동사+명사이고, count를 명사처럼 쓰지말자ㅠ

### 내가 질문했던 것(요약)

- `NamedParameterJdbcTemplate`를 쓸 때 항상 DisplayInfo로 객체 하나만 반환하기에 반환형이 List<DisplayInfo>인 것에 의문을 가졌었다. 객체 하나만 반환하는데 List를 쓰니까 비효율적이라는 생각이 들었다. 그래서 질문을 했었는데 `queryForObject`를 쓰거나 직접 구현해서 2개 이상의 조회가 발생하면 예외가 발생하도록 만들어야 된다는 답장을 받았다. 지금 생각해보면 SQL문이 SELECT라서 2건 이상의 조회를 할 수도 있으니 예외를 발생시키기보다는 그냥 출력하도록 List<DisplayInfo>를 반환하는 것도 나쁘지 않다는 생각이 들었다.

