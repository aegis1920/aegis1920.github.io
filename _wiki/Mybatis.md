---
layout  : wiki
title   : Mybatis
summary : 
date    : 2019-06-20 15:39:48 +0900
updated : 2019-12-11 20:14:42 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# MyBatis

원래 이름은 iBatis. 3버전으로 올라가면서 이름을 바꿨음.

Data Access Layer에 적용할 수 있는 framework. 이런 프레임워크는 필수가 된다.

mybatis를 ORM(Object Relation Mapping)이라고 부르기도 한다. 그러나 사실상 sql mapping만 하기에 orm이라고 부르기엔 애매하다. Needs를 오라클에 투영시킬 수 있다.

ORM은 보통 Hibernate, JPA 등등이 있다. DB를 튜닝하기에는 적절치 않다.

JDBC에서 insert하기 위해서는

1. getConnection -> 안바뀜
2. prepareStaement(?) -> sql이 들어가기 때문에 바뀐다. 그러나 실행할 때 외부에서 만들어서 주면 똑같아진다.
3. binding value(?) -> 얘는 sql이 바뀌면 무조건 바뀐다. 얘만 빼면 항상 똑같은 코드만 남는다. 회원을 insert하든, 도서를 insert하든. 
4. executeUpdate -> 안바뀜
5. release -> 안바뀜

select하기 위해서는

1. getConnection
2. prepareStaement(?)
3. binding value(?)
4. executeQuery
5. handling ResultSet
6. release

insert나 select나 DDL도 매우매우 비슷하다. 바뀌는 것과 바뀌지 않는 것을 식별해서 좋은 코드로 만들자. 

insert할 때는 mybatis가 1245를 해주고 우리는 3번만 해주면 된다. 우리가 sql을 알려줘야 한다. 우리가 xxx.xml이라고 만들고 여기에 sql을 만들어줄 수 있다. `<insert parameterType="User">insert into x values(#id, #{}) </insert>`처럼 태그 안에 줄 수 있다. 그래서 ?자리에 자기네들의 독자적인 걸 준다. 실행할 sql뿐만 아니라 binding할 value들을 설정해줄 수 있다. 

select할 때는 mybatis가 1246을 해주고 3번과 5번이 다르다.  `<select parameterType="int" ResultType="Dept">select deptno, dname, from dept where deptno = #{no} </select>` 파라미터 타입에 그 값 그대로 줄 수도 있다. vo가 오면 getter로 인식한다. ResultType은 클래스 명.  vo의 멤버변수를 컬럼 별명으로 주면 인식하고 해줄 수 있다. JDBC의 반복적인 코드를 Mybatis가 대신해준다. 또한 Mybatis는 동적쿼리를 줄 수 있다. 사용자가 뭘 수정할 지 모르니까 다 수정하는 것으로 짠다. 수정이 안 된 거는 update할 필요가 없다. 그래서 동적으로 수정이 안 된 얘들은 동적으로 빼서 수정이 된 얘들만 처리를 알아서 해준다. where절을 코드 짜듯이 짠다. 값에 따라서 생성되기도 하고 생성이 안 되기도 하고. 

```xml
<delete id="deleteDirector" parameterType="string">
 		delete from director where director_id = #{id}
 </delete>
```

parameterType에 소문자로 string을 줘도 된다. mabatis에서 알아서 자동으로 되도록 해놨다. 그리고 #{id}도 그냥 {a}로 쓸 수도 있다. 왜냐면 파라미터가 string으로 오기 때문에. 객체가 올 때만 아이디를 제대로 줘야하고.

## MyBatis 사용하기

1. pom.xml에 등록(mybatis, mybatis와 spring을 연결, dbcp 등등...) -> Maven이 알아서 라이브러리를 받아준다.
2. DAOImpl에는 session, ServiceImpl에는 DAO를 setter나 constructor로 만들어준다.
3. beans.xml에서 xxxService부터 쭉 연결해준다. s와 c를 포함시켜서 s:xxx=ref로 그 다음 클래스를 연결시켜준다.
4. session, sqlSessionFactory, dataSource 순으로 만들어주고 마지막에 db의 정보가 들어있는 location을 context:property-placeholder로 경로를 설정해준다.
5. resources 아래에 각각 클래스에 줄 xml파일과 sql을 mapping해줄 sqlMapConfig를 만들어준다.
6. sqlMapConfig에서는 클래스 이름을 편하게 주기 위해서 typeAlias를 이용하고, 각 클래스 xml을 맵핑해주기 위해서 mapper로 등록해준다.
7. 각 클래스 xml 파일에 sql문을 적는데 칼럼명은 db에 들어있는 것으로 주고 주려고자 하는 파라미터 타입을 기입해 준후, 입력하고자 하는 곳을 #{}으로 적는다. 그리고 여기 안에 넣으려고 하는 멤버 변수의 이름도 제대로 준다.
8. insert, update, delete같은 경우 return되는 게 없기 때문에 그냥 parameterType만 주면 되지만, select 같은 경우, 결과물이 나오기 때문에 resultType 혹은 resultMap을 줘야 한다. 
9. DAO에서 selectOne을 하게 되면 select한 결과가 나오는데 하나의 결과물만 나오게 된다. 즉, primary key를 써야 한다. isbn이나 id같이. 
10. selectList를 줄 때 결과물의 타입은 같으므로 resultType으로 줘도 된다. 또는 resultMap으로 줘도 된다. 
11. resultMap을 정의해줄 때 어떤 타입인지 type=을 써줘야 한다. id를 적어주고 확장된 것이라고 extends를 써준다.

### Mybatis를 쓰면서 깨달은 점

- MySQL, MariaDB에 있는 auto increment를 설정하고 insert해줄 때 두 가지 방법이 있다.
    - `useGeneratedKeys="true" keyProperty="id"`
    - insert xml 태그 안에 `INSERT INTO TABLENAME(id, ~) VALUES (0, ~)` 와 같이 auto increment되는 칼럼 안에 0을 넣어주면 자동으로 증가한다.
    - 그리고 DTO 클래스에 id를 추가해줘야 한다.

## log

SLF4J가 JDBC같은 느낌이고 logback이 Mysql같은 느낌이다. 

log level이 있다. 그리고 그 레벨마다 메소드가 다르다. loger라는 얘가 Level별로 메세지를 남긴다. 그 메세지를 어느 위치에 남길건지를 우리가 알려줄 수 있다. 그리고 그 위치를 정할 수 있는 방법이 logback.xml이다. 로그를 제어할 수 있다. 로거들을 여러 개 등록할 수 있고 이름은 보통 패키지명을 준다. 그 패키지로 남긴 얘들 다 남겨라 얘기해준다. 만약 level이 trace라면 trace위에까지 다 남긴다. 디버깅할 때마다 sysout 찍고 그러지 않아도 된다. 로거의 name은 mapping파일의 namespace를 적어준다. root로거를 무시하고 자기만의 로거만을 가질 수도 있다. root는 기본적으로 남는 애

1. ERROR
2. WARN
3. INFO
4. DEBUG
5. TRACE

Director.xml에서 delete에도 for문으로 돌려서 체크된 얘들만 뽑아내서 줄 수 있다. 

