---
layout  : wiki
title   : 프론트엔드
summary : 
date    : 2020-05-03 16:07:40 +0900
updated : 2020-05-03 16:08:10 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## DOM(Document Object Model)

- 문서의 구조화된 표현을 돕는다
- 프로그래밍 언어가 `DOM` 구조에 접근할 수 있는 방법을 제공해 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다
- `tag`, `id`, `class`, `cssSelector` 를 가지고 `Element`를 가져올 수 있다.
- `Elements`, `Element` → 복수와 단수를 조심하자.
- 유연하다는 이유로 `querySelector();` 를 많이 쓴다. `querySelector()`는일치하는 첫 번째 엘리먼트만 가져온다.
- 공백조차도 `DOM` 객체에 맵핑되어있다.
- 그래서 공백 없는 자식 노드를 찾으려면 `firstElementChild` 를 사용해야 한다.
- `Element.className`은 사용하기 까다로워서 `Element.classList`를 많이 사용한다.

### DOM 탐색 속성

- childNodes
    - 엘리먼트의 자식 노드의 노드 리스트 반환(텍스트 노드, 주석 노드 포함)
- firstChild
    - 엘리먼트의 첫 번째 자식 노드를 반환. 공백까지 자식으로 본다.
- firstElementChild
    - 첫 번째 자식 엘리먼트를 반환. 공백을 자식으로 보지 않는다.
- parentElement
    - 엘리먼트의 부모 엘리먼트 반환
- nextSibling
    - 동일한 노드 트리 레벨에서 다음 노드를 반환
- nextElementSibling
    - 동일한 노드 트리 레벨에서 다음 엘리먼트 반환

### DOM 조작 메소드

- removeChild()
    - 엘리먼트의 자식 노드 제거
- appendChild()
    - 마지막 자식 노드로 자식 노드를 엘리먼트에 추가
- insertBefore()
    - 기존 자식노드 앞에 새 자식 노드를 추가
- cloneNode()
    - 노드를 복제
- replaceChild()
    - 엘리먼트의 자식 노드 바꿈
- closest()
    - 상위로 올라가면서 가장 가까운 엘리먼트를 반환

### Node 객체의 값을 제공하는 API

- Node.nodeValue
- Node.textContent

### HTML을 문자열로 처리해주는 DOM 속성 / 메소드

- innerText
    - 지정된 노드와 모든 자손의 텍스트 내용을 설정하거나 반환
- innerHTML
    - 지정된 엘리먼트의 내부 html을 설정하거나 반환. set, get 둘 다 가능
- insertAdjacentHTML()
    - HTML로 텍스트를 지정된 위치에 삽입
    - 첫 번째 인자는 위치에 해당하는 4개의 값 중 하나를 넣을 수 있고 그 위치에 넣을 태그를 두 번째 인자에 넣는다.
    - beforebegin, afterbegin, beforeend, afterend 가 있다.

## EVENT

- 사용자와 상호작용을 하기 위한 도구
- 사용자 인터페이스 이벤트
    - 페이지가 로드됐다거나, 브라우저 창의 크기가 조정된 경우
- 키보드 이벤트
    - 키를 누르거나 눌렀을 때 어떤 키가 눌렸는지 등등
- 마우스 이벤트
    - 마우스를 움직이거나 클릭했을 때
- focus, blur 이벤트
    - 브라우저를 키자마자 커서를 원하는 곳으로 위치시키거나
    - 다른 부분을 마우스로 클릭해 커서가 없어지는 것처럼 포커스를 잃게 하고 싶을 때

### 이벤트 바인딩

- 이벤트 리스너를 사용하자
- `element.addEventListener(이벤트, 호출할 함수);`
- 조심해야될 점은 호출할 함수 뒤에 `()` 가 없다

### 이벤트 흐름

- 이벤트 버블링
    - 어떤 하위 요소를 클릭했을 때 상위 요소도 중첩되어 같은 동작을 일으킨다.
    - 즉, 안에서 바깥쪽으로 전파된다
    - 이는 이벤트가 퍼져나가서 예상치 못한 오류가 일어날 수 있다.
    - 예를 들어, `ul > li > a` 태그가 있다고 가정해보자. a의 클릭 이벤트를 실행시켰을 때 ul나 li 태그에 클릭 이벤트까지도 실행시켜버린다.
- 이벤트 캡쳐링
    - 상위 요소에서 하위 요소로 전파된다.

### Event 객체

- 발생한 이벤트에 대한 정보를 제공한다
- 어떤 요소를 클릭했는지, 어떤 키를 눌렀는지에 대한 정보가 들어가있다.
- `preventDefault()`으로 이벤트의 기본 동작을 취소할 수 있다.
    - 예를 들어, a 태그에 href와 onclick이 있을 때 onclikc만 실행하고 href는 가지 않도록 하는 것.
- `stopPropagation()`으로 이벤트의 캡쳐링이나 버블링을 중단할 수 있다.
    - 예를 들어, `ul > li > a` 태그가 있다고 가정해보자. a의 클릭 이벤트에 `stopPropagation()`을 적용시키면 ul 태그나 li 태그에 클릭 이벤트가 있어도 전파되지 않는다.

### 이벤트 위임

- 상위 요소에 이벤트 핸들러를 주고 어떤 하위 요소를 포함할 것인지 검증 로직을 구현하는 것
- 예를 들어, 버튼이 3개가 있고 버튼마다 다른 동작을 하게 하려면 각각 이벤트 를 만들어 줘야 한다. 이벤트 위임을 사용하면 상위 요소에 이벤트 하나만 만들어주고 그 안에서 내가 클릭한 게 내가 찍은 게 LI 태그인지, UL 태그인지 if문으로 구별할 수 있도록 한다.
- 이렇게 작성하면 동적으로 추가되는 요소들에도 동작하게 된다.

## BOM(Browser Object Model)

- 브라우저가 제공하는 기본 API
- BOM을 사용하면 훨씬 빠르고 간단하게 프로토타이핑을 해줄 수 있다.
- BOM의 종류
    - window
        - 브라우저 창
        - alert, confirm, prompt
    - screen
        - 디스플레이 정보
    - location
        - 현재 페이지의 URL
    - navigator
        - 브라우저의 정보
    - history
        - 뒤로가기, 앞으로가기, 작성중인 메세지 같은 것들

### Viewport

- 문서가 브라우저의 크기보다 큰 경우는 스크롤이 만들어진다.
- 그래서 스크린의 크기는 모니터의 크기와 브라우저 뷰포트의 크기가 있다.
- `window.inner*`은 뷰포트의 크기를 나타내고, `screen.*`은 스크린의 크기를 나타낸다.

## 문서의 로딩

- 웹 페이지를 프로그래밍적으로 제어하기 위해서는 웹페이지의 모든 요소에 대한 처리가 끝나야 한다. 그 처리가 끝났다고 알려주는 이벤트가 `load`, `DOMContentLoaded`이다.

### load

- `load` 이벤트는 문서내의 모든 리소스(이미지, 스크립트)의 다운로드가 끝난 후에 실행된다.
- 리소스의 다운로드가 끝난 후에 실행되기 때문에 이미지나 스크립트 등에 프로그래밍을 해야된다면 `load`를 써야한다.

```jsx
function downloadImage() {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function() {
		JSON.parse(this.responseText));
        // image 다운을 하고 난 뒤의 메소드 실행
	});
	oReq.open("GET", "./api/~");
	oReq.send();
}
```

### DOMContentLoaded

- 엘리먼트 자체에 대한 화면의 처리가 끝난 다음에 발생하는 이벤트
- `DOMContentLoaded`는 문서에서 스크립트 작업을 할 수 있을 때 실행되기 때문에 이미지 다운로드를 기다릴 필요가 없다
- 로딩 속도 성능에 유리해 실무에서 가장 많이 쓰이는 방법이다.

```jsx
document.addEventListener("DOMContentLoaded", function(){
    startSomething();
});
```

## HTML Templating

- 반복적인 HTML 부분을 template으로 만들어두는 작업
- 문자열의 replace 작업을 통해 치환해줄 수 있다. 메소드 체이닝 방식으로 계속해서 호출해줄 수 있다.
- HTML Template을 따로 보관을 해둬야 하는데 두 가지 방법이 있다.
    - 양이 많은 경우 서버에서 template.html같은 파일로 보관해서 ajax로 요청해 받아올 수 있다.
    - 양이 적은 경우 HTML 코드 안에 숨겨둔다.
        - `<script id="template-list-item" type="text/template"></script>`와 같이 타입을 javascript가 아닌 다르게 적는다면 렌더링하지 않고 무시하기 때문에 `document.querySelector("#template-list-item");`으로 쉽게 가져올 수 있다.
