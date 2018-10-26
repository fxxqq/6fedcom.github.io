---
title: 跨域问题携带cookie加入withCredentials报错原因以及解决方案
categories: 前端
abbrlink: b2790fdc
date: 2018-10-22 18:26:41
tags: [cookie,跨域,ajax]
---
 
1.跨域允许
解决方法：服务器发送允许客户端发送源的报文头
header('Access-Control-Allow-Origin:'.$_SERVER["HTTP_ORIGIN"]);
2.客户端无法携带跨域cookie
这个时候就可以在extjs中加入withCredentials
```js
$.ajax({
    url: 'http://120.111.111.123/setcookie.php',
    method: 'POST',
    params: { 
        'text': 'hello world'
    },
    withCredentials: true,
    success: function(transport){
        // do something
    },
    failure: function(transport){
        alert("Error: " - transport.responseText);
    }
});
```
3.因为加了withCredentials报文头，可是客户端不知道服务器允不允许报的错（耿直的客户端）
这个时候就在服务器发送Access-Control-Allow-Credentials
header('Access-Control-Allow-Credentials:true');
4.由于客户端不知道服务端是否允许POST请求而报的错
这个时候要在服务器端加入
```
header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');
```

以上汇总起来就是

```
header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');  
header('Access-Control-Allow-Origin:'.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since,
```

1.跨域允许
不允许报错的跨域
```
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
Origin 'null' is therefore not allowed access.
```
报这个错就说明我们跨域了，不在允许的访问源，于是乎我在服务的setcookie.php加入`header('Access-Control-Allow-Origin:*')`;允许所有源
然后又报错
```
XMLHttpRequest cannot load http://120.111.111.123/setcookie.php. Request header field X-Requested-With is not allowed by Access-Control-Allow-Headers in preflight response.
``` 

在跨域的时候，js不会直接发post请求，而是先发送一个option请求，看看服务器允许什么访问头（比如是不是允许post请求），验证成功后才会发送真正的请求
```
#用谷歌的开发者工具抓的option报文
OPTIONS /setcookie.php HTTP/1.1
Host: 120.111.111.123
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Access-Control-Request-Method: POST
Origin: null
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Access-Control-Request-Headers: x-requested-with
Accept: */*
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
``` 

```
#path /setcookie.php
session_start();
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Methods:OPTIONS, GET, POST'); // 允许option，get，post请求
header('Access-Control-Allow-Headers:x-requested-with'); // 允许x-requested-with请求头
header('Access-Control-Max-Age:86400'); // 允许访问的有效期
// 功能...
// ...
```

继续测试我们的新功能，成功的解决了跨域问题
但是，cookie没有“设置成功”。而之所以没有“设置成功”，是因为cookie存在本地，但是每个cookie都有一个domain，当你本地的cookie中存在你当前访问的域时，才会被带过去，而我的index.html文件是本地访问的，即http://localhost/index.html，而cookie的域是要跨域的域名的，所以不行了。

```js
$.ajax({
    type: "POST",
    url: "跨域的url",
    xhrFields: {
         withCredentials: true 
    }, // 发送凭据
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    dataType: "json",
    success: function (message) {
       
    },
    error: function (message) {
        console.log(message)
    }
});
```
继续访问，报错
```
Response to preflight request doesn't pass access control check: A wildcard '*' cannot be used in the 'Access-Control-Allow-Origin' header when the credentials flag is true. 
Origin 'null' is therefore not allowed access. 
The credentials mode of an XMLHttpRequest is controlled by the withCredentials attribute.
```
现在这个错误产生的原因就是
1.因为加入了withCredentials之后，Access-Control-Allow-Origin就不能用“*”了，既然不允许访问这个源，那我就让你发个报文头让你允许访问呗！

```
#path setcookie.php
session_start();
// 是否存在请求源
if(isset($_SERVER["HTTP_ORIGIN"])) {
    header('Access-Control-Allow-Origin:'.$_SERVER["HTTP_ORIGIN"]);  
}

header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');

// 功能...
// ...
```
好了，上传完代码，继续测试。发送请求之后，又报错了
```
Response to preflight request doesn't pass access control check: Credentials flag is 'true', but the 'Access-Control-Allow-Credentials' header is ''. 
It must be 'true' to allow credentials. Origin 'null' is therefore not allowed access.
```
 
大概的意思就是说我给你发了`withCredentials`报文头，但是你服务器没有跟我说允许我带这个报文头，那么解决方法就是加上允许发这个报文头的报文头

```
session_start();
// 是否存在请求源
if(isset($_SERVER["HTTP_ORIGIN"])) {
    header('Access-Control-Allow-Origin:'.$_SERVER["HTTP_ORIGIN"]);  
}
header('Access-Control-Allow-Origin:null');  
header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');

header('Access-Control-Allow-Credentials:true');


// 功能...
// ...
```
终于成功了！

>摘自
链接：https://www.jianshu.com/p/552daaf2869c
來源：简书
 