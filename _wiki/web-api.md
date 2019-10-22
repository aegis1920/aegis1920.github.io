---
layout  : wiki
title   : WEB API
summary : 
date    : 2019-07-23 11:27:18 +0900
updated : 2019-08-05 20:00:49 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# Web API

## Web API 디자인 가이드

* URI는 정보의 자원을 표현해야 합니다.
* 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현합니다
* 경로에 나타나는 명사는 보통 집합을 나타내기 때문에 복수형으로 사용하는 것이 좋다
* 예를 들어, `GET /member/update/1`이 아니라 `PUT /members/1`로 표현한다.  
* URI 마지막 문자로 슬래시 구분자(/)를 포함하지 않는다.
* 하이픈(-)은 URI가독성을 높일 때 사용한다.
* 언더바(_)는 사용하지 않는다.
* URI경로는 소문자만 사용한다
* RFC 3986(URI 문법 형식)은 URI스키마와 호스트를 제외하고는 대소문자를 구별한다.
* 파일 확장자는 URI에 포함하지 않는다.
* Accept Header를 사용한다.

## 상태코드

* 200번대 : 성공
* 300번대, 500번대 : 서버로 인한 오류
* 400번대 : 클라이언트로 인한 오류

## 출처

* https://www.edwith.org/boostcourse-web/lecture/16741/
