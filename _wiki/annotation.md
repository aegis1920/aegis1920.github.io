---
layout  : wiki
title   : annotation
summary : 
date    : 2018-05-18 15:09:59 +0900
updated : 2019-06-19 17:27:29 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Annotation
- 어노테이션

JDK1.5 부터 제공된 기능인 어노테이션은 @(;AT) 으로 시작하는 주석의 한 형태를 말한다. @Override, @SuppressWarnings(&quot;&quot;) 과 같은 어노테이션에 익숙할 것이다

어노테이션은 메타데이터 한 형태로, 프로그램에 대한 정보를 제공하지만, 그 프로그램의 일부는 아니다. 어노테이션을 설정한 코드에 직접적인 영향을 미치지는 않는다.

**`**** 1. 어노테이션 생성하기**

1.
  1. 1. **인터페이스를 생성한다.**
  2. 2. **interface앞에 @을 붙인다.**

**public**  @interface DeokNotation {

 }

1.
  1. 3. **어노테이션 정보로 사용 할 변수를 선언해준다.**

**public**  @interface DeokNotation {

String  **name** ();

 }

1.
  1. 4. **어노테이션 변수에 디폴트 값 지정해주기**

**i**** nt ****height** () **default** 183;

**완성 된 DeokNotation**

**public**  @interface DeokNotation { String  **name** ();  **int**   **height** ()  **default**  183;

}

**1-5       **  **어노테이션 사용하기**

@DeokNotation(name=&quot;김덕주&quot;, height = 183)  **public**   **class**  {

 }

**2.어노테이션의 구성요소 **

어노테이션은 어디에 붙일지 (클래스 or 메소드, 변수)를 정하는  **@Target** 과 어노테이션 정보가 언제 까지 유지를 할지에 대한  **@Retention** 를 구성요소로 가지고 있다.

**@Target**

| 이름 | 대상 |
| --- | --- |
| TYPE | 클래스,인터페이스 |
| FIELD | 참조 변수혹은 eunm |
| METHOD | 메소드 |
| PARAMETER | 메소드 매개변수 |
| CONSTRUCTOR | 클래스 생성자 |
| LOCAL\_VARIABLE | 메소드 내부 변수 |
| ANNOTATION\_TYPE | Annotation 타입 |
| PACKAGE | 패키지 |

**Sample Code**

@Target(ElementType.METHOD)  **public**  @interface DeokNotation   { String  **name** ();                                                     **int**   **height** ()  **default**  183; }

예로 정의한 @Traget 코드는 메소드에만 어노테이션을 표기 할 수 있다.

메소드 이외에는 컴파일 오류가 발생한다.

@Targer으로 여러 개를 지정하고 싶을때는 어떻게 해야할까?

Field로 지정하고 싶고, 메소드로 지정해야 할 경우 이럴때는 target을 배열로 여러 개를 지정해주면 된다.

@Target({ElementType.METHOD, ElementType.FIELD})

**@Retention**

| 이름 | 유지범위 |
| --- | --- |
| SOURCE | 컴파일러가 사용하고 클래스 파일에는 포함되지 않음(단순 주석용,컴파일용) |
| CLASS | 컴파일시 클래스 파일 안에 포함되나 VM에서 무시함 |
| RUNTIME | 컴파일시 포함되고 VM에서 인식함 |

**Sample Code**

@Retention(RetentionPolicy.RUNTIME)

**5. 자바 어노테이션을 사용해보기**

위에서 작성한 내용을 기반으로 자바 어노테이션을 만들어 보고 그 어노테이션(주석)을 클래스가 읽어보는것을 해보자.

**1. 사람이라는 클래스를 작성한다. Class name : Person**

사람 클래스는 키 : height, 몸무게 : weight, 이름 : name 이라는 변수를 가진다.

**2. 사람정보 어노테이션을 만든다. 어노테이션 이름 : PersonInfo**

이 어노테이션은 필드에 부착이 되며 int 타입과 String 타입의 요소를 가진다.

int 타입 변수명 : setInt

String 타입 변수명 : setString

**3.PersonInfo 어노테이션을 사람 클래스의 변수에 부착한다.**

**4.ReadAnnotation이라는 클래스를 생성하여 Person에 부착한 어노테이션 정보를 읽는다.**

**Person**

**public**** class ****Person** {

    @PersonInfo(setInt = 183)

    **protected**   **int**     height; // 키

    @PersonInfo(setInt = 88)

    **protected**   **int**     weight; // 몸무게

    @PersonInfo(setString = &quot;김덕주&quot;)

    **protected**   String  name;   // 이름

}

**PersonInfo**

**import** java.lang.annotation.ElementType;

**import** java.lang.annotation.Retention;

**import** java.lang.annotation.RetentionPolicy;

**import** java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)

@Target(ElementType.FIELD)

**public** @interface PersonInfo {

    **int**     **setInt** () **default** 0;

    String   **setString** () **default**&quot;&quot;;

}

**ReadAnnotation**

**import** java.lang.annotation.Annotation;

**import** java.lang.reflect.Field;

**public**** class ****ReadAnnotation** {

    **public**** static ****void**** main**(String[] args){

        //1.클래스 정보를 가져온다.

        Class person = Person.class;

        //2.클래스에 선언 된 필드를 찾는다.

        Field[] fields = person.getDeclaredFields();

        //3.필드에 어노테이션이 부착되어 있는지 확인

        **for** (Field f: fields) {

            Annotation[] anno = f.getAnnotations();

            **try** {

                //4.PersonInfo annotation을 가져옴

                PersonInfo pInfo = (PersonInfo)anno[0];

                //출력

                System.out.print(pInfo.setInt());

                System.out.print(pInfo.setString());

            } **catch** (Exception e)

            {

                e.printStackTrace();

            }

        }

    }

}

-출처

[https://namkyujin.com/2017-03-14/java-annotation/](https://namkyujin.com/2017-03-14/java-annotation/)

[http://kaldoreideok.tistory.com/entry/%EC%9E%90%EB%B0%94-%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98](http://kaldoreideok.tistory.com/entry/%EC%9E%90%EB%B0%94-%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98)
