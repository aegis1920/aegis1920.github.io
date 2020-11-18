---
layout  : wiki
title   : My Woowacourse Pulls 사이드 프로젝트 개발기
summary : 
date    : 2020-09-20 14:01:16 +0900
updated : 2020-11-18 16:27:58 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

### 개발 동기

우아한 테크코스에서는 레벨 마다 미션을 진행한다. 미션을 진행할 때마다 Pull Request를 보내서 코드리뷰를 받는다. 여러 개의 미션을 진행하다보니 Pull Request도 많아질 수 밖에 없었다.

현재 진행하고 있는 미션을 찾거나 옛날에 했던 미션을 찾아가려면 꽤나 많은 과정을 거쳐야 한다. 

처음에는 우아한 테크코스 사이트 -> 프로필 -> '나의 미션' 탭을 통해 들어갔었다.

이 과정이 너무 귀찮아서 "뭔가 좋은 방법이 없을까?" 하다가 간단한 생각이 떠올랐다. "아! 그냥 북마크로 저장하면 되겠네!". 그렇게 한동안 북마크로 저장했다. 미션이 꽤나 많아지자 미션을 할 때마다 매번 북마크를 추가해야 했다. 

<img src="/wiki-img/my-woowacourse-pulls-review/bookmark.png" alt="bookmark" height="400"/>

직접 북마크를 추가하며 북마크에 쌓여가는 링크를 봤다. 너무 번잡했다. "직접 추가하지 않고 자동화하면 편할 것 같은데..." 메모장에 아이디어를 적어놓기만 하고 현재 미션을 진행했다.

### 개발 시작

아이디어만 가지고 있다가 스프링과 프론트를 조금씩 배우면서 구현할 수 있을 것 같다는 생각이 들었다. "단순하게 Github API를 호출해서 조회하면 되지 않을까?". 남는 시간에 빠르게 프론트만 구현해서 시도해봤다.

#### 첫 번째 이슈 (같은 IP는 Github API에 많은 요청을 할 수 없다)

woowacourse가 가지고 있는 모든 Repository를 가지고 오기 위해 for문을 돌렸는데 실패했다. Github API 쪽에서 같은 IP는 여러 번 요청하지 못하도록 막아놨기 때문이다. 개인 토큰을 발급받아야 시간당 최대 5000회까지(2020년 9월 기준) 요청을 보낼 수 있었다. ([LINK](https://developer.github.com/v3/))

#### 두 번째 이슈 (너무나도 느린 Github API)

이대로 요청만 하면 될 줄 알았는데 웬걸...? Github API가 생각보다 너무 느렸다. 모든 Repository와 해당 Repository의 모든 Pull Requests라고 해도 느렸다. 거의 1~2분이 걸렸다. 말이 1~2분이지 체감상 정말 느렸다. 개발해도 사용하지 않을 것 같았다. 이걸 어떻게 해야되나 고민하다가 든 생각. "내가 백엔드를 하나 만들면 되지 않을까?"

### 다시 개발 시작

레벨 3 팀 프로젝트가 끝나고 방학이 됐다. 프로젝트 기간동안 열심히 개발했기에 며칠을 좀 쉬다가 저번에 생각했던 'my woowacourse pulls 백엔드 개발'을 하기로 마음먹었다.

**목표를 세웠다. '쓰레기 코드라도 괜찮으니 방학동안 무조건 배포하기'**

백엔드에서 사용할 기술을 적고 바로 개발에 들어갔다. 최대한 ATDD, TDD로 하려니 쉽지 않았다. 처음 사용해보는 기술(RestTemplate, git submodule 등등...)도 있었으나 테스트코드를 작성하고 직접 코드에 바로 바로 적용하다보니 빠르게 적응할 수 있었다. 외부 API도 적용했으니 깔끔하게 가져올거라 생각했으나...

<img src="/wiki-img/my-woowacourse-pulls-review/slamdunk1.png" alt="slamdunk1" height="400"/>

#### 세 번째 이슈(Github API는 전체 Pull Request를 가져오지 않는다)

Github API는 전체 Pull Request를 가져오지 않았다. 이상하다 싶어 공식 Github API를 자세히 찾아보니 `per_page`라는 개념이 있었다. '페이지당 몇 개까지 보여줄까?' 인데 default가 30개로 되어있었다. (아 얘도 백엔드가 JPA Pageable처럼 구현해놨구나 생각이 들었다. ㅎㅎ 배웠던 기술로 짐작이 간다는 느낌이 새로웠다) `per_page`가 최대 100이었다. 그렇다면 `per_page=100`으로 하고 가져오면 되겠다!

#### 네 번째 이슈(Github API에서 마지막 페이지는 어떻게 알까?)

다시 의문점이 들었다. 그렇다면 마지막 `page`는 어떻게 알지? 였다. 다시 공식 Github API를 열심히 찾아봤다. 마지막 `page`를 알기 위해서는 꽤나 복잡했다. page Param이 있는 채로 요청을 보내면 Link 헤더를 보내주는데 그 안에는 다음 페이지 숫자, 마지막 페이지 숫자가 있었다. 근데 이게 링크(문자열)로 되어있어서 파싱을 해야되는 상황이 벌어졌다.

> 예를 들어서 이런 식으로 Link 헤더에 담겨온다.

```
<https://api.github.com/user/repos?page=3&per_page=100>; rel="next",
  <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
```

> 이때는 몰랐지만 나중에 Link 헤더가 Restful 아키텍처인 HATEOAS를 의미한다는 걸 깨달았다.

링크를 파싱해주는 API 없나? 해서 찾아보니 또 있었다! (([LINK](https://github.com/eclipse/egit-github/tree/master/org.eclipse.egit.github.core))) 그러나 해당 의존성을 추가하자니 마지막 페이지를 알기 위해서 너무 무거운 일이라고 생각이 들었다. 그래서 해당 링크를 참고해 직접 [Page파서](https://github.com/aegis1920/my-woowacourse-pulls/blob/master/src/main/java/com/bingbong/mywoowacoursepulls/utils/PageParser.java)를 만들어서 해결했다.

### 드디어 백엔드 끝! 그리고 인프라

드디어! 전체 Pull Request를 가지고 올 수 있었고 이후에 리펙토링을 조금 했다. 전체 Repository와 전체 Pull Request를 가지고 오는데 둘 다 List 형태면서 로직이 같고 타입만 달라서 배웠던 제네릭을 통해 코드 중복을 줄일 수 있었다. 여기에 함수형 인터페이스도 작성해서 `pageCount`만 주고 `Functional Interface`를 통해 바로 restTemplate을 사용할 수 있도록 했다.

테스트와 백엔드를 완성시키고 `AWS EC2`를 만들었다. 젠킨스도 너무너무 사용하고 싶었지만 젠킨스를 하면 이 기간 안에 배포하기 힘들 것 같아 일단은 보류하기로 했다.

인프라는 팀 프로젝트에서 사용하지 않았던 or 내가 하지 않았던 기술을 쓰려고 노력했다. Docker도 사용해보고 싶어서 DB를 띄울 때 사용했다. 간단하게 도커 명령어를 익히고 mariadb를 띄운 후 백엔드와 연결시켰다. 컨테이너 안에 정보가 남아있어서 확실히 인스턴스를 끄고 켤 때 `docker start`만 해주면 되니 너무 편했다. 

#### 다섯번째 이슈 (git submodule clone하기)

배포할 때 git clone하면 되겠지~ 했다가 git submodule로 들어가있던 private repo는 clone이 안됐다. 생각해보면 당연하다. private repo인데 될리가 없지. 토큰을 발급받아서 private repo의 url을 수정해주고 update 해주는 방식으로 진행했다.

```
git config submodule.[git submodule 디렉토리].url https:// [git submodule용 토큰]@[git submodule repo 주소]

git submodule update --[git submodule 디렉토리]
```

### 인프라도 끝!

배포는 완료됐고... aws가 주는 public IP를 사용해도 되지만 내 도메인을 적용해보고 싶었다. [hosting.kr](http://hosting.kr/)에서 내 닉네임이 들어간 도메인도 구입하고 `nginx`를 사용해 `https`를 적용했다. 급한대로 단순하게 쉘 파일 하나만 실행하면 build & deploy되도록 진행했다.

### 프론트

처음에 웹으로 할까 고민을 많이 했지만 크롬 확장 프로그램이 이 서비스에 더 나을 것 같다고 생각이 들었다. 간단한 기능인 만큼 접근이 쉬워야 했고, 한 번도 작업해보지 않았던 플랫폼이라 단순히 개발해보고 싶었던 이유도 컸다. 프론트 개발은 빠르게 자바스크립트로 작성했다. 검색할 때마다 API 요청을 보내게 하고, 일단 닉네임에 해당하는 Pull Request Response를 가져온 후 `filter`를 적용시켰다.

### 후기

단순히 배포를 목적으로 진행했기 때문에 코드 퀄리티를 생각하면 부족한 게 많지만 누군가에게 도움을 줄 수 있는 서비스를 개발했다는 게 너무 기뻤다. 한 번은 우테코 2기 슬랙에 서비스를 공유했는데 너무나 많이 좋아요를 눌러줬다. 

<img src="/wiki-img/my-woowacourse-pulls-review/post.png"  alt="post" height="400"/>

내가 개발한 서비스를 사용하는 유저가 있다는 게 너무 행복했다. 댓글도 많이 남겨줬고 따로 DM으로 피드백도 주는 크루도 있었다. 그 자체가 너무나 고마웠다. 

무엇보다 개발하면서 조금이나마 내 태도가 변했다는 걸 알 수 있었다. 불편한 게 있다면 고치려고 하고, 서비스를 만들어볼 생각을 하고, 개발하기 쉽다고 말만하고 개발하지 않는 것이 아니라 실제로 개발할 수 있는 사람이 된 나 자신이 좋았다. 앞으로도 이 태도를 유지해나가며 살고 싶다ㅎㅎ 많이 사용해주세요~

다운 링크 : [LINK](https://chrome.google.com/webstore/detail/mywoowacoursepulls/dkeblehcoebopgclhhjfbinndbcoboom?hl=ko)
Github : [LINK](https://github.com/aegis1920/my-woowacourse-pulls)

