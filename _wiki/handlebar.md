---
layout  : wiki
title   : handlebar 라이브러리
summary : 
date    : 2019-08-22 22:38:24 +0900
updated : 2019-08-22 23:30:23 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## handlerbar 라이브러리

- 이 라이브러리를를 이용하면 Template literal보다 더 쉽게 templating을 해줄 수 있다.

{}, 중괄호를 기준으로 모두 파싱해준다.

```html
<html>
    <head>
    </head>
        
        <h1>hello world</h1>
        <section class="show">
        </section>
        <script type="myTemplate" id="listTemplate">
        <li>
                <div>게시자 : {{name}}</div>
                <div class="content">{{content}}</div>
                <div>좋아요 : {{like}}</div>
                <div class="comment"> : {{comment}}</div>
        </li>
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
        <script>
            var data = {
                "id" : 88,
                "name" : "crong",
                "content" : "새로운글을 올렸어요",
                "like" : 5, 
                "comment" : "댓글이다"
            };

            var template = document.querySelector("#listTemplate").innerText;
            // 이것을 precompile이라고 부른다. compile함수는 함수를 반환한다
            var bindTemplate = Handlebars.compile(template);
            // 중괄호를 기준으로 파싱해준다.
            var resultHTML = bindTemplate(data);
            var show = document.querySelector(".show");
            show.innerHTML = resultHTML;
        </script>
    </body>
</html>
```

handlebar에 있는 키워드. 
#를 붙이면 키워드를 말해준다. 얘를 기준으로 반복이 일어난다. each를 만날 때까지. 
@index는 for문을 돌면서 접근할 수 있다.index로

배열이면 반복문이 필요.

루프를 돌면서 bindTemplate을 썼다. 그냥 for문을 써도 된다.

#if else문이 존재한다. 

있는 그대로 적으면 될것같다.

템플릿 자체로 다 넣지말고 함수로 분리하자. 라이브러리가 그 함수를 통해서 파싱한다.

키워드를 만들어서 함수로 쓸 수 있다. registerHelper라는 메소드를 쓴다. 키와 밸류로. 짜두면 거기서 동작하게 할 수 있다. 스크립트 안에다 정의해주면 된다. 함수를 실행해준다. HTML 문자열로 들어간다. like에 들어간다. 적절한 시점에 실해준다.
프리컴파일하면 빠르다. 그냥 알고만 있어도 됨
