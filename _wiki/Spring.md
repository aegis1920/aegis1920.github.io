---
layout  : wiki
title   : Spring
summary : 
date    : 2019-06-20 15:38:30 +0900
updated : 2019-07-24 19:46:14 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

## Spring

# Spring MVC

# Spring Framework

## Spring Framework란?

* 엔터프라이즈급 어플리케이션을 구축할 수 있는 가벼운 솔루션
* 원하는 부분만 가져다 사용할 수 있도록 모듈화가 잘 되어 있다(약 20개의 모듈로 구성)
* IoC 컨테이너이며, AOP를 지원한다
* 선언적으로 트랜잭션을 관리할 수 있다

### 컨테이너(Container)

* 컨테이너는 인스턴스의 생명주기를 관리하며, 생성된 인스턴스에게 추가적인 기능을 제공한다
* 예를 들어, Servlet을 실행해주는 WAS(tomcat등...)는 Servlet 컨테이너를 가지고 있다
* WAS는 웹 브라우저로부터 서블릿 URL에 해당하는 요청을 받으면, 서블릿을 메모리에 올린 후 실행한다. 개발자가 서블릿 클래스를 작성했지만, 실제로 메모리에 올리고 실행하는 것은 WAS의 Servlet 컨테이너
* 생성된 인스턴스들에게 추가적인 기능을 제공한다

### IoC(Inversion of Control)

* 컨테이너가 코드 대신 Object의 제어권을 갖고 있어 IoC(제어의 역전)이라 한다
* 예를 들어, 서블릿 클래스는 개발자가 만들지만, 그 서블릿 메소드를 알맞게 호출하는 것은 WAS다
* 이렇게 개발자가 만든 클래스나 메소드를 다른 프로그램이 대신 실행해주는 것을 제어의 역전이라고 한다.

### DI(Dependency Injection)

* 클래스 사이의 의존 관계를 빈(Bean)설정 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것
* 개발자가 직접 코드로 new를 써서 인스턴스를 생성하는 것이 아니라 컨테이너가 어노테이션을 통해 인스턴스를 할당해줄 수 있는 것

### Spring에서 제공하는 IoC/DI 컨테이너

* BeanFactory : IoC/DI에 대한 기본 기능을 갖고 있다
* ApplicationContext : BeanFactory의 모든 기능을 포함하며, 일반적으로 BeanFactory보다 추천된다. 트랜잭션처리, AOP등에 대한 처리를 할 수 있다. BeanPostProcessor, BeanFactoryPostProcessor등을 자동으로 등록하고, 국제화 처리, 어플리케이션 이벤트 등을 처리할 수 있다
* BeanPostProcessor : 컨테이너의 기본로직을 오버라이딩하여 인스턴스화 와 의존성 처리 로직 등을 개발자가 원하는 대로 구현 할 수 있도록 한다.
* BeanFactoryPostProcessor : 설정된 메타 데이터를 커스터마이징 할 수 있다.


## 새로 시작?

FrontController 디자인 패턴

View -> Controller(Dispatcher Servlet - web.xml에 DD를 등록하는 작업을 손수 해줘야 한다. 모든 예외를 처리해주기도 편하고. 에러나면 ERROR.JSP에 가게 하는 것처럼. 제어할 shape를 모르니까 내가 제시하는 상위타입을 반드시 만들어라. 상위 클래스나 타입들을 다 제공한다. 그게 바로 handle. 상속 받아야 하는 컨트롤러가 모두 달랐다. ) -> UserController, ProductController, NoticeController 등... 프레임워크를 통합한다면 ? -> 스프링으로 개발중임.  내가 원래 개발했던 건 스프링에 맞게 설정하면 Controller...? POJO기반으로 가는 

URL 자체를 유일하게 가져간다. 그래서 그 자체로 액션의 역할을 갖도록 할 것이다.(/login, /logout, /user/login. 같이)

상황에 따라 바꿔놓을 수 있도록 Front Controller가 생긴 것. 

### HandlerMapping(Sub Controller)

* 여러 개로 제공해주고 우리가 선택할 수 있도록 해준다. 
* 이 요청에 맞는 컨트롤러 누구냐고 Front Controller에서 물어본다. 그래서 sub Controller가 찾아준다. 
* 우리가 특별히 선택하지 않아도 기본적으로 선택되어 있는 얘들이 있다.
* Front Controller를 하나도 고쳐쓰지 않게 하도록 하기 위해서 Sub Controller가 있다. Sub Controller만 고치면 된다.

### POJO

* 그 이름으로 호출하는 코드를 짤 수 없다. 그 설정에 해당하는 이름의 메소드를 식별해서 동적으로 실행하게 되어있다. 그래서 우리한테는 좋지만 코드 상으로는 메소드를 모르니 힘들다.
* 이 메소드가 GET 방식인지, POST인지 모두 알려줘야 한다. 
* 약속된 상위 타입의 개념이 없다.
* 그러나 POJO로 짜지 않으면 상위타입으로 이렇게 이렇게 짜라고 할 수 있다. 

컨트롤러 구현 방식(POJO or 전통적인 방식)이 바뀔 때마다 Front Controller를 바꿔줘야 한다. 그래서 adapter라는 얘가 있다.

### Adpater

* 얘도 종류별로 다 있다. Sub Controller 제어.
* adapter도 상위 타입이 있고 나눠져 있다. adapter 안에 어떻게 부를지 다 알고 있다. 
* 어댑터를 통해서 간접적으로 제어하는 것.
* 우리가 어떤 식으로 Controller를 만드냐에 따라 Adapter도 달라져서 Front Controller가 바뀌지 않는다. 

#### Front Contoller를 하나도 안 바꾸고 쓸 수 있는 이유?

-> Controller도 바뀌어지지만 그 전에 Adapter를 먼저 거쳐서 adapter가 다 알아서 제어해주기 때문에 Front Controller는 바뀌지 않는다. 

우리가 짰던 Controller 중에 할 일이 없어지는 게 생긴다. 파라미터를 꺼내지 않아도 된다. getParameterNames()라는 게 있다. 파라미터 이름으로 알아낼 수 있다. User Id랑 비밀번호 필요하다고 하면 @RequestParam login(String id, String pw) 을 쓰면 이 메소드는 파라미터를 의미한다~ 이래서 getParameter를 꺼내서 나한테 준다. 그래서 우리는 파라미터 추출을 할 필요가 없다. 그냥 파라미터를 담을 수 있는 그릇만 있으면 된다. 유효성 검사도 붙일 수 있다. 검사에 실패하면 안 들어가도록. 공통적인 예외처리도 다 처리되어있다. 정보들을 줄 수 있는 얘들만 남아있다. 결과적인 응답이 

### View Resolver

결과. 처리되고 나서 프론트쪽에 전달해야될 결과. 화면이 될 수도 있고, 데이터가 될 수도 있고... 그 뷰들을 찾아줄 수 있는 것이 view Resolver이다. 키가 되는 어떤 정보만 준다. Dispatcher가 실행될 때 view Resolver에 몇 개가 등록된다. dispatcher는 view Resolver를 통해 view를 찾아낸다.

객체를 처리한다는 건 뿌리는 얘들. json도 될 수 있고 xml도 될 수 있다. vo안에 설정이 들어갈 수 있다. json형식으로 만들어져서 리턴된다. 

확장이 용이하게, 교체가 용이하게 열려있다. 

Front Controller. 



## 프로젝트 시작

legacy project -> spring mvc project -> 

src - main - webapp 자리가 webContent같은 곳이다. WEB-INF에는 web.xml이 있다.

web.xml 안에 dispatcherServlet은 spring 설정을 안주면 servlet-name을 딴 xx-servlet.xml을 찾는다. 그 위치를 반드시 알려주는 게 init-param을 준다. servlet_context.xml이 값으로 들어가있음. 

web.xml에는 view나 controller 관련된 설정만 가져온다. 

listener는 애플리케이션의 이벤트들을 listen할 수 있는  listener가 있다. 그게 listener-class. ContextLoaderListener 얘는 앱이 시작할 때 반응한다.  읽어서 준비하는 작업을 해준다. 

context-param. 

포워딩하는 얘들은 반드시 앞을 거치기 때문에 주소로 못 들어온다.





## 0425

서블릿에 등록할 때 initparam이라는 걸 줘서 어떤 값을 서블릿에게 전달할 수 있다. 우리는 값만 주면 된다.

dispatcher servlet

약속된 규칙으로 /WEB-INF/XXX-servlet.xml에서 이름을 정해주면 initparam을 안 줘도 된다.

loadonstartup에서 확인. 

처음부터 웹 프로젝트를 만들 수도 있지만 스프링 설정 파일도 있었음. 그 설정 파일을 컨트롤러 파트에 때려박는 게 아니라 

dispatcher servlet

큰 세트를 만드는 작업이 context load listener이다. 얘는 앱이 실행될 때 시작된다. 

context-param과 context laod listener는 같이 따라간다.

param name은 param value

추가할 때 한글이 깨진다. 그래서 이것도 

dispatcher 등록하고, 설정파일 위치 주고, 부모컨테이너를 만들 수 있는 context load listener, context-param을 준다. 



부모 컨테이너에 등록된 빈들은 하나의 컨테이너처럼 쓸 수 있다. 

컨테이너끼리 상속 개념을 써서 처리해주고 있다. 컨테이너가 두 개다. 

## REST

product/1이면 1인 product 가져오기, user/java면 java인 유저를 가져오는 것처럼. url 방식을 제어. rest 서비스에는 확장자를 안 붙인다. 

REST 서비스를 지원하기 위해서는 현재 dispatcher Servlet의 url mapping을 *.do와 같은 확장자 형태로 가져가지 않고 /로 가져간다. 이렇게 했을 때 정적 리소스들도 모두 servlet을 거치게 된다. 이런 설정을 해주기 위해 servlet-context.xml에서 정적 리소스들은 servlet을 거치지 않게 설정해줄 수 있다.

spring의 인터셉터는 컨트롤러만 적용대상이다. Controller는 신경을 안 써도 된다. 

handler에서 view를 리턴할 수도 있고, view의 정보를 리턴할 수 있다. 

director_list만 주면 스프링이 view resolver한테 물어본다. 포워딩할 수 있는 view를 제공한다. 직접 View를 리턴하면 7, 8번을 생략한다(책의 70page). 그러나 직접 View를 리턴하는 건 안 좋다. 왜냐면 종속성이 생기기 때문에.

데이터를 담기위한  것으로 인식된다. 모델 변수로 모델받고, String타입으로 View name을 받는 게 가장 편하다.

서브 컨트롤러는 두 가지 일을 한다. 

인터셉터가 할 수 있는 일. 서

Handler 컨트롤러 

등록도 컨트롤러를 탈 수 있다. 

컨트롤러 거쳐서 백단을 거쳐서 목록에 추가. 

컨트롤러를 거쳐서 해야할 수 있는 일이면...? 컨트롤러를 먼저 줘야 한다.

직접 주소로는 절대 못 간다.

포워딩 되는 얘들은 왜 숨길까? 모든 경우를 다 생각해서 짜야된다. 그래서 Controller를 거치고.

한글 처리를 하려면 web.xml에 추가

```xml
	<!--  필터는 추가할것.. -->

	<filter>

		<filter-name>encodingFilter</filter-name>

		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>

		<init-param>

			<param-name>encoding</param-name>

			<param-value>utf-8</param-value>

		</init-param>

	</filter>

	<filter-mapping>

		<filter-name>encodingFilter</filter-name>

		<url-pattern>*.do</url-pattern>

	</filter-mapping>
```

기본적인 것을 잡아주도록 되어있는 게 Spring Boot.

공동 저자 없다.

author - id(fk)

author라는 테이블. id(pk), name, age

찜한 도서들 session에 넣어버리기. Wishlist.

찜목록 보여주고

도서 등록

도서 목록

도서 상세보기

도서 삭제

마이바이트 에러 중에 Collection포함 뭐쩌네...sql문에 아이디. 

Logback 잘보라고...

가장 기본적인 CRUD. 아직 조인 안 해도 됨. 기본 CRUD. 이렇게만 해서 워크샵 내고 덧붙이기... 좋댜...

도서 찜하는 거 다 모두 



## 처음부터

1. spring mvc 만들기
2. project properties에서 facet에서 java를 1.8로 바꾸기
3. pom.xml에서 Logging과 mybatis의 dependency 설정
4. resources 아래에 beans.xml을 c, p, context를 추가해서 만들기


# Spring - 아주아주 중요하다

월말평가에 spring까지 다 들어간다. 구현까지

* interface : 구현과 사용의 분리
* 변경 가능성이 있는 것은 Interface를 쓴다. Connection같은 경우, Connection pool과 Driver를 이용한 Connection 모두 그냥 Connection만 쓰면 된다. 코드는 바뀌지 않았지만 의미는 바뀌었다. Connection pool은 datasource로부터 리턴되는 건 POOL로 Release하게 되어있다.DriverMananger는 다르다.
* 조립하듯이 사용할 수 있도록 객체를 만들어야 한다. 
* 상위 타입을 통해서 하위타입을 구현하는 게 중요하다. 하위 클래스를 교체해서 상황에 따라서 코드 하나도 안 바꾸고 특정 클래스로 변경을 용이하게 할 수 있다.
* Interface : 상수와 추상메소드, 다중 상속이 가능하다, 다형성의 성질
* 하나의 타입으로 참조 

![Connection](C:\Users\niboh\Desktop\Connection.png)

* Connection conn = ds.getConnection();
* conn = DriverManager.getConnection();
* conn.close();

pooled conneciton이 오면 연결 pool로 반납하게 되는 것으로 동작. 

컴파일은 똑같이 conn으로 했지만 정작 runtime 시에는 해당하는 게 동작한다.

인터페이스는 엄청나게 중요하다. 인터페이스를 통해서 결합도를 낮춰준다. 만약 인터페이스가 없다면 클래스 이름으로 다 써줘야 한다. 참조변수를 바꾼다는 건 모든 변수와 메소드를 바꾼다는 뜻이다. 라이브러리를 교체하면 100퍼 코드가 바뀐다. 

### framework

라이브러리들에 디자인패턴을 입힌다. 똑같은 환경에서 작업하면 품질이 좋아진다. 프레임워크에 기능을 이용해서 WAS로 서비스를 대신한다. 단순 라이브러리가 아니다. 재사용 가능한 구현된 집합을 개발 틀이다. 디자인패턴을 적용가능하다. 인프라라고 생각하면 편하다. 음식을 만들 때 기본 육수는 주어지고 필요한 것들을 제공해주는 느낌.

Spring framework은 중요하다. 자사의 프레임워크 또한 spring framework을 통해 만든 경우가 많다. 가장 이상적인 개발은 나눠서 하는 게 제일 좋다. DAO면 DAO, Controller면 Controller. 

Spring은 다양하게 쓸 줄 알아야 한다. 

## DI(Dependency Injection, 의존성 주입)

의존성이라는 건 객체 의존성을 얘기한다. 의존성을 갖고있는 대상이 달라지니까 

내 입장에서는 똑같다. 누가 해줄 거냐만 다르다. 결과는 똑같다. 그러나 대상이 다르니까 과정이 다르다. 

내가 필요한 객체가 있다면 new해서 가져왔다. 나는 기쁨조의 자리만 만들어 놓는 것. 그러면 상황에 따라서 아무나 들어갈 수 있다. 들어가는 작업(주입)을 스프링이 해준다. 

맨날 new했다. 여태까지는 

## AOP(Aspect Oriented Programming) - 알면 좋다. 직접 개발하기보다 트랜잭션할 때 이럴 때 돌아가는 구나~

관심사의 분리. 자기가 관심있는 부분에만 신경쓸 수 있도록 모두 다 분리해버린다. 사용하는 코드 자체를 분리한다. oop같은 경우 어떤 클래스를 

사용하는 부분까지 관심사의 용도로 본다. 즉 우리가 어떤 클래스안에 있는 메소드를 쓰려고 xx.dao()처럼 사용한 얘들. 이러면 모두 연결되어버린다. 

우리의 코드에는 없지만 그 원하는 것이 가미된 새로운 코드가 실행할 때 생긴다. 

공통로직은 핵심로직에 계속해서 쓰인다. 이런 게 바로 AOP 프레임워크.

내 코드에서는 logging을 안 남겼는데 알아서 남겨진다. 우리가 트랜잭션 코드를 짜지 않는다. 그냥 이곳에 필요하다고 얘기하면 짜집기하는 코드가 알아서 생긴다. 

쓰는 이유 : 단위 테스트가 용이해지고, 우리가 개발하는 영역에 집중할 수 있다.

객체지향을 더 객체지향스럽게 만들어준다. 

## DAO(JDBC, Hibernate, Mybatis)

어떤 걸 써도 상관없다. 다 열려있다. Mybatis 프레임워크로 가져갈 것이다. 마이바티스는 sql mapper framework이라고 불린다. 물음표에 뭐가 들어가야하는지, 마이바티스에 알려주면 다 해준다. db연동 작업이 한 줄이다. 

## Spring MVC

우리가 서블릿, 모델, 뷰, 컨트롤러 등등을 Front Controller 디자인 패턴으로 되어있다. main servlet이 있다. 프론트 컨트롤러가 어떤 일을 하고... 설계를 이해해야 한다.

복사를 했는데 어떤 느낌인지 몰라... 이러면 안 된다.



자바 소스코드로 객체로 만들 수 있다. 자바소스에다가 소스 기반의 Configuration이 있다. xml, annotation, mybatis기반인 3가지로 할 수 있다. 설정이 소스에 퍼져있는 것과 설정이 한 곳에 모여있는 것. 그래서 보통 xml로 만든다. 빠르게 개발하고 그런 게 중요할 때는 annotation이 중요하다. 

### maven

프레임워크의 결과물, 관련된 파일들.  그 파일들을 하나 파일로 관리하긴 어렵다. 쓰지도 않는 리소스 소모가 더 많기 때문에. 파일. 라이브러리 끼리의 의존성이 있다. 그 의존성을 메이븐이 관리해준다. C가 동작하기 위해선 B가 필요하고 B가 동작하기 위해서는 A가 필요하고... 프레임 워크는 내가 짠 게 아니기 때문에 메이븐을 통해서 필요한 라이브러리를 받아서 관리해준다.

pom.xml에 properties는 상수같은 느낌. 

```xml
<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring-framework.version}</version>
</dependency>
```

위의 3가지 설정대로 라이브러리를 다운 받는다. 

maven dependencies에 보면 여러 라이브러리가 있는데 로컬에서 먼저 뒤지고, 없으면 원격에서 받아온다. 만약에 여기서 의존하는 걸 삭제하고 저장하면 바로 사라진다. 의존성이 있는 것 또한 다 알아서 추가된다. 라이브러리 관리를 함께한다. 

나는 pom.xml에 에러가 떠서 maven disable해준 후에  niboh/.m2/repository 폴더를 지우고 쌤이 주신 걸 다시 집어넣었다.

설정파일 같은 건 resource, 소스코드는 java, test는 test.

```java
com.ssafy.greeting.bad;

GreetingServiceEn{
	public void sayHello(String name){
		System.out.println()
    }
}

GreetingTest {
    public static void main(String[] args){
		GreetingServiceEn greeting = new GreetingServiceEn();
        greeting.sayHello("김태희");
    }
}




```

설정 스키마별로 고유한 네임스페이스가 있다. 여기서는 일단 beans만 하면 된다. beans에 문서의 형식을 지키고 있는지 확인해준다. well-formed한지. 문서의 구조까지 잘 따르고 있는지 파싱한다. 



//

스프링은 싱글톤으로 관리한다.

DI를 쓰는 이유가 뭐냐. 객체를 변경할 때 소스코드에 영향을 안 주기 위해서. 설정만 교체함으로써 객체를 변경해 줄 수 있다. 설정파일만 배포하고 변경하면 된다. 



byType이면 setter의 매개변수

프로젝트가 클 때는 annotation이 안 좋다



진짜 CRUD가 아니라 잘 타고 들어가는지. ProductService가 GreetingService.

DAO가 ProductRepo. 얘가 outputService.

productReopoImpl -> logger 신경쓰지마, 메소드만 만들고 씨스아웃 찍기

BeanTest는 메소드들 다 무시하고 오늘 했던것처럼 메인메소드하기. 

XML 기반으로 DI하는 경우 대체한다~

그냥 결론 : DAO 시스아웃, 메인 시스아웃



Bean이란 인스턴스 생성, 관리, 컨테이너에 의해 관리되는 객체다. new 객체를 사용하는 방식은 스프링에서 관리하지 않는다.

#### 스프링에서 객체 생성의 나쁜 예

```java
public class GreetingServiceEn {
	public void sayHello(String name) {
		System.out.println("Hello " + name);
	}
}

public class GreetingServiceKo {
	public void sayGreeting(String name) {
		System.out.println("안녕 " + name);
	}
}

public class GreetingTest {
	public static void main(String[] args) {
//		GreetingServiceEn greeting = new GreetingServiceEn();
		GreetingServiceKo greeting = new GreetingServiceKo();
        greeting.sayGreeting("김태희");
//        greeting.sayHello("김태희");
	}
}
```

위 3가지 클래스가 있다고 했을 때 GreetingTest에서 객체를 바꾸고 싶다면 `GreetingServiceKo greeting` 처럼 클래스 타입과 `new GreetingServiceKo();` 객체를 생성하는 쪽 모두 바꿔줘야 한다. 즉, 하는 행동은 똑같지만 코드를 모두 바꿔줘야 한다. 만약 다양한 버전의, 교체 가능성이 높은 객체라면 매번 이렇게 바꿔야 하니 번거롭다. 이는 선언부에 상위타입을 이용해 조금 더 좋게 설계할 수 있다.

#### 스프링에서 객체 생성의 보통 예

```java
public interface GreetingService {
	void sayHello(String name);
}

public class GreetingServiceEn implements GreetingService {
	@Override
	public void sayHello(String name) {
		System.out.println("Hello " + name);
	}
}

public class GreetingServiceKo implements GreetingService {
	@Override
	public void sayHello(String name) {
		System.out.println("안녕 " + name);
	}
}

public class GreetingTest {
	public static void main(String[] args) {
		GreetingService greeting = new GreetingServiceEn();
//		GreetingService greeting = new GreetingServiceKo();
        greeting.sayHello("김태희");
	}
}
```

GreetingService라는 인터페이스를 통해 똑같은 메소드를 구현하게 하고, 다형성을 통해서 타입을 똑같이 만들어줄 수 있다. 그러나 여전히 단점이 존재한다. 뒤에 new가 달라져야 한다. 여러 곳에서 GreetingService를 쓴다면 new 했던 곳을 모두 다 바꿔줘야 한다. 여기서 new 방식 또한 바꿔줄 수 있는데 바로 팩토리 디자인 패턴을 이용한다. 팩토리 디자인 패턴은 말 그대로 공장(서브 클래스)에서 찍어내주기만 하면 메인 클래스에서 new를 하지 않고 리턴된 걸 쓰는 것이다. 

예를 들어서, 메인 클래스에서 `GreetingService g = factory.getGreetingService();` 만 써주면 서브 클래스가 `GreetingService getGreetingService(){ return new GreetingServiceKo(); }` 형태로 되어있어 `new GreetingServiceKo()`를 반환하게 된다. 만약에 영어로 써져있는 걸 원한다면 여기에 리턴 타입에`new GreetingServiceEn()`으로 리턴 값을 조금만 바꿔주면 된다. 스프링에서는 팩토리 디자인 패턴이 이미 만들어져 있다. 또한 스프링은 공장 바깥에 어떤 제품을 생성해야 되는지 설정 파일이 있어서 설정 파일에서 어떤 것을 리턴할 지 바꿔주면 끝이다.

#### 스프링에서 객체 생성의 좋은 예

```java
public interface GreetingService {
	void sayHello(String name);
}

public class GreetingServiceEn implements GreetingService {
	@Override
	public void sayHello(String name) {
		System.out.println("Hello " + name);
	}
}

public class GreetingServiceKo implements GreetingService {
	@Override
	public void sayHello(String name) {
		System.out.println("안녕 " + name);
	}
}

public class GreetingTest {
	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beans.xml"); 
        // "/beans.xml"과 똑같다. 클래스 패스 경로를 주는 작업이다.
		GreetingService greeting = context.getBean("greeting", GreetingService.class);
        // getBean()은 bean의 인스턴스를 생성한다. bean을 얻기 위한 방법으로 context의 경로에서 greeting이라는 id의 bean을 찾고 동일한 id가 있을 수 있으니 구체화하기 위해 GreetingService로 선언된 클래스를 찾는다.
        greeting.sayHello("김태희");
	}
}
```

스프링은 공장이 이미 만들어져 있고, 설정 파일의 위치와 그 설정파일에서 bean을 갖고 오는 코드를 쓰면 바로 그 객체를 통해 메소드를 쓸 수 있다. 만약  설정파일이 여러 개라면 설정 파일 위치를 여러 개로 줄 수도 있다. *제일 최상위인 bean팩토리는 aop가 지원이 안 된다? 무슨 뜻이지* 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd">

<bean id="greeting" class="com.ssafy.greeting.excellent.GreetingServiceEn"/>


</beans>
```

객체 생성의 관리를 설정 파일을 통해 스프링에 맡긴다. greeting이란 이름으로 bean을 추가하고 해당하는 클래스가 bean으로 들어간다?

### DI 예제

#### DI1

```java
public interface GreetingService {
	void sayHello(String name);
}

// 소스코드 상으로는 인터페이스와만 관련이 있다. // 의존성 있는 객체를 주입한다. 받을 수 있도록 짠다. 
public class GreetingServiceImpl implements GreetingService {

	// 받아서 기억해놓는다. 멤버변수로.
	private OutputService outputter;
	
	// new한 코드가 없다. 그냥 받아들이는 코드만 있을 뿐. 받아서 기억해놔야 한다.
	public GreetingServiceImpl(OutputService outputter) {
		super();
		this.outputter = outputter;
	}
	// 의존성 있는 객체들을 엮어준다. autowiring. outputService인 얘들은 모두 올 수 있다. 

	@Override
	public void sayHello(String name) {
		outputter.output("Hello " + name);
	}
}

public interface OutputService {
	void output(String message);
}

public class OutputServiceImplConsole implements OutputService {
	
	// OutputService를 구현하고 있기 때문에 메소드를 만들었음
	@Override
	public void output(String message) {
		System.out.println("==========================");
		System.out.println(message);
		System.out.println("==========================");
	}

}

public class OutputServiceImplFile implements OutputService {

	@Override
	public void output(String message) {
		
		// 파일명을 바로 주면 오버라이팅 모드가 되니까 직접 연결해주는 스트림을 만들어야 한다.
		PrintWriter out = null;
		try {
			out = new PrintWriter(new FileWriter("msg.txt", true));
			out.println(message);
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(out != null) {
				out.close();
			}
		}
	}

}

public class GreetingTest {
	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beans1.xml");
		GreetingService greeting = context.getBean("greeting", GreetingService.class);
        greeting.sayHello("김태희");
        greeting.sayHello("김태희");
        greeting.sayHello("김태희");
	}
}
```



트럭, 스포츠카, SUV, sedan 등... 

`Truck vehicle;, Opensportscar vehicle;` 등... 이런 식으로 짠다면 나한테 같은 기능일지언정, 타입별로 메소드를 제각기 짜야한다. 의존하는 객체를 바꿔줘야 한다면 의미가 없다? 교체될 수 있는 다양한 구현이 존재할 수 있다. `Movable`이라는 인터페이스를 만들었다면 간다는 것은 `drive();`라고 약속을 정해놓을 수 있다. 각 차마다 구현은 모두 다르고.

Driver 클래스 안에 타입 

타입을 바꾸면 해당하는 메소드만 가능하기 때문에 driver는 moveable을 써줄 수 있따. Moveable 약속을 지켰기 때문에 써줄 수 있다. 보편화 되어있는 인터페이스. 정부에서 그 표현을 따로 제공해줄 수 있다. **또한 우리는 소스코드 상에서 직접 쓰고 싶은 얘들을 new해서 능동적으로 선택했었고 직접 하나하나 만들었다. 근데 스프링 컨테이너는 소스코드에 주입을 해버린다. xml을 이용해서. 그래서 의존성 주입이라고 부르는 것.**

엄청난 것이다. 한 두개가 아니라고 생각하면.

```java
Driver(Movable car){ // 생성자 DI
	this.car = car;
}

setCar(Movable car){ // SET DI
    this.car = car;
}
```

1. XML 파일 -> 이게 사실상 번거롭지만 설정만 보면 다 파악이 되니까 대형용 프로젝트에서는 이게 좋다 -> DI 1~3
2. XML 파일 + annotation. annotation을 붙일 수 있는 게 필요하다. 자바 소스코드에 annotation이 들어가기 때문에 재컴파일을 통해서 알아봐야 한다. -> DI 4
3. Java Source Configuration + Annotation. -> xml의 설정 파일용 java 소스를 우리가 짠다.

bean을 찾아오려고 id를 준 것. vo는 안 맡김. 그냥 데이터를 표현하는 것. vo는 등록하지 않는다.

@Component. 모두 다 컴포넌트지만 어떤 녀식인지 구분을 해놓은 것이다. MVC 패턴으로. 다 @Component만 써도 상관은 없다. 다만 헷갈릴 수도 있으니.

찾아오라고 하는 게 Component-scan. 이게 되기 위해선 내부적으로 annotation-config가 실행된다.

- @Service
- @Repository - DAO같은 녀석
- @Controller
- @Configuration - 환경 설정용 컴포넌트. JavaSourceConfiguration용. 얘도 자바클래스니까 다른 녀석들이랑 헷갈리지 않도록. 

스프링한테 짝궁이 됐으면

바뀌는 첫 글자 바꾸는 거 카멜 기법. 자바 beans 규약이라고 한다. 그걸 알아봐야 하니까. 

알아서 짝궁 정해달라고 하는 게 autowire. constructor bytype이 생성자용 타입

그냥 bytype과 byname은 다 setter용. bytype은 매개변수 타입과 똑같은 놈. 그래서 여러 개면 에러 내버린다. byname은 setter의 대문자를 소문자로 바꿔서 판단. 그래서 여러 개라고 해서 상관없다. primary true라는 게 있는데 이름

autowire는 bytype+byname. 생성자의 매개변수. private 변수에도 접근할 수 있다. 사실상 setter를 안 만들어도 접근할 수 있다. 



# Spring 마지막 정리

DBMS가 꼭 필요하다. 

Dispatcher Servlet(Front Controller 모든 요청은 얘를 거쳐가도록 `/`으로 맵핑했다. ~.do라는 url이 유일해서 구분할 수 있다. 여기서 퍼져 나가는 게 UserController,FoodController 등...)Controller -> ServiceImpl(DAO와 의존성을 갖는다. DI로 구체적인 타입이 없고 dao의 인터페이스만 있다) -> DAOImpl(DAO를 다양한 버전으로 만들 수 있다. JDBC, MyBatis, Hibernate, JPA 등... 스프링은 얘들과 연결 고리의 역할을 해준다) -> DBMS

DI(IoC) : 생성하고 짝궁 정해주고 그런 걸 스프링이 한다. 

객체를 생성하는 것으로 객체 등록을 한다. new할 때 생성이 편리. 골라쓰면 된다. DI는 코드가 받아들이는 입장. 

그릇이 바뀔 수 있다. 같은 업무인데 단계가 바뀔 수도 있다. 상황에 따라 고칠 수 있다. 

POJO : 그런 라이브러리나 제공하는 입장에서는 메소드가 뭐가 있을지 모르니까 필요한 기능들을 상위타입에 선언해뒀으니 쓰고싶으면 써라.

그 메소드 있다. 상속받는 컨트롤러 말고 annotation 기반의 컨트롤러 개발이 가능하더라.

@RequestMappin() 만약에 안주면 다

Handler apping이 잇어서 컨트롤러 도우미가 

파라미터가 있는 경우가



같은 url의 컨트롤러인데 분기될 수있고 컨트롤러의 파라미터가 있어도 다른 타겟팅을 줄 수 있다. 

모델에 추가했지 request에 추가한 게 아니다. 처리한 결과를 model에 저장하고 특별한 말이 없으면 request에 xml형태로 가공을 해주는 view가 도착한다. view를 커버할 수 있도록. ViewResolver. 얘가 포워딩을 할 수 있는 얘들을 식별할 수 있다. 주소로 못 친다. .jsp를 붙여서 컨트롤러에서 컨트롤러로 포워딩하고 싶은데 포워딩을 하면 prefix가 붙어버린다. 이걸 하지 못 하

기본적인 포워딩은 ...?

set에 Autowired를 쓰는 제대로 된 이유. @Controller의 이유. 

redirect는 contextPath를 안 붙여줘도 된다. 왜냐면 스프링이 붙여주니까. 알아서 붙여준다. 내 앱기준으로만 생각하면 되니까 편하다. 

atSessionAttribute. 세션을 함께저장해주는 속성. 그러나 세션 자체를 소멸시키는 건 할 수 없다. 

보통은 한 컨트롤러에 하나의 서비스. 그러나 여러 개의 서비스를 줘도 된다. 하지만 그건 서비스 자체가 연관성이 있다는 뜻이기 때문에 잘 살펴봐야 한다. 

car

포워딩 처리가 된다.

아무 것도 안 주면 컨트롤러의 이름과 똑같은 곳으로 포워딩이 일어난다. 

모델에 저장하고 상세페이지로 포워딩. 

resources에는 정적 리소스들 html, css 등...




<Spring Framework>

  

- 프레임워크란?

  

- 프레임워크란 특정한 목적에 맞게 프로그래밍을 쉽게 하기 위한 틀.

  

- Spring Framework를 배울 때

  

- 스프링 프레임워크의 기능을 모두 익히려고 하지 말자. 너무 많으니 그냥 필요할 때 가져다 쓰면 된다.

- 가볍게 학습을 하고 그걸 가지고 프로젝트를 여러 개 해보면 된다.

  

- Spring Framework란?

  

- 부가적인 설정들을 최소화하기 위해서 자바 언어 코딩에 최적화되어 있는 틀

- spring = eclipse + STS(플러그인)

  

- Spring project 만들기

  

- JDK 설치 -> tomcat 설치 -> eclipse 설치 -> 환경변수 설정 -> tomcat 설정(server locations를 tomcat installation, server options를 sepearate xml로, 포트 충돌 가능성이 있으니 포트를 8181로 설정) -> market에서 STS 설치

  

- 2강 19분 31초

- Property에 있는 걸 set메소드로 해주는 것.

- setter 메소드가 있기 때문에 xml 파일이 존재하는 것.

- <Property name="firstNum">

-

- spring bean configuration files가 xml 파일이다.

  

- ArrayList<String> 타입은 인터페이스인 list에 상속된 arraylist 클래스이니까. list라고 적습니다.

- 생성자()와 setter()가 아니라 Java 파일로도 의존성 주입이 가능하다.

- 생성자는 constructor-arg

- setter는 property

  

- DI 사용에 따른 장점

  

- 자바 코드에다가 쓰면 되는데 왜 굳이 xml에다 정의를 해서 쓸까?

  

- 작은 규모의 프로젝트에서는 잘 모릅니다. 그러나 규모가 커지고 유지보수 업무가 발생하면 DI를 이용한 개발의 장점을 느낄 수 있다.

- ctx를 선언한 Java 코드는 손을 대지 않고 xml 파일에서만 바꿔주면 된다.

- 14분

  

  

-

- 전자정부표준프레임워크

  

- 한국정보화진흥원에서 만든 웹 기반 어플리케이션 프레임워크로서 정부 및 공공기관, 공기업 등의 웹 사이트에 자주 쓰이는 공통 기능들을 Spring 프레임워크와 유명 java 라이브러리(iBatis/myBatis, jackson, apache commons등)을 가지고 미리 만들어 놓은 공통 컴포넌트와 개발환경, 실행환경, 운영환경, 관리환경 등으로 구성되어 있다.

- 개발 프레임워크의 표준 정립으로 응용 소프트웨어의 표준화, 품질 및 재사용성 향상을 목표로 하고 있다.

  

- 프레임워크

  

- 어떤 목적을 달성하기 위해 복잡하게 얽혀있는 문제를 해결하기 위한 구조

- 소프트웨어 개발에 있어 하나의 뼈대 역할

- 클래스와 라이브러리가 합쳐진 형태.

- 재사용 가능한 수많은 클래스들과 라이브러리들을 융합한 채로 처음부터 제공해준다. 그래서 여러 개의 표준을 만들지 않아도 되니 개발자의 피곤함을 덜어준다.

- Spring, Apache 시리즈(Sling, Structs 2, Wicket), JWT, Django, Flask, Ruby on rails, Laravel, Codeigniter, CakePHP, Symfony, Zend-Skeleton, Bootstrap, .net Framework, Qt, Express.js, AngularJS, Angular, Vue.js

  

- Spring 프레임워크

  

- 자바 플랫폼을 위한 오픈소스 애플리케이션 프레임워크

- JSP로 시스템을 구축한다면 반드시 사용되는 프레임워크

- 스프링 프레임워크의 특징

  

- POJO(Plain Old Java Object) : POJO는 Java EE를 사용하면서 무거운 객체를 만드는 것에 반발하면서 나타난 용어이다. 별도의 프레임워크 없이 Java EE를 사용할 때에 비해 특정 인터페이스를 직접 구현하거나 상속받을 필요가 없어 기존 라이브러리를 지원하기가 용이하고, 객체가 가볍다.

- AOP(Aspect Oriented Programming) : 로깅, 트랜잭션, 보안 등 여러 모듈에서 공통적으로 사용하는 기능을 분리하여 관리할 수 있다. AspectJ를 포함하여 사용할 수 있고, 스프링에서 지원하는 실행에 조합하는 방식도 지원한다.

- DI(Dependency Injection) : 프로그래밍에서 구성요소 간의 의존 관계가 소스코드 내부가 아닌 외부의 설정 파일을 통해 정의되는 방식이다. 코드 재사용을 높이고 모듈간의 결합도도 낮춘다. 계층, 서비스 간에 의존성이 존재하는 경우 스프링 프레임워크가 서로 연결시켜준다.

- IoC(Inversion of Control) : 개발자가 작성한 프로그램이 외부 라이브러리의 코드를 호출해서 작동하는 게 아니라 반대로 외부 라이브러리 코드(스프링)가 개발자의 코드를 호출하는 것. 제어권이 프레임워크에게 있어 필요에 따라 스프링 프레임워크가 사용자의 코드를 호출한다.

- 생명주기 : 스프링 프레임워크는 경량 컨테이너로 Java 객체의 생성, 소멸을 직접 관리하며 필요한 객체만 사용할 수 있다

- 다양한 서비스 : myBatis와 같은 데이터베이스 처리 라이브러리나 tiles 같은 유용한 인터페이스를 제공한다.

  

- 구조

  

- Core : IoC와 DI 기능을 제공한다.

- DAO : JDBC 추상 계층을 제공한다.

- ORM : JPA, myBatis, Hibernate와 같은 ORM API들과 통합할 수 있는 기능을 제공했다.

- AOP : 스프링 프레임워크에서 제공하는 AOP 패키지를 제공한다.

- Web : Spring Web MVC, Strcts, WebWork 등 웹 어플리케이션 구현에 도움되는 기능을 제공한다.

  

- Apache commons

  

- 언어와 상관없이 공통모듈들을 개발하기 위한 최상위 프로젝트로 있었지만 프로젝트가 모이지 않아 활성화되지 않아 문을 닫았다. 그러나 활발한 활동을 하며 프로젝트가 늘어나고 있던 jakarta Commons와 XML commons, web service commons 등의 자바 관련 프로젝트들이 최상위 프로젝트로 옮겨오면서 현재는 자바 언어 관련 재사용 가능한 컴포넌트를 개발하는 프로젝트로 이어지고 있다.

  

- iBatis

  

- SQL에 기반한 데이터베이스와 자바, 닷넷, 루비 등을 연결시켜주는 프레임워크다. 이러한 연결은 프로그램의 소스코드에서 SQL 문장을 분리하여 별도의 XML 파일로 저장하고, 별도의 XML 파일로 저장하고 이 둘을 서로 연결시켜 주는 방식으로 작동한다.

- 사용자가 SQL 문장을 만들면 그에 적합한 객체 모델을 생성하는 방식으로 작동한다.

- iBatis 개발자들은 구글로 옮겨서 Mybatis가 되었다. atis

  

- Mybatis

  

- XML 서술자나 annotation을 사용하여 저장 프로시저나 SQL 문으로 객체들을 연결시킨다.

  

- Maven

  

- maven은 java 기반 프로젝트의 라이프 사이클 관리를 목적으로 하는 빌드 도구이다. 이에 따라 컴파일과 build를 동시에 수행, 테스트를 병행하거나 서버 측 Deploy 자원을 관리할 수 있는 환경을 제공한다. 또한 라이브러리 관리 기능도 내포하고 있다. Java로 개발하다 보면 다양한 라이브러리를 필요로 하게 되는데, pom.xml 파일에 필요한 라이브러리만 적으면 Maven이 알아서 다운받고 설치해주고 경로까지 지정해준다.

- 그러나 maven에서 기본적으로 지원하지 않는 빌드 과정을 추가해야 하는 경우 상당한 고생이 따른다.

  

- deploy

  

- 만들어진 프로그램을 서비스 위치로 보내는 작업

  

- Groovy

  

- Java를 발전시킨 객체 지향 프로그래밍 언어. 2015년부터 아파치 소프트웨어 재단이 관리하고 있다. Java와 문법이 거의 동일하다. 차이점이라면 public, private 등의 접근 레벨 지시자나 세미 콜론 등이 옵션이라는 것. 특히 Gradle을 이용한 빌드 배포를 하려면 반드시 배워야 한다. JVM 위에서 그대로 돌아가기 때문에 Java API도 문제없이 사용이 가능하다. IDE 역시 Java를 지원하면 Groovy도 지원하는 경우가 많다.

  

- 의존성 주입(Dependency Injection)

  

- 프로그래밍에서 구성요소간의 의존 관계가 소스코드 내부가 아닌 외부의 설정 파일등을 통해 정의되게 하는 디자인 패턴 중 하나이다.

- 의존 관계 설정이 컴파일시가 아닌 실행시에 이루어져 모듈간의 결합도를 낮출 수 있습니다.

- 예시(사람 객체 만들기)

  

- 보통 생각했을 때

  

- 머리A, 몸통, 팔, 다리 클래스 정의

- 사람 클래스 정의

- 사람 클래스 각각 필드에 머리A, 몸통, 팔, 다리 클래스를 합성

- 머리A클래스를 변경했을 때 사람 클래스도 수정하면서 합성에 영향을 많이 끼침

  

- 의존성 주입으로 생각했을 때

  

- 머리A, 몸통, 팔, 다리 클래스 정의

- 사람 클래스 정의

- 사람클래스의 각각 필드와 머리A, 몸통, 팔, 다리 클래스의 의존성을 정의한 Bean Context를 작성

- 머리A클래스를 변경했을 때 Bean Context에 있는 class만 변경해주면 됨. 사람 클래스에는 영향이 없다.

  

- MVC 패턴

  

- Model, View, Controller 세 가지 부분으로 이루어져 있다. Model은 자료(Data)를 생성, 저장, 처리하는 역할을 하는 부분이다. View는 Model로부터 받은 자료를 여러 가지 형태로 사용자에게 보여주는 역할을 한다. Controller는 소프트웨어의 흐름을 제어하는 것으로 View와 Model 사이에서 관계를 설정하여 주는 부분을 말한다. Controller는 Model이나 View가 바뀌더라도 수정없이 작동되어야 한다.

  

- Spring boot

  

- 스프링은 J2EE로 알려진 자바 엔터프라이즈 에디션을 경량화하려는 대안으로 시작했었다. 의존성 주입과 AOP를 활용해서 EJB의 기능을 POJO로 구현할 수 있게 했다.

- 그러나 컴포넌트 코드 작성은 가볍지만 개발 구성은 무거웠다. 게다가 스프링에서 어떤 라이브러리를 프로젝트 빌드에 포함해야 하는지 결정하는 일은 까다롭다. 라이브러리 버전이 안 맞으면 모든 곳에서 호환성 문제가 생겼습니다.

- Spring boot에서는 스프링 구성이 없다. web.xml도, 빌드 명세도 없다. 애플리케이션 서버도 없다. 애플리케이션을 실행하는 복잡한 과정은 스프링부트가 처리하고 개발자는 애플리케이션 코드만 작성하면 된다.

- 스프링 부트의 핵심

  

- 자동 구성

  

- 스프링 부트가 애플리케이션 클래스 패스에서 H2 데이터베이스 라이브러리를 발견한다면 내장 H2 데이터베이스를 자동으로 구성합니다.

- 스프링 부트에는 내장 데이터베이스와 JdbcTemplate 등 수많은 자동 구성이 있습니다.

  

- 스타터 의존성

  

- 의존성을 여러 개 추가해야 될 걸 스타터 의존성 하나만 추가하면 이 스타터 의존성이 기능에 필요한 다른 의존성을 모두 끌어와서 추가한다.

- 그래서 스타터 의존성을 사용하면 필요한 라이브러리의 버전을 고민할 필요가 없다. 왜냐면 이미 스타터가 끌어오는 라이브러리 버전은 이미 테스트가 끝난 것이기 때문이다.

  

- 명령줄 인터페이스

  

- 스프링 부트 CLI를 이용하면 개발에 더 집중할 수 있다.

  

- 액추에이터

  

- 애플리케이션을 실행할 때 내부에서 어떤 일이 일어나는지 살펴볼 수 있다.

  

- RESTful

  

- REST 원리를 따르는 시스템

  

- REST

  

- Representational State Transfer.

- www와 같은 분산 하이퍼 미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식

- 네트워크 아키텍처 원리의 모음. 즉, 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반을 일컫는다. 즉, 웹 상의 자료를 HTTP 위에서 SOAP이나 쿠키를 통한 세션 트랙킹 같은 별도의 전송 계층 없이 전송하기 위한 아주 간단한 인터페이스.

- REST 아키텍처 형식을 따르면 HTTP나 WWW이 아닌 아주 커다란 소프트웨어 시스템을 설계하는 것도 가능하다.

  

- JSON

- SOAP(아직 이해 못함)

  

- Simple Object Access Protocol.

- HTTP, HTTPS, SMTP 등을 통해 XML 기반의 메세지를 컴퓨터 네트워크 상에서 교환하는 프로토콜.

- 웹 서비스에서 기본적인 메세지를 전달하는 기반이 된다.

- SOAP이 쓰는 메시지 패턴

  

- 원격 프로시저 호출(Remote Procedure Call) 패턴으로 클라이언트에서 서버쪽으로 메시지 요청

- 서버는 메세지를 즉시 응답

  

- XML을 근간으로 헤더와 바디를 조합하는 디자인 패턴으로 설계되어 있다.

  

- HTTP

  

- Hyper Text Transfer Protocol

- 하이퍼 텍스트를 빠르게 교환하기 위한 프로토콜의 일종으로 즉, HTTP는 서버와 클라이언트 사이에서 어떻게 메세지를 교환할 지를 정해놓은 규칙

- 80번 포트를 사용하며 HTTP 구조는 요청과 응답으로 구성되어 있다.

- 대부분 HTTP/1.1 버전이지만 HTTP/2가 공식으로 발표됐다.

- HTTP는 FTP나 TELNET과 다르게 비연결식이다. 즉, HTTP는 클라이언트가 서버에 정보를 요청하고 서버로부터 응답 코드와 내용을 받으면 클라이언트와 연결을 종료한다. (Stateless)

  

- HTTPS

  

- TLS를 사용해 암호화된 연결을 하는 HTTP

  

- TLS(Transport Layer Security)

  

- 인터넷에서 정보를 암호화해서 송수신하는 프로토콜

- SSL(Secure Socket Layer)에서 기반한 기술로 표준에 명시된 정식 명칭은 SSL이 아니라 TLS이다.

- 서로의 신원을 확인하기 위해서 HandShake 과정을 거친다.

- 서로가 어떤 TLS 버전을 사용가능한지 확인하고, 인증서를 사용해 서로 믿을 수 있는지 확인한 뒤, 서로 간의 통신에 쓸 암호를 교환한다. 그 다음부터는 서로 교환한 암호를 사용해 암호화된 통신을 하면 된다.

- 암호화 통신인 만큼 속도상의 손해가 발생한다. 왜냐면 HTTPS로 연결된 페이지에 한 개라도 구성 요소 중 HTTP로 로드하는 것이 있다면 웹 브라우저가 "보안되지 않은 컨텐츠"라면서 보안 경고를 뿜어댄다.

- TLS는 HTTP 뿐만 아니라 FTP, SMTP와 같은 여타 프로토콜까지 포함한다.

- 사실 인증기관에서 주는 인증서는 제대로 확인되지 않은 인증서(Domain Validation 인증서)이기에 이 문제점을 고친 EV-SSL이라고 인증 조건이 매우 빡빡하고 발급 이용도 도메인 인증서에 비해 비싼 프로토콜이 있다.

  

- JSON(JavaScript Object Noatation)

  

- 속성-값의 쌍으로 이루어진 Data Object를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. 비동기 브라우저/서버 통신을 위해, 넓게는 XML을 대체하는 주요 데이터 포맷이다. 인터넷에서 자료를 주고 받을 때 그 자료를 표현하는 방법으로 알려져 있다.

- []안에는 순서가 있는 배열, {}안에는 속성명이 있는 객체를 의미하며 객체 안에 객체를 넣을 수도 있어서 XML 처럼 복잡한 구조 또한 표현이 가능하다.

- 자바스크립트의 구문 형식을 따르지만 언어 독립형 데이터 포맷이다.

- JSON은 ECMAScript5에서 기본 기능으로 내장되어 새롭게 출시되는 브라우저들 기준에서는 DOM을 통해 XML을 파싱하는 것보다 JavaScript 엔진에서 JSON을 메모리로 받는 쪽이 성능으로나 트래픽으로나 더 나은 선택이 됐다.

- 그러나 확산되고 있다고 해도 어디까지나 웹 브라우저가 주가 되는 환경 위주로 퍼지고 있으며 그렇지 않은 곳에서는 여전히 XML이 사용된다.

  

  

<전자정부표준프레임워크>

  

- pom.xml

  

- Project Object Model의 준말

- Maven 설정 파일

- 트리 구조로 구성되며 부모 요소의 속성들을 상속할 수 있다.

- 필요한 라이브러리를 pom.xml의 <dependencies> 태그에 붙여넣으면 자동으로 *.jar 라이브러리들을 추가해준다.

  

- setting.xml

  

- Maven 빌드는 프로젝트의 컴파일, 테스트, 패키징을 모두 수행하고 그 결과를 제공한다. 메이븐을 먼저 하고 run해야한다.

- IoC Container

  

- Inversion of Control(IoC) = 제어의 역전 현상

  

- 객체의 생성에서부터 생명주기의 관리까지 객체에 대한 제어권이 바뀌었다는 것을 의미.

  

- 프레임워크의 기본적인 기능.

- 객체 생성 시, 객체가 참조하고 있는 타 객체에 대한 종속성을 소스 코드 내부에서 하드 코딩하는 것이 아닌, 소스 코드 외부에서 설정하게 함으로써, 유연성 및 확장성을 향상시킨다.

- 원래 자바 객체를 생성하고 의존 관계를 연결시키는 작업에 대한 제어권은 어플리케이션에 있었지만 Servlet, EJB 등을 사용하는 경우 Servlet Container, EJB Container에게 제어권이 넘어간다.

  

- Bean

  

- spring framework에서 Bean은 어플리케이션을 구성하고, IoC container에 의해 관리되어 지는 객체를 의미한다. Bean들과 Bean들 간의 종속성은 container가 사용하는 설정 메타데이터(configuration metadata)에 의해 결정된다.

  

- 이 설정 정보는 'spring IoC container가 객체를 생성하고, 객체간의 종속성을 이어줄 수 있도록' 필요한 정보를 제공한다. 설정 정보는 일반적으로 xml 형태로 작성된다.

- 그리고 이 설정 정보는 xml이 아닌 java annotation을 이용해도 설정이 가능하다.

  

- xml 형태 설정 정보의 기본적인 모습

- <beans> 태그는 spring IoC container의 설정 정보를 나타내는 태그이다. <beans>태그 안 각각의 <bean> 태그는 spring IoC container가 생성하고, 관리할 객체의 정의를 나타낸다.

- <import>태그를 사용하면 하나의 설정 정보 파일에서 다른 파일을 Import할 수 있다.

  

- resource 속성을 이용해서 xml 설정 파일의 위치를 나타낸다.

  

- container를 context 객체로 인스턴스화하면 getBean(String) 메소드를 사용해서 bean을 가져올 수 있다.

- Container에서 사용하는 bean의 정의는 아래의 정보를 담고 있다.

  

- 클래스 이름 - bean의 실제 구현 클래스를 나타낸다.

- 다른 bean에 대한 참조 - bean이 동작하기 위해 필요한 다른 bean 들에 대한 참조 정보(이런 참조를 collaborators or dependencies라고도 한다)

- 기타 객체에 설정할 정보들 - connection pool을 관리하는 bean에서 사용할 connection의 개수, pool의 최대 크기 등등…

- =>이런 정보들이 실제 <bean> 태그로 작성된다.

  

- 모든 bean 정의는 객체화를 위해 실제 Java Class가 필요하다.

  

- <bean> 태그 안에서 class 속성을 통해 java class를 설정한다.

- 대부분의 경우 Container는 bean을 객체화하기 위해서 Java의 new 연산자를 사용한다.

  

- 종속성 삽입(=의존성 주입, Dependency Injection(DI))

  

- 일반적으로 클래스의 인스턴스를 MyClass myclass = new MyClass();로 생성합니다. 이 작업은 불편한 점이 있습니다. 자기 자신이 인스턴스를 만들던지, 자신이 직접 가서 찾아오던지 해야하고 이 인스턴스 생성 비용이 크거나, 여러 군데에서 사용하게되면 메모리에 계속 할당되고 일일이 생성해서 사용해야하는 불편함이 있습니다.

- 그럴 때 인스턴스의 생성과 life-cycle 관리까지 컨테이너에 맡기는 것이 바로 의존성 주입입니다.

- 즉, 자신이 그 객체를 필요할 때만 @autowired같이 어노테이션을 이용해 컨테이너로부터 주입받아서 사용하는 것입니다.

- 이렇게 인스턴스의 생성 및 관리 주체가 '나' 자신이 아니라 '컨테이너'가 되기 때문에 IoC(Inversion Of Controls), 제어의 역전이 되는 것이고 그 방법론 중에 하나로 Dependency of Injection이 일어나는 것입니다.

- 조금 자세히 이야기 하면 각 클래스 사이의 의존관계를 빈 설정(Bean Definition) 정보를 바탕으로 컨테이너가 자동적으로 연결해주는 것입니다. 컨테이너가 의존관계를 자동적으로 연결시켜주기 때문에 개발자들이 컨테이너 API를 이용하여 의존 관계에 관여할 필요가 없게 되므로 컨테이너 API에 종속되는 것을 줄일 수 있다. 개발자들은 단지 빈 설정(Bean Definition)파일에서 의존관계가 필요하다는 정보를 추가하기만 하면 된다.

- Dependency Injection(DI)의 기본적인 원칙은 '객체는 Bean에 생성자나 set메소드를 통해서만 필요로 하는 객체를 정의한다는 것'입니다. 그러면 container는 bean 객체를 생성할 때, bean에서 정의한 의존성을 주입합니다.

- 종속성 삽입에는 두 가지 방법이 있다.

  

- Constructor Injection

  

- 생성자 기반의 DI는 다수의 arguments를 갖는 생성자를 호출하여 종속성을 주입한다. <constructor-arg> element를 사용한다.

- 즉, 처음에 생성자를 만들 때 파라미터가 있도록 해서 객체가 생성될 때 바로 주입합니다. 생성자를 호출할 때 그 인수에 원하는 걸 넣으면

  

- Setter Injection

  

- Setter 기반의 DI는 argument가 없는 생성자를 통해 bean 객체가 생성된 후, setter 메소드를 호출하여 종속성을 주입한다. <property> element를 사용한다.

  

- <constructor-arg>, <property>의 sub-element type으로 여러 값들을 지정할 수 있습니다.

  

- type과 index, value

- <value>

- <ref> - 다른 bean을 참조할 수 있습니다.

  

- bean - 그 bean 객체를 참조. id와 같아야 합니다.

- local - 같은 xml 설정 파일 내의 bean 객체 참조

- parent - 현재 container의 부모 container의 bean 객체를 참조

  

- Inner beans - <property/> or <constructor-arg/> element 안에 있는 </bean> element를 inner bean이라고 합니다. 여기는 정의한다 해도 무시되기 때문에 정의하지 않아도 됩니다.

- Collections - <list/>, <set/>, <map/>, <props/> element가 사용됩니다.

- Collection 병합 - 부모 bean의 collection과 자식 bean의 collection을 병합할 수 있습니다.

- <null/> - null값을 갖게 할 수 있습니다.

  

- 종속되지만 종속성이 직접 나타나지 않는 경우(static 메소드에 의해 초기화가 되어야 하는 경우)도 있습니다. 그럴 경우, depends-on 속성을 사용하여 명시적으로 종속성을 표현할 수 있습니다.

- ApplicationContext는 시작시에 모든 bean을 객체화하는데 lazy-init을 사용하면 시작 시가 아니라 처음으로 필요로 했을 때 생성되게 할 수 있습니다. 그러나 시작 시에 객체화 하는 게 잘못된 설정이 있는 경우 즉시 발견할 수 있기 때문에 더 좋습니다.

- 서로 관계있는 bean 들을 자동으로 엮어줄 수 있습니다. autowire 속성을 쓰면 되는데, 여기에는 모드가 따로 있습니다. property이름으로 자동엮기를 한다든가, 타입으로 자동엮기를 한다든가… 또 제외시켜줄 수도 있습니다.

- dependecy-check 속성을 이용해서 bean의 모든 property가 지정되었는지 확인시켜줄 수 있습니다.

- container에 존재하는 대부분의 bean은 singleton입니다. 이런 bean이 다른 bean과 collaborate할 경우, property를 정의함으로써 종속성을 조절해야 합니다. 하지만 bean들의 생명주기 자체가 다르다면 문제가 발생합니다. 이 문제를 해결하기 위해선 Lookup method injection를 쓰면 됩니다. lookup 메소드 삽입은 container가 관리하고 있는 bean의 메소드를 override해서 container 안에 있는 다른 bean을 찾을 수 있게 하는 기능입니다. override하기 위해서 동적으로 상속 클래스를 생성합니다.

  

- Bean scope

  

- Bean정의는 실제 bean 객체를 생성하는 방식을 정의하는 것이다. 하나의 bean 정의에는 다수의 객체가 생성될 수 있다. 그래서 객체의 범위또한 정의할 수 있습니다.

- spring framework는 5가지의 scope를 제공합니다.

  

- singleton(default) - 하나의 Bean 정의에 대해서 단 하나의 인스턴스만 존재합니다. 그래서 ref로 공유하는 형식

- prototype - 하나의 Bean 정의에 대해서 다수의 객체. 매순간 새로운 bean 객체

- request - 하나의 Bean 정의에 대해서 HTTP request 생명주기 안에 자신만의 하나의 객체만 존재

- session - 하나의 Bean 정의에 대해서 HTTP session 생명주기 안에 자신만의 하나의 객체만 존재

- global session - 하나의 Bean 정의에 대해서 HTTP global session 생명주기 안에 자신만의 하나의 객체만 존재

  

- Customizing the nature of a bean - Spring Framework는 container 내부의 bean 행동을 변화시킬 수 있는 다양한 callback interface를 제공합니다.

  

- Lifecycle callbacks

  

- Initialization callbacks

  

- InitalizingBean interface를 구현하면 bean에 필요한 모든 property를 설정한 후, 초기화 작업을 수행한다. 그러나 code가 spring과 coupling 되어 잘 쓰지 않는다. 이 대안으로 bean을 정의할 때 init-method 속성을 사용한다.

  

- Destruction callbacks

  

- DisposableBean interface를 구현하면, container가 파괴될 때 bean이 callback을 받을 수 있다. 하지만 이도 coupling되어 잘 쓰지 않는다. destroy-mothod 속성을 이용해 bean을 정의할 때 쓸 수 있다.

  

- Knowing who you are

  

- BeanFactoryWare interface를 사용하면, 자신을 생성한 BeanFactory를 알 수 있고 다른 bean을 검색할 수 있다 하지만 얘도 coupling을 발생시킨다. 이 대안으로 ObjectFactoryCreatingFactoryBean을 쓰면 된다. bean을 찾아주는 객체를 참조할 수 있다.

  

- Bean definition inheritance

  

- 자식 bean을 정의하면 필요에 따라 부모 bean으로부터 상속받아 설정 정보를 덮어쓰거나(override) 추가할 수 있다. xml에서는 parent 속성을 사용하면 된다.

- 자식 bean의 정의에 class가 명시되어 있지 않을 경우, 부모 bean 정의의 값을 사용한다. 만약 자식 bean 정의에 class가 명시되어 있다면 자식 bean은 부모 bean 정의의 모든 property 값을 받아들일 수 있어야 한다.(상속받는다)

- 부모 bean 정의에서 abstract를 true로 설정한다면 class를 지정하지 않는다. 자식이 해야되는 거니까.

  

- Container extension points - Spring IoC container는 특별한 통합 interface의 구현체를 삽입하여 확장할 수 있다.

  

- BeanPostProcessors를 사용한 확장

  

- BeanPostProcessors interface는 다수의 callback 메소드를 정의하고 있는데 이 메소드를 구현함으로써 자신만의 객체화 로직, 종속성 해결 로직등을 제공할 수 있다.

- 특정 class가 Container에 post-processor로 등록되면, post-processor는 container에서 생성되는 각각의 bean 객체에 대해서 container 객체화 메소드 전에 callback을 받는다.

- 중요한 것은 BeanFactory는 post-processor를 다루는 방식에 있어서 ApplicationContext와는 조금 다르다. ApplicationContext는 BeanPostProcessor interface를 구현한 bean을 자동적으로 인식하고 post-processor로 등록한다. 하지만 BeanFactory 구현을 사용하면 post-processor는 다음과 같이 명시적으로 등록되어야 한다. 명시적 등록은 불편해서 BeanFactory 구현보다는 ApplicationContext 구현을 사용한다.

  

- BeanFactoryPostProcesors를 사용한 확장

  

- 얘를 사용하면 bean 설정 메타정보를 처리한다는 것이다. spring IoC container는 BeanFacktoryPostProcessors가 설정 메타 정보를 읽고, container가 실제로 bean을 객체화하기 전에 그 정보를 변경할 수 있도록 허용한다.

- BeanFactory의 경우, 수동으로 실행되고, ApplicationContext의 경우 자동으로 실행된다.

  

- FactoryBeans를 사용한 확장

  

- FactoryBean interface를 구현한 객체는 스스로 factory가 된다.

  

- The ApplicationContext

  

- ApplicationContext는 BeanFactory를 확장한 것으로 BeanFactory의 기능 외, 여러 기능을 제공한다.

  

- BeanFactory보다는 ApplicationContext를 사용한다.

- ApplicationContext는 Event 처리를 위해 ApplicationEvent, ApplicationListener interface를 제공한다. ApplicationListener interface를 구현한 bean은 ApplicationContext에 발생한 모든 ApplicationEvent를 전달받는다. (RefreshedEvent, Started, Stopped, Closed, Handled 정도의 이벤트가 있다.

  

- Conveinenet, ApplicationContext instantiation for web

  

- servlet context listener는 웹 어플리케이션을 위한 servlet context가 생성되어 첫 번째 요청을 처리할 상태가 된 직후 수행된다. 그래서 servlet context listener가 Spring Application을 초기화하라 최적의 장소이다.

- 그래서 <listener>안에 ContextLoaderListener를 넣으면 된다.

  

- Annotation-based configuration

  

- Spring은 의존성 주입을 위해 annotation을 사용할 수 있다. annotation을 사용하기 위해서는 Spring container에 특정 BeanPostProcessors를 등록해야만 한다. 항상 그렇듯이, 이들 BeanPostProcessors가 개별적인 bean 정의로 등록될 수 있지만, context namespace를 사용하여 등록할 수도 있다.

- @Required

  

- bean property setter 메소드에 적용된다. 이 annotation은 단순히 bean property가 설정 시 반드시 설정되어야만 한다는 것을 나타낸다. 설정이 이루어지지 않는 경우, container는 Exception을 던진다.

  

- @Autowired

  

- 전통적인 setter 메소드에 적용된다. 다른 이름을 가지거나, 생성자 및 field에도 적용될 수 있다. array나 collection에도 쓸 수 있다. 대상이 되는 bean이 없을 경우 실패한다. type을 기반으로 동작한다.

  

- Qualifier를 사용한 annotation 기반의 자동 엮음

  

- type을 이용한 autowire는 대상이 다수가 발생할 수 있기 때문에, 선택 시 추가적인 제어가 필요하다. 이 때 @Qulifier annotation을 사용하면 특정 argument를 qualifier와 관련시킴으로써, 타입을 찾을 대상을 좁힐 수 있다. 즉, autowire의 대상을 찾을 때 상세한 제어를 제공하기 위함이다.

  

- @Resource

  

- name 속성을 가지고, Spring은 그 값을 삽입할 bean 이름으로 인식한다. name의 속성을 설정하지 않은 경우, bean type으로 대상을 찾는다.

  

- Classpath scanning for managed components

  

- @Component and further stereotype annotations

  

- Auto-detection Components

  

- Spring은 stereotyped class(@Component, @Repository, @Service, @Controller)를 자동으로 탐지하고 ApplicationContext에 일치하는 BeanDefinition을 등록하는 기능을 제공한다.

  

- Naming autodetected components

  

- ??

  

- Providing a scope for autodetected components

  

- 다른 scope가 필요할 때 @scope로 바꿔줄 수 있다.

  

- @Repository

- @Component

  

- Bean Definition Profiles

  

- 동일한 id의 bean을 여러 개 정의하여 사용자의 설정으로 활성화시킨 Profile의 해당 bean이 Runtime시에 동작하도록 하는 기능이다. 보통 개발시점과 운영시점에 bean의 Profile 설정 변경만으로 Spring Container에서 Bean적용이 달리 적용되도록 하는데 쓰인다.

- Profile 설정 방법

  

- XML설정

  

- 그냥 똑같이 bean id값만 쓰면 된다. profile을 속성으로 넣고 활성화 시키면 해당 bean이 동작한다.

  

- Annotation 설정

  

- @Profile을 통해서 설정가능하다. @Configuration과 함께 @Profile("Profile명")을 클래스에 쓰게 되면 내부 메소드에 붙은 @Bean을 통해 Bean들이 등록된다.

  

- Profile 활성화

  

- 선언적인 Profile 활성화(web.xml, 환경변수, 프로퍼티등

  

- web.xml이나 jvm 실행 시, 환경변수, Property 값으로 Profile을 활성화시킬 수 있다.

  

- Java 코드를 통한 Profile 활성화

  

- Environment라는 인터페이스를 통해서 해당 프로파일을 활성화시킬 수 있다. setActiveProfiles라는 메소드로 Profile을 활성화시키고 해당 configuration xml을 로딩한다. Profile이 Production으로 설정되어 있는 bean은 Skip된다.

  

- JUnit4테스트의 @ActiveProfile 어노테이션을 통한 Profile활성화

  

- JUnit4에서 Test class에 @ActiveProfile을 붙임으로써 Profile활성화가 가능하다. @ContextConfiguration과 함께 쓰며, @ActiveProfile뒤에 Profile명을 붙이면 해당 Profile이 활성화된다.

  

- Generic

  

- Autowire 및 Qualifier

  

- bean id는 다른데 class는 같은 클래스를 가리킨다면 오류를 발생시킨다.

- Qualifier 어노테이션에 personA를 특정하여 처리할 수 있으나 개별적으로 하나하나 지정해야 한다.

  

- Generic을 이용하면 된다. 추상화 클래스 Employee를 구현한 Manager, Admin을 Generic으로 설정하면 Generic에 대하여 Autowire 주입 대상이 된다. Manager, Admin을 구현하고 Autowire 어노테이션에 의해 자동 주입된다.

  

- AOP(Aspect Oriented Programming) 서비스

  

- 객체지향 프로그래밍은 많은 장점에도 불구하고, 다수의 객체들에 분산되어 중복적으로 존재하는 공통 관심사가 존재한다. 이들은 프로그램을 복잡하게 만들고, 코드의 변경을 어렵게 한다.

- 이런 객체지향 프로그래밍의 문제점을 보완해준 게 AOP이다. 핵심 관심사를 분리하여 프로그램 모듈화를 향샹시킨다.

- 관점은 프로그램의 핵심 관심사에 걸쳐 적용되는 공통 프로그램 영역을 의미한다. 예를 들면, 로깅, 인증, 권한 확인, 트랜잭션은 비즈니스 기능 구현 시에 공통적으로 적용되는 요소이며 하나의 관점으로 정의될 수 있다.

- 즉, 각 코드에 분산되어 있던 관심들(횡단 관심사)은 엮기(Weaving)라는 방식을 이용하여 분리된 관점을 핵심 관심사와 엮는다.

- AOP의 주요 개념

  

- 관점(Aspect)

  

- 구현하고자 하는 횡단 관심사의 기능

  

- 결합점(Join point)

  

- 관점을 삽입하여 실행 가능한 어플리케이션의 특정 지점

  

- 포인트컷(Pointcut)

  

- 결합점 집합을 의미한다. 포인트컷은 어떤 결합점을 사용할 것인지를 결정하기 위해 패턴 매칭을 이용하여 룰을 정의한다.

  

- 충고(Advice)

  

- 관점의 실제 구현체로 결합점에 삽입되어 동작할 수 있는 코드. 충고는 결합점과 결합하여 동작하는 시점에 따라 before advice, after advice, around advice 타입으로 구분된다.

  

- 엮기(Weaving)

  

- 대상 객체에 적용하여 새로운 프록시 객체를 생성하는 과정. 엮기 방식은 다음과 같이 구분된다.

  

- 컴파일 시 or 클래스 로딩 시 or 런타임 시(spring - 프록시를 통해 핵심 관심사를 구현한 객체에 접근)

  

- 도입(Introduction)

  

- 새로운 메소드나 속성을 추가한다. Spring AOP는 충고(Advice)를 받는 대상 객체에 새로운 인터페이스를 추가할 수 있다.

  

- AOP 프록시

  

- 대상 객체에 Advice가 적용된 후 생성되는 객체

  

- 대상 객체는 충고(Advice)를 받는 객체이다. Spring AOP는 런타임 프록시를 사용하므로 대상 객체는 항상 프록시 객체가 된다.

  

- AspectJ 어노테이션을 이용한 AOP 지원

  

- @AspectJ 설정하기

  

- @AspectJ를 사용하기 위해서는 다음 코드를 Spring 설정에 추가한다. <aop:aspectj-autoproxy>

  

- 관점 정의하기

  

- @Aspect 어노테이션을 추가하여 Aspect를 생성한다.

  

- 포인트컷 정의하기

  

- 결합점을 지정하여 advice가 언제 실행될 지를 지정하는데 사용된다. Spring AOP는 Spring bean에 대한 메소드 실행 결합점만을 지원하므로…

  

- 충고(Advice) 정의하기

  

- 관점의 실제 구현체로 포인터컷 표현식과 일치하는 결합점에 삽입되어 동작할 수 있는 코드.

  

- XML 스키마 기반 AOP 지원

  

- Aspect를 지원하기 위해 aop 네임스페이스를 제공한다.

- 관점(Aspect) 정의하기

  

- bean으로 정의된 일반 java 객체는 관점으로 정의될 수 있다. <aop:aspect> 요소를 사용하여 정의한다.

  

- 포인트 컷

  

- bean의 메소드 실행점을 지정하는 것 <aop:config> 요소 내에 정의

  

- 충고는 각 동작마다 다르다. <aop:before>처럼.

- 관점(Aspect) 실행하기.

  

MVC

  

- MVC 패턴은 코드를 기능에 따라 Model, View, Controller 3가지 요소로 분리한다.

- Spring MVC Architecture

  

- Spring Framework는 간단한 설정만으로 Struts나 Webwork같은 Web Framework를 사용할 수 있지만, 자체적으로 MVC Web Framework를 가지고 있다. mvc라는 기본요소 외에도 아래와 같은 특성을 가지고 있다.

  

- DispatcherServelt, HandlerMapping, Controller, Interceptor, ViewResolver, View 등 각 컴포넌트들의 역할이 명확하게 분리되어 있다.

- HandlerMapping, Controller, View 등 컴포넌트들에 다양한 인터페이스 및 구현 클래스를 제공함으로써 경우에 따라 선택하여 사용할 수 있다.

- 비즈니스 로직에 집중한 코드를 작성할 수 있다.

- 웹 요청 파라미터와 커맨드 클래스간에 데이터 매핑 기능을 제공한다.

- 데이터 검증을 할 수 있는, Validator와 Error 처리 기능을 제공한다.

- JSP Form을 쉽게 구성하도록 Tag를 제공한다.

  

- 순서

  

- Client의 요청이 들어오면 DispatchServlet이 가장 먼저 받는다.

- HandlerMapping이 요청에 해당하는 Controller를 return한다.

- Controller는 비즈니스 로직을 수행하고 결과 데이터를 ModelAndView에 반영하여 return 한다.

- ViewResolver는 view name을 받아 해당하는 View 객체를 return 한다.

- View는 Model 객체를 받아 rendering한다.

  

- DispatcherServlet

  

- 유일한 Front Controller

- 모든 웹 요청의 진입점, 웹 요청을 처리하며, 결과 데이터를 Client에게 응답한다.

- spring MVC Framework를 사용하기 위해선 web.xml에 DispatchServlet을 설정하고, DispatchServlet이 WebApplicationContext를 생성할 수 있도록 빈(Bean) 정보가 있는 파일들도 설정해줘야 한다.

- SimpleUrlHandlerMapping - Ant-Style 패턴 매칭을 지원하며, 하나의 Controller에 여러 url을 mapping할 수 있다.

  

- MVC 네임스페이스 그러나 어려워서 변경이 불가능한 경우에는 mvc:annotation-driven을 쓰지 않고 필요한 bean을 수동으로 넣어줘야 하는 경우도 있다.

  

- url별로 Interceptor를 적용하기 위해선 <mvc.interceptors>태그를 사용한다.

  

- Controller 처리를 위한 설정을 쉽게 하도록 Spring mvc 네임스페이스를 제공한다.

- Controller 작성 시에 직접 Controller 인터페이스를 구현하지 말고, 구현 클래스를 확장해서 작성해라.

  

//?? AOP를 왜 쓰는지?

  

- Spring의 원리

  

post나 get으로 요청을 하면 spring에서 Servlet??로 모두 받는다. URL을 가지고

  

HashMap을 이용해서 키와 밸류를 통해 시분할로 객체, 클래스를 얻어온다. 그런데

  

만약에 사용자가 많아서 여러 개를 요청했다면 new를 여러 개 해야되는데 그러면

  

동시요청이 되므로 안 된다. 그리고 속도가 많이 걸린다. 그래서 요청마다 lock을

  

걸기도 하는데 이래도 안 된다. 이래서 개발을 해도 느려진다.

  

이러한 이유로 스프링을 쓰게 된다. 원래는 퀄리티가 매우 낮지만 스프링을 쓰면

  

Bean으로 관리하게 되고, singleton으로 static에 올라가니까(메모리에 올리고

  

시작하니까) 바로바로 가져올 수 있는 것이다. 결과물을 빨리

  

만들어 낼 수 있고.

  

- @Bean을 선언하면 다 싱글턴 패턴으로 객체에 올라옴.

  

@contoller 얘도 메모리에 다 들어가있음.



