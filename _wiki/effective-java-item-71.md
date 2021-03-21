---
layout  : wiki
title   : 아이템 71 - 필요없는 검사 예외 사용은 피하라
summary : 
date    : 2021-03-21 21:51:22 +0900
updated : 2021-03-21 21:58:20 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

검사 예외라는 말보다 Checked Exception이 듣기 쉬워서 Checked Exception으로 적겠습니다 :)

- Checked Exception를 사용하면 컴파일 에러가 발생합니다.
- Checked Exception을 핸들링하기 위해선 catch를 통해 예외를 잡거나 throws를 사용해서 바깥으로 넘길 수 있습니다.
- 이는 처리를 강요하는 것이기 때문에 과하게 사용한다면 API 사용자에게 부담을 줍니다.
- 프로그래머가 의미있는 조치를 취할 수 있는 경우가 아니라면 Checked Exception가 아닌 Unchecked Exception을 사용하는 것이 좋습니다.

## Checked Exception을 회피하는 방법

1. Checked Exception을 던지는 대신 Optional을 사용해서 빈 옵셔널을 반환합니다. (예외가 발생한 부가 정보를 담을 수 없으므로 좋은 방법은 아님)

    ```java
    public static Optional<Database> create() {

        // ...

        try {
            database.create(); // create() 메서드 안에선 throws IOException으로 컴파일 에러
        } catch (IOException e) {
            return Optional.empty(); // 빈 옵셔널 반환
        }
        return Optional.of(Database);
    }
    ```

2. 상태 검사 메서드와 Unchecked Exception을 추가합니다.

    ```java
    public static Optional<Database> create() {

        // ...

        if (database.canCreateFile()) { // 예외가 던져질 지 여부를 boolean값으로 반환
            database.create();
        } else {
            throw new CustomDatabaseIOException();
        }
    }
    ```

## 주의할 점

canCreateFile는 상태 검사 메서드에 해당합니다. 여러 스레드가 동시에 접근한다면 canCreateFile와 create 호출 사이에 외부 요인이 들어올 수 있습니다. 외부 요인으로 인해 객체의 상태가 변할 수 있기때문에 조심해야 합니다.

## 요약

> Checked Exception은 프로그램의 안전성을 높여주지만 남용하면 고통스러운 API를 남깁니다.
의미있는 조치를 취할 수 있는 경우가 아니라면 Checked Exception가 아닌 Unchecked Exception을 사용합시다.

## 출처

- 이펙티브 자바 3판

