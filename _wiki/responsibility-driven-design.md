---
layout  : wiki
title   : 책임 주도 설계
summary : 
date    : 2020-04-16 17:40:55 +0900
updated : 2020-04-16 17:48:06 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

- 오브젝트 책의 책임 주도 설계 부분을 읽어보자
- 현장에서 책임 주도 설계를 바로 적용하려면 어렵다.
- 책임이란 객체에 의해 정의되는 응집도 있는 행위의 집합으로, 객체가 유지해야 하는 정보와 수행할 수 있는 행동에 대해 개략적으로 서술한 문장이다. 
    - 즉, **객체가 무엇을 알고 있는가와 무엇을 할 수 있는가로 책임이 구성된다.**

- 객체가 할 수 있는 것
  - 객체를 생성하거나 계산을 수행하는 등의 스스로 하는 것
  - 다른 객체의 행동을 시작시키는 것
  - 다른 객체의 활동을 제어하고 조절하는 것

- 객체가 알고있는 것
  - 사적인 정보에 관해 아는 것
  - 관련된 객체에 대해 아는 것

책임 주도 설계란?
- 프로그래밍의 책임을 찾고 책임을 수행할 적절한 객체를 찾아 책임을 할당하는 방식으로 협력을 설계하는 방법

역할이란?
- 객체가 어떤 특정한 협력 안에서 수행하는 책임의 집합을 역할이라고 부른다.

책임 주도 설계 과정
1. 시스템의 책임을 파악하라
2. 책임을 더 작은 책임으로 분할한다
3. 분할된 책임을 수행할 수 있는 적절한 객체 또는 역할을 찾아 책임을 할당한다.
4. 객체가 책임을 수행하는 도중 다른 객체의 도움이 필요한 경우, 이를 적절한 객체 또는 역할을 찾는다.
5. 해당 객체 또는 역할에게 책임을 할당함으로써 두 객체가 협력하게 한다.

#### 결론

구현에 집중하는 게 쉽지만 책임 주도 설계는 자연스럽게 **객체의 구현이 아닌 책임에 집중할 수 있게 한다.**
구현이 아닌 책임에 집중하는 것이 중요한 이유는 **유연하고 견고한 객체지향 시스템을 위해 가장 중요한 재료가 바로 책임**이기 때문이다.

### 책임 주도 설계로 자동차 경주 게임을 구현해보자

1. 시스템 책임
    1. 행위를 먼저 찾아보자.
    2. 자동차 경주 게임을 하려면 '경주를 하라'가 필요하다.
    3. 책임을 파악한 후 책임을 할당할 객체를 바로 결정하지 않아도 된다.
    4. '경주를 하라' 라는 책임을 발견했다
2. 더 작은 책임으로 분할하자
    - 경주를 하라
        1. 이동 가능 여부를 결정하라
        2. 이동하라
3. 책임을 수행할 수 있는 적절한 객체를 할당하자
    - Car 하나에 race(), canMove(), move() 메서드를 모두 구현해줄 수 있다.
    - 그러나 좀 더 생각해보면 아래와 같은 구조를 생각할 수 있다.
    - Car race(), RandomNo canMove(), Position move()
4. 구현
    -  인터페이스를 먼저 작성하고 의존 관계를 어떻게 가지는지 생각해봐야한다.
    -  책임에 해당하는 부분만 일단 인터페이스로 만든다

```java
public interface Racing {
    void race(MoveStrategy moveStrategy);
}

public interface MoveStrategy {
    boolean canMove();
}

public interface Movable {
    void move();
}
```

```java
public class PositionTest {
    @Test
    void 이동() {
        Position position = new Position();
        position.move();
        assertThat(positon.getPosition()).isEqualTo(1);
    }
}
```

- 여기서 현재 상태를 변경하는 메서드를 구현해야 하는데 최대한 immutable 하게 만들어보자

```java
public class Position implements Movable {
    // ...
    @Override
    public void move1() { // 보통 이런 식으로 짜는데 이렇게 하면 move() 라는 메서드에 상태를 변경하는 메서드가 있게 된다.
        this.position++;
    }

    @Override
    public Position move2() { // 직접 set하는 메서드가 없어 immutable Object가 되기 때문에 안전한 코드가 된다. 인스턴스가 많아져서 느려질 수 있지만 기술의 발전으로 커버가 된다. 이 방법을 사용하자.
        return new Position(this.position + 1);
    }
}
```
- 랜덤값을 테스트하기 위해 MoveStrategy를 구현하는 RandomMoveStrategy 클래스를 만든다

```java
public class RandomMoveStrategy implements MoveStrategy {
    private int no;

    public RandomMoveStrategy(int no) {
        this.no = no;
    }

    @Override
    public boolean carMove() {
        return no >= 4;
    }

}
```


```java
public class Car implements Racing {
    private Movable movable = new Position(); // 일단 만들어 놓고 해보는데 Movable 인터페이스가 필요없어질 수 있다. 그냥 Position 클래스만 필요할 수도...
    
    @Override
    public void race(MoveStrategy moveStrategy) {
        if(moveStrategy.canMove()) {
            moveable.move();
        }
    }
}
```

- `race()` 메서드 안에 들어가는 `MoveStrategy` 인터페이스가 상당히 중요한 부분이다.
- `MoveStrategy` 인터페이스를 구현함으로써 조건이 있는 `RandomMoveStrategy` 클래스를 받을 수 있고 전진(`canMove()의 반환값이 항상 true`)만 하는 `ForwardMoveStrategy` 클래스 또한 받을 수 있게 된다.
- `ForwardMoveStrategy` 클래스는 정적 팩토리 메서드로 `getInstance()`를 통해 매개변수 없이 받을 수 있다.

```java
public class ForwardMoveStrategy implements MoveStrategy {
    private static ForwardMoveStrategy forwardMoveStrategy = new ForwardMoveStrategy();

    private ForwardMoveStrategy() {
    }

    public static ForwardMoveStrategy getInstance() {
        return forwardMoveStrategy;
    }

    @Override
    public boolean isMovable() {
        return true;
    }
}
```

- 이와 같이 구현하면 실제로 실행할 때는 `RandomMoveStrategy` 클래스를 통해서 랜덤으로 받지만 테스트해줄 때 전진을 원하면 `ForwardMoveStrategy`를 써주면 되기 때문에 테스트하기 훨씬 쉬워진다.
- 그러나 쉬운 작업은 아니다. 처음부터 인터페이스간의 설계로 생각하기가 어렵다.

```java
class Test {
    @Test
    void test() {
        MoveStrategy randomMoveStrategy = new RandomMoveStrategy(number);
        MoveStrategy forwardMoveStrategy = ForwardMoveStrategy.getInstance();
        assertThat(randomMoveStrategy.canMove()).isEqualTo(expected);
        assertThat(forwardMoveStrategy.canMove()).isEqualTo(true);
    }
}
```

#### 결론

1. 시스템의 책임을 파악하자.
2. 더 작은 책임으로 분리해 구현하는데 책임을 위주로 인터페이스부터 만들어보자.
3. 일단 쓰레기 같은 코드를 만들어서 최대한 빠르게 기능 구현을 하자
4. 지속적인 리펙토링과 TDD 사이클을 반복해 설계의 품질을 높혀 나가자
5. 가능하면 인스턴스가 많이 만들어져도 immutable하게 만들자
