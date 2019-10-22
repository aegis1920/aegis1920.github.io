---
layout  : wiki
title   : Java Data Type(자료형)에 관한 궁금증
summary : 
date    : 2019-09-27 10:32:23 +0900
updated : 2019-09-27 10:56:02 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## 동기
알고리즘을 풀다가 로직은 맞는데 계속 '틀렸습니다'가 뜨길래 왜 틀리지? 생각하다가 int형으로 줘서 틀렸다는 것을 깨달았다. 그러다가 java에는 long long 같은 게 없나 살펴보다가 정리도 할 겸 올린다.

## 정리
- java에서 long은 64비트 정수, double은 64비트 실수, long형보다 더 큰 숫자는 BigInteger를 쓰자.
- java는 '어디에서나 똑같이 쓸 수 있다'는 모토와 같이 자료형도 운영체제의 종류에 상관없이 항상 일정하다

- 다른 보통의 언어에서 int는 시스템의 자연스러운 크기를 따르도록 규정하고 있다.
- C 언어의 경우, 32비트 운영체제에서 int와 long이 32비트로 크기로 같다. 64비트 운영체제에서는 int가 32비트, long이 64비트라고 한다.
- long int와 같이 쓰는 이유는 가독성 작업을 위해서. 최소 32비트이면서 부호있는 정수 유형


## 결론

- 자료형의 크기는 언어마다 다르고, 운영체제, 컴파일러마다 다르다.
- 과거에 8비트, 16비트 시스템이 주를 이뤘기에 이런 현상이 일어났다.
- 그러나 자바는 고정되어 있다^^

## 출처

- [http://mwultong.blogspot.com/2006/10/java-int-long-float-double.html](http://mwultong.blogspot.com/2006/10/java-int-long-float-double.html)
- [https://stackoverflow.com/questions/900230/difference-between-long-and-int-data-types](https://stackoverflow.com/questions/900230/difference-between-long-and-int-data-types)
- [https://smallpants.tistory.com/10](https://smallpants.tistory.com/10)
