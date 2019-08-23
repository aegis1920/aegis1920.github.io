---
layout  : wiki
title   : 클린코드
summary : 
date    : 2019-06-20 16:21:58 +0900
updated : 2019-08-23 16:33:34 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

## 클린코드

- 다른 사람이 쉽게 읽을 수 있어야 한다. 그러므로 가독성이 좋아야 한다.
- 변수, 클래스, 메소드에 의도가 분명한 이름을 사용한다.

잘못된 정보를 전달할 수 있는 이름은 사용하지 않는다.
1. 범용적으로 사용되는 단어를 다른 의미로 사용하지 않는다. ex: hp, aix, sco 등...
2. 가독성이 떨어지는 문자는 사용하지 않는다. ex: L, l, 1, 0, O, o
3. 연속된 숫자 또는 불용어를 덧붙이는 방식을 피하라. ex : nameString, getActiveAccountInfo, moneyAmount, accountData 등.. 

주석은 반드시 달아야할 이유가 있는 경우에만 사용한다.
> 코드로 빠르게 유추할 수 있는 내용에는 주석을 사용하지 않는 것이 좋다.

함수의 중요한 세부사항을 주석으로 남기는 것이 좋다.

규칙적인 들여쓰기와 줄바꿈으로 가독성 향상.

가독성 향상에 도움이 된다면 코드의 열을 맞춰라.

코드를 그룹과 계층구조 방식으로 조작하면 가독성이 향상된다.

왼쪽에 변수를 오른쪽에 상수를 두고 비교하라. if(length <= 10)

부정이 아닌 긍정을 다뤄라. if(a == b) {}

if/else를 사용하고 삼항 연산잔ㄴ 매우 간단한 경우에만 사용한다.

코드를 항상 실행하는 do/while 루프를 피하라.

중첩 if 보다 if if와 같이 따로 쓰는 게 낫다.

설명 변수와 요약 변수를 이용하여 커다란 표현을 작게 만들어라. 사람이 이해하기 쉽도록.
```java
final boolean user_owns_document = (request.user.id == document.owner_id);
if(user_owns_document){}
if(!user_owns_document){}
```
와 같이 변수를 하나 만들어서.

함수는 가급적 작게, 한 번에 하나의 작업만 수행하도록 작성.

## 시큐어코딩

`select * from users where id="" or "a" = "a" and passwd="test" or "a" = "a"` 라고 치게되면 모두 true가 되어서 유저 정보들을 모두 가져오게 된다. 

id에 admin#이라고 치게되면 뒤에는 다 주석처리가 되어서 관리자로 들어오게 된다.
`select * from users where id="admin"'' or "a" = "a" and passwd="test" or "a" = "a"` 라고 치게되면 모두 true가 되어서 유저 정보들을 모두 가져오게 된다. 

## boostcourse

- 코딩컨벤션을 참고하자
    - 함수 이름이 목적에 맞게 지어졌나 확인하자.
    - 함수는 무조건 동사+명사로 짓자.
    - 카멜표기법을 쓰자
    - 변수는 명사로 쓰고 의미있는 이름으로 쓰자
- 어떠한 값을 쓸 때 변수로 선언해서 다른 사람도 이해하기 편하게, 의미가 있게 선언해야한다.
- 지역변수로 선언하거나 함수의 매개변수로 주자. 전역변수가 많으면 이해하기 어렵다.
- if문의 중첩같은 경우도 빨리 return하거나 continue하는 방식으로 하자. 최대한 이해하기 편하게.
- eslint와 같은 정적 분석도구는 anti-pattern을 알려준다. 써보자.
- 



