---
layout  : wiki
title   : Ajax
summary : 
date    : 2019-07-05 17:05:42 +0900
updated : 2019-08-16 20:29:33 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# AJAX 

## AJAX의 역사

* 일부 데이터만 갱신하고 싶어도 페이지 전체를 받아와야하기 때문에 낭비가 많았다.
* MS가 iframe을 도입해 콘텐츠를 비동기 방식으로 로딩할 수 있는 방법을 찾아냈다.
* 그 이후 MS가 만든 XMLHTTP Active X 기술을 모질라가 받아들여 XMLHttpRequest를 만든다.
* 그리고 나서 AJAX라는 용어가 나타났는데 그 의미는 웹 클라이언트 측에서 Page Refresh 없이 비동기적으로 콘텐츠를 변경하기 위해 사용하는 모든 기술을 지칭한다는 것이었다.

## AJAX를 쓰는 방법

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
 oReq.open("GET", "http://www.example.org/getData?data=data"); //parameter를 붙여서 보낼수있음. 
 oReq.send();
}
```
addEventListener의 매개변수로 있는 익명함수는 open()이나 send()보다 더 늦게 실행되는 비동기 함수다. 이벤트 큐에 보관되다가 load 이벤트(서버로부터 데이터를 브라우저가 받으면) 그 때 call stack에 실행되고 있는 함수가 없어서 비어있다면 stack에 올라와서 실행된다. 

서버로부터 받은 JSON 데이터는 문자열 형태이므로 바로 실행할 수 없고 `JSON.parse()`를 이용해 자바스크립트 객체로 변환해야 데이터에 접근할 수 있다.

XHR 통신은 다른 도메인 간에 보안을 이유로 요청이 안 된다. 이를 회피하기 위해서 JSONP, CORS라는 방법이 쓰이고 있다.

## jQuery를 이용한 방법

```javascript
 $.ajax({
   type:"GET",
   url:"/test",
   dataType:"JSON",
   success : function(data) {
         // 성공했을 때
   },
   complete : function(data) {
         // 통신을 실패했으나 완료됐을 때
   },
   error : function(xhr, status, error) {
         alert("에러발생");
   }
 });
```




