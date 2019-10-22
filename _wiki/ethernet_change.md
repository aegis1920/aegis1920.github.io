---
layout  : wiki
title   : autohotkey를 이용한 이더넷 설정 자동화
summary : 반복되는 일은 꼭 자동화하자
date    : 2019-06-25 11:34:05 +0900
updated : 2019-06-25 13:29:50 +0900
tags    : 
toc     : true
public  : true
parent  : autohotkey
latex   : false
---
* TOC
{:toc}

## 동기

현재 교육받는 곳에서 개개인의 IP를 부여해줬는데 이상하게 몇몇의 IP들은 인터넷 접속이 잘 되지 않았다. 아마 누군가가 개개인의 노트북이나 핸드폰으로 같은 와이파이에 자동으로 접속하다보니 같은 IP에 접속하는 경우가 생긴 것 같다.

인터넷이 잘 안 되니까 나도 자동으로 IP를 잡아준 것으로 접속해보니 잘 됐다. 그래서 인터넷을 쓸 때는 자동으로 접속하고 출결할 때만 인터넷이 잘 안되는 부여받은 IP로 해야될 상황이었다. 

이렇게 생활하는 건 상관없는데 출결할 때 부여받은 IP로 계속 손수 바꿔줘야하니 너무나 귀찮았다. 그래서 간편한 autohotkey로 자동화하면 편하겠다고 생각했다.

## 코드

한글이 입력되지 않아 바로 갈 수가 없어 좌표가 많다. IP는 가려놨다. 여기서 좀 어이가 없는 게 IP 안의 숫자가 3자리 숫자여만 자동으로 다음으로 넘어간다. tab으로 통일하게 넘어가게 해주는 것도 아니고 두 자리나 한 자리인 숫자는 tab으로 3자리면 자동으로 넘어가기에 조금? 신경써야했다. 그리고 sleep 또한 너무 빠르면 프로그램이 뜨기도 전에 실행되기 때문에 1초 정도로 적당히 해주는 게 좋다.

```autohotkey
send, {LWin}
Sleep, 1000
send, control
Sleep, 1000
send, {enter}
sleep, 2000
MouseClick, left,  222, 295
sleep, 1000
MouseClick, left,  411, 119
sleep, 1000
MouseClick, left,  107, 157
sleep, 1000
MouseClick, right, 455, 155
sleep, 1000
MouseClick, left,  580, 426
sleep, 1000
MouseClick, left,  235, 337
sleep, 1000
MouseClick, left,  438, 498
sleep, 1000
MouseClick, left,  100, 235
sleep, 1000
MouseClick, left,  338, 273
sleep, 1000
send, *
send, {right}
send, *
send, {right}
send, *
send, {tab}
send, *
send, {tab}
send, *
send, {right}
send, *
send, {right}
send, *
send, {tab}
send, {tab}
send, *
send, {right}
send, *
send, {tab}
send, *
send, {right}
send, *
```

