---
layout  : wiki
title   : 코딩 호러의 이펙티브 프로그래밍 필사
summary : 
date    : 2020-07-18 13:18:54 +0900
updated : 2020-07-18 13:22:46 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

우아한 테크코스 레벨 3에 들어가기 전 읽으면 좋겠다고 생각이 들었다. 

1. 죽은 프로그래머 - 이것은 최고의 단계다. 당신이 작성한 코드가 끝까지 살아남아서 당신이 죽고 난 후에도 사용된다.
2. 일하는 프로그래머 - 어떤 좋은 직장을 구하기 위해 그다지 오래 기다릴 필요가 없다. 주변의 동료들은 당신을 존경한다. 당신이 근무한 회사는 모두 실적이 향상되고, 당신의 존재에 의해 뭔가 분위기가 향상된다.
3. 글을 쓰는 것을 두려워하는 사람들은 블로그를 시작해야 한다.
4. 내 경험에 의하면 글을 명확하게 하는 것은 자신의 내면적 사고의 흐름을 명확하게 하는 데 도움을 준다. 어떤 것을 다른 사람에게 정확하게 설명하고자 노력해보면, 자기가 얼마나 많은 부분을 제대로 모르고 있었나 하는 것을 깨달으며 놀라게 된다.
5. 배를 만들고 싶다면 인부들을 재촉해서 나무를 끌어모으고 일을 분할해서 명령을 내릴 것이 아니라 그들이 저 넓고 끝없는 바다를 열망하게 만들어라. - 앙투안 드 생텍쥐페리
6. 래리 페이지는 이렇게 말했다. “속도와 좋은 결정 사이에 존재하는 관련성… 빠르고 좋은 결정은 있지만, 느리고 좋은 결정은 없다.”
7. 겸손한 프로그래머가 되는 방법의 핵심은 어떤 상황에 처하더라도 결국 모든 잘못의 뿌리는 자기가 작성한 코드라는 사실을 인정하는 것이다.
8. “나는 개발자들에게 자기 프로젝트에서 사용되는 소프트웨어 제품의 소스코드를 로컬 폴더에 복사해 두고 수시로 살펴보라고 권장한다”
9. 질문을 올리는 사람은 다음과 같은 조건을 충족해야 한다.
    1. 질문을 읽는 사람들이 충분히 이해할 수 있게 자세한 내용을 모두 적어야 한다.
    2. 어떤 일이 벌어지고 있는 것인지 감을 잡을 수 있게 배경지식도 함께 서술하라
    3. 문제를 둘러싸고 있는 기본적인 문맥을 이해하는데 필요한 정보만 서술하라
    4. 문제를 해결하기 위해 이미 수행한 과정이 있으면 그 내용을 밝혀라.
10. 일단 질문을 던지기 시작하는 것은 실제로 자신의 문제를 스스로 디버깅하는데 도움을 준다.
11. 웹 사이트가 빠를수록 더 많은 사람들이 방문한다.
12. 프로그래머를 싫어하지 말고, 그들의 코드를 싫어하라 - 제프 앳우드
13. 모든 회의에는 명확하게 정의된 목표가 있어야 한다.
14. 회의는 명확한 목표를 가지고 있으므로 회의에 참석하는 사람들은 모두 회의에 참석하기 전에 자신이 어떤 말을 해야 하는지, 어떤 정보를 공유해야 하는지 등에 대해 준비를 완전히 끝마쳐야 한다.
15. 썩은 사과를 포함하고 있음에도 매우 좋은 성적을 거둔 그룹도 있었다. 그 그룹에는 특별히 훌륭한 리더가 존재했던 것이다. 그는 팀원들에게 질문을 던지고, 모든 사람들을 참여시키고, 충돌을 완화시킨다.
16. 리더는 사람들에게 번갈아가며 질문을 던지고, 모든 사람의 의견을 구하고, 모두가 자기 목소리를 내게 함으로써 그룹의 역학을 바꿔 그룹이 좋은 성적을 거두게 할 수 있는가?
17. 프로그래머를 위한 효율적인 작업 공간
    1. 모든 프로그래머는 두 대의 모니터를 가져야 한다.
        1. 24인치 모니터가 가장 좋다
    2. 충분한 메모리를 갖춘 빠른 PC가 필요하다.
    3. 편안한 의자를 가져야 한다.
        1. 모니터의 끝이 눈의 높이와 비슷해야 한다
        2. 헤르먼 밀러 에어론
    4. 조용한 작업 환경을 가져야 한다.
        1. 모니터 뒤에 발산되는 배경 조명
18. 비록 버전 1이 엉망이라고 해도, 그것을 일단 출시해라
19. 당신이 사용자라면 비밀번호를 모두 12개의 문자 이상(비밀 문구)으로 다시 설정해라
20. 당신이 개발자라면 보안을 지킬 필요가 있는 모든 것에 대해 ‘bcrypt’ 혹은 ‘PBKDF2’를 사용하라.
21. AWS에서 구축한 첫 번째 시스템은 무질서한 원숭이라고 불리는 시스템이다. 무질서한 원숭이의 역할은 우리의 아키텍처 내에 존재하는 서비스 인스턴스를 무작위로 다운시키는 것이다.
22. 코드 리뷰야말로 당신의 코드를 향상시키기 위해 할 수 있는 일 중 가장 중요한 일이라고 믿게 됐다.
23. 사용자의 말을 듣지 마라
24. 사용자의 피드백은 중요하다. 하지만 사용자의 피드백만 듣고 행동을 결정하지 말아야 한다. 사용자가 제공하는 피드백에 연결지을 수 있는 실제 행동 데이터를 반드시 가지고 있어야 한다.
25. 방해가 되고 파괴적인 일을 일삼는 사람을 다루기 위해 선택한 방법은 간단하다. 그들의 계정을 일정한 시간 동안 정지시키는 것이다.