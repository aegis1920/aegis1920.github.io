---
layout  : wiki
title   : 웹 애니메이션에 대해서 알아보자.
summary : 
date    : 2019-08-06 15:22:51 +0900
updated : 2019-08-07 09:08:18 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## 웹 애니메이션이란?

* 반복적인 움직임의 처리
* 자바스크립트도 가능하고 CSS로도 가능하지만 CSS3의 transition과 transform 속성을 사용하는 게 성능상 가장 좋다.
* 간단하고 규칙적인 것은 CSS로, 세밀한 조작이 필요한 것은 Javascript로 처리한다.

## Javscript 애니메이션

### setInterval()

* 주어진 시간에 따라 반복적으로 함수 실행이 가능하다.

```javascript
const interval = window.setInterval(()=>{
    console.log("현재 시각은", new Date());
}, 1000);

window.clearInterval(interval); // interval 함수를 멈추게 한다.
```

* 그러나 지연 문제가 발생할 수 있다.
* setInterval함수가 실행하고 있는 도중에 Mouse Click Callback이라든지 다른 함수가 실행되면 실행되어야 할 이벤트 콜백이 지연된다.
* 일반적으로는 setInterval을 통해서 애니메이션을 구현하지 않는다.

### setTimeout

* 지정된 시간 이후에 한 번만 실행되는 코드
* 재귀호출을 통해 시간을 계속 지정해서 실행되게 할 수 있다.
* setTimeout()이 불리고 이 콜백 함수는 콜 스택에서 비워진다. 그래서 stackoverflow 같은 현상이 일어나지 않는다.

```javascript
let count = 0;
function animate(){
    setTimeout(()=> {
        if(count >= 20) return;
        console.log('현재 시작은', new Date());
        count++;
        animate();
    }, 500);
}
animate();
```

* 그러나 얘도 마찬가지로 지연될 수 있다.
* 그럼에도 매 순간 timeout을 조절할 수 있으므로 setInterval()과 다르다.

### requestAnimationFrame

* animation 주기를 16.6미만으로 하는 경우 불필요한 frame이 생성되는데 그 대안으로 생긴 것이 requestAnimationFrame
* requestAnimationFrame을 한 번 실행시켜주고 재귀호출을 해준다.
* canvas, svg를 사용하면서 그래픽 작업을 하게 될 때 복잡한 애니메이션을 다룰 때 꽤 유용하게 쓰인다.
* 아래 코드는 left값을 증가시켜 오른쪽으로 가게 만드는 코드

```javascript
var count = 0;
var el = document.querySelector(".outside");
el.style.left="0px"

function run(){
    if(count > 30) return;
    count = count +1;
    el.style.left = parseInt(el.style.left) + count + "px";
    requestAnimationFrame(run);
}

requestAnimationFrame(run);
```

* 여러 개의 requestAnimationFrame을 썼다면 run1이 모두 실행되고 run2가 되는 게 아니라 run1 -> run2 -> run1 -> run2 ... 로 순차적으로 반복된다.


## CSS 애니메이션

* transition을 이용해 애니메이션을 구현할 수 있다. Javascript 애니메이션 방법보다 빠르다.
* 특히 모바일 웹에서는 transform을 사용한 element의 조작을 많이 구현한다.
* GPU 가속을 이용하는 속성(translateXX(), scale(), rotate(), opacity 등..)을 사용하면 애니메이션 처리가 빠르다.
* 아래 코드는 버튼을 누르면 left에 100px씩 추가해 움직이고 transition을 left 속성에 추가해 애니메이션으로 움직이도록 한다.

```html
<html>
    <header>
        <style>
            .outside{
                position: relative;
                background-color: blueviolet;
                width:100px;
                font-size:0.8em;
                color:#fff;
                left:100px;
                top:100px;
                transform:scale(1);
                transition: left 0.5s ease-in-out;
            }
        </style>
    </header>
    <body>
        <div class="outside" style="left:100px">my favorite fruits</div>
        <button>right</button>
    </body>
    <script>
        var target = document.querySelector(".outside");
        var btn = document.querySelector("button");
        btn.addEventListener("click", function() {
            var pre = parseInt(target.style.left);
            target.style.left = pre + 100 + "px";
        });
    </script>
</html>
```

