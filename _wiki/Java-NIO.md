---
layout  : wiki
title   : NIO
summary : 
date    : 2019-06-20 15:10:01 +0900
updated : 2019-06-20 15:10:19 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

## NIO(New Input/Output)

자바 4부터 새로운 입출력이라는 뜻에서 java.nio 패키지가 포함되었는데 자바 7로 버전 업하면서 자바 IO와 NIO 사이의 일관성 없는 클래스 설계를 바로 잡고, 비동기 채널 등의 네트워크 지원을 강화한 NIO.2 API가 추가되었습니다.

NIO는 입출력 방식이 스트림이 아닌 채널방식이고 buffer를 쓰며, 비동기 방식을 지원합니다. 그리고 blocking과 non-blocking을 모두 지원합니다.

채널은 출력 스트림, 입력 스트림처럼 입출력 모두 생성하는 게 아니라 채널 하나로 양방향으로 입출력이 가능합니다. 예를 들어, 하나의 파일에서 데이터를 읽고 저장하는 작업을 해야한다면 FileChannel 하나만 생성하면 됩니다.

IO에서는 buffer를 쓰지않습니다. 출력 스트림이 1바이트이면, 입력 스트림이 1바이트를 읽습니다. 이런 방식이 대체로 느려서 보조 스트림으로 buffer를 사용한 BufferedInputStream, BufferedOutputStream을 사용합니다. NIO는 기본적으로 buffer를 사용하기 때문에 입출력 성능이 좋습니다.

NIO는 블로킹과 넌블로킹 특징을 모두 가지고 있습니다. IO에서는 입력스트림의 read()나 출력스트림의 write()를 호출하면 데이터가 입력하기 전까지 스레드는 대기상태가 되는데 이 때 아무 일도 할 수 없습니다. 그러나 NIO에서 블로킹은 스레드를 인터럽트함으로써 빠져나올 수 있고 넌블로킹에선 입출력 작업 준비가 완료된 채널만 선택해서 작업 스레드가 처리하기 때문에 작업 스레드가 블로킹되지 않습니다.

#### reference

- <https://opentutorials.org/course/1>
- 객체중심 java_강요천 지음
- 이것이 자바다_신용권 지음
