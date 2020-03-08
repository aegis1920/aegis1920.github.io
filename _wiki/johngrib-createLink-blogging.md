---
layout  : wiki
title   : 이종립님의 createLink.html을 분석해보자
summary : 
date    : 2020-03-08 18:56:59 +0900
updated : 2020-03-08 19:19:29 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 개요

vimwiki를 쓰는 이상 vimwiki만의 패턴이 생기기 마련인데 이 부분은 어떻게 구현하든 비슷하다고 생각되어 [이종립님 블로그의 createLink.html](https://github.com/johngrib/johngrib-jekyll-skeleton/blob/v1.0/_includes/createLink.html) 을 따라했다. 다만 그대로 쓰기보다는 코드를 알고 써야 재밌으니 분석해보기로 했다.

```javascript
;(function() {
    var content = document.querySelector('article.post-content');
    content.innerHTML = content.innerHTML.replace(/\[\[(.+?)\]\]\{(.+?)\}/g, '<a href="../$1">$2</a>');
    content.innerHTML = content.innerHTML.replace(/\[\[(.+?)\]\]/g, '<a href="../$1">$1</a>');
})();
```

## 코드 분석

```javascript

;(function () {})();
```

- 위 함수는 즉시 실행 함수로 말 그대로 바로 실행하는 형태가 된다.
- 맨 앞에 `;` 을 넣어준 이유는 앞에 세미콜론이 없는 것을 방지해주는 역할로 더 안전한 코드가 된다

```javascript
var content = document.querySelector('article.post-content');
```

- 첫 번째 `article` 태그의 `post-content` 라는 이름을 갖는 클래스 선택자를 변수에 넣는다.

```javascript
content.innerHTML = content.innerHTML.replace(/\[\[(.+?)\]\]\{(.+?)\}/g, '<a href="../$1">$2</a>');
```

> 정규표현식은 언어마다 사용방법이 다르다고 한다. 

- 정규표현식을 적용해 `replace()` 해서 넣어준다
- 정규표현식의 패턴은 `/` 와 `/` 사이에 온다.
- 끝 부분의 `/` 뒤에는 조건을 줄 수 있는 수정자가 온다.
    - `g` 면 첫 번째를 찾고 난 뒤에 계속 찾는 것
    - 참고로 `i` 가 있으면 대소문자 구별 없이 찾는 것이 가능하다
- `()` 는 여러 토큰을 그룹짓게 해주는 것
- `.` 은 줄바꿈(`\n\r`) 을 제외한 모든 문자를 말한다 (문자 하나를 말한다)
- `+` 는 바로 앞 문자가 하나만 있거나 여러 개 있을 때를 찾아준다
    - 그래서 현재의 정규표현식같은 경우 `(.+)` 이니까 앞이 `[[` 이고 뒤가 `]]`이면 어떤 문자든 다 찾는다는 말이 된다
    - 여기서 문제가 생기는데 `[[hello-world]] [[hihi]]` 이런 문자열일 경우, 저 자체를 문자열 하나로 보게 된다. 그래서 `?` 가 필요하다
- `?` 는 앞에 있는 표현식이 문자냐 수량자냐에 따라 두 가지 사용법이 있다
    - 앞에 있는 표현식이 문자인 경우, 있거나 없거나로 찾아줄 수 있다.
        - `abc?` 의 경우, `ab`, `abc` 문자열 둘 다 찾아준다
    - 앞에 있는 표현식이 수량자인 경우, 가능한 적은 문자와 일치시키도록 한다. 기본적으로 수량자는 가능한 많은 문자와 일치시키려고 한다
        - 기본적으로 많은 문자와 일치시키려고 했기 때문에 `\[\[(.+)]\]` 를 사용했을 때 `[[hello-world]] [[hihi]]` 문자열을 찾았던 것이다.
        - 가능한 적은 문자와 일치시키도록 `(.+?)` 를 사용한다면 `[[hello-world]]`, `[[hihi]]` 로 따로 찾게 해줄 수 있다.

## 결론

이러한 정규표현식 결과에 따라 두 가지 패턴이 나온다

 - `[[hello]]{안녕}` -> `<a href="../hello">안녕</a>`
 - `[[hello]]` -> `<a href="../hello>hello</a>`

링크 이름을 그대로 줄 수도 있고, 내가 정해서 줄 수도 있게 됐다.

## 출처

- [https://github.com/johngrib/johngrib-jekyll-skeleton/blob/v1.0/_includes/createLink.html](https://github.com/johngrib/johngrib-jekyll-skeleton/blob/v1.0/_includes/createLink.html)
- [https://medium.com/airbnb-engineering/immediately-invoked-function-expressions-and-parentheses-eeea53b39e0b](https://medium.com/airbnb-engineering/immediately-invoked-function-expressions-and-parentheses-eeea53b39e0b)
- [https://regexr.com/](https://regexr.com/)
- [https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)
