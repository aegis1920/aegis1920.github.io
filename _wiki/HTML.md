---
layout  : wiki
title   : HTML
summary : 
date    : 2019-06-20 15:19:42 +0900
updated : 2019-06-20 15:19:59 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# HTML

## HTML이란?

HTML(Hyper Text Markup Language)의 약자. 링크를 통해 다른 문서로 이동가능하다. 

w3c라는 국제기구에서 태그를 지우기도 하고 추가하기도 한다.

HTML에도 버전이 있는데 `<!DOCTYPE html>`을 쓰면 웹 브라우저가 아~ HTML5 표준안이구나라고 알게 된다. 예를 들어, `<!DOCTYPE html PUBLIC 뭐시기 뭐시기>`를 쓰면 웹 브라우저가 `XHTML, HTML 4.01`등등 다른 표준안이라고 인식한다.

 HTML은 본질적으로 **컨텐츠 표현하고 구조화**한다. 즉, **어떠한 정보를 TAG를 통해 전달해줄 수 있다.** 

기본 구조는 `<html>, <head>, <body>`로 이뤄진다.

## Semantic Tag

화면 구조를 위한 태그로 `<header>, <nav>, <section>, <article>, <aside>, <footer>`등등이 있다.

 ## form tag

```html
<h1>, <h6>, <a href="">, <ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th colspan="3">, <td rowspan="2">, <img src="">, <audio src="">, <video src="">, <form action="">, <input type="text">, <button>, <fieldset>, <legend>, <div>, <span>
```

등등이 있다. 

`<form>`태그는 서버로 가는 정보를 줌으로써 매우 중요하다. 

`<div>`는 block, `<span>`은 inline 형식

## HTML tip

1. 소스코드에 개행(엔터)이나 스페이스 바를 눌러도 하나를 초과하게 되면 인식하지 않아서 화면상에 나오지 않는다. 개행은 `<br>`, 스페이스 바는 `&nbsp;`를 써줘야 한다.
2. 개발자 도구의 소스코드로 나와있는 태그들은 파싱된 DOM tree다. 그래서 thead, tbody 같은 것들은 쓰지 않아도 브라우저가 렌더링하면서 만들어내기도 한다. 
3. 브라우저마다 오디오나 비디오 같이 확장자를 지원하는 형식이 모두 다르다. 그래서 오디오 파일의 형식같은 경우, 가장 많은 브라우저에서 지원이 되는 mp3 파일을 맨 위에 올리고 그 다음에 많은 부분에서 지원하지 않는 ogg를 쓰거나 하면 된다. 
   1. 브라우저마다 지원하는 방식이 달라 이에 맞게 코드를 맞춰주는 걸 **크로스 브라우징**이라고 한다. 

```html
<audio controls = "controls">
    <source src = "hello.mp3" type = "audio/mp3" />
    <source src = "hello.ogg" type = "audio/ogg" />
</audio>
```

4. form action에는 서버쪽 프로그램의 URL(Controller 역할을 하고 있는 URL)이 들어간다. 아예 ""으로 안 쓰게 되면 자기 자신으로 간다. 

### 출처

* 생활코딩
