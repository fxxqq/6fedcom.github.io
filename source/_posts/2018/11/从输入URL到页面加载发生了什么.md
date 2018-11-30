---
title: 从输入URL到页面加载发生了什么
categories: front-end
abbrlink: e277deca
date: 2018-11-23 23:14:05
tags:
---
眼过千遍，不如手敲一遍。
文章参考：https://segmentfault.com/a/1190000006879700
1. DNS解析
2. TCP连接
3. 发送HTTP请求
4. 服务器处理HTTP请求
5. 页面渲染
6. 断开TCP连接

仔细思考这个问题，发现确实很深，这个过程涉及到的东西很多。这个问题的回答真的能够很好的考验一个web工程师的水平
注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

### DNS解析
DNS查询顺序如下，若其中一步成功则直接跳到建立链接部分：
* 浏览器自身DNS
* 操作系统DNS
* 本地hosts文件
* 向域名服务器发送请求

### TCP连接
TCP三次握手(three-way handshaking)

* 发送方:SYN(synchronize)
* 接收方:SYN/ACK(acknowledgement),确认信息传达
* 发送方:ACK - 确认接收方在线可收消息，握手结束
* Accept

![TCP三次握手](/img/2018/11/three-way-handshaking.jpg)

（1）第一次握手：建立连接时，客户端A发送SYN包（SYN=j）到服务器B，并进入SYN_SEND状态，等待服务器B确认。

（2）第二次握手：服务器B收到SYN包，必须确认客户A的SYN（ACK=j+1），同时自己也发送一个SYN包（SYN=k），即SYN+ACK包，此时服务器B进入SYN_RECV状态。

（3）第三次握手：客户端A收到服务器B的SYN＋ACK包，向服务器B发送确认包ACK（ACK=k+1），此包发送完毕，客户端A和服务器B进入ESTABLISHED状态，完成三次握手。

TCP三次握手的的好处在于：发送方可以确认接收方仍然在线，不会因为白发送而浪费资源。

#### HTTPS协议
为什么要把HTTPS协议放在这里讲呢？
- 因为HTTP报文是包裹在TCP报文中发送的，服务端收到TCP报文时候会解包提取出HTTP报文。
- 但是这个过程中存在一定的风险。HTTP报文是明文，如果中间被截取的话会存在一些信息泄露的危险。那么在进入TCP报文之前对HTTP做一次加密就可以解决这个问题了。HTTPS协议的本质就是HTTP + SSL(or TLS)

![HTTPS](/img/2018/11/https.jpg)

#### HTTPS过程

HTTPS在传输数据之前需要客户端与服务器进行一个握手(TLS/SSL握手)，在握手过程中将确立双方加密传输数据的密码信息。TLS/SSL使用了非对称加密，对称加密以及hash等。具体过程请参考经典的阮一峰先生的博客TLS/SSL握手过程。
HTTPS相比于HTTP，虽然提供了安全保证，但是势必会带来一些时间上的损耗，如握手和加密等过程，
**是否使用HTTPS需要根据具体情况在安全和性能方面做出权衡**。

### 发送HTTP请求

构建HTTP请求报文并通过TCP协议中发送到服务器指定端口(HTTP协议80/8080, HTTPS协议443)。
HTTP请求报文是由三部分组成: 请求行, 请求报头和请求正文。

**请求行：**
Method Request-URL HTTP-Version CRLF

**请求报头**
请求报头允许客户端向服务器传递请求的附加信息和客户端自身的信息。
PS: 客户端不一定特指浏览器，有时候也可使用Linux下的CURL命令以及HTTP客户端测试工具等。
常见的请求报头有: Accept, Accept-Charset, Accept-Encoding, Accept-Language, Content-Type, Authorization, Cookie, User-Agent等。


#### 事件循环(Event loop)
1. js是单线程，js解析方法时，将同步任务排队到执行栈中，异步任务排队到事件队列中。
2. 事件队列分为:
宏任务：setTimeout，setInterval，setImmediate，I/O，UI交互事件
微任务：process.nextTick，Promise.then
3. 浏览器环境中执行方法时，先将执行栈中的任务清空，再将微任务推到执行栈中并清空，之后检查是否存在宏任务，若存在则取出一个宏任务，执行完成检查是否有微任务，以此循环…

### 4. 服务器处理HTTP请求并返回HTTP报文

HTTP响应报文也是由三部分组成: 状态码, 响应报头和响应报文。

#### HTTP缓存
强缓存和协商缓存

### 5.浏览器解析渲染页面
使用HTML创建文件对象类型（DOM）
使用CSS创建CSS对象类型（CSSOM）
基于DOM和CSSOM执行脚本（Scripts）
合并DOM和CSSOM形成渲染树（Render Tree)
使用渲染布局（Layout）所有元素渲染（Paint）所有元素

### 6.断开TCP连接（4次挥手）







