---
layout  : wiki
title   : Ajax
summary : 
date    : 2019-07-05 17:05:42 +0900
updated : 2019-08-05 17:58:19 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# AJAX 

* 이 기술은 웹에 데이터를 갱신할 때, 브라우저 새로고침 없이 서버로부터 데이터를 받는 것이 좋겠다는 생각에서 출발했다.
* addEventListener는 자기 자신 안에 있는 콜백함수, 즉 function()을 이벤트 큐에 보관을 해놓는다.
* 그리고 나서 open과 send가 되어 AJAX요청을 보내서 전송이 된다.
* ajax()라는 함수는 반환이 된다
* AJAX 응답이 왔으면 그때 이벤트 큐에 있던 콜백함수가 실행이 된다. 이미 AJAX에서 빠져나와 나중에 실행이 되는 것
ajax라는 함수는 open하고 send하고 끝. 


```
function ajax(data) {
 var oReq = new XMLHttpRequest();
 oReq.addEventListener("load", function() {
   console.log(this.responseText);
 });    
 oReq.open("GET", "http://www.example.org/getData?data=data");//parameter를 붙여서 보낼수있음. 
 oReq.send();
}
```
addEventListener의 매개변수로 있는 익명함수는 open()이나 send()보다 더 늦게 실행되는 비동기 함수다. 이벤트 큐에 보관되다가 load 이벤트(서버로부터 데이터를 브라우저가 받으면) 그 때 call stack에 실행되고 있는 함수가 없어서 비어있다면 stack에 올라와서 실행된다. 

서버로부터 받은 JSON 데이터는 문자열 형태이므로 바로 실행할 수 없고 `JSON.parse()`를 이용해 자바스크립트 객체로 변환해야 데이터에 접근할 수 있다.

XHR 통신은 다른 도메인 간에 보안을 이유로 요청이 안 된다. 이를 회피하기 위해서 JSONP, CORS라는 방법이 쓰이고 있다.




