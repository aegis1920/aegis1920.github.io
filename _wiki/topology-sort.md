---
layout  : wiki
title   : 위상정렬(Topology Sort)
summary : 
date    : 2019-07-12 13:53:17 +0900
updated : 2019-07-12 14:39:49 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 위상정렬을 알아보자.

## 위상정렬이란?

* 순서가 정해져 있고 답이 있지만 여러 갈래로 나눠지는 작업일 때, 그 순서를 결정해주기 위해서 사용하는 알고리즘
* 여러 갈래일 때 어디로 가느냐에 따라 답이 달라질 수 있기 때문에 여러 개의 답이 존재할 수 있다.
* DAG(Directed Acyclic Graph)에만 적용이 가능하다.
    * 사이클이 없다. 사이클이 있다는 의미 자체가 시작점을 모르는 것과 같다.
    * 단방향이다.

## 풀이 방식

* 스택
* 큐
    1. 진입차수가 0인 정점을 큐에 삽입
    2. 큐에서 원소를 꺼내 연결된 모든 간선을 제거
    3. 간선 제거 이후, 진입차수가 0인 정점을 큐에 삽입
    4. 큐가 빌 때까지 2~3번을 반복
        * 모든 원소를 방문하기 전에 큐가 빈다면 사이클이 존재하는 것. 0인 정점만 큐에 넣기 때문에 사이클이라면 진입차수가 0이 될 수가 없어서 모든 원소를 방문하기 전에 큐가 비게 된다.

## 출처

* (https://m.blog.naver.com/PostView.nhn?blogId=ndb796&logNo=221236874984&proxyReferer=https%3A%2F%2Fwww.google.com%2F)[https://m.blog.naver.com/PostView.nhn?blogId=ndb796&logNo=221236874984&proxyReferer=https%3A%2F%2Fwww.google.com%2F]

