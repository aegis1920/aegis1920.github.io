---
layout  : wiki
title   : 쿠키와 세션
summary : 
date    : 2019-06-20 15:27:04 +0900
updated : 2019-06-20 15:27:26 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Cookie & Session

* http 타입들을 말하는 것 - 생성, 유지관리를 서버가 알아서 한다.
  * request : 응답 전까지 유지(forward)
  * session : 일정시간동안 사용자(브라우저)별로 유지(redirection)
    * Getsession으로 꺼내야 한다.
  * application : Application별로 유지(서버 유지시간 동안 유지)(application)



HTTP : stateless

프로토콜이 유지하지 않는 상태를 유지하게 해줘야 한다. 그 방식을 Session Tracking 매커니즘이라고 한다. 일정시간동안 동일한 사용자로부터 들어오는 여러 다수 요청들을 연속적인 하나의 상태로 보는 것.

* Cookie
  * 상태 정보를 client에 저장
  * 쿠키 하나가 상태 정보 하나다
  * 예를 들어, 로그인을 했는지 안 했는지 확인하는 쿠키 하나를 만들 수 있다
  * 쿠키는 String만 저장할 수 있다
  * 서버가 쿠키를 만들어서 response에 쿠키를 넣어서 보낸다.
    * 쿠키는 header부에 들어간다.
  * 시간을 줄 수도 있다. 그 시간동안 유지할 수 있도록 브라우저가 쿠키 내용을 저장한다.
  * Domain 정보에 따라서 따로 관리.
    * 반드시 name과 value를 줘야한다.
  * 브라우저의 보안 등급을 높이면 쿠키를 차단할 수 있다.
  * 서버에서 만료시간을 0로 셋팅해서 보내면 그 쿠키가 삭제된다. response에 있다
  * 보안상 노출되어도 상관없는 것들
  * 비밀번호 말고 ID만 저장한다든가...
  * 이름이 같은 쿠키가 서버에서 또 오면 덮어버린다. 그래서 0을 보내면 아예 삭제되버림.
* Session
  * 객체 형태로 관리할 수 있다.
  * 유니크한 번호가 옴
  * key value로 관리
  * User 객체도 저장할 수 있다
  * 상태 정보를 Server에 저장
  * "id" |user("java", "자바") 형식처럼
  * 어떤 세션이 어떤 클라이언트 세션인지 알 수 없다. 
  * 세션을 줬지만 세션의 주인을 못 찾는다.
  * 세션 ID값만 쿠키로 보내준다.
  * 이걸 토대로 세션을 찾는다.
  * 번호 안들고왔다면, 없으면 새로 만들어버림. 세션이 많아질 수 있어서 만료시간이 있다.
  * 기본 만료시간은 30분
  * 세션이라는 보관함 자체에 시간이 있음. 그 안에 들어가는 항목을 제어할 수는 없다.
  * setAttribute, getAttribute.
  * removeAttribute. 자료구조(map, list)를 써서 장바구니에 담고 그 다음에 setAttribute. 
  * getSession 어딨을까? -> request에 있다. url을 보면 세션 아이디를 알 수 있다. 세션 ID를 찾아야만 가져올 수 있으니까. 요청 객체를 보면 된다.

로컬스토리지는 서버쪽으로 안 보냄.

세션과 쿠키의 공통점

* 사용자가 쿠키를 차단하면 세션도 쓰지 못한다.
* 쿠키는 사용자의 리소스를 사용하기 때문에 쿠키 크기라든지 제약이 있다. 그러나 세션은 서버의 리소스가 허락하는 만큼 해줄 수 있다. 
* 메모리가 부족해서 저장해놓고 나중에 꺼내올 때 직렬화, 역직렬화를 해서 꺼내온다. 이는 Serilizable 인터페이스를 구현해서 객체 직렬화를 해줄 수 있다.



DD안에서 welcome 페이지를 설정해줄 수 있다. 거기있는 리스트에 없으면 404를 띄운다.



jsp를 부르면 무조건 세션을 만든다. 뷰페이지 한 번만 거치면 세션이 만들어진다. 

세션 내장 객체 안에 내가 찾고 싶은 항목이 없으면 일어난 거고 없으면 안 일어난 거고. list에 내용이 있냐 없냐가 아니라 list 안에 아무것도 있냐 없냐. 

서버 안에 web.xml이 있다. 이건 세션에 적용되는 것

```xml
<session-config>
        <session-timeout>30</session-timeout>
</session-config>
```

다 30분을 주는 것.

세션에 null 유무로 확인하지마라.

무분별하게 세션에 다 때려박지 말자. 

## Controller의 작업

1. getParameter - 
2. verify parameter(이상한 사람들 걸러내기)
3. call model
4. move to view(Controller) by result (forwarding or redirection)

모든 요청은 MainController로 오고 퍼진다. (여기서 요청 전처리를 해야한다.) 뒤에 복붙하는 코드, 공통적으로 처리해야될 코드들을 여기서 처리하면 된다. 캐싱을 금지하는 헤더를 보낼 수도 있기도 하고. 예외 처리 또한 Main에서 예외처리를 모두 해주고 loginController에서 throw해주는 방식으로 하면 된다. 파라미터를 추출해서 Map같은 곳에 담아줄 수도 있다. 

이를 Front Controller 패턴이라고 한다.

loginController, RegisterController 등등 비슷한 코드들이 들어가야 함.

이렇게 다 받아주는 컨트롤러가 DispatcherController다. 백엔드를 어떻게 가져가야할지에 대한 설계.

모든 얘들이 Main.do로 온다면 식별할 수 있는 구분자가 와야된다. url맵핑을  `main.do?action=login`처럼 가져간다. 모든 do를 가져와서 하나로 들어가도록 한다. 지금 들어온 URI를 가지고 맵핑. 



### 내가 이해한 Cookie

Cookie는 서버에서 만들어지고 브라우저가 갖고 있는다. 그래서 만들어질 때 서버 즉, MainServlet.java에서 `Cookie c = new Cookie("key", value);`로 만들고 `response.addCookie(c);`로 추가할 수 있다. 이러면 response 객체에 c라는 쿠키가 추가된 것이다. 그러나 서버는 함부로 보내지 않는다. Redirect를 해줄 때 보내거나 포워딩을 했다면 그 포워딩한 페이지의 반응이 끝날 때 보내게 된다. 예를 들어, `request.getRequestDispatcher("Result.jsp").forward(request, response);`를 통해서 "Result.jsp"라는 페이지로 포워딩할 수 있는데 여기서 jsp라는 페이지는 view페이지기 때문에 포워딩을 할 이유가 없어서 페이지 출력이 끝나면 브라우저로 쿠키를 보낸다. 

> 브라우저로 쿠키가 간다. 근데 저장을 Request.jsp의 출력이 모두 끝나고나서 한다. 그래서 바로 Request.jsp에서 request.getCookies()로 내가 저장했던 쿠키를 꺼내려고하면 없어서 꺼내질 못 한다. 이 이후에 리다이렉트를 해주거나 포워딩을 하면 그제서야 쿠키를 꺼낼 수 있다.

그러나 view 페이지가 아니라 그냥 Servlet.java같은 컨트롤러로 보내게 된다면 다시 포워딩을 할 수 있기 때문에 브라우저로 쿠키가 안 갈 수 있다. 

ps. 브라우저에서 쿠키가 제대로 안 나타날 수 있으니 f12에서 몇 번 눌러보자... 제대로 안 나타난 게 아니고 렌더링 출력을 모두 끝나고 나서 하는 것.

#### response에 쿠키를 추가하는데 왜 request에서 쿠키를 가져올까?

클라이언트와 서버를 제대로 이해하지 못하고 있으면 이런 질문이 나온다.

클라이언트. 즉, 브라우저는 아무것도 가지고 있지 않다. 서버에서 받으면 렌더링만 해주는 역할이다. html, jsp, java등 모든 파일은 서버가 가지고 있다.

1. 어떤 페이지에서 링크나 폼태그를 누르면 정보들을 가지고 request에 담아 서버로 전송이 된다.
2. 서버는 request에 담겨진 정보들을 처리한다.
3. 쿠키를 담고 싶다면 `response.addCookie(c)`로 response에 담아 브라우저로 전송한다. 
4. 브라우저는 그 받은 쿠키를 가지고 있다.
5. 그리고 이제 다시 request를 보낼 때 그 받은 쿠키를 다시 가지고 request를 보낸다. 
6. 서버로 전송이 되고 컨트롤러에서 request.getCookies를 통해 쿠키를 꺼내오면 된다.

