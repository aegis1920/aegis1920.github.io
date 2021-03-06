---
layout  : wiki
title   : interface
summary : 
date    : 2019-06-20 14:48:23 +0900
updated : 2019-06-20 14:48:42 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# 인터페이스

**클래스를 만들기 전에 앞으로 이런 기능(메소드, 파라미터, 리턴값 등등)을 만들겠다고 먼저 약속, 합의해놓는 것 (인스턴스의 계약서같은 존재)**

객체의 교환성을 높여줘서 다형성을 구현하는데 중요한 역할을 한다.

class 대신 interface를 사용하고, extends 대신에 implements를 사용한다.

### 인터페이스 선언

인터페이스는 (필드가 아닌)상수와 메소드만을 구성 멤버로 가지고 객체로 생성할 수 없기 때문에 생성자를 가질 수 없다. 자바 7 이전까지는 추상메소드로만 선언이 가능했지만, 자바 8부터는 default나 static으로 선언이 가능하다.

- **상수**로만 선언이 가능하기 때문에 모두 `public static final`의 특성을 가진다. 객체를 만들지 못 하니까 `static final`이 붙는다.  public, static, final을 쓰지 않아도 자동적으로 컴파일 과정에서 붙는다. 상수명은 대문자로 쓴다. 선언과 동시에 초기값을 지정해줘야 한다.
- **메소드** 또한 `public abstract`가 자동적으로 컴파일 과정에서 붙는다. 그래서 implements를 해주면 interface에 있는 메소드를 구현해야 한다.
  - default와 static을 쓰면 public이 자동적으로 붙고 Interface안에 실행 내용까지 작성해야 한다.

```java
interface I { public void z(); }

class A implements I { public void z() {} }
```

- 어떤 인스턴스이건 간에 약속을 지키기만 한다면(구현하기만 한다면) 필요한 곳에서 사용할 수 있다.
- 개발자 A(클래스 A)와 개발자 B(클래스 B)가 협업을 하려면 서로 동일한 메소드를 만들도록 하려면 인터페이스를 implements하면 된다. 그러면 규약이 된다.

### 인터페이스의 규칙

- **하나의 클래스가 여러 개의 인터페이스를 구현할 수 있다. (class A implements I1, I2, I3 ….) -> 여러 인터페이스의 같은 메소드를 물려받아도 실제 구현은 클래스에서만 한다.**
- **인터페이스도 상속이 되지만 상속의 느낌이 아니다. (interface I4 extends I3) ->** 인터페이스 뒤에 나오는 extends는 상속이 아닌데 왜냐면 인터페이스 자체가 인스턴스가 아니기 떄문이다. 인터페이스의 상속은 규격이나 스펙 자체 혹은 기능 자체의 선언을 물려받는 것으로 본다. 이렇게 되면 기존 인터페이스를 손상시키지 않고 새소운 스펙을 만들 수 있고 변수의 타입을 인터페이스로 그대로 유지할 수 있다.
  - 하위 인터페이스 타입으로 선언한다면 그 상위의 인터페이스에 있는 메소드는 다 사용가능하다.
  - 그러나 상위 인터페이스 타입으로 선언한다면 하위의 인터페이스에 있는 메소드는 사용 불가능하다.
- **인터페이스의 멤버는 반드시 Public이다. 인터페이스는 그 인터페이스를 구현한 클래스를 어떻게 조작할 것인가를 규정하는 것이기 때문에 가장 개방적인 접근 제어자가 되어야 한다. 정해진 약속을 한 쪽에서만 수정하면 안되니까**
- **기억해야될 사항**
  - **인터페이스는 실제 인스턴스를 의미하지 않는다.**
    - 인터페이스는 실제 인스턴스로 사용되지 않고 인스턴스의 타입으로만 사용된다. 인스턴스의 타입으로 선언될 수 있기 때문에 컴파일러는 변수의 타입에 선언된 메소드가 존재하는지만 따지게 되고, 실제로 호출되는 것은 실행되고 있는 인스턴스의 메소드가 호출된다.
    - 그래서 하나의 인스턴스를 여러 가지 타입으로 선언이 가능해진다.
    - 여러 타입으로 선언이 가능해지므로 호출할 수 있는 메소드 역시 타입에 따라 달라진다.
    - 인터페이스 변수를 선언하게 되면 뒤에 오는 모든 인스턴스는 인터페이스만 구현한 인스턴스이면 되기 때문에 new 뒤에 올 수 있는 클래스에 대한 제한이 없어진다.
    - 메소드의 파라미터나 메소드의 리턴 타입으로 사용되는 경우에도 인터페이스에 선언된 기능을 가진 인스턴스이면 되기 때문에 더 확장성 있는 구조가 된다.
  - **컴파일러가 따지는 것은 인터페이스인 곳에 호출하려는 XXX가 존재하는지만이 중요하다.**
  - **인터페이스도 상속과 마찬가지로 상속+오버라이딩+다형성과 같다. 상속에서처럼 컴파일러가 부모메소드까지만 보는 것과 같이 인터페이스까지 보는 것과 같다.**

### 익명 구현 객체

구현 클래스를 만들어 사용하는 것이 일반적이고, 클래스를 재사용할 수 있기 때문에 편리하지만, 일회성의 구현 객체를 만들기 위해 소스파일을 만들고 클래스를 선언하는 것은 비효율적이다. 소스 파일을 만들지 않고도 객체를 만들 수 있는 방법이 바로 익명 구현 객체 방법이다.

하나의 실행문이므로 끝에 ;이 와야 한다.

```java
public interface RemoteControl {
	//상수
	public int MAX_VOLUME = 10;
	public int MIN_VOLUME = 10;
	
	//추상 메소드
	public void turnOn();
	public void turnOff();
	public void setVolume(int volume);
}
```

```java
public class RemoteControlExample{
	public static void main(String[] args) {
		// 익명 구현 객체로 new 연산자, 생성자 뒤에 바로 구현이 온다.
		RemoteControl rc = new RemoteControl(){
			//추상 메소드의 실체 메소드를 작성해야 합니다. 
			public void turnOn() { ... }
			public void turnOff() { ... }
			public void setVolume(int volume) { ... }
		};
	}
}
```

### 강제 타입 변환

구현 객체가 인터페이스 타입으로 자동 변환하면, 인터페이스에 선언된 메소드만 사용 가능하다는 제약 사항이 따른다. 예를 들어, 인터페이스에 세 개의 메소드가 선언되어 있고, 클래스에 다섯 개의 메소드가 선언되어 있다면, 인터페이스로 호출 가능한 메소드는 세 개뿐이다.

인터페이스에 선언되어 있지 않은 클래스의 메소드를 호출하고 싶다면 구현 클래스 타입으로 타입을 변환시키면 된다.

```java
interface Vehicle{
	void run();
}

class Bus implements Vehicle
void run() { ... }; 	//추상 클래스를 구현한 것
void checkFare() { ... }; 	//이 클래스에 있는 것

//인터페이스 타입으로 변수를 만들어 Bus 객체를 생성하고 그 주소를 넣어준다. 인터페이스를 구현한 run()은 사용할 수 있지만 Bus 안에 있는 checkFare()는 안 된다.
Vehicle vehicle = new Bus();

vehicle.run();
vehicle.checkFare();

// Bus 클래스 타입으로 bus 변수를 만드는데 인터페이스가 오면 안되지만, 강제로 타입을 Bus로 변환해줬기 때문에 Bus 클래스 안에 있는 메소드를 사용할 수 있다. 
Bus bus = (Bus) vehicle;

bus.run();
bus.checkFare();
```

### 인터페이스 vs 추상 클래스

- 공통점
  - 둘 다 추상 클래스(컴파일러를 속인다)라는 것을 가진다, 둘 다 인스턴스 생성은 불가능하고, 타입으로만 쓰인다.
- 차이점
  - 인터페이스
    - 스펙이나 원하는 기능을 정의하고자 쓴다.
    - 인터페이스는 상수, 추상 메소드만 존재한다.
    - 다중 상속이 가능하다.
  - 추상 클래스
    - 상속이 원래 목적이므로 실제 변수나 메소드를 그대로 가지고 있다. 그리고 상속하니까 그걸 그대로 물려준다.
    - 단일 상속이 가능하다.
- 인터페이스는 상속과 추상 클래스가 완벽하게 좋은 경우를 제외한 모든 경우에 쓴다.
