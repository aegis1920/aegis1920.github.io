---
layout  : wiki
title   : XML
summary : 
date    : 2019-06-20 15:13:26 +0900
updated : 2019-06-21 13:38:54 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

## XML

```xml
<가수>
    김재환
</가수>
```

이런 게 Markup language.

왜 이런 걸 만들었을까?

데이터의 의미를 부여함. 메타 정보가 들어있다. 받는 사람은 그 데이터가 어떤 건지 잘 모름. 

김재환, 봄바람, 24를 보냈다면 김재환이 이름인지, 가수인지, 노래 제목인지 모름. 

소프트웨어에 종속적이지 않은 텍스트가 정말 문자열만 있는 것. 그래서 ,로 구분할 수 밖에 없다. 그래서 의미 파악이 어렵다. xml은 텍스트파일. 플랫폼을 가리지 않고 열 수 있다. 플랫폼에 독립적이다. 내가 전달하고자 하는 곳에 의미를 부여하여 데이터를 줄 수 있다. 교환 포맷으로 씀

똑같은 패턴..

DTD가 인터페이스같은 역할. 지켜라~. 명세역할이 DTD.

통신을 해주는 게 브라우저다~

JSON은 객체 포맷이라 더 편하다. 바로 객체로 바꿀 수 있다.BUT JSON이 표준은 아님.

schema는 훨씬 더 많고 제한을 둘 수 도 있고 다양한 기능을 가진다. 더 방대하다. 

이들의 목적은 xml을 정의하는 파일. 

well formed Document - 루트 엘리먼트는 하나.

xml 선언부 이전에는 주석도 못옴. ㅇㅇㅇㅇㅇㅇㅇㅇ

wel formed가 되어야 valid xml이 됨.

```xml
<expression>
    a < b 
    <!-- 의 경우 해석이 되지 않는다 왜냐면 꺽쇠로 인식하니까 그래서 <는 &lt;로 써줘야 한다 -->
    you&i
    <!-- 얘 또한 &amp;로 써야 인식이 된다. -->
</expression>
```

이렇게 쓰기가 힘들 때 글자를 그대로 인식하게 해줄 수 있는 것이 CDATA 세션이다.

- 실제로 바꿔서 해보면 출력 자체가 CDATA를 쓴 순간부터 모두 나오지만 나중에 데이터를 뽑을 때는 나오지 않는다.

Namespace

- 이름 공간. 가상의 이름 공간을 부여해서 구별할 수 있도록.
- 특정 태그가 아니라 보통 문서 전체에 준다. 그래서 루트 노드에 준다. 태그에 네임스페이스에 처음과 마지막에 똑같이 해놓기.
- default namespace. 별칭을 안 붙임. 문서를 통틀어 1개. 유일해야됨. 안 줘도 걔로 식별되야하니까. 



> 이클립스를 쓸 때 인코딩이 기본적으로 MS949로 되어있어서 UTF-8로 바꿔주는 게 좋다. preference로 가서 endcoding을 쳐서 모두 UTF-8로 바꿔주자. 참고로 workspace를 할 때마다 

`<!DOCTYPE booklist SYSTEM "bml.dtd">` SYSTEM이 오는 것은 개인적으로 쓸 때. 공용적으로 쓸 때는 PUBLIC

*는 0번이상, + 한 번 이상, ?는 와도 되고 안 와도 되고.

```xml
<!ELEMENT book (isbn, title, author+, publisher?, price)>

<isbn>100</isbn>
<title>JSP And Servlet</title>
<author>이규미</author>
<author>김태희</author>
<price>25000</price>
```

위 코드는 에러나지 않는다.

PCDATA 파싱되는 데이터 그냥 데이터를 의미한다고 생각하면 된다. 기본으로 PCDATA 되어있다. 





DTD에는 숫자 타입이 없음. 그래서 price에는 숫자가 와도 문자로 됨. 

속성은 book 엘리먼트에 kind 속성이 올 수 있다. 반드시 와야하는데 그게 글자다. `<book kind="computer">`

## DOM

돔 파싱은 트리를 만드는 것. 

이벤트만 알려줌.

SAX Parser는 이벤트를 알려준다. 그리고 돔을 통해 우리는 직접 객체를 만들 수 있다.

원하는 노드를 원할 때마다 탐색을 할 수 있다. SAX 파싱은 문서 전체를 읽고 다 읽으면 끝난다. 

**DOM은 이 문서를 객체화해서 메모리에 올려놓을 테니까 알아서 필요할 때 써라~, 그리고 가지를 추가할 수도 있고 삭제할 수도 있다. 이런 방법을 DOM Parsing이라고 부른다.**

브라우저가 파서를 갖고 있는데 문서 전체를 파싱하고 돔트리로 만들어서 우리에게 보여주는 것.

돔트리를 바꾸면 화면 상에 있는 것도 바뀐다.

ppt 91

- 자식을 갖는다는 건 무조건 element 노드. 회원들은 엘리먼트 노드. 는 회원이 이름이고 값이 없다.
- 텍스트 노드, 즉 이름이 없고 값만 있다. 우리가 쓰는 데이터들. diana같은 얘들.

api에 getElementbyTagname()이라는 메소드가 있다. DFS로 찾으면 너무 힘들테니까. 텍스트 노드를 찾으려면 바로 위에 있는 엘리먼트 노드(그 텍스트 노드를 감싸고 있는 엘리먼트 노드)를 찾아야 한다. 데이터는 리프노드로 찾을 수 있다. 

우리는 전체탐색할 필요 없음. 다양한 메소드가 있으니까. 

속성은 엘리먼트 태그를 통해서만 가능

jdk에 sax파서랑 dom파서 모두 가지고 있음.

DocumentBuilderFactory.newInstance(); 싱글톤으로 이루어짐.

빌더 패턴. 빌드 생성 및 모든 작업들을 해준다. newDocumentBuilder()는 

공장은 객체 하나, 파서는 원할 때마다 만들 수 있다. new로 하는 게 아니라 메소드로가능하다.

팩토리에게 파서 만들어달라고 함. 인자로 파싱할 xml문서를 받아온다.

그러면 이제 자기네들이 알아서 트리를 만들어준다.

문서로 된 객체를 줌. 그 객체 안 메소드에 getDocumentElement();가 있다. root는 null이 될 수 없기때문에 null을  반환하지 않는다. 

Document가 인터페이스.

연속되어 있는 공백도 문자기 때문에 텍스트 노드로 본다. 하나의 텍스트 노드로 본다.  

```xml
for (int i = 0; i < contactList.getLength(); i++) {
				// element만 가져왔기 때문에 element로 형변환
				Element contact = (Element) contactList.item(i);
				// 특정 엘리먼트 밑에서도 찾을 수 있음.
				System.out.println(contact.getElementsByTagName("name").item(0).getLastChild().getNodeValue());
				
			}
```

contact에서 가져오고 그 중에서 name이라는 이름을 가진 태그의 엘리먼트 노드를 가져옵니다. 그리고 그 중에서 item(0)이니 첫 번째 name이라는 엘리먼트 노드를 가져옵니다. 그리고 그 중에서 getLastChild()로 첫 번째 자식 노드 즉, 텍스트 노드를 가져옵니다. 그리고 getNodeValue()로 값을 가져옵니다.

XML은 표준. JSON은 에러가 나질 않음. 타입 체킹 면에서는 좋지 않다. 



## SAX

XML 프로세서들마다 API가 달라서 개발의 어려움이 생겨, API에 대해서 표준화 작업을 했다. 그 결과물이 XML 표준 API인 DOM과 SAX

DOM

- DOM Tree로 조작이 가능하다. 수정하고 추가하고 삭제할 수 있는 것(가장 큰 차이점)
- 다 객체로 표현해야하기 때문에 메모리 사용량이 많아진다.  

SAX 

- 메모리상에 XML을 저장하지 않음. 내가 원하는 엘리먼트 노드로 바로 못감. 하나하나 조건 판별을 해야됨.  
- 그래서 search만 한다면 SAX가 좋다.
- 빠르고 메모리 소모량이 적음. 
- 수정을 못함
- 저장해놓은 게 없으니 수정을 못함. 검색만 할 수 있다. 
- SAX는 DOM 파싱의 내부적인 기능임
- 한 번 쭉 빠르게 읽어들이면 저장할 곳이 없다. 똑같은 태그 즉, name이라는 태그를 찾고 나서 또 다시 name을 찾는다면 또 다시 처음부터 파싱해야 한다. 
- SAX 파싱에서는 Event handler를 잘 만드는 게 핵심이다. 처음과 끝이 있는 태그형태니까 끝날 때 그 태그 이름만 기억하면 된다. 스택같이 push, pop이 필요없다.

SAX의 핵심 인터페이스

- ContentHandler
- DefaultHandler 클래스를 상속받아서 원하는 것만 구현해서 사용. 필요한 것만 재정의하면 됨. 어댑터같은 추상클래스를 만드는 것. 

DOM과 SAX모두 .newInstance()를 써서 싱글턴패턴을 호출.

startDocument(), endDocument() 둘 다 한 번씩만 호출, 문서 시작과 끝일 때. 

startElement(), endElement(). 엘리먼트 불릴 때마다 호출.

characters()의 매개변수 중 char[]은 `<test>안녕</test>`가 오면 캐릭터 배열로 처리. 일단, 전체를 추려내고 문자열이 나왔을 때 `안녕`이라는 글자를 다시 추려낸다. 

## JSON

JavaScript Object Notation(JSON)

자바스크립트는 문자열 표기가 2가지이다.

- ""와 ''. 
- 자바스크립트는 문자 개념이 없다. 

{}를 하나의 객체로 인식한다.

- "속성명" : 값 // 속성명의 ""은 옵션이지만 사용을 권장한다. 

[]는 배열, 넣고싶은 원소를 주면 됨.

```javascript
[
{"name" : "김재환", "age" : 24},
{"name" : "조민국", "age" : 28}    
 ]
```

contactlist.json에서 phones 가 하나더라도 형태를 맞추기위해서 크기가 1인 배열로 줬다.

```javascript
[
	{
		"name" :"김태희",
		"phones" :[{
							"type" : "mobile",
							"number" : "010-1111-2222"
					}],
		"email" : "thkim@ssafy.com"
	},
	{
		"name" :"김재환",
		"phones" :[
							{
								"type" : "mobile",
								"number" : "010-2222-3333"
							},
							{
								"type" : "office",
								"number" : "02-596-1122"
							}
						],
		"email" : "jjany@my.com"
	}
]
```

내가 어떤  API를 쓰느냐에 따라 다르다. 우리는 GSON을 쓴다.

## git

```
git init
git remote add origin (url)
git remote -v
git add .
git commit -m "msg"
git push origin master

git add를 잘못했을 때
git reset

git commit -m "project init"



//
git checkout -b jmk
git branch // 초록색이 현재 내가 위치해있는 branch

// 클래스 따로 주고 하기. 
git add .
git push origin jmk

```



global이면 모든 프로젝트, global이 아니면 여기서 켠 프로젝트 하나만. 계정 설정을 안 하면 잔디가 안 찍힌다. 



compareTo()함수. this.name과 other.getName()에서 아스키코드값을 봐서 작으면 -1, 크면 양수?
Collections에 있기도 있다. 근데 내림차순을 하고 싶을 때 못 한다. 정렬할 때 함께 넘김. 상황에 따라 다른 정렬을 하고 싶을 때는... 

일단 인터페이스 comparable


# XML(eXtensible Markup Language)

W3C에서 여러 특수 목적의 마크업 언어를 만드는 용도에서 권장되는  **다목적 마크업 언어**이다.

예를 들어, CPU 2.83GHz라는 데이터를 표기할 때 어디서부터가 데이터명이고 어디부터가 실제 데이터인지 표시할 수 있는 방법이 없는데 XML을 이용하면 CPU은 데이터 명이 되고 2.83은 데이터 값이 된다. 이렇게 사용자가 직접 태그 자체를 정의할 수 있으며 데이터를 보여주는 목적이 아니라  **데이터를 저장하고 전달할 목적**으로 만들어졌다.

원래 동일한 목적으로 SGML이라는 것이 인터넷보다 빠르게 등장했으나 여기에 인터넷 환경과 컴퓨팅 환경에 맞게 확장한 것이 XML이다. 모든 XML 문서는  **유니코드 문자**로 이루어져 있어 수많은 종류의 데이터를 유연하고 자유롭게 기술하는데 적용할 수 있고 다양한 용도로 응용할 수 있으며 인터넷으로 연결된 시스템끼리 쉽게 식별 가능한 데이터를 주고받을 수 있다.

## XML의 목적

-   XML은 시스템 간의 데이터 교환을 위해 만들어졌다. 서로 호환되지 않는 시스템 간의 데이터 교환에도 괜찮을까?
    
-   XML은 데이터를  **텍스트 형식으로 저장**하므로 소프트웨어나 하드웨어에 독립적으로 데이터를 저장하고 전달할 수 있다.
    

## XML의 구조

-   XML은  **트리 형태의 계층 구조**를 가지고 있다.
    
-   그 다음부터는 HTML 처럼 부모와 자식관계처럼 나눠지면 된다.
    

## XML의 선언

-   XML 문서는 맨 첫 줄에 태그를 사용해서 XML 문서임을 명시해야 한다. 이것을  **XML prolog**라고 한다. (심지어 첫 줄에 주석도 오면 안 된다.)
    
-   `<?xml version="XML문서버전" encoding="문자셋" standalone="yes|no"?>`
    
    -   보통  `<?xml version="1.0" encoding="UTF-8"?>`  이라고 쓴다.
-   standalone속성은 XML 문서가 외부 DTD와 같은 외부 소스의 데이터에 의존하고 있는 문서인지 아닌지를 XML 파서에 알려주는 역할을 한다. 기본값은 no이며 yes로 설정하면 이 문서를 파싱할 때 참조해야 할 외부 소스가 없다는 걸 의미한다.
    

## XML의 문법

-   모든 XML 요소는 종료 태그를 가져야 한다. 빈 태그에도 /를 추가해야된다.
    
-   XML 태그는 대소문자를 구분한다.
    
-   속성값은 반드시 따옴표로 감싸야 한다.
    
-   띄어쓰기를 인식한다.
    
-   XML 엔티티가 미리 정의되어 있다. (<, >, &, ", ')
    

## XML의 주석

-   <!-- -->
    
-   XML의 프롤로그, 속성 값 내부, 주석 안에는 주석을 작성할 수 없다.
    

## XML의 요소

-   XML 요소의 이름에는 공백을 포함할 수 없다.
    
-   예약어인 XML, xml, Xml 등은 요소의 이름으로 사용할 수 없다.
    
-   `<hello>hello world</hello>`
    

## XML의 속성

-   XML 속성은  **XML 요소에 대한 추가적인 정보를 제공**해주며 해당 요소의 특징을 정의한다.
    
-   요소에 속성 값을 주면 <요소이름 속성1=“속성값” …/> 가 된다.
    
-   `<student><name>홍길동</name></student>와 <student name="홍길동"></student>`
    
-   위 두 가지는 결과적으로 완전히 같은 정보를 제공한다. 그러나 속성은 여러 개의 값을 가질 수 없으며, 요소처럼 손쉽게 확장할 수 없다. 게다가 XML 트리에도 포함되지 않아서 다양한 용도로 활용할 수 없다.
    

## XML 네임스페이스(namespace)

-   서로 다른 XML 문서를 통합하려고 할 때 같은 이름을 가진 요소로 인해 충돌이 발생할 수 있다. 같은 요소 이름으로 인해 HTML 문서와 통합할 때도 충돌이 날 수 있다.
    
-   Prefix를 사용하면 충돌을 피할 수 있다.
    
-   Prefix만 써보자.
    

```xml
<h:table>
  <h:tr>
    <h:td>Apples</h:td>
    <h:td>Bananas</h:td>
  </h:tr>
</h:table>

<f:table>
  <f:name>African Coffee Table</f:name>
  <f:width>80</f:width>
  <f:length>120</f:length>
</f:table>

```

-   XML에서 접두사에 namespace라는 걸 이용하여 위와 같은 이름의 충돌을 방지할 수 있다. (더 고유하게 만들 수 있다.)
    
    -   **`<요소이름 xmlns:prefix="URI">`**

```xml
<root>

<h:table xmlns:h="http://www.w3.org/TR/html4/">
  <h:tr>
    <h:td>Apples</h:td>
    <h:td>Bananas</h:td>
  </h:tr>
</h:table>

<f:table xmlns:f="https://www.w3schools.com/furniture">
  <f:name>African Coffee Table</f:name>
  <f:width>80</f:width>
  <f:length>120</f:length>
</f:table>

</root>

```

-   XML 네임스페이스는 요소의 이름과 속성의 이름을 하나의 그룹으로 묶어 이름에 대한 충돌을 해결한다.
    
-   접두사만 써도 되는데 namespace까지 쓰는 이유는 접두사 만으로는 다른 파일과 같을 경우가 있을 수 있고 그러한 이유에서 URI까지 쓰게 되는 것이다. 그래서 이런 XML 네임스페이스는 URI(Uniform Resource Identifiers)로 식별된다.
    
-   이렇게 XML 요소에 네임스페이스가 선언되면, 해당 요소의 모든 자식 요소에도 같은 네임스페이스가 선언된다.
    
-   루트 요소에 namespace를 써도 된다.
    

```xml
<root xmlns:h="http://www.w3.org/TR/html4/" xmlns:f="https://www.w3schools.com/furniture">
</root>

```

## XML 문서의 종류

-   **Well-formed 문서**  :  **XML의 기본 문법을 만족하는 수준**으로 되어있는 문서. 모든 구문을 허용하기 때문에 XML처럼 보이기는 하지만 형식이 제각각이라서 실제로 데이터 교환 수단으로 바로 쓰기는 어렵다. 예를 들어, 한 요소가 닫기 태그와 자체 닫기 없이 열기 태그를 가지고 있으면 Well-formed 문서라 부르지 않는다. 즉, Well-formed가 아닌 문서는 XML이 아니다.
    
-   **Valid XML 문서**  :  **XML 문서의 형식(DTD, XML ScheMA)**  (쉽게 말하면 몇 가지 의미적 규칙들)을 만족하도록 작성된 XML 문서. 문서의 형식 정의는 XML 문서 자체에 포함되었을 수도, 다른 문서에 존재할 수도, 아니면 다른 문서로 존재할 수도, 아니면 다른 컴퓨터에 존재할 수도 있다. 예를 들어, 어느 문서가 정의되지 않은 태그를 포함하고 있으면 Valid된 것이 아니다. 문서 형식 정의는 과거에 DTD가 많이 사용되었지만, 2000년대 중후반 이후 XML Schema를 주로 사용한다.
    

## XML 파서

-   XML 파서란 응용프로그램이 XML 문서를 읽을 수 있도록 인터페이스를 제공해주는 라이브러리나 패키지를 의미한다. XML 파서는 XML 문서가 적합한 형식을 갖추고 있는지와  **문법상의 오류가 있는지 검사**한다. 대부분의 주요 웹 브라우저는 모두 XML 파서를 내장하고 있다. XML 파서의 최종 목적은 XML 문서를 응용프로그램이 읽을 수 있는 코드로 변환하는 것이다.
    
-   **XML 파서의 종류**
    
    -   **DOM**  :  **XML 문서가 전부 메모리로 올라가 객체 모델로 생성**된다. W3C의 공식 표준이며, W3C가 표준화한 API들의 기반이다. 문서가 통째로 메모리에 올라가 조직화되기 때문에 문서 요소를 임의적으로 접근하고 사용하는데 적합하다. 그러나 또 논리 구조를 통으로 메모리에 올려놓고 연산하기 때문에 XML 데이터 양이 크면 메모리 부족으로 인해 고생하게 된다.
        
    -   **SAX**  : XML 문서를 애플리케이션에서 사용하기 위한 API. DOM에 비해 저수준의 인터페이스를 가지고 있으며 처리해야 할 파일이 클 때 적합하다. XML의 구조에 따라 이벤트가 발생되며, 프로그래머는 이 이벤트를 처리하는  **이벤트 핸들러를 작성하여 필요한 데이터를 추출**할 수 있다. 당연하게도 메모리에 올려버리는 DOM보다는 못하지만 이런 이벤트 기반 처리 방식은 읽어서 처리해야 하는 XML 데이터가 매우 클 때 장점으로 작용한다. 데이터베이스에 입력하는데 SAX를 쓰고 데이터 조작은 해당 저장공간에서 하면 되니까.
        

## Displaying XML

-   XML은 정보를 저장하고 전달하는 용도로만 쓰이고 보여주는 용도로 쓰이지 않는다. CSS로 보여줄 순 있지만 CSS로 XML을 포맷하는 건 추천하지 않는다. Javascript나 XSLT가 좋은 방법이다.

## XMLHttpRequest

-   최근의 모든 브라우저들은 서버로 요청하기위해 XMLHttpRequest object를 내장하고 있습니다.

### The XMLHttpRequest Object

-   XMLHttpRequest Object는 웹 서버로 데이터를 요청하기 위해 쓰인다.
    
-   XMLHttpRequest Object는 개발자들에게 꿈이었다. 왜냐하면
    
    -   페이지를 새로고침(reload) 없이 update할 수 있다.
        
    -   페이지가 load되고 나서 서버로 데이터를 요청할 수 있다.
        
    -   페이지가 load되고 나서 서버로부터 데이터를 받을 수 있다.
        
    -   서버로 데이터를 전송할 수 있다.
        

### XMLHttpRequest example

```javascript
//XMLHttpRequest 객체를 만들어서 xhttp라는 변수에 넣습니다.
var xhttp = new XMLHttpRequest();
//onreadystatechange 속성은 XMLHttpRequest 객체의 상태가 변경될 때마다 실행할 함수를 지정합니다.
xhttp.onreadystatechange = function() {
//readyState 속성이 4이고 status 속성이 200이면 응답준비가 완료됩니다.
    if (this.readyState == 4 && this.status == 200) {
//responseText 속성은 서버 응답을 텍스트 문자열로 반환합니다.
       document.getElementById("demo").innerHTML = xhttp.responseText;
	}
};
xhttp.open("GET", "*filename*", true);
xhttp.send();

```

#### Reference

-   [https://namu.wiki/w/나무위키:대문](https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EB%8C%80%EB%AC%B8)
-   [https://www.w3schools.com/xml/default.asp](https://www.w3schools.com/xml/default.asp)


