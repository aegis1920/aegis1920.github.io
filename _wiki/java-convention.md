---
layout  : wiki
title   : Java Code Convention
summary : 
date    : 2019-12-05 20:31:28 +0900
updated : 2019-12-05 20:53:27 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## Java Code Convention 

- 습관으로 만들기 위해 자바 코드 컨벤션을 적는다.
- 최근에 우아한 테크코스를 진행하면서 더욱 느꼈다.


1. 새줄 문자는 CRLF(Windows, `/r/n`)가 아닌 LF(Unix, `/n`)
   1. LF는 커서의 위치는 그대로 두고 종이를 한 라인 위로 올리는 동작을
   2. CR는 현재 라인에서 커서의 위치를 맨 앞으로 옮기는 동작을 의미했다고 한다.
   3. CR + LF 는 두 동작을 합해서, 커서를 다음 라인의 맨 앞으로 옮겨주는 것이었다.
2. 한국어 발음대로 표기 금지
3. 테스트 클래스는 Test로 끝남
4. 상수는 대문자와 언더스코어
5. 변수나 메소드는 소문자 카멜 표기법
6. 임시 변수 외 1글자 금지
7. 소스 파일당 한 개의 탑 레벨 클래스(내부 클래스는 선언 가능)
8. 제한자 선언 순서 : `public protected private abstract static final transient volatile synchronized native strictfp`
9. 배열에서 대괄호는 타입 뒤에 선언
10. long 형 값 마지막에 `L` 붙이기
11. 1개의 tab = 4개의 space
12. 중괄호 선언은 K & R 스타일
13. 줄바꿈 허용 위치
    1. `extends` 선언 후
    2. `implements` 선언 후
    3. `throws` 선언 후
    4. 시작 소괄호(`(`) 선언 후
    5. 콤마(`,`) 후
    6. `.` 전
    7. 연산자 전
14. 모든 줄은 탭이나 공백으로 끝내지 않는다
15. 대괄호 뒤 공백 삽입(`int[] mask = new int[] {0, 1, 1}`)
16. 콜론 앞 뒤에 공백 삽입(` : `)
17. 코딩컨벤션 검사 도구를 사용하자.
18. 



### 출처

- https://ohgyun.com/554
- https://naver.github.io/hackday-conventions-java/

