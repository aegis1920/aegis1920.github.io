---
layout  : wiki
title   : Jacoco
summary : 
date    : 2021-08-05 20:14:41 +0900
updated : 2021-08-05 20:15:39 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

Jacoco란?

- Java 코드의 커버리지를 체크하는 라이브러리
- `jacocoTestReport`를 통해서 보기 좋게 HTML로 만들 수 있음
- `jacocoTestCoverageVerification`를 통해 커버리지 기준을 설정해줄 수 있음
- `build.gradle`에서 설정함

```java
plugins {
    id 'org.springframework.boot' version '2.3.1.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'

		// 플러그인에 Jacoco 추가
    id 'jacoco'
}

group = 'wooteco.team.ittabi'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

jacoco {
    toolVersion = '0.8.5'
}

// html로 쉽게 보여줄 수 있도록 해주는 리포트 설정
jacocoTestReport {
    reports {
        html.enabled true
        xml.enabled false
        csv.enabled false
    }

		// 리포트를 먼저 설정해주고 jacocoTestCoverageVerification를 실행합니다.
    finalizedBy 'jacocoTestCoverageVerification'
}

jacocoTestCoverageVerification {
    violationRules {
        rule {
            enabled = true
						// BUNDLE은 전체를 뜻함. 전체 단위로 아래 limit 규칙을 적용하겠다~
            element = 'BUNDLE'

            limit {
								// 보통 디폴트로 INSTRUCTION를 함
                counter = 'INSTRUCTION'
                value = 'COVEREDRATIO'
                minimum = 0.80
            }

            limit {
								// if와 같은 조건문의 커버리지
                counter = 'BRANCH'
                value = 'COVEREDRATIO'
                minimum = 0.70
            }

						// 제외시킬 파일들. 전체라서 굳이 exclude하지 않았음
            excludes = []
        }

        rule {
            enabled = true
						// 클래스 단위로 아래 limit 규칙을 적용하겠다~
            element = 'CLASS'

            limit {
                counter = 'BRANCH'
                value = 'COVEREDRATIO'
                minimum = 0.50
            }

						// 제외시킬 파일들
            excludes = [
                    '*.mailauth.*',
                    '*.config.*',
                    '*.MailAuthService',
                    '*.aws.*',
                    'wooteco.team.ittabi.legenoaroundhere.domain.award.PopularityPostCreatorAward',
            ]
        }
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.apache.tika:tika-core:1.22'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'io.springfox:springfox-swagger2:2.9.2'
    implementation 'io.springfox:springfox-swagger-ui:2.9.2'
    implementation 'com.sun.mail:javax.mail:1.6.0'
    implementation 'org.springframework:spring-context-support:5.0.1.RELEASE'
    implementation 'io.jsonwebtoken:jjwt:0.9.1'
    implementation platform('com.amazonaws:aws-java-sdk-bom:1.11.832')
    implementation 'com.amazonaws:aws-java-sdk-s3'
    implementation 'org.flywaydb:flyway-core'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.security:spring-security-oauth2-client'

    testImplementation 'io.rest-assured:rest-assured'
    testImplementation 'org.springframework.security:spring-security-test'
    testImplementation 'io.rest-assured:rest-assured'
    testImplementation('org.springframework.boot:spring-boot-starter-test') {
        exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
    }

    runtimeOnly 'com.h2database:h2'
    runtimeOnly("mysql:mysql-connector-java:8.0.17")

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testCompileOnly 'org.projectlombok:lombok'
    testAnnotationProcessor 'org.projectlombok:lombok'
}

test {
    useJUnitPlatform()
		// 테스트를 하고 jacocoTestReport를 하겠다~
    finalizedBy 'jacocoTestReport'
}
```

## 참고할 것

- `jacocoTestReport`는 항상 전체 커버리지의 리포트 형식을 보여줍니다. `jacocoTestCoverageVerification`를 수정했다고 해서 `jacocoTestReport`가 바뀌지 않습니다.
- 롬복 또한 커버리지에 들어가는데 롬복을 빼기 위해서는 프로젝트 최상단 디렉토리에 `lombok.config` 파일 추가한 후, `lombok.addLombokGeneratedAnnotation = true` 를 설정해주면 롬복 어노테이션들은 커버리지로부터 무시할 수 있습니다.

### Jacoco Report 보기

- `jacocoTestReport` 를 실행시킨 후, 아래 사진에서 볼 수 있습니다. build → reports → jacoco → test → html 폴더 안에 `index.html`이 있습니다.
- 빌드가 되었다면 `jacocoTestReport`, `jacocoTestCoverageVerification`를 개별로 실행해줄 수 있습니다.

    `Gradle` 탭의 `verification`에서 해당하는 탭을 더블클릭하시면 됩니다.

- test를 누르면 당연히 테스트와 같습니다만 test가 끝난 후 build된 파일을 가지고 `jacocoTestReport`, `jacocoTestCoverageVerification`를 실행합니다.

### 꿀팁

- 빌드 파일만 있다면 jacoco를 실행할 수 있기 때문에 새로 test를 돌릴 필요없이 `jacocoTestCoverageVerification`의 설정을 바꾸고 Gradle을 새로고침한 후, `jacocoTestCoverageVerification`를 바로 돌릴 수 있습니다.

### 출처

- [https://woowabros.github.io/experience/2020/02/02/jacoco-config-on-gradle-project.html](https://woowabros.github.io/experience/2020/02/02/jacoco-config-on-gradle-project.html)

