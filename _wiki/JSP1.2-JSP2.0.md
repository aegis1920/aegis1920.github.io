---
layout  : wiki
title   : JSP 1.2와 JSP 2.0의 차이
summary : 
date    : 2019-06-21 11:20:00 +0900
updated : 2019-06-21 11:20:34 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

# JSP 1.2와 JSP 2.0의 차이

1.  EL을 모든 표준/사용자 정의 컴포넌트에서 사용할 수 있다.
    
2.  오류를 찾기 더 쉬워졌다.
    
3.  web.xml에 DTD가 아닌 XML 스키마를 사용한다.
    
-   Tomcat의 버전 별로 지원 스펙이 다르기 때문에 처음부터 WAS의 버전 확인을 잘 해야된다.
    

1.  Tomcat 3.x : JSP 1.1, Servlet 2.2
    

1.  web.xml에서 DTD 선언을 해줘야 함
    
2.  ServletRequest.setCharacterEncoding(String) 메소드가 존재하지 않음
    
3.  Filter와 Listener가 존재하지 않음
    
4.  Servlet을 web.xml에서 매핑하지 않음.
    

3.  Tomcat 4.x : JSP 1.2, Servlet 2.3
    

1.  web.xml에서 DTD 선언을 해줘야 함
    
2.  ServletRequest.setCharacterEncoding(String) 메소드가 존재함
    
3.  Filter와 Listener가 존재함.
    
4.  Servlet을 web.xml에서 매핑함.
    

5.  Tomcat 5.x : JSP 2.0, Servlet 2.4
    

1.  web.xml에서 DTD가 아닌 Schema를 선언해줘야 함.
    

-   filter, listener, Servlet 배포 방법, web.xml의 이해
    
-   filter
    

1.  객체의 형태로 존재하며 클라이언트와 Servlet 컨테이너 안에 있는 최종 자원 사이에 위치하여 요청과 응답을 알맞게 변경할 수 있다.
    
2.  필터 체인으로 인해 변경에 변경을 가할 수 있다.
    
3.  필터를 사용하면 XML 문서를 변경한다든지, 사용자 인증을 한다든지 할 수 있다. JSP/Servlet같은 코드블럭은 회원 인증이 변할 경우, 모든 페이지를 변경해줘야 한다. 그러나 필터를 통과하게되면 로그인할 때 검사할 수 있다.
    
4.  javax.servlet.Filter 인터페이스, javax.servlet.ServletRequestWrapper 클래스, javax.servlet.ServletResponseWrapper 클래스가 핵심 역할을 한다.
    
5.  Filter 인터페이스 안의 init(), doFilter(), destroy() 메소드를 사용합니다. 서블릿 컨테이너는 사용자가 특정한 자원을 요청했을 때 그 사이 필터가 존재할 경우, 그 필터 객체의 doFilter() 메소드를 호출합니다. 그리고 응답했을 때도 필터링합니다.
    
6.  필터의 설정은 web.xml 파일을 통해 <filter> 태그와 <filter-mapping> 태그를 사용해 설정할 수 있습니다.
    

-   listener
    

1.  다른 클래스의 어떤 메소드를 수행하기 위해서 직접 참조를 하게 되면 확장성도 떨어지고, 해당 메소드의 파라미터가 변경될 경우, 참조하는 모든 클래스의 호출자를 바꿔주어야 한다. 그래서 클래스 간 직접 참조 없이 이벤트 통신을 한다는 것은 꽤나 큰 의미가 있다.
    
2.  이벤트를 받을 클래스에서 Listener 인터페이스를 구현한 뒤, 이벤트를 받겠다고 handler로 등록하면 다른 클래스에서 handler를 통해 listener들을 호출하는 방식입니다.
    

-   Servlet 배포 방법
    
-   WEB-INF
    

1.  외부에서 클라이언트가 접근할 수 없도록 WAS에서 보호하는 디렉토리
    

-   web.xml
    

1.  배포서술자
    
2.  서블릿 클래스를 등록하는 곳
    
3.  WAS가 인식하는 각각의 웹 어플리케이션의 설정 파일
    

-   출처
    

-   [http://egloos.zum.com/kwon37xi/v/2793511](http://egloos.zum.com/kwon37xi/v/2793511)
    
-   [http://javacan.tistory.com/entry/58](http://javacan.tistory.com/entry/58)
    
-   [https://blog.silentsoft.org/archives/10](https://blog.silentsoft.org/archives/10)
    

  
  

나중에 게시판 만들 때 쓰임.
