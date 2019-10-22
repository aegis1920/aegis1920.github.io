---
layout  : wiki
title   : 파파고 NMT 번역 API를 쓰다가 일어난 CORS 이슈
summary : 이것 때문에 거의 이틀을 날렸다. ㅠㅠ
date    : 2019-07-10 13:59:22 +0900
updated : 2019-07-10 15:39:59 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 파파고 NMT 번역 API를 쓰다가 일어난 CORS 이슈

## 번역 API를 이용하라

교육을 듣던 중 요구사항에 번역 API를 이용하라는 것이 있었다. 나는 가장 유명한 구글 API, 파파고 API를 생각하고 있어서 먼저 구글 API를 사용해보려고 했다. 그런데 구글 번역 API가 유료가 됐다고 한다.

## 파파고 API를 쓰려고 했는데?

그래서 나는 한글로 잘 되어있는 파파고 API를 이용하려고 갈아탔다. 처음에는 요청만 보내면 되겠지? 라고 생각하고 axios로 했는데 자꾸 CORS 문제라며 안 됐다. 분명 파파고 쪽에서 막는 거라고 생각하고 API 설정 URL이 잘 못 됐나 싶어 고치고 고치고 포트번호까지 넣어보며 해봤는데 똑같은 문제가 발생했다. 구글링해도 분명 파파고 쪽에서 막는 거라며 말하기만 하고 끝이었다. 혹시나 axios가 잘못됐나 싶어서 단순한 request도 써봤는데도 문제는 같았다. 

## 답을 발견하다

며칠 째 고민하던 중, 네이버에 속한 정보들을 구글링 안 되도록 막아놓은 느낌도 들어서 네이버 개발자 포럼에 들어가 CORS 이슈를 찾아봤다. 그랬더니 나와 똑같은 문제가 생긴 사람이 여럿 있었다. 데이터 랩의 API는 다른 사람의 id, secret을 도용해서 API를 호출하는 것을 막기 위해 서버 프로그래밍을 통해 호출하도록 되어있다고 떡하니 나왔다. 으으... 그래서 함수로 그냥 요청하면 안됐던 거구나. 답을 알아서 기쁘지만 네이버 검색에 치면 나오는 걸 구글링만 해서 알지 못했던 게 허탈감이 컸다. 다른 API를 알아보러 가야겠다ㅠㅠ

## 의문점

네이버에서 말하길 서버 프로그래밍을 통해 호출하도록 되어있다고 했다. 가령 뭐 JSP나 PHP, Node.js같은 것들을 말하는 거겠지? 그리고 파파고에서 제공하는 예제 또한 express에 request로 post를 보내고 있었다. express로 웹 서버를 띄운다음 `node ~.js`로 실행시키면 잘 된다. 내가 쓰는 웹 서버 vue-cli-service serve를 찾아보니 webpack-dev-server로 이루어져 있었고 얘는 또 express 서버로 되어있다고 했다. 그러면 똑같은 거 아닌가? 안 되는 이유를 모르겠다.

## 혹시 몰라서 링크를 남긴다

* [https://developers.naver.com/forum/posts/6481](https://developers.naver.com/forum/posts/6481)
* [https://developers.naver.com/forum/posts/26989](https://developers.naver.com/forum/posts/26989)

