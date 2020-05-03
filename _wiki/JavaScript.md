---
layout  : wiki
title   : 자바스크립트
summary : 
date    : 2020-05-03 15:47:15 +0900
updated : 2020-05-03 15:51:06 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Javascript

- 보통 위치는 body의 끝 태그 바로 전에 작성한다.
- 비교는 `==`보다는 `===`를 사용한다. `==`로 인한 다양한 오류 상황이 있다.
- `"1" == 1`은 `true`이고, `"1" === 1`은 `false`이다.
- 함수에 함수가 연결되어 있으면 Call Stack으로 함수가 쌓인다.

### filter, map, reduce

- 자바의 stream을 사용할 때 사용하는 것과 똑같다.
- 보통 JSON에서 특정 값을 filter 시키거나 map할 때 좋다
- 원본 데이터인 data는 유지된다.(immutable)

```
var newData = data.filter(function(v){
    return v.price > 5000 ;
}).map(function(v) {
    var obj = {title : v.title, content : v.content, price : v.price};
    return obj;
})

```

### Call Stack

- 기본적으로 프로그램 상에서 어디에 있는지 기록하는 자료구조
- 스택과 같은 LIFO 구조
- 재귀호출을 계속 하다보면 스택이 가득차서 오류가 난다.
- 자바스크립트는 단일 스레드(메인 스레드인 이벤트 루프가 싱글 스레드이기 때문), 단일 호출 스택이라서 많은 작업을 처리한다면 오랜 시간동안 응답이 멈출 수 있다. 해결하기 위한 방법으로 비동기 콜백을 제공한다.

### Event Loop

- 자바스크립트의 Runtime은 이벤트 루프와 백그라운드(Web Apis), Callback Queue(태스크 큐), Call Stack으로 이루어져 있다.
- 처음에 함수들이 호출스택에 쌓이고 setTimeout과 같은 비동기 함수들은 백그라운드로 간다.
- setTimeout에 지정된 시간이 지난 후 태스크 큐로 간다.
- 호출스택 실행이 끝나서 다 비워지면 이벤트 루프가 태스크 큐에 있는 것들을 호출 스택에 올린다.
- 호출스택에서 실행되고 비워지면 이벤트 루프는 태스크 큐에 콜백이 들어올 때까지 대기한다.
- setTimeout이 정확하지 않을 수 있는 이유는 호출 스택에 함수가 많다면 이벤트 루프가 태스크 큐에서 호출 스택으로 끌어올리지 못하기 때문이다.

### promise

- 싱글스레드인 자바스크립트에서 비동기 처리를 위해 콜백(callback)을 사용해왔다.
- 덕분에 비동기 처리를 온전히 해낼 수 있었지만 비동기 처리를 순차적으로 진행해야될 경우, 비동기 처리를 중첩시켜서 표현해 복잡도가 증가하기 때문에 예외 처리가 어려워졌다.
- 이 단점을 해결하기 위해 예전부터 promise가 라이브러리로 탄생했고 ES6에서는 언어적 차원에서 지원하게 됐다.
- promise는 상태를 갖는다. fulfilled, reject 등...
- 비동기함수를 만들어서 사용해야될 때 객체를 리턴하게 만들어서 사용하면 콜백 지옥을 방지할 수 있게 된다.
- 누군가 만든 비동기 함수 역시 promise 객체를 리턴하게 만들어놨다.
- 비동기 메소드가 promise 객체를 리턴하면 계속해서 `.then(), .catch()`으로 체이닝이 가능하다.
- promise는 비동기 작업을 순차적으로 진행할 수 있다. 또한, 내부적으로 예외처리가 잘 되어있어 오류가 발생했을 때 오류 처리 관리를 잘 해줄 수 있다.
- `new Promise`로 promise가 생성되는 직후부터 `resolve`나 `reject`가 호출되기 전까지의 순간을 pending 상태라고 할 수 있다.
- 즉, 비동기 작업을 마친 뒤 결과물을 약속대로 잘 줄 수 있다면 첫 번째 파라미터로 호출되는 resolve 함수를 호출하고, 실패했다면 두 번째 파라미터로 주입되는 reject 함수를 호출한다.

### Hoisting

자바스크립트 함수는 실행되기 전에 함수 안에 필요한 변수값들을 미리 다 모아서 선언한다.
호이스팅은 함수 표현식과 선언문에서 다르게 동작되기 때문에 조심해야 한다.
끌어올려지는 것은 선언이다.

아래와 같이 되어있으면 `var printName;`만 오기 때문에 `console.log()`안에서 printName()을 실행하려고 해도 `printName`으로 인식해서 `printName is not a function`이 뜨게 된다.

```jsx
function test() { 
    console.log(printName()); 
    var printName = function() {
        return 'anonymouse';
    }
}
```

### arrow function

- => 를 사용해 간단하게 함수를 선언할 수 있다.
- 익명함수로만 사용할 수 있다.

### bind

- setTimeout과 같은 상황에서 안에 this를 써주면 그 객체가 나오지 않고 undefined가 나온다.
- 그러나 setTimeout의 바깥부분에서 bind(this)를 써주면 제대로 객체를 가리킨다.
- bind는 새로운 함수를 반환한다.
- 신기한 건 ES6에서 arrow함수를 쓰면서 bind를 쓴다면 또 다르다. arrow함수에서는 비동기더라도 this가 객체 자신을 가리킨다


### 출처

- [https://jeong-pro.tistory.com/128](https://jeong-pro.tistory.com/128)
