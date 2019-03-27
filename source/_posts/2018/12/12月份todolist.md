---
title: 12月份todolist
categories: front-end
password: ms
abbrlink: 4bf41c9b
date: 2018-11-28 22:45:45
tags: [todo]
---

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
交叉面问到的js事件执行机制。我大概谈了下event loop，microtask，task queue。然后事件委托、捕获、冒泡、目标阶段大概谈了下，也顺道谈了下target和currentTarget。

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

首先说说为什么要使用Virturl DOM，因为操作真实DOM的耗费的性能代价太高，所以react内部使用js实现了一套dom结构。Virtual DOM最主要的还是保留了Element之间的层次关系和一些基本属性
在每次操作在和真实dom之前，使用实现好的diff算法，对虚拟dom进行比较，递归找出有变化的dom节点，然后对其进行更新操作。为了实现虚拟DOM，我们需要把每一种节点类型抽象成对象，每一种节点类型有自己的属性，也就是prop，每次进行diff的时候，react会先比较该节点类型：假如节点类型不一样，那么react会直接删除该节点，然后直接创建新的节点插入到其中；假如节点类型一样，那么会比较prop是否有更新，假如有prop不一样，那么react会判定该节点有更新，那么重渲染该节点，然后在对其子节点进行比较，一层一层往下，直到没有子节点。在Web开发中,需要将数据的变化实时反映到UI上,这时就需要对DOM进行操作,也就是既状态改变了就要操作相应的DOM元素。
解决这个问题有一个非常直观的方法,可以大大降低视图更新的操作,那就是:
一旦状态发生了变化,就用模版引擎重新渲染整个视图,然后用新的视图更换掉旧的视图。
我们一定会想到:这样的做法会导致很多的问题。最大的问题就是这样做效率太低。
因为即使一个小小的状态变更都要重新构造整棵DOM,性价比太低;而且这样做的话,input和textarea的会失去原有的焦点。
最后的结论会是:对于局部的小视图的更新,没有问题;但是对于大型视图,如全局应用状态变更的时候,需要更新页面较多局部视图的时候,这样的做法不可取。
但是我们会发现,其实React就是这么做的,只是增加了Virtual DOM(虚拟DOM)来避免了整棵DOM 树变更。
*
操作dom很容易引起页面重排，杀死性能。
相对于DOM 对象,原生的JavaScript 对象处理起来更快,而且更简单。并且我们可以很容易地用JavaScript 来构造DOM。
既然这样,是不是可以将上面的“状态变更->重新渲染整个视图”的方式稍微修改一下:
用JavaScript 对象表示DOM 信息和结构,当状态变更的时候,重新渲染这个JavaScript 的对象结构。
当然这样做其实没什么用,因为真正的页面其实没有改变。
但是可以用新渲染的对象树去和旧的树进行对比,记录这两棵树差异。记录下来的不同就是我们需要对页面真正的DOM 操作,
然后把它们应用在真正的DOM 树上,页面就变更了。
这样就可以做到:视图的结构确实是整个全新渲染了,但是最后操作DOM的时候确实只变更有不同的地方。这就是所谓的Diff算法。
为什么这样做就快了呢?因为:javaScript很快,DOM很慢。所以要尽量使用快的,减少使用慢的。
*
Diff算法包括以下三个步骤:
1、用JavaScript 对象结构表示DOM 树的结构;然后用这个树构建一个真正的DOM 树,插到文档当中。
2、当状态变更的时候,重新构造一棵新的对象树。然后用新的树和旧的树进行比较,记录两棵树差异。
3、把2所记录的差异应用到步骤1所构建的真正的DOM 树上,视图就更新了。
这种做法在React中叫做Virtual DOM(虚拟DOM)。由虚拟DOM来确保只对界面上真正变化的部分进行实际的DOM操作。
*
虚拟DOM本质上就是在JS 和DOM 之间做了一个缓存。可以类比CPU 和硬盘,既然硬盘这么慢,我们就在它们之间加个缓存:既然DOM 这么慢,我们就在它们JS 和DOM 之间加个缓存。CPU(JS)只操作内存(Virtual DOM),最后的时候再把变更写入硬盘(DOM)。
*

### 函数柯里化
```js
// add 函数柯里化
function add() {
    //建立args,利用闭包特性，不断保存arguments
    var args = [].slice.call(arguments);
    //方法一，新建_add函数实现柯里化;
    console.log(arguments)
    console.log(args)
    var _add = function () {
        if (arguments.length === 0) {
            //参数为空，对args执行加法
            return args.reduce((a, b) => {
                return a + b
            });
        } else {
            console.log([].push.apply(args, arguments));
            
            //否则，保存参数到args，返回一个函数
            [].push.apply(args, arguments);
            return _add;
        }
    }
    //返回_add函数
    return _add;

    // //方法二，使用arguments.callee实现柯里化
    // return function () {
    //       if (arguments.length === 0) {
    //           return args.reduce(function(a,b){return a+b});
    //       }
    //       Array.prototype.push.apply(args, arguments);
    //       return arguments.callee;
    //   }
}
console.log(add(1, 2, 3)(1)(2)(3)(4, 5, 6)(7, 8)()); //42
```