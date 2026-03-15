---
layout: post
title: JavaScript正则表达式
category: JavaScript
description: 正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。这些模式被用于 RegExp 的 exec 和 test 方法，以及 String 的 match、matchAll、replace、search 和 split 方法。本章介绍 JavaScript 正则表达式。
tags: [js, javascript, regex, 正则表达式]
---

## 1. 创建

+ 字面量

```js
const r = /ab+c/;
```

+ RegExp对象

```js
const r = new RegExp("ab+c");
```

## 2. 编写

### 2.1. 简单模式

由想直接找到字符构成，如`/abc/`

### 2.1. 特殊字符

```

#user  nobody;
worker_processes  12;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {                   
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen			80;
        server_name		open.jeffrey.me;

        proxy_set_header	X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
        location / {
            proxy_pass http://127.0.0.1:8080/;
            proxy_connect_timeout	600;
            proxy_read_timeout		600;
        }

    }
    server {
        listen       80;
        server_name  api.jeffrey.me;

        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
        location / {
            proxy_pass http://127.0.0.1:9999/;
            proxy_connect_timeout	600;
            proxy_read_timeout		600;
        }

    }
    server {
        listen		80;
        server_name	blog.jeffrey.me;

        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        location / {
            proxy_pass http://127.0.0.1:3002/;
            proxy_connect_timeout	600;
            proxy_read_timeout		600;
        }
    }
    
    server {
        listen		80;
        server_name	kb.jeffrey.me;

        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        location / {
            proxy_pass http://127.0.0.1:3003/;
            proxy_connect_timeout	600;
            proxy_read_timeout		600;
        }
    }


    server {
        listen		80;
        server_name	console.jeffrey.me;

        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        location / {
            proxy_pass http://127.0.0.1:3000/;
            proxy_connect_timeout	600;
            proxy_read_timeout		600;
        }
    }

    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   ~/Desktop/Jeffrey/octopus;
    #        index  index.html index.htm;
    #    }
    #}

}
```

