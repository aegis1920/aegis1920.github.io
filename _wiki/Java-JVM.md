---
layout  : wiki
title   : Java와 JVM
summary : 
date    : 2019-06-20 14:43:30 +0900
updated : 2020-02-22 22:06:49 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

## Java

컴퓨터 초창기 시절, CPU마다 기계어가 다르기 때문에 CPU 별로 각자의 어셈블리어도 달랐다.

이러한 이유로 C언어가 나왔을 때 각광받았다. 왜냐면 하나의 소스파일을 각 기계에 맞는 C 컴파일러로 컴파일만 하면 목적 파일이 만들어졌기 때문이다.

여기에서 더 진보되어 어떤 운영체제든 하나의 소스파일로 실행하겠다는 철학으로 나온 것이 Java다

Java는 Sun microsystems에서 개발한 **OOP(Object-Oriented Programming Language, 객체 지향 언어)** 이다. 정확히 개발한 사람은 제임스 고슬링이다. Sun microsystems에서 개발했지만 Oracle이 java를 인수해서 현재 Java의 저작권자는 Oracle이고 철학은 **“Write Once, Run Anywhere”** 로 'Java는 플랫폼이 독립적이야’라는 걸 알려준다.

- 플랫폼이 독립적이라는 말은 컴퓨터의 운영체제, CPU와 연관을 가지지 않고 어떤 플랫폼이든 잘 작동한다는 소리다.

### Java는 왜 만들어졌을까?

처음에는 가전제품을 제어하기 위해서 만들어졌으나 인터넷이 출현하고 컴퓨터 언어로 발전했다. 언어로 발전하면서 버전이 나눠졌다.

### Java Edition의 종류

- Java SE : Java Standard Edition / J2SE, 표준 자바 에디션. 자바의 핵심 API와 기능을 제공한다.
    - JDK(Java Development Kit) : JRE(실행기인 java) + 개발에 필요한 도구(컴파일러인 javac)
    - JRE(Java Runtime Environment) : JVM + 라이브러리 파일 + 기타 파일
- Jakarta EE : Java Enterprise Edition / J2EE, 서버 페이지에 특화된 에디션이다.
- Java ME : Java Micro Edition / J2ME, 임베디드 시스템 환경에 특화된 에디션이다.

### Java의 작동 원리

일단 코드를 만드는데 메모장같은 아주 간단한 에디터로도 가능하다. 하지만 바로 실행할 수는 없다. 우리가 써 놓은 자바의 문법은 사람만 이해할 수 있기 때문에 컴퓨터가 이해할 수 있도록 컴파일 해주어야 한다.

- 자바의 컴파일러 이름은 `javac`이다.
- 자바 실행기의 이름은 `java`다.

### Java의 컴파일 과정

1. 소프트웨어를 위한 하드웨어는 크게 CPU, RAM, HDD이 있다.
2. `javac`라는 컴파일러로 HDD에 있는 Java 언어의 소스(.java)를 컴파일한다.
3. 소스 파일(.java)를 컴파일하면 클래스 파일(.class = 바이트 코드)이 생긴다.
4. JRE에 있는 class loader에 의해 HDD에 있던 클래스 파일이 JVM의 method area로 적재된다.
5. JVM은 적재된 클래스 파일(바이트 코드)을 JIT 컴파일 방식으로 실행한다.
6. 클래스 파일이 실행되면 Main 함수를 찾아서 stack 구조 형태로 함수들을 실행시킨다.
    1. JVM은 `java.lang` 패키지를 메모리의 `static` 영역에 가져다 놓는다.
    2. import된 패키지를 메모리의 `static` 영역에 배치한다.
    3. 프로그램 상의 모든 클래스를 메모리의 `static` 영역에 배치한다. (해당 클래스가 사용될 때 `static`에 올라간다. 메모리는 최대한 늦게 사용하고 빨리 반환할수록 좋으므로.)
    4. `main()` 스택 프레임에 args를 저장할 변수 공간을 확보한다.
    5. 여는 중괄호를 만나면 `stack` 에 해당 메서드의 스택 프레임이 시작된다.
    6. 여기서 `new Mydata()`와 같이 객체를 생성시키는 코드가 나타나면 `Class.forName()`과 같은 얘들이 실행되고 인스턴스가 생성된다.(객체 -> 인스턴스)
        1. 하드웨어적으로 Mydata클래스가 HDD에서 메모리(RAM)에 올라가는 것
        2. 소프트웨어적으로 JVM의 heap영역에 객체가 생성.
        3. Stack에 들어간 건 초기화 되지 않고 heap으로 들어가는 건 초기화 된다.
7. 그렇게 실행하고 나중에 참조되고 있지 않은 얘들은 GC(가비지 컬렉션)가 처리한다.
    1. 자바의 버전에 따라 GC가 달라진다. 청소하는 기법이 버전에 따라 다르다.
    2. 청소시간이 되면 일을 할 수가 없다.

### JVM과 메모리

멀티 프로세스는 다수의 메모리를 가지기 때문에 서로 참조할 수 없지만, 멀티 스레드는 하나의 메모리만 사용하고 `stack`영역만 분할해서 사용하기 때문에 `static` 영역과 `heap` 영역은 **공유해서 사용한다.**

- **static : 클래스의 놀이터(java.lang 패키지, static 이 붙어있는 경우 등...)**
- **stack : 메서드의 놀이터(main() 등...)**
- **heap : 객체의 놀이터(new를 통해 인스턴스 생성 등...)**

**질문 : 아래 그림을 보자. 만약 펭귄[100]을 선언하면 힙 영역에 객체가 100개가 생성되는데 펭귄 객체 안에 있는 `test()` 메서드도 100개가 생성될까?**

아니다. 객체 멤버 메서드는 각 객체별로 달라지는 것이 아니기 때문에 JVM은 지능적으로 객체 멤버 메서드를 static 영역에 하나만 보유한다. 그리고 test를 호출할 때 객체 자신을 나타내는 this를 객체 참조 변수에 넘긴다.

즉 static이 없더라도 배열로 만들면 같은 메서드를 똑같이 만들어야하기 때문에 static으로 만들어 하나만 보유하게 된다.
```java
    //////// 원본 코드
    class 펭귄 {
    	void test() {
    		System.out.println("test");
    	}
    }
    
    public class Driver {
        public static void main(String[] args) {
            펭귄 뽀로로 = new 펭귄();
            뽀로로.test();
        }
    }
    
    //////// 만약 펭귄[100]이라면 실제로는 아래처럼 변경
    
    class 펭귄 {
        static void test(펭귄 value) {
            System.out.println("test : " + value);
        }
    }
    
    public class Driver {
        public static void main(String[] args) {
            펭귄 뽀로로 = new 펭귄();
            펭귄.test(뽀로로);
        }
    }
```
CMD 혹은 터미널로 실행 시

- `javac Hello.java`
`java Hello` 여기서 .class 확장자를 붙이면 안 되는데 그 이유는 패키지명을 정할 때 .으로 디렉토리를 구분하기 때문이다. 예를 들어, 패키지명을 붙인 클래스명은 com.java.Hello인데 .class를 붙이면 마지막이 클래스이므로 com.java.Hello.class로 이름이 class가 클래스로 인식된다.

### IDE

java project를 만들고 package가 있다. 그 안으로 들어가면 src와 bin이 생긴다.

- package -> 같은 이름이 있으면 안되니까 크게 구분해주기 위함
- src -> source의 약자(.java가 src 폴더 가장 안 쪽에 저장된다.)
- bin -> binary의 약자(.class 가 bin 폴더 가장 안 쪽에 저장된다.)
- .java -> 우리가 코딩하는 소스파일
- .class -> .java를 compile해서 나온 것
- run -> 실행

**이클립스에서 처음에 Workspace를 만들 때 기본 인코딩이 MS949로 되어있으므로 Workspace를 UTF-8로 꼭 바꿔주자. (파일을 작성하고 나중에 바꾸게 되면 한글이 모두 깨져서 나온다.)**

### 디버거 사용하기

- breakpoint를 걸어서 어디서부터 잘못됐는지 살펴볼 수 있다.
- F5(안으로 들어가기), F6(넘어가기), F7(빠져나오기)를 이용하자.
- breakpoint에 조건을 줄 수 있다. (ex. i = 5일때 찾기)

## JVM

### JVM이란?

**Java Virtual Machine의 약자.** Java로 개발한 프로그램을 컴파일하여 만들어지는 바이트코드를 실행시키기 위한 가상머신. JRE(Java Runtime Environment)에 포함되어 있다. **Java 소스 코드(.java)는 javac 컴파일러를 거쳐 바이트코드(.class)로 변환되며, 이 바이트 코드는 JRE에 들어있는 java classloader에 의해 JVM으로 적재되고 JVM은 적재된 바이트 코드를 JIT 컴파일 방식으로 실행한다.** 운영체제 위에서 JVM이 실행되기 때문에 JVM만으로는 하드웨어를 제어하는 일은 할 수 없지만 JNI를 통하면 가능하다. Java Virtual Machine이라고 해서 비단 Java 언어만 가능한 게 아니고 코틀린이나 스칼라 코드를 컴파일해도 읽을 수 있다. JVM은 메모리의 접근을 가상 머신 차원에서 관리하고 있으므로 런타임에 최적화가 가능하다. (JVM은 GC를 수행하여 할당되었다가 더 이상 쓰이지 않는 메모리를 자동으로 회수한다.) 하지만 이에 따른 JIT 컴파일 시간, 가비지 컬렉션을 위한 시간 등이 필요하므로 근본적인 한계가 있다.

### JVM의 구성요소

- **Class loader**(Loading, Linking, Initialization)
- **Execution Engine**(Interpreter, JIT compiler, Garbage Collector)
- **Runtime Data Area**(Thread, Heap, Method Area)

    ![https://upload.wikimedia.org/wikipedia/commons/d/dd/JvmSpec7.png](https://upload.wikimedia.org/wikipedia/commons/d/dd/JvmSpec7.png)

### JVM의 작동원리

**1. Class loader가 클래스 파일(바이트 코드)을 JVM으로 전달한다.**

1. Loading
    - Load가 되면 Verify(보안 검사)를 한다.
    - 외부에서 들어온 .class 파일을 막아준다.
2. Linking
    - Prepare에서는 진짜 메모리를 할당해준다.
    - Resolve에서는 메모리 구조상에서 수정 작업을 최종적으로 실행한다.
3. Initialization
    - Initialize class 파일에서 지정된 클래스 변수를 할당한다.

**2. 로딩된 클래스 파일(바이트 코드)은 Execution Engine에 의해 해석된다.**

- Interpreter 방식 or JIT 방식으로 해석

**3. 해석된 클래스 파일은 Runtime Data Area에 들어가고 실행된다.**

- Thread - 멀티 스레드가 가능하고 모든 스레드는 Heap과 Method Area를 공유한다.
- PC register - 스레드가 시작될 때 생성되며 현재 수행 중인 JVM 명령의 주소를 갖는다.
- JVM Stack - 지역 변수나, 임시 데이터, 스레드나 메소드의 정보를 저장한다.( {}블록이 끝나는 순간 사라짐)
- Native method stack - 바이트 코드가 아닌 기계어로 작성된 프로그램을 실행시키는 영역. JAVA는 JNI로 코드를 변환해 C code를 실행시킬 때 여기로 들어간다.
- Heap - 인스턴스를 저장하는 가상 메모리 공간. new 연산자로 생성된 인스턴스(객체)와 배열을 저장한다. GC(Garbage Collection)가 지배하여 메모리 관리를 한다.
- New/Young - 인스턴스들이 최초로 생성되고 저장된다.
- Tenured - Young에서 지내다가 쓸모 없어진 얘들이 온다.
- Permarnant(old) - 생성된 인스턴스들의 주소값이 저장된 공간. 클래스나 메소드의 meta 정보가 저장되는 영역. reflection을 사용하여 동적으로 클래스가 로딩되는 경우에 사용된다.
- Method area(=Class area, Static area) - 클래스 정보를 처음 메모리 공간에 올릴 때 초기화되는 대상을 저장하기 위한 메모리 공간. Static을 붙이면 가장 먼저 할당되니 여기로 오고 마찬가지로 Main 메소드도 여기로 온다. 클래스가 사용되면 해당 클래스 파일을 읽어서 해당하는 인스턴스 변수, 메소드 등을 여기에 저장한다.
- Runtime constant pool - 상수 자료형을 저장하여 참조하고 중복을 막는 역할

**4. GC가 작동하여 메모리를 관리한다.**

- **JVM의 세상은 항상 평화로울까?**
    - GC의 stop-the-world도 있고 뭣도 모르고 만든 클래스가 JVM의 세상을 어지럽힐 수 있다. 이 클래스들을 해결하려면 Profiling을 해줘야 한다. 클래스로더에 hook class를 적용하면 클래스가 로딩될 때 클래스의 수행 시간을 측정하게 된다. 이렇게 하면 Memory Leak, Infinite Loop로 인한 OutOfMemoryError, Process Of Hanging을 피할 수 있다. profiling을 하려면 JConsole이나 VisualVm을 사용하면 된다.

### 출처

- [https://d2.naver.com/helloworld/1329](https://d2.naver.com/helloworld/1329)
- 객체 중심 Java (강요천 지음)
- 스프링 입문을 위한 자바 객체 지향의 원리
