---
layout  : wiki
title   : EL과 JSTL
summary : 
date    : 2019-06-20 15:27:35 +0900
updated : 2019-06-20 15:28:13 +0900
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
