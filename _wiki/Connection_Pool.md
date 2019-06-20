---
layout  : wiki
title   : 커넥션 풀
summary : 
date    : 2019-06-20 15:32:11 +0900
updated : 2019-06-20 15:33:33 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Connection Pool

pool을 안 썼을 때

* 요청 들어올 때마다 conn(Connection)을 연결하고 끊고를 반복한다. conn은 통신할 수 있는 프로그램을 띄운다고 생각. 결국 시간이 꽤나 걸린다.
* Connection 의 수가 컴퓨터가 갖고 있는 사양마다 제한적이다. 만약에 그 제한을 넘긴다면 다른 요청이 들어왔을 때 에러페이지를 띄운다. 



pooling을 쓰는 가장 큰 이유

* 전에 6단계중에서 가장 큰 시간(90%)을 잡아먹는 게 Connection이다. 그래서 DAO와 DBMS 사이를 바꿔줘야 한다. 
* 그러면 아예 Connection을 멤버 변수로 하면 되지 않을까? -> 서버가 다수의 요청을 처리하기 위해서 스레드로 파생시키는데 멀티스레딩이 안 되기 때문에. 서로 엮일 수 있다. 응답시간도 느려진다. 그래서 커넥션을 메소드마다 유지하면서 그 커넥션을 만드는 작업을 빠르게 가야 한다. 



## Connection Pool

* 서버가 시작할 때 Connection을 미리 연결 해 놓는 것. 그래서 처음에 Pool 생성시간은 꽤나 걸린다. 미리 연결해놓는데 그래서 이 때는 Connection pool에서 Connection 수를 정해놓는다. 
* DAO는  Connection Pool에게서 Connection을 가져오고 그대로 돌려준다(Close하지 않는다.)
* 데이터베이스 입장에서 보면 항상 일정한 Connection 수를 부여해서 일정한 부하를 주기 위해서, 전체 응답시간을 빠르게 하기 위해서. 
* DAO만 바뀐다.
* DBUtil만 바꿔서 엎으면 된다.
* 사용할 수 있는 Connection이 없을 떄는 기다린다.
  * 하지만 Connection의 반납속도는 엄청 빠르다. 그래서 수가 많아도 속도가 크게 감소하지 않는다. 엄청 빠르다. 크게 문제가 되지 않는다.
  * 또는 connection pool에서 connection의 수를 늘릴 수도 있고 여러 방법이 있다.
* 어떤 pool을 사용하느냐에 따라 해당하는 코드가 DAO에 들어간다. 톰캣 서버나 다른 서버, WAS마다 Connection pool의 구현이 다르다. 그래서 다시 인터페이스 개념이 들어간다. DataSource Interface. 그래서 어떤 Connection pool을 쓰더라도 안 바뀐다. 
  * javax는 확장된 것. 
* Connection pool은 하나이므로 싱글톤으로 만들어줘야 하며, 서버가 시작될 때 만들어주기 위해서 앱이 시작될 때 listening할 수 있도록 listener를 등록해서 Connection pool 객체를 생성한다. 최초에 pool이 만드는 시점이 listener. 시간이 오래걸린다. 
* 앱 전체에서 쓰기 때문에 application scope인 servlet context에 저장할 수 있다. 서블릿이나 jsp같은 얘들만 접근할 수 있다. Service나 dao얘들은 접근 못하고 컨트롤러만 접근할 수 있다. 
* 순수한 자바 클래스를 POJO라고 한다. 순수한 Servlet, JSP만 접근 가능하다.
* 그래서 보통의 WAS들이 선택한 차선책은 Naming Service. 어떤 결과를 반환해주는 게 Naming Service. 특정 이름으로 원하는 객체의 이름을 쓴다.
* Driver Class, 유저계정, 비번, url 등 값을 줄 수 있다.
* 톰캣이 Naming Service로 등록한다. 그래서 Name만 알면 객체를 가져올 수 있다. WAS마다 POOL을 구현하는 방식은 다 다름. Naming Service로 찾아오는 코드도 다르다. 그래서 이에 대한 인터페이스가 있다. JNDI(Java Naming and Directory Interface)라는 인터페이스. 이걸 이용하면 디렉토리 개념을 가져가서 그 디렉토리 자체를 리소스처럼 관리할 수 있다. 구조적인 계층 관리가 가능하다. 

Name | Object -> Connection pool을 등록하는 것.

Server에 있는 context.xml을 META-INF에 넣고 tomcat에서 지정해준 코드를 넣어준다. 그리고 DBUtil에서 DataSource로 해주면 끝.  



