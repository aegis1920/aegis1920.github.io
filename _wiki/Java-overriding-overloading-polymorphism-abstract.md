---
layout  : wiki
title   : Java 오버로딩, 오버라이딩, 다형성, 추상 클래스
summary : 
date    : 2019-06-20 14:47:04 +0900
updated : 2019-06-20 14:47:38 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# Java 오버로딩, 오버라이딩, 다형성, 추상 클래스

## Overloading(오버로딩)

- **동일한 소스 내에서 이름이 같은 메소드나 이름이 같은 사용자 정의 함수(생성자)를 의미한다.**
  - 호출하는 이름은 같지만, 파라미터들은 다르다.
  - 파라미터 개수가 같다면 파라미터들의 타입이 다르다.
  - 리턴 타입은 다를 수 있다.(생성자의 경우는 어차피 없다)

## Override(오버라이딩, 재정의)

- **상속을 했을 때 부모 클래스에 있는 메소드를 자식 클래스에서 쓸 수 있지만, 자식 클래스에서 그 메소드를 똑같이 만들어(재정의해서) 자식클래스의 것으로 사용할 수 있다. ** 
- 재정의는 물리적인 대체가 아니라 논리적인 대체다.

## 다형성(Ploymorphism)

- 다형성이란 하나의 메소드나 클래스가 있을 때 이 하나의 메소드나 클래스들이 다양한 방법으로 동작하는 것을 의미한다.
- 다형성은 상속, 오버라이딩과 자주 연관된다.
- **class B extends A 라는 게 있다. 그리고 각 A, B 클래스에는 각각 a, b라는 메소드(A -> a, B -> b)가 있다. 그리고 A obj = new B;를 해서 obj 인스턴스를 통해 a, b 메소드를 호출하면 어떻게 될까?**
  - 일단 첫 째로 `A obj = new B;`로의 인스턴스화가 가능하다.
  - 즉, 부모 클래스 데이터 타입으로 자식 클래스를 인스턴스화 하는 것이 가능하다.
  - 그러나 obj 인스턴스를 통해 A와 B에 있는 a, b메소드를 쓴다고 하면 A에 있는 메소드(a)는 쓸 수 있지만 B에 있는 메소드(b)는 쓸 수 없다.
  - **그 이유는 컴파일러가 객체 자료형(데이터 타입)만 보고 A(부모 클래스)에만 가서 그 메소드(b)가 있는지 없는지 찾기 때문이다. B 클래스에는 가지 않는다. A 클래스에 없다면 바로 컴파일 에러를 일으킨다.**
    -  **동적 Binding** : 컴파일러가 봤을 때는 A에 있는 걸 호출하라고 하지만 부모 클래스와 자식 클래스에 똑같은 이름의 메소드가 재정의(오버라이딩)되어있다면 런타임 시에는 실제 인스턴스에 있는 B가 호출된다. 
    - 실행 그 자체는 실행되는 인스턴스, 객체 자체는 B클래스에서 실행되기 때문이다. 실제 움직이는 것(실행되는 것)은 리모컨이 가리키는 인스턴스가 된다.
  - **즉 컴파일러는 실제 인스턴스의 메소드를 보는 게 아니라 변수 선언 타입의 메소드를 본다.**

- big(상위, 부모) >= small(하위, 자식)으로 생각하면 편하다.
- 상위로 갈수록 할 수 있는 일은 적어지고, 하위로 갈 수록 할 수 있는 일은 많아진다.

```java
// (상위)object > Employee > Engineer, Manager(하위)
Engineer e = new Engineer(); // 엔지니어로서 사용 만든 건 Engineer인데 쓸 수 있는 건 O E G씀.
Employee e = new Engineer(); // 직원으로서의 사용. 만든 건 Engineer인데 쓸 수 있는 건 O E 밖에 못 씀.
Object e = new Engineer(); // 객체로써의 사용. 만든 건 Engineer인데 쓸 수 있는 건 O밖에 못 씀.
```

- **그렇다면 A obj = new B;를 했을 때 B 클래스에만 있는 메소드를 호출할 방법이 없을까?**
  - **있다. 컴파일러가 바라보던 타입을 부모 타입이 아니라 자식 타입으로 본다면 가능합니다. 이게 바로 다운 캐스팅.(Down Casting)**
  - 그래서 `ZaZangRu sz = new SeoulZaZangRu();`가 있고 `SeoulZaZangRu`에만 있는 메소드 호출하게 되면 컴파일러는 변수의 타입이 `ZaZangRu`인 것만 보고 바로 오류로 판단한다.
  - 그러나 앞에 다운 캐스팅 해주면 오류가 나지 않는다. `((SeoulZaZangRu)sz).makeZamBong();`
- 다형성으로 할 수 있는 것들
  - **부모 클래스 데이터 타입으로 리턴 타입을 설정할 수 있다.**
    - 메소드의 리턴 타입으로 부모 클래스 데이터 타입(Mouse)을 쓰고 실제로는는 자식 클래스 데이터 타입(WheelMouse)으로 할당받을 수 있다.
  - **부모 클래스 데이터 타입으로 매개변수(파라미터)를 선언할 수 있다.**
    - 매개 변수 타입이 클래스일 경우, 해당 클래스의 객체뿐만 아니라 자식 객체까지도 매개 값으로 사용할 수 있다.
    - `public void testMouse(Mouse m){}` 처럼. 파라미터로 Mouse 타입의 인스턴스의 리모컨을 요구하는 것처럼!
    - 이렇게 선언하면 testMouse의 인자로 WheelMouse인스턴스나 OpticalMouse 인스턴스를 넣어도 된다. `Mouse m = new OpticalMouse();` 그리고 나서 `tm2.testMosue(m)`을 하면 OpticalMouse 인스턴스에 있는 게 나온다.

```java
public class Driver{
	void drive(Vehicle vehicle) {
		vehicle.run();
	}
}

public class Vehicle{
	public void run(){
		System.out.println("vehicle is run");
	}
}

public class Bus extends Vehicle{
	@Override
	public void run(){
		System.out.println("bus is run");
	}
}

//driver 실행 클래스
public class DriverExample{
	public static void main(String[] args){
		// Driver 클래스를 이용해서 driver라는 객체로 인스턴스화
		Driver driver = new Driver();
		// Bus 클래스를 이용해서 bus라는 객체로 인스턴스화
		Bus bus = new Bus();
		// Driver클래스 안에 있는 drive 메소드를 사용한다. 
		// Vehicle vehicle = bus;가 된다.
		// Vehicle과 Bus 모두 run()이라는 메소드로 오버라이딩 되어있어 Bus 객체의 run이 나오게 된다. 
		driver.drive(bus);
		// bus is run이 나오게 된다. 
	}
}	
```

## Abstract Class(추상 클래스)

- **abstract는 상속을 강제하는 일종의 규제**
- 선언하는 방법 : `abstract class xxx{};`
- 추상 메소드가 있으면 그 클래스는 추상 클래스가 되어야 한다.(다만 추상 클래스에는 추상 메소드가 포함되어 있다면 다른 메소드가 포함되어도 된다.)
- **추상 메소드란 하위에서 반드시 오버라이딩 해야 한다 라는 강제성을 가진 메소드다.** 즉, 부모가 남긴 빚인데, 자식이 반드시 해야만 하는 의무를 가진 것.
- 추상클래스는 직접 객체를 생성할 수 없다. 추상 클래스를 인스턴스화하면 오류가 발생하는데 추상 클래스 안에는 구체적인 메소드 내용이 없어 인스턴스화시킬 수 없기 때문이다.
  - `Transportation a = new Transportation();`일 경우 컴파일러는 타입만 체크하기 때문에 오류를 내지 않지만 a에 있는 메소드를 실행시킬 때는 구현부가 없어서 실행되지 않는다. 
- **그래서 추상클래스는 인스턴스가 아니라 상속의 기능으로 타입으로만 존재하는 클래스다. **
- 인스턴스 생성은 안 되고, 부모 클래스로만 존재하는 클래스. 즉 변수의 타입으로만 의미가 있고, 인스턴스로 생성될 가능성은 없는 것을 추상 클래스로 만든다.
- **그럼 추상 클래스를 왜 쓸까?**
  - Dog와 Cat이라는 클래스가 있을 때 이 둘을 포괄하는 단어는 Animal인데 Animal은 동물이라는 추상적인 의미이기 때문에 쓸 수 밖에 없다. 다리는 몇 개고, 종류가 어떻게 세분화 되어있는지를 동물마다 모두 달라 Animal 객체에서 정할 수 없기 때문에 여기서는 다리, 종류라는 이름으로 메소드만 만들어주고, Dog와 Cat에서 정의하도록 하는 것이다.
- **추상 클래스를 쓰는 경우**
  - 해당 데이터를 몇 개의 클래스로 만들어야할지 정한다.
    - **상속 구조가 가능한지 결정한다.**
      - 공통적인 속성이나 동작이 있고 여러 종류의 인스턴스를 만들어야 하고, 앞으로도 얼마든지 추가될 만한 클래스를 만들 것이라고 판단되면 상속을 고려한다.(처음부터 부모 클래스를 결정하지 말고 여러 개의 클래스를 보고 하자)
    - **일반 상속이 나은가, 추상 클래스를 쓰는 상속이 나은가 결정한다.**
      - 일반 상속을 쓰는 경우
        - 오버라이드할 필요가 전혀 없고, 새로운 속성과 메소드만 추가되는 경우다.
        - If~else에 대한 부분이 필요하면 이건 오버라이드 해야 한다는 ‘경고 신호’
        - 위 경우를 만족하면 부모 클래스가 인스턴스화되어도 되는가의 문제. 부모 클래스도 인스턴스로 간다면 일반 상속을 쓴다.
      - 오버라이드를 해야하는 경우
        - 나중에 새로운 데이터가 들어올 가능성이 높기 때문에 추상 클래스의 형태로 가는 게 좋다.
  - 디자인 패턴 중에서 템플릿 메소드 패턴을 쓸 때 추상클래스를 쓴다.
    - 추상 클래스의 메소드에서  exec();라는 메소들을 만들어서 여기에 순서를 정하면 된다. 순서(단계)는 같지만 내부적인 일처리는 달라질 수 있다. 

```java
public abstract class AbstractFactory{
    public final void exec(){ // exec()만 public
        init();	// protected로 만들기
        make(); // protected로 만들기
        clear(); // protected로 만들기
    }
}
```

### reference

- <https://opentutorials.org/course/1>
- 객체중심 java_강요천 지음
- 이것이 자바다_신용권 지음