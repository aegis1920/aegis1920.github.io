---
layout  : wiki
title   :  java.lang과 java.util 관련 클래스들
summary : 
date    : 2019-06-20 14:55:45 +0900
updated : 2019-06-21 13:39:54 +0900
tags    : 
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# java.lang과 java.util 관련 클래스들

## Java API Document

### API

- 남들이 개발한 소스의 기능들. 개발에 자주 사용되는 클래스 및 인터페이스의 모음.

## java.lang 패키지에 들어있는 클래스들

java.lang 패키지는 자동으로 import되어있어서 바로 쓸 수 있다. 

### Object 클래스

모든 클래스는 `java.lang.Object` 클래스의 메소드를 상속받는다. 그렇기 때문에 Object 클래스 안에 있는 별도의 메소드들을 오버라이드하지 않으면 Object 클래스에 있는 메소드들을 그대로 사용하게 된다. 이러한 이유로 Object 클래스 안에 있는 메소드들을 오버라이드해야하는지 잘 살펴봐야 한다.

Object 클래스 중가장 빈번하게 오버라이드하는 메소드는 **toString(), equals(), hashCode()**메소드다.

#### toString()

- **Java.lang.Object의 toString()의 규칙**
  - 가장 흔하게 볼 수 있는 건 `System.out.println()`이다. `println()`의 매개변수에 인스턴스의 이름을 치면 기본적으로 **[클래스이름+’@’+16진수]로 구성된 HashCode값을 반환한다.**
  - 인스턴스가 null일 때는 null을 반환한다.
- **toString()을 왜 오버라이딩 해야할까?**
  - 이유를 알려면 우리가 콘솔 상에 뜨게하는 `System.out.println()`이 어떻게 작동하는지 알아야 한다. `println()`안에서 복잡한 과정을 거쳐서 Object 클래스의 `toString()`으로 받게 된다. `println()`으로 쳤어도 결국 출력하게 되는 건 `toString()`이라는 뜻이다. 그래서 `System.out.println()`에 쳐도 그 인스턴스의 참조값이 반환된다. 이 인스턴스의 참조값을 반환한다면 사람이 인식하기에는 쉽지 않다. 이런 이유로 참조값이 아닌 인스턴스 이름을 나오게 하기 위해 toString()을 오버라이딩한다. 

#### equals()

- `equals()`으로 비교하는 것과 `==`으로 비교하는 것은 다르다.
- `equals()`는 인스턴스의 내용을 비교하는 메소드이고 `==`는 인스턴스끼리의 주소값(reference)을 비교하는 연산자다.
- **왜 equals()를 오버라이딩 해야 할까?**
  - 비교하려는 내용의 자료형이 단순히 `String`으로만 이루어져 있으면 실제 객체 주소값, 진짜 hashCode가 달라도 내용을 보고 같으면 같다고 할 수 있도록 `hashCode()` 자체가 오버라이딩이 되어있다. 그래서 단순히 비교하려는 변수의 자료형이 `String` 하나뿐이라면 `eqauls()`를 오버라이딩 하지 않아도 된다.
  - 그러나 내가 만든 객체, `Person`이라는 클래스에 `int id, String name`라는 멤버 변수가 있다면 이 내용을 비교할 수 있을까? 비교할 수 없다. 내가 만든 객체는 자동으로 오버라이딩 되어있지 않기 때문에. 같은 id, name이 있다면 같다고 말할 수 있도록 오버라이딩을 해줘야 한다.
  - 여기서 말하는 진짜 hashCode는 `hashCode()`가 아닌 `System.identityHashCode()`다
- **equals()를 오버라이딩 하면 hashCode()는 왜 오버라이딩할까?**
  - 객체의 내용 자체를 비교하기 위해서는 자기 자신이 오버라이딩한 `equals()`만 써도 상관 없지만 `HashSet이나 HashMap, Hashtable` 같은 경우, `hashCode()`로 값을 구별한 뒤, `hashCode()`값이 같으면 `eqauls()`로 다시 비교하도록 설계되어있다. 즉, `eqauls()`만 오버라이드 할 경우, `equals()`에서는 동등하다고 나오지만 `HashMap`에는 같은 버킷에 들어가지 않는다. **`hashcode()`가 다르니까.** `hashcode()`만 오버라이드 할 경우에도 `equals()`로 다시 비교하기때문에 동등하지 않다고 나온다. 결국 더 좋고 확실한 코드를 위해선 모두 오버라이딩을 해줘야 한다.

#### 그 외

- getClass()
  - 어떤 인스턴스가 있을 때 그 인스턴스가 어떤 클래스에서 나왔는지를 정확하게 알려준다.(`instanceof`보다 낫다.)
- finalize()
  - GC는 객체를 소멸하기 직전에 소멸자인 `finalize()`를 실행시킨다.
  - 기본적으로 실행 내용이 없다.
  - 소멸 시점이 명확하지 않다.
  - 절대 마음대로 오버라이드하면 안된다.
- clone()
  - 객체를 복제하는 이유는 원본 객체를 안전하게 보호하기 위해서이다. 객체를 복제하는 방법에는 얕은 복제와 깊은 복제가 있다.
    - thin clone
      - 단순히 필드 값만 복사해서 객체를 복제하는 것을 말한다. 기본 타입일 경우, 값 복사가 일어나고 참조 타입일 경우 객체의 주소 값이 복사된다.
      - 이 메소드로 복제하려면 원본 객체는 `java.lang.Cloneable` 인터페이스를 구현(implements)하고 있어야 한다. (복제를 허용하겠습니다라고 말하는 것)
      - clone()은 try-catch 구문이 필요하다.
    - deep clone
      - thin clone은 같은 원본 객체를 참조하지만 deep clone은 원본 객체도 아예 복제된다.
      - `clone()` 메소드를 재정의해서 참조 객체를 복제하는 코드를 직접 작성해야 한다.

### String 클래스

- String 생성자
  - 어떤 생성자를 이용해서 String 객체를 생성할지는 제공되는 매개 값의 타입에 달려있다.
  - `String str = new String(byte[] bytes)`도 배열 전체를 String 객체로 만든다는 뜻
  - `String str = new String(byte[] bytes, int offset, int length)`는 배열의 offset 인덱스 위치부터 length만큼 String 객체로 생성
- String 클래스의 메소드
  - `charAt()` -> 인자 값으로 주어진 인덱스의 문자를 리턴한다. `String`으로 받아서 `charAt(0)`으로 첫 문자를 끊을 때 쓰기도 한다.
  - `equals()` -> Object의 메소드이지만 String 클래스가 오버라이딩한다. 내용이 같으면 같도록.
  - `hashCode()` -> Object의 `hashCode()`를 오버라이딩
  - `getBytes()` -> `"문자열".getBytes();`를 하면 바이트 배열로 변환
  - `indexOf()` -> 문자열이 시작되는 인덱스를 리턴
  - `length()` -> 문자열의 길이를 리턴
  - `replace()` -> 첫 번째 인자 값인 문자열을 찾아 두 번째 매개값인 문자열로 바꾼다. 새로운 문자열을 생성하고 리턴
  - `substring()` -> 주어진 시작 매개값과 끝 매개값의 사이를 문자열로 추출
  - `toLowerCase(), toUpperCase()` -> 소문자, 대문자로 바꾸기.
  - `trim()` -> 문자열의 앞 뒤 공백을 제거한다.
  - `valueOf()` -> 기본 타입의 값을 문자열로 변환하는 기능. String 클래스에 매개 변수의 타입별로 `valueOf()` 메소드가 오버로딩되어있다.

#### String 클래스와 같이 알아야 할 다른 클래스

- StringTokenizer 클래스
  - split() -> 정규표현식을 구분자로 해서 문자열을 분리하고 저장한다. ->`String[] result = "문자열".split("정규표현식")`
  - StringTokenizer 클래스의 생성자 -> 한 종류의 구분자로 연결되어 있을 경우 문자열을 분리할 수 있다. -> `StringTokenizer st = new StringTokenizer("문자열","구분자");`
- StringBuffer, StringBuilder 클래스
  - String은 문자열을 저장할 수 없어서 원본 객체를 대체할 수 없다. 그리고 immutable하다. 그래서 **String 객체를 + 연산하거나 대체할 때 항상 새로운 String 객체를 생성해서 복사하고 연산하게 된다. 이러한 이유로 +연산을 하게되면 속도가 느려진다. 이걸 개선해서 나온 것이 StringBuffer와 StringBuilder다.** 문자열을 변경하는 작업이 많을 때는 StringBuffer, StringBuilder 클래스를 쓰는 것이 좋다. 이 둘은 내부 버퍼에 문자열을 저장해두고, 그 안에서 추가, 수정, 삭제한다. 즉 새로운 String 객체를 생성하는 게 아니라 원본 객체를 쓴다.
    - 그래서 String의 덧셈을 For문 안에 넣으면 좋지 않다. 
  - StringBuffer는 멀티 스레드 환경에서 사용할 수 있도록 동기화가 되어있고 StringBuilder는 단일 스레드 환경에서만 사용하도록 설계되어 있다.
  - StringBuilder는 자동으로 버퍼 크기를 늘릴 수 있다.
  - append(), insert(), delete, setCharAt()… 으로 추가와 수정, 삭제가 가능하다.
  - toString()을 오버라이드할 때 StringBuilder를 쓰는 게 좋다.

```java
StringBuilder sb = new StringBuilder("Hello");
    sb.append("!!!!");
    sb.delete(4, 6);
```

### Arrays 클래스

Arrays 클래스는 배열 조작 기능을 가지고 있다. 배열을 복사한다든지, 항목을 정렬한다든지, 항목을 검색한다는지의 기능을 말한다. 모든 메소드는 static이므로 Array 클래스로 바로 사용이 가능하다.

- 배열 복사

  - copyOf(원본 배열, 복사할 길이) -> `char[] arr2 = Arrays.copyOf(arr1, arr1.length);`
  - copyOfRange(원본 배열, 시작 인덱스, 끝 인덱스) -> `char[] arr2 = Arrays.copyOfRange(arr1, 1, 3)`
  - 시작 인덱스는 포함되지만 끝 인덱스는 포함되지 않는다.
  - 단순히 배열을 복사한다면 `System.arraycopy()`를 이용할 수 있다.

  - 배열 항목 비교
    - `Arrays.equals(original, cloned1));` -> 같은 객체
    - `Arrays.deepEquals(original, cloned1));` -> 아예 객체를 복사
  - 배열 항목 정렬
    - `Arrays.sort(scores);`
  - 배열 항목 검색
    - `Arrays.binarySearch(scores,99);`

### Wrapper 클래스

자바는 기본 타입(byte, char, short, int, long, float, double, boolean)의 값을 갖는 객체를 생성할 수 있다. 이 객체를 생성한 기본 타입 값은 외부에서 변경할 수 없다. 즉, immutable하다.

기본 타입에 대응되는 클래스들이 있다. char는 Character이고 int는 Integer로 이다. 그리고 나머지는 각자의 기본타입에 첫 문자를 대문자로 바꾸면 된다.

다른 객체들은 덧셈이 되지 않지만 String 클래스는 문자열 간의 덧셈이 된다. 다른 객체들 중에서 Wrapper 클래스에 해당하는 객체들도 덧셈이 되는데 그 이유는 버전이 높아지면서 auto Boxing, auto Unboxing이 가능해졌기 때문이다.

- 박싱(Boxing)
  - 기본 타입의 값을 Wrapper 객체로 만드는 과정
  - 그냥 Wrapper 클래스의 생성자 매개값으로 주거나 valueOf()를 주면 된다
  - `Float obj = new Float(2.5F);`
  - `Float obj = Integer.valueOf(1000);`
- 언박싱(Unboxing)
  - Wrapper 객체에서 기본 타입의 값을 얻어내는 과정
  - `기본타입명+Value()`를 호출하면 된다
  - `boolean bool = obj.booleanValue();`
- 자동 박싱과 자동 언박싱(AutoBoxing)
  - 자동적으로 박싱과 언박싱이 일어나는 경우가 있다. Wrapper클래스에 기본 값이 대입될 경우 발생한다.
  - `Integer obj = 100;` -> 자동 박싱
  - `int value = obj;` -> 자동 언박싱
- 문자열을 숫자로 변환
  - `int value = Integer.parseInt("10");`
  - `int value = '8'-'0'`
    - 한 자리 숫자일 경우, 숫자 또한 문자로 아스키코드 값으로 변경해서 판단하기 때문에 '8'은 56, '0'은 48로 변환되어 계산돼서 그대로 8이 나오게 된다.
- 숫자를 문자로 변환
  - `String s = Integer.toString(999);`
  - `String s = 3456 + "";`
    - 빈 문자열을 더해주면 형변환으로 문자열이 된다.
- Wrapper 객체의 값 비교
  - == 연산자는 참조값만 비교하기 때문에 언박싱(`obj1.intValue() == obj2.intValue()`)을 하거나 `obj3.equals(obj4)`처럼 Wrapper 클래스의 equals를 써야합니다.
- Integer 클래스의 진수 변환법

```Java
.toBinaryString(30); //2진수
.toOctalString(30); //8진수
.toHexString(30); //16진수
```

### Math 클래스

Math클래스에 있는 메소드는 static 메소드이므로 바로 사용이 가능하다. 절댓값, 올림값, 최댓값, 최솟값, 랜덤값 등등을 구할 수 있다.

- Math.random() 메소드는 0.0과 1.0 사이의 범위에 속하는 하나의 double 타입의 값을 리턴한다.

```java
int num = (int) (Math.random() * 10); // 이렇게 한 번에 자주 쓴다
double d = 485.54554;
System.out.println(Math.max(d, 500));
System.out.println(Math.round(d)); //반올림
System.out.println(Math.ceil(d)); //올림
System.out.println(Math.floor(d)); //버림
System.out.println(Math.random()); // 0~1, 1을 포함하지 않음
System.out.println(Math.pow(2,4)); //승
System.out.println(Math.sqrt(4)); //제곱근
```



### System 클래스

- 운영체제의 일부 기능을 이용할 수 있다.
- 모든 필드와 메소드가 static
- 표준입출력(in, out, err)이나 종료(`System.exit()`), GC(`System.gc()`)를 실행시킬 수 있다.

### Class 클래스

- 자바의 클래스와 인터페이스의 메타 데이터를 관리한다.
- Class 객체 얻기
  - getClass()(`java.lang.Object`) - 해당 클래스로 객체를 생성했을 때만 사용할 수 있다.
    - `Car car = new Car(); `
    - `Class clazz = car.getClass();`
  - forName()(`java.lang.Class`) - new를 통해서 객체를 얻을 수 없으며 forName()의 인자에 패키지가 포함된 클래스 이름을 넣어 이용해야 하고 예외처리도 해줘야 한다.
    - `Class clazz2 = Class.forName("sec6.exam01_class.Car");`
- Reflection
  - getDeclaredContstructor(), getDeclaredFields(), getDeclaredMethods()
  - 각각 Constructor 배열, Field 배열, Method 배열들을 리턴합니다.
  - 후에 다시 다뤄야겠다.
- 동적 객체 생성(newInstance())
  - Class 객체를 이용하면 new 연산자를 사용하지 않아도 동적으로 객체를 생성할 수 있다.
  - `Class clazz = Class.forName("클래스이름");`으로 얻은 후에 `Object obj = clazz.newInstance();`를 호출하면 Object 타입의 객체를 얻을 수 있다.

## java.util 패키지에 들어있는 클래스들

### Objects 클래스

- `java.lang.Object`와는 다른 것이다. 유용한 것들로 구성되어 있다.
- final로 정의되어 있고 모두 static 메소드로 되어있어 초기화할 수 없다.
- `Objects.equals(Object a, Object b)`
  - a와 b가 같은지 아닌지를 판단한다.
  - a와 b가 null이면 true를 리턴한다.(`Object.equals()`와 다른 점.)
- `Objects.hash(Object values…), Objects.hashCode(Object o), Objects.isNull(), Objects.toString()` 등등…

### Date, Calendar 클래스

Date 클래스는 날짜를 표현하고 객체간에 날짜 정보를 주고 받을 때 사용된다. toString()을 통해 문자열로 얻을 수 있다.

- `Date now = new Date();`
- `String str = now.toString();`

Calendar 클래스는 달력을 표현한 클래스다. 추상 클래스이므로 new 연산자를 사용해서 인스턴스를 생성할 수 없다.

- `Calendar now = Calendar.getInstance();`
- `int month = now.get(Calendar.MONTH) + 1;`

### Random 클래스

java.util.Random 클래스는 다양한 메소드를 제공한다. Math.random() 메소드는 0.0과 1 사이의 double 난수를 얻지만 Random 클래스는 boolean, int, long, float, double 난수를 얻을 수 있다. 그리고 범위를 지정하는 seed도 설정할 수 있다.

- `Random random = new Random(3);`
- `int num = random.nextInt(45)+1;`

### Format 클래스

정수 세 자리마다 ,를 넣고 싶다면 정수를 문자열로 변환한 다음, 세 자리씩 끊어서 쉼표를 넣어야 할 때 이것들이나 소수점이나 날짜 등등 데이터 형식을 바꿔야 해주는 경우가 있는데 이런 문제들을 쉽게 해결할 수 있는 경우가 Format 클래스를 쓰면 된다.

- DecimalFormat(숫자 형식 클래스)
- SimpleDateFormat(날짜 형식 클래스)
- Message Format(문자열 형식 클래스)

# String str =" "과 String str = new String(" ")의 차이?

잘 쓰다가 뭐가 다르다는 건지 궁금해서 찾아보기로 했다. 증명하기 위해서 계속 찾아보니 답이 나왔다.

## String

- String을 이용하는 방법에는 두 가지 방식이 있다.
  - **New 연산자를 이용한 방식( String str = new String("hello"); )**
    - new를 쓰면 **Heap 영역**에 할당된다. 그래서 같은 문자열이더라도 다른 객체라서 선언한 만큼의 새로운 객체가 메모리에 올라간다.
  - **리터럴을 이용한 방식( String str = "hello"); )**
    - new를 쓰지 않고 인스턴스를 생성하는 방식.
    - **String constant pool(상수 영역)**이라는 영역에 할당된다.
      - String을 리터럴로 선언하면 내부적으로 String의 intern() 메소드가 호출된다. Intern() 메소드는 주어진 문자열이 string constant pool에 존재하는지 검색한다. 있다면 그 주소값을 반환하고 없다면 string constant pool에 넣고 새로운 주소값을 반환한다. 그래서 메모리에는 하나만 올라가게 된다.(인스턴스가 생성된다)

> Java6까지 string constant pool의 위치가 Perm이었지만 java7이후 **Heap으로 변경됐다.** Perm은 고정된 사이즈고 Runtime에 사이즈가 확장되지 않아서 변경됐다고 한다.

- **리터럴(literal)**
  - 변수 및 상수에 저장되는 값 자체. 즉, 공간이 아니라 그 값. 정수 리터럴, 문자열 리터럴, 배열 리터럴 등등이 있다.

### 궁금증

나는 인스턴스가 생성될 때 hashcode가 생성되니 hashcode로 비교한다고 생각해서 비교를 해봤다.

```java
package hello_ex1;

public class St_ex1 {

	public static void main(String[] args)  {

		String str1 = "hello";
		String str2 = "hello";

		String str3 = new String("hello");
		String str4 = new String("hello");

		System.out.println(str1.hashCode());	
		System.out.println(str2.hashCode());	
		System.out.println(str3.hashCode());	
		System.out.println(str4.hashCode());	
	}
}
```

내가 생각했던 결과는 리터럴로 만들어진 `str1.hashCode()`와 `str2.hashCode()`가 같고 new로 만들어진 `str3.hashCode()`와 `str4.hashCode()`는 둘 다 다를 거라고 생각했다.
그러나 결과는 Run해보니 hashcode 값이 모두 같았다.
hashCode가 객체의 고유한 해쉬값을 갖고오는 거 아니었나? 다시 찾아봤다.

## hashCode() in java

- hashCode()는 Object 클래스에 있어서 모든 클래스는 hashCode 메소드를 제공할 수 있다.
- 이 메소드는 Heap에 있는 클래스 인스턴스(즉, 인스턴스)에 저장된 데이터를 단일 해시값(32비트)으로 만든다.
- 기술적으로 Java에서 hashCode()는 기본적으로 JVM에 Native Code로 구현되어 있다.
- **Integer 클래스나 String 클래스 같은 경우, 같은 멤버 값에 대해서 같은 hashcode가 나올 수 있도록 오버라이딩 되어있다. (그래서 String str1 = new String("hello")의 hashCode() 값이나 String str1 = new String("hello")의 hashCode() 값이나 같다.)**

찾아보니 오버라이딩하지 않는 hashcode를 찾아주는 메소드가 따로 있었다. identityHashCode()라는 메소드를 사용해보자.

```java
package hello_ex1;

public class St_ex1 {

	public static void main(String[] args)  {

		String str1 = "hello";
		String str2 = "hello";

		String str3 = new String("hello");
		String str4 = new String("hello");
		
		System.out.println(System.identityHashCode(str1));
		System.out.println(System.identityHashCode(str2));
		System.out.println(System.identityHashCode(str3));
		System.out.println(System.identityHashCode(str4));
```

위 코드를 실행해보니 str1과 str2의 hashcode값은 똑같이 나오고 str3와 str4의 hashcode값은 다르게 나온다. 드디어 원하는 값이 나왔다.

> 그러나 String.hashCode()에서 String이 다르다고 hashCode()가 항상 유일한 값을 반환하지는 않는다. ASCII code 값을 이용해 비트 연산의 합으로 hash를 만드니 길이가 길다고 해서 달라지는 게 아니다. 예를 들어, Z@S.ME와 Z@RN.E는 같은 hashCode 값을 반환한다.

출처

- <http://sunphiz.me/wp/archives/tag/keystore>
- <https://stackoverflow.com/questions/44178138/what-is-the-difference-between-heap-memory-and-string-constant-pool-in-java>
- <https://docs.oracle.com/javase/7/docs/api/overview-summary.html>




# String str =" "과 String str = new String(" ")의 차이?

잘 쓰다가 뭐가 다르다는 건지 궁금해서 찾아보기로 했다. 증명하기 위해서 계속 찾아보니 답이 나왔다.

## String

-   String을 이용하는 방법에는 두 가지 방식이 있다.
    
    -   **New 연산자를 이용한 방식( String str = new String("hello"); )**
        
        -   new를 쓰면  **Heap 영역**에 할당된다. 그래서 같은 문자열이더라도 다른 객체라서 선언한 만큼의 새로운 객체가 메모리에 올라간다.
    -   **리터럴을 이용한 방식( String str = "hello"); )**
        
        -   **String constant pool(상수 영역)**이라는 영역에 할당된다.
            
            -   String을 리터럴로 선언하면 내부적으로 String의 intern() 메소드가 호출된다. Intern() 메소드는 주어진 문자열이 string constant pool에 존재하는지 검색한다. 있다면 그 주소값을 반환하고 없다면 string constant pool에 넣고 새로운 주소값을 반환한다. 그래서 메모리에는 하나만 올라가게 된다.

> Java6까지 string constant pool의 위치가 Perm이었지만 java7이후  **Heap으로 변경됐다.**  Perm은 고정된 사이즈고 Runtime에 사이즈가 확장되지 않아서 변경됐다고 한다.

-   **리터럴(literal)**
    
    -   변수 및 상수에 저장되는 값 자체. 즉, 공간이 아니라 그 값. 정수 리터럴, 문자열 리터럴, 배열 리터럴 등등이 있다.

### 궁금증

나는 인스턴스가 생성될 때 hashcode가 생성되니 hashcode로 비교한다고 생각해서 비교를 해봤다.

```java
package hello_ex1;

public class St_ex1 {

	public static void main(String[] args)  {

		String str1 = "hello";
		String str2 = "hello";

		String str3 = new String("hello");
		String str4 = new String("hello");

		System.out.println(str1.hashCode());	
		System.out.println(str2.hashCode());	
		System.out.println(str3.hashCode());	
		System.out.println(str4.hashCode());	
	}
}

```

내가 생각했던 결과는 리터럴로 만들어진  `str1.hashCode()`와  `str2.hashCode()`가 같고 new로 만들어진  `str3.hashCode()`와  `str4.hashCode()`는 둘 다 다를 거라고 생각했다. 그러나 결과는 Run해보니 hashcode 값이 모두 같았다. hashCode가 객체의 고유한 해쉬값을 갖고오는 거 아니었나? 다시 찾아봤다.

## hashCode() in java

-   hashCode()는 Object 클래스에 있어서 모든 클래스는 hashCode 메소드를 제공할 수 있다.
-   이 메소드는 Heap에 있는 클래스 인스턴스(즉, 인스턴스)에 저장된 데이터를 단일 해시값(32비트)으로 만든다.
-   기술적으로 Java에서 hashCode()는 기본적으로 JVM에 Native Code로 구현되어 있다.
-   **Integer 클래스나 String 클래스 같은 경우, 같은 멤버 값에 대해서 같은 hashcode가 나올 수 있도록 오버라이딩 되어있다. (그래서 String str1 = new String("hello")의 hashCode() 값이나 String str1 = new String("hello")의 hashCode() 값이나 같다.)**

찾아보니 오버라이딩하지 않는 hashcode를 찾아주는 메소드가 따로 있었다. identityHashCode()라는 메소드를 사용해보자.

```java
package hello_ex1;

public class St_ex1 {

	public static void main(String[] args)  {

		String str1 = "hello";
		String str2 = "hello";

		String str3 = new String("hello");
		String str4 = new String("hello");
		
		System.out.println(System.identityHashCode(str1));
		System.out.println(System.identityHashCode(str2));
		System.out.println(System.identityHashCode(str3));
		System.out.println(System.identityHashCode(str4));

```

위 코드를 실행해보니 str1과 str2의 hashcode값은 똑같이 나오고 str3와 str4의 hashcode값은 다르게 나온다. 드디어 원하는 값이 나왔다.

> 그러나 String.hashCode()에서 String이 다르다고 hashCode()가 항상 유일한 값을 반환하지는 않는다. ASCII code 값을 이용해 비트 연산의 합으로 hash를 만드니 길이가 길다고 해서 달라지는 게 아니다. 예를 들어,  [Z@S.ME](mailto:Z@S.ME)와 Z@RN.E는 같은 hashCode 값을 반환한다.

출처

-   [http://sunphiz.me/wp/archives/tag/keystore](http://sunphiz.me/wp/archives/tag/keystore)
-   [https://stackoverflow.com/questions/44178138/what-is-the-difference-between-heap-memory-and-string-constant-pool-in-java](https://stackoverflow.com/questions/44178138/what-is-the-difference-between-heap-memory-and-string-constant-pool-in-java)
-   [https://docs.oracle.com/javase/7/docs/api/overview-summary.html](https://docs.oracle.com/javase/7/docs/api/overview-summary.html)




