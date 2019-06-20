---
layout  : wiki
title   : XML
summary : 
date    : 2019-06-20 15:13:26 +0900
updated : 2019-06-20 15:14:00 +0900
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
