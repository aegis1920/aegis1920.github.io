---
layout  : wiki
title   : ~>의 의미와 bundle install과 bundle update의 차이
summary : 
date    : 2019-06-21 13:50:45 +0900
updated : 2019-06-21 13:51:33 +0900
tags    : 
toc     : true
public  : true
parent  : study
latex   : false
---
* TOC
{:toc}

# ~>의 의미와 bundle install과 bundle update의 차이

gemfile에서  `gem 'rails', '~> 5.0.6'`가 써져있는 걸 보고 저게 무슨 의미인지 궁금해져서 찾아보기로 했습니다.

## `~>`의 의미

`~>`의 의미는 그 수와 같거나 크면서(이상) 그 수의 마지막 자리를 올림한 것보다 작은 것(미만)을 의미합니다.

예를 들어,  `~> 2.3`은 2.3 이상 3.0 미만,  `~> 2.3.0`은 2.3.0 이상 2.4.0미만을 나타냅니다.

## `bundle install`과  `bundle update`의 차이

`bundle install`과  `bundle update`  모두 없었던 gem을 설치해줍니다. 하지만  `bundle update`는 몇 가지 일을 더 합니다.

`bundle install`

-   없던 gem을 설치해줍니다.

`bundle update`

-   없던 gem을 설치해줍니다.
-   gem에 버전이 없으면 최신버전으로 업그레이드합니다.
    -   Ex)  `gem 'rails_db'`
-   gem에 ~>로 제어되는 경우, 그 범위 내에서 최신 버전으로 업데이트 됩니다.
    -   Ex)  `gem 'rails' '~> 5.0.7'`
    -   예를 들어, 최신 버전이 2.1.5인  `'foo_gem', '~> 2.1.0'`  이라는 gem을 쓰고 bundle update를 쓰면 2.1.5가 설치됩니다. 그러나 2.2.6이 최신 버전이이면 아무 것도 하지 않습니다. 왜냐면 2.2.6은 2.1.X 라는 범위 즉, ~>의 범위를 넘어서기 때문입니다.

**출처**

-   [https://stackoverflow.com/questions/5170547/what-does-tilde-greater-than-mean-in-ruby-gem-dependencies#comment12551998_5170547](https://stackoverflow.com/questions/5170547/what-does-tilde-greater-than-mean-in-ruby-gem-dependencies#comment12551998_5170547)
-   [https://stackoverflow.com/questions/16495626/difference-between-bundle-install-and-bundle-update](https://stackoverflow.com/questions/16495626/difference-between-bundle-install-and-bundle-update)
