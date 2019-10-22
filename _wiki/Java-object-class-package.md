---
layout  : wiki
title   : Java 객체, 클래스, 패키지
summary : 
date    : 2019-06-20 14:45:36 +0900
updated : 2019-06-20 14:46:17 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# Java 객체, 클래스, 패키지

### 클래스

클래스는 연관되어 있는 변수와 메소드의 집합이다. 가령 차를 만들 때 설계도가 있으면 훨씬 쉽다. 클래스는 설계도의 개념과 비슷하다. 즉, 클래스는 객체를 만드는 설계도이다. 컴퓨터 자체는 객체이고 컴퓨터를 만드는 설계도는 클래스라고 할 수 있다. 그렇다면 제품은? 제품은 바로 인스턴스다. 구현하는 과정을 인스턴스화라고 한다. 그리고 이렇게 생성된 객체를 인스턴스라고 한다.

### 객체

크게 본다면 물리적으로 존재하거나 추상적으로 생각할 수 있는 것이고 소프트웨어적으로 보면 클래스를 실제로 구현한 것이다. 객체와 인스턴스를 헷갈릴 수 있는데 객체는 인스턴스를 아우르는 더 큰 범위라고 생각하면 된다. 객체는 속성(상태값, 데이터)과 동작(행위, 기능)으로 나타낼 수 있는데 각각 필드(field)와 메소드(method)라고 부른다.

```java
PigSave save = new PigSave(); // 차례로 참조타입, 참조변수, =, 연산자, 생성자
```

- `PigSave save` : **Save 상자(변수 이름)에는 PigSave 클래스의 리모컨(=Reference, 참조 자료형, PigSave라는 클래스를 가리킬게요~ 하는 것)이 들어간다.** C언어에서는 포인터로 가리키는 대상을 바꿀 수 있지만 Java에서는 바꾸지 못 한다.
- `new PigSave()` : PigSave라는 클래스의 **생성자를 호출해서** 클래스 형태의 실제 객체가 메모리에 생성된다. 이게 바로 클래스(PigSave)의 인스턴스가 생성된 것이다.
- 같은 클래스는 디스크에 딱 한 번만 읽어들인다.

```java
PigSave save1 = new PigSave();	// 한 번만 읽어들이는 클래스 정보
PigSave save2 = new PigSave();	// 메모리에 있던 클래스 정보를 가지고 온다.
```

**new PigSave();를 쓰게 되면 실제 객체가 동적으로 메모리 공간에 할당되는 것이고 PigSave save는 PigSave라는 참조 자료형인 save라는 변수에는 실제로 동적으로 할당된 공간의 주소값을 저장하는 것이다.**

Class type의 변수를 선언하면(그냥 `Pigsave save;`만 선언하면) 일단 메모리에 상자가 만들어지고, 여기에 **null**이 들어간다.

`save`라는 변수를 통해서 그 제품(인스턴스)을 제어할 수 있다.

객체의 변수나 메소드에 접근할 때는 `.`을 사용한다.

객체 안에 객체를 넣을 수 있다. 

보통 아래와 같이 데이터가 들어가고 생성자로 바로 만들어 줄 수 있게 한다. 그리고 캡슐화로 getter와 setter를 해주면 된다.

```java
public class Customer {

	// data
	private String name; // 얘도 객체. 즉, 객체 안의 객체
	private String address;
	private int age;

	// 객체 안에 객체를 넣을 수 있다.
	private MyDate birth;

	public Customer() {
	}

	public Customer(String name, String address, int age, MyDate birth) {
		this.name = name;
		this.address = address;
		this.age = age;
		this.birth = birth;
	}
    // ...getter, setter
```



## 패키지

정보 공학에서는 ‘이름의 충돌’이라는 문제를 해결하기 위해서 다양한 노력을 하고 있다. 패키지가 만들어진 이유도 이와 같다.

다른 패키지에 존재하고 있는 클래스를 로드하는 건 불가능하다. 그래서 다른 패키지에 있는 클래스를 로드하려면 import를 쓴다.

**java.lang의 패키지는 자동으로 import 되기 때문에 별도의 import 문이 필요하지 않다.**

- `Import java.util.*`처럼 util을 모두 다 포함할 수도 있고,
- `import java.util.Scanner`처럼 클래스 이름까지 다 적을 수도 있다
- 아니면 `java.util.Scanner s` 처럼 코드에 아예 포함시킬 수도 있다

회사에서 설계할 때는 보통 도메인의 역순으로 패키지를 만든다. Ex) kr.co.aaa

패키지의 맨 뒤는 주로 역할별로 구분된다. Dao, ui, util 등등
