---
layout  : wiki
title   : Node.js
summary : 
date    : 2019-07-10 09:25:22 +0900
updated : 2019-07-10 10:36:29 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# Node.js

## Node.js란?

* 구글 크롬의 자바스크립트 엔진(V8)으로 빌드된 Javascript 런타임
* 웹 서버가 아니다
* Node.js는 코드를 실행할 수 있는 하나의 방법
* 라이브러리의 도움을 받아 HTTP 서버를 직접 작성

## Node.js의 특징

* Node.js의 모든 API는 비동기식이라서 멈추지 않는다
* 스레드를 한 개만 사용하고 이벤트 매커니즘으로 서버가 멈추지 않고 반응해 서버의 확장성을 키워준다
* 데이터 버퍼링이 없고, 데이터를 chunk로 출력한다

## Node.js의 예시

```javascript
var http = require("http"); // 모듈을 불러올 때는  require

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type' : 'text/plain'}); // header 설정
    response.end("Hello World"); // body 설정
}).listen(8081);
console.log("Server running at http://127.0.0.1:8081");
```
## NPM

* Node Package Manager(NPM)
* Node.js 패키지/모듈 저장소, 호환성 관리
* 모듈 설치 방법
    * 글로벌(-g) 모듈 설치 - 시스템 디렉토리(usr/lib/node_modules), `npm link express`
    * 로컬 모듈 설치 - 현재 경로(~/node_modules), `var express = require('express')`

## package.json

* 패키지의 속성을 정의
* 프로젝트가 의존하는 모듈과 모듈버전의 정보를 담고 있다

## 콜백함수(callback function)

* 자바스크립트에서 function은 Object 타입이라서 변수 안에 담을 수 있고, 다른 함수로 전달해줄 수도 있고, 함수에서 만들어질 수도, 반환될 수도 있다.
* 콜백함수는 특정 함수에 매개변수로 전달된 함수를 지칭하며 그 콜백함수는 그 함수를 전달받은 함수 안에서 호출되게 한다
* 예를 들어, click 메소드에 이름이 없는 콜백함수를 인수로 전달해주면 click이 있을 때 그 콜백함수를 호출하게 설정한다.
* Node.js에선 콜백함수가 매우 많이 사용된다.
* 콜백함수를 사용하여 프로그램의 흐름을 끊지 않아 요청을 빠르게 처리할 수 있다.
* 즉, 프로그램이 메소드가 끝날 때까지 대기하지 않고 곧바로 다음 명령어로 진행한다.

## event loop

* 이벤트를 대기하는 메인 루프가 있다
* 이벤트가 감지되었을 시 콜백함수를 호출한다
* 이벤트 핸들링은 옵저버 패턴에 의해 작동된다

## 출처

* [https://velopert.com/133](velopert)
