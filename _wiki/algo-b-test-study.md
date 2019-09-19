---
layout  : wiki
title   : 삼성 B형 준비
summary : 
date    : 2019-09-19 18:57:21 +0900
updated : 2019-09-19 19:56:44 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

* 롤러코스터 문제 -> 결과값에서 먼저 생각. 결과값에서 하나라도 바꾼다면 값이 작아진다는 것을 이용한다. 수식을 찾아야 함
* LCP
* 파이의 합
    * 소수는 보통 P로 표기, 서로소 어렵다...
    * 오일러 파이 함수를 써서 에라토스테네스의 체처럼 만들 수 있다. 1/2, 2/3, 3/4를 계속 해준다...
    * long long으로 해줘야 한다.
* Inversion Counting
    * merge sort를 하면서 바로 구할 수 있다. 해주면서 count로 구할 수 있다. merge를 하는 과정에서 바로 구할 수 있음
* IndexTree
    * left가 홀수면, right이 짝수면~ -> 왼쪽이 2n, 오른쪽이 2n+1이므로
    * get과 update 이걸 Inversion Counting 문제에서 쓸 수 있다.


