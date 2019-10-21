---
layout  : wiki
title   : application.properties을 만지다가 깨달았던 것
summary : 
date    : 2019-08-07 17:23:58 +0900
updated : 2019-08-07 17:33:59 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## 멤버변수에 있는 변수명과 application.properties에 있는 변수명을 똑같이 쓰면 안 된다

* 아래는 바르게 작성된 예시다.

### application.properties

```java
application.driverClassName=com.mysql.jdbc.Driver
application.url=jdbc:mysql://localhost:8000/~~~
application.username=scott
application.password=tiger
```

### DBConfig

```java
@Value("${application.driverClassName}")
private String driverClassName;
@Value("${application.url}")
private String url;
@Value("${application.username}")
private String username;
@Value("${application.password}")
private String password;
```
* DBConfig에서 private String으로 선언한 변수명과 application.properties에서 작성한 변수명이 달라야 한다.
* 예를 들어서 application.driverClassName를 driverClassName처럼 이름을 똑같게 설정하면 에러가 난다.
* 왜 그런지는 나도 모르겠다...


