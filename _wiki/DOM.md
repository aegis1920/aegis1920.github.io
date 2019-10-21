---
layout  : wiki
title   : DOM
summary : 
date    : 2019-07-05 15:48:31 +0900
updated : 2019-07-05 17:05:17 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# DOM

getElementById()
Element.qeurySelector()
css selector

이벤트 리스너

```
var el = document.getElementById("outside");
el.addEventListener("click", function(evt){
 console.log(evt.target);
 console.log(evt.target.nodeName);
}, false);
```



