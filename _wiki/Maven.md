---
layout  : wiki
title   : Maven
summary : 
date    : 2019-07-21 15:48:42 +0900
updated : 2019-08-12 17:10:18 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# Maven

## Maven이란?

* 빌드, 패키징, 문서화, 테스트, git, 의존성관리, svn 등과 같은 형상 관리 서버와 연동 배포 등의 작업을 손쉽게 할 수 있다
* 즉, 설치할 라이브러리가 많을 때 파일을 하나하나 다운받고 해당 폴더에 복사해 사용하는 것이 아니라 Maven 설정 파일에 해당하는 라이브러리 코드만 적으면 자동으로 설치가 된다

## Maven 기본

* Maven 프로젝트를 생성하면 프로젝트 하위에 pom.xml 파일이 생성된다.
* Maven의 가장 큰 이점은 Dependency Management이다. <dependencies/> 태그 안에 필요한 라이브러리를 저장한다

## Maven 프로젝트를 만들 때

### Archtype이란?

* 일종의 프로젝트 템플릿
* 어떤 아키타입을 선택했느냐에 따라 자동으로 여러 파일들을 생성하거나 라이브러리를 셋팅해준다

### 프로젝트 설정

* Group Id는 보통 프로젝트를 진행하는 회사나 팀의 도메인 이름을 거꾸로 적는다
* Artifact Id는 해당 프로젝트의 이름을 적는다.
* 버전은 보통 기본값(0.0.1-SNAPSHOT)으로 설정한다.
* package이름은 group id와 Artifact Id가 조합된 이름이 된다.

### Maven 프로젝트 구조

* src/main/java에는 자바 패키지 폴더와 소스코드가 들어간다
* src/main/resource에는 *.properties, *.xml등 설정파일들이 위치한다
* src/main/webapp에는 WEB-INF와 웹 관련 리소스들이 위치한다
* src/test 쪽에는 테스트와 관련된 파일들이 위치한다
* /target은 컴파일, 패키징된 결과물이 위치한다
* /pom.xml은 Maven 설정파일

### 순차적으로 해줘야 할 것들

* 프로젝트의 속성을 들어가서 java compiler를 선택해보면 JDK가 디폴트로 1.5버전으로 잡혀있다
* pom.xml을 수정하자. build 태그 안에 아래 코드를 넣자
```xml
<finalName>mavenweb</finalName>
        <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.6.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
```
* project의 maven 탭에서 maven update를 해주면 JDK가 1.8로 바뀌어 있다.
* index.jsp에 가보면 javax.servlet.http.HttpServlet이 없다고 나오는데 이는 WAS 런타임을 설정해주지 않아서 그렇다. dependencies 아래에 다음을 추가하자
```xml
<dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
</dependency>
```
* scope태그의 의미
    * compile : 컴파일 할 때 필요. 테스트 및 런타임에도 클래스 패스에 포함된다. scope 을 설정하지 않는 경우 기본값이다.
    * runtime : 런타임에 필요. JDBC 드라이버 등... 컴파일 시에는 필요하지 않지만, 실행 시에 필요한 경우
    * provided : 컴파일 시에 필요하지만, 실제 런타임 때에는 컨테이너 같은 것에서 제공되는 모듈. servlet, jsp api 등이 이에 해당. 배포 시 제외된다. 
    * test : 테스트 코드를 컴파일 할 때 필요. 테스트 시 클래스 패스에 포함되며, 배포 시 제외된다.

### JSTL과 EL을 사용하고 싶다면

* JSTL을 쓰려면 따로 라이브러리를 추가해야 한다.
* EL은 다이나믹 웹 모듈의 버전이 2.4부터 사용할 수 있으므로 2.3일 경우 EL의 표기법의 결과가 출력되지 않는다.
* EL을 쓰려면 web.xml 파일과 .settings/org.eclipse.wst.common.project.facet.core.xml을 수정해야 한다.

## CMD로 하는 Maven

* apache 사이트에서 maven.zip을 받아 tomcat처럼 환경변수를 설정해준다.
* 그러면 cmd에서도 `mvn -version`이라든지, `mvn archetype:generate` 등 명령어로 maven 프로젝트를 만들어줄 수 있다.


