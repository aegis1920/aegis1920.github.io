= --- =
layout  : wiki
title   : 소수 프로그래밍
summary : 
date    : 2019-11-06 10:29:58 +0900
updated : 2019-11-06 15:51:11 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 소수

## 소수의 정의

- 약수가 1과 자기 자신밖에 없는 수
- 어떠한 N이 소수가 되려면 2보다 크거나 같고, 루트 N보다 작거나 같은 자연수로 나누어 떨어지면 안 된다. 나누어 떨어지면 약수가 된다는 뜻이니까.
- 근데 왜 그럴까?

생각해보자.

- m이 루트 N이라면 m * m = N이다.
- N이 소수가 아니라면 N = a * b(a <= b)로 나타낼 수 있다.
- a > b라면 두 수를 바꿔서 항상 a <= b로 만들 수 있다.
- 이 때 3가지 경우가 생긴다.
- a > m, b < m 인 경우
- a = m, b = m 인 경우
- a < m, b > m 인 경우
    - 어떻게 하든 최솟값은 m 즉, 루트 N보다 작거나 같다.
- a <= x <= m (루트N)
    - 그래서 어떠한 수 N이 소수인지 아닌지 판별해줄 때 2부터 최대 루트 N까지 검사해서 나누어 떨어진다면 소수가 아닌 것이 된다.
    - x <= 루트 N 이 되는데 프로그래밍에서 제곱근으로 판별하기는 어려우니 x^2 <= N 으로 판별하면 된다.


    ```java
    public static boolean prime(int n) {
        if(n < 2) return false;
        for(int i = 2 ; i*i <= n ; i++) {
            if(n % i == 0) return false;
        }
        return true;
    }
```
## 에라토스테네스의 체

- 2 ~ N 까지 소수를 구하는 방법
- 2, 3, 5, 7...으로 소수의 배수를 지워나가면 된다.
- 예를 들어 N이 100이라면 쭉 지워나가면 되는데 11 * 11은 121로 100을 넘어가기 때문에 더 계산하지 않아줘도 되고 여기서 남아있는 수들이 소수가 된다.
- 이 때 j가 i^2부터 시작해도 되는데 그 이유는 그 이전인 얘들은 소수가 아닌 것으로 이미 다 판별이 되었기 때문이다. 

```java
boolean[] isDelete = new boolean[1001];

for (int i = 2; i <= N; i++) {
    if (!isDelete[i]) {
        isDelete[i] = true;
        for (int j = i*i; j <= N; j += i) {
            if (!isDelete[j]) {
                isDelete[j] = true;
            }
        }
    }
}

```


