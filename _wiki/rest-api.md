---
layout  : wiki
title   : REST API
summary : 
date    : 2019-07-23 00:18:56 +0900
updated : 2019-07-23 11:27:10 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# REST API

## REST API란?

* 핵심 컨텐츠 및 기능을 외부 사이트에서 활용할 수 있도록 제공되는 인터페이스
* 예를 들어, 우체국에서 우편번호를 조회할 수 있는 기능을 제공하거나, 구글에서 구글 지도를 사용할 수 잇도록 제공하는 것
* 웹 브라우저 뿐만 아니라 앱 등 다양한 클라이언트가 등장하면서 그러한 클라이언트들에게 대응하기 위해 REST API가 널리 사용되기 시작
* REST API를 조합해 어플리케이션을 만들 수 있는데 이를 매시업(Mashup)이라고 한다

## REST API 스타일

* client-server, stateless, cache, uniform interface, layered system, code-on-demand
* HTTP 프로토콜을 사용한다면 거의 모두 쉽게 구현 가능
* uniform interface가 하기 어렵다. 첫 번째와 두 번째는 어렵지 않지만 세 번째와 네 번째는 어렵다.
    * 리소스가 URI로 식별되어야 한다
    * 리소스를 생성, 수정, 추가하고자 할 때 HTTP 메세지에 표현을 해서 전송해야 한다
    * 메세지는 스스로 설명할 수 있어야 한다
    * 어플리케이션의 상태는 Hyperlink를 이용해 전이되어야 한다(HATEOAS)
* REST의 uniform interface를 지원하는 것은 쉽지 않기 때문에 많은 서비스들이 REST에서 바라는 것을 모두 지원하지 않고 API를 만들게 된다
* REST의 모든 것을 제공하지 않으면서 REST API라고 말하는 경우도 있고 WEB API, HTTP API라고 부르는 경우가 있다.

