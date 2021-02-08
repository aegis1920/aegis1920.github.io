---
layout  : wiki
title   : 아이템 28 배열보다는 리스트를 사용하라
summary : 
date    : 2021-02-08 17:25:16 +0900
updated : 2021-02-08 17:26:03 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 배열과 리스트의 차이

### 공변과 불공변

공변이라는 단어부터 쉽지 않은데요. 함께 변한다는 뜻입니다. 사실, 저는 '함께 변한다'는 뜻도 이해가 잘 가지 않더라구요. 그래서 [글](https://www.tutorialspoint.com/Covariant-return-types-in-Java)을 더 찾아봤습니다. 쉽게 말해서 상속과 같은 관계가 있다면 그 관계가 유지된 채로 함께 변한다고 보면 될 것 같아요.

예를 들어, 상위 클래스(Super)가 있고 이를 상속하는 하위 클래스(Sub)가 있습니다.

```java
Super sub = new Sub();
```

배열에서의 공변은 아래처럼 배열에서도 함께 변해서 적용된다는 뜻입니다.

```java
Super[] sub = new Sub[]{};
```

Ex)

```java
Object[] objects = new Long[1];
objects[0] = "나는 String이라서 들어가면 안돼요";
```

Long은 Object를 상속하고 있습니다. 배열로 사용되고 있어서 런타임에는 실패하지만 컴파일 에러는 뜨지 않는 위와 같은 코딩이 가능합니다. 실제로 실행시키면 String 타입을 Long 타입에 넣으려해서 ArrayStoreException이 나오게 됩니다.

불공변은 반대로 같이 변하지 않는 것입니다. 즉, 관계가 유지되지 않습니다. 바로 제네릭이 불공변의 특성을 가지고 있습니다.

```java
List<Super> subs = new ArrayList<Sub>(); // 같은 타입이 아니므로 컴파일 에러!
```

위 코드처럼 Sub가 Super를 상속하더라도 같은 타입이 아니면 컴파일 에러가 뜹니다.

Ex)

```java
List<Object> objects = new ArrayList<Long>(); // 컴파일 에러!
objects.add("나는 String이라서 들어가면 안돼요");
```

위에 말한 것처럼 Long이 Object를 상속하더라도 같은 타입이 아니기때문에 컴파일 에러가 뜨게 됩니다.

### 실체화와 소거

실체화, 소거 이런 단어를 들으니 감이 잡히지 않습니다. 간단하게 `javac` 로 컴파일했을 때 .class파일을 볼게요

배열의 경우, 아래와 같습니다.

```java
// .java
public static void main(String[] args) {
	  String[] strings = new String[3];
    strings[0] = "1";
    strings[1] = "2";
    strings[2] = "3";
}

// .class
public static void main(String[] var0) {
    String[] var1 = new String[]{"1", "2", "3"};
}
```

제네릭을 사용한 리스트의 경우, 아래와 같습니다.

```java
// .java
public static void main(String[] args) {
    List<String> strings = new ArrayList<>();
    strings.add("1");
    strings.add("2");
    strings.add("3");

    System.out.println("hello = " + strings);
}

// .class
public static void main(String[] var0) {
    ArrayList var1 = new ArrayList(); // 타입정보가 사라졌다?
    var1.add("1");
    var1.add("2");
    var1.add("3");
    System.out.println("hello = " + var1);
}
```

배열과 제네릭에서 차이점을 느끼셨나요?

배열은 런타임 시점에 타입을 인지하고 실행하는데(실체화) 반해 제네릭은 런타임 시점에 타입 정보를 소거(erasure)합니다.

제네릭의 타입 시스템 자체가 컴파일 시점에 에러를 잡고 런타임에 ClassCastException이 발생하는 일을 막아주겠다는 거니까요.

이처럼 배열과 제네릭은 그 자체로 잘 어우러지지 못합니다.

예를 들어, `new List<E>[], new List<String>[], new E[]` 이런 식으로 작성할 수 없습니다. 바로 컴파일 에러가 나옵니다.

실체화될 수 있는 타입인 비한정적 와일드 카드(`?`)를 사용해서 작성할 수는 있지만 유용하게 쓰일 일은 거의 없다고 합니다.

```java
List<?>[] lists = new List<?>[1];
```

실제로 컴파일 해보면 아래 코드로 나오네요!

```java
List[] var2 = new List[1];
```

## 왜 배열보다 리스트를 써야할까?

위와 같은 이유로 배열과 제네릭은 함께 쓰이기 어렵습니다. 그러면 둘 중 하나를 써야하는데 리스트를 써야 하는 이유는 **타입에 더 안전하며 런타임이 아닌 컴파일 시점에 에러를 잡아주기 때문**입니다. 여기에 Collection API를 쉽게 사용할 수 있는 것도 장점이 되겠네요 :)

## 요약

> 타입에 안전하고 컴파일 시점에 에러를 잡을 수 있는 리스트를 사용하자

## 출처

- 이펙티브 자바 3판
- [https://www.tutorialspoint.com/Covariant-return-types-in-Java](https://www.tutorialspoint.com/Covariant-return-types-in-Java)

