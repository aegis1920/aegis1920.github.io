---
layout  : wiki
title   : Javascript
summary : 
date    : 2019-06-20 15:20:25 +0900
updated : 2019-06-20 17:04:04 +0900
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


# JavaScript_opentutorials

<JAVA Script>
웹 브라우저는 html, css, java script로 나타낸다. 
HTML : 정보를 표현한다.(웹의 시작)
CSS : 정보를 꾸며준다.
Java Script : HTML을 프로그래밍적으로 제어한다.
java script를 배우면 Web browser, node.js, google apps script같은 호스트 환경을 프로그래밍적으로 이용할 수 있다. 

크롬 개발자 도구(크롬에서 F12)를 들어가서 Element 오른쪽에 >기호처럼 생긴 게 있다 이걸 누르면 Console이 뜨는데 자바스크립트 문장을 실시간으로 쉽게 입력할 수 있다. (줄바꿈은 shift+enter
)

<HTML에서 java script 로드하기>
1.	inline방식. inline방식은 태그에 직접 자바스크립트를 기술하는 방식이다. 장점은 태그에 연관된 스크립트가 분명하게 드러난다는 점이다. 하지만 정보와 제어가 섞여 있기 때문에 정보로서의 가치가 떨어진다.
<!DOCTYPE html>
<html>
<body>
<input type="button" onclick="alert('Hello world')" value="Hello world" />
</body>
</html>

onclick은 클릭했을 때 뒤의 해당하는 값을 실행한다. onclick=”~”는 html의 문법이고 alert()은 javascript의 문법이다. 이런 걸 웹 브라우저는 어떻게 알까? onclick이라는 속성의 값은 javascript라는 약속이 이미 되어있기 때문이다. 정보와 제어가 같이 모여 있으면 유지보수하기 어렵기 때문에 좋지 않다. 
2.	<script></script> 태그를 만들어서 여기에 자바스크립트 코드를 삽입하는 방식이다. 하지만 더 나은 방법이 있다.
3.	js를 별도의 파일로 분리할 수 있다. 장점은 보다 엄격하게 정보와 제어를 분리할 수 있다. 하나의 js파일을 여러 웹 페이지에서 로드함으로써 js의 재활용성을 높일 수 있다. 이게 바로 유지보수의 편의성을 도모한 것이다. 서버쪽에 부담도 줄일 수 있고 파일을 별도로 빼 놓으면 서버가 받는 데이터 량을 줄여줄 수 있다. 
4.	script 파일의 위치. script를 head태그에 위치시킬 수도 있다. 하지만 이것보다 head태그 끝나는 지점에 하는 게 좋다. 웹 브라우저는 script태그를 발견하면 다운로드하기 시작하고 실행한다음 그 다음에 나머지 내용을 실행한다. 그런데 head태그에 나타나게 되면 script에 있는 어떤 id값이 나중 태그를 가리키는 값을 갖는 경우 그 값이 존재하지 않는 값을 호출하게 될 수 있기 때문이다. 이 오류를 없애는 방법이 있긴 하다. window.onload = function(){}안에 넣게 되면 에러가 없어지는데 그 이유는 window객체의 저 onload메소드는 모든 코드가 다 읽은 후에 실행되는 것이기 때문이다. 화면을 다 만들고 실행한다. 

<Object Model>
웹 브라우저의 구성요소들은 하나하나가 객체화 되어있다. 사용자가 자바스크립트로 제어할 수 있도록 자바스크립트를 만든 사람이 자바스크립트를 객체로 만들어서 우리들에게 제공하고 있다. 즉, 브라우저에서 이미 각각의 태그들마다 미리 객체를 만들어 놓고 준비해두고 있는 것이다. 우리들은 태그에 해당하는 객체의 속성 값, 메소드를 호출해서 그 객체를 제어할 수 있고 그 객체가 가지고 있는 태그를 제어할 수 있게 된다.
Object Model은 테두리와 같은 역할을 한다. JSC, BOM, DOM들이 그들이다. 가장 큰 틀의 분류라고 할 수 있다.
window는 두 가지의 의미를 가지고 있다. 전역객체와 window.frame을 제어하기 위한 객체로서의 의미가 있다.
window.document라고 하면 document에 접근할 수 있다. 하지만 전역객체이기 때문에 document를 써도 window가 암시적으로 들어가 있기때문에 상관없다. 이로서 document는 window객체의 프로퍼티라는 걸 알 수 있다.
<!DOCTYPE html>
<html>
<body>
<img src="https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/course/94.png" />
</body>
</html>
위 코드의 html파일을 실행시키고 개발자 도구에 
var imgs = document.getElementsByTagName(‘img’);를 쳐보자.
document의 객체에는 getElementsByTagName()메소드를 가지고 있다. 이는 TagName을 이용해서 Element를 가져온다(리턴해준다)는 뜻이다. 그럼 imgs라는 변수에 리턴 값이 들어온다. Elements를 보면 s가 붙어있는데 복수라는 것이므로(여러 개의 값이므로) 배열을 리턴해준다는 것을 알 수 있다. 
imgs[0]이라고 하면 첫 번째에 해당하는 객체를 의미한다. 
속성을 주려면 imgs[0].style.width=’300px’; 치게 되면 실제로 코드가 바뀌게 된다. 이처럼 화면에 렌더링이 이미 끝난 태그를 수정하기 위해선 태그를 의미하는 객체를 찾아야 한다. 그 객체가 document에 들어있는 것!
document object model(DOM) 는 body태그나 img 태그라던지 제어하는 역할을 한다! 즉, 문서를 제어해준다.
Browser Object Model(BOM)은 웹페이지의 내용을 제외한 브라우저의 각종 요소들을 객체화시킨 것이다. 전역객체 window의 프로퍼티에 속한 객체들이 이에 속한다. (ex. window.alert(‘hello world’);를 치게되면 hello wolrd가 나온다. window라는 객체가 있고 alert이라는 메소드를 호출함으로써 나오게 된다. )
java script core는 공통적인 객체이다. google apps script나 node.js에는 DOM이나 BOM이 없다. 하지만 java script core는 모두 가지고 있는 객체다. javaScript 언어 자체에 정의되어있는 객체들이다.

<Browser Object Model(BOM)>
-전역객체 window
window 객체는 모든 객체가 소속된 객체이고, 전역 객체이면서, 창이나 프레임을 의미한다.
alert(‘hello world’); 나 window. alert(‘hello world’); 나 같은 의미다. window를 생략한 것과 같은 의미를 지닌다. 
변수도 마찬가지다. var를 해주지 않으면 전역 변수가 되는데 a =1;를 window.a라고 쳐도 된다.
객체도 마찬가지. b = {id = 1}; 을 불러올 때 window.b를 쳐도 된다. 그냥 다 소속이 되어있다.

-사용자와 커뮤니케이션 하기
alert : 경고창이라고 부른다. 사용자에게 정보를 제공하거나 디버깅등의 용도로 많이 사용한다.
<input type=”button” value=”alert” onclick=”alert(‘hello world’)”>
하지만 최근에는 자바스크립트를 사용할 때 개발자 도구에서 console.log를 사용한다.(확인 누르기 귀찮으니까.)

confirm : 확인을 누르면 true, 취소를 누르면 false를 리턴한다.
if(confirm('ok?')){ alert('ok'); } else { alert('cancel'); }

prompt : 사용자로부터 입력 값을 받을 수 있다.
if(prompt('id?') === 'egoing'){ alert('welcome'); } else {alert('fail');}

-Location 객체
Location 객체는 문서의 주소와 관련된 객체로 window 객체의 프로퍼티다. 이 객체를 이용해서 윈도우의 문서 URL을 변경할 수 있고, 문서의 위치와 관련해서 다양한 정보를 얻을 수 있다.
console.log(location.toString(), location.href);
위 코드는 현재 윈도우의 문서가 위치하는 URL을 알아내는 방법이다. location이란 객체를 문자화 시켜서 출력해 낸 것. cosole.log는 ,를 찍으면 두 개의 결과를 동시에 알 수 있다. 두 번째가 더 선호된다.
심지어 console.log(location.protocol);을 입력하면 현재 프로토콜을 알 수 있다. (:http)
console.log(location.host)라고 치면 host도 나온다. (opentutorials.org)
console.log(location.port)도 나온다.
colsole.log(location.pathname)은 웹 서버가 가지고 있는 구체적인 정보를 나타내준다. (host뒤)
colsole.log(location.search)은 서비스에 전달된 값 (?id=10)
colsole.log(location.hash)은 문서 안의 특정한 위치를 지정할 때 북마킹을 할 수 있는데 그게 나온다.(주소 맨 끝에 #bookmark를 썼을 때 이게 나옴)
주소는 protocol+host+port+pathname+search+hash 이렇게 이루어져 있다.
현재 문서를 이동시킬 때 href의 프로퍼티에 값을 주면 된다.
location.href = ‘http://egoing.net’;는 location = ‘http://egoing.net’; 와 같은 뜻이지만 왼쪽이 더 명시적이라서 선호된다. 
현재 문서를 리로드할 때는 location.href = location.href를 하면 되지만 더 간편하게 이렇게 location.reload(); 쓸 수도 있다.

-Navigator 객체
Navigator는 브라우저의 정보를 제공하는 객체다. 주로 호환성 문제등을 위해서 사용한다.
navigator가 왜 나왔냐면 cross browsing 이슈가 있었기 때문이다. 옛날에 netscape가 javascript를 만들어서 상용화시켰으나 마이크로소프트가 ie를 끼워 팔았다. netscape와 마이크로소프트가 웹 브라우저 전쟁이 시작됐고 서로 독점하기 위해서 javascript의 이벤트 이름을 다르게 만들었다. 물론 서로 다르니 웹 개발자들은 짜증이 났고 이후, 웹 표준이 나타나게 됐다. 그러면서 자연스럽게 Navigator 객체가 나타났다.
console.dir(navigator);를 하게 되면 navigator의 프로퍼티를 살펴볼 수 있다. 중요한 프로퍼티를 알아보자.
console.dir(navigator.appName);은 웹 브라우저의 이름이다. IE는 Microsoft Internet Explorer, 파이어폭스, 크롬등은 Nescape로 표시한다.
appVersion은 브라우저의 버전을 의미한다. 
앞에는 운영체제의 정보이고 중간에 웹킷은 크롬이 사용하고 있는 레이아웃 엔진을 뜻한다. 
userAgent는 브라우저가 웹 서버측으로 전송하는 user-agent http 헤더의 내용이다. appVersion과 내용이 비슷하다. 
platform은 브라우저가 동작하고 있는 운영체제에 대한 정보다.
Navigator 객체는 브라우저 호환성을 위해서 주로 사용하지만 모든 브라우저에 대응하는 것은 쉬운 일이 아니므로 아래와 같이 기능 테스트를 사용하는 것이 더 선호되는 방법이다. 
여러분이 갖고있는 웹 브라우저가 어떤 기능을 갖고있는지 없는지 확인할 때 쓴다.
예를 들어 Object.keys라는 메소드는 객체의 key 값을 배열로 리턴하는 Object의 메소드다. 이 메소드는 ECMAScript5에 추가되었기 때문에 오래된 자바스크립트와는 호환되지 않는다. 아래의 코드를 통해서 호환성을 맞출 수 있다. (Object.keys가 없다면 기능을 만들어주고 있다면 써주고. 다 볼 필요 없다.)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
Object.keys = (function () {
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty,
hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
dontEnums = [
'toString',
'toLocaleString',
'valueOf',
'hasOwnProperty',
'isPrototypeOf',
'propertyIsEnumerable',
'constructor'
],
dontEnumsLength = dontEnums.length;
return function (obj) {
if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
throw new TypeError('Object.keys called on non-object');
}
var result = [], prop, i;
for (prop in obj) {
if (hasOwnProperty.call(obj, prop)) {
result.push(prop);
}
}
if (hasDontEnumBug) {
for (i = 0; i < dontEnumsLength; i++) {
if (hasOwnProperty.call(obj, dontEnums[i])) {
result.push(dontEnums[i]);
}
}
}
return result;
};
}());
}
-창 제어
window.open 메소드는 새 창을 생성한다. window.open은 a태그와 같은 역할이라고 볼 수 있다.
window.open의 두 번째 인자에는 값이 있는데 _self와 _blank는 약속된 값이다.(_self는 현재 창에서 뜨게 한다, _blank는 새 창!) 아래는 메소드 사용법이다. 
<!DOCTYPE html>
<html>
<style>li {padding:10px; list-style: none}</style>
<body>
<ul>
<li>
첫번째 인자는 새 창에 로드할 문서의 URL이다. 인자를 생략하면 이름이 붙지 않은 새 창이 만들어진다.<br />
<input type="button" onclick="open1()" value="window.open('demo2.html');" />
</li>
<li>
두번째 인자는 새 창의 이름이다. _self는 스크립트가 실행되는 창을 의미한다.<br />
<input type="button" onclick="open2()" value="window.open('demo2.html', '_self');" />
</li>
<li>
_blank는 새 창을 의미한다. <br />
<input type="button" onclick="open3()" value="window.open('demo2.html', '_blank');" />
</li>
<li>
창에 이름을 붙일 수 있다. open을 재실행 했을 때 동일한 이름의 창이 있다면 그곳으로 문서가 로드된다.<br />
<input type="button" onclick="open4()" value="window.open('demo2.html', 'ot');" />
</li>
<li>
세번재 인자는 새 창의 모양과 관련된 속성이 온다.<br />
<input type="button" onclick="open5()" value="window.open('demo2.html', '_blank', 'width=200, height=200, resizable=yes');" />
</li>
</ul>
<script>
function open1(){
window.open('demo2.html');
}
function open2(){
window.open('demo2.html', '_self');
}
function open3(){
window.open('demo2.html', '_blank');
}
function open4(){
window.open('demo2.html', 'ot');
}
function open5(){
window.open('demo2.html', '_blank', 'width=200, height=200, resizable=no');
}
</script>
</body>
</html>

새로운 창에 접근할 수도 있다. (입력한 값이 바로 입력되어 나타나도록.) 이는 보안 상의 이유로 실제 서버에서만 동작하고, 같은 도메인의 창에 대해서만 작동한다.
<!DOCTYPE html>
<html>
<body>
<input type="button" value="open" onclick="winopen();" />
<input type="text" onkeypress="winmessage(this.value)" />
<input type="button" value="close" onclick="winclose()" />
<script>
function winopen(){
win = window.open('demo2.html', 'ot', 'width=300px, height=500px');
}
function winmessage(msg){
win.document.getElementById('message').innerText=msg;
}
function winclose(){
win.close();
}
</script>
</body>
</html>
window.open이라고 하는 메소드를 통해서 새 창을 열게 되면 window.open이라는 메소드는 window.open에 첫 번째 인자의 window 객체를 리턴하게 된다. (win에게 들어가게 됌.) 그리고this.value는 사용자가 입력한 입력 값으로 작용하게 되고 그 메시지가 innerText 프로퍼티를 바꿔주게 됨으로써 입력한대로 새 창에 나타나게 된다.
같은 도메인인 경우에만 작업이 가능한 이유는 다른 사람이 만든 웹 페이지에 가서 악의적으로 이용할 수도 있기 때문이다. 서비스를 바꿔버릴 수도 있으니까. 팝업도 비슷한 경우인데 팝업이 뜨는 건 사용자가 귀찮아하는 걸 알고 웹 브라우저에서 기본적으로 차단하도록 만들었다. 사용자가 허락하지 않는 한 뜨지 않는다. ( 스크립트 태그에 window.open('demo2.html'); 이 코드만 써 놓아서 다른 창을 띄우면 이게 팝업이 된다. 사용자가 버튼을 눌러서 가는 거면 괜찮지만.)

<Document Object Model(DOM)>
window 객체의 document 프로퍼티를 통해서 사용할 수 있다. Window 객체가 창을 의미한다면 Document 객체는 윈도우에 로드된 문서를 의미한다고 할 수 있다. 
문서를 자바스크립트로 제어하려면 제어의 대상에 해당되는 객체를 찾는 것이 제일 먼저 할 일이다. 문서 내에서 객체를 찾는 방법은 document 객체의 메소드를 이용한다. 
document.getElementsByTagName
getElementsByTagName은 인자로 전달된 태그 명에 해당하는 객체들을 찾아서 그 리스트를 NodeList라는 유사 배열에 담아서 반환한다. NodeList는 배열은 아니지만 length와 배열접근 연산자를 사용해서 엘리먼트를 조회할 수 있다.(첫 번째면 [0]) 만약 조회의 대상을 좁히려면 특정 객체를 다시 지정하고 .을 통해서 넣어준다.
<!DOCTYPE html>
<html>
<body>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ul>
<ol>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ol>
<script>
var ul = document.getElementsByTagName('ul')[0]; // 맨 뒤에 배열연산자 사용 가능.
var lis = ul.getElementsByTagName('li');
for(var i=0; lis.length; i++){
lis[i].style.color='red'; 
}
</script>
</body>
</html>

document.getElementsByClassName
getElementsByClassName은 class 속성의 값을 기준으로 객체를 조회할 수 있다.
<!DOCTYPE html>
<html>
<body>
<ul>
<li>HTML</li>
<li class="active">CSS</li>
<li class="active">JavaScript</li>
</ul>
<script>
var lis = document.getElementsByClassName('active');
for(var i=0; i < lis.length; i++){
lis[i].style.color='red'; 
}
</script>
</body>
</html>

document.getElementById(s가 붙지 않는다!)
getElementById는 id 값을 기준으로 객체를 조회한다. 성능면에서 가장 우수하다. (유일무이한 식별자라서 하나만 가능하다.)
<!DOCTYPE html>
<html>
<body>
<ul>
<li>HTML</li>
<li id="active">CSS</li>
<li>JavaScript</li>
</ul>
<script>
var li = document.getElementById('active');
li.style.color='red';
</script>
</body>
</html>

document.querySelector
querySelector는 css 선택자의 문법을 이용해서 객체를 조회할 수 있다.
<!DOCTYPE html>
<html>
<body>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ul>
<ol>
<li>HTML</li>
<li class="active">CSS</li>
<li>JavaScript</li>
</ol>
<script>
var li = document.querySelector('li');
li.style.color='red';
var li = document.querySelector('.active');
li.style.color='blue';
</script>
</body>
</html>

document.querySelectorAll
querySelector과 기본적인 동작방법은 같지만 모든 객체를 조회한다는 점이 다르다. (그 선택자에 해당하는 태그들은 모두 바뀐다.)
<!DOCTYPE html>
<html>
<body>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ul>
<ol>
<li>HTML</li>
<li class="active">CSS</li>
<li>JavaScript</li>
</ol>
<script>
var lis = document.querySelectorAll('li');
for(var name in lis){
lis[name].style.color = 'blue';
}
</script>
</body>
</html>

<jQuery>
라이브러리 – 자주 사용하는 로직을 재사용할 수 있도록 고안된 소프트웨어를 라이브러리라고 한다.
jQuery는 DOM을 내부에 감추고 보다 쉽게 웹 페이지를 조작할 수 있도록 돕는 도구이다.
jQuery를 사용하기 위해서는 jQuery를 HTML에 로드해야 한다. (CDN이라는 걸 이용하면 script 태그에 그냥 주소만 입력하면 된다. 스트리밍 형식으로 한다고 보면 된다.)
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script> 이렇게 부트스트랩처럼 해주고 script 태그 안에는 아래 코드가 들어간다.
jQuery( document ).ready(function( $ ) {
$('body').prepend('<h1>Hello world</h1>');
});
중가로 사이에 코드를 넣으면 된다. 지금 예시는 prepend로 앞에 선택한 body에 hello world를 쓴다는 뜻이다. 

<제어 대상을 찾기(jQuery)>
jQuery를 이용하면 DOM을 사용하는 것보다 훨씬 효율적으로 필요한 객체를 조회할 수 있다. jQuery는 객체를 조회할 때 CSS 선택자를 이용한다. 
jQuery의 기본 문법은 단순하고 강력하다. $(‘li’).css(‘color’, ’red’); 인데 천천히 살펴보자.
$()는 jQurey function이라고 불린다. 이 함수의 인자로 CSS 선택자(li)를 전달하면 jQuery function은 li태그들을 담고있는 jQuery 객체를 리턴한다. 이 객체는 선택자에 해당하는 엘리먼트를 제어하는 다양한 메소드를 가지고 있다. 위의 그림에서 css 메소드는는 선택자에 해당하는 객체들의 style에서 color를 Red로 변경한다. 

DOM(위)과 jQuery(아래)
var lis = document.getElementsByTagName('li');
for(var i=0; i&lt;lis.length; i++){
lis[i].style.color='red'; 
--------------------------------------------
$('li').css('color', 'red')

var lis = document.getElementsByClassName('active');
for(var i=0; i &lt; lis.length; i++){
lis[i].style.color='red'; 
--------------------------------------------
$('.active').css('color', 'red')

var li = document.getElementById('active');
li.style.color='red';
li.style.textDecoration='underline';
--------------------------------------------
$('#active').css('color', 'red').css('textDecoration', 'underline');
여기 id에서 css('color', 'red')가 리턴 값이 나오고 거기다 다시 .을 찍어서 그 객체에 대해서 다시 효과를 줄 수 있다. 이걸 chaining이라고 한다. 

<HTMLElement>
getElement* 메소드를 통해서 원하는 객체를 조회했다면 이 객체들을 대상으로 구체적인 작업을 처리해야 한다. 이를 위해서는 획득한 객체가 무엇인지 알아야 한다. 그래야 적절한 메소드나 프로퍼티를 사용할 수 있다.
아래 코드는 getElement*의 리턴 값을 보여준다.
<ul>
<li>HTML</li>
<li>CSS</li>
<li id="active">JavaScript</li>
</ul>
<script>
var li = document.getElementById('active');
console.log(li.constructor.name);
var lis = document.getElementsByTagName('li');
console.log(lis.constructor.name);
</script>
의미하는 객체가 li와 lis에 들어가고 그 객체의 이름을 알기 위해서는 constructor.name(생성자의 이름)을 이용한다. 
HTMLLIElement와 HTMLCollection이 나오게 된다. 
즉, 조회한 객체가 단수(document.getElementById)면 리턴 데이터 타입은 HTMLLIElement, 복수(document.getElementsByTagName)면 HTMLCollection이 나오게 된다. 여기서 HTMLLIElement는 HTMLElement HTMLCollection 객체는 유사배열을 이용하고 있다. (실행결과가 하나인 경우가 단수, 여러 개인 경우가 복수.)
jQuery가 이 HTMLElement를 내부에 감추고 있는 것이다. 
<a id="anchor" href="http://opentutorials.org">opentutorials</a>
<ul>
<li>HTML</li>
<li>CSS</li>
<li id="list">JavaScript</li>
</ul>
<input type="button" id="button" value="button" />
<script>
var target = document.getElementById('list');
console.log(target.constructor.name);
var target = document.getElementById('anchor');
console.log(target.constructor.name);
var target = document.getElementById('button');
console.log(target.constructor.name);
</script>
위 코드도 실행시켜보면 HTMLLIElement, HTMLAnchorElement, HTMLInputElement가 나오게 된다.
엘리먼트를 보면 각각 속성이 다른 것을 알 수 있는데 위의 a태그는 href의 속성을 가지고 있고 input에 보면 type과 value 속성이 있다. 이를 통해서 알 수 있는 것은 엘리먼트의 종류에 따라서 리턴되는 객체가 조금씩 다르다는 것이다.
w3c의 문서로 가보면 더 정확히 할 수 있다. HTMLLIElement는
interface HTMLLIElement : HTMLElement {
attribute DOMString type;
attribute long value;
};
위 코드로 속성이 정의가 되어있다. 엘리먼트 객체에 따라서 프로퍼티가 다르다는 것을 알 수 있고 :(콜론)이 나와있는 게 바로 상속 표시라는 걸 알 수 있다. 즉, HTMLLIElement는 HTMLElement에 상속받고 있었던 것! 자식과 부모였던 거다. 동일한 기능은 HTMLElement 객체가 이미 갖고 있었고 프로퍼티로 나눠준 것이다!
HTMLAnchorElement도 마찬가지다.
interface HTMLAnchorElement : HTMLElement {
attribute DOMString accessKey;
attribute DOMString charset;
attribute DOMString coords;
attribute DOMString href;
attribute DOMString hreflang;
attribute DOMString name;
attribute DOMString rel;
attribute DOMString rev;
attribute DOMString shape;
attribute long tabIndex;
attribute DOMString target;
attribute DOMString type;
void blur();
void focus();
};

모든 엘리먼트는 HTMLElement의 자식이다. 따라서 HTMLElement의 프로퍼티를 똑같이 가지고 있다. 동시에 엘리먼트의 성격에 따라서 자신만의 프로퍼티를 가지고 있는데 이것은 엘리먼트의 성격에 따라서 달라진다. HTMLElement는 Element의 자식이고 Element는 Node의 자식이다. Node는 Object의 자식이다. 이러한 관계를 DOM Tree라고 한다.
 

<HTMLCollection>
HTMLCollection은 리턴 결과가 복수인 경우에 사용하게 되는 객체다. 유사배열로 배열과 비슷한 사용방법을 가지고 있지만 배열은 아니다. HTMLCollection의 목록은 실시간으로 변경돼서 제거하게 되면 바로 그 목록에서 빠지게 된다. 
console.group()은 console.groupEnd() 사이의 console.log를 그룹핑해서 보여줄 수 있는 메소드이다.(뭐가 뭐의 소속인지 파악이 잘 된다. ) before는 세 개의 log가 나오고 after은 두 개의 log가 나오게 된다. 
<!DOCTYPE html>
<html>
<body>
<ul>
<li>HTML</li>
<li>CSS</li>
<li id="active">JavaScript</li>
</ul>
<script>
console.group('before');
var lis = document.getElementsByTagName('li');
for(var i = 0; i < lis.length; i++){
console.log(lis[i]);
}
console.groupEnd();
console.group('after');
lis[1].parentNode.removeChild(lis[1]);
for(var i = 0; i < lis.length; i++){
console.log(lis[i]);
}
console.groupEnd();
</script>
</body>
</html>

<jQuery 객체>
jQuery 객체란 jQuery 함수의 리턴 값으로 jQuery 함수를 이용해서 선택한 엘리먼트들에 대해서 처리할 작업을 프로퍼티로 가지고 있는 객체다. jQuery 객체의 가장 중요한 특성은 암시적인 반복을 수행한다는 것이다. DOM과 다르게 jQuery 객체의 메소드를 실행하면 선택된 엘리먼트 전체에 대해서 동시에 작업이 처리된다. 암시적 반복은 값을 설정할 때만 동작한다.
li.css(‘text-decoration’,’underline’);의 뜻은 첫 번째 인자의 효과를 두 번째 인자의 값으로 준다는 뜻이다.(즉, 값을 설정한다.) 
특이한 건 두 번째 인자를 주지 않고 첫 번째 인자만 주면 값을 가져오게 된다.
li.css(‘text-decoration’,’underline’);을 하고 li.css(‘text-decoration’);을 치면 값을 가져와서 underline이 나오게 된다. 거기다 신기한 건 ‘가져오기’를 할 때는 첫 번째 엘리먼트에 등장하는 값만 가져오게 된다.
chaining도 적용이 되서 li.css().css().css() 와 같이 연결해서 지정할 수도 있다. 
그러면 두 번째 엘리먼트의 값을 가져오고 싶으면 어떻게 해야할까? li[0], li[1] 이런 식으로 줘야 된다.
<ul>
<li>html</li>
<li>css</li>
<li>JavaScript</li>
</ul>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
console.log($('li').length);
console.log($('li')[0]);
var li = $('li');
for(var i=0; i<li.length; i++){
console.log(li[i]);
}
</script>
여기서 주의할 점은 li[i]의 값은 해당 엘리먼트에 대한 jQuery 객체가 아니라 DOM 객체이기 때문에 값을 줄 때 그냥 li[1].css(‘color’,’red’); 하게 되면 오류가 나온다.( li[0].constructor을 쳐보면 function HTMLLIElement가 나오게 된다. jQuery함수가 아니라 DOM객체란 얘기!) 따라서 jQuery의 기능을 이용해서 객체를 제어하려면 jQuery 함수를 이용해야 되니까. $(li[i]).css(‘color’,’red’); 로 감싸야된다.
신기하네. li는 jQuery 객체인데 배열로 주는 li[0]은 아니니까. 
다른 방법이 또 있다.
jQuery가 가지고 있는 메소드 중에 map이라는 메소드는 함수를 인자로 받도록 약속되어 있다. map 메소드는 해당하는 jQuery 객체의 엘리먼트를 하나씩 순회하는데 그 때마다 map 메소드가 호출하게 된다. 이 때 첫 번째 인자로 엘리먼트의 인덱스, 두 번째 인자로 엘리먼트 객체(DOM)이 전달된다. map함수는 function(index, elem){}이라고 해야된다.
var li = $('li');
li.map(function(index, elem){
console.log(index, elem);
$(elem).css('color', 'red');})

제어할 대상을 선택한 후에는 대상에 대한 연산을 해야한다. .css와 .attr은 jQuery 객체가 가지고있는메소드 중 하나인데, jQuery 객체 API를 보면 모두 나와있다. https://api.jquery.com
이를 익혀가는 것이 jQuery를 잘하게 되는 방법이다. 

<Element 객체>
Element 객체와 HTMLElement 객체는 상속관계가 한 줄로 쭉 이어져 있는데 왜 굳이 그렇게 했을까 의문이 들지 않는가?
Element 객체는 엘리먼트를 추상화한 객체다. HTMLElement 객체와의 관계를 이해하기 위해서는 DOM의 취지에 대한 이해가 선행되야 한다. DOM은 HTML만을 제어하기 위한 모델이 아니다!! HTML이나 XML, SVG, XUL과 같이 마크업 형태의 언어를 제어하기 위한 규격이기 때문에 Element는 마크업 언어의 일반적인 규격에 대한 속성을 정의하고 있고, 각각의 구체적인 언어(HTML,XML,SVG)를 위한 기능은 HTMLElement, SVGElement, XULElement와 같은 객체를 통해서 추가해서 사용하고 있다.
크롬 개발자 도구에는 어떤 태그, 객체에 대해서 상속관계를 보여주는 기능이 있는데 Elements에서 Properties에 가면 상속뿐만 아니라 속성까지 모두 보여주고 있어 어떤 객체가 서로 영향을 주는지 알아볼 수 있다. 
DOM의 계층 구조에서 Element 객체의 위치는 아래와 같다.
 
Element 객체의 주요 기능에는 여러 기능을 가진 API들이 있다고 할 수 있는데 식별자, 조회, 속성 기능이 있다.
식별자 - 문서내에서 특정한 엘리먼트를 식별하기 위한 용도로 사용되는 API
o	Element.classList
o	Element.className
o	Element.id
o	Element.tagName

조회 - 엘리먼트의 하위 엘리먼트를 조회하는 API
o	Element.getElementsByClassName
o	Element.getElementsByTagName
o	Element.querySelector
o	Element.querySelectorAll

속성 - 엘리먼트의 속성을 알아내고 변경하는 API
o	Element.getAttribute(name)
o	Element.setAttribute(name, value)
o	Element.hasAttribute(name);
o	Element.removeAttribute(name);


-	식별자 API
엘리먼트를 제어하기 위해서는 그 엘리먼트를 조회하기 위한 식별자가 필요하다. HTML에서 엘리먼트의 이름과 id 그리고 class는 식별자로 사용된다. 식별자 API는 이 식별자를 가져오고 변경하는 역할을 한다.
Element.tagName : 해당 엘리먼트의 태그 이름을 알아낸다. 태그 이름을 변경하지는 못한다.
<ul>
<li>html</li>
<li>css</li>
<li id="active" class="important current">JavaScript</li>
</ul>
<script>
console.log(document.getElementById('active').tagName)
</script>

Element.id : 문서에서 id는 단 하나만 등장할 수 있는 식별자다. 아래 예제는 id의 값을 읽고 변경하는 방법을 보여준다. 
<ul>
<li>html</li>
<li>css</li>
<li id="active">JavaScript</li>
</ul>
<script>
var active = document.getElementById('active');
console.log(active.id); // active라는 변수의 id값을 가져오는 것.
active.id = 'deactive';
console.log(active.id);
</script>

Element.className : 클래스는 여러개의 엘리먼트를 그룹핑할 때 사용한다. 사용하기 까다로워서 최근에는 잘 쓰지 않는다. (자바스크립트의 예악어라서 HTML의 class와 어울리지 않는다. 이처럼 프로퍼티의 이름이 같지 않을 수 있다. )
<ul>
<li>html</li>
<li>css</li>
<li id="active">JavaScript</li>
</ul>
<script>
var active = document.getElementById('active');
// class 값을 변경할 때는 프로퍼티의 이름으로 className을 사용한다.
active.className = "important current"; // 아예 입력되게 된다. 
console.log(active.className);
// 클래스를 추가할 때는 아래와 같이 문자열의 더한다.
active.className += " readed"
</script>

Element.classList : className에 비해서 훨씬 편리한 사용성을 제공한다.
<ul>
<li>html</li>
<li>css</li>
<li id="active" class="marked">JavaScript</li>
</ul>
<script>
function loop(){
for(var i=0; i<active.classList.length; i++){
console.log(i, active.classList[i]);
}
var active = document.getElementById(‘active’);하고 active.classList라고 치게 되면 DOMtokenList라는 객체가 나오게 된다. 이 객체 안에 있는 프로퍼티라고 보면된다. 배열의 형태처럼
active.classList[0], active.classList[1]로 쉽게 조회가 가능하고 추가도 active.classList.add() 이렇게. 삭제는 active.classList.remove() 토글은 active.classList.toggle() // 사라졌다 없어졌다. 있으면 없어지고 없으면 있게 해준다. //이런 식으로 쉽게 접근할 수 있다. (클래스는 띄어쓰기로 구분되어 다중적용이 된다.)

-	조회 API
조회 API는 엘리먼트를 조회하는 기능이다. 조회 방법에 대해서는 이미 여러차례 살펴봤기 때문에 이번 시간에 알아볼 내용은 조회 대상을 제한하는 방법에 대한 것이다. 
지금까지 document.getElementsBy* 메소드를 통해서 엘리먼트를 조회했다. document 객체는 문서 전체를 의미하는 엘리먼트이기 때문에 document의 조회 메소드는 문서 전체를 대상으로 엘리먼트를 조회한다. Element 객체 역시도 getElementsBy* 엘리먼트를 가지고 있는데 Element 객체의 조회 메소드는 해당 엘리먼트의 하위 엘리먼트를 대상으로 조회를 수행한다. 
<ul>
<li class="marked">html</li>
<li>css</li>
<li id="active">JavaScript
<ul>
<li>JavaScript Core</li>
<li class="marked">DOM</li>
<li class="marked">BOM</li>
</ul>
</li>
</ul>
<script>
var list = document.getElementsByClassName('marked');
console.group('document');
for(var i=0; i<list.length; i++){
console.log(list[i].textContent);
}
console.groupEnd();
console.group('active');
var active = document.getElementById('active'); 
var list = active.getElementsByClassName('marked');
for(var i=0; i<list.length; i++){
console.log(list[i].textContent);
}
console.groupEnd();
</script>

-	속성 API
속성은 HTML에서 태그명만으로는 부족한 부가적인 정보라고 할 수 있다. 이 속성을 어떻게 제어하는가 알아보자. 
o	Element.getAttribute(name) // 속성 값을 가져온다. name은 원하는 속성 값 이름.
o	Element.setAttribute(name, value) // 설정!
o	Element.hasAttribute(name); // 속성이 있는지 없는지.
o	Element.removeAttribute(name);

<a id="target" href="http://opentutorials.org">opentutorials</a>
<script>
var t = document.getElementById('target');
console.log(t.getAttribute('href')); //http://opentutorials.org
t.setAttribute('title', 'opentutorials.org'); // title 속성의 값을 설정한다. // 없는 속성을 설정하게 되면 만들어서 설정하게 한다. 
console.log(t.hasAttribute('title')); // true, title 속성의 존재여부를 확인한다.
t.removeAttribute('title'); // title 속성을 제거한다.
console.log(t.hasAttribute('title')); // false, title 속성의 존재여부를 확인한다.
</script>
모든 엘리먼트의 HTML속성은 JavaScript 객체의 속성과 프로퍼티로 제어가 가능하다. (attribute 방식과 property 방식이 다르다. 처음 알았네;; attribute는 속성 즉, 어떤 값의 개념을 뜻하는 것 같고 property는 프로퍼티 구체적인 성질, 소유물 같은 느낌.)
<p id="target">
Hello world
</p>
<script>
var target = document.getElementById('target');
// attribute 방식
target.setAttribute('class', 'important');
// property 방식
target.className = 'important';
</script>

setAttribute('class', 'important')와 className = 'important'는 같은 결과를 만든다. 하지만 전자는 attribute 방식(속성이라고 부르겠다)이고 후자는 property 방식이다. property 방식은 좀 더 간편하고 속도도 빠르지만 실제 html 속성의 이름과 다른 이름을 갖는 경우가 있다. 그것은 자바스크립트의 이름 규칙 때문이다.
class	className
readonly	readOnly
rowspan	rowSpan
colspan	colSpan
usemap	userMap
frameborder	frameBorder
for	htmlFor
maxlength	maxLength
왼쪽이 그냥 html속성을 말할 때, 오른쪽이 javascript에서 property를 말할 때이다. 그래서 프로퍼티 방식으로 접근할 때는 조심해야한다.
심지어 속성과 프로퍼티는 값이 다를수도 있다. 아래 코드를 실행한 결과는 속성과 프로퍼티의 값이 꼭 같은 것은 아니라는 것을 보여준다.
<a id="target" href="./demo1.html">ot</a> // 상대 경로로 설정되어있을 때
<script>
//현재 웹페이지가 http://localhost/webjs/Element/attribute_api/demo3.html 일 때 
var target = document.getElementById('target');
// http://localhost/webjs/Element/attribute_api/demo1.html 
console.log('target.href', target.href); //얘는 다 나온다.
// ./demo1.html 
console.log('target.getAttribute("href")', target.getAttribute("href")); //얘는 상대 경로만 나오게 된다.
</script>

-	jQuery 속성 제어 API
jQuery 객체의 메소드 중 setAttribute, getAttribute에 대응되는 메소드는 attr이다. 또한 removeAttribute에 대응되는 메소드로는 removeAttr이 있다. 
<a id="target" href="http://opentutorials.org">opentutorials</a>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
var t = $('#target');
console.log(t.attr('href')); //http://opentutorials.org ‘가져오기!’
t.attr('title', 'opentutorials.org'); // title 속성의 값을 설정한다.
t.removeAttr('title'); // title 속성을 제거한다.
</script>

DOM과 마찬가지로 jQuery도 속성(attribute)과 프로퍼티를 구분한다. 속성은 attr, 프로퍼티는 prop 메소드를 사용한다. 
<a id="t1" href="./demo.html">opentutorials</a>
<input id="t2" type="checkbox" checked="checked" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
// 현재 문서의 URL이 아래와 같다고 했을 때
// http://localhost/jQuery_attribute_api/demo2.html
var t1 = $('#t1');
console.log(t1.attr('href')); // ./demo.html 
console.log(t1.prop('href')); // http://localhost/jQuery_attribute_api/demo.html 
var t2 = $('#t2');
console.log(t2.attr('checked')); // checked
console.log(t2.prop('checked')); // true
</script>
장점은 뭐가 있을까? 하나의 이름으로 통합되어 있고 짧다. 게다가 아까 말한 프로퍼티 방식이 여러가지 장점이 있음에도 불구하고 실제 이름과 다른 경우가 있어 불편하다고 헀는데 jQuery를 이용하면  내부적으로 보정을 해준다. class나 className이나 둘 다 가능하도록!
<div id="t1">opentutorials</div>
<div id="t2">opentutorials</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#t1').prop('className', 'important'); 
$('#t2').prop('class', 'current'); 
</script>

-	jQuery 조회 범위 제한
이전 수업에서 Element 객체에서 getElementsBy* 메소드를 실행하면 조회의 범위가 그 객체의 하위 엘리먼트로 제한된다는 것을 알아봤다. jQuery에서는 어떻게 이러한 작업을 할 수 있을까?

selector context
가장 간편한 방법은 조회할 때 조회 범위를 제한하는 것이다. 그 제한된 범위를 jQuery에서는 selector context라고 한다.
<ul>
<li class="marked">html</li>
<li>css</li>
<li id="active">JavaScript
<ul>
<li>JavaScript Core</li>
<li class="marked">DOM</li>
<li class="marked">BOM</li>
</ul>
</li>
</ul>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
//$ 함수 인자의 첫 번째 인자에 효과를 주고자하는 엘리먼트를 넣고 두 번째 인자에 selector context가 오는데 첫 번째 인자에 해당하는 selector를 제어하려고 하는 엘리먼트를 넣는다. 
$( ".marked", "#active").css( "background-color", "red" );
</script>
$( "#active .marked").css( "background-color", "red" ); 얘도 같은 의미가 된다.

.find()
find는 jQuery 객체 내에서 엘리먼트를 조회하는 기능을 제공한다. 아래의 코드는 위의 예제와 효과가 같다.
$( "#active").find('.marked').css( "background-color", "red" );
find를 쓰는 이유는 체인을 끊지 않고 작업의 대상을 변경하고 싶을 때 사용한다. 기본 예제를 아래와 같이 변경해보자.
$('#active').css('color','blue').find('.marked').css( "background-color", "red" );
즉 li.item-li 엘리먼트에 해당하는 모든 엘리먼트의 전경색을 파란색으로 변경한 후에 li 엘리먼트만을 조회해서 배경색을 붉은색으로 지정하고 있다.  
find를 너무 복잡하게 사용하면 코드를 유지보수하기 어렵게 된다. 
<Node 객체>
Node 객체는 DOM에서 시조와 같은 역할을 한다. 다시 말해서 모든  DOM 객체는 Node 객체를 상속받는다. 
 
Node 객체의 주요한 임무는 아래와 같다. 
관계
엘리먼트는 서로 부모, 자식, 혹은 형제자매 관계로 연결되어 있다. 각각의 Node가 다른 Node와 연결된 정보를 보여주는 API를 통해서 문서를 프로그래밍적으로 탐색할 수 있다.
o	Node.childNodes
o	Node.firstChild
o	Node.lastChild
o	Node.nextSibling
o	Node.previousSibling
o	Node.contains()
o	Node.hasChildNodes()
노드의 종류
Node 객체는 모든 구성요소를 대표하는 객체이기 때문에 각각의 구성요소가 어떤 카테고리에 속하는 것인지를 알려주는 식별자를 제공한다. 
o	Node.nodeType
o	Node.nodeName
값
Node 객체의 값을 제공하는 API
o	Node.nodeValue
o	Node.textContent
자식관리
Node 객체의 자식을 추가하는 방법에 대한 API
o	Node.appendChild()
o	Node.removeChild()

-Node 관계 API
Node 객체는 Node 간의 관계 정보를 담고 있는 일련의 API를 가지고 있다. 다음은 관계와 관련된 프로퍼티들이다.
o	Node.childNodes
자식노드들을 유사배열에 담아서 리턴한다. //childNodes[0]
o	Node.firstChild
첫번째 자식노드
o	Node.lastChild
마지막 자식노드
o	Node.nextSibling
다음 형제 노드
o	Node.previousSibling
이전 형제 노드

<body id="start">
<ul>
<li><a href="./532">html</a></li> 
<li><a href="./533">css</a></li>
<li><a href="./534">JavaScript</a>
<ul>
<li><a href="./535">JavaScript Core</a></li>
<li><a href="./536">DOM</a></li>
<li><a href="./537">BOM</a></li>
</ul>
</li>
</ul>
<script>
var s = document.getElementById('start');
console.log(1, s.firstChild); // #text
var ul = s.firstChild.nextSibling
console.log(2, ul); // ul
console.log(3, ul.nextSibling); // #text
console.log(4, ul.nextSibling.nextSibling); // script
console.log(5, ul.childNodes); //text, li, text, li, text, li, text
console.log(6, ul.childNodes[1]); // li(html)
console.log(7, ul.parentNode); // body
</script>
</body>
첫 번째 자식 노드를 했을 때 #text가 나오는 이유는  body> 바로 뒤에 공백 또는 줄 바꿈 데이터(문자)가 있기 때문이다. 이게 존재한다면 이것도 노드에 해당한다. 이 메소드들은 text 객체가 가지고 있고 start.childNodes -> 텍스트 정보도 같이 포함된다.
노드 중간에 text가 나오게 되서 보기 힘든 부분이 있는데 ecma5에 추가된 API로 공백 text노드는 걸러지게 할 수 있다. 브라우저마다 공백 text노드의 유무가 틀려서 오는 혼란 때문에 생겼다고 한다.
firstElementChild,
lastElementChild,
nextElementSibling,
previousElementSibling 등등..

-노드 종류 API
노드 작업을 하게 되면 현재 선택된 노드가 어떤 타입인지를 판단해야 하는 경우가 있다. 이런 경우에 사용할 수 있는 API가 nodeType, nodeName이다.
o	Node.nodeType
node의 타입을 의미한다. 
o	Node.nodeName
node의 이름 (태그명을 의미한다.)
NodeType은 노드의 종류에 따라서 정해진 상수가 존재한다. 아래는 모든 노드의 종류와 종류에 따른 값을 출력하는 예제다.
위의 예제에서 strat.nodeType을 하면 1이 나온다. body이니까. 이런 식으로 타입이 숫자로 지정되어있다. 그리고 숫자는 기억하기 힘드니까 문자로 비교해도 괜찮다. (start.nodeType === 1)
for(var name in Node){
console.log(name, Node[name]);
}
얠 치면
ELEMENT_NODE 1 
ATTRIBUTE_NODE 2 
TEXT_NODE 3 
CDATA_SECTION_NODE 4 
ENTITY_REFERENCE_NODE 5 
ENTITY_NODE 6 
PROCESSING_INSTRUCTION_NODE 7 
COMMENT_NODE 8 
DOCUMENT_NODE 9 
DOCUMENT_TYPE_NODE 10 
DOCUMENT_FRAGMENT_NODE 11 
NOTATION_NODE 12 
DOCUMENT_POSITION_DISCONNECTED 1 
DOCUMENT_POSITION_PRECEDING 2 
DOCUMENT_POSITION_FOLLOWING 4 
DOCUMENT_POSITION_CONTAINS 8 
DOCUMENT_POSITION_CONTAINED_BY 16 
DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC 32

아래는 노드 종류 API를 이용해서 노드를 처리하는 예제이다. 함수가 자기 자신을 호출하는 것을 재귀함수라고 하는데 이를 이용해서 할 수 있다. 
<!DOCTYPE html>
<html>
<body id="start">
<ul>
<li><a href="./532">html</a></li> 
<li><a href="./533">css</a></li>
<li><a href="./534">JavaScript</a>
<ul>
<li><a href="./535">JavaScript Core</a></li>
<li><a href="./536">DOM</a></li>
<li><a href="./537">BOM</a></li>
</ul>
</li>
</ul>
<script>
function traverse(target, callback){
if(target.nodeType === 1){
//if(target.nodeName === 'A')
callback(target);
var c = target.childNodes;
for(var i=0; i<c.length; i++){
traverse(c[i], callback); 
} 
}
}
traverse(document.getElementById('start'), function(elem){
console.log(elem);
});
</script>
</body>
</html>
여기서 script부분만 떼어서 잘 보자.
function traverse(target, callback){
if(target.nodeType === 1){
//if(target.nodeName === 'A')
callback(target);
var c = target.childNodes;
for(var i=0; i<c.length; i++){
traverse(c[i], callback); 
} 
}
}
traverse(document.getElementById('start'), function(elem){
console.log(elem);
});
천천히 살펴보자. 밑에서부터 traverse함수를 만들어보자.
traverse라는 함수가 실행된다. 두 개의 인자를 가지고 있는데 첫 번째 인자는 body태그를 지정하는 인자이고 두 번째는 익명함수인데 매개변수를 받아서 그 매개변수를 console.log로 바로 나타내는 함수이다. 
traverse함수는 첫 번째 인자가 target이고 두 번째 인자는 callback이다. target은 id가 start인 body태그(루트 엘리먼트)를 의미하고 callback은 각각 엘리먼트를 탐색할 때마다 순번에 해당하는 엘리먼트를 인자로 전달해야된다. 그래서 함수가 위치하게 됐다. 이는 익명함수를 의미한다. (target.nodeType === 1)은 텍스트 공백을 없애주기 위한 문장이고 그 밑에 callback(target); 이 있다. 익명함수에 target을 집어넣은 것이다. 해당하는 값이 나오도록.
body태그를 조회했으면 자식 엘리먼트를 하나씩 조회하면서 동시에 Traverse라는 함수의 첫 번째 인자로 전달해야 된다. 새로운 변수를 만든다. 자식 엘리먼트를 조회할 때는 var c = target.childNodes; // c라는 변수에 담겨있는 자식 엘리먼트들에 대한 유사 배열을 반복문을 통해 하나씩 열거한다.
하위 노드들을 열거할 수 있게 되고 이 for문이 한 번 씩 돌 때마다 traverse의 첫 번째 인자로 전달하게 되면 더 이상 자식이 없을 때까지 자식 노드를 찾아서 들어가게 된다.
속성을 바꿔주고 싶다면 익명함수에 console.log(elem); 가 아닌 elem.style.color = ‘red’; 이런 식으로 치게 되면 모든 태그들을 바꿔줄 수 있다. 일부 태그만 바꾸고 싶다면 if(elem.nodeName === ‘A’) //a태그가 A로, 대문자로 나오니까.//이런 식으로 해주면 된다.

-노드 변경 API
노드추가
노드 추가와 관련된 API들은 아래와 같다.
o	appendChild(child)
노드의 마지막 자식으로 주어진 엘리먼트 추가
o	insertBefore(newElement, referenceElement)
appendChild와 동작방법은 같으나 두번째 인자로 엘리먼트를 전달 했을 때 이것 앞에 엘리먼트가 추가된다.
노드를 추가하기 위해서는 추가할 엘리먼트를 생성해야 하는데 이것은 document 객체의 기능이다. 아래 API는 노드를 생성하는 API이다. (문서가 엘리먼트를 만드는 것이라고 생각하자.)
o	document.createElement(tagname)
엘리먼트 노드를 추가한다.
o	document.createTextNode(data)
텍스트 노드를 추가한다. 

<ul id="target">
<li>HTML</li>
<li>CSS</li>
</ul>
<input type="button" onclick="callAppendChild();" value="appendChild()" />
<input type="button" onclick="callInsertBefore();" value="insertBefore()" />
<script>
function callAppendChild(){
var target = document.getElementById('target');
var li = document.createElement('li');
var text = document.createTextNode('JavaScript');
li.appendChild(text);
target.appendChild(li);
}
function callInsertBefore(){
var target = document.getElementById('target');
var li = document.createElement('li');
var text = document.createTextNode('jQuery');
li.appendChild(text);
target.insertBefore(li, target.firstChild);
}
</script>

li와 text 객체를 만든 것은 아직 결합이 되지 않은 상태이다.(var li, var text) (<li></li>, JavaScript 이 상태로 둥둥 떠다니고 있는 것이다.) 여기서 appendChild(), insertBefore()을 쓰면 결합이 되는 것이다.
target.insertBefore(li, target.firstChild); // 두 번째 엘리먼트를 보면 공백인데 여기 앞에다가 li엘리먼트를 추가하므로 제대로 추가가 된다. 
노드제거
o	removeChild(child)
노드 제거를 위해서는 아래 API를 이용한다. 이 때 메소드는 삭제 대상의 부모 노드 객체의 것을 실행해야 한다는 점에 유의하자. 보면 중간에 parentNode가 들어간다. 삭제하는 부모도 알아야하니 비판을 많이 받는다.
<ul>
<li>HTML</li>
<li>CSS</li>
<li id="target">JavaScript</li>
</ul>
<input type="button" onclick="callRemoveChild();" value="removeChild()" />
<script>
function callRemoveChild(){
var target = document.getElementById('target');
target.parentNode.removeChild(target);
}

노드 바꾸기
o	replaceChild(newChild, oldChild)
새로운 대상이 첫 번째 인자, 바꾸려고하는 대상이 두 번째 인자에 오게 된다.
<ul>
<li>HTML</li>
<li>CSS</li>
<li id="target">JavaScript</li>
</ul>
<input type="button" onclick="callReplaceChild();" value="replaceChild()" />
<script>
function callReplaceChild(){
var a = document.createElement('a');
a.setAttribute('href', 'http://opentutorials.org/module/904/6701');
a.appendChild(document.createTextNode('Web browser JavaScript'));
var target = document.getElementById('target');
target.replaceChild(a,target.firstChild);
}
</script>

-jQuery 노드 변경 API
추가
추가와 관련된 주요한 메소드는 4가지다. 각각의 관계를 그림으로 나타내면 아래와 같다.
<div class="target">
content1
</div>
<div class="target">
content2
</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('.target').before('<div>before</div>');
$('.target').after('<div>after</div>');
$('.target').prepend('<div>prepend</div>');
$('.target').append('<div>append</div>');
</script>

$(‘.target’)을 썼으니 클래스가 target인 것은 모두 해당된다. 즉, 해당되는 모든 엘리먼트를 대상으로 실행한다. 

제거
제거와 관련된 API는 remove와 empty가 있다. remove는 선택된 엘리먼트를 제거하는 것이고 empty는 선택된 엘리먼트의 텍스트 노드를 제거하는 것이다. 즉, empty는 텍스트는 사라지고 div는 남는다.
<div class="target" id="target1">
target 1
</div>
<div class="target" id="target2">
target 2
</div>
<input type="button" value="remove target 1" id="btn1" />
<input type="button" value="empty target 2" id="btn2" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#btn1').click(function(){
$('#target1').remove();
})
$('#btn2').click(function(){
$('#target2').empty();
})
</script>

교체
replaceAll과 replaceWith는 모두 노드의 내용을 교체하는 API이다. replaceWith가 제어 대상을 먼저 지정하는 것에 반해서 replaceAll은 제어 대상을 인자로 전달한다.
구문적인 차이일 뿐이다. 거의 같은 기능인데 바꿀 대상이 어디에 오느냐 차이.
<div class="target" id="target1">
target 1
</div>
<div class="target" id="target2">
target 2
</div>
<input type="button" value="replaceAll target 1" id="btn1" />
<input type="button" value="replaceWith target 2" id="btn2" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#btn1').click(function(){
$('<div>replaceAll</div>').replaceAll('#target1');
})
$('#btn2').click(function(){
$('#target2').replaceWith('<div>replaceWith</div>');
})
</script>

복사
노드를 복사하는 방법을 알아보자. clone이라는 메소드를 이용한다. 즉, $(‘#source’).clone()으로 복사를 먼저 한 후에, 그 복사한 것을 교체하는 것이다. 
<div class="target" id="target1">
target 1
</div>
<div class="target" id="target2">
target 2
</div>
<div id="source">source</div>
<input type="button" value="clone replaceAll target 1" id="btn1" />
<input type="button" value="clone replaceWith target 2" id="btn2" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#btn1').click(function(){
$('#source').clone().replaceAll('#target1');
})
$('#btn2').click(function(){
$('#target2').replaceWith($('#source').clone());
})
</script>

이동
추가 메소드를 이용하면 되는데 DOM manipulation API의 인자로 특정 노드를 선택하면 이동의 효과가 난다. 
<div class="target" id="target1">
target 1
</div>
<div id="source">source</div>
<input type="button" value="append source to target 1" id="btn1" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#btn1').click(function(){
$('#target1').append($('#source'));
})
</script>

-문자열로 노드 제어
노드 변경 API에서는 여러 메소드를 이용해서 노드를 제어하는 방법에 대해서 알아봤다. 그런데 이 방식은 복잡하고 장황하다. 좀 더 편리하게 노드를 조작하는 방법을 알아보자.
innerHTML
innerHTML는 문자열로 자식 노드를 만들 수 있는 기능을 제공한다. 또한 자식 노드의 값을 읽어올 수 도 있다. 해당하는 엘리먼트의 하위 엘리먼트의 HTML코드를 알아올 수 있다. 또한 초기화 설정을 해주면 자식 노드를 만들 수도 있다.
<ul id="target">
<li>HTML</li>
<li>CSS</li>
</ul>
<input type="button" onclick="get();" value="get" />
<input type="button" onclick="set();" value="set" />
<script>
function get(){
var target = document.getElementById('target');
alert(target.innerHTML);
}
function set(){
var target = document.getElementById('target');
target.innerHTML = "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>";
}
</script>

outerHTML은 innerHTML과 똑같은데 하위뿐만 아니라 자기 자신까지 포함한 엘리먼트이다.
target을 포함한 ul까지 나오게 되는 것. 그래서 outer은 자식을 만들 때 자기 자신까지 포함되니까 아예 바꿔줄 수도 있는 것이다. 
HTML이라 태그나 텍스트가 모두 표현된 것이다. Text를 쓰면 말 그대로 text만 나오게 된다.
innerText, outerText과 다르게 이 API들은 값을 읽을 때는 HTML 코드를 제외한 문자열을 리턴하고, 값을 변경할 때는 HTML의 코드를 그대로 나타낸다.
<ul id="target">
<li>HTML</li>
<li>CSS</li>
</ul>
<input type="button" onclick="get();" value="get" />
<input type="button" onclick="set();" value="set" />
<script>
function get(){
var target = document.getElementById('target');
alert(target.innerText);
}
function set(){
var target = document.getElementById('target');
target.innerText = "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>";
}
</script>

insertAdjacentHTML()
좀 더 정교하게 문자열을 이용해서 노드를 변경하고 싶을 때 사용한다. 즉, 바깥의 앞에다 할 건지 뒤에다 할 건지 안의 앞에다 할 건지 뒤에다 할 건지.
첫 번째 인자는 위치에 해당하는 4개의 값 중 하나를 넣을 수 있고 그 위치에 넣을 태그를 두 번째 인자에 넣는다. 이런 API를 통해서 자신이 원하는 곳에 추가할 수 있다. 복잡한 DOM을 사용하지 않고 편리하게 문서를 변경가능.
<ul id="target">
<li>CSS</li>
</ul>
<input type="button" onclick="beforebegin();" value="beforebegin" />
<input type="button" onclick="afterbegin();" value="afterbegin" />
<input type="button" onclick="beforeend();" value="beforeend" />
<input type="button" onclick="afterend();" value="afterend" />
<script>
function beforebegin(){
var target = document.getElementById('target');
target.insertAdjacentHTML('beforebegin','<h1>Client Side</h1>');
}
function afterbegin(){
var target = document.getElementById('target');
target.insertAdjacentHTML('afterbegin','<li>HTML</li>');
}
function beforeend(){
var target = document.getElementById('target');
target.insertAdjacentHTML('beforeend','<li>JavaScript</li>');
}
function afterend(){
var target = document.getElementById('target');
target.insertAdjacentHTML('afterend','<h1>Server Side</h1>');
}
</script>

<Doucment 객체>
Document 객체는 DOM의 스팩이고 이 것이 웹 브라우저에서는 HTMLDocument 객체로 사용된다. HTMLDocument 객체는 문서 전체를 대표하는 객체라고 할 수 있다. 주요 역할은 엘리먼트나 노드를 생성하게 해주는 메소드를 갖고 있다는 것이다.. 문서에서 사용될 어떤 노드를 만들어주는 역할을 한다.
<script>
//document 객체는 window 객체의 소속이다.
console.log(window.document);
//document 객체의 자식으로는 Doctype과 html이 있다. 
console.log(window.document.childNodes[0]);
console.log(window.document.childNodes[1]);
</script>
노드 생성 API
document  객체의 주요 임무는 새로운 노드를 생성해주는 역할이다. 이에 대한 내용은 노드 변경 API에서 학습했기 때문에 여기서는 언급하지 않는다.
o	createElement()
o	createTextNode()
문서 정보 API
o	title // 그냥 document.title을 입력하면 그 문서의 타이틀이 나온다.
o	URL
o	referrer //어떤 사이트를 경유해서 왔는지 알려준다. 등등…
o	lastModified
Document 객체도 Node의 자식이므로 childNodes를 사용할 수 있다. document.childNodes[0]를 입력해보면 html을 만들 때 맨 위에 있는 doctype이 나온다. [1]을 입력하면 html 문서 전체가 나온다.

<Text 객체>
텍스트 객체는 텍스트 노드에 대한 DOM 객체로 CharacterData를 상속 받는다. CharactorData는 문서상에서는 드러나지 않는다. 아래는 텍스트 노드를 찾는 예제다. 주목할 것은 DOM에서는 공백이나 줄바꿈도 텍스트 노드라는 점이다.
가령 <p>생활코딩</p> 이라고 치면 태그 사이에 있는 생활코딩이 Text 객체이다. 중요한 건 공백이다.
<p id="target1"><span>Hello world</span></p>
<p id="target2">
<span>Hello world</span>
</p>
<script>
var t1 = document.getElementById('target1').firstChild;
var t2 = document.getElementById('target2').firstChild;
console.log(t1.firstChild.nodeValue);
try{
console.log(t2.firstChild.nodeValue); 
} catch(e){
console.log(e);
}
console.log(t2.nextSibling.firstChild.nodeValue);
</script>
위 코드에서 target1은 공백이 없어서 firstChild를 해주면 그대로 span이 나오게 된다. 또 firstChild를 해주면 Hello world가 나오게 된다.(t1.firstChild.firstChild)
그런데 target2는 공백이 있기 때문에 얘도 text노드라 firstChild를 하게되면 text가 떠버리게 된다.
즉, DOM에서는 공백조차도 어떤 객체에 맵핑되어있다는 것이다.
값
텍스트 노드의 값을 가져오는 API
o	data
o	nodeValue
조작
o	appendData()
o	deleteData()
o	insertData()
o	replaceData()
o	subStringData()
생성
o	docuemnt.createTextNode()

-값 API
텍스트 노드는 DOM에서 실질적인 데이터가 저장되는 객체이다. 따라서 텍스트 노드에는 값과 관련된 여러 기능들이 있는데 이번 시간에는 값을 가져오는 두개의 API를 알아본다.
o	nodeValue
o	data

<ul>
<li id="target">html</li> 
<li>css</li>
<li>JavaScript</li>
</ul>
<script>
var t = document.getElementById('target').firstChild;
console.log(t.nodeValue);
console.log(t.data);
</script>

t.nodeValue는 값을 조작할 수도 있는데 t.nodeVlaue = ”asdf” 이런 식으로 해주면 바꿔줄 수 있다.

-조작 API
텍스트 노드가 상속 받은 CharacterData 객체는 문자를 제어할 수 있는 다양한 API를 제공한다. 아래는 조작과 관련된 API들의 목록이다.
o	appendData()	// data.value이므로 데이터 소스의 value 즉 “JavaScript”를 뒤에 넣는다.
o	deleteData()	//start.value와 end.value를 5라고 지정하면 첫 글자, 0부터 시작해서 5글자에서 시작을 한다. 거기서부터 5글자까지 삭제!
o	insertData()	//얘는 start와 data를 받는데 그 start위치에 data를 넣는 것.
o	replaceData()	//얘는 start에서end까지의 데이터를 data로 바꾸는 것.
o	substringData()	//얘는 start에서 end까지 데이터를 alert해줌.

<!DOCTYPE html>
<html>
<head>
<style>
#target{
font-size:77px;
font-family: georgia;
border-bottom:1px solid black;
padding-bottom:10px;
}
p{
margin:5px;
}
</style>
</head>
<body>
<p id="target">Cording everybody!</p>
<p> data : <input type="text" id="datasource" value="JavaScript" /></p>
<p> start :<input type="text" id="start" value="5" /></p>
<p> end : <input type="text" id="end" value="5" /></p>
<p><input type="button" value="appendData(data)" onclick="callAppendData()" />
<input type="button" value="deleteData(start,end)" onclick="callDeleteData()" />
<input type="button" value="insertData(start,data)" onclick="callInsertData()" />
<input type="button" value="replaceData(start,end,data)" onclick="callReplaceData()" />
<input type="button" value="substringData(start,end)" onclick="callSubstringData()" /></p>
<script>
var target = document.getElementById('target').firstChild;
var data = document.getElementById('datasource');
var start = document.getElementById('start');
var end = document.getElementById('end');

function callAppendData(){
target.appendData(data.value);
}
function callDeleteData(){
target.deleteData(start.value, end.value);
}
function callInsertData(){
target.insertData(start.value, data.value); 
}
function callReplaceData(){
target.replaceData(start.value, end.value, data.value);
}
function callSubstringData(){
alert(target.substringData(start.value, end.value));
}
</script>
</body>
</html>

<문서의 기하학적 특성>
-요소의 크기와 위치
우선 엘리먼트의 크기를 알아내는 방법을 살펴보자.
<style>
body{
padding:0;
margin:0;
}
#target{
width:100px;
height:100px;
border:50px solid #1065e6;
padding:50px;
margin:50px;
}
</style>
<div id="target">
Coding
</div>
<script>
var t = document.getElementById('target');
console.log(t.getBoundingClientRect());
</script>

몇 픽셀 정도 떨어져있는지 알아보고 싶을 때 사용하는 API가 getBoundingClientRect이다.(width나 height값을 IE는 제공하지 않는다.) 
만약 엘리먼트가 중첩되어 있다면 어떻게 될까?
<style>
body{
padding:0;
margin:0;
}
div{
border:50px solid #1065e6;
padding:50px;
margin:50px;
}
#target{
width:100px;
height:100px;
}
</style>
<div>
<div id="target">
Coding
</div>
</div>
<script>
var t = document.getElementById('target');
console.log(t.getBoundingClientRect());
console.log(t.offsetParent);
</script>

즉 엘리먼트의 위치를 의미하는 top, right의 값을 통해서 기준이 그 부모가 아니라 body라는 것을 알 수 있다. 그리고 이를 명시적으로 확인할 수 있는 방법은 offsetParent 속성을 호출하는 것이다. 밑에 어떤 엘리먼트를 기준으로 삼았는지 나오게 된다. 만약 부모 중 CSS position의 값이 static인 td, th, table 엘리먼트가 있다면 이 엘리먼트가 offsetParent가 된다. 

-Viewport
요소의 위치를 생각할 때는 사실 조금 더 복잡해진다. 왜냐하면 문서가 브라우저의 크기보다 큰 경우는 스크롤이 만들어지는데 스크롤에 따라서 위치의 값이 달라지기 때문이다. 이를 이해하기 위해서는 우선 viewport에 대한 이해가 선행되어야 한다.
오른쪽의 그림처럼 뷰포트는 문서의 내용 중 사용자에게 보여주는 영역을 의미한다. 따라서 문서의 좌표가 있고 뷰포트의 좌표가 있다. 우리가 위에서 살펴본 getBoundingClientRect는 viewport의 좌표를 사용한다. 
아래 예제를 실행해보면 1초에 한 번씩 getBoundingClientRect의 top속성(y축의 값)과 window.pageYOffset의 값이 출력된다.
<style>
body{
padding:0;
margin:0;
}
div{
border:50px solid #1065e6;
padding:50px;
margin:50px;
}
#target{
width:100px;
height:2000px;
}
</style>
<div>
<div id="target">
Coding
</div>
</div>
<script>
var t = document.getElementById('target');
setInterval(function(){
console.log('getBoundingClientRect : ', t.getBoundingClientRect().top, 'pageYOffset:', window.pageYOffset);
}, 1000)
</script>

이를 통해서 알 수 있는 것은 getBoundingClientRect의 값이 스크롤에 따라서 달라지는 뷰포트의 좌표를 사용하고 있다는 것이다. 또한 스크롤의 정도를 알고 싶을 때는 pageYOffset을 사용하면 된다는 것도 알 수 있다. (40px만큼 움직였다. 스크롤로 보이지 않는 영역이 40px)
getBoundingClientRect()는 정확히 말하면 body에서 엘리먼트까지가 아니라 body에서 viewport까지의 거리인 것이다. getBoundingClientRect()과 pageYOffset의 값을 더하면 엘리먼트와 바디 사이의 값을 알 수 있다. 
-스크롤
그럼 문서의 스크롤 값을 변경하는 것은 어떻게 하는 것일까? scrollLeft와 scrollTop 프로퍼티를 이용하면 된다. scrollTo(x, y)가 바로 x와 y값이다.
<style>
body{
padding:0;
margin:0;
}
div{
border:50px solid #1065e6;
padding:50px;
margin:50px;
}
#target{
width:100px;
height:2000px;
}
</style>
<input type="button" id="scrollBtn" value="scroll(0, 1000)" />
<script>
document.getElementById('scrollBtn').addEventListener('click', function(){
window.scrollTo(0, 1000);
})
</script>
<div>
<div id="target">
Coding
</div>
</div>

-스크린의 크기
스크린의 크기는 모니터의 크기와 브라우저 뷰포트의 크기가 있다. 이를 알아내는 방법은 아래와 같다.
window.inner*은 뷰포트의 크기를 나타내고, screen.*은 스크린의 크기를 나타낸다.
<script>
console.log('window.innerWidth:', window.innerWidth, 'window.innerHeight:', window.innerHeight);
console.log('screen.width:', screen.width, 'screen.height:', screen.height);
</script>

<이벤트>
이벤트란 어떤 사건을 의미한다. 브라우저에서의 사건이란 사용자가 클릭했을 ‘때’, 스크롤을 했을 ‘때’, 필드의 내용을 바꾸었을 ‘때’와 같은 것을 의미한다.
onclick 속성의 자바스크립트 코드(alert(window.location))는 사용자가 이 버튼을 클릭 했을 '때' 실행된다. 즉 js 개발자는 어떤 일이 발생했을 때 실행 되어야 하는 코드를 등록하고, 브라우저는 그 일이 발생했을 때 등록된 코드를 실행하게 된다. 이러한 방식을 이벤트 프로그래밍이라고 한다.
<!DOCTYPE html>
<html>
<body>
<input type="button" onclick="alert(window.location)" value="alert(window.href)" />
<input type="button" onclick="window.open('bom.html')" value="window.open('bom.html')" />
</body>
</html>

event target
target은 이벤트가 일어날 객체를 의미한다. 아래 코드에서 타겟은 버튼 태그에 대한 객체가 된다.
<input type="button" onclick="alert(window.location)" value="alert(window.href)" />
event type
이벤트의 종류를 의미한다. 위의 예제에서는 click이 이벤트 타입이다. 그 외에도 scroll은 사용자가 스크롤을 움직였다는 이벤트이고, mousemove는 마우스가 움직였을 때 발생하는 이벤트이다. 말 그대로 ‘때’에 해당한다. 이벤트의 종류는 이미 약속되어 있다. 아래 링크는 브라우저에서 지원하는 이벤트의 종류를 보여준다. https://developer.mozilla.org/en-US/docs/Web/Reference/Events
event handler
이벤트가 발생했을 때 동작하는 코드를 의미한다. 위의 예제에서는 alert(window.location)이 여기에 해당한다.

이벤트 프로그래밍을 하기 위해서는 이벤트의 대상에 이벤트 핸들러를 등록해줘야 한다. 웹브라우저에서는 크게 3가지 종류의 등록방법을 제공하는데 하위 토픽에서 자세한 내용을 알아보겠다.
<등록방법>
-inline
인라인(inline) 방식으로 이벤트를 등록하는 방법을 알아보자. 인라인 방식은 이벤트를 이벤트 대상의 태그 속성으로 지정하는 것이다. 다음은 버튼을 클릭했을 때 Hello world를 경고창으로 출력한다.
<input type="button" onclick="alert('Hello world');" value="button" />
이벤트가 발생한 대상을 필요로 하는 경우 this를 통해서 참조할 수 있다. (자기 자신이라고 생각해라.)
<!--자기 자신을 참조하는 불편한 방법-->
<input type="button" id="target" onclick="alert('Hello world, '+document.getElementById('target').value);" value="button" />
<!--this를 통해서 간편하게 참조할 수 있다-->
<input type="button" onclick="alert('Hello world, '+this.value);" value="button" />

document.getElementById를 쓰면 길어서 불편하기도 하고 복사를 해서 쓸 경우에는 제대로 동작하지 않을 가능성이 있다. id는 하나의 값만 받으니까.
인라인 방식은 태그에 이벤트가 포함되기 때문에 이벤트의 소재를 파악하는 것이 편리하다. 하지만 정보인 HTML과 제어인 JavaScript가 혼재된 형태이기 때문에 바람직한 방법이라고 할 수는 없다. 

-프로퍼티 리스너 방식
프로퍼티 리스너 방식은 이벤트 대상에 해당하는 객체의 프로퍼티로 이벤트를 등록하는 방식이다. 인라인 방식에 비해서 HTML과 JavaScript를 분리할 수 있다는 점에서 선호되는 방식이지만 뒤에서 배울 addEventListener 방식을 추천한다. 
<input type="button" id="target" value="button" />
<script>
var t = document.getElementById('target');
t.onclick = function(){
alert('Hello world');
}
</script>
보면 onclick이 함수에 있다.
이벤트가 실행된 맥락의 정보가 필요할 때는 이벤트 객체를 사용한다. 이벤트 객체는 이벤트가 실행될 때 이벤트 핸들러의 인자로 전달하기로 약속되어 있다. 그래서 매개변수를 event라고 해야 다양한 정보를 얻을 수 있다. 버튼을 클릭하면 버튼에 해당되는 이벤트 핸들러가 호출되는데 그 때 인자로 event 객체를 전달하는 것이다. 그리고 event의 객체 안에 target이라는 프로퍼티가 있는데 이벤트가 호출된 시점에서 그 이벤트가 어디에서 발생한 것인지 알려주는 프로퍼티이다.
<body>
<input type="button" id="target" value="button" />
<script>
var t = document.getElementById('target');
t.onclick = function(event){
alert('Hello world, '+event.target.value)
}
</script>
그런데 e8 이하 버전에서는 이벤트 객체를 핸들러의 인자가 아니라 전역객체의 event 프로퍼티로 제공한다. 또한 target 프로퍼티도 지원하지 않는다. 아래는 이 문제를 해소하기 위한 코드다.
<input type="button" id="target" value="button" />
<script>
var t = document.getElementById('target');
t.onclick = function(event){
var event = event || window.event;
var target = event.target || event.srcElement;
alert('Hello world, '+target.value)
}
</script>
최신 웹브라우저의 크롬 같은 경우에는 console.dir(event)라고 쓰면 event 객체에 뭐가 있는지 나오게 되는데 오래된 웹 브라우저에는 나오지 않으니 console.dir(window.event)라고 써야된다. 아예 새로 생성해주는 방법도 있는데 event || window.event를 쓰면 된다. 이는 첫 번째 값이 없다면 뒤쪽에 있는 값을 사용하겠다는 뜻이다. 

-addEventListener()
addEventListener()은 이벤트를 등록하는 가장 권장되는 방식이다. 이 방식을 이용하면 여러 개의 이벤트 헨들러를 이용할 수 있다.
addEventListener()는 첫 번째 인자로 이벤트 타입을 받게 되어있고 두 번째 인자에는 전달한 이벤트 헨들러가 있게 된다. 이벤트 타입의 행동을 할 때 두 번째 인자에 있는 함수가 실행된다. 이는 프로퍼티 방식과 똑같이 작동한다. event 매개변수가 있다. 
<input type="button" id="target" value="button" />
<script>
var t = document.getElementById('target');
t.addEventListener('click', function(event){
alert('Hello world, '+event.target.value);
});
</script>

이 방식은 ie8이하에서는 호환되지 않는다. ie에서는 attachEvent 메소드를 사용해야 한다. 똑 같은 기능인데 이름이 다르다. addEventListener이거나 attachEvent이다. attach에는 on을 붙여줘야한다. onclick. 이렇게 호환되지 않는 걸 방지하기 위해 if, else를 써주는데 현재는 라이브러리를 쓰면 다 알아서 해준다.
var t = document.getElementById('target');
if(t.addEventListener){
t.addEventListener('click', function(event){
alert('Hello world, '+event.target.value);
}); 
} else if(t.attachEvent){
t.attachEvent('onclick', function(event){
alert('Hello world, '+event.target.value);
})
}

이 방식의 중요한 장점은 하나의 이벤트 대상에 복수의 동일 이벤트 타입 리스너를 등록할 수 있다는 점이다. 전 강의 코드에서 onclick을 복사해서 두 번 썼다면 첫 번째에 있는 메소드는 사라지는데 그 이유는 다른 건 단 하나의 이벤트 헨들러만 가능했기 때문이다. 하지만 addEventListener는 이벤트를 여러 개 추가해도 된다. 순차적으로 실행된다.
<input type="button" id="target" value="button" />
<script>
var t = document.getElementById('target');
t.addEventListener('click', function(event){
alert(1);
});
t.addEventListener('click', function(event){
alert(2);
});
</script>

그리고 또한 이벤트 객체를 이용하면 복수의 엘리먼트에 하나의 리스너를 등록해서 재사용할 수 있다. event.targer.id를 하면 어디서 호출된 것인지 알 수 있다.
<input type="button" id="target1" value="button1" />
<input type="button" id="target2" value="button2" />
<script>
var t1 = document.getElementById('target1');
var t2 = document.getElementById('target2');

function btn_listener(event){
switch(event.target.id){
case 'target1':
alert(1);
break;
case 'target2':
alert(2);
break;
}
}
t1.addEventListener('click', btn_listener);
t2.addEventListener('click', btn_listener);
</script>

t1.addEventListener('click', btn_listener); 이 부분에 두 번째 인자에 btn_listener가 그대로 온 것은 두 번째 인자에 함수 객체가 와야하기 때문이다. btn_listener()가 오면 그 결과값이 와버리기 때문에 함수의 실행결과를 개대로 옮기는 셈이 되버린다. 

-이벤트 전파(버블링과 캡처링)
HTML 태그는 중첩되어 있다.(html안에 body안에 div안에…등등) 따라서 특정한 태그에서 발생하는 이벤트는 중첩되어 있는 태그들 모두가 대상이 될 수 있다. 이런 경우 중첩된 태그들에 이벤트가 등록되어 있다면 어떻게 처리 될까?
간단하게 말하자면 가장 상위 부모로부터 이벤트가 실행되어 나가는 것을 캡쳐링이라고 하고 가장 깊숙한 곳, 즉, 자식에서 부모로 이벤트가 실행되어 나가는 것을 버블링이라고 한다.

<html>
<head>
<style>
html{border:5px solid red;padding:30px;}
body{border:5px solid green;padding:30px;}
fieldset{border:5px solid blue;padding:30px;}
input{border:5px solid black;padding:30px;}
</style>
</head>
<body>
<fieldset>
<legend>event propagation</legend>
<input type="button" id="target" value="target"> 
</fieldset>
<script>

function handler(event){
var phases = ['capturing', 'target', 'bubbling']
console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
}
document.getElementById('target').addEventListener('click', handler, true);
document.querySelector('fieldset').addEventListener('click', handler, true);
document.querySelector('body').addEventListener('click', handler, true);
document.querySelector('html').addEventListener('click', handler, true);
</script>
</body>
</html>

위 코드는 이벤트가 부모에서부터 발생해 자식으로 전파되고 있는 것이다. 이러한 방식을 capturing이라고 한다. ie 낮은  버전에서는 작동하지 않기 떄문에 많이 사용하지는 않는다. 
handler 함수를 보면 phases에 배열을 저장하고 있는데 이는 이벤트가 버블링인지 캡쳐링인지 알아보기 쉽게 해준 것이고 console.log를 보자. event.target.nodeName은 언제나 input을 가리킨다. 클릭한 지점을 나타내니까. 그 뒤에 this.nodeName은 this를 통해서 접근하는 것은 이벤트 핸들러가 호출된 엘리먼트를 의미하게 된다. 즉, 현재 실행되고 있는 이벤트 핸들러가 어떤 소속인지 알려주는 것! 세 번째 인자는 event.eventPhase가 버블이면 어떤 상수, 캡쳐링이면 어떤 상수처럼 어떤 숫자를 의미하는데 그 의미한대로 출력되기 위해서 해놓은 값이다. 
그리고 addEventListener를 보면 세 번째 인자에 true라고 되어 있는데 true라고 하면 캡쳐링이 되고 false라고 하거나 아예 안 쓰면 버블링이 된다. 버블링은 모든 브라우저에서 쓰기 때문에 많이 쓰인다.
그럼 어디까지만 전파를 할 수 있게끔 가로막을 수는 없을까? 그 방법도 따로 있다.
function handler(event){
var phases = ['capturing', 'target', 'bubbling']
console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
}
function stophandler(event){
var phases = ['capturing', 'target', 'bubbling']
console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
event.stopPropagation();
}
document.getElementById('target').addEventListener('click', handler, false);
document.querySelector('fieldset').addEventListener('click', handler, false);
document.querySelector('body').addEventListener('click', stophandler, false);
document.querySelector('html').addEventListener('click', handler, false);

이벤트 핸들러 까지만 호출하고 이벤트 전파가 되지 않도록 하는 방법은 event.stopPropagation(); 를 써주면 된다. 이벤트 객체가 가지고 있는 메소드 중에서. stopPropagation이라는 메소드가 있는데 이 메소드를 사용하면 거기에서 전파가 끊긴다. body에 사용하면 전파가 html까지 안 간다. 

-기본 동작의 취소
웹브라우저의 구성요소들은 각각 기본적인 동작 방법을 가지고 있다.
o	텍스트 필드에 포커스를 준 상태에서 키보드를 입력하면 텍스트가 입력된다.
o	폼에서 submit 버튼을 누르면 데이터가 전송된다.
o	a 태그를 클릭하면 href 속성의 URL로 이동한다.
이러한 기본적인 동작들을 기본 이벤트라고 하는데 사용자가 만든 이벤트를 이용해서 이러한 기본 동작을 취소할 수 있다.
inline은 이벤트의 리턴 값이 false이면 기본 동작이 취소된다. if안에 .checked로 true면 false를 실행한다.
<p>
<label>prevent event on</label><input id="prevent" type="checkbox" name="eventprevent" value="on" />
</p>
<p>
<a href="http://opentutorials.org" onclick="if(document.getElementById('prevent').checked) return false;">opentutorials</a>
</p>
<p>
<form action="http://opentutorials.org" onsubmit="if(document.getElementById('prevent').checked) return false;">
<input type="submit" />
</form>
</p>

property 방식은 inline과 마찬가지로 리턴 값이 false이면 기본 동작이 취소된다.
<p>
<label>prevent event on</label><input id="prevent" type="checkbox" name="eventprevent" value="on" />
</p>
<p>
<a href="http://opentutorials.org">opentutorials</a>
</p>
<p>
<form action="http://opentutorials.org">
<input type="submit" />
</form>
</p>
<script>
document.querySelector('a').onclick = function(event){
if(document.getElementById('prevent').checked)
return false;
};
document.querySelector('form').onclick = function(event){
if(document.getElementById('prevent').checked)
return false;
};
</script>
addEventListener 방식은 조금 다르다. 이벤트 객체의 preventDefalut메소드를 실행해야 기본 동작이 취소 된다. (ie9 이하 버전에서는 event.returnValue를 false를 지정해야 한다.) 
<p>
<label>prevent event on</label><input id="prevent" type="checkbox" name="eventprevent" value="on" />
</p>
<p>
<a href="http://opentutorials.org">opentutorials</a>
</p>
<p>
<form action="http://opentutorials.org">
<input type="submit" />
</form>
</p>
<script>
document.querySelector('a').addEventListener('click', function(event){
if(document.getElementById('prevent').checked)
event.preventDefault();
});
document.querySelector('form').addEventListener('submit', function(event){
if(document.getElementById('prevent').checked)
event.preventDefault();
});
</script>

<이벤트 타입>
아래는 onclick 이벤트 타입의 예제다. 이벤트 타입이라는 것은 이벤트의 종류라고 할 수 있다.
<input type="button" onclick="alert(1);" />
웹브라우저는 많은 종류의 이벤트 타입을 제공한다. 하위 토픽에서는 주요한 이벤트 타입을 중심으로 어떤 이벤트 타입이 있는지 알아보겠다.

-폼
폼과 관련된 이벤트 타입을 알아보자.
submit
submit은 폼의 정보를 서버로 전송하는 명령인 submit시에 일어난다. form 태그에 적용된다. 아래 예제는 전송 전에 텍스트 필드에 값이 입력 되었는지를 확인한다. 만약 값이 입력되지 않았다면 전송을 중단한다. addEventListener의 첫 번째 인자에 submit이 들어간다. 동작취소는 전에 배웠던 거.
<form id="target" action="result.html">
<label for="name">name</label> <input id="name" type="name" />
<input type="submit" />
</form>
<script>
var t = document.getElementById('target');
t.addEventListener('submit', function(event){
if(document.getElementById('name').value.length === 0){
alert('Name 필드의 값이 누락 되었습니다');
event.preventDefault();
}
});
</script>

change
change는 폼 컨트롤의 값이 변경되었을 때 발생하는 이벤트다. input(text,radio,checkbox), textarea, select 태그에 적용된다. 입력을 다 끝내고 포커스를 빠져나왔을 때. change가 적용된다.
<p id="result"></p>
<input id="target" type="name" />
<script>
var t = document.getElementById('target');
t.addEventListener('change', function(event){
document.getElementById('result').innerHTML=event.target.value;
});
</script>

blur, focus
focus는 엘리먼트에 포커스가 생겼을 때, blur은 포커스가 사라졌을 때 발생하는 이벤트다. 포커스가 생기면 폼 주변이 옅은 파란색으로 변한다. 다음 태그를 제외한 모든 태그에서 발생한다. <base>, <bdo>, <br>, <head>, <html>, <iframe>, <meta>, <param>, <script>, <style>, <title> 
<input id="target" type="name" />
<script>
var t = document.getElementById('target');
t.addEventListener('blur', function(event){
alert('blur'); 
});
t.addEventListener('focus', function(event){
alert('focus'); 
});
</script>

-문서로딩
<html>
<head>
<script>
var t = document.getElementById('target');
console.log(t);
</script>
</head>
<body>
<p id="target">Hello</p>
</body>
</html>
위 코드는 실행이 될까? 실행결과는 null이다. 왜냐하면 <p id="target">Hello</p>가 로딩되기 전에 자바스크립트가 실행되었기 때문이다. id를 찾아야되는데 id가 없으니까. 이를 해결하기 위해서 body태그 맨 밑에 script태그를 넣는 방법이 있는데 이 방법 말고도 다른 방법이 있다.
웹 페이지를 프로그래밍적으로 제어하기 위해서는 웹페이지의 모든 요소에 대한 처리가 끝나야 한다. 이것을 알려주는 이벤트가 load, DOMContentLoaded이다.
window.onload와 같은 방법이 load 이벤트이다.
<head>
<script>
window.addEventListener('load', function(){
var t = document.getElementById('target');
console.log(t);
})
</script>
</head>
<body>
<p id="target">Hello</p>
</body>
load이벤트를 써주고 뒤에 그 함수를 집어넣어준다. load 이벤트는 문서내의 모든 리소스(이미지, 스크립트)의 다운로드가 끝난 후에 실행된다. 이것을 에플리케이션의 구동이 너무 지연되는 부작용을 초래할 수 있다.
그에 대한 또 다른 방법이 있는데 뭐냐면 바로 DOMConetentLoaded이다. 엘리먼트 자체에 대한 화면의 처리가 끝난 다음에 발생하는 이벤트다. DOMContentLoaded는 문서에서 스크립트 작업을 할 수 있을 때 실행되기 때문에 이미지 다운로드를 기다릴 필요가 없다 (얘는 IE9 이후부터 가능하다)
<html>
<head>
<script>
window.addEventListener('load', function(){
console.log('load');
})
window.addEventListener('DOMContentLoaded', function(){
console.log('DOMContentLoaded');
})
</script>
</head>
<body>
<p id="target">Hello</p>
</body>
</html>

-마우스
이벤트 타입
웹 브라우저는 마우스와 관련해서 다양한 이벤트 타입을 지원한다.
o	click
클릭했을 때 발생하는 이벤트. 
o	dblclick
더블클릭을 했을 때 발생하는 이벤트
o	mousedown
마우스를 누를 때 발생
o	mouseup
마우스버튼을 땔 때 발생
o	mousemove
마우스를 움직일 때
o	mouseover
마우스가 엘리먼트에 진입할 때 발생
o	mouseout
마우스가 엘리먼트에서 빠져나갈 때 발생
o	contextmenu
컨텍스트 메뉴가 실행될 때 발생

키보드 조합
마우스 이벤트가 호출될 때 특수키(alt, ctrl, shift)가 눌려진 상태를 감지해야 한다면 이벤트 객체의 프로퍼티를 사용한다. 이 때 사용하는 프로퍼티는 아래와 같다.
o	event.shiftKey
o	event.altKey
o	event.ctrlKey

마우스 포인터 위치
마우스 이벤트와 관련한 작업에서는 마우스 포인터의 위치를 알아내는 것이 중요할 때가 있는데 이런 경우 이벤트 객체의 clientX와 clientY를 사용한다.

<html>
<head>
<style>
body{
background-color: black;
color:white;
}
#target{
width:200px;
height:200px;
background-color: green;
margin:10px;
}
table{
border-collapse: collapse;
margin:10px;
float: left;
width:200px;
}
td, th{
padding:10px;
border:1px solid gray;
}
</style>
</head>
<body>
<div id="target">
</div>
<table>
<tr>
<th>event type</th>
<th>info</th>
</tr>
<tr>
<td>click</td>
<td id="elmclick"></td>
</tr> 
<tr>
<td>dblclick</td>
<td id="elmdblclick"></td>
</tr>
<tr>
<td>mousedown</td>
<td id="elmmousedown"></td>
</tr> 
<tr>
<td>mouseup</td>
<td id="elmmouseup"></td>
</tr> 
<tr>
<td>mousemove</td>
<td id="elmmousemove"></td>
</tr> 
<tr>
<td>mouseover</td>
<td id="elmmouseover"></td>
</tr> 
<tr>
<td>mouseout</td>
<td id="elmmouseout"></td>
</tr>
<tr>
<td>contextmenu</td>
<td id="elmcontextmenu"></td>
</tr> 
</table>
<table>
<tr>
<th>key</th>
<th>info</th>
</tr>
<tr>
<td>event.altKey</td>
<td id="elmaltkey"></td>
</tr>
<tr>
<td>event.ctrlKey</td>
<td id="elmctrlkey"></td>
</tr>
<tr>
<td>event.shiftKey</td>
<td id="elmshiftKey"></td>
</tr>
</table>
<table>
<tr>
<th>position</th>
<th>info</th>
</tr>
<tr>
<td>event.clientX</td>
<td id="elemclientx"></td>
</tr>
<tr>
<td>event.clientY</td>
<td id="elemclienty"></td>
</tr>
</table>
<script>
var t = document.getElementById('target');	//target은 녹색 정사각형
function handler(event){
//elm 뒤에 event.type은 이벤트 핸들러가 호출됐을 때 어떤 이벤트타입인지 말해준다. 예를 들어 밑에 addEventListener에 나와있는 click이나 mousedown등등..근데 elm이 붙어있으니 그게 위의 id값
var info = document.getElementById('elm'+event.type);
var time = new Date();		//시간객체를 만들고 getMilli로 1000분의 1초를 파악.
var timestr = time.getMilliseconds();
info.innerHTML = (timestr); //그 해당하는 객체로 가서 자식으로 시간을 넣어준다.

if(event.altKey){ 	//키보드 타입! //true로 나오면 실행.
document.getElementById('elmaltkey').innerHTML = timestr;
}
if(event.ctrlKey){
document.getElementById('elmctrlkey').innerHTML = timestr;
}
if(event.shiftKey){
document.getElementById('elmshiftKey').innerHTML = timestr;
}
document.getElementById('elemclientx').innerHTML = event.clientX;
document.getElementById('elemclienty').innerHTML = event.clientY;
}
t.addEventListener('click', handler);
t.addEventListener('dblclick', handler);
t.addEventListener('mousedown', handler);
t.addEventListener('mouseup', handler);
t.addEventListener('mousemove', handler);	//움직일 때마다 이벤트 핸들러가 작동
t.addEventListener('mouseover', handler);
t.addEventListener('mouseout', handler);
t.addEventListener('contextmenu', handler);
</script>
</body>
</html>

<jQuery 이벤트>
jQuery는 이벤트와 관련해서 편리한 기능을 제공한다.  아래 예제는 직접 이벤트 프로그래밍을 하는 것과 jQuery를 이용하는 것의 차이점을 보여준다. 일단 코드 분량부터 차이가 난다. 순수하게 코딩하면 웹 브라우저의 호환성에 따라 기능테스트 코드까지 들어가게 되는데  jQuery는 크로스 브라우징을 알아서 처리해주고, 이벤트를 보다 적은 코드로 구현할 수 있도록 해준다.
<input type="button" id="pure" value="pure" />
<input type="button" id="jquery" value="jQuery" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
// 순수하게 구현했을 때
var target = document.getElementById('pure');
if(target.addEventListener){
target.addEventListener('click', function(event){
alert('pure');
});
} else {
target.attachEvent('onclick', function(event){
alert('pure');
});
}
// jQuery를 사용했을 때
//id가 jquery인 것을 사용하고 on은 jquery의 API로 내부적으로 어떤 브라우저인지에 따라서 적당한 이벤트 핸들러를 사용하도록 되어있다. 
$('#jquery').on('click', function(event){
alert('jQuery');
})
</script>

-on API 사용법
기본사용법
on은 jQuery에서 가장 중요한 이벤트 API이다. on API를 통해서 jQuery에서 이벤트를 다루는 방법을 알아보자. on의 기본적인 문법은 아래와 같다. ([]는 생략 가능하다.)
.on( events [, selector ] [, data ], handler(eventObject) )
o	event : 등록하고자 하는 이벤트 타입을 지정한다. (예: "click")
o	selector : 이벤트가 설치된 엘리먼트의 하위 엘리먼트를 이벤트 대상으로 필터링함
o	data : 이벤트가 실행될 때 핸들러로 전달될 데이터를 설정함
o	handler : 이벤트 핸들러 함수

selector
selector 파라미터는 이벤트 대상을 필터링한다. 개발자가 ul에 이벤트를 담기는 했으나 a나 li 태그에 이벤트 핸들러를 주고 싶은 경우에 쓴다. 여기서 this의 의미는 a, li다. 즉, 사용자가 ul을 클릭했을 때가 아닌 a, li 태그를 클릭했을 때 이벤트가 발생한다. 주의 할 것은 ul 엘리먼트는 이벤트가 발생하지 않는다는 점이다. 이것은 jQuery에서 이벤트 버블링을 구현하는 방법이기도 하다.
late binding
jQuery는 존재하지 않는 엘리먼트에도 이벤트를 등록할 수 있는 놀라운 기능을 제공한다. 아래 코드를 보자
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('ul').on('click','a, li', function(event){
console.log(this.tagName);
})
</script>
<ul>
<li><a href="#">HTML</a></li>
<li><a href="#">CSS</a></li>
<li><a href="#">JavaScript</a></li>
</ul>

위의 코드는 실행되지 않는다. ul 엘리먼트가 존재하지 않을 때 이벤트 설치를 시도하고 있기 때문이다. 존재하지 않는 엘리먼트에 이벤트를 달 수 없다는 것은 이미 배운 바가 있다. 그런데 jQuery는 존재하지 않는 엘리먼트에게도 이벤트를 설치할 수 있다. 
바로 ul을 body로 바꾸면 body 엘리먼트에 대해서 이벤트를 설치하는 것이기 때문에 HTML코드가 뒤에 나오더라도 이벤트 설치가 가능하다.  
다중 바인딩 (정식 명칭아님.)
하나의 엘리먼트에 여러 개의 이벤트 타입을 동시에 등록하는 방법을 알아보자.
방법1 : 이벤트 타입을 주는 곳에 공백을 주면 두 개의 이벤트 타입이 동일한 이벤트 핸들러를 쓸 수 있다.
<input type="text" id="target" />
<p id="status"></p>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#target').on('focus blur', function(e){
//html이라는 함수를 호출하는데 그 인자로 이벤트 객체의 타입이라는 프로퍼티를 준다.(자세히 안 알려줌…)
$('#status').html(e.type);
})
</script>
방법2 : on에 그냥 객체를 주는 방법도 있다.
<script>
var handler = function(e){$(‘#status’.html(e.type);}
$('#target').on({
'focus' : handler, 
'blur' : handler
})
</script>

방법3 : 체이닝 방법도 쓸 수 있다.
var handler = function(e){$(‘#status’.html(e.type);}
$('#target').on('focus' : handler).on(‘blur’ : handler);

이벤트 제거
이벤트를 제거할 때는 off를 사용한다. .off(‘focus’);만 쓸 수도 있는데 이렇게 하면 focus를 여러 번 썼던 게 모두 제거된다. 그렇다면 내가 원하는 건 되고 원하지 않는 건 안 되게 하려면? 내가 삭제하려고 하는 focus쪽에 함수까지 붙이면 된다.
<input type="text" id="target"></textarea>
<input id="remove" type="button" value="remove" />
<p id="status"></p>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
var handler = function(e){
$('#status').text(e.type+Math.random());
};
$('#target').on('focus blur', handler)
$('#remove').on('click' , function(e){
//뒤에 함수를 붙이면 그 것만 이벤트가 삭제된다.
$('#target').off('focus’, handler);
//$('#target').off('focus’); 얘는 focus는 다 삭제

})
</script>

<네트워크 통신>
본 토픽의 하위 토픽에서는 자바스크립트를 이용해서 웹브라우저의 통신 기능을 사용하는 방법을 알아본다. 이 중에서 서버와 클라이언트 간의 데이터를 주고 받는 형식으로서 JSON과 페이지 리로드 없이 웹페이지의 내용을 변경할 수 있는 Ajax는 웹에플리케이션을 구축하는데 중요한 내용이기 때문에 주의해서 학습하자.

<Ajax>
웹브라우저는 대단히 정적인 시스템이었다. 내용이 바뀌면 페이지 새로고침을 해서 내용을 새롭게 변경해야 했다. 이것은 웹이 전자 문서를 염두에 두고 고안된 시스템이기 때문에 당연하게 생각 되었다. 
그러다 Ajax 개념이 도입되면서 모든 것이 바뀌었다. Ajax는 웹브라우저와 웹서버가 내부적으로 데이터 통신을 하게 된다. 그리고 변경된 결과를 웹페이지에 프로그래밍적으로 반영함으로써 웹페이지의 로딩 없이 서비스를 사용할 수 있게 한다. 
Ajax는 Asynchronous JavaScript and XML의 약자다. 한국어로는 비동기적 자바스크립트와 XML 정도로 직역할 수 있는데 자바스크립트를 이용해서 비동기적으로 서버와 브라우저가 데이터를 주고 받는 방식을 의미한다. 이 때 사용하는 API가 XMLHttpRequest이다. 그렇다고 꼭 XML을 사용해서 통신해야 하는 것은 아니다. XML은 대표성이 있는 표현이 아니고 사실 XML 보다는 JSON을 더 많이 사용한다. (비동기란 서버랑 통신을 하면서 데이터를 가져오는 동안 시간이 많이 걸린다고 하더라도 다른 일을 할 수 있게 해주는 것이다. 동기적인 것은 내가 메뉴 바를 눌렀을 때 그 웹페이지를 구성하는 동안 네트워크 지연이 발생하고 그 동안은 아무런 일도 하지 못하고 기다려야 하는 것을 의미한다.)
IE5,6 에서는 XMLHttpRequest 객체 대신 ActiveXObject("Msxml2.XMLHTTP.6.0")을 사용해야 한다. 여기서는 다루지 않는다

XMLHttpRequest
본 예제를 실행하기 위해서는 서버 환경이 구축 되어 있어야 한다. 서버 구축에 대한 설명은 우리 수업의 범위를 넘어서기 때문에 여기서는 언급하지 않는다. 하지만 학습하는데는 큰 문제가 없다. 중요한 주제이기 때문에 꼭 학습하기 바란다.
이 때 사용하는 API가 XMLHttpRequest이다. 다음 예제를 보자.
time.php 아래 코드는 현재 시간을 출력한다.
<?php
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone("asia/seoul"));
echo $d1->format('H:i:s');
?>

demo1.html 아래 코드는 time.php에 접속해서 현재 시간을 페이지에 표시한다. demo1.html의 execute 버튼을 누르면 demo1.html이 time1.php로 가서 시간 정보를 가져와서 출력한다. 자바스크립트에서 만든 정보가 아니고 php에 있는 정보를 가져온다. 
<p>time : <span id="time"></span></p>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
var xhr = new XMLHttpRequest();
xhr.open('GET', './time.php');
xhr.onreadystatechange = function(){
if(xhr.readyState === 4 && xhr.status === 200){
document.querySelector('#time').innerHTML = xhr.responseText;
}
}
xhr.send(); 
}); 
</script> 

코드를 천천히 분석해보자. 일단 알아야할 것은 xhr.open을 먼저하고 xhr.send를 해야된다.
var xhr = new XMLHttpRequest(); // XMLHttpRequest() 객체를 생성한다. (인스턴스를 xhr에 넣는다.)
xhr.open('GET', './time.php'); //접속하려는 대상을 지정한다. 첫 번째 인자는 form 태그에 method에 대응하는 것으로 GET/POST 방식을 주로 사용한다. 두 번째 인자는 접속하고자 하는 서버쪽 리소스의 주소로 form태그의 action에 해당한다. (./time.php로 스트림을 주는 것) (form에서 submit과 비슷한데 submit을 쓰면 페이지가 리로드되기 때문에 안 쓴다. 얠 개선한 게 ajax)
xhr.onreadystatechange = function(){
if(xhr.readyState === 4 && xhr.status === 200){
document.querySelector('#time').innerHTML = xhr.responseText;
}
}
xhr.send()하게 되면 xhr객체가 그 방식으로 통신을 시작하게 된다. 통신과정중(응답하고 있다, 응답하는 중이다등등)에 단계가 존재하는데 그 단계마다 onreadystatechange가 호출된다. 그리고 xhr객체 중에 readyState프로퍼티가 있는데 얘는 통신의 현재 상태를 알려준다.지금 응답하는 중이다. 응답이 완료됐다 등등...) 이 값이 4면 모든 통신이 끝났다라는 것을 의미한다. 즉, 4면 통신이 끝났을 때 이벤트 핸들러가 실행되는 것이다. xhr.status은 커뮤니케이션의 결과를 의미하는데 200은 성공한 것을 의미한다. (404는 요청한 리소스가 존재하지 않는다는 뜻이다.) 즉, 통신이 완료됐고 통신이 성공했으면 실행하는 if문! 그리고나서는 time인 엘리먼트에 자식으로 서버에서 가져온 정보를 넣는다. XMLHttpRequest에 있는 responseText는 서버에서 리턴해준 정보를 담고있는 프로퍼티이다.

POST방식
POST 방식으로 데이터를 전송하는 방법을 알아보자. 아래 예제는 시간대와 시간의 출력 형식을 지정하는 예제다.
<p>time : <span id="time"></span></p>
<select id="timezone">
<option value="Asia/Seoul">asia/seoul</option>
<option value="America/New_York">America/New_York</option>
</select>
<select id="format">
<option value="Y-m-d H:i:s">Y-m-d H:i:s</option>
<option value="Y-m-d">Y-m-d</option>
</select>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
var xhr = new XMLHttpRequest();
xhr.open('POST', './time2.php');
xhr.onreadystatechange = function(){
document.querySelector('#time').innerHTML = xhr.responseText;
}
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var data = '';
data += 'timezone='+document.getElementById('timezone').value;
data += '&format='+document.getElementById('format').value;
xhr.send(data); 
});
</script> 
위 코드를 잘 보면 데이터 전송방법을 GET에서 POST로 변경했다. 그리고 서버로 전송할 데이터 타입의 형식(MIME)를 지정한다.
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
여기서 setRequestHeader()를 써서 내용의 타입을 지정해줘야 한다. Content-Type을  application/x-www-form-urlencoded로 지정하게 되면 전송하는 데이터가 마치 html의 form을 통해서 전달된 것처럼 서버에서는 인식하게 된다. 
그리고 서버로 전송할 데이터를 형식에 맞게 만들어야 한다. 이름=값&이름=값... 의 형식을 지켜야 한다. 값과 값을 구분할 때는 &을 써줘야 되고 값의 이름과 값의 내용을 구분해줄 때는 =을 쓴다.
var data = '';
data += 'timezone='+document.getElementById('timezone').value;
data += '&format='+document.getElementById('format').value;

그리고 나서 xhr.send(data);로 데이터를 전달한다.
time2.php 아래는 Ajax를 이용해서 전송한 데이터를 받아서 현재 시간을 출력해주는 서버 쪽 구현이다.
<?php
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone($_POST['timezone']));
echo $d1->format($_POST['format']);
?>

php에서는 시간를 위한 객체를 만들고 타임존을 만드는데 여기에는 설정한 asia/seoul이 들어간다. 그래서 php는 서울의 시간대에 맞게 출력하게 된다.

<JSON>
JSON이란JavaScript Object Notation의 약자로 JavaScript에서 객체를 만들 때 사용하는 표현식을 의미한다. 이 표현식은 사람도 이해하기 쉽고 기계도 이해하기 쉬우면서 데이터의 용량이 작다. 이런 이유로 최근에는 JSON이 XML을 대체해서 설정의 저장이나 데이터를 전송등에 많이 사용된다. JSON에 대한 자세한 내용은 아래 JSON의 공식홈페이지를 참조한다. http://www.json.org/json-ko.html
객체라고 하는 것은 중가로로 시작해서 중가로로 끝나야 한다. 그리고 ,와 :로 key와 value를 구분한다. 배열도 대가로로 시작해서 대가로로 끝나고 콤마로 구분을 한다. 이건 자바스크립트의 방식이라 다른 곳에서 쓸 수는 없다. 다른 언어와 같이 연동할 수 있는 방법이 없어 매우 불편한데 이러한 불편함을 해소하기 위해서 표준이 만들어 진 것이 JSON이다. (ECMAscript 5에는 JSON을 공식적으로 지원하는 API가 포함되었다. )
아래 코드는 객체를 만들어서 ''을 찍어 문자열로 만들어준 후에 info라는 변수에 담은 것인데 문자열의 내용은 JSON구문이다. \는 줄바꿈때문에 넣어준 것이다.
var info = '{font_face : "inconsolata" \ "font_size" : 30} '
아래 코드는 infoobj라는 변수에 JSON이라는 객체의 parse라는 메소드 안에 아까 만들었던 info라는 문자열을 넣는 것이다. 가져온 내용은 문자인데 json이라는 객체의 parse라는 메소드로 실행하게 되면 매개변수로 받은 것을 얘의 리턴값은 실제로 자바스크립트의 객체로 들어가고 그 객체를 프로그래밍적으로 제어할 수 있게 된다. (개발자 도구에 infoobj를 쳐보면 객체가 나온다.)
var infoobj = JSON.parse(info)
자 이제 반대로 아래 코드를 실행해보자. JSON.stringify는 인자로 전달된 객체를 JSON 포맷으로 변경한 텍스트를 리턴한다. (infostr를 하게되면 아까처럼 문자열이 나온다.)
var infostr = JSON.stringify(infoobj); 
중요한 것은 JSON 객체에는 parse와 stringify라는 메소드가 있는데 parse의 인자로 전달한 값은 자바스크립트의 객체로 만들어주고 stingify의 인자로 전달한 값은 객체를 JSON 포맷에 맞는 텍스트로 바꿔준다는 것이다.
JSON.parse()
인자로 전달된 문자열을 자바스크립트의 데이터로 변환한다.
JSON.stringify()
인자로 전달된 자바스크립트의 데이터를 문자열로 변환한다

만약 JSON이 없다면 어떤 일이 벌어질까?
JSON의 진가는 서버와 통신을 할 때 드러난다. Ajax 수업의 내용을 조금 개조해서 타임라인의 항목을 리스트로 표현하는 에플리케이션을 만들어보자. 우선 서버 쪽에서는 타임라인의 리스트를 콤마로 구분해서 전달한다.
time.php
<?php
$timezones = ["Asia/Seoul", "America/New_York"];
echo implode(',', $timezones);
?>
위 코드에서 timezones라는 변수에 배열을 넣었는데 implode라는 메소드를 통해서 하나의 문자로 만들고 있다. implode는 두 개의 인자를 갖는다. 첫 번째 인자로 구분된 곳을 메꿔줘서 배열의 원소들을 묶어 하나의 문자열로 만들어주는 것이다.(첫 번째 인자가 '-'이면 "Asia/Seoul-America/New_York"이 된다.) 하나의 텍스트로 만든다.
자, 이제 클라이언트쪽에서 이를 받아 처리한다.
demo2.html
<p id="timezones"></p>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
var xhr = new XMLHttpRequest();
xhr.open('GET', './time.php');
xhr.onreadystatechange = function(){
if(xhr.readyState === 4 && xhr.status === 200){
var _tzs = xhr.responseText;
var tzs = _tzs.split(',');
var _str = '';
for(var i = 0; i< tzs.length; i++){
_str += '<li>'+tzs[i]+'</li>';
}
_str = '<ul>'+_str+'</ul>';
document.querySelector('#timezones').innerHTML = _str;
}
}
xhr.send(); 
}); 
</script>
주목해야할 부분은 아래 코드다.
var _tzs = xhr.responseText;
var tzs = _tzs.split(',');
var _str = '';
통신이 완료된 텍스트를 받아 _tzs 변수에 넣고 그 문자열 객체를 split메소드에 실행하면 인자의 값을 기준으로 문자를 잘라서 배열로 만든다. 서버에서 전송한 Asia/Seoul,America/New_York를 split(',')하면 배열 ['Aasia/Seoul','America/New_York']가 만들어진다. 그 다음에 태그 안에 넣어서 문자열로 넣고 표현하면 된다. 아따 복잡하다.
PHP의 배열을 클라이언트로 전송하기 위해서 콤마로 구분된 문자열을 만들었다. 자바스크립트에서는 이를 받아서 콤마를 구분자로 다시 배열로 만들었다. 
만약 PHP의 배열을 그대로 자바스크립트에서 사용할 수 있다면? 반대로 자바스크립트의 배열을 그대로 PHP에서 사용할 수 있다면 얼마나 편리할까? 이 때 사용하는 것이 JSON이다. 
JSON은 자바스크립트 문법을 쓰고 있지만 객체를 그대로 전송할 수 있다. 위의 예제를 JSON화 시켜보자.
time2.php
<?php
$timezones = ["Asia/Seoul", "America/New_York"];
header('Content-Type: application/json');
echo json_encode($timezones);
?>
json_encode는 PHP의 데이터를 JSON 형식으로 전환해주는 PHP의 내장함수다. decode는 반대다. 언어마다 JSON화 시킬 수 있는 API들이 있다. 다 다르다.
html 코드에서 JSON.parse만 해주면 된다.
<p id="timezones"></p>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
var xhr = new XMLHttpRequest();
xhr.open('GET', './time2.php');
xhr.onreadystatechange = function(){
if(xhr.readyState === 4 && xhr.status === 200){
var _tzs = xhr.responseText;
var tzs = JSON.parse(_tzs);
var _str = '';
for(var i = 0; i< tzs.length; i++){
_str += '<li>'+tzs[i]+'</li>';
}
_str = '<ul>'+_str+'</ul>';
document.querySelector('#timezones').innerHTML = _str;
}
}
xhr.send(); 
}); 

아무리 복잡한 데이터 형식도 JSON.parse()을 쓰면 된다. 그러나 모든 데이터 형식을 지원하는 건 아니다. Object나 Array등등...이고 이것도 언어마다 다르다.
서버로 JSON 데이터를 전송하는 것도 가능하다. 아래 예제를 참고하자.
demo4.html
<p>time : <span id="time"></span></p>
<select id="timezone">
<option value="Asia/Seoul">asia/seoul</option>
<option value="America/New_York">America/New_York</option>
</select>
<select id="format">
<option value="Y-m-d H:i:s">Y-m-d H:i:s</option>
<option value="Y-m-d">Y-m-d</option>
</select>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
var xhr = new XMLHttpRequest();
xhr.open('POST', './time3.php');
xhr.onreadystatechange = function(){
document.querySelector('#time').innerHTML = xhr.responseText;
}
var data = new Object();
data.timezone = document.getElementById('timezone').value;
data.format = document.getElementById('format').value;
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify(data)); 
});
</script>
time.php
<?php
$data = json_decode(file_get_contents('php://input'), true);
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone($data['timezone']));
echo $d1->format($data['format']);
?>


<jQuery Ajax>
jQuery이용해서 Ajax를 사용하게 되면 많은 이점이 있는데 그 중의 하나가 크로스브라우징의 문제를 jQuery가 알아서 해결해준다는 것이다. 뿐만 아니라 여러가지 편리한 기능들을 제공한다. 이번 시간에는 jQuery를 이용해서 Ajax 통신을 하는 법을 알아보자.
jQuery는 Ajax와 관련해서 많은 API를 제공한다.  http://api.jquery.com/category/ajax/
그 중에서 가장 중요한 API는 $.ajax이다. $.ajax의 문법은 아래와 같다.
jQuery.ajax( [settings ] )
jQuery.ajax(url [,settings ] )이렇게 써도 되는데 url을 setting안에 넣어도 아무런 문제가 없으므로 깔끔하게 하기 위해 setting 객체에 넣는 게 낫다. setting는 Ajax 통신을 위한 옵션을 담고 있는 객체가 들어간다. 주요한 옵션을 열거해보면 아래와 같다.
o	data
서버로 데이터를 전송할 때 이 옵션을 사용한다. 
o	url : 가져올 곳.
o	dataType
서버측에서 전송한 데이터를 어떤 형식의 데이터로 해석할 것인가를 지정한다. 값으로 올 수 있는 것은 xml, json, script, html이다. 형식을 지정하지 않으면 jQuery가 알아서 판단한다.
o	success
성공했을 때 호출할 콜백을 지정한다. 성공하면 함수를 호출하게 된다.
Function( PlainObject data, String textStatus, jqXHR jqXHR )
o	type
데이터를 전송하는 방법을 지정한다. get, post를 사용할 수 있다.
위의 내용을 바탕으로 Ajax 통신을 해보자. 다음 예제는 Ajax 수업의 예제를 JQuery화한 것이다.
time.php
<?php
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone("asia/seoul"));
echo $d1->format('H:i:s');
?>
demo1.html
<p>time : <span id="time"></span></p>
<input type="button" id="execute" value="execute" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#execute').click(function(){
$.ajax({
url:'./time.php',
success:function(data){
$('#time').append(data);
}
})
})
</script>
코드가 훨씬 간결해졌다. url을 지정해주고 type은 아무것도 쓰지 않았을 때, 즉 defalut인 경우에는 get으로 인식한다. 그 다음에 성공하면 data인자를 받는 success가 실행되고 그것은 id가 time인 곳에 data를 추가하게 된다. 
POST방식으로 통신을 할 때는 아래와 같이 처리한다. 
time2.php
<?php
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone($_POST['timezone']));
echo $d1->format($_POST['format']);
?>
demo2.html
<p>time : <span id="time"></span></p>
<form>
<select name="timezone">
<option value="Asia/Seoul">asia/seoul</option>
<option value="America/New_York">America/New_York</option>
</select>
<select name="format">
<option value="Y-m-d H:i:s">Y-m-d H:i:s</option>
<option value="Y-m-d">Y-m-d</option>
</select>
</form>
<input type="button" id="execute" value="execute" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#execute').click(function(){
$.ajax({
url:'./time2.php',
type:'post',
data:$('form').serialize(),
success:function(data){
$('#time').text(data);
}
})
})
</script>
post 형식인 경우에는 post라고 타입을 지정해주고 data:$('form').serialize(), 이 메소드는 form이 갖고있는 구성요소의 값들을 형식에 맞게 바꿔줘야 하는데 알아서 바꿔주는 메소드이다. form태그의 정보를 값의 이름=값의내용&값의 형식으로 바꿔주는 것이다.. 그리고 나서 text로 추가하게 되면 바로 나타난다. 
JSON처리
$.ajax를 이용해서 JSON을 처리하는 방법을 알아보자.
time3.php
<?php
$timezones = ["Asia/Seoul", "America/New_York"];
echo json_encode($timezones);
?>
demo3.html
<p id="timezones"></p>
<input type="button" id="execute" value="execute" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#execute').click(function(){
$.ajax({
url:'./time3.php',
dataType:'json',
success:function(data){
var str = '';
for(var name in data){
str += '<li>'+data[name]+'</li>';
}
$('#timezones').html('<ul>'+str+'</ul>');
}
})
})
</script>
json이라는 데이터타입을 지정해줘야된다. json형식이라는 걸 명시적으로 해준다. 







# JavaScript_language


<JAVA script 언어>

자바스크립트는 HTML이 한번 화면에 출력된 후에는 그 형태나 동작방법을 바꿀 수 없는 문제를 해결하기 위해서 네스케이프에서 만들어졌다. 이후에 이 언어는 마이크로소프트의 인터넷 익스플로러에 jscript라는 이름으로 탑재된다.
자바 스크립트는 웹 브라우저를 제어하기 위한 언어지만 오늘날의 자바스크립트는 웹 브라우저를 제어하는 것 뿐만 아닌 웹 서버를 동작하기 위한 도구로서도 사용이 되고 있다. 대표적인 기술은 node.js가 있다. 
웹 브라우저에 주소를 치면 웹 브라우저가 웹 서버에 요청을 한다. 웹 서버는 웹 브라우저에게 응답을 해야하는데 여기서 응답할 때 사용하는 언어가 php, java, python등등이 쓰인다. 여기 언어들을 대체할 수 있는 언어가 자바스크립트를 바탕으로 한 node.js이다. So, 자바스크립트는 자바스크립트로 웹 브라우저와 웹 서버를 모두 사용할 수 있다는 장점이 있다. 자바스크립트가 웹 서버까지 확장하고 있으니 영향력이 대단하다.
언어는 의사소통을 위한 약속으로~(‘hello world’);라고 할 수 있다.
여기서 말하는 사람의 환경, 즉, 호스트 환경이 추가되는데 alert -> 웹 브라우저 / write -> node.js /msgBox -> spreadsheet이다.
즉, 언어라는 공통분모를 가지고 다른 환경을 제어하게 되는 것이다.

자바스크립트는 Html 문서에서 script태그로 작동한다.
작은 문장의 자바스크립트 문장은 하나하나 치기 귀찮으니 크롬에 있는 console을 통해서 바로 쳐도 된다. (Console.log)

숫자와 문자
자바스크립트는 큰 따옴표나 작은 따옴표가 붙지 않는 숫자는 숫자로 인식한다. 
자바스크립트에서의 사칙연산은 하기 쉽다. 함수를 이용해주면 된다. 
Math.pow(3,2); // 9, 3의 2승 
Math.round(10.6); // 11, 10.6을 반올림
Math.ceil(10.2); // 11, 10.2를 올림
Math.floor(10.6); // 10, 10.6을 내림
Math.sqrt(9); // 3, 3의 제곱근
Math.random(); // 0부터 1.0 사이의 랜덤한 숫자
Math.round(100 * Math.random()); // 얘는 100이하의 정수를 나타낸다. 

문자는 "(큰 따옴표) 혹은 '(작은 따옴표) 중의 하나로 감싸야 한다. 큰 따옴표로 시작하면 큰 따옴표로 끝나야 하고, 작은 따옴표로 시작하면 작은 따옴표로 끝나야 한다. 이것을 String이라고 한다.
숫자를 따옴표로 감싸면 문자가 된다. 아래는 문자다. typeof는 값의 데이터 형을 알려주는 기능이다.
alert(typeof "1")
결과 : string
문자와 문자를 더할 때는 +다. 공백을 넣어주고 싶다면 공백을 넣어주면 된다. 
alert("coding"+”  ”+" everybody");
문자의 길이를 구할 때는 문자 뒤에 .length를 붙인다.
alert("coding everybody".length)
indexOf는 그 글자가 몇 번째에 있는지 알려준다.
“code”.indexOf(“e”); -> 3

변수와 논리 연산자
자바스크립트에서 Variable(변수)는 var로 선언을 한다.
Var a = 1;
Var b = ‘coding’;
JavaScript에서는 세미콜론을 생략할 수 있는데, 이 경우 줄 바꿈을 명령의 끝으로 간주하게 된다.
변수를 쓰는 이유는 코드의 재활용성을 높여 주기 때문이다. 수정해야 할 코드가 적다는 것은 그만큼 해야 할 일이 줄어든다는 의미고, 그 과정에서 버그가 발생할 가능성을 낮출 수 있다. 
===는 일치 연산자로 좌항과 우항이 '정확'하게 같을 때 true 다르면 false가 된다. 여기서 정확하다는 말의 의미에 집중하자. 
alert(1=='1');              //true
alert(1==='1');             //false
alert(0 === -0);                //true

===는 정말 같은 것만 같다. ==는 웬만하면 쓰지 말자. ==를 잘 쓰려면 예외의 경우를 다 알고 있어야하기 때문이다. 
논리 연산자는 조건문을 좀 더 간결하고 다양한 방법으로 구사할 수 있도록 도와준다.(&&, ||, !)

가로는 false와 0 외에 false로 간주되는 데이터형의 리스트다. (‘ ’, undefined, a, null, NaN)
차례대로 빈 문자열, undefined, 값이 할당되지 않은 변수, null, 0/0이다.

함수
함수(function)란 하나의 로직을 재실행 할 수 있도록 하는 것으로 코드의 재사용성을 높여준다.
function 함수명( [인자...[,인자]] ){
코드
return 반환값
}

return은 결과를 반환하는 것 외에 함수를 중지시키는 역할도 한다.
function get_member(){
return 'egoing';
return 'k8805';
return 'sorialgi';
}
가령, return이 많이 나오게 된다면 하나가 나온 후에 함수를 빠져나오기 때문에egoing만 나오고 다른 건 나오지 않는다. 

자바스크립트는 함수를 정의하는 또 다른 방법을 제공한다. 변수에 함수를 넣어서 변수에다가 가로를 넣는다.
var numbering = function (){
i = 0;
while(i < 10){
document.write(i);
i += 1;
} 
}
numbering();

익명함수 - 이름이 필요 없고 일회성으로 바로 사용할 때 쓰인다. (가로로 잘 쳐주고 바로 ();를 쓴다.)

(function (){
i = 0;
while(i < 10){
document.write(i);
i += 1;
} 
}) ();

배열
배열을 선언하고 세미콜론이 없다. 조심!
var member = ['egoing', 'k8805', 'sorialgi']
alert(member[0]);
alert(member[1]);
alert(member[2]);

하나의 함수는 하나의 값만을 반환할 수 있기 때문에 위와 같이 각각의 회원정보를 반환하는 함수를 만들었다.(return이니까 하나만 반환) 리턴하는 값이 배열인 것. 
function get_members(){
return ['egoing', 'k8805', 'sorialgi']; // 함수의 리턴값에 배열을 넣을 수도 있다. 
}
var members = get_members(); // 변수에 함수를 넣고 인덱스 하나하나를 출력하는 것처럼 해준다.
document.write(members[0]);
document.write(members[1]);
document.write(members[2]);

다음은 배열의 끝에 원소를 추가하는 방법이다. push는 인자로 전달된 값을 배열(li)에 추가하는 명령이다.
var li = ['a', 'b', 'c', 'd', 'e'];
li.push('f');

 복수의 원소를 배열에 추가하는 방법이다. concat은 인자로 전달된 값을 추가하는 명령이다.
var li = ['a', 'b', 'c', 'd', 'e'];
li = li.concat(['f', 'g']);

다음은 배열의 시작점에 원소를 추가하는 방법이다. 배열 li는 z, a, b, c, d, e가 됐다. unshift는 인자로 전달한 값을 배열의 첫번째 원소로 추가하고 배열의 기존 값들의 색인을 1씩 증가시킨다.
var li = ['a', 'b', 'c', 'd', 'e'];
li.unshift('z');

만약 두번째 인덱스 뒤에 대문자 B를 넣고 싶다면 아래와 같이한다. splice는 첫번째 인자에 해당하는 원소부터 두번째 인자에 해당하는 원소의 숫자만큼의 값을 배열로부터 제거한 후에 리턴한다. 그리고 세번째 인자부터 전달된 인자들을 첫번째 인자의 원소 뒤에 추가한다. -> 헷갈린다.
var li = ['a', 'b', 'c', 'd', 'e'];
li.splice(2, 0, 'B');

제거
var li = ['a', 'b', 'c', 'd', 'e'];
li.shift(); // 앞에서부터 제거한다.

var li = ['a', 'b', 'c', 'd', 'e'];
li.pop(); // 뒤에서부터 제거한다.

정렬
var li = ['c', 'e', 'a', 'b', 'd'];
li.sort();

var li = ['c', 'e', 'a', 'b', 'd'];
li.reverse(); // 역순으로 정렬

객체
서로 연관되어 있는 데이터를 묶기 위한 것. 배열과 비슷하지만 다르다. 배열은 인덱스가 0,1,2 처럼 자동으로 추가되지만 객체는 index로 frist, second등등 내가 원하는 대로 쓸 수 있다. 객체 지향하고는 다르다.
var grades = { ‘egoing’ : 10, ‘k8805’ : 6, ‘sdfs’ :80}; 
여기서 egoing은 key가 되고, 10은 value가 된다.(키+값) 고로 인덱스가 문자다. value에는 숫자가 아니라 다른 데이터 타입이더라도 괜찮다. 

다른 방법으로 객체를 만들 수도 있다. 
var grades = {}; // 자동으로 해주니까 편하지.
grades['egoing'] = 10; // 전에 배웠던 거 기억나나? grades.egoing으로 쓸 수도 있다.
grades['k8805'] = 6;
grades['sorialgi'] = 80;
또는
var grades = new Object(); // 무조건 Object라고 써야만 된다.
grades['egoing'] = 10;
grades['k8805'] = 6; // grade[‘k88’+’05’];로 써도 된다.
grades['sorialgi'] = 80;


alert(grades.sorialgi);
alert(grades['sorialgi']);
배열 -> 순서라면, 객체 -> key, value이다.
var grades = {'egoing': 10, 'k8805': 6, 'sorialgi': 80};
for(key in grades) {
document.write("key : "+key+" value : "+grades[key]+"<br />");
} 

여기서 document.write에 grades.key라고 쓰면 잘 실행이 될까?
안 된다. 왜냐하면 for(key in grades)에서 key는 순전히 차례대로 ‘egoing’, ‘k8805’를 의미한다. 이는 string인데 grades[key]를 하면 grades[‘egoing’]으로 출력이 되지만 grades.key는 grades.’egoing’이므로 undefined가 뜨게 된다. 본래 값인 grades.egoing을 하면 잘 된다. .이라는 게 오묘한 기호인 것 같다. 

객체에는 객체를 담을 수도 있고, 함수를 담을 수도 있다.
this는 약속되어있는 변수로 이 함수가 속해 있는 객체를 가리킨다. (즉, grades를 가리킨다.)
var grades = {
'list': {'egoing': 10, 'k8805': 6, 'sorialgi': 80},
'show' : function(){
	alert(‘hello world’);}
}
alert(grades[‘show’]()); // 함수는 이렇게 뒤에 가로를 넣어줘야한다.
alert(grades[‘list’][‘egoing’]);// 10이 출력된다. [‘’]으로 해준다. 그 안에 있으니까 두 번!
so, 함수 안에다가 hello world대신 console.log(this.list);를 하게 되면 this가 그 위의 객체, grades를 가리키게 되므로 3개가 다 나온다. 
var grades = {
'list': {'egoing': 10, 'k8805': 6, 'sorialgi': 80},
'show' : function(){
for(var name in this.list){
document.write(name+':'+this.list[name]+"<br />"); //console.log(name, this.list[name]);
};}}
grades.show(); // 해주면 정보가 나오게 된다. 여기서는 함수 안에 들어있는 게 아니기 때문에 this를 써줄 수 없다.
이처럼 그룹핑해서 프로그래밍하는 것이 객체 지향 프로그래밍이다..

모듈
모듈이란 코드를 여러 개의 파일로 분리하는 것이다. -> 가독성을 높여주고 메모리 낭비를 줄이는 효과
JavaScript와 HTML은 완전히 다른 문법을 가진 언어다. 그런데 HTML 문서 안에는 JavaScript와 HTML이 동시에 표현된다. 따라서 브라우저에게 어디서부터 어디까지가 JavaScript이고, HTML인지를 구분해서 알려줘야 한다. 이 역할을 하는 HTML 태그가 script 태그다. script 태그 안에 위치하는 컨텐츠는 브라우저에 의해서 JavaScript로 인식된다. 여기에 src속성이 있으면 모듈화를 한 것이다.
자바스크립트는 <script src="greeting.js"></script>를 쓰면 greeting.js이 포함된다.

라이브러리
라이브러리는 모듈과 비슷한 개념이다. 모듈이 프로그램을 구성하는 작은 부품으로서 로직을 의미한다면 라이브러리는 자주 사용되는 로직을 재사용하기 편리하도록 잘 정리한 일련의 코드들의 집합을 의미한다고 할 수 있다.
적용된 모듈, 라이브러리를 보려면 크롬에서 F12를 눌러 개발자도구 network를 가면 알 수 있다.
jquery는 정말 큰 라이브러리이다. 매우 클릭하면 내용을 바뀌게 하는 등등. 여러가지 일을 쉽게 할 수 있다.

tutorial, reference, ui, api
프로그래밍을 공부하기 위한 자료는 크게 레퍼런스(reference)와 tutorial(안내서)가 있다. 통상 튜토리얼은 언어의 문법을 설명하고, 레퍼런스는 명령어의 사전을 의미하다.
튜토리얼을 통해서 지식을 알게 되면 레퍼런스(사전)를 통해 정보를 쉽게 찾으면 된다. 

호스트 환경이란 자바스크립트가 구동되는 환경을 의미한다. 예를 들어 node.js는 서버 측에서 실행되는 자바스크립트다. 이 언어는 자바스크립트의 문법을 따르지만 이 언어가 구동되는 환경은 브라우저가 아니라 서버측 환경이다. 또 구글의 제품 위에서 돌아가는 Google Apps Script 역시 자바스크립트이지만 google apps script가 동작하는 환경은 구글 스프레드 시트와 같은 구글의 제품 위이다.호스트 환경에 따라서 각자의 호스트 환경 매뉴얼을 공부해야 한다. 
환경을 제어하기 위해서는 API를 쓰니 따로 공부해야 한다.
옛날에는 상표권 문제로 java script라고 못 쓰고 ecmascript라고 썼다. 
환경마다 사용할 수 있는 언어가 다른데 위에 보인 것처럼 자바스크립트가 그나마 많이 쓰인다.

정규표현식
네이버 : www.naver.com 을 링크로 바꾸고 싶은데 이 링크가 엄청 많다면 어떻게 해야할까? 태그 하나하나를 다 바꿔야하니 하기에는 벅차다. 이걸 바꿔줄 수 있는 정규표현식이 있다.
정규표현식(regular expression)은 문자열에서 특정한 문자를 찾아내 치환해줄 수 있는 도구다. 이 도구를 이용하면 수십줄이 필요한 작업을 한 줄로 끝낼 수 있다. 
자바스크립트 내에서 정규표현식을 쓰는 방법. 하지만 정규표현식은 하나의 언어이고 방대하다.
정규표현식은 사용방법이 컴파일과 실행. 두 가지가 있다. 
우리가 필요한 대상을 찾고 판단, 패턴을 찾는 방법이 컴파일이고 실제로 하는 것이 실행이다. 

var pattern = /a/; 
슬래시와 슬래시 사이가 우리가 찾고자 하는 대상이다. 
var pattern = new RegExp(‘a’);
new라고 해서 정규표현식 객체를 만들었고 우리가 찾고자 하는 패턴이 a라고 알려주는 것. 위의 두 문장 모두 동일한 문장이다. 정규 표현식 객체를 pattern이라는 변수에 저장하는 것이다. 
일단 작업의 대상을 먼저 찾고 대상에 어떻게 할 것인지 정한다.
1.	정보를 찾으면 그 정보를 추출하는 것(exec)
2.	그 정보가 있는지 없는지(test)
3.	다른 정보로 치환하는 것.  
pattern.exec(‘abcdef’); // pattern에는 문자열 a를 찾고 싶다는 의지(객체)가 들어간 것이다. exec은 실행하는데 그 실행의 대상을 첫 번째 인자로 전달. 그 대상이 바로 abcdef
so, [‘a’]를 출력함.

var pattern = /a./; .은 어떤 문자 
건 간에 오는 것. 그래서 쓰면 ab를 추출하게 된다. 

만약 var pattern = /a/;를 했는데
pattern.exec(‘bcdef’);를 했다면 null이 출력된다.
exec는 내용에 찾는 게 있다면 배열로 리턴하는 함수인 것이다. 
pattern.test(‘abcde’);를 하면 true. 얘는 리턴 값이 boolean이다. 
exec는 추출!, test는 있는지 없는지.
var pattern = /a/;
var str = ‘abcdef’;
str.match(pattern); -> [‘a’];
var str = ‘bcdef’;
str.match(pattern); -> undefined

string.match();은 RegExp.exec()와 비슷하다.
console.log('abcdef'.match(pattern)); // ["a"]
console.log('bcdefg'.match(pattern)); // null
String.replace(); -> 문자열에서 패턴을 검색해서 이를 변경한 후에 변경된 값을 리턴한다.
console.log('abcdef'.replace(pattern, 'A')); // Abcdef

옵션
var xi = /a/;
“Abcde”.match(xi);
var oi /a/i;
“Abcde”.match(oi);
를 하게 되면 i를 붙이면 대소문자를 구분하지 않는다.

var xg = /a/;
“abcdea”.match(xg);
var og = /a/g;
“abcdea”.match(og);
g는 g를 붙이면 검색된 모든 결과를 리턴한다.

같이 쓸 수도 있다.
var ig = /a/ig; // ig, gi 둘 다 상관 없다. 
문장에 있는 대소문자를 다 리턴.

캡쳐
var pattern = /(\w+)\s(\w+)/;
var str = "coding everybody";
var result = str.replace(pattern, "$2, $1");
console.log(result);

첫 문장에서 가로()는 그룹을 보여준다. \w는 word A,a,0(대문자, 소문자, 숫자) 중 어떠한 문자를 나타낸다. +는 수량자이다. 앞에있는 문자가 하나일 경우에 유효허다. #은 없으니까 해당 안 되지만 A나 AA는 해당된다. \s는 공백이다.
세 번째 줄에 replace이므로 str에 있는 값을 치환해준다는 소리고 $는 그룹을 의미한다. (즉, 가로) $2는 두 번째 그룹, $1은 첫 번째 그룹을 가리킨다.
coding이 $1이니 뒤로가고 \s는 . (.과 공백)으로 바뀌었다. everybody가 첫 번째로 가서 바뀐 것이다. 
그룹을 지정하고 그룹을 사용하는 기능을 캡쳐라고 부른다. 

var urlPattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*/gim; // 패턴은 따로 있고
var content = '생활코딩 : http://opentutorials.org/course/1 입니다. 네이버 : http://naver.com 입니다. ';
var result = content.replace(urlPattern, function(url){ 
return '<a href="'+url+'">'+url+'</a>';
});   // replace라는 메소드 호출. url 패턴이라는 패턴을 찾을 때마다 function(url)이라는 함수가 호출된다. 리턴해주는 정보로 치환이 된다. 문자열로 리턴을 해준다.
console.log(result);

<시즌 2 함수>
유효범위(Scope)
var vscope = 'global';
function fscope(){
alert(vscope);
}
fscope();
만약 나타내려는 변수가 함수에 없다면 가까이 있는 정의된 변수를 찾아서 출력한다. 함수 내에서 만들어진 변수는 지역변수라서 바깥까지 나가지 못한다. 
만약에 var을 빼고 정의를 한다면? 함수 내에 우선적으로 지역변수가 있는지 확인한다. 이미 지역변수가 만들어졌다면 지역변수로 할당한다. 지역변수를 많이 써라. 전역변수는 웬만하면 쓰지 마라. 
지역변수의 유효범위는 함수 안이고, 전역변수의 유효범위는 에플리케이션 전역인데, 같은 이름의 지역변수와 전역변수가 동시에 정의되어 있다면 지역변수가 우선한다는 것을 알 수 있다.
var를 사용하지 않은 지역변수는 전역변수가 된다. 그래서 변수를 선언할 때는 꼭 var을 붙이는 것을 습관화해야 한다.
(function(){
var MYAPP = {}
MYAPP.calculator = {
'left' : null,
'right' : null
}
MYAPP.coordinate = {
'left' : null,
'right' : null
}
MYAPP.calculator.left = 10;
MYAPP.calculator.right = 20;
function sum(){
return MYAPP.calculator.left + MYAPP.calculator.right;
}
document.write(sum());
}())
원래 그냥 있던 객체를 익명함수로 호출함으로서 모듈화를 할 수 있다. 
자바스크립트는 함수에 대한 유효범위만을 제공한다. 많은 언어들이 블록(대체로 {,})에 대한 유효범위를 제공하는 것과 다른 점이다. 아래 예제의 결과는 coding everybody이다.
for(var i = 0; i < 1; i++){
var name = 'coding everybody';
}
alert(name);
하지만 자바에서는 아래의 코드는 허용되지 않는다. name은 지역변수로 for 문 안에서 선언 되었는데 이를 for문 밖에서 호출하고 있기 때문이다.
for(int i = 0; i < 10; i++){
String name = "egoing";
}
System.out.println(name);

자바스크립트의 지역변수는 함수에서만 유효하다.
자바는 존재하지 않는 변수를 호출하는 것이 안되지만 자바스크립트는 함수를 제외한 for문이나 if문 등등 함수가 아닌 경우에는 알아서 처리를 해준다.
var i = 5; // 전역변수
function a(){
var i = 10;
b();
}
function b(){
document.write(i);
}
a();
이렇게 했을 때 답은 무엇일까?
답은 5다. 왜냐면 변수 i가 호출될 때의 시점이 아니라 그 메소드가 정의되는 시점일 때이기 때문이다.(전체적인 관점) 전역변수가 사용된다. 이것을 정적 유효범위라고 부른다.

값으로서의 함수와 콜백
자바스크립트에서는 함수도 객체다. 함수 자체가 값이 될 수 있다는 소리이다. (변수, 리턴값, 매개변수)
>	first class object라고 부른다.
var a = function() {}으로 변수에 담길 수 있고 a = { b : function(){}}; 으로 객체에 담길 수도 있다. 여기서 b를 보면 key의 역할을 하고 있는데 이렇게 객체의 속성 값으로 담겨진 함수를 메소드라고 부른다.  
함수는 값이기 때문에 다른 함수의 인자로 전달될 수도 있다. 겁나 쩐당…
function cal(func, num){ //함수 이름과 인자를 받아서increase(1) 이렇게 리턴한다.
return func(num)
}
function increase(num){
return num+1
}
function decrease(num){
return num-1
}
alert(cal(increase, 1)); //여기보면 cal의 인자로 increase 함수와 1을 보내주고있다.
alert(cal(decrease, 1));
함수는 함수의 리턴값으로도 사용할 수 있다.
function cal(mode){
var funcs = {
'plus' : function(left, right){return left + right},
'minus' : function(left, right){return left - right}
}
return funcs[mode];//함수를 반환해주고 있다. 
}
alert(cal('plus')(2,1)); // cal이라는 함수의 리턴값이 funcs[‘plus’]니까 다시 들어가는 것!
alert(cal('minus')(2,1)); 

당연히 배열에다가 함수의 값으로도 사용할 수 있다.
var process = [
function(input){ return input + 10;},
function(input){ return input * input;},
function(input){ return input / 2;}
];
var input = 1;
for(var i = 0; i < process.length; i++){
input = process[i](input);
}
alert(input);

콜백
시스템이 스스로 호출하는 함수인데 이 콜백 함수를 통해서 오리지널 함수의 동작방법을 바꿀 수 있다.
function sortNumber(a,b){
// 위의 예제와 비교해서 a와 b의 순서를 바꾸면 정렬순서가 반대가 된다.
//console.log(a,b); 해봐서 정렬이 어떻게 비교가 되는지 알아본다. 
    return b-a;
}
var numbers = [20, 10, 9,8,7,6,5,4,3,2,1];
alert(numbers.sort(sortNumber)); // array, [20,10,9,8,7,6,5,4,3,2,1]
//그냥 numbers.sort();를 사용하게 되면 숫자가 아니라 문자로 비교해서 1, 10, ,… 이렇게 나타난다. 그래서 sort()의 인자에 함수를 넣을 수 있으니 함수를 만든다. 원래 sort()의 동작 방법이 따로 있는데 우리가 내부적으로 바꿔준 것이다. 

비동기콜백
예를 들어 10000명의 구독자가 있는데 글 작성을 할 때마다 개인별로 이메일 발송을 보내야한다. 발송하는데 1초가 걸린다고 해도 10000초면 2시간이다. 너무 많은 시간이 걸리니 이메일 발송 예약 시스템을 구성한다. 즉, 2시간 전에 처리하는 방식이다. 이 방식이 비동기적 처리라고 한다. (동기적 처리는 그대로 2시간 걸려서 하는 것.)
페이지를 리로드하지 않고도 자체적으로 네트워크와 연결해 웹서버가 정보를 전달해준다. (Ajax 기술) 이때 비동기적인 제어를 하게 된다. 만약 동기적 제어라면 alert이 뜬 후에 진행이 안 되는 것과 똑같이 된다. 매우 불편하다. 
나중에 Ajax에서 jquery에서 get이라는 함수를 조금 바꿔서 넣을 수도 있다. 
클로저
클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다. 
함수 안에다가 함수를 집어 넣으면 다른 함수가 끼어들 가능성이 줄어들고 보기 편하다. 
내부 함수에서 외부 함수의 지역변수에 접근할 수 있다.
function outter(){ //외부함수
var title = 'coding everybody'; //외부함수의 지역 변수이지만 
function inner(){ // 내부함수
alert(title); // 내부함수에서 접근 가능하다.
}
inner();
}
outter();

외부함수가 더 이상 사용되지 않는 경우에도 접근할 수 있다. 
function outter(){
var title = 'coding everybody'; 
return function(){ //return으로 외부함수가 죽었음에도 불구하고 
alert(title);
}
}
inner = outter();
inner();//내부함수를 통해서 접근할 수 있다. 내부 함수가 소멸 될 때까지 소멸되지 않는다.

그렇다면 클로저는 뭘 할 때 쓰이는 걸까?

function factory_movie(title){
return {
get_title : function (){
return title;
},
set_title : function(_title){
title = _title
}
}
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('Matrix');

alert(ghost.get_title()); //Ghost in the shell을 넣으므로 get_title로 가서 넣었던 인수를 그대로 리턴한다.
alert(matrix.get_title()); // Matrix을 넣으므로 get_title로 가서 넣었던 인수를 그대로 리턴한다. 객체를 리턴
ghost.set_title('공각기동대'); // ghost로 인해서 접근하게 해주고 set_title에 가서 인수에 ‘공각기동대’가 들어가 title을 바꿔준다.
alert(ghost.get_title()); // 아까 넣어준 공각기동대가 나온다.
alert(matrix.get_title()); // 외부함수가 실행될 때마다 새로운 지역변수가 탄생하므로 그대로 matrix가 나온다.

외부함수와 내부함수를 잘 이용함으로써 보안을 높일 수가 있다. 즉, private 변수를 만들 수 있다는 소리다. title이라는 정보에 접근할 수 있는 함수는 get과 set 함수로만 접근할 수가 있어 다른 맥락에 영향을 주지 않는다. 
ghost와 matrix로 factory_movie에 들어갈 때 각각 다른 외부함수로 들어간다. 그리고 ghost와 matrix에 객체가 리턴되어 전체가 들어간다. 즉, title에 담겨있는 값이 다르다. factory_movie는 바로 return을 하기 때문에 생을 마감하고 그 지역변수인 title은 내부함수인 get,set_title만을 이용해서 접근 가능한 변수가 된다. (return을 해서 죽었기 때문에 ghost로 들어가는 ghost in the shell은 끝난 것이다. -> 접근하기위해서만 사용된다.) 
ghost.get_title();의 값이 '공각기동대'인 것은 set_movie와 get_movie 함수가 title의 값을 공유하고 있다는 의미다.
JavaScript는 기본적으로 Private한 속성을 지원하지 않는데, 클로저의 이러한 특성을 이용해서 Private한 속성을 사용할 수 있게된다.

0, 1, 2, 3, 4를 출력하고 싶어서 써봤지만 제대로 출력되지 않는다. 왜일까?
var arr = []
for(var i = 0; i < 5; i++){
arr[i] = function(){
return i;
}
}
for(var index in arr) {
console.log(arr[index]());
}


i가 for문에 있는 i일 뿐이지 arr[i] = function() 함수의 외부변수의 값이 아니기 때문이다.
이렇게 고쳐줘야 한다.
var arr = []
for(var i = 0; i < 5; i++){
arr[i] = function(id) { // i값을 받아서 내부함수로 보내고 있다. id값을 리턴
return function(){
return id;
}
}(i); // 그냥 바로 실행하는 것이다. 익명함수니까. 매개변수의 인자 값으로 i를 준다.
}
for(var index in arr) {
console.log(arr[index]());
}

arguments
arguments는 arguments 객체의 인스턴스다. arguments는 약속되어있는 특수한 이름의 변수이다. 함수를 호출할 때 입력한 인자가 담겨있다.
function sum(){    //인자 값이 없다. 
var i, _sum = 0; 
for(i = 0; i < arguments.length; i++){ //사용자가 전달한 인자들이 arguments에 들어있다. 4개의 인자니까 4다.
document.write(i+' : '+arguments[i]+'<br />');
_sum += arguments[i];
} 
return _sum;
}
document.write('result : ' + sum(1,2,3,4)); //sum에서 인자를 전달했다. 매개변수와 다르더라도 자바스크립트는 관대한 언어라서 괜찮다. 
인자의 개수를 모를 때 arguments.length를 이용하면 쉽게 알아낼 수 있다. 그리고 인덱스 값을 통해서 인자의 특정한 자릿수의 값을 알 수 있다.
*매개변수와 인자는 다르다. function a(arg) {} 에서 arg는 매개변수이고 a(1)에서 1이 인자이다.
매개변수의 수
매개변수와 인자의 길이를 알아볼 때 2가지 경우가 있다. 함수이름.length 와 arguments.length 이다. 함수이름.length는 매개변수의 길이를 나타내고 arguments.length는 인자의 길이를 나타낸다. 인자의 길이는 호출할 때 인자의 개수니까. 애당초 매개변수와 인자가 다르니 그 차이만 알면 된다.
function zero(){
console.log(
'zero.length', zero.length,
'arguments', arguments.length
);
}
function one(arg1){
console.log(
'one.length', one.length,
'arguments', arguments.length
);
}
function two(arg1, arg2){
console.log(
'two.length', two.length,
'arguments', arguments.length
);
}
zero(); // zero.length 0 arguments 0 //매개변수와 인자가 아예 없다.
one('val1', 'val2'); // one.length 1 arguments 2
two('val1'); // two.length 2 arguments 1

함수의 호출
기본적인 함수의 호출 방법은 정의한 후에 그대로 쓰는 것이다. 
function func(){  // 객체에 함수가 있으니 메소드이다. 
}
func();

함수 func는 Function이라는 객체의 인스턴스다. 따라서 func는 객체 Function이 가지고 있는 메소드들을 상속하고 있다. 자바스크립트에서 함수는 객체에 값이 들어 있다면 속성이라고 말하고 함수가 들어 있다면 메소드라고 부른다. 함수에는 내장된 메소드나 속성을 쓸 수 있는데 여기서는 func.apply를 다룬다.

function sum(arg1, arg2){
return arg1+arg2;
}
alert(sum.apply(null, [1,2]))

func.apply() {}를 쓰면 {}값에는 native code가 들어가는데 이것은 내장된 코드라 크게 신경을 안 써도 된다. sum.apply(null, [1,2]); 첫 번째 인자는 함수가 실행될 맥락(현재는 null)이고 두 번째 인자는 이 배열의 첫 번째 값. 두 번째 값을 넣고 있다. 즉, 순차적으로 대입된다. 이는 sum(1,2);와 같다. null을 하고 순차적으로 값을 넣으면 똑같이 호출할 수 있다.
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
function sum(){
var _sum = 0;   // var this = o1
for(name in this){  //this는 아직 정해져있지 않다. 호출할 때 정해지기 때문에. 
_sum += this[name];
}
return _sum;
}
alert(sum.apply(o1)) // 6 //객체를 넣는다.//얘가 실행되는 그 순간에는 o1.sum이라는 메소드가 된다.  그 시점에 This값을 변경해서 마치 Sum이라는 함수가 o1이라는 객체의 속성인 것처럼 된다.
alert(sum.apply(o2)) // 185 // Sum을 호출하는 
우선 두개의 객체를 만들었다. o1는 3개의 속성을 가지고 있다. 각각의 이름은 val1, val2,val3이다. o2는 4개의 속성을 가지고 있고 o1과는 다른 속성 이름을 가지고 있고 속성의 수도 다르다.
그 다음엔 함수 sum을 만들었다. 이 함수는 객체의 속성을 열거할 때 사용하는 for in 문을 이용해서 객체 자신(this)의 값을 열거한 후에 각 속성의 값을 지역변수 _sum에 저장한 후에 이를 리턴하고 있다.
객체 Function의 메소드 apply의 첫번째 인자는 함수가 실행될 맥락이다. 이렇게 생각하자. sum.apply(o1)은 함수 sum을 객체 o1의 메소드로 만들고 sum을 호출한 후에 sum을 삭제한다. 
sum의 o1 소속의 메소드가 된다는 것은 이렇게 바꿔 말할 수 있다. 함수 sum에서 this의 값이 전역객체가 아니라 o1이 된다는 의미다. 일반적인 객체지향 언어에서는 하나의 객체에 소속된 함수는 그 객체의 소유물이 된다. 하지만 JavaScript에서 함수는 독립적인 객체로서 존재하고, apply나 call 메소드를 통해서 다른 객체의 소유물인 것처럼 실행할 수 있다. 
만약 apply의 첫번째 인자로 null을 전달하면 apply가 실행된 함수 인스턴스는 전역객체(브라우저에서는 window)를 맥락으로 실행되게 된다.

<시즌 3 객체지향 프로그래밍>
 
객체지향 프로그래밍(Object-Oriented Programming)은 좀 더 나은 프로그램을 만들기 위한 프로그래밍 패러다임으로 로직을 상태(state)와 행위(behave)로 이루어진 객체로 만드는 것이다. 이 객체들을 마치 레고 블럭처럼 조립해서 하나의 프로그램을 만드는 것이 객체지향 프로그래밍이라고 할 수 있다.
예를 들어, 사이트를 만들다 보면 기능별로 구성하고 싶은 생각이 들 것이다. 로직(변수, 메소드)들을 구분해서 article_a, article_b… 이런 식으로 변수를 그룹핑하듯이. 이렇게 그룹핑된 것들을 객체라고 한다. 이렇게 분류를 해 놓으면 다른 곳에서 또 사용할 수 있으니 재활용성을 높여준다. 그러나 너무 또 다른 곳에서 막 사용하니까 보안의 문제도 높아져 여러가지 기능이 추가됐다. 
모든 처리의 중심에 함수를 두는 자바스크립트를 공부하다 보면 객체지향을 이렇게도 추구 할 수도 있는 거구나 하는 놀라움을 느낄 수 있다.
생성자와 new
생성자는 객체를 만드는 역할을 하는 함수다. 자바스크립트에서 함수는 재사용 가능한 로직의 묶음이 아니라 객체를 만드는 창조자라고 할 수 있다. 
var person = { } // {} 얘는 object(객체)이다. 
person.name = ‘egoing’; //정의하고 바로 객체에다가 .을 붙여서 정의하게 함
person.introduce = function() { // 객체 안에 있다면 메소드
retrun ‘My name is’ + this.name; // 객체 안에 담겨있는 것. 
}
document.write(person.introduce());
but, 가독성이 좋지 않다. -> So, 아래처럼 바꿔준다.
var person = {
'name' : 'egoing',
'introduce' : function(){
return 'My name is '+this.name;
}
}
document.write(person.introduce());
이게 읽기 편하다
이제 사람의 데이터를 집어넣는다고 생각해보자.
var person1 = {
'name' : 'egoing',
'introduce' : function(){
return 'My name is '+this.name;
}
}
document.write(person.introduce());

var person2 = {
'name' : 'bean',
'introduce' : function(){
return 'My name is '+this.name;
}
}
document.write(person.introduce());

이름 빼고 다 다르다. name부분빼고 중복이 발생하고 있다. 이럴 때 사용하는 것이 생성자이다. 
function Person(){}
var p0 = person();
p0
해보면 undefined이다. 왜냐하면 person()에는 어떠한 리턴도 하고 있지 않으니까.
var p = new Person(); //new를 붙이게 되면 함수라고 하지 않고 객체의 생성자라고 한다. 이 객체의 생성자는 new로 인해서 비어 있는 객체를 만들고 반환한다. 함수는 객체의 창조자가 될 수 있다. 
그래서 p를 쓰면 person {} 가 나온다.
자바에서는 클래스 안에 생성자가 존재한다. 생성자를 호출하는 것으로 클래스의 객체를 만들어낸다. 하지만 자바스크립트는 생성자가 어디에 소속되어 있지 않다. 함수가 객체를 만드는 것. 즉, 함수에 new를 붙이면 객체가 된다. 
function Person(name){
this.name = name;
this.introduce = function(){
return 'My name is '+this.name; 
} 
}
var p1 = new Person('egoing');
document.write(p1.introduce()+"<br />");

var p2 = new Person('leezche');
document.write(p2.introduce());

person 함수의 인자로 ‘egoing’을 받는다.
생성자는 초기화의 역할을 한다. 빈 객체가 어떠한 메소드를 가져야하고, 프로퍼티를 가저야하는지 말이다. -> 함수가 객체의 역할을 하듯이!
전역객체 window 와 This
function func(){}를 했을 때 func();를 해서 호출해도 되지만 window.func();로 호출을 할 수 있다. 그 뜻은 편의를 위해서 window라는 전역 객체를 생략해도 암시적으로 붙여준다는 것이다. 
자바스크립트에서 모든 객체는 기본적으로 전역객체의 프로퍼티임을 알 수 있다. 다른 api에서는 추가로 정의하고 있다. 웹브라우저에서의 전역객체는 window이지만 node.js에서는 global이다. 생략해주면서 쓰고 있구나. 객체의 조상격인 게 있구나. 
this는 함수 내에서 함수 호출 맥락을 의미한다. 즉, 함수를 어떻게 호출하느냐에 따라서 this가 가리키는 대상이 달라진다는 뜻이다. 함수와 객체의 관계가 느슨한 자바스크립트에서 this는 이 둘을 연결시켜주는 실질적인 연결점의 역할을 한다.
함수에서의 this는 그 함수가 속한 객체를 가리키고 생성자를 통해 만들어진 객체에서의 this는 그 만들어진 객체 자신을 가리킨다. 즉 해당 메소드에 연결된 객체를 가리킨다.
함수호출
function func(){
if(window === this){
document.write("window === this");
}
}
func(); 
얘를 실행시켜보면 window === this가 나타난다. 
즉, this가 함수 안에서 전역 객체인 window를 의미한다.
메소드의 호출
var o = {
func : function(){
if(o === this){
document.write("o === this");
}
}
}
o.func(); 
얘를 실행시켜보면 o===this가 나타난다.
즉, 객체의 소속인 메소드의 this는 그 객체, o를 의미한다. 
이는 같은 말이다. 왜냐하면 위의 func라는 함수는 실제로 window라는 객체의 메소드이기 때문이다.

var funcThis = null; 
function Func(){ //여기다가 바로 if(o2==this)라고 쓰면 아직 o2라는 변수가 생성되어있지 않기 때문에 오류가 생긴다.
funcThis = this;
}
var o1 = Func();
if(funcThis === window){
document.write('window <br />');
}
var o2 = new Func(); // 생성자는 빈 객체를 만든다. 
if(funcThis === o2){
document.write('o2 <br />');
}

생성자 안에서 this는 그 생성자가 만든 객체를 가리킨다. 
function sum(x,y){return x+y;}
var sum2 = new function(‘x’,’y’,’return x+y’); 이것과 같다.
즉 sum은 객체다. 
var o = {} 객체 리터럴
var a = [1,2,3]; 배열 리터럴
편리하게 값을 만들 수 있도록 문법적인 체계를 리터럴이라고 한다.
var o = {}
var p = {}
function func(){
switch(this){
case o:
document.write('o<br />');
break;
case p:
document.write('p<br />');
break;
case window:
document.write('window<br />');
break; 
}
}
func(); // 그냥 쓰게 되면 this는 window가 되게 된다. 
func.apply(o); //첫 번째 인자는 함수 맥락을 의미한다. 
func.apply(p);

객체 – 주인 (master), 메소드 – 노예(slave)
자바스크립트에서는 함수가 메소드보다 위상이 높다. 함수는 어떤 객체에 종속되는 존재이기도 하다. 자바스크립트는 매우 유연한 언어다. 

상속
객체의 특성을 물려받아서 새로운 객체를 만들 수 있다. 그 객체는 부모 객체와 동일한 기능을 하고 변수와 메소드에 접근을 할 수 있다. 추가하고 제외시키며 접근할 수 있게 한다. 
function Person(name){ //함수인데this.name = name을 하는 걸 보니 생성자를 만드는 것 같다. 
this.name = name;
}
Person.prototype.name=null;	//person이라는 객체에 여기서 prototype은 약속되어있는 프로퍼티(여기에는 객체가 들어가 있다)에 name이라는 프로퍼티를 준 것. 
Person.prototype.introduce = function(){	// 마찬가지로 함수도 줄 수 있고. 
return 'My name is '+this.name; 
}
var p1 = new Person('egoing'); //new를 통해서 생성자를 만들었다. 
document.write(p1.introduce()+"<br />");

이제 상속을 위한 준비를 마친 것이다. 여기까지는 똑같다. 

function Person(name){
this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
return 'My name is '+this.name; 
}
function Programmer(name){
this.name = name;
}
Programmer.prototype = new Person(); // 얘에 의해서 만든 객체는 prototype의 속성을 갖는 것. person을 상속한다. 
var p1 = new Programmer('egoing');		//p1이라는 객체에 담고 programmer값을 Egoing으로 지정
document.write(p1.introduce()+"<br />"); //prgrammer가 introduce를 상속했기 때문에 가능하다. 

그럼 어떻게 가능했을까? 
Programmer.prototype = new Person();	//여기에서 programmer가 갖고있는 프로퍼티중에 prototype이라는 프로퍼티에 new person();을 해주면 p1은 prototype이라는 생성자의 프로퍼티의 객체와 같게 된다. 그것은 person이라는 객체, person이 introduce를 가지고 있기 때문에 가능한 것이다. (일단 사용법은 생성자의 prototype이라는 프로퍼티에 넣어주면 된다.)
function Person(name){
this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
return 'My name is '+this.name; 
}
function Programmer(name){
this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
return "hello world"; // 얘가 추가 된 것이다.
}


var p1 = new Programmer('egoing');
document.write(p1.introduce()+"<br />");
document.write(p1.coding()+"<br />"); 	//prototype이라는 프로퍼티로 인해 추가가 된 것이구나. 
그렇구나
prototype
prototype의 뜻은 원형입니다. 자바스크립트는 이를 통해 상속을 할 수 있습니다. 
생성자는 기본적으로 함수입니다. 함수를 호출할 때 new를 붙여주게 되면 그 함수는 생성자라는 함수가 되는 것이죠. 생성자는 새로운 객체를 만들어서 객체를 리턴하기 때문에 var로 만들었던 변수 안에 생성자를 통해 만들어진 객체가 들어가게 되는 것입니다.(ex. var 0 = new hello();)
var o = {}로 비어있는 객체를 만들어도 되는데 이렇게 생성자로 만드는 이유는 우리가 객체를 만들 때 그 객체가 가지고 있어야할 메소드, 프로퍼티등을 기본적으로 넣어 주기 위해서 입니다. (ex. var 0 = new hello(p1);) 
그러면 생성자의 객체들은 어디서 오는 걸까요? 그 모든 객체들은 어딘가에 저장이 되어있는데 그 곳이 바로 prototype이라는 프로퍼티에 저장이 되어있습니다. 즉, var o = new sub();에서 sub라는 함수는 객체이기 때문에 프로퍼티를 가지고 올 수 있는데 그 프로퍼티 중에 prototype이라는 특수한 프로퍼티가 있었던 겁니다. 그리고 이 프로퍼티 안에는 또 어떠한 객체가 정의 되어 있는 겁니다. 
new를 이용해 생성자를 호출하게 되면 자바스크립트는 이 생성자 함수 안에 prototype 프로퍼티에 있는 객체를 꺼내 주게 되는 것입니다. 
function func() {}
func.prototype을 쳐보면 func {}라고 비어있는 객체가 나옵니다.
func.prototype.name = ‘egoing’
var 0 = new func();
그런 다음에 o를 치면 func {name : ‘egoing’}이 뜨게 됩니다. o라는 객체 안에 name이라는 키가 들어가 있게 되는 것이죠. 왜냐면 func라는 생성자의 prototype 프로퍼티에 저장되어 있는 객체에 name값을 줬기 때문입니다. 아래 코드를 봅시다.
function Ultra() {}
Ultra.prototype.ultraProp = true;
function Super() {}
Super.prototype = new Ultra();
function Sub() {}
Sub.prototype = new Super();
var o = new Sub();
console.log(o.ultraProp)

Sub.prototype = new super(); 라고 하면 Super 생성자가 만든 객체가 Sub라는 객체의 prototype이라는 프로퍼티 안으로 들어가는 것이다.
console.log를 보면 o라는 변수에 ultraProp라는 변수를 찾는데 Sub로 가서 없다면 부모 객체까지 가서 찾습니다. 이렇게 연결된 고리를 prototype chain이라고 합니다.
만약 Sub(){} 에 Sub.prototype.ultraProp = 2; 를 넣으면 어떻게 될까? 3대 부모까지 가서 정보를 뽑아올까? 아니다. 2이다. 왜냐하면 차례대로 찾기 때문이다. 없다면 부모로 가고 또 없으면 또 부모로 가서 찾는 것이다. 
조심해야할 게 하나 있다. prototype 프로퍼티에 또 prototype 프로퍼티를 주면 안 된다. 왜냐하면 Super.prototype = Ultra.prototype을 하게 되면 Super.prototype값을 변경할 때 Ultra.prototype 값도 변경하기 때문이다. 상속받고자하는 부모의 prototype을 사용하는 것이 아닌 복제본, Super.prototype = new Ultra();로 주어야 한다.

표준 내장 객체의 확장
표준 내장 객체(Standard Built-in Object)는 자바스크립트가 기본적으로 가지고 있는 객체들을 의미한다. 우리가 만든 것이 아닌 자바스크립트가 기본적으로 제공하는 객체인 것이다.
Object, Function, Array, String, Boolean, Number, Math, Date, RegExp
이것들이 자바스크립트가 제공하는 언어의 객체인데 호스트 환경에 따라서도 다르기 때문에 달라질 수 있다.
이런 객체들을 조합해서 여기에 없는 새로운 객체를 만들 수 있는데 이렇게 사용자가 직접 정의해서 만든 객체를 사용자 정의 객체라고 한다. 게다가 원래의 내장 객체에 기능을 추가할 수도 있다. 
간단하게 만들어보자.
var arr = new Array('seoul', 'new york','ladarfh');	//배열을 만들고
function getRandomValueFromArray(arr){	// 배열 변수를 매개변수로 받는다.
    var index = Math.floor(arr.length*Math.random()); //인덱스에 랜덤으로 해주는 함수를 넣고
    return arr[index]; 	//배열의 인덱스를 반환하면?
}
console.log(getRandomValueFromArray(arr)); 끝!
Array.prototype.random = function(){ 	//이렇게 하면 배열 객체의 원형에 random이라는 메소드를 추가하는 것이다. 
var index = Math.floor(this.length*Math.random()); //여기서 this는 배열 객체를 뜻하게 된다. -> arr
return this[index] 	//생성자에서의 this는 만들어진 객체 자신을 뜻하니까. 
}
var arr = new Array('seoul', 'new york','ladarfh');
console.log(arr.random());
이렇게 사용자가 API를 건드릴 수 있다.

Object 
Object 객체는 객체의 가장 기본적인 형태를 가지고 있는 객체이다. 다시 말해서 아무것도 상속받지 않는 순수한 객체다. 자바스크립트에서는 값을 저장하는 기본적인 단위로 Object를 사용한다. Object는 데이터를 저장하는 맨 위의 그릇, 컨네이너라고 할 수 있다. 
즉, 모든 객체들의 부모이다. 위에 ultra, super, sub로 내려오는 객체를 봤었는데 ultra 위에도 암시적으로 Object가 포함되어 있는 것이다. 동시에 자바스크립트의 모든 객체는 Object 객체를 상속받아, 모든 객체는 Object 객체의 프로퍼티를 가지고 있다. 또한 Object.prototype은 모든 객체의 프로토타입이 됨으로써 모든 객체가 사용할 수 있는 기능을 추가할 수도 있다.
MDN의 java script reference에 가보면 Object 프로퍼티들이 보인다. 여기 보면 왜 어떤 메소드는 중간에 prototype이 들어가고 어떤 건 들어가지 않을까
Object.keys()는 key값만을 리턴해주는 메소드이다. 객체의 상태를 보기 편하게 출력해주는 것
prototype이 없는 건 object가 생성자 함수라서 object.keys= function(){}이 메소드를 정의 해놓은 것이다. 
var o = {“name” : ”egoing”, ”age” : “20”};
Object.keys(Object.keys(o)) 을 넣으면 키 값만 나오게 된다. 

object.prototype.tostring()는 Object.prototype.toString() = function(){} 형태로 되어있을 것이다.
var ? = new Object(); // 를 하는 순간 Object 객체를 원형으로 하는 ?객체가 생성되는 것이다. 그 ?객체에 대한 메소드로 사용을 하는 것이다. 그래서 Array라는 객체를 생성할 때도 이 객체 또한 암시적, 내부적으로 Object 객체를 부모로하는 객체이기 때문에 그 객체.toString으로 쓰는 것이다. prototype이 들어가는 건 new가 들어가고 객체에 대한 메소드로서 사용된다. (객체를 통해 접근 가능한 메소드)
Object라고 하는 내장 객체는 모든 객체의 최초의 조상이다. 모든 객체들이 상속받고 있는 기능이 되는 것이다.
MDN에 가서 Object 메소드들을 클릭해보면 각각 Specifications와 Browser compatibility가 있는데이에 따라서 최신 브라우저에만 사용할 수 있는지 어떤 브라우저에서는 되는지 안 되는지 알 수 있다. 
모든 객체가 배열이나 객체에 contain이라는 걸 쓰면 포함되어있으면 true 안 되어있으면 false를 반환하도록 하고 싶다.
Object.prototype.contain = function(neddle) { 	//contain이라는 메소드는 인자가 있다.
for(var name in this){ // 여기서 this는 메소드가 소속되어있는 객체를 뜻한다. 
if(this[name] === neddle){
return true;
}
}
return false;
}
var o = {'name':'egoing', 'city':'seoul'}
console.log(o.contain('egoing'));
var a = ['egoing','leezche','grapittie'];
console.log(a.contain('leezche'));

하지만 이 방법은 문제가 있다. 왜냐하면 모든 객체에 영향을 주기 때문에 확장하지 않는 것이 바람직하다. 신중하게 해야될 행위이다. 방법이 하나 있긴 하다. hasOwnProperty라고있다.
for(var name in o) {
if(o.hasOwnProperty(name)){ //인자로 전달한 프로퍼티가 자신의 프로퍼티인 것만 뽑아준다. 즉, Object.prototype.contain은 상속받았기 때문에 자신의 프로퍼티가 아니라 뽑히지 않는 것이다. 
console.log(name);
}

데이터 타입
데이터 타입은 크게 두 가지로 구분된다. 원시(기본) 데이터 타입 vs 객체(참조) 데이터 타입이다. 
객체가 아닌 데이터 타입을 원시 데이터 타입(primitive type)이라고 한다. (ex. 숫자, 문자열, Boolean, null, undefined) 나머지는 모두 객체 데이터 타입이다.
var str = ‘coding’; 	//str이라는 변수에 coding이라는 문자열을 넣는다.
console.log(str.length);	//str을 객체로 접근해서 길이를 반환한다.
console.log(str.charAt(0));
여기서 이상한 부분이 있다. 문자열은 원시 데이터 타입인데 str.length면 객체를 접근하는 거 아닌가!!
.은 Object access Operator(객체 접근 연산자)이다. .을 썼다라는 건 . 앞에 있는 게 객체라는 걸 뜻한다. str에 담겨있는 건 객체이고 그것은 문자열이니 문자열은 객체라는 뜻이다. 어떻게 이럴 수 있을까?
자바스크립트는 문자열을 제어하기 위해서 객체인 것처럼 동작하게 한다. 즉, 원시 데이터 타입을 임시로 객체로 만들고 결과를 나타낸 뒤에 사용이 끝난 객체는 원래의 원시 데이터 타입으로 돌려준다! var str = ‘coding’; -> str = new String(‘coding’); // 이런 식으로
새로운 코드를 보자.
var str = ‘coding’; 	// str에 문자를 집어 넣고
str.prop = ‘everybody’; 	//str객체의 속성에 문자열을 또 준다. 즉, 여기서 순간적으로 str을 객체로 바꿔줘서 오류가 뜨지 않는다!
console.log(str.prop);	//하지만 정작 str.prop의 값을 가져오려고 하면 그 때는 undefined가 된다. 
이러한 객체를 wrapper object라고 한다. wrap의 뜻이 감싸다는 뜻이니 원시 데이터 타입을 감싸주는 객체를 말한다.
	객체처럼 사용할 수 없지만 레퍼 객체가 있기 때문에 가능하다. 자바스크립트는 레퍼 객체를 지원하지만 다른 언어에서는 지원하지 않는 경우도 있다.
	숫자, 문자열, True/false는 number,string,Boolean로 레퍼객체가 있지만 null, undefined는 레퍼 객체가 없다.

참조
현실의 사물과 다르게 전자화된 시스템 위의 데이터를 복제하는데는 비용이 거의 들지 않는다. 프로그래밍에서 복제가 무엇인가를 살펴보자.
var a = 1;
var b = a;	//b에다가 a를 담았다. //여기서 a의 값, 1을 복제해서 b에다 담은 것이기 때문에 a에게는 아무런 영향도 주지 않는다. 즉, a가 원시 데이터 타입일 때 그렇다. string, number, Boolean등등.
b = 2;
console.log(a);	//1
하지만 원시 데이터 타입이 아닌 객체는 다르다.
var a = {‘id’ : 1}; 	//a에 객체를 담는데 가리키는 것이다.
var b = a; //b도 a를 가리키게 되고 b를 수정하게 되면 a도 바뀌게 된다. 가리키는 것 = 참조!!
b = {‘id’ : 2};	//를 하게되면 새로운 객체를 생성하게 되는 것! //b.id = 2;
console.log(a.id);
변수에 담겨있는 데이터가 원시형이면 그 안에는 실제 데이터가 들어있고, 객체면 변수 안에는 데이터에 대한 참조 방법이 들어있다고 할 수 있다.

var a = 1;
function func(b) {	// b =a
	b = 2;	//함수 안에서 b=2로 하게 되면??
}
func(a);
console.log(a);	//복제하고 하기 때문에 영향을 주지 않는다.

var a = {‘id’ : 1};	//a에 담겨있는 게 객체다!
function func b {	//b=a; //여기까지 a와 b 둘 다 ‘id’ : 1만 가리키고 있지만
	b = {‘id : 2’};	// 얘로 인해서 b는 새로운 객체를 갖게 된다.
}
func(a);
console.log(a.id);	

var a = {‘id’:1};
function func(b){		//b와a는 같은 값을 참조하고 있고
	b.id = 2;		// 얘는 id값을 바꾸고 있기 때문에 2로 바뀐다.
}
func(a);
console.log(a.id);















