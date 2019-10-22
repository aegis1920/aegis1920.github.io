---
layout  : wiki
title   : design pattern
summary : 
date    : 2019-06-20 15:10:34 +0900
updated : 2019-06-21 11:24:22 +0900
tags    : 
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

 
# 디자인 패턴

선배 개발자의 설계도와 노하우다. 디자인 패턴을 이용하면 프로그래밍적으로 더 좋게 설계할 수 있다.

## 싱글턴 패턴(Singleton Pattern)

객체를 딱 하나만 만들 수 있게 하는 패턴. 클래스 설계 상, 두 개까지 만드는 걸 막아버린다. 즉, 인스턴스가 필요할 때 똑같은 인스턴스를 만들어내는 것이 아니라 기존에 있던 인스턴스를 사용하게 한다.

### 싱글톤을 쓰는 이유?

- 고정된 메모리 영역을 얻으면서 한 번의 new로 인스턴스를 사용하기 때문에 메모리 낭비를 방지할 수 있다.
- 두 번째 이용부터는 객체 로딩 시간이 줄어들어 성능이 좋아진다.
- 전역 인스턴스라서 다른 클래스의 인스턴스들이 데이터를 공유하기 쉽다.


싱글톤을 쓰는 이유

 - UserService나 뭐나 객체 하나만 접근할 수 있고 list 같은 경우에도 하나에만 접근할 수 있기 때문에. 메모리 상으로도 좋다. 예를 들어, 100명의 사용자가 모두 Controller에 접근한다면 100개가 모두 new된다. 그 수는 기하급수적으로 커지기 때문에 웬만하면 싱글톤을 쓰는 게 좋다.





```java
public class ThreadSafeLazyInitialization{
    // private static으로 먼저 메모리에 올라가면서 호출 못 하도록 막는다.
    private static ThreadSafeLazyInitialization instance;

    // 생성자를 private으로 만들어 외부 접근을 막아버리자.
    private ThreadSafeLazyInitialization(){}

    // 다른 곳에서 호출할 수 있도록 public으로 주고 전역에서 호출할 수 있도록 static을 써준다. 이 때 여러 스레드가 동시 접근할 위험이 있다. 
    public static ThreadSafeLazyInitialization getInstance(){
        // null이면 새로 생성하도록.
        if(instance == null){
            instance = new ThreadSafeLazyInitialization();
        }
        return instance;
    }
    
}
```

### 싱글톤 패턴의 문제점은?

- 싱글톤 인스턴스가 너무 많은 일을 해서 많은 데이터를 공유시킬 경우 다른 클래스의 인스턴스들 간에 결합도가 높다.
- 멀티스레드 환경에서 동기화 처리를 해줘야 한다. 안 하면 인스턴스가 두 개 생기는 경우가 발생할 수 있다.

### 출처

- <http://jeong-pro.tistory.com/86>

## MVC 패턴

MVC 디자인 패턴

* Model - Service 계층, Data 계층
  * Service 계층 - 서비스 또는 업무 로직
    * 예를 들어, 로그인을 했을 때 비밀번호만 틀리다고 얘기해주는지 아니면 둘 다 틀리다고 얘기하는지…, 비밀번호 안 바꿨다고 말해주는 그런 로직 등. 
    * login(), getUser(), join() 등 여러 메소드가 DAO에 있는 setUser(id)에 접근한다. 즉, 역할이 나눠져있다.
  * Data 계층 - DAO(Data Accesss Object)
    * CRUD 기능, SQL을 쓴다, 
    * DB를 Access하는 코드는 아님
    * 이 둘을 나눈 이유는 역할을 나눠서 재사용성을 높이기 위해서이다. 단위테스트하기도 쉽다.
* View - Presentation 계층, UI계층
  * Input/Output을 결정.
* Controller - Controller 계층
  * View의 종속성을 떠남
  * View + Model의 다리역할



xml, json을 출력하는 view를 만들어 줬었음. saxhandler 쓰고 그럤음.. 회원관리도  arraylist에 넣는 방식으로 함

FrontController -- Controller -- Service -- DAO -- DB 순으로 작업한다.

# Iterator 패턴이란?

-   Iterator 패턴은 반복이 필요한 자료구조를 모두 동일한 인터페이스를 통해 접근할 수 있습니다. iterator 인스턴스 속에 요소들을 넣은 다음, iterator 인스턴스의 메소드를 이용해 자료구조를 활용하면 됩니다.
    
-   Iterator 패턴은 값을 1씩 증가시키는 변수 i의 역할을 합니다. 변수 i의 역할을 추상화해서 일반화한 것이 iterator 패턴입니다.
    
-   Iterator 인터페이스를 이용해서 Iterator 인스턴스를 만들면 Iterator 인스턴스를 이용해 반복하는데 필요한 메소드를 사용할 수 있습니다.
    

-   boolean hasNext() - 다음 요소가 더 있다면 true를 리턴합니다. 없다면 false
    
-   Object next() - 다음 요소를 리턴합니다. 다음 요소가 없다면 예외를 일으킵니다.
    
-   void remove() - 최근 요소를 삭제합니다.
    

Iterator 패턴을 쓰는 이유는?

-   자료구조에서 List만 쓴다면 for문으로 index를 하나씩 올리는 방법으로 쓰면 되지만 자료구조에는 List만 있는 것이 아닙니다. Tree, Graph, Map, Trie 등을 쓸 때는 for의 index 접근을 못하는 구조가 많습니다.
    
-   이런 집합체(List, Tree, Graph Map 등등)를 모두 동일한 인터페이스를 사용하면 얼마나 편할까요? 그래서 생겨난 것이 Iterator 패턴입니다.
    
-   즉 어떤 컬렉션(ArrayList, HashMap 등등)이 와도 Iterator 패턴을 이용하면 동일한 방식으로 모든 요소에 접근할 수 있습니다.
    

Iterator 패턴을 어떻게 쓸까?

public  static  void  main(String args[]) {  
  
LinkedList list = new LinkedList();  
list.add(1);  
list.add(2);  
list.add(3);  
list.add(4);  
  
Iterator<LinkedList> it = list.iterator();  
  
while(it.hasNext()){  
System.out.println(it.next());  
}  
}

reference

-   [https://namu.wiki/w/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4#s-3.5](https://namu.wiki/w/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4#s-3.5)
    
-   [http://jeong-pro.tistory.com/86](http://jeong-pro.tistory.com/86)
    
-   [https://blog.seotory.com/post/2016/03/java-singleton-pattern](https://blog.seotory.com/post/2016/03/java-singleton-pattern)


