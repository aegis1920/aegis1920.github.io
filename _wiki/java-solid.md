---
layout  : wiki
title   : 객체 지향의 SOLID 개념 정리
summary : 
date    : 2020-02-22 22:09:33 +0900
updated : 2020-04-20 14:12:33 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## SOLID

- 응집도는 높이고, 결합도는 낮추라는 고전 원칙을 객체 지향 관점에서 재정립한 것
- 소프트웨어에 녹여 내야 하는 개념
- SOLID 원칙을 사용하면 소스 파일의 개수는 더 많아지지만 이해하기 쉽고, 유지보수하기 쉬워진다

### SRP(Single Responsibility Principle, 단일 책임 원칙)

> 클래스는 단 한 개의 책임을 가져야 한다

- 클래스가 여러 책임을 갖게 되면 각 책임마다 변경되는 이유가 발생한다. 즉 여러 책임을 갖고 있을 때 어떤 책임 하나의 기능에 변화가 생긴다면 다른 책임에 주는 영향또한 매우 커진다. 
- 위와 같은 이유로 다른 책임에 영향을 주지 않기 위해서는 클래스가 하나의 이유로만 변경돼야하며 하나의 이유로만 변경되려면 클래스는 한 개의 책임만을 가져야 한다
- 또한 SRP가 잘 지켜지지 않으면 다른 원칙도 효과가 반감되기 때문에 최대한 지켜야 한다
- 고로 역할(책임)을 잘 분리하고 객체에게 할당하되 클래스에 단 한 개의 책임을 갖게 하자.
- 예를 들어, 체스판의 경우 Board라는 역할이 있으면 Piece를 추가하는 책임, Piece를 삭제하는 책임 등등이 있다.

-> 추상화를 통해 클래스를 선별할 때 반드시 SRP를 고려하자.

### OCP(Open Closed Principle, 개방 폐쇄 원칙)

> 자신의 확장에 대해서는 열려 있고, 변경에 대해서는 닫혀 있어야 한다.

- 운전자와 벤츠라는 클래스가 있을 때 상위 클래스 또는 **인터페이스(자동차)를 중간에 둠으로써** 다양한 자동차가 생긴다고 해도 객체 지향 세계의 운전자는 영향을 받지 않게 되는 것.
    - 자동차 입장에서는 다양한 자동차가 생기므로 확장이고 운전자 입장에서는 다양한 자동차가 생겨도 변하지 않으므로 변화에 대해 폐쇄돼있다.
- JDBC 인터페이스가 좋은 예다. 오라클, MySQL이 오더라도 Connection 코드만 바뀌면 클라이언트 코드는 바뀔 필요가 없다.
- 전략 패턴과 관련있는 주제다
- OCP는 객체 지향 프로그래밍의 큰 장점인 유연성, 재사용성, 유지보수성을 얻을 수 있게 해주기 때문에 매우 중요한 원칙이다

### LSP(Liskov Substitution Principle, 리스코프 치환 원칙)

> 하위 클래스는 언제나 상위 클래스로 교체할 수 있어야 한다

- 하위 클래스가 상위 클래스의 역할을 하면서 확장하라
- 상속에서 하위 클래스 **is a kind of 상위 클래스, is able to 인터페이스를 지키고 있다면** LSP를 잘 지키고 있다는 뜻
- 상속을 조직도나 계층도가 아니라 **분류도**로 해야 LSP를 만족한다.

### ISP(Interface Segregation Principle, 인터페이스 분리 원칙)

> 인터페이스를 구현하는 객체는 자신이 사용하지 않는 메서드에 의존 관계를 맺으면 안된다

- ISP를 지키다보면 SRP가 지켜지지만 SRP를 지킨다고 해서 ISP가 지켜지는 건 아니다

#### ISP vs SRP

- 인터페이스를 작은 단위로 쪼개면 SRP를 지킬 수 있다. 그런데 SRP를 지킨다고 해서 ISP를 지켰다고 할 수 없는데 그 이유는 SRP를 제공하더라도 클라이언트에 따라서 특정 인터페이스만 제공해야 할 수도 있기 때문
- 예를 들어 게시판은 글 작성, 글 읽기, 글 수정, 글 삭제 기능을 모두 제공함으로써 SRP를 만족할 수 있다. 하지만 개인 사용자 클라이언트는 게시판 삭제 기능을 사용하면 안 되므로 특화된 별도의 인터페이스가 필요하다. 그러므로 SRP를 만족했을 때 항상 ISP가 만족하는 것은 아니다

### DIP(Dependency Inversion Principle, 의존 역전 원칙)

> 자주 변경되는 구체(Concreate) 클래스에 의존하지 말고 추상화된 것에 의존해야 한다

- 자신보다 변하기 쉬운 것에 의존하지 마라
- **상위 클래스, 인터페이스, 추상 클래스**일수록 변하지 않을 가능성이 높기 때문에 이 3가지를 통해 의존하라는 것

### 출처

- 스프링 입문을 위한 자바 객체 지향의 원리와 이해
- 개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴

