---
layout  : wiki
title   : 아이템 44 - 표준 함수형 인터페이스를 사용하라
summary : 
date    : 2021-02-22 20:29:45 +0900
updated : 2021-02-22 20:30:45 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 함수형 인터페이스란 뭘까요?

함수형 인터페이스란 하나의 추상 메서드만 가지고 있는 인터페이스를 말합니다

```java
public interface MyFunctionalInterface {
    void execute();
}
```

참고로 인터페이스에 default 메서드나 static 메서드를 구현하더라도 하나의 추상 메서드만 있다면 함수형 인터페이스라고 부를 수 있습니다

```java
public interface MyFunctionalInterface {
    void execute();

    default void execute2() {
        // ...
    }

    static void execute3() {
        // ...
    }
}
```

### 왜 함수형 인터페이스를 사용할까요?

문득 궁금해졌습니다. 왜 함수형 인터페이스를 사용할까?

요 단락과 다음 단락은 저의 생각과 뇌피셜이 담겨있으니 필터링해주시면 감사하겠습니다. 고민해보고 찾아보니 생각보다 더 Deep한 의문이더라고요ㅎㅎ

객체 지향 프로그래밍인 자바에서 Java 8부터 함수형 프로그래밍을 지원하기 시작했습니다. 왜 함수형 프로그래밍을 지원했을까요? 함수형 프로그래밍의 장점이 있기 때문에 그랬겠죠?

함수형 프로그래밍은 말 그대로 모든 것이 함수입니다. 모든 것을 f(x) = y 처럼 표현할 수 있게 되는 거죠. 이렇게 모든 것을 함수로 가져가서 어떤 부분이 좋을까요? 제가 생각하기에 가장 좋은 이점은 **순수 함수로써 불변성**을 가진다는 겁니다.

순수 함수이기 때문에 input과 output이 정해져 있어 테스트하기 쉬워지고 명확하며 불변성을 가져 사이드 이펙트가 없어집니다. 이런 장점들은 동시에 어떤 데이터에 접근하거나 병렬적으로 어떤 것을 실행시킬 때 부작용을 막아줍니다.

그러면 또 의문이 듭니다. 이런 장점들이 어디에 도움이 된다고 함수형 프로그래밍을 도입했을까요?

시간이 흐르면서 데이터들을 많이 다루는 일이 많아졌습니다. 그래서 데이터들을 좀 더 효율적으로, 안정적으로 운영하기 위해서 함수형 프로그래밍을 도입했다고 합니다.

어쨌든, 자바는 이런 장점을 가진 함수형 프로그래밍을 지원하기 위해서 Java 8부터 함수형 인터페이스의 인스턴스를 표현할 수 있는 수단이자 익명함수인 람다식과 람다식을 타입으로 표현해줄 수 있는 함수형 인터페이스를 지원하게 됩니다.

함수형 인터페이스로 인해서 람다식을 타입으로 표현해줄 수 있고 이로 인해 메서드의 구현부를 매개변수로 넣을 수 있게 됐습니다.

> 즉, 함수형 인터페이스는 함수형 프로그래밍을 지원하기 위해 람다식을 표현하는 수단으로  사용됩니다.

### 함수형 인터페이스에는 왜 하나의 추상 메서드만 있을까요?

만약 함수형 인터페이스에 두 개의 추상메서드를 선언하고 람다식을 사용해보면 람다식에서 아래와 같은 컴파일 에러가 나옵니다.

```java
Multiple non-overriding abstract methods found in interface MyFunctionalInterface
```

람다식은 함수형 인터페이스가 하나의 추상 메서드만 가질 때 사용할 수 있습니다. 람다식 자체가 익명 함수를 뜻하는데 이름없는 함수, 함수 그 자체의 의미를 가지기 때문에 하나의 추상 메서드만 있어야 합니다.

### 함수형 인터페이스에서 하나의 추상 메서드만 있다는 걸 어떻게 보장할까요?

`@FunctionalInterface` 라는 어노테이션이 있습니다.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FunctionalInterface {}
```

이 어노테이션을 인터페이스에 사용하면 해당 인터페이스에 두 개 이상의 추상 메서드를 선언했을 경우, 컴파일 에러가 나오게 됩니다.

```java
@FunctionalInterface // 여기 빨간 줄
public interface MyFunctionalInterface {

    void execute();
    void execute2();
}
```

```java
Multiple non-overriding abstract methods found in interface MyFunctionalInterface
```

그래서 따로 함수형 인터페이스를 만들었다면 `@FunctionalInterface` 를 붙여주는 것이 좋습니다.

## 표준 함수형 인터페이스란 뭘까요?

몇 가지 유용한 함수형 인터페이스를 자바 진영에서 미리 만들어놓은 것이 표준 함수형 인터페이스입니다. java.util.function 패키지에 총 43개의 함수형 인터페이스가 있습니다. 물론 이걸 다 외울 순 없습니다만 기본 인터페이스에 몇 가지 정해진 규칙으로 파생됐기 때문에 어떤 게 있을지 어느정도 예측할 순 있습니다.

기본 인터페이스 6가지는 아래와 같습니다

```java
@FunctionalInterface
public interface UnaryOperator<T> extends Function<T, T> {

    static <T> UnaryOperator<T> identity() {
        return t -> t;
    }
}
```

```java
@FunctionalInterface
public interface BinaryOperator<T> extends BiFunction<T,T,T> {

    public static <T> BinaryOperator<T> minBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) <= 0 ? a : b;
    }

    public static <T> BinaryOperator<T> maxBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) >= 0 ? a : b;
    }
}
```

```java
@FunctionalInterface
public interface Predicate<T> {

    boolean test(T t);

    // ...
}
```

```java
@FunctionalInterface
public interface Function<T, R> {

    R apply(T t);

    // ...
}
```

```java
@FunctionalInterface
public interface Supplier<T> {

    T get();
}
```

```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

- UnaryOperator는 반환값과 인수(1개)의 타입이 같습니다
    - 재밌는 게 Function<T, T> 를 상속해 확장하고 있습니다
    - T, T로 타입을 줘서 인수와 반환값이 모두 같은 타입이 되도록 했습니다
- BinaryOperator는 반환값과 인수(2개)의 타입이 같습니다
    - 여기도 BiFunction<T, T, T> 를 상속해 확장하고 있습니다
    - T, T, T로 타입을 줘서 인수와 반환값이 모두 같은 타입이 되도록 했습니다
- Predicate는 인수 하나로 boolean을 반환합니다
- Function은 인수 하나와 반환값이 있는데 서로의 타입이 다릅니다
- Supplier는 인수를 없으며 반환값이 있습니다
- Consumer는 인수 하나를 받고 반환값이 없습니다

여기에 몇 가지가 추가되는데 이런 식입니다.

- Predicate에서 인수가 int 타입이면 IntPredicate입니다. (반환값은 boolean)
- Function에서 long을 받아 int를 반환하면 LongToIntFunction 입니다
- Consumer에서 인수를 두 개 받으면 BiConsumer 입니다
- Function에서 2개의 인수를 받아 int를 반환하면 ToIntBiFunction 입니다

> 표준 함수형 인터페이스는 너무 많아서 외울 수 없습니다
인수의 개수와 기본 타입(int, long, double)을 보고 내가 생각한 게 표준 인터페이스에 있겠다 싶으면 그때 찾아보고 활용하면 좋을 것 같습니다

### 왜 표준 함수형 인터페이스를 사용해야 할까요?

어떻게 보면 당연합니다ㅎㅎ 이미 만들어져 있고 용도만 맞다면 사용하지 않을 이유가 없겠죠? 표준 함수형 인터페이스인 만큼 유지보수할 때도 편하다는 이유도 있습니다.

## 그렇다면 언제 함수형 인터페이스를 직접 만들어야 할까요?

자바 진영에서도 표준 함수형 인터페이스를 냅두고 직접 만든 함수형 인터페이스가 있습니다. 여러분도 잘 아실텐데요. 바로 정렬할 때 많이 쓰는 Comparator 입니다.

Comparator 함수형 인터페이스는 표준 함수형 인터페이스인 ToIntBiFunction과 추상 메서드가 완벽히 같음에도 따로 만들었습니다.

```java
@FunctionalInterface
public interface Comparator<T> {

    int compare(T o1, T o2);

    // ...

    default <U> Comparator<T> thenComparing(Function<? super T, ? extends U> keyExtractor, Comparator<? super U> keyComparator) {
        return thenComparing(comparing(keyExtractor, keyComparator));
    }

    // ...
}
```

```java
@FunctionalInterface
public interface ToIntBiFunction<T, U> {

    int applyAsInt(T t, U u);
}
```

추상 메서드가 같음에도 직접 함수형 인터페이스를 만든 이유는 **직접 default 메서드를 통해 구현할 수 있고 이름을 줄 수 있기 때문입니다.** 

Comparator는 한국어로 번역하면 '비교측정기', compare() 메서드는 '비교하다' 입니다. 정말 명확하지 않나요? 그리고 thenComparing 와 같이 default 메서드로 직접 구현해서 계속해서 비교할 수 있도록 기능을 추가할 수 있습니다.

## 함수형 인터페이스 사용 시 주의 사항

함수형 인터페이스에서도 오토박싱과 언박싱이 이뤄집니다. 때문에 리턴 타입이 기본 타입이 아니라 기본으로 박싱된 객체인 경우(Function의 apply, Supplier의 get 등...) 성능 상 차이가 있기에 생각하고 사용하셔야 합니다. (아이템 61을 참고하면 좋습니다) 

## 요약

> 이미 구현되어있는 표준 함수형 인터페이스를 사용하자  
인터페이스의 의미를 명확히 주고 싶거나 직접 구현할 기능이 있다면 직접 함수형 인터페이스를 만들자 (@FunctionalInterface를 붙이자)

## 출처

- 이펙티브 자바 3판
- [http://tutorials.jenkov.com/java-functional-programming/functional-interfaces.html](http://tutorials.jenkov.com/java-functional-programming/functional-interfaces.html)
- [https://www.quora.com/Why-do-we-need-Functional-interface-in-Java](https://www.quora.com/Why-do-we-need-Functional-interface-in-Java)
- [https://www.baeldung.com/java-functional-programming](https://www.baeldung.com/java-functional-programming)
- [https://johngrib.github.io/wiki/java-functional-interface/](https://johngrib.github.io/wiki/java-functional-interface/)
- [https://www.youtube.com/watch?v=e-5obm1G_FY](https://www.youtube.com/watch?v=e-5obm1G_FY)

