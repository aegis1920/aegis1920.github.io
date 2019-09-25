---
layout  : wiki
title   : Vue
summary : 
date    : 2019-06-20 15:40:27 +0900
updated : 2019-09-25 15:59:20 +0900
tags    : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# vue

## 1.1 개발환경

### 1.1.1
vue는 사용자 인터페이스를 위한 front-end에 적용할 수 있는 프레임워크.


보통은 client -> server -> controller -> jsp(포워딩) -> view -> client

html은 거의 없다. 다 jsp였지. 서버에서 요청하고 서버에서 작업하고 마크업만 html로

spa(html)는 한 페이지에 다 짠다는 뜻. 페이지 이동 없이 그 페이지 안에 작은 화면들을 짜집기 해서 만든다. 서버로부터 독립적이게 된다. 

spa 안에 js를 짜서 백엔드와 비동기 통신을 한다. 웹 화면에 스크립트만 넣으면 하나의 작은 one 페이지 기반의 애플리케이션이 된다.

데이터를 주기만 하면 된다. 일반적인 컨트롤러로 보는 게 아니라 contents 적인 데이터에 응답을 보낼 수 있게...

uri로 웹 상에 있는 데이터를 식별할 수 있도록. ~/directors/0001   get방식이라고 하면 0001인 아이디의 데이터를 갖고 온다~
보통 4개가 표준화 되어있다. get, post. put, delete. uri자체가 특정 리소스를 대표하는 유니크한 수단으로 쓴다. 

쿼리 스트링이 아니라 url 자체의 일부에 대상을 집어넣는다. 
get방식은 조회한다. post는 저장해달라. put은 수정해라. delete는 삭제해라.

service

서비스를 잘게 쪼개는 것.

rest controller라는 게 있다. 원래 controller의 확장형. 이 환경(mvc)들을 springboot환경으로 할 수 있다.

ajax. 요청 보내서 xml이나 json 데이터가 온다. 그러면 동적으로 생성하도록. 

vue를 쓰면 제이쿼리를 안 쓴다. viewmodel이 코드를 짤 수 있다. view에서 데이터를 바꾸면 model 의 데이터도 바뀐다. viewmodel은 프론트단의 controller 느낌.
데이터의 상태만 갱신하면 끝난다. 즉각적인 반응을 view에서 알아서 해준다. 템플릿만 잘 만들면. 

컴포넌트를 만들어놓을 수 있다. 그리고 나서 화면에 넣어서 조립할 수 있다.
데이터와 뷰가 동기화될 수 있는 것이 vue.

값이 변경될 때 재 계산하고 싶다 하면 computed

값이 변경될 때 말고 다른 연산 외에도 추가적인 작업도 하고 여러 어떤 이벤트 핸들러 로직을 하고 싶다 하면 watch를 쓴다.

# Vue 시험 리뷰

1. JSP와 Servlet은 백엔드(O)
2. <img :src='a.address'/\>만 보고 바로 클릭했다. :이 있었다. 속성을 줄 때 {{}}을 쓸 수 없다.(X)
3. \<div v-show="false" style="display:none"\>(X)
4. created. beforeMount가 아니다(X) 인스턴스가 생성된 후 처음으로 호출되는 것
5. computed 대신에 쓸 수 있는 건 method. (X), watch가 아님. 속성명이 다르면 못 쓴다??
6. 연결되어있지 않으므로 first.$data.title or first.title. 왜 el로 써야된다고 생각했을까. this에 대해서 자세히 알아야될듯(X)
7. 알러진. 속성으로도 하고
8. 동적으로 자주 변경되는 데이터이거나, 비동기에 의해서 동적으로 자주 변경되는 데이터일 때 가장 적합한 표현. 하나의 객체로 만드는 것이 아니라. 객체를 리턴해야 하므로 return이 있어야 하고 data() { return {info : []}} 정의한 게 리턴된다. (X)
9. 

SPA LifeCycle

옛날에는 요청을하면 HTML 전체를 줬는데 SPA는 HTML을 받고 AJAX로 서버와 통신한다. 

자바스크립트가 계속 돌면서 AJAX로 인해 필요한 정보를 계속해서 가져오고 준다. 

SPA는 초기 구동 속도가 느리다. IE8 이하는 지원하지 않는다. 보안에 신경써야 한다.

firebase Cloud Function을 써보자. firebase functions sample이라는 github repository가 있다. 

## Vuex
### state
- 중앙 집중 저장소
- store.js 파일 안에 작성
- main.js 파일 안에서 Vue를 생성할 때 store가 있어야 함
- $store로 불러올 수 있다. 
- state가 data와 같은 곳
### getters
- 중복된 호출을 없애기 위해 getters가 존재한다.
- 함수로 이루어져 있음
- state의 computed 역할을 하는데 state를 쓴다고 얘기를 해줘야 함.

### map getters
- 원하는 컴포넌트 내로 getters를 불러주는 역할
- import를 시켜줘야 함. `import {mapGetters} from 'vuex'`라고 쓰고 computed에 ...mapGetters([])로 불러와야 한다. 배열이 아니라 객체로 받아서 이름을 바꿔서 줄 수도 있다.
- mapState([])와 같이 state도 불러와줄 수 있다.

### mutations
- state를 변화시키는 mutations
- 각각의 컴포넌트 내에서 mutations 내에 있는 함수를 commit해서 변화시킨다.
- mapMutations([])를 통해서 써준다.
- 동기로 동작.

### actions
- mutations에 비동기 로직들이 포함되면 순서를 알기가 어려워 비동기 로직은 actions에서 실행하게 된다.
- actions를 실행하는 것은 dispatch. 그리고나서 commit을 한다.
- context, payload가 있다. context를 간단하게 써준 게 {commit}.
- 불러올 때 `this.$store.dispath('addUsers', userObj)`로 불러온다.
- ...mapActions(['addUsers'])

### 예시

SignUp.vue file

```javascript


import { mapMutations } from 'vuex'

export default{
    data(){
        return{
        
        }
    },
    methods:{

        // ...mapMutations(['addUsers', 'double']),
        ...mapActions(['addUsers']),
        signUp(){
        
        }
        
        // this.addUsers(userObj)
        // this.$store.dispatch('addUsers', userObj)
        this.addUsers(userObj)
        

    }
}

```

AllUsers.vue 파일

```javascript
import { mapState, mapGetters } from 'vuex'

export default{
    data(){
        return{
        
        }
    },
    computed: {
        // 이러면 그냥 이름대로 {{count}} 처럼 써주면 된다.
        ...mapGetters({
            count: 'allUsersCount',
            seouls: 'countOfSeoul',
            percent: 'percentOfSeoul'
        }),
        mapState(['allUsers'])
    }
        

}
```

store.js 파일

```javascript
getters: {
    allUserCount: state => {
        return state.allUsers.length
    },
    countOfSeoul: state => {
        let count = 0
        state.allUsers.forEach(user => {
            if(user.address === 'Seoul') count++
        })
        return count
    },
    percentOfSeoul: (state, getters) => {
        return Math.round(getters.countOfSeoul / getters.allUserCount * 100)
    }
},
mutations: {
    addUsers: (state, payload) => {
    state.allUsers.push(payload)
    }
},
actions: {
    addUsers: ({commit}, payload) => {
        commit('addUsers', payload)
    }
}
```

## 로그인 프로세스

- 이메일과 비밀번호를 계속 가지고 있거나 계속 요청을 하게 되면 누군가 중간에 가져갈 수 있기 때문에 보안상 문제가 된다. 

1. 이메일과 비밀번호를 서버에게 요청
2. 서버는 토큰을 클라이언트에게 준다.

- 토큰은 짧은 주기로 갱신하여 사용되기 때문에 중간에 빼앗기더라도 시간이 지나면 무용지물이 된다. 보안상 안전하다.

- Local Storage에 남기는 것은 아주 위험하다. 다른 사람이 볼 수 있으니까.
- 새로고침할 때마다 유효한지 알아보는 함수는 보통 main.js 파일에 넣는다.

store.js

```javascript

actions : {
    login({ dispatch }, loginObj) {
        axios
            .post(URL, loginObj)
            .then(res => {
                let token = res.data.token
                localStorage.setItem("access_token", token)
                dispatch("getMemberInfo")
            })
            .catch(() => {
                alert("이메일과 비밀번호를 확인하세요")
            })
    
    }

}


getMemberInfo({ commit }) {
    let token = localStorage.getItem("access_token")
    let config = {
        headers: {
            "access-token": token
        }
    }

    axios
        .get(URL, config)
        .then(response => {
            let userInfo = {
            }
            commit("loginSuccess", userInfo)
        })
        .catch(() => {
            alert("이메일과 비밀번호를 확인하세요")
        })
}
```

main.js

```javascript
new Vue({
    router,
    store,
    beforeCreate(){
        this.$store.dispatch("getMemberInfo")
    },
    render: h => h(App)
}).$mount(""#app")
```

