---
layout  : wiki
title   : 
summary : 
date    : 2019-07-01 13:44:29 +0900
updated : 2019-07-01 17:34:04 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}



toolbar에 app을 쓰면 같이 내려가지 않고 위에 고정된다.
v-app은 최상위 컴포넌트.

class명으로 바탕 색깔이나 text의 색깔들을 설정해줄 수 있다.
v-btn을 쓰면 버튼 생성. 여기에 class="pink white--text"를 바탕이 핑크이면서 텍스트는 하얀색임.
v-btn에다가 v-icon을 써서 써줄 수 있다. class없이 left로 위치를 설정해줄 수 있고 btn 안에 span으로 글을 써줄 수도 있다. 
fab을 써주면 동그라미로 된다.

화면 크기가 커질 때 버튼이 생기게 하려면 v-btn의 속성에다가 hidden-md-and-up같이 써주면 된다. only로 이때만 써도 되고...

<v-toolbar-title class="text-uppercase grey--text">
<span class="font-weight-light">Todo</span>
중간에 공백을 둬서 공간을 없애려면 spacer를 이용하면 된다.

```vue
<v-navigation-drawer v-model="drawer" app class="indigo">
<p>text</p>
</v-navigation-drawer>
```    
script에도 data의 return값에 drawer: false를 해주면 

v-toolbar-side-icon @click="drawer = !drawer"

theme은 primary, success, info, error등의 색깔을 vuetify.js에서 설정해줄 수 있다.

v-navigation 안에 v-list, v-list-tile, v-list-tile-content를 통해서 예쁘게 만들 수 있다.

v-icon에 dashboard라는 아이콘도 잇다. v-list-tile 안에 v-list-tile-action에 연결시켜줄 수 있다.

script의 links에 route를 지정해주면 list의 설정에 따라 바꿔줄 수 있다.

## margin & padding

`m-x-2`

## grid system

container에 class="my-5"를 써줘도 된다.
<v-layout row wrap justify-space-around> 여러 조건이 있다. 
    <v-flex xs12 md6>
    <v-flex xs12 md6>


## dummy project data

<v-card flat class="pa-3" v-for="project in projects" :key="project.title">
    <v-layout row wrap :class="pa-3 project ${project.status}"
    
style태그에 .project.complete{
    border-left:4px solid ;
} 로 주게 된다면 그 사람의 상태에 따라 색깔을 다르게 줄 수 있다.

<v-divider />

## chips

`<v-chip small :class="\`${{project.status}}\` white--text"> {{project.status}} </v-chip>

## Sorting Projects

<v-btn small flat color="grey" @click="sortBy('title')">

methods에다가 sortBy(prop){
    this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
}

<v-tooltip bottom>
<v-btn slot ~~하고
해당하는 btn의 위에 v-tooltip top이라고 적는다.

## Cards

data에 team이 있어야 함. name, role, avatar 등등... avatar: /avatar/avatar_1.png의 형식으로 적는다.

<v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 v-for-"person in team" :key="person.name"
        <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
            </v-responsive>
            <v-card-text>
                <div class="subheading">{{person.name}}</div>
                <div class="grey--text">{{person.role}}</div>
</v-layout>


## Avatar
<v-avatar size="100" class="grey lighten-2">
    <img :src="person.avatar">

navigation-drawer app v-model 안에 v-layout column align-center를 해주면 가운데로 정렬이 된다. 그 전에 v-flex로 mt-5정도로 해준다.


## expansion panels

```vue
<v-expansion-panel>
    <v-expansion-panel-content v-for="project in projects" :key="project.title">
        <div slot="header">{{project.title}}</div>
        <v-card>
            <v-card-text class="px-4 grey--text">
            <div class="font-weight-bold"> due by {{project.due}}
            


/* 자기 것만 나오도록 */
computed: {
    myProjects(){
        return this.projects.filter(project => {
            return project.person === 'The Net Ninja'
        })
    }
}
```

## Menus

<v-menu>
    <v-btn flat slot="activator">
        <v-icon left>expand-more</v-icon>
    </v-btn>
    <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-lsit-tile-title>{{link.text}}</v-list-tile-title>
    </v-list>
</v-menu>


## Popups

Popup.vue를 component에 만든다. 그리고나서 똑같이 template에다
<v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">Add new project</v0btn>
    <v-card>
        <v-card-title>
            
</v-dialog>


그리고나서 navbar에 component를 추가하고 import함. 

## Form Basics

<v-card-text>
    <v-form class="[px-3]">
        <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
        <v-textarea label="Information" v-model="content" prepand-icon="folder"></v-textarea>
    </v-form>
    
data(){
    return{
        title: ''
        content ''
    }
},
methods: {
    submit(){
        console.log(this.title, this.content);
    }
}

## datepicker

<v-menu>
    <v-text-field :value="due" slot="activator" label="Due date" prepend-icon="date_range">
    <v-date-picker v-model="due"></v-date-picker>

<script>
import format from 'date-fns/format'

computed:{
    formattedDate(){
        return this.due ? format(this.due, 'Do MMM YYY') : ''
    }
}

## Simple Form Validation

<v-text-field v-model="title" prepend-icon="folder" :rules="inputRules"


data(){
    return {
        inputRules: [
            v => v.length >= 3 || 'Minimum length is 3 characters'
        ]
    }
}

methods:{
    submit(){
        if(this.$refs.form.validate()){
            console.log(this.title, this.content)
        }
    }
}

## Button Loaders

버튼이 로딩될 때 submit() 함수가 작동할 때 this.loading = true;로 해주고 평소에는 :loading = false, 그리고 db에 들어가면 this.loading = false로.

## snackbar

alert을 이쁘게 만들어놓은 느낌.

<v-snackbar v-model="snackbar" :timeout="4000" top color="success">
    <span>Awesome!! You added a new Project. </span>
    <v-btn flat color="white">Close</v-btn>
</v-snackbar>

data쪽에 snackbar를 false로 두고 어떤 것을 클릭했을 때 true로 바꾸도록.
DB에 넣었을 때 true로.

