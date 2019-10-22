---
layout  : wiki
title   : XPath
summary : 
date    : 2019-06-21 13:34:31 +0900
updated : 2019-06-21 13:34:54 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# XPath(XML Path Language)

-   XPath는 XML 문서의 특정 부분의 위치를 찾을 때 사용하는 언어입니다.
-   XPath는 XML 문서 안에 요소와 속성들을 탐색합니다.
-   XPath는 200개 이상의 내장함수를 포함하고 있습니다.
-   XSLT의 주요 구성요소입니다.
-   XML 계층 구조가 트리 형태 이기 때문에, 문서를 노드로 표현한 결과 역시 트리형태입니다.
-   `/`는 문서의 계층 구조에서 최상위 노드 역할을 하는 가상 노드입니다.
-   트리는 최상위에 한 개의 가상 루트 노드(루트노드)를 갖고, 나머지는 모두 루트 노드에 연결됩니다.
-   xml의 선언인  `<?xml version="1.0” ?>`  얘 또한 루트 노드의 자식 노드로 간주합니다.
-   XPath에서 속성을 지정하려면 @를 사용합니다.

```xml
<students>
	<student stu="st10”>
		<name>dominic</name>
		<address>seoul</address>
	</student>
<students>

```

-   XPath의  **절대 경로**  방식 표현 ->  `/students/student/@stu`
    
-   XPath의  **상대 경로**  방식 표현 ->  `student/@stu`
    
-   문서 내 위치에 상관없이 이름으로 경로를 지정할 수도 있습니다. 문서 내의 모든  `<name>`  요소의 위치를 나타내고자 한다면  `//name`으로 표현하면 됩니다.
    
-   `student[name]`  - 자식 요소로  `<name>`을 가지고 있는 모든  `<student>`  요소
    
-   `student{@stu}`  - 속성이 sno인 모든  `<student>`  요소
    
-   `name[.=’dominic']`  - 요소 내용이 'dominic’인 모든  `<name>`요소
    
-   `student[@stu=’st10’]`  - stu 속성값이 st10인 모든  `<student>`  요소
    
-   XPath는 7개의 노드 종류로 구분됩니다. (element, attribute, text, namespace, processing-instruction, comment and document)
    

## Selection Nodes

bookstore

"bookstore"인 이름의 모든 node를 선택합니다.

/bookstore

루트 요소 bookstore를 선택합니다

bookstore/book

bookstore의 자식인 모든 book 요소를 선택합니다.

//book

book이 어디있든지 간에 모든 book 요소를 선택합니다.

bookstore//book

bookstore아래에서 어딨든지 간에 모든 book 요소를 선택합니다.

//@lang

lang이라는 이름의 속성을 모두 선택합니다.

## Predicates

-   Prediacates는 특별한 값이나 특별한 노드를 찾는데 쓰입니다.
-   Prediacates는 항상 []안에 들어갑니다.

/bookstore/book[1]

/bookstore 자식인 첫 번째 book 요소를 선택합니다.(IE 5,6,7,8,9 에서는 0이 첫 번째)

/bookstore/book[last()]

마지막 book 요소를 선택합니다

/bookstore/book[last()-1]

마지막에서 하나를 뺀 요소를 선택합니다.

/bookstore/book[position()<3]

첫 번째와 두 번째 요소를 선택합니다

//title[@lang]

lang이라는 속성 이름을 가진 모든 title 요소를 선택합니다.

//title[@lang='en']

lang이라는 속성에 값이 en인 모든 title 요소를 선택합니다.

/bookstore/book[price > 35]

price 요소의 값이 35가 넘는 모든 book 요소를 선택합니다

/bookstore/book[price > 35]/title

price가 35가 넘는 book 요소의 title 요소를 선택합니다.

/bookstore/book/price[text()]

price 요소에서 text를 가져옵니다.

## Selecting Unknown Nodes

/bookstore/*

bookstore의 자식 요소들을 모두 선택합니다.

//*

문서 내의 모든 요소를 선택합니다.

//title[@*]

적어도 하나의 속성을 갖는 모든 title 요소를 선택합니다.

## Selecting Several Paths

//book/title | //book/price

모든 book의 price 요소와 title 요소들을 선택

//title | //price

문서 내의 모든 title과 price

/bookstore/book/title | //price

문서 내의 모든 price 요소와 bookstore 안에 book 안에 title 요소들

## XPath Axes

-   축은 XML 문서 트리에서 노드 간의 관계나 방향을 나타낼 때 사용합니다.
-   XPath에서 문서 트리를 탐색하기 위해서 제공하는 예약어를 사용하여 접근하게 됩니다. 축은 순방향이거나 역방향입니다.
-   순방향은 XML 문서의 시작 부분에서 끝 부분으로 찾는 것을 의미합니다
-   역방향은 문서의 끝 부분에서 시작부분으로 찾는 것을 의미한다.

Example

Result

child::book

Selects all book nodes that are children of the current node

attribute::lang

Selects the lang attribute of the current node

child::*

Selects all element children of the current node

attribute::*

Selects all attributes of the current node

child::text()

Selects all text node children of the current node

child::node()

Selects all children of the current node

descendant::book

Selects all book descendants of the current node

ancestor::book

Selects all book ancestors of the current node

ancestor-or-self::book

Selects all book ancestors of the current node - and the current as well if it is a book node

child::*/child::price

Selects all price grandchildren of the current node

#### reference

-   [https://www.w3schools.com/xml/xpath_intro.asp](https://www.w3schools.com/xml/xpath_intro.asp)
