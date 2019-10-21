---
layout  : wiki
title   : database
summary : 
date    : 2019-06-20 15:34:41 +0900
updated : 2019-09-24 10:18:15 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 데이터베이스

DBMS(MySQL)는 데이터를 관리해주는 프로그램.

DAO에서 SQL을 사용해서 DB연동을 하게 된다.

SQL

* DDL : 데이터베이스 객체 생성, 삭제, 수정등(Tabl, Index, Function)
* DML : 데이터 추가, 수정, 삭제
* DCL : 데이터 트랜잭션 관리(롤백, )
* DQL : 데이터 조회(얘를 묶어서 DML로 보기도 한다)



JDBC - 연결해서 작업을 할 수 있도록 해주는 표준 API로 제공된다. 접속이 됐으면 통로로 보내고 등등... 인터페이스임. 웹에 붙일 수 있다. 



FrontController(DispatcherServlet, 모든 요청 전 처리) - SubController(실질적인 Controller) - Service - DAO - DBMS



객체간 의존성(결합도)를 낮출 수 있게 인터페이스를 이용. DI(Dependancy Injection)

참조변수의 타입이 바뀐다는 건 사용법이 바뀐다는 것. 김준호라는 이름의 타입을 사용하지 않고 남자짝궁이라는 타입을 사용한다. 그러면 코드를 바꾸지 않아도 된다. new 같은 코드가 남아있으면 안 된다. 이렇게 조립해주는 역할을 스프링이 해준다. 객체를 의존해주는 걸 DI라고 한다. 코드를 바꿔도 영향을 안 준다. 

AOP -> 관점 지향 프로그래밍. 짜야되는 로직에만 집중할 수 있다. 지울 코드가 없다. 재컴파일하고 다시 빌드하는 과정은 아주 힘든 일이다.

Spring MVC도 배운다.

시스템 규모가 커지면 xml로 관리하는 게 편하다. 맵핑을 해주면 sqlsession이라는 api가 insert, update, select 다 있다. 한 줄이면 DB와 연동이 된다.

관계성 같은 거 다 mybatis가 모두 해준다. where절로 분기할 수 있는 코드를 짠다. 한 번의 쿼리 등록으로 많은 걸 할 수 있다. 약간 자료구조같은 역할

mybatis는 SQL들을 맵핑해서 이 SQL을 이용해서 SELECT해줘 이런 방식. SQL을 자유롭게 쓸 수 있다. 

난 객체 관점으로 ?? 하지만??? Hybernate를 쓰려면 설정이 좀 어렵다. mybatis가 많이 쓰인다. 

바커표기법...

부서코드는 식별되어야 한다. ID같은 역할. 주식별자. 주식별자 앞에 #. 

중복값이 있으면 빠르게 찾을 수 있으므로 사번같은 검색 색인이 있어야 함.

까치발. 다 대 일(사원과 부서)

한 부서에 여러 사원이 있거나 없을 수도 있다면 점선. 사원은 하나의 부서에 반드시 속해야 하면 실선.

정보공학 표기가 보기 더 쉽다.

|이면 무조건 하나, 0가 있으면 없는 표기. 0|이면 없거나 하나, 까치발은 1~다. 

레코드라는 말을 많이 쓴다. 

primary key. 중복될 수 없고 무조건 있어야 하는 것. not null이면서 못 지움. 주 식별자를 표현하기 위한 데이터베이스. 유일해야 한다.

참조에 무결하려면 외래키 제약 조건을 충족해야 한다. 2번 지역을 날렸다면 참조되는 해당하는 부서도 날려줘야 함.

참조의 결함을 막아주기 위해서 생긴 게 외래키.

뷰는 stored 쿼리. 쿼리가 질의하는 거니까 select를 만든 것. 급여같은 건 공개 안했으면... 보안상같은 이유로 쓰인다. 

부서별 사원 급여 평균, 사원 수 같은 것들. 계속 싱크를 맞춰줘야 한다. 이럴 때도 view를 만들면 된다. 부서 뷰.

동의어는 동의어 하나를 주는 것. 원본이름을 숨기기 위해서. 동어의를 쓴 사람들은 안 바뀜. 네이밍을 위해서.

ID가 주식별자라서 변경을 못 하는 것



대소문자 안 가림

유니크 해야하니까. 그런 얘들만 가능. 값을 갖는다면 중복 안되게

```sql
select 데이터 항목
from 테이블, 뷰
where 조건(레코드 필터링)
group by 그룹핑항목,
having 조건(그룹 필터링)
order by 정렬기준항목
limit 오프셋,레코드 갯수;
```

기본적으로 nullable

null은 0을 의미하지 않는다. 그래서 연산할 때 제데로 안 나온다. 이럴 때 함수를 써주면 된다.



조인 조건에 따라

* Equi-join : 조건이 '='인 형태
* non Equi - join : 조건이 '='이 아닌 형태

조인 형태(방식)에 따라

* Inner-Join(내부 조인) : 조인 조건에 부합하는 결과만 join
* Outer-join(외부 조인) : 조인 조건에 부합하지 않는 결과까지 포함하는 join

self-join : 상위 카테고리명을 갖고올 수 있게 한다. 자기가 자기하고 조인하는 것. 계층형 테이블의 형태를 띄우고 있을 때 가능하다. 

Cross join : 

natural join : join으로 연결되는 테이블들의 공통칼럼을 이용하여 조인





DDL은 자동화가 되기 때문에 하드 코딩을 하는 일이 거의 없다. 그러나 view나 dml은 잘 알고 있어야 한다.

제약 조건 primary key는 필수!, column별로 부여할 수도 있고(not null, 처음 생성할 때 줘야 한다), table 레벨 별로 부여할 수도 있다.( 나중에 줘도 된다)

바이너리 형태의 파일도 저장할 수 있다. 하지만 오버헤드가 클 수 있기 때문에 DB에 저장하지 않음. 글자를 저장할 때 최대크기. 그래서 캐릭터를 바이너리형태로 저장할 수 있다. 

```sql
CREATE TABLE BOOK (
    ISBN CHAR(8) NOT NULL,
    TITLE VARCHAR(50) NOT NULL, -- 숫자는 바이트 기준임. 글자수 기준이 아니라
    AUTHOR VARCHAR(10) NOT NULL,
    PUBLISHER VARCHAR(15) NOT NULL,
    PRICE INT NOT NULL,
    DESCRIPTION VARCHAR(200),
    CONSTRAINT PK_BOOK PRIMARY KEY (ISBN)
);
```



## 서브쿼리

다른 SQL에 안에 nesting되어지는 쿼리. Main 쿼리 안에 포함되는 쿼리.

where절에도 올 수 있고 having에도 올 수 있고 from에도 올 수 있다.

insert into XX 할 때도 서브쿼리를 줄 수 있다. delete 에도, update에도 where 절에 줄 수 있다.

DDL에도 서브쿼리(sq)를 줄 수 있다. 

create table XX as ( sq );



* 단일 행 서브쿼리 : select 수행결과가 1개인 행, unique한 컬럼을 조건으로 이용하면 무조건 단일행. 지금은 단일 행이지만 나중에 다중행이 될 수도 있기 때문에 조건을 잘 줘야 한다.
* 다중 행 서브쿼리 : select 수행 결과가 n개인 행(2이상), 비교 연산자 같은 게 달라질 수 있다.

서브쿼리가 단독으로 실행될 수 있고, 상관관계 서브쿼리가 있다. 

서브쿼리가 먼저 실행됨. 서브쿼리만 실행시키려면 영역 잡고 `ctrl + shift + enter` 



view를 통해서 insert한다는 의미는. view에 안보이는 나머지는 다 null이 된다. 그래서 그 나머지 컬럼들은 not null이면 안 된다.

데이터를 가공하지 않은 view를 simple view라고 하고, 데이터의 삽입같은 걸 모두 simple view에 한다. 읽기 전용으로만 view를 쓸 수도 있다. 

view를 생성할 때 with checkoption. 10번 부서의 view인데 40번 view의 데이터를 넣으려고 하면 에러를 일으킬 수 있도록 한다. 그 where 절에 벗어난 행동들은 하지 못 하도록. 

그룹핑을 한 건 complex view다.

조인한 view를 만들어 놓으면 하나의 테이블로 쓸 수 있다. 조인한 뷰. 

뷰를 많이 쓴다.

auto-commit하면 바로바로 DML문을 DB에 박아버리는 것. auto-commit이 활성화되면 DML 하나하나 모두 다 트랜잭션이다. 그래서 되돌릴 수가 없다. 

작업들을 하나로 묶어야 된다. 왜냐면 그 작업중 하나라도 잘못되면 다 Rollback되야 하기 때문에.

우리는 트랜잭션의 경계를 줄 필요가 있다. 

commit은 다 반영시키고 끝내라는 소리.

auto-commit 모드가 아니면 계속 기다림. 확정되기를. commit이거나 rollback이거나. 빨리 해줘야 된다. 왜냐면 다른 작업이 들어왔을 때 이미 들어온 작업이 이미 lock을 걸고 있기 때문에 다른 작업은 계속 기다리는 중이 된다. 

DDL은 트랜잭션 개념이 없다. 

truncate는 속도가 빠르다. DDL이라서 빠르다. 성능상 더 유리하다. 되돌릴 수 없음. 

실시간적으로 데이터를 바꾸고 있는 상황을 더티 ?? 라고 부름

독립된 걸 보장하고 있음. 앞쪽 얘들이 먼저 하고 있으니까. 

트랜잭션의 끝 : commit, rollback

이래서 MVC에서 서비스 계층이 필요하다. ORDER메소드 하나에다가 트랜잭션을 걸으면 된다. 

INDEX를 만들 때 칼럼을 1개 만드는 것보다 2개를 만드는 게 더 좋다. 입사일과 부서번호가 있을 때 입사일로만 찾으려고 하면 2개짜리로 쓸 수 있다. 복합으로 인덱스의 구성 순서의 첫 번째로 쓴다. 

mysql은 시퀀스가 없는데 oracle은 시퀀스가 있다. mysql이 시퀀스를 처리하는 방법은 따로 있다.

자동증가, 자동감소 같은 게 시퀀스.


부모의 존재와 무관하게 자식의 관계가 -> 비식별관계



1. Entity 식별
2. Entity 관계 식별(엔티티 관계 매트릭스)
3. 속성추출, 분류
4. 해당 프로세스가 어떤 작업을 하는지 CRUD. 
5. 데이터를 만들어내고 조회. 1:다로 중복을 피해주고, 엔티티가 상세화되고 그러면 정규화 생각. 불필요하게 중복되는 상황은 아닌지 확인. 
6. 어떤 엔티티 안에 다수 개의 속성을 가지는 속성이 있고 확장될 가능성이 있다면 따로 테이블로 빼기
7. 1, 2, 3정규화 알기. 일반 칼럼에 종속성을 보이는 게 있다면 
8. 외래키에도 인덱스를 주더라~. 정규화까지가 논리모델링.
9. 물리적 모델로 바뀔 때 관계는 제약조건으로... 제약조건은 데이터의 무결성을 위해서.
10. 엔티티의 유일성을 만족하게 해줄 수 있는 게 Private key.
11. create table하면서 칼럼에 바로 private key처럼 바로 줄 수 있다. 그러나 복합 조건으로 제약 조건을 줄 때는 constraint로 줘야 한다. 테이블 level의 제약조건이라고 한다. not null은 컬럼마다 주는 것임. 
12. 인덱스를 보고 레코드 찾고. 이게 오버헤드가 될 수 있다. 레코드가 어느정도 있고 값의 분포도가 좋아야 인덱스를 쓰는 게 좋다. 조건에 부합하는 레코드만 필터링. 
13. 역정규화. 미리 카운트를 맞춰주는 게 



선수과목은 계층형. 

개설강좌가 3개가 연결된다. 강의실과 교수, 과정

한 교수가 여러 개설강좌를 할 수 있고 한 개설 강좌도 여러 교수를 담당할 수 있다. 

N:M은 비식별이 없다. 왜냐면 하나라도 존재하지 않으면 선언 자체가 만족하지 않기 때문에?



## 정규화

나중에라도 증가할 수 있다면 미리 나눠놓는 게 좋다. 

고객번호는 주문번호에 종속된다. - > 엑셀 2차 정규화

주문수량은 특정 제품 번호의 수량. 

3차 정규화

* 고객 이름은 고객번호에 종속되고 있음

사진 같은 건 DB로 저장을 안 함. 왜? -> 레코드의 사이즈가 너무 커지기 때문에. 사진만 있는 DB로 뺀다. 오버헤드가 커질 수 있기 때문에. 

놓칠 수가 있기 때문에 별개로 함.



## 모델링 시험 공부

책 뒤에 요약페이지에서 공부하면 된다. 

속성은 2개 이상으로 이루어져 있어야 한다.

## hw05

결제는 한 가지 방식으로만 하는지. payment도 엔티티가 나오는 게 좋다. 주문에 따라 그만큼 나와줘야 함. 모두 다 수신되어지면... 

엔티티 잘 추출하고, 관계 잘 보고, 식별로 할지

DB가 진입장벽이 높다. 신입이 들어가기 어렵다. 이직률이 적다. 많이 안 바뀐다. 경험치로 잘할 수 있는 게 좋다. DB는 경험치 잘 쌓는 게 좋다. 티오가 없다. 큰 눈을 봐야한다. 업무 프로세스를 봐야...

개발이 좋아, 데이터 에 천직이면 해보겠다고 PUSH. 

---

로그인을 한다면 같은 클라이언트로 처리. 며칠 동안 안 사면 날려버리기. 

or 품목별로 취소도 가능할 수 있는지. 한 주문에 상품이 하나만 있나? 

3. from, where, select, order by. 순으로 실행. select가 마지막이 아니다.(X)
4. outer left, right 방향. 그 방향대로 기준이 되면서 직원 부서 테이블이 없더라도 가져온다(O)

#### DB 질의 모음

DATABASE 질의

1. 전체 부서의 모든 애트리뷰트들을 검색하라.
2. 모든 부서의 부서 번호와 부서 이름을 검색하라.
3. 모든 사원의 직급을 검색하라.
4. 모든 사원들의 상이한 직급을 검색하라.
5. 2번 부서에 근무하는 사원들에 관한 모든 정보를 검색하라.
6. 이씨 성을 가진 사원들의 이름, 직급, 소속 부서번호를 검색하라.
7. 직급이 과장이면서 1번 부서에서 근무하는 사원들의 이름과 급여를 검색하라. 
8. 직급이 과장이면서 1번 부서에 속하지 않은 사원들의 이름과 급여를 검색하라.
9. 급여가 3000000원 이상이고 , 4500000원 이하인 사원들의 이름, 직급, 급여를 검색하라. 그리고 BETWEEN도 써봐라.
10. 1번 부서나 3번 부서에 소속된 사원들에 관한 모든 정보를 검색하라. (IN을 써서)
11. 직급이 과장인 사원들에 대하여 이름과, 현재의 급여, 급여가 10% 인상됐을 때의 값을 검색하라.
12. MANAGER가  NULL인 사람의 모든 정보를 검색하라. (그리고 AND, OR, NOT에 대해 NULL의 관계를 쓰시오.)
13. 2번 부서에 근무하는 사원들의 급여, 직급, 이름을 검색하여 급여를 오름차순으로 정렬하라. (내림차순으로도 해보라.) (그리고 부서가 같을 경우는?)
14. 모든 사원들의 평균 급여와 최대 급여를 검색하라.
15. 모든 사원들에 대해서 사원들이 속한 부서번호별로 그룹화하고, 각 부서마다 부서번호, 평균 급여, 최대 급여를 검색하라. 
16. 모든 사원들에 대해서 사원들이 속한 부서번호별로 그룹화하고, 평균 급여가 2500000원이상인 부서에 대해서 부서번호, 평균 급여, 최대 급여를 검색하라. 
17. 김창섭이 속한 부서이거나 개발 부서의 부서번호를 검색하라.
18. 모든 사원의 이름과 이 사원이 속한 부서이름을 검색하라.
19. 모든 사원에 대해서 사원의 이름과 직속 상사의 이름을 검색하라. (조심하자. 의!)
20. 모든 사원에 대해서 소속 부서이름, 사원의 이름, 직급, 급여를 검색하라. 부서 이름에 대해서 오름차순, 부서이름이 같은 경우에는 SALARY에 대해서 내림차순으로 정렬하라. 
21. 박영권과 같은 직급을 갖는 모든 사원들의 이름과 직급을 검색하라. 
22. 영업부나 개발부에 근무하는 사원들의 이름을 검색하라. (조인의 경우도 있다.)
23. 영업부나 개발부에 근무하는 사원들의 이름을 검색하라. (여러 애트리뷰트가 이루어진 걸 반환하는 경우)

24. 자신이 속한 부서의 사원들의 평균 급여보다 많은 급여를 받는 사원들에 대해서 이름, 부서번호, 급여를 검색하라. (자신이 속한 부서의 사원들의 평균 급여! 잘 생각해보자.)

25. DEPARTMENT 릴레이션에 (5, HE, NULL) 투플을 삽입하는 INSERT문을 써라.

26. EMPLOYEE 릴레이션에서 급여가 3000000이상인 사원들의 이름, 직급, 급여를 검색하여 HIGH_SALARY라는 릴레이션에 삽입하라. HIGH_SALARY 릴레이션은 이미 생성되어 있다고 가정한다. 

27. DEPARTMENT 릴레이션에서 4번 부서를 삭제하라.

28. 사원번호가 2106인 사원의 소속 부서를 3번 부서로 옮기고, 급여를 5% 올려라.



<답지>
17. (SELECT DNO FROM EMPLOYEE WHERE EMPNAME = '김창섭') UNION (SELECT DEPTNO FROM DEPARTMENT WHERE DEPTNAME = '개발'); //부서번호 자체를 따로 나눠서 릴레이션으로 합집합을 해줄 수 있다.
18. SELECT EMPNAME, DEPTNAME FROM EMPLOYEE, DEPARTMENT WHERE DNO = DEPTNO;
//기본적인 조인이니까 반드시 외우자
19. SELECT E.EMPNAME, M.EMPNAME FROM EMPLOYEE E, EMPLOYEE M WHERE M.MANAGER = E.EMPNO;
20. SELECT DEPTNAME, EMPNAME, TITLE, SALARY FROM EMPLOYEE, DEPARTMENT WHERE DNO = DEPTNO ORDER BY DNO ASC, SALARY DESC;
21. SELECT EMPNAME, TITLE FROM EMPLOYEE WHERE TITLE = (SELECT TITLE FROM EMPLOYEE WHERE EMPNAME = 'PYG'); //진짜 말 그대로 어떤 애트리뷰트가 나오는지 확인을 시켜줘야된다.
22. SELECT EMPNAME FROM EMPLOYEE, DEPARTMENT WHERE DNO = DEPTNO AND  (DEPTNAME = 'business' OR DEPTNAME = 'dev');
또는 
SELECT EMPNAME FROM EMPLOYEE WHERE DNO IN ( SELECT DEPTNO FROM DEPARTMENT WHERE DEPTNAME = 'business' OR DEPTNAME = 'dev');
23. SELECT EMPNAME FROM EMPLOYEE WHERE EXISTS ( SELECT * FROM DEPARTMENT WHERE DNO = DEPTNO AND( DEPTNAME = 'business' OR DEPTNAME = 'dev')); //똑같이 조인을 해줘야 딱 그것만 TRUE로 나올 수 있다. 
24. SELECT EMPNAME, DNO, SALARY FROM EMPLOYEE E WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE WHERE DNO = E.DNO);



SELECT AO.ANIMAL_ID, AO.NAME FROM ANIMAL_INS AI RIGHT OUTER JOIN ANIMAL_OUTS AO ON AI.ANIMAL_ID = AO.ANIMAL_ID
WHERE AI.ANIMAL_ID IS NULL 
ORDER BY AO.ANIMAL_ID
















