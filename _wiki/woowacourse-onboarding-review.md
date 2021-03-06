---
layout  : wiki
title   : 우아한 테크코스 1주차 온보딩 리뷰
summary : 
date    : 2020-02-11 00:20:28 +0900
updated : 2020-03-03 23:21:09 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

처음으로 모르는 사람과 짝(페어) 프로그래밍을 하면서 생각보다 어려움을 느꼈다. 한 사람에게 끌려다닐 수도 있기에 5분마다 코딩하는 역할을 바꿔서 진행하는 원칙을 지켰어야 했는데 한 컴퓨터로 진행하다보니 한 사람은 코딩하고 한 사람은 조언을 주고 그런 방식으로 점차 진행됐다. 

그래도 시간이 지나면서 한 사람이 하는 걸 인식해 조금씩 바꿔가면서 진행했고 서로 의견도 잘 주고받으면서 빠르게 진행됐던 것 같다. 라흐에게 특히나 좋았던 부분은 서로 의견이 맞지 않으면 그에 대한 근거를 말해 나를 이해시키려고 하는 노력이 보기 좋았다.

연극 또한 처음이었지만 모든 사람들이 많은 아이디어를 내줬고 누군가 의견을 이야기하면 잘 들어주었다. 다만 막상 주말이 되니 대부분 자기 자신의 시간을 투자하기가 어려웠던 부분이 있었다. 누굴 탓하기 보다는 공지를 띄워서 좀 더 계획적으로 한다든지 그랬으면 전달이 더욱 잘 됐을 것 같은데 아쉬웠다.

앞으로 좀 더 계획적으로 준비하고 누가 나서지 않으면 먼저 나서서라도 적극적으로 내 의견을 자세히 말하도록 노력해야겠다.

> 개인적으로 기능적인 측면에서 괜찮게 짰다고 생각했지만 컨벤션을 봤을 때 지켜지지 않은 게 너무나도 많았다. 역시 기본이 중요하다.

### 우테코의 말말말

1. 자신의 시간과 돈을 들여 **스스로 성장하려는 자세를 갖추자**
2. 테스트 코드 구현까지 완료해야 기능 구현을 완료하는 것으로 생각해라
3. **동의 되지 않는 권위에 굴복하지 마라**
4. 아닌 것에 아니라고 말할 수 있어야 한다
4. 항상 의구심이 들어야 한다
5. 핸드폰을 끄자 (**환경을 만들자**)
6. 페어 프로그래밍을 할 때 끌려가지 말고 주눅들지 말자
7. 상대방과 소통할 때 칭찬할 건 칭찬하되, **껄끄러운 이야기도 할 수 있어야 한다**
8. 회고는 감정 공유만으로도 가치가 있다
9. 회고를 할 때 **사람이 주어가 되지 않게 하는 것이 중요하다**
10. 회고를 할 때 다음 행동으로 구체적인 action plan을 찾아라
11. 사람이 아니라 행동에 대해 언급하라
12. 오픈소스, 프레임워크, 레퍼런스, API 문서를 알아볼 때 테스트코드를 이용하자
	1. 스프링의 레퍼런스 문서를 공부한다고 하면 SpringReference라는 프로젝트를 만들고 테스트 코드로 만들어서 직접 확인해본다.
13. **그냥 노력하는 것이 아니라 의식적으로 목적을 갖고 노력하자**
14. 


### 내가 받았던 피드백

1. 객체 지향적으로 `domain, view`와 같이 **객체가 하는 역할을 분명히 알고 클래스를 분리하자**
2. 객체 분리를 통해서 객체 참조가 최대한 적어지도록 하자
3. 하나만 틀릴 때 `return false` 하는 경우, List에 넣고 `contains()`를 하거나 `stream()`의 `allMatch()`를 사용하자.
4. 최대한 `private static final`을 통해 상수화로 만들자
5. 로직은 함수로 최대한 분리하되 네이밍을 잘해서 한 눈에 알아볼 수 있도록 하자.
6. `(int)`와 같은 강제 형변환은 하지말자.
7. 상수화가 가능한 것이면 `enum`을 생각하자.
8. `return`타입이 `boolean`인 경우, 로직을 바로 `return`에 사용해서 **if문을 쓰지 않도록 해보자**
9.  두 개의 매개변수로 어떤 함수를 적용하고 싶을 때 타입이 같다면 `BinaryOperator<T>`, 다르다면 `BiFunction<T, U, V>`를 사용해보자 (람다식을 많이 사용해보자)


### 다른 크루들의 피드백

- 사진으로 올릴까 아니면 내가 글로 쓸까 고민하다가 글로 쓸 수 있는 부분은 최대한 글로 적으려고 노력했다. 사진을 복붙하는 것보다는 내가 직접 글로 쓰면 더 머리에 잘 들어갈테니 :)

1. `Custom Exception` 클래스를 만들 경우, 규모가 커질수록 Exception이 더욱 늘어나고 관리하기가 힘들어진다. `Custom Exception`이 발생했을 때 비즈니스 로직적으로 어떤 액션을 취해야 하는 경우가 아니라면 굳이 `Exception`을 만들지 않아도 된다.
2. 인라인으로 집어 넣으냐 마느냐는 한눈에 알아볼 수 있으냐 없느냐로 판단한다.
3. 상수화된 String에 `%s`를 넣어서 `String.format()`을 사용해 더 세세하게 예외처리 String을 줄 수 있다.
4. enum에서 values()를 주면 전체를 가져올 수 있다. 그래서 `Arrays.stream(values())`를 주면 전부 돌게 할 수 있다.
5. 인터페이스에 `@FunctionalInterface`를 사용해서 람다식을 가능할 수 있게 해줄 수 있다
6. 생성자를 통해 만들어주면서 동시에 `validate()`를 넣어서 유효성 검사를 해준다. 이를 통해서 `private validate()`같은 얘들은 생성자에 들어가기 때문에 테스트코드에 들어가지 않는다.
7. List 타입인 numbers를 `new LinkedList<>(numbers)`를 통해 넣어줄 수 있다.
8. `stream().filter(클래스명::is메서드명)`의 방식으로 boolean처리를 통해 바로 걸러줄 수 있다.
9. `is` 접두어를 갖는 메서드는 `boolean` 타입을 반환하는 것이 컨벤션이다
10. `catch` 절에는 **현재 발생할 것으로 판단되는 예외**를 넣어주자. 모든 예외를 다 catch하는 `Exception`을 넣어버리면 다른 이유로 에러 발생 시 원인 파악이 어려울 수 있다
11. if문 하드코딩을 enum으로 바꾸도록 해보자
12. 테스트 코드의 목적 중 하나는 테스트의 자동화이므로 테스트에서 `System.in` 과 같이 입력받으면 안된다
13. 변경 가능한 값들을 클래스 필드로 두는 것은 동기화 문제로 이슈가 발생할 수 있으니 지역변수 혹은 인스턴스 변수로 사용해라
14. `return null`을 쓰게 되면 NPE를 발생시킬 위험이 있으므로 `Optional`을 활용하자. 즉 `null`을 돌려주기보다 예외를 던지자
15. `Enum` 타입을 반환하는 메서드는 `from`, `of`와 같은 네이밍을 사용하자
16. 가능한 `private`을 쓰자
17. String을 상수화하고 값이 존재할 확률이 높은 String을 앞에 둬서 `equals`로 비교하면 NPE를 방지할 수 있다. (Ex. `"+".equals(value)`)
18. 무조건 인터페이스를 만든다고 좋은 게 아니다. 개발자가 스스로 통제할 수 있는 영역은 확장 여부가 확실한 게 아니라면 인터페이스를 적용하지 않는다. 명확한 설계가 아니라면 당장 필요한 것만 구현하는 게 가장 좋다
19. 반환형이 `void`인 메서드는 지양하자
20. `enum`에서 상수값을 찾아 반환하는 메서드는 `valueOf`로 명명하는 경우가 많다
21. 함수적 반복이 확실히 유리할 때 `stream`을 쓰는 게 좋다. 중간에 `return` 하거나 `break` 하는 경우에는 for문으로 하는 게 좋다
22. `NumberFormatException`은 `IllegalArgumentException`을 상속받은 구현체다.
23. 예외 처리를 `true/false`가 아닌 `exception`으로 처리하자
24. 테스트 코드에서 검증 값은 이미 계산된 값이 들어와야 한다. (Ex. `.isEqualTo(10)`)
25. Enum의 `values()`는 메모리에 한 번만 할당된다. 시간 복잡도는 `O(n)`이다. 다만 보통 Enum에서는 관리되는 값이 적기 때문에 시간복잡도는 그리 중요하지 않다.
26. 테스트 코드가 아니면 메서드에 `_`를 사용하지 않는다
27. 상위 메서드를 테스트한다면 하위 메서드는 할 필요 없지만 '클라이언트에게 사용법을 알려준다'는 관점으로 하위 메서드 테스트도 만들면 좋다
28. `!`와 같은 부정문은 가독성을 해칠 수 있다.
29. 생성자가 여러 개라면 생성 시 로직이 변경됐을 때 모든 생성자를 변경해야되는 일이 생길 수 있다. 최종적인 초기화는 하나의 생성자에서 처리해주자(Ex. `public Operand(String input) {this(~~)}`)
30. 상수를 하나의 클래스에 모아두기 보다 실제로 사용하는 클래스에 위치시켜 응집도를 높이는 게 더 좋다
31. `toString()`은 로직(`equals()`와 같은) 용도가 아니다.
32. 좋은 이름을 지으려면 시간이 걸리지만 좋은 이름으로 절약하는 시간이 훨씬 더 많다.
33. 어떠한 조건을 위해 의도적으로 `try-catch`를 사용하면 안된다. `try-catch`는 예외를 처리하는 용도로만 써야 유지보수할 때 도움이 된다(Ex. 정수가 아닌 값을 체크할 때 `try-catch`로 잡지 말고 **정규표현식**으로 잡아라)
34. `new Scanner(System.in)`은 `static`으로 빼서 한 번만 선언하자
35. 반복문의 처음 `index` 값은 굳이 상수화해줄 필요가 없다. 누구나 아는 사항이기 때문에 상수화를 해주면 오히려 가독성에 좋지 않다
36. `final`이 변경을 막아주진 않는다. 변경이 불가능한 리스트로 초기화 해주기 위해서는 `Collections.unmodifiableList()`를 사용한다
37. 람다식에서 `{}`를 이용해 작성 가능하지만 가독성이 떨어지기 때문에 일정 이상 길어진다면 지양하는 게 좋다
38. 테스트에서는 하나의 단위만 테스트하자
39. 검증 로직은 도메인에서!

### 배운 내용
- 단위 테스트와 TDD는 다르다
- 단위 테스트는 프로덕션 코드를 구현하고 나서 작은 단위를 테스트하는 것 (Ex. 알고리즘)
- 긴 문자열을 더하는 상황일 경우 `StringBuilder`를 활용한다
- `Generic`은 특정 타입으로 제한해 타입 안정성을 제공한다
- `Generic`을 사용하지 않는다면 `ArraysList list = new ArrayList();` 같은 곳에 여러 타입을 집어 넣어 꺼낼 때마다 형변환을 해줘야 한다


```java
// 테스트 메서드 전에 실행된다
@BeforeEach

// 각 변수에 해당하는 값을 인자로 줄 수 있다.
@ParameterizedTest
@CsvSource(value = {"0:-:+", "1:*:*", "3:-:-"}, delimiter = ':')

// String 배열을 인자로 주고 싶을 때
@ParameterizedTest
@MethodSource("stringArrayProvider")

static Stream<Arguments> stringArrayProvider() {
        return Stream.of(
                Arguments.of(new String[]{"4", "*", "3", "/", "5", "-", "20"}, -17.6),
                Arguments.of(new String[]{"2", "-", "1", "*", "3", "+", "2"}, 5)
	);
}
```

#### assertj 메서드

- `assertThat()`
- `assertThatThrownBy(() -> {}).isInstacneof(~~.class)`

### 출처
- [http://toby.epril.com/?p=419](http://toby.epril.com/?p=419)
