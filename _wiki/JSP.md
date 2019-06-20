---
layout  : wiki
title   : JSP
summary : 
date    : 2019-06-20 15:28:28 +0900
updated : 2019-06-20 15:28:46 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# JSP

jsp는 서블릿이다. xxx.jsp -> xxx.java -> xxx.class

녹음함. 

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
