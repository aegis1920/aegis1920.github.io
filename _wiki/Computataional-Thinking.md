---
layout  : wiki
title   : Computational Thinking
summary : 
date    : 2019-06-20 14:21:59 +0900
updated : 2019-09-06 14:07:24 +0900
tags    : 
toc     : true
public  : true
parent  : algorithm
latex   : false
---
* TOC
{:toc}

# Computational Thinking

## 명제 논리

### 역, 이, 대우

조건문 $p→q​$ 에 대하여

- 역(converse) : $q→p​$
- 이(inverse) : $\sim p→ \sim q​$​
- 대우(contrapositive) : $\sim q→ \sim ~p$ (**조건문이 참이면 대우도 참이다**)

### 진리표(p→q)

| p    | q    | p→q  |
| ---- | ---- | ---- |
| T    | T    | T    |
| T    | F    | F    |
| F    | T    | T    |
| F    | F    | T    |

T는 참, F는 거짓.

p가 F일 때, p→q가 항상 T인 이유는 거짓을 증명할 수 없으면 항상 참이기 때문이다. 전제가 거짓이므로 결과는 참인지 거짓인지 증명할 수 없다. 증명할 수 없기 때문에 항상 참이다.

## 귀류법

 귀류법이란 어떤 명제가 틀렸다고 가정한 후, 추론했을 때, 모순이 발생함을 이끌어내어 가정이 거짓임을 증명하는 방법이다.  

- 반례를 들어 증명하면 된다.
- 예를 들어, '$\sqrt2$는 무리수이다'를 증명한다고 했을 때 $\sqrt2$를 유리수라고 생각하여 $ \frac{a}{b} $ (a와 b는 서로소)라고 가정하여 푼 후, 이것이 모순이라는 걸 증명하면 된다.
  - 서로소 : 여러 개의 수들 사이에서 1이외의 공약수가 없는 것

## 귀납법

수학적 귀납법의 기본형 : $P(1)​$이 참이고, $P(n) \rightarrow  P(n+1)​$이 참이면 $P(n)​$은 모든 자연수 n에 대해서 참이다.

- 증명할 때는 $P(n+1)$에서 $P(n)$을 찾아서 대입해 증명하면 된다

항진 명제 - 항상, 모두 참인 명제

모순 명제 - 항상, 모두 거짓인 명제

## 함수

#### 역함수

치역이 곧 정의역이 되고, 치역이 곧 정의역이 되는 것. 일대일 함수(전단사함수)일 때만 역함수가 가능하다.

단사함수 = 일대일함수

전사함수 = 다대일함수

## 점화식

수학에서는 어떤 수열의 각각의 항들의 관계를 나타낸 식이지만 알고리즘에서는 **어떤 함수를 자신보다 더 작은 변수에 대한 함수와의 관계로 표현한 것**으로 본다

점화식은 프로그래밍에서 재귀함수로 만들 수 있기 때문에 중요하다.

Ex) $f(n) = n*f(n-1)​$

## 수열 공식

등차 수열의 일반항 : $a_n = a_1 + (n-1)*d​$

등차 수열의 합 : $S_n = {n(2a + (n-1) *d) \over 2}​$

* 가우스의 합 방식과 같이 생각하면 구할 수 있다.

등비 수열의 일반항 : $a_n = a_1*r^{n-1}​$

등비 수열의 합 : $S_n = {a(r^n-1) \over r-1}​$

* $S_n​$에 $rS_n​$을 빼주는 형식으로 구할 수 있다.

계차수열 : $a_n = a_1+ {\sum _{k=1} ^{n-1} b_k}​$

## 순열

- 서로 다른 n개의 원소에서 r개를 중복없이 골라 순서에 상관있게 일렬로 나열하는 것을 n개에서 r개를 선택하는 순열이라고 한다. 

$_{n}\mathrm{P}_{r} = \frac{n!}{(n-r)!}$, $_{n}\mathrm{P}_{r} = _{n}\mathrm{C}_{r} * r!$

- 중복이 없는 순열 코드
- N개 중에서 M개를 순서와 상관있으면서 중복없이 뽑는다.
- 중복이 없을 때는 체크를 따로 해줘야 한다. 

```java
public static void permutation(int depth, int[] resArr, boolean[] arrCheck) {
		// M개를 뽑는다.
		if(depth == M) {
			for(int res : resArr) {
				System.out.print(res + " ");
			}
			System.out.println();
			
			return;
		}
		
		// N개 중에서
		for(int i = 1 ; i <= N ; i++) {
			if(arrCheck[i]) continue;
			arrCheck[i] = true;
			resArr[depth] = i;
			permutation(depth+1, resArr, arrCheck);
			arrCheck[i] = false;
		}
	}
```



## 조합

서로 다른 n개의 원소에서 순서에 상관없이 r개를 뽑을 때, n개에서 r개를 택하는 조합이라고 한다.

$_{n}\mathrm{C}_{r}​$ 또는 ${n \choose r}​$ 로 쓰며, $_{n}\mathrm{C}_{r} = \frac{_{n}\mathrm{P}_{r}}{r!} = \frac{n!}{(n-r)!r!}​$

* $_{n}\mathrm{C}_{1} = n$
* $_{n}\mathrm{C}_{n} = 1$
* $_{n-1}\mathrm{C}_{r-1} = _{n}\mathrm{C}_{r} * {r \over n}$
* $_{n}\mathrm{C}_{r} = _{n-1}\mathrm{C}_{r-1} + _{n-1}\mathrm{C}_{r}$
* $_{n}\mathrm{C}_{r} = _{n}\mathrm{C}_{n-r}​$
  * 3개 중 1개를 뽑는 경우나, 3개 중 2개를 뽑는 경우는 같다. 

* $(x+y)^2​$의 각각의 계수를 구할 때 곱해보지 않고 조합으로 풀 수 있다. 
  * $x​$와 $y​$가 들어있는 바구니가 2개 있다고 생각한다. 여기서 뽑는 경우의 수를 구할 때, $xx​$, $xy​$, $xy​$, $yy​$의 경우가 있고   $xx​$, $xy​$, $yy​$가 나올 수 있다.
  * $x​$ 또는 $y​$ 중에 아무거나 선택해서 그 문자(예를 들어, $x​$)가 나올 수 있는 경우는 $_{2}\mathrm{C}_{0}​$, $_{2}\mathrm{C}_{1}, ​$$_{2}\mathrm{C}_{2}​$와 같다. 바로 계수가 된다.
  * 그리고 그것을 다 더할 시, $x^2 + 2xy + y^2​$가 된다.
* 위와 같은 이유로 $(x+y)^1​$, $(x+y)^2​$, $(x+y)^3​$, ...$(x+y)^n​$의 값들은 $\sum_{k=0}^n  {_n}\mathrm{C}_k x^{n-k}*y^k​$ 가 된다. $x​$와$y​$에 1을 대입하면 $2^n = \sum_{k=0}^n  {_n}\mathrm{C}_k​$ 가 나오게 된다.
  * 이는 원소 n개인 집합의 부분 집합의 수와 같다. 원소를 한 개, 두 개, 세 개..뽑는 것으로 ${}_n\mathrm{C}_0 + {}_n\mathrm{C}_1 + ... {}_n\mathrm{C}_n$ 과 같다.
  * 파스칼의 삼각형에서 n일 때 그 행의 합을 구하는 것과 같다.

- 중복이 없는 조합 코드
- N개 중에서 M개를 순서와 상관없으면서 중복없이 뽑는다.
- 오름차순으로 정렬되어있는 배열이라면 훨씬 쉽게 코드를 짤 수 있다.
- 처음 시작을 0또는 1같이 맨 처음으로 하고 현재 있는 숫자보다 계속해서 더 크면 되므로 작거나 같을 때 continue시켜주면 된다.
- 대신 계속 커져야하는 것을 보장받아야하기 때문에 해쉬처럼 N의 범위보다 큰 값을 정해야한다. 
- 이러면 순열과 같이 체크배열을 따로 안 만들어줘도 돼서 좋다.
- 그리고 이 방법은 for문 하나가 아니라 for문이 두 개라도 조건에 `r * 1000 + c`으로 만들어줄 수 있기때문에 더 범용성이 높다.

```java
public static void combination(int depth, int[] resArr, int limit) {
		if(depth == M) {
			for(int res : resArr) {
				System.out.print(res + " ");
			}
			System.out.println();
			
			return;
		}
		
		for(int i = 1 ; i <= N ; i++) {
			// 해쉬처럼 일부러 크게 만들어서 다음 것보다 작은, 유일한 값을 만든다.
			if(i * 100 <= limit) continue;
			resArr[depth] = i;
			combination(depth+1, resArr, i * 100);
		}
	}
```

## 중복순열

서로 다른 n개의 원소에서 r개를 중복이 가능하도록 골라 순서에 상관있게 일렬로 나열하는 것을 n개에서 r개를 선택하는 중복순열이라고 한다.

$_{n}\mathrm{\pi}_{k} = n^k​$ 

- 중복이 있는 순열 코드
- N개 중에서 M개를 순서와 상관 있으면서 중복있이 뽑는다.

```java
public static void permutation(int depth, int[] resArr) {
		if(depth == M) {
			for(int res : resArr) {
				System.out.print(res + " ");
			}
			System.out.println();
			
			return;
		}
		
		// N개 중에서
		for(int i = 1 ; i <= N ; i++) {
			resArr[depth] = i;
			permutation(depth+1, resArr);
		}
	}
```

## 중복조합

주어진 집합의 원소 중에서 뽑되 동일한 원소의 중복을 허용하여 뽑아내는 것

* Ex) 1과 2에서 세 개를 취하는 중복조합은 111, 112, 122, 222가 있다.
* $_{n}\mathrm{H}_{r} = _{n+r-1}\mathrm{C}_{r}​$

- 중복이 있는 조합 코드
- N개 중에서 M개를 순서와 상관 없으면서 중복있이 뽑는다.
- 중복이 있게 하려면 큰 대신 같은 값일 때도 허락해주도록 하면된다. 작거나 같음이 아니라 작을 때만 continue 시켜준다.

```java
public static void combination(int depth, int[] resArr, int limit) {
		if(depth == M) {
			for(int res : resArr) {
				System.out.print(res + " ");
			}
			System.out.println();
			
			return;
		}
		
		for(int i = 1 ; i <= N ; i++) {
			// 해쉬처럼 일부러 크게 만들어서 다음 것보다 작은, 유일한 값을 만든다.
			if(i * 100 < limit) continue;
			resArr[depth] = i;
			combination(depth+1, resArr, i * 100);
		}
	}
```

## 증명하는 방법

- 자연수 n에 대하여~ 를 증명할 때는 가능한 경우의 수를 모두 구해서 증명하면된다. 
  - n이 홀수일 때와 짝수일 때
  - 3k, 3k+1, 3k+2 등...
- 대우를 통해서 증명하는 방법을 써도 되고, 홀수는  2k+1, 짝수는 2k로 잡는다. 
- 나누어 떨어지는 것은 수로 나타낸다. Ex) 3이면 3k, 3k+1, 3k+2
- 무리수 임을 증명할 때 귀류법으로 유리수라고 생각해 a/b로 표현해서 제곱하는 방식으로 풀면 된다.




