---
layout  : wiki
title   : Ajax
summary : 
date    : 2019-07-05 17:05:42 +0900
updated : 2019-07-05 17:46:45 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# AJAX 

이 기술은 웹에 데이터를 갱신할 때, 브라우저 새로고침 없이 서버로부터 데이터를 받는 것이 좋겠다는 생각에서 출발했습니다.

ajax라는 함수는 open하고 send하고 끝. 그리고 이벤트 리스너에서 


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

## hello world





