---
layout  : wiki
title   : Ajax
summary : 
date    : 2019-07-05 17:05:42 +0900
updated : 2019-07-23 15:37:41 +0900
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

a

## hello world





