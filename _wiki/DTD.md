---
layout  : wiki
title   : DTD
summary : 
date    : 2019-06-21 13:31:24 +0900
updated : 2019-06-21 13:31:42 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# DTD(Document Type Definition)

-   XML에서 스키마(필요한 요소와 속성 집합들의 정보가 있는 곳)를 작성할 때는 두 가지 방법이 있습니다. 이 중에 DTD만 알아보겠습니다.
    
    -   DTD(Document Type Definition)
    -   XML 스키마(XSD)
-   DTD는 XML 문서의 구조 및 해당 문서에서 사용할 수 있는 적법한 요소와 속성을 정의합니다.
    
-   DTD는 엔티티를 정의할 수 있으며, XML 문서 내부에 명시할 수도 있고 별도의 파일로 분리할 수도 있습니다.
    
-   응용프로그램은 DTD의 정의에 따라 XML 문서의 구문 및 구조에 대한 유효성(valid한지)을 검사할 수 있습니다.
    
-   그래서 보통은 XML파일과 DTD파일이 따로 있어서 XML 파일 내에 필요한 DTD파일이 명시되어 있는 경우가 많습니다.
    

## DTD 문법

-   `<!DOCTYPE 루트요소 DTD식별자 [선언1 선언2 …]>`
    
-   루트 요소는 XML 파서에 명시된 루트 요소부터 파싱을 시작하라고 알려주는 역할을 합니다.(그 문서의 가장 위에 있는 요소)
    
-   **DTD 식별자는 프로그램 외부에 존재하는 DTD 파일을 위한 식별자 입니다.**  만약에 DTD 식별자가 적혀 있으면, 그것을 외부 서브셋이라고 합니다.
    
-   괄호[] 안에는 내부 서브셋이라 불리는 추가로 선언한 엔티티의 리스트가 존재합니다.
    

### DTD 내부 서브셋(subset)

-   DTD가 XML 파일 내부에서 선언되면, 그 선언은 반드시 <!DOCTYPE> 안에 위치해야 합니다.
    
-   내부 서브셋이라서 xml prologue의 standalone="yes"를 써줍니다.
    

```d
<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<!DOCTYPE food [
<!ELEMENT food (name,type,cost)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT type (#PCDATA)>
<!ELEMENT cost (#PCDATA)>
]>
<food>
    <name>상추</name>
    <type>야채</type>
    <cost>2000</cost>
</food>

```

-   위 예제에서 !DOCTYPE food는 이 문서의 루트 요소가 요소라는 사실을 명시합니다.
    
-   !ELEMENT food는 요소가 , , 의 세 요소를 반드시 포함해야 한다는 사실을 명시합니다.
    
-   !ELEMENT name은 요소가 #PCDATA 타입을 갖는 요소라는 사실을 명시합니다.
    

### DTD 외부 서브셋

-   DTD가 XML 파일 외부에서 선언되면,  `<!DOCTYPE>`은 반드시 외부 DTD 파일의 주소 정보를 포함해야 합니다. 이러한 외부 DTD 파일은 .dtd 확장자를 사용하여 저장합니다.
    
-   `<!DOCTYPE food SYSTEM "food.dtd">`
    

## DTD의 구성요소

-   이 말은 DTD에서 정의하는 XML 문서의 구성요소들이라고 할 수 있습니다.
-   DTD는 요소, 속성, 엔티티, PCDATA, CDATA과 같은 구성요소로 이루어져 있는데 모두 XML에서 따온 것이니까요.

### DTD 요소 선언

-   `<!ELEMENT 요소이름 요소카테고리>`
    
-   `<!ELEMENT 요소이름 (요소내용)>`
    
-   빈 요소의 선언
    
    -   `<!ELEMENT 요소이름 EMPTY>`
-   하나의 자식 요소만을 가지는 요소의 선언
    
    -   `<!ELEMENT 요소이름 (자식요소이름)>`
-   여러 자식 요소를 가지는 요소의 선언
    
    -   `<!ELEMENT 요소이름 (자식요소이름1, 자식요소이름2)>`
-   최소한 하나 이상의 자식 요소를 가지는 요소의 선언
    
    -   `<!ELEMENT 요소이름 (자식요소이름+)>`
-   자식 요소를 많이 가질 수도 있고, 가지지 않을 수도 있는 요소의 선언
    
    -   `<!ELEMENT 요소이름 (자식요소이름*)>`
-   자식 요소를 가지지 않거나, 단 하나의 자식 요소만을 가지는 요소의 선언
    
    -   `<!ELEMENT 요소이름 (자식요소이름?)>`
-   자식 요소를 선택적으로 가지는 요소의 선언
    
    -   `<!ELEMENT 요소이름 (자식요소이름1, (자식요소이름2| 자식요소이름3))>`
-   Ex)  `<!ELEMENT note ( #PCDATA | to | from | header | message ) *>`
    
-   note 요소는 문자데이터, to, from, header, message 요소를 0번 이상 포함할 수 있습니다.
    

### DTD 속성의 선언

-   `<!ATTLIST 요소이름 속성이름 속성타입 속성값>`
    
-   속성 타입
    

Type

Description

CDATA

The value is character data

(en1|en2|..)

The value must be one from an enumerated list

ID

The value is a unique id

IDREF

The value is the id of another element

IDREFS

The value is a list of other ids

NMTOKEN

The value is a valid XML name

NMTOKENS

The value is a list of valid XML names

ENTITY

The value is an entity

ENTITIES

The value is a list of entities

NOTATION

The value is a name of a notation

xml:

The value is a predefined xml value

-   속성 값

Value

Explanation

value

The default value of the attribute

#REQUIRED

The attribute is required

#IMPLIED

The attribute is optional

#FIXED value

The attribute value is fixed

#### 속성 값에 대한 것은 중요하므로 다시 설명하겠습니다.

-   **Default**
    
    -   DTD :  `<!ELEMENT square EMPTY>`  `<!ATTLIST square width CDATA "0">`
    -   Valid XML :  `<square width="100" />`
    -   위의 정의는 square는 빈 요소이고, width는 기본 값이 "0"이다라는 걸 뜻합니다. 다른 게 들어와도 상관 없으니 valid 합니다. 단지 안 넣었을 때 기본 값을 말해줍니다.
-   **#Required**
    
    -   DTD :  `<!ATTLIST person number CDATA #REQUIRED>`
    -   Valid XML :  `<person number="5677" />`
    -   Invalid XML :  `<person />`
    -   꼭 써줘야 합니다. 안 써주면 invalid!
-   **#Implied**
    
    -   DTD :  `<!ATTLIST contact fax CDATA #IMPLIED>`
    -   Valid XML :  `<contact fax="555-667788" />`
    -   Valid XML :  `<contact />`
    -   명시해도 되고 안 해도 되고. 둘 다 유효한(Valid) XML이 됩니다.
-   **#Fixed**
    
    -   DTD :  `<!ATTLIST sender company CDATA #FIXED "Microsoft">`
    -   Valid XML :  `<sender company="Microsoft" />`
    -   Invalid XML :  `<sender company="W3Schools" />`
    -   이 속성 값은 명시된 값으로 고정되있어서 바꾸지 못 합니다.

## Enumerated Attribute Value

-   DTD :  `<!ATTLIST payment type (check | cash) "cash">`
-   XML example :  `<payment type="check" /> or <payment type="cash">`
-   고정 값 set 중 하나가 되도록 하려면 열거 형 특성 값을 사용합니다.

## Use of Elements vs Attributes

-   데이터는 자식 요소나 속성에 저장될 수 있습니다.
    
-   속성을 사용하든(), 자식 요소를 사용하든(**12/11/2002**) 데이터를 저장하는 건 같습니다. 속성을 사용하는 건 HTML에서 편리하지만 XML에서는 피해야 합니다. XML에서 데이터같은 정보라면 자식 요소를 사용하는 것이 좋습니다.
    
-   날짜같은 경우도 하나가 아니고 최대한 나누는 식으로.
    

```xml
<note>
  <date>
    <day>12</day>
    <month>11</month>
    <year>2002</year>
  </date>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>

```

### 그러면 왜 데이터를 저장하는데 속성을 사용하는 걸 피해야할까요?

-   속성의 value에 여러 value가 들어갈 수 없습니다.
    
-   속성은 확장성이 좋지 않습니다.
    
-   구조적으로 설명할 수 없습니다. (트리 형태가 아니듯이)
    
-   속성은 프로그램 코드로 조작하는데 어렵습니다.
    
-   속성의 값들은 DTD에 비해 테스트하기 어렵습니다(유효한지 유효하지 않은지)
    

> 데이터와 관계가 없는 정보를 제공해야할 때 속성을 쓰세요.  
> 하지만 속성을 피하는데도 예외가 있습니다. ID같은 유일한 식별자가 있을 때는 속성을 써주는 게 좋습니다. <note id="p501/> 처럼.

## DTD 엔티티(entity)

-   특정 문자열을 손쉽게 사용할 수 있도록 해주는 역할입니다. 엔티티의 이름과 확장할 문자열을 미리 정의해놓으면, XML 문서나 DTD에서 사용되는 엔티티의 이름은 모두 미리 정의한 문자열로 대체됩니다.
    
-   **엔티티의 종류**
    
    -   **일반 엔티티**  - XML 문서에서만 확장될 수 있습니다. 파싱되거나 파싱되지 않을 수도 있습니다.
        -   **내부 엔티티 선언**
            
            -   `<!ENTITY 엔티티이름 "엔티티값">`
                
            -   선언된 내부 엔티티는 XML 문서에서 &+엔티티 이름+;의 형식으로 사용됩니다.
                
            -   DTD :  `<!ENTITY writer "Donald Duck.">`
                
            -   XML :  `<author> &writer;</author>`
                
        -   **외부 엔티티 선언**
            
            -   외부에 파일 형태로 선언되는 외부 엔티티는 다른 DTD 문서에서 재사용할 수 있습니다.
                
            -   `<!ENTITY 엔티티이름 SYSTEM "URI 또는 URL">`
                
            -   외부에서 선언된 외부 엔티티는 내부 엔티티의 형식과 같습니다.
                
        -   **파라미터 엔티티**  - DTD 내부에서만 확장될 수 있으며, 반드시 파싱됩니다.
            
            -   **DTD 문서에서만 사용하기 위해 선언한 엔티티를 파라미터 엔티티라고 합니다.**  선언할 때 앞에 %가 들어갑니다.
                
            -   `<!ENTITY %엔티티이름 "엔티티값">`
                
            -   엔티티 이름 앞에 % 기호가 들어가는 것을 제외하면, 일반 엔티티와 같은 방법으로 사용됩니다.
                
            -   파라미터 엔티티에 전체 DTD를 포함할 수 있고, 외부로 파싱된 엔티티도 선언이 가능합니다(SYSTEM ~~)
                
-   **PCDATA**
    
    -   PCDATA(Parsed Character DATA)란  **XML 파서에 의해 분석될 문자 데이터를 의미**합니다. 쉽게 말해  **XML 요소의 시작 태그와 종료 태그 사이에 위치한 텍스트**를 의미합니다.
    -   여기에는 텍스트가 들어간다는 걸 의미합니다.
    -   문자 데이터로 파싱된  **요소(element)는 (#PCDATA)로 선언**됩니다.
    -   `<!ELEMENT 요소이름 (#PCDATA)>`
-   **CDATA**
    
    -   CDATA(Character DATA)란 XML 파서가 분석하지 않는 문자 데이터를 의미합니다.  **DTD에서 요소의 콘텐츠에는 PCDATA만이 올 수 있으며, 속성의 속성값으로는 CDATA만이 올 수 있습니다.**
    -   `<!ATTLIST 요소이름 속성이름 CDATA 속성값>`
-   **XML Validator**를 통해 유효성 검사(에러가 있는지 없는지)를 할 수 있습니다. 내부 DTD를 넣어서 확인했습니다.
    
-   코드
    

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!-- xml파일이므로 버전과 characterset, 내부 서브셋이니 standalone에 yes를 써준다. -->
<!-- DTD식별자(SYSTEM)는 없다. DTD 내부 서브셋이니까. DOCTYPE 뒤에는 루트 노드 -->
<!DOCTYPE food [                         
<!ELEMENT fruit (apple, strawberry)> <!-- fruit의 자식 요소로 apple과 strawberry가 들어가야 된다.-->
<!ELEMENT fruit (banana+)>         <!-- 하나 이상의 banana 자식 요소를 가지는 fruit -->
<!ELEMENT tomato EMPTY> <!-- tomato요소는 내용이 비어있다 -->
<!ELEMENT apple (#PCDATA)> <!-- apple요소에는 텍스트가 들어간다-->
<!ATTLIST beef taste CDATA #REQUIRED> <!-- beef 요소에 taste 속성을 반드시 명시.-->
<!ENTITY COOL "IT WAT COOOOOOOOOOOOOOL"> <!--COOL을 &로 끌어오면 뒤에 문자열이 나옴-->
]>
<food>
  <fruit>
    <apple>apple</apple>
    <strawberry>strawberry</strawberry>
    <banana>banana</banana>
	<tomato></tomato>
  </fruit>
  <meat>
	<beef taste = "good">beef</beef>
    <pork>&COOL;</pork>
  </meat>
</food>

```

-   일반 엔티티와 파라미터 엔티티의 차이점은 엔티티가 확장되는 곳이 어디인가 하는 점입니다.  **일반 엔티티는 XML 문서에서만 확장될 수 있으며, 파싱되거나 파싱되지 않을 수도 있습니다. 파라미터 엔티티는 DTD 내부에서만 확장될 수 있으며, 반드시 파싱됩니다.**

#### reference

-   [https://www.w3schools.com/xml/xml_dtd_intro.asp](https://www.w3schools.com/xml/xml_dtd_intro.asp)
