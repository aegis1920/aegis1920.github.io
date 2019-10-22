---
layout  : wiki
title   : python
summary : 
date    : 2019-06-21 09:26:38 +0900
updated : 2019-06-21 13:21:55 +0900
tags    : 
toc     : true
public  : true
parent  : programming-language
latex   : false
---
* TOC
{:toc}


# 파이썬 5일 강의
#1일차(여러 규칙이 가장 중요)
허진경 강사님
www.kaggle.com //기업의 후원을 받아서 빅데이터 경진대회를 주체하는 사이트. 

데이터 사이언티스트가 갖고 있어야 할 능력
1.	분석능력(통계 Tool이 따로 있다)
2.	코딩능력(데이터는 수렴하려는 특성(회귀)을 가지고 있는데 이를 작업할 수 있어야 한다.)
3.	설득능력(데이터를 원하는 고객한테 설득할 수 있어야 한다.)

파이썬 설치하고 C:\Python\Python36-32에 들어가서 Python.exe 클릭
print("hello world")를 치면 그냥 바로 나온다. 
이 검은 화면은 파이썬 인터프리터이고 아나콘다라는 파이썬 배포판을 다시 설치한다. 파이썬 배포판을 설치하는 이유는 배포판에 패키지들을 모두 포함하고 있기 때문에 쉽게 패키지 설치가 가능하기 때문이다. 파이썬 인터프리터로 패키지를 설치하려면 하나하나 다 해줘야 한다. 
www.anaconda.com

설치가 완료되면 윈도우 시작메뉴에 Anaconda3 프로그램들이 추가된다.
1.	Spyder - 개발도구. 얘를 잘 다루면 나중에 R을 다룰 때 매우 편하다.
2.	Jupyter Notebook - 주피터 노트북을 실행시킨다. 
3.	Anaconda prompt - 파이썬과 같은 커맨드 프롬프트 창
4.	Anaconda navigator - 아나콘다 환경과 구성요소들을 관리할 수 있는 윈도우 애플리케이션
Jupyter Notebook
Anaconda navigator에서 Jupyter Notebook를 실행시킨다면 anaconda 프롬프트가 안 보인다. 원래 그렇게 실행 된다고 한다. Jupyter Notebook을 켜면 웹 브라우저가 켜지는데 그곳에서 파이썬 코딩이 가능하다. Jupyter Notebook은 웹 서버라서 각 하나의 포트가 있다.
anaconda navigator가 아닌 anaconda 프롬프트에서도 Jupyter Notebook을 또 실행시킬 수 있다. 해보면 포트가 8888에서 8889로 늘어난다. 
Jupyter Notebook에서 파이썬을 코딩하는 방법은 우선 New에서 python3를 클릭한다. 그리고 치고 실행시키면 끝이다. 그러나 셀에 따라서 실행 방법 차이가 있다.
1.	ctrl + Enter : 포커스가 아래로 이동하지 않고 그 상태에 머무른다. 
2.	alt + Enter : 그냥 무조건 새로운 입력 양식이 만들어진다. 
3.	그냥 실행 버튼 : 없으면 만들고 있으면 그냥 실행시킨다. 
실행시키고 저장하면 ipynb라는 파일로 저장이 된다. 그리고 실행시킨 후, Running 탭에 가보면shutdown이 있다. 얘를 누르면 코딩했을 때 확보했던 메모리 영역이 모두 해제된다. 
Spyder
Spyder는 스크립트 작성은 왼쪽에 한다. 그리고 오른쪽 아래에서 실행결과를 확인한다. 오른쪽위에는 Help tab이 선택되어 있는데 주로 Variable explorer를 띄워 놓고 확인을 한다. 변수에 어떤 게 들어갔는지 실시간으로 볼 수 있다. 
 
jupyter notebook에서는 셀을 추가하면서 코딩할 수 있으나 Spyder에서는 주석을 추가해서 셀을 나눠줘야 한다. Spyder에서는 특이하게 셀을 구분하는 용도로 #%%를 쓴다. (이 주석은 Spyder에서만 가능하다.)
Spyder에서 파이썬 코딩을 실행시키는 방법에는 4가지가 있다. 위에 보면 실행 오른쪽에 몇 가지방법으로 실행시키는 게 있는데 그냥 단축키로 하는 것이 편하다. 참고로 빨간색은 셀을 실행시키고 그 다음 셀로 이동시키는 것이다.
1.	F9 : 한 줄 한 줄 실행시킨다. 
2.	ctrl + Enter : 커서에 있는 그 셀을 실행시킨다. 커서는 그대로 있다.
3.	shift + Enter : 커서에 있는 그 셀을 실행시키고 커서는 다음으로 옮긴다.

PEP(Python Enhance Proposal)은 파이썬을 개선하기 위한 제안서이다. 
코딩 규칙
1.	들여쓰기는 공백 4칸을 권장합니다.
2.	한 줄은 최대 79자까지 작성합니다.
3.	최상위 함수와 클래스 정의는 2줄씩 띄어 씁니다.
4.	클래스 내의 메서드 정의는 1줄씩 띄어 씁니다.
5.	표현식 또는 문장 내에서 불필요한 공백을 피합니다.
A.	[]나 () 안에서
B.	,, :, ; 등(앞에 넣지 마라)
C.	키워드 인자와 인자의 기본 값의 =는 붙여 쓴다. (함수를 호출할 때 매개변수의 개수가 상관없다.)
6.	#은 주석이다.
이름 규칙
1.	변수 명에서 _은 위치에 따라 다른 의미를 가진다.
A.	_single_leading_underscore : 내부적으로 사용되는 변수를 정의할 때 앞에 _를 씁니다.
B.	single_trailing_underscore_ : 파이썬 기본 키워드와 충돌을 피하려고 할 때 뒤에 _를 씁니다.
C.	__double_leading_underscore : 클래스 속성으로 사용되면 그 이름을 변경한다. 예를 들면 FooBar에 정의된 __boo는 __FooBar__boo로 바뀝니다.
D.	__double_leading_and_trailing_underscore__ : 앞뒤로 언더바가 있는 변수는 특별한 용도로 정의되어 있는 이름들입니다. 문서대로만 사용합니다.
2.	클래스는 카멜 케이스로 작성한다(hello world면 Hello World)
3.	인스턴스 메서드의 첫 번째 인자는 언제나 self이다. (펜 객체가 있으면 쓰다라는 게 있어야 한다. ex. 자바에서는 클래스 안에 있는 메소드)
4.	클래스 메서드의 첫 번째 인자는 언제나 cls이다.(객체를 만들지 않고 쓸 수 있는 메소드)
5.	파이썬은 클래스 안의 메소드 중복이 없다. 그래서 모듈의 이름을 잘 만들어야 한다. 
A.	마커펜은 인스턴스. 마커펜을 손으로 잡으면 객체. 
B.	클래스는 객체를 만들기 위해서. 객체는 인스턴스를 사용하기 위해서 존재한다.
객체의 두 가지 특징
1.	명사적 특징(데이터를 담을 수 있다 - 마커펜의 색깔. 정보를 담는다.)
2.	동사적 특징(메소드를 실행시키기 위해서. 즉,행위를 실행시키기 위해서.)

2버전과 3버전
1.	3버전에서는 숫자가 뭐가 되든 간에 int로 설정된다.
2.	정수의 연산 결과가 실수형이 될 수 있다.(ex. 3/2를 하면 1.5로 된다)
3.	모든 문자를 유니코드로 처리를 한다. 아스키 코드는 7비트 127개 밖에 저장을 못 하지만 유니코드는 2바이트로 개 정도까지 가증하다.
변수
파이썬에서는 모든 변수가 객체이다. 주소를 알려면 id(x)의 식으로 하면 된다. 파이썬에서는 문자와 문자열의 구분이 없다. 게다가 숫자는 모두 int타입이다. print안에 싱글 쿼텐션(')이나 더블 쿼텐션(") 둘 중에 아무거나 넣어줘도 된다. 더블 쿼텐션 안에 또 더블 쿼텐션을 쓰고 싶다면 \"를 써주면 된다.
1.	\n : 개행
2.	\t : tab
3.	\0 : null
4.	문자열 앞에 r을 붙이면 raw 문자열을 선언한다. 

자료형(데이터 형)
1.	수치형
A.	정수, 소수(그냥 /로 나누면 된다), 복소수(허수부를 j로 표현한다)
2.	문자열형
A.	'이나 "로 표현이 가능하다. 
B.	+로 문자열을 연결시킬 수 있다. (문자열과 숫자는 안 된다)
C.	*2와 같은 형태로 반복시킬 수 있다. (문자열과 숫자만 가능하다)
D.	문자열의 몇 가지 기능
i.	upper() - 대문자로 바꿔준다
ii.	lower() - 소문자로 바꿔준다.
iii.	count() - 문자가 몇 개 있는지 세준다.
iv.	len() - len(mystring), len 함수를 이용한 문자열 길이 계산이 가능하다. 리스트에 쓰면 리스트의 개수가 나온다.
v.	mystring[0:5] - mystring[:5]와 같다. mystring[6:8]같이 문자열을 나눌 수도 있다.
vi.	split() - 문자열을 분리한다. 결과가 리스트로 반환된다.
1.	portal_site = 'naver daum'
portal_site.split(' ')
>>>['naver','daum']
2.	portal_site.split(' ')여기다 [0]을 붙여서 portal_site.split(' ')[0]을 만들어 ['naver']만 뜨게 할 수 있다.
vii.	type() - type함수를 통한 데이터 타입 확인 ex) type(7000)
3.	논리형
A.	True or false
B.	논리연산의 결과로 부울이 반환
i.	&, |, and, or, not이 있다. 
ii.	and와 &를 쓰면 동작은 똑같으나 내부적으로 실행이 다르게 된다. 이 중에 and가 뒤를 아예 보지 않기 때문에 더 빠르다. (자바에서도 ||와 |가 다르다. ||가 or 즉, 뒤를 돌아보지 않고 해서 더 빠르고 |는 모두 검사하기 때문에 더 느리다)
4.	리스트 - 복수의 데이터를 하나로 묶는다. 인덱스를 통한 읽기/쓰기를 지원하고 어떤 종류의 값도 담을 수 있다.
A.	colors = ["red", "blue", "gold"]
colors[0]
colors[0:2]
colors.append('green')
colors.insert(1, 'yellow')
colors.extend(["white", "gray"])
colors += ['red'] //extend와 같다.
colors += 'purple' //대가로가 없기 때문에 문자 하나하나마다 다 들어간다. 
colors.index('red')
colors.index('red', 1)
colors.count('red')
del colors[0]
colors.pop()
colors.remove('gold')
colors.sort()
colors.reverse()
5.	사전(Dictionaries)형 - 사전형은 색인(key)와 내용(value)이 하나의 쌍으로 되어있다. key : value로 한 후에 {}로 묶으면 된다. map과 비슷하다.
A.	키와 값의 쌍으로 구성된 자료 구조
B.	인덱스는 지원하지 않으며, 없는 키를 사용하면 에러가 발생
i.	color = {"apple" : "green", "banana" : "yellow", "cherry" : "red"}
ii.	color['apple']
for c in color.items() :
print(c) 		//반환 형태가 튜플이다. key와 value 둘 다 나온다.
for k, v in color.items() :
print(k, v)
for k in colors.keys() :
print(k)
for v in color.values() :
print(v)
6.	튜플(Tuples) - 리스트와 유사하지만 읽기 전용이다. 튜플은 데이터를 조회하는 속도가 훨씬 빠르다. 튜플형은 만든 후 바꿀 수 없다. 그래서 수정이 필요 없는 배열 형태의 데이터 타입에 거의 사용된다. . immutable하기 때문에 속도가 빠르나 수정할 수가 없다. 제공되는 함수도 count(), index() 정도이다. 그래서 사전형 데이터의 key로 사용될 수 있다. 
A.	colors2 = tuple(colors)
colors2 	//튜플 형태로 나타난다.
list(colors2) 	//list로 다시 바꿔준다.
B.	(a, b) = (1, 2)
7.	집합형(set) - 집합형 데이터는 순서가 뒤죽박죽이고 말 그대로 중복되지 않는다. 집합으로 만들면 중복된 게 사라진다. {}안에 사전형같이 콜론이 아닌 그냥 여러 요소들을 넣어주면 된다. 
A.	candy = {'delicious', 'fantastic'}
B.	집합형을 이용한 계산도 가능하다.
i.	flavor_setA = {'apple', 'peach', 'soda'}
flavor_setB = {'apple', 'chocolate', 'soda'}
flavor_setA - flavor_setB
flavor_setA & flavor_setB
8.	파이썬 비교 연산자
A.	==, !=, >, <, <=, >=
 
mutable과 immutable의 차이
a = 10과 b = '10'을 출력해보면 출력은 10으로 똑같이 나오게 됩니다. 그러나 type을 데이터형을 비교해보면 다른 것을 알게 됩니다. 바로 int와 str이 나오죠. 그러나 str은 immutable이라 바꿀 수 없는 데이터 형입니다. 그래서 더한 결과를 출력하고 싶다면 print(10+int('10'))으로 형 변환을 해줘야 합니다. 즉 mutable은 하나하나 변환이 가능하나, immutable은 변환이 불가능합니다.

#2일차(람다식이 가장 중요하다!)
제어문
1.	조건문
A.	조건문에는 if라는 키워드를 사용한다.
B.	if문장 끝에는 콜론(:)을 입력한다.
C.	if~elif~else로 다중 구문이 가능하다.
i.	score = 59
if score >= 60:
 	print('합격')
else:
 	print('불합격')
2.	반복문
A.	for문 - 변수 안에 in 뒤에 있는 것들이 차례대로 대입된다. 
i.	for i in [0,1,2,3,4,5,6,7,8,9,10]:
 	print(i)
ii.	for i in range(0, 11):
 	print(i)
iii.	favorite_hobby = ['reading', 'fishing', 'shopping']
for hobby in favorite_hobby:
 	print('%s is my favorite hobby' % hobby) 	//list는 튜플로도 가능하다.
iv.	wish_travel_city = {'bangkok':'Thai', 'Los Angeles':'USA', 'Manila':'Philiphines'}
for city, country in wish_travel_city.items(): 	//딕셔너리 할 때처럼 items()
 	print('%s in %s' % (city, country))
B.	while문(for문보다 반복할 횟수가 상대적으로 많을 때) - 무한루프가 되므로 증가시키거나 break으로 빠져나간다. 
i.	i = 0
while (i <= 10):
 	print(i)
 	i = i + 1
ii.	num = 0
while 1:
 	print(num) 
 	if num == 10:
 	 	break 	//continue
 	num += 1
iii.	apart = [[101, 102],
 	[201, 202]]
apart[0][0]

함수
1.	함수의 정의(함수도 객체이다.)
A.	함수 선언은 def로 시작
i.	def times(a,b):
  	return a*b
B.	함수의 시작과 끝은 들여쓰기로 구분
C.	시작과 끝을 명시하지 않는다.
D.	함수 선언을 헤더 파일에 미리 선언하거나, 인터페이스/구현으로 나누지 않음
2.	리턴 값(return)
A.	함수를 종료하고 해당 함수를 호출한 곳으로 돌아감
B.	함수를 실행할 때 모든 함수 관련 리소스(변수 포함)를 스택에 저장. return시 스택에서 제거
C.	파이썬은 다중 값을 리턴 값으로 전달이 가능하다(실제 튜플에 저장되어 리턴됨)
i.	def swap(a,b)
 	return b,a
a = swap(1,2)
x, y = swap(1,2)
type(a)를 하면 tuple이 뜬다.
print(a)를 하면 (2, 1)이고 print(x, y)를 하면 2 1이 나온다.
D.	return을 사용하지 않거나, return만 적었을 때도 함수가 종료
3.	함수 파라미터
A.	call by reference
def times(a=10, b=20):
 	return a*b
x = times() 	//두 인자가 들어감.
y = times(5) 	//하나가 들어가면 a쪽에 들어간다. 5*b가 되는 것!
B.	기본 파라미터와 키워드 파라미터
i.	def connect_URL(server, port)
ii.	connect_URL("test.com","8080") 	//순서대로 값을 넣은 것.
iii.	connect_URL(port="8080",server="test.com") 	//값을 줬으니 바꿀 수 있다.
iv.	connect_URL("test.com",port="8080") 	//첫 번째 값이라서 가능하다. 
v.	connect_URL(port="8080","test.com") 	//두 번째 값부터 값만 주면 안 된다. 이는 에러가 뜬다. 
C.	가변 인자(print 안에 있는 .의 의미가 인자를 여러 개 줄 수 있다는 의미이다.)
i.	def var_param_test(*p):
 	return p

a = var_param_test(1,2,3,4,5)
print(a)
(1,2,3,4,5) 	//*가 하나이면 타입이 튜플로 된다.
ii.	def var_param_test(**p):
 	for x,v in p.items():
 		print(x,v)

var_param_test(a=1, b=2, c=3, d=4, e=5, f=6) 	/*가 두개(**)이면 딕셔너리가 된다.
iii.	print()안에 있는 sep은 구분기호이다. sep='\n'이라면 개행으로 나누겠다는 의미이다. 
4.	Lambda 함수
A.	프로그램의 가독성을 위해, 또는 함수를 파라미터로 넘겨 줄 때 사용
B.	이름이 없고 함수 객체만 존재하는 익명함수
C.	필요한 곳 어디서나 쓰일 수 있고 return 구문을 적을 수 없음
D.	함수를 호출하는 사람이 정의할 수 있는 것.
E.	여러 개의 파라미터를 받을 수 있고 return 구문 없이도 하나의 값을 리턴
i.	for name in dir():
 	if not name.startswith('_'):
 		del globals()[name]
globals()
ii.	def func(data, func=None):
 	if func=None:
 		return data
 	else :
 		return func(data)

func(10, (lambda x : x*x))
func(10, (lambda x : 2*x))
func(10, (lambda x : x))
func(10)
iii.	def extent(data, fun=None): 	//fun=None이라고 초기값을 정해줘야 extent(data)만 했을 때 선택사항으로 기본 값인 fun에 None이 들어간다. 
 	if fun==None:
 		return data
 	else :
 		return fun(data)

data = [10, 20, 30, 40, 30]
extent(data)
extent(data, fun=max) 	//함수가 max가 된다. 
extent(data, fun=min)
내장함수
정의하거나 import하지 않고 즉시 사용가능한 함수이다.
1.	max() - 숫자 > 알파벳 대문자 > 알파벳 소문자의 순이다.
2.	sorted() - max와 같다. 
3.	dir() - 객체가 가진 함수와 변수를 리스트형태로 반환한다. 
함수명	기능
print(x)	객체를 문자열로 표시한다.
input([prompt])	사용자 입력을 문자열로 반환한다.
help([x])	x에 대한 도움말을 출력한다.
globals()	전역 변수의 리스트를 반환한다.
locals() 혹은 vars()
vars(obj)	지역 변수의 리스트를 반환한다.
__dict__ 어트리뷰트를 반환한다. (객체의 내부 변수가 저장된 딕셔너리)
del(x) 혹은 del x	객체를 변수 공간에서 삭제한다.
eval(expr)	값을 구한다.
exec(obj)	파이썬 명령을 실행시킨다.
open(filename[,mode]))	파일을 연다

함수명	기능
object()	새로운 object (모든 객체의 base)를 생성한다.
bool(obj)	객체의 진리값을 반환한다.
int(obj)	문자열 형태의 숫자나 실수를 정수로 변환한다.
float(obj)	문자열 형태의 숫자나 정수를 실수로 변환한다.
complex(re [, img])	문자열이나 주어진 숫자로 복소수를 생성한다.

함수명	기능
type(obj)	객체의 형을 반환한다.
dir(obj)	객체가 가진 함수와 변수들을 리스트 형태로 반환한다.
repr(obj)
ascii(obj)	evla()함수로 다시 객체를 복원할 수 있는 문자열 생성
repr()과 유사하나 non-ascii 문자는 escape한다.
id(obj)	객체의 고유번호(int형)을 반환한다.
hash(obj)	객체의 해시값(int형)을 반환. (같은 값이면 해시도 같다.)
chr(num)
ord(str)	ASCII 값을 문자로 반환
한 문자의 ASCII 값을 반환
isinstance(obj, className)	객체가 클래스의 인스턴스인지를 판단한다.
issubclass(class, classinfo)	class가 classinfo 의  서브클래스 일때 True 반환

함수명	기능
len(seq)	시퀀스형을 받아서 그 길이를 반환한다.
iter(obj [,sentinel] )
next(iterator)	객체의 이터레이터(iterator)를 반환한다.
이터레이터의 현재 요소를 반환하고 포인터를 하나 넘긴다.
enumerate(iterable, start=0)	이터러블에서 enumerate 형을 반환한다.
입력값으로 시퀀스자료형(리스트, 튜플, 문자열)을 입력을 받는다.
sorted(iterable[,key][,reverse])	정렬된 *리스트*를 반환
reversed(seq)	역순으로 된 *iterator*를 반환한다.
filter(func, iterable)	iterable의 각 요소 중 func()의 반환 값이 참인 것만을 묶어서 이터레이터로 반환.
map(func, iterable)	iterable의 각 요소를 func()의 반환값으로 매핑해서  이터레이터로 반환.
filter 함수에 대해 알아보자.
3 가지 방법이 있다. 
1. 그냥 def로 함수를 정의하는 것
data = [1,2,3,4,5]

def odd(data):
    result = []
    for d in data:
        if d%2 == 0:
            result.append(d)
    return result
        
odd(data)

2. filter를 이용하여 True값을 반환하도록 정의하는 것
def odd2(data):
    if data%2 == 0:
        return True
    else:
        return False
    
r = filter(odd2, data)
list(r)
3. 람다식을 이용해서 만들어주는 것
list(filter(lambda x : x%2==1, data))

모듈(모두 소문자로 저장을 한다)
1.	파이썬 모듈
A.	프로그램의 기능 단위
B.	파일 단위로 작성된 파이썬 코드
C.	*.py라는 확장자를 사용
D.	함수보다 상위 개념으로 코드의 재사용을 통한 품질 향상
2.	모듈 만들기(Jupyter notebook에서 할 때는 text File로 한 후, 확장자를 바꿔줘야 한다. 그대로 Python3로 하면 ipynb확장자로 된다. 
A.	def cal_upper(price):
 	increment = price * 0.3
 	upper_price = price + increment
 	return upper_price
def cal_lower(price):
 	decrement = price * 0.3
 	lower_price = price - decrement
 	return lower_price 	//stock.py로 저장한 후에 해야된다. 
B.	import stock 	//import 시켜주고 그 안에 있는 걸 적용시켜준다.
stock.cal_upper(10000)
3.	모듈 사용하기(굳이 할 필요 없음)
A.	파이썬은 여러가지 묘듈을 제공한다.
B.	문자열, 날짜, 시간, 수학, 분수 등등...
4.	모듈의 경로
A.	현재 작업 디렉토리
B.	Pythonpath 환경 변수에 등록된 위치
C.	표준 라이브러리 디렉토리 -> C:\python\lib
D.	sys.path로 현재 경로 확인, sys.path.append()로 추가, remove()로 제거
5.	파이썬에서 시간 다루기
A.	시간과 날짜를 위해 time과 datetime이 있음.
i.	time 모듈 - import time
1.	time()함수 : 현재 시각을 얻어온다. 1970년 1월 1일 0시 0분 0초를 기준으로 초단위로 지난 시간을 알려준다.
2.	ctime()함수 : 사람이 알아볼 수 있게 알려준다.
B.	모듈의 구성요소 확인
i.	import time
dir(time)
C.	모듈을 import 하는 세 가지 방법'
i.	import time //그냥 쓰고 time.ctime()을 쓰면 된다.
ii.	from time import ctime 	//??
iii.	import time as t 	//t.time()이나 t.ctime()으로 써줄 수 있다.
6.	다양한 내장함수의 사용 예
A.	chr(97) -> 'a'
B.	int('3') -> 3
C.	id(), list(), enumerate()

#3일차
클래스
1.	클래스는 데이터의 설계도라고 부를 수 있다. 그리고 클래스에는 변수와 함수가 들어간다. 설계도가 있으면 양산이 가능하다. 설계도에 따라 제작한 실제 제품을 인스턴스라고 한다. 그리고 인스턴스를 만드는 것을 '인스턴스화'라고 한다. 클래스 안의 변수는 멤버 변수, 함수는 메소드라 불린다. 클래스에서 함수를 정의할 때는 반드시 self를 적어야 한다. 
2.	객체는 데이터와 메소드가 묶인 것이다. 파이썬에서 객체는 데이터형이라 바꿔 말할 수 있다. 가령 color ="green"이라고 한다면 color는 문자열 객체라고 할 수 있다. color는 green이라는 문자열 데이터를 갖고 있고 동시에 문자열 특유의 메소드도 갖고 있기 때문이다. color.upper()와 같이 말이다. 그리고 같은 클래스 안에 정의했어도 메소드 안에서 메소드 밖에 있는 변수를 바로 사용할 수 없다. 이 변수를 사용할 수 있는 방법이 바로 self다. self는 그 클래스 자체를 의미한다. self.salary()의 식으로 써주면 된다. 그런데 굳이 이름이 self가 아니어도 되긴 하다. 
A.	제품을 만들 때 초기 설정값을 전달할 수 있으면 더욱 편리한데 그 역할을 해주는 것이 바로 __init__메소드 이다. init메소드 안에 self.변수 = 인자를 해주고 나중에 호출할 때 ()안에 넣고싶은 값을 넣어주면 된다. 
3.	객체지향 프로그래밍(Object Oridented Programming)
A.	데이터를 포함한 데이터구조(field, attribute)와 함수(function, procedure, method)로 구성
B.	객체 내부에 포함된 데이터를 메소드를 통해 수정 가능(this 또는 self 키워드 사용, 컬러펜 같은 경우 set color같은 걸 통해 수정이 가능하다)
C.	프로그램은 모두 객체로 분해되어 설계되고, 객체 간 서로 상호작용을 통해 수행
D.	파이썬을 포함한 대부분의 언어는 클래스 기반이고 객체는 클래스의 인스턴스이다.
E.	모든 객체들은 명사적 특징과 동사적 특징을 가지고 있다. 명사적 특징은 그 객체가 갖는 고유한 변수들(색깔이나 크기 이런 것들 - variable, field, attribute)이고 동사적 특징은 그 객체가 행위하는 것(쓰다, 출력하다 - method, operate, behavior)이다. 
4.	클래스 선언
A.	class Person:
 	name = 'Hobin Lee' 	//이 클래스(Person)의 멤버변수
 	gender = 'male'
 	address = 'seoul'
 	def set_name(self, name): 	//self는 처음 선언할 때만. 이걸 쓰는 이유는 코드블럭을 통해서 name말고도 다른 걸 넣어서 정보를 더 유지할 수 있도록 가능하기 때문이다. 그래서 더 좋은 방법이다. 
 	 	self.name = name
 	def print(self):
 	 	print('my name is {0}' .format(self.name)) 	//하나씩 맵핑된다.
 	def do(cls):
 		print("This is class method")
5.	클래스 객체와 인스턴스 객체의 이름공간 분리
A.	class object와 instance object의 이름 공간이 다르다.
B.	동적으로 인스턴스 멤버를 추가하는 것이 가능하다.(
C.	인스턴스 객체를 통해 변수나 함수의 이름을 찾는 경우 다음과 같은 순서로 찾음.
i.	인스턴스 객체 영역 -> 클래스 객체 영역 -> 전역 영역
D.	isInstance(인스턴스 객체, 클래스 객체)로 해당 타입인지 확인 가능
E.	p1 = Person() 	//p1이라는 변수에 Person()이라는 클래스 객체를 찍는다. 그러면 인스턴스가 된다. 메소드와는 어떻게 구분할까? 첫 문자가 대문자면 클래스로 안다. 그래서 이름 규칙이 중요하다. 설계도를 바탕으로 제품을 만드는 작업이다. 이 제작된 p1은 설계도에 있는 스펙을 그대로 가지고 있다. 이 용어를 '인스턴스화'라고 한다.
p2 = Person()
p1.name = 'hobin lee' 	//p1이라는 인스턴스에 클래스 객체를 넣는다.
p2.print() 	//my name is Hobin lee 	//아무것도 없으니 클래스 객체로 가서 찾는다.
p1.print() 	//my name is hobin lee 	//방금 넣은 것이 나온다. 
p1.set_name('이호빈') 	//이런 식으로 바꿀 수 있다. self는 처음 선언해줄 때만 쓴다. 
Person.do() 	//Person을 써줘야 한다.
6.	생성자, 소멸자 메소드
A.	생성자 : 객체가 생성될 때 자동으로 실행되며, 생성시 필요한 코드를 포함
i.	__init__()
B.	소멸자 : 객체가 소멸될 때 자동으로 실행되며, 소멸시 필요한 코드를 포함
i.	__del__()
ii.	객체는 인스턴스 객체의 레퍼런스 카운트가 0이 될 때 소멸됨(p1=p2처럼 여러 개를 참조할 수도 있으니까. 모두 다 지워줄 때
iii.	class Person:
 	def __init__(self):
 		self.name = 'hobin lee'
 	def __del__(self):
 		print('Person is delete')
 	def set_name(self, name): 	//굳이 필요없는 코드임;;ㅋㅋㅋ앞에 있으니까
 		self.name =name
 	def print(self):
 		print('my name is {0}'.format(self.name)
p3 = person() 	//p3라는 인스턴스 객체를 생성하자마자 name = '~'가 들어감.
p3.print()
del(p3)
7.	상속
A.	객체 재사용의 한 방법
B.	부모 클래스의 모든 속성(데이터, 메소드)를 자식 클래스로 물려줄 수 있다.
C.	오버라이딩 - 자식클래스에 있는 것이 부모 클래스에도 있다면 자식 클래스에 있는 메소드가 우선된다. 
D.	그러나 자식클래스도 부모 클래스에 있는 메소드를 필요로 할 때가 있는데 그 때 쓰는 것이 super이다. super(자식클래스, 인스턴스)를 해주면 된다. 
E.	클래스 간의 관계 확인 - issubclass(자식클래스, 부모클래스)
F.	클래스 정보 확인 - .__dict__
i.	class Person:
 	def __init__(self(아까 1번에서 온 Student이다.), name, gender):
 		self.name = name
 		self.gender = gender
 	def print_info(self):
 		print("Info(name
ii.	class Student(Person): 	//상속해주는 방법. 그냥 써주면 된다. 
def __init__(self(얘는 Student에서 정의되었으니 self는 Student이다. 1번.), name, gender, phonenumber, subject):
 	#self.name = name
 	#self.gender = gender
 	Person.__init__(self(1번에서 온 Student이다 ), name, gender) 	//직접 부모 클래스에 가서 호출을 한다는 의미. 이렇게 쓰는 게 더 좋다. 그 이유는 바꿀 게 여러 개 있을 때 한 번에 바꿀 수 있기 때문이다. 
 	self.phone_number = phone_number
 	self.subject = subject

def print_info(self):
 	print("info(name:{0}, gender{1}, phonenumber:{2}, subject{3})".format(self.name, self.gender, self.phone_number, self.subject))
issubclass(Student, Person)
Student.__dict__
s1 = Student("hong", "남", "010", "국어")
p1 = Person("김", "여")

예외처리
1.	프로그램의 비정상적인 종료를 막는 방법(오류를 막는 게 아니라 오류가 발생하더라도 프로그램이 동작하도록 하자)
2.	예외처리 관련 학습내용
A.	예외
i.	주로 발생되는 예외들은 exception 모듈에 미리 정의되어 있다.
ii.	try:
 	A
except:
 	B 	//A의 처리에서 예외가 발생하면 B로 가서 처리한다. 
B.	예외처리
i.	try ... else : else 절은 예외가 발생하지 않을 경우 실행, except 절 다음에 와야됨.
ii.	try ... finally : 예외 발생과 상관없이 수행, 주로 리소스를 해제할 때 사용(f.close()같은 거)
iii.	에러를 회피하는 경우에는 그냥 pass를 써준다. 파일이 없더라도 오류가 아니도록.
iv.	try:
 	4 / 0
except ZeroDivisionError as e:
 	print(e) 		#e라는 변수에 잡힌다. 
C.	raise - 강제로 에러를 발생해야 할 필요가 있을 때. 아래 예제같은 경우 Bird 클래스를 상속받는 클래스는 반드시 fly() 메소드를 구현해야 한다. 
i.	class Bird:
 	def fly(self):
 		raise NotImplementError
ii.	class Eagle(Bird):
 	pass
eagle = Eagle()
 	eagle.fly()
원인이 어디있냐(callee와 caller)에 따라서 예외를 던져줘야하는 상황도 있다. 다 throws 즉, raise를 한다. 백엔드에서 하지 않고 다 프론트엔드에서 한다. 사용자 입력에 따라서 예외가 발생하니까. 프론트엔드에서 예외를 처리한다. 

파이썬 주요 모듈(라이브러리)
복수의 모듈이 함께 모인 것을 패키지라고 한다. import를 통해 다른 모듈에 있는 메소드를 쓸 수 있고 import A as B를 통해서 이름을 쉽게 바꿔 쓸 수도 있다. 그리고 from을 통해서 패키지에서 특정 모듈만 쓰거나 특정 클래스의 함수만 쓸 수도 있다. from을 쓰게되면 패키지 이름과 모듈 이름을 쓰지 않아도 되는 장점이 있다. calendar.isleap()을 그냥 .isleap으로 써도 된다. 
1.	입출력 : 콘솔 입출력
A.	사용자 입력 : input()
i.	first_number = input('input first number:' )
B.	화면으로의 출력 : print()
i.	버전 3에서 함수로 바뀌었다.
ii.	구분자(sep), 끝라인(end), 출력(file) 등, 키워드 파라미터로 지원
iii.	print()함수 대신에 sys.stdout.write("test")로 출력 가능
iv.	rjust는 오른쪽으로 정렬하라는 의미. 2자리로. 남은 건 공백으로 출력해라. end는 역슬래쉬를 하지 않고 공백으로 띄워라. 
v.	for i in range(1, 10) :
 	for j in range(2, 10):
 		print(str(i*j).rjust(2, ' '), end=' ')
 	print()
C.	파일 입출력
i.	파일 객체는 파이썬에서 파일 입출력을 하기 위한 기능을 모아 놓은 객체다. 파일 객체를 만들려면 open()이라는 내장함수를 사용한다. 
스트림을 연결시키고 난 후, file_object.write('~~')를 써보면 글이 써지나 주의할 점이 있다. 
write메소드가 호출될 때 파일에 데이터를 쓰는 게 아니라는 것이다. 파일 입력 처리는 다른 처리에 비해 시간이 많이 걸리기 때문에 어느정도 쌓아 두고 특정 시점에 쓰도록 되어 있다. 그러나 스트림이 닫히는 f.close() 시점에는 쓰기가 반드시 수행되고 쓰는 타이밍을 직접 지정하려면 flie_object.flush()를 써주면 된다.읽을 때는 그냥 read()를 쓰면 된다. open()의 인자에 파일 위치까지 지정해주면 읽어올 수 있다. 문자열이니까 \\로 써줘야 한다. 
read()메소드를 사용한 후, 다시 파일의 처음부터 읽기를 원한다면 읽는 위치를 파일의 처음으로 옮겨주어야 한다. 그게 바로 seek()메소드이다. 
with를 사용하면 파일 객체가 자동적으로 close하도록 할 수 있다. 
with open('파일명', '모드') as 파일 객체 이름:
 	파일 처리

ii.	파일 생성하기
1.	f = open('새파일.txt', 'w'), fclose() 	#rwa모드가 있다.
iii.	파일 읽기
1.	readline 함수 - 한 줄만 읽는다.
A.	f = open('new_file.txt', 'r')
line = f.readline()
print(line)
f.close()
2.	readlines 함수 - 모두 다 읽는다.
A.	f = open('enw_file.txt', 'r')
line=f.readlines()
for line in lines:
 	print(line)
f.close()
B.	while True: 	#이처럼 while문으로 해도 된다.
 	line = f.readline()
 	if not line: break
 	print(line)
f.close() 
iv.	pickle 모듈 사용(객체를 파일에 저장할 때 사용한다. pickle로 파일에 쓰거나 읽을 때는 반드시 바이너리 모드로 파일을 열어야 한다.) - 직렬화할 수 있다. 직렬화란 객체들을 쉽게 저장하고 불러올 수 있다. 다만 파이썬에서 밖에 쓰지 못 한다. 다른 언어에서 못 쓴다. 즉, 플랫폼이 같아야 한다.
1.	import pickle
colors = ['red', 'green', 'black']
f = open('pickle.dat', 'wb')
pickle.dump(colors, f)
f.close()
2.	import pickle
del colors
f = open('pickle.dat', 'rb')
colors = pickle.load(f)
print(colors)
2.	문자열
3.	날짜
A.	datatime 패키지의 주요 클래스
i.	date
1.	datetime.date(year, month, day)
2.	from datetime import date
today = date(2015, 11, 26)
today2 = date.today()
today2.year
today2.month
today.day
print(today2)
ii.	time
1.	datetime.time(hour, minute, second, microsecond, tzinfo)
2.	from datetime import time
t = time(7)
print(t)
t2 = time(8, 14, 20, 3000)
print(t2)
t3 = time(hour=3, second=12)
print(t3)
iii.	datetime
1.	datetime.datetime
2.	from datetime import datetime, date, time

다양한 기능 추가
1.	외부 라이브러리 - 별도의 설치 없이 import하여 사용할 수 있으면 표준 라이브러리, 그렇지 않으면 외부 라이브러리라고 한다. 이는 별도로 설치를 해줘야 한다. 
A.	외부 라이브러리를 사용하려면 설치한 후, import를 통해서 할 수 있다. pip라는 명령어를 사용하면 pyPI사이트에서 라이브러리를 찾아 설치하고 필요한 설정까지 수행해 준다. 
B.	cmd에서 pip install Pillow라고 쳐주면 된다.
2.	from PIL import Image라고 쳐보자. 에러가 안 뜨면 정상적으로 작동한다는 뜻이다.
3.	파이썬에서 인터넷 접속
A.	이번에는 requests라는 라이브러리를 사용한다. 이 라이브러리는 인터넷 접속을 위한 편리한 모듈을 제공한다.
B.	pip install request를 써서 설치하자. 
C.	웹 API란? API란 Application Programming Interface의 약자로서 다양한 기능의 관문같은 것이다. 웹 API는 웹을 통해 제공되므로 주로 웹 서비스를 운용하는 회사 또는 개인이 제공한다. 
D.	기상청의 RSS를 이용하여 기상 정보를 얻어보자. 기상청 RSS 페이지에서 동네를 검색하여 RSS를 클릭해본다. 그러면 해당 동네에 대한 예보 정보를 얻을 수 있는 주소가 팝업으로 표시된다. 
E.	XML이란 데이터를 나타내는 포맷의 하나다. XML은 인터넷에서 연결된 시스템끼리 데이터를 쉽게 주고 받을 수 있게 하기 위한 목적으로 만들어졌다.
F.	파이썬에서 XML데이터를 다루기 위해서는 xml.etree.ElementTree라는 모듈을 사용한다. 위 XML데이터를 자세히보면 data라는 태크가 세 시간 단위로 존재하고, 그 안에 temp라는 태그 안에 예상 온도가 담겨 있다. 취득한 XML 데이터를 파싱하여 세 시간 단위 예상 온도 시간과 함께 출력해보자. 
G.	위키피디아의 데이터를 얻기 위해 미디어위키라는 서비스를 사용해보자. 
https://www.mediawiki.org/wiki/API:Main_page 여기로 들어가면 API의 사용법이 나와있다. 우선, API에 요청하기 위한 기본 URL을 확인한다.
http://en.wikipedia.org/w/api.php 이 URL에 몇 가지 정보를 추가하고 requests.get을 사용하여 위키피디아의 정보를 취득할 수 있다. 이 기본 URL을 브라우저에 접근하면 API의 사용법이 표시된다. 
i.	기본 URL 뒤에 정보를 추가한다고 표현했는데, ?기호 이후의 정보는 쿼리 파라미터라고 한다. 예제에서 쿼리 파라미터를 분리해보면 5가지로 나뉜다. 
1.	format은 반환되는 데이터 형식을 의미하는 매개변수다. action은 API의 종류를 의미한다. titles는 검색하고 싶은 키워드를 의미한다. prop은 검색결과로 어떤 정보를 반환할지 지정한다. rvprop은 prop으로 지정한 항목을 더 구체적으로 지정할 수 있다. 
H.	웹 api는 변한다. 잘쓰던 웹 API 서비스가 종료될 수도 있다. 애시당초 API를 배포하는 이유가 제공하는 업체의 서비스의 인지도를 높이기 위해서이니가. 
4.	웹사이트의 데이터를 수집하는 것은 크롤링과 스크래핑이 있다.
A.	크롤링 - 웹사이트의 데이터를 그대로 가져오는 것.(requests를 이용해 한 것들)
B.	스크래핑 - 크롤링하며 모든 데이터에서 필요한 것만을 추출하거나 변환하는 것
C.	BeautifulSoup4는 스크래핑을 위한 모듈이다. 
D.	RSS는 웹사이트의 요약 내용과 업데이트 시간을 XML 기반으로 한 포맷(서식)에 정리한 것이다. RSS가 있는 이유는 RSS 리더라는 서비스에게 웹 사이트의 업데이트 내역을 알려주기 위해서다. 
E.	<span> class="list">~</span> 사이에 있다면 soup를 만든 뒤 find메소드를 사용하면 된다. find메소드는 인자로 전달한 조건의 태그를 찾고, 최초로 발견한 태그를 반환한다. 이번에는 findAll 메소드를 사용하여 페이지에 표시된 모든 책 목록을 출력해보자. 여기서 class이름을 검색할 때 class_=라고 하는 이유는 class가 예약어이기 때문이다.
5.	외부 라이브러리를 직접 만드는 방법
A.	print()로 대충 만든 후 저장하고 import시켜서 실행해보면 읽은 동시에 print 함수가 실행되어버린다. import하는 순간에 실행되지 않게 하려면 __name__을 활용한다. 
B.	print(__name__)을 해보면 __main__이라는 문자열이 들어가 있는데 import한 모듈에서는 __name__에 그 모듈의 이름이 들어간다. 그래서 if __name__ == '__main__':을 써주면 바로 실행되지 않는다. 
i.	def main():
print("Contact"
if __name__ == "__main__":
main()
ii.	이렇게 써줘야 다른 모듈에 의해서 내 모듈을 import될 때 main이 실행이 되지않는다. 즉, 자기 자신이 실행될 때 실행된다. 
6.	모듈은 한 개의 파일에 정리된 기능을 말하고 패키지는 복수의 모듈을 한 개의 폴더에 넣어 묶은 것이다. 라이브러리는 모듈이나 패키지를 가리키는 총칭으로 사용된다. 
A.	모듈의 위치를 알려면 import calendar를 한 후에 print(calendar.__file__)이라고 입력하면 된다. 그러면 이제 고수들의 모듈 코드를 알 수 있다. 

파이썬에는 GUI 애플리케이션을 만들기 위한 라이브러리인 tkinter가 표준으로 준비되어 있다. 마찬가지로 import하여 사용할 수 있다. 
#4일차
마커펜을 만들면서 잉크를 까맣게 만드는 방법이 있고 마커펜은 다 만들어놓고 색깔을 지정하는 방법이 있다. 그러나 마커펜을 만들면서 잉크를 지정하는 방법(생성자를 추가하고 나서)
프로젝트를 할 때 
1.	자료구조를 선정할 때. 데이터베이스 테이블 구조를 먼저 저장한다. class Contact처럼. 자료구조를 선정한다 ( class Contact 부분.). 
A.	정보를 저장하기 위해서 변수 40개를 만든다. (딱 10사람.) - 안 좋다.
B.	여러 개의 데이터를 쉽게 관리하기 위해서 리스트타입을 선언할 수 있다. 변수 하나에 여러 개를 선언할 수 있으니까. 
i.	한 사람 거를 리스트에 넣을까. 다른 데이터들이 리스트에 들어간다. 
ii.	같은 데이터를 리스트에 넣을까. 이게 더 낫다. 리스트 안에 다른 타입이 존재하면 별로 안 좋다. 원래 배열은 동종모음(같은 데이터 모음)이다. 그러나 리스트 안에는 같은 데이터 타입이 들어가는 게 바람직하다. name_list = [] 이런 식으로.
C.	그러지 않고 객체를 만들어서 넣으면 더 쉽다. 바로 클래스. 
i.	생성자가 무슨 일을 할까요? 객체가 가지고 있는 속성, 변수들을 초기화하는 일을 합니다. 생성자는 항상 __init__이 됩니다. 현재 만들어진 객체에 name이 추가 가능합니다. self는 그 객체를 의미한다. 객체를 만들면 바로 호출이 되도록 한다. 
ii.	인스턴스 메소드 : 객체를 만들어야만 호출할 수 있는 메소드. 첫 번째 인자가 self니까. 메소드 한 번만 호출해서 쓰면 편하니까. 
D.	lee라는 객체를 만들어서 클래스를 넣는다. 
2.	리스트에 저장할 때. set_뭐시기 메소드는 설정하는 것들이다. get_도 마찬가지.
조금씩 만들어 나가면서 확인한다. 계속계속 실행해보면서. 처음부터 다 만들지 말고. 그렇게 되는 경우가 없다. 

//포트폴리오를 만드는데 굳이 이력서로 하지 않고 동영상으로 해라. 가고 싶은 회사가 있으면 두드려라! 방법론도 중요하다. RUP라는 걸 많이 쓴다. 
//프로그램의 흐름을 이해해야 기능을 채워 나갈 수 있다. 프로젝트 틀을 만드는 게 가장 중요. 
//시스템 구성도의 경우, 입체형으로 그리는 게 좋다. 어떤 OS에서 했는지, 어떤 걸 썼는지 등. 기술 아키텍쳐는 항상 있어야 돼. 개발 환경(시스템 구성도보다 더 상세히 적혀있는 것.) UML을 잘 배워 둬야 한다~
포트폴리오를 만들어봐라. 

#5일차
인공신경망. neural network. 인공지능은 CPU를 많이 소모한다. 
y = a + bx(여기서 a는 bias, b는 weight이라고 부른다)
알파고는 강화학습이라는 머신러닝 기술을 이용했다. 데이터를 계속 훈련시키는 것. 
머신러닝 아래에 딥러닝이 있다. 딥러닝은 학습을 시키는데 아주 깊이 학습을 하는 것이다. 

1.	vmware을 켜서 AI로 들어간다.
2.	우분투 터미널에서 jupyter notebook을 친다.
3.	브라우저에서 deeplearning course에 들어간다. 
4.	그 아래 Python 디렉토리에 들어간다.
5.	그러면 파이썬 패키지가 있다. DNN과 CNN은 딥러닝에 관한 것들이다.
6.	첫 번째로 설명하신 거는 머신러닝 패키지인 pandas. - 리스트로 행과 열 작업하는 건 너무 어렵다. 그래서 판다스는 데이터 분석을 수행하기 위한 기본 고수준 빌딩 블록을 만들 수 있다. 데이터 전처리를 위한 기능들을 모아둠.
7.	판다스 구조인 시리즈는 1차원(장비를 공정할 때 실시간으로 나오는 데이터들), 데이터 프레임(엑셀같은 것들, 행렬)은 2차원은 여러 사용 사례들을 처리한다. 
8.	판다스가 잘하는 것들
A.	결측치 처리(null값들 - 누락된 데이터들)
B.	크기 변경
C.	데이터를 집계, 분할, 병합등.
D.	비정형 데이터를 데이터 프레임 객체로 쉽게 바꿀 수 있다.
E.	판다스 패키지를 사용하기위해서는 pip를 설치해야 한다. sudo apt-get -install이후에 pip install pandas를 치면 된다.
9.	파일 입출력 함수, 데이터 조작 함수(pivot, merge, concat)
10.	리스트로 시리즈 객체 생성(시리즈 클래스를 이용해서 만든다~)
A.	from pandas import Series, DataFrame
B.	fruit = Series([2500,3800,1200,6000],index=['apple','banana','peer','cherry']) 
print(fruit)
11.	데이터 프레임은 컬럼 순서를 지정해줄 수 있고 시리즈보다 데이터 프레임이 훨씬 더 많이 사용된다.
12.	데이터 프레임의 컬럼 이름을 이용해서 특정 항목을 추출할 수 있다. 추가해줄 수도 있고.
13.	열이 같은 타입이기 때문에 R도 그렇고 행보다 열 우선이다.
14.	결측치(NaN)을 0으로 만들어주거나 다른 값으로 바꿔줄 수 있다.
15.	행을 삭제할 수도 있음. (행의 이름, 인덱스가지고 삭제할 수 있다. 따로 지정해서)
16.	axis=1이라 하면 열을 나타낸다. 기본값은 0(행)이다.
17.	NaN과 연산을하면 모두 NaN이 된다. (한쪽이라도 NaN이라면.)
18.	데이터 프레임의 인덱스 정렬 - sort_index()를 이용해서 가능하다. 첫 번째 칼럼을 기준으로 해서. 
19.	German credit data를 판다스의 read_csv() 함수를 이용해 읽을 수 있다. 
20.	corr()은 상관계수(0.7 이상이면 강한 상관관계)를 출력한다.
21.	회귀(평균으로 돌아가는 것).
22.	레이블이 있는 걸 학습하는 걸 지도학습이라고 한다. 
23.	클러스터링은 점만 있는 것.
24.	데이터분석에서 가장중요한 것은 인사이트에 대해 아는 것이 가장 중요.
25.	데이터 샘플링은 최대한 임의적으로 추출할 수 있도록 잘 섞어 놓는다. 한 번 뽑은 걸 빼고 추출하는 걸 비복원추출이라고 한다. 복원추출도 있고 여러 추출방법이있다. 
26.	데이터를 겁나 적용시켜서 모델을 적응시키고 이제 전례없던 실제 데이터를 집어 넣는다. 
27.	p.57 Print할 때와 tail()을 이용할 때 다르게 나타난다. print를 하면 모두 문자열로 표시되기때문에 조금 어색해 보일 수도 있다. 
28.	p.58 정규화. 엄청 큰 막대사탕을 갖고 올 경우 모를 수 있으니까 크기를 늘린다?
29.	원래 데이터가 텍스트이면 불편하니까. 서울 부산, 부산 대전이 있으면 숫자를 넣어준다. 
30.	le.inverse_transform을 해주면 숫자가 다시 문자열로 들어간다.
31.	p.60 없는 값들을 NaN으로 한다. 전략을 mean으로 하면 결측치를 mean 즉, 평균값으로 사용하겠다는 말. median은 두 개의 값을 합쳐서 2로 나눈 것. 
32.	p.61 np.loadtxt로는 1차원 배열로 된다. 
33.	train = redwine_dataframe.sample(grac=0.7) frac는 몇 퍼센트를 뽑아낼 것인가를 의미한다. 70%. 	//학습시킬 데이터
test //학습할 데이터
34.	train_x = train.iloc[:, : -1] //-1은 마지막 열.
35.	모델링
A.	MLPClassifier 함수를 사용한다. (MLP : 멀티 레이어드 퍼세트론(뉴런) - 멀티 다층 신경망)
B.	첫 번째 레이어드에서 나온 게 나머지 30개에 다 들어간다. 50개의 출력이 30개의 입력으로 다들어가는 것. 즉, 1500개의 연산이 일어난다. 
36.	분류예측
A.	테스트의 y값이 pred이다. test_y는 테스트의 y값. pred는 예측값. 5라고 예측했는데 3이라고 예측한 게 1개. 5라고 예측했는데 3개인 것이 8개.
37.	분류모델의 평가 측도
A.	정밀도 : 내가 사기자라고 예측했는데 진짜 사기자인 비율.
B.	민감도 : 사기자중에서 진짜 사기자인 비율. 
C.	정확도 : 얘는 잘 안 쓴다. 정상인이냐는 별로 안 중요하다. 사기자인게 중요하지
D.	F-measure : 조화평균 가장 많이 쓰인다.
38.	모델 평가
A.	accuracy가 다르다. 구글 드라이브에 주피터 드라이버가 다르다. 
39.	Matplotlib
A.	파이썬 패키지 설치는 보통 pip로 한다. 그런데 아나콘다에서는 conda로 한다. 근데 버전이 달라서 conda해도 안 된다. 
B.	wordcloud는 정규화된 값을 가지고 있다. 
C.	plt에서 figure는 그림의 사이즈. imshow는 그려달라고 하는 것. 보여주는 건 show. 축은 보여줄 필요가 없어서 axis를 off
D.	max font size를 정하고 8,8로 하고 크기를 나타내고... plt는 라이브러리 객체. 모듈의 별칭. 
E.	중간에 표같은거 iris는 안 해도 된다. 
40.	Beautiful Soup(웹에서 데이터를 가지고 오는 게 아니라 소스코드에 있는 걸 파싱해서 돔트리구조로 해준다. 가장 위에 /가 있고 그 밑에 HTML이 있고 그 다음에 head, body가 있다. 즉. 메모리상에 트리구조로 해놓으면 쉽게 찾을 수 있다. 텍스트를 뽑아서 원하는 걸 찾을 수 있다. 
A.	파싱을 쉽게 해줌. HTML 태그가 있으면 원하는 태그를 쉽게 빼준다. 
B.	데이터를 찾고 선택하는 api가 있다. 
C.	select api로 css의 선택자로 찾는 게 가능하다. beautiful soup
D.	res에 소스코드가 있는 것.
E.	beautifulsoup을 하면 ~~
//////////////////////////////
1.	ㄹㅇㄴ
2.	데이터 프레임 객체 생성
A.	딕셔너리를 이용하여 데이터 프레임 객체를 생성합니다. 딕셔너리의 각 항목들이 데이터 프레임에서 칼럼의 형태로 변환됩니다.
B.	fruitData = {'fruitName' : ['apple', 'banana','cherry','peer'], 'fruitPrice': [2500, 3800, 6000, 1200], 'num':[10, 5, 3, 8]}
fruitFrame = DataFrame(fruitData)
3.	칼럼 순서 지정

AI zip을 풀고 vmware로 실행한 후, 비밀번호 a1234567890을 쳐서 들어간다.


# my blog python post

# 간단한 Python 예제입니다.

전화번호부를 아주 간단하게 만드는 예제입니다. 메모리에 저장하고 삭제할 수 있습니다. 주석은 생각나는대로 썼습니다.

```python
# -- coding: utf-8 --
"""
Created on Wed Dec 20 15:30:24 2017

@author: Bean
"""
#
    
    
class Contact:  #Contact 클래스 정의

    def __init__(self, name, phone_number, e_mail, addr):   #변수에 쉽게 초기화 하기 위해서
        #가지고 있는 init 함수.(생성자 함수)
        self.name =name
        self.phone_number = phone_number
        self.e_mail = e_mail
        self.addr = addr
        
    def print_info(self):   #그 정보를 가지고 출력하는 함수.
        print("Name : ", self.name)
        print("Phone_number : ", self.phone_number)
        print("e_mail : ", self.e_mail)
        print("addr : ", self.addr)
        print()
    

def set_contact():  #
    name = input("Name: ")
    phone_number = input("Phone number: ")
    e_mail = input("E-mail: ")
    addr = input("Address: ")
    contact = Contact(name, phone_number, e_mail, addr)
    #입력한 변수들을 클래스의 인스턴스에 넣어서 초기화
    #순서를 바꾸면 안 된다. contact 객체에 넣고 return한다. 
    #main함수에 없는 이유는 재사용성을 높이기 위해서. 
    return contact

def print_menu():   #메뉴 출력
    print("1. 연락처 입력")
    print("2. 연락처 출력")
    print("3. 연락처 삭제")
    print("4. 연락처 저장")
    print("5. 종료")

    menu = input("메뉴선택: ")
    return int(menu)    #int를 해준 이유는 우리가 까만 화면에서 입력할 때 문자열로 들어가기 때문이다. 
                        #예를 들어 1을 입력하면 '1' 이런 식으로 들어가기 때문에 정수로 바꿔줘야
           Google 캘린더             # ==으로 비교하기가 쉽다. 

def delete_contact(contact_list, name):     #contact_list와 name을 받는다. 
    for i, contact in enumerate(contact_list):  #열거타입으로 contact_list를 만든다. list는 데이터들이 흩어져도 상관없어. 값만 넣는다. enum은 쭉 줄 서있어.
        #일단 for문의 정의는 in뒤에 있는 얘들을 하나씩 가져다가 앞에다 넣는다.
#        그런데 i, contact 둘이 있는 이유는 enumerate가 딕셔너리 형태이기 때문이다. 그래서 i는 키가되고 contact는 value가 된다.
        if contact.name == name:    #객체의 name값과 사용자가 입력한 name값. 인덱스를 비교해서 
            del contact_list[i]     #이름을 알아도 그 리스트의 위치는 모르니까. 인덱스를 알아야 하니까 enumerate

#enumerate를 쓰지 않고 하는 법.
            #i = -1
#    for i, contact in enumerate(contact_list):  #열거타입으로 contact_list를 만든다. list는 데이터들이 흩어져도 상관없어. 값만 넣는다. enum은 쭉 줄 서있어.
            #i = i+1
#        if contact.name == name:               
#                del contact_list[i]

            
            #c1 = Contact('a', '010', 'a', 'a')
            #c2 = Contact('a', '010', 'a', 'a')
            #id로 c1과 c2를 확인해보면 다르다. 그래서 객체를 비교해서 지우면 안 된다. 

def print_contact(contact_list):    #주소록 정보가 출력된다. contact_list를 받아서 for 문으로 돌린다.
    for contact in contact_list:
        contact.print_info()        #출력한다.



def store_contact_fwrite(contact_list):
#  파일을 열고 써야되니까 wt. 텍스트모드로 쓴다.
    #4줄씩 읽으니까 4줄씩 해야된다. 
    f = open("contact_db.txt", "wt")
    for contact in contact_list:
#    contact는 객체로 받는다는 소리. 반복하는데 그 변수가 객체다. 
#   개행을 각자 넣어줘야 한다.
        f.write(contact.name + '\n')
        f.write(contact.phone_number + '\n')
        f.write(contact.e_mail + '\n')
        f.write(contact.addr + '\n')
    f.close()

def load_contact_fwrite(contact_list):
    f = open("contact_db.txt", "rt")
#    readlines()는 모든 행을 저장한다. 5명이면 20줄이 저장된다. 
    lines = f.readlines()   #lines에는 리스트가 들어간다. 총 4개. 개행까지 포함한 문자열로.
    num = len(lines) / 4    # 4 / 4인데 나누면 float연산이 된다. 1.0이 나와서 num에는 1.0이 들어간다. 
    num = int(num)          # 1.0을 정수로 고쳐주기 위해서 int를 써준다.
    
    #주소록의 개수만큼 돌아라. 
    for i in range(num):
        name = lines[4*i].rstrip('\n')  #rstrip은 맨 오른쪽의 문자를 없앤다는 뜻. 즉, 개행을 없앤다. \n을 지워주기 위해서.
        #왜? 데이터 안에 개행이 있으면 안 되니까. 나중에 출력할 때 줄바꿈이 더 되기도 하고. 
        # 만약에 중간에 개행이 있다면 replace를 써줘야 한다. 
        phone = lines[4*i+1].rstrip('\n')
        email = lines[4*i+2].rstrip('\n')
        addr = lines[4*i+3].rstrip('\n')
        contact = Contact(name, phone, email, addr)
        contact_list.append(contact)
    f.close()

def store_contact_print(contact_list):
    f = open("contact_db.txt", "wt")
    for contact in contact_list:
#        print는 가변인자라서 여러 변수를 써도 된다. contact를 하나씩 빼온다. 한 행 안의 파일이 ,로 구분되어 있는 파일(cvs), sep의 default는 ' ' end의 디폴트는
#        'n'이고 파일에 저장해야 하니까 file=f.
        print(contact.name, contact.phone_number, contact.e_mail, contact.addr, file=f, sep=',')
    f.close()
    


def load_contact_print(contact_list):   #얘네들은 call by reference이다. contact_list.append이니까. 이 라인에 있는 파라미터(contact_list)에 가서 넣는 것이다.
    f = open("contact_db.txt", "rt")
    lines = f.readlines() #readlines는 모든 행을 다 읽는데 리스트로 들어가서 ['ㅁ,ㄴ,ㅇ,ㄹ', 'ㅁ,ㄴ,ㅇ,ㄹ',]이런 식...''안에는 문자열이다. 
    for line in lines:  #lines 리스트 안에 있는 만큼 line을 실행. line도 리스트가 된다. 
        data = line.split(',')  #구분 기호를 집어넣는다. split은 기본이 공백이다. Line이 리스트니까 공백을 구분 단위로 한다. 
        contact = Contact(data[0], data[1], data[2], data[3])   #0번째는 이름, 1번째는 전화번호... 칼럼이 늘어나면 그대로 다시 넣어줘야 한다. 
        contact_list.append(contact)

    f.close()

def store_contact_pickle(contact_list):
    f = open("contact_db.data", "wb")   #바이너리 파일로 불러올 때는 확장자도 바꿔줘야 한다.
    import pickle #굳이 맨 위에 정의하지 않아도 된다. 
    pickle.dump(contact_list, f)    #꺼내서 하나하나씩 저장할 필요가 없다. 리스트 통째로 저장한다.
    f.close()
    
def load_contact_pickle():  #파라미터가 굳이 필요없다. call by value처럼 동작하기 때문에
    f = open("contact_db.data", "rb")
    import pickle
    contact_list = pickle.load(f)   # 통째로 받아와서 다시 저장한다. .을 안 찍고 =으로 받기 때문에 이전 게 사라지고 새로운 객체가 들어온다.
#   객체 형태로 모두 들어간다. 리스트형태로 모두 들어간다. 
    f.close()
    return contact_list #왜 굳이 return을 해야될까? 객체니까 contact_list의 주소값을 전달해준다. 
    

    
def main():
    contact_list = []   #contact_list를 리스트로 지정해준다. 
    print(contact_list)
    try:
        contact_list = load_contact_pickle()
    except OSError as e:
        print(e)
    while 1:    #무한 루프로 돌게 한다. 사용자가 입력을 안 한다고 할 때까지 입력을 받아야 하니까.
        menu = print_menu()    #메뉴를 화면에 띄워야 하니까.  #print_menu에서 리턴된 정수 menu를 다시 menu변수에 넣는다. 
        if menu == 1:   #연락처 입력
            contact = set_contact()     
            contact_list.append(contact)    #추가한다.
        elif menu == 2:     #연락처 출력
            print_contact(contact_list)
        elif menu == 3:     #연락처 삭제
            name = input("Name: ")
            delete_contact(contact_list, name)  
        elif menu == 4:     #연락처 저장
            store_contact_pickle(contact_list)
        elif menu == 5:     #종료
            break
        else:
            break
    
    
if __name__ == "__main__":  #다른 모듈에 의해 import될 때 여기 있는 main이 먼저 호출되면 안 되니까. 
                            #스스로 실행될 때만 이 main이 실행되게 하려고. 
    main()

```

