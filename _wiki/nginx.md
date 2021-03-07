---
layout  : wiki
title   : Nginx
summary : 
date    : 2021-03-07 18:57:52 +0900
updated : 2021-03-07 19:00:40 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

AWS 인프라 스터디 중인데 혹시나 도움이 될까 적어봤습니다. 이 문서는 나중에 Nginx에서 궁금한 내용들을 계속 추가하면서 다룰 생각입니다.

## Nginx Header 알아보기

nginx에서 사용하는 변수와 속성들을 알고 사용하고 싶어서 좀 더 찾아봤습니다 :)

```bash
location / {
    proxy_pass http://localhost:8080;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
}
```

### 변수들

- `$remote_addr`, `$http_host`는 nginx의 Core 모듈(ngx_http_core_module)에 있는 변수입니다
    - `$remote_addr` 는 클라이언트의 IP를 가리킵니다
        - 서버(스프링부트)에서도 `request.getRemoteAddress();` 를 사용해 클라이언트의 IP를 얻을 수 있습니다
    - `$http_host` 는 `$host` 와 같은 값입니다
        - `$host` 는 요청 헤더에서 'Host' 필드를 가져오거나 서버이름 또는 호스트 이름을 가져옵니다
- `$proxy_add_x_forwarded_for`는 nginx의 Proxy 모듈(ngx_http_proxy_module)에 있는 변수입니다
    - `X-Forwarded-For` 헤더에 `$remote_addr`을 자동으로 추가하는 역할을 합니다
    - 즉, 거치는 클라이언트마다 클라이언트의 IP를 `X-Forwarded-For` 헤더에 계속해서 추가해줍니다

### proxy_set_header 속성

- 말 그대로 해석하시면 됩니다 :)
- 프록시 서버(nginx)에 전달된 요청 헤더에 필드를 재정의하거나 추가할 수 있습니다
- 헤더 필드의 value가 빈 문자열이면 전달되지 않습니다.
    - `proxy_set_header Accept-Encoding "";`

### 헤더에 왜 `X-` 를 붙이나?

- 일반적으로 비표준 헤더면 `X-`를 붙입니다

### X-Real-IP

- 말 그대로 요청의 클라이언트의 IP를 가져오기 위한 헤더입니다
- `$remote_addr` (요청의 클라이언트의 IP)를 넣어줍니다.

### X-Forwarded-For

- 서버에 요청한 클라이언트의 IP를 식별하기 위한 헤더(사실상 표준)
- **클라이언트의 IP와 거쳐온 프록시 서버들의 IP들**을 담아서 가지고 옵니다
- 서버(스프링부트)에서 `request.getHeader("x-forwarded-for");` 를 사용해 들어온 클라이언트의 IP들을 알 수 있습니다
- 클라이언트의 IP 주소와 같이 민감한 개인 정보를 노출시키기 때문에 사용자의 프라이버시를 주의해야 합니다.
- X-Forwarded-For를 쓰는 이유는?
    - 디버깅, 통계, 로깅할 때 사용됩니다

### Host

- HTTP Request의 Host 헤더 속성을 표현하는 헤더

> 즉, 위에 있는 3개의 헤더를 추가해준 이유는
로깅 및 통계를 위해
**요청의 Host**
**요청의 클라이언트의 IP**
**지금까지 거쳐온 프록시 서버들의 IP와 클라이언트 IP**
를 서버가 알 수 있도록 하기 위함입니다.

### 출처

- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Forwarded-For](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Forwarded-For)
- [https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)
- [https://nginx.org/en/docs/http/ngx_http_core_module.html](https://nginx.org/en/docs/http/ngx_http_core_module.html)
- [https://nginx.org/en/docs/http/ngx_http_proxy_module.html](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/httpheaders.htm](https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/httpheaders.htm)
- [https://blog.lael.be/post/8989](https://blog.lael.be/post/8989)

