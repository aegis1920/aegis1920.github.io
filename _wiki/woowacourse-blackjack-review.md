---
layout  : wiki
title   : 우아한 테크코스 블랙잭 미션 리뷰
summary : 
date    : 2020-04-20 19:55:32 +0900
updated : 2020-04-20 19:57:11 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

도메인 설계와 구현을 페어와 함께 진행했다. Dealer와 Player를 뜻하는 Participant를 구현할 때 인터페이스로 구현할 것인지, 추상 클래스로 구현할 것인지에 대한 고민을 많이 했었던 것 같다.

이번 페어는 피드백을 직접 전달해줬었다. 내가 네비게이터가 되어 말할 때는 적극적으로 했는데 구현하고 있을 때는 수동적이라는 의견이 있었다. 페어에게 직접 피드백을 말하는 것도 상대방을 위한 좋은 방법인 것 같다.

> State를 인터페이스로 만들어 개발하는 방법은 너무나 신기했다. 기억해뒀다가 시간 날 때 적용해야겠다.

## 내가 받았던 피드백

- 프로덕션 코드에 테스트를 위한 코드를 만드는 것을 지양하자
- 도메인 객체에서 View에서 사용할 값을 만드는 것을 지양하자. `filter`를 통해 0이 아닌 값만 뽑도록 하는 로직도 "0이 아닌 값들만 보여준다"는 의미이기에 도메인 로직이 아닌 View에서 처리하는 것으로 하자.
- `sum()`을 해줄 때 `reduce()`를 통한 `Integer`의 `sum()`이 아니라 의 `mapToInt()`를 통한 `IntStream`의 `sum()`을 사용하도록 하자
- Rule 자체를 `Enum`으로 관리하는 것도 좋은 방법이다. 그리고 중복되는 검증 또한 `Enum`의 순서를 통해 제거해줄 수 있다

## 배운 내용

### 객체와 클래스

- 클래스는 객체의 Factory 이며, 객체를 만들고, 추적하고, 적절한 시점에 파괴한다
- 클래스가 객체를 생성할 때 "클래스가 객체를 인스턴스화한다"라고 표현한다
- 클래스를 '객체의 능동적인 관리자'로 생각해야 한다
- 클래스는 객체를 보관하고 필요할 때 객체를 꺼낼 수 있고 더 이상 필요하지 않을 때 객체를 반환할 수 있는 저장소로 바라봐야 한다
- 확실하게 이야기하면 객체의 파괴는 GC가 해준다

### 생성자

- 생성자는 생성할 때 어떤 일을 수행할 수 있게 해서, 객체가 자신의 의무를 수행할 수 있도록 준비시킨다
- 생성할 때 어떤 일을 수행할 수 있게 해주기 때문에 유연성을 제공해준다
- 응집도가 높고 견고한 클래스는 적은 수의 메서드와 많은 수의 생성자가 존재한다
- 생성자의 주된 임무는 제공된 인자를 사용해 캡슐화된 프로퍼티를 초기화하는 것이다
- 유효성 검사를 해줄 수 있다. 다만 매 생성자마다 할 것이 아니라 주 생성자에서 검증을 하도록 만들고 부 생성자에서 this를 통해서 해주는 게 좋다.

### 상속

- 상속을 완전히 제거하기보다 올바르게 사용하자
- 클래스와 메서드에 final을 붙여 상속을 불가능하게 만들거나 abstract를 붙여 강제 구현하도록 해서 상속과 관련된 문제를 없앨 수 있다
- 상속의 문제는 상위 클래스의 내부 구현이 달라지면 하위 클래스가 오동작할 수 있으며 하위 클래스에서 재정의하더라도 상위 클래스의 로직을 알아야 하기 때문에 어렵고 시간이 더 든다.
- 상속이 적절한 경우는 클래스의 행동을 확장하는 것이 아닌 정제(refine)할 때다. 정제란 부분적으로 불완전한 행동을 완전하게 만드는 것을 의미한다
- B가 정말 A인가라고 할 때만 클래스 A를 상속해야한다.
- 예를 들어, 로또 미션에서 당첨번호가 로또 넘버와 같나?를 보면 보너스 넘버라는 것을 가지고 있기 때문에 다를 수 밖에 없다.
- 즉, 위닝 넘버는 로또 넘버가 될 수 없다! 그래서 상속을 하면 안된다.
- 추상 클래스를 사용할 때가 상속이 필요한 경우다. 추상클래스를 만들어놓고 얘를 만들 때가 필요한 것.
- 일단 인터페이스를 사용하다가 좀 더 정제가 필요하면 추상 클래스를 생각해봐라.

### 조합

- 기존 클래스를 확장하는 대신 새로운 클래스를 만들고 private 필드로 기존 클래스의 인스턴스를 참조하게 하자
- 상속보다는 조합을 사용해야 문제가 적다

### 인터페이스

- default가 생긴 이유는 이미 작성된 인터페이스에 새로운 메서드를 추가하고 싶기 때문이다
- 예를 들어, List라는 콜렉션이 인터페이스로 되어있는데 여기에 새로운 기능을 추가하면 상당히 편하겠다는 생각이 들었기 때문
- 새로 정의할 수도 있지만 이미 널리 퍼진 코드이기에 쉽게 바꿀 수가 없었다
- 일급컬렉션을 Iterable 인터페이스로 순회할 수 있도록 하면 안된다. 왜냐하면 외부로 개방된 곳에서 코드를 작성할 수 있기에 취약한 구조가 된다.

### 가변객체

- 상태값을 변경하는 객체

### 불변객체

- 모든 클래스를 상태를 변경할 수 없는 불변 클래스로 만들면 유지 보수성이 크케 향상된다
- 현대 컴퓨터의 성능을 무시하지 말자. 마음껏 new 하자^^
- immutable이 주는 이점은 메모리 낭비보다 훨씬 크다.(오라클피셜)

### 블랙잭 공통 피드백

- 자주 사용하는 인스턴스는 `IntegerCache`처럼 미리 생성해놓고 `of()`를 통해 가져오도록 하자. 즉, 정적 팩토리 메서드를 사용해보자
- 테스트 패키지에 Fixtures라는 클래스를 만들어 `public static final PlayingCard CULBS_ACE = PlayingCard.of(~~);` 처럼 많은 카드들을 쉽게 테스트할 수 있도록 만들어놓자
- 반복되는 조건문을 다형성을 사용해 해결해보자
- 게임 내 규칙을 자바 객체로 추상화하자
  - State 인터페이스
  - Started, Running, Finished 추상 클래스
  - Hit, Bust, Blackjack, Stay 클래스
  - 현재 상태에서 다음 상태의 객체를 생성하는 역할을 현재 상태가 담당하도록 한다.
- State는 딜러, 플레이어가 사용하냐의 관점이 아니라 다른 규칙이 생기더라도 받아들일 수 있게, 그 자체 State 로 바라봐야한다.

Score 같은 클래스의 경우 불변 객체로 만들면 좋다

```java
public interface State {
    State draw(PlayingCard card); /

    State stay();

    boolean isFinished(); // 카드를 더 받을 수 있는 상태인지

    Cards cards();

    double profit(double money);
}

public class Player {
    private String name;
    private State state; // 이 안에 cards가 들어간다. 딜러나 플레이어가 Cards를 갖고 있는 게 아니라 State를 가질 수 있도록 한다. 카드 한 장을 뽑을 때마다 상태가 변하기 때문에 void가 아닌 State로 반환값을 준다.
}

// 플레이어한테 Cards와 함께 Started를 맨 처음에 준다
public abstract class Started implements State {
    protected Cards cards;

    public Started(final Cards cards) {
        this.cards = cards;
    }

    @Override
    public Cards cards() {
        return cards;
    }
}

// Finished 일 때는 draw, stay가 모두 불가하다.
public abstract class Finished extends Started {
    public Finished(final Cards cards) {
        super(cards);
    }

    @Override
    public State draw(final PlayingCard card) {
        throw new UnsupportedOperationException();
    }

    @Override
    public State stay() {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isFinished() {
        return true;
    }

    @Override
    public double profit(double money) {
        return money * earningRate();
    }

    public abstract double earningRate();
}

// Running 일 때는 profit이 불가하다
public abstract class Running extends Started {
    public Running(final Cards cards) {
        super(cards);
    }

    @Override
    public boolean isFinished() {
        return false;
    }

    @Override
    public double profit(final double money) {
        throw new UnsupportedOperationException();
    }
}

ublic class Hit extends Started {

    public Hit(Cards cards) {
        super(cards);
    }

    public State draw(PlayingCard card) {
        cards.add();
        if(cards.isBust()) {
            return new Bust(cards);
        }
        return new Hit(cards);
    }

    public State stay() {
        return new Stay(cards);
    }

    public boolean isFinished() {
        return false;
    }

    public double profit() {
        throw new UnsupportedOperationException();
    }
}

public class Stay extends Finished {
    public Stay(final Cards cards) {
        super(cards);
    }

    public State draw(PlayingCard card) {
        throw new UnspportedOperationException();
    }

    @Override
    public double earningRate() {
        return 1;
    }
}

public class Blackjack extends Finished {
    public Blackjack(final Cards cards) {
        super(cards);
    }

    @Override
    public double earningRate() {
        return 1.5;
    }
}

public class Bust extends Finished {
    public State draw(PlayingCard card) {
        throw new UnspportedOperationException();
    }

    public boolean isFinished() {
        return true;
    }
}

class HitTest {
    @Test
    void draw() {
        final Hit hit = new Hit(new Cards(CLUBS_ACE, CLUBS_TWO));
        final State state = hit.draw(CLUBS_TEN); // 이런 식으로 State를 관리한다.
        assertThat(state).isInstanceOf(Hit.class);
    }

    @Test
    void bust() {
        final Hit hit = new Hit(new Cards(CLUBS_TEN, CLUBS_TWO));
        final State state = hit.draw(CLUBS_KING);
        assertThat(state).isInstanceOf(Bust.class);
    }
}

// 처음 카드를 받을 때
public class stateFactory {
    public static State draw(PlayingCard first, PlayingCard second) {
        Cards cards = new Cards(first, second);
        // 처음 카드를 받을 때 hit 아니면 blackjack 밖에 안 나온다.
        if(cards.isBlackjack()) {
            return new Blackjack(cards);
        }
        return new Hit(cards);
    }
}
```
