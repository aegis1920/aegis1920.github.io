---
layout  : wiki
title   : 이팩티브 자바 3판 요약본
summary : 
date    : 2021-04-22 23:51:44 +0900
updated : 2021-04-22 23:53:11 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

이 글은 [이팩티브 자바 스터디](https://github.com/Meet-Coder-Study/book-effective-java)에서 진행한 것을 요약한 글입니다. 이팩티브 자바 아이템은 총 90개의 아이템으로 그 수가 적지 않습니다만 한 번에 모아두면 나중에 찾고 수정할 때 편할 것 같아 한 번에 올립니다.

잘 이해가 가지 않는 아이템에 대해서는 코드를 작성했습니다. [링크](https://github.com/aegis1920/my-lab/tree/master/effective-java)

점진적으로 수정하고 추가하겠습니다 :) ㅎㅎ

## 아이템 1 - 정적 팩토리 메서드를 사용하라

new를 통해서 객체를 생성하는 게 아니라 static method를 만들어 그 안에 new를 넣는 방법

- 정적 팩터리 메서드 장점
    - 이름을 가질 수 있다
    - 해당 데이터를 캐싱해놓으면 인스턴스를 매번 새로 생성(new)하지 않아도 된다
    - 반환 타입의 하위 타입 객체를 반환할 수 있다
- 정적 팩터리 메서드 단점
    - 상속을 하려면 public이나 protected 생성자가 필요한데 정적 팩터리 메서드만 제공하면  모두 private이므로 하위 클래스를 만들 수 없다.
    - 프로그래머가 정적 팩토리 메서드를 찾으려면 그 안까지 들어가야 한다.

## 아이템 2  - 생성자의 매개변수가 많을 때는 빌더를 고려하라

1. 텔레스코핑 생성자 패턴
    1. 생성자의 매개변수를 계속 추가해서 생성하는 방법
2. 자바빈즈 패턴
    1. setter 사용
    2. 불변이 아니게 되므로 추천하지 않음
3. 빌더 패턴
    1. Builder라는 객체를 만들고 해당 객체 안에서 .을 통해서 체이닝하는 방법
    2. Builder라는 객체를 또 만들어야 하기 때문에 성능상 문제가 될 수 있다
    3. 보통 매개변수 4개 이상될 때 사용한다

### 왜 Entity의 생성자에 Builder 패턴을 쓸까

단순히 생각해보면 new를 통해 객체를 생성하는 것과 builder 패턴을 통해 객체를 생성하는 건 매개변수로 봐도 차이가 없다. 그럼 어떤 차이가 있을까

일단 가독성이 좋다. 그리고 new를 통해 객체를 생성하게 되면 어떤 순서의 인자에 어떤 값이 들어가는지 알 수 없다. (인텔리제이는 보여주지만 원래는 없다) 근데 Builder 패턴을 쓰면 어떤 함수에 어떤 값을 넣는지 알 수 있다. 일단 직접 느끼는 차이는 이것뿐.

## 아이템 3 - private 생성자나 열거 타입으로 싱글턴임을 보증하라

- private 생성자로 만들면 다른 곳에서 생성자를 만들 수 없다.
- 싱글턴으로 만드는 방법은 public static final 필드, 정적 팩터리 메서드, 열거 타입 등의 방식이 있다.
    - 다만 직렬화하는데 문제가 있다
- 이 중에서 열거 타입이 가장 좋다.

## 아이템 4 - 인스턴스화를 막으려거든 private 생성자를 사용하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-4.html)

> 생성자가 없을 때 기본생성자는 자동으로 만들어진다
정적 변수와 정적 메서드만 있는 유틸리티 클래스가 다른 곳에서 인스턴스를 생성할 이유가 없다
다른 곳에서 생성자를 호출하지 못하도록 생성자의 접근제한자를 private으로 만들자

## 아이템 5 - 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

1. 의존 객체를 setter사용해서 하기 → 불변이 아니게 되기 때문에 사용하지 말자
2. 의존 객체 주입 패턴을 사용하자
    1. 생성자의 매개변수로 필요한 자원을 넘겨주는 방식
    2. 장점
        1. 자원이 몇개든 의존관계가 어떻든 상관없이 잘 동작한다
        2. 유연하고 테스트가 쉽다

## 아이템 6 - 불필요한 객체 생성을 피하라

- Null을 사용할 게 아니라면 Integer로 하지 말고 기본타입인 int로 하자
- 비싼 객체라면 캐싱해서 재사용하자

### String 생성 시, hashCode() vs System.identityHashCode()

- String 객체의 hashCode()가 재정의되어있다.
- Object의 hashCode()가 아닌 String의 hashCode()가 사용된다.

## 아이템 7 - 다 쓴 객체 참조를 해제하라

- 다 사용한 객체는 null을 할당해서 참조를 해제하자

## 아이템 8 - finalizer와 cleaner 사용을 피하라

- 보통 finalizer와 cleaner는 자원 회수를 위해 사용되나 부작용이 많다. 사용하지 말자.
- 스스로 구현할 수 있는 AutoCloseable을 사용하고 try-with-resource 안에 넣어서 자동으로 close 되도록 하자

## 아이템 9 - try-finally 보다는 try-with-resources를 사용하라

- 자원 회수할 때는 무조건 try-with-resource를 사용하자.
    - InputStream#close(), OutputStream#close(), java.sql.Connection#close()
- 코드도 짧아지며 가독성이 좋아지고, 예외정보도 훨씬 유용하다

## 아이템 10 - equals는 일반 규약을 지켜 재정의하라

- 꼭 필요한 경우가 아니면 equals를 재정의하지 말자
- 재정의할 때는 핵심 필드를 모두 빠짐없이 다섯 가지 규약을 확실히 지켜가며 비교하자.
- 재정의할 때는 **객체의 식별성이 아니라 논리적 동치성을 확인하고 재정의하자**

## 아이템 11 - equals를 재정의하려거든 hashCode도 재정의하라

- equals를 재정의 했다면 hashCode도 반드시 재정의해야한다
- 만약 hashCode를 항상 같게 한다면 hashTable의 Map의 경우 한 곳에 계속 쌓인다.

## 아이템 12 - toString을 항상 재정의하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-12.html)

> Object 클래스의 toString()을 그대로 사용하면 클래스이름과 해시코드가 있는 문자열이 나온다
해당 문자열은 개발자가 알아보기 힘드니 사용하려는 객체의 toString()을 재정의해서 알아보기 쉽게 만들자
toString()을 재정의할 때는 ‘객체 스스로를 표현하고 있나’를 생각하고 순환 참조를 조심하자!

## 아이템 13 - clone 재정의는 주의해서 진행하라

- clone() 메서드를 쓰지 마라.
    - 왜냐면 내부 필드를 복제하는 것도 따로 만들어줘야 한다.
- 그냥 복제하는 메서드를 따로 만들어라.
- Collections의 copy 메서드도 모두 접근해서 복제한다.

## 아이템 14 - Comparable을 구현할지 고려하라

> 값 클래스를 작성할 때 순서가 명확하다면 반드시 Comparable 인터페이스를 구현하자

- Comparable은 인터페이스를 구현한 객체 스스로에게 부여하는 한 가지 기본 정렬 규칙을 설정한다.
- Comparable을 구현하면 클래스의 인스턴스들에는 순서가 있음을 뜻하게 된다.
- Arrays.sort() 메서드는 자동으로 Comparable에 구현되어 있는 compareTo() 메서드를 호출해서 사용한다.
    - String 클래스는 Comparable이 구현되어 있어서 문자열로 sort 가능한 것
- 클래스안에 순서가 있다면 Comparable을 구현할 지 고려하자
- `compareTo()` 에서 -로 비교하면 Overflow가 날 수 있으니 `객체.compareTo()`를 사용하자
- 아래와 같이 기준 정렬을 만들면 훨씬 가독성이 있다.

```java
private static final Comparator<Student> COMPARATOR =
      Comparator.comparingInt((Student student) -> student.grade)
              .thenComparing((Student student) -> student.name)
              .thenComparingInt((Student student) -> student.age);
```

## 아이템 15 - 클래스와 멤버의 접근 권한을 최소화하라

> 모든 클래스와 멤버의 접근성을 최대한 좁히자

- public으로 선언한다면 API가 되므로 하휘 호환을 위해 영원히 관리해줘야 한다
- 클래스의 공개 API를 세심히 설계한 후, 그 외의 모든 멤버는 private으로 만들자
- public 클래스는 상수용(public static final) 필드 외에는 어떤 public 필드도 가지게 하지 말자.
- 테스트만을 위해 클래스, 인터페이스, 멤버를 공개 API로 만들어서는 안 된다
- package-private과 default는 같은 뜻이다

![%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B5%E1%84%87%E1%85%B3%20%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A1%203%E1%84%91%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%87%E1%85%A9%E1%86%AB%202d970a6218824600ac06c8a3db30a5d6/Screen_Shot_2021-01-28_at_3.04.16_AM.png](%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B5%E1%84%87%E1%85%B3%20%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A1%203%E1%84%91%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%87%E1%85%A9%E1%86%AB%202d970a6218824600ac06c8a3db30a5d6/Screen_Shot_2021-01-28_at_3.04.16_AM.png)

### 객체 모델링 방법

1. 객체 모델이 수정 불가능하도록 불변 상태로 시작하고
2. 객체 모델에 필요한 행위가 무엇인지 고민하고, 점진적으로 불변 상태를 제거하자
3. Object의 equals, hashCode, toString 등의 메서드 구현은 필요에 따라 꼼꼼하게 할 것
    1. equals가 참이라면 hashCode의 결과도 참이어야 함
4. 불필요한 생성자는 노출하지 않기
5. 생성 인자 갯수가 많아질 경우 →  빌더패턴 고려

```java
// 초반 설계
public class Post {
	  private final Long seq;               // PK(불변)
	  private final Id<User, Long> userId;  // USER(불변)
	  private final String contents;        // 제목(변함)
	  private final int likes;              // 좋아요 갯수(변함)
	  private final boolean likesOfMe;      // 좋아요 여부(변함)
	  private final int comments;           // 댓글 수(변함)
	  private final Writer writer;          // 글쓴이(불변)
	  private final LocalDateTime createAt; // 작성일자(불변)
}

// 최종 설계
public class Post {
  private final Long seq;
  private final Id<User, Long> userId;
  private String contents;
  private int likes;
  private boolean likesOfMe;
  private int comments;
  private final Writer writer;
  private final LocalDateTime createAt;
  
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Post post = (Post) o;
    return Objects.equals(seq, post.seq);
  }

  @Override
  public int hashCode() {
    return Objects.hash(seq);
  }

  @Override
  public String toString() {
    return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
      .append("seq", seq)
      .append("userId", userId)
      .append("contents", contents)
      .append("likes", likes)
      .append("likesOfMe", likesOfMe)
      .append("comments", comments)
      .append("writer", writer)
      .append("createAt", createAt)
      .toString();
  }
```

## 아이템 16 - public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라

> 필드를 모두 private으로 바꾸고 public 접근자(getter)를 추가하자

- 인스턴스 필드들을 public으로 하면 불변을 보장할 수 없으며 외부에서 필드에 접근할 때 부수 작업을 수행할 수도 없다.

## 아이템 17 - 변경 가능성을 최소화하라

> 클래스를 불변으로 만들자

- 불변 클래스(인스턴스의 내부 값을 수정할 수 없는 클래스)로 만들자
    - String, Wrapper Class, BigInteger, BigDecimal 등등...
- 불변을 어떻게 만들까?
    - 객체의 상태를 변경하는 메서드를 제공하지 않는다
    - 클래스를 확장할 수 없도록 한다 (하위 클래스에서 객체의 상태를 변하지 않게끔)
    - 모든 필드를 final로 선언
    - 모든 필드를 private으로 선언
    - 자신 외에는 필드에 접근할 수 없도록 한다
- 불변으로 만들 수 없는 클래스라도 변경할 수 있는 부분을 최소한으로 줄이자
- 불변 객체는 안심하고 공유할 수 있다
- 생성자를 private 으로 만들자

## 아이템 18 - 상속보다는 컴포지션을 사용하라

> 상속은 반드시 `is a kind of` 관계를 생각하자.
하위 클래스가 상위 클래스의 모든 역할을 하는지, 분류의 관계인지 확인하고 사용하자 (다형성, 코드 재사용만 생각해서 하지 말것)
위 관계가 아니라면 컴포지션을 사용하자

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-18.html)

## 아이템 19 - 상속을 고려해 설계하고 문서화하라. 그러지 않았다면 상속을 금지하라

- 상속용 클래스 설계하기
    - 클래스 내부에서 어떻게 사용하는지 문서로 남기기
        - @implSpec을 통해서 남길 수 있음
    - 문서화한 것은 그 클래스가 쓰이는 한 반드시 지켜야함
    - 다른 이가 효율 좋은 하위 클래스를 만들 수 있도록 일부 메서드를 protected로 제공할 수도 있다
        - java.util.AbsractList의 removeRange 메서드
        - List의 구현체의 최종 사용자는 removeRange 메서드에 관심이 없다. 그럼에도 이 메서드를 제공하는 이유는 단지 하위 클래스에서 부분리스트의 clear 메서드를 고성능으로 만들기 쉽게 하기 위해서다.
    - 클래스를 확장해야 할 명확한 이유가 떠오르지 않으면 상속을 금지
- **상속용으로 설계한 클래스는 배포 전에 반드시 하위 클래스를 만들어 검증해야 한다**
- 상속용 클래스의 생성자는 직접적으로든 간접적으로든 재정의 가능 메서드를 호출해서는 안 된다.
    - 상위 클래스의 생성자가 하위 클래스의 생성자보다 먼저 실행되므로 하위 클래스에서 재정의한 메서드가 하위 클래스의 생성자보다 먼저 호출된다
- 상속을 허용해야 한다면 재정의가 가능한 메서드를 호출하는 자기 사용 코드를 제거하자.

## 아이템 20 - 추상 클래스보다는 인터페이스를 우선하라

> 일단 인터페이스로 만들어보고 필드나 메서드를 구현해야할 경우에는 템플릿 메서드 패턴을 사용해보자. 만약 구현해야하면서 메서드가 public해도 된다면 인터페이스에 default 메서드를 추가해서 구현하는 것이 확장성에 더 좋을 것 같다

- 추상 클래스는 기능을 사용하고 확장시켜야 함
- 인터페이스는 구현을 강제해서 구현 객체가 같은 동작을 하도록 보장함
- 기존 클래스에도 인터페이스를 구현해 넣을 수 있다. (기존 클래스에 추상 클래스를 넣기는 어렵다)
- 인터페이스는 계층 구조가 없는 타입 프레임워크를 만들 수 있다(Singer, SongWriter 두 개의 인터페이스를 extends 해서 가수면서 작곡도 하는 인터페이스를 만들 수 있다)
- `public class Person extends StudentIntern implements Intern, Student{}` 이런 식으로 추상클래스는 단일상속만되고 인터페이스는 다중구현이 된다
- 미리 원하는 메서드를 구현하고 싶은 생각으로 템플릿 메서드 패턴을 사용하기도 한다.
    - `public abstract class AbstractCalculator implements Calculator {}`
    - 구현 클래스마 달라질 수 있는 메서드는 `protected` 로 열어둬서 구현 클래스에 정의하도록 만들 수 있다.

### 템플릿 메서드 패턴 vs 인터페이스의 default 메서드

- 템플릿 메서드 패턴은 `골격 구현 클래스 + 인터페이스` 다
- 구현하면서 외부에서의 호출을 막고 싶다면 추상클래스를 사용해서 막자. 인터페이스는 모두 public으로 지정되어서 의도치 않게 다른 곳에서 사용될 수 있다

## 아이템 21 - 인터페이스는 구현하는 쪽을 생각해 설계하라

> 인터페이스에 디폴트 메서드를 구현한다면 원래 구현되어 있던 것과 안 맞을 수 있다.
릴리즈 전에 반드시 테스트를 거치자

- 디폴트 메서드를 추가할 때 고려해야할 것
    - 기존에 디폴트 메서드를 추가하려는 인터페이스의 구현체들이 디폴트 메서드를 사용할 일이 있는가?
- Java 8버전부터 디폴트 메서드를 추가해 인터페이스에서 메서드를 구현할 수 있게 됐다
- 그러나 디폴트 메서드를 구현하면 해당 인터페이스를 구현한 클래스에서 디폴트 구현이 쓰일 수 있다
- 그래서 기존 구현체에 런타임 오류를 일으킬 수 있다
- 예를 들어, Collection 인터페이스는 동기화를 생각하지 않은 메서드(removeIf)를 구현했는데 얘를 구현하는 다른 곳에서 동기화를 한 Collection(SynchroziedCollection)을 썼다가 낭패를 본 적이 있다.
    - SynchroziedCollection 얘는 동기화가 되어있는데 Collection의 removeIf는 동기화가 되어있지 않다. 그럼에도 불구하고 그대로 오버라이딩해서 안 맞는 현상이 일어난다.
- 고로 디폴트 메서드를 구현한 새로운 인터페이스라면 릴리즈 전에 반드시 테스트를 거쳐야 한다

## 아이템 22 - 인터페이스는 타입을 정의하는 용도로만 사용하라

> 인터페이스는 타입을 정의하는 용도로 쓰고 상수들은 따로 유틸리티 클래스로 빼자

- 인터페이스는 자신을 구현한 클래스의 인스턴스를 참조할 수 있는 타입 역할
- 클래스가 어떤 인터페이스를 구현한다는 것은 자신의 인스턴스로 무엇을 할 수 있는지를 클라이언트에 얘기해주는 것
- 당연하지만 상수만을 모아둔 인터페이스는 만들면 안된다.
    - 내부 구현에 해당되는 코드를 외부에 노출시키면 안되기 때문에
    - 클래스가 상수 인터페이스를 구현하면 그 클래스는 오염된다
- 상수를 모아두려면 따로 유틸리티 클래스처럼 빼자

## 아이템 23 - 태그 달린 클래스보다는 클래스 계층 구조를 활용하라

> 예를 들어, `class 모형`에 `사각형, 삼각형`의 구현을 다 넣지말고 `class 사각형 extends 모형 {}` 과 같이 객체를 분리하고 계층 구조로 만들라는 이야기다

- 하나의 클래스에 다 넣지말고 객체를 분리하는 의미
- 필드와 생성자를 잘 생각해보자
- 필드에 다른 의미가 있다면 클래스로 빼자
- 계층 구조의 루트가 될 추상 클래스를 정의하자

## 아이템 24 - 멤버 클래스는 되도록 static으로 만들라

> 멤버 클래스에서 바깥 인스턴스에 접근할 일이 없다면 무조건 static을 붙여서 정적 멤버 클래스로 만들자

> static을 생략하여 비정적 멤버 클래스로 생성할 경우 바깥 인스턴스로의 숨은 외부 참조를 갖게 된다

> 비정적 멤버 클래스의 인스턴스 안에 관계 정보가 저장되어 메모리 공간을 차지하고 생성 시간도 더 걸린다.

> GC가 바깥 클래스의 인스턴스를 수거하지 못하는 메모리 누수가 생길 수 있다.

### 중첩 클래스

- 클래스 안에 정의된 클래스 → 항상 바깥 클래스를 통해서 쓰여야 한다

### 중첩 클래스 종류

- 정적 멤버 클래스
    - 클래스 내부에서 static으로 선언된 클래스
    - 바깥 클래스의 private 멤버에도 접근 가능
- 비정적 멤버 클래스
    - 바깥 클래스의 인스턴스와 연결
    - 클래스명.this를 사용해 바깥 클래스의 메서드를 호출할 수 있다
    - 개념상 중첩 클래스의 인스턴스가 바깥 인스턴스와 독립적으로 존재할 수 있다면 정적 멤버 클래스로 만들어야 한다.
    - HashMap의 KeySet
- 익명 클래스
    - 쓰이는 시점에 선언과 동시에 인스턴스가 만들어진다
    - 옛날에 즉석에서 작은 함수 객체를 만드는데 사용했으나 이젠 람다를 쓴다

    ```java
    // 옛날에 쓰던 방식
    List<Integer> list = Arrays.asList(10, 5, 6, 7, 1, 3, 4);
    Collections.sort(list, new Comparator<Integer>() {
        @Override
        public int compare(Integer o1, Integer o2) {
            return Integer.compare(o1, o2);
        }
    });
    System.out.println(list);

    // 람다가 적용되고 사용되는 방식
    Collections.sort(list, (o1, o2) -> Integer.compare(o1, o2));
    ```

- 지역 클래스
    - 가장 드물게 사용됨
- 멤버 클래스에서 바깥 인스턴스에 접근할 일이 없다면 무조건 static을 붙여서 정적 멤버 클래스로 만들자
    - static을 생략하여 비정적 멤버 클래스로 생성할 경우 바깥 인스턴스로의 숨은 외부 참조를 갖게 된다.
    - 비정적 멤버 클래스의 인스턴스 안에 관계 정보가 저장되어 메모리 공간을 차지하고 생성 시간도 더 걸린다.
    - GC가 바깥 클래스의 인스턴스를 수거하지 못하는 메모리 누수가 생길 수 있다.
- private 정적 멤버 클래스는 흔히 바깥 클래스가 표현하는 객체의 한 부분(구성 요소)을 나타낼 때 쓴다
    - key-value를 매칭시키는 Map 인스턴스에서 키-값 쌍을 나타내는 엔트리(Entry)는 맵과 연관이 있지만 엔트리의 메서드(getKey, getValue, setValue)은 맵을 직접 사용하지 않는다.
    - 따라서, 엔트리를 비정적 멤버 클래스로 표현하는 것은 낭비고, private 정적 멤버 클래스가 가장 알맞는다.
    - 엔트리를 선언할 때 실수로 static을 빠뜨려도 맵은 여전히 동작하겠지만, 모든 엔트리가 바깥 맵으로의 참조를 갖게 되어 공간과 시간을 낭비할 것이다.

## 아이템 25 - 톱레벨 클래스는 한 파일에 하나만 담으라

> 한 개의 파일에 한 개의 톱레벨 클래스를 만들자

> 두 개 이상이라면 하나를 정적 멤버 클래스로 만들자.

- 톱레벨 클래스란 말 그대로 하나의 자바 파일에 가장 높은 레벨 클래스를 말한다. 즉, 중첩 클래스가 아닌 클래스. 단일 형태의 클래스

    ```java
    // 한 파일에 톱레벨 클래스가 한 개 있는 Main.java

    class Main {}

    // 한 파일에 톱레벨 클래스가 두 개 있는 Main.java

    class Main {}

    class Main2 {}
    ```

- 톱레벨 클래스를 하나의 자바 파일에 두 개 이상 넣게 되면 컴파일러에 어떤 소스 파일을 건네느냐에 따라 동작이 달라진다
    - javac Main2.java Main.java
    - javac Main.java Main2.java
    - 동작이 달라진다!

## 아이템 26 - 로(Raw) 타입은 사용하지 말라

> 로 타입을 쓰면 컴파일 시점에 에러를 잡을 수 없으니 사용하지 말자

> 클래스 리터럴에는 로타입을 써야한다. List.class, String[].class 등...

> 제네릭을 써도 런타임에 소거되는데 로 타입으로 만들어서 이전 레거시 코드와 함께 사용할 수 있도록 한다.

- 제네릭이 없을 때는 항상 캐스팅을 사용했다. 그래서 런타임 Cast 에러가 발생할 위험이 있었다
- List<E>의 로 타입은 List
- 로 타입을 도입한 이유는?
    - 제네릭이 도입되기 전 코드와 호환성을 맞추기 위해서다. 쓰라고 만들어진 게 아니고
- 로 타입을 사용한다면 오류가 발생하고 한참 뒤인 런타임 시점에 알 수 있다. 컴파일 시점에 에러를 잡을 수 없다
- 로 타입을 사용하면 제네릭이 안겨주는 안정성과 표현력 모두 잃게 된다
- 제네릭 타입을 쓰고 싶지만 타입 매개변수가 뭔지 신경쓰고 싶지 않을 때는 `?`를 사용하자
- List.class, String[].class, int.class는 허용하고 List<String>.class와 List<?>.class는 허용하지 않는다
- 로 타입이든 ?든 instanceof는 완전히 똑같이 동작한다.
    - `if (o instanceof Set) {}` 으로 사용하자

## 아이템 27 - 비검사 경고를 제거하라

> 컴파일러 경고를 최대한 없애자만약 경고를 없앨 수 없는 상황이라면 @SuppressWarnings을 가능한 좁은 범위에 사용해 경고를 숨기자. 그리고 해당 경고를 무시해도 안전한 이유를 주석으로 남기자

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-27.html)

+

```java
private <T> List<List<T>> toList(List<T>... elements) {
    // ...
}
```

- 가변 인수를 제네릭과 함께 사용했을 때 문제가 될 수 있다. 가변 인수는 암묵적으로 배열을 생성한다. 이때 자바는 제네릭의 배열의 생성을 허용하지 않는다.
    - heap pollution이 발생한다.
    - 변수화된 타입이랑 실제 타입이랑 다를 때

    ```java
    @Test
    void heapPollution() {
        List list = toList("1", 2);

        Iterator<String> iter = list.iterator();

        assertThatThrownBy(() -> {
            while (iter.hasNext()) {
                String str = iter.next(); // ClassCastException
            }
        }).isInstanceOf(ClassCastException.class);

    }

    private <T> List<T> toList(T... elements) {
        return Arrays.asList(elements);
    }
    ```

## 아이템 28 - 배열보다는 리스트를 사용하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-28.html)

## 아이템 29 - 이왕이면 제네릭 타입으로 만들라

> Object로 받고 메서드들을 제네릭 타입으로 만들자

- Stack을 직접 생성할 때 배열을 Object로 만들면 아무거나 다 들어갈 수 있다
- 그래서 제네릭 타입의 Stack으로 만들면 된다.
- 첫 번째 방법
    - 다만 제네릭은 실체화 불가 타입으로 배열 생성 불가해서 생성할 때는 구현체 쪽으로 Object를 사용한 후 캐스팅을 해줘도 된다
    - `private E[] elements = (E[]) new Object[DEFAULT_INITIAL_CAPACITY];`
    - 현업에서는 이 방법을 많이 쓴다고 함
    - 그러나 힙 오염이 일어남 (`List list = new ArrayList<Number>();`) 와 같은...
- 두 번째 방법
    - Object 배열로 생성하되 push와 pop에서 다 제네릭으로 표현해서 만들기
    - push에서 E 타입만 넣으니 pop에서 무조건 E를 반환
    - Java 11의 ArrayList는 이렇게 사용중

## 아이템 30 - 이왕이면 제네릭 메서드로 만들라

> 형변환을 해줘야 하는 메서드는 제네릭하게 만들자

- 타입 안전, 형변환을 해줘야 하는 메서드는 제네릭하게 만들자
- 클래스에 타입이 없어도 메서드만 제네릭하게 만들 수 있다
- 항등 함수나 재귀적 타임 한정 같이 어려운 게 있다ㅠㅠ 나중에 다시 살펴볼 것!

```java
public static <E> Set<E> genericUnion(Set<E> s1, Set<E> s2) {
    Set<E> result = new HashSet<>(s1);
    result.addAll(s2);
    return result;
}
```

## 아이템 31 - 한정적 와일드카드를 사용해 API의 유연성을 높여라

- 한정적 와일드 카드
    - T extends Number
    - Integer가 올 수 있음
- 비한정적 와일드 카드
    - T super Number
    - Object가 올 수 있음

## 아이템 32 - 제네릭과 가변인수를 함께 쓸 때는 신중해라

> 가변인수를 안전하게 사용하려면 가변 인수로 받은 참조 변수를 불변으로 바꾸자!
그리고 그 불변을 List<T> 로 변환하자!

- 가변인수(String... infos)는 내부적으로 배열을 생성한다.
    - `infos = new String[infos.size];` 처럼 된다.
- 배열은 구체화 타입, 제네릭은 비 구체화 타입(런타임 시 소거로 더 적은 정보를 가짐)이다
- 제네릭을 배열의 원소로 가지면 컴파일 에러가 뜬다 (`List<String>[] stringLists = new List<String>[1];`)
    - 왜냐면 배열과 제네릭은 공변과 불공변, 구체화 타입과 비 구체화 타입으로 잘 어울리지 않는다.

### 가변 인자는 배열로 변하는데 그러면 가변인자에 제네릭을 쓰면 안되나?

- 경고만 뜬다. 실무에서 유용하게 쓰일 수 있어서 그냥 쓴다.
- @SafeVarags 를 통해서 경고를 없앨 수 있다

### 가변 인자로 제네릭을 사용하면서 어떻게 Type Safe하게 만들 수 있을까?

- 가변 인자로 생기는 배열을 가리키는 참조 변수를 만들지 말자.
- 아래는 TypeSafe하지 않은 예시다

```java
// Object로 변해서 반환 중
static <T> T[] toArray(T... args) {
    return args;
}

static <T> T[] pickTwo(T a, T b, T c) {
    switch (ThreadLocalRandom.current().nextInt(3)) {
        case 0: return toArray(a, b);
        case 1: return toArray(a, c);
        case 2: return toArray(b, c);
    }
    throw new AssertionError();
}

public static void main(String[] args) {
    // Object를 반환하는데 String[]으로 받고 있기 때문에 터진다.
    String[] attributes = Picker.pickTwo("Good", "Fast", "Cheap");
}
```

- 위 코드는 args를 그대로 반환하므로 힙 오염을 발생시킬 수 있다.
- `<T> T[] toArray(T[] a)` 는 소거되면 `Object[] toArray(Object[] a)` 와 같이 바뀐다.
- 그래서 컴파일에서는 에러가 안 나는데 런타임에서는 난다.

```java

// 요렇게! List로!
static <T> List<T> safePickTwo(T a, T b, T c) {
    switch (ThreadLocalRandom.current().nextInt(3)) {
        case 0: return Arrays.asList(a, b);
        case 1: return Arrays.asList(a, c);
        case 2: return Arrays.asList(b, c);
    }
    throw new AssertionError();
}
```

## 아이템 33 - 타입 안전 이종 컨테이너를 고려하라

> 서로 다른 타입을 하나의 컨테이너에 넣을 때 쓴다.

- type-safe (타입 안전) : generic을 통해 타입 안전성이 보장된다.
- hetrogeneous (이종) : 서로 다른 타입이 하나의 컨테이너에 존재할 수 있음을 뜻한다.
- container (컨테이너) : 무언가를 담고 있는 객체를 뜻한다. 쉽게 Map이나 Set등의 컬렉션이나 박싱 클래스 등을 예로 들 수 있다.
- Map<String, Integer>가 있다면 Integer 이외의 값은 담을 수가 없다.
- Map<Class<?>, Object> 로 하면 컨테이너의 키를 매개변수화 해서 쓸 수 있다.
- Favorite 클래스가 이 역할을 하고 있다. Class<?>에는 클래스 리터럴이 들어간다
    - 그런데 어디에 쓰려나? 동적이면서 타입 세이프한 컨테이너 객체가 필요할 때 쓴다고 한다.

## 아이템 34 - int 상수 대신 열거 타입을 사용하라

> 정수 열거 패턴이 아니라 자바의 Enum을 쓰자!

- 열거 타입이 자바에 추가되기 전까지는 단순히 클래스에 `public static final int` 을 써서 열거 패턴으로 상수를 만들어줬다. 그러나 이렇게 사용하면 단점이 있다
    - 정수 열거 패턴을 사용하면 값을 int, long 으로만 받게 된다. 즉, 컴파일러가 이해하는 값은 정수다. 다른 값을 실수로 사용해도 모른다
    - 해당 타입을 문자열로 표현하기 힘들다
- 자바의 Enum을 쓰자
    - 각 필드는 public static final
    - 열거 타입 또한 클래스
    - 싱글톤으로 인스턴스가 하나로 보장된다

```java
// 정수 열거 패턴
public class Day {
    public static final int MONDAY = 0;
    public static final int TUESDAY = 1;
    public static final int WEDNESDAY = 2;
    public static final int THURSDAY = 3;
    public static final int FRIDAY = 4;
    public static final int SATURDAY = 5;
    public static final int SUNDAY = 6;
}

// 열거 타입
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

## 아이템 35 - ordinal 메서드 대신 인스턴스 필드를 사용하라

> Enum을 사용할 때, ordinal() 메서드는 어떤 경우에도 쓰지말자. 애초에 쓰라고 나온 게 아니고 EnumSet이나 EnumMap과 같이 Enum 자료구조에서 쓰이기 위해서 나온 거다.

- ordinal() 메서드
    - Enum에서 몇 번째 위치인지 반환한다
- 중간에 값이 삽입, 삭제 됐을 때 ordinal 값도 증가 감소하게 된다.
- 숫자를 쓰고 싶다면 인스턴스 안의 필드에 안에 적자
- JPA에서도 조심하자!

## 아이템 36 - 비트 필드 대신 EnumSet 을 사용하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-36.html)

## 아이템 37 - ordinal 인덱싱 대신 EnumMap을 사용하라

```java
public class Plant {
    enum LifeCycle { ANNUAL, PERENNIAL, BIENNIAL }

    final String name;
    final LifeCycle lifeCycle;

    public Plant(String name, LifeCycle lifeCycle) {
        this.name = name;
        this.lifeCycle = lifeCycle;
    }
}
```

- Enum의 값들마다 어떤 집합을 저장하고 싶을 때가 있다.  `Set<Plant>[] plants` 처럼 이때 ordinal() 메서드를 사용하지 말고 EnumMap을 사용하자.
- EnumMap은 Enum 타입만을 Key로 사용하는 Map의 구현체
- `Map<Plant.LifeCycle, Set<Plant>> plants = new EnumMap<>(Plant.LifeCycle.class);`
- 성능도 비슷하다. 내부적으로 배열을 사용하기 때문에
- EnumMap은 자체적으로 내부 크기가 정해져있어서 편하다.

## 아이템 38 - 확장할 수 있는 열거 타입이 필요하면 인터페이스를 사용하라

Enum의 바이트 코드를 보면 자동으로 java.lang.Enum을 상속하고 있다. 이미 상속을 받고 있고 자바는 다중 상속이 안되기 때문에 enum 클래스에 다른 클래스를 상속받을 수 없다

```java
final enum enumDay extends java/lang/Enum {
	...
}
```

### 대부분의 상황에서 enum을 확장하는 것은 좋지 않다

- enum 은 상수 집합인데, 하위 상수는 상위 타입의 요소로 인정하지만 상위 타입의 상수는 하위 타입으로 인정못하는 것은 이상하다.
- 상위, 하위타입의 모든 상수를 순회하는 방법이 없다.
- 설계와 구현이 복잡해진다.

### 그래도 확장을 하고 싶다면?

인터페이스를 구현해서 하면 된다. Operation이라는 인터페이스와 이를 구현하는 EarthOperation, MarsOperation Enum이 있다

## 아이템 39 - 명명 패턴보다 애너테이션을 사용하라

> 애너테이션을 쓰자

### 명명패턴

- 명명패턴은 메서드의 이름으로 패턴을 지으면 추가적인 처리를 제공하는 것
- 예를 들어, Junit 3에서는 테스트 메서드 이름을 test로 시작하게 했어야 했다
- 오타가 나면 무시되고 메서드 이름으로 추가적인 처리를 하는 게 말이 안된다. 특정 예외를 던질 때 성공하는 테스트를 작성한다고 했을 때 예외 타입을 테스트에 전달해야 하는데 명명 패턴 방식으로는 이게 불가능하다.

### 애너테이션

- 메타 에너테이션 : 에너테이션을 만들때 붙이는 에너테이션
    - @Retention : 인자로 에너테이션 정보가 언제까지 남아있을지 지정한다.
        - @Retention(RetentionPolicy.SOURCE) // 컴파일 후 에너테이션 정보 사라짐
    - @Target : 인자로 해당 에너테이션이 어디에 붙어있을 수 있는지 지정한다.
        - @Target(ElementType.METHOD) // 메서드에만 달 수 있음
    - 같은 에너테이션을 여러개 달기 위해 @Repeatable() 메타 에너테이션 사용
- 마커 에너테이션 : 아무 매개변수 없이 단순히 마킹에 사용하는 에너테이션 (ex. @Override)
- 애너테이션 안에 `Class<? extends Throwable> value();` 를 줘서 매개변수를 줄 수 있다
- 해당 애너테이션 처리는 클래스에서 해당 어노테이션이 있는 메서드(isAnnotationPresent())를 사용해서 찾아서 처리를 해줄 수 있다.

## 아이템 40 - @Override 애너테이션을 일관되게 사용하라

> IDE에서 잘 달아주는 @Override를 굳이 지우지 말자

equals 같은 곳에서 @Override를 잘 달자. 

## 아이템 41 - 정의하려는 것이 타입이라면 마커 인터페이스를 사용하라

- 마커 인터페이스
    - 자신을 구현하는 클래스가 특정 속성을 가짐을 나타내는 인터페이스
    - 추상 메서드든, 필드든, default, static 메서드든 아무것도 없다.
    - Cloneable, Serializable 같은 인터페이스
- **마커 어노테이션**
    - 해당 요소가 특정 속성을 가짐을 나타내는 에너테이션
    - @Override, @FunctionalInterface, @SafeVarargs, @Native
- 차이점
    - 마커 인터페이스는 타입으로 사용하여 **컴파일타임** 에 오류를 검출할 수 있다.
    - 마커 에너테이션은 **런타임**에서야 오류를 검출할 수 있다.
    - 타입 검사
        - writeObject()를 보면 여기에 instanceof 가 있다. 타입검사로는 둘 다 별 차이가 없다.
        - 애너테이션 프로세서에서 instanceof를 이용해 런타임에서 에러를 검출한다
- 마커 에너테이션은 @Retention(RetentionPolicy.TYPE) 에너테이션을 통해 클래스, 인터페이스, enum, 에너테이션에만 달 수 있는 마커를 만들 수 있다.
- 하지만 마커 인터페이스는 이보다 더 정밀한 제한을 둘 수 있다.
    - 마커 인터페이스는 타입으로 쓸 수 있다. 시리얼라이저블같은 것들 컴파일에서 잡는다
    - 마커 애너테이션은 instanceof를 사용해서 런타임에서 잡는다.
- **에너테이션은 언제 쓸까 ?**
    - 마킹하려는 곳이 클래스, 인터페이스가 아닐 때.
    - 에너테이션을 적극 활용하는 프레임워크의 일부에 마커를 달 때.
- 마킹된 객체를 매개변수로 받는 메서드를 작성할 일이 있을까 ? -> [예] 라면 마커 인터페이스를 쓰자 !
- Retention 이 ElementType.TYPE 인 마커 에너테이션을 쓰고 있다 ? -> 마커 인터페이스로 바꿀지 고민해보자.

## 아이템 42 - 익명 클래스보다는 람다를 사용하라

> IDE에서 바꿔주는 걸 사용하자. 가독성도 좋고 간결하다. 람다 안에서 this를 쓸 때 조심하자

- 자바 8 이전에는 다음과 같이 익명 클래스를 사용했다. 정렬할 때 new Comparator로 사용하는 방법
- 근데 람다식과 함수형 인터페이스가 나오면서 Comparator 처럼 추상 메서드가 하나면 람다식을 사용할 수 있게 됐다
- 람다식을 사용하면 타입을 생략할수 있는데 그 이유는 컴파일러가 사용하려는 람다식에 대해서 타입 추론을 할 수 있기 때문. 그래서 로 타입인 List를 사용하면 컴파일 오류가 발생한다.
- Enum 타입에서 람다식, 함수형 인터페이스를 사용하면 더 쉽게 구현할 수 있다. 이 방법이 더 좋은 이유는 Enum의 어떤 인자로 왔을 때 그에 해당하는 메서드를 줄 수 있기 때문이다.

### 주의 사항

- 람다는 이름이 없다. 람다는 한 줄일 때가 가장 좋고, 세 줄 안에 끝내는 게 가장 좋다
- 람다는 함수형 인터페이스에서만 사용된다
    - 추상 클래스의 인스턴스를 만들 때 람다 사용은 불가능하다
    - 인터페이스의 추상 메서드가 여러 개면 람다로 표현이 불가능하다
- 람다는 자신을 참조할 수 없다.
    - 람다에서 this 키워드는 바깥 클래스를 가리킨다
- 람다를 직렬화 해선 안된다
    - 람다도 익명 클래스처럼 직렬화 형태가 가상머신 별로 다를 수 있다 (???)
    - 람다를 직렬화 하는 일은 삼가야 한다
    - 직렬화를 해야할 함수 객체가 있다면 private 중첩 클래스(아이템 24)의 인스턴스를 사용하자

## 아이템 43 - 람다보다는 메서드 참조를 사용하라

> 메서드 참조는 람다보다 더 간결하다.

[Untitled](https://www.notion.so/6042e8c026c14007b9767b2daa2faa8b)

## 아이템 44 - 표준 함수형 인터페이스를 사용하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-44.html)

## 아이템 45 - 스트림은 주의해서 사용하라

> 스트림은 가독성을 높여주고, 지연 평가로 성능도 좋다. 병렬로 실행하기도 좋다. 그러나 스트림을 알고 사용하자.

스트림은 함수형 프로그래밍에 기초한 패러다임이다

- 스트림의 핵심 개념 2가지
    - 데이터 원소의 무한 또는 유한 시퀀스
    - 연산 단계를 표현하는 스트림 파이프 라인
        - 소스 스트림 - 중간 연산 - 종단 연산
        - 지연 평가 : 종단 연산이 수행될 때 평가된다. 종단 연산이 수행되지 않으면 아무 일도 일어나지 않는다
        - 일단 한 값을 다른 값에 매핑하고 나면 원래 값은 잃는 구조
- 스트림의 기본 타입으로는 int, long, double을 지원하며 객체 참조도 원소가 될 수 있다. char는 지원 안 한다.
- 스트림은 한 번만 소비할 수 있다. 즉, 스트림 연산 후 또 다른 연산을 하려고 하면 에러를 발생시킨다
- 람다는 final 변수만 가능. return문이나 break, continue로 제어할 수 없다.

### 지연 평가(Lazy Evaluation)

종단 연산에 쓰이지 않는 데이터 원소는 계산에 쓰이지 않는다. 종단 연산이 호출될 때 남은 데이터 원소들이 평가된다. 종단 연산이 없으면 아무 일도 하지 않는다.

예를 들어, 아래와 같은 테스트가 있다.

```java
@DisplayName("지연 평가 테스트")
@Test
void lazyEvaluation() {
    List<Integer> numbers = Arrays.asList(10, 20, 30, 40, 50, 60);
    List<Integer> filteredNumbers = numbers.stream()
        .filter(num -> {
            System.out.println("num < 50");
            return num < 50;
        })
        .limit(3).collect(Collectors.toList());

    assertThat(filteredNumbers).containsExactly(10, 20, 30);
}
```

테스트를 실행해보면 `num < 50`이 3번만 호출된다. 즉, 모든 요소에 대해서 필터링을 실행하지 않는다. 다 실행한다면 10, 20, 30, 40까지 나왔어야 된다. **우리가 원하는 건 3개, 딱 3개만 맞춰지면 그대로 끝난다.** 그러니까 하나의 원소에 대해서 종단 연산까지 다 실행한다.

장점

1. 필요할 때만 평가가 되므로 메모리를 효율적으로 사용할 수 있다
2. 무한 자료구조를 만들 수 있다
3. 런타임 에러를 방지할 수 있다
4. 컴파일러 최적화 가능

### Fluent API

- 메서드 체이닝을 지원
- 파이프 라인 하나를 구성해서 모든 원소를 처리한다
- 기본적으로 순차적으로 진행된다
- 병렬로 실행하기 위해서는 `parallel()`을 호출한다

### 스트림 사용을 추천하는 경우

- 원소들의 시퀀스를 일관되게 변환하는 경우
- 원소들의 시퀀스를 필터링하는 경우
- 원소들의 시퀀스를 하나의 연산을 사용해 결합하는 경우
- 원소들의 시퀀스를 컬렉션으로 모으는 경우
- 원소들의 시퀀스에서 특정 조건을 만족하는 원소를 찾는 경우

## 아이템 46 - 스트림에서는 부작용 없는 함수를 사용하라

> Stream의 foreach 안에서 계산하지 말자. 출력할 때만 쓰자.

- 스트림 패러다임의 핵심은 계산을 일련의 변환으로 재구성하는 것
- 스트림의 forEach 연산은 스트림 계산 결과를 보고할 때만 사용하고, 계산하는데는 쓰지 말자
- 각 변환 단계는 이전 단계의 결과를 처리하는 순수 함수여야 한다.
    - 함수 스스로 다른 상태를 변경하지 않는 것

Collectors 클래스(수집기)는 스트림을 사용하려면 꼭 배워야 하는 개념

- 수집기를 사용하면 스트림의 원소를 손쉽게 컬렉션으로 모을 수 있다
- 예를 들어, Collectors.toList()는 모든 Stream의 요소를 List 인스턴스로 수집하는 것
    - 특정 List로 구현하는 게 아니다!
- groupingBy() 는 일부 속성별 객체를 그룹화하고 결과를 Map 인스턴스에 저장하는데 사용된다

## 아이템 47 - 반환 타입으로는 스트림보다 컬렉션이 낫다

> 공개 API는 사용자를 생각해 Stream과 Iterable 둘 다 쓰일 수 있는 Collection을 반환하자. 다 쓰일 수 있기 때문에 Stream보다는 Collection을 반환하자.

- Stream은 기본적으로 반복을 지원하지 않는다
    - 왜냐면 Stream이 forEach를 지원하지 않는 이유는 Iterable을 확장하지 않아서 그렇다
    - 반복은 List, Set과 같은 Iterable 구현체에 대해서 사용이 가능하다
- Stream을 Iterable로 변환해보기
    - Stream 안에서 iterator() 메서드를 사용하면 Iterator를 반환하기 때문에 반복을 돌릴 수 있다.
- Iterable을 Stream으로 변환해보기
    - StreamSupport.stream() 이라는 메서드를 사용하면 가능하다.
- 변환하기 위해서 쓰이는 어댑터 메서드는 코드를 어수선하게 만들고 성능이 안 좋다. 공개 API를 만들 때는 Stream을 원하는 사용자와 Iterable을 원하는 사용자 모두를 배려해야 한다. 그래서 Iterable의 하위 타입이면서 Stream을 반환하는 stream() 메서드를 제공하는 Collection을 쓴다
    - 어댑터 메서드는 성능도 안 좋고 가독성이 안 좋다.
    - Collection을 쓰자. 그럼 둘 다 만족시킬 수 있다

## 아이템 48 - 스트림 병렬화는 주의해서 적용하라

> 스트림 파이프라인 병렬화를 잘못하면 프로그램이 오동작하고 성능이 급격히 떨어진다. 계산도 정확하고 성능도 확실히 좋아졌을 때만 시도하라.

자바는 5부터 동시성 컬렉션인 concurrent 라이브러리와 Excutor 프레임워크를 지원했다

자바 7부터는 고성능 병렬 분해 프레임워크인 포크 조인 패키지를 추가했다

- ForkJoin 프레임워크는 병렬 처리를 위한 모델이고 분할 정복 알고리즘을 통해서 재귀적으로 처리한다

자바 8부터는 parellel 메서드만 한 번 호출하면 파이프라인을 병렬 실행할 수 있는 스트림을 지원했다

- 병렬 스트림은 병렬 처리를 하기 위해 ForkJoin 프레임워크를 사용한다.
- 자바로 동시성 프로그램을 작성하기 쉬워지고 있으나 이를 올바르고 빠르게 작성하는 일은 여전히 어려운 일이다

![%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B5%E1%84%87%E1%85%B3%20%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A1%203%E1%84%91%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%87%E1%85%A9%E1%86%AB%202d970a6218824600ac06c8a3db30a5d6/Screen_Shot_2021-03-04_at_2.24.14_PM.png](%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B5%E1%84%87%E1%85%B3%20%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A1%203%E1%84%91%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%87%E1%85%A9%E1%86%AB%202d970a6218824600ac06c8a3db30a5d6/Screen_Shot_2021-03-04_at_2.24.14_PM.png)

- 동시성은 말 그대로 하나의 코어에서 동시에 작업을 하는 것이고, 병렬성은 두 개의 코어가 있을 때 각자 작업하는 것

ForkJoin 프레임워크

- Fork 단계에서 전체 데이터를 서브 데이터로 분리한다
- 서브 데이터를 멀티 코어에서 병렬 처리한다
- Join 단계에서는 서브 결과를 결합해서 최종 결과를 만든다

스트림 병렬화의 문제점?

- 중간 연산으로 limit을 쓰면 파이프라인 병렬화로는 성능 개선을 기대할 수 없다

스트림 병렬화가 좋을때?

- 스트림의 요소가 ArrayList, HashMap, HashSet, ConcurrentHashmap에 있으면서 int, long 범위일 때 가장 효과가 좋다
    - 자료구조들은 모두 데이터를 원하는 크기로 정확하고 쉽게 나눌 수 있어 다수의 스레드에게 분배하기 좋다
    - 순차적으로 실행할 때 좋다(메모리에 연속으로 저장되어 있다)
    - 그래서 가장 뛰어난 자료구조는 기본 타입의 배열이다. 연속으로 저장되어있으니까.

## 아이템 49 - 매개변수가 유효한지 검사하라

- 매개변수의 제약들은 반드시 문서화해야하며 메서드 바디가 실행되기 전에 검증을 해야 한다.
- public과 protected는 외부 접근도가 높은 제어자이므로 @throws를 통해 문서화해야 한다.
- default나 private 접근 제한자의 메서드는 개발자가 스스로 메서드가 호출되는 상황을 통제할 수 있다.
    - assert 단언문을 통해서 매개변수 유효성을 검증할 수 있다.
    - assert 는 자신이 선언한 조건이 무조건 참이어야 다음 로직을 수행한다.
- 필드로 저장하는 경우는 더 철저히 검사해야 한다.
    - null이 들어가면 안되는 경우에는 Objects.requireNonNull을 사용하자.
    - 솔직히 NullPointerException이 발생할 위치를 앞당긴다 정도밖에 없는 것 같다?
    - Java 9에는 Objects.requireNonNullElse도 있다.

## 아이템 50 - 적시에 방어적 복사본을 만들라

> 방어적 복사(객체를 새로 생성해서 넣어준) 후, 유효성 검사를 하자

- 클라이언트가 우리의 불변식을 깨뜨리려 혈안이 되어있다고 가정하고 방어적으로 프로그래밍해야 한다.
- Java 7에 나온 Date 클래스의 경우, 가변 클래스다. setTime이 가능해서 불변이 아니다.

```java
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");

Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);
end.setTime(1000000000);

System.out.println("시작시간 : " + dateFormat.format(p.getStart()) + "\n끝시간 : " + dateFormat.format(p.getEnd()));
```

- Date 클래스의 경우 낡은 API니까 쓰지 말자.

### 이미 개발된 구현에 Date 같은 클래스를 쓰고 있다면?

새로운 객체에 다시 만들어서 사용하자.

```java
// 생성자
public DefensiveCopiedPeriod(Date start, Date end) {
    this.start = new Date(start.getTime());
    this.end = new Date(end.getTime());

    // 원래 있던 this로 유효성 검사
    if (this.start.compareTo(this.end) > 0) {
        throw new IllegalStateException(start + "가 " + end + " 보다 늦을 수 없습니다.");
    }
}
```

- 멀티 스레드 환경에서, 원본 객체의 유효성을 검사하는 찰나에 다른 스레드가 원본 객체를 변경할 위험이 있다.
- **반드시 방어적 복사 후(new 키워드), 유효성 검사를 하는 순서로 작성해야 한다.**
- 유효성 검사 로직을 뒤에 쓰자.

## 아이템 51 - 메서드 시그니처를 신중히 설계하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-51.html)

## 아이템 52 - 다중정의는 신중히 사용하라

> 매개변수가 같을 땐 오버로딩을 피하자
오버로딩할 때 매개변수의 개수가 같다면 메서드 이름을 다르게 짓자

- 다중정의(오버로딩)란?
    - 메서드 시그니처는 같지만 매개변수의 개수, 타입, 순서라도 다른 메서드를 선언하는 것
- 오버로딩과 오버라이딩은 어떤 메서드가 실행될 지 결정되는 시점이 다르다.
- 오버로딩은 타입이 이미 정해져있기 때문에 어떤 메서드가 실행될 지 컴파일 타임에 정해진다
- 오버라이딩은 상속관계이기 때문에 어떤 메서드가 실행될 지는 런타임에 정해진다
- 매개변수 개수가 같은 오버로딩은 하지 말자.
    - 매개변수 개수가 같아야 한다면 오버로딩 대신 메서드 이름을 다르게 지어주자
- 매개변수가 달라도 안전하지 않다.
    - 아래 코드를 보면 3을 지우라는 것인지 index 3번째 원소를 지우라는 것인지 이해가 가지 않는다.
    - 원소 3을 삭제하려면 박싱된 타입을 사용해야한다.

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
list.remove(3); // 3번째 원소(4)가 삭제된다

List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
list.remove((Integer) 3); // 객체 3이 삭제된다.
```

## 아이템 53 - 가변인수는 신중히 사용하라

> 가변인수는 0개 이상 사용할 때 가능하며, 1개 이상일 때만 가능하게 하려면 매개변수를 따로 추가하자

- 가변 인수는 명시된 타입의 인수를 0개 이상 받기 위해 사용한다.
    - 즉, `int sum(int... numbers)` 이런 식으로 되어있으면
    - `sum();` 도 가능하다
- 호출 시, 인수의 개수만큼의 사이즈를 가진 배열을 만들고 이를 배열에 저장하여 메서드에 건네준다.
- 인수의 개수가 0개 이상이기 때문에 0이 들어올 수 있다. 그래서 평균을 구하는 메서드를 만들 때는 인수가 0개가 들어올 수 있으므로 오류를 일으킬 수 있다. (0개로 나눠야 하니까)
- 1개 이상으로 validation 할 때는 매개변수를 하나 추가해서 필수 인수를 지정하면 된다.

```java
public int average(int first, int... args) {
	int sum = first;
	int size = args.length + 1;
	for (int arg : args) {
	    sum += arg;
	}
	return sum / size;
}
```

- 이러면 인자 하나를 무조건 받아야하기 때문에 인자가 1개 이상인 것으로 만들 수 있다.
- 성능에 민감한 상황이라면 가변인수가 걸림돌이 될 수 있다
    - 매번 배열을 새로 할당하고 초기화하기 때문
- 해당 메서드의 호출의 95%가 인수를 3개 이하로 사용된다면 3, 4개까지 메서드를 다중정의해서 만들어놓자.
    - 그러면 매개변수에 들어온대로 배열이 만들어지지 않고 사용가능하다
    - EnumSet에 있는 예시다

    ```java
    public static <E extends Enum<E>> EnumSet<E> of(E e1, E e2, E e3) {
        EnumSet<E> result = noneOf(e1.getDeclaringClass());
        result.add(e1);
        result.add(e2);
        result.add(e3);
        return result;
    }
    ```

## 아이템 54 - null이 아닌 빈 컬렉션이나 배열을 반환하라

> null이 아니라 빈 컬렉션을 반환하자

- null을 사용하면 null pointer Exception이 일어날 수 있기 때문에 null 방지를 해줘야 한다.
- null 대신 빈 컬렉션을 반환하면 null pointer Exeption을 막을 수 있다.
- 장점
    - 빈 컬렉션을 반환하더라도 성능차이가 크지 않다
    - 빈 컬렉션은 굳이 새로 할당하지 않고도 반환할 수 있다
    - 빈 컬렉션을 새로 할당하지 않고 반환하는 방법은 빈 불변 컬렉션을 반환을 통해 가능하다
    - Collections 안에 있다.

## 아이템 55 - 옵셔널 반환은 신중히 하라

> 옵셔널은 값을 반환하지 못할 가능성이 있다면 사용하자.
옵셔널 반환에는 성능 저하가 뒤따르니 성능에 민감하다면 예외를 던지거나 null을 반환하는 게 나을 수 있다
옵셔널을 반환값 이외의 용도로 쓰는 경우는 매우 드물다

### 값을 반환할 수 없을 때 어떻게 할까?

- 자바 8 이전
    - 예외를 던진다
        - 예외는 진짜 예외적인 상황에서 사용해야한다
        - 예외를 생성할 때 스택 전체를 캡쳐하므로 비용이 만만치 않다
    - null을 반환한다
        - null 처리 코드를 추가해야 한다.
- 자바 8 이후에는 옵셔널을 사용할 수 있다
    - 옵셔널은 불변이며 null을 반환할 수 있다

### Optional

- T 타입 참조를 하거나 아무것도 담지 않을 수 있다
- 옵셔널은 불변 컬렉션이다
- 옵셔널을 반환함으로써 사용자가 취할 행동이 많아졌기에 더 유연해졌다.
- 빈 옵셔널이 오게 되면 기본 값을 세팅할 수 있다.
- 장점
    - orElse, orElseGet으로 기본값을 정해둘 수 있다
        - orElse를 하면 무조건 실행된다. 객체 상태와 상관없이
            - 그래서 orElseGet을 쓰거나 orElseThrow로 던진다
    - isPresent()로 옵셔널이 채워져있는지, 비어있는지 알 수 있다
    - get()은 아예 안쓴다. 옵셔널 자체가 값이 있을 수도 있고 없을 수도 있고를 이야기한다.
    - ifPresent도 안티패턴이다. 4가지 패턴으로 대부분 처리가능하다.
- 배열이나 스트림 같이 컨테이너 타입은 옵셔널로 감싸면 안된다.
    - 컨테이너 타입은 그대로 빈 컨테이너 타입으로 반환하자.
- Integer 같은 것도 박싱된 기본 타입을 옵셔널 반환하는 일은 없도록 하자.
    - OptionalInt 이런 걸 쓰자.
    - char, boolean형은 덜 중요한 기본타입이라서 int, long, double만 있다.
- 옵셔널을 맵의 값으로 사용하면 절대 안된다
    - 이러면 맵 안에 키가 없다는 사실을 나타내는 방법이 두 가지로 된다(키가 없거나, 옵셔널이 비었거나

## 아이템 56 - 공개된 API 요소에는 항상 문서화 주석을 작성하라

- javadoc이라는 유틸리티가 이 작업을 도와준다
- 스레드 안전 수준을 API 설명에 포함해야된다고 한다.
- 공개된 API를 개발할 때 보면 될 것 같다.
- how가 아닌 what에 대해서 기술해야 한다.
- @param, @return, @throws, @code 등을 쓴다. Java 10에서 추가된 것도 있다
- 스터디원 [지애 님의 글](https://github.com/jiaekim123/book-effective-java/blob/6f7577d140d109196fb90772bad42bdc8880692a/8%EC%9E%A5/56_%EA%B3%B5%EA%B0%9C%20API%20%EC%9A%94%EC%86%8C%EC%97%90%EB%8A%94%20%ED%95%AD%EC%83%81%20%EB%AC%B8%EC%84%9C%ED%99%94%20%EC%A3%BC%EC%84%9D%EC%9D%84%20%EC%9E%91%EC%84%B1%ED%95%98%EB%9D%BC_%EA%B9%80%EC%A7%80%EC%95%A0.md)을 참고하자.

## 아이템 57 - 지역변수의 범위를 최소화하라

- 사용하는 곳 근처에서 가장 처음 쓰일 때 선언하자
- 모든 지역변수는 선언과 동시에 초기화하자
- while문 보다는 for문을 고려해보자
    - i라는 인덱스를 쓰면 잘못 쓸 위험이 있다.
- 메서드를 작게 유지하고 한 가지 기능에 집중하라

## 아이템 58 - 전통적인 for문보다는 for-each문을 사용하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-58.html)

## 아이템 59 - 라이브러리를 익히고 사용하라

> 표준 라이브러리를 잘 찾아보자. lang, util, io, Collection, Stream, concurrent의 하위 패키지를 잘 찾아보자. 만약 없다면 guava나 apache commons를 보자

### 랜덤값 구해오는 라이브러리

1. java.util.Random 의 `nextInt() % bound;` `java 1.0`
    1. 구식 방법이다. 일정 범위에서 같은 수열이 반복된다.
2. java.util.Random 의 `nextInt(int bound);` `java 1.2`
    1. 위 방식의 문제점을 해결하나 스레드 문제가 있다
3. java.util.concurrent.ThreadLocalRandom `java 1.7`
    1. 싱글스레드에서 1, 2번보다 더 고품질의 난수와 속도를 제공한다.
4. java.util.SplittableRandom `java 1.8`
    1. fork-join pool, 병렬 스트림에서는 splittableRandom이 더 빠르다
5. 보안을 강화한 java.util.security 의 SecureRandom도 있다

## 아이템 60 - 정확한 답이 필요하다면 float와 double은 피하라

> 정확한 답이 필요할 때는 float, double이 아닌 BigDecimal을 사용하자.

- float과 double은 정확한 결과가 필요할 때 사용하면 안된다
    - 부동소수점 방식을 사용하고 있기 때문
    - 32bit 소수점 수는 float, 64bit 소수점 수는 double
- 컴퓨터가 이진수로 소수점을 포함한 실수를 표현할 때는 상황이 달라진다
    - 무엇이 정수이고 무엇이 실수 부분인지 구분해야 한다.
    - 컴퓨터는 이를 위해 고정소수점 방식과 부동소수점 방식을 사용한다
- 0.01과 0.1 * 0.1은 다르다.
    - CPU에서 근사치로 알아서 계산한다. 0.1부터가 근사치라서 곱한 값도 다르게 된다.
- 부동소수점에서는 오차가 발생한다.
- 그래서 BigDecimal로 표현하거나 정수타입(int, long)으로 바꿔서 작성하면 된다.

## 아이템 61 - 박싱된 기본 타입보다는 기본 타입을 사용하라

> 박싱된 기본 타입은 기본 타입보다 느리다. 오토박싱과 오토언박싱을 주의해라

- 기본 타입은 박싱타입보다 시간 효율성과 공간효율성이 높다.
- 박싱 타입은 null을 취급할 수 있으며 값 자체와 구별되는 아이덴티티(객체로서 가지는 식별성)를 갖는다
- 박싱타입은 제네릭에서 쓰이는 파라미터 타입에서 쓰자.
- 기본타입과 박싱된 기본 타입을 혼용한 연산에서는 오토언박싱이 되어 박싱된 기본 타입의 박싱이 풀린다.
    - null이면 NPE가 뜬다

## 아이템 62 - 다른 타입이 적절하다면 문자열 사용을 피하라

> 입력받을 데이터가 진짜 문자열일 때만 String을 사용하자

- 입력받을 데이터가 진짜 문자열일 때만 String을 사용하자
- 데이터가 수치라면 int, long, double 형을 사용하자
- 데이터가 참, 거짓이라면 boolean or Enum 자료형을 사용하자
- 문자열은 하드코딩해야하기 때문에 오타가 있어도 컴파일러가 확인할 방법이 없다.
- 중간에 "#" 을 넣어서 문자열로 만들지 말자. 왜냐면 따로 파싱해야된다.

## 아이템 63 - 문자열 연결은 느리니 주의하라

> 많은 문자열을 연결할 때는 StringBuilder, StringBuffer를 사용하자

- String은 불변객체다. 새로 연결하면 새로운 불변 객체를 만들어야 하기 때문에 n^2 시간이 된다.
- StringBuilder, StringBuffer가 있다
- StringBuilder
    - 싱글 스레드에서 사용해서 ThreadSafe하지 않다.
    - 싱글 스레드에서 사용가능해서 굉장히 빠르다
- StringBuffer
    - synchronized 키워드를 사용해 동기화가 된다.
    - Thread-Safe한 객체다. 멀티스레드 환경일 경우 Buffer를 쓰자

## 아이템 64 - 객체는 인터페이스를 사용해 참조하라

> 인터페이스 타입을 사용하면 구현체를 주입할 수 있으므로 느슨해진다

- 적합한 인터페이스가 있다면 매개변수뿐 아니라 반ㅎ값, 변수, 필드를 전부 인터페이스 타입으로 선언하라

## 아이템 65 - 리플렉션보다는 인터페이스를 사용하라

### 리플렉션이란

- 런타임에 동작해서 구체적인 클래스 타입을 알지 못해도 컴파일된 클래스 파일을 통해 그 클래스의 메소드, 타입, 변수들을 접근할 수 있도록 해주는 자바 API
- java.lang.reflection 사용
- 컴파일 당시에 존재하지 않던 클래스도 이용할 수 있으며 실제로 인스턴스를 생성하거나 메서드를 호출하거나 필드에 접근할 수 있다.
- Constructor, Method, Field를 통해 가져올 수 있다.

### 리플렉션의 단점

- 컴파일 타임의 이점을 누릴 수 없다 (타입 검사, 예외 검사 등...)
- 여러 예외 처리로 코드가 장황해지고 더러워진다
- 성능이 떨어진다 (일반 메서드에 비해 11배나 느리다고 한다)

### 그렇다면 어떻게 리플렉션을 써야 할까?

- 인터페이스 및 상위 클래스로 참조해 사용하자
    - 즉, 리플렉션은 인스턴스 생성에만 쓰고, 이렇게 만든 인스턴스는 인터페이스나 상위 클래스로 참조해 사용하자.

### 언제 리플렉션을 쓸까?

- 코드 분석 도구, DI 프레임워크, intellij 자동완성, Jackson, Hibernate 등...
- 리플렉션은 컴파일 타임에 알 수 없는 객체의 생성에만 쓰자
- 생성된 객체는 인터페이스로 참조하여 사용하자

## 아이템 66 - 네이티브 메서드는 신중히 사용하라

> 최근 자바는 성장하면서 네이티브 메서드를 사용할 필요가 줄어들고 있다. 쓰지말자.

- JNI(자바 네이티브 인터페이스) → 자바 프로그램이 네이티브 메서드를 호출하는 기술
- 네이티브 메서드는 어디에 쓰이나?
    - 레지스트리 같은 플랫폼 특화 기능을 사용할 때
    - 네이티브 코드로 작성된 기존 라이브러리를 사용할 때
    - 성능 개선을 목적으로 성능에 결정적인 영향을 주는 영역에 사용할 때

### 네이티브 메서드의 단점

- 안전하지 않다. 메모리 훼손 오류로부터 안전하지 않다
- 이식성이 낮고, 디버깅이 어려우며, 주의하지 않으면 속도가 더 느려질 수 있다
- GC가 자동 회수하지 못하고, 추적할 수 없다.

### 네이티브 메서드를 써도 괜찮은 경우

- GNU 정밀 연산 라이브러리(GMP)가 필요한 경우

## 아이템 67 - 최적화는 신중히 하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-67.html)

## 아이템 68 - 일반적으로 통용되는 명명 규칙을 따르라

**명명 규칙**

- 패키지, 클래스, 인터페이스, 메서드, 필드, 타입 변수의 이름을 다룬다.
- 특별한 이유가 없으면 반드시 따르는 것이 좋다.
    - 그렇지 않으면 유지보수가 어려워지고, 의미를 오해할 수 있어 오류 발생 가능성이 높아진다.

**패키지와 모듈**

- 요소를 온점(.)으로 구분하여 계층을 짓는다.
- 요소들은 소문자 알파벳과 (드물게) 숫자로 이뤄진다
- 조직의 도메인 이름을 역순으로 한다.
    - `org.apache.commons.lang3.StringUtils`
    - 예외적으로 표준 라이브러리와 선택적 패키지들은 java, javax로 시작한다.
        - `java.time.LocalDate`
- 각 요소는 일반적으로 8글자 이하의 짧은 단어로 짓는다.
    - `java.utilities.Objects` (X)
    - `java.util.Objects` (O)

**클래스와 인터페이스**

- 하나 이상의 단어로 이루어지며, Pascal Case로 작성한다.
    - `StringUtils`
- 널리 통용되는 약어가 아니라면 줄여쓰지 않는다.
    - 만약 널리 통용되는 약어라면 첫 글자만 대문자로 표기한다.
        - `HTTPURL` (X)
        - `HttpUrl` (O)

**메서드와 필드**

- 하나 이상의 단어로 이루어지며, Camel Case로 작성한다.
    - `isEmpty`
- 상수 필드는 예외로, 모두 대문자로 작성하며 단어 사이는 언더바(_)로 구분한다.
    - `INDEX_NOT_FOUND`

**타입 매개 변수**

- 보통 한 문자로 표현한다.
    - `T`(ype) : 임의의 타입,
    - `E`(lement) : 컬렉션 원소의 타입
    - `K`(ey) - `V`alue : 맵의 키와 값
    - (e)`X`(ception) : 예외
    - `R`(eturn) : 메서드의 반환 타입

**인스턴스화 가능한 클래스, Enum**

- 보통 단수 명사, 명사구를 사용한다.
    - `AppType`

**인스턴스화가 불가능한 클래스**

- 보통 복수 명사를 사용한다.
    - `Collectors`

**어노테이션**

- 규칙이 따로 없어 명사, 형용사, 동사, 전치사가 두루 쓰인다.
    - `Singleton`, `Inject`

**인터페이스**

- 보통 단수 명사, 명사구를 사용한다.
    - `Comparator`
- ~able, ~ible로 끝나는 형용사를 사용하기도 한다.
    - `Runnable`

**메서드**

- 동사나 동사구를 사용한다.
- boolean을 반환한다면 is~, (드물게) has~로 시작하고, 명사, 명사구, 형용사로 끝난다.
    - `isEmpty`
- boolean을 반환하지 않거나 인스턴스의 속성을 반환한다면 명사, 명사구, 혹은 get으로 시작하는 동사구를 사용한다.
    - `getAge`, `size`

**특별한 메서드**

- 타입을 바꿔서 다른 객체의 객체를 반환하는 메서드는 `to~`
    - `toString`
- 객체의 내용을 다른 뷰로 보여주는 메서드는 `as~`
    - `asList`
- 객체의 값을 기본 타입으로 반환하는 메서드는 `~Value`
    - `intValue`
- 정적 팩터리라면 `from`, `of`, `valueOf`, `newInstance`, `getType` ... 등을 흔히 사용한다.
    - [아이템1](https://github.com/Meet-Coder-Study/book-effective-java/blob/main/2%EC%9E%A5/1_%EC%83%9D%EC%84%B1%EC%9E%90_%EB%8C%80%EC%8B%A0_%EC%A0%95%EC%A0%81%20%ED%8C%A9%ED%84%B0%EB%A6%AC_%EB%A9%94%EC%84%9C%EB%93%9C%EB%A5%BC_%EA%B3%A0%EB%A0%A4%ED%95%98%EB%9D%BC_%EA%B9%80%EB%AF%BC%EA%B1%B8.md)에 자세히 소개되어있다.

**필드**

- 규칙이 덜 명확하고 덜 중요하다.
- boolean 타입의 필드명은 보통 boolean 접근자 메서드에서 앞 단어를 뺀 형태이다.
    - `initialized`, `composite`
- 다른 타입의 필드는 명사, 명사구를 사용한다.
    - `birth`, `planType`
- 지역변수 명은 비슷하지만 조금 더 느슨하다.

## 아이템 69 - 예외는 진짜 예외 상황에만 사용하라

- 예외를 제어 흐름에 사용하지 말자
    - try-catch 블럭 안에서는 jvm이 수행하는 최적화가 제한된다.
    - 그래서 성능에도 큰 도움이 되지 않는다
- 잘 설계된 API는 클라이언트가 정상적인 제어 흐름에서 예외를 사용할 일이 없게 해야 한다.
- Iterator같은 경우, hasNext()를 통해 있는지 없는지 먼저 호출한 다음에 next()를 사용해서 클라이언트가 직접 예외를 사용하지 않아도 되도록 설계됐다. 즉, 잘 설계됐다.

## 아이템 70 - 복구할 수 있는 상황에는 프로그래밍 오류에는 런타임 예외를 사용하라.

- 체크드 익셉션은 호출하는 쪽에서 복구하리라 여겨지는 상황이면 검사 예외를 사용해야 한다.
    - 예를 들어, 요청했다가 실패했는데 그걸 다시 요청해서 복구하는 경우다. 커넥션을 다시 연결하게 해주기 위해서

## 아이템 71 - 필요없는 검사 예외 사용은 피하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-71.html)

## 아이템 72 - 표준 예외를 사용하라

- 표준 예외를 사용하면 익숙하기 때문에 다른 사람이 익히고 사용하기 쉽고 어떤 예외 상황인지 빠르게 파악할 수 있다.
- Exception, RuntimeException, Throwable, Error는 예외 클래스의 상위 클래스다. 구체적인 예외 정보를 알 수 없으므로 직접 사용하지 말자.

## 아이템 73 - 추상화 수준에 맞는 예외를 던져라

- 내부에서 발생한 예외를 그대로 던지는 것이 해당 예외 상황에 대해서 적절한 의미를 부여하지 못한다고 생각된다면 예외를 전환해서 던져라
- checked 예외를 던지고 싶을 때는 unchecked 예외로 바꿔서 던져라

## 아이템 74 - 메서드가 던지는 모든 예외를 문서화하라

- 예외를 문서화 하라
- @throws 태그를 사용해서 예외가 발생하는 조건을 써줄 수 있다

## 아이템 75 - 예외의 상세 메시지에 실패관련 정보를 담으라

- 가독성보다는 담긴 내용이 중요하다.
- 예외에 관여된 모든 매개변수와 필드 값
- 예외를 던질 때 그 범위의 최솟값, 최댓값, 그 범위를 벗어낫다는 인덱스 값
- 예외의 상세 메시지와 최종 사용자에게 보여줄 오류 메시지를 혼동해서는 안된다

## 아이템 76 - 실패 원자적으로 만들어라

- 실패 원자적이란?
    - 호출된 메서드가 실패하더라도 해당 객체는 메서드 호출 전 상태를 유지해야 한다는 특성
    - 즉, 에러가 났을 때 원래대로 돌려놔야 하는 것
    - 그래서 해당 객체를 불변 객체로 만들면 실패 원자적이 된다.
    - 불변 객체로 만들면 해당 객체에서 에러가 났을 때 그냥 버려도 된다.
- 항상 실패 원자적으로 만들기 위한 비용과 복잡도가 있으므로 상황에 따라서 잘 적용하자.

## 아이템 77 - 예외를 무시하지 말라

- 예외를 무시하는 경우
    - try catch에서 catch에서 아무 것도 안하는 것
    - catch에서 로그만 출력함
    - 무책임하게 throw
- 예외를 무시해도 되는 경우
    - close하는 경우
        - 그냥 catch에서 로그만 찍어줘도 된다
        - 게다가 close는 복구할 것도 딱히 없다.

## 아이템 78 - 공유 중인 가변 데이터는 동기화해 사용하라

[해당 글 참고](https://aegis1920.github.io/wiki/effective-java-item-78.html)

## 아이템 79 - 과도한 동기화는 피하라

> 동기화 영역 안에서의 작업을 최소한으로 줄이자

- 멀티스레드 프로세스는 동시성 또는 병렬성으로 실행된다.
    - 동시성 : 하나의 코어에서 여러 개의 프로세스가 번갈아 가면서 실행됨
    - 병렬성 : 멀티 코어에서 개별 스레드를 동시에 실행

## 아이템 80 - 스레드보다는 실행자, 태스크, 스트림을 애용하라

- ExecutorService를 이용하면 다음과 같은 장점을 얻을 수 있다
    - 큐에 작업을 제출하고서 작업이 완료될 때까지 기다릴 수 있다.(`invokeAny`, `invokeAll` 메소드)
    - 큐가 종료되기를 기다릴 수 있다.(`awaitTermination`)
    - 하나의 작업이 끝날때 마다 작업의 결과를 가져올 수 있다.(`ExecutorCompleteService`)
    - 작업을 특정 주기나 시간에 맞춰 동작할 수 있다.(`ScheduledThreadPoolExecutor`)
- 작업의 단위를 task로 나눌 수 있다.
    - 작업의 단위와 해당 작업을 실행하는 방식을 분리하면 해당 작업을 실행하는 방식(정책)을 바꾸어도 작업을 구현한 코드에는 영향이 없다.
    - Runnable, 값을 반환할 수 없으며 예외를 던질 수 없다.
    - Callable, 값을 반환할 수 있으며 임의의 예외를 던질 수 있다.
- 자바 7부터 ForkJoinPool을 지원한다

## 아이템 81 - wait와 notify보다는 동시성 유틸리티를 사용하라

- wait와 notify는 스레드의 상태 제어를 위한 메서드다
    - `wait()`는 가지고 있던 고유 락을 해제하고, 스레드를 잠들게 하는 역할을 하는 메서드이고,
    - `notify()`는 잠들어 있던 스레드 중 임의로 하나를 골라 깨우는 역할을 하는 메서드이다.
- 하지만, wait와 notify는 올바르게 사용하기가 아주 까다롭기 때문에, 대신 고수준 동시성 유틸리티를 사용하는 것이 좋다.
- 동시성 유틸리티
    - Collections.synchronizedMap으로 제공되는 SynchronizedMap 보다 ConcurrentHashMap을 사용하는 것이 성능적으로 훨씬 좋다.
- 동기화 장치
    - 동기화 장치는 스레드가 다른 스레드를 기다릴 수 있게 하여 서로 작업을 조율할 수 있도록 해준다. 자주 쓰이는 동기화 장치로는 CountDownLatch와 Semapore가 있으며 CyclicBarrier와 Exchanger, Phaser도 있다.
    - CountDownLatch는 하나 이상의 스레드를 기다리게 만드는 동기화 장치이다.
    - Semaphore는 특정 리소스에 접근하는 것을 제한하도록 지원하는 동기화 장치이다.

## 아이템 82 - 스레드 안정성 수준을 문서화하라

멀티스레드 환경에서도 API를 안전하게 사용하게 하려면 클래스가 지원하는 스레드 안정성 수준을 명시해야 한다.

다음은 스레드 안정성 수준이 높은 순으로 나열한 것이다.

1. 불변 (immutable)
    - 이 클래스의 인스턴스는 마치 상수와 같아서 외부 동기화가 필요없다.
    - 예) String, Long, BigInteger 등..
2. 무조건적 스레드 안전 (unconditionally thread-safe)
    - 이 클래스의 인스턴스는 수정될 수 있으나, 내부에서 충실히 동기화하여 별도의 외부 동기화가 필요없다.
    - synchronized 메서드가 아닌 비공개 락 객체를 사용한다.
    - 예) AtomicLong, ConcurrentHashMap
3. 조건부 스레드 안전 (conditionally thread-safe)
    - 무조건적 스레드 안전과 같으나 일부 메서드는 동시에 사용하려면 외부 동기화가 필요하다
    - 그래서 주의해서 문서화해야 한다.
        - 어떤 순서로 호출할 때 외부 동기화가 필요한지, 그 순서로 호출하려면 어떤 락을 얻어야 하는지 등
        - 클래스의 스레드 안정성은 보통 클래스의 문서화 주석에 기재하지만, 독특한 메서드라면 해당 메서드에 문서화하자.
    - 예) Collections.synchronizedMap, Collections.synchronizedSet 등등이 반환한 컬렉션들
4. 스레드 안전하지 않음 (not thread-safe)
    - 클래스의 인스턴스가 수정될 수 있다
    - 동시에 사용하려면 클라이언트가 별도의 동기화를 수행해야 한다.
    - 예) ArrayList, HashMap 등의 기본 컬렉션
5. 스레드 적대적 (thread-hostile)
    - 이 클래스는 모든 메서드 호출을 외부 동기화로 감싸더라도 멀티스레드 환경에서 안전하지 않다.
    - 고의로 만드는 사람은 없지만 동시성을 고려하지 않고 작성하다보면 우연히 만들어질 수 있다.
    - 예) generateSerialNumber에서 내부 동기화를 생략했을 때

## 아이템 83 - 지연 초기화는 신중히 사용하라

- 필드의 초기화 시점을 그 값이 처음 필요할 때까지 늦추는 기법
    - 즉, 그 값이 전혀 쓰이지 않으면 초기화도 결코 일어나지 않는다
    - 주로 최적화 용도로 사용하나 클래스와 인스턴스 초기화 때 발생하는 순환 문제를 해결하는 효과도 있다
- 클래스 혹은 인스턴스 생성 시 초기화 비용은 줄지만, 지연 초기화하는 필드에 접근하는 비용은 커진다
- 그래서 해당 필드를 사용하는 인스턴스의 비율이 낮은 반면, 그 필드를 초기화하는 비용이 클 때 사용하면 좋다.
- 지연 초기화 하는 법
    - synchronized 붙이기
    - Holder 클래스 사용 (강추)

## 아이템 84 - 프로그램의 동작을 스레드 스케줄러에 기대지 말라

> 동작하는 프로그램을 고치는 용도로 스레드 스케줄러를 사용하면 안된다.

- 스레드 스케줄러는 스레드의 실행 시점, 종료 시점 등등을 관리하는 역할을 한다. 우선순위를 정해준다.
- 스케줄러 정책은 OS마다 다를 수 있으며 다른 플랫폼에 이식하기도 어렵다.
- 실행 가능한 스레드 수(대기 상태인 스레드)를 적게 유지하자.
- 스레드 풀 크기를 적절히 설정하고 작업은 짧게 유지하자.
- Thread.yield()는 다른 스레드에게 실행을 양보하는 메서드. 쓰지 말자. 오히려 성능이 나빠질 수 있다. 테스트할 수단도 없다
- Thread Priority를 조절하지 말자. 스레드 우선순위는 이식성이 가장 나쁜 특성에 속한다. (OS마다 다르게 동작할 수 있다.)

## 아이템 85 - 자바 직렬화의 대안을 찾으라

[해당 글 참고](https://github.com/aegis1920/book-effective-java/blob/item85/12%EC%9E%A5/85_%EC%9E%90%EB%B0%94_%EC%A7%81%EB%A0%AC%ED%99%94%EC%9D%98_%EB%8C%80%EC%95%88%EC%9D%84_%EC%B0%BE%EC%9C%BC%EB%9D%BC_%EC%9D%B4%ED%98%B8%EB%B9%88.md)

## 아이템 86 - Serializable을 구현할 지는 신중히 결정하라

- 클래스가 Serializable을 구현하면 직렬화된 바이트 스트림도 하나의 공개 API가 된다
    - 즉, 이 클래스가 널리 퍼지면 영원히 바이트 스트림으로 된다.
    - 만약 클래스에 필드를 추가한다면? 즉, 클래스가 수정되면 serialVersionUID도 바뀌어서 이 버전 ID를 명시해줘야 한다. 말 그대로 버전관리라서 수정할 때마다 ID만 증가시키면 된다.
    - 근데 이걸 명시 하더라도 int를 long으로 바꾸면 고칠 수가 없다.
    - 즉, 초기 버전에서 Serializable을 구현하고 있으면 이전 버전에 영향 없이 소스코드 수정은 매우 어렵다.
- 직렬화 가능 클래스가 수정되면 신 버전 인스턴스를 직렬화한 후 구 버전으로 역직렬화할 수 있는지 그 반대도 되는지... 테스트해야할 것이 엄청 늘어난다.
- 부모 클래스는 직렬화를 지원하지 않고, 자식 클래스는 직렬화를 해야한다면 부모 클래스는 기본 생성자가 있어야 한다. 만약 지원하지 않으면 하위 클래스는 어쩔 수 없이 프록시 패턴을 사용해야 한다.
- 내부 클래스는 직렬화를 구현하면 안된다. 컴파일러가 자동으로 생성한 필드가 추가된다.

## 아이템 87 - 커스텀 직렬화 형태를 고려해보라

- 객체의 물리적 표현(코드로 어떻게 구현됐는지)와 논리적 내용(실제로 어떤 것을 의미하는지)가 같다면 기본 직렬화 형태라고 부른다.

## 아이템 88 - readObject 메서드는 방어적으로 작성하라

- 역직렬화를 할 때 쓰는 것이 readObject()다
- readObject의 문제점
    - 새로운 객체를 만들어내는 public 생성자와 같다고 할 수 있다.
    - 따라서 생성자처럼 유효성 검사, 방어적 복사를 수행해야 한다. 그렇지 않으면 불변식을 보장하지 못한다.
    - 예를 들어, start가 end보다 늦는 바이트 스트림이 있을 수 있다.
    - 그래서 readObject를 정의하고 유효성 검사를 실시한다.
- 불변식이 깨지지 않으면 기본 readObject를 써도 된다.
- readObject 메서드에서 재정의 기능 메서드를 호출하면 안된다. 생성되기 이전에 생성자의 재정의된 메서드가 실행되므로 오류를 뱉게 된다.

## 아이템 89 - 인스턴스 수를 통제해야 한다면 readResolve 보다 열거 타입을 사용하라

> 직렬화가 필요하며 인스턴스 수가 하나임을 보장하고 싶을 때, enum 타입을 가장 먼저 고려하자

- 싱글턴 패턴에 직렬화를 추가하는 순간 더이상 싱글턴이 아니게 된다
    - 왜냐면 readObject 메서드로 인스턴스가 새로 생성된다.
    - 즉, Serializable을 구현하면 더 이상 이 클래스는 싱글턴이 아니다.
    - readResolve라는 메서드를 구현하면 내가 원하는 것으로 바꿀 수 있다.
- 그래서 차라리 enum 타입으로 만드는 것이 좋다.

## 아이템 90 - 직렬화된 인스턴스 대신 직렬화 프록시 사용을 검토하라

- Serializable을 구현하기로 결정한 순간, 언어의 생성자 이외의 방법으로도 인스턴스를 생성할 수 있게 된다.
- 직렬화 프록시 패턴 (Serialization Proxy Pattern)을 이용하면 이러한 위험을 크게 줄여줄 수 있다.
    - 가짜 바이트 스트림 공격과 내부 필드 탈취 공격을 프록시 수준에서 차단해준다
    - 필드들을 final로 선언할 수 있으므로 Period 클래스를 진정한 불변으로 만들 수 있다.
    - 역직렬화를 할 때 유효성 검사를 하지 않아도 된다.

