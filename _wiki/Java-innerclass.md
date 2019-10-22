---
layout  : wiki
title   : inner class 
summary : 
date    : 2019-06-20 14:48:58 +0900
updated : 2019-06-20 14:49:28 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# 이너 클래스

Inner 클래스를 만드는 이유

●       은닉 - 클래스는 default나 public만 가능한데 이너클래스는 private으로 만들 수 있다. 그래서 자기 패키지 안의 자기 클래스에서만 볼 수 있다.

## 중첩 클래스와 중첩 인터페이스

클래스가 여러 클래스와 관계를 맺는 경우에는 독립적으로 선언하는 것이 좋으나, 특정 클래스와 관계를 맺을 경우에는 관계 클래스를 클래스 내부에 선언하는 것이 좋다.

중첩 클래스가 바로 그 경우인데 중첩 클래스를 사용하면 두 클래스의 멤버들을 서로 쉽게 접근할 수 있다는 장점과 외부에는 불필요한 관계 클래스를 감춤으로써 코드의 복잡성을 줄일 수 있다.

인터페이스도 클래스 안에 들어갈 수 있는데 이를 중첩 인터페이스라고 한다.

### 중첩 인터페이스

중첩 클래스는 클래스 내부에 선언되는 위치에 따라서 두 가지로 분류된다.

- 클래스의 멤버로서 선언되는 중첩 클래스를

   

  멤버 클래스

  - 클래스나 객체가 사용중이라면 언제든지 재사용 가능하다.
  - 바이트 코드의 이름은 `A(바깥 클래스 이름) $ B(멤버 클래스 이름).class`
  - 인스턴스 멤버 클래스(그냥)는 바깥 클래스의 객체를 생성해야만 접근할 수 있고, 정적 멤버 클래스(static) 바깥 클래스로 바로 접근할 수 있는 중첩 클래스다.

```java
class A{
	class B{
		B() {} 	//생성자
		int field1;
	}
	
	static class C{
		C() {}
		int field2;
		static int field3;
}
//인스턴스 객체를 생성하려면
A a = new A();
A.B b = a.new B();
b.field1 = 3;
//정적 멤버 클래스 객체를 생성하려면
A.C c = new A.C();
c.field2 = 4;
A.C.field3 = 4;
```

- 메소드 내부에서 선언되는 중첩 클래스를

   

  로컬 클래스

  - 메소드 실행 시에만 사용, 메소드가 종료되면 없어진다.
  - 바이트 코드의 이름은 `A(바깥 클래스 이름) $1 B(로컬 클래스 이름).class`
  - 메소드 내에서 객체를 생성(`D d = new D();`)하고 할당해주면 된다.

당연하게 중첩 클래스에는 접근 제한이 있는데 이는 static이 먼저 메모리에 올라가서 인스턴스가 static에 접근할 수 없다는 것만 이해하면 쉽게 이해할 수 있다.

### 중첩 인터페이스

Button을 클릭했을 때 이벤트를 처리하는 객체를 받고 싶다고 가정해보자. 그렇다고 아무 객체나 받으면 안 되고, Button 내부에 선언된 중첩 인터페이스를 구현한 객체만 받아야 한다면 아래와 같이 Button 클래스를 선언하면 된다.

```java
public class Button{
	//중첩 인터페이스 타입으로 필드를 선언 
	OnClickListener listener;
	
	//setter 메소드로 구현 객체를 받아 필드에 대입.
	//Button btn = new Button();
	//btn.setOnClickListener(new MessageListener()); 같이 호출. 
	void setOnClickListener(OnClickListener listener){
		this.listener = listener;
	}
	
	//touch 메소드가 실행되었을 때 onClick() 메소드 호출
	void touch(){
		listener.onClick();
	}
	
	//중첩 인터페이스.
	interface OnClickListener {
		void onClick();
	}
}	
```

# 
