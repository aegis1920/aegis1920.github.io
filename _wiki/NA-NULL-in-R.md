---
layout  : wiki
title   : R에서 NA와 NULL, &와 &&의 차이
summary : 
date    : 2019-06-21 11:16:00 +0900
updated : 2019-06-21 11:16:44 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

# R에서 NA와 NULL, &와 &&의 차이

## R이란?

R은 데이터 분석을 위한 통계 및 그래픽스를 지원하는 자유 소프트웨어 환경이면서 하나의 컴퓨터 언어이자 다양한 패키지(통계, 머신러닝, 금융 등등의 라이브러리)의 집합입니다.

### 설치

'R'과 R을 사용하기 위한 IDE인 'RStudio'를 이용합니다.

### 변수

변수에 값을 할당할 때는 `<-` 또는 `<<-`또는 `=`을 사용합니다. 하지만 `=`은 경우에 따라 사용될 수 없는 경우가 있어 `<-`로 쓰는 게 좋습니다.

### NA와 NULL의 차이

`NA`는 길이가 1인 논리적 상수로 **missing value 이거나 만약 데이터에 값이 존재하지 않는다면 NA로 표시할 수 있습니다.** 즉, 지정한 범위의 값이 아닐 때 `NA`로 처리할 수 있습니다. 예를 들어, 설문지에 1번과 2번이 있는데 3번을 고른 사람이 있다면 `NA`로 나오게 됩니다. 어떤 변수에 `NA`가 저장되어있는지 확인하려면 `is.na()`함수로 확인할 수 있습니다.

`NULL`은 R의 NULL 객체를 나타냅니다. 예약어이고 **변수가 초기화되지 않는 경우에 사용할 수 있습니다.** 즉, 아직 데이터 값을 입력하지 않았을 때를 의미합니다. `NULL`이 할당되었는지는 `is.null()`함수로 확인할 수 있습니다.

### &와 &&의 차이

`&`는 AND 연산자로 boolean이 저장된 벡터끼리의 연산시 각 원소 간을 계산합니다.

`c(TRUE, TRUE) & c(TRUE, FALSE)`의 결과로 `TRUE FALSE`가 나옵니다.

`&&`는 AND 연산자로 boolean이 저장된 벡터끼리의 연산시 한 개의 boolean 값을 계산합니다.

`c(TRUE, FALSE) && c(TRUE, FALSE)`의 결과로 `TRUE`가 나옵니다.

> c()는 열벡터를 선언하는 명령입니다. `a <- c(1, 2, 3)`의 경우 (1, 2, 3)으로 된 열을 a 벡터에 넣습니다.

### 요인(Factor)

요인은 범주형 변수를 위한 데이터 타입입니다. 첫 번째 인자는 그 변수에 저장되는 값이고 두 번째 인자가 범주(Category)를 줄 수 있습니다. `nlevels()`로 범주의 수를 구할 수 있고, `levels()`로 범주 목록을 알 수 있습니다. 그리고 R에서 index는 0이 아닌 1에서 시작합니다.

sex  <-  factor("m",  c("m",  "f"))  
nlevels(sex)  
>  2  
levels(sex)  
>  "m"  "f"

`factor()`는 기본적으로 데이터에 순서가 없는 변수를 만듭니다. 만약 범주형 데이터지만 순서가 있는 값일 경우는 순서형 변수로 만들기 위해 `ordered()`를 사용하거나 `factor()`호출 시 `ordered=TRUE`로 지정해줍니다.

ordered(c("a",  "b",  "c")) 또는  factor(c("a",  "b",  "c"),ordered=TRUE)

### 벡터(Vector)

벡터에 나열하는 인자들은 한 가지 유형의 타입이어야 합니다. 만약 다른 타입의 데이터를 섞어서 저장하면 이들 데이터는 한 가지 타입으로 자동 형변환됩니다. `c()`안에 인자들을 나열하여 정의하면 됩니다.

x  <-  c(1,  2,  3,  4,  5)

그리고 벡터는 중첩될 수 없습니다. 중첩하려면 리스트를 사용해야 합니다. `c(1, 2, 3, c(1, 2, 3))`과 같이 중첩하게 되면 그냥 그대로 `1 2 3 1 2 3`이 들어가게 됩니다.

숫자형 데이터의 경우, `start:end`형태로 시작값부터 끝값까지의 값을 갖는 벡터를 만들 수 있습니다. 또는 `seq(from, to, by)` 형태로도 시작값과 끝값을 설정해주는 것이 가능합니다.

x  <-  1:10  
seq(1,  10,  2)  #이렇게 하게 되면 1부터 10까지 홀수만 나오게 됩니다.

`seq_along()`은 인자로 주어진 데이터의 길이만큼 1, 2, 3 ... N으로 구성된 벡터를 반환합니다. `seq_len()`은 N 값이 인자로 주어지면 1, 2, ... N 으로 구성된 벡터를 반환합니다.

seq_along(c('a',  'b',  'c'))  # 1 2 3  
seq_len(3)  #1 2 3

벡터의 각 셀에는 이름을 부여할 수 있습니다. `names()`에 원하는 이름을 벡터로 넘겨주면 됩니다.

x  <-  c(1,  3,  4)  
names(x)  <-  c("k",  "s",  "p")

그리고 벡터는 `x[1]`이나 `x[3]`같이 인덱스로 접근할 수 있고 `x[-1]`처럼 그 인덱스에 해당되는 요소를 제외시킬 수 있습니다.

벡터에서 원하는 위치에 있는 저장된 값을 가져오려면 `x[c(1, 3)]`처럼 색인 벡터를 넣어주면 됩니다.

`x[start:end]`도 가능합니다.

만약 이름이 있다면 이름으로도 접근이 가능합니다. `x["s"]` 또는 `x[c("s", "p")]`

벡터의 길이는 `length()` 또는 `NROW()`를 통해 알 수 있습니다. `NROW()`는 벡터를 n행 1열의 행렬로 취급해 길이를 반환하기 때문에 가능합니다.

`%in%` 연산자는 어떤 값이 벡터에 포함되어 있는지 boolean으로 알려줍니다.

"a"  %in%  c("a",  "b",  "c")  
>  TRUE

벡터를 집합으로 취급해 집합간 합집합, 교집합, 차집합을 계산할 수 있습니다.

setdiff(c("a",  "b",  "c"),  c("a",  "d"))  #차집합  
>  "b"  "c"  
union  (  c  (  "  a "  ,  "  b "  ,  "  c "  ) ,  c  (  "  a "  ,  "  d "  ) )  #합집합  
>  "a"  "b"  "c"  "d"  
intersect  (  c  (  "  a "  ,  "  b "  ,  "  c "  ) ,  c  (  "  a "  ,  "  d "  ) )  #교집합  
>"a"

집합간 비교는 `setequal()`을 사용합니다.

setequal  (  c  (  "  a "  ,  "  b "  ,  "  c "  ) ,  c  (  "  a "  ,  "  d "  ) )  
>  FALSE

#### 출처

-   [http://r4pda.co.kr/](http://r4pda.co.kr/)## R이란?

R은 데이터 분석을 위한 통계 및 그래픽스를 지원하는 자유 소프트웨어 환경이면서 하나의 컴퓨터 언어이자 다양한 패키지(통계, 머신러닝, 금융 등등의 라이브러리)의 집합입니다.

### 설치

'R'과 R을 사용하기 위한 IDE인 'RStudio'를 이용합니다.

### 변수

변수에 값을 할당할 때는 `<-` 또는 `<<-`또는 `=`을 사용합니다. 하지만 `=`은 경우에 따라 사용될 수 없는 경우가 있어 `<-`로 쓰는 게 좋습니다.

### NA와 NULL의 차이

`NA`는 길이가 1인 논리적 상수로 **missing value 이거나 만약 데이터에 값이 존재하지 않는다면 NA로 표시할 수 있습니다.** 즉, 지정한 범위의 값이 아닐 때 `NA`로 처리할 수 있습니다. 예를 들어, 설문지에 1번과 2번이 있는데 3번을 고른 사람이 있다면 `NA`로 나오게 됩니다. 어떤 변수에 `NA`가 저장되어있는지 확인하려면 `is.na()`함수로 확인할 수 있습니다.

`NULL`은 R의 NULL 객체를 나타냅니다. 예약어이고 **변수가 초기화되지 않는 경우에 사용할 수 있습니다.** 즉, 아직 데이터 값을 입력하지 않았을 때를 의미합니다. `NULL`이 할당되었는지는 `is.null()`함수로 확인할 수 있습니다.

### &와 &&의 차이

`&`는 AND 연산자로 boolean이 저장된 벡터끼리의 연산시 각 원소 간을 계산합니다.

`c(TRUE, TRUE) & c(TRUE, FALSE)`의 결과로 `TRUE FALSE`가 나옵니다.

`&&`는 AND 연산자로 boolean이 저장된 벡터끼리의 연산시 한 개의 boolean 값을 계산합니다.

`c(TRUE, FALSE) && c(TRUE, FALSE)`의 결과로 `TRUE`가 나옵니다.

> c()는 열벡터를 선언하는 명령입니다. `a <- c(1, 2, 3)`의 경우 (1, 2, 3)으로 된 열을 a 벡터에 넣습니다.

### 요인(Factor)

요인은 범주형 변수를 위한 데이터 타입입니다. 첫 번째 인자는 그 변수에 저장되는 값이고 두 번째 인자가 범주(Category)를 줄 수 있습니다. `nlevels()`로 범주의 수를 구할 수 있고, `levels()`로 범주 목록을 알 수 있습니다. 그리고 R에서 index는 0이 아닌 1에서 시작합니다.

sex  <-  factor("m",  c("m",  "f"))  
nlevels(sex)  
>  2  
levels(sex)  
>  "m"  "f"

`factor()`는 기본적으로 데이터에 순서가 없는 변수를 만듭니다. 만약 범주형 데이터지만 순서가 있는 값일 경우는 순서형 변수로 만들기 위해 `ordered()`를 사용하거나 `factor()`호출 시 `ordered=TRUE`로 지정해줍니다.

ordered(c("a",  "b",  "c")) 또는  factor(c("a",  "b",  "c"),ordered=TRUE)

### 벡터(Vector)

벡터에 나열하는 인자들은 한 가지 유형의 타입이어야 합니다. 만약 다른 타입의 데이터를 섞어서 저장하면 이들 데이터는 한 가지 타입으로 자동 형변환됩니다. `c()`안에 인자들을 나열하여 정의하면 됩니다.

x  <-  c(1,  2,  3,  4,  5)

그리고 벡터는 중첩될 수 없습니다. 중첩하려면 리스트를 사용해야 합니다. `c(1, 2, 3, c(1, 2, 3))`과 같이 중첩하게 되면 그냥 그대로 `1 2 3 1 2 3`이 들어가게 됩니다.

숫자형 데이터의 경우, `start:end`형태로 시작값부터 끝값까지의 값을 갖는 벡터를 만들 수 있습니다. 또는 `seq(from, to, by)` 형태로도 시작값과 끝값을 설정해주는 것이 가능합니다.

x  <-  1:10  
seq(1,  10,  2)  #이렇게 하게 되면 1부터 10까지 홀수만 나오게 됩니다.

`seq_along()`은 인자로 주어진 데이터의 길이만큼 1, 2, 3 ... N으로 구성된 벡터를 반환합니다. `seq_len()`은 N 값이 인자로 주어지면 1, 2, ... N 으로 구성된 벡터를 반환합니다.

seq_along(c('a',  'b',  'c'))  # 1 2 3  
seq_len(3)  #1 2 3

벡터의 각 셀에는 이름을 부여할 수 있습니다. `names()`에 원하는 이름을 벡터로 넘겨주면 됩니다.

x  <-  c(1,  3,  4)  
names(x)  <-  c("k",  "s",  "p")

그리고 벡터는 `x[1]`이나 `x[3]`같이 인덱스로 접근할 수 있고 `x[-1]`처럼 그 인덱스에 해당되는 요소를 제외시킬 수 있습니다.

벡터에서 원하는 위치에 있는 저장된 값을 가져오려면 `x[c(1, 3)]`처럼 색인 벡터를 넣어주면 됩니다.

`x[start:end]`도 가능합니다.

만약 이름이 있다면 이름으로도 접근이 가능합니다. `x["s"]` 또는 `x[c("s", "p")]`

벡터의 길이는 `length()` 또는 `NROW()`를 통해 알 수 있습니다. `NROW()`는 벡터를 n행 1열의 행렬로 취급해 길이를 반환하기 때문에 가능합니다.

`%in%` 연산자는 어떤 값이 벡터에 포함되어 있는지 boolean으로 알려줍니다.

"a"  %in%  c("a",  "b",  "c")  
>  TRUE

벡터를 집합으로 취급해 집합간 합집합, 교집합, 차집합을 계산할 수 있습니다.

setdiff(c("a",  "b",  "c"),  c("a",  "d"))  #차집합  
>  "b"  "c"  
union  (  c  (  "  a "  ,  "  b "  ,  "  c "  ) ,  c  (  "  a "  ,  "  d "  ) )  #합집합  
>  "a"  "b"  "c"  "d"  
intersect  (  c  (  "  a "  ,  "  b "  ,  "  c "  ) ,  c  (  "  a "  ,  "  d "  ) )  #교집합  
>"a"

집합간 비교는 `setequal()`을 사용합니다.

setequal  (  c  (  "  a "  ,  "  b "  ,  "  c "  ) ,  c  (  "  a "  ,  "  d "  ) )  
>  FALSE

#### 출처

-   [http://r4pda.co.kr/](http://r4pda.co.kr/)