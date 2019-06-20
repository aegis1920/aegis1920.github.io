---
layout  : wiki
title   : JDBC
summary : 
date    : 2019-06-20 15:34:02 +0900
updated : 2019-06-20 15:34:23 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# JDBC

MySQL과 Oracle과 같이 다른 DBMS더라도 똑같이 사용할 수 있도록 JDBC API라는 걸 SUN에서 제공해줬다. JDBC는 인터페이스의 집합. 즉, 리모컨의 사용법을 익히는 느낌. 그래서 Oracle이나 Mysql이나 똑같이 사용할 수 있게 된다. 약속된 메소드를 만들어서 제공해주기 때문에. 컴파일을 할 수 있지만 반응할 수 있는 알맹이 (DBMS)가 필요하다. 그러한 라이브러리를 받아와야 하는데 그걸 JDBC 드라이버(JDBC Class Library)라고 한다. 인터페이스 집합의 알맹이들을 위해서 

동작원리가 모두 다형성이다. 컴파일은 네모(인터페이스)로 동작하지만 실행은 세모(mysql)로 동작, 컴파일은 네모(인터페이스)로 동작하지만 실행은 세모(Oracle)로 동작. JDBC 라이브러리인 드라이버만 바꿔주면 된다. 코드는 바뀌지 않는다. 그래서 DAO는 독립성을 가질 수 있다. 



## 사용법

1. Driver Class Loading(어쩌구 저쩌꾸 클래스가 있음. DB랑 접속할 수 있도록 해주는 도우미), 다중 DB에 접근할 수 있다. 테스트는 무료 DB로 하고, 진짜 할 때는 유료 DB로 하는 경우가 있다. (Driver class 등록) ==> 한 번만 수행되면 된다. jdbc jar file 추가해야된다. build path로 추가.
   - DriverManager(나 너의 관리 받을게~ 등록.)
     1. xxxDriver
     2. xxxDriver
   - Class.forName("mysql driver") -> 문자열의 매개변수로 DB를 정해줄 수 있다. Oracle로 바꾸면 Oracle로 된다. 한 번만 설정해주면 된다.
   - 문자열 중 2번째에는 항상 Driver의 벤더 이름이 온다.
   - DB마다 Driver class가 다르다. 
2. Connection 생성(DB 접속, 시간이 오래 걸린다. 프로세스 하나를 만들고 죽이는 작업, 은행원을 고용하고 퇴사시키는 작업과 같음)
   1.  `Connection com = DriverManager.getConnection(url, uid, upass);`
   2.  Connection은 껍데기. mysql이 들어오면 mysql이 되고, oracle이 들어오면 oracle이 된다. 이 인터페이스를 구현한 놈이 들어오면 그대로 진행된다.
   3.  하나의 xxxDriver에 Connection을 여러 개 만들어줄 수 있다. (DB마다 제한은 있다)
   4.  Connection 생성이 가장 큰 오버헤드를 발생시킨다.
   5.  따라서 시작 시 여러 Connection을 미리 맺어놓고 사용한다.(Pooling)
   6.  웹으로 가면 pooling에서 꺼내오는 코드로 바뀐다. 
3. Statement 생성
   1. socket에서의 stream과 같은 역할
   2. Statement stmt= com.createStatement();
   3. Statement또한 인터페이스로 얘를 구현한 놈이 들어오면 그대로 진행. mysql이든, Oracle이든 코드는 안 바뀐다.
   4. 한 Connection statement는 여러 개를 만들 수 있다.
4. SQL 전송(DML, DQL, DDL)
   1. 리턴 값에 차이가 있어서 나눠놓았다.
   2. int rowCount = stmt.executeUpdate(DML); // dml 전용.
   3. ResultSet rs = stmt.executeQuery(DQL); // ResultSet도 인터페이스다. select 전용.
   4. boolean f = stmt.execute(SQL, 모두 다 올 수 있다); // 그러한 결과 집합이 있으면 true. hasResultSet의 느낌. DML이라면 내가 실행한 SQL이 select라면 true. 일반화 시킨 메소드, DML, DQL, DDL도 수행할 수 있는 메소드. flag를 이용함. 
   5. getRowcount, getResultSet으로 값을 가져올 수 있다.
5. if DQL(뭔가 가져올 때), 결과집합 처리하는 게 5단계
   1. 그 테이블 값(조회된 레코드, 데이터)을 가르키는 포인터가 ResultSet이다. 포인터기반 커서.
   2. 그 값을 주는 것이 아니고 가리키기만 해주는 것. 
   3. 커서는 레코드 사이사이를 움직일 수 있다. 맨 처음에는 레코드 이전에 커서를 놓는다. 왜냐면 해당하는 레코드가 없을 수도 있기 때문에 레코드 이전에 커서를 놓는 것. 그래서 데이터를 읽을려고 하면 그 데이터 단위로 움직여야 한다. 커서는 한쪽으로만 움직일 수 있다. 그러나 보통 맨 앞에서부터 쭉 가는 게 기본이다. 그렇게 해주는 것이 next(). 그래서 맨 처음에 한 번은 next()를 불러줘야 한다. rs.next(). 커서를 움직인 다음에 레코드가 있으면 true, 없으면 false. 레코드가 1개여도 불러줘야 한다. 왜냐면 커서가 레코드 이전에 있으니까.
   4. while문으로 돌리면 된다.
   5. rs.getXX 메소드가 있다. rs.getInt()처럼 xx에는 데이터 타입이 온다. 매개변수에 숫자를 주면 그 컬럼의 순서로 쓸 수 있다. 아니면 컬럼명으로 줄 수도 있고.
   6. 
6. 모든 자원을 해제
   1. 열려있던 것들 모두 close. 그러지 않으면 계속 데이터를 물고있다. 
      1. 순서대로 close하면 된다. = finally 구문을 사용한다.
      2. rs.close();
      3. stmt.close();
      4. com.close();
   2. 



DriverManager -> Driver -> PreparedStatement -> 

### PreparedStatement

Statement, PreparedStatement, ResultSet 모두 인터페이스. statement가 더 상위타입

* PreparedStatement 같은 경우, ?가 들어오면 데이터가 들어올 자리야라고 말해주는 것.
* ?에 키워드나 칼럼명은 못 쓴다. 

Statement는 통로를 만들 때마다 sql을 실행.

Statement의 하위타입인 PreparedStatement는 통로를 만들어줄 때 전용 통로를 만들어준다. SQL injection을 막아준다. 이상하게 들어오는 것도 막아준다. 데이터 조회가 안 된다. 통로에 sql을 각인해놓는 느낌. 3개의 sql이라면 3개의 PreparedStatement가 실행된다.

1. 인젝션으로부터 보호
2. 전용통로라서 똑같은 쿼리를 반복 실행할 때 더 효과적이다. - 세이브가 된다.

if와 while을구분해야 한다. 



ps. WEB-INF 아래 lib에 라이브러리를 넣어두면 class path를 알아서 잡아준다. 그래서 애플리케이션을 개발하게 되면 여기다 넣어두고 바로 실행하면 된다. 배포할 때 설정까지 읽지 않는다. 그래서 배포할 때는 lib에 넣어줘야 한다



