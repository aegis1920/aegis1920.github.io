---
layout  : wiki
title   : Java에서 System.out.println()이란?
summary : 
date    : 2019-06-21 13:40:28 +0900
updated : 2019-06-21 13:42:17 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

그냥 궁금해서 찾아봤습니다. 어디까지 있을려나 하고. 사실 예전에 써 뒀었던 건데 썩히기가 아까워서 포스팅합니다.

-   **`System.out.println()`**
    
    -   우리가 그냥 단순히  `System.out.println()`을 사용할 수 있었던 이유는 System이라는 클래스가 java.lang에 포함되어 있었기 때문이다. 왜냐면 Java.lang은 자동으로 import 되어있으니까.
        
        -   java 7 reference의 Class summary로 가보면 System이 있는 것을 확인할 수 있다.
    -   System 클래스를 보면 Object를 상속받고 있다. 그리고 안에는  `static PrintStream out`으로 정의된 변수  `out`이 있다. 즉,  `static`이면서  `PrintStream`이라는 타입을 가지고, 변수 이름이  `out`인 변수이다.
        
    -   PrintStream 클래스 안을 살펴보면 메소드 부분에  `println()`가 있는데  `println()`  메소드가 많은 걸 볼 수 있다. 즉, 매개변수에 따라 나눠져있다.  `println()`이라는 똑같은 이름의 메소드지만 매개변수로 오는 것에 따라 다르게 작동하기 위해서 오버로딩을 적용시킨 것이다. 보면 boolean, char, double 등등 많은 타입을 지정해뒀다.
        
    -   `println(어떤 매개변수)`을 또 들어가보면  `print(어떤 매개변수)`와  `println()`을 호출한다고 되어있다.
        
        -   아무 매개변수가 없는  `println()`  또한 정의해놨는데 행을 분리하는 문자를 써서 현재 행을 끝낸다고 되어 있다. 개행 문자처럼 한 칸 띄어진다는 의미이다.
    -   `print(어떤 매개변수)`는 매개변수가 char형이냐 숫자형(int나 float나 등등…)이냐에 따라서 나눠지는데 char형인 경우, 플랫폼의 기본 문자 인코딩에 따라 바이트로 변환되고 그 변환된 바이트는  `write(int)`로 작성된다. 숫자형인 경우,  `String.valueOf(어떤 매개변수)`에 의해서 작성되고 또다시 이게 char형과 똑같이 플랫봄의 기본 문자 인코딩이 된다. 얘도 마찬가지로 그 바이트가  `write(int)`로 작성된다.
        
        -   `valueOf()`는 해당 매개변수에 따라 return하는데 객체면  `obj.toString()`, double이면  `double.toString()`처럼 들어간다.
        -   `write(int)`는 바이트를 스트림에 넣는다. 드디어 기록이 된다.
    -   즉, 진행 과정은 아래와 같이 된다.
        
    -   **java.lang.System -> out(PrintStream 클래스 타입) -> println(a) -> print(a) + println() -> 바로 write(int)로 가거나 String.valueOf(Object) -> String.valueOf(Object)를 거쳤다면 obj.toString() + wrtie(int)**
        

참조(java 7 reference)

-   [https://docs.oracle.com/javase/7/docs/api/overview-summary.html](https://docs.oracle.com/javase/7/docs/api/overview-summary.html)
