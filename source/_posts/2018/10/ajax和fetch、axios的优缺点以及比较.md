---
title: ajax和fetch、axios的优缺点以及比较
categories: 前端
tags:
  - Ajax
  - Fetch
  - Axios
abbrlink: 7fae67c6
date: 2018-10-26 09:18:54
---

前端是个发展迅速的领域，前端请求自然也发展迅速，从原生的XHR到jquery ajax，再到现在的axios和fetch。

## jquery ajax 
```js
$.ajax({
    type: 'POST',
    url: url,
    data: data,
    dataType: dataType,
    success: function() {},
    error: function() {}
})
```

它是对原生XHR的封装，还支持JSONP，非常方便；真的是用过的都说好。但是随着react，vue等前端框架的兴起，jquery早已不复当年之勇。很多情况下我们只需要使用ajax，但是却需要引入整个jquery，这非常的不合理，于是便有了fetch的解决方案。

**优缺点**
- 本身是针对MVC的编程,不符合现在前端MVVM的浪潮
- 基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
- JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务）

## fetch 

`fetch`号称是ajax的替代品，它的API是基于Promise设计的，旧版本的浏览器不支持`Promise`，需要使用`polyfill es6-promise`

举个例子：
```js
// 原生XHR
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		console.log(xhr.responseText) // 从服务器获取数据
	}
}
xhr.send()
// fetch
fetch(url).then(response = > {
	if (response.ok) {
		response.json()
	}
}).then(data = > console.log(data)).
catch (err = > console.log(err))
``` 

看起来好像是方便点，then链就像之前熟悉的callback。

在MDN上，讲到它跟jquery ajax的区别，这也是fetch很奇怪的地方：

当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ）， 仅当网络故障时或请求被阻止时，才会标记为 reject。 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.

突然感觉这还不如jquery ajax好用呢？别急，再搭配上async/await将会让我们的异步代码更加优雅：

```js
async function test() {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
}
```
 
看起来是不是像同步代码一样？简直完美！好吧，其实并不完美，async/await是ES7的API，目前还在试验阶段，还需要我们使用babel进行转译成ES5代码。

还要提一下的是，fetch是比较底层的API，很多情况下都需要我们再次封装。 比如：
```js
// jquery ajax
$.post(url, {name: 'test'})
// fetch
fetch(url, {
    method: 'POST',
    body: Object.keys({name: 'test'}).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&')
})
``` 

由于fetch是比较底层的API，所以需要我们手动将参数拼接成'name=test'的格式，而jquery ajax已经封装好了。所以fetch并不是开箱即用的。
另外，fetch还不支持超时控制。

**优缺点：**
- 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
- 更好更方便的写法
- 更加底层，提供的API丰富（request, response）
- 脱离了XHR，是ES规范里新的实现方式
- 1）fetchtch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
- 2）fetch默认不会带cookie，需要添加配置项
- 3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
- 4）fetch没有办法原生监测请求的进度，而XHR可以

## axios

axios是尤雨溪大神推荐使用的，它也是对原生XHR的封装。它有以下几大特性：

可以在node.js中使用
提供了并发请求的接口
支持Promise API
简单使用

```js
axios({
    method: 'GET',
    url: url,
})
.then(res => {console.log(res)})
.catch(err => {console.log(err)})
```
 
写法有很多种，自行查看文档

并发请求
```js
function getUserAccount() {
  return axios.get('/user/12345');
}
 
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```
 
这是官方的并发案例，好像是挺厉害的样子。不过感觉它的all方法应该是基于Promise.all()的

axios体积比较小，也没有上面fetch的各种问题，我认为是当前最好的请求方式 

**优缺点：**

从 node.js 创建 http 请求
支持 Promise API
客户端支持防止CSRF
提供了一些并发请求的接口（重要，方便了很多的操作）

最后，这都是些基础用法，还没有深入了解，还是要在实战中踩过坑才能运用的更加自如。

# 为什么要用axios?
axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：

从浏览器中创建 XMLHttpRequest
从 node.js 发出 http 请求
支持 Promise API
拦截请求和响应
转换请求和响应数据
取消请求
自动转换JSON数据
客户端支持防止CSRF/XSRF

以上内容整理于互联网
![0](https://user-images.githubusercontent.com/22697565/47509372-8dce1a00-d8a8-11e8-959d-faf613af8dcc.jpg)

--------------------- 
>作者：林寻丶
>来源：掘金
>原文：https://juejin.im/post/5acde23c5188255cb32e7e76?utm_medium=fe&utm_source=weixinqun

--------------------- 
>作者：WebCandy 
>来源：CSDN 
>原文：https://blog.csdn.net/twodogya/article/details/80223508 
