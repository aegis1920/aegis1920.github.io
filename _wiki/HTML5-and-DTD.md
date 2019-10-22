---
layout  : wiki
title   : HTML5와 DTD에서의 궁금증
summary : 
date    : 2019-06-21 13:28:19 +0900
updated : 2019-06-21 13:30:24 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

# HTML5와 DTD에서의 궁금증

맨 처음 HTML과 CSS를 배웠을 때는 버전이 있는 지도 몰랐습니다. 그러다가 점차 배우게 되면서 가장 현재의 버전은 HTML5와 CSS3라는 걸 알게 됐고 XML을 배우고 DTD도 배우면서 HTML4.1때나 XHTML에서는 지금과는 달리 매우 긴 DTD를 가졌다는 것을 알게 됐습니다. 버전이 바뀌면서 태그들이 추가되고 삭제된 것도 있지만 그건 찾아보면 바로 나오기 때문에 굳이 적진 않겠습니다.

그렇게 찾아보면서 몇 가지 궁금증이 생긴 것을 블로그에 적어보려고 합니다.

## 첫 번째, HTML 4.01의 DTD에서 나타나는 SYSTEM이 아닌 PUBLIC은 뭘까?

HTML 4.01에는 여러 가지 버전으로 나눠집니다. strict, Transitional , Frameset 등인데 비슷하므로 여기서는 strict만 보겠습니다. 그리고 XHTML 1.0도 HTML 4.01에서 XML으로 포팅한 것이므로 굳이 찾아보지 않겠습니다.

HTML 4.01 strict의 선언을 보면 아래의 코드와 같이 DOCTYPE이 선언되어있습니다.  
`<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

여기서 의문이 든 건 외부의 URI를 쓸 때 SYSTEM만 사용하는 것으로 알고 있었는데 PUBLIC이 있으니 궁금해서 위키백과로 찾아봤습니다.

> DTD는 주로 두 가지 구조로 사용됩니다.
> 
> -   `<!DOCTYPE 루트요소 PUBLIC "FPI" "URI">`
>     -   PUBLIC은 DTD가 공개되어있으며 FPI를 부여받았다는 뜻입니다.
> -   `<!DOCTYPE 루트요소 SYSTEM "URI">`
>     -   SYSTEM은 PUBLIC과 달리 FPI가 없을 때 사용합니다.

그러면 FPI는 뭘까요? 그래서 또 찾아봤습니다.

### FPI(Formal Public Identifier)

-   product, 사양, 문서를 고유하게 식별하는데 사용할 수 있는 문서를 고유하게 식별하는데 사용할 수 있는 특수 형식의 짧은 텍스트. 그러나 최근에는 URI와 UUID가 일반적으로 객체를 고유하게 식별하는데 사용됩니다. 그러나 FPI는 예전 시스템이 됐습니다.
    
-   예를 들어, HTML 4.01에 나타나는  `"-/ /W3C //DTD HTML 4.01 // EN"`같은 경우.
    

옛날에는 FPI와 URI를 같이 쓰는 것을 볼 수 있었습니다. 하지만 지금은 URI로 충분하니까(?) 점차 쓰지 않는 것 같습니다. 그래서 책이나 튜토리얼 같은 곳에서도 SYSTEM만 알려주고 있는 것 같고…

## 두 번째, 왜 HTML4에서 잘 쓰던 DTD를 HTML5에서는 없앴을까?

아시다시피 HTML 5에서는 DOCTYPE 선언이 매우 쉽습니다.  `<!DOCTYPE html>`만 쓰면 끝납니다. 저는 여기서 DTD가 있어야 유효성을 검사할 수 있으니까 더 정확하고 좋은데 왜 없앴을까 하는 생각이 들었습니다. 그렇게 찾고 찾다가 몇 가지 답을 얻을 수 있었습니다.

1.  HTML 4.01은 SGML기반입니다.
2.  HTML 5는 SGML을 기반으로 하지 않습니다. 그러므로 DTD 또한 필수가 아닙니다.
3.  **HTML 5의 설계자가 말하길, DTD는 표현력에 너무 한계가 있다고 생각하며 HTML 5의 Validator 또한 DTD 기반으로 한 Validator가 아니라 스키마와 adhoc을 검사합니다.**

### SGML(Standard Generalized Markup Language)

-   마크업 언어를 정의하기 위한 메타 언어. 다양한 마크업 구문을 제공합니다. SGML 선언을 변경함으로써 꺽쇠 괄호를 사용하지 않는 것도 가능합니다. 그러나 너무 복잡한 이유로 소규모 범용 목적으로 사용하는데 걸림돌이 되었다고 합니다.

그냥 설계자의 마음이었던가…? 조금 허무하네요. 정확히 알고 계시는 분이 있다면 댓글 남겨주시길 바랍니다.

#### reference

-   [https://stackoverflow.com/questions/4053917/where-is-the-html5-document-type-definition](https://stackoverflow.com/questions/4053917/where-is-the-html5-document-type-definition)
-   [https://en.wikipedia.org/wiki/Formal_Public_Identifier](https://en.wikipedia.org/wiki/Formal_Public_Identifier)
-   [http://diveintohtml5.info/semantics.html](http://diveintohtml5.info/semantics.html)
-   [https://namu.wiki/w/HTML?from=XHTML](https://namu.wiki/w/HTML?from=XHTML)
-   [https://www.reddit.com/r/web_design/comments/3dqfqt/why_is_the_html5_doctype_so_simple/](https://www.reddit.com/r/web_design/comments/3dqfqt/why_is_the_html5_doctype_so_simple/)
-   [https://www.w3schools.com/tags/ref_html_dtd.asp](https://www.w3schools.com/tags/ref_html_dtd.asp)
-   [https://ko.wikipedia.org/wiki/SGML](https://ko.wikipedia.org/wiki/SGML)
