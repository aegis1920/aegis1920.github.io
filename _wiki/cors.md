---
layout  : wiki
title   : Cross Domain 이슈, JSONP, CORS란?
summary : 
date    : 2019-08-16 20:29:56 +0900
updated : 2019-08-16 21:22:11 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## CORS란?

### Cross Domain 이슈

* XMLHttpRequest 객체는 기본적으로 동일 출처 정책(SOP, Same Origin Policy)의 제약을 받는다. 이 정책은 한 도메인의 Javascript 코드를 불러오면 해당 코드 안에서 다른 도메인의 데이터를 요청할 수 없다는 걸 의미한다.
* 이렇게 다른 도메인의 데이터를 요청할 수 없는 걸 Cross Domain 이슈라고 한다.
* 옛날의 웹 환경은 지금과 달랐기 때문에 보안적인 측면에서 SOP 제약은 당연했지만 Ajax나 OpenAPI가 활성화되면서 성가신 존재가 됐다.
* SOP를 우회해서 서로 다른 도메인 간에 통신을 하고 싶었지만 오랫동안 표준이 없는 상황이 지속됐다.
* 그래서 개발자들은 JSONP와 같은 몇 가지 창의적인 방법으로 해결책을 만들었다.(다른 방법도 있지만 여기서는 JSONP 방법만 소개)

### JSONP

* JSON with Padding
* <script> 태그 자체가 SOP 제약을 받지 않는 특성을 이용한다.
* XMLHttpRequest 객체를 이용해서 서버로 요청을 전송하는 대신 동적으로 <script> 태그를 만들어 페이지에 삽입한다.
* `<script src="http://api.example.com/resources?callback=success"></script>` 클라이언트로 응답을 전송한다.
* 서버에서 응답 결과를 호출 인자로 전달하는 스크립트 코드를 만들어 클라이언트로 전송한다.
* `success({ key : value })`
* JSONP 요청은 GET 메소드만 이용할 수 있다.

### CORS(Cross Origin Resource Sharing)

* Cross Domain 이슈를 해결하는 표준
* CORS를 사용하기 위해서는 몇 가지 추가 정보를 주고 받아야 한다.
* CORS 요청을 위해 새로운 HTTP 헤더를 추가한다.
* 서버는 그 헤더를 확인하고 요청을 허용할지 말지 결정한다.
* Simple Request
    * (GET, POST와 같은 데이터에 이상을 일으키지 않는) HTTP 메소드를 쓴다면 커스텀 헤더를 지정하지 않는다. 이때 Response header에 `Access-Control-Allow-Origin: *`이 있을 텐데 `*`은 모든 크로스 사이트 요청을 허용한다는 뜻이다.
    * POST 요청이 경우에는 Content-Type이  `application/x-www-form-urlencoded, multipart/form-data, text/plain` 중 하나여야 한다.
* Preflighted Request
    * 만약 GET, POST 요청이 아닌(데이터에 이상을 일으키는) HTTP 메소드를 사용할 때는 preflight 요청을 서버로 전송해서 서버가 허용하는 메소드 목록을 HTTP OPTIONS 헤더로 획득한 다음에 실제 요청을 전송한다.
    * 커스텀 헤더 설정이 필요하다.
    * Request header에 `Access-Control-Request-Method, Access-Control-Request-Headers`를 추가해야 한다.
    * priflight 요청을 받은 서버는 CORS 관련 정보를 헤더에 담아야 한다. `Response Header Access-Control-Allow-Origin: http://example.com, Access-Control-Allow-Methods: POST, GET, OPTIONS, Access-Control-Allow-Headers: X-Custom-Header , Access-Control-Max-Age: 1728000`
    * 그리고 나서 실제 요청과 응답을 한다.

### 출처

* https://wit.nts-corp.com/2014/04/22/1400 설명이 너무나 잘 되어있으므로 꼭 봤으면 좋겠다.
* http://homoefficio.github.io/2015/07/21/Cross-Origin-Resource-Sharing/
