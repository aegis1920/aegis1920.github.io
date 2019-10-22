---
layout  : wiki
title   : lambda 식
summary : 
date    : 2019-06-20 15:09:30 +0900
updated : 2019-06-20 15:09:59 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

## 람다식

자바는 함수적 프로그래밍을 위해서 자바 8부터 람다식을 지원합니다. 람다식은 익명 함수를 생성하기 위한 식으로 객제 지향 언어보다는 함수 지향 언어에 가깝습니다.

만약 Runnable 인터페이스의 익명 구현 객체를 생성하는 전형적인 코드가 아래와 같을 때,

```java
Runnable runnable = new Runnable() {
	public void run() { ... }
};
```

위 코드의 익명 구현 객체를 람다식으로 표현하면 다음과 같습니다.

```java
Runnable runnable = () -> {...};
```

람다식은 `(매개변수)->{실행코드};` 형태로 작성됩니다. 어떤 인터페이스를 구현할 것인가는 대입되는 인터페이스가 무엇이냐에 달려있습니다.

int 매개 변수 a의 값을 콘솔에 출력하려면 아래와 같이 람다식을 작성하면 됩니다.
`(int a) -> {System.out.println(a);}`
그러나 매개 변수 타입은 자동으로 인식될 수 있기 때문에 일반적으로 언급하지 않습니다.
`(a) -> {System.out.println(a);}`
하나의 매개변수만 있다면 괄호도 생략할 수 있습니다.
`a -> {System.out.println(a);}`
중괄호에 return문만 있을 경우 아예 없애는 것이 정석입니다.
`(x, y) -> {return x + y;}` = `(x, y) -> x + y`

자바는 메소드를 단독으로 선언할 수 없고 항상 클래스의 구성 멤버로 선언하기 때문에 람다식은 이 메소드를 가지고 있는 객체를 생성해냅니다. 어떻게 생성하냐면 람다식은 인터페이스 변수에 대입되는데 인터페이스는 직접 객체화할 수 없기 때문에 익명 구현 클래스를 생성하고 객체화 합니다. 그래서 람다식이 대입될 인터페이스에 따라 작성방법이 달라지기 때문에 그 인터페이스를 람다식의 타겟 타입(target type)이라고 합니다.

람다식은 하나의 메소드만 정의하기 떄문에 두 개 이상의 추상 메소드가 선언된 인터페이스는 람다식을 이용해서 구현 객체를 생성할 수 없습니다. 이를 컴파일러가 체크할 수 있게 해주는 기능이 `@FunctionallInterface`라는 어노테이션입니다.

추상 메소드에 매개 변수가 없을 때의 경우입니다.

```java
//추상 메소드가 2개이면 체크할 수 있도록
@FunctionalInterface
public interface MyFunctionalInterface {
		//매개변수가 없는 추상 메소드
		public void method();
}
public class MyFunctionalInterfaceExample {
	public static void main(String[] args) {
		//람다식을 정의한 후,
		MyfunctionalInterface fi;
		//메소드 정의
		fi = () -> { System.out.println("hello");
		//메소드 호출
		fi.method;
	}
}
```

매개변수가 있을 때의 경우입니다.

```java
//추상 메소드가 2개이면 체크할 수 있도록
@FunctionalInterface
public interface MyFunctionalInterface {
		//매개변수가 있는 추상 메소드
		public void method(int x);
}
public class MyFunctionalInterfaceExample {
	public static void main(String[] args) {
		//람다식을 정의한 후,
		MyfunctionalInterface fi;
		//메소드 정의
		fi = (x) -> {
			int result = x * 5;
			System.out.println(result);
		//메소드 호출
		fi.method(2);
	}
}
```

람다식을 사용할 때 this를 주의하셔야 합니다. 일반적으로 익명 객체 내부에서 this는 익명 객체의 참죄지만, 람다식에서 this는 내부적으로 생성되는 익명 객체의 참조가 아니라 람다식을 실행한 객체의 참조입니다. 다음 예제는 람다식에서 바깥 객체와 중첩 객체의 참조를 얻어 필드값을 출력하는 방법을 보여주고 있습니다. 중첩 객체 Inner에서 람다식을 실행했기 때문에 람다식 내부에서의 this는 중첩 객체 Inner입니다.

```java
//추상 메소드가 2개이면 체크할 수 있도록
@FunctionalInterface
public interface MyFunctionalInterface {
		//매개변수가 없는 추상 메소드
		public void method();
}
public class UsingThis {
	//인스턴스 변수가 있다.
	public int outterField = 10;

	//중첩 클래스인 Inner 클래스.
	class Inner {
		int innerField = 20;
		
		void method() {
		
		MyfunctionalInterface fi = () -s> {
			System.out.println("outterField: " + outterField);
			//바깥 객체를 쓰기 위해서는 클래스명.this
			System.out.println("outterField: " + UsingThis.this.outterField + "\n");
			
			System.out.println("innerField: " + innerField);
			//그냥 this를 쓰면 안에 있는 inner 객체를 참조합니다. 
			System.out.println("innerField: " + this.innerField + "\n");
			};
			fi.method();
		}
	}
}
};
public class UsingThisExample {
	public static void main(String[] args){
		//UsingThis 클래스에서 객체를 만든다.
		UsingThis usingThis = new UsingThis();
		//중첩 클래스인 Inner 클래스의 객체를 만들기 위해서 이와같이 접근.
		UsingThis.Inner inner = usingThis.new Inner();
		//inner 객체 안에 있는 method()를 실행합니다.
		inner.method();
	}
}	
```

람다식에서 바깥 클래스의 필드나 메소드를 제한없이 사용할 수 있으나 메소드의 매개변수, 로컬 변수를 사용하고 싶다면 그 변수들은 final의 특징을 가지고 있어야 합니다. 왜냐하면 로컬 변수나 매개변수 같은 경우, 메소드 실행이 끝나면 스택 메모리에서 사라지기 때문입니다. (자바 8부터는 생략해도 컴파일러가 자동으로 final로 인식합니다)

### 표준 API의 함수적 인터페이스

자바에서 제공되는 표준 API에서 한 개의 추상 메소드를 가지는 인터페이스들은 모두 람다식을 이용해서 익명 구현 객체로 표현이 가능합니다. 그래서 자바 8부터는 빈번하게 사용되는 함수적 인터페이스를 java.util.function 표준 API로 제공합니다. 함수적 인터페이스는 크게 Consumer, Supplier, Function, Operator, Predicate 등으로 구분됩니다.
