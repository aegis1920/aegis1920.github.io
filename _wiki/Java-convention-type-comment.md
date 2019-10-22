---
layout  : wiki
title   : Java 주석, 데이터 타입, 메모리(변수) 할당, 조건문, 반복문, 메소드, 배열
summary : 
date    : 2019-06-20 14:45:04 +0900
updated : 2019-06-20 14:45:34 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# Java 주석, 데이터 타입, 메모리(변수) 할당, 조건문, 반복문, 메소드, 배열

## Java Convention

자세한 사항은 https://google.github.io/styleguide/javaguide.html을 참고하시면 될 것 같습니다. 이 중에 중요하다고 생각되는 것만 뽑았는데 더 공부하다가 수정사항이 생긴다면 그 때 다시 추가하도록 하겠습니다.

* pacakge명, import명 등등...
* 두 단어가 섞이면 두 번째 단어의 첫 글자가 대문자
* 상수는 대문자

## 주석

`//` : 한 줄 주석

`/* */`  : 여러 줄 주석

`/**` : 문서화 작업을 위한 주석

- project 탭에서 Generate Javadoc을 하면 문서화가 진행된다.  `/**`으로 썼던 것들이 문서화 된다.
- 만약 진행이 안 된다면 한글이 있어서 인코딩때문에 안 되는 경우가 있다. 그 때는 javadoc Generation의 VM options 에서 `-locale ko_KR -encoding UTF-8 -charset UTF-8 -docencoding UTF-8`을 치면 된다.

## 데이터 타입

```java
boolean flag = false; // 형변환 안됨.
char c = 'A';
byte b = 10;
short s = 300;
int i = 2100000000;
long l = 2200000000L; // L을 붙어야 long으로 인식
float f = 3.4F; // F를 붙여야 float으로 인식
double d = 3.4; // int형을 double로 형변환 할 때 int형 변수에 *1.0을 해도 된다.
```

## 메모리(변수) 할당

### 자료형

Java는 변수를 선언할 때 사용하는 자료형에 기본 자료형과 참조 자료형이 있다.

자료형이란 **그 변수가 가리키는 값이 어떤 것인지**를 이야기해주는 역할이다.

- 기본 자료형(Primitive Datatype) -> int, byte, float, double, boolean 등등
  - Stack 영역에 생성된다. 

```java
int value = 10;
int result = value + 10;
double val = 10.2;
boolean bol = true;
char charval = (char)value;
```

- 참조 자료형(Reference Datatype) -> 클래스, 인터페이스, 배열, Enum
  - 객체가 heap 영역에 생성되고, 그 객체를 가리키는 주소값이 stack 영역에 변수로 들어간다.

```java
String arr = new String("hello");	// String 객체
Object obj = new Object();	// Object 객체
int[] intarr = new int[4];	// 배열 객체

//method 영역에 있는 열거 상수가 해당되는 7개의 Week 객체의 주소값을 갖고 있다. 
//총 7개의 Week 객체는 각각 heap 영역에 들어간다.(MONDAY, TUESDAY ...)
public enum Week { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }

//today는 stack에 저장되고 거기엔 method 영역에 있던 주소가 복사되어 Week.SUNDAY의 주소가 저장된다. 
Week today = Week.SUNDAY;
Week birthday = null;
```

### 변수

변수의 종류에는 두 가지가 있다.

- **인스턴스 변수** : 인스턴스 필드라고도 하며, 인스턴스의 상태, 인스턴스의 속성을 나타낸다. 모든 메소드가 공유하는 데이터의 느낌. **클래스의 { } 바로 안 쪽에 선언되는 변수.** 각각의 인스턴스마다 가지는 데이터라서 인스턴스마다 데이터의 값이 다르게 유지된다. 이런 이유로 초기화 하지 않고 선언만 해둔다. 메소드의 실행 결과를 누적해서 보관하는 용도로 사용한다.
- **지역 변수** : 매번 메소드를 실행할 때마다 만들어지고 메소드가 끝나면 사라지는 변수. 임시적인 데이터를 담는 변수이고, 사용 전에 초기화를 해줘야 한다.

### 메모리를 할당받는 방법

선언(`int a`)과 할당(`a = 0`)을 같이 해주는 것이 **초기화**(`int a = 0;`)

Java는 C언어와 다르게 클래스 안에서 `int a = 0;` 만 써서는 메모리 공간을 할당받지 못한다. Java는 두 가지 방법으로 메모리 공간을 할당받는다.

- **인스턴스 생성**
  - 인스턴스를 생성하지 않으면 메모리 할당을 받지 못한다. 그래서 그냥 `int i = 1;` 이런 식으로 선언한 후, 바로 출력하려고 하면 컴파일 에러가 뜬다. **클래스를 이용해 인스턴스화를 해서 인스턴스를 생성해 메모리 할당을 받고 그 인스턴스를 이용해 호출해야한다.**
  - 객체가 메모리에 올라가는 것을 인스턴스화라고 인스턴스화된 객체를 인스턴스라고 한다.
- **Static 사용**
  - **Static을 사용하면 처음부터 바로 메모리 공간을 할당받는다.** 이런 이유로 main함수가 static이기 때문에 main 함수에서는 `int i = 1;`을 해도 바로 출력이 가능하다.

> 메모리 할당에서 자료형(데이터 타입)마다 메모리가 얼마나 할당되냐의 문제가 있습니다. 이 문제는 보통 운영체제에 따라 달라서 32bit면 int를 4바이트로 인식하고, 64bit면 8바이트로 인식한다고 하지만 해당 컴퓨터의 CPU, OS, 컴파일러에 따라 다르다고 말하는 것이 정확합니다. 실제로도 같은 컴퓨터로도 컴파일러에 따라 다르게 나옵니다.

## 조건문

### if문

`if(){}`만 쓴다면, 조건이 만족하든 만족하지 않든 모든 if문을 거쳐 감.

`if(){}else if(){}`를 쓴다면, 조건이 만족하면 그 아래 else if문은 실행하지 않고 빠져나감.

### switch문

if보다 swtich가 성능이 더 좋다.

```java
switch(num){
	case 1:
		System.out.println("hi1");
		break;
	
	case 2:
		System.out.println("hi2");
		break;
	...
	default: // num의 값이 해당하는 case가 없다면 실행, 모든 case에 break;이 없다면 쭉 내려와서 default도 실행된다. 
		System.out.println("default");
		break;
}		
```

### continue

continue를 쓸 때 조심해야 할 점이 있다. 증감식의 위치를 확인해야 한다. 증감식이 `continue;`보다 아래에 있으면 코드가 계속 `i=7`에만 머물러 계속 돌 수 있다.

```java
public static void main(String[] args) {
		int sum = 0;
		int i = 1; // 초기화처리를 해줘야 함.
		while (i <= 10) { // 조건식
			if (i == 7)
				continue; // 조심!
			sum += i;
			++i; // 증감식
		}
		System.out.println(sum);
	}
```

### break, OUTER

`break`나 `continue`를 쓸 때 `OUTER`를 통해 아예 바깥에 있는 for문으로 빠져나오게 할 수 있다.  

```java
public static void main(String[] args) {
		OUTER: for (int i = 1; i < 10; i++) {
			for (int j = 1; j < 10; j++) {
				if (j == 5)
					break OUTER; // 바깥쪽으로 넘어감.
				System.out.print(j + "*" + i + "=" + j * i + "\t");
			}
			System.out.println();
		}
	}
```



## 반복문

`for(;;){}, while(){}, do{}while();`이 있다.

동일한 for()를 쓰지만 조건식이 다른 게 있다. foreach라고 말한다. 배열 arr에 들어있는 것들이 한 개씩 순차적으로 value에 대입된다.

```java
// 그냥 for문은 인덱스에 접근할 수 있다. foreach문보다는 느리다.
for(int value = 0 ; value < arr ; value++){
}

// foreach문은 전체 인덱스에 쉽게 접근할 수 있고 속도가 그냥 for문보다 빠르다.
for(int value : arr){
System.out.println(value);
}
```

## 메소드

C언어에서 함수와 같다. 아까 말한대로 코딩 라인이 많아지면 구분하기 어렵기 때문에 그룹핑을 위해 클래스, 메소드를 사용한다.

```java
public static String num(int i) {
	if(i==0){
		return "zero";
	} else if(i==1){
		return "one";
	}
}
```

- 단위테스팅을 할 수 있도록 기능을 하나에 메소드 하나씩 만드는 게 좋다.

## 배열

배열은 연관된 데이터를 모아서 관리하기 위해서 사용하는 데이터 타입이다. 변수가 하나의 데이터를 저장하기 위한 것이라면 배열은 여러 개의 데이터를 저장하기 위한 것이라고 할 수 있다.

```java
String[] classgroup = new String[4];
```

- Java로 배열을 선언할 때 미리 배열의 크기를 결정해줘야 한다.
- 안에 들어있는 값들은 형태가 모두 같은 동형 집합이다.
- 배열은 데이터들을 인덱스 번호로 구분할 때 써준다.
- 배열은 배열을 의미하는 변수에 배열의 모든 데이터를 넣지 않는다. 왜냐하면 모든 데이터를 넣으면 용량이 너무 크니까. **전체 데이터는 다른 물리적인 공간에 저장되어 있고, 전체 데이터 대신 참조변수에 리모컨(=포인터, Reference, 주소값)을 넣는다. 배열을 복사하는 것 역시 Reference(주소값) 자체가 복사된다. 즉, 배열도 객체다**

- 배열의 Reference(그냥 arr만 출력했을 때), 즉 **@이하에 나오는 16진수는 hashcode의 결과값**이다. 왜냐하면 배열의 변수 또한 new로 인해서 새로 생긴 인스턴스니까.
- 다차원 배열은 각각 바깥쪽 크기의 배열에 리모콘이 들어가는 식. (그래서 arr으로 출력하나 arr[0]으로 출력하다 똑같다.)
- 배열은 고정된 크기라서 한계가 있다. 초기화를 해서 정해진 크기, 이상의 값을 줄 수 없다.
  - 그래서 속도가 빠르다.

### 1차원 배열

- 선언하는 방법 : `데이터타입[] 참조변수 = new 데이터타입[크기]`
- 크기가 3인 scores라는 int형 배열 : `int[] score = new int[3];`
- 바로 초기화를 해줄 수도 있다. `int[] score2 = { 90, 80, 70, 60 };`
- 안에 있는 데이터를 전체적으로 꺼낼 때 for each 구문을 쓰면 편하다. 
  - `for(int s : score2){System.out.println(s)}`

### 2차원 배열

- 선언하는 방법 : `데이터타입[][] 참조변수 = new 데이터타입[주배열크기][부분배열크기]`
- 크기가 3인 주배열(행)과 크기가 2인 부분배열(열) : `int[][] score3 = new int[3][2];`
- 데이터들이 모두 0으로 초기화 된다.
- 주배열은 필수적으로 크기를 정해줘야 하지만 부분배열은 크기를 지정하지 않아도 된다. 즉, 부분배열은 동적으로 생성한다. 그래서 표 형태라고 볼 수 없다.
  - `int[][] students = new int[2][];`
- 1차원 배열 안에 다시 1차원 배열이 들어가 있다고 생각하면 쉽다. Array of Array. 배열 안에 배열. 

```java
int[] student1 = new int[] { 100, 99 };
int[] student2 = new int[] { 98, 97, 96 };

// 2차원 배열에 1차원 배열 넣기.
students[0] = student1;
students[1] = student2;
```

### reference

- <https://opentutorials.org/course/1>
- 객체중심 java_강요천 지음
- 이것이 자바다_신용권 지음
