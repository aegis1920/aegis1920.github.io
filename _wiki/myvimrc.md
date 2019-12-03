---
layout  : wiki
title   : "내 vimrc"
summary : 
date    : 2019-06-19 17:23:47 +0900
updated : 2019-12-03 16:54:51 +0900
tags    : 
toc     : true
public  : true
parent  : vim
latex   : false
---
* TOC
{:toc}

# 제 vimrc입니다.

## 나만의 gvim 설정방법

1. https://www.vim.org/download.php 에서 **Self-installing executable**을 설치한다.
2. 모두 기본 설정값으로 넘겨주고 해당하는 폰트를 컴퓨터에 설치해준다.
3. `:cd $VIM`으로 찾아들어가면 _vimrc 파일이 있다. 그 파일에  `set clipboard=unnamed`를 써서 윈도우와 복사 & 붙여넣기가 활성화되도록 하자.
4. 코드를 모두 복붙한다.
5. `git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim` 을 통해서 Vundle 을 해당하는 경로에 클론한다.
6. `:PluginInstall`을 해주면 내가 썼던 플러그인들이 설치가 된다.

> vimwiki를 위한 설정들이 있어서 조금 복잡할 수 있습니다 :)

```vim
source $VIMRUNTIME/vimrc_example.vim "vimrc의 예시 설정이 들어가 있다.
source $VIMRUNTIME/mswin.vim "mswin 윈도우에 맞도록 설정되어 있다. 
behave mswin 

"기본적으로 들어가있는 set diffexpr=MyDiff()는 vim을 vi처럼 행동하게 하는
"것이다. default가 그렇게 되어있다.  쓸모 없기 때문에 삭제했다. 
"
 "vi와 호환하지 않는다. 즉, vim을 vim답게 만든다.
set nocompatible

"undofile을 만들지 않습니다.
set noundofile
set nobackup

" 파일 형식 인식, 파일 형식 플러그인 사용
filetype plugin on

" 한글입력을 하다 NORMAL모드로 돌아갔을 때 영문이 기본으로 되는 것
set noimd

"rtp, 즉 runtimepath($VIMRUNTIME에 ~/.vim을 추가한다. 윈도우는 .vim이다. 
set rtp+=~/.vim/bundle/Vundle.vim


"플러그인을 편리하게 해주는 vundle.
call vundle#begin('')

Plugin 'vundleVim/Vundle.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'tomasr/molokai'
Plugin 'vimwiki/vimwiki'
Plugin 'mhinz/vim-startify'
Plugin 'Raimondi/delimitMate'

call vundle#end()

"filetype.vim, plugin.vim, indent.vim을 켠다. 
filetype plugin indent on

"테마를 molokai로 바꾼다.
colorscheme molokai

" vimwiki를 위한 설정들
let maplocalleader = "\\"

" 1번 위키는 공개용, 2번 위키는 개인용
let g:vimwiki_list = [
    \{
    \   'path': 'C:\Users\multicampus\Desktop\git\aegis1920.github.io\_wiki',
    \   'ext' : '.md',
    \   'diary_rel_path': '.',
    \},
    \{
    \   'path': 'C:\Users\multicampus\Desktop\Dropbox\wiki',
    \   'ext' : '.md',
    \   'diary_rel_path': '.',
    \}
\]

" 이렇게 해줘야 편하다고 한다.
let g:vimwiki_conceallevel = 0

" wiki를 열기위한 map 지정
command! WikiIndex :VimwikiIndex
nmap <LocalLeader>ww <Plug>VimwikiIndex
nmap <LocalLeader>wi <Plug>VimwikiDiaryIndex
nmap <LocalLeader>w<LocalLeader>w <Plug>VimwikiMakeDiaryNote
nmap <LocalLeader>wt :VimwikiTable<CR>

" 찾기 기능
nnoremap <F4> :execute "VWS /" . expand("<cword>") . "/" <Bar> :lopen<CR>

nnoremap <S-F4> :execute "VWB" <Bar> :lopen<CR>

function! LastModified()
    if &modified
        let save_cursor = getpos(".")
        let n = min([10, line("$")])
        keepjumps exe '1,' . n . 's#^\(.\{,10}updated\s*: \).*#\1' .
              \ strftime('%Y-%m-%d %H:%M:%S +0900') . '#e'
        call histdel('search', -1)
        call setpos('.', save_cursor)
    endif
endfun

autocmd BufWritePre *.md call LastModified()

" 새로운 파일을 만들 때 메타 데이터를 입력해주는 함수
function! NewTemplate()
    
    " 만약 줄 개수가 1개 이상이라면 return
    if line("$") > 1
        return
    endif

 let l:template = []
    call add(l:template, '---')
    call add(l:template, 'layout  : wiki')
    call add(l:template, 'title   : ')
    call add(l:template, 'summary : ')
    call add(l:template, 'date    : ' . strftime('%Y-%m-%d %H:%M:%S +0900'))
    call add(l:template, 'updated : ' . strftime('%Y-%m-%d %H:%M:%S +0900'))
    call add(l:template, 'tags    : ')
    call add(l:template, 'toc     : true')
    call add(l:template, 'public  : true')
    call add(l:template, 'parent  : ')
    call add(l:template, 'latex   : false')
    call add(l:template, '---')
    call add(l:template, '* TOC')
    call add(l:template, '{:toc}')
    call add(l:template, '')
    call add(l:template, '# ')
    call setline(1, l:template)
    execute 'normal! G'
    execute 'normal! $'

    echom 'new wiki page has created'
endfunction

autocmd BufRead,BufNewFile *.md :call NewTemplate()


" md 파일을 열 때 markdown syntax를 적용시켜서 열게 함
autocmd BufNewFile,BufFilePre,BufRead *.md,*.markdown,*.mkd set filetype=markdown

" 새로운 라인을 시작할 때, smart하게 auto indent를 해준다.
set smartindent

" tab을 눌렀을 때 인식하는 칸 수 
set tabstop=4

" tab을 space로 확장하라는 설정
set expandtab

" >> << 키로 들여, 내어 쓰기할 때 스페이스 개수
set shiftwidth=4

"<leader>키를 ,로 바꾸어주는 역할.
let mapleader=","

"$MYVIMRC를 map키로 지정한다. rightbelow vnew는 vertical하게 오른쪽 아래에 추가. 즉 ,rc를 누르면 _vimrc가 켜진다. 
nnoremap <Leader>rc :rightbelow vnew $MYVIMRC<CR>

"C compile
map <C-S> :w<CR>
map <F9> :! gcc % -o %<.exe<CR>
map <C-F9> :! %<.exe<CR>


"창 옮기는 걸 쉽게 옮기게 해줄려고 ctrl + 방향키
noremap <C-h> <C-w>h
noremap <C-j> <C-w>j
noremap <C-k> <C-w>k
noremap <C-l> <C-w>l

"nerdtree로 빠르게 가려고 해준 것. ,n을 누르면 왼쪽에 nerdtree가 생긴다. 
nnoremap <C-F> :NERDTreeFind<CR>
nnoremap <Leader>n :NERDTreeToggle<CR> 

let g:NERDTreeCopyCmd='cp-r'

"폰트와 글자크기 적용 
"set guifont=나눔고딕코딩:h10:cHANGEUL:qDRAFT

if has("gui_running")
    "폰트 설정
    set guifont=D2Coding:h11
     
    "VI 시작 크기 설정
    au GUIEnter * winsize 90 40
     
    "VI 시작 위치 설정
    au GUIEnter * winpos 700 0
 
endif

"윈도우에서 복사한 걸 vim에서도 복사할 수 있도록
set clipboard=unnamed

" 라인 수를 표시해준다
set nu

"자동 들여쓰기
set autoindent
set smartindent

"C언어 자동 들여쓰기
set cindent

"검색/치환할 때 대소문자 구별x
set ignorecase

"괄호 입력시 자동으로 대응되는 괄호를 표시해줌
set showmatch

"검색한 단어를 하이라이팅해준다.
set hlsearch

"문법을 적용시켜준다.
syntax on

"gvim에서 한글이 깨지는 문제는 utf-8로 하면 고쳐진다. 근데 이러면 menu가 깨진다. 어차피 메뉴는 안 쓰니까...
set encoding=utf-8
set fileencoding=utf-8

```





