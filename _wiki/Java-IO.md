---
layout  : wiki
title   : IO 기반 입출력
summary : 
date    : 2019-06-20 15:07:21 +0900
updated : 2019-06-20 15:07:52 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# IO 기반 입출력

## Scanner

기본적인 입력 스트림으로 매개변수가 `InputStream source`로 되어있어 inputstream을 다룰 수 있다. 

`import java.util.Scanner;`를 통해 불러와서 써야하고 `Scanner sc = new Scanner(System.in);`으로 객체 생성을 해서 사용해준다.

여기서 나온 `System.in`은 자동으로 로딩되어지는 `java.lang` 패키지 안의 System 클래스 안에 있으므로 바로 쓸 수 있다. `System.in`은 표준 입출력으로 `InputStream`형태로 지정되어 있다.

Scanner의 메소드들은 콘솔에서 데이터를 입력한 후 Enter키를 누르면 동작하도록 되어있다.

입력받을 때 많이 다루는 `nextInt(), nextLine(), next()`를 알아보자.

* nextInt()
  * 정수형 입력값을 읽는다.
  * Enter나 space bar를 눌렀을 때 Enter나 space bar전까지만 입력을 받는다. (중간에 Enter나 space bar가 중복되어도 모두 무시되고 하나로 인식된다)
  * 예를 들어, 20을 콘솔에 입력하고 Enter를 눌렀을 때 20만 입력되고 그 뒤에 오는 Enter는 버퍼에 남는다.
  * nextInt()와 next()는 섞어 써도 문제가 없다. 둘 다 Enter와 space bar를 구분자로 인식하니까 맨 마지막 Enter와 space bar만 버퍼에 남기게 된다.
  * 입력을 읽은 후 커서를 같은 줄에 놓는다.
* next()
  * String으로 입력값을 읽는다.
  * Enter나 space bar를 눌렀을 때 Enter나 space bar전까지만 입력을 받는다. (중간에 Enter나 space bar가 중복되어도 모두 무시되고 하나로 인식된다)
  * 개념은 nextInt()와 같다.
* nextLine()
  * nextLine()은 space가 구분자가 아니고 Enter다.
  * 개행까지 읽은 후 개행만 떼버린다.
  * **그래서 nextInt()를 쓴 후, nextLine()을 바로 쓴다면 nextLine()에는 입력할 새도 없이 Enter 만 입력받게 된다. 그래서 nextLine()은 Enter가 왔으니 아무 것도 없는 String(공백)을 출력하게 된다.**
    * 이를 막기 위해서는 그냥 nextLine()을 한 번 더 써주면 된다. Enter를 다시 먹으니까. 

### 출처

l  <https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html>

 

 

### IO 패키지, 입력 스트림과 출력 스트림

자바 IO는 데코레이터 패턴으로 구성된다. (주인공과 장식을 구분하자)

표준입력 System.in( 키보드, InputStream)

표준출력 System.out(모니터, PrintStream)

표준에러출력 System.err(모니터, PrintStream)

데이터는 Stream을 통해서 입출력됩니다. 프로그램을 기준으로 데이터가 들어오면 Input Stream이고 데이터가 나가면 Output Stream입니다. 스트림은 단 방향입니다.

자바의 기본적인 IO API는 [java.io](http://java.io/) 패키지에서 제공하고 있습니다. 스트림 클래스는 크게 두 종류로 나뉩니다.

- byte 기반 스트림 - 그림, 멀티미디어, 문자 등 모든 종류의 데이터
- character 기반 스트림 - 문자 데이터



전송 단위에 따라서 두 종류로 나뉜다.

- 클래스 이름이 XXStream로 끝 - 바이트(byte) 단위로 입력, 출력하는 스트림
  - 입력 - XXInputStream
  - 출력 - XXOuputStream
- XXer - 문자(char) 단위로 입력, 출력하는 스트림
  - 입력 - XXReader
  - 출력 - XXWriter

자바 IO는 InputStream, OutputStream, Reader, Writer 중에 하나를 실행한다.

장식에 해당하는 클래스는 생성자에 InputStream, OuputStream, Reader, Writer 클래스를 파라미터로 받아들인다.



자바는 Char => 2byte. 글자단위로 입력받으려면 FileReader. 하나씩 읽어서 개행문자까지 읽는 걸 우리가 직접 해야 된다.

필터 기능까지 있는 게 BufferedReader 개행문자 전까지 끊어준다.

`System.in`은 `InputStream`타입이다. 바이트 단위로 받음. 

바이트로 조합하는 기능이 FileReader 는 없다. 

System.in은 byte단위로 받는다. 그럼 InputStreamReader가 char로 바꾸고 BufferedReader가 개행 처리까지 해줌.



InputStream은 바이트 기반 입력 스트림의 최상위 클래스이고 OutputStream은 바이트 기반 출력 스트림의 최상위 클래스입니다. 이를 상속받는 하위 클래스들은 최상위 클래스의 이름이 접미사로 붙습니다. XXXOutputStream처럼.

Reader는 문자 기반 입력 스트림의 최상위 클래스이고 Writer는 문자 기반 출력 스트림의 최상위 클래스입니다. 마찬가지로 이를 상속받는 하위 클래스들은 최상위 클래스의 이름이 접미사로 붙습니다. XXXReader처럼.

#### InputStream 클래스의 주요 메소드(close()를 제외한 리턴 타입이 모두 int. close()는 void)

| 메소드                           | 설명                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| read()                           | 입력스트림으로부터 1바이트를 읽고 4바이트 int 타입(그래서 맨 마지막 1바이트에 데이터가 있음)으로 리턴합니다. 더 이상 입력 스트림으로부터 읽을 수 없다면 -1을 리턴합니다. |
| read(byte[] b)                   | 입력스트림으로부터 매개값으로 주어진 바이트 배열의 길이만큼 바이트를 읽고 배열에 저장합니다. 그리고 읽은 바이트 수를 리턴합니다. 읽을 수 없다면 -1을 리턴합니다. |
| read(byte[] b, int off, int len) | 입력 스트림으로부터 len 개의 바이트만큼 읽고, 매개 값으로 주어진 바이트 배열 인덱스 off부터 len 개까지 저장합니다. 그리고 읽은 바이트인 len개를 리턴합니다. 더이상 읽을 수 없으면 -1을 리턴합니다. |
| close()                          | InputStream을 더 이상 사용하지 않을 경우에 close()를 써서 자원을 풀어줍니다. |

```java
InputStream in = null;

try{
    in = ...;
    int readBuffer = -1;
    // 많이 쓰는 표현
    while(readBuffer = in.read() != -1){
        out.write(readBuffer);
    }
}
```



#### OutputStream 클래스의 주요 메소드(리턴 타입이 모두 void입니다)

| 메소드                            | 설명                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| write(int b)                      | 매개변수로 온 int값에서 끝에 있는 1바이트만 출력스트림으로 보냅니다. |
| write(byte[] b)                   | 매개값으로 주어진 바이트 배열의 모든 바이트를 출력 스트림으로 보냅니다. |
| write(byte[] b, int off, int len) | 인덱스 off부터 len개의 바이트를 출력 스트림으로 보냅니다.    |
| flush()와 close()                 | 출력스트림은 내부에 작은 buffer가 있어서 데이터에 출력되기 전에 buffer에 쌓였다가 순서대로 출력됩니다. flush()는 그 비우는 역할을 합니다. 그리고 이제 사용하지 않을 때는 close()를 써서 시스템 자원을 풀어줍니다. |

#### Reader 클래스의 주요 메소드(close()를 제외한 리턴 타입이 모두 int. close()는 void)

| 메소드                              | 설명                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| read()                              | 입력스트림으로부터 한 개의 문자(2바이트)를 읽고 4바이트인 int로 리턴합니다. 문자를 읽을 수 없다면 -1을 리턴합니다. |
| read(char[] cbuf)                   | 매개값으로 주어진 문자 배열의 길이만큼 문자를 읽고 배열에 저장합니다. 읽은 문자 수를 리턴합니다. 문자를 읽을 수 없다면 -1을 리턴합니다. |
| read(char[] cbuf, int off, int len) | 입력 스트림으로부터 len개의 문자만큼 읽고 매개변수 값으로 주어진 문자배열을 인덱스 off부터 len개까지 저장합니다. 읽은 문자 수인 len 개를 리턴합니다. 문자를 읽을 수 없다면 -1을 리턴합니다. |
| close()                             | close()를 써서 시스템 자원을 풀어줍니다.                     |

#### Writer 클래스의 주요 메소드(리턴 타입이 모두 void입니다)

| 메소드                                                  | 설명                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| write(int c)                                            | 매개변수로 온 int값에서 끝에 있는 2바이트(한 개의 문자)만 출력스트림으로 보냅니다. |
| write(char[] cbuf)                                      | 매개값으로 주어진 char[] 배열의 모든 문자를 출력 스트림으로 보냅니다. |
| write(char[] c, int off, int len)                       | 인덱스 off부터 len개의 문자를 출력 스트림으로 보냅니다. 즉, 문자열 일부입니다. |
| write(String str)와 write(String str, int off, int len) | write(String str)는 문자열 전체를 출력 스트림으로 보냅니다. write(String str, int off, int len)는 인덱스 off부터 len개의 바이트를 출력 스트림으로 보냅니다. |
| flush()와 close()                                       | 문자출력스트림은 내부에 작은 buffer가 있어서 데이터에 출력되기 전에 buffer에 쌓였다가 순서대로 출력됩니다. flush()는 그것을 비우는 역할을 합니다. 잔류하고 있던 데이터를 모두 출력시킵니다. 그리고 이제 사용하지 않을 때는 close()를 써서 시스템 자원을 풀어줍니다. |

표준 입출력 - System.in, System.out, System.err은 자동으로 되어있다.

### 콘솔 입출력

자바는 콘솔로부터 데이터를 입력받을 때 System.in을 사용하고, 콘솔에 데이터를 출력할 때는 System.out을 사용합니다.

### [System.in](http://system.in/) 필드

자바는 프로그램이 콘솔로부터 데이터를 입력받을 수 있도록 System 클래스의 in 정적 필드를 제공하고 있습니다. InputStream 클래스의 필드이므로 InputStream 변수로 참조가 가능합니다.

```
InputStream is = System.in;
import java.io.IOException;
import java.io.InputStream;

public class SystemInExample2 {

  public static void main(String[] args) throws IOException {
    //최상위 추상 클래스인 InputStream을 타입인 변수에 정적 필드를 넣어준다.
    InputStream is = System.in;
    //byte배열을 생성
    byte[] datas = new byte[100];
    
    System.out.print("name : ");
//  매개값으로 주어진 datas에 읽은 문자를 저장하고, 실제로 읽은 바이트 개수를 리턴한다.
    int nameBytes = is.read(datas);
    System.out.print(nameBytes);

//   바이트 배열을 문자열로 변환하기 위해서 String 생성자를 이용한다. 
//   -1를 해주는 이유는 마지막 두 바이트를 제외하기 위해서. \r과 \n
//   근데 이게 운영체제마다 다르다. Linux는 줄바꿈이 \n이고 윈도우는 \r\n이기 떄문에 하나만 줄여도 된다.
    String name = new String(datas, 0, nameBytes-1);
    
    System.out.print("say you want : ");
    int commentBytes = is.read(datas);
    String comment = new String(datas, 0, commentBytes-1);
    
    System.out.println("your name : " + name);
    System.out.println("say you want what? : " + comment);
  }
}
```

### System.out 필드

콘솔로 데이터를 출력하기 위해서는 System 클래스의 out 정적 필드를 사용합니다. out은 PrintStream 타입의 필드입니다. PrintStream이 OutputStream의 하위 클래스이므로 out 필드를 OutputStream으로 변환해서 사용할 수 있습니다.
`OutputStream os = System.out;`

System 클래스의 out 필드를 OutputStream 타입으로 변환해서 콘솔에 출력하는 작업은 편하지 않습니다. 원래 PrintStream 타입의 필드이므로 PrintStream의 print() 또는 println()을 쓰면 좋습니다.

```java
import java.io.IOException;
import java.io.PrintStream;

public class SystemInExample2 {

  public static void main(String[] args) throws IOException {
    PrintStream os = System.out;
    
    for(byte b = 48 ; b < 58 ; b++ ) {
      os.write(b);
    }
    
    os.write(13);
    
    for(byte b = 97 ; b < 123 ; b++ ) {
      os.write(b);
    }
    
    os.write(13);
    
    String hangul = "hello world!!!!";
    byte[] hangulBytes = hangul.getBytes();
    os.write(hangulBytes);
    os.flush();
  }
}
```

#### Console 클래스

자바 6부터는 콘솔에서 입력받은 문자열을 쉽게 읽을 수 있도록 java.io.Console 클래스를 제공하고 있습니다. Console 객체는 System의 static 메소드입니다.
`Console console = System.console();`

주의할 점은 이클립스에서 실행하면 System.console() 메소드는 null을 리턴합니다. 그래서 명령 프롬프트나 shell에서 실행시켜야 합니다.

#### Scanner 클래스

Console 클래스는 콘솔로부터 문자열을 읽을 수 있지만 기본 타입(정수, 실수) 값을 바로 읽을 수 없습니다. java.util의 Scanner 클래스를 생성하면 콘솔로부터 기본 타입의 값을 바로 읽을 수 있습니다.
`Scanner scanner = new Scanner(System.in);`
Scanner 클래스는 기본 타입의 값을 읽기 위해 여러 메소드를 제공합니다. nextBoolean(), nextInt(), nextFloat(), nextLine() 등등…

```java
String inputString = scanner.nextLine();
int inputInt = scanner.nextInt();
```

### 파일 입출력

#### File 클래스

[java.io](http://java.io/) 패키지에서 제공하는 File 클래스는 파일 크기, 파일 속성, 파일 이름등의 정보를 얻어내는 기능과 파일 생성 및 삭제 기능을 제공합니다. 윈도우의 구분자(아래, \\)와 리눅스, Mac의 구분자(위, /)는 다릅니다. 또한 윈도우는 파일 이름의 대소문자를 구별하지 않지만, 리눅스는 대소문자를 구별합니다. 
`File file = new File("C:/Temp/file.txt"); OR File file = new File("C:\\Temp\\file.txt");`

File 객체를 생성했다고 해서 파일이나 디렉토리가 생기지 않습니다. 해당 경로에 실제로 파일이나 디렉토리가 있는지 확인하려면 exists() 메소드를 호출할 수 있습니다.
`boolean isExist = file.exists();`
그래서 이 메소드의 리턴 값이 false일 때, 파일이나 디렉토리를 생성할 수 있습니다.

#### FileInputStream

FileInputStream 클래스는 파일로부터 바이트 단위로 읽어들일 때 사용하는 바이트 기반 입력 스트림입니다.

1. `FileInputStream fis = new FileInputStream("C:/Temp/image.gif");` -> 파일 객체가 이미 생성되어 있을 때라서 그냥 FileInputStream만 만들면 됨.
2. `File file = new File("C:/temp/image.gif"); FileInputStream fis = new FileInputStream(file);` -> 파일 객체가 없을 때

FileInputStream은 InputStream의 하위 클래스이기 때문에 사용 방법이 InputStream과 동일합니다.

#### FileOutputStream

FileOutputStream 클래스는 바이트 단위로 데이터를 파일에 저장할 때 사용하는 바이트 기반 출력 스트림입니다.

1. `FileOutputStream fis = new FileOutputStream("C:/Temp/image.gif");` -> 파일 객체가 이미 생성되어 있을 때.
2. `File file = new File("C:/temp/image.gif"); FileOutputStream fis = new FileOutputStream(file);` -> 파일 객체가 없을 때

주의할 점은 파일이 이미 존재할 경우, 기존 파일의 내용은 사라지고 파일을 덮어쓰게 됩니다. 기존 파일의 내용에 데이터를 추가할 경우에는 생성자의 두번 째 매개 값으로 true를 주면 됩니다.

FileOutputStream은 OutputStream의 하위 클래스이기 때문에 사용 방법이 OutputStream과 동일합니다.

#### FileReader

FileReader 클래스는 텍스트 파일을 프로그램으로 읽어들일 때 사용하는 문자 기반 스트림입니다.

1. `FileReader fr = new FileReader("C:/Temp/file.txt");`
2. `File file = new File("C:/Temp/file.txt"); FileReader fr = new FileReader(file);`

FileReader는 Reader의 하위 클래스이기 때문에 사용 방법이 Reader와 동일합니다.

#### FileWriter

FileWriter 클래스는 텍스트 데이터를 파일에 저장할 때 사용하는 문자 기반 스트림입니다.

1. `FileWriter fw = new FileWriter("C:/Temp/file.txt");` -> 파일 객체가 이미 생성되어 있을 때.
2. `File file = new File("C:/temp/file.txt"); FileWriter fis = new FileWriter(file);` -> 파일 객체가 없을 때

주의할 점은 파일이 이미 존재할 경우, 기존 파일의 내용은 사라지고 파일을 덮어쓰게 됩니다. 기존 파일의 내용에 데이터를 추가할 경우에는 생성자의 두번 째 매개 값으로 true를 주면 됩니다.

FileWriter은 Writer의 하위 클래스이기 때문에 사용 방법이 Writer와 동일합니다.

### 보조스트림

보조 스트림이란 다른 스트림과 연결되어 여러 가지 편리한 기능을 제공해주는 스트림을 말합니다. 보조 스트림을 필터 스트림이라고도 하는데 이는 보조 스트림의 일부가 FilterInputStream, FilterOutputStream의 일부이기 때문입니다. 하지만 다른 보조스트림은 이 클래스들을 상속받지 않습니다.

보조스트림은 문자 변환, 입출력 성능 향상, 기본 데이터 타입 입출력, 객체 입출력 등의 기능을 제공합니다. 보조 스트림을 생성할 때는 자신이 연결될 스트림을 다음과 같이 생성자의 매개값으로 받습니다.

```java
InputStream is = System.in;
InputStreamReader reader = new InputStreamReader(is);
BufferedReader br = new BufferedReader(reader)
```

#### InputStreamReader, OutputStreamReader

소스 스트림이 바이트 기반 스트림(OutputStream,FileInputStream 등등)이면서 입출력 데이터가 문자라면 Reader와 Writer로 변환해서 사용하는 것을 고려해야 합니다. 왜냐하면 Reader와 Writer는 문자 단위로 입출력하기 때문에 바이트 기반 스트림보다는 편리하고, 문자셋의 종류를 지정할 수 있기 때문입니다.

```java
InputStream is = System.in;
Reader reader = new InputStreamReader(is);

FileInputStream fis = new FileInputStream("C:/Temp/file.txt");
Reader reader = new InputStreamReader(fis);
//OutputStream또 마찬가지. 
```

### 성능 향상 보조 스트림

프로그램의 실행 성능은 입출력이 가장 늦은 장치를 따라갑니다. CPU가 아무리 좋아도 하드디스크의 입출력이 늦어지면 프로그램의 실행 성능은 하드디스크의 처리 속도에 맞춰집니다. 그나마 실행 성능을 향상시킬 수 있는 것이 buffer입니다. 데이터가 쌓이길 기다렸다가 꽉 차면 데이터를 한 꺼번에 하드디스크로 보내서 출력 횟수를 줄여줍니다.

#### BufferedInputStream과 BufferedReader

BufferedInputStream은 바이트 입력 스트림에 연결되어 버퍼를 제공해주는 보조 스트림이고, BufferedReader는 문자 입력 스트림에 연결되어 버퍼를 제공해주는 보조 스트림입니다. 입력 소스로부터 자신의 내부 버퍼 크기만큼 데이터를 미리 읽고 버퍼에 저장해둡니다.

```java
BufferedInputStream bis = new BufferedInputStream(바이트입력스트림);
BufferedReader br = new BufferedReader(문자 입력 스트림);
```

BufferedInputStream과 BufferedReader 보조 스트림은 다음과 같이 생성자의 매개값으로 준 입력 스트림과 연결되어 8192 내부 버퍼 사이즈를 가지게 됩니다. 최대, 8192바이트, 8192 문자가 저장될 수 있습니다. 데이터를 읽어들이는 방법이 InputStream이나 Reader와 같습니다.

#### BufferedOutputStream과 BufferedWriter

원리가 BufferedInputStream과 BufferedReader와 같습니다. 다만 버퍼가 가득 찼을 때만 출력을 하기 때문에 마지막 자투리 데이터는 flush()를 통해서 버퍼에 잔류하고 있는 데이터를 모두 보내야 합니다.

### 기본 타입 입출력 보조 스트림

바이트 스트림은 바이트 단위로 입출력하기 때문에 기본 데이터 타입인 boolean, char, int 등등의 단위로 입출력할 수 없습니다. 그러나 DataInputStream과 DataOutputStream 보조 스트림을 연결하면 기본 데이터 타입으로 입출력이 가능합니다.

```java
DataInputStream dis = new DataInputStream(바이트입력스트림)
DataOutputStream dis = new DataOutputStream(바이트입력스트림)
```

readBoolean(), readChar(), readInt() 등등입니다. 이 메소드들로 입출력할 때 주의할 점이 있는데 데이터 타입의 크기가 모두 다르므로 DataOutputStream으로 출력한 데이터를 다시 DataInputStream으로 읽어올 때는 출력한 순서와 동일한 순서로 읽어야 합니다. (int -> boolean -> double이면 읽을 때도 int -> boolean -> double)

### 프린터 보조 스트림

PrintStream과 PrintWriter는 프린터와 유사하게 출력하는 print(), println() 메소드를 가지고 있는 보조 스트림입니다. 그래서 System.out이 바로 PrintStream 타입이기 때문에 print(), println() 메소드를 사용할 수 있었습니다. PrintStream은 바이트 출력 스트림과 연결되고, PrintWriter는 문자 출력 스트림과 연결됩니다.

### 직렬화(Serialization), 객체 입출력 보조 스트림

자바는 메모리에 생성된 객체를 파일 또는 네트워크로 출력할 수 있습니다. 객체는 문자가 아니기 때문에 바이트 기반 스트림으로 출력해야 합니다. 객체를 출력하기 위해서는 객체의 데이터(필드값)를 일렬로 늘어선 연속적인 바이트로 변경해야 하는데 이것을 객체 직렬화(Serialization)이라고 합니다. 반대로 파일에 저장되어 있거나 네트워크에서 전송된 객체를 읽을 때 연속적인 바이트를 객체로 복원하는데 이것을 역직렬화(Deserialization)라고 합니다.

#### ObjectInputStream, ObjectOutputStream

ObjectInputStream은 바이트 출력 스트림과 연결되어 객체를 직렬화하는 역할을 하고, ObjectInputStream은 바이트 입력 스트림과 연결되어 객체로 역직렬화하는 역할을 합니다.

```java
ObjectInputStream ois = new ObjectInputStream(바이트입력스트림);
ObjectOutputStream oos = new ObjectOutputStream(바이트출력스트림);
```

ObjectOutputStream으로 객체를 직렬화하기 위해서는 writeObject() 메소드를 사용합니다.
`oos.writeObject(객체);`

반대로 ObjectInputStream의 readObject() 메소드는 입력 스트림에서 읽은 바이트를 역직렬화해서 객체로 생성합니다. readObject() 메소드의 리턴 타입은 Object 타입이기 때문에 객체 원래의 타입으로 변환해야 합니다.
`객체타입 변수 = (객체타입) ois.readObject();`

객체 직렬화를 할 때 중요한 사실

* 객체로 보냈으면 객체로 받아야하고 리스트로 보냈으면 리스트로 받아야 한다.
* 리스트에서 for문을 돌려 객체로 보냈는데 받을 때 리스트로 받으면 안 된다.

#### 직렬화가 가능한 클래스(Serializable)

자바는 Serializable 인터페이스를 구현한 클래스만 직렬화할 수 있도록 제한하고 있습니다. Serializable 인터페이스는 필드나 메소드가 없는 빈 인터페이스지만, 객체를 직렬화할 때 priavate 필드를 포함한 모든 필드를 바이트로 변환해도 좋다는 표시 역할을 합니다.

객체를 직렬화하면 바이트로 변환되는 것은 필드들이고, 생성자 및 메소드는 직렬화에 포함되지 않습니다. 따라서 역직렬화할 때는 필드의 값만 복원됩니다. 그리고 필드에 transient가 붙어있을 경우에는 직렬화가 되지 않습니다.

++

누가 누굴 데리고 있고 누가 어떤 데이터가 있고... 직렬화 인터페이스. 재정의 할 필요가 없다. 메소드가 없다. 태깅 인터페이스, 마킹 인터페이스라고 한다. 선언만 하면 끝. 이 선언만으로 얘 상태로 표현할 수 있도록 메타 정보가 같이 들어간다. 누가 누구랑 같이있고... 사이즈가 몇이고 등등 같은 메타정보가. 

같이 줄 서서 갈 수가 없는 사람이라면 예외가 발생한다. 모두 직렬화가 되어있어야 예외가 발생하지 않는다. 만약 부모가 직렬화되어있으면 자식도 직렬화가 같이 된다... 함께 딸려있는 사람도 같이 직렬화가 되어있어야 한다.

ObjectInputStream

ObjectOutputStream



++

직렬화 한 명이라도 안 되면 안됨... 통으로 못 보낸다. 

Product가 Serializable을 구현하고 있기 때문에 TV랑 Refrigerator는 구현 하지 않아도 됨. static 변수들은 직렬화되지 않더라?

직렬화를 하면 그 상태의 데이터(메타정보)만 저장됨. 

직렬화는 언제 쓸까?

- 어디로 전송할 때 쓴다. list를 통으로 저장할 수 있다. 한 방에 readObject로 가능. 스트림을 통해서 어떤 객체를 통으로 주고 받을 때 씀. 그냥 한 번만 `writeObject`, `readObject()` 을 쓰면 된다.
- list같은 경우 인덱스든 뭐든.. 1번, 2번, 구분자 등등... 다 알아야 하는데 직렬화를 쓰면 이런 것 필요없이 통으로 저장해버림
- 주는 쪽이든, 받는 쪽이든 똑같은 클래스가 있어야 된다. 왜냐면 직렬화는 데이터, 메타정보만 주는 역할이니까. 그 클래스 직렬화된 걸 넣어줘야 함.
- transient 를 변수에 지정해주면 이 데이터는 안 간다. 
- 직렬화할 때 시리얼 ID가 있다. 만약 상대쪽에서 옛날 클래스를 갖고 있고 현재 내 클래스에서 수정했다면 시리얼 ID가 달라져서 복원해주지 못 한다. 



#### serialVersionUID 필드

직렬화된 객체를 역직렬화할 때는 직렬화했을 때와 같은 클래스를 사용해야 합니다. 클래스 이름이 같더라도 클래스의 내용이 변경되면, 역직렬화는 실패합니다. serialVersionUID는 같은 클래스임을 알려주는 식별자 역할을 합니다. Serializable 인터페이스를 구현한 클래스를 컴파일하면 자동적으로 serialVersionUID 정적 필드가 추가됩니다.

#### writeObject()와 readObject() 메소드

두 클래스가 상속관계에 있다고 가정해봅시다. 부모 클래스가 Serializable 인터페이스를 구현하고 있으면 자식 클래스는 Serializable 인터페이스를 구현하지 않아도 자식 객체를 직렬화하면 부모 필드 및 자식 필드가 모두 직렬화됩니다. 반대로 부모 클래스가 Serializable 인터페이스를 구현하고 있지 않으면 자식 클래스만 Serializable을 구현하고 있다면 자식 객체를 직렬화할 때 부모의 필드는 직렬화에서 제외됩니다. 이 경우, 부모 클래스의 필드를 직렬화하고 싶다면 두 가지 선택이 있습니다.

1. 부모 클래스가 Serializable 인터페이스를 구현하도록 합니다.
2. 자식 클래스에서 writeObject(), readObject() 메소드를 선언해서 부모 객체의 필드를 직접 출력시켜줍니다.

첫 번째 방법이 좋지만, 부모 클래스의 소스를 수정할 수 없는 경우에는 두 번째 방법을 사용해야 합니다. writeObject() 메소드는 직렬화될 때 자동으로 호출되고, readObject() 메소드는 역직렬화될 때 자동적으로 호출됩니다.

```java
private void writeObject(ObjectOutputStream out) throws IOException {
	out.writeXXX(부모필드); 	//부모객체의 필드값을 출력함
	...
	out.defaultWriteObject();// 자식 객체의 필드값을 직렬화
}

private void readObject(ObjectInputStream in) throws IOException,ClassNotFoundException {
	부모필드 = in.readXXX(); //부모객체의 필드값을 읽어옴
	...
	in.defaultReadObject();// 자식 객체의 필드값을 역직렬화
}
```

두 메소드를 작성할 때 주의할 점은 접근 제한자가 private이 아니면 자동호출되지 않기 때문에 반드시 private을 붙여줘야 합니다.

전체 예제입니다.
Parent.java입니다.

```java
//Serializable을 구현하지 않은 부모 클래스.
public class Parent {
  public String field1;     //부모 클래스에서 간단한 필드 1개
}
```

Child.java 입니다.

```java
//Serializable을 구현한 자식 클래스
public class Child extends Parent implements Serializable{
   //자식 필드
  public String field2;     
  int field3;
  transient char field4;     //transient를 썼으므로 직렬화에서 제외.
  
  //writeObject()와 readObject()로 부모 객체의 필드를 직접 출력시킨다. 무조건 private을 써줘야 한다.
  private void writeObject(ObjectOutputStream out) throws IOException{
    out.writeUTF(field1);   //부모 객체의 필드 값을 출력
    out.defaultWriteObject();   //자식 객체의 필드값을 직렬화
  }
  
  private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException{
    field1 = in.readUTF();  //부모 객체의 필드 값을 읽어옴
    in.defaultReadObject(); //자식 객체의 필드값을 역직렬화
  }
}
```

Fileexample.java입니다.

```java
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class FileExample {

  public static void main(String[] args) throws IOException, ClassNotFoundException {
    
    //시간을 재기 위한 간단한 변수
    long start = 0;
    long end = 0;
    
    //디렉토리를 만들고, file을 만들기 위함.
    File dir = new File("/home/user_name/Desktop/filehello");
    File file1 = new File("/home/user_name/Desktop/filehello/hello1.txt");
    
    //디렉토리나 file이 존재하지 않으면 새로 만든다. 
    if(dir.exists() == false) { dir.mkdirs(); }
    if(file1.exists() == false) { file1.createNewFile(); }
    
    //바이트 기반 파일 출력 스트림. 
    FileOutputStream fos = new FileOutputStream("/home/user_name/Desktop/filehello/hello1.txt");
    //더 빠르게 하기 위해서 Buffered 스트림으로 해줌.
    BufferedOutputStream bos = new BufferedOutputStream(fos);
    //바이트 출력 스트림을 문자 출력 스트림(Writer)으로 변환.
    Writer writer = new OutputStreamWriter(bos);
    
    String data = "hello world1\r\nhello world2";
    
    //그냥 시간 측정
    start = System.currentTimeMillis();
    writer.write(data);
    end = System.currentTimeMillis();
    System.out.println((end - start) + "ms");
    
    writer.flush();     //버퍼를 썼으니 한 번 비워주기.
    writer.close();
    fos.close();
    bos.close();
    
    //문자 기반 파일 입력 스트림으로 읽어오기.
    FileReader fr = new FileReader("/home/user_name/Desktop/filehello/hello1.txt");
    //빠르게 해주기 위해서 buffered로.
    BufferedReader br = new BufferedReader(fr);

    
    start = System.currentTimeMillis();
    int readCharNo;
    char[] cbuf = new char[100];
    //계속 한 문자씩 받아오다가 맨 끝인 -1이 오면 종료한다. readLine은 \n이 나올 때 끝나서 개행이 있을 때 전체를 출력하지 못 함.
    while ((readCharNo = br.read(cbuf)) != -1) {    
      String str = new String(cbuf, 0, readCharNo);
      System.out.print(str);
    }
    System.out.println();
    end = System.currentTimeMillis();
    System.out.println((end - start) + "ms");
    
    fr.close();
    br.close();
    
    //객체이므로 바이트 기반 출력 스트림
    FileOutputStream foso = new FileOutputStream("/home/user_name/Desktop/filehello/Object.dat");
    //객체 출력 스트림
    ObjectOutputStream oos = new ObjectOutputStream(foso);
    
    //Child 클래스는 Serializable이 구현되어있으므로 직렬화 가능.
    Child child = new Child();
    child.field1 = "hello1";
    child.field2 = "hello2";
    child.field3 = 3;
    child.field4 = 'a';
    //직렬화를 해준다.그러면 바이트 데이터들이 일렬로 되어있다. 
    oos.writeObject(child);
    oos.flush();
    oos.close();
    foso.close();
    
    //바이트 기반 입력 스트림
    FileInputStream fiso = new FileInputStream("/home/user_name/Desktop/filehello/Object.dat");
    ObjectInputStream ois = new ObjectInputStream(fiso);
    //readObject() 반환 값은 Object 이므로 Child로 형변환. 역 직렬화를 해준다. 
    Child kk = (Child) ois.readObject();
    System.out.println(kk.field1);
    System.out.println(kk.field2);
    System.out.println(kk.field3);
    System.out.println(kk.field4);
  }
}
```

