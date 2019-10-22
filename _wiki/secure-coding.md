---
layout  : wiki
title   : 시큐어 코딩
summary : 
date    : 2019-10-16 09:20:57 +0900
updated : 2019-10-16 11:09:24 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## SQL Injection

- SQL 쿼리문의 일부로 사용되는 사용자의 입력데이터에 대한 적절한 검증 작업이 수행되지 않아서 발생.

### 안전하지 않은 코드 예

- password : `123' or '1'='1`을 치면 항상 TRUE로 맞다고 판단되어 인증된다.

```
String query = "SELECT * FROM users WHERE userid = '" + userid + "'" + "AND passwword + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

```
<select id="getPerson" parameterType="String" resultType="org.application.vo.Person">
    SELECT * FROM PERSON WHERE NAME LIKE '${name}'
</select>
```

### 안전한 코드 예

- PreparedStatement가 막아준다.

```
String query = "SELECT * FROM users WHERE userid =? AND password=?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, userid);
stmt.setString(2, password);
ResultSet rs = stmt.executeQuery();
```

```
<select id="getPerson" parameterType="String" resultType="org.application.vo.Person">
    SELECT * FROM PERSON WHERE NAME = '#{name}'
</select>
```

## 크로스사이트 스크립트(XSS)

- 악의적인 데이터는 웹 어플리케이션을 매개로 다른 사용자의 브라우저에서 실행되도록 함

### 안전하지 않은 코드 예

```
<% String customerID = request.getParameter("id"); %>
Customer ID : <%= cumtomerID %>

out.writeln("searched for : " + request.getParamter("q");
```

- id 값에 주소와 다른 주소로 보내는 script를 작성하면 XSS 공격이 실행된다.
- 크로스사이트 스크립트(XSS) 취약점을 제거하기 우히ㅐ서는 외부입력값을 안전하게 필터링해서 사용해야한다.
- Filter를 통해서 필터링을 적용하고 Interceptor에서 입력값 필터링을 수행한다.
- Controller 안에 Validator에서 입력값 필터링을 수행한다.

### 안전한 코드 예

```
<% String customerID = request.getParameter("id"); %>
Customer ID : <c:out value=${customerID} />

out.writeln("searched for : " + xssFilter(request.getParamter("q")));
```

