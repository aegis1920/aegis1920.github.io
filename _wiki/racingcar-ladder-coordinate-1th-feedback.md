---
layout  : wiki
title   : 우아한 테크코스 RacingCar, Ladder, Coordinate 미션의 1기 피드백 내용들
summary : 
date    : 2020-02-28 11:48:45 +0900
updated : 2020-02-28 11:49:18 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

블로그를 보다가 우아한 테크코스 1기분들의 피드백을 따로 정리해놓으신 분([https://os94.site/category/우아한 테크코스](https://os94.site/category/%EC%9A%B0%EC%95%84%ED%95%9C%20%ED%85%8C%ED%81%AC%EC%BD%94%EC%8A%A4))이 있었다. 내가 받지 않았던 피드백을 보면서 새로운 내용도 깨달았기에 1기분들의 RacingCar, Ladder, Coordinate 미션의 피드백을 여기에 정리해두고 앞으로 미션을 진행하면서 이 분과 같이 내 피드백과 다른 사람의 피드백도 정리해서 올릴 생각이다.

- `toString`은 항상 재정의하자.
- 해당 객체의 상태를 표현해주는 의미있는 값으로 표현하기
- **도메인 계층에서 예외를 던지고** 뷰 계층에서 모아서 처리
- 반드시 인라인으로 리팩토링을 하기보다는 의미가 있는 경우 변수로 추출하자
- 값을 할당하기 전에 유효성 검사
- `Map<String, String>`에서 원시값, 문자열을 포장하여 `Map<Player, Reward>` 같이 바꿔보자
- 공백을 제거할 때는 `.replace(" ", "");` 보다 `StringUtils.deleteWhitespace()`를 활용하자.
- 메서드로 추출하는 일은 가독성을 높인다.
- `e.printStackTrace`는 안티패턴이므로 쓰지 말자
- `public static final Number ZERO = new Number(0);` 와 같이 인스턴스를 미리 만들어 놓아서 불필요한 객체 생성을 피하자.
- `Generator`라는 인터페이스를 만들고 확정성을 높이자.
```
- 가능하다면 stream을 자주 사용하자.
```java
// for문을 이용한 합을 구할 때
for(int number : calculatorDto.getNumbers()) {
    sum += number;
}
return sum;

// stream을 이용한 합을 구할 때
return calculatorDto.getNumbers()
        .stream()
        .reduce(0, Integer::sum)
        ;
```
- 코드 로직의 순서 : 생성자 -> `static method` -> 구현코드(중요도 순, `private`이 아래로), `toString`, `equals`, `hashCode`, `getter` 순
- 빈약한 도메인 모델을 갖고 있지 않도록 하자(`getter/setter` 만 있다든지, 비즈니스 로직이 없다든지)
    - 빈약한 도메인 모델은 객체 지향 설계의 근본 사상과 완전히 반대된다
    - 빈약한 객체를 만들면 진짜 객체로 착각할 수 있기 때문에 만들지 않도록 하자
- 상속(`class WinningLotto extends Lotto {}`)보다 조합(`class WinningLotto { private Lotto winningLotto }` 을 이용해 구현하자
- 객체를 단순히 전달만 하는 `byPass` 메소드 생성을 꺼리지 말자
- `Compile-time Exception` 보다 `Run-time Exception`이 더 자주 쓰인다
    - `Compile-time Exception`을 쓰면 더 철저하게 잡을 수 있으나 코드가 복잡해짐

### 출처

- [https://os94.site/135?category=814448](https://os94.site/135?category=814448)
- [https://m.blog.naver.com/PostView.nhn?blogId=muchine98&logNo=220304821784&proxyReferer=https%3A%2F%2Fwww.google.com%2F](https://m.blog.naver.com/PostView.nhn?blogId=muchine98&logNo=220304821784&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
