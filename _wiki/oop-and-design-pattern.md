---
layout  : wiki
title   : 개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴을 읽고...
summary : 
date    : 2020-03-06 18:16:40 +0900
updated : 2020-03-06 18:17:11 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 필사 및 정리

## 객체 지향

### 객체의 책임과 크기

- 한 데이터를 사용하는 프로시저가 많아질수록 그 데이터의 타입을 변경하기 어려워진다.
- 객체는 자신만의 기능을 제공하며, 각 객체들은 서로 연결되어 다른 객체가 제공하는 기능을 사용할 수 있게 된다.
- 메서드를 호출하는 것이 메시지를 보내는 과정에 해당한다. 예를들어, `is.read(data)` 라는 명령이 있을 때 '`is`가 참조하는 객체에 `read()` 라는 오퍼레이션을 실행해달라는 메시지를 전송한다'는 것을 뜻한다
- "객체가 갖는 책임은 어떻게 될까?" 이 결정을 하는 것이 바로 객체 지향 설계의 출발점이다
- 객체가 갖는 책임의 크기는 작을수록 좋다 (`SRP`)
- 객체에 기능이 많아지면 절차 지향적인 구조를 갖게 된다

### 의존

- 객체가 다른 객체를 생성하거나 다른 객체의 메서드를 호출할 때, 파라미터로 전달받을 때, 이를 그 객체에 의존한다고 표현한다
- 의존의 영향은 꼬리에 꼬리를 문 것처럼 전파되는 특징을 갖는다
-  아래와 같은 코드의 경우 `AuthenticationHandler` 클래스 안에서 `Authenticator` 객체를 생성하고 있으므로 `AuthenticationHandler` 가 `Authenticator`에게 의존하고 있는 상황이 된다. 이는 `Authenticator` 클래스에게 변화가 생기면 `AuthenticationHandler` 클래스도 영향을 받게 된다.
- 예를 들어, `auth.authenticate()` 의 반환 타입을 `boolean` 이 아니라 예외를 던지는 `void`로 바꾸게 된다면 `AuthenticationHandler` 클래스의 로직도 바꿔야 된다

```java
public class AuthenticationHandler {
    public void handleRequest(String inputId, String inputPassword) {
        Authenticator auth = new Authenticator();
        if (auth.authenticate(inputId, inputPassword)) {
            // 아이디와 암호가 일치할 때 처리
        } else {
            // 일치하지 않을 때 처리
        }
    }
}
```

### 캡슐화

- 캡슐화를 위해 **Tell, Don't Ask**, **데미테르의 법칙** 을 지키자
- 데이터를 읽는(getter) 것은 데이터를 중심으로 코드를 작성하게 만드는 원인이 되며, 절차지향적인 코드를 유도하게 된다.
- Tell, Don't Ask : 데이터를 물어보지 않고(getter를 쓰지 않고) 기능을 실행해달라고 말하라
- 아래 코드는 데미테르의 법칙의 예시 코드다.

```java
class A {
    private B b;

    public myMethod(OtherObject other) {
        // ...
    }

    /* 디미터의 법칙을 잘 따른 예 */
    public goodOfDemeter(Paramemter param) {
        myMethod();   // 자신의 메소드
        b.method();   // 자신의 필드의 메서드
        Local local = new Local();
        local.method();    // 직접 생성한 객체의 메서드
        param.method();    // 메소드의 인자로 넘어온 메서드
    }

    /* 디미터의 법칙을 어긴 예 */
    public badOfDemeter(Paramemter param) {
        C c = param.getC();
        c.method();    // 인자로 받은 객체에서 get()을 통해 가져온 뒤에 메서드를 꺼내는 경우
        param.getC().method();      // 위와 같음.
        param.paramValue.method();  // 위와 같음.
    }
}
```

- 객체 지향 설계 과정
    1. 제공해야할 기능을 찾고 세분화한다
    2. 그 기능을 알맞은 객체에 할당한다
    3. 객체 간에 어떻게 메시지를 주고받을 지 결정한다
    4. 1~3 반복 반복

## 다형성과 추상 타입

- 인터페이스에 정의된 기능을 실제로 구현하는 클래스를 콘크리트 클래스(concrete class)라고 부른다
- 추상화는 언제할까?
    - 기존 요구사항 : 파일에서 **바이트 데이터를 읽어와...**
    - 추가 요구사항 : 소켓에서 **바이트 데이터를 읽어와...**
    - 데이터를 읽어오는 것이 공통점이다. 이는 동일한 개념으로 추상화할 수 있다는 것을 의미한다.
    - 그 공통점을 인터페이스로 정의해서 `ByteSource` 타입을 사용할 수 있도록 한다.

```java
public interface ByteSource {
    public byte[] read();
}
```

`ByteSource` 타입만으로 동작하게 할 수 있지만 객체를 생성하는 부분에서 `if-else` 부분이 남아있기 때문에 여전히 함께 변경된다.

```java
// FlowController 클래스 안의 코드

ByteSource source = null;

if (useFile()) {
    source = new FileDataReader();
} else {
    source = new SocketDataReader();
}

byte[] data = source.read();
```

- 이는 ByteSource 타입의 객체를 생성하는 기능을 별도의 클래스(`ByteSourceFactory` 클래스)로 분리한 뒤, 그 객체를 사용해서 ByteSource 를 생성하면 된다
    - `create()` 메서드는 `ByteSource` 타입의 객체를 생성하는 기능을 제공함으로써 `ByteSource` 타입의 객체를 생성하는 과정을 추상화했다고 볼 수 있다.

```java
public class ByteSourceFactory {

    private ByteSourceFactory() {}

    public ByteSource create() {
        if (useFile()) {
            return new FileDataReader();
        } else {
            return new SocketDataReader();
        }
    }

    // ...
    // 싱글턴 패턴 적용
    private static ByteSourceFactory instance = new ByteSourceFactory();
    public static ByteSourceFacotry getInstance() {
        return instance;
    }
}
```

- 이렇게 되면 `ByteSourceFactory.getInstance().create()` 를 통해서 `ByteSource` 타입의 객체를 반환해줄 수 있다.
- 이는 `FlowController` 클래스의 코드에는 영향을 받지 않는다. 새로운 요구가 발생했다고 해도 `ByteSourceFactory` 클래스가 변경된다. 이로써 두 가지 유연함을 가진다.
    1. `ByteSource`의 종류가 변경되면 `ByteSourceFactory`만 변경될 뿐, `FlowController` 클래스는 변경되지 않는다.
    2. `FlowController` 의 제어 흐름을 변경할 때, ByteSource 객체를 생성하는 부분은 영향을 주지 않으면서 `FlowController` 만 변경하면 된다.
- 최초의 FlowController 클래스는 데이터를 읽어오는 객체를 생성하는 책임과 흐름을 제어하는 책임을 동시에 갖고있었다.
- 그러나 두 번의 **추상화를 통해서 책임을 분리할 수 있었다.**
    1. 데이터를 읽어오기 : **`ByteSource` 인터페이스 도출**
    2. `ByteSource` 타입을 반환하는 객체 생성하기 : **`ByteSourceFactory` 도출**
- 추상화가 되어있지 않은 코드는 주로 동일 구조를 갖는 `if-else` 블록으로 드러난다.
- 인터페이스를 작성할 때는 그 인터페이스를 사용하는 코드 입장에서 작성해야 한다.
    1. 예를 들어, 위의 예제에서는 `FlowController` 입장에서 작성해야 한다. `FlowController` 입장에서는 데이터를 읽어오는데 그 타입이 파일이냐 소켓이냐에 따라 달라지기 때문에 `ByteSource` 라는 인터페이스가 적절하다
- 테스트할 때도 사용할 대상을 인터페이스로 추상화하면 좀 더 쉽게 Mock 객체를 만들 수 있어 적합하다.

## 재사용 : 상속보단 조립

### 상속을 통한 재사용의 단점

1. 상위 클래스 변경의 어려움
    -  상속받으면서 의존하기 때문에 클래스를 변경한 여파가 계층도를 따라 하위 클래스에 전파된다.
    -  최악의 경우, 상위 클래스의 변화가 모든 하위 클래스에 영향을 줄 수 있다
2. 클래스의 불필요한 증가
    - 자바에서는 다중 상속이 불가능하기 때문에 2개의 클래스로부터 각 기능을 상속받으려면 한 개의 클래스만 상속받고 다른 기능은 별도로 구현해야 한다.
3. 상속의 오용
    - `class Container extends ArrayList<Luggage> {}` 와 같은 형태로 클래스를 구현했을 때 IDE의 자동완성에 Container 클래스에 있는 메서드 뿐만 아니라 ArrayList에 있는 모든 메서드가 나타나게 된다.
    - 만약 Container 클래스에 있는 메서드 명과 ArrayList에 있는 메서드 명이 같다면 다른 사람과 협업했을 때 혼란을 줄 여지가 생긴다

### 조립을 이용한 재사용

1. 조립(Composition)은 여러 객체를 묶어서 더 복잡한 기능을 제공하는 객체를 만들어내는 것이다
2. 필드에서 다른 객체를 참조해 조립할 수 있다.
3. 클래스가 불필요하게 증가하지 않으며 런타임에 setter 등으로 객체를 교체할 수 있다.
4. 필드에 있는 다른 객체를 통해 어떠한 요청을 그 다른 객체가 하도록 위임해줄 수 있다.
5. 다만 클래스의 구조가 복잡해진다.

-> 상속은 UI 위젯과 같이 기능이 완전히 확장되는 곳에 쓰고 그게 아니라면 **상속보다는 조립을 사용하자.**

## 출처

- [https://coding-start.tistory.com/264](https://coding-start.tistory.com/264)
- [책 : 개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴](https://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788969090010)
