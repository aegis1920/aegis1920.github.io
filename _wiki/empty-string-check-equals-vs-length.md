---
layout  : wiki
title   : 빈 문자열 체크 시 "".equals(input) vs input.length == 0 
summary : 
date    : 2021-01-10 00:01:11 +0900
updated : 2021-01-10 00:15:43 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

String 클래스의 `equals()` 메서드를 보면 아래와 같은 로직이 있습니다.

인자로 `Object` 를 받기 때문에 로직을 보시면 참조값을 확인하는 조건문, String 인스턴스인지 확인하는 조건문, 서로의 길이가 같은지 체크하는 조건문 등 여러 조건문으로 체크합니다.

```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

String 클래스의 `length()` 메서드를 보면 정말 단순하게 현재 캐릭터 배열의 길이를 가져옵니다.

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];

		...
		
	public int length() {
	    return value.length;
	}
}
```

**조건문의 개수만 보더라도 `"".equals(input)` 방식보다 `input.length == 0` 방식이 효율적인 것을 알 수 있습니다.**

자바 6 버전 이후부터는 아래와 같은 `isEmtpy()` 메서드가 추가됐으니 String이 빈 문자열인지 확인할 때는 `isEmpty()` 를 사용하시면 될 것 같습니다.

```java
public boolean isEmpty() {
    return value.length == 0;
}
```

### 요약

> String이 빈 문자열인지 확인할 때는 String 클래스의 `isEmpty()` 메서드를 사용하자

