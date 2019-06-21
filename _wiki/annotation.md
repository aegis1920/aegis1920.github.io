---
layout  : wiki
title   : annotation
summary : 
date    : 2018-05-18 15:09:59 +0900
updated : 2019-06-21 13:55:18 +0900
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




## Java Annotation

-   **Annotation의 의미**
    
    -   Annotation의 사전적 의미는 주석입니다.
        
    -   하지만 Java에서의 Annotation은 조금 더 고차원적입니다.
        
    -   자바 소스 코드에 추가하여 사용할 수 있는 메타 데이터의 일종입니다. 즉, 자바 소스 코드에 들어가면서 데이터의 데이터를 정의해줄 수 있습니다.
        
    -   어노테이션이 붙은 코드는 어노테이션의 구현된 정보에 따라 연결되는 방향이 결정됩니다.
        
-   **Annotation의 역사**
    
    -   Annotation은 JDK 버전 1.5부터 언어 자체에서 사용할 수 있게 됐습니다.
        
    -   JDK 1.6 버전에서부터는 javac 컴파일러에 통합됐습니다.
        
-   **Annotation의 용도**
    
    -   컴파일러에게 코드의 문법을 체크하도록 정보를 제공
    -   IDE가 빌드할 때 코드를 자동으로 생성할 수 있도록 정보를 제공(빌드 시 자동으로 XML 설정 파일을 생성하거나 배포를 위해 JAR 압축 파일을 생성함)
    -   실행 시(런타임 시) 특정 기능을 실행하도록 정보를 제공(클래스의 역할을 정의하기도 함)
-   **Annotation의 동작**
    
    -   소스코드에서 클래스, 메소드, 변수, 매개 변수 및 패키지에 annotation을 달 수 있습니다.
        
    -   Annotation은 컴파일러에 의해 생성되는 .class 파일에 포함되며 그 .class 파일을 통해 읽혀집니다.
        
    -   JVM 실행 시, annotation은 보관되며 reflection을 통해 자세하게 읽을 수 있습니다.
        

**Built-in annotations**

-   Java 언어에 내장되어 있는 annotation을 의미합니다.(java가 기본적으로 제공해주는 것)
    
-   7개의 주석 중 3개는 java.lang에 있고 4개는 java.lang.annotation에 있습니다.
    
-   `@Override`
    
    -   메소드가 Override 되어있는지 확인합니다. Override 되어있는 메소드를 찾을 수 없는 경우 컴파일 오류가 발생합니다.
-   `@Deprecated`
    
    -   메소드를 쓸모 없는 것으로 표시합니다. 메소드가 사용되면 컴파일 경고를 발생시킵니다.
        
    -   더 이상 지원하지 않거나 만들고 나니 별로 안 좋은 부분이 있거나, 더 좋은 해결법이 생겼으니, 사용하지 말라는 의미입니다.
        
-   `@SuppressWarnings`
    
    -   annotation의 매개 변수(여러 종류가 있음)에 지정된 대로 컴파일러에게 컴파일 경고를 내지 않도록 지시합니다. 그래서 이를 적용하면 경고 메세지가 있어도 경고를 내지 않습니다.

**Meta Annotation**

-   이 메타 어노테이션을 이용해 커스텀 어노테이션을 만들어 낼 수 있습니다. (어노테이션에 사용되는 어노테이션)

-   `@Retention`
    
    -   표시된 annotation이 어떻게 저장될지 지정합니다.
    -   `@Retention(RetentionPolicy.RUNTIME)`
    
    -   SOURCE - 어노테이션 정보가 컴파일 시 사라진다. 바이트 코드에서는 존재하지 않는다.
        
    -   CLASS - 클래스 파일에 존재하고 컴파일러에 의해 사용가능하다. RUNTIME에서는 사라진다.
        
    -   RUNTIME - 실행 시 어노테이션 정보가 가상 머신에 의해서 참조가 가능하다.(JVM 실행 시 감지할 수 있다) 자바리플렉션에 의해 사용한다.
        
-   `@Documented`
    
    -   문서(JavaDoc) 안에 현재 annotation의 존재를 표기하도록 지정합니다.
-   `@Target`
    
    -   annotation이 적용될 Java 요소를 제한하기 위해 annotation을 표시합니다.
        
    -   `@Target({ElementType.METHOD})`
        
-   `@Inherited`
    
    -   annotation이 달린 클래스의 하위 클래스에 상속될 annotation을 표시합니다.(기본적으로 annotation은 하위 클래스에 상속되지 않습니다.)

> Java 7부터 3가지 Built-in annotation이 추가되었습니다.

-   `@SafeVarargs`
    
    -   Java 7부터 generics varargs 매개 변수를 사용하여 호출되는 메소드 또는 생성자를 Suppress warnings 합니다.
-   `@FunctionalInterface`
    
    -   Java 8 이후 type 선언이 functional interface가 되도록 합니다.
-   `@Repeatable`
    
    -   Java 8 이후 annotation을 동일한 선언에 두 번 이상 적용할 수 있도록 지정합니다.
-   **Annotation Example**
    
    -   Built-in annotations
        
        -   이 예제는 @Override annotation의 사용법을 보여줍니다. @Override를 쓰면 컴파일러가 부모 클래스에서 똑같은 메소드가 있는지 검사를 하게 됩니다. 이 경우, Cat 클래스의 gettype() 메소드가 Animal 클래스의 getType()을 대체하지 않기 때문에 오류가 발생합니다. @Override annotation이 없을 경우, Cat 클래스에 새로운 gettype() 메소드가 작성됩니다.

```java
public class Animal {
    public void speak() {
    }

    public String getType() {
        return "Generic animal";
    }
}

public class Cat extends Animal {
    @Override
    public void speak() { // This is a good override.
        System.out.println("Meow.");
    }

    @Override
    public String gettype() { // Compile-time error due to mistyped name.
        return "Cat";
    }
}



```

-   Custom annotations
    
    -   Annotation의 선언은 일반 인터페이스 선언과 유사합니다.
        
    -   @가 interface 키워드 앞에 옵니다.
        
    -   아래 예시에는 메소드를 선언할 때 어노테이션이 있게 됩니다.
        
    -   메소드 선언에 throws 절이 없어야 합니다.
        
    -   반환 유형은 Primitives, String, Class, enums, annotation, array 등으로 제한됩니다.
        

```java
// @Twizzle is an annotation to method toggle().
  @Twizzle
  public void toggle() {
  }

  // Declares the annotation Twizzle.
  public @interface Twizzle {
  }



```

-   annotation은 엘리먼트를 멤버로 가질 수 있습니다. 엘리먼트는 타입과 이름으로 구성되어 있습니다.

```java

         // Same as: @Edible(value = true)
  @Edible(true)
  Item item = new Carrot();

  public @interface Edible {
	  //element. boolean타입, value라는 이름.
	  //value는 기본 엘리먼트라서 값만 기술할 수 있다. 
      boolean value() default false;
  }

  @Author(first = "Oompah", last = "Loompah")
  Book book = new Book();

  public @interface Author {
	//String first() 뒤에 default가 없기 때문에 반드시 값을 기술해줘야 한다. 그래서 @Author를 쓰고 first에 값을 넣어준 것.
      String first();
      String last();
  }



```

-   annotation 자체는 언제 어디서 사용될 수 있는지 나타 내기 위해서 annotate할 수 있습니다
    
-   annotation은 사용자 정의 클래스 및 메소드에 동작을 편리하게 적용하는 방법으로 프레임 워크에서 자주 사용됩니다.
    
-   Java 소스 코드가 컴파일되면 annotation processor라는 컴파일러 플러그인이 annotation을 처리할 수 있습니다. 이 processor는 정보 메세지를 생성하거나 Java 소스파일이나 리소스를 추가로 생성할 수 있으며 컴파일 및 처리가 가능하고 annotation이 달린 코드 자체도 수정할 수 있습니다. Java 컴파일러는 Annotation이 Class 또는  **RUNTIME의 RetentionPolicy**를 갖는 경우 조건부로 메타 데이터를 .class 파일에 저장합니다. 이로써 나중에 JVM 또는 다른 프로그램은 메타 데이터를 찾아 프로그램 요소와 상호작용하거나 동작을 변경하는 방법을 결정할 수 있습니다.
    
    -   그래서 annotation을 정의할 때  **@Retention(RetentionPolicy.RUNTIME)**  을 써줘야 합니다.
-   annotation processor를 사용해 annotation을 처리하기 위해서 Java 프로그래머는 reflection을 사용하여 annotation을 처리하는 자체 코드를 작성할 수 있습니다.`java.lang.reflect`  패키지에는 AnnotatedElement라는 인터페이스가 포함되어 있는데 이 인터페이스를 이용해 annotation을 reflect하면서 읽을 수 있습니다.
    
-   AnnotatedElement 인터페이스는 RUNTIME retention을 갖는 annotation에 대한 접근을 제공합니다. 이 접근은 getAnnotation, getAnnotations, isAnnotationPresent 메소드에서 제공합니다. 왜냐하면 annotation 들은 클래스와 마찬가지로 바이트 코드 파일로 컴파일되고 저장되기 때문에 이런 메소드에 의해 리턴된 어노테이션은 일반 Java 객체와 마찬가지로 처리될 수 있습니다.
    
-   만약 직접 만든 annotation을 쓰고싶다면 따로 컨테이너 클래스를 만들어 주입해야 합니다.
    

**Reference**

-   [https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%EC%95%A0%EB%84%88%ED%85%8C%EC%9D%B4%EC%85%98](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%EC%95%A0%EB%84%88%ED%85%8C%EC%9D%B4%EC%85%98)
    
-   [https://en.wikipedia.org/wiki/Java_annotation](https://en.wikipedia.org/wiki/Java_annotation)
    
-   [http://hamait.tistory.com/314](http://hamait.tistory.com/314)
    

## Reflection

-   컴퓨터 과학에서 reflection이란 프로그램이 실행 중에 자신의 구조와 동작을 검사하고, 조사하고, 수정하는 것입니다.
    
-   reflection은 프로그래머가 데이터를 보여주고, 다른 포맷의 데이터를 처리하고, 통신을 위해 serialization(직렬화)를 수행하고, bundling을 하기 위해 일반 소프트웨어 라이브러리를 만들도록 도와줍니다.
    
-   **Java와 같은 객체 지향 프로그래밍 언어에서 reflection을 사용하면 컴파일 타임에 인터페이스, 필드, 메소드의 이름을 알지 못해도 실행 중에 클래스, 인터페이스, 필드 및 메소드에 접근할 수 있습니다. 또한 새로운 객체의 인스턴스화 및 메소드 호출을 허용합니다.**
    
-   C# 및 Java와 같은 일부 객체 지향 프로그래밍 언어에서는 reflection을 사용하여 멤버 접근 가능성 규칙을 무시할 수 있습니다. 예를 들어 reflection을 사용하면 서드 파티 라이브러리의 클래스에서 private 필드의 값을 변경할 수 있습니다.
    
-   스프링에서 BeanFactory라는 Container를 공부할 때 객체가 호출되면 객체의 인스턴스를 생성하게 되는데 이 때 필요하게 됩니다. 즉, 프레임워크에서 유연성있는 동작을 위해 쓰게 됩니다.
    
-   어노테이션 자체는 아무런 동작을 가지지 않는 단순한 표식일 뿐이지만, 리플렉션을 이용하면 어노테이션의 적용 여부와 엘리먼트 값을 읽고 처리할 수 있습니다.
    
    -   클래스에 적용된 어노테이션 정보를 읽으려면 java.lang.Class를 이용하고
    -   필드, 생성자, 메소드에 적용된 어노테이션 정보를 읽으려면 Class의 메소드를 통해 java.lang.reflect 패키지의 배열을 얻어야 합니다.
-   `Class.forName()`,  `getName()`,  `getModifier()`,  `getFields()`  `getPackage()`  등등 여러 메소드로 정보를 얻을 수 있습니다.
    
-   리플렉션을 이용하면 어노테이션 지정만으로도 원하는 클래스를 주입할 수 있습니다.
    

```java
// Without reflection
Foo foo = new Foo();
foo.hello();



```

```java
// With reflection
Object foo = Class.forName("complete.classpath.and.Foo").newInstance();
// Alternatively: Object foo = Foo.class.newInstance();
Method m = foo.getClass().getDeclaredMethod("hello", **new** Class<?>[0]);
m.invoke(foo);



```

-   Reference
    
    -   [https://en.wikipedia.org/wiki/Reflection_(computer_programming)](https://en.wikipedia.org/wiki/Reflection_(computer_programming))
        
    -   [https://medium.com/@ggikko/java-%EC%BB%A4%EC%8A%A4%ED%85%80-annotation-436253f395ad](https://medium.com/@ggikko/java-%EC%BB%A4%EC%8A%A4%ED%85%80-annotation-436253f395ad)
        

## Reflection을 이용한 Annotation 작성하기

1.  annotation을 정의하는 클래스인 PrintAnnotation.java

```java
import java.lang.annotation.*;

//annotation 정의 클래스

//@Target은 method에만 적용된다는 뜻. class나 변수에 적용시킬 수 없다. 
@Target({ElementType.METHOD})
//런타임 시까지 어노테이션 정보를 유지하도록 했다.
@Retention(RetentionPolicy.RUNTIME)
//사용자 정의 annotation이다. PrintAnnotation이라는 annotation.
public @interface PrintAnnotation {
	//기본 element인 value는 구분선에 사용된다. 기본값이 -이고 value이기 때문에 값만 써줄 수 있다. 
	String value() default "-";
	//반복 출력 횟수. value가 아니기 때문에 따로 적어줘야하고 기본 값으로 15이다. 
	int number() default 15;
}



```

2.  annotation 적용 클래스

```java
//annotation 적용 클래스

public class Service {
	
	//값을 따로 써주지 않아서 둘 다 기본값인 -와 15가 나온다. 
	@PrintAnnotation
	public void method1() {
		System.out.println("execute1");
	}
	
	//value값이 *로 들어가서 *와 15가 나온다.
	@PrintAnnotation("*")
	public void method2() {
		System.out.println("execute2");
	}
	
	//value값이 #이고 number값이 20이라서 #과 20이 나온다. 
	@PrintAnnotation(value="#", number=20)
	public void method3() {
		System.out.println("execute3");
	}
}



```

3.  annotation에서 쓸 reflection 작성 클래스

```java
import java.lang.reflect.Method;

public class PrintAnnotationExample {

	public static void main(String[] args) {
		//Service 클래스에 선언된 메소드를 얻기 위해서 getDeclaredMethods()를 써준다.
		//getDeclaredMethods()는 리턴타입이 Method[]이고 메소드 정보를 Method 배열로 리턴한다. 
		Method[] declaredMethods = Service.class.getDeclaredMethods();
		
		//위에서 배열로 선언된 declaredMethod를 Method 객체로 하나하나씩 빼온다.
		for(Method method : declaredMethods) {
			//PrintAnnotation이 적용되었는지 확인한다
			if(method.isAnnotationPresent(PrintAnnotation.class)) {
				//PrintAnnotation 객체 얻기
				//getAnnotation()은 적용된 어노테이션을 리턴한다. 
				PrintAnnotation printAnnotation = method.getAnnotation(PrintAnnotation.class);
				
				//메소드 이름 출력
				System.out.println("[" + method.getName() + "]");
				//number만큼 value 출력
				for(int i=0 ; i < printAnnotation.number(); i++) {
					System.out.print(printAnnotation.value());
				}
				System.out.println();
				
				try {
					//메소드 호출
					//invoke()는 Method 클래스의 메소드. 
					//동적으로 호출된 메소드의 결과(Object)를 리턴합니다.
					method.invoke(new Service());
				} catch(Exception e) {}
				System.out.println();
			}
		}
	}
}
```
