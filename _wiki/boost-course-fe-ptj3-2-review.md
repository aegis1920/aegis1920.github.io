---
layout  : wiki
title   : FE_PJT3-2 부스트코스 Fail 리뷰
summary : 
date    : 2019-08-19 23:14:44 +0900
updated : 2019-08-19 23:31:09 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## FE_PJT3-2 부스트코스 Fail 리뷰

### 코드 리뷰

- 들여쓰기 규칙 지키기 -> tab or 4space
- 함수 선언을 전부 마치고 호출해주기
- 매개변수로 URL을 받아 ajax를 하나의 함수로 통합하기
- 상수를 그대로 쓰는 하드코딩은 금지

### 내가 질문했던 것(요약)

- DOM이 로드되고 나서야 스크립트를 제어하니 보통은 DOMContentedLoaded를 일반적으로 스크립트에서 먼저 쓴다. 그러나 WebSocket처럼 서버 연결이 필요하면 DOM 생성 이전에도 서버와 커넥트를 맺을 수 있다.
- 최적의 슬라이딩 구현은 순수 CSS로 작성하는 것. animation 속성을 이용해서 할 수 있다.
- 확실히 JQuery는 잘 안 쓰고 Angular, React, Vue를 많이쓴다. 라이브러리는 타입스크립트로 작성해서 사용한다.


