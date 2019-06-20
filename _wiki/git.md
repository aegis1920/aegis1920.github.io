---
layout  : wiki
title   : git
summary : 
date    : 2019-06-20 09:23:50 +0900
updated : 2019-06-20 11:26:13 +0900
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

## Command
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
```
