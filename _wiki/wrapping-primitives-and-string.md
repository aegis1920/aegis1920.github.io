---
layout  : wiki
title   : 원시값과 문자열 포장
summary : 
date    : 2020-02-24 14:35:07 +0900
updated : 2020-02-24 14:37:30 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 원시값, 문자열 포장

- 객체의 원시값을 포장하는 이유는?
    - `int`과 같은 원시 값만으로는 컴파일러와 프로그래머에게 그 값이 어떤 값이고 왜 쓰고 있는지에 대해 정보를 전해줄 수 없다.
    - 포장하면 들어오는 **상태값들을 `validate`를 해줄 수 있다**
    - **비즈니스 로직이나 검증을 위한 로직을 여기서 해줄 수 있다**
- 상태를 변경할 수 있는 객체가 퍼진다면 안 좋은 것이다. 최대한 불변한 객체로 만들어야 한다
- 상태를 가지는 객체는 `equals`가 중요하기 때문에 `equals`와 `hashCode`를 만들어둬야 한다