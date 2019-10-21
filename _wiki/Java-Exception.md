---
layout  : wiki
title   : Exception
summary : 
date    : 2019-06-20 15:05:36 +0900
updated : 2019-06-20 15:05:55 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# Java Exception

Checked Exception은 예외처리를 컴파일러가 강제하기때문에 코드가 복잡해져 코드의 가독성이 떨어질 수 있다. 그래서 만약 상속해서 쓰게 된다면 `RuntimeException`을 상속하는 것이 좋다.

## Exception 예외 처리

신뢰성 있는 프로그램은 예외를 잡고 처리할 수 있어야 한다.

예외 처리는 간단히 말해서 '프로그램을 위한 보험 처리’입니다.

Error와 Exception는 다릅니다.

- Error는 JVM의 동작이상 같이 개발자가 어떻게 조치할 수 없는 수준
  - 복구 불가능
  - XXXError
  - ex. stackoverflow
- Exception은 JVM은 정상적으로 동작하고 있어 다른 방식으로 처리하는 것.
  - 복구 가능
  - XXXException, RuntimeException
  - Ex. 와이파이를 못 찾을 때 자동으로 다시 시도한다
  - 우리가 코드로 짤 수 있다.

### Exception에는 두 가지가 있습니다.

- Checked Exception : Java 내부에서 예외 처리를 하지 않으면 컴파일을 허락하지 않음. sw적으로 복구 가능
- Unchecked Exception : 컴파일 시에 체크되지 않고, Runtime에 발생하는 예외. 예를 들어, 분모가 0인 경우.
- 가장 흔하게 보는 예외들
  - `NullPointerException` : 인스턴스의 리모컨을 누르지만, 실제 인스턴스는 없을 떄
  - `ArrayIndexOutOfBoundsException` : 배열의 범위를 벗어날 때
  - `NumberFormatException` : 숫자로 바꿀 수 없는 데이터를 숫자로 바꿀 때
- 예외는 상속 구조로 처리됩니다.
  - 가장 상위에 있는 것은 Throwable이라는 클래스이고 하위 자식으로 Exception과 Error가 있습니다.
  - 부모 클래스인 java.lang.Exception 클래스만 알아도 괜찮습니다.
    - 그래서 이런 형식으로 처리할 수 있습니다.
    - `Exception e = new NullPointerException();`
- Exception Class에서 알아야 하는 메소드는?
  - printStackTrace()
    - 발생한 Exception의 출처를 메모리 상에서 추적하면서 결과를 알려줍니다. 즉, 예외가 발생한 위치를 정확히 화면에 출력해줍니다. 다만 리턴 타입이 void라서 보이는 메세지를 다른 방식으로 응용할 수 없습니다.
  - getMessage()
    - printStackTrace()가 상세한 내용이라면 getMessage()는 한 줄로 요약된 요약 메세지를 String으로 반환해줄 수 있습니다.
  - getStackTrace()
    - StatTraceElement라는 인스턴스들의 배열로 printStackTrace()의 결과를 인스턴스화 시켜줍니다. 즉, 별도로 문자열로 만들 때 씁니다.

### Try~catch

- 예외를 직접 처리하는 구문입니다.
- `try{ }catch(Exception e){ }`
- 예외 처리의 순서
  1. 예외 처리를 하고 싶은 코드의 부분을 찾는데 라인 단위가 아니고 로직 단위입니다.
  2. Try 블록 안에 정상적으로 실행될 코드를 넣는데 try 블록 안에서 선언한 변수는 블록 바깥쪽에서 사용될 수 없으니 주의하세요.
  3. Catch에는 대안 흐름을 넣습니다.
     - 예외가 발생했을 때 어느 부분에서 문제가 생겼는지 (e.printStackTrace())
     - 잘못된 결과를 대신해서 나머지 코드에 영향이 없게끔 대안 결과를 제시하는 경우
     - 잘못된 상황에서 다른 메소드를 호출하거나 결과를 기록하는 경우
  4. 중요한 건 try 블록을 크게 했을 경우에는 중간에 예외가 생겼을 때 블록 안에서의 밑에 부분은 실행하지 않고 바로 catch로 넘어가버립니다.
- Catch(Exception e)는 만병통치약입니다. 왜냐면 프로그램 실행시에 예외가 Exception e의 하위 클래스일 가능성이 매우 높기 때문입니다.
- 발생하는 예외마다 다르게 대처해야 한다면 하나의 try에 catch문을 여러 개 써서 처리하면 됩니다. 또한 try catch가 연속적으로 nesting 될 수 있다.
- 마지막으로 `finally`는 어떤 상황에서도 반드시 실행된다는 의미입니다.
  - **보통 연결을 종료할 때 finally를 많이 씁니다.** 예외가 발생하든, 하지 않든, 외부 리소스들과 연결을 종료해줘야 하기 때문입니다.
  - 무조건적으로 실행된다.
  - catch에서 throw를 던져도 실행하고 던지고, **return으로 종료하더라도** 먼저 실행하고 return이 됨.

```java
// 상위타입이 위에 있기 때문에 아래 코드는 실행되지 않는 데드코드가 된다.
catch(Exception e) {}
catch(FileNotFoundException e){}
```

내가 만든 커스텀 예외는 클래스를 만든 후, 상위 타입을 extends해서 만든다. 

### Throws

- 예외 처리를 현재 메소드가 직접 처리하지 않고 호출한 곳에다가 예외의 발생 여부를 알려주는 것입니다. 즉, 책임을 남에게 미루는 것이죠.
- `Public void doA() throws NullPointerException{…}`
  - 이 메소드를 실행하다가 NullPointerException이 발생하면 처리하지 않고 책임을 미루겠다는 선언입니다.
- `Public void doA() throws Exception{…}`
  - 이렇게 하게 되면 모든 예외 발생 시 처리하지 않고 책임을 전가하는 것입니다.
- 예외는 JVM까지 예외를 던질 수 있습니다.
- 모든 곳에서 예외를 던지면 그냥 예외 처리를 내버려 둡니다.
- 현재 메소드에서 예외가 일어났다면 throws 하여 현재 메소드를 호출한 메소드로 가게 됩니다.
- 예외 처리를 하지 않으면 컴파일러가 컴파일을 허락하지 않습니다. 예외 처리는 반드시 처리하든가, 던지든가 해야합니다.
- 그렇다면 어느 경우에 처리하고 어느 경우에 던져야 할까요?
  - 해당 메소드가 다른 메소드와 연결이 되어서 작업되는 메소드라면 호출한 쪽에 던져서 예외의 발생 여부를 알리는 게 좋습니다.
  - 만약에 단독으로 실행되는 메소드라면 try~catch를 고려합니다.
- 예외의 용어들
  - Throws
    - 메소드의 선언부에서 어떤 종류의 예외들이 던져질 것인지를 명시할 때 사용한다.
  - Throw
    - 직접 예외 인스턴스를 발생시켜서 코드 바깥으로 예외를 던질 때 사용합니다.
- Throw new~를 이용해서 예외 인스턴스를 만들어서 바로 던질 수 있습니다.

```java
Public void doJob() throws JobException{
           try{
               init();
              System.out.println("실제 작업 내용입니다.");
               finish();
           }catch(Exception e){
               e.printStackTrace();
            Throw new JobException(e.getMessage());
            }
}
```

- 즉, try 부분에서 만약 예외 상황이 발생하면 printStackTrace()를 실행한 후에 새로운 JobException 인스턴스를 만들어서 throw 키워드를 이용해서 코드 바깥쪽으로 던집니다. 이렇게 되면 외부에서는 doJob()은 호출했을 때 실제로 어떤 예외가 발생했는지 알 필요가 없습니다.
