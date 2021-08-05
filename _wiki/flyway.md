---
layout  : wiki
title   : Flyway
summary : 
date    : 2021-08-05 20:09:47 +0900
updated : 2021-08-05 20:10:16 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

### DB 마이그레이션이란?

- 마이그레이션이란 '이주'
- 여러 DB를 하나의 DB로 합치거나 현재 DB를 타 DB로 옮기는 경우
- 개발 시스템에서는 DB 스키마가 변경됐지만 운영시스템의 DB 스키마가 변경되지 않았을 경우 마이그레이션을 수행

### DB  형상관리란?

- git 처럼 DB를 관리하기 위한 방법
- 즉, 데이터 베이스 스키마의 버전을 관리하기 위한 하나의 방법

### 왜 Flyway같은 Migration Tool(형상관리 툴)을 사용해야 하는가?

- 보통 서비스를 제공하는 경우 개발용 DB, 배포용 DB로 나뉜다. 개발용 DB에서 작업한 것을 배포용 DB에도 똑같이 동기화를 시켜줘야 하는데 이를 사람이 Migration 하기에는 위험 부담이 크다.
- 이런 Migration  기능을 제공해주는 Tool이 대표적으로 Flyway, Liquibase가 있다.
- 데이터베이스 스키마의 변화를 쉽게 관리해준다.

### 왜 Liquibase가 아닌 Flyway인가?

- Flyway
    - 마이그레이션 스크립트를 SQL뿐만 아니라 Java코드로 제공할 수 있음
    - Flyway github 저장소 활동이 Liquibase 저장소 활동보다 높음.
    - SQL을 완전히 제어하려면 Flyway가 좋은 선택
- Liquibase
    - XML, YAML, JSON 형식의 마이그레이션 스크립트를 지원함
    - (yml 파일과 같이) 추상화 계층이라서 보기 쉬움

### Flyway 사용법

1. 엔티티를 수정하는 일이 발생
2. DB도 수정되어야 하므로 수정하는  SQL을 작성해서 `V + 버전 + __ + 설명.sql` 에 작성
    - 해당 이름 규칙을 꼭 지켜야 함
    - 참고로 `__` 는 언더바 **2개임!**
    - 예시
        - `V1__Init.sql`
        - `V2.1__Create_Area.sql`
        - `V200820_deploy.sql`
            - 배포 일자가 있다면 파일 하나로 관리하는 것도 좋다고 함
3. 작성한 파일을 `src/main/resources/db/migration` 에 넣어줌
4. 그리고 spring boot를 실행시키면 자동으로 migration 됨
5. `flyway_schema_history` 라는 테이블에 여기에  변경 스크립트, 변경일, 변경결과 등이 자동으로 기록됨

### Flyway 주의 사항

- 엔티티에서 조금이라도 수정사항이 생긴다면 항상 SQL문을 작성
- `src/main/resources/db/migration` 에 작성된  SQL들은 절대 건드리면 안됨. 심지어 공백도 추가하면 안됨
- 로컬에서 엔티티를 수정했을 때 테스트의 properties가  `spring.jpa.hibernate.ddl-auto=create` 이기 때문에 테스트를 통과하는데 문제가 없음. 그러나 후에 머지가 되면  DB와 엔티티가 다르기 때문에 에러가 터짐. 즉, 테스트가 모두 통과되더라도 자신이 엔티티를 수정했다면 수정한대로 SQL을 작성해서  `src/main/resources/db/migration` 에 넣어줘야 함

```java
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.baseline-on-migrate=true
spring.flyway.baseline-version=0
```

### 출처

- [https://engkimbs.tistory.com/795](https://engkimbs.tistory.com/795)
- [https://meetup.toast.com/posts/173](https://meetup.toast.com/posts/173)

