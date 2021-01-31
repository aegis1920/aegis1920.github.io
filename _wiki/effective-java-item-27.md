---
layout  : wiki
title   : 아이템 27 - 비검사 경고를 제거하라
summary : 
date    : 2021-01-31 19:29:02 +0900
updated : 2021-01-31 19:30:41 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 비검사 경고란 뭘까요?

'비검사 경고'라는 단어가 잘 이해가지 않아서 찾아봤습니다. [원문](https://www.informit.com/articles/article.aspx?p=2861454&seqNum=2)을 보니 unchecked warning이라고 나옵니다. **컴파일러 경고**로 이해하시면 될 것 같습니다.

## 비검사 경고의 예시

아래 코드와 같이 구현체의 타입을 명확히 주지 않은 채로 `HashSet` 객체를 생성할 수 있습니다.

`Set<String> set = new HashSet();` 

물론 IDE같은 경우에는 노란색으로 하이라이팅이 되고 경고를 보여주기도 합니다. 그대로 컴파일한다면 아래와 같은 메시지가 뜨게 됩니다.

```java
Note: Recompile with -Xlint:unchecked for details.
```

detail하게 보려면 `-Xlint:unchecked` 를 사용해 Recompile하라고 나오네요 :)

### -Xlint:unchecked 사용하기

컴파일할 때 `-Xlint:unchecked` 옵션을 추가해주면 됩니다.

1. `build.gradle` 에 추가하는 경우

    ```java
    tasks.withType(JavaCompile) {
        options.compilerArgs << "-Xlint:unchecked"
    }
    ```

2. 현재 파일이 있는 디렉토리에서 `javac -Xlint:unchecked ./WarningTest.java` 실행
    1. 물론 이렇게 실행하면 클래스파일이 현 위치에 생기게 됩니다

참고 : 책에서는 `-Xlint:uncheck` 로 나와있지만 `-Xlint:unchecked` 가 맞습니다.

성공적으로 적용했다면 아래와 같이 나오게 됩니다.

```java
Set<String> set = new HashSet();
                          ^
  required: Set<String>
  found:    HashSet 
```

## 비검사 경고 제거하기

`Set<String> set = new HashSet<>();` 와 같이 다이아몬드 연산자(`<>`)만 붙여주면 타입을  추론할 수 있으므로 경고가 사라집니다.

## 비검사 경고를 제거할 수 없다면?

모두들 최대한 경고를 없애도록 노력할 것입니다. 하지만 그러지 못할 때도 있겠죠. 경고를 제거할 수 없지만 타입이 안전하다고 확신할 수 있다면 `@SuppressWarnings("unchcked")` 를 달아 경고를 숨길 수 있습니다.

참고 : Suppress는 막다, 억압하다의 뜻이고 Warning은 경고입니다. 즉, 경고를 막는다는 뜻입니다.

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

`@Target`에 보시면 `TYPE, FIELD, METHOD, PARAMETER` 등등... 모두 들어가있습니다. 그래서 해당 어노테이션이 모든 곳에 다 쓰일 수 있습니다.

그렇다고 클래스 전체에 박아두고 쓴다면 다른 경고를 놓칠 수 있기에 클래스 전체에 박아두는 것이 아닌, **가능한 좁은 범위에 적용하는 것이 좋습니다.**

`**@SuppressWarnings("unchcked")` 를 사용한 코드는 경고 없이 컴파일 되나, 런타임에는 여전히 `ClassCastException`을 던질 수 있습니다.**

그래서 `@SuppressWarning("unchecked")` 을 사용할 때면 해당 경고를 무시해도 안전한 이유를 **항상 주석으로 남겨야 합니다.**

## @SuppressWarnings("unchcked") 예시

IDE를 사용한다면 타입에 대한 경고를 바로 알 수 있기 때문에 테스트를 굳이 작성하지 않아도 된다고 생각했고 테스트하기 어렵다고 판단되어 단순하게 코드만 작성했습니다 :)

```java
class WarningTest {

    @SuppressWarnings("unchecked")
    class ClassWarning {

        public Set<String> hello() {
            return new HashSet();
        }
    }

    class MethodWarning {

        @SuppressWarnings("unchecked")
        public Set<String> hello() {
            return new HashSet();
        }
    }

    class FieldWarning {

        @SuppressWarnings("unchecked")
        Set<String> set = new HashSet();
    }
}
```

## 그 외

컴파일러 경고에 대한 건 아니지만 경고에 대해서 좋은 자세인 것 같아 글 하나를 공유합니다!

[새로 입사한 개발자가 프로젝트에 기여하는 방법 한 가지 - 이종립님](https://helloworld.kurly.com/blog/fix-style-with-command/)

## 요약

> 컴파일러 경고를 최대한 없애자  
만약 경고를 없앨 수 없는 상황이라면 @SuppressWarnings을 가능한 좁은 범위에 사용해 경고를 숨기자. 그리고 해당 경고를 무시해도 안전한 이유를 주석으로 남기자

## 출처

- 이펙티브 자바 3판

