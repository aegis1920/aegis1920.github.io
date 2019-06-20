---
layout  : wiki
title   : Java 네트워크 기초
summary : 
date    : 2019-06-20 15:08:17 +0900
updated : 2019-06-20 15:08:49 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# Java 네트워크 기초

## 네트워크

- 시스템에 DNS 서버를 정하는 게 있음. 
- DNS를 이용하는 이유중에서 IP를 외우기 어려워서 그런 것도 있지만  IP기 이관되면 문제가 된다. 알려줬는데 바뀌면 또 다시 알려줘야 된다. 
- 포트는 겹칠 수 없다. 어떤 서비스가 그 포트를 사용하고 있으면 다른 서비스가 그 포트를 이용하지 못 한다.
- 예약되어 있는 포트도 있음 (0~1023)
- TCP/IP - 신뢰성있고, 느림, 상대와 연결이 되어야지만 통신될 수 있고, 상대쪽에 전송이 안 됐을 때 상대방이 수신할 때까지 재전송할 수 있는 방식
- UDP/IP - 통신 채널에 데이터를 뿌리는 느낌.
- 소켓 -> TCP 기반의 통신, 서버 소켓 안에 소켓이 있음.
- Server.accept()를 하면 요청이 올 때까지 holding된다. 점원이 식당 앞에서 대기하고 있는 것. accept() 상태에서만 요청을 받을 수 있다. 대기중인 상태에서만 가능하다.
- 데이터를 주고받을 수 있는 스트림이 있다. 서버가 출력하면 나는 입력받고, 내가 출력하면 서버가 입력받고. 
- 어떤 포맷(string, int 등등...)으로 주고받을지 약속하기 위해서 프로토콜이 있는 것.



++

## 네트워크 리뷰

1. 서버소켓은 한 번만 만들면 된다. 문의 역할
2. `Socket s = ss.accept()` // 접속을 대기하는역할. 여기서부터 다음 클라이언트를 계속해서 받아야 하니까 접속 요청이 오기 전까지는 무한히 대기해야됨. `while(true)`를 쓰자.
3. 해당 소켓을 이용해서 I/O
4. 그러나 해당 클라이언트의 I/O가 끝날 때까지 다른 클라이언트의 요청은 받지 못 함.이러한 이유로 스레드가 필요. 즉, 서버 접속(Server)과 소켓 I/O(ServerThread)를  나눠야 함.
5. 그래서 서버에 `new ServerThread(s)`, `?.start()`가 필요하고 서버스레드에는 해당 소켓(client)을 수신하는 `run(){}`이 필요.
6. 클라이언트에는 메세지 송신과 메세지 수신이 필요한데, 메세지 수신은 내가 그냥 보내면 되지만, 서버에서 오는 메세지는 계속 받아져야 하므로 다시 ClientThread()를 만들어야 함.
7. 그래서 클라이언트에 `s = new Socket(ip, port)`, `new ClientThread(s)`, `?.start()`, `while(true){키보드 입력 메세지 서버로 송신}` 가 필요함. 클라이언트 스레드에는 소켓이용, 메세지 수신만 필요함.
8. 서버가 모든 클라이언트에게 보내기 위해 clients라는 배열에 모두 집어넣음. `clients.add(t)`
9. 서버 스레드가 메세지를 수신하면 이걸 모든 클라이언트에게 보내야 한다고 서버한테 알려야 한다. 이게 `void broadcasting(String msg)`  -> `for(ServerThread t : clients){t.send(msg)}` 그래서 메세지들을 각각의 서버 스레드가 각각의 클라이언트에게 메세지를 보냄. 



## IP 주소와 Port

IP는 컴퓨터의 네트워크 어댑터까지만 갈 수 있는 정보
Port는 컴퓨터 내에서 실행하는 서버를 선택하기 위해서 추가적인 정보

서버는 시작할 때 고정적인 포트 번호를 가지고 시작합니다. 이것을 포트 바인딩(port binding)이라고 합니다.

### InetAddress로 IP 주소 얻기

자바는 IP 주소를 java.net.InetAddress 객체로 표현합니다. InetAddress는 로컬 컴퓨터의 IP 주소 뿐만 아니라 도메인 이름을 DNS에서 검색한 후, IP 주소를 가져오는 기능을 제공합니다.

```java
public class InetAddresssExample {

  public static void main(String[] args) throws java.net.UnknownHostException {
	//local 컴퓨터의 InetAddress를 가져옵니다. 
    InetAddress local = InetAddress.getLocalHost();
    //주소를 가져옵니다. 
    System.out.println("my computer ip address : " + local.getHostAddress());
    
    //대기업들은 서버의 과부하를 막기 위해서 하나의 도메인에 여러 개의 컴퓨터 IP를 등록할 수 있습니다. 여러 개의 IP를 얻고 싶다면 getAllByName()을 쓰면 됩니다. 
    InetAddress[] iaArr = InetAddress.getAllByName("www.naver.com");
    for(InetAddress remote : iaArr) {
      System.out.println("www.naver.com ip address is " + remote.getHostAddress());
    }
  }
}
```

### TCP 네트워킹

TCP는 연결 지향적인 프로토콜입니다. SYN과 ACK를 이용해서 데이터를 주고받고 이러한 이유로 데이터를 정확하고 안정적으로 전달합니다. 자바는 TCP 네트워킹을 위해 java.net.ServerSocket과 java.net.Socket 클래스를 제공하고 있습니다.

클라이언트의 연결 요청을 기다리면서 연결 수락을 담당하는 것이 java.net.ServerSocket 클래스이고, 연결된 클라이언트와 통신을 담당하는 것이 java.net.Socket 클래스입니다. 클라이언트가 연결 요청을 해오면 ServerSocket은 연결을 수락하고 통신용 socket을 만듭니다.

서버가 실행되면 클라이언트는 서버의 IP 주소와 포트 번호로 Socket을 생성해서 연결 요청을 할 수 있습니다. ServerSocket은 클라이언트가 연결 요청을 해오면 accept() 메소드로 연결 수락을 하고 통신용 socket을 생성합니다. 그리고 나서 클라이언트와 서버는 각각의 Socket을 이용해서 데이터를 주고 받습니다.

#### ServerSocket 생성과 연결 수락

서버를 개발하려면 우선 ServerSocket 객체를 얻어야 합니다. ServerSocket을 얻는 가장 간단한 방법은 생성자에 바인딩 포트를 대입하고 객체를 생성하는 것입니다.
ServerSocket을 얻는 다른 방법은 디폴트 생성자로 객체를 생성하고 포트 바인딩 메소드인 bind() 메소드를 호출하는 것입니다. 포트 바인딩까지 끝났다면 ServerSocket은 클라이언트 연결 수락을 위해 accept() 메소드를 실행해야 합니다. accept() 메소드는 클라이언트가 연결 요청을 하기 전까지 블로킹됩니다. 블로킹은 스레드가 대기상태가 된다는 뜻입니다. 다른 곳에서 accept() 메소드를 호출하지 않도록 합니다. 클라이언트가 연결 요청을 하면 accept()는 클라이언트와 통신할 Socket을 만들고 리턴합니다. 이게 연결 수락입니다.

ServerExample.java입니다.

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerExample {

  public static void main(String[] args) {
    ServerSocket serverSocket = null;
    try {
      serverSocket = new ServerSocket(); 	//객체를 만들어 준다.
      //포트 바인딩을 시켜준다. 특정 IP가 있다면 localhost가 아닌 IP 주소로 줘도 된다. 그 뒤는 포트번호.
      serverSocket.bind(new InetSocketAddress("localhost", 5001));
      //무한 반복. 
      while(true) {
        System.out.println("연결을 기다림");
        Socket socket = serverSocket.accept();
        //연결된 클라이언트의 IP와 포트 정보를 얻고싶다면 getRemoteSocketAddress(). 실제 리턴되는 것은 InetSocketAddress이므로 타입을 얘로 줘도 된다. 
        InetSocketAddress isa = (InetSocketAddress) socket.getRemoteSocketAddress();
        //getHostName()은 클라이언트의 IP를 리턴합니다. 
        System.out.println("연결 수락함" + isa.getHostName());
      }
    }catch(Exception e) {}
    
    //ServerSocket이 닫혀있지 않을 경우
    if(!serverSocket.isClosed()) {
      try {
      //ServerSocket 닫기
        serverSocket.close();
      }catch(IOException e1) {}
    }
  }
}
```

#### Socket 생성과 연결 요청

클라이언트가 서버에 연결 요청을 하려면 java.net.Socket을 이용해야 합니다. Socket 객체를 생성함과 동시에 연결 요청을 하려면 생성자의 매개값으로 서버의 IP 주소와 바인딩 포트 번호를 제공하면 됩니다.

외부 서버에 접속하려면 localhost 대신 IP를 입력하면 됩니다. Socket 생성과 동시에 연결 요청을 하지 않고, 기본 생성자로 Socket을 생성한 후, connect() 메소드로 연결 요청을 할 수도 있습니다.

Socket 생성자 및 connect() 메소드는 서버와 연결이 될 때까지 블로킹됩니다. 그래서 이들을 호출하지 않도록 하고 연결된 후, 클라이언트 프로그램을 종료하거나, 강제적으로 연결을 끊고 싶다면 close() 메소드를 호출하면 됩니다.

ClientExample.java입니다.

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class ClientExample {

  public static void main(String[] args) {
    Socket socket = null;
    try {
      socket = new Socket();
      System.out.println("연결 요청");
      //IP가 아닌 도메인 주소만 알고있다면 InetSocketAddress를 써야된다. 
      //그냥 IP나 localhost를 쓸 거라면 Socket socket = new Socket("localhost", 5001);만 써줘도 된다. 
      socket.connect(new InetSocketAddress("localhost", 5001));
      System.out.println("연결 성공");
    }catch(Exception e) {}
    
    if(!socket.isClosed()) {
      try {
        socket.close();
      }catch(IOException e1) {}
    }
  }
}
```

#### Socket 데이터 통신

클라이언트가 연결 요청(connect())을 하고 서버가 연결 수락(accept())을 했다면 양 쪽의 Socket 객체로부터 각각 입력스트림과 출력 스트림을 얻을 수 있습니다. InputStream과 OutputStream으로 얻습니다.

- 상대방에게 데이터를 보내기 위해서 byte[] 배열을 생성한 후, 이것을 매개 값으로 OutputStream의 write() 메소드를 호출합니다. 그 뒤, 문자열을 UTF-8로 인코딩한 바이트 배열을 얻어내고 write()로 전송합니다.
- 상대방이 보낸 데이터를 받기 위해서는 받은 데이터를 저장할 byte[] 배열을 하나 생성하고, 이것을 매개값으로 해서 InputStream의 read() 메소드를 호출합니다. read() 메소드는 읽은 데이터를 byte[] 배열에 저장하고 읽은 바이트 수를 리턴합니다.

Client.java입니다.

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

public class ClientExample {

  public static void main(String[] args) {
    Socket socket = null;
    try {
      socket = new Socket();
      System.out.println("연결 요청");
      socket.connect(new InetSocketAddress("localhost", 5001));
      System.out.println("연결 성공");
      
      byte[] bytes = null;
      String message = null;
      
      //Socket으로부터 OutputStream을 얻음.
      OutputStream os = socket.getOutputStream();
      //상대방에게 보낼 메세지
      message = "Hello server";
      //UTF-8로 인코딩한 바이트 배열을 얻어내서 byte 배열에 대입.
      bytes = message.getBytes("UTF-8");
      //데이터를 보냄.
      os.write(bytes);
      //쓰고 남은 버퍼 비우기.
      os.flush();
      System.out.println("데이터 보내기 성공!");
      
      //데이터를 받는 작업. 
      InputStream is = socket.getInputStream();
      bytes = new byte[100];
      int readByteCount = is.read(bytes);
      message = new String(bytes, 0, readByteCount, "UTF-8");
      System.out.println("데이터 받기 성공 " + message);
      
      os.close();
      is.close();
      
    }catch(Exception e) {}
    
    if(!socket.isClosed()) {
      try {
        socket.close();
      }catch(IOException e1) {}
    }
  }
```

ServerExample.java입니다.

```java
import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.io.OutputStream;

public class ServerExample {

  public static void main(String[] args) {
    ServerSocket serverSocket = null;
    try {
      serverSocket = new ServerSocket();
      serverSocket.bind(new InetSocketAddress("localhost", 5001));
      while(true) {
        System.out.println("연결을 기다림");
        Socket socket = serverSocket.accept();
        InetSocketAddress isa = (InetSocketAddress) socket.getRemoteSocketAddress();
        System.out.println("연결 수락함" + isa.getHostName());
        
        byte[] bytes = null;
        String message = null;
        
        //입력 스트림을 얻어내고
        InputStream is = socket.getInputStream();
        bytes = new byte[100];
        //Socket의 입력 스트림에서 온 byte를 읽어들임.
        int readByteCount = is.read(bytes);
        //UTF-8로 다시 변환.
        message = new String(bytes, 0, readByteCount, "UTF-8");
        System.out.println("데이터 받기 성공! " + message);
        
        //메세지 보내기.
        OutputStream os = socket.getOutputStream();
        message = "Hello Client";
        bytes = message.getBytes("UTF-8");
        os.write(bytes);
        os.flush();
        System.out.println("데이터 보내기 성공!");
        
        is.close();
        os.close();
        socket.close();
      }
    }catch(Exception e) {}
    
    if(!serverSocket.isClosed()) {
      try {
        serverSocket.close();
      }catch(IOException e1) {}
    }
  }
}
```

#### 스레드 병렬 처리

ServerSocket의 accept()를 실행하거나 Socket 생성자 또는 connect()를 실행할 경우에는 해당 작업이 완료되기 전까지 blocking됩니다. 데이터 통신(socket 통신)할 때도 마찬가지인데 InputStream의 read() 메소드는 상대방이 데이터를 보내기 전까지 blocking되고, OutputStream의 write() 메소드는 데이터를 완전하게 보내기 전까지 blocking 됩니다. 즉, ServerSocket과 Socket은 동기 방식(Blocking 방식)으로 구동됩니다.

만약 서버를 실행시키는 main 스레드가 직접 입출력 작업을 담당하게 되면 입출력이 완료될 때까지 다른 작업을 할 수 없는 상태가 됩니다. 그래서 서버는 지속적으로 클라이언트와 연결을 수락할 수 없게 됩니다. 이러한 이유로 accept(), connect(), read(), write()는 별도의 작업 스레드를 생성해서 병렬적으로 처리하는 것이 좋습니다.

서버가 별도의 작업 스레드를 생성하고, 다중 클라이언트와 병렬적으로 통신하면 됩니다. 그러나 단순히 스레드만 계속해서 생성해내면 서버에서 수 천개의 스레드가 생성되기 때문에 서버 성능이 저하됩니다. 이를 위해서 생겨난 게 스레드 풀입니다.

스레드 풀은 스레드 수를 제한해서 사용하기 때문에 갑작스런 클라이언트의 폭증은 작업 큐의 작업량만 증가시킬 뿐 스레드 수는 변함이 없기 때문에 서버 성능은 나아질 수 있습니다. 그러나 대기하는 작업량이 많을 경우, 개별 클라이언트에서 응답을 늦게 받을 수 있습니다.

ServerExample.java의 전체 소스코드입니다.

```java
//import 시켜줘야하는 패키지들입니다. Javafx를 import할 때 OS가 우분투이신 분들은 openjdk로 이클립스를 받으셨을텐데 Javafx가 안들어가있습니다. 따로 받으서야 됩ㄴ다. 
import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.io.OutputStream;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

//javaFX를 메인 클래스로 만들기 위해 Application을 상속
public class ServerExample extends Application{
  //스레드 풀을 사용하기 위해서
  ExecutorService executorService;
  //클라이언트의 연결을 수락하기 위해서
  ServerSocket serverSocket;
  //연결된 클라이언트를 저장하는 connections 필드. 스레드에 안전한 Vector로 인스턴스화를 하고 있다.
  List<Client> connections = new Vector<Client>();
  
  //서버 시작 코드
  void startServer() {
    //ExecutorService 객체를 얻기 위해 Executors.newFixedThreadPool() 메소드를 호출한다.CPU 코어의 수만큼 스레드를 만들도록 한다. (그
    executorService = Executors.newFixedThreadPool(
          Runtime.getRuntime().availableProcessors()
        );
    //포트 바인딩을 해준다.
    try {
      serverSocket = new ServerSocket();
      serverSocket.bind(new InetSocketAddress("localhost", 5001));
    //ServerSocket이 닫혀있지 않으면 stopServer() 호출
    }catch(Exception e) {
      if(!serverSocket.isClosed()) {stopServer();}
      return;
    }
    
    //연결 수락 작업을 Runnable로 정의. 작업 스레드로 정의한다.
    Runnable runnable = new Runnable() {
      @Override
      public void run() {
        //작업 스레드는 UI를 변경하지 못하므로 Platform.runLater()가 사용됨.
        Platform.runLater(()->{
          //문자열을 출력하게끔.
          displayText("Server Start!");
          //Start 버튼의 text를 stop으로 변경
          btnStartStop.setText("stop");
        });
        while(true) {
          try {
            Socket socket = serverSocket.accept();
            //연결 수락이 되면 IP 주소와 스레드 이름이 포함된 연결 수락 메세지 문자열을 만듬. 
            String message = "연결 수락 : " + socket.getRemoteSocketAddress() + ": " + Thread.currentThread().getName();
            Platform.runLater(()->displayText(message));
            //Client 객체를 생성합니다. 
            Client client = new Client(socket);
            //Client 객체를 connection에 추가합니다. 
            connections.add(client);
            //객체 수를 출력하도록 호출.
            Platform.runLater(()->displayText("연결 개수 : " + connections.size()) );
          }catch(Exception e) {
            if(!serverSocket.isClosed()) {stopServer();}
            break;
          }
        }
      }
    };
    //스레드 풀의 작업 스레드에서 연결 수락 작업을 처리하기 위해서
    executorService.submit(runnable);
  }
  
  //서버 종료 코드
  void stopServer() {
    //모든 socket을 하나씩 반복해서 닫습니다. 객체를 계속해서 넘기면서 close()한다. 마지막으로 iterator까지 지운다. 
    try {
      //connections 컬렉션으로부터 반복자를 얻어낸다.
      Iterator<Client> iterator = connections.iterator();
      while(iterator.hasNext()) {
        //반복자로부터 Client를 하나씩 얻는다. 
        Client client = iterator.next();
        //Client의 소켓을 닫고
        client.socket.close();
        //connections 컬렉션에서 Client를 제거한다. 
        iterator.remove();
      }
      //서버 소켓 닫기. null이 아니면서 닫혀있지 않으면 닫는다. 
      if(serverSocket!=null && !serverSocket.isClosed()) {
        serverSocket.close();
      }
      //스레드 풀에서 진행되던 executorService 종료
      if(executorService!=null && !executorService.isShutdown()) {
        executorService.shutdown();
      }
      //작업 스레드는 UI를 못 바꾸니까...
      Platform.runLater(()->{
        displayText("server is stopped");
        btnStartStop.setText("start");
      });
    }catch (Exception e) { }
  }
  
  //데이터 통신 코드. 서버에는 다수의 클라이언트가 연결되기 떄문에 관리해야됨. 클라이언트 별로 고유한 데이터를 저장할 필요도 있기 때문에 작성. 
  class Client {
    Socket socket;
    
     Client(Socket socket){
       this.socket = socket;
       receive();
     }
     
     //클라이언트의 데이터를 받기 위해
     void receive() {
       Runnable runnable = new Runnable() {
         //run() 메소드를 재정의한다. 
         @Override
         public void run() {
           try {
             while(true) {
               byte[] byteArr = new byte[100];
               InputStream inputStream = socket.getInputStream();
               
               //클라이언트가 비정상 종료를 했을 경우 IOException 발생, 데이터 받기. read() 메소드를 호출해서 클라이언트가 데이터를 보내기 전까지 블로킹되고, 데이터를 받으면 byteArr에 저장 후, 바이트 개수를 readByteCount에 저장한다.
               int readByteCount = inputStream.read(byteArr);
               
               //클라이언트가 정상적으로 Socket의 close()를 호출했다면 read()는 -1을 리턴. 예외처리는 강제.
               if(readByteCount == -1) { throw new IOException(); }
               //정상적으로 데이터를 받았을 경우, 
               String message = "요청 처리 " + socket.getRemoteSocketAddress() + " : " + Thread.currentThread().getName();
               Platform.runLater(()->displayText(message));
               
               String data = new String(byteArr, 0, readByteCount, "UTF-8");
               //문자열을 모든 클라이언트에 보내기 위해 connections에 저장된 Client를 하나씩 얻어 send() 메소드를 호출 
               for(Client client : connections) {
                 client.send(data);
               }
             }
           }catch(Exception e) {
               try {
                 connections.remove(Client.this);
                 String message = "클라이언트 통신 안됨 : " + socket.getRemoteSocketAddress() + " : " + Thread.currentThread().getName();
                 Platform.runLater(()->displayText(message));
                 //socket을 닫는다.
                 socket.close();  
             }catch (IOException e2) {}
           }
         }
       };
       //스레드 풀에서 처리하기 위해서. 
       executorService.submit(runnable);
     }
     //클라이언트로 메세지를 보내기 위해서
     void send(String data) {
       Runnable runnable = new Runnable() {
       
       @Override
       public void run() {
         try {
           byte[] byteArr = data.getBytes("UTF-8");
           //Socket에서 출력스트림을 얻는다.
           OutputStream outputStream = socket.getOutputStream();
           outputStream.write(byteArr);
           //출력 스트림의 내부 버퍼를 완전히 비우도록 함. 
           outputStream.flush();
         }catch(Exception e) {
           try {
             String message = "클라이언트 통신 안됨" + socket.getRemoteSocketAddress() + " + " + Thread.currentThread().getName();
             Platform.runLater(()->displayText(message));
             //connection 컬렉션에서 예외가 발생한 Client를 제거. 
             connections.remove(Client.this);
             socket.close();
           }catch (IOException e2) {}
         }
       }
     };
     executorService.submit(runnable);
   }
  }
  
  //UI 생성 코드. 레이아웃을 구성하고 ServerExample을 실행시킨다.
  TextArea txtDisplay;
  Button btnStartStop;
  
  //javafx는 start()부터 시작하기 때문에 재정의해줘야 한다. 
  @Override
  public void start(Stage primaryStage) throws Exception {
  //판을 만들어주는 작업.
    BorderPane root = new BorderPane();
    root.setPrefSize(500, 300);
    
    txtDisplay = new TextArea();
    txtDisplay.setEditable(false);
    BorderPane.setMargin(txtDisplay, new Insets(0,0,2,0));
    root.setCenter(txtDisplay);
    
    //말 그대로 버튼만들어주는 것. 
    btnStartStop = new Button("start");
    btnStartStop.setPrefHeight(30);
    btnStartStop.setMaxWidth(Double.MAX_VALUE);
    
    //start나 stop이라는 버튼을 클릭했을 때 나타나는 이벤트
    btnStartStop.setOnAction(e->{
    //button 안에 있는 text가 start와 같으면 startServer() 실행
      if(btnStartStop.getText().equals("start")) {
        startServer();
      }else if(btnStartStop.getText().equals("stop")) {
        stopServer();
      }
    });
    //화면 밑에다가 set 해놓는다. 
    root.setBottom(btnStartStop);
    
    Scene scene = new Scene(root);
    scene.getStylesheets().add(getClass().getResource("app.css").toString());
    primaryStage.setScene(scene);
    primaryStage.setTitle("Server");
    //우측의 상단 닫기 버튼을 클릭했을 때 처리되는 이벤트
    primaryStage.setOnCloseRequest(event->stopServer());
    primaryStage.show();
  }
  
  //작업 스레드의 내용을 말해줄 때
  void displayText(String text) {
    txtDisplay.appendText(text + "\n");
  }
  
  public static void main(String[] args ) {
  //javafx를 사용한 것. launch() 메소드는 메인클래스의 객체를 생성하고, 메인 윈도우를 생성한다음 start() 메소드를 호출한다. 
    launch(args);
  } 
}
```

ClientExample.java입니다.

```java
package chatting_ex1;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.io.OutputStream;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class ClientExample extends Application{
  Socket socket;
  void startClient() {
    //작업 스레드를 생성한다. 왜냐면 connection과 receive()에서 블로킹이 일어나기 때문. 
    Thread thread = new Thread() {
      @Override
      public void run() {
        try {
          socket = new Socket();
          socket.connect(new InetSocketAddress("localhost", 5001));
          Platform.runLater(()-> {
            displayText("connect is success! : " + socket.getRemoteSocketAddress());
            btnConn.setText("stop");
            btnSend.setDisable(false);
          });
          //예외가 발생할 시, catch 호출
        }catch(Exception e) {
          Platform.runLater(()-> displayText("server is not working"));
          if(!socket.isClosed()) {stopClient();}
          return;
        }
        receive();
      }
    };
    thread.start();
  }
  
  void stopClient() {
    try {
      //아까처럼 UI를 변경하기 위해서
      Platform.runLater(()->{
        displayText("연결 끊음");
        btnConn.setText("Start");
        btnSend.setDisable(true);
      });
      //socket이 null이 아니고, 현재 닫혀있지 않으면
      if(socket != null && !socket.isClosed()) {
        socket.close();
      }
    }catch(IOException e) {}
  }
  
  void receive() {
    //반복적으로 읽기 위해 무한 루프
    while(true) {
      try {
        //받은 데이터의 길이가 100인 바이트 배열
        byte[] byteArr = new byte[100];
        InputStream inputStream = socket.getInputStream();
        
        int readByteCount = inputStream.read(byteArr);
        
        String data = new String(byteArr, 0, readByteCount, "UTF-8");
        
        Platform.runLater(()-> displayText("받기 완료" + data));
      }catch (Exception e) {
        Platform.runLater(()-> displayText("서버 통신 안됨"));
        stopClient();
        break;
      }
    }
  }
  
  void send(String data) {
    Thread thread = new Thread() {
      @Override
      public void run() {
        try {
          byte[] byteArr = data.getBytes("UTF-8");
          //Socket으로부터 출력스트림을 얻는다. 
          OutputStream outputStream = socket.getOutputStream();
          //바이트 배열을 매개 값으로 해서 write() 메소드를 호출한다. 
          outputStream.write(byteArr);
          outputStream.flush();
          Platform.runLater(()->displayText("보내기 완료"));
        }catch(Exception e) {
          Platform.runLater(()-> displayText("서버 통신 안됨"));
          stopClient();
        }
      }
    };
  thread.start();
  }
  //UI 생성코드.
  TextArea txtDisplay;
  TextField txtInput;
  Button btnConn, btnSend;
  
  @Override
  public void start(Stage primaryStage) throws Exception {
    BorderPane root = new BorderPane();
    root.setPrefSize(500, 300);
    
    txtDisplay = new TextArea();
    txtDisplay.setEditable(false);
    BorderPane.setMargin(txtDisplay, new Insets(0,0,2,0));
    root.setCenter(txtDisplay);
    
    BorderPane bottom = new BorderPane();
      txtInput = new TextField();
      txtInput.setPrefSize(60, 30);
      BorderPane.setMargin(txtInput, new Insets(0,1,1,1));
      
      btnConn = new Button("start");
      btnConn.setPrefSize(60, 30);
      btnConn.setOnAction(e->{
        if(btnConn.getText().equals("start")) {
          startClient();
        }else if(btnConn.getText().equals("stop")) {
          stopClient();
        }
      });
      
      btnSend = new Button("send");
      btnSend.setPrefSize(60, 30);
      btnSend.setDisable(true);
      btnSend.setOnAction(e->send(txtInput.getText()));
      
      bottom.setCenter(txtInput);
      bottom.setLeft(btnConn);
      bottom.setRight(btnSend);
    root.setBottom(bottom);
    
    Scene scene = new Scene(root);
    scene.getStylesheets().add(getClass().getResource("app.css").toString());
    primaryStage.setScene(scene);
    primaryStage.setTitle("Client");
    primaryStage.setOnCloseRequest(event->stopClient());
    primaryStage.show();
  }
  
  //작업 스레드의 내용을 말해줄 때
  void displayText(String text) {
    txtDisplay.appendText(text + "\n");
  }
  
  public static void main(String[] args ) {
    launch(args);
  }
}
```

- 

<iframe src="https://qssdev.tistory.com/api" id="editEntry" style="max-width: 100%; position: absolute; width: 1px; height: 1px; left: -100px; top: -100px;"></ifram
