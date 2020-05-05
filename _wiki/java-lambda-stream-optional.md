---
layout  : wiki
title   : 함수형, 람다식과 Stream, Optional
summary : 
date    : 2020-02-24 14:23:45 +0900
updated : 2020-05-05 18:55:33 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 람다식

자바는 함수적 프로그래밍을 위해서 자바 8부터 람다식을 지원한다. 람다식은 익명 함수를 생성하기 위한 식으로 객제 지향 언어보다는 함수 지향 언어에 가깝다.

- 빅데이터 지원을 해주기 위해 분산 처리, 병렬화 기술이 필요해졌다.
- `Collection`을 강화 → 스트림을 강화 → 함수형 프로그래밍을 위해 람다 강화 → 람다를 위해 인터페이스 변화
- 자바 8부터 람다식을 지원한다
- 람다식은 하나의 메소드만 정의하기 때문에 두 개 이상의 추상 메소드가 선언된 인터페이스는 람다식을 이용해서 구현 객체를 생성할 수 없다.
- 람다를 지원하기 위한 인터페이스를 함수형 인터페이스라고 한다
    - 추상 메서드를 하나만 갖는 인터페이스를 함수형 인터페이스라고 한다
    - `@FunctionalInterface` 어노테이션을 통해 컴파일러가 추상 메소드를 하나만 갖는지 확인해줄 수 있다.
- 람다식은 `(매개변수)->{실행코드};` 형태로 작성된다.
- 람다식에서의 this는 내부적으로 생성되는 익명 객체의 참조가 아니라 람다식을 실행한 객체의 참조다.
- 람다식에서 바깥 클래스의 필드나 메소드를 제한없이 사용할 수 있으나 메소드의 매개변수, 로컬 변수를 사용하고 싶다면 그 변수들은 final의 특징을 가지고 있어야 한다. 왜냐하면 로컬 변수나 매개변수 같은 경우, 메소드 실행이 끝나면 스택 메모리에서 사라지기 때문. (자바 8부터는 생략해도 컴파일러가 자동으로 final로 인식한다)
- 추상 메서드의 정의를 통해 반환값을 알 수 있으니 `return`문을 뺄 수 있다.
- 병렬화 지원을 위해 만들어진 스트림이 `parallelStream()` 이다.

### 람다식이 되는 과정(매개변수 하나)

1. `(int a) -> {System.out.println(a);}`
2. `(a) -> {System.out.println(a);}`
3. `a -> {System.out.println(a);}`

### 람다식이 되는 과정(매개변수 두 개 이상)

1. `(x, y) -> {return x + y;}`
2. `(x, y) -> x + y`

## 함수형 인터페이스(Functional Interface)

### 함수란?

- 함수는 항상 **같은 값을 반환한다**
- 함수는 input에 대한 output이 명확하다.

### 왜 함수형인가?

### 관심사의 분리

- 일반적인 로직을 사용하면 작업을 어떻게 수행할 것인지에 대해 집중하게 된다.
- stream을 쓰면 구체적인 작업 방식은 stream이 결정해주고 무엇을 수행할 것인지에 집중할 수 있게 된다
- stream을 쓰면 동일한 입력에 대해 동일한 출력이라 side-effect가 발생하지 않는 걸 보장할 수 있다.

### 동시성 제어

- 데이터가 지속적으로 많아지고 그 데이터들을 처리해야되며 동시성 제어도 해줘야 한다.
- 그래서 원래는 lock을 걸어놓거나 그랬는데 그러면 비즈니스로직이 아닌 것들이 들어가서 안된다.
- 이럴 때 Stream을 쓰고 있다면 개발자는 그냥 parallel()만 써주면 된다. 그러면 알아서 병렬 처리로 바뀐다.

### 함수형을 사용하기 위해선?

- 함수형에서 참조하는 객체는 불변 객체이어야 하며 모든 필드가 final이어야 한다

### 함수형 인터페이스란?

- 단 하나의 추상 메서드만 선언된 인터페이스
- `@FunctionalInterface`를 붙여 하나의 메서드만 있는지 확인해줄 수 있다
- 아래와 같이 선언해주고 람다를 활용해 구현해줄 수 있다
- Java 1.8에서 나온 기본 함수형 인터페이스가 있다.

### Function

- Input과 Output 타입을 정할 수 있다.

```java
    @Test
    public void FunctionTest() {
        // 익명 클래스를 이용한 방법으로 적용하려는 메서드를 Override해서 사용한다.
        Function<String, Integer> toInt = new Function<String, Integer>() {
            @Override
            public Integer apply(final String value) {
                return Integer.parseInt(value);
            }
        };

        // 람다식을 이용하고 메서드 레퍼런스를 사용해 가독성 있게 구현할 수 있다.
        Function<String, Integer> toIntValue = Integer::parseInt;

        final Integer number1 = toInt.apply("100");
        final Integer number2 = toIntValue.apply("200");
        System.out.println(number1);
        System.out.println(number2);
    }

    @Test
    public void FunctionIdentityTest() {
        // Function.identity() 메서드는 t -> t로 자기 자신 그대로 가는 것을 말한다
        final Function<Integer, Integer> identity = Function.identity();

        System.out.println(identity.apply(100) == 100);
    }

```

### Consumer

- 반환형이 void인 것

```java
    @Test
    public void ConsumerTest() {
        final Consumer<String> printValue = System.out::println;
        // 될 것 같지만 안된다. 함수형에는 명확한 Input과 Output이 있어야 하기 때문에
        // final Function<String, Void> printVoid = System.out::println;
        printValue.accept("HelloWorld!");
    }

```

### Predicate

- 반환형이 boolean인 것
- 스트림의 filter에도 있다.

```java
    @Test
    public void PredicateTest() {
        final Predicate<Integer> isPositive = value -> value > 0;

        System.out.println(isPositive.test(100));
        System.out.println(isPositive.test(-1));
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(filter(list, isPositive));
    }

    // 이런 식으로 Predicate를 활용할 수 있다. 어떤 list에 대해서 filter를 거치는 방법
    private static <T> List<T> filter(List<T> list, Predicate<T> filter) {
        List<T> result = new ArrayList<>();
        for (T input : list) {
            if (filter.test(input)) {
                result.add(input);
            }
        }
        return result;
    }

```

### Supplier

- get()을 통해 해당 타입을 반환시킬 수 있다.
- 메서드에 바로 접근해 리턴값을 뽑아내는 것이 아니라 get을 통해 value를 가져올 수 있다.
- 이건 예제를 보는 게 이해가 편할 것 같다.

```java
    @Test
    public void SupplierTest() {
        final Supplier<String> helloSupplier = () -> "hello";

        long start = System.currentTimeMillis();

        printValidIndex(0, getVeryHeavyWork());
        printValidIndex(-1, getVeryHeavyWork());
        printValidIndex(-2, getVeryHeavyWork());

        // 메서드의 리턴값을 바로 가지고 하는 것이 아니라서 Supplier를 써주면 인덱싱 계산 후에 get해서 불러올 수 있다.
        printValidIndexUsingSupplier(0, () -> getVeryHeavyWork());
        printValidIndexUsingSupplier(-1, () -> getVeryHeavyWork());
        printValidIndexUsingSupplier(-2, () -> getVeryHeavyWork());

        System.out.println("It took " + ((System.currentTimeMillis() - start) / 1000));
    }

    private static String getVeryHeavyWork() {
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "bingbong";
    }

    // String을 한 번 더 감싸줌으로써 인덱스를 먼저 검사 후, value를 꺼내올 수 있다. 불필요한 메모리 낭비, Lazy Evaluation을 줄일 수 있다.
    private static void printValidIndexUsingSupplier(int number, Supplier<String> valueSupplier) {
        if (number >= 0) {
            System.out.println("value is : " + valueSupplier.get());
        } else {
            System.out.println("Invalid");
        }
    }

    private static void printValidIndex(int number, String value) {
        if (number >= 0) {
            System.out.println("value is : " + value);
        } else {
            System.out.println("Invalid");
        }
    }

```

### Custom

- 스스로 만들어서 사용할 수 있는 함수형 인터페이스

```java
    @Test
    public void testCustomInterface() {
        // 쓰는 순간에 타입이 결정된다. 그래서 람다식을 써도 괜찮다.
        print(1L, "bingbong", "test@email.com", (id, name, email) -> "id = " + id + ", name = " + name + ", email = " + email);
    }

    private <T1, T2, T3> void print(T1 t1, T2 t2, T3 t3, Custom<T1, T2, T3, String> function) {
        System.out.println(function.apply(t1, t2, t3));
    }

    // 제네릭 타입 파라미터이기 때문에 추론이 가능하다.
    interface Custom<T1, T2, T3, R> {
        R apply(T1 t1, T2 t2, T3 t3);
    }

    @Test
    public void testInvalidFunctionalInterface() {
        final InvalidFunctionalInterface anonymousClass = new InvalidFunctionalInterface() {
            @Override
            public <T> String mkString(final T value) {
                return value.toString();
            }
        };

        // 람다식으로 하게 되면 추론이 불가능하게 된다. Input 타입과 Output 타입을 정확히 해줄 수가 없다.
        final InvalidFunctionalInterface invalidFunctionalInterface = value -> value.toString();

        System.out.println(anonymousClass.mkString(123));
        // 여기 안으로 들어가야지 그 타입을 알 수 있다.
        System.out.println(invalidFunctionalInterface.mkString(123));
    }

    // 함수형 인터페이스를 사용할 때 제약사항. 제네릭을 사용하면 람다식에서는 사용하지 못 한다.
    @FunctionalInterface
    interface InvalidFunctionalInterface {
        <T> String mkString(T value);
    }

    private static <T, R> List<R> map(List<T> list, Function<T, R> function) {
        final List<R> result = new ArrayList<>();
        for(final T t : list) {
            result.add(function.apply(t));
        }
        return result;
    }

    private static <T> BigDecimal total(List<T> list, Function<T, BigDecimal> mapper) {
        BigDecimal total = BigDecimal.ZERO;
        for(final T t : list) {
            total = total.add(mapper.apply(t));
        }
        return total;
    }

```

### Function.identity()

- 아무 것도 해주지 않고 그대로 값을 전달해주고 싶을 때 사용한다.
- 아무 것도 안 한다고 Null을 전달해준다면 Null 처리에 힘들어진다.
- `i -> i` 와 `Function.identity()` 는 결과가 같지만 `Function.identity()` 는 항상 동일한 인스턴스를 반환하기 때문에 메모리를 더 절약할 수 있다.
- 예를 들어, `Stream<Country>` 을  `Map<String, Country>` 로 바꾸고 싶을 때 Country는 그대로 주고 싶으니  `stream.collect(Collectors.toMap(Country::getIsoCode, Function.identity()))` 와 같은 방식으로 사용한다.

## Stream

- 컬렉션, 배열등의 저장 요소를 하나씩 참조하며 함수형 인터페이스(람다식)를 적용하며 반복적으로 처리할 수 있도록 해주는 기능
- 스트림을 사용하면 재귀를 더 효율적으로 제어해줄 수 있다.
- 자체적으로 캐싱해 다시 계산하지 않는다
- 스트림 일단 전체 코드를 먼저 읽고, 필요한 로직에 해당되지 않으면 아예 처리하지 않는다. 디버깅하면 알수있다.
- `null`이 없고 `Optional.empty`를 반환한다.

### 중요 스트림 메서드

- filter : 필터링
- map : 각 요소를 다른 형태로 바꿔줄 수 있다(문자열에 붙이거나, * 2를 하거나 등등...)
- reduce : 누적된 값 계산
- sorted, limit, distinct, mapToInt, joining 등..

## Optional

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
- 케빈티비 유튜브(강추)
- [https://www.python2.net/questions-208930.htm](https://www.python2.net/questions-208930.htm)
- [https://ko.coder.work/so/java/12016](https://ko.coder.work/so/java/12016)
