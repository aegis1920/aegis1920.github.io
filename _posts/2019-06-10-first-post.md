---
layout: post
title:  "첫 글"
category: blog
date:   2019-06-10 15:11:33 +0900
---

## 첫 글인데 할 말이 많다.

나는 평소에 okky를 자주 본다. 대학교를 다닐 때 부터 okky글을 자주 봤었는데 [jojoldu님의 글](https://jojoldu.tistory.com/247) 을 보고 정말 충격을 먹었었다. 그 분의 노력과 습관을 만들려고 엑셀을 이용하는 것을 보면서 대단하다고 느꼈고 본 받아야겠다고 생각했다.

그렇게 [johngrib님의 github 블로그](https://johngrib.github.io/) 를 찾아보게 됐고 자신만의 위키 형식으로 만들어진 블로그를 보고 나도 만들어보고 싶다는 생각이 들었다.

## 똑같이 만들어보자.

vim은 익숙해지기 위해서 매일 일기를 쓰고 있던 터라 만들 수 있다고 생각이 들었고 바로 vimwiki 플러그인부터 설치했다. 다행히도 [vimwiki에 대한 Johngrib님의 글](https://johngrib.github.io/wiki/vimwiki/) 이 있어서 나름 쉽게? 이해할 수 있었다.

vimwiki를 사용하는 건 좋았는데 Jekyll을 써본 적이 없어 정말 많이 헤맸다. Johngrib님의 github을 fork한다고 해도 쉽사리 이해할 수가 없었다. 물론 [Johngrib님의 위키만들기](https://johngrib.github.io/wiki/my-wiki/) 로 아주 자세히 써 놓으신 글이 있었지만 자바스크립트나 정규표현식도 제대로 모르기에 힘들었다. 심지어 그 안에는 Vue나 axios까지 들어있었으니...

## 나만의 위키 만들기 시작

그래도 일단 해보고 포기하는 게 낫다고 생각이 들어서 fork한 johngrib님의 github 블로그부터 뜯어봤다. 왜 이렇게 폴더를 구분해놓았는지 몰라서 Jekyll에 대해서 찾아봤더니 Jekyll의 디렉토리 구조였다. Jekyll의 공식문서를 천천히 읽어보니 github 블로그가 어떤 구조로 이루어져 있는지 이해가 가기 시작했다. 

그리고 나서 Johngrib님의 위키 만들기 글을 정독하고 또 정독했다. [johngrib님의 skeleton](https://github.com/johngrib/johngrib-jekyll-skeleton) 을 복사해서 바꿔서 localhost로 실행해보고 고쳐서 다시 실행해보고를 반복했다. 게다가 이게 또 윈도우 10인데다가 gvim을 쓰고 있어서 그런지 이상한 오류가 났다. 구글링해서 또 찾아서 고치고. 

## 드디어 완성?

한 일주일아니, 2주일 이상 걸렸음에도 불구하고 완벽하게 구현하지 못 했다. 어이가 없는 게 영어는 괜찮은데 한글은 utf-8문제로 쓰여지지가 않았다. 구글링을 아무리 해도 해답이 보이지 않았다. 괜히 여기에 시간을 투자하는 것보다 내가 만들어가는 게 낫겠다 싶어 기본 테마인 minima에다가 천천히 살을 붙이기로 마음먹었다. 진짜 말은 쉽게하지만 이 한글 문제 때문에 너무나 오랜 시간을 소비했다.  

### 문제의 장면
`bundle exec jekyll serve`를 하게 되면 아래 사진과 같이 뜬다. 정말 이 장면만 뻥 안 치고 100번은 본 것 같다. 게다가 윈도우이기 때문인지는 모르겠으나 매번 켤 때마다 `chcp 65001`도 쳤어야 했다...ㅠㅠ

![utf-8-한글문제](/assets/img/utf-8-problem.png)

`config.yml`에 `encoding: utf-8`을 해줘도 안 된다...

검색기능이나 paginate, 글 당 update 일자 등등 할 게 많다. 주말에 시간 날 때 해봐야겠다.

