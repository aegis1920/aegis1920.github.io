---
layout  : wiki
title   : JSP
summary : 
date    : 2019-06-20 15:28:28 +0900
updated : 2019-08-12 17:19:34 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# JSP

## JSP란?

## JSP Life Cycle이란?

## JSP 문법

## JSP 내장 객체

* 프로그래머가 선언하지 않아도 쓸 수 있는 객체

## Redirect

* 서버가 클라이언트의 요청에 대해 특정 URL로 이동하라고 하는 것
* 서버는 클라이언트에게 HTTP 상태코드 302로 응답하는데 이때 헤더 내 Location 값에 이동할 URL을 추가한다.
* 클라이언트가 리다이렉션 응답(HTTP 상태코드 302)을 받게 되면 헤더의 Location에 써져있는 URL로 재요청을 보낸다.
* 이때 브라우저의 주소창은 새 URl로 바뀌게 된다.
* Servlet이나 JSP는 리다이렉트하기 위해 HttpServletResponse 클래스의 sendRedirect()를 사용한다.
* 클라이언트가 요청을 두 번 보내게 된다는 걸 기억해야된다.
* 요청이 들어갈 때 request 객체와 response 객체가 생기는데 요청이 두 번 들어오므로 첫 번째 요청 때 생겼던 객체와 두 번째 요청 때 생기는 객체는 당연히 다르다.

## Forward

* 포워드가 실행된 다음에는 URL이 바뀌지 않는다.
* 즉, `/front`다음에 forward를 통해 `/next`로 가서 작업하고 클라이언트에게 응답했다면 포워드라서 URL이 그대로 `/front`이다.
* 서버가 다른 서버(같은 어플리케이션)에게 HttpServletRequest, HttpServletResponse를 넘겨주는 것이기 때문에 요청(request, response)이 바뀌지 않는다.
* 하나의 서블릿에 여러 개의 요청이 왔을 때 그 요청들을 포워딩으로 넘겨줄 수 있다.

## Servlet과 JSP의 연동

* Servlet은 프로그램 로직이 수행되기에 유리하다.
* JSP는 결과를 출력하기에 Servlet보다 유리하다. HTML문을 그냥 입력하면 되니까
* 즉, 프로그램의 로직은 Servlet에서, 결과 출력은 JSP에서 하는 게 좋다.
* Servlet에서 수행해서 포워딩을 통해 JSP로 보낸 후, EL과 JSTL로 마무리한다.
* JSP에서 자바코드를 최대한 줄여라

## Scope

### Page Scope

* 페이지 내에서 지역변수처럼 jsp나 서블릿이 실행하는 동안에만 정보를 유지하고자 할 때 사용된다.
* PageContext라는 추상 클래스를 사용한다
* JSP 페이지에서 pageContext라는 내장 객체로 사용가능하다
* forward가 될 경우 다른 페이지에 가는 것이기 때문에 해당 Page scope에 지정된 변수는 메모리에서 사라지고 새로 만들어진다.
* 즉, 하나의 페이지가 수행될 때까지 값을 저장하고 있는 것이 pageScope이다.
* 예를 들면, pageContext.setAttribute, pageContext.getAttribute로 사용한다.

### Request Scope


* HTTP 요청을 WAS가 받아서 웹 브라우저에게 응답할 때까지 변수가 유지되는 경우 사용
* HttpServletRequest 객체를 사용한다.
* JSP에서는 request 내장 변수를 사용한다.
* servlet에서는 HttpServletRequest 객체를 사용한다
* 다른 서블릿이나 다른 jsp에서 이용할 수 있도록, forward시 값을 유지하고자 사용한다.
* 예를 들면, request.setAttribute, request.getAttribute로 사용하며 forward하기 전에 request 객체의 setAttribute() 메소드로 값을 설정한 후, 서블릿이나 jsp에게 결과를 전달하여 값을 출력하는데 이처럼 forward 되는 동안 값이 유지된다.

### Session Scope

* 웹 브라우저 별로 변수가 관리되는 경우 사용
* 웹 브라우저간의 탭 간에 세션정보가 공유되기 때문에, 각각의 탭에서 같은 세션정보를 사용할 수 있다
* HttpSession 인터페이스를 구현한 객체를 사용한다
* JSP에서는 session 내장 변수를 사용한다.
* 서블릿에서는 HttpServletRequest 객체의 getSession() 메소드를 이용하여 session 객체를 얻는다
* 값을 저장할 때는 session 객체의 setAttribute(), 읽을 때는 getAttribute()를 사용한다
* 장바구니처럼 사용자별로 유지가 되어야 할 정보가 있을 때 사용한다

### Application Scope

* 웹 어플리케이션이 시작되고 종료될 때까지 변수가 유지되는 경우 사용
* ServletContext 인터페이스를 구현한 객체를 사용한다
* jsp에서는 application 내장 객체를 이용한다
* 서버에는 여러개의 웹 어플리케이션이 있고 웹 어플레케이션 하나 당 하나의 어플리케이션 객체를 사용한다
* 값을 저장할 때는 application 객체의 setAttribute(), 값을 읽을 때는 getAttribute()를 사용한다
* 모든 클라이언트가 공통으로 사용해야 할 값들이 있을 때 사용한다

## jsp의 표현식

### EL(Expression Language)

* 값을 표현하는데 사용되는 스크립트 언어로 JSP의 기본 문법을 보완한다
* 예를 들어, `request.getParameter("code")`가 원본이라고 했을 때 `${param.code}`라고 쓰면 된다
* 기본 객체 : pageContext, pageScope, requestScope, sessionScope, applicationScope, param, paramValutes, header, headerValues, cookie, initParam
* scope에 맞게 설정이 가능하고, 여러 연산이 가능하다

### JSTL

* JSTL을 사용하려면 해당하는 jar 파일을 받아서 import해야 한다.

```html
<c:if test="${n == 0}">
n은 과 0과 같습니다.
</c:if>

<c:choose>
    <c:when test="${score >=90 }">
    A학점입니다.
    </c:when>
    <c:when test="${score >=80 }">
    B학점입니다.
    </c:when>
    <c:when test="${score >=70 }">
    C학점입니다.
    </c:when>
    <c:when test="${score >=60 }">
    D학점입니다.
    </c:when>
    <c:otherwise>
    F학점입니다.
    </c:otherwise>            
</c:choose>

<c:forEach items="${list}" var="item">
${item } <br>
</c:forEach>
```


jsp는 서블릿이다. xxx.jsp -> xxx.java -> xxx.class


<% @ 지시어 속성명="값" %>

1. 지시어 태그 page : 페이지 설정, include : 부분페이지를 포함, taglib : 사용자 정의 태그 설정
   1. tablib은 네임스페이스의 역할.
2. 멤버변수 선언 태그
3. script tag <% 자바의 실행 문장 %> -> 제일 많이 쓴다.
4. Expression tag <% %> -> 결과값이 있는 연산식/ 변수
5. 주석해줄 때 <%-- --%>인지 <!-- -->차이

jsp는 init이나 service(), destroy()등 우리 마음대로 못 한다. 마음대로 하려면 if문 써서 따로 해야된다.

```java
 final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;
```

여기 안에 내장 객체가 서블릿 파일에 있다.

## page 이동기법(겁나 중요하다)

1. Redirection -> 주체가 브라우저. 요청 2번 발생, 응답 2번 발생. but 사용자는 한 번만 발생한 줄 알고 있다. 
   1. login.html -> login.do -> main.html
2. Forwarding ->  브라우저 요청 1번 발생, 응답 1번 발생
   1. login.html -> login.do(브라우저는 여기에 머물러 있다. 보이는 컨텐츠와 url이 일치하지 않다. url은 login.do지만 정작 보여지는 화면은 main.html이다)
      1. 사용자는 페이지처럼 동작하기 때문에 인자로 처리할 값을 전달한다. 
   2. request forwarding
      1. 뒤에 이동하는 페이지에 그대로 준다.
   3. response forwarding
   4. forwarding을 하면 응답을 안 보낸다. forwarding이 끝나야 응답이 간다. request가 forwarding갈 때 그 둘을 받는다. 그게 포워딩 개념.
   5. 저장하는 행위는 덧붙이는 개념
   6. parameter니 헤더니 이런 건 ..?
   7. 애트리뷰트랑 파라미터를 헷갈리지 말자. 

MVC 패턴을 지키려면 request에 그런 역할이 있다. 

request 객체가 setAttribute라는 메소드가 있는데 저장하는 메소드다. 

request가 언제 사라질까? -> 응답이 가면 더이상 필요가 없다.  forwarding은 응답을 보류시키는 것이다. 

내가 생성한 결과를 뒤 쪽과 공유할수 있도록 한 게 Attribute(키)...

Redirection은 get방식. 주소를 바꾸면서 이동하는 방식은 get 방식. 주소창에 땅 치면서 이동되어지는 것이기 때문에 get 방식. 

잘 모르겠으면 외우자. 내가 Request에 뭔가 저장하는 행위를 했다. 그러면 100% 포워딩을 쓰면 된다. 

1. 뒷 페이지로 유지하면서 보낼 것인지
2. or 새로 요청해서 받을 것인지



서버가 요청을 받으면 request객체가 새로 만들어진다. response는 항상 만들어지고 그래서 한 사용자의 지속적인 상태를 관리할 수 없다. 사용자를 위해 session이라는 객체를 만들었다.

주인까지 찾아주는 개념. 1번입니다, 2번입니다. 이러면. 



포워딩을 안 해도 상관없다. 우리가 하는 건 request 포워딩이기 때문에. request를 뒤로

세션을 동시에 접근하는 상황도 있을 수 있다. 

request는 클라이언트와 아무 상관 없다. 그냥 욕구되면 남듦. 

Servletgetcontextout 어플리케이션. 한 프로세서에 1개. 

굉장히 글로벌하다.

메모리에서 가져온다. 

과거 데이터를 들고온다. 

객체를 저장할 수 있는 공간 세션. 메모리도 커짐.

데이터의 성격과 유지하는 것에 따라서 session이나 다른 곳에서 쓴다. 

1. 요청을 받고 request인지 request() 
2. 포워딩할 필요 없다.

아직 데이터가 안 왔다면 얘기한다. 아직 안 왔다고. 

포워딩은 응답을 보내는 게 아니다. 포워딩을 도와주는 별도의 도우미가 있다.  도와주는 헬퍼가 있더라. 

글을 저장하는 Controller

list.controller

목록만 조회하는 형태. 서비스 목록

목록을 가져오기 위해서 쟤한데 줄 필요가 없다.

파라미터를 전달해야 로그인할 수 있으니까. 

doPost있어야지...

리다이렉션할 거라면 doget. doget도 있고 dopost도 있어야한다.

컨트롤러가 또 다른 컨트롤러로 이동시킬 수 있다.

XXX

GET방식과 POST방식이 똑같은 일을 할 때 저렇게 줄 수 있다.



원래 프론트에서 체크하고 백엔드에서 체크하고 하는 것. 



서버가 실행될 때 기본적으로 다 실행된다. 그래서 서버를 실행시킬 때 next를 눌러 몇 개는 빼주고 해야 한다. 



getParameter()와 getAttribute()의 차이 겟파라미터는 화면상에 이미 박아져 있는 name들을 위주로 가져올 때 쓰이고 getAttribute()는 서블릿에서 인위적으로 setAttribute()를 하고 다시 가져와줄 때 쓰인다.



프로젝트 -> 사실 전체적으로 ArrayList<>를 쓰는 게 훨씬 편하다. 나중에 불러올 때도 크기가 1개인 것으로도 불러올 수 있으니까. 

# Servlet이란?

## Java Servlet(Server side applet)

-   java를 사용하여 웹 페이지를 동적으로 생성하는 서버측 프로그램. 웹 서버의 성능을 향상하기 위해 사용되는 자바 클래스의 일종이다. JSP는 HTML 문서 안에 Java 코드가 있지만 Servlet은 자바 코드 안에 HTML을 포함하고 있다. 얘는 Tomcat 위에서 동작한다고 생각하면 된다.
    
-   일반적인 자바 클래스와 비교할 때 서블릿은 반드시 javax.servlet.Servlet 인터페이스를 구현해서 작성해야만 하고, 입력과 출력을 HTTP 프로토콜의 요청과 응답의 형태로만 다룬다.
    
-   서블릿 자체가 자바로 만들어졌기 때문에 플랫폼에 독립적이며, 스레드 기반의 요청 처리 방식을 선택 사용자가 많아도 부하가 없다. 그러나 서블릿 만으로는 코드가 길어져 너무 비효율적이었던 것이다. 그래서 이 대체안이 JSP이다.
    

# JSP란?

JSP는 JavaServerPages의 약자로 Java를 이용한 서버 사이드 스크립트 언어이다. 확장자는 .jsp이다. 같은 부류에 속하는 것으로 PHP, ASP가 있다.

## 왜 JSP를 쓸까?

-   쉽게 말해서 Servlet으로 코딩이 가능하긴 하지만 Java 코드 안에 HTML 코드가 들어가있기 때문에 코딩하기가 매우 복잡해서 JSP가 나오게 됐다.
-   가령, Servlet에서 태그를 전송하기 위해 reponse.getWrite()를 사용해 PrintWriter 객체를 얻어와서 write()메소드를 통해 보내야 한다. 쓰기가 힘드니 유지보수도 힘들어서 JSP가 만들어졌다.
-   그리고 JSP도 MVC 패턴을 적용할 수 있는데 JSP(View), 자바빈즈(Model), 서블릿(Controller)을 이용해 쉽게 구현할 수 있다.

## JSP를 어떻게 쓸까?

-   ASP와 마찬가지로  **<% … %>**  로 둘러싸인 스크립트 영역(이를 JSP태그인 scriptlet이라고 한다) 이 있으며, 실행 시에 이 스크립트 영역(.jsp)들이 javax.servlet.http.HttpServlet 클래스를 상속받은 자바 소스코드(.java)로 변환된 다음 컴파일(.class)되어 Servlet Container에 담기고 난 뒤에 Servlet 객체가 생성되고 난 뒤에야 실행된다. 스크립트 영역이 .jsp 파일을 Servlet 클래스로 변환하고 실행시켜 주는 역할을 하는 프로그램이  **Servlet Container(대표적으로 톰캣)**  이다. 이 Servelt Container도 자바 클래스이기 때문에 모든 자바 라이브러리를 끌어다 쓸 수 있다. 즉, JSP도 결국 Servlet이 된다.

## 자세한 JSP의 동작 원리는?

1.  사용자가 자신의 웹 브라우저에서 어떤 주소(http://???/index.jsp)의 링크를 누른다.
    
2.  HTTP 프로토콜의 형태인 HTTP요청(Request)이 WAS(Web Application Server)로 간다.
    
3.  WAS는 HTTP 요청(Request)을 보고 확장자가 .jsp로 되어있으니 Servlet Container에게 요청을 넘긴다.
    
4.  Servlet Container는 해당 .jsp를 자바 소스코드(.java 즉 Servlet)로 바꾸고 .class로 컴파일한다.
    
5.  .class가 실행되고 Servlet Container는 요청(Request)이 어떤 서블릿 클래스를 필요로 하는지 배포서술자(DD = web.xml)을 통해 알아낸다.
    
6.  만약 요청된 서블릿 클래스가 Servlet Container에서 실행된 적이 없다면 그 요청된 서블릿 클래스는 인스턴스를 생성하고(메모리에 로드하고) Servlet Container는 init() 메소드를 호출한다.
    
7.  요청된 서블릿 클래스가 Servlet Container에서 실행된 적이 있다면 새로 인스턴스를 생성하지 않고 스레드 하나만 생성된다.(그냥 바로 service() 메소드로 가는 것)
    
8.  그래서 Servlet Container마다 인스턴스가 하나만 있다.
    
9.  Init() 메소드로 인해 초기화가 되고 스레드 하나가 생성된다.
    
10.  스레드가 생성되면 각 Thread에서 service() 메소드가 호출된다. (service() 메소드를 호출하는 동작 역시 Servlet Container의 역할이다.)
    
11.  Servlet Container는 javax.servlet.ServletRequest 객체와 javax.servlet.ServletResponse 객체를 생성하고 이 두 객체를 service() 메소드에 인수로 전달한다. (ServletRequest를 상속(extend)받는 interface는 특정 프로토콜 데이터를 제공할 수 있다. 예를 들어서 HTTP 데이터 같은 경우, HttpServletRequest에서 제공된다, 그리고 HttpServletResponse는 HTTP 헤더나 쿠키에 엑세스 할 수 있다)
    
12.  Service() 메소드는 HTTP 프로토콜 방식에 따라 POST 방식이면 doPost()를, GET방식이면 doGet()을 호출한다. (doPost(), doGet()은 javax.servlet.HttpServlet 안에 있고 doPost, doGet의 인자로 HttpServletRequest 객체가 온다)
    
13.  나온 결과물을 Servletresponse 객체에 캡슐화한다.
    
14.  결과물이 담겨진 객체는 클라이언트로 HTTP 응답(Response) 형태로 전송된다.
    
15.  다 끝났거나 웹 어플리케이션 실행이 멈출 때, 서블릿이 사용한 자원을 초기화시킬 때 destory() 메소드를 호출시켜 객체들을 소멸한 후, 스레드를 종료한다.
    

### JSP에서 영역과 속성

-   JSP에서 제공하는 내장 객체들 중  **request, page, session, application**  객체들은 해당 객체에 정의된 유효 범위 안에서 필요한 데이터를 저장하고 읽어 들임으로써 서로 공유할 수 있는 특정한 영역을 가지고 있다. 즉 requset는 클라이언트의 요청이 처리되는 동안 유효하고, session은 세션이 유지되는 동안 즉, 하나의 브라우저에 1개의 세션이 생성되니 하나의 브라우저를 끄기 전까지 유효하다. 그리고 application은 웹 어플리케이션이 실행되고 있는 동안(서버가 종료될 때까지), page는 해당 페이지가 클라이언트에 서비스를 제공하는 동안에만 유효하다.

## Servlet과 JSP

-   Servlet에서는 내장 객체가 없고 완전한 자바라서 session을 사용할 때 HttpSession클래스에서 session 객체를 만들어서 사용해야 하지만 JSP에서는 session 객체를 바로 생성할 수 있도록 해준다.
    
-   .jsp 파일이 자동 변환된 Servlet 코드로 여러 객체들이 _jspService() 메소드 내부에 자동으로 구현되어 있다.
    
-   request.setCharacterEncoding(“utf-8”); 이 자체는 request 객체를 통해 넘어오는 파라미터 중 한글이 있기 때문에 한글 처리를 위한 코드다.
    
-   forward 태그를 이용해서 이동할 페이지에 추가적으로 파라미터를 넘겨줄 수 있다. 즉, 현재 페이지 요청과 응답에 관한 처리권을 이동할 페이지로 영구적으로 넘기는 기능을 한다.
    
-   include 액션 태그를 만나면 include되는 페이지로 제어권이 넘어가고 include된 페이지를 로딩한다. 로딩이 끝나면 로딩된 결과를 메인 페이지에 삽입하고 메인 페이지의 다음 라인부터 다시 로딩한다.
    
-   JSP의 주석처리도 <%-- --%>로 해야 나중에 소스상에서도 보이지 않는다. 오 하게되면 주석상에서도 보이게 된다.
    
-   톰캣(WAS)에서 배포를 하려면 웹 어플리케이션 프로젝트를 압축한 WAR파일로 만든 후에 webapps 폴더에 넣어주면 톰캣이 알아서 압축을 해제하고 배포해줍니다. 또는 server.xml을 변경해서 만들어줄 수 있습니다.
    
-   그리고 WAS에 따라 지원하는 JSP 및 Servlet 스펙의 버전이 달라집니다. 그 이유는 JSP는 Servlet으로 변환되어 실행되기 때문입니다. 그래서 톰캣 서버같은 경우 버전을 잘 살피고 실행해야됩니다.

```
<%! 문장 %> [[선언문]]
<% 문장%>
<%=문장%>
```

