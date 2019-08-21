---
layout  : wiki
title   : Dispatcher Servlet에 대해서
summary : 
date    : 2019-08-21 08:58:30 +0900
updated : 2019-08-21 18:43:17 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## DispatcherServlet

* Front Controller
* 클라이언트의 모든 요청을 받은 후 이를 처리할 핸들러에게 넘기고 핸들러가 처리한 결과를 받아 사용자에게 응답 결과를 보여준다.
* Dispatcher Servlet은 여러 컴포넌트를 이용해 작업을 처리한다.

### Dispatcher Servlet의 과정

1. 요청이 들어온다.
2. 요청 선처리 작업
    1. Locale 결정(`org.springframework.web.servlet.LocaleResolver`)
        1. Spring MVC는 지역화(똑같은 사이트를 들어가도 영어로 화면처리를 하거나 한국어로 화면 처리를 하는 것)를 지원한다
        2. 브라우저가 보내는 헤더 정보에서 언어 설정 값을 이용해서 지역화 즉, Locale을 결정할 수 있다.
    2. RequestContextHolder에 요청을 저장(`org.springframework.web.context.request.RequestContextHolder`)
        1. 스레드 로컬 객체로 요청을 받아서 응답할 때까지 HttpServletRequest, HttpServletResponse 등을 Spring이 관리하는 객체 안에서 사용할 수 있게 해준다.
        2. 컨트롤러 안에서 Request 객체가 필요할 때 그냥 `HttpServletRequest request`만 선언하면 되듯이.
    3. FlashMap 복원(`org.springframework.web.servlet.FlashMapManager`)
        1. redirect로 값을 전달할 때 ? 파라미터를 이용하는데 값을 딱 한 번 유지시킬 수 있게 해주는 것을 이야기 한다.
        2. 리다이렉트 후 조회를 하면 정보는 바로 삭제된다.
    4. Multipart 요청(`org.springframework.web.multipart.MultipartResolver`)
        1. 사용자가 파일 업로드를 했을 때 특수한 형태의 Request 객체가 필요하다. 멀티 파트 요청이 들어오면 Request가 MultipartResolver가 멀티파트를 결정할 수 있도록 해준다.
3. 요청 전달
    1. HandlerMapping으로 HandlerExecutionChain 결정
        1. HandlerMapping(`org.springframework.web.servlet.HandlerMapping`)은 어떤 핸들러가 요청을 처리할지에 대한 정보를 알고 있다.
        2. HandlerExecutionChain(`org.springframework.web.servlet.HandlerExecutionChain`)은 실제로 호출된 핸들러에 대한 참조를 가지고 있다. 무엇이 실행되어야 할지 알고 있는 객체
        3. HandlerExecutionChain을 발견하지 못 했으면 페이지가 없는 것으로 404 전달
    2. HandlerExecutionChain 실행
        1. HandlerExecutionChain를 발견했다면 HandlerAdapter를 결정
        2. 만약 HandlerAdapter가 없다면 ServletException
    3. HandlerAdapter(`org.springframework.web.servlet.HandlerAdapter`)는 실제 핸들러를 실행하는 역할을 담당한다. `@RequestMapping`과 `@Controller` 어노테이션을 통해 정의되는 컨트롤러의 경우 DefaultAnnotationHandlerMapping에 의해 핸들러가 결정되고 AnnotationMethodHadnlerAdapter에 의해 호출이 일어난다.
    4. 사용가능한 인터셉터(필터역할)이 존재한다면 인터셉터의 preHandle을 호출해 요청을 처리한다.
    5. 그리고나서 핸들러를 실행한다.
        1. 핸들러가 ModelAndView를 리턴하는지(`org.springframework.web.servlet.ModelAndView`), ModelAndView가 뷰를 갖는지에 따라(`org.springframework.web.servlet.RequestToViewNameTranslator`, 컨트롤러에서 뷰를 제공하지 않았을 경우 URL과 같은 요청정보를 참고해서 자동으로 뷰 이름을 생성해준다.) 동작하는 게 달라진다. 결국에는 인터셉터의 preHandle을 호출해서 요청을 처리한다.
4. 예외 처리
    1. 예외가 발생하면 HandlerExceptionResolver(`org.springframework.web.servlet.handlerexceptionresolver`)에 문의한다.
    2. HandlerExceptionResolver는 예외가 던져졌을 때 어떤 핸들러를 실행할 것인지 알려준다.
5. 뷰 렌더링
    3. ViewResolver를 이용해서 컨트롤러가 리턴한 뷰 이름을 참고해서 적절한 뷰 오브젝트를 찾아주는 로직을 가진 오브젝트다.
6. 요청 처리 종료

### Dispatcher Servlet을 FrontController로 설정하기

* 3가지 방법이 있다.

* DispatcherServlet이 FrontController의 역할을 한다는 설정을 해주기 위한 3가지 방법이 있다
    * web.xml에 설정(여기서도 두 가지 방법으로 나눠진다)
        * WebMVCContextConfig.xml xml파일 자체를 web.xml에 추가하는 방법

```xml
<web-app>
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:WebMVCContextConfig.xml</param-value>
    </init-param>
  </servlet>
</web-app>
```

        * java config 클래스를 읽어들이도록 web.xml에 추가하는 방법
            * `<servlet-mapping>`를 보면 url-pattern에 `/`가 있다. 이 뜻는 모든 요청을 받는 다는 뜻이다.
            * 모든 요청을 받아서 servlet-name으로 설정되어 있는 servlet으로 맵핑된다. 이 서블릿을 frontController로 한다고 말해주는 것
            * param-value에 보면 java config파일을 가져오는 걸 확인할 수 있다.
            * 클래스 명을 줄 때 패키지 명을 포함한 클래스 명을 줘야 한다. 
            * contextclass는 bean 공장을 뜻한다.
```xml
<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <servlet>
    <servlet-name>m	vc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextClass</param-name>
      <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </init-param>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>kr.or.connect.mvcexam.config.WebMvcContextConfiguration</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>mvc</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>

```

    * javax.servlet.ServletContainerInitializer 사용(servlet 3.0 이상에서 사용)(여기서 설명 X)
    * org.springframework.web.WebApplicationInitializer 인터페이스를 구현해서 사용(여기서 설명 X)
        * 좀 느릴 수 있다. 

