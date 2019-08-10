---
layout  : wiki
title   : Vender Prefix란?
summary : 
date    : 2019-08-10 14:34:19 +0900
updated : 2019-08-10 14:44:32 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Vender Prefix란?

* 몇몇 CSS3의 기능들은 웹 표준이 아니라서 다른 브라우저에서 제대로 표현되지 않을 수 있다.
* 그래서 속성명 앞에 `-webkit-`, `-moz-`, `-o-`, `-ms-`등 접두어(prefix)를 붙여줄 수 있다.
* 각각 크롬/사파리, 파이어폭스, 오페라, IE이다.
* 표준 속성을 맨 마지막에 써줘야 한다.

### 예시

```css
div{
-moz-border-radius:10px;
-webkit-border-radius:10px;
-o-border-radius:10px;
border-radius:10px;
}
```

