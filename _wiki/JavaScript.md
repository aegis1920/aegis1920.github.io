---
layout  : wiki
title   : Javascript
summary : 
date    : 2019-06-20 15:20:25 +0900
updated : 2019-06-20 15:22:33 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# javascript

## datatype

```javascript
var numberVar = 10;// var  변수명  [= 초기값] ;
var stringVar = "hi"; // 'hi'도 가능하다.
var booleanVar = true;
var objectVar = { "name":"김재환", "age":24  };
var functionVar = function() {
    //window.alert("안녕"); 와 같다.	
    alert("안녕");		
};
var undefinedVar; // undefined 형이 따로 있다.
```

## var

```javascript
var name = "김재환"; // 전역변수, window객체의 멤버변수로 들어간다
var test = 100;
var test = 300;

function myFunction() {
    var name = "강다니엘";
    //	var age = 24;
    age = 24;// 선언을 해주지 않으면 전역변수,window객체의 멤버변수로 들어간다.
    tast = 200;

    console.log("myFunction : "+name);
    // this는 window 객체를 뜻한다. 그냥 함수에서 this를 선언만 한 것뿐.
    console.log("myFunction : "+this.name);
}
```
## function

같은 이름의 함수를 두 번 정의하면 두 개의 함수 중에 아래 쪽에 있는 함수가 실행되고, 윗쪽에 있는 함수는 실행되지 않는다. 

심지어 매개변수의 수가 일치하지 않아도 호출이 가능하다.

게다가 함수의 매개변수로 함수를 줄 수 있으면서 정의할 수 있다.

```javascript
function display(viewHandler) {
    var greeting = "Hello";
    viewHandler(greeting);
}

// display라는 함수인데 매개변수로 함수를 정의하고 있다
// 즉, display라는 함수가 있는데 매개변수로 함수를 받으면서 정의함과 동시에 display();를 호출하고 있음
// 위에 viewHandler라는 함수가 아래와 같이 정의됨과 동시에 불러짐.
// 즉, viewHandler("Hello");인데 viewHandler는 아래와 같이 정의되고 있는 것.
// 그래서 실행하면 처음에 Hello라고 뜨면서 confirm창이 뜸.
// 확인을 누르면 true이므로 true 출력.
display(function(msg) {
    // 확인 or 취소
    var flag = window.confirm(msg);
    console.log(flag);
});


function viewConsole(msg) {
    console.log(msg);
}
// 매개변수로 viewConsole이라는 함수를 넣어주면서 display()호출.
// display라는 함수 자체가 그 자신의 함수를 호출하는 것으로 되어있다.
// viewConsole()이 아니다. ()가 없다. 리턴 값이 아니라 함수 자체를 의미하기 때문에
// viewConsole("Hello");
display(viewConsole);
```

### 호이스팅

```javascript
// 얘는 사실 var sum; sum = fucntion() 이라서 var sum;만 위로 올라가게 된다. 그래서 이렇게 정의하기 전에 sum();과 같이 호출하는 함수가 있다면 undefined가 나온다.
// 이렇게 선언이 먼저 되는 성질을 호이스팅이라고 한다.
var sum = function(){
    var result = 0;
    for (var i = 0; i <= 10 ; i++) {
        result += i;
    }
    return result;
};
```



### innerfunction

```javascript
// 지역함수 :함수내부에 정의하는 함수
function outerFunction() {

    function innerFunction() {
        console.log("inner");	
    }
    console.log("outer1...")
    innerFunction();
    console.log("outer2...")
}


outerFunction();
innerFunction(); // 바로 불러올 수 없다. 함수 내부에 있기 때문에
```

## Array

뭔가 생각대로 되는 배열이지만 그만큼 더 헷갈리기 쉽다.

```javascript
var arr1 = [];
var arr2 = [10,20,30];
console.log(arr1.length);
console.log(arr2.length);
arr2[2] = 40;
console.log(arr2.length);

var arr3 = new Array();
arr3.push(100);
arr3.push(200);
arr3[2] = 300;

for(var i=0; i<arr3.length; ++i){
    console.log(arr3[i]);
}

// 5개인 배열
var arr4 = new Array(5);
for(var i=0; i<arr4.length; ++i){
    console.log(arr4[i]);
}

/* 	for(var i in arr4){
		console.log(arr4[i]);
	} */

// 배열의 요소가 3, 1, 25인 배열
var arr5 = new Array(3,1,25);
console.log(arr5.length);
```

## Object

```javascript
var person = {
    "name" : "김재환", 
    "age" : 24,
    // 객체의 속성으로 함수를 줄 수 있다.
    "increaseAge" : function() {
        this.age++;		
    } 
};

console.log(person.name + "/" + person.age);
// this 자체가 window 객체를 의미해서 없는 속성은 undefined가 나오게 되지만
// this.name은 window 객체 내 자체에 있는 속성이다.
console.log(this.name);
console.log(this.age); // window 객체에서 찾으므로 undefined가 뜬다.


// 객체를 만들고 싶을 때 그냥 빈 객체를 만들어서 집어넣으면 알아서 생긴다.
var person2 = new Object();
person2.name = "강다니엘";
person2.age = 24;
```

### 클로저

```javascript
// 자바스크립트의 클로저
// 함수를 네스팅하는 함수가 있다면 네스팅하는  함수가 사라져도 그 안에 있는 함수는 언제든지 호출이 가능하다.
// 예를 들어, Person()을 호출하고 끝내도 그 안에 있는 getAge()나 setAge()도 살아있다.
function Person(name, age) {
    var name = name; // var name ==> 지역변수
    var age = age;

    // this는 person 객체를 말한다.
    this.getAge = function() {
        return age;
    };

    this.setAge = function(pAge) {
        if (pAge < 0) {
            alert("나이는 음수가 될 수 없어요");
        }else{
            age = pAge;
        }
    }
}

var p1 = new Person("김재환", 20);
var p2 = new Person("강다니엘", 24);
// 생성자 함수가 끝나도 클로저 덕분에 그 안에 있는 지역변수에 접근할 수 있다.
console.log(p1.getAge());
p2.setAge(-10);
console.log(p2.getAge());
```

## event

`window.onload = function(){}` : 렌더링이 모두 끝나고나서 실행되는 함수

* `$(function(){})`와 같다.

어떤 것을 클릭했을 때 어떤 함수를 실행하고 싶다면

```javascript
var changeBtn = document.getElementById("changeBtn");
changeBtn.onclick = setMessage;
// 만약에 여러 이벤트를 주고 싶다면?

/*
이렇게 해주고 싶지만 맨 아래인 changeColor만 실행된다.
changeBtn.onclick = setMessage;
changeBtn.onclick = changeColor;
*/
// 이런 식으로 addEventListener()로 줘야 한다.
changeBtn.addEventListener("click", changeColor);
changeBtn.addEventListener("click", setMessage);


```

아니면 아예 onclick 속성으로 줄 수 있다. 

```html
<input type="button" value="색상 변경" onclick="document.getElementById('myDiv').style.backgroundColor='pink'; console.log('change')" />
<!-- 만약에 함수로 주고 싶다면?
onclick="changeColor()"
로 줘야 한다. 함수를 호출하는 거니까 ()를 붙여주고.
-->
```

## dom 트리에 노드 추가하기

```javascript
window.onload = function(){
    // list라는 얘를 찾아서 변수에 넣고
    var list = document.getElementById("list");
    // list라는 변수에 이벤트 리스너를 건다.
    list.addEventListener("click", function(){
        var eNode = document.createElement("li");
        var tNode = document.createTextNode("화이팅~"); //
        eNode.appendChild(tNode);
        // list한테 붙는다. 이벤트 핸들러로. this는 객체인 list 변수
        this.appendChild(eNode);
    });
};
```

## Dom 조작

```javascript
// 전체 문서에서 태그 이름이 div인 Element Node들 모두 찾아서 리스트 형태로 줌
var allDivs = document.getElementsByTagName("div");
// 똑같이 class 이름으로도 찾을 수 있다. 마찬가지로 item(i)를 써도 된다.
var contenData = document.getElementsByClassName("content_data");
		

for(var i=0;i<allDivs.length;i++){
    // 찾은 노드에서 n번째 노드를 접근해서 
    var div = allDivs.item(i);
    //	var div = divs[i]; // 위와 같은 방법
    // 스타일 변경하기.
    div.style.border= "4px solid #ff0000";
}

// 세 번째 div에서 다시 찾음. 자손노드 태그 이름이 div인 걸 찾는다
var divs = allDivs[2].getElementsByTagName("div");

var page = window.document.getElementById("sample_page");
var nodes = page.childNodes; // 공백 노드까지 세어진다
var lastChild = page.lastChild;
var secondChild = nodes[1];
var parentNode = page.parentNode;
var previousNode = page.previousSibling.previousSibling; // 공백문자가 포함되어 있다면 이렇게 두 번 뒤로 간다. nextSibling도 있다.

// 텍스트 노드 추가. 부모 노드를 먼저 찾아야 한다.
var newTextNode =  document.createTextNode("추가내용1");
content.appendChild(newTextNode);
// 텍스트 노드 수정. 똑같이 부모 노드 먼저 찾아야 한다.
content.firstChild.nodeValu = "헤더의 내용이 변경되었죠?!";

// 엘리먼트 추가하기
var firstChild = page.firstChild;
var p1 = document.createElement("p");
var text1 = document.createTextNode("첫번째 자식 노드 앞에 추가 ");
p1.appendChild(text1);
page.insertBefore(p1, firstChild);

// 엘리먼트 추가
var content = document.getElementById("content");
// 2-2. <div> Element를 동적으로 생성.
var div1 = document.createElement("div");

var text2_1	= document.createTextNode("생성할 Node의 양이 많은 경우 ");
var span = document.createElement("span");
var spanText =  document.createTextNode("어떤 방법을 ");	
span.appendChild(spanText);			
var text2_2	= document.createTextNode("사용해야 할까요?");

div1.appendChild(text2_1);
div1.appendChild(span);
div1.appendChild(text2_2);

//2-5.생성된 div1을 #content의 위쪽에 추가
page.insertBefore(div1,content);

var p2 = document.createElement("p");
//3-2. textNode 생성.
var text2 = document.createTextNode("마지막 노드로 추가");
//3-3. p2의 자식노드로 text2를  추가.		
p2.appendChild(text2);
p2.style.border	="4px solid #ff0000";
//3-4. p2을 page마지막 위치에 추가.
page.appendChild(p2);	

/***************** innerHTML로 추가하기 ***************/
var page = document.getElementById("sample_page");
// 첫번째 영역에 추가하기.
// 앞 쪽에 다시 p태그를 붙임. innerHTML은 모든 HTML 마크업 텍스트 자체를 말한다. 
page.innerHTML = "<p style='border:4px solid #00ff00'>첫번째 자식 노드 앞에 추가 </p>"+page.innerHTML;	 

// 두번째 영역에 추가하기.
var content = document.getElementById("content");
var div = window.document.createElement("div");
div.style.border	= "4px solid #00ff00";
div.innerHTML = "생성할 Node의 양이 많은 경우 <span class='myStyle' style='color:#0000ff'>어떤 방법을</span> 사용해야 할까요?"
page.insertBefore(div, content);

// 세번째 영역에 추가하기.
page.innerHTML += "<p style='border:4px solid #00ff00'>마지막 노드로 추가</p>";

// 노드 복사
// 세번째 영역에 추가하기.
//3-1. p1노드를 그대로 복사.
// true가 있으면 그 자식들 모두 copy하는 것. false면 그 노드 자체만... 
var p2 = p1.cloneNode(true);
//3-2. textNode를 수정.
p2.firstChild.nodeValue="복사하여 내용 변경";		
//3-3. p2을 page마지막 위치에 추가.
page.appendChild(p2);	

// 노드 이동
var header = document.getElementById("header");			
//2.이동위치의 노드를 구하기.
var content = document.getElementById("content");
//3.header을 content의 자식노드로 이동. 그냥 appendChild를 해주면 된다.
content.appendChild(header);
header.style.border = "4px solid #ff0000";

// 노드 삭제
var content = document.getElementById("content");
//3. 부모노드의 removeChild메소드를 이용해서 노드를 삭제.
content.parentNode.removeChild(content);
// 그 노드의 부모를 찾아서 지워줘야 함. 매개변수로 그 자식을 줘야 한다.

```









## jquery

지원하는 것들

1. 크로스 브라우징
2. DOM 때문에 쓴다.
   1. 좀 더 편리하게 쓰도록 도와준다
3. Event 처리
   1. 존재하는 얘들한테만 이벤트를 붙였지만 미래에 동적으로 추가되는 얘들까지 생각해서 이벤트핸들러를 만들어줄 수 있다.
4. AJAX 지원
   1. 비동기 통신. 10%가 통신 코드이고 90%가 DOM코드이다. 엄청 복잡해진다.
5. Effect
   1. CSS3를 이용하면 이미 가능하지만 jquery는 CSS3 이전부터 나왔었기 때문에
   2. 애니메이션적인 효과를 주기위해서.



jquery를 쓰기위한 준비물

1. download
2. CDN(url)



jQuery();로 써도 되고, $();로 써도 된다.



$(); 매개변수에 어떤 게 올 수 있나?

1. CSS의 선택자가 올 수 있다. $("#header")
   1. 원래 있던 얘에다가 기능을 덛붙여서 준다. 그래서 리턴받은 건 붙여서 준 기능밖에 못 쓴다. 상속이라고 생각하면 될듯. 그래서 스크립트에서는 없었던 유용한 기능을 쓸 수 있다. 
   2. 가령 header에 1,2라는 기능이 있다면 \$("#header")이 리턴받아 오는 건 1, 2라는 기능에서 확장된 3, 4라는 기능이 리턴된다. 그래서 \$("#header").3 처럼 쓸 수 있다. \$("#header").1은 쓰지 못하고. 직접적인 객체 자체가 $로 되기 때문에.
2. HTML 코드 
   1. \$("\<p> 점심 \<p>") 는 마크업에 상응하는 서브트리를 리턴한다. p를 나타내는 더 확장된 기능!
3. JavaScript 객체
   1. 스크립트 객체를 jquery를 주면 
   2. \$(document) 
   3. document에서 jquery의 기능을 붙인 Object 형태를 준다. 
4. function
   1. \$(function)
   2. window.onload()같은 자동으로 문서 로딩이 끝나면 반응할 수 있는 함수로 준다.

## 비동기처리

페이지를 새로 부르지 않으면서  작은 부분만 새롭게 갱신하고 싶을 때 비동기 통신. 

동기 통신 - url을 받아서 화면 전체가 바뀌는 것. 

비동기통신은 스스로 코드를 짜야한다. 

XMLHttpRequest

// true는 비동기 여부를 true, false 준다. 비동기면 true. 

request.open('GET', '/data.html', true)

request.send();를 해주면 끝. 그냥 다음 코드 실행.

로딩중처럼 뭔가 보여주고 싶을 때 0~4일 때는 보여주고, 4일 때는 안 보이게. 

document.body.innerHTML

requset.responseText;를 불러올 때는 스트링으로 따로 바꿔준다. 

1. 리퀘스트 객체부터 만들기
2. 응답을 주는지, 다 왔는지, 
3. 리퀘스트에 레디스테이트체인지를 붙인다. 
4. 4이면서 성공인 상황만. 
5. readyState = 4는 무조건 해주기
6. 다 끝내면 send. 
7. get방식은 url 뒤에 붙인다.
8. input.send(id-sfdsa&pd)
9. get으로 보내는지, post로 보내
10. 제이쿼리는 비동기 통신 메소드가 있다.
11. 에이잭스는 모든 걸 세팅하고 
12. post는 비동기 버전을
13. 익스 8버전은 지원하지 않는다. 그리도 제이쿼리로 짜면 쉽다. 제이쿼리는 무조건
14. 











