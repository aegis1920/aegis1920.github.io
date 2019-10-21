---
layout  : wiki
title   : 내부망을 사용했을 때 git push를 하면 나오는 오류
summary : 
date    : 2019-06-25 13:24:23 +0900
updated : 2019-06-25 13:28:50 +0900
tags    : 
toc     : true
public  : true
parent  : error
latex   : false
---
* TOC
{:toc}

## 내부망에서의 git push

보통 와이파이나 집에서 하는 공개된 망에서는 상관없는데 보안 이유상에서 내부망을 사용할 때는 단순히 `git push origin master`를 하면 오류가 난다. 

`remote: The project you were looking for could not be found`라고 오류가 뜬다.

왜인지는 잘 모르겠지만 remote url에 아이디를 붙여서 설정해주면 된다.

`remote set-url origin https://user_name@address/user_name/proj_name.git`


