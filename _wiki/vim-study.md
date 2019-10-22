---
layout  : wiki
title   : vim을 공부하자
summary : 
date    : 2019-06-20 16:24:03 +0900
updated : 2019-06-20 16:24:49 +0900
tags    : 
toc     : true
public  : true
parent  : vim
latex   : false
---
* TOC
{:toc}

# vim study
 
리눅스에는 vim이 기본적으로 설치가 되지만 윈도우에서 사용하려면 gvim을 따로 설치해야 한다. (type of install을 full로)

command line mode와 command mode와 edit mode 세 가지가 있다. 

두 모드에서 command mode로 가려면 esc를 누르면 된다. 
command mode에서 edit mode로 가려면 a나 i를 누르면 된다. 
command mode에서 command line mode로 가려면 :를 누르면 된다. 

구별
edit mode -> 커서가 일자 막대
command mode -> 커서가 블럭형태
command line mode -> 블럭형태의 커서가 아래에 깜빡

이동키 -> hjkl (화살표를 사용하지 마세요)

vim은 대소문자를 구별한다.

지울 때도 delete나 화살표를 이용하지 않는다

i -> 커서 앞으로 삽입
o -> 줄 삽입
a -> 커서 뒤로 삽입
x -> 삭제

in command line mode
:w hello.txt (write)
:cd (change directory) - 현재 위치 읽음
:w C:\Users\coding\hello.txt
:o C:\Users\coding\hello.txt (open)
:q (quit)
:q! - 강제종료
:wq C:\Users\coding\hello.txt (write and quit)

in command mode 대문자 ZZ 는 :wq와 같다.

in command mode
yy (yank) -> 한 줄 복사 (3yy를 하면 3줄 복사가 된다)
p (put)
숫자를 누르고 p를 누르면 그 만큼 복사가 된다
u (undo)
ctrl + r (redo)

in command mode
/를 누르고 글자를 치면 찾는 글자가 화면에 표시된다. (위에서부터 찾음) 엔터를 누르고 n을 누르면 다음 글자를 계속해서 찾게 됌.

?를 누르고 글자를 치면 아래서부터 찾는다.
N(대문자)을 누르게 되면  /과 ?가 서로 바뀐다.

in command line mode
:set number를 치면 앞에 글자가 보인다

in command mode
$ -> 현재 커서의 라인에서 제일 뒤로 감
^ -> 현재 커서의 라인에서 제일 앞으로 감
W,w -> 다음 단어의 제일 앞으로 이동 (대문자는 기호 포함 한 꺼번에 넘어간다)
B,b -> 이전 단어의 제일 앞으로 이동 ( '' )
E,e -> 다음 단어의 제일 뒤로 이동( '' )

Ctrl+D - page up
Ctrl+U - page up

gg - 문서의 맨 처음
G - 문서의 제일 끝

visual mode는 세 가지가 있다.
command mode에서 v를 누르면 visual, V를 누르면 visual line, ctrl+v를 누르면 visual block

in command mode
d를 누르면 대기상태가 된다. but 비주얼 모드에서는 선택 후 d를 누르면 바로 삭제한다.
dd - 한 줄 삭제
dw - 커서부터 한 단어를 지움.
de - 끝까지 삭제 (bde를 누르면 한 단어 삭제)
d^ - 맨 앞 줄까지 삭제
d$ - 뒷 줄을 다 지움.
dgg, dG도 강력함.

in command mode
* - 찾기커서
r - 한 글자 바꿀 때 - 대기 모드가 되고 명령키 입력이 아니라 글자를 입력하면 그 글자로 변경된다.
c - 단어를 바꿀 때
# - 

motion키 : h,j,k,l,b,w - 이렇게 커서이동키와 같다.
motion 대기 명령 키 - d,c 같이 입력하면 다음 입력을 기다리는 명령키

명령모드 유지 명령키 : h,j,k,l
편집모드 진입 명령키 : i,a,C을 입력하면 편집모드로 바로 진입.

크롬 브라우저에서 vichrome을 다운 받아서 esc를 누른 후 f키를 누르면 키보드로 모두 할 수 있도록 할 수 있다. 










