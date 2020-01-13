---
layout  : wiki
title   : Spring Batch
summary : 
date    : 2019-12-03 21:41:14 +0900
updated : 2020-01-13 17:03:33 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Spring batch

- Spring Framework의 특성을 기반으로 한 Batch Framework
- 보통 주문, 정산과 같이 대용량 데이터를 주기적으로 처리할 때 쓰인다.
- 교과서적으로 말하자면 Logging/Tracing, 트랜잭션 관리, 처리 통계, Job 재시작, skip, 자원관리를 포함해 대량의 레코드를 빠르게 처리할 수 있는 기능을 제공한다.
- XML 기반이 아니다. Java Config를 쓴다. 스프링 4점대부터는 XML이 아니라 다 Java Config를 쓴다.
- 배치 처리란 컴퓨터에서 사람과 상호작용 없이 이어지는 프로그램(작업)들의 실행을 의미한다.
- 스케줄러와 함께 작동하도록 설계되었다.
- 대량 병렬 처리로 진행한다.

### Web 어플리케이션과 Batch 어플리케이션의 차이

- Web 어플리케이션
    - Batch는 한 번 요청하면 땡. 모든 처리가 Spring batch와 DB를 왔다갔다하며 처리된다.
    - 웹은 상대적인 속도, 실시간 처리, QA 용이성 -> QA를 하면 테스터분들이 굉장히 잘 찾아준다.
- Batch 어플리케이션
    - 사용자와 상호작용하는 인터렉션이 발생하는 것이 Web 어플리케이션
    - Batch는 후속처리, 절대적인 속도, QA 복잡성 -> 실행하면 시간이 흘러가는 걸 볼 수 밖에 없다. QA하기가 어렵다. DB가 바뀐 것 빼고는 알 수가 없다. 그래서 Batch 쪽은 테스트코드를 꼭 짜야된다. 

### Spring Batch vs Quartz

- Quartz는 스케줄링 프레임워크
    - Quartz는 Spring Batch의 보안제 역할이지 대체제가 아니다.
    - 단지 매일 오전 9시에 A를 실행한다는 것만 해줄 수 있다.
- Spring Batch는 Batch 프레임워크
    - 실행자가 누구든 상관없이 돌고 있는 프로그램이 이다.
    - 5억건, 인덱스를 아무리 해줘도 1초내에 응답이 나오지 않는 작업을 빠르게 해줄 수 있다.

### Spring Batch가 필요한 상황

- 일정 주기로 실행되어야 할 때
- 실시간 처리가 어려운 대량의 데이터를 처리할 때(100만이 아닌 몇 억건 정도)
- 한 달에 한 번 실행이 된다는 의미는 한달 동안 쌓인 모든 데이터가 대상이라는 의미
- 대용량 데이터 처리가 절대적인 요구 사항

### 배치 원칙 및 지침

- 가능한 단순화하고 복잡한 논리 구조를 구축하지 마라.
- 시스템 I/O를 최소화하라. 내부 메모리에서 가능한 많은 작업을 수행해라
- 배치를 실행할 때 작업을 두 번 수행하지 마라.

> 나머지는 어려워서 일단은 패스

### Spring Batch의 구성

- Spring Batch에서 하나의 Job은 여러 개의 Step으로 구성되어 있고 하나의 Step은 각각 하나의 ItemReader, ItemProcessor, ItemWriter로 구성되어있다.
- Job은 JobLauncher에 의해 실행되고 현재 수행중인 Job의 metadata는 JobRepository에 저장된다.

#### Job

- Job은 전체 배치 프로세스를 캡슐화한 Entity다. Job은 XML 기반 또는 Java Config로 설정할 수 있다.
- Job은 최상위 요소로 Step들을 포함하고 있는 컨테이너다. 여러 스텝들을 논리적으로 결합해서 Job의 재시작 여부, Step의 순서, Job의 이름 등을 설장할 수 있다.

##### Job Instance

- Job이 실행되는 논리적인 개념을 의미한다. 매일 1번 실행되는 Batch Job이 있다면 하루에 1개의 Job Instance가 있다고 보면 된다.
- 1일에 실패한 Job과 2일에 성공된 Job은 같은 Job Instance다. 따라서 Job Instance는 여러 번 실행될 수 있다.
- Job Instance 자체에는 데이터를 로딩하는데 소비되는 리소스는 없다. 데이터 로딩과 같은 작업은 전적으로 ItemReader를 어떻게 구현하냐에 따라 달려있다.
- 새로운 Job Instance를 사용한다는 의미는 처음부터 시작이라고 보면된다.
- 이미 존재하는 Job Instance를 사용한다는 의미는 중단된 시점부터 시작이라고 보면 된다.

##### Job Parameter

- Job Parameter로 Job Instance를 구별할 수 있고 수행되는 동안 데이터를 참조할 수도 있다.

##### Job Execution

- Job Execution은 Job을 수행하기 위해 한 번의 시도 개념으로 보면 된다.
- execution은 성공/실패로 끝날 수 있으나 Job Instance는 execution이 성공적으로 종료될 때까지 완료된 것으로 보지 않는다.
- Job Execution의 속성
    - status : BatchStatus.STARTED, BatchStatus.FAILED, BatchStatus.COMPLETED
    - startTime : 실행된 시간
    - endTime : 종료된 시간
    - exitStatus : 수행 결과. 속성을 가지고 있으며 caller에게 반환된다.
    - createTime : JobExecution이 처음으로 생성된 시간
    - lastUpdated : JobExecution이 존재했던 마지막 시간
    - executionContext : execution간에 필요한 user data를 가지고 있는 보관소
    - failureExceptions : Job이 실행동안 발생한 예외 리스트

#### Step

- Step은 Job에서 독립적이고 연속되는 시점을 캡슐화한 Object이다.
- 모든 Job은 하나 이상의 step으로 구성되고 step은 실제 배치 처리에 필요한 모든 정보를 가지고 있다.
- 구현에 따라 간단할 수도 있고 복잡할 수도 있다.

##### Step Execution

- Step의 1회 수행 시도를 의미한다.
- step이 실행된다면 StepExecution이 생기지만 이전 Step이 실패한다면 더 이상 StepExecution은 생겨나지 않는다.
- StepExecution은 클래스로 표현되는데 JobExecution의 속성과 대응된다.

#### Job Repository

- Job Repository는 위 항목들의 persistence mechanism이다.
- JobLauncher, Job, Step을 위한 CRUD 연산이 구현되어 있다.
- Job이 처음 실행되면 JobExecution은 JobRepository로부터 획득되고 진행중인 동안 StepExecution과 JobExecution의 구현이 JobRepository를 통해 처리된다.

#### JobLauncher

- 주어진 JobParameter로 Job를 수행시키는 인터페이스

#### ItemReader

- Step에서 Input처리를 위해 만들어놓은 것으로 한 번에 1개의 Item만 있다.
- ItemReader가 처리할 수 있는 정도를 넘어가면 null을 return한다.

#### ItemWriter

- Step에서 output처리를 위해 만들어놓은 것

#### ItemProcessor

- Item의 비즈니스 처리를 위해 만들어놓은 것으로 처리하는 동안 Item이 유효한지 write하면 안되는 null을 받았는지 확인

  - 스프링 배치는 모든 데이터를 메모리에 쌓지 않는 조회 방식이 기본 방식
  - chunk size만큼 commit한다.
    - 읽어올 때도 만 건씩만 끊어서 가져오거나 DB의 커서라는 것으로 빨아들이면서(?) 읽어온다.
  - jpaRepository.findAll() 방식으로 진행해서는 안 된다.
- Job / Step / Tasklet
- Job > Step > tasklet > 익명 Tastlet, Chunk Oriented Tasklet > reader, processor, writer
- 안까지 까보면 ChunkOrientedTasklet은 Tasklet의 구현체이다.
  - 말 그대로 청크지향, 만 건씩 끊어서 save하는 모음 구현체.
  - 결과적으로 다른 개념이 아니다.
- Spring Batch는 외부에서 파라미터를 주입받아 Batch 컴포넌트에서 사용할 수 있다. 이를 Job 파라미터라고 한다.
  - 사용법 : @Value("#{jobParameters[파라미터명]}") 타입 이름
- Step에서 사용할 수 있는 @JobScope, Tasklet / Reader / Processor / Writer 에서 사용할 수 있는 @StepScope
  - Spring Batch의 JobParameter는 Long / String / Double / Date타입을 모두 지원한다.
  - 근데 Enum, LocalDate, LocalDateTime은 지원 안 된다.
  - 그래서 매번 형변환이 필요하다.
    - @Value의 특성을 이용하자. setter 메소드에 @Value를 선언 문자열로 받은 뒤 원하는 타입으로 세팅.
- 관리 도구들에서 Spring Batch Admin은 쓰면 안 된다. github에 가보면 Deprecated되어있다.


어떤 SQL문을 하든 가능하다. insert를 하든, select를 하든 

### Spring Batch에서 application.properties 설정

```java
# 스프링부트 2.0일 때 얘를 설정해주면 해당하는 DB에 자동으로 스키마가 생성된다. 새로고침 해보면 많은 테이블들이 생성되어있다. never로 설정해서 끌 수도 있다.
spring.batch.initialize-schema=always

# 디폴트는 true, 시작 시 컨텍스트 내의 모든 스프링 배치 작업들 수행 여부, 즉 자동 작업 시작을 의미한다.
spring.batch.job.enabled=false
```



### 출처

- https://www.youtube.com/watch?v=_nkJkWVH-mo&t=81s
- https://becko.tistory.com/95?category=487737
- https://docs.spring.io/spring-batch/docs/current/reference/html/index.html


