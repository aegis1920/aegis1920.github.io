---
layout  : wiki
title   : Spring Batch
summary : 
date    : 2019-12-03 21:41:14 +0900
updated : 2019-12-03 21:43:23 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Spring batch

주문
정산

XML 기반이 아니다.
Java Config 스프링 4점대부터는 다 XML이 아니라 Java Config를 쓴다.
배치 애플리케이션이 있나? -> 
배치 처리는 컴퓨터에서 사람과 상호작용 없이 이어지는 프로그램(작업)들의 실행

사용자와 상호작용인

인터렉션이 발생하는 게 Web
Batch는 한 번 요청하면 땡. Spring batch와 DB가 왔다갔다한다.
웹은 상대적인 속도, 실시간 처리, QA 용이성 -> QA를 하면 테스터분들이 굉장히 잘 찾아준다.
Batch는 후속처리, 절대적인 속도, QA 복잡성. -> 실행하면 시간이 흘러가는 걸 볼 수 밖에 없다. QA하기가 어렵다. DB가 바뀐 것 빼고는 알 수가 없다. Batch 쪽은 테스트코드를 꼭 짜야된다. 

Spring Batch vs Quartz

- Quartz는 스케줄링 프레임워크
  - Spring Batch의 보안제 역할이지 대체제가 아니다.
  - 단지 매일 오전 9시에 A를 실행한다는 것만 해줄 수 있다.
- Spring Batch
  - 실행자가 누구든 상관없이 돌고 있는 프로그램이
    - 5억건, 인덱스를 아무리 해줘도  1초내에 응답이 나오지 않는다.
  - Spring Batch가 필요한 상황
    - 일정 주기로 실행되어야 할 때
    - 실시간 처리가 어려운 대량의 데이터를 처리할 때(100만이 아닌 몇 억건 정도)
    - 한 달에 한 번 실행이 된다는 의미는 한달 동안 쌓인 모든 데이터가 대상이라는 의미
    - 대용량 데이터 처리가 절대적인 요구 사항
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

### 출처

- https://www.youtube.com/watch?v=_nkJkWVH-mo&t=81s

