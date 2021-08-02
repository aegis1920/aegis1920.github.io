---
layout  : wiki
title   : git
summary : 
date    : 2019-06-20 09:23:50 +0900
updated : 2021-08-03 00:38:32 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# git

## 누가 만들었나?

리누스 토발즈가 리눅스 커널을 관리하던 와중 기존 툴이 너무 엉망이라서 빡친 바람에 2주만에 git을 만들어버린다.

## 구조

git은 전체 기록과 각 기록을 추적할 수 있는 정보를 포함하고 있는 저장소다. 메인저장소와 격리시켜 따로 개발할 수 있는 branch 기능이 있으며 개발이 완료되면 메인저장소와 합칠 수 있다. 또한 원격으로 저장할 수 있는 github이라는 사이트가 있다. 즉, git을 호스팅하는 가장 큰 사이트다. 인터넷만 있다면 어디서든지 다운받거나 다른 사람의 소스파일을 볼 수 있다.
게다가 비슷한 파일이 많아질수록 용량은 많아지고 파일과 파일 사이에 뭐가 바뀌었는지 차이를 알기 힘듭니다.  **그래서 이를 관리하는 소프트웨어가 GIT이라는 버전 관리 시스템입니다.**

### git의 객체

- 파일은 blob이 된다
- commit 객체 = tree(blob 포함) + 메타정보

## git의 기초

git은 파일의 변화를 저장하는 게 아니라 내가 원하는 시간대에 commit해서 시간순으로 프로젝트의 스냅샷(특정 시간의 저장 장치의 상태 - 만약 파일이 바뀌지 않았다면 파일을 저장하는 게 아니라 그 파일에 대한 링크만 저장)을 저장한다.

git은 거의 모든 명령을 로컬에서 실행한다. 인터넷이 켜지지 않아도 프로젝트의 히스토리를 관리할 수 있다. 다른 VCS시스템에서는 서버가 켜지지 않으면 commit할 수 없다고 한다.

git은 모든 데이터를 SHA-1 해시를 사용해 데이터를 관리한다. 심지어 파일 이름도 해시로 저장한다.

git은 뭘 하든 데이터를 추가한다. 되돌리거나 데이터를 삭제할 방법이 없다. commit하고 나면 데이터를 잃어버리기 어렵다.

### Local에서 3가지 상태와 3가지 단계

git은 파일을 3가지 상태인 staged, modified, commited의 상태로 관리한다.

git은 프로젝트를 3가지 단게인 working directory, staging area, git directory의 단계로 관리한다. 

git directory는 항상 만들어지는 .git 디렉토리를 말한다. 여기에 프로젝트의 메타데이터와 객체 데이터베이스를 저장하고 있다. commit이나 원격 저장소 주소 등등...

working directory는 git directory가 자기 자신안에서 압축된 데이터베이스에서 파일을 가져와 working directory를 만든다. 내가 작업하고 있는 현재 디렉토리라고 생각하면 되겠다.

staging area는 git directory에 있는 파일. 곧 커밋할 파일에 대한 정보를 저장한다.

말로 생각하면 어렵지만 우리가 하던 init -> add -> commit 과정이라고 생각하면 쉽다.


#### 총 과정

git init을 하면 .git이 생기고 working directory에서 파일을 수정하면 git add를 해줘야 하고 add를 하면 staging area로 가서 곧 commit할 스냅샷을 만들고 commit을 하면 staging area에 있는 파일들을 commit해서 .git에 영구적인 스냅샷으로 저장한다.

>
.git에 있는 파일들은 commited 상태이고 staging area에 추가했다면 staged 상태, 아직 staging area에 추가하지 않았다면 modified이다.

## git에서 자주 쓰이는 Command
```
git clone <누군가의 git 저장소>

git config --global user.name "aegis1920"
git config --global user.email "aegis1920@gmail.com"
git config --list

git init

git add .

git commit -m "first init"
git commmit --amend

git status
git diff

git log

git remote -v
git remote add aegis <원격저장소 주소>
git remote remove origin
git remote show origin

git fetch origin
git pull origin

git push origin master

git branch hotfix
git checkout hotfix

git checkout master
git merge hotfix 
git branch -d hotfix

git branch
git branch -v

git fetch --prune // 원격 저장소에서 지워진 브랜치를 로컬에 반영

git rm --cached <file // git이 수정여부를 체크할 때 기존에 버전관리했던 건 캐시해놓기때문에 완전히 삭제하려면 이 명령을 써야한다.

```

- 혹시나 `merge conflict`가 났을 때 `git merge --abort`를 쓰면 취소가 된다.
- 저장소에 따라 merge 정책이 다르기 때문에 `rebase`를 할지, `pull`를 할지 골라야된다.



## Git의 기본 이해(큰 줄기)

Git은 버전 관리 시스템(VCS, Version Control System)입니다.

**버전 관리 시스템은 파일의 이름을 더럽히지 않는 방법입니다.**  파일의 이름을 바꾸지 않고 소스코드를 백업하고, 이전 상태로 회복하고, 다른 사람들과 공유할 수 있습니다.

예를 들어, 우리는 어떤 파일을 수정할 때마다 다른 이름의 파일로 저장합니다. memo.txt, memo1.txt, … memo_final.txt 이런 식으로 저장해나갑니다. 하지만 우리는 하나의 파일만 관리하지 않습니다. 만약 파일이 많고 수정하는 사람이 많다면 파일을 관리하는 일은 아주 복잡해질 것입니다. 게다가 비슷한 파일이 많아질수록 용량은 많아지고 파일과 파일 사이에 뭐가 바뀌었는지 차이를 알기 힘듭니다.  **그래서 이를 관리하는 소프트웨어가 GIT이라는 버전 관리 시스템입니다.**

Git은 우리가 수정한 내용을 기록할 때  `commit`이라는 방법을 사용합니다. 즉, 코드를 길게 써 놓아도 수정한 내용을 간략하게 표현할 수 있습니다. 예를 들어,  **아주 긴 코드 내용을 수정했더라도 수정한 내용을 사용자가 보기 편하게 의미를 기준으로 "~을 추가했습니다"처럼 기록할 수 있습니다.**

또한  `commit`은 사용자가 수정한 '의미’를 전달하기 때문에 하나의 파일뿐만 아니라 여러 파일의 수정 내용도 표현할 수 있습니다.  **즉, 어떠한 파일이 추가되거나 삭제되거나, 그 파일에서 어떤 부분이 변경됐다거나 등등 변경된 부분을 사용자의 의미, 말인 commit으로 표현할 수 있습니다.**

Git은 원본 파일을 건드리지 않고 새로운 실험을 할 수 있는 방법을 제공합니다.  `branch`라는 방법입니다.  `git init`을 하게되면 git 저장소가 생성되는데 이 때 master라는 branch가 기본적으로 생성됩니다. master라는 branch로 버전관리를 잘 하고 있다가 실험을 하고 싶다면 새로운 이름의 branch를 만들면 되는 겁니다.  `git branch hello`로 hello라는 branch가 만들어지고  `git checkout hello`를 통해 master에서 hello라는 branch로 바꿉니다. 이렇게 되면 hello는 master와 완전히 동일한 상태를 가진 공간이 됩니다.  **hello에서 수정하고 commit하면 hello에만 기록이 되고 master에는 아무런 영향을 주지 않습니다.**

hello에서 실험을 하고 있다가 master로 가고 싶다면? 그냥 checkout으로 가면 됩니다.  **이 때 작업 중인 위치를 가르키는 가상의 커서가 존재하는데 이를 HEAD라고 합니다.**  이 과정에서 HEAD가 hello에서 master로 옮겨갑니다. 만약 hello에서 실행했던 실험이 실패해서 삭제하고 싶을 때는 master branch로 옮겨서 hello를 삭제하면 됩니다. 실험이 성공했다면 hello와 master를 merge하면 됩니다.

## VCS(Version Control System)란?

1.  Local VCS
    - 파일이 하나 있고 간단한 데이터베이스에 파일의 변경 사항만을 기록하는 것입니다.
2.  CVCS(Centralized Version Control System)
    - 중앙 서버에서 파일들을 가져옵니다. 관리자가 누가 뭘 하는지 꼼꼼히 관리할 수 있고 편리하지만 중앙 서버가 다운되면 진행 중인 작업을 모두 날려버릴 수 있습니다.
    - CVS, Subversion, Perforce 등…
3.  **DVCS(Distributed Version Control System)**
    - 클라이언트가 저장소를 통째로 복제해서 가져옵니다. 그래서 서버에 문제가 생겨도 어느 클라이언트든 복제된 저장소를 다시 서버로 복제시키면 서버가 복구됩니다. + 원격 저장소도 있어 여러 방법으로 함께 작업할 수 있습니다.
    - Git, Mercurial, Bazaar, Darcs 등…

## Git의 장점과 철학

-   다른 VCS들은 시간순으로 각 파일에 대한 변화(델타)를 저장하지만  **Git은 파일을 저장하지 않고 파일에 대한 링크만 저장하며 시간순으로 파일 시스템의 스냅샷(특정 시점에서의 시스템 상태)만 이용합니다.**
    
-   거의 모든 명령을 로컬에서 실행하기 때문에 속도가 매우 빠르고 다른 VCS와 달리 인터넷 없이 오프라인 상태에도 작업할 수 있습니다.
    
-   Git은 SHA-1이라는 해시를 사용하여 체크섬을 만드는데 이 체크섬을 가지고 데이터를 관리합니다. 체크섬은 Git에서 사용하는 가장 기본적인 데이터 단위이면서 기본 철학입니다.
    

## Git의 초기 설정

### Git의 설정 파일들

-   `/etc/gitconfig`  -> 시스템의 모든 사용자와 모든 저장소에 적용됩니다
-   `~/.gitconfig`  -> 특정 사용자에게만 적용됩니다
-   `.git/config`  -> git 디렉토리에 있으며 특정 저장소에만 적용됩니다
-   `.gitignore`  -> 여기에 지정해 놓은 파일들은 Git이 무시합니다. 보통 로그파일이나 빌드 시스템이 자동으로 생성한 파일들이 그렇습니다.
-   이 외에도 vim이 아닌 다른 편집기를 설정해줄 수 있으며 Diff 도구나 alias를 설정해줄 수 있습니다.

### 자신의 정보를 등록하기

-   한 번만 등록하면 됩니다.
-   `git config --global user.name "John Doe"`
    -   자신의 닉네임을 적습니다.
-   `git config --globall user.email johndoe@example.com`
    -   자신의 이메일을 적습니다.
-   git은 commit할 때마다 이 정보를 사용합니다.

### 새로운 git 저장소 만들기

-   `git init`
    -   어떤 디렉토리, 폴더를 버전 관리 대상으로 만듭니다.
-   OR
-   `git clone https://github.com/example/example_project.git`
    -   원격 저장소(github)에 있는 다른 프로젝트를 자신의 로컬 컴퓨터로 복사할 수 있습니다.
    -   변경 이력을 포함해서 모든 데이터가 로컬 컴퓨터에 저장됩니다.

## Git의 작업 경로

1.  Working directory(현재 작업 디렉토리, 폴더) ->  `git add`  ->
2.  Staging area(Index, 임시공간) ->  `git commit`  ->
3.  Local Repository(프로젝트의 메타데이터, 객체 DB가 저장되는 곳) ->  `git push`  ->
4.  Remote Repository(github, Server)

### Working Directory -> Local Repository의 과정

-   Working Directory -> Staging Area
    
    -   `git add <file_name>`
        -   10개의 파일을 수정했지만 그 중 7개(원하는 것)만 tracking하게, staging area에 올라가게 합니다.
    -   `git add *`
        -   현재 디렉토리에 있는 모든 파일을
-   Staging Area -> Local Repository
    
    -   `git commit`
        -   vim이 뜨면서 메세지를 넣을 수 있게 됩니다.
    -   `git commit -m "commit에 대한 message"`
        -   " "에 쓴 것이 바로 적용이 됩니다.
-   **Working directory의 상태들**
    
    -   **Tracked(관리대상이다)**  - 스냅샷에 포함되어 있는 파일
        -   Unmodified - 처음 clone하고 난 다음의 상태. 수정한 게 아무 것도 없으니까.
        -   Modified - 어떤 파일이 수정됐다면 바로 modified로 인식
        -   Staged -  `git add`하고 난 다음의 상태.  `git commit`을 하면 Unmodified로 간다.
    -   **Untracked(관리대상이 아니다)**  - 나머지
-   Ex)  `README.md`  파일의 status 과정
    
    1.  `git init`
    2.  `vim README.md`  -> Untracked
    3.  `git add README.md`  -> Tracked_Staged
    4.  `git commit`  -> Tracked_Unmodified
    5.  `vim README.md`  -> Tracked_Modified
    6.  3번서부터 반복…

![git structure](https://upload.wikimedia.org/wikipedia/commons/2/29/Git_data_flow.png)

### Commit message convention

1.  한글보다는 영문
2.  제목과 본문 사이에 공백을 써서 분리
3.  제목은 영문 50자 이내
4.  제목의 첫 글자는 대문자
5.  제목 끝에 .(마침표) 쓰지 말기
6.  제목은 명령문으로 쓰기(아래는 예시이다)
    -   Remove deprecated methods
    -   Update getting started documentation
    -   Merge ~, Refactor ~, Release ~, Add ~, Fix ~등등…
7.  본문은 영문 기준 72자마다 줄 바꾸기
8.  본문은 어떻게보다 '무엇을, 왜’에 맞춰 작성하기

## Git 확인 명령어

-   `git status`
    -   git 상태 확인 명령어
    -   중간중간에 치면서 수시로 확인하면 좋습니다.
-   `git log`
    -   지금까지 한 commit들을 확인하고 싶을 때
-   `git log -p`
    -   지금까지 한 commit을 확인하면서 각 commit의 diff 결과를 보여줍니다.
-   `git diff`
    -   최근 변경 중 뭐가 변경됐는지 확인하고 싶을 때(+가 변경, -가 삭제한 것)
-   `git diff <원래 가지> <비교 대상 가지>`  
    * 어떤 branch에서 바뀌었는지 비교할 때

## 원격 서버(github)에 올리고 가져오기

### 원격(remote) 저장소

-   저장소는 여러 개가 있을 수 있습니다. 어떤 저장소는 읽고 쓰기 모두 할 수 있고 어떤 저장소는 읽기 권한만 있을 수 있습니다.

### 원격 서버에 올리기

-   `git remote add origin https://github.com/example/example_project.git`
    
    -   원격 서버의 주소([https://github.com/example/example_project.git](https://github.com/example/example_project.git), URL)를 origin이라는 저장소에 추가하는(add) 작업입니다.
    -   그러면 이제 URL을 origin으로 간단하게 표현할 수 있습니다.
-   `git push origin master`
    
    -   원격 서버(github)의 원격 저장소(origin)에 master라는 branch를 올리는 작업입니다.

### 원격 서버에서 가져오기

-   `git pull origin master`
    
    -   원격 서버(github)의 원격 저장소(origin)에 있는 내용을 로컬 컴퓨터의 현재 디렉토리로 가져와서 갱신합니다.
        
    -   pull을 실행한 후 수정하고 push하고 싶을 때, 다른 사람이 Push를 해서 원격 저장소가 업데이트 됐다면 현재 내 로컬에 있는 것은 최신 버전이 아니기 때문에 push 요청이 거부됩니다.
        
    -   `git pull`을 통해 최신 변경 이력으로 만들면 자동으로 merge되지만 충돌이 발생해 자동으로 merge되지 않는 부분이 나타날 수 있습니다. 직접 가서 변경해줘야 합니다. 그 후, 다시 add하고 commit해주면 됩니다.
        
-   `git fetch origin`
    
    -   수정된 데이터을 모두 로컬로 가져오지만 merge하지 않습니다.

## Pull request

-   다른 프로젝트에 내가 만든 commit을 제출한다는 의미입니다.
-   상대방 프로젝트를 fork해서 내 github 계정에서 관리되는 프로젝트로 새로 만들어두고 fork한 github 프로젝트를 토대로 새로운 commit 내용들을 제출하는 과정입니다.
-   `git checkout -b hello`
-   branch를 새로 만든 후, commit하고  `git push origin hello`를 해서 원격 저장소에 올립니다.
-   fork해서 만들어진 프로젝트 페이지에서 branch 탭에 자신의 branch를 찾아서 pull-request를 누르면 됩니다.

## 되돌리기

-   `git commit --amend`
    
    -   가장 위에 있는 commit만 수정하기
-   `git reset`
    
    -   `git add test.txt`했던 것을 취소할 때.
-   `git reset HEAD <file>`
    
    -   Staged 상태에 있는  `<file>`을 Unstage 상태로 변경합니다.

이미 원격 서버에 commit해서 push가지 했다면?(`git commit -m "test"; git push origin master;`)

-   `git reset HEAD~1`
-   `git push origin master --force`로 강제로 github에 있는 것도 밀어넣어서 수정합니다.

## Branch

branch는 독립적으로 개발하게 할 수 있는 도구입니다. commit을 가리키는 포인터라고 생각하면 됩니다.  `git add README test.rb LISENSE`를  `git commit`으로 commit하면 루트 개체(tree)와 그 루트의 하위 3개의 개체(blob), 메타 데이터와 루트 개체를 가리키는 포인터 정보를 가지는 commit 개체(commit), 총 5개의 개체가 저장됩니다.

최초로 commit하면 master라는 branch는 자동으로 마지막 commit을 가리킵니다. 그리고 HEAD라는 특수 포인터로 현재 작업 중인 branch를 가리킵니다.

1.  Branch만들기
    -   `git branch feature`
2.  hello라는 branch로 가기
    -   `git checkout feature`
    -   동시에 만들면서 갈아탈 수 있습니다.
        -   `git checkout -b feature`
3.  master라는 branch로 돌아가기
    -   `git branch master`
4.  branch 삭제하기
    -   `git branch -d feature_x`

![](https://oer.gitlab.io/oer-on-oer-infrastructure/figures/git/forked-commit-history.svg)

### Branch workflow

-   배포했거나 배포할 코드만 master branch에 merge해서 안정 버전의 코드만 master branch에 둡니다.
-   개발을 진행하고 안정화하는 branch는 develop이나 next라는 이름으로 추가로 만들어 사용합니다.
-   테스트를 거쳐 안정적이라 판단되면 master branch에 merge합니다.
-   생각해보면 안정적인 branch일수록 commit history가 뒤쳐집니다.

### Remote branch

-   remote branch의 이름은  `(remote)/(branch)`의 이름으로 되어있습니다.
-   origin이라는 저장소를 clone하면 로컬의  `master`  branch, remote 저장소의  `master`  branch를 가리키는  `origin/master`가 생성됩니다.
-   remote 서버로부터 저장소 정보를 동기화하려면  `git fetch origin`명령을 사용합니다. 이 명령을 사용하면 origin 서버의 URL을 찾아서 새로운 정보나 origin/master 포인터의 위치를 최신 commit 위치로 이동시킵니다.
-   `git push origin serverfix`라는 명령은 serverfix라는 branch 이름을 리모트의 serverfix branch로 업데이트 하는 것을 의미합니다.

## Merge

-   `git merge test`
    -   현재 branch(master) 기준으로 추가 branch(test)를 병합합니다.

### fast-forward merge 방식

Merge할 branch(test)가 가리키고 있던 commit이 현재의 branch(master)가 가리키는 것보다 단순히  **앞에 있는**  commit이기 때문에 뒤에 있던 branch 포인터(master)는 쉽게 최신 commit으로 이동합니다.

### non-fast-forward merge 방식

-   `git merge test_non`
    
-   현재 branch(master) 기준으로 test_non이라는 branch를 병합합니다.
    
-   자동 merge에 실패해서 conflict(충돌)이 일어났다면 직접 그 파일에 가서 수정해줘야하고 그리
    
-   고나서 commit을 해줍니다. 즉 새롭게 병합이 되는 commit을 생성해주는 것입니다.
    
-   현재 branch(master)가 가리키는 commit이 merge할 branch의 조상이 아니므로 fast-forward merge가 아닙니다. 각 브랜치가 가리키는 commit 두 개와 공통 조상 하나를 사용해서  **3 way merge**라고도 합니다.
    
-   이렇게 git은 merge에 필요한 공통 commit을 자동으로 찾습니다.
    

## Rebase

-   한 branch에서 다른 branch로 합치는 방법은 merge와 rebase가 있습니다.
    
-   rebase는 변경된 사항(따로 나뉘어진 branch)을 patch로 만들고 이를 본래의 commit에 적용시키는 방법입니다.
    
-   `git checkout experiment`로 다른 branch로 간 후에  `git rebase master`를 하면 두 브랜치가 나뉘기 전인 공통 commit으로 이동해서 그 commit부터 checkout한 experiment가 가리키는 commit까지 diff를 차례로 만들어 어딘가에 임시로 저장해 놓습니다.
    
-   rebase할 branch(experiment)가 합칠 branch(master)가 가리키는 commit을 가리키게 해서 아까 저장해 놓았던 변경사항을 차례로 적용합니다.
    
-   즉 가지가 나눠진 branch의 변경사항들을 임시로 저장해 둔 후, 후에 fast forward로 쉽게 적용하는 것입니다.
    
-   rebase는 보통 깨끗한 history를 만들 때 쓰입니다. rebase를 하든, merge를 하든 최종 결과물은 같지만 commit history가 다릅니다. rebase는 branch의 변경사항을 순서대로 다른 branch에 적용, 저장하면서 합치고 merge의 경우는 두 branch의 최종결과만을 가지고 합친다.
    
-   rebase를 사용할 때 주의할 점은 이미 공개 저장소에 push한 commit을 rebase하면 안 된다. 왜냐하면 rebase는 commit의 SHA-1 해쉬를 바꾸기 때문이다. 이렇게 되면 Git은 내용과 날짜, commit 메세지같은데 새로운 commit으로 생각해서 상관없으나 사람들은 혼란스러워할 수 있다.

로컬에 ABD로 된 커밋이 있고 원격에 ABEFG로 된 커밋이 있을 때 rebase를 하면 D가 잠깐 다른 곳에 있다가 온다. ABEFGD가 된다.


#### reference

-   [https://opentutorials.org/course/1](https://opentutorials.org/course/1)
-   [https://backlog.com/git-tutorial/kr/intro/intro1_3.html](https://backlog.com/git-tutorial/kr/intro/intro1_3.html)
-   [https://www.slideshare.net/ibare/dvcs-git?next_slideshow=1](https://www.slideshare.net/ibare/dvcs-git?next_slideshow=1)
-   [http://meetup.toast.com/posts/106](http://meetup.toast.com/posts/106)
-   [https://github.com/JJoriping/git-training-1](https://github.com/JJoriping/git-training-1)
-   [https://git-scm.com](https://git-scm.com/)  (강력추천)# Git

## Git의 기본 이해(큰 줄기)

Git은 버전 관리 시스템(VCS, Version Control System)입니다.

**버전 관리 시스템은 파일의 이름을 더럽히지 않는 방법입니다.**  파일의 이름을 바꾸지 않고 소스코드를 백업하고, 이전 상태로 회복하고, 다른 사람들과 공유할 수 있습니다.

예를 들어, 우리는 어떤 파일을 수정할 때마다 다른 이름의 파일로 저장합니다. memo.txt, memo1.txt, … memo_final.txt 이런 식으로 저장해나갑니다. 하지만 우리는 하나의 파일만 관리하지 않습니다. 만약 파일이 많고 수정하는 사람이 많다면 파일을 관리하는 일은 아주 복잡해질 것입니다. 게다가 비슷한 파일이 많아질수록 용량은 많아지고 파일과 파일 사이에 뭐가 바뀌었는지 차이를 알기 힘듭니다.  **그래서 이를 관리하는 소프트웨어가 GIT이라는 버전 관리 시스템입니다.**

Git은 우리가 수정한 내용을 기록할 때  `commit`이라는 방법을 사용합니다. 즉, 코드를 길게 써 놓아도 수정한 내용을 간략하게 표현할 수 있습니다. 예를 들어,  **아주 긴 코드 내용을 수정했더라도 수정한 내용을 사용자가 보기 편하게 의미를 기준으로 "~을 추가했습니다"처럼 기록할 수 있습니다.**

또한  `commit`은 사용자가 수정한 '의미’를 전달하기 때문에 하나의 파일뿐만 아니라 여러 파일의 수정 내용도 표현할 수 있습니다.  **즉, 어떠한 파일이 추가되거나 삭제되거나, 그 파일에서 어떤 부분이 변경됐다거나 등등 변경된 부분을 사용자의 의미, 말인 commit으로 표현할 수 있습니다.**

Git은 원본 파일을 건드리지 않고 새로운 실험을 할 수 있는 방법을 제공합니다.  `branch`라는 방법입니다.  `git init`을 하게되면 git 저장소가 생성되는데 이 때 master라는 branch가 기본적으로 생성됩니다. master라는 branch로 버전관리를 잘 하고 있다가 실험을 하고 싶다면 새로운 이름의 branch를 만들면 되는 겁니다.  `git branch hello`로 hello라는 branch가 만들어지고  `git checkout hello`를 통해 master에서 hello라는 branch로 바꿉니다. 이렇게 되면 hello는 master와 완전히 동일한 상태를 가진 공간이 됩니다.  **hello에서 수정하고 commit하면 hello에만 기록이 되고 master에는 아무런 영향을 주지 않습니다.**

hello에서 실험을 하고 있다가 master로 가고 싶다면? 그냥 checkout으로 가면 됩니다.  **이 때 작업 중인 위치를 가르키는 가상의 커서가 존재하는데 이를 HEAD라고 합니다.**  이 과정에서 HEAD가 hello에서 master로 옮겨갑니다. 만약 hello에서 실행했던 실험이 실패해서 삭제하고 싶을 때는 master branch로 옮겨서 hello를 삭제하면 됩니다. 실험이 성공했다면 hello와 master를 merge하면 됩니다.

## VCS(Version Control System)란?

1.  Local VCS
    
    -   파일이 하나 있고 간단한 데이터베이스에 파일의 변경 사항만을 기록하는 것입니다.
2.  CVCS(Centralized Version Control System)
    
    -   중앙 서버에서 파일들을 가져옵니다. 관리자가 누가 뭘 하는지 꼼꼼히 관리할 수 있고 편리하지만 중앙 서버가 다운되면 진행 중인 작업을 모두 날려버릴 수 있습니다.
    -   CVS, Subversion, Perforce 등…
3.  **DVCS(Distributed Version Control System)**
    
    -   클라이언트가 저장소를 통째로 복제해서 가져옵니다. 그래서 서버에 문제가 생겨도 어느 클라이언트든 복제된 저장소를 다시 서버로 복제시키면 서버가 복구됩니다. + 원격 저장소도 있어 여러 방법으로 함께 작업할 수 있습니다.
    -   Git, Mercurial, Bazaar, Darcs 등…

## Git의 장점과 철학

-   다른 VCS들은 시간순으로 각 파일에 대한 변화(델타)를 저장하지만  **Git은 파일을 저장하지 않고 파일에 대한 링크만 저장하며 시간순으로 파일 시스템의 스냅샷(특정 시점에서의 시스템 상태)만 이용합니다.**
    
-   거의 모든 명령을 로컬에서 실행하기 때문에 속도가 매우 빠르고 다른 VCS와 달리 인터넷 없이 오프라인 상태에도 작업할 수 있습니다.
    
-   Git은 SHA-1이라는 해시를 사용하여 체크섬을 만드는데 이 체크섬을 가지고 데이터를 관리합니다. 체크섬은 Git에서 사용하는 가장 기본적인 데이터 단위이면서 기본 철학입니다.
    

## Git의 초기 설정

### Git의 설정 파일들

-   `/etc/gitconfig`  -> 시스템의 모든 사용자와 모든 저장소에 적용됩니다
-   `~/.gitconfig`  -> 특정 사용자에게만 적용됩니다
-   `.git/config`  -> git 디렉토리에 있으며 특정 저장소에만 적용됩니다
-   `.gitignore`  -> 여기에 지정해 놓은 파일들은 Git이 무시합니다. 보통 로그파일이나 빌드 시스템이 자동으로 생성한 파일들이 그렇습니다.
-   이 외에도 vim이 아닌 다른 편집기를 설정해줄 수 있으며 Diff 도구나 alias를 설정해줄 수 있습니다.

### 자신의 정보를 등록하기

-   한 번만 등록하면 됩니다.
-   `git config --global user.name "John Doe"`
    -   자신의 닉네임을 적습니다.
-   `git config --globall user.email johndoe@example.com`
    -   자신의 이메일을 적습니다.
-   git은 commit할 때마다 이 정보를 사용합니다.

### 새로운 git 저장소 만들기

-   `git init`
    -   어떤 디렉토리, 폴더를 버전 관리 대상으로 만듭니다.
-   OR
-   `git clone https://github.com/example/example_project.git`
    -   원격 저장소(github)에 있는 다른 프로젝트를 자신의 로컬 컴퓨터로 복사할 수 있습니다.
    -   변경 이력을 포함해서 모든 데이터가 로컬 컴퓨터에 저장됩니다.

## Git의 작업 경로

1.  Working directory(현재 작업 디렉토리, 폴더) ->  `git add`  ->
2.  Staging area(Index, 임시공간) ->  `git commit`  ->
3.  Local Repository(프로젝트의 메타데이터, 객체 DB가 저장되는 곳) ->  `git push`  ->
4.  Remote Repository(github, Server)

### Working Directory -> Local Repository의 과정

-   Working Directory -> Staging Area
    
    -   `git add <file_name>`
        -   10개의 파일을 수정했지만 그 중 7개(원하는 것)만 tracking하게, staging area에 올라가게 합니다.
    -   `git add *`
        -   현재 디렉토리에 있는 모든 파일을
-   Staging Area -> Local Repository
    
    -   `git commit`
        -   vim이 뜨면서 메세지를 넣을 수 있게 됩니다.
    -   `git commit -m "commit에 대한 message"`
        -   " "에 쓴 것이 바로 적용이 됩니다.
-   **Working directory의 상태들**
    
    -   **Tracked(관리대상이다)**  - 스냅샷에 포함되어 있는 파일
        -   Unmodified - 처음 clone하고 난 다음의 상태. 수정한 게 아무 것도 없으니까.
        -   Modified - 어떤 파일이 수정됐다면 바로 modified로 인식
        -   Staged -  `git add`하고 난 다음의 상태.  `git commit`을 하면 Unmodified로 간다.
    -   **Untracked(관리대상이 아니다)**  - 나머지
-   Ex)  `README.md`  파일의 status 과정
    
    1.  `git init`
    2.  `vim README.md`  -> Untracked
    3.  `git add README.md`  -> Tracked_Staged
    4.  `git commit`  -> Tracked_Unmodified
    5.  `vim README.md`  -> Tracked_Modified
    6.  3번서부터 반복…

![git structure](https://upload.wikimedia.org/wikipedia/commons/2/29/Git_data_flow.png)

### Commit message convention

1.  한글보다는 영문
2.  제목과 본문 사이에 공백을 써서 분리
3.  제목은 영문 50자 이내
4.  제목의 첫 글자는 대문자
5.  제목 끝에 .(마침표) 쓰지 말기
6.  제목은 명령문으로 쓰기(아래는 예시이다)
    -   Remove deprecated methods
    -   Update getting started documentation
    -   Merge ~, Refactor ~, Release ~, Add ~, Fix ~등등…
7.  본문은 영문 기준 72자마다 줄 바꾸기
8.  본문은 어떻게보다 '무엇을, 왜’에 맞춰 작성하기

## Git 확인 명령어

-   `git status`
    -   git 상태 확인 명령어
    -   중간중간에 치면서 수시로 확인하면 좋습니다.
-   `git log`
    -   지금까지 한 commit들을 확인하고 싶을 때
-   `git log -p`
    -   지금까지 한 commit을 확인하면서 각 commit의 diff 결과를 보여줍니다.
-   `git diff`
    -   최근 변경 중 뭐가 변경됐는지 확인하고 싶을 때(+가 변경, -가 삭제한 것)
-   `git diff <원래 가지> <비교 대상 가지>`  
    * 어떤 branch에서 바뀌었는지 비교할 때

## 원격 서버(github)에 올리고 가져오기

### 원격(remote) 저장소

-   저장소는 여러 개가 있을 수 있습니다. 어떤 저장소는 읽고 쓰기 모두 할 수 있고 어떤 저장소는 읽기 권한만 있을 수 있습니다.

### 원격 서버에 올리기

-   `git remote add origin https://github.com/example/example_project.git`
    
    -   원격 서버의 주소([https://github.com/example/example_project.git](https://github.com/example/example_project.git), URL)를 origin이라는 저장소에 추가하는(add) 작업입니다.
    -   그러면 이제 URL을 origin으로 간단하게 표현할 수 있습니다.
-   `git push origin master`
    
    -   원격 서버(github)의 원격 저장소(origin)에 master라는 branch를 올리는 작업입니다.

### 원격 서버에서 가져오기

-   `git pull origin master`
    
    -   원격 서버(github)의 원격 저장소(origin)에 있는 내용을 로컬 컴퓨터의 현재 디렉토리로 가져와서 갱신합니다.
        
    -   pull을 실행한 후 수정하고 push하고 싶을 때, 다른 사람이 Push를 해서 원격 저장소가 업데이트 됐다면 현재 내 로컬에 있는 것은 최신 버전이 아니기 때문에 push 요청이 거부됩니다.
        
    -   `git pull`을 통해 최신 변경 이력으로 만들면 자동으로 merge되지만 충돌이 발생해 자동으로 merge되지 않는 부분이 나타날 수 있습니다. 직접 가서 변경해줘야 합니다. 그 후, 다시 add하고 commit해주면 됩니다.
        
-   `git fetch origin`
    
    -   수정된 데이터을 모두 로컬로 가져오지만 merge하지 않습니다.

## Pull request

-   다른 프로젝트에 내가 만든 commit을 제출한다는 의미입니다.
-   상대방 프로젝트를 fork해서 내 github 계정에서 관리되는 프로젝트로 새로 만들어두고 fork한 github 프로젝트를 토대로 새로운 commit 내용들을 제출하는 과정입니다.
-   `git checkout -b hello`
-   branch를 새로 만든 후, commit하고  `git push origin hello`를 해서 원격 저장소에 올립니다.
-   fork해서 만들어진 프로젝트 페이지에서 branch 탭에 자신의 branch를 찾아서 pull-request를 누르면 됩니다.

## 되돌리기

-   `git commit --amend`
    
    -   가장 위에 있는 commit만 수정하기
-   `git reset`
    
    -   `git add test.txt`했던 것을 취소할 때.
-   `git reset HEAD <file>`
    
    -   Staged 상태에 있는  `<file>`을 Unstage 상태로 변경합니다.

이미 원격 서버에 commit해서 push가지 했다면?(`git commit -m "test"; git push origin master;`)

-   `git reset HEAD~1`
-   `git push origin master --force`로 강제로 github에 있는 것도 밀어넣어서 수정합니다.

## Branch

branch는 독립적으로 개발하게 할 수 있는 도구입니다. commit을 가리키는 포인터라고 생각하면 됩니다.  `git add README test.rb LISENSE`를  `git commit`으로 commit하면 루트 개체(tree)와 그 루트의 하위 3개의 개체(blob), 메타 데이터와 루트 개체를 가리키는 포인터 정보를 가지는 commit 개체(commit), 총 5개의 개체가 저장됩니다.

최초로 commit하면 master라는 branch는 자동으로 마지막 commit을 가리킵니다. 그리고 HEAD라는 특수 포인터로 현재 작업 중인 branch를 가리킵니다.

- HEAD는 commit을 참조할 수 있는데 이는 detached 상태라 좋지 않다.

1.  Branch만들기
    -   `git branch feature`
2.  hello라는 branch로 가기
    -   `git checkout feature`
    -   동시에 만들면서 갈아탈 수 있습니다.
        -   `git checkout -b feature`
3.  master라는 branch로 돌아가기
    -   `git branch master`
4.  branch 삭제하기
    -   `git branch -d feature_x`

![](https://oer.gitlab.io/oer-on-oer-infrastructure/figures/git/forked-commit-history.svg)

- git status
    - git status가 깨끗한 상태라는 건 stage와 working tree가 모두 같다는 의미

### Branch workflow

-   배포했거나 배포할 코드만 master branch에 merge해서 안정 버전의 코드만 master branch에 둡니다.
-   개발을 진행하고 안정화하는 branch는 develop이나 next라는 이름으로 추가로 만들어 사용합니다.
-   테스트를 거쳐 안정적이라 판단되면 master branch에 merge합니다.
-   생각해보면 안정적인 branch일수록 commit history가 뒤쳐집니다.

### Remote branch

-   remote branch의 이름은  `(remote)/(branch)`의 이름으로 되어있습니다.
-   origin이라는 저장소를 clone하면 로컬의  `master`  branch, remote 저장소의  `master`  branch를 가리키는  `origin/master`가 생성됩니다.
-   remote 서버로부터 저장소 정보를 동기화하려면  `git fetch origin`명령을 사용합니다. 이 명령을 사용하면 origin 서버의 URL을 찾아서 새로운 정보나 origin/master 포인터의 위치를 최신 commit 위치로 이동시킵니다.
-   `git push origin serverfix`라는 명령은 serverfix라는 branch 이름을 리모트의 serverfix branch로 업데이트 하는 것을 의미합니다.

## Merge

-   `git merge test`
    -   현재 branch(master) 기준으로 추가 branch(test)를 병합합니다.

### fast-forward merge 방식

Merge할 branch(test)가 가리키고 있던 commit이 현재의 branch(master)가 가리키는 것보다 단순히  **앞에 있는**  commit이기 때문에 뒤에 있던 branch 포인터(master)는 쉽게 최신 commit으로 이동합니다.

### non-fast-forward merge 방식

-   `git merge test_non`
    
-   현재 branch(master) 기준으로 test_non이라는 branch를 병합합니다.
    
-   자동 merge에 실패해서 conflict(충돌)이 일어났다면 직접 그 파일에 가서 수정해줘야하고 그리
    
-   고나서 commit을 해줍니다. 즉 새롭게 병합이 되는 commit을 생성해주는 것입니다.
    
-   현재 branch(master)가 가리키는 commit이 merge할 branch의 조상이 아니므로 fast-forward merge가 아닙니다. 각 브랜치가 가리키는 commit 두 개와 공통 조상 하나를 사용해서  **3 way merge**라고도 합니다.
    
-   이렇게 git은 merge에 필요한 공통 commit을 자동으로 찾습니다.
    

## Rebase

-   한 branch에서 다른 branch로 합치는 방법은 merge와 rebase가 있습니다.
    
-   rebase는 변경된 사항(따로 나뉘어진 branch)을 patch로 만들고 이를 본래의 commit에 적용시키는 방법입니다.
    
-   `git checkout experiment`로 다른 branch로 간 후에  `git rebase master`를 하면 두 브랜치가 나뉘기 전인 공통 commit으로 이동해서 그 commit부터 checkout한 experiment가 가리키는 commit까지 diff를 차례로 만들어 어딘가에 임시로 저장해 놓습니다.
    
-   rebase할 branch(experiment)가 합칠 branch(master)가 가리키는 commit을 가리키게 해서 아까 저장해 놓았던 변경사항을 차례로 적용합니다.
    
-   즉 가지가 나눠진 branch의 변경사항들을 임시로 저장해 둔 후, 후에 fast forward로 쉽게 적용하는 것입니다.
    
-   rebase는 보통 깨끗한 history를 만들 때 쓰입니다. rebase를 하든, merge를 하든 최종 결과물은 같지만 commit history가 다릅니다. rebase는 branch의 변경사항을 순서대로 다른 branch에 적용, 저장하면서 합치고 merge의 경우는 두 branch의 최종결과만을 가지고 합친다.
    
-   rebase를 사용할 때 주의할 점은 이미 공개 저장소에 push한 commit을 rebase하면 안 된다. 왜냐하면 rebase는 commit의 SHA-1 해쉬를 바꾸기 때문이다. 이렇게 되면 Git은 내용과 날짜, commit 메세지같은데 새로운 commit으로 생각해서 상관없으나 사람들은 혼란스러워할 수 있다.
    
- `git rebase -i HEAD~2` : 현재위치(HEAD)에서 2번째 위치까지 commit 이력을 합치는 것


#### 원격 저장소에서 삭제된 branch 업데이트 하기

- `git remtoe update --prune`

#### git stash

- commit하기는 싫고 지금까지 작업한 것들을 임시로 저장해두고 싶을 때
- `git add`해서 Staging Area에 있는 파일들과 commit하고나서 수정된 파일들을 임시 저장한다
- `git stash list` : stash한 list를 알 수 있다
- `git stash apply` : 해당 stash를 적용한다.
- `git stash drop` : 해당 stash를 제거한다.
- `git stash pop` : 해당 stash를 적용하며 제거한다.

#### reference

-   [https://opentutorials.org/course/1](https://opentutorials.org/course/1)
-   [https://backlog.com/git-tutorial/kr/intro/intro1_3.html](https://backlog.com/git-tutorial/kr/intro/intro1_3.html)
-   [https://www.slideshare.net/ibare/dvcs-git?next_slideshow=1](https://www.slideshare.net/ibare/dvcs-git?next_slideshow=1)
-   [http://meetup.toast.com/posts/106](http://meetup.toast.com/posts/106)
-   [https://github.com/JJoriping/git-training-1](https://github.com/JJoriping/git-training-1)
-   [https://git-scm.com](https://git-scm.com/)  (강력추천)
- [https://learngitbranching.js.org/](실습으로 배울 수 있는 곳)


