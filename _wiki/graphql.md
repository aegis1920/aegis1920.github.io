---
layout  : wiki
title   : GraphQL
summary : 
date    : 2021-08-04 19:25:19 +0900
updated : 2021-08-04 19:35:36 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 왜 GraphQL 인가?

- 네트워크 횟수를 줄일 수 있음
    - Rest 방식을 사용하면 3번 갔다올 걸 한 번의 요청에 처리할 수 있음
    - Rest에서 새로운 엔드포인트를 사용하면 괜찮긴 하지만 매번 새로 만들어야하므로 힘들다
    - e.g. `GET /api/job-post`, `GET /api/user ...` 이면 `query { jobPosts { user {} } }` 이런 식으로 가능하다.
- 빠른 개발이 가능하다.
    - 엔드포인트를 추가하지 않고도 쉽게 필드를 추가할 수 있다. 

## GraphQL에 필요한 프레임워크

- Relay
    - React와 결합성이 좋다
    - compileTime에 쿼리를 계산한다

## 출처
- GraphQL Korea 밋업
