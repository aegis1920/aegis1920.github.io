---
layout  : wiki
title   : Java Generic
summary : 
date    : 2019-06-20 15:08:51 +0900
updated : 2019-06-20 15:09:28 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 제네릭(Generic)

Java 5부터 추가됐습니다. 제네릭은 클래스와 인터페이스, 메소드를 정의할 때 타입을 파라미터로 사용할 수 있도록 합니다. 타입 파라미터는 코드 작성 시 구체적인 타입을 대체되어 다양한 코드를 생성하도록 해줍니다. 즉, 클래스 내부에서 사용할 **데이터 타입을 외부에서 지정하는 기법**입니다.

왜 제네릭을 사용해야 될까?

- 제네릭 타입을 사용함으로써 제네릭 타입을 이용함으로써 잘못된 타입이 사용될 수 있는 문제를 컴파일 과정에서 제거할 수 있게 됐습니다. 엄격하게 타입 체크를 해서 컴파일 시에 에러를 사전에 방지합니다.
- 타입 변환(Casting)을 제거합니다. 예를 들어 List에 저장되는 요소를 String 타입으로 국한하기 때문에 요소를 찾아올 때 타입 변환을 할 필요가 없어 프로그램의 성능이 향상됩니다.

```java
//제네릭을 쓰지 않으면 아래와 같이 찾을 때 String으로 Casting을 시켜줘야 합니다. 
List list = new ArrayList();
list.add("hello");
String str = (String) list.get(0);

//제네릭을 쓰면 아래와 같이 Casting을 쓰지 않아도 됩니다.
List<String> list = new ArrayList<String>();
list.add("hello");
String arr = list.get(0);
```

### 제네릭 타입

제네릭 타입은 타입을 파라미터로 가지는 클래스와 인터페이스를 말합니다. 아래 코드에서 타입 파라미터의 이름은 T입니다. 보통 한 글자의 영어 대문자로 씁니다.

```java
public class 클래스명<T> { ... }
public interface 인터페이스명<T> { ... }
//Box.java
public class Box{
	private Object object;
	public void set(Object object) {this.object = object;}
	public Object get() {return object;}
}
public class BoxExample{
	public static void main(String[] args){
		Box box = new Box();
//box 객체에 "hello"라는 문자열을 넣음. set()의 매개변수에 Object 타입이 들어있어서 모든 종류의 객체를 저장할 수 있다. String 타입으로 자동 변환된다.
		box.set("hello"); 	
//그러나 꺼내올 때는 Object 타입이므로 String으로 강제로 타입을 변환시켜줘야한다. 
		String name = (String) box.get();
	}
}
```

제네릭을 쓴다면 ?

```java
public class Box<T> {
	private T t;
	public T get() {return t;}
	public void set(T t) {this.t = t;}
}
```

T는 Box 클래스로 객체를 생성할 때 구체적인 타입으로 변경됩니다. 예를 들어, `Box<String> box = new Box<String>();`로 생성했다면? (Integer 같이 Wrapper도 당연히 됩니다.)

```java
public class Box<String> {
	private String t;
	public String get() {return t;}
	public void set(String t) {this.t = t;}
}
```

이렇게 되면 나중에 읽어올 때나 저장할 때나 타입 변환이 발생하지 않습니다.

### 멀티 타입 파라미터

제네릭 타입은 두 개 이 상의 멀티 타입 파라미터를 사용할 수 있습니다. 이 경우, 타입 파라미터를 콤마로 구분합니다.

```java
//제네릭 타입을 두 개를 써주고 있다. 
public class Product<T, M> {
	private T kind;
	private M model;

	public T getKind() {return this.kind;}
	public M getModel() {return this.model;}

	public void setKind(T kind) {this.kind = kind;}
	public void setModel(M model) {this.model = model;}
}
public class ProductExample {
	public static void main(String[] args) {
		//java 7부터는 Product<Tv, String> product1 = new Product<>();만 써줘도 타입 파라미터를 자동으로 유추해서 써준다. 
		//Product<Tv, String>이라는 객체를 생성한다. 
		Product<Tv, String> product1 = new Product<Tv, String>();
		//Tv kind = new Tv();니까 객체를 생성해서 인스턴스 변수에 넣는다.  
		product1.setKind(new Tv());
		// String model = "Smart Tv"니까 된다. 
		product1.setModel("Smart Tv");
		Tv tv = product1.getKind();
		String tvModel = product1.getModel();
```

### 제네릭 메소드

제네릭 메소드는 매개 타입과 리턴 타입으로 타입 파라미터를 갖는 메소드를 말합니다. 리턴 타입 앞에 <>를 추가하고 타입 파라미터를 기술한 후, 리턴 타입과 매개 타입으로 타입 파라미터를 사용하면 됩니다.

`public <T> Box<T> boxing(T t) {...}`
위에 쓴 제네릭 메소드는 <> 기호 안에 타입 파라미터 T를 기술한 뒤, 리턴 타입으로 Box를 주고 매개 변수 타입으로 T를 사용했습니다.

제네릭 메소드는 두 가지 방식으로 호출할 수 있습니다.

- `Box<Integer> box = <Integer>boxing(100); //타입 파라미터를 명시적으로 지정`
- `Box<Integer> box = boxing(100); //타입 파라미터를 컴파일러가 추정하도록 둠`

```java
public class Util {
	//public하고 static하면서 리턴 타입이 boolean인 compare이라는 함수를 만듭니다.
	//제네릭 메소드의 매개변수로 들어오는 제네릭 타입 파라미터인 Pair<K,V> 타입을 받습니다.
	public static <K,V> boolean compare(Pair<K,V> p1, Pair<K,V> p2) {
		//p1 객체의 key와 p2 객체의 key를 equals로 비교해서 boolean으로 내놓습니다.
		boolean keyCompare = p1.getKey().equals(p2.getKey());
		boolean valueCompare = p1.getValue().equals(p2.getValue());
		// AND 연산을 통해 boolean으로 반환합니다. 
		return keyCompare && valueCompare;
	}
}
public class Pair<K, V> {
	private K key;
	private V value;
	
	//제네릭 클래스인 Pair의 생성자. key와 value를 가진다.
	//객체를 생성할 때 바로 넣어줘야한다.
	public Pair(K key, V value) {
		this.key = key;
		this.value = value;
	}
	
	public void setKey(K key) {this.key = key;}
	public void setValue(V value) {this.value = value;}
	
	public K getKey() {return key;}
	public V getValue() {return value;}
}
public class CompareMethodExample {

	public static void main(String[] args) {
		//Pair<Integer, String>이라는 제네릭 클래스이 있다. 그리고 그것의 생성자 매개변수로 1과 "사과"가 들어간다.
		//private로 선언되어 있는 인스턴스 변수에 1과 "사과"가 들어간다. 
		Pair<Integer, String> p1 = new Pair<Integer, String>(1, "사과");
		Pair<Integer, String> p2 = new Pair<Integer, String>(1, "사과");
		//자료형이 boolean인 result1 안에 제네릭 메소드인 compare 메소드의 리턴값을 넣습니다. 구체적인 타입을 명시적으로 지정해줬고
		boolean result1 = Util.<Integer, String>compare(p1, p2);
		if(result1) {
			System.out.println("논리적으로 동등한 객체입니다.");
		}else {
			System.out.println("논리적으로 동등하지 않은 객체입니다.");
		}
		
		Pair<String, String> p3 = new Pair<String, String>("user1", "hello");
		Pair<String, String> p4 = new Pair<String, String>("user2", "hello");
		//구체적인 타입을 컴파일러가 추정합니다. 
		boolean result2 = Util.compare(p3, p4);
		if(result2) {
			System.out.println("논리적으로 동등한 객체입니다.");
		}else {
			System.out.println("논리적으로 동등하지 않은 객체입니다.");
		}
	}
}
```

### 제한된 타입 파라미터

타입 파라미터에 지정되는 구체적인 타입을 제한할 필요가 종종 있습니다. 예를 들어, 숫자를 연산하는 제네릭 메소드는 매개값으로 Number 타입 또는 하위 클래스 타입(Byte, Short, Integer, Long, Double)의 인스턴스만 가져야 합니다. 이렇제 제한된 타입 파라미터를 선언하려면 타입 파라미터 뒤에 extends 키워드를 붙이고 상위 타입을 명시하면 됩니다. 상위 타입은 클래스가 아니라 인터페이스(implements를 안씀)여도 됩니다.

중괄호 {} 안에서 타입 파라미터 변수로 사용가능한 것은 상위 타입의 멤버(필드, 메소드)로 제한됩니다. 하위 타입에만 있는 필드와 메소드는 사용할 수 없습니다.

```java
public class Util
	//public <T extends 상위타입> 리턴타입 메소드(매개변수...) {
	//compare()라는 메소드는 숫자 타입만 구체적으로 갖는 제네릭 메소드 compare()입니다. 
	public static <T extends Number> int compare(T t1, T t2) {
		//Number 클래스에 정의되어 있는 doubleValue()는 숫자를 double 타입으로 변환합니다.
		double v1 = t1.doubleValue();
		double v2 = t2.doubleValue();
			 
		//Double.comapare() 메소드는 첫 번째 매개값이 작으면 -1을, 같으면 0, 크면 1로 처리를 합니다.
		return Double.compare(v1, v2);
	}
}
public class BoundTypeParameterExample {
	public static void main(String[] args) {
		//String str = Util.compare("a", "b");
		//String은 Number 타입이 아니므로 안 됩니다. 
		
		//int를 integer로 자동 박싱
		int result1 = Util.compare(10, 20);
		System.out.println(result1);

		//double을 Double 타입으로 자동 박싱
		int result2 = Util.compare(4.5, 3);
		System.out.println(result2);
	}
}
```

### 와일드카드 타입

코드에서 `?`를 일반적으로 와일드카드라고 부릅니다. 제네릭 타입을 매개값이나 리턴 타입으로 사용할 때 구체적인 타입 대신에 와일드 카드를 사용할 수 있습니다.

Person의 하위 클래스로 Worker와 Student가 있고 Student의 하위 클래스로 HighStudent가 있습니다.

Course.java입니다.

```java
//Course라는 제네릭 클래스.
public class Course<T> {
	private String name;
	//그 타입으로 배열을 만듭니다. 
	private T[] students;
	
	//제네릭 클래스의 생성자.
	public Course(String name, int capacity){
		this.name = name;
		//타입 파라미터로 배열을 생성하려면 new T[n]; 형태로 배열을 생성할 수 없고, (T[]) (new Object[n])으로 생성해야 합니다.
		students = (T[]) (new Object[capacity]);
	}

	public String getName() {
		return name;
	}
	
	public T[] getStudents() {
		return students;
	}
	
	//배열에 비어있는 부분을 찾아서 수강생을 추가하는 메소드
	public void add(T t) {
		for(int i = 0 ; i < students.length ; i++) {
			if(students[i] == null) {
				students[i] = t;
				break;
			}
		}
	}
}
```

WildCardExample.java입니다.

```java
import java.util.Arrays;

public class WildCardExample {

	//static 메소드면서 매개변수로 오는 게 모든 타입(상위 클래스, 하위 클래스 모두)이 될 수 있습니다.
	public static void registerCourse(Course<?> course) {
		//name과 student의 배열을 출력합니다. 
		System.out.println(course.getName() + "수강생 : " +
				Arrays.toString(course.getStudents()));
	}
	
	//static 메소드면서 수강생이 Student와 HighStudent만 됩니다. Student와 Student의 하위 클래스들.
	public static void registerCourseStudent(Course<? extends Student> course) {
		System.out.println(course.getName() + "수강생 : " +
				Arrays.toString(course.getStudents()));
	}
	//static 메소드면서 수강생이 Worker와 Person만 됩니다. Worker와 Worker의 상위 클래스들.
	public static void registerCourseWorker(Course<? super Worker> course) {
		System.out.println(course.getName() + "수강생 : " +
				Arrays.toString(course.getStudents()));
	}
		
	public static void main(String[] args) {
		//Course라는 제네릭 클래스가 있다. 그리고 얘는 매개변수가 2개인 생성자를 가지고 있다. 타입을 Person 클래스로 주고 있다. 
		Course<Person> personCourse = new Course<Person>("일반인과정", 5);
			//배열에 추가하는 과정. Person t = new Person("일반인");이 됩니다. 배열에 객체를 넣습니다.
			//여기 '신용권님의 이것이 자바다'책에서는 나머지 클래스들이 나와있지 않았습니다. 아마 Person과 각각 클래스들에 매개변수가 하나인 생성자가 있을 거라 생각합니다. 
			personCourse.add(new Person("일반인"));
			personCourse.add(new Worker("직장인"));
			personCourse.add(new Student("학생"));
			personCourse.add(new HighStudent("고등학생"));
		
		 Course<Worker> workerCourse = new Course<Worker>("직장인 과정", 5);
		 	workerCourse.add(new Worker("직장인"));
		 Course<Student> studentCourse = new Course<Student>("학생 과정", 5);
		 	studentCourse.add(new Student("학생"));
		 	studentCourse.add(new HighStudent("고등학생"));
		 Course<HighStudent> highStudentCourse = new Course<HighStudent>("고등학생 과정", 5);
		 	highStudentCourse.add(new HighStudent("고등학생"));
			
		 
		 //출력하는 문장. 와일드카드가 그냥 ?니까 모두 올 수 있습니다.
	 	registerCourse(personCourse);
	 	registerCourse(workerCourse);
	 	registerCourse(studentCourse);
	 	registerCourse(highStudentCourse);
		System.out.println();
		
		//위에서 말한대로 하위 클래스들만 옵니다. 
		//registerCourseStudent(personCourse);
		//registerCourseStudent(workerCourse);
		registerCourseStudent(studentCourse);
		registerCourseStudent(highStudentCourse);
		System.out.println();
		
		registerCourseWorker(personCourse);
		registerCourseWorker(workerCourse);
//		registerCourseWorker(studentCourse);
//		registerCourseWorker(highStudentCourse);	
	}
}
```

### 제네릭 타입의 상속과 구현

제네릭 타입도 다른 타입과 마찬가지로 부모 클래스가 될 수 있습니다. 자식 제네릭 타입은 추가적으로 타입 파라미터를 가질 수 있습니다.

Product.java입니다.

```java
//부모 제네릭 클래스
public class Product<T, M> {
	private T kind;
	private M model;

	public T getKind() { return this.kind; }
	public M getModel() {return this.model; }
	
	public void setKind(T kind) { this.kind = kind;}
	public void setModel(M model) { this.model = model;}
}
//Main 클래스에서 쓰일 것.
class Tv{}
```

ChildProduct.java 입니다.

```java
//부모 제네릭 클래스인 Product<T, M>을 상속한다. T와 M을 상속했기 때문에 C만 써주면 된다. 
public class ChildProduct<T, M, C> extends Product<T, M> {
	//company라는 인스턴스 변수를 get, set으로 만든다.
	private C company;
	
	public C getCompany() {
		return this.company;
	}
	
	public void setCompany(C company) {
		this.company = company;
	}
}
```

Storage.java 입니다.

```java
//Storage라는 인터페이스. add와 get이라는 메소드를 만들어줘야 한다.
public interface Storage<T> {
	public void add(T item, int index);
	public T get(int index);
}
```

StorageImpl.java 입니다.

```java
//Storage 인터페이스를 구현한 StorageImpl 클래스. get과 add 메소드를 구현해야 한다.
public class StorageImpl<T> implements Storage<T> {
	
	//인스턴스 변수인데 타입 파라미터 배열이다. 
	private T[] array;
	
	//배열의 길이만큼 넣어주기 위해서. 생성
	public StorageImpl(int capacity) {
		this.array = (T[]) (new Object[capacity]);
	}
	
	@Override
	public void add(T item, int index) {
		//index에 넣는다.
		array[index] = item;
	}


	@Override
	public T get(int index) {
		return array[index];
	}
	
}
```

ChildProductAndStorageExample.java입니다.

```java
public class ChildProductAndStorageExample {
	
	public static void main(String[] args) {
	
		//자식 제네릭 클래스를 인스턴스화
		ChildProduct<Tv, String, String> product = new ChildProduct<>();
		product.setKind(new Tv());
		product.setModel("SmartTV");
		product.setCompany("Samsung");
		
		//제네릭 인터페이스로 타입을 만들고 StorageImpl 클래스로 100개를 준다. 
		Storage<Tv> storage = new StorageImpl<Tv>(100);
		//0에 객체를 추가.
		storage.add(new Tv(), 0);
		//0에 있는 걸 가져옴.
		Tv tv = storage.get(0);
	}
}
```

#### reference

- <https://opentutorials.org/course/1>
- 객체중심 java_강요천 지음
- 이것이 자바다_신용권 지음
