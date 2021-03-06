---
layout  : wiki
title   : 마스터링 TCP/IP를 읽고...
summary : 
date    : 2019-08-05 11:36:15 +0900
updated : 2019-08-05 20:54:14 +0900
tags    : 
toc     : true
public  : true
parent  : book
latex   : false
---
* TOC
{:toc}

## 동기

컨설턴트님이 추천해주신 책이다. 목차를 보니 설명이 잘 되어있는 것 같았고 평도 나름 괜찮아서 읽어보기로 했다. 최근들어 네트워크 자체에 대해 궁금증이 계속 생긴다. 웹 프로젝트만 계속 해서 그런가?

어쨌든 완독하도록 노력해야겠다.

## 필사

1. 네트워크 역사
    1. Batch Processing System : 프로그램과 데이터를 카드나 테이프에 기록해두고 이를 순서대로 컴퓨터로 읽어들여 처리
    2. Time Sharing System : 1대의 컴퓨터에 여러 개의 단말기를 연결, 가상적으로 한 사람이 1대의 컴퓨터를 이용하는 것처럼 느낌
    3. 컴퓨터 간 통신 시대 : 통신의 발달로 부서 내의 데이터는 부서 내에서 처리하고 최종 결과만 통신 회선을 통해 본부로 보내는 형태의 운용이 가능해짐
    4. 컴퓨터 네트워크 시대 : 서로 다른 제조업체 컴퓨터끼리도 통신이 가능해지고 전자 메일, DB 서버로부터 필요한 데이터를 가져올 수 있게 됨
    5. 인터넷의 보급 시대 : 기업이나 일반 가정에도 인터넷이 보급됨
    6. 인터넷 기술 중심 시대 : 전화망 대신 IP망이 마련되어 방송, 통신, 인터넷, 전화 등을 구축하게 됨
    7. TCP/IP 시대 : 단순 연결이 아닌 안전 연결 시대
2. ISO(국제 표준화 기구)는 서로 다른 제조업체의 컴퓨터끼리도 자유롭게 통신할 수 있게 하기 위해 OSI라는 국제 표준 통신 체계를 발표한다.
3. OSI 참조 모델에서 상위층과 하위층 사이에서 서비스를 주고받을 때의 약속을 '인터페이스'라고 하며, 통신 상대가 **같은 계층**과 서비스를 주고받을 때의 약속을 '프로토콜'이라고 합니다.
4. OSI 참조 모델은 프로토콜을 설계하거나 학습할 때느의 '가이드 라인'인 것.
5. 각 계층에서는 상위층으로부터 받은 데이터에 자신의 계층 프로토콜 처리에 필요한 정보를 '헤더'라는 형태로 덧붙인다.
6. 호스트A(애플리케이션 층 ~> 물리층) -> 라우터(물리층 ~> 네트워크층 ~> 물리층) -> 호스트B(물리층 ~> 애플리케이션 층)
7. 애플리케이션층 : '문장을 입력한 후 데이터를 송신하는 부분', 헤더와 데이터를 분석해서 메일을 저장하는 것과 같은 처리함
8. 프리젠테이션 층 : 송신할 데이터를 '컴퓨터 고유의 표현 형식'에서 '네트워크 전체에서 공통된 표현 방식'으로 변환하여 처리, 무결성 보장, 부호화 방식을 식별하기 위해 헤더가 붙여짐.
9. 세션층 : 송신하는 방법을 정한다. 즉 커넥션을 1개로 해서 순서대로 보내거나, 커넥션을 5개 확보하여 병렬로 송신하는등 커넥션의 확립 및 끊기를 언제 수행할 것인지 정하는 것
10. 트랜스포트층 : 통신에서 발생하는 데이터 전송의 신뢰성을 보장하는 것. 통신이 끝나면커넥션을 끊는다든지, 통신로를 확보하고 데이터를 전송할 준비를 마쳐 커넥션을 확립하는 역할
11. 네트워크층 : 실제로 배달하는 역할. 최종 목적지까지 통신을 실현하기에 End to End라고 불린다. 상위층으로부터 받은 데이터에 수신처의 주소 정보 등을 붙여 데이터 링크 층으로 전달한다.
12. 데이터링크층 : 전체가 아니라 한 구간의 데이터 배달을 담당함.
13. 물리층 : 데이터의 0과 1을 빛의 펄스로 변환하여 물리적인 통신 매체에 보낸다. 직접 연결된 기기의 주소를 보고 MAC 주소라고 한다.
14. 네트워크의 데이터 전송
    1. 커넥션형 : 데이터 송신을 시작하기 전에 회선을 연결. 통신 전후에 커넥션의 확립과 끊기 처리를 할 필요가 있다.
    2. 커넥션리스형 : 커넥션의 확립과 끊기 처리가 없다. 언제든지 데이터를 보낼 수 있고 받는 쪽은 언제, 누구로부터 데이터를 수신할지 모른다. 그러므로 데이터를 받았는지, 받지 않았는지 항상 확인해야 한다.
15. 커넥션형의 데이터 통신 방식
    1. 회선을 연결하는 것을 '커넥션의 확립'이라고 한다.
    2. 회선 교환 : 2대의 컴퓨터를 연결할 경우 상관없지만 여러 대를 연결할 경우, 몇 개의 컴퓨터가 회선을 점유하므로 나머지 컴퓨터들은 데이터를 송수신할 수 없다. 속도가 일정하다.
    4. 패킷 교환 : 데이터를 작은 덩어리로 나누어 전송하는 방법. 각각의 패킷의 헤더에는 자신과 상대방의 주소가 적혀있어 어떤 컴퓨터와 통신할 것인지 구별할 수 있다. 한 회선을 공유하여 사용한다. 네트워크의 혼잡도에 따라 속도가 달라진다.
    5. 라우터 안에 버퍼라는 장치가 들어오는 패킷들을 저장해 덩어리로 전송한다.




