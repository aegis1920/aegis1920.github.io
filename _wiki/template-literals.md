---
layout  : wiki
title   : Template literals란?
summary : 
date    : 2019-08-10 14:46:59 +0900
updated : 2019-08-10 15:03:54 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Template literals란?

* ES6에서 나온 새로운 문자열 표기법
* 원래라면 `var a = ''` 문자열 안에 줄바꿈을 넣어도 나오지 않고 `\n`을 써야지만 가능했다. 또한 변수를 추가해줄 때도 문자열 뒤에 `+`를 붙이고 다시 문자열을 써줘야 했다.
* 이제 그럴 필요가 없어졌다. \`\`를 써주고 문자열에 변수를 쓰고 싶을 때 +로 더하지 않고 변수명에 `${}`를 써주면 된다.

### 예시

```javascript
var who = 'you';
var expression = `I
love
${who}!
`;
console.log(expresison);
```

