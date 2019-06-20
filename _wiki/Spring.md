---
layout  : wiki
title   : Spring
summary : 
date    : 2019-06-20 15:38:30 +0900
updated : 2019-06-20 15:39:35 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Spring MVC

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








