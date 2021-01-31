---
layout  : wiki
title   : 아이템 18 - 상속보다는 컴포지션을 사용하라
summary : 
date    : 2021-01-25 19:00:55 +0900
updated : 2021-01-31 19:30:27 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 상속이란 뭘까요?

OOP(객체 지향 프로그래밍)에 Inheritance(상속)이라는 개념이 있습니다. 

이 개념은 두 개의 클래스가 있을 때 상위 클래스와 하위 클래스의 관계로 만드는 방법입니다.

하위 클래스에서 `extends` 라는 키워드를 통해 상위 클래스를 상속할 수 있습니다.

```java
class Sub extends Super {}
```

### 상속인데 왜 super, extends 키워드를 쓸까요?

가끔 그런 생각해보신 적 없으신가요? 우리가 알고있는 '상속'이라는 키워드와 'extends' 라는 키워드가 어울리나? 라는 생각이요.

상속이라는 개념을 처음 배웠을 때 '재산 상속'에서의 상속과 같은 뜻인가? 라고 생각했었습니다. 좀 더 살펴보면 'OOP에서의 상속'은 흔히 알고 있는 상속과 조금 다른 개념입니다.

'재산 상속에서의 상속'은 계층의 의미가 강합니다.

- 예를 들어 할아버지와 아버지, 아버지와 나의 관계처럼요.

'OOP에서의 상속'은 분류의 의미가 강합니다.

- 예를 들어 동물과 조류, 조류와 참새의 관계처럼요.

그리고 상속을 한다면 두 개의 클래스는 `is-a` 관계를 가져야 하는데요. 그대로 번역한다면 `하위 클래스는 상위 클래스다` 로 번역이 됩니다. 여기서 `is-a` 관계보다 명확한 표현은 `is a kind of` 입니다. 즉, `하위 클래스는 상위 클래스의 종류다` 라고 말하는 것이 더 명확한 표현입니다.

포유류는 동물의 종류, `HashSet`은 `Set`의 종류라고 말하는 것처럼요.

여기서 중요한 건 **하위 클래스는 상위 클래스의 종류로 상위 클래스가 가진 특성을 재사용하고, 하위 클래스가 가진 특성을 확장한다는 관점**을 가지는 것입니다.

예를 들어 `HashSet`은 `Set`의 종류로 `Set`이 가진 특성을 재사용하고, `HashSet`이 가진 특성을 확장합니다.

> 계층의 관점에서 상속을 보기보다 **코드의 재사용과 확장의 관점**에서 상속을 보신다면 `extends` 가 어울린다는 것을 알 수 있습니다

## 상속을 왜 사용할까요?

위에서 말씀드렸다시피 기본적으로 객체지향의 상속은 하위 클래스가 상위 클래스의 특성을 재사용하고 확장하기 위해서 사용됩니다.

하위 클래스와 상위 클래스가 갖고 있는 동일한 특성(코드)를 상위 클래스에 넣어서 중복을 제거할 수 있으며 다른 특성을 확장하고 싶다면 하위 클래스에 추가하면 됩니다. 

### 상속의 단점

1. 상위 클래스가 어떻게 구현되느냐에 따라 하위 클래스의 동작에 이상이 생길 수 있습니다.
    1. 상위 클래스와 하위 클래스가 이미 구현되어있습니다.
    2. 하위 클래스는 상위 클래스의 메서드를 재정의해서 사용하고 있습니다.
    3. 상위 클래스의 메서드 또는 필드를 수정합니다.
    4. 상위 클래스의 메서드 또는 필드를 사용하고 있는 하위 클래스는 동작에 이상이 생깁니다.
2. 하위 클래스의 동작에 이상이 생길 수 있기 때문에 하위 클래스에 기능을 추가한다면 매번 상위 클래스의 코드를 확인해야 합니다.
3. 하위 클래스의 메서드를 사용할 때 상위 클래스에 있는 메서드도 나오기 때문에 메서드의 의미를 파악하기 쉽지 않습니다

    ```java
    // HashTable을 상속하는 Properties
    Properties properties = new Properties();
      
    // 어느 것이 Properties의 값을 가져오는 걸까요?
    properties.getProperty("keyName");
    properties.get("keyName");
    ```

### 상속의 단점을 이야기하는 예시 코드

1. 요구사항 : Set의 역할을 하면서 요소를 추가할 때마다 얼마나 더했는지 카운트
2. `HashSet`을 상속하는 `CustomHashSetByInheritance` 클래스 생성
3. 필드로 `addCount = 0;`
4. `add()`와 `addAll()`을 재정의해서 `add`할 때마다 카운트를 증가시키게 하고 `addAll`할 때는 컬렉션의 Size 만큼 카운트를 증가
5. 1, 2, 3, 4 를 `addAll()` 하고, 5를 `add()` 하는 테스트를 작성
6. 엥? 근데 왜 9가 나오지? 맞왜틀? 5가 나와야하는데?

```java
public class CustomHashSetByInheritance<E> extends HashSet<E> {

    private int addCount = 0;

    public CustomHashSetByInheritance() {
    }

    @Override
    public boolean add(E e) {
        addCount++;
        return super.add(e);
    }

    @Override
    public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return super.addAll(c);
    }

    public int getAddCount() {
        return addCount;
    }
}

public class CustomHashSetTest {

    @DisplayName("더할 때마다 카운트 증가 - 상속")
    @Test
    void addAll_Inheritance() {
        CustomHashSetByInheritance<Integer> customHashSet = new CustomHashSetByInheritance<>();
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4);

        customHashSet.addAll(numbers);
        customHashSet.add(5);

        assertThat(customHashSet.getAddCount()).isNotEqualTo(5);
        assertThat(customHashSet.getAddCount()).isEqualTo(9);
    }
}
```

9가 나온 이유는 재정의한 `addAll()`을 사용할 때 재정의한 `add()`가 호출되기 때문입니다!

이처럼 오류를 범할 수 있으며 직접 `HashSet`의 `addAll()` 메서드를 확인하기 전까진 그 이유를 알 수 없습니다.

## 컴포지션이란 뭘까요?

기존 클래스를 확장하지 않고, 새로운 클래스를 만든 후, private 필드로 기존 클래스의 인스턴스를 참조하게 하도록 설계하는 방법입니다

## 컴포지션을 왜 사용할까요?

컴포지션을 사용한다면 재정의하는 일이 없어 헷갈릴 일이 없고 오류도 적습니다. 또한 여러 객체를 필드에 둘 수 있기에 다중 상속을 해소할 수 있다는 장점도 있습니다.

### 컴포지션을 사용한 예시 코드

1. 기존 클래스를 필드에 작성
2. 재정의하지 않았으므로 HashSet의 구현 여부를 몰라도 됨
3. 로직은 상속했을 때와 같습니다.

```java
public class CustomHashSetByComposition<E> {

    private final HashSet<E> hashSet;
    private int addCount = 0;

    public CustomHashSetByComposition(HashSet<E> hashSet) {
        this.hashSet = hashSet;
    }

    public boolean add(E e) {
        addCount++;
        return hashSet.add(e);
    }

    public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return hashSet.addAll(c);
    }

    public int getAddCount() {
        return addCount;
    }
}

public class CustomHashSetTest {

    @DisplayName("더할 때마다 카운트 증가 - 조합")
    @Test
    void addAll_Composition() {
        CustomHashSetByComposition<Integer> customHashSet = new CustomHashSetByComposition<>(
            new HashSet<>());
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4);

        customHashSet.addAll(numbers);
        customHashSet.add(5);

        assertThat(customHashSet.getAddCount()).isEqualTo(5);
    }
}
```

## 요약

> 상속은 반드시 `is a kind of` 관계를 생각하자. 하위 클래스가 상위 클래스의 모든 역할을 하는지, 분류의 관계인지 확인하고 사용하자 (다형성, 코드 재사용만 생각해서 하지 말것)  
위 관계가 아니라면 컴포지션을 사용하자

## 출처

- 이펙티브 자바 3판
- 스프링 입문을 위한 자바 객체지향의 원리와 이해
- [https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/27db6csx(v=vs.90)?redirectedfrom=MSDN](https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2008/27db6csx(v=vs.90)?redirectedfrom=MSDN)
