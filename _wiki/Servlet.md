---
layout  : wiki
title   : Servlet
summary : 
date    : 2019-06-20 15:28:48 +0900
updated : 2019-07-04 14:26:30 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Servlet

## Servlet이란?
자바 웹 어플리케이션의 구성요소 중 동적인 처리를 하는 프로그램. WAS에 동작하는 Java 클래스. 서블릿은 HttpServlet 클래스를 상속받아야 한다. 

## 서블릿 작성 방법
* Servlet 3.0 이상
    * web.xml 파일을 사용하지 않음
    * java annotation을 사용한다.
* Servlet 3.0 미만
    * Servlet을 등록할 때 web.xml에 등록


## Servlet LifeCycle

서블릿 요청을 받으면 해당 서블릿이 메모리에 있는지 확인. 메모리에 없으면 해당 서블릿 클래스를 메모리에 올린다. 그리고 init() 메소드를 실행한다. 그리고 나서 service() 메소드를 실행한다. 만약 메모리에 있다면 service()를 실행한다.

service 메소드는 템플릿 메소드 패턴으로 구현한다.

WAS가 종료되거나, 웹 어플리케이션이 새롭게 갱신될 경우 destroy() 메소드가 실행된다.

## 요청과 응답

웹 브라우저가 WAS에게 요청을 보내면 HttpServletRequest와 HttpServletResponse 객체를 생성한다. 여기에 요청 정보를 담고 매핑된 서블릿에게 전달한다. HttpServletResponse 객체는 어떤 클라이언트가 보냈는지와 여러 가지를 담은 걸 서블릿에게 보낸다. 

HttpServletRequest

http프로토콜의 request정보를 서블릿에게 전달하기 위한 목적으로 사용합니다.
헤더정보, 파라미터, 쿠키, URI, URL 등의 정보를 읽어 들이는 메소드를 가지고 있습니다.
Body의 Stream을 읽어 들이는 메소드를 가지고 있습니다.


HttpServletResponse

WAS는 어떤 클라이언트가 요청을 보냈는지 알고 있고, 해당 클라이언트에게 응답을 보내기 위한 HttpServleResponse객체를 생성하여 서블릿에게 전달합니다.
서블릿은 해당 객체를 이용하여 content type, 응답코드, 응답 메시지등을 전송합니다.


## DD(Deployment Descripter), web.xml

배포서술자라고도 불리는 



소프트웨어를 배포할 필요가 없다. 사용자가 배포하는 게 아니라. 웹서버에 반영만 하면 사용자들은 그냥 브라우저만 열면 되니까.

하지만 웹서버도 많이 접속하면 트래픽이 많아질 수 있다. 

웹 서버 또한 병렬적으로 운영하게 된다. 

요즘 서버들은 로드밸런싱기능이랑 ?? 를 갖고있다. 서버가 장애가 생기면 데이터를 백업해서 다른 서버로 이어지도록. 그래서 지속적인 서버를 이용할 수 있도록 할 수도 있다. 



HTML, CSS, JAVASCRIPT, AJAX -> Servlet(Controller -> Spring mvc) -> Service(Model, 객체 의존성 또한 spring으로 관리) -> DAO(Model, JDBC, SQL -> My batis) -> DB

이렇게 스프링으로 가는 이유가 유지보수를 위해서.

servlet, service, dao 사이에 들어가는 vo도 객체기 때문에 model로 본다. DAO로 요청을 보내고 컨트롤러에게 다시 받음

만약 서블릿(컨트롤러)이 없다면 view에 따라 종속적으로 모두 만들어줘야하기 때문에. 즉 교통정리를 해주는 역할.

 Servlet에서 성공과 실패를 했을 때 각각 view를 보여준다. view는 진짜 UI를 갖는 화면일 수 있고 비동기 통신이라면 처리된 결과일 수도 있다. 보통은 HTML이나 PDF 포맷을 내려받기 하는 것도 될 수 있고 스프레트시트같은 형태일 수도 있다. 동기가 HTML, 비동기가 XML, JSON등등...

서블릿을 컨트롤러로 가져가는 MVC Servlet model 2를 기반으로 갔다. 

JSP는 java 소스를 만들기 위한 템플릿 페이지. java로 바꿔주는 컨테이너가 필요하다. 

jsp는 jsp 컨테이너가 필요하고 servlet은 servlet 컨테이너가 필요하다.

jsp 컨테이너는 jsp를 java소스로 바꿔주고, class로도 바꿔준다.

종합선물세트 WAS. 

javaEE에서 많은 것들이 들어있다. jsp, servlet다 javaEE 엔터프라이즈 플랫폼에 있다.

new할지 말지, 



Servlet - init(), service(), destroy() -> life cycle 메소드

* init() -> 태어나면 딱 한번 초기화해줌. 
* service() -> 엄청 많이 불림. 요청 응답, 100번 불리면 100번 반응
* destroy() -> 소멸할 때 한 번 불림

정말 직접 import Servlet해서 해도 된다.

implements Servlet하면 GenericServlet클래스를 포함시켜야 한다. 즉, 추상클래스.

service()는 우리가 짜야하기 때문에 구현하지 않았음. 그래서 그냥 service();이렇게 되어있다.

HttpServlet이 또 있음. 더 구체화가 된다. 딱 http 프로토콜에 확장된 서블릿. HttpServlet도 추상 클래스다. 얘는 추상 메소드가 없다. 그냥 강제로 된 것. 그냥 doGet(){}, doPost(){}, ... 이미 열고 닫고를 다 만들어놨다. 내가 원하는 것만 재정의 시키면 된다. serivice()도 구현이 되어있다. if(Get방식) doGet(); elseif(Post) doPost(); 이런식으로 분기하도록 구현이 되어있다. 

>  Http - get, post, head, delete, put. 
>
> REST api -> delete - > url/board/1 이러면 첫 번째 를 지워달라. 라고 말하는 것. 

이제 HttpServlet을 상속하는 나의 XXXServlet을 만들면 된다. 여기서 doGet이나 doPost를 재정의 하면 된다. 여기서 다형성이 나온다. 새로운 클래스를 추가하면 거기에 맞는 게 나온다. 이게 다형성!!!

Servlet 객체 메모리에 로드? HelloServlet을 hello.do라고 mapping. 싱글톤처럼 관리하기 때문에 확인한다. 이미 객체가 있나없나. 없으면 이제 생성한다. 클래스를 메모리에 로드를 한다. 클래스로더라는 얘가 그 일을 담당한다. 그리고나서 new로 객체를 생성. 이 때 생성자 콜백이 된다. 기본생성자가 콜백된다. 매개변수가 뭔지 모르니까. 그래서 아무것도 없는 기본생성자를 콜백한다. 아무런 정보가 없어도 new가 될 수 있어야 하니까. 그리고 init()을 콜백한다.

> 우리가 만든 HelloServlet은 컨테이너 안의 다른 패키지에도 접근할 수 있어야 하니까 public으로 접근지정자를 해줘야 한다. 

응답 가능(대기) 상태가 된다. 여기서 이제 서비스가 계속 반응한다. service()가 콜백. get이면 get을 불림.post면 doPost()가 불린다. 

만약 처음에 hello.do로 불릴 때 Servlet 객체가 이미 있다면 바로 가진다.

init()을 Servlet의 생성자 역할이라고 보면 된다.

html이나 css나 그런 것들은 Servlet 객체가 불려질 때 안 불린다. 필요가 없으니까.

끝날 때 destroy()가 한 번 불리니까. 내가 끝날 때 뭐 하고싶으면 하면 된다.

service()를 재정의하는 건 권장하지 않는다. 이미 다 만들어져있으니까. 차라리 doGet(), do Post()를 재정의하면 된다. 서비스 안에서 코드를 짜놓으면 안됨. 



내가 Servlet을 안 짜니까 동시성을 생각하지 않는다. 컨테이너에 요청이 들어오면 컨테이너는 그 받는 스레드를 계속 만든다. 그래서 멀티스레딩환경이 된다.



// 녹음파일 있음 - 20190320 - 중간에 까먹고 못 끊음.

HelloServlet이라는 객체(h)가 있다. 여기에 name 클래스의 멤버변수가 있고 doGet()가 있다. 그리고 t1, t2, t3 스레드가 있을 때 스레드에서 h.service()가 불린다. 그리고 service()에서 h.doGet()이 불린다. 그런데 t1이 부르고 난뒤 t2가 가서 멤버변수를 바꿔버린다면 t1은 다른 전역변수를 갖게 된다. 아주 위험한 코드가 되기 때문에 멤버변수를 쓰면 안 되고 지역변수로 줘야 한다. 쓰고 의미없는 데이터라면 지역변수로. 요청되고 난 뒤 사라지니까.

요청되는 컨텐츠에 따라 다운하게 할 지, 그냥 보여줄 지 알아야 한다. 그래서 많은 스트림이 필요한데 이들을 표현하는 객체로서 사용하게된다. HttpServletRequest, HttpServletResponse처럼. 얘네들을 불러내게 한다. 그러면 웹 서버는 각자 톰캣이면 톰캣 HttpServletRequest를 갖고있는데 이들을 꺼내서 쓰게 된다. 즉, 내용만 전달해준다.

HttpServletRequest()는 getter가 있고, HttpServletResponse()는 setter가 있다. 똑같은 클라이언트더라도 모든 요청은 모두 다 다른 요청이다. 똑같은 페이지를 똑같이 부른다고 해서 요청도 똑같다고 하면 안 된다. 그냥 매일 새로운 요청. 재사용하지 않음

서비스메소드는 그냥 처음올 때 보는 get, post같은 메소드를 보고 알 수 있다. 



이클립스에서 서블릿 위저드가 있는 이유는 서블릿에 관한 상속을 받기 위해서. 

![1553058040256](C:\Users\niboh\AppData\Roaming\Typora\typora-user-images\1553058040256.png)



![1553058046317](C:\Users\niboh\AppData\Roaming\Typora\typora-user-images\1553058046317.png)

여기서 주소만 부를거니까 get만 호출한다.

![1553058074044](C:\Users\niboh\AppData\Roaming\Typora\typora-user-images\1553058074044.png)





똑같은 url을 부르지만 해오는 건 모두 달라진다.

web.xml 배치 설명자 파일. DD라고 불린다. 

```xml
<servlet>
    // 이 아래 둘은 필요없다. description이랑 displayname
    <description></description>
    <display-name>HelloServlet</display-name>
    
    
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.ssafy.hello.HelloServlet</servlet-class>
  </servlet>
<servlet>    
    <servlet-name>HiServlet</servlet-name>
    <servlet-class>com.ssafy.hello.HelloServlet</servlet-class>
  </servlet>
// 얘는 서버가 시작될 때 init()을 해주는 것. 즉, 바로 시작부터 많은 일(init()에 많은 코드)을 하게 되는 웹이라면 처음 사용자는 시간이 아주 오래 가게 된다. 그래서 그걸 방지하려고 그냥 서버가 시작될 때 바로 init()을 해준다. 그러면 doGet()만 해주면 되니까.
<load-on-startup>1</load-on-startup>
  <servlet-mapping>
      // servlet-name은 위의 servlet-name과 같아야 한다. 
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/hello.ssafy</url-pattern>
  </servlet-mapping>
<servlet-mapping>
      // servlet-name은 위의 servlet-name과 같아야 한다. 
    <servlet-name>HiServlet</servlet-name>
    <url-pattern>/hi.ssafy</url-pattern>
  </servlet-mapping>

// 여러 개를 만들 때 설정별로 인스턴스가 만들어진다. 같은 클래스로부터 각기다른 객체로 따로 만들어줄 수 있다. 그래서 서블릿 맵핑마다 똑같이 서블릿에도 이름을 주는 거고. 

// 2.5버전은 이렇게 되어있는데
// 3.1버전은 java 소스파일에 annotation으로 되어있다.
// 그리고 만약에 서블릿을 날리면 web.xml에 있는 설정은 반영이 안 되어있기 때문에 여기서도 다시 지워줘야 한다.
```

해보고 새로고침을 해주면 doGet()만 뜬다.

3버전부터는 소스에 web.xml이 어노테이션으로 들어가기 때문에 자동으로 안 만들어준다. 그래서 next할 때 체크를 해줘야 한다. 그리고 3버전이나 2버전 얘네들은 처음에 아니면 못 바꾸기때문에 처음에 잘 만들어줘야 한다.

3버전은 클래스 위에 어노테이션을 주기 때문에 그 클래스의 선언부에 주기 때문에 설정이 줄어드는 것처럼 느끼는 것. 

실행할 때 Next에서 add and remove에서 내가 실행하려고 하는 서블릿만(3.1) 컨피규어에 놓고 실행한다.

### DD 2.5와 DD 3.1 의 차이

DD 2.5는 web.xml이 자동으로 들어가있어서 그 안에서 어느 링크가 어느 서블릿 클래스로 갈지 설정해주면 된다.

DD 3.1은 web.xml이 없다. 서블릿 클래스에 대한 링크를 줄 때 기본적으로 어노테이션으로 작성되기 때문에 편한 감이 없지 않아 있지만 각각 장단점이 있다. 왜냐면 많은 서블릿 클래스들이 생성될 때 그 각자 파일마다 누구는 누구의 서블릿 클래스에 간다고 `@WebServlet("")`으로 다 써줘야 한다. 그래서 나중에 수정을 할 때도 web.xml처럼 한 파일에서 관리하지 못 하고 하나하나 가서 모두 수정해줘야 한다. DD 2.5는 안 그래줘도 되니까. 

## http

녹음함

헤더부에 User-Agent라는 헤더가 브라우저의 인포메이션을 잡고 있는 것

URL ? 여기에 파라미터들을 '쿼리 스트링'이라고 부른다.

GET 방식은 body부가 없다. 있지만 안 담긴다. POST 방식은 메세지 바디부에 실어 보낸다. 

multipart/formdata 이라고 쓰면 파일만 준다. 

구분성 있는 Dummydata가 들어온다. 데이터가 가긴 가지만 사이사이에 경계를 구분할 수 있는 걸 가져온다. 서버에서 일반적으로 끌어올 수 있는 게 아니라 라이브러리를 쓴다. 업로드 하는 건 파일을 주는 것 뿐이다. 데이터의 성격이 다를 뿐. 내가 거기에 집중하는 게 아니다. 

인풋타입 file. 

post방식이면서 파일이 있을 때만. 

서버가 HttpServletRequest얘를 생성한다. 얘는 headers, cookies, parameters(form data), 는 vo라고 생각하면 된다. headers

* 파라미터에서 끄집어내서 쓸 수 있는 메소드가 getParameter("name"); input마다 name을 줘서 name으로 찾는다. 얘의 return 타입은 String. 숫자도 다 문자로 온다. 
* getParameterValues("name"); 파라미터의 이름들만 추출해서 준다. iterator같은 얘. String[]으로 반환된다.
* setCharaterEncoding("utf-8"); 근데 이건 body부에만 적용할 수 있다. 그래서 POST 방식으로만 보낼 수 있다.
* GET 방식은 UTF-8로 가기 때문에 서버측에 있는 걸 잘 보고 처리해줘야 한다. 

Response 메세지가 온다. 서버가 클라이언트에게 정보를 준다. 

* 상태 라인(프로토콜 상태코드 상태메세지)
* 헤더부 - content-type, cookie도 헤더에 들어가고
* 바디부(응답 컨텐츠)



