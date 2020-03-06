---
layout  : wiki
title   : 우아한 테크코스 2주차 자동차 경주 리뷰
summary : 
date    : 2020-02-21 17:55:58 +0900
updated : 2020-03-05 15:58:41 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

이번 주에 새로운 사람과 페어 프로그래밍을 시간을 가졌다. 전에 페어 프로그래밍을 했을 때 시간을 제대로 지키지 않아 한 명이 많은 시간동안 코딩하는 상황이 발생했기에 이번에는 그러지 않기로 다짐하고 5분씩 재면서 코딩을 했다. 하다보니 너무 짧은 것 같아 10분 정도로 재고 했더니 나름 괜찮게 서로 코딩했다.

이번에도 페어를 하면서 많은 걸 느꼈다. 어떤 모르는 부분에 있어서 처음에는 잘 대답했지만 그 질문에 대해 "그건 왜 그런데?"라고 다시 물어봤을 때 제대로 대답하지 못했다. "왜?"라는 것에 중점을 두고 스스로 고민해보고 공부해야겠다는 생각이 들었다. 

잘했던 부분은 구현을 다 하고나서도 페어를 깨지 않고 구조에 대해 서로 이야기하면서 이해를 높여 설계에 대한 인사이트를 얻을 수 있었던 것이다. 누군가 프로젝트를 왜 그렇게 짰냐고 물어봤을 때 바로 대답할 수 있을 만큼 그렇게 짠 이유를 설계에 녹여냈던 게 좋았다.

> 생각했던 것보다 도메인 설계가 너무나도 중요했다. 객체의 역할을 생각하며 설계하자

## 우테코의 말말말

- 주변의 크루들과 경쟁하지 말고 **어제의 나와 경쟁해라**
- 미션만 하지마라.
- 일정 수준의 결과물을 정해진 기간 내에 무조건 구현해야 한다
- 사용자에게 가치를 줄 수 있어야 한다
- 동작하는 코드를 만들어야 한다. 일단 만들고 개선시켜 나가자
- **TDD가 몸에 익도록 하자**
- 요구사항이 바뀌면 바뀐 부분에 대해 테스트코드를 추가한다
- 요구사항에 적합한 설계가 무엇인지 끊임없이 고민하자
- 반박을 하려면 실제로 해본다음에 반론을 제기한다
- **자신을 믿고 자신의 페이스를 유지해라**
- 불안하다면 **휴식을 취해라**
- **꾸준히 가는 게 중요하다**
- 한 달 전에 작성했던 내 코드가 쓰레기처럼 보여야 한다
- 빨리 개발하는 개발자가 좋은 개발자가 아니다. 이미 있는 코드를 좀 더 읽기 좋게, 유지보수하기 좋게 만드는 게 진짜 개발자다.
- 능력이 좋은 개발자일수록 이직을 많이 한다.

## 내가 받았던 피드백

- `Random`은 그 자체로 랜덤이기 때문에 테스트하기 힘든 부분이다. `Random`이 `Car`의 `move()`에 들어가있다면 의존관계가 맺어지고 상위노드인 `RacingGame` 클래스 또한 모두 의존되어 테스트하기 힘들어진다.
- 이렇게 테스트하기 힘든 경우, **의존관계를 없애기 위해 `Random`을 상위 노드로 옮기면** 그 아래는 테스트하기 쉬워진다.
- 예를 들어, `Position` 에 있던 `Random` 클래스를 `Position` 상위인 `Car` 로 옮기고 다시 `Car`에서 `Cars` 로 옮겨 여기서 생성하고 매개변수를 `int` 형으로 받아 넘겨주면 테스트하기 쉬워진다.
- 생성자를 매개변수가 적은 쪽에서 많은 쪽을 호출하는 게 좋다.
```java
    public Car(String name) {
        this(INIT_POSITION, name);
    }
    
    public Car(int position, String name) {
        this.position = position;
        this.name = name);
    }
```
- Car 객체에게 MaxPosition인지 물어보기(**메세지 보내기**)
```java
    if(car.isSame(maxPosition)) {
        winners.add(car);
    }
```
- `String`에 `trim()`을 하기 전에 `null`값 예외처리를 먼저 하자
- 객체의 역할에 대해서 생각하자
- `for`문을 돌면서 `add`하는 경우 `create()`와 같이 메서드로 빼자


## 다른 크루들의 피드백

1. 입력받을 때 name만 받으므로 name만 받는 생성자가 추가되면 더 보기 좋다
2. `String Pool`에 있는 문자열도 GC 대상이 될 수 있어 객체의 비교는 스트링이더라도 `equals`를 사용한다
3. 객체를 반복 생성하지 않도록 static으로 관리하자
4. 객체를 생성하는 것은 해당 객체의 생성자가 책임을 가지는 것이 맞다. 하지만 생성하는 과정이 복잡할 경우 Factory와 같은 외부에서 생성한다
5. View가 도메인에 접근할 수 있는 문제를 없애기 위해 DTO와 같은 객체를 사용한다
6. 테스트코드를 작성할 때 `@ParameterizedTest`와 `@ValueSource(strings = {})` 에 `@NullAndEmptySource`를 함께 적용시켜줄 수 있다
7. 테스트코드도 유지보수해야될 대상이다
8. `Optional`을 사용할 때 nullable을 명시적으로 제거해주는 코드를 작성해야한다. `get`보다는 `orElse`를 사용하여 값을 추출하자
9. '0부터 9사이의 랜덤 숫자 생성'과 같은 API에 대한 테스트는 진행하지 않는다
10. `Stream.foreach()` 는 전통적인 `for-loop` 보다 오버헤드가 크다
11. 테스트 코드에 한글로 메서드 명을 지을 때 클래스에 `@SuppressWarnings("NonAsciiCharacters")` 를 통해 IDE의 경고를 지울 수 있다.
12. `toString()`은 어떤 속성이 아니라 그 객체가 담고있는 데이터 전체를 표현해야한다
13. maxPosition 의 값을 구할 때 `cars.stream().mapToInt(Car::getPosition).max().orElse(0);`
14. `InputView`, `OutputView` 와 같이 유틸성이 있는 클래스는 객체로 생성될 일이 없으니 `private` 생성자를 추가해 인스턴스화를 막을 수 있다. (Ex. `Collections, Arrays, Collectors` 와 같은 클래스들도 생성자가 `private` 으로 되어있다)
15. `InputView`, `OutputView` 처럼 view 역할을 하는 메소드가 도메인에 있으면 안된다.
16. 콘솔에서 전체적인 MVC 패턴 구조

```java
public static void main(String[] args) {
        String carNames = InputView.getCarNames();
        int tryNo = InputView.getTryNo();

        RacingGame racingGame = new RacingGame(carNames, tryNo);
        RacingResult result = null;
        while(racingGame.isEnd()) {
            result = racingGame.race();
            OutputView.printResult(result);
        }
        OutputView.printWinners(result); // RacingResult에서 우승자를 구해 출력
    }
```
17. OS마다 다른 행 구분자 처리를 위해서 `System.lineSeparator();` 를 써줄 수 있다.
19. null인지 확인하는 경우는 `Objects.isNull()`을 사용한다
20. 여러 클라이언트가 여러 게임을 동시에 할 수 있다고 생각하고 설계해보자
21. 정적 팩토리 메서드는 생성자 아래에 있는 것이 관례다
22. 특별한 이유가 없다면 인스턴스 변수는 항상 `private` 으로 선언
23. `List<Car>` 를 구할 때 `Arrays.stream(carNames).map(carName -> new Car(carName)).collect(Collectors.toList());`
24. `Util` 이란 패키지명도 너무 광범위하므로 `StringUtils` 라는 패지키명으로 바꾸자
25. 매 호출마다 인스턴스를 생성하는 것은 static을 고려하자
26. `final` 은 변하지 못하도록 의도할 때 선언해주자. 너무 남발하면 가독성을 해칠 수 있다
27. 테스트를 위해 무조건 `public` 이 아닌 `default` 접근제한자도 생각하자

## 배운 내용

### TDD & 테스트 코드

- TDD를 잘하려면 요구사항을 세세하게 분석하고 우선순위를 잘 정해야 한다.
- TDD는 변화에 대한 두려움을 줄여준다.
- TDD 사이클
    - `Test fails -> Test passes -> Refactor -> Test fails -> ...`
- TDD를 하면 한 번에 한 가지에만 집중할 수 있어서 좋다
- 클래스명이나 변수명은 대충 짜도 괜찮으니 **테스트코드를 먼저 짜고 프로덕션 코드를 짜자**
- TDD가 막막하다면?
    - 일단 구현해서 **도메인 지식을 쌓는다**
    - 구현한 모든 코드를 버리고 구현할 기능 목록을 작성하고 도메인을 설계한다.
    - 기능 목록 중 가장 만만한 녀석부터 TDD로 구현한다.
    - Object 그래프를 만들어 다른 Object와 의존 관계를 가지지 않는 마지막 Node를 찾아 테스트가 가능한지 확인한다(Ex. Car)
    - 테스트하기 어려운 코드는 **Object 그래프의 상위로 이동시킨다**
- 대표적으로 테스트하기 어려운 코드
    - Random, Shuffle, 날짜, REST API, DB API
- TDD를 잘 하려면 **객체 분리를 잘 해야된다.**
    - TDD는 하위 노드를 예측하고 테스트를 먼저 하는 방법이다. 즉 안에 있는 걸 먼저 테스트해서 개발하는 `inside → outside` 방식이다.
    - 단순히 구현하는 개발방식은 `outside → inside` 방식이다. 그래서 구현해가면서 객체를 분리해도 된다.
- 테스트코드에 `//given//when//then`을 달아주는 것도 좋지만 너무 종속되진 말아라
- test를 위해서 프로덕션 코드를 고친다면 이런 건 설계가 잘못됐다고 할 수 있다.
- 즉, 테스트를 위해서 메서드를 추가해야된다거나 `private`으로 되어있는 프로덕션 코드를 `public`으로 바꿔야 한다면 그건 설계가 잘못된 것이다.
- 설계가 잘못되지 않았다고 생각한다면 `private`을 삭제하자. 사람마다 다르다.
- **테스트는 항상 100% 통과해야된다.**
- 테스트코드도 유지보수가 필요한 코드이기 때문에 모든 케이스를 다 테스트하지 않는다. **경계값만 테스트하는 게 중요하다.**

### 인스턴스와 클래스

- 인스턴스 필드 : 인스턴스의 상태 정보
- 인스턴스 메소드 : 인스턴스를 생성 후 메세지를 보낼 수 있다.
- 클래스 필드 : 여러 인스턴스에서 공유하는 정보가 있는 경우
- 클래스 메소드 : 보통 유틸리티 메소드라고 부름
- 클래스의 모든 메소드가 클래스 메소드일 경우 생성자를 `private`으로 만들어 명시적으로 클래스를 생성할 수 없도록 하는 것이 더 명확하다.
- 클래스 필드는 여러 인스턴스에서 공통된 값을 유지해야 하는 것이 있는 경우 사용한다
    - 예를 들면, Card라는 클래스가 있을 때 카드의 무늬, 숫자는 인스턴스 필드가 되고, 카드의 폭과 높이는 클래스 필드가 된다.
- 인스턴스 변수를 가지지 않으면 인스턴스를 생성할 필요가 없으니 `static` 을 붙여 클래스 메서드들로 구현해주자
    - 예를 들면, `Math` 클래스의 경우 필요한 값들을 모두 매개변수로 받기 때문에 모두 클래스 메서드다.
- 인스턴스 필드와 클래스 필드를 선언해줄 때 컴파일 에러로 헷갈린다면 쓰이는 시점을 통해 파악할 수 있다. 가령, `static` 이 붙는다면 먼저 메모리에 올라가기 때문에 클래스 필드가 존재하는 시점에 인스턴스 필드가 존재한다는 것을 보장할 수 없어 컴파일 에러가 뜬다. 그래서 static이 붙은 클래스 메서드에는 인스턴스 변수의 사용을 허용하지 않는다.

### 우아한 객체지향

- A와 B사이 의존성이 있다는 말은 'B가 변경될 때 A도 함께 변경'된다는 말이다.
- 위에 `import`가 있다면 dependency가 있다고 할 수 있다.
- 양방향 의존성을 피하고 단방향으로 바꿔야 한다.
- 의존성이 필요없다면 제거해라.
- 객체에서는 관계에 방향성이 필요하다. 이를 위해서 객체가 어떤 방향으로 협력하는지 알아봐야 한다. 즉 어떤 객체가 어떤 객체한테 메세지를 보내야하는지 알아야 한다.
- 관계의 방향 = 협력의 방향 = 의존성의 방향

### 컨벤션 & 클린코드

- 변수명으로 자료구조의 이름을 쓰지마라 (ex. carList)
- 가능하면 immutable한 객체로 만들어라
- `stream()` 을 통해 indent를 줄이자
- `setter`는 악이라고 생각해라 `getter` 또한 **정말 필요할 때만 쓰자**
    - `getter`를 쓰면 중요한 정보들까지 다 넘어갈 수 있기 
    - 때문에 DTO를 만들어서 안전한 정보들만 View쪽에 보여줄 수 있도록 하자
    - 그렇다고 `getter` 를 아예 안 써야된다는 고정관념에 사로잡히진 말자
- Layer에 맞는 Exception을 던져라

### 도메인 설계

- 요구사항 분석을 통해 대략적인 설계(**객체 추출**)을 먼저 하자
- UI, DB 등과 의존관계를 가지지 않는 도메인 설계를 고려하자
- 인스턴스를 생성하는 순간 **단일 책임 원칙을 위배하는 건 아닌지, 클래스를 분리할 수 있을지** 생각해보자
- Domain 부분에 단위 테스트를 집중적으로 하라
- **Domain 설계**를 어떻게 하는지가 가장 중요하다.
- `++`이 아니라 `+ NUMBER`로 해서 나중에 바뀌어도 쉽게 바꿀 수 있도록하자
- 원시 값이나 문자열을 객체로 포장하고 생성자에 `validate()` 를 넣어 보장된 값이라는 것을 말해주자
- `getter`를 쓰는 것이 아닌 `if(car.isMovable())` 처럼 객체에 메세지를 보내자
- 인터페이스 기반으로 설계하면 더 나은 설계가 된다.
- 리턴값이 `void`인 메소드는 지양하자. **`return` 받는 형태가 테스트하기 좋다**
- 입력을 받고 예외처리로 인한 재입력을 받을 때 재귀로 하면 메인 스택에 쌓이기 때문에 **`while`**이 더 낫다.
- 무엇보다 현재 요구사항에 부합하는 설계가 좋다

### String, StringBuilder, StringBuffer

- String은 불변객체라 String에서 `+` 연산자를 쓰면 매번 String 인스턴스를 생성한다. 그런데 JDK 1.5 이상에서는 컴파일할 때 StringBuilder로 컴파일되도록 변경됐다고 한다. 이러한 이유로 JDK 1.5 이상 버전을 쓴다면 String에 `+` 연산자를 써줘도 성능상 큰 이슈는 없다
    - 다만 성능 비교한다고 for문에 `+` 을 사용하면 `new StringBuilder()` 를 계속 생성하기 때문에 느려지는 건 똑같다.
    - 그래서 for 문에 `+` 를 사용한다면 미리 StringBuilder 객체를 만들어놓고 `append()` 를 통해서 반복을 도는 것이 맞다.
- StringBuilder는 동기화를 지원해주지 않는다.
- StringBuffer는 동기화를 지원해 멀티스레드 환경에서 적합하다

### 원본값 보호하기

- 컬렉션에 추가, 삭제 등을 막을 때는 `Collections.unmodifiableXXX()` 를 통해서 막아줄 수 있다
- 완전한 원본값을 막아주기 위해서는 해당 데이터를 VO로 만들어 상태를 변경하는 메소드를 아예 넣지 않으면 된다.

### if를 쓰지 않는 방법

1. 메소드 추출
2. 인터페이스 추출
3. Simple Factory 패턴을 사용해 그 안에 if문을 넣어 객체 분리
4. Enum 기반 리펙토링 (속성이 정적이라면)
5. Entity 기반 리펙토링

## 출처 및 도움되는 링크들

- [String, StringBuffer, StringBuilder](https://www.slipp.net/questions/271)
- [http://blog.naver.com/PostView.nhn?blogId=windziel&logNo=60050514143](http://blog.naver.com/PostView.nhn?blogId=windziel&logNo=60050514143)
- [https://os94.tistory.com/153?category=814775](https://os94.tistory.com/153?category=814775)
- [if를 없애기 위한 방법들](http://redutan.github.io/2016/03/31/anti-oop-if)
- [https://www.slipp.net/questions/350](https://www.slipp.net/questions/350)
- [마틴 파울러의 TellDontAsk](https://martinfowler.com/bliki/TellDontAsk.html)
- [Domain Model vs DTO](http://toby.epril.com/?p=99)
- [static에 대해서](https://vaert.tistory.com/101)
- [전략패턴](https://limkydev.tistory.com/84)
- [final은 언제 사용할까](https://blog.lulab.net/programming-java/java-final-when-should-i-use-it/#fn:4)
- [어떻게 테스트할 것인가](https://www.slideshare.net/ssuser59a869/ksug-2019?fbclid=IwAR2UcYpT58l7AUEPj8vAXIUpllk4meCTlLk4aGDZJSnaECgMwpRR1sVkYAc)
