---
layout  : wiki
title   : RLE(Run-Length Encoding)
summary : 
date    : 2019-07-16 17:27:40 +0900
updated : 2019-07-16 17:30:53 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# RLE 
  
## RLE란?

* 매우 간단한 비손실 압축 방법
* 데이터에서 같은 값이 연속해서 나타나는 것을 그 개수와 반복되는 값만으로 표현하는 방법
* 배경의 변화가 없는 영상에 적합한 방식
* 예를 들어, `WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW`는 `12WB12W3B24WB14W`로 압축될 수 있다.

## 출처

* https://ko.wikipedia.org/wiki/%EB%9F%B0_%EB%A0%9D%EC%8A%A4_%EB%B6%80%ED%98%B8%ED%99%94
