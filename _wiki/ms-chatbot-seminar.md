---
layout  : wiki
title   : 
summary : 
date    : 2018-05-18 13:55:52 +0900
updated : 2019-06-21 13:56:46 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 
들어가는 말

-   무언가를 만들 때 프레임워크를 해서 만드는 게 생산성 면에서 좋다.
    
-   챗봇에서 'Hello world' 같은 게 피자배달이다.
    
-   관련기술
    

-   패턴인식
    
-   자연어처리(주로 딥러닝 기술. 오픈 소스도 있고 서비스 형태로도 나와있어 사용할만하다.),
    
-   텍스트마이닝
    
-   시멘틱 웹
    
-   상황인식 컴퓨팅
    

-   챗봇을 하려면 STT(Speech To Text)와 TTS(Text To Speech)가 필요하다. TTS는 STT보다 쉽다. STT는 제대로 받아쓰는 엔진이 거의 없다.
    
-   Microsoft Bot Framework는 C#과 node.js를 지원한다. 그러나 C#이 더 좋다.
    
-   챗봇은 웹이다. 그래서 웹 서버가 하나 필요하다. 웹 서버에 올려놓으면 대답할 수 있도록. 커넥터는 https만 지원한다. connector가 다 알아서 해준다.
    
-   Installing Tools
    

-   Visual Studio 2017 or higher
    
-   Get the VIsual Studio Bot Project Template([http://aka.ms/bf-bcvstemplate](http://aka.ms/bf-bcvstemplate))
    
-   Get the Bot Emulator
    
-   [http://github.com/koreaEva/Bot](http://github.com/koreaEva/Bot) (여기에 모든 자료가 업데이트가 되어있다. )
    

실습 시작하기

1.  Bot Framework Template를 누르면 zip파일이 된다. 압축을 풀면 안 된다
    
2.  Bot Emulator에 누르면 .exe파일이 있다. 이걸 다운 받아서 설치해주면 된다.
    
3.  내 문서/visual studio 2017/templates/projecttemplates/visual c#의 디렉토리에 zip파일을 넣으면 된다.
    
4.  그리고 HOL이라는 디렉토리 밑에 20180120에 들어가면 bot sample code.txt가 있다.
    
5.  그 다음에는 비쥬얼 스튜디오를 실행시킨다. 거기에 새로 만들기라는 게 있는데 프로젝트를 눌러서 c#이라는 게 있고 맨 밑에 bot application이라는 게 있다.
    
6.  이름은 bothol으로 하고 확인을 누르면 프로젝트가 생성된다.
    
7.  오른쪽에 보면 솔루션탐색기가 있다. 여기에 Web.config가 있다. 이게 바로 설정파일.
    
8.  우리가 hello라고 치면 controller에 들어간다. 그러니까 dialogs의 rootdialog에 들어간다.
    
9.  하지만 빨간색이 떠버리는데 이게 라이브러리에 대한 정보만 포함되어있고 실제 라이브러리는 없기때문이다. 솔루션 빌드를 클릭하면 자기네들이 알아서 필요한 라이브러리는 검색해서 설치해준다.
    
10.  JSON의 관련된 패키지가 다 있다. Bothol에 오른쪽 클릭하면 중간에 nuget 패키지 관리가 있다 이게 npm과 비슷하다. Nuget 패키지 관리에 가서 업데이트를 가보면 관련된 게 다 나온다.
    
11.  클래스에 보면 루트 dialog가 있다. 두 개의 메소드가 있다. 스타트어싱크와 태스크 메세지리시브어싱크가 있다. hello를 치면 스타트어싱크에 메세지로 가고 이 헬로우가 메세지리시브어싱크로 간다. 밑에 가보면(액티비티(모든 활동)는 텍스트가 비어있지 않으면, 길이를 렝스에 저장한다.)
    
12.  실행시키면 웹 브라우저가 실행된다. 그러면 bothol이 실행된다. 챗봇도 웹이다. 그래서 웹 페이지가 뜨는 것. 주소가 있다. Localhost.를 기억해야된다.
    
13.  botframework-emulator를 실행시킨다. 그러면 채팅창같은 게 나오고 오른쪽에는 뭐 디테일한 게 나온다. 엔터 유어 localhost가 나오는데 그걸 치면 된다. 그 뒤에 자기 자신의 localhost를 치고 바로/api/messages를 쳐줘야 한다.
    
14.  그리고 connect를 누르면 오른쪽에 POST 200이 나온다.
    
15.  hello를 입력하면 바로 대답이 나온다. 아무 역할이 없지만 나온다. 오른쪽에 로그에 어떤 과정으로 나오는 게 보인다..
    
16.  여기서 가장 중요한 것들
    

1.  액티비티는 사용자가 하는 모든 행동들이다(주기적으로 핑을 보낸다.)
    
2.  가장 중요한 건 dialogs이다.
    
3.  Root dialog를 보면 스타트어싱크에 입력을 기다리고 있다.
    
4.  메세지리시브어싱크는 계속 자기 자신을 호출한다.
    

18.  이제 디버깅 종료를 눌러서 정지시킨다. 그리고 아까 본 메세지리시브어싱크에 있는 2개의 줄을 지운다.
    
19.  이제 여기에다 string message = string.Format(“{0}를(을) 주문하셨습니다.”, activity.Text);를 하면 짜장면을 치면 짜장면을 주문하셨습니다라고 나온다.
    
20.  모든 기능은 context 안에 있다. Context.PostAsync(message); //얘를 치면 녹색이 나오는데 C#에서 비동기형 메소드들은 다 초록색으로 나온다. 그래서 앞에다 await을 써주면 된다.
    
21.  다시 시작버튼을 눌러서 run을 해보면 다시 웹이 나오고 bot 에뮬레이터를 실행해본다.
    
22.  인사하는 방법을 알아보자. 메소드를 추가시켜야 한다.SendWelcomeMessageAsync()를 세번째 처리에서 해준다. 3단계가 필요하다.
    
23.  github사이트의 인사기능의 구현에 나와있다. 코드마다 번호를 매겨놨다. 인사를 먼저하고 세번째 메소드로 간다. 카피해서 복사 붙여넣기 하자. 두 번째 메소드를 다 덮어놓자. 세번 째 메소드가 없으니 당연히 오류가 난다. 3번째(sendwelcomemessageasync())도 가피해서 붙인다.
    
24.  다시 실행을 해보자. Hi를 누르면 처음 말이 나온다.
    
25.  이제 pdf 4번쪽인 음식 주문 메뉴입니다. FAQ와 order dialog를 만든다. 숫자를 입력하게 해서 클래스를 생성하면서 넘어가게끔 한다. dialog의 구현이라고 되어있는 부분을 카피해서 붙여넣는다. (sendmessage welcome쪽)
    
26.  습관적으로 공백을 넣을 수 있으니 Trim()으로 제거시켜준다. OrderDialog에 추가가 된다. 어떻게 추가를 하느냐. Dialogs라는 폴더가 있는데 오른쪽 클리해서 추가가 있고 다시 맨 밑에 클래스가 있다. 여기에 클래스를 선택 후 OrderDialog라고 쓰고 추가한다. 이러면 그냥 기본 클래스가 생성된다. PDF 5번에 보면 그 소스가 있다. 소스를 cp한다. 그럼에도 불구하고 빨간색이 남아있다. 왜냐하면 네임스페이스가 안 맞기 때문에. 그래서 OrderDIalog에 있는 네임스페이스를 바꿔준다.
    
27.  그래서 이제 사용자가 그만이라고 말하면 주문완료라고 하고 끝난다. 자기 자신을 계속 호출하다가 done을 만나면 끝.
    
28.  마음에 안 든다고 하는 얘가 3개가 있다.(빨간 줄) 해당되는 … 6번 pdf를 카피해서 붙여넣는다. Root.dialog가 왔다갔다 하면서 그렇게 된다. 루트다이얼로그가 리턴되는 값을 받기 위한게 텍스트방식이다(done에 있는 문자열) 그래서 OrderDialog라고 명시를 해줘야 에러가 안 난다.
    
29.  그리고 나서 클래스를 또 추가시키나. FAQDialog라고. 7번 pdf를 붙인다.
    
30.  인사를 잃어버렸다. 왜냐하면 이전 상태 그대로 나오니까. setting을 눌러서 new conversation을 누른다. hi하고 하면 된다. 1번을 입력하면 음식 주문 메뉴입니다가 나온다. 그만을 치면 다시 root로 간다. 2를 누르면 FAQ로 가고. 그래서 봇 서비스를 만들 때 dialog를 그림으로 그려보는 거다.
    
31.  카드를 사용하는 방법. 출력할 때 고급져보인다. 사용자한테 버튼형태로 하면서 위에 정보를 보여주면 좋다. 카드가 나올 일이 많다. 쉽게 카드를 적용할 수 있다. 히어로카드가 가장 유명하다. 이미지가 여러 장 들어갈 수 있다. 불필요한 정보는 아예 안 주면 된다. 리셉트 카드는 통합적으로 보여준다.
    
32.  카드 액션 버튼이다. 디폴트는 그냥 버튼에 입력되어있는 게 나온다. OpenUrl은
    
33.  playAudio는 소리가 나온다. 비디오는 비디오가 나오고. 다운로드 뭐시기…
    
34.  챗봇에 들어왔으면 8번 pdf쪽에 두 번째를 업데이트하면 2개의 에러가 보인다. List 객체는 어떠한 객체라도 담을 수 있다. 그러나 List 객체는 기본으로 없다. 추가를 해준다. Using System.Collections.Generic;이라고 써주면 된다.
    
35.  인사말도 써준다. String WelcomeMessage = “안녕하세요 만리장성 봇입니다.”;
    
36.  메세지를 하나 만든다. 메세지를 만들고 카드를 하나 첨부한다. 카드를 attached시킨다. 카드 액션이라는 걸 만든다. 이게 버튼이다. 첫 번째 버튼은 1.주문, 두 번째는 FAQ.
    
37.  메세지에 히어로카드를 하나 만들어서 추가할 것이다. 버튼에는 이미 2개가 포함되어 있다.
    
38.  카트형태를 보여주고 선택하도록. Orderdialog를 수정해야 된다. 10번 PDF를 보면 url이 있다. 이미지를 배포할 때 Azure를 이용해서 하면 된다.
    
39.  Orderdialog로 가서 10번 pdf로 바꿔준다. 클래스 이름 바로 밑에 붙여준다.
    
40.  11번 PDF를 복붙해준다.
    
41.  이미지 객체를 생성한다. 리스트 객체로 만들어서 넣어줘야 한다. menu1images을. 그래서 this.ServerUrl을 해서 해준다.
    
42.  짬뽕도 마찬가지로 이미지객체를 생성하고 버튼을 생성한다. attachment에 3개를 추가한다. 동시에 여러 개를 펼쳐줄 때는 카드를 가로로 보여준다. 그래서 이제 짬뽕이라고 치면 같이 나오도록.
    
43.  가로로 보여주는 방법이 13번 코드이다. 360번 라인에 보면 layout을 설정해주는 것이 있다. 회전목마다. 한 줄만 써주게 되면 가로로 돌아간다.
    
44.  getHeroCard 메소드를 주면 바로 생성할 수 있도록 할 수 있다.
    
45.  이제 텍스트 마이닝으로 넘어간다. Qnamaker.ai라는 사이트로 가면 알 수 있다. 마이크로소프트 아이디가 있어야 한다.
    
46.  이 서비스가 하는 역할은 특정 웹사이트가 있으면 알아서 크롤링을 해준다.
    
47.  윈도우 faq라고 검색을 해보자. window에 대한 faq가 있다. 이런 걸 모두 데이터를 뽑아야 한다. 그 주소를 카피해놓고 qna메이커로 돌아와서 create new service를 누른다. 서비스 이름을 정하라고 나오고 아까 쓴 url을 쓴다. 엑셀로 만들어서 첨부할 수도 있다. 이게 더 좋은 방법이다. create를 치면 바로 생성이 된다. 해당되는 사이트에 가서 크롤링을 한다음에 문장을 모두 수치로 변환한다. 확률이 높은 걸 긁어온다. 왼쪽에 테스트를 눌러보면 32비트라고 물어보면 바로 나온다. 32바트라고 쳐도 나온다. 왜냐하면 수치로 긁어오니까. 얼마나 유사한지 판단하고 해주기때문에.
    
48.  32비트는 용량이 큰건가요?라고 해도 찾아준다. qnamaker는 과금정책이 없다. 상단에 publish가 있다. 실제 url로 배포한다. publish를 누르면 배포해준다. 호출할 때 그 키들… 키를 가지고 호출이 가능하다. 챗봇에서 쓰고 싶다면 FAQdialog에 가서 기능을 추가하면 된다.
    
49.  소스코드 14번을 가면 using qnaMakerAPi;라고 되어있는데 이걸 치면 된다. 근데 추가하면 빨간색이 된다. 이건 네임스페이스가 없기 때문이다.
    
50.  15번 소스의 내용을 아래쪽에 else문 안에 넣는다. 빨간색으로 표시가 되는데 여기서 nuget 패키지관리에 가서 찾아보기에서 qnamaker를 쳐본다. 그러면 몇 개가 나오는데 그냥 qnamaker를 설치한다.
    
51.  그리고 나서 다시 faq로 가보면 인식이 된다. qnamakerclient의 서브스크립션 코드에 서브스크립션 키를 와 포스트뒤에 키를 카피해서 복붙한다. 이러면 바로 qna 메이커에서 바로 붙는 것까지 가능하다.
    
52.  result에서 빨간 줄은 그냥 위에거랑 중복되서 그렇다. 다른 변수로 바꿔주면 된다 . 이 줄에 await context.PostAsync(message);도 써준다. 그리고 실행시켜본다.
    
53.  브레이크 포인트를 걸고 다시 실행시켜보면 SCORE가 따로 있다.
    
54.  이제 자연어처리를 해보자.
    
55.  자연어처리도 요즘 딥러닝기반으로 하고 있다. LUIS가 자연어 처리이다. NLP와 유사하게 작동한다. Intent와 Entities가 중요하게 작용한다.
    
56.  Intents – 주문, 배달, 인사
    
57.  Entities - 메뉴 크기 수량 같은 것들…
    
58.  이걸 하기 위해서는 학습을 시켜야 한다.
    
59.  오픈 소스는 Word2Vector나 koNLPy. 근데 상사가 내일만에 해와 이러면 LUIS밖에 답이 없다. www.luis.ai 를 치면 된다.
    
60.  루이스는 유료이다. 1000번 호출할 때마다 900원씩 나간다. 1000번까지는 무료. myapps가 보인다. 학습을 시키는 단위다. Create new app이라는 게 있다. 앱의 이름을 입력하고 나라를 쳐 본다. 한국도 있다. 설명은 안달아도 된다. 그러면 추가가 되고, intent가 추가를 하자. 인사라고 치고 확인. 그러면 인사라고 나오고 인사가 무엇인지 학습을 시켜야하므로 hi, hello, 안녕, 안녕하세요 이런 걸 다 넣어야 한다. 이런 것들이 들어오면 인사로 간주하겠다라는 의미이다. LUIS 엔진도 모두 딥러닝이다. 수치로 인식하고 있다. 딥러닝이라서 안녕하삽니까해도 인사로 간주한다.
    
61.  또 다른 걸 해주기 위해서 order를 누른다. 보통 단어로 던진다. 자장면 한그릇 보내줘 이런 식으로. 빨리 줘. 이런 식. 탕수육 작은 거 줄래? 이런 식. 밑에 문장들이 입력되고 앞을 선택하고 뒤를 선택하면 영역이 선택된다. 엔티티를 눌러준다. 그러면 자장면이 메뉴로 인식된다. 둘은수량이니까 quantity로 한다. 탕수육은 다시 메뉴. 작은 거는 크기. Size. 다시 짬뽕은 메뉴. 예시를 달아주는 게 좋다. 그 다음에 오른쪽 위에 train이라는 걸 누른다. 그럼 6단계로 나온다. 학습이 끝나고 나면 test를 누른다. 단어를 입력할 수 있게끔 되어있다. 안녕이라고 치면 인사1이라고 나온다. 인사1은 인사일 확률이 100프로 라는 것. 안녕하세요도 98프로. 역시 안녕하시렵니까도 된다.
    
62.  자장면 한그릇 보내줘 이것도 어떤식으로 인식이 되어있는지 다 나온다. 이게 백터화 돼서 짜장면이라고 쳐도 인식이 된다. 오른쪽 위에 publish라는 게 있다. 그걸 누르면 밑에 노스아메리카 키가 있다. 키를 이용해서 스타트키가 있다. 다른 나라로 갈때는 키가 안 보인다. 유료로 쓸 때만 싱가폴을 거친다. Publish to production slot을 누르면 배포가 된다. 아메리칸 쪽에 url이 있는데 그걸 누르면 동작이 된다. 쿼리가 없고 뭐가 없고… 주소에 보면 q=가 있는데 여기에 자장면 두그릇 보내줘 라고 치면 다 나온다.
    
63.  루이스를 다룰 수 있는 루이스 dialog가 있다. 그래서 이 두 가지만 넣어도 고급진 걸 만들 수 있다.
    

후기

사실 이 세미나를 들을 때가 정확히 2018년 1월 20일었습니다. 거의 4개월이 지났네요. 챗봇과 관련되어 있는 세미나라서 재빨리 신청했었습니다. 챗봇을 한 번 만들어보고 싶기도 했고요. 현재는 시간이 꽤 지났지만 그 때 저의 노트북 OS가 우분투라서(지금도 우분투지만...) 실습을 하지 못 하고 어쩔 수 없이 메모장에 강사분이 하신 말씀을 모두 적어놨었습니다. 아쉬워서 집에 돌아와서 데스크탑 컴퓨터로 실제로 혼자서 실습을 해보기까지 했었죠.

전체적으로 느낌을 말하자면 거의 모두 MS사에서 만들어준 것을 이용해야 합니다. 실질적으로 코딩하는 내용은 그렇게 많지 않아서 부담스럽지 않지만, 제대로 된 원리를 이해하고 싶은 경우에는 (당연하게도?) 조금 부족했습니다. 만약 실습을 따라하신다면 사실 제가 쓴 '실습 시작하기'를 먼저 보지마시고 위에 쓴 github 링크가 더 자세하게 나와있으니 그 github 링크와 같이 보시면 괜찮을 것 같습니다.

정말 말 그대로 MS사에 있는 챗봇을 '체험'하는 세미나였습니다. 나름대로 전반적인, 아주 기초적인 챗봇의 기본을 알 수 있었습니다.