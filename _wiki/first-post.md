---
layout  : wiki
title   : 첫 글 
summary : 4주간의 고생, 그 놈의 utf-8
date    : 2019-06-19 17:31:35 +0900
updated : 2019-06-24 17:12:07 +0900
tags    : 
toc     : true
public  : true
parent  : blog
latex   : false
---
* TOC
{:toc}

# 첫 글 

## 첫 글인데 할 말이 많다.

나는 평소에 okky를 자주 본다. 대학교를 다닐 때 부터 okky글을 자주 봤었는데 [jojoldu님의 글](https://jojoldu.tistory.com/247) 을 보고 정말 충격을 먹었었다. 그 분의 노력과 습관을 만들려고 엑셀을 이용하는 것을 보면서 대단하다고 느꼈고 본 받아야겠다고 생각했다.

그렇게 [johngrib님의 github 블로그](https://johngrib.github.io/) 를 찾아보게 됐고 자신만의 위키 형식으로 만들어진 블로그를 보고 나도 만들어보고 싶다는 생각이 들었다.

## 똑같이 만들어보자.

vim은 익숙해지기 위해서 매일 일기를 쓰고 있던 터라 만들 수 있다고 생각이 들었고 바로 vimwiki 플러그인부터 설치했다. 다행히도 [vimwiki에 대한 Johngrib님의 글](https://johngrib.github.io/wiki/vimwiki/) 이 있어서 나름 쉽게? 이해할 수 있을 줄 알았지만...

vimwiki를 사용하는 건 좋았는데 Jekyll을 써본 적이 없어 정말 많이 헤맸다. Johngrib님의 github을 fork한다고 해도 쉽사리 이해할 수가 없었다. 물론 [Johngrib님의 위키만들기](https://johngrib.github.io/wiki/my-wiki/) 로 아주 자세히 써 놓으신 글이 있었지만 자바스크립트나 정규표현식도 제대로 모르기에 힘들었다. 

## 나만의 위키 만들기 시작

그래도 일단 해보고 포기하는 게 낫다고 생각이 들어서 fork한 johngrib님의 github 블로그부터 뜯어봤다. 왜 이렇게 폴더를 구분해놓았는지 몰라서 Jekyll에 대해서 찾아봤더니 Jekyll의 디렉토리 구조였다. Jekyll의 공식문서를 천천히 읽어보니 github 블로그가 어떤 구조로 이루어져 있는지 이해가 가기 시작했다. 

그리고 나서 Johngrib님의 위키 만들기 글을 정독하고 또 정독했다. [johngrib님의 skeleton](https://github.com/johngrib/johngrib-jekyll-skeleton) 을 복사해서 바꿔서 localhost로 실행해보고 고쳐서 다시 실행해보고를 반복했다. 게다가 이게 또 윈도우 10인데다가 gvim을 쓰고 있어서 그런지 이상한 오류가 났다. 구글링해서 또 찾아서 고치고. 

## 드디어 완성?

한 일주일아니, 2주일 이상 걸렸음에도 불구하고 완벽하게 구현하지 못 했다. 어이가 없는 게 영어는 괜찮은데 한글은 utf-8문제로 쓰여지지가 않았다. 구글링을 아무리 해도 해답이 보이지 않았다. 괜히 여기에 시간을 투자하는 것보다 내가 만들어가는 게 낫겠다 싶어 기본 테마인 minima에다가 천천히 살을 붙이기로 마음먹었다. 진짜 말은 쉽게하지만 이 한글 문제 때문에 너무나 오랜 시간을 소비했다.  

### 문제의 장면
`bundle exec jekyll serve`를 하게 되면 아래 사진과 같이 뜬다. 정말 이 장면만 뻥 안 치고 100번은 본 것 같다. 게다가 윈도우라서 그런지 매번 켤 때마다 `chcp 65001`도 쳤어야 했다...ㅠㅠ

![utf-8-한글문제](/wiki-img/blog_first-post/utf-8-problem.png)

한글은 utf-8이 맞는데 하면서 구글링을 하고 또 했다. `config.yml`에 `encoding: utf-8`을 해줘도 안 되고 뭘 해도 안 됐다. 이유를 모르겠어서 포기했다.

## 다시 도전

jekyll을 이해하려고 보낸 시간이 좀 아깝기도 하고 이 때가 아니면 또 도전할 일이 없을 것 같아 처음부터 다시 실행해봤다. 안 되는 게 말이 안 되니까. 처음부터 다시 해보던 도중 아차!하고 떠올랐다. 내가 옛날에 gvim을 설치하고 나서 어떤 파일을 열었는데 한글이 모두 깨져있어서 구글링해보니 mswin.vim에 아래와 같은 코드를 쓰라고 했던 게 생각났다. mswin.vim에 가보니 그대로 그렇게 되어있었다.

![cp949](/wiki-img/blog_first-post/cp949.PNG)

와 설마 이 encoding이 cp949로 되어있어서 utf-8로 되는 게 아닌가? 하고 바로 file 커맨드로 확인했다.


![filecommand](/wiki-img/blog_first-post/filecommand.PNG)

![utf8](/wiki-img/blog_first-post/utf8.PNG)

## 완성

진짜였다. 와 ㅠㅠ 드디어 됐다. 진짜 이 문제때문에 엄청나게 고생했다. 문제가 있어도 vimrc에 문제가 있다고 생각했지 mswin.vim에 있다고는 생각못했다. 아무튼 원래의 블로그를 날리고 johngrib님의 블로그를 따라했다.

구글 애널리틱스나 disqus 등 문제는 나중에 생각하고 일단은 wiki만 만들어가면서 해봐야겠다. 상위문서는 똑같이 js파일을 실행하면 되니까 크게 문제는 없을 것 같다.

## 이전에 썼던 내 블로그(나름 추억이라서 남겨둠...)

minima인 기본 테마로 썼었다. category도 추가했었지만 불편한 게 많았다. post를 쓸 때 날짜를 앞에다 쓰는 게 너무 귀찮았고 이걸 없애주는 게 collection인 걸 알았지만 collection만 쓰면 utf-8문제가 일어났다. 원래 쓰고있었던 tistory를 그대로 쓰는 것도 생각했다. 하지만 vim을 계속 사용하고 싶기도 했고 post도 내 마음대로 올릴 수 있다는 점에서 git 블로그가 마음에 들었다.

![utf8](/wiki-img/blog_first-post/myoriginblog.PNG)

![utf8](/wiki-img/blog_first-post/vimrc.PNG)
