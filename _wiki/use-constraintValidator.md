---
layout  : wiki
title   : ConstraintValidator를 사용해보기
summary : 
date    : 2020-05-19 21:46:41 +0900
updated : 2020-06-16 20:50:33 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# ConstraintValidator를 사용해보기

- 우아한 테크코스를 진행하던 도중 `CostraintValidator`를 사용해보라는 피드백을 받았다.
- [Yun님의 블로그](https://cheese10yun.github.io/ConstraintValidator)에서 일단 최대한 따라해보자 생각하고 적용시켰다.
- 잘 따라한 것 같은데 아무리 디버깅을 해도 `@ExceptionHandler(MethodArgumentNotValidException.class)`에 에러가 잡히지 않았다.

### 왜 `MethodArgumentNotValidException`이 `ExceptionHandler`에 잡히지 않을까?

- 일단 블로그의 글과 다른 부분이 딱 하나 있었다.
- 블로그 글은 `Post` 요청을 받고 `@RequestBody`를 사용했는데 나는 `Get` 요청으로 단순히 `DTO`만으로 받는다.
- 혹시 데이터를 바인딩하는데 차이가 있을까?

### `Post` 요청과 `Get` 요청을 받을 때 데이터 바인딩하는 방식에 차이가 있었다

- Post 요청 처리
    - `WebDataBinder`를 이용하는데 `@RequestBody`와 `@Valid`를 통해 내가 정의한 유효성 검사를 진행할 때 데이터 바인딩이 안 된다면 `MethodArgumentNotValidException`이 발생한다.
    - `RequestResponseBodyMethodProcessor` 클래스의 `resolveArgument()` 메서드를 보면 잘 나와있다
    - 그리고 기본적으로 Spring은 이 예외에 대해서 400을 응답 코드로 준다
- Get 요청
    - 아무것도 적지 않고 객체 타입으로 인자를 받으면 `@ModelAttribute`가 자동으로 붙는다.
    - 인자 타입의 오브젝트를 새로 만든다. 때문에 기본 생성자가 필요하다.
    - `@Valid`를 통해 유효성 검사를 진행하면 `BindException`이 일어나지만 던지지 않는다
    - 이 오류는 `Controller`의 `BindingResult`를 통해 잡을 수 있다.

> 나의 경우에는 전역 `ExceptionHandler`에서 처리하고 싶은 욕심으로 커스텀 예외에 `BindingResult`를 담고 커스텀 예외를 `throw` 시키는 방법으로 처리했다.

```java
// Controller

@GetMapping()
public ResponseEntity<PathResponse> findShortestPath(@Valid PathRequest pathRequest, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        throw new SameStationException(bindingResult);
    }
    PathResponse pathResponse = pathService.findShortestPath(pathRequest, new DijkstraStrategy());

    return ResponseEntity
        .ok()
        .body(pathResponse);
}

// ControllerAdvice

@ExceptionHandler(SameStationException.class)
public ResponseEntity<ErrorResponse> handleConflict(SameStationException e) {
    return ResponseEntity.badRequest()
        .body(ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE, e.getBindingResult()));
}

```

> 추후 피드백을 더 받아보고 수정해야겠다 ㅎㅎ

### 출처

- [https://cheese10yun.github.io/ConstraintValidator/](https://cheese10yun.github.io/ConstraintValidator/)
- [https://jojoldu.tistory.com/407](https://jojoldu.tistory.com/407)
- [http://dolszewski.com/spring/how-to-bind-requestparam-to-object](http://dolszewski.com/spring/how-to-bind-requestparam-to-object/)
