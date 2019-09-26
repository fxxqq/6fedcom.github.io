---
title: 12月份todolist
categories: front-end
password: ms
abbrlink: 4bf41c9b
date: 2018-11-28 22:45:45
tags: [todo]
---

for of 和 for in 的区别
算法题刷一遍
redux 工作流
v-router 原理
v-cli 构建以及优化
axios
promise，async/await,Generator 实现异步的方案与区别
BFC
ES6 实现 Promise

react-router 的实现原理

session、cookie、sessionStorage、localStorage 等区别
px/em/rem 的区别
animation 和 transiton 的相关属性
JavaScript 闭包
结合 es6 谈了下作用域和单例模式谈了下
JavaScript 的节流和防抖
交叉面问到的 js 事件执行机制。我大概谈了下 event loop，microtask，task queue。然后事件委托、捕获、冒泡、目标阶段大概谈了下，也顺道谈了下 target 和 currentTarget。

因该算是考察基础功吧，谈了下 XMLHTTPRequest 的过程，readyState 的几种类型和代表的意思。以及浏览器兼容性的处理方案。
js 判断数据类型的方法
typeof、instanceof、constructor、prototype
函数声明和变量声明
this 的四种绑定规则
面向对象的理解 滴滴一面问的，大概说了下理解以及实现，从封装、继承和多态上说了下 es5 和 es6 的实现方式
对于 js 这门语言你认为怎么样

这个应该回答的都不是很深入，大概我都用过，promise 的实现方式也研究过，但是不记得哪一家公司问到 generator 的怎么实现的。大概从 iterator 上简单说了自己的方案，然后说没看过。然后对于别的其实问的不是很多。基本套路就是 es6 了解过吗？用过哪些语法。后面具体可能会说下哪一个新特性的实现方式或者转向 babel、webpack 的相关面试。

react 部分必考的肯定有生命周期
这里我大概说了下每一个生命周期，es5、es6 的两种书写方式，以及每一个生命周期我们一般用来做些什么操作

这个我比较熟悉，一带说了下所有的技术栈，以及 react-redux 的原理、高阶组件、以及 redux-saga 的实现原理。（逮住会的，都啪啪啪说出来，自己掌握点节奏。但是要适当，比如问到我 es6，我啦啦啦说了一二十分钟，一般面试官会有点不耐烦。所以视情况而定）

如何设计一些组件，原则是什么，你写过什么自豪或者眼前一亮的组件
阿里一面以及一家上市公司也闻到过这类似的问题，大概从组合、复用、重复、测试、维护等方面说了下

a 组件在 b 组件内，c 组件在 a 组件内，如何让他渲染出来，a 组件和 c 组件同级

阿里面试的时候问到的问题，想了一会，说了不会。后来查了下，大概可以通过 react16 中返回不带包裹元素的组件来实现。因为和阿里一面面试官后来聊得比较开心，加了微信，还斗胆为了下他，他说还有曲线救国的实现方式

react 组件的优化
从 pureRenderMixin、ShouldComponentUpdate 等方面说了下，以及组件的设计和木偶组建的函数编写方式说了下

react 组件的通信
这个大搞几种方式也都说了下，prop，context（顺道扯了 react-redux 的 context 实现方式）、redux 甚至广播都说了一遍

react 的 virtual dom 和 diff 算法的实现方式
阿里交叉面问的，直接说实现方式源码没有看过，但是大概说了下原理和步骤，具体代码怎么写的不知道。

MVC、MVVM 了解么，数据双向绑定和单向绑定实现方式
滴滴一面问的，实现方式还是说了不知道，然后说了下 MVC 和 MVVM 的设计模式，因为之前用过 angular1，大概就说下脏检查步骤以及 view-model 的作用

react-router 实现方式，单页面应用相关东西
大概说了下 react-router 的一般使用方式，以及没有使用 react-router 的时候如何利用 h5 的 history API 来实现路由跳转等。

http 三次握手后拿到 HTML，浏览器怎么加载

阿里的一面问的问题，这个我之前在环球做过相关技术分享，所以大概都知道，从过程到不同内核差异（差异部分简单提了下）说了下 dom、CSSDom 以及 paint 等过程。然后面试官接着问如何防止 repaint 和 reflow。大概从引起 repaint 和 reflow 等操作上说了下避免。网易的一面也问到了 repaint 和 reflow。

http2.0 相关

网易一面问题，说了下 2.0 的采用二进制格式、多路复用、报文头压缩、服务器主动推送还扯了 websocket 的相关内容 WebSocket：5 分钟从入门到精通。然后网易接着问，报文头怎么压缩的？我。。。？？不知道。。。然后大概也问了下 https 的 TLS/SSL,之前看过漫画的 https 的相关东西，大概说了下漫画里面的故事~

post、get 区别

https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd

编写过 webpack 的扩展嘛，Plugin 或者 loader

这个我看过一本书《深入浅出 webpack》，所以基本都能回答上来。包括原理和编写 loader、Plugin 注意事项。当然，我自己没有写过。。。《深入浅出 webpack》

babel 问的不多，但是我也准备了，包括每一个包的作用和内部转换过程，不记得哪家公司问了，大概我也就说了下 babel 转换的过程。

二叉树，网易问了链表方面

https://github.com/jawil/blog/issues/22

首先说说为什么要使用 Virturl DOM，因为操作真实 DOM 的耗费的性能代价太高，所以 react 内部使用 js 实现了一套 dom 结构。Virtual DOM 最主要的还是保留了 Element 之间的层次关系和一些基本属性
在每次操作在和真实 dom 之前，使用实现好的 diff 算法，对虚拟 dom 进行比较，递归找出有变化的 dom 节点，然后对其进行更新操作。为了实现虚拟 DOM，我们需要把每一种节点类型抽象成对象，每一种节点类型有自己的属性，也就是 prop，每次进行 diff 的时候，react 会先比较该节点类型：假如节点类型不一样，那么 react 会直接删除该节点，然后直接创建新的节点插入到其中；假如节点类型一样，那么会比较 prop 是否有更新，假如有 prop 不一样，那么 react 会判定该节点有更新，那么重渲染该节点，然后在对其子节点进行比较，一层一层往下，直到没有子节点。在 Web 开发中,需要将数据的变化实时反映到 UI 上,这时就需要对 DOM 进行操作,也就是既状态改变了就要操作相应的 DOM 元素。
解决这个问题有一个非常直观的方法,可以大大降低视图更新的操作,那就是:
一旦状态发生了变化,就用模版引擎重新渲染整个视图,然后用新的视图更换掉旧的视图。
我们一定会想到:这样的做法会导致很多的问题。最大的问题就是这样做效率太低。
因为即使一个小小的状态变更都要重新构造整棵 DOM,性价比太低;而且这样做的话,input 和 textarea 的会失去原有的焦点。
最后的结论会是:对于局部的小视图的更新,没有问题;但是对于大型视图,如全局应用状态变更的时候,需要更新页面较多局部视图的时候,这样的做法不可取。
但是我们会发现,其实 React 就是这么做的,只是增加了 Virtual DOM(虚拟 DOM)来避免了整棵 DOM 树变更。
_
操作 dom 很容易引起页面重排，杀死性能。
相对于 DOM 对象,原生的 JavaScript 对象处理起来更快,而且更简单。并且我们可以很容易地用 JavaScript 来构造 DOM。
既然这样,是不是可以将上面的“状态变更->重新渲染整个视图”的方式稍微修改一下:
用 JavaScript 对象表示 DOM 信息和结构,当状态变更的时候,重新渲染这个 JavaScript 的对象结构。
当然这样做其实没什么用,因为真正的页面其实没有改变。
但是可以用新渲染的对象树去和旧的树进行对比,记录这两棵树差异。记录下来的不同就是我们需要对页面真正的 DOM 操作,
然后把它们应用在真正的 DOM 树上,页面就变更了。
这样就可以做到:视图的结构确实是整个全新渲染了,但是最后操作 DOM 的时候确实只变更有不同的地方。这就是所谓的 Diff 算法。
为什么这样做就快了呢?因为:javaScript 很快,DOM 很慢。所以要尽量使用快的,减少使用慢的。
_
Diff 算法包括以下三个步骤:
1、用 JavaScript 对象结构表示 DOM 树的结构;然后用这个树构建一个真正的 DOM 树,插到文档当中。
2、当状态变更的时候,重新构造一棵新的对象树。然后用新的树和旧的树进行比较,记录两棵树差异。
3、把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上,视图就更新了。
这种做法在 React 中叫做 Virtual DOM(虚拟 DOM)。由虚拟 DOM 来确保只对界面上真正变化的部分进行实际的 DOM 操作。
_
虚拟 DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘,既然硬盘这么慢,我们就在它们之间加个缓存:既然 DOM 这么慢,我们就在它们 JS 和 DOM 之间加个缓存。CPU(JS)只操作内存(Virtual DOM),最后的时候再把变更写入硬盘(DOM)。
_

### 函数柯里化

```js
// add 函数柯里化
function add() {
  //建立args,利用闭包特性，不断保存arguments
  var args = [].slice.call(arguments)
  //方法一，新建_add函数实现柯里化;
  console.log(arguments)
  console.log(args)
  var _add = function() {
    if (arguments.length === 0) {
      //参数为空，对args执行加法
      return args.reduce((a, b) => {
        return a + b
      })
    } else {
      console.log([].push.apply(args, arguments))

      //否则，保存参数到args，返回一个函数
      ;[].push.apply(args, arguments)
      return _add
    }
  }
  //返回_add函数
  return _add

  // //方法二，使用arguments.callee实现柯里化
  // return function () {
  //       if (arguments.length === 0) {
  //           return args.reduce(function(a,b){return a+b});
  //       }
  //       Array.prototype.push.apply(args, arguments);
  //       return arguments.callee;
  //   }
}
console.log(add(1, 2, 3)(1)(2)(3)(4, 5, 6)(7, 8)()) //42
```
