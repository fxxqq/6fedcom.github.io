---
title: http请求报文介绍
categories: front-end
tags: http
abbrlink: ef1b6cee
date: 2018-12-06 14:11:28
---

HTTP报文是面向文本的，报文中的每一个字段都是一些ASCII码串，各个字段的长度是不确定的。HTTP有两类报文：请求报文和响应报文。

### 一、一个HTTP请求报文由请求行（request line）、请求头部（header）、空行和请求数据4个部分组成
下图给出了请求报文的一般格式。
![HTTP请求报文1](/img/2018/12/http-message.png)
![HTTP请求报文-详解](/img/2018/12/http-message2.jpg)

以下逐步分析各个数据部分的作用。

1、请求行

　　　　请求行由请求方法字段、URL字段和HTTP协议版本字段3个字段组成，它们用空格分隔。

　　　　例如打开路径http://www.baidu.com/index.php，用火狐浏览器可以查看到请求报文为：

　　　　GET /index.php HTTP/1.1

　　　　因此用空格分隔之后得到的信息为

　　　　(1)请求方法:  GET

　　　　(2)URL信息:  /index.php

　　　　(3)HTTP协议版本:  HTTP/1.1　　
2、请求头部
　　　　User-Agent：浏览器的具体类型　　如：User-Agent：Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0

 　　　  Accept：浏览器支持哪些数据类型　　如：Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

　　　　Accept-Charset：浏览器采用的是哪种编码　　如：Accept-Charset: ISO-8859-1

　　　　Accept-Encoding：浏览器支持解码的数据压缩格式　　如：Accept-Encoding: gzip, deflate

　　　　Accept-Language：浏览器的语言环境　　如：Accept-Language zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3

 　　　  Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。Host:www.baidu.com

　　　   Connection：表示是否需要持久连接。Keep-Alive/close，HTTP1.1默认是持久连接，它可以利用持久连接的优点，当页面包含多个元素时（例如Applet，图片），显著地减少下载所需要的时间。要实现这一点，Servlet需要在应答中发送一个Content-Length头，最简单的实现方法是：先把内容写入ByteArrayOutputStream，然后在正式写出内容之前计算它的大小。如：Connection: Keep-Alive

　　　　Content-Length：表示请求消息正文的长度。对于POST请求来说Content-Length必须出现。

　　　　Content-Type：WEB服务器告诉浏览器自己响应的对象的类型和字符集。例如：Content-Type: text/html; charset='gb2312'

　　　　Content-Encoding：WEB服务器表明自己使用了什么压缩方法（gzip，deflate）压缩响应中的对象。例如：Content-Encoding：gzip

　　　　Content-Language：WEB服务器告诉浏览器自己响应的对象的语言。

　　　　Cookie：最常用的请求头，浏览器每次都会将cookie发送到服务器上，允许服务器在客户端存储少量数据。

 　　　  Referer：包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。服务器能知道你是从哪个页面过来的。Referer: http://www.baidu.com/

 3.空行
最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头。

4.请求数据

请求数据不在GET方法中使用，而是在POST方法中使用。POST方法适用于需要客户填写表单的场合。与请求数据相关的最常使用的请求头是Content-Type和Content-Length。

 ### 二、HTTP响应报文

 　HTTP响应报文与HTTP请求报文是对应的，也是分为三个部分。

　　1、响应行

　　2、响应头

　　3、响应体

```
HTTP/1.1 200 OK　　//响应行
Date: Sat, 31 Dec 2005 23:59:59 GMT
Content-Type: text/html;charset=ISO-8859-1
Content-Length: 122

＜html＞
＜head＞
＜title＞Wrox Homepage＜/title＞
＜/head＞
＜body＞
＜!-- body goes here --＞
＜/body＞
＜/html＞
```

![HTTP响应报文](/img/2018/12/xiangying.jpg)
![HTTP响应报文-详解](/img/2018/12/xiangying2.jpg)

HTTP响应报文常用属性：

Cache-Control 
响应输出到客户端后，服务端通过该报文头属告诉客户端如何控制响应内容的缓存。 
下面，的设置让客户端对响应内容缓存3600秒，也即在3600秒内，如果客户再次访问该资源，直接从客户端的缓存中返回内容给客户，不要再从服务端获取（当然，这个功能是靠客户端实现的，服务端只是通过这个属性提示客户端“应该这么做”，做不做，还是决定于客户端，如果是自己宣称支持HTTP的客户端，则就应该这样实现）。

Cache-Control: max-age=3600

ETag

一个代表响应服务端资源（如页面）版本的报文头属性，如果某个服务端资源发生变化了，这个ETag就会相应发生变化。它是Cache-Control的有益补充，可以让客户端“更智能”地处理什么时候要从服务端取资源，什么时候可以直接从缓存中返回响应。

ETag: "737060cd8c284d8af7ad3082f209582d"

Location

我们在Asp.net中让页面Redirect到一个某个A页面中，其实是让客户端再发一个请求到A页面，这个需要Redirect到的A页面的URL，其实就是通过响应报文头的Location属性告知客户端的，如下的报文头属性，将使客户端redirect到iteye的首页中：

Location: http://www.google.com.hk

Set-Cookie

服务端可以设置客户端的Cookie，其原理就是通过这个响应报文头属性实现的。

Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1

HTTP响应体：如果请求的是HTML页面，那么返回的就是HTML代码。如果是JS就是JS代码。

HTTP响应头：而设置Cookie，缓存等信息就是在响应头属性设置的。

HTTP响应行：主要是设置响应状态等信息。