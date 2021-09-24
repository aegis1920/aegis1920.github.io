---
layout  : wiki
title   : Linux Command Line Text Processing
summary : 
date    : 2021-09-24 18:14:02 +0900
updated : 2021-09-24 18:23:46 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

회사 스터디에서 들었던 내용을 정리합니다.

```bash
cat hello*

cat -A "hello world" # vET option

tail -f -n2 hello1.log hello2.log

cat data.csv | cut -d',' -f1,4 > newdata.csv

echo "abc" | tr 'abc' '123'

```


