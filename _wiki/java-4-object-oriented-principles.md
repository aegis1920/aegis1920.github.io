---
layout  : wiki
title   : 객체 지향의 4대 특성
summary : 
date    : 2020-02-24 14:19:39 +0900
updated : 2020-02-24 14:21:06 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 객체 지향의 4대 특성

- **캡슐화 : 정보은닉**
- **상속 : 재사용**
    - 상속은 재사용과 확장으로 이해하는 것이 맞다. 상속 관계에서 반드시 만족해야 할 문장 : 하위 클래스는 상위 클래스다
    - ex) `아들은 아버지다` 이런 게 아니라 `고래는 동물이다`와 같이 **클래스(분류)의 개념**으로 가야됨
    - `동물 뽀로로 = new 펭귄();`
    - 하위 클래스 is a kind of 상위 클래스(고래 is a kind of 동물)
    - 즉, 상속은 상위 클래스의 특성을 재사용하고 확장하며 is a kind of 관계를 만족해야 한다. (is a 관계라고 생각하지 말자)
    - 하위 클래스의 객체를 생성하면 하위 클래스의 인스턴스만 힙 영역에 생기는 것이 아니라 상위 클래스의 인스턴스도 함께 힙 영역에 생긴다. 그래서 모든 클래스의 최상위 클래스인 Object 클래스의 인스턴스도 함께 생성된다.
    - 상위 클래스 타입의 객체 참조 변수를 사용하더라도 하위 클래스에서 오바라이딩한 메서드가 호출된다.
    - 예를 들어, 상위 클래스에 특성이 적다면 `사람 홍길동 = new 학생();` 의 경우 `((학생) 홍길동).학번` 과 같이 하위 클래스에 있는 학번이라는 속성을 이용하기 위해서 캐스팅을 자주 해야한다.
- **추상화 : 모델링**
    - 클래스는 분류에 대한 개념이지 실체가 아니다. 객체가 실체다.
    - 클래스는 같은 특성을 지닌 여러 객체를 총칭하는 **집합의 개념**이다.
    - `사람 홍길동 = new 사람();`
    - 사람이라는 클래스(class : 분류)를 이용해 유일무이하고 새로운 하나의 사람(객체)을 만들어 홍길동(객체 참조 변수)라는 이름을 지어준 것.
    - 클래스 설계에서 추상화가 사용되며 클래스 설계를 위해서는 애플리케이션 경계부터 정해야 한다.
    - 객체 지향에서 추상화의 결과는 클래스다.
    - 객체 속성은 힙 영역에 객체가 생성되면 바로 그때 각 객체 안에 멤버 속성을 위한 메모리 공간이 할당된다.
    - **클래스는 분류스럽게, 객체 참조 변수명은 유일무이한 사물처럼 작명해야한다**. 왜냐면 객체는 객체의 특성이 유일무이한 것이기 때문에.
- **다형성 : 사용 편의**
    - 인터페이스는 be able to, 즉 '무엇을 할 수 있는'이라는 표현 형태로 만드는 것이 좋다.
    - **인터페이스 최소 주의**
        - 인터페이스는 그 역할에 충실한 **최소한의 기능만 공개해야 된다.**
        - 인터페이스를 쓰면 그 안에 있는 메소드를 모두 구현해야하고 그만큼 배울 게 많아진다.
        - 메소드를 적게 유지하면 클라이언트가 클래스가 수행할 수 있는 것들을 쉽게 찾을 수 있고 구현하는 사람의 부담을 줄일 수 있다.
        - 너무 큰 것을 갖는 것보다 작은 것으로 시작하고 추가하는 것이 옳다.
    - 인터페이스는 `public` 추상 메서드와 `public static final` 변수만 가질 수 있다. 알아서 붙여준다.

### 번외 : 추상 클래스

추상 클래스는 인스턴스(객체)를 만들 수 없는 클래스다.

- 예를 들어, `Animal`클래스가 있다고 하자. `Animal` 클래스안에 `crying()` 이라는 메서드가 있다. 이 메서드를 상속하면 모두 `crying()`이라는 메서드를 쓸 수 있다. 그러나 정작 `Animal`클래스는 운다는 행동을 전해주기만 할 뿐 동물이라는 개념 그 자체라서 동물 객체가 울 수는 없다.
- 여기서 이러한 고민이 생긴다. 동물 객체는 어떻게 울어야 하지? / 누가 실수로 동물 객체를 만들면 어떡하지?
- 또는 동물 참조 변수 배열로 모든 동물을 울게하려면 하위 클래스에서 오버라이딩할 메서드가 동물 클래스에 필요한데?
- 앞의 두 가지 걱정을 모두 없애주는 것이 abstract 클래스다
- **추상 메서드는 하위 클래스에게 메서드의 구현을 강제하고 추상 클래스는 객체를 만들 수 없다.**

**상위 클래스는 물려줄 특성이 많을수록 좋고, 인터페이스는 구현을 강제할 메서드가 적을수록 좋다.**

### 출처

- 스프링 입문을 위한 자바 객체 지향의 원리와 이해
- [인터페이스 최소주의]([https://www.martinfowler.com/bliki/MinimalInterface.html](https://www.martinfowler.com/bliki/MinimalInterface.html))
