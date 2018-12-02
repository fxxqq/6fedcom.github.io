---
title: 12月份todolist
categories: front-end
top: 5
password: ms
abbrlink: 4bf41c9b
date: 2018-11-28 22:45:45
tags:
---
手机相册的爱奇艺题目

for of 和for in的区别
算法题刷一遍
redux工作流
v-router原理
v-cli构建以及优化
axios
promise，async/await,Generator 实现异步的方案与区别
BFC
ES6实现Promise

react-router的实现原理

session、cookie、sessionStorage、localStorage等区别
px/em/rem的区别
animation和transiton的相关属性
JavaScript闭包
结合es6谈了下作用域和单例模式谈了下
JavaScript的节流和防抖
阿里交叉面问到的js事件执行机制。我大概谈了下event loop，microtask，task queue。然后事件委托、捕获、冒泡、目标阶段大概谈了下，也顺道谈了下target和currentTarget。

因该算是考察基础功吧，谈了下XMLHTTPRequest的过程，readyState的几种类型和代表的意思。以及浏览器兼容性的处理方案。
js判断数据类型的方法
typeof、instanceof、constructor、prototype
函数声明和变量声明
this的四种绑定规则
面向对象的理解 滴滴一面问的，大概说了下理解以及实现，从封装、继承和多态上说了下es5和es6的实现方式
对于js这门语言你认为怎么样

这个应该回答的都不是很深入，大概我都用过，promise的实现方式也研究过，但是不记得哪一家公司问到generator的怎么实现的。大概从iterator上简单说了自己的方案，然后说没看过。然后对于别的其实问的不是很多。基本套路就是es6了解过吗？用过哪些语法。后面具体可能会说下哪一个新特性的实现方式或者转向babel、webpack的相关面试。

react部分必考的肯定有生命周期
 这里我大概说了下每一个生命周期，es5、es6的两种书写方式，以及每一个生命周期我们一般用来做些什么操作

 这个我比较熟悉，一带说了下所有的技术栈，以及react-redux的原理、高阶组件、以及redux-saga的实现原理。（逮住会的，都啪啪啪说出来，自己掌握点节奏。但是要适当，比如问到我es6，我啦啦啦说了一二十分钟，一般面试官会有点不耐烦。所以视情况而定）
 

 如何设计一些组件，原则是什么，你写过什么自豪或者眼前一亮的组件
阿里一面以及一家上市公司也闻到过这类似的问题，大概从组合、复用、重复、测试、维护等方面说了下

a组件在b组件内，c组件在a组件内，如何让他渲染出来，a组件和c组件同级

阿里面试的时候问到的问题，想了一会，说了不会。后来查了下，大概可以通过react16中返回不带包裹元素的组件来实现。因为和阿里一面面试官后来聊得比较开心，加了微信，还斗胆为了下他，他说还有曲线救国的实现方式

 react组件的优化
从pureRenderMixin、ShouldComponentUpdate等方面说了下，以及组件的设计和木偶组建的函数编写方式说了下

react组件的通信
这个大搞几种方式也都说了下，prop，context（顺道扯了react-redux的context实现方式）、redux甚至广播都说了一遍

react 的virtual dom和diff算法的实现方式
阿里交叉面问的，直接说实现方式源码没有看过，但是大概说了下原理和步骤，具体代码怎么写的不知道。

MVC、MVVM了解么，数据双向绑定和单向绑定实现方式
滴滴一面问的，实现方式还是说了不知道，然后说了下MVC和MVVM的设计模式，因为之前用过angular1，大概就说下脏检查步骤以及view-model的作用

react-router实现方式，单页面应用相关东西
大概说了下react-router的一般使用方式，以及没有使用react-router的时候如何利用h5 的history API来实现路由跳转等。

http三次握手后拿到HTML，浏览器怎么加载

阿里的一面问的问题，这个我之前在环球做过相关技术分享，所以大概都知道，从过程到不同内核差异（差异部分简单提了下）说了下dom、CSSDom以及paint等过程。然后面试官接着问如何防止repaint和reflow。大概从引起repaint和reflow等操作上说了下避免。网易的一面也问到了repaint和reflow。

 http2.0相关

网易一面问题，说了下2.0的采用二进制格式、多路复用、报文头压缩、服务器主动推送还扯了websocket的相关内容WebSocket：5分钟从入门到精通。然后网易接着问，报文头怎么压缩的？我。。。？？不知道。。。然后大概也问了下https的TLS/SSL,之前看过漫画的https的相关东西，大概说了下漫画里面的故事~

post、get区别

https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd


编写过webpack的扩展嘛，Plugin或者loader

这个我看过一本书《深入浅出webpack》，所以基本都能回答上来。包括原理和编写loader、Plugin注意事项。当然，我自己没有写过。。。《深入浅出webpack》

babel 问的不多，但是我也准备了，包括每一个包的作用和内部转换过程，不记得哪家公司问了，大概我也就说了下babel转换的过程。

二叉树，网易问了链表方面


https://github.com/jawil/blog/issues/22
