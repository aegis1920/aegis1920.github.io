---
layout  : wiki
title   : EL과 JSTL
summary : 
date    : 2019-06-20 15:27:35 +0900
updated : 2019-06-21 13:33:13 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# EL과 JSTL

쿠키를 response에 addcookie. 이 상태로 포워딩. request에서 뽑아서 씀. 

아무것도 없으니까 못 뿌리는 것. 

아무것도 안 뿌려줌. 도서 목록만 나오고... 

list.jsp에 와서 request에 있는 마지막 도서를 가져와야 함. request에서 쿠키를 꺼내려면 브라우저에 응답을 받고 가야함. 

응답을 보내야 쿠키

포워딩은 응답 지연임. 더이상의 포워딩을 안 해야 응답이 간다. 그 뜻은 목록이 보여진다음에 쿠키가 간다는 소리. 

return new PageInfo(false, "main.do") // 어디로 갈지는 request에 남아있나?

쿠키가 언제 브라우저에 전송되는지 이해해봐야 한다.



## EL(Expression Language)

* EL은 사용할 수 있는 위치가 정해져 있다.
  * UI 출력 위치(HTML 태그가 오는 자리들에 쓰면 된다)
    * `<h1>${1 + 2}</h1>` 를 쓰면 EL 표현식의 처리 결과를 출력한다.
  * JSTL 태그 속성값 위치 -> 결과를 JSTL 태그에 전달.
    * 만약 JSTL을 쓰지 않는다고 할 때 a.jsp, b.jsp에 똑같은 코드가 있다고 할 때 그 코드를 새로운 클래스(util)에 static 메소드로 만들어서 <% util.xxx() %>처럼 끼워 넣는 방식이 있다. 이걸 쉽게 쓸 수 있게 해주는 게 JSTL 
      * `< c : if test ="조건을 판별할 수 있는 논리식(${age > 20})"></ c : if>` 
      * 그러나 논리식 조건을 쓸 때 EL을 쓴다. EL을 쓰지 않으면 test="age>20"은 String으로 본다.
      * `<c:foreach items="list">` 이렇게 하면 인식 못 한다. -> `<c:foreach items=${list}>` list를 찾아서 객체로 뽑아서 넣어준다. 표현식에 부합하는 대상을 가져온다. 저 리스트의 반복을 처리하는 foreach가 될 수 있다. 

* ${firstThing.secondThing...}

  * firstThing을 EL 내장객체에서 찾는다.
  * EL 내장 객체 - 11개, requestScope, param, ... 10개가 map, 1개가 vo(pageContext)
  * 만약 11개에서 못 찾으면 4개 보관함에 저장된 객체의 key(name)로 인식하여 다시 찾음
  * page, request, session, application 보관함이 있다. 여기서 찾다가 없다면 null로 오게 된다. el은 null이면 빈 string을 찍는다. page.getAttribute()...
  * firstThing이 null이면 그 뒤를 참조하지 않는다. 
  * 객체니까 .을 찍을 수 있다. 
  * ${age > 20}을 쓰고 age가 없다면 null을 0을로 처리해버린다.
  *  firstThing에는 list, array, vo(setter, getter), map 유형이 온다. List나 Array는 []밖에 못 쓴다. 그러나 vo나 map은 []도 가능하고 .도 가능하다.
  * ${list[0].title} // getTitle처럼 오기도 함. 

  

## JSTL

- JSTL은 TLD(Tag Library Discripter)라는 사용자 설정 파일에다 맵핑을 해놓으면 <util.xxx()>라고 써도 인식이 된다. 
- 태그기반 호출이 가능하다. 그래서 스크립트릿(<%%>) 코드들은 다 사라진다. jsp에 있는 자바코드를 없애주도록.
- jsp는 <%@ taglib uri="tld경로" prefix="util">이라고 정의를 해놔야 한다. prefix를 통해 네임스페이스처럼 구분이 되고 거기 있는 클래스를 쓸 수 있다?
- JSTL에 크게 4개 파트가 있다. core, xml, sql, formatting. sql은 쓸모가 없다. DB를 위한 작업은 DAO에서 하니까. jsp가 sql을 짜지 않는다. core파트가 가장 중요하다. 
- if문, choose~when~otherwise, foreach등을 쓸 수 있다.
- 





## 실습

apache의 taglib 라이브러리를 써야한다. 개발하고 있는 프로젝트의 WEB-INF 안에 lib 폴더 안에 복사해놓으면 된다. BuildPath 설정 필요없이 알아서 인식한다.



## filter

필터 클래스로 제어할 수 있다. request.setCharacterEncoding("utf-8"); 같은 경우 계속 써야하는데 확장자마다 이 코드를 호출되기 전에 줄 수 있다. 

# XSLT 변환을 통해 알아보는 JSTL과 EL

## JSTL(JSP Standard Tag Library)

-   JSP 표준 태그 라이브러리입니다.
    
-   JSP에서 자주 사용하는 기능(반복, 조건, Data 관리 포맷, XML 조작, 데이터베이스 액세스)을 구현한 커스텀 태그 라이브러리 모음입니다.
    
-   JSTL은 EL을 사용하여 표현합니다.
    
-   JSTL은 위에서 말했던 다섯 가지의 라이브러리가 있습니다.(Core, Formatting, Function, Database, XML)
    
-   taglib 지시문을 이용하여 선언하고 prefix와 uri를 이용하여 어떤 라이브러리를 사용할지 지정합니다.
    
    1.  `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`
    2.  다른 라이브러리를 쓴다면 prefix와 uri의 맨 뒤 부분만 변경해주면 됩니다.
-   일단 사용하려면 JSTL 라이브러리를 설치해야한다.  
    3. Apache Standard Taglib을 다운받아서 프로젝트의 WEB-INF/lib 안에 복사해주면 됩니다.
    
-   Classfication of The JSTL Tags
    
    -   Core Tag( c), Formatting(fmt), Function(fn), Database(sql), XML(x)
-   Core 태그의 foreach Example입니다.
    

```html
<table>
<tr>
  <th>Value</th>
  <th>Square</th>
</tr>
<c:forEach var="x" begin="0" end="10" step="2">
<tr>
  <td><c:out value="${x}"/></td>
  <td><c:out value="${x * x}"/></td>
</tr>
</c:forEach>
</table>

```

-   JSP - XML Data
    
    -   JSP 안에서 XML을 나타내주기 위해선 XercesImpl.jar와 xalan.jar가 필요합니다. 이 두 파일을 다운 받고 tomcat 설치 디렉토리/lib에 넣습니다.
        
    -   `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`
        
    -   `<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>`
        

```html
<html>
	<head>        
	  <title>JSTL x:transform Tags</title>
	</head>
	<body>
		<h3>Books Info:</h3>
		<c:import url="http://localhost:8181/jstlex1/books.xml" var="xmltext"/>
		<c:import url="http://localhost:8181/jstlex1/style.xsl" var="xslt"/>
		<x:transform xml="${xmltext}" xslt="${xslt}"/>
</body>
</html>

```

-   c:import로 url을 지정하고 var로 변수에 넣어준 후, x:transform으로 변환해주면 됩니다.
    
-   이때 중요한 게 url을 쓸 때 자신의 localhost 포트번호와 프로젝트 경로를 써주고 xml과 xsl, jsp파일이 같은 위치에 있어야 합니다. xml을 WEB-INF에 넣으면 직접적으로 접근이 불가능하기 때문에 WebContent 안에 넣어야 한다고 합니다. ([https://stackoverflow.com/questions/23361757/cant-access-to-web-inf-folder-folder-file-jsp](https://stackoverflow.com/questions/23361757/cant-access-to-web-inf-folder-folder-file-jsp))
    
-   전 그래도 오류가 떴었는데 그 이유는 serializer.jar가 없다는 오류였습니다. 이걸 아까와 같이 lib에 넣어주면 됩니다. ([https://stackoverflow.com/questions/25621097/java-lang-illegalaccesserror-org-apache-xml-serializer-extendedcontenthandler](https://stackoverflow.com/questions/25621097/java-lang-illegalaccesserror-org-apache-xml-serializer-extendedcontenthandler))
    
-   위의 예제처럼 포함시켜도 되지만 변수로 넣어줘도 됩니다.
    

```java
<%@ taglib prefix = "c" uri = "[http://java.sun.com/jsp/jstl/core](http://java.sun.com/jsp/jstl/core)" %>
<%@ taglib prefix = "x" uri = "[http://java.sun.com/jsp/jstl/xml](http://java.sun.com/jsp/jstl/xml)" %>
<html>
   <head>
  	<title>JSTL x:transform Tags</title>
   </head>
   <body>
  	<h3>Books Info:</h3>
  	<c:set var = "xmltext">
     	<books>
        	<book>
	           	<name>Padam History</name>
	           	<author>ZARA</author>
	           	<price>100</price>
        	</book>
	       	<book>
	           	<name>Great Mistry</name>
	           	<author>NUHA</author>
	           	<price>2000</price>
        	</book>
     	</books>
  	</c:set>
  	<c:import url = "[http://localhost:8080/style.xsl](http://localhost:8080/style.xsl)" var = "xslt"/>
  	<x:transform xml = "${xmltext}" xslt = "${xslt}"/>
   </body>
</html>

```

## EL(Expression Language)

-   EL을 사용하면 응용프로그램에 저장된 JavaBeans의 구성요소에 쉽게 접근할 수 있습니다.
    
-   JSP EL을 사용하면 산술과 논리를 모두 표현할 수 있습니다.
    
-   `<jsp:setProperty name = "box" property="perimeter" value="100"/>`으로 지정해줘야 될 것을 ${expr}을 써서 쉽게 지정할 수 있습니다.
    
-   값을 표현하는데 사용되는 새로운 스크립트 언어로 JSP의 기본 문법을 보완하는 역할을 합니다
    
-   out.println()과 같은 자바코드를 사용하지 않고 좀 더 간편하게 JSP에서 저장객체를 출력할 때 씁니다.
    
-   JSP에서 기본으로 지원합니다.
    

### EL의 기본 문법

-   ${식}
    
-   EL을 쓰게 되면 값을 찾을 때 우선 순서는 page -> request -> session -> application 순입니다.
    
    -   `request.getParameter("name"); => ${param.name}`
        
    -   `request.getAttribute("member"); => ${member}`
        

### JSTL, XSL을 이용해서 XML을 변환하기

```html
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<html>
<head>        
<title>JSTL x:transform Tags</title>
</head>
<body>
<h3>Books Info:</h3>
<c:import url="http://localhost:8181/jstlex1/books.xml" var="xmltext"/>
<c:import url="http://localhost:8181/jstlex1/style.xsl" var="xslt"/>
<!-- EL로 인해서 ${}를 통해 변수를 넣어줄 수 있습니다. -->
<x:transform xml="${xmltext}" xslt="${xslt}"/>
</body>
</html>

```

#### reference

-   [https://www.tutorialspoint.com/jsp/jsp_custom_tags.htm](https://www.tutorialspoint.com/jsp/jsp_custom_tags.htm)
-   [https://www.tutorialspoint.com/jsp/jsp_expression_language.htm](https://www.tutorialspoint.com/jsp/jsp_expression_language.htm)


