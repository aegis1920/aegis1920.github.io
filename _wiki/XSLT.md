---
layout  : wiki
title   : XSLT
summary : 
date    : 2019-06-21 13:36:24 +0900
updated : 2019-06-21 13:37:29 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# XSLT(eXtensible Stylesheet Language Transformations)

-   W3C는 XML에 기반한 Stylesheet 언어가 필요해서 XSL이라는 것을 만들었습니다.
    
-   CSS가 HTML을 위한 스타일 언어라면, XSL은 XML을 위한 스타일 언어입니다.(**XSL = Style Sheets for XML**)
    
-   **XML 문서 자체는 데이터를 저장하기 위한 구조를 정의하는 문서이고, XSL은 이 데이터를 사용자에게 어떻게 보이게(Display) 할지 결정하는 역할을 합니다.**
    
-   XSL은 XSLT, Xpath, XSL-FO, Xquery. 총 4 개의 언어로 구성됩니다.
    
    -   **XSLT**  - a language for transforming XML documents(XML을 다른 구조의 문서로 변환시키기 위한 언어, XSL의 핵심)
        
    -   XPath - a language for navigating in XML documents(XML의 특정 요소나 속성에 접근하기 위한 경로를 지정하는 언어)
        
    -   XSL-FO - a language for formatting XML documents (discontinued in 2013) (XML데이터를 출력하기 위한 목적으로 설계된 언어(현재는 CSS3로 대체하여 사용하고 있습니다.))
        
    -   XQuery - a language for querying XML documents(XML문서의 쿼리를 위한 언어)
        
-   XSL은 XML 문서를 다른 XML 문서 또는 브라우저가 인식하는 다른 타입의 문서(HTML, XHTML 등…)로 변환할 수 있습니다.
    
-   최근의 브라우저들은 XSLT와 XPath를 지원합니다.
    
-   참고로 xml과 xsl 둘다 맨 윗줄에 선언부가 들어가야 합니다. 주석이 들어가면 실행되지 않습니다.
    

### XSL에서도 가장 중요한 XSLT에 대해서 알아보겠습니다.

-   XSLT는 XML문서(Source-tree)를 다른 문서 형태(XML, HTML, XHTML 등, Result-tree)로 변환하기 위한 언어로 변환 규칙을 정의하고 있습니다. 이러한 규칙을  **template**이라고 합니다.
    
-   XSLT는 하나 이상의 template으로 구성된 집합체입니다. template은  `<template>`요소를 이용해 표현하며, 이 요소에는 문서를 변환하기 위한 명령어와 내용이 포함되어 있습니다. 변환 규칙을 적용할 XML 요소를 찾기 위해  **XPath**  속성에 해당하는 match 속성을 사용합니다.
    
-   XSLT을 사용하면 요소 및 특성을 결과에 추가하거나 제거 할 수 있습니다. 요소를 다시 정렬하거나 플랫폼 테스트 및 요소들을 숨기는 등, 많은 것들을 결정 할 수 있습니다.
    
-   아주 간단한 XSLT의 변환 과정
    

1.  XSL 문서와 XML 문서(Source tree)가 XSLT 프로세서에 의해 합쳐집니다.
2.  XSLT 프로세서는 다른 구조의 XML 문서(Result tree)로 변환합니다.

-   XSLT를 사용함으로써 생기는 이점
    
    -   독립적인 프로그래밍이 가능해집니다.
        
    -   xsl 파일만을 변경해 Output을 변경할 수 있습니다. 즉, XML을 변경할 필요가 없어집니다. XSL만 변경해준다면 신속하게 결과물을 볼 수 있습니다.
        

## Correct Style Sheet Declaration

-   처음에 xml과 같이 똑같은 선언을 해줘야 합니다.  `<?xml version="1.0"?>`
    
-   문서를 XSL 스타일 시트로 선언하는 ROOT 요소는  `<xsl:stylesheet>`  또는  `<xsl:transform>`입니다.
    
    -   두 선언은 완전히 동일하게 쓰입니다.
-   XSLT 요소, 속성에 접근하기 위해서는 XSLT 네임스페이스를 선언해야합니다. 아래 예제에 있는 version은 W3C 공식 XSLT 네임스페이스를 쓰면 꼭 포함시켜야 하는 부분입니다.
    
    -   `<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">`
-   만약 XML 문서를 XHTML로 변환하고 싶다면 XSL을 만든 후에 XML 문서에 XML 링크를 추가하면 됩니다.
    
    -   `<?xml-stylesheet type="text/xsl" href="cdcatalog.xsl" ?>`

**1. 다음 XML 문서를 XHTML 문서로 변환 하려고 합니다. Ex) (“cdcatalog.xml”)**

```xml
<?xml version="1.0"  encoding="UTF-8"?>  
<catalog>  
	<cd>  
		<title>Empire Burlesque</title>  
		<artist>Bob Dylan</artist>  
		<country>USA</country>  
		<company>Columbia</company>  
		<price>10.90</price>  
		<year>1985</year>  
	</cd>  
</catalog>

```

**2. XSL 스타일 시트를 만듭니다. (“cdcatalog.xsl”)**

```xml
<?xml version="1.0"  encoding="UTF-8"?>  
  
<xsl:stylesheet version="1.0"  
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">  
  
<xsl:template match="/">  
<html>  
	<body>  
	<h2>My CD Collection</h2>  
		<table border="1">  
			<tr bgcolor="#9acd32">  
				<th>Title</th>  
				<th>Artist</th>  
			</tr>  
			<xsl:for-each select="catalog/cd">  
			<tr>  
				<td><xsl:value-of select="title"/></td>  
				<td><xsl:value-of select="artist"/></td>  
			</tr>  
			</xsl:for-each>  
		</table>  
	</body>  
</html>  
</xsl:template>  
</xsl:stylesheet>

```

**3. XSL 스타일 시트를 XML 문서에 연결합니다. xml 파일에 링크만 추가하면 됩니다.(“cdcatalog.xml”)**

```xml
<?xml version="1.0"  encoding="UTF-8"?>  
<?xml-stylesheet type="text/xsl"  href="cdcatalog.xsl"?>  
<catalog>

```

## `<xsl:template>`  Element

-   XSLT 프로세서가 XSLT 문서에서 가장 먼저 찾는 요소가 바로 템플릿 요소입니다.
    
-   Template은 XML 문서의 어느 부분(특정 node)을 어떻게 변환할 것인지 결정하는 역할을 합니다. 문서 전체를 변경하거나 일부분만 선택적으로 변환할 수도 있습니다. 즉, 입력 문서의 특정 부분에 적용되어 출력 문서의 어느 부분에 삽입되는지를 정의한다고 볼 수 있습니다.
    
-   template에는 3가지 속성이 있습니다.
    
    -   **match 속성**  -  **XML 문서의 위치를 지정하기 위해 XPath 표현식을 사용합니다.**  템플릿 규칙을 입력하기 위해서는 반드시 문서의 root(/)를 지정해야 합니다.
        
        -   `<xsl:template match="/”>`  //XML문서 루트( = XML 문서 전체)와 매치
        -   `<xsl:template match=”/student”>`  //XML문서 루트의 자식 요소인 요소와 매치합니다.
    -   **name 속성**  - 템플릿에 이름을 지정하는 속성입니다. 이 속성을 사용한 템플릿은 요소로 호출할 수 있습니다.
        
    -   **priority 속성**  - 적용 가능한 템플릿이 여러 개 정의되었을 때 우선순위를 지정하는 속성입니다. priority 속성 값이 크면 클수록 우선순위가 높습니다.
        
    -   **mode 속성**  - XML 문서에서 동일한 부분에 적용할 템플릿이 여러 개일 때, 원하는 템플릿만 호출하는 속성입니다. 또한 소스 트리의 동일한 부분을 여러 번 처리해야 할 경우에도 사용합니다.
        
-   예를 들어 아래와 같이 정의한 XSL 문서는 어떤 XML 문서에도 동일한 결과를 나타냅니다.  **왜냐하면 XML 문서의 최상위 문서 루트에 매치하므로 XML 문서 전체를 <xsl:template match="/”>안에 있는 코드로 바꾸기 때문입니다.**  참고로 XSLT 프로세서는 template 요소 아래에 나오는 html 태그들은 단순히 렌더링만 거칩니다.
    

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/”>
	<html><body>
		<h1>hello world</h1>
	</body></html>
</xsl:template>

```

## `<xsl:apply-templates>`  Element

-   XSLT에서 template 자식요소는 자동으로 처리되지 않습니다. 자식 요소를 처리하려면 요소를 정의해야 합니다. 두 가지 경우가 있습니다.
    
    -   **기본 템플릿인  `<xsl:apply-templates/>`  만 정의하는 경우**  : XML 문서에서 현재 요소의 모든 자식요소에 대해 매치되는 template을 찾아서 적용하게 합니다. 노드탐색방법은 DFS(Depth Fisrt Search)을 사용합니다.
        
    -   `<xsl:apply-templates select="???"/>`처럼 select 속성을 이용하는 경우 : 특정 자식 요소만 선택되거나 자식 요소가 아닌 다른 요소가 선택됩니다.
        

cdcatalog.xml파일입니다. 여기서 잘 보셔야할 것은 각 노드의 구조입니다.

1.  모든 것을 포함하는 최상위 가상 루트노드인  `/`가 가장 위에 있습니다.
2.  그 다음에 실질적인 루트노드, 1개의  `<catalog>`가 있습니다.
3.  그 아래에 3개의  `<cd>`노드가 있습니다.
4.  각각  `<cd>`노드 안에는  `<title><artist>...<year>`가 있습니다.
5.  트리 구조를 생각하면 쉽습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl"  href="cdcatalog.xsl"?>
<catalog>
  <cd>
    <title>Empire Burlesque</title>
    <artist>Bob Dylan</artist>
    <country>USA</country>
    <company>Columbia</company>
    <price>10.90</price>
    <year>1985</year>
  </cd>
  <cd>
    <title>Hide your heart</title>
    <artist>Bonnie Tyler</artist>
    <country>UK</country>
    <company>CBS Records</company>
    <price>9.90</price>
    <year>1988</year>
  </cd>
  <cd>
    <title>Greatest Hits</title>
    <artist>Dolly Parton</artist>
    <country>USA</country>
    <company>RCA</company>
    <price>9.90</price>
    <year>1982</year>
  </cd>
<catalog>

```

cdcatalog.xsl파일입니다. 여기서 잘 보셔야할 것은 appy-templates에 select 속성이 있고 없고의 차이입니다.

6.  일단 xml 파일부터 보겠습니다. 맨 처음 xml 문서를 해석하는데  `<?xml-stylesheet type="text/xsl" href="cdcatalog.xsl"?>`가 있습니다. xsl 파일로 넘어갑니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <body>
  <h2>My CD Collection</h2>  
  <xsl:apply-templates/>  
  </body>
  </html>
</xsl:template>

<xsl:template match="cd">
  <p>
    <xsl:apply-templates select="title"/>  
    <xsl:apply-templates select="artist"/>
  </p>
</xsl:template>

<xsl:template match="title">
  Title: <span style="color:#ff0000">
  <xsl:value-of select="."/></span>
  <br />
</xsl:template>

<xsl:template match="artist">
  Artist: <span style="color:#00ff00">
  <xsl:value-of select="."/></span>
  <br />
</xsl:template>

</xsl:stylesheet>

```

7.  전체 문서를 정의하는  `<xsl:template match="/">`가 있습니다. 그러면 새로운 문서파일(resulttree파일)을 여기 안에 있는 코드(`<xsl:template match="/">..여기!..</xsl:template>`)로 바꾸게 됩니다.
8.  html 코드로 잘 내려가다가  `<xsl:apply-templates/>`가 있습니다. 그러면 xml 파일에 있는 노드 순서(DFS 방식)대로 xsl 파일에 match 속성에 있는 것을 찾습니다.
9.  처음에 xml 파일에 실질적인 루트노드로  `<catalog>`가 있습니다. 그러나 xsl에 match되는 template이 없기 때문에 넘어갑니다.
10.  그 다음에  `<cd>`가 있습니다. xsl에 match되는 template이 있습니다. 그 안의 속성대로 바꿔줍니다. 즉, resulttree에는 아래와 같이 되어있습니다.

```xml
  <html>
  <body>
  <h2>My CD Collection</h2>  
  <p>
    <xsl:apply-templates select="title"/>  
    <xsl:apply-templates select="artist"/>
  </p>
  <p>
    <xsl:apply-templates select="title"/>  
    <xsl:apply-templates select="artist"/>
  </p>
  <p>
    <xsl:apply-templates select="title"/>  
    <xsl:apply-templates select="artist"/>
  </p>
  </body>
  </html>

```

11.  여기서는 apply-template이 select되어있으므로 바로 title, artist가 match되는 게 있는지 찾아봅니다. 둘 다 있으므로 적용시켜주면 아래의 코드와 같이 됩니다.

```xml
  <html>
  <body>
  <h2>My CD Collection</h2>  
  <p>
  Title: <span style="color:#ff0000">
  <xsl:value-of select="."/></span>
  <br />
  Artist: <span style="color:#00ff00">
  <xsl:value-of select="."/></span>
  <br />
  </p>
  <p>
  Title: <span style="color:#ff0000">
  <xsl:value-of select="."/></span>
  <br />
  Artist: <span style="color:#00ff00">
  <xsl:value-of select="."/></span>
  <br />
  </p>
  <p>
  Title: <span style="color:#ff0000">
  <xsl:value-of select="."/></span>
  <br />
  Artist: <span style="color:#00ff00">
  <xsl:value-of select="."/></span>
  <br />
  </p>
  </body>
  </html>

```

12.  그 다음은 value-of이므로 xml에 있는 현재 속성값을 빼와서 적용시켜줍니다. 그러면 이제 저희가 알던 html과 같은 파일(result tree)이 되는 것입니다. .

## `<xsl:value-of>`  Element

-   `<xsl:value-of>`  요소는 선택된 노드의 값을 추출합니다.
    
-   위 예제에서 태그에 들어가는 부분(`<xsl:value-of select="catalog/cd/artist/">`)이 xsl:value-of인데  `.`  을 넣음으로서 XPath를 이용해 XML 문서에서 한 행의 데이터만 복사됐습니다.
    

## `<xsl:for-each>`  Element

-   `<xsl:for-each>`  요소는 지정된 노드 집합의 선택된 모든 XML 요소를 loop하여 사용할 수 있습니다.
    
-   가령,  `<xsl:for-each select="catalog/cd"></xsl:for-each>`  안에 들어가는 것들처럼요.
    
-   xsl:for-each 요소의 selelct 속성에 기준을 추가하여 XML 파일의 출력을 filtering할 수 있습니다. <xsl:for-each select = “catalog/cd[artist = ‘Bob Dylan’]”> 과 같이 필터링할 수 있습니다.
    
    -   필터링 연산자는 =, !=, &lt, &gt가 있습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<xsl:stylesheet version="1.0"  
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">  
  
<xsl:template match="/">  
<html>  
<body>  
<h2>My CD Collection</h2>  
<table border="1">  
<tr bgcolor="#9acd32">  
<th>Title</th>  
<th>Artist</th>  
</tr>  
<xsl:for-each select="catalog/cd">  
<tr>  
<td><xsl:value-of select="title"/></td>  
<td><xsl:value-of select="artist"/></td>  
</tr>  
</xsl:for-each>  
</table>  
</body>  
</html>  
</xsl:template>  
  
</xsl:stylesheet>

```

## `<xsl:sort>`  Element

-   출력을 정렬하려면 XSL 파일의 xsl:for-each요소 내에 xsl:sort요소를 추가하기만 하면 됩니다.
    
-   select 속성은 어떤 XML 요소를 정렬할 것인지를 가리킵니다.
    

-   sort문법
    
    -   select = string-expression // 노드를 정렬하기 위해 기준이 되는 키(key)를 명시합니다.
        
    -   lang = { nmtoken } // 정렬 순서를 결정하는데 사용되는 영문자를 명시합니다
        
    -   data-type = { “text” | “number” | qname-but-not-ncname } // 텍스트의 타입을 명시합니다
        
    -   order = { “ascending” | “descending” } // 정렬 순서를 명시하며, 기본 설정값은 오름차순(ascending)입니다.
        
    -   case-order = { “upper-first” | “lower-first” } /> // 대소문자에 의한 문자열의 정렬 순서를 명시하며, 기본 설정값은 대문자가 먼저(upper-first)나옵니다.
        
        -   case-order = “upper-first” 이면 A, a, B, b, C, c 의 순
            
        -   case-order = “lower-first” 이면 a, A, b, B, c, C 의 순
            

아래 예시는 title값을 기준으로 정렬하되 데이터타입은 text 이고 오름차순 정렬으로 하는 것입니다.

```xml
<xsl:for-each select="catalog/cd">  
<xsl:sort select="artist"/>  
<tr>  
<td><xsl:value-of select="title"/></td>  
<td><xsl:value-of select="artist"/></td>  
</tr>  
</xsl:for-each>

```

## `<xsl:if>`  Element

-   xsl:if 요소는 XML 파일의 내용에 대해서 test라는 조건을 수행하는데 사용됩니다.
    
-   <xsl:if test=“expression”> output </xsl:if>
    
    -   expression이 true라면 output(태그 사이)에 나옵니다.

```xml
<xsl:if test="price &gt; 10">  
<tr>  
<td><xsl:value-of select="title"/></td>  
<td><xsl:value-of select="artist"/></td>  
<td><xsl:value-of select="price"/></td>  
</tr>  
</xsl:if>

```

## `<xsl:choose>`  Element

-   `<xsl:choose>`요소는  `<xsl:when>`  및  `<xsl:otherwise>`와 함께 사용되어 여러 조건을 나타냅니다. XSL 파일에 넣으면 됩니다.
    
-   if문과 else처럼 if쓰고, if쓰고, else를 쓸 수도 있습니다.
    

```xml
<xsl:for-each select="catalog/cd">  
<tr>  
<td><xsl:value-of select="title"/></td>  
<xsl:choose>  
<xsl:when test="price &gt; 10">  
<td bgcolor="#ff00ff">  
<xsl:value-of select="artist"/></td>  
</xsl:when>  
<xsl:otherwise>  
<td><xsl:value-of select="artist"/></td>  
</xsl:otherwise>  
</xsl:choose>  
</tr>  
</xsl:for-each>

```

## XSLT - On the Client

-   XSLT는 당신의 브라우저 안에서 문서를 XHTML로 바꾸기도 합니다.
    
-   JavaScript 솔루션
    
    -   지금까지 XSLT를 사용하여 XML 문서를 XHTML로 변환하는 방법을 설명했습니다.
        
    -   우리는 XSL style sheet를 XML 파일에 추가하고 브라우저가 변환을 수행하도록 했습니다.
        
    -   그러나 XML 파일에 XSL 링크를 포함시키는 건 바람직하지 않습니다. 왜냐하면 XSLT가 먹히지 않는 브라우저도 있기 때문입니다.(크롬 같은 경우 먹히지 않습니다. 푸는 방법은 따로 XAMPP라는 걸 이용해야 된다고 합니다. 보안때문에 그렇다고 하는데 아마도 대부분은 서버에서 변환하고 주기 때문에 그런 것 같습니다.  [https://www.codingforums.com/xml/343437-xslt-chrome.html](https://www.codingforums.com/xml/343437-xslt-chrome.html)  참조)
        
    -   좀 더 좋은 해결책은 JavaScript를 사용하여 변환을 수행하는 것입니다.
        
    -   JavaScript를 사용하면 다음을 수행할 수 있습니다.
        
        -   브라우저 별 테스트 수행
            
        -   브라우저와 사용자 요구에 따라 다른 스타일 시트 사용
            
    -   XSLT의 목표 중 하나는 데이터를 한 형식에서 다른 형식으로 변환하여 다양한 브라우저와 사용자 요구 사항들을 지원하는 것입니다.
        

### 자바스크립트를 사용하여 XSLT 스타일을 이용하여 XHTML로 변환하는 소스

```xml
<!DOCTYPE html>
<html>
<head>
<script>
function loadXMLDoc(filename)
{
if (window.ActiveXObject)
{
xhttp = new ActiveXObject("Msxml2.XMLHTTP");
}
else
{
xhttp = new XMLHttpRequest();
}
xhttp.open("GET", filename, false);
try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
xhttp.send("");
return xhttp.responseXML;
}
function displayResult()
{
//XML과 XSL을 로드한다.
xml = loadXMLDoc("cdcatalog.xml");
xsl = loadXMLDoc("cdcatalog.xsl");
// code for IE
if (window.ActiveXObject || xhttp.responseType == "msxml-document")
{
//XSL을 XML에 적용시킨다.
ex = xml.transformNode(xsl);
//스타일이 적용된 XML을 ID가 example인 최근 문서에 적용한다.
document.getElementById("example").innerHTML = ex;
}
// code for Chrome, Firefox, Opera, etc.
else  if (document.implementation && document.implementation.createDocument)
{
//객체를 생성해서 XSLT를 import한다.
xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xsl);
resultDocument = xsltProcessor.transformToFragment(xml, document);
document.getElementById("example").appendChild(resultDocument);
}
}
</script>
</head>
<body onload="displayResult()">
<div id="example" />
</body>
</html>

```

## XSLT - On the Server

-   모든 종류의 브라우저에서 XML 데이터를 사용할 수 있도록 server에서 XML 문서를 변환하여 XHTML로 브라우저로 다시 보낼 수 있습니다.
    
-   전의 설명에서는 변환을 위해 JavaScript와 XML Parser를 사용했습니다. 그러나 XML parser가 없는 브라우저에서는 작동하지 않습니다. 모든 종류의 브라우저에서 XML 데이터를 사용할 수 있도록 하기 위해 서버에서 XML 문서를 XHTML로 변환하고 작업이 끝난 그 파일을 브라우저로 보낼 수 있습니다.
    
-   브라우저에서 했던 작업과 마찬가지로 데이터를 서버에서 어떠한 형식을 다른 형식으로 변환하여 다양한 브라우저와 사용자 요구 사항들을 지원하는 것이 목표입니다.
    
-   XML 파일에는 XSL 파일에 대한 참조가 없으므로 XML 파일은 다양한 XSL style sheet를 사용하여 변환될 수 있음을 나타냅니다.
    

### XML 데이터를 이용한 JSP 연동

-   JSP 에서는 JSTL이라는 자바표준태그라이브러리를 사용하여 그중 xml태그를 이용하여 XML을 JSP 와 연동합니다.  
    XML파일입니다. (books.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
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

```

XSL 파일입니다. (style.xsl)

```xml
<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version = "1.0">
	<!-- output format을 정의한다. default가 xml로 되어있으나 root node가 html이라면 html로 된다. -->
	<!-- indent는 output이 계층 구조에 따라 indent가 있냐(yes) 없냐(no)를 뜻한다-->
	<xsl:output method = "html" indent="yes"/>
	<xsl:template match="/">
		<html>
			<body>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match = "books">
		<table border = "1" width = "100%">
			<xsl:for-each select = "book">
				<tr>
					<td>
						<i><xsl:value-of select = "name"/></i>
					</td>
					<td>
						<xsl:value-of select = "author"/>
					</td>
					<td>
						<xsl:value-of select = "price"/>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>

</xsl:stylesheet>

```

JSP 파일입니다.

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- JSTL을 사용하기 위한 태그 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
 
<html>
<head>	
  <title>JSTL x:transform Tags</title>
</head>
<body>
<h3>Books Info:</h3>

<!-- import는 url을 입력해서 외부에 있는 걸 넣을 수 있다. url은 다를 수 있다. -->
<c:import url="http://localhost:8181/jstlex1/books.xml" var="xmltext"/>
<c:import url="http://localhost:8181/jstlex1/style.xsl" var="xslt"/>

<x:transform xml="${xmltext}" xslt="${xslt}"/>
 
</body>
</html>

<!-- 속성을 뽑는 예제는 주석처리했습니다.
<c:import var="bookInfo" url="http://localhost:8181/jstlex1/books.xml"/>
<x:parse xml="${bookInfo}" var="output"/>
<b>The title of the first book is</b>: 
<x:out select="$output/books/book[1]/name" />
<br>
<b>The price of the second book</b>: 
<x:out select="$output/books/book[2]/price" />
-->

```

#### reference

-   [https://www.w3schools.com/xml/xsl_intro.asp](https://www.w3schools.com/xml/xsl_intro.asp)
-   [https://www.tutorialspoint.com/jsp/jstl_xml_transform_tag.htm](https://www.tutorialspoint.com/jsp/jstl_xml_transform_tag.htm) 
