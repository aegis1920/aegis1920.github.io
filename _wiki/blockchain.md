---
layout  : wiki
title   : 블록체인에 대해서 정리한 글
summary : 
date    : 2019-09-04 11:29:10 +0900
updated : 2019-09-09 12:19:33 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 스마트 컨트랙트

- 중개인 없이 자동으로 거래를 성사시켜줄 수 있게 하는 것.
- 정확도가 높고, 중개자의 수를 없애거나 줄일 수 있으며 비용이 절감된다.
- 지마켓 같은 온라인 쇼핑몰에서 상품을 구매하는 것도 스마트 컨트랙트의 일종이다. 예를 들어, 각 마켓 서비스에서 소비자가 금액을 지불하면 상품을 보내주거나 상품 구매 내역을 증명해준다.

### 블록체인에서의 스마트 컨트랙트

- 기존에서는 중앙 서버에서 계약을 관리하고 증명해야 헀다면, 블록체인에서는 분산 장부를 통해 네트워크에 참여한 모든 사람들이 계약을 증명한다.
- 블록체인의 스마트 컨트랙트는 어떤 조건이 만족되면 무엇을 실행하도록 블록체인 내에 코드로 기록할 수 있다. 그게 바로 이더리움의 Solidity나 Hyperledger의 ChainCode다
- 예를 들어서 정해진 금액을 입금하면 영화 1시간 스트리밍 이용권을 제공한다든지, 어떤 제품을 빌리고 시간이 다 됐다면 그 제품을 사용 못하도록 할 수 있다.

## 패브릭 네트워크

- 네트워크 패브릭은 구성 요소가 상호 연결 스위치를 통해 서로 데이터를 전달하는 네트워크 토폴로지를 설명하는 산업 용어

- 패브릭이라는 단어는 누군가가 네트워크 구성 요소와 그 관계를 종이에 문서화 할 경우 그 선이 너무 촘촘하게 짜 여서 다이어그램이 짠 천 조각과 유사하다는 아이디어를 설명하기 위해 은유로 사용된다.

- 즉, 천 조각처럼 엄청 촘촘히 짜여진 네트워크를 부를 때 쓰이는 용어

### 네트워크 토폴로지

- 컴퓨터 네트워크의 요소들을 물리적으로 연결해 놓은 것, 또는 그 연결 방식
- 물리적 토폴로지와 논리적 토폴로지가 있다.
- LAN(로컬 영역 네트워크)은 어떤 노드가 다른 노드에 링크할 수 있기 때문에 물리적 토폴로지를 갖고 있고, 여기서 노드끼리 데이터 흐름을 가지고 있기 때문에 논리적 토폴로지도 갖고 있다고 할 수 있다.

#### 물리적 토폴로지

- bus형, star형, ring형, Mesh형, Tree형 등 네트워크의 물리적인 구조를 이야기 하는 것

#### 논리적 토폴로지

- 어떤 노드의 논리적 연결 관계를 나타낸다. 

## 하이퍼 래저 패브릭 네트워크(Hyperledger Fabric Network Structure)

- 리눅스 재단에서 만든(진행중인) 블록체인 기술 개발 오픈소스 프로젝트 중 하나(가장 인기있음)

### 하이퍼레져 패브릭의 특징

- private 블록체인으로 허가형 네트워크다. 즉, 네트워크 참여 권한을 통제할 수 있다. 참고로 public 블록체인인 비트코인은 공개형이기 때문에 지갑이 있으면 그냥 참여가 가능하다.
- 스마트 컨트랙트에 프로그래밍 언어 사용이 가능하다. 그래서 ChainCode가 go나 Node.js로 이루어져 있다.
- 채널을 이용해 허가 받은 사람들에게만 장부를 공개할 수 있다.
- 허가형 블록체인으로 네트워크 참여자의 신원을 확인할 수 있기 때문에 문제 발생시 책임 소재를 분명히 할 수 있다.

### 하이퍼레저 패브릭 네트워크 만들기

- 패브릭 네트워크를 만들기 위해 가장 먼저 해야할 일은 오더링 서비스(Ordering service)를 구동하는 것이다.
    - 오더링 서비스는 블록 안의 트랜잭션 순서를 정하고 연결된 노드들에게 전달하는 기능을 한다.
    - 트랜잭션의 순서는 FCFS(First-Come First-Serve) 방식에 의해 결정된다.
- 프라이빗 블록체인에서는 어떤 네트워크 참여자가 어떤 권한을 가지는지 관리하는 것이 중요하다. 그룹 별로 네트워크의 자원에 접근할 수 있는 권한은 관리자에 의해 정해져 Network Configuration에 저장된다. 또한, 이를 위해 참여자의 ID와 권한을 관리할 주체가 필요하므로 CA가 필요하다.

ledger에 관해서 알기

합의 알고리즘에 관해서 알기
- https://lisk.io/academy/blockchain-basics/how-does-blockchain-work/consensus-protocols
- https://ko.wikipedia.org/wiki/%ED%95%A9%EC%9D%98_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)
- https://steemit.com/kr/@kblock/44-1-pow-pos
- https://masterthecrypto.com/guide-to-consensus-algorithms-what-is-consensus-mechanism/?lang=ko
- 





## 이더넷 네트워크(VM1)

- 가상머신에서 이더리움 3개를 구축
- `~/eth00/dev/eth_localdata`, `~/eth01/dev/eth_localdata`, `~/eth02/dev/eth_localdata`로 총 3개의 디렉토리를 만듦
- 각각 admin이 있고 `admin.nodeInfo.enode`를 통해 자신의 노드 주소?를 알 수 있음.
- `admin.addPeer("enode주소")`를 통해 해당 자신의 admin에 다른 계정의 admin을 peer로 추가할 수 있음


## 출처

- https://searchnetworking.techtarget.com/definition/network-fabric
- https://searchnetworking.techtarget.com/definition/network-topology
- https://medium.com/decipher-media/%ED%95%98%EC%9D%B4%ED%8D%BC%EB%A0%88%EC%A0%80-%ED%8C%A8%EB%B8%8C%EB%A6%AD-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B5%AC%EC%A1%B0-hyperledger-fabric-network-structure-d7fd9c759983
- https://snowdeer.github.io/blockchain/2018/01/12/blockchain-seminar-about-smart-contract/
- https://medium.com/decipher-media/%ED%95%98%EC%9D%B4%ED%8D%BC%EB%A0%88%EC%A0%80-%ED%8C%A8%EB%B8%8C%EB%A6%AD-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B5%AC%EC%A1%B0-hyperledger-fabric-network-structure-d7fd9c759983
- https://medium.com/landingblock-korea/26-%ED%95%98%EC%9D%B4%ED%8D%BC%EB%A0%88%EC%A0%80-%ED%8C%A8%EB%B8%8C%EB%A6%AD-hyperledger-fabric-%EC%9D%B4%ED%95%B4-a64e8fccd357
- https://opentutorials.org/course/3386/21678

