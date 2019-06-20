---
layout  : wiki
title   : Collection
summary : 
date    : 2019-06-20 14:49:39 +0900
updated : 2019-06-20 14:49:51 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# Java Collection

List와 Set은 Collection으로 상속받지만 스펙이 다른 Map은 따로 나눠져 있다. 

왜 컬렉션을 쓰는 이유는 사이즈가 늘어남.
성능상은 느리지만 편하다. 스택도 list타입.

개발을 하다보면 다수의 객체를 저장하고 꺼내서 사용하는 경우가 많습니다. 이런 객체들을 효율적으로 추가, 검색, 삭제하기 위해서는 가장 간단한 방법으로 배열이 있는데 불특정 다수의 객체를 저장하기로는 배열로 부족합니다. 그래서 널리 알려져 있는 자료구조를 바탕으로 객체를 효율적으로 추가, 삭제, 검색할수 있도록 java.util 패키지에 미리 만들어 놓았습니다. 이것이 바로 Collection Framework입니다.

- Collection은 인스턴스의 Reference만 넣습니다. 기본형 자료인 int나 float가 아니라서 Wrapper 클래스를 쓰게 됩니다.
- 다만 10을 넣게 된다면 잘 넣어지는데 auto boxing으로 알아서 처리를 해주기 때문입니다.

Collection Framework의 주요 인터페이스로 List, Set, Map이 있습니다.

### List Collection

객체를 일렬로 늘어놓은 구조를 가지고 있습니다. 객체를 인덱스로 관리하기 떄문에 객체를 저장하면 자동 인덱스가 부여되고, 인덱스로 객체를 검색, 삭제할 수 있는 기능을 제공합니다. List Collection은 객체를 저장하지 않고 객체의 번지를 저장합니다. 중복이 될 수 있습니다. 아래 표는 List Collection에서 공통적으로 사용 가능한 List 인터페이스의 메소드들입니다.

List는 데이터를 넣을 때 equals나 hashcode같은 걸 안 봄. contains같은 게 있어서 이거 포함하고 있냐고 물어볼 수 있음. 그래서 내가 집어넣기 전에 contains 같은 걸 물어봐서 체크하고 넣어야 함. 인덱스로 관리, 구별

Collection은 Iterable을 상속

| 메소드                           | 설명                                             |
| -------------------------------- | ------------------------------------------------ |
| `boolean add(E element)`         | 주어진 객체를 맨 끝에 추가                       |
| `void add(int index, E element)` | 주어진 인덱스에 객체를 추가                      |
| `set(int index, E element)`      | 주어진 인덱스에 저장된 객체를 주어진 객체로 바꿈 |
| `boolean contains(Object o)`     | 주어진 객체가 저장되어 있는지 여부               |
| `E get(int index)`               | 주어진 인덱스에 저장된 객체를 리턴               |
| `isEmpty()`                      | 컬렉션이 비어있는지 조사                         |
| `int size()`                     | 저장되어 있는 전체 객체 수를 리턴                |
| `void clear()`                   | 저장된 모든 객체를 삭제                          |
| `E remove(int index)`            | 주어진 인덱스에 저장된 객체를 삭제               |
| `boolean remove(Object o)`       | 주어진 객체를 삭제                               |

#### ArrayLIst

ArrayLIst는 List 인터페이스의 구현 클래스로, ArrayList에 객체를 추가하면 객체가 인덱스로 관리됩니다. 그냥 Array는 크기를 고정해줘야 하지만 ArrayList는 저장 용량을 초과한 객체들이 들어오면 자동적으로 저장 용량이 늘어납니다. String을 저장하는 ArrayList는 `List<String> list = new ArrayList<String>();`으로 생성이 가능하며, 기본 생성자로 10개의 객체를 저장할 수 있는 초기 용량을 가지게 됩니다. 처음에 용량을 설정해주기 위해 생성자 매개변수에 값을 줘도 됩니다.

자바 4 이전까지는 제네릭이 없어서 List list = new ArrayList();로 썼었습니다. 그래서 Object 타입으로 변환돼서 저장됐고 찾아올 때 다시 변환해줘야하니 성능이 좋지 않아 자바 5이후 제네릭이 나오면서 불필요한 타입 변환을 하지 않게 됐습니다.

객체를 제거하거나 추가하면 그만큼 인덱스가 당겨지고 밀려납니다. 그래서 빈번하게 객체 삭제와 삽입이 일어나는 곳에는 ArrayList가 좋지 않습니다. 인덱스 검색이나 마지막에 객체를 추가하는 경우에 좋습니다.



```java
import java.util.ArrayList;
import java.util.List;
 
public class ArrayListExam {
 
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
 
        list.add("Java");
        list.add("JDBC");
        list.add("JTBC");
        list.add("Servlet/JSP");
        list.add(2, "Database");
        list.add("iBATIS");
 
        int size = list.size();
        System.out.println("총 객체 수: " + size);
        System.out.println();
 
        String skill = list.get(2);
        System.out.println("2: " + skill);
        System.out.println();
 
        for (int i = 0; i < list.size(); i++) {
            String str = list.get(i);
            System.out.println(i + ": " + str);
        }
 
        System.out.println();
 
        list.remove(2);
        list.remove(2);
        list.remove("iBATIS");
 
        for (int i = 0; i < list.size(); i++) {
            String str = list.get(i);
            System.out.println(i + ": " + str);
        }
     }
 }
```

삭제를 직접 구현한다면? 두 가지 방법이 있다. 마지막 데이터를 삭제한 부분과 대체하거나 삭제한 부분을 한 칸씩 모두 이동해 바꾸거나. 

```java
		// "Lee"라는 이름을 가진 데이터 삭제
		for (int i = 0; i < cs.length; i++) {
			// 대소문자 상관없이 해줌.
			if (cs[i].getCname().equalsIgnoreCase("Lee")) {
				// 마지막데이터 대체
				cs[i] = cs[cs.length - 1];
				cs[cs.length - 1] = null;

				// 한 칸씩 이동
				for (int j = i; j < cs.length; j++) {
					cs[j] = cs[j + 1];
					break;
				}
				cs[cs.length - 1] = null;
				break;
			}
		}
```



#### Vector

Vector는 ArrayList와 동일한 내부 구조를 가지고 있습니다. Vector는 동기화된(Synchronized) 메소드로 구성되어 있기 때문에 멀티 스레드가 동시에 이 메소드들을 실행할 수 없고, 하나의 스레드가 실행을 완료해야만 다른 스레드를 실행할 수 있습니다. 그래서 멀티 스레드 환경에서 안전하게 객체를 추가, 삭제할 수 있습니다.

VectorExample.java입니다.

```java
import java.util.List;
import java.util.Vector;

public class VectorExample {
 public static void main(String[] args) {
  List<Board> list = new Vector<Board>();
  
  //Board 객체에 값을 넣어줍니다. 
  list.add(new Board("제목1", "내용1", "글쓴이1"));
  list.add(new Board("제목2", "내용2", "글쓴이2"));
  list.add(new Board("제목3", "내용3", "글쓴이3"));
  list.add(new Board("제목4", "내용4", "글쓴이4"));
  list.add(new Board("제목5", "내용5", "글쓴이5"));
  
  list.remove(2); // 2번 인덱스 객체를 삭제합니다. 앞으로 한 칸 당겨집니다.
  list.remove(3); 
  
  for(int i=0; i<list.size(); i++) {
   Board board = list.get(i);
   System.out.println(board.subject + "\t" + board.content + "\t" + board.writer);
  }
 }
}
```

Board.java입니다.

```java
public class Board {
 String subject;
 String content;
 String writer;
 
 public Board(String subject, String content, String writer) {
  this.subject = subject;
  this.content = content;
  this.writer = writer;
 }
}
```

#### LinkedList

ArrayList는 내부 배열에 객체를 저장해서 인덱스로 관리하지만, LinkedList는 참조를 링크해서 체인처럼 관리합니다. LinkedLIst에서 특정 인덱스의 객체를 제거하면 앞뒤 링크만 변경되고 나머지 링크는 변경되지 않습니다.객체를 삽입할 때도 마찬가지 입니다. 그래서 빈번한 객체의 삽입과 삭제에 좋습니다. 사용 방법은 ArrayList와 똑같습니다.

### Set Collection

List Collection은 순서를 유지하지만 Set Collection은 순서가 유지되지 않습니다. 그래서 객체를 중복해서 저장할 수 없고, 하나의 null만 저장할 수 있습니다. 인덱스로 관리하지 않기 때문에 인덱스를 매개 값으로 갖는 메소드가 없습니다. 아래 표는 Set Collection에서 공통적으로 사용 가능한 Set 인터페이스의 메소드들입니다.

set은 알아서 걸러내줌. set은 관리할 수 없음. 그냥 원소 자체로 판별. 그래서 순서도 없고 중복도 안됨. 쓰기가 어려워서 확장한 개념이 있음. 그게 SortedSet. - 정렬된 집합을 유지 가능. 넣으면 알아서 정렬됨. 

| 메소드                       | 설명                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `boolean add(E element)`     | 주어진 객체를 저장합니다. 객체가 성공적으로 저장되면 true, 중복 객체면 false를 리턴합니다. |
| `boolean contains(Object o)` | 주어진 객체가 저장되어 있는지 여부                           |
| `isEmpty()`                  | 컬렉션이 비어있는지 조사                                     |
| `Iterator<E> iterator()`     | 저장된 객체를 한 번씩 가져오는 반복자 리턴                   |
| `int size()`                 | 저장되어 있는 전체 객체 수를 리턴                            |
| `void clear()`               | 저장된 모든 객체를 삭제                                      |
| `boolean remove(Object o)`   | 주어진 객체를 삭제                                           |

Set Collection은 인덱스로 객체를 검색해서 가져오는 메소드가 없습니다. 대신, 전체 객체를 대상으로 한 번씩 반복해서 가져오는 반복자, Iterator를 제공합니다. iterator() 메소드를 호출하면 얻을 수 있습니다.

다음은 Iterator 인터페이스에 선언된 메소드들입니다.

| return 타입 | 메소드      | 설명                                                         |
| ----------- | ----------- | ------------------------------------------------------------ |
| boolean     | `hasNext()` | 가져올 객체가 있으면 true를 리턴하고 없으면 false를 리턴합니다. |
| E           | `next()`    | 컬렉션에서 하나의 객체를 가져옵니다.                         |
| void        | `remove()`  | Set 컬렉션에서 객체를 제거합니다.                            |

```java
Set<String> set = ...;
Iterator<String> iterator = set.iterator();
while(iterator.hasNext()) {
	String str = iterator.next();
}
```

#### HashSet

HashSet은 Set 인터페이스의 구현 클래스입니다. HashSet은 객체를 저장하기 전에 먼저 객체의 hashCode() 메소드를 호출해서 해시코드를 얻어냅니다. 그리고 이미 저장되어 있는 해시코드와 비교합니다. 동일한 해시코드가 있다면 equals()로 비교해서 true가 나오면 동일한 객체로 판단하고 중복 저장하지 않습니다.

문자열을 HashSet에 저장하면 String 클래스가 hashCode()와 equals()를 재정의해서 같은 문자열일 경우, hashCode()의 리턴 값을 같게, equals()는 true가 나오도록 합니다. 그러나 String 클래스가 아닌 사용자가 정의한 클래스의 경우 인스턴스가 아예 다르기 때문에 hashCode()와 equals()를 오버라이딩 해줘야 합니다.

Member_1.java 입니다.

```java
public class Member_1 {
	public String name;
	public int age;
	
	public Member_1(String name, int age) {
		this.name = name;
		this.age = age;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Member_1) {
			Member_1 member = (Member_1) obj;
			return member.name.equals(name) && (member.age == age);
		}else {
			return false;
		}
	}
	@Override
	public int hashCode() {
		return name.hashCode() + age;	
	}
}
```

HashSetExample 입니다.

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {

	public static void main(String[] args) {
		Set<Member_1> set = new HashSet<Member_1>();
		
		
		set.add(new Member_1("hello", 30));
		set.add(new Member_1("hello", 30));
		
		System.out.println("total object : " + set.size());
	}
}
```

### Map Collection

Map Collection은 `key`와 `value` 로 구성된 Entry객체를 저장하는 구조를 가지고 있습니다. 여기서 키와 값은 모두 객체입니다. 키는 중복 저장될 수 없지만 값은 중복 저장될 수 있습니다.(key가 같으면 값을 그냥 엎어버림) 만약 동일한 키로 값을 저장하면 기존의 값이 없어지고 새로운 값으로 대체됩니다. 아래 표는 Map Collection에서 공통적으로 사용 가능한 Map 인터페이스의 메소드들입니다. 

Key를 중복되지 않게 관리해야하는 책임을 사용자가 갖고있게 된다.

map은 내부적으로 key를 set으로 관리한다. 그래서 따로 key를 set으로 뽑아줄 수 있다.

Map<K, V> 로 Key에는 primitive가 오지 못함. 그래서 숫자를 쓰고 싶으면 Integer를 쓰거나 해야됨. 문자열은 그냥 String 쓰면 되고.

map은 iterable 타입이 아니다. 즉, Colletion을 상속받지 않기 때문에 foreach를 써줄 수 없다.

| 메소드                                | 설명                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| `V put(K key, V value)`               | 주어진 키와 값을 추가합니다. 저장되면 값을 리턴합니다.       |
| `boolean containsKey(Object key)`     | 주어진 키가 있는지 여부                                      |
| `boolean containsValue(Object value)` | 주어진 값이 있는지 여부                                      |
| `Set<Map.Entry<K,V>>entrySet()`       | 키와 값의 쌍으로 구성된 모든 Map.Entry 객체를 Set에 담아서 리턴 |
| `V get(Object key)`                   | 주어진 키의 값을 리턴(조회)                                  |
| `boolean isEmpty()`                   | 컬렉션이 비어있는지 여부                                     |
| `Set<K> keySet()`                     | 모든 키를 Set 객체에 담아서 리턴                             |
| `int size()`                          | 저장된 키의 총 수를 리턴                                     |
| `Collection<V> values()`              | 저장된 모든 값을 Collection에 담아서 리턴                    |
| `void clear()`                        | 모든 Map.Entry(키와 값)를 삭제                               |
| `V remove(Object key)`                | 주어진 키와 일치하는 Map.Entry를 삭제하고 값을 리턴          |

전체 객체를 대상으로 하나씩 얻고 싶을 경우에는 두 가지 방법을 사용할 수 있습니다. keySet()으로 모든 키를 Set 컬렉션으로 얻은 다음, 반복자를 통해 키를 하나씩 얻고 get() 메소드를 통해 값을 얻으면 됩니다.
아니면 entrySet() 메소드로 모든 Map.Entry를 Set 컬렉션으로 얻은 다음, 반복자를 통해 Map.entry를 하나씩 얻고 키와 값을 얻으면 됩니다.

#### HashMap

HashMap은 Map 인터페이스를 구현한 대표적인 Map Collection입니다. HashMap의 키로 사용할 객체는 hashCode()와 equals() 메소드를 재정의해서 동등 객체가 될 조건을 정해야 합니다. hashCode()의 리턴 값이 같아야하고, equals() 메소드가 true를 리턴해야 합니다.

key와 value의 타입은 기본 타입을 사용할 수 없고, 클래스나 인터페이스 타입만 가능합니다.

Student.java입니다.

```java
public class Student {
  public int sno;
  public String name;
  
  //생성자입니다. 바로 인스턴스 변수에 값을 넣습니다. 
  public Student(int sno, String name) {
    this.sno = sno;
    this.name = name;
  }

  //equals 함수를 override합니다. 
  public boolean equals(Object obj) {
    //그 매개변수로 받은 객체가 Student 클래스의 인스턴스인지 확인합니다.
    if (obj instanceof Student) {
      //Student클래스로 형변환을 해줍니다. 
      Student student = (Student) obj;
      //인스턴스 변수인 sno와 student 객체의 sno가 똑같은지 확인하면서 name 배열 또한 확인해줍니다. 
      return (sno == student.sno) && (name.equals(student.name));
    } else {
      return false;
    }
  }
  
  //hashCode() 메소드도 override 해줍니다. 
  public int hashCode() {
	//sno int값에 name의 hashCode()를 더해주고 리턴합니다. 
    return sno + name.hashCode();
  }
}
```

HashMapExample2.java입니다.

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample2 {

  public static void main(String[] args) {
    Map<Student, Integer> map = new HashMap<Student, Integer>();

    map.put(new Student(1, "hong"), 95);
    map.put(new Student(1, "hong"), 95);

    System.out.println("total entry : " + map.size());
  }
}
```

#### Hashtable

Hashtable은 HashMap과 동일한 내부 구조를 가지고 있습니다. Hashtable도 키로 사용할 객체는 hashCode()와 equals() 메소드를 override해서 동등 객체가 될 조건을 정의해야 합니다. HashMap과의 차이점은 동기화된(Synchronized) 메소드로 구성되어 있기 때문에 멀티 스레드가 동시에 이 메소드를 실행할 수 없고, 하나의 스레드가 실행을 완료해야만 다른 스레드를 실행할 수 있습니다. 그래서 안전하게 객체를 추가, 삭제할 수 있습니다. 이것을 스레드가 안전하다(thread safe)고 말합니다.

#### Properties

Properties는 Hashtable의 하위 클래스이기 때문에 Hashtable의 모든 특징을 그대로 가지고 있습니다. 차이점은 Hashtable은 제네릭으로 여러 타입이 가능한데 Properties는 String 타입으로 제한한 Collection입니다. 그래서 보통 옵션 정보들이나, 데이터베이스 연결 정보 등등의 파일을 읽을 때 사용합니다.

Properties 파일은 키와 값이 =로 연결되어 있는 텍스트 파일입니다. ISO 8859-1 문자셋으로 저장되기 때문에 이 문자셋으로 표현할 수 없는 한글은 Unicode로 변환되어 저장됩니다.

Properties 파일을 읽기 위해서는 Properties 객체를 생성하고 load() 메소드를 호출하면 됩니다. load() 메소드는 Properties 파일로부터 데이터를 읽기 위해 FileReader 객체를 매개값으로 받습니다.

Properties 파일은 일반적으로 .class 파일과 함께 저장됩니다.

PropertiesExample.java 입니다.

```java
import java.io.FileReader;
import java.net.URLDecoder;
import java.util.Properties;

public class PropertiesExample {
  public static void main(String[] args) throws Exception {
    //Properties 파일을 읽기 위해서는 Properties 객체가 필요.
    Properties properties = new Properties();
    //Properties 파일은 보통 .class 파일과 함께 저장되는데 이 클래스 파일을 기준으로 상대경로를 이용해서 properties 파일의 경로를 얻으려면 Class의 getResource() 메소드를 이용합니다.
    //getResource()는 주어진 파일의 상대 경로를 URL 객체로 리턴.
    //URL 객체의 getPath()는 파일의 절대 경로를 리턴.
    String path = PropertiesExample.class.getResource("database.properties").getPath();
    //경로에 한글이 있을 경우, 한글을 복원합니다. 
    path = URLDecoder.decode(path, "utf-8");
    //load() 메소드를 사용하기 위해서 FileReader 패키지를 추가. 
    properties.load(new FileReader(path));
    
    //Properties 객체에서 해당 키의 값을 읽으려면 getProperty() 메소드. 
    //Map Collection이므로 get()을 쓸 수도 있으나 Object 타입이므로 String으로 강제변환 해야하니 귀찮. 
    String driver = properties.getProperty("driver");
    String url = properties.getProperty("url");
    String username = properties.getProperty("username");
    String password = properties.getProperty("password");
    
    System.out.println("driver : " + driver);
    System.out.println("url : " + url);
    System.out.println("username : " + username);
    System.out.println("password : " + password);
  }
}
```

### 검색 기능을 강화시킨 Collection

Collection Framework는 검색 기능을 강화시킨 TreeSet과 TreeMap을 제공하고 있습니다. 이 Collection들은 이진 트리를 이용해서 Tree 구조를 가지면서 객체를 저장합니다. 처음 객체를 루트 노드에 저장한 후, 부모 노드보다 작으면 왼쪽, 크면 오른쪽에 저장합니다.

#### TreeSet

이진 트리를 기반으로 한 Set Collection입니다. 하나의 노드는 노드 값인 value와 왼쪽과 오른쪽 자식 노드를 참조하기 위한 두 개의 변수로 구성됩니다.
`TreeSet<E> treeSet = new TreeSet<E>();`
Set 인터페이스 타입 변수에 대입해도 되지만, TreeSet 클래스 타입으로 대입한 이유는 객체를 찾거나 범위 검색과 관련된 메소드를 사용하기 위해서 입니다.

```java
import java.util.NavigableSet;
import java.util.TreeSet;

public class TreeSetExample {

  public static void main(String[] args) {
    TreeSet<String> treeset = new TreeSet<String>();
    treeset.add("apple");
    treeset.add("forever");
    treeset.add("description");
    treeset.add("ever");
    treeset.add("zoo");
    treeset.add("base");
    treeset.add("guess");
    treeset.add("cherry");
    
     //가장 위의 객체 리턴
    System.out.println(treeset.first());
    //가장 밑의 객체 리턴
    System.out.println(treeset.last());
    //주어진 객체보다 바로 아래 객체 리턴
    System.out.println(treeset.lower("ever"));
    //주어진 객체보다 바로 위 객체 리턴
    System.out.println(treeset.higher("ever"));    
    
    System.out.println("c~f사이의 단어 검색");    
    
    NavigableSet<String> rangeSet = treeset.subSet("c", true, "f", true);
    for(String word : rangeSet) {
      System.out.println(word);
    }
    
    System.out.println("내림차순");    
    NavigableSet<String> descendingSet = treeset.descendingSet();
    for(String word : descendingSet) {
      System.out.println(word);
    }

    System.out.println("오름차순");    
    NavigableSet<String> ascendingSet = treeset.descendingSet().descendingSet();
    for(String word : ascendingSet) {
      System.out.println(word);
    }

  }
}
```

#### TreeMap

TreeMap은 이진 트리를 기반으로 한 Map Collection입니다. 키와 값이 저장된 Map.entry를 저장합니다. 객체를 저장하면 자동으로 저장되는데 부모 키값과 비교해서 키 값이 낮은 것은 왼쪽에, 키 값이 높은 것은 오른쪽 자식 노드에 Map.entry 객체를 저장합니다.
`TreeMap<K, V> treeMap = new TreeMap<K, V>();`
얘도 마찬가지로 Map 인터페이스에 대입해도 되지만 TreeMap 클래스안에 있는 메소드를 쓰기 위해서 입니다.

```java
import java.util.Map;
import java.util.Map.Entry;
import java.util.NavigableMap;
import java.util.Set;
import java.util.TreeMap;

public class TreeMaptExample {

  public static void main(String[] args) {
    //Map이니까 각각 key와 value가 된다. 
    TreeMap<String,Integer> treemap = new TreeMap<String, Integer>();
     
     //데이터 넣기.
    treemap.put("apple", new Integer(10));
    treemap.put("forever", new Integer(60));
    treemap.put("description", new Integer(40));
    treemap.put("ever", new Integer(50));
    treemap.put("zoo", new Integer(10));
    treemap.put("base", new Integer(70));
    treemap.put("guess", new Integer(30));
    treemap.put("cherry", new Integer(20));
    
     //가장 위의 객체(Map.Entry) 리턴
    System.out.println(treemap.firstEntry());
    //가장 밑의 객체 리턴
    System.out.println(treemap.lastEntry());
    //주어진 객체보다 바로 아래 객체 리턴
    System.out.println(treemap.lowerEntry("ever"));
    //주어진 객체보다 바로 위 객체 리턴
    System.out.println(treemap.higherEntry("ever"));    
    
    System.out.println("c~f사이의 단어 검색");    
    
    NavigableMap<String, Integer> rangeMap = treemap.subMap("c", true, "f", true);
    for(Map.Entry<String, Integer> entry : rangeMap.entrySet()) {
      System.out.println(entry.getKey() + "-" + entry.getValue());
    }
    
    System.out.println("내림차순");    
    NavigableMap<String, Integer> descendingMap = treemap.descendingMap();
    Set<Entry<String, Integer>> descendingEntrySet = descendingMap.entrySet();
    for(Map.Entry<String, Integer> entry : descendingEntrySet) {
      System.out.println(entry.getKey() + "-" + entry.getValue());
    }

    System.out.println("오름차순");    
    NavigableMap<String, Integer> ascendingMap = descendingMap.descendingMap();
    Set<Entry<String, Integer>> ascendingEntrySet = ascendingMap.entrySet();
    for(Map.Entry<String, Integer> entry : ascendingEntrySet) {
      System.out.println(entry.getKey() + "-" + entry.getValue());
    }
  }
}
```

#### Comparable과 Comparator

TreeSet과 TreeMap은 들어가자마자숫자는 값으로, 문자열은 유니코드로 자동정렬이 되는데 이 둘은 정렬을 위해 java.lang.Comparable을 구현한 객체를 요구합니다. Integer, Double, String은 모두 Comparable 인터페이스를 구현하고 있습니다. 사용자 정의 클래스도 Comparable을 구현한다면 자동 정렬이 가능합니다.

Comparable에는 compareTo() 메소드가 정의되어 있기 때문에 사용자 정의 클래스에서는 자신이 원하는 기준을 주기 위해 이 메소드를 오버라이딩하여 int 리턴 값을 만들어줘야 합니다. 아래처럼 만들면 나중에 `treeSet.add(new Person("lee", 30));`으로 저장이 될 때 자동으로 나이순으로 정렬이 됩니다.

```java
public class Person implements Comparable<Person>{
  public String name;
  public int age;
  
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
  
  @Override
  public int compareTo(Person o) {
    if(age<o.age) return -1; 	//나이가 적을 경우
    else if(age == o.age) return 0; 	//나이가 같을 경우
    else return 1; 	//나이가 많을 경우
  }

}
```

TreeSet의 객체와 TreeMap의 키가 Comparable을 구현하고 있지 않을 경우에는 저장하는 순간 ClassCastException이 발생합니다. 그에 대한 대안으로 Comparable을 구현하지 않고 정렬하는 방법도 있습니다. TreeSet 또는 TreeMap 생성자의 매개값으로 Comparator를 제공하면 Comparable 비구현 객체도 정렬시킬 수 있습니다.

정렬자는 Comparator 인터페이스를 구현한 객체를 말하는데 Comparator 인터페이스에는 다음과 같이 메소드가 정의되어 있습니다. 리턴 타입이 int이고, 메소드가 compare(T o1, T o2)입니다. 동등하면 0을 리턴, o1이 o2보다 앞에 오게하려면 음수를 리턴, o1이 o2보다 뒤에 오게 하려면 양수를 리턴합니다.

```java
import java.util.Comparator

public class DescendingComparator implements Comparator<Fruit> {
	@Override
	public int compare(Fruit o1, Fruit o2) {
		if(o1.price < o2.price) return 1;
		else if(o1.price == o2.price) return 0;
		else return -1;
	}
}
```

++

```java
package com.ssafy.comparator;

import java.util.Arrays;
import java.util.Comparator;

public class ComparatorTest {

	public static void main(String[] args) {
		int[] arr = { 3, 5, 2, 5, 10 };

		System.out.println(Arrays.toString(arr));
		Arrays.sort(arr);
		System.out.println(Arrays.toString(arr));

		Integer[] arr2 = { 3, 5, 2, 5, 10 };

		//Integer 배열로 줘야됨. 
		
		System.out.println(Arrays.toString(arr2));
		Arrays.sort(arr2, new Comparator<Integer>() {

			@Override
			public int compare(Integer o1, Integer o2) {
				// 객체 빼기 객체는 원래 안 된다. 오토박싱까지 되니까 되는 거지 원래는 아래의 코드와 같아져야 한다.
//				return -1*(o1.intValue() - o2.intValue()); 
				
				return -1*(o1 - o2); // 부호를 반대로 주면 내림차순으로 된다. 
			}
		});

		System.out.println(Arrays.toString(arr2));
		
		String arr3[] = {"hello", "hi", "bye"};
		System.out.println(Arrays.toString(arr3));
		Arrays.sort(arr3); // 그냥 sort해도 정렬이 된다. 이 뜻은  String이 Comparable하게 되어있다는 소리. 
		// String은 final이라서 못 바꾼다. 그럴 때 별도의 Comparator를 준다.
		System.out.println(Arrays.toString(arr3));

		
		String arr4[] = {"hello", "hi", "bye"};
		System.out.println(Arrays.toString(arr4));
		// 익명 클래스는 한 번만 쓰면서 바로 new할 수 있기때문에 편하다. 
		Arrays.sort(arr4, new Comparator<String>() {

			@Override
			public int compare(String o1, String o2) {
				// 객체 빼기 객체는 원래 안 된다. 오토박싱까지 되니까 되는 거지 원래는 아래의 코드와 같아져야 한다.
//				return -1*(o1.intValue() - o2.intValue()); 
				
				return -1*o1.compareTo(o2); // 부호를 반대로 주면 내림차순으로 된다. 
			}
		});

		System.out.println(Arrays.toString(arr4));

		
	}

}

```







### LIFO와 FIFO Collection

Collection Framework에는 LIFO 자료구조인 Stack과 FIFO 자료구조인 Queue 인터페이스를 제공하고 있습니다.

#### Stack

```
Stack<E> stack = new Stack<E>();`
`stack.push();`, `stack.pop();
```

#### Queue

```
Queue<E> queue = new LinkedList<E>();`
`queue.offer(E e);`, `queue.peek();`, `queue.poll();
```

Queue 인터페이스를 구현한 대표적인 클래스가 LinkedList입니다. 위는 LinkedList 객체를 Queue 인터페이스 타입으로 변환한 것입니다.

### 동기화된 컬렉션과 병렬 처리를 위한 컬렉션

Collection Framework 대부분의 클래스들은 싱글 스레드 환경에서 사용할 수 있도록 설계되었습니다. 그래서 멀티 스레드 환경에서는 의도치 않게 요소가 변경될 수 있습니다. Thread safe한 Vector와 Hashtable은 상관없지만 ArrayList나 HashSet, HashMap은 동기화된 메소드가 아니라서 안전하지 않습니다.
이 때 Collections의 synchronizedXXX() 메소드를 사용하면 동기화된 메소드로 래핑할 수 있습니다.

Ex) `Map<K, V> map = Collections.synchronizedMap(new HashMap<K, V>());`

동기화된 컬렉션은 안전하지만 빠르게 처리하지 못 합니다. 왜냐면 하나의 스레드가 요소를 처리할 때 다른 스레드가 사용 못 하도록 스레드가 lock되기 때문입니다. 그래서 자바는 멀티 스레드가 병렬적으로 처리할 수 있도록 부분 잠금을 해주는 특별한 컬렉션을 제공하고 있습니다. java.util.concurrent 패키지의 ConcurrentHashMap, ConcurrentHashQueue 입니다.

```
Map<K, V> map = new ConcurrentHashMap<K, V>();
```

## 
