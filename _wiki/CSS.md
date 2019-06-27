---
layout  : wiki
title   : CSS
summary : 
date    : 2019-06-20 15:20:01 +0900
updated : 2019-06-27 17:48:49 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# CSS(Cascading Style Sheets)

## CSS란?

* Cascading Style Sheets의 약자. 구조화된 HTML에 CSS를 입혀 꾸민다고 생각하면 된다.

* 스타일 태그를 쓰는 방법은 여러 가지가 있지만 보통 `<head>`태그 안에 `<style>`태그를 쓰고 그 안에 CSS 코드를 쓰거나 외부 CSS 파일로 만든다. 아니면 태그 안에 직접 넣어줄 수도 있다.

### 우선순위

* CSS를 적용할 때의 우선순위는 대상을 좁힐 때 우선순위가 높아진다.
* 우선순위는 `!important > style property > id selector > class selector > tag selector > 브라우저의 기본 스타일`이다.

## 선택자

* `<body>`안에 있는 모든 태그에 적용시키려면 그냥 태그 이름만 쓰면 된다. 
* `header h1, h2 { color : red; }`는 `header h1`과 `h2` 선택자를 말한다. 구분을 잘해야 한다.
* `id`라면 `#`
* `class`라면 `.`을 쓴다.  

### 자식 태그에 스타일 적용

* 자식 태그의 속성에 스타일을 적용시키려면 `#lecture > li`처럼 `>`를 사용한다.
* h1 태그의 바로 뒤에 위치하는 h2 태그의 color 속성에 red 키워드를 적용려면 `h1 + h2 { color: red; }`
* h1 태그의 뒤에 위치하는 h2 태그의 background-color 속성에 orange 키워드를 적용하려면 `h1 ~ h2 { background-color: orange; }`

### 반응선택자

* `a:active{}, a:hover{}` 등...

## padding, border, margin

* 안주가 그 내용이라면
* border는 접시의 테두리
* padding은 안주와 접시의 공간
* margin은 접시와 접시 사이의 공간.(element와 element의 간격)

## block과 inline

* inilne 태그의 종류 : `<a>, <span>, <br>, <button>, <input>`
* inline 태그인 얘들은 크기를 줄 수 없다. 그래서 `height`이나 `width`가 먹지 않으며 `text-align:center;`속성을 줄 수 없다. 주려면 `display:block;`으로 줘서 블럭 형태로 만들고 줘야 한다.
* 참고로 `display:none;`으로 안 보이게 할 수도 있다.
* 배치는 인라인스럽게하면서 크기를 주고싶다면 inline-block이다.

## float

* `float:left;`를 써주면 왼쪽으로 부유하게 만들어서 밑에 있는 block 형태의 태그들이 옆으로 오게 된다. 그러면서 그다음에 오는 내용들도 빈자리를 채우려 올라오게 되는데 이 때 이 효과를 다시 없애주려면 floating하는 얘들은 wrapping하는 박스를 만들고 여기에다 `ovreflow:hidden;`을 주면 된다. 

## position

* `position:static`은 기본값이다. (위치를 지정하지 않은 ) 여기에다 left와 top을 줘도 안 먹힌다. `position:relative`는 그와 관계된 곳에서부터 left와 top을 적용한다. (여기선 parent가 기준)

* relative : 원래 자기 자신의 static 위치를 기준으로 상대적 위치를 말한다

* absolute : 부모 위치를 기준으로 절대적인 위치(부모가 relative여야 한다.  + 높이 지정을 해줘야 한다.) 만약 부모의 position 타입이 지정되지 않았을 경우에는 화면의 위치상 left, top을 지정해주면 된다. 

```css
#parent, #other, #grand{
    border:5px solid tomato;
}
#grand{
    position: relative;
}
#me{
    background-color: black;
    color:white;
    position: absolute;
    left:0;
    top:0;
}
```

## 나머지 속성들과 tip

### font-size

```css
#px{font-size: 16px} /*px는 사용자 기반에 따라서 달라지지 않는다. */
#rem{font-size: 1rem} /*rem은 구글 설정에서 설정 크기를 바꾸면 글자 크기도 바뀐다. */
```

### font-family

* font-family가 의미하는 건 이렇게 여러개를 지정해 놓으면 이 중 하나가 나옴. 모든 컴퓨터에 다 나올 수 없으니까.
* `font-family: verdana, "Helvetice Neue" serif;`

### margin collapsing

* border가 있을 때는 마진 겹침현상이 없는데 border를 없애면 아예 child가 갖고있는 마진이 사라진다. 더 큰 쪽의 마진이 적용됌

```css
#parent{
    /*border:1px solid tomato;*/
    margin-top:100px;
    border: solid
}
#child{
    border: solid 5px;
    background-color: powderblue;
    margin-top:50px;
}
```

### SVG

* 비트맵과 벡터의 차이 비트맵은 비트 하나하나를 기억해서 저장하기 때문에 확대하면 깨지지만 벡터는 깨지지 않는다.수학적으로 표현하기때문 png는 비트표준 svg는 벡터표준이다.

### transition

* 요소의 변화를 일정 기간동안 일어나게 하면서 hover나 onclick에 의해서 동작한다.

### transform

* transform은 형식이 엄청 많다. 이동시킬 수도 있고 옆으로 뒤로 눕힐 수도 있다.

* transform에는 마우스를 호버했을 때 효과를 다양하게 줄 수 있는데 효과 매우 다양하다. 그래서 라이브러리를 이용해 따로 추가해서 한 줄의 코드로 쉽게 사용할 수도 있다. transition과 같이 쓰면 다양성이 무궁무진하다

```css
h1:hover{
            transform:scale(1.5);
            transform-origin: 100% bottom;
            transition: all 1s;
        }
```

### minify

* 코드를 줄여서(공백이나 개행 삭제) 경량화할 수 있다. 하지만 코드가 적거나 사용자 수가 적은 경우에는 굳이 경량화를 하지 않아줘도 된다. 

### mediaquery

* media query는 화면의 종류와 크기에 따라서 디자인을 달리 줄 수 있는 CSS의 기능이다. 즉, 모바일에서도 예쁘게 보일 수 있는 반응형 디자인의 초석이다.
* mediaquery를 주려면 @media를 쓴다. ()에는 화면 크기가 어떻게 되면 줄건지 {}에는 그 안에 어디다 줄 건지 + 어떻게 줄 건지 쓰면 된다. max-width는 600px이하일 때(즉, 최대 600px)를 말한다.

```css
@media (max-width:600px){
            body{
                background-color:green;
            }
        }
```

## meta 태그

* 웹 서버와 웹 브라우저 간에 상호 교환되는 정보를 정의하는데 사용한다. 디자인에 전혀 영향을 미치지 않으며 문서가 어떤 내용인지, 키워드는 무엇인지, 누가 만들었는지 등 말 그대로 문서의 메타 정보를 담고있다고 생각하면 된다.
* `name`에는 정보 이름, `content`에는 정보 내용을 저장한다.
* 'http-equiv' 속성은 이 값으로 서버나 사용자의 작동방식을 변경할 수 있는 지시를 정의할 수 있다. 기본 언어라든지, 브라우저 환경설정이라든지, MIME 타입 등을 설정해줄 수 있다
* `property`를 설정해주면 이 페이지가 링크 걸릴 때 보여주고 싶은 정보들을 보여줄 수 있다.(카카오톡 등...)


