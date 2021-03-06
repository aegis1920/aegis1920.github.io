---
layout  : wiki
title   : Java Enum 정리
summary : 
date    : 2020-02-24 15:00:58 +0900
updated : 2020-03-16 15:38:56 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Enum

- 관련이 있는 상수들의 집합
- Enum을 사용하는 이유는?
    - 코드가 단순해지며 가독성이 좋아진다
    - 인스턴스 생성과 상속을 방지한다
    - 자바 콜렉션과 함께 사용하기 쉽다
    - 문맥을 담을 수 있어 추가로 무언가를 찾아보는 행위를 최소화할 수 있게 된다
- Enum을 잘 사용하기 위해서는 어떻게 해야되는가?
    - `Enum`으로 파일을 따로 빼도 되지만 그 객체 이외에 사용되는 곳이 없다면 그 객체의 `inner type`으로 안에 선언해준다.
    - 상수를 정의하고 그 상수에 추가 속성을 부여할 수 있는데 그 속성에 List를 넣어서 순회하며 찾도록 해줄 수 있다.
    - 추가 속성이 문자열인 것도 `Enum`으로 만들어서 `PayType.ACCOUNT_TRANSFER` 과 같이 만들어줄 수 있다
    - Enum 안에 메서드를 만들어 활용하자.
    - `static`이기 때문에 인스턴스를 공유하게 되므로 상태값을 변경하는 코드가 있으면 안된다. Enum의 상태값에 모두 final을 붙여주자
    - Enum도 get 하지마라
    - Enum은 `==` 으로 비교해줄 수 있다. (Enum에 있는 상태값만큼 인스턴스가 만들어진다)
    - Enum의 반환값도 Enum으로 Wrapping한 것으로 반환하도록 노력해라
    - Enum도 클래스와 똑같다.

### 출처

- [http://www.nextree.co.kr/p11686/](http://www.nextree.co.kr/p11686/)
- [https://woowabros.github.io/tools/2017/07/10/java-enum-uses.html](https://woowabros.github.io/tools/2017/07/10/java-enum-uses.html)
