---
layout  : wiki
title   : 람다식과 Stream, Optional
summary : 
date    : 2020-02-24 14:23:45 +0900
updated : 2020-02-24 14:24:48 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 람다식

- 빅데이터 지원을 해주기 위해 분산 처리, 병렬화 기술이 필요해졌다.
- Collection을 강화 → 스트림을 강화 → 함수형 프로그래밍을 위해 람다 강화 → 람다를 위해 인터페이스 변화
- 자바 8부터 람다식을 지원한다
- 람다를 지원하기 위한 인터페이스를 함수형 인터페이스라고 한다
    - 추상 메서드를 하나만 갖는 인터페이스를 함수형 인터페이스라고 한다
    - `@FunctionalInterface` 어노테이션을 통해 컴파일러가 추상 메소드를 하나만 갖는지 확인해줄 수 있다.
- 람다는 코드 블록이다.
- 람다를 메서드의 인자나 반환값으로 사용할 수있다. 즉, 코드 블록을 변수처럼 사용할 수 있다.
- 추상 메서드의 정의를 통해 반환값을 알 수 있으니 `return`문을 뺄 수 있다.
- 병렬화 지원을 위해 만들어진 스트림이 `parallelStream()` 이다.
- `(매개변수)->{실행코드};` 형태로 작성됩니다.
    - `(int a) -> {System.out.println(a);}`
    - `(a) -> {System.out.println(a);}`
    - `a -> {System.out.println(a);}`
    - `(x, y) -> {return x + y;}`
    - `(x, y) -> x + y`
- 자바는 메소드를 단독으로 선언할 수 없고 항상 클래스의 구성 멤버로 선언하기 때문에 람다식은 이 메소드를 가지고 있는 객체를 생성한다.
- 어떻게 생성하냐면 람다식은 인터페이스 변수에 대입되는데 인터페이스는 직접 객체화할 수 없기 때문에 익명 구현 클래스를 생성하고 객체화 한다.
```java
    //추상 메소드가 2개이면 체크할 수 있도록
    @FunctionalInterface
    public interface MyFunctionalInterface {
    		//매개변수가 있는 추상 메소드
    		public void method(int x);
    }
    public class MyFunctionalInterfaceExample {
    	public static void main(String[] args) {
    		//람다식을 정의한 후,
    		MyfunctionalInterface fi;
    		//메소드 정의
    		fi = (x) -> {
    			int result = x * 5;
    			System.out.println(result);
    		//메소드 호출
    		fi.method(2);
    	}
    }
```

### 표준 API의 함수적 인터페이스

- 자바에서 제공되는 표준 API에서 한 개의 추상 메소드를 가지는 인터페이스들은 모두 람다식을 이용해서 익명 구현 객체로 표현이 가능하다.
- `java.util.function` 표준 API로 제공해 함수적 인터페이스는 크게 `Consumer, Supplier, Function, Operator, Predicate` 등으로 구분된다.

## Stream

- 컬렉션, 배열등의 저장 요소를 하나씩 참조하며 함수형 인터페이스(람다식)를 적용하며 반복적으로 처리할 수 있도록 해주는 기능
- filter : 필터링
- map : 각 요소를 연산(문자열에 붙이거나, * 2를 하거나 등등...)
- reduce : 누적된 값 계산
- sorted, limit, distinct, mapToInt 등..

### Optional

- `NullPointerException` 문제를 해결하기 위한 클래스
- `null`값을 체크하기 위해 if문을 사용하면 코드의 가독성이 떨어지고 각 변수마다 모두 체크해야되기 때문에 만들어졌다
- `Optional` 객체로 감싸기 위한 두 개의 메서드가 있다
    - `null`을 받지 않는 `of()`
        - `null`인 경우 `NPE`
    - `null`을 허용하는 `ofNullable()`
        - `null`인 경우 비어있는 `Optional`반환
- `isPresent()` : 현재 `Optional`이 보유한 값이 null인지 확인하는 메서드
- `orElse()` : 연산을 끝낸 후에도 `Optional` 객체가 비어있다면 기본값으로 제공할 객체 지정
- `orElseThrow()` : 연산을 끝낸 후에도 `Optional` 객체가 비어있다면 예외를 발생시킴

### 출처

- 스프링 입문을 위한 자바 객체 지향의 원리와 이해
- [https://jeong-pro.tistory.com/165](https://jeong-pro.tistory.com/165)
- [https://jdm.kr/blog/234](https://jdm.kr/blog/234)
