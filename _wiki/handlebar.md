---
layout  : wiki
title   : handlebar 라이브러리
summary : 
date    : 2019-08-22 22:38:24 +0900
updated : 2019-08-26 17:12:14 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 

## handlebar 라이브러리

- 이 라이브러리를를 이용하면 Template literal보다 더 쉽게 templating을 해줄 수 있다.
- handlebar말고도 다른 라이브러리도 많다.

### 기본예제

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
            
            // # 커스텀 키워드를 만들어서 함수로 만들어줄 수 있다.
            {{#likes like}}
                {{like}}
            {{/likes}}

            <div class="comment"> 
            <h3>댓글목록</h3>
            
            // #if를 이용해서 조건문을 만들어줄 수 있다.
            {{#if comment}}
                // each를 이용해서 반복문을 만들어줄 수 있다.
                {{#each comment}}
                    // @를 붙여주면 자동으로 인덱스를 증가시켜준다.
                    <div>{{@index}}번째 댓글 : {{this}}</div>
                {{/each}}
            {{else}}
                <div>댓글이 아직 없군요</div>
            {{/if}}
            </div>
        </li>
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
        <script>
            var data = [
                { "id": 88, "name": "crong", "content": "새로운글을 올렸어요", "like": 5, "comment": ["댓글이다", "잘했어요"] },
                { "id": 28, "name": "hary", "content": "전 오늘도 노래를 불렀어요", "like": 0, "comment": ["제발고만..", "듣고싶네요 그노래"] },
                { "id": 23, "name": "pororo", "content": "크롱이 항상 말썽을 피워서 행복해~", "like": 4, "comment": [] },
                { "id": 5, "name": "pobi", "content": "물고기를 한마리도 잡지 못하다니..", "like": 5, "comment": ["댓글이다", "멋진글이네요", "잘봤습니다"] }
            ];  

            // 여기에 커스텀 helper를 등록해줄 수 있다.
            // 함수로 만들어서 넣어줄 수 있다. 리턴은 문자열로.
            // 여기서 먼저 선언하고 뒤에 호출해줘야 된다.
            Handlebars.registerHelper("likes", function(like){
                if(like > 4){
                    return "<span> 축하해요! 좋아요가 " + like + "개 이상입니다!</span>";
                }else if(like < 1){
                    return "아직 아무도 좋아하지 않아요";
                }else{
                    return like + "개의 좋아요가 있네요";
                }
            });

            // 이것을 precompile이라고 부른다. compile함수는 함수를 반환한다
            var template = document.querySelector("#listTemplate").innerText;
            var bindTemplate = Handlebars.compile(template);

            var resultHTML= "";

            data.forEach(function(item, index){
                // 중괄호를 기준으로 파싱해준다.
                resultHTML += bindTemplate(item);
            });

            var show = document.querySelector(".show");
            show.innerHTML = resultHTML;
            // 다른 방법인 reduce를 이용하는 방법. 재귀를 통해서 계속해서 합쳐준다.
            // var innerHtml = data.reduce(function(prev, next){
            //     return prev + bindTemplate(next);
            // }, "");


        </script>
    </body>
</html>
```
