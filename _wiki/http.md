---
layout  : wiki
title   : HTTP란?
summary : 
date    : 2019-06-21 13:26:34 +0900
updated : 2019-06-21 13:27:07 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# HTTP Protocol

1.  What is HTTP?
    

-   HTTP stands for Hyper Text Transfer Protocol
    
-   HTTP는 인터넷에서 데이터 통신의 기반이 됩니다.
    
-   데이터 통신은 Client(사용자, 웹 사이트, 브라우저)가 요청을 보내서 web server가 응답을 받는 것입니다.
    

1.  사용자가 브라우저에 안에 있는 웹 사이트의 URL을 클릭한다.
    
2.  브라우저는 그 웹 사이트를 호스트하는 웹 서버에 request를 보낸다.
    
3.  Web server는 response를 HTML 혹은 다른 문서 포맷으로 브라우저에 반환한다.
    
4.  브라우저는 response를 보여준다.
    

-   HTTP는 표준 포트인 80번 포트로 서비스를 합니다.
    
-   Connectless & stateless
    

1.  서버에 요청해서 응답을 받으면 연결을 끊어버립니다. 이런 방식은 접속 유지를 최소한으로 할 수 있어 많은 유저의 요청을 처리가 가능하지만, 연결을 끊어버리기 때문에 클라이언트의 이전 상태를 알 수 잆습니다. 이런 문제를 HTTP는 cookie를 이용해서 해결합니다.
    

-   클라이언트(웹 브라우저)는 URI를 사용해서 자원의 위치를 찾습니다.
    

2.  HTTP Structure
    

-   HTTP request structure (from client)
    

1.  A request line (Ex. /content/page.html )
    
2.  Headers (Ex. Accpet-Language: EN)
    
3.  An empty line
    
4.  A message body
    

-   모든 라인은 CR(Carriage Return)과 LF(Line Feed)로 끝나야 합니다.
    
-   empty line에는 공백(space)없이 CR과 LF만 포함해야 합니다.
    

-   HTTP response sturcture (from web server)
    

1.  HTTP Status Code
    
2.  Headers (Ex. Content-Type: html)
    

-   content-type. 이는 message body(본문)에 들어가는 MIME 타입을 기술한다.
    

4.  An empty line
    
5.  A message body
    

-   서버 응답의 모든 행은 CR 및 LF로 끝나야 합니다.
    
-   요청과 마찬가지로 empty line에는 공백(space)없이 CR과 LF만 포함해야 합니다.
    

4.  Example of HTTP Session
    

-   HTTP Request Structure
    

1.  GET /home.html HTTP/1.1
    
2.  Host: www.yoursite.com
    

-   HTTP Response Structure
    

1.  HTTP/1.1 200 OK
    
2.  Date : Sun, 28 Jul 2018 13:37;37 GMT
    
3.  Server : Apache
    
4.  Last-Modified : Sun, 07 Jul 2018 06:13:43 GMT
    
5.  Transfer-Encoding : chunked
    
6.  Connection : keep-Alive
    
7.  Content-Type : text/html; charset = UTF-8
    
8.  Webpage Content
    

6.  Details of HTTP Status Codes
    

-   1xx series – Informational Message
    
-   2xx – Success Message
    
-   3xx – Redirection Message
    
-   4xx – Error Messages Related to Client
    
-   5xx – Error Messages Related to Server
    

-   HTTP와 TCP, IP의 관계 : 모든 네트워크를 연결하려면 IP가 필요하고, TCP는 데이터를 안전하게(신뢰성있게) 전송할 수 있는 메커니즘이다. TCP를 사용하여 데이터를 전송하는 HTTP는 웹서버와 클라이언트가 사용하는 특정 프로토콜이다.
    

1.  TCP와 UDP가 한 네트워크에서 다른 네트워크로 전송하는데 IP가 사용된다.
    
2.  TCP와 UDP가 고속도로의 트럭이라면 그들이 운반하는 부하가 HTTP, FTP 등과 같은 프로토콜이다.
    

-   인터넷 통신 프로토콜에는 TCP/IP, FTP, SMTP, HTTP 등 많은 종류의 프로토콜이 있다. 그 중 실제 사용자와 연결된 최상위 계층(응용계층)의 프로토콜로 가장 대표적인 것이 HTTP 프로토콜이다. HTTP 프로토콜은 요청과 응답의 형태로 이루어졌다. 브라우저는 HTTP 프로토콜의 요청형태로 HTTP 메세지를 작성하여 웹 서버에 전송한다. 웹 서버는 HTTP 메세지가 요청 메세지임을 판단하고 그 데이터를 분석해서 HTTP 프로토콜의 응답 형태로 메세지를 작성하여 브러우저에 보낸다. 이때 각 HTTP 메세지는 지금 작성된 각 메세지는 지금 작성된 메세지가 요청인지 응답인지, 기본적인 정보, 시작 라인과 수행 날짜 등등 부가적인 정보를 담는 헤더, 요청이나 응답에 필요한 내용을 담고있는 본문으로 구성된다.
    

-   TTP 요청 메세지는 기본적으로 HTTP메소드와 URL, 파라미터로 구성된다. HTTP 메소드는 GET과 POST 메소드가 있다. GET은 파라미터의 길이가 256바이트를 넘을 수 없지만 BODY가 필요 없기 때문에 전송이 빠르다. POST는 본문에 담는다.
    

1.  응답 메세지는 성공 여부를 표시하는 상태 코드, 웹 서버가 응답해주는 콘텐츠의 타입 정보, 콘텐츠의 내용으로 구성된다.
    

-   CR(Carriage return) : 타자기 시절, 현재 커서의 위치를 맨 앞으로 옮기는 동작을 의미한다. carriage란 커서 즉, 프린터기에서 좌우로 움직이는 장치를 뜻한다.
    
-   LF(Line Feed) : 타자기 시절, 커서의 위치는 그대로 두고 종이를 한 라인 위로 올리는 동작을 의미한다.
    
-   줄바꿈 문자열 : 윈도우나 dos에서는 CRLF, \r\n이고(직렬 라인으로 터미널을 연결했기 때문에 화면전환속도가 느려서 줄바꿈이 있을 때 스크롤 하는 시간과 보조를 맞추기 위해서) 유닉스(맥, 리눅스)에서는 LF,\n (메모리를 적게 쓰려고)
    
-   HTTP, SMTP, FTP 등 인터넷 프로토콜의 대부분은 ASCII의 CR+LF를 새줄 문자를 사용하도록 규정하고 있다.
    

-   Wireshark : 네트워크 패킷 캡쳐 및 분석 소프트웨어. pcap을 이용해 패킷을 잡아낸다. 패킷을 뜯어볼 수 있기 때문에 각기 다른 네트워크 프로토콜의 구조를 이해할 수 있다.
    
-   pcap(packet capture) : 네트워크 트래픽 포착용 API를 구성하고 있다. 유닉스 계열은 libpcap 라이브러리에 pcap을 포함하고 있고, 윈도우 계열은 Winpcap이라는 libpcap 포팅을 이용한다.
    
-   TCP/IP : 인터넷으로 통신하는데 가장 기반이 되는 프로토콜. 이를 이용해서 컴퓨터를 연결하는 체계를 이더넷(Ethernet)이라고 부른다. TCP와 IP는 별개이다.
    
-   TCP(Transmission Control Protocol) : 옛날에는 회선교환(Circuit Switching) 방식을 사용했다. 이 방식은 미리 이동할 경로를 정해놓는 것으로 중간에 선 하나가 단락되면 통신이 바로 끊어진다. 그래서 나온 게 패킷교환(Packet Switching) 방식으로 경로가 정해져 있지 않은 방식이다. 연결이 가능한 선 하나만 남아있으면 통신이 끊어지지 않는다. 그러나 어떻게든 통신을 유지하는 게 목적이라 안전성은 떨어질 수 밖에 없었다. 중간에 데이터가 유실되거나, 너무 늦게 전달되는 신뢰성이 떨어지는 문제점이 있었다. 이런 문제점을 해결하고자 TCP가 나오게 됐다.
    

1.  TCP는 Three Way Handshake의 절차를 따른다. SYN, SYN-ACK, ACK 순서이다.
    
2.  TCP의 헤더파일을 보면 확인응답파일이 있는데 얘가 송수신시 계속 확인응답을 보내어 잘 갔는지, 왔는지 확인하기 때문에 신뢰도가 높다.
    
3.  보통 이메일이나 파일전송같은 경우, 데이터 하나가 날아가면 골치아픈 문제니 신뢰성을 중요시하는 프로그램이 많다.
    

-   IP(Internet Protocol) : 호스트에서 호스트까지의 통신, 즉 보내는 컴퓨터에서 받는 컴퓨터까지의 통신을 책임진다. IPv4는 32비트의 값을 가진다. 8비트씩 끊어 이를 0~255의 10진수 숫자로 나타내며, 각 숫자는 점(.)으로 구분한다. 123.45.67.89
    
-   게이트웨이 : 서로 다른 프로토콜끼리도 네트워크 통신이 가능하도록 연결해주는 기기. 게이트웨이가 있어서 우리가 스마트폰으로 PC와 같이 인터넷을 할 수 있는 것. cmd의 ipconfig에서 게이트웨이의 ip 주소를 브라우저에 치면 공유기 설정을 위한 페이지로 가게 해준다.
    
-   서브넷 마스크 : IP 주소는 192.168.0.1과 같이 이루어져 있다. 이는 네트워크 부분과 호스트 부분으로 나누어진다. 서브넷 마스크에서 1을 논리곱하는 부분이 네트워크 부분, 0을 논리곱하는 부분이 호스트부분이다. 여기서 하나의 네트워크란 하나의 브로드캐스트 영역이라고 생각하면 된다. 즉, 어떤 네트워크에서 한 노드가 브로드캐스트를 했을 때 그 네트워크의 모든 노드가 신호를 받았다면 그 네트워크는 하나의 네트워크라고 볼 수 있다. 한 마디로 라우터를 거치지 않고도 통신이 가능한 영역이다. 호스트 부분의 호스트란 그냥 각각의 노드들이다.
    

1.  하나의 네트워크에서는 IP 주소의 네트워크 부분은 같아야 하고, 호스트 부분은 달라야 한다.
    
2.  AND연산을 해서 IP 주소의 네트워크 주소를 식별하는데 사용된다.
    

참조

-   [https://www.webnots.com/what-is-http/](https://www.webnots.com/what-is-http/)
    
-   [https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EB%8C%80%EB%AC%B8](https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EB%8C%80%EB%AC%B8)
    
-   [https://ko.wikipedia.org/wiki/%EC%83%88%EC%A4%84_%EB%AC%B8%EC%9E%90](https://ko.wikipedia.org/wiki/%EC%83%88%EC%A4%84_%EB%AC%B8%EC%9E%90)
    
-   [https://zetawiki.com/wiki/%EA%B0%9C%ED%96%89%EB%AC%B8%EC%9E%90,_%EB%9D%BC%EC%9D%B8%ED%94%BC%EB%93%9C,_%EC%BA%90%EB%A6%AC%EC%A7%80%EB%A6%AC%ED%84%B4](https://zetawiki.com/wiki/%EA%B0%9C%ED%96%89%EB%AC%B8%EC%9E%90,_%EB%9D%BC%EC%9D%B8%ED%94%BC%EB%93%9C,_%EC%BA%90%EB%A6%AC%EC%A7%80%EB%A6%AC%ED%84%B4)
