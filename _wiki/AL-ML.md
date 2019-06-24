---
layout  : wiki
title   : AL과 ML
summary : 
date    : 2019-06-24 09:13:40 +0900
updated : 2019-06-24 11:08:11 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

# AL과 ML

## AL과 ML 소개 영상

머신러닝과 통계학과는 아주 밀접한 관계가 있다.

지도학습(Supervised Learning) - 자동차 사진을 주고 training시킨다. 자동차를 분류(classfication)할 수 있도록 학습하는 것. 결정 트리로 예측할 수 있다?

비지도학습(Unsupervised Learning) - 여러 개의 사진을 주고 비슷한 사진을 찾아라. 예를 들어서 x축이 키, y축이 나이라고 했을 때 분류할 수 있도록.

k-means 알고리즘. 각각의 데이터 포인트를 계산해서 기준점에서 얼마나 가까운지?

딥러닝(Representation Learning) - 의미가 있는 dimension은 남겨줘야 한다. 예를 들어 얼굴 인식을 할 때 처음에는 픽셀단위, 그다음은 경계선, 그 다음은 눈, 그 다음은 얼굴 순으로, layer 순으로 하게 된다. 눈 알고리즘, 입 알고리즘 등... 

Visual Intelligence. 숫자 필기 인식. ImageNet. Language Intelligence, Machine Translation

강화학습


## Linear Regression

분류와 차이가 있다. 이것의 결과는 3.5 6.2처럼 값을 내주는 것이 Regression. 가격을 예측할 때, 돈을 얼마나 쓸 것이냐 이런 것도 regression. 어떤 라인이 맞는지 컴퓨터가 알아들을 수 있도록 해야한다. 

여러 regression이 있다. w가 좋은 w인지, 안 좋은 w인지 기준을 판단해주는 것이 RSS(Residual Sum of Squares) 예측된 y값과 현재 y값의 차이를 가장 줄일 수 있도록 하는 것.

ridge regression은 w를 찾는데 w는 아주 큰 값들은 좋지 않다. 큰 값들은 빼도록... y값을 잘 찾아주는 w와 큰 값이 아닌 w를 찾자.

overfiting은 ?? 차이가 얼마나 나느냐.

## Naive Bayes 모형

기본 모형이다. 베이스 라인같은 개념.

Featrue - data detail

아이를 안고 있는 남자의 결혼했을 확률.

어떤 색깔을 가지고 있나... 데이터를 feature화 시킨 것.


각각의 픽셀 값을 정하는 것. 잘 구해내와야 한다. 

단어의 빈도수. 

확률을 곱할 때 0이 있으면 모두 0이 되기 때문에 조심.

데이터가 1000개 있다면 나눠서 써야 한다. 한 꺼번에 못 쓴다. 어떤 feature를 등록해야 분류를 잘 할 수 있을까. 





