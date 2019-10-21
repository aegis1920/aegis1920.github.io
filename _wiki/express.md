---
layout  : wiki
title   : Express
summary : 
date    : 2019-07-10 10:37:02 +0900
updated : 2019-07-10 11:24:16 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# Express

## Express란?

* Node.js의 웹 프레임워크
* 라우팅, 세션 관리 등 간편하게 구축할 수 있도록 도와준다

## 예시

### package.json 파일 생성
* `npm install`로 의존패키지들을 설치할 수 있다.
* express와 EJS엔진 설치
```javascript
{
  "name": "express-tutorial",
  "version": "1.0.0",
  "dependencies": 
  {
    "express": "~4.13.1",
    "ejs": "~2.4.1"
  }
}
```
### views 폴더 아래에 index.html 파일 생성

```html
<html>
  <head>
    <title>Main</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body>
    Hey, this is index page
  </body>
</html>
```

### public/css에 style.css 파일 생성

```css
body{
	background-color: black;
	color: white;
}
```
### router라는 폴더 안에 main.js라는 파일 생성

```javascript
module.exports = function(app) // server.js에서 모듈로 불러올 수 있도록
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });
}
```

### server.js 파일 생성

```javascript
var express = require('express');
var app = express();
var router = require('./router/main')(app); // main.js를 불러와서 app에 전달.

app.set('views',__dirname + '/views'); // 서버가 읽을 수 있도록 html의 위치를 정의
app.set('views engine', 'ejs'); // EJS 엔진으로 셋팅
app.engine('html', require('ejs').renderFile); // EJS 엔진으로 렌더링

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})

app.use(express.static('public')); // 정적파일인 css를 불러옴.
})
```



