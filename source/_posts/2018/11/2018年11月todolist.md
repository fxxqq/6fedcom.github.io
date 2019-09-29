---
title: 2018年11月todolist
categories: todolist
password: ms
abbrlink: b66af66b
date: 2018-11-03 20:38:59
tags: [todo, hide]
---

博客加谷歌广告：https://www.google.com/adsense/signup/new/lead?subid=ww-ww-et-HC-acqpage&referer=https://support.google.com/adsense/troubleshooter/1631343?url%3Dhttps://alili.tech/archive/9d64fe09/%26gl%3DCN%26hl%3Dzh-Hans%26client%3Dca-pub-1769617155450062%26ai0%3DCeH7Chq3iW7DaLYndrQSvxrXAA_2-u7YFnbqB9NMBACDi1LZtYJ0ByAEBqAMByAMCqgSpAU_QSc7k8r3BriICKin68qdBijZ2SvkreI1koA6qHAhyKAQS6Vq0RIoWFraEDLju3KfB8nKyJSCjN7G1OCngG0myI6qrtDHofJ0P6Rqj5etujv7AsfprcLibhqLctGps-V3vfziqbHGHte1AOoF7LrZwqrU1Duw3DxkUmx9DsLCLR84wcfSB9X06Y8wIri6fStl6NGcKvaTIPEvI0UJiXRKlnTktueQFOqiQBgGgBkvABguIBwGQBwKoB47OG6gH1ckbqAeoBqgH2csbqAfPzBuoB6a-G9gHAdIIBggAEAIYAoAKAQ%26visit_id%3D636771790511970373-3385297102%26rd%3D1&gsessionid=VV8FusznMGAeRmt157LTKHL0mb-AMI8m

如何提高自己

看书

HTTP/HTTPS
10 分钟理解 JS 引擎的执行机制
https://segmentfault.com/a/1190000012806637?utm_source=tag-newest

巩固一下携程前端面试题

css3 transition 哪些属性 flex 布局问题，js 原型链作用域链 es6 了解多少最好多了解一些，
箭头函数和匿名函数区别，如果会 redux 会问 redux，react 高阶组件，react 同级组件传值除 redux，promise 了解多少 主要问题

阿里

React 生命周期及自己的理解

如何配置 React-Router
路由的动态加载模块
服务端渲染 SSR
介绍路由的 history
介绍 Redux 数据流的流程
Redux 如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理
多个组件之间如何拆分各自的 state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
使用过的 Redux 中间件
如何解决跨域的问题
常见 Http 请求头

### 移动端适配 1px 的问题

### 介绍 flex 布局

display:flex; flexbox 模型只适用于直系子代
flex-direction: row | row-reverse | column | column-reverse;子元素是如何排列
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;子元素水平排列方式
align-items: flex-start | flex-end | center | baseline | stretch;子元素垂直排列方式
flex-wrap: nowrap | wrap | wrap-reverse;
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
其他 css 方式设置垂直居中
居中为什么要使用 transform（为什么不使用 marginLeft/Top）
使用过 webpack 里面哪些 plugin 和 loader
webpack 里面的插件是怎么实现的
dev-server 是怎么跑起来
项目优化

#### 抽取公共文件是怎么配置的

CommonsChunkPlugin
将 webpack 入口的 chunk 文件中所有公共的代码提取出来，减少代码体积；同时提升 webpack 打包速度。
利用缓存机制：依赖的公共模块文件一般很少更改或者不会更改，这样独立模块文件提取出可以长期缓存。

项目中如何处理安全问题

怎么实现 this 对象的深拷贝

网易

介绍 redux，主要解决什么问题
文件上传如何做断点续传
表单可以跨域吗
promise、async 有什么区别
搜索请求如何处理（防抖）
搜索请求中文如何请求
介绍观察者模式
介绍中介者模式
观察者和订阅-发布的区别，各自用在哪里
介绍 react 优化
介绍 http2.0
通过什么做到并发请求
http1.1 时如何复用 tcp 连接
介绍 service worker
介绍 css3 中 position:sticky
redux 请求中间件如何处理并发
介绍 Promise，异常捕获
介绍 position 属性包括 CSS3 新增
浏览器事件流向
介绍事件代理以及优缺点
React 组件中怎么做事件代理
React 组件事件代理的原理
介绍 this 各种情况
前端怎么控制管理路由
使用路由时出现问题如何解决
React 怎么做数据的检查和变化

滴滴

react-router 怎么实现路由切换
react-router 里的<Link>标签和<a>标签有什么区别
<a>标签默认事件禁掉之后做了什么才实现了跳转
React 层面的性能优化
整个前端性能提升大致分几类
import { Button } from 'antd'，打包的时候只打包 button，分模块加载，是怎么做到的
使用 import 时，webpack 对 node_modules 里的依赖会做什么
JS 异步解决方案的发展历程以及优缺点
Http 报文的请求会有几个部分
cookie 放哪里，cookie 能做的事情和存在的价值
cookie 和 token 都存放在 header 里面，为什么只劫持前者
cookie 和 session 有哪些方面的区别
React 中 Dom 结构发生变化后内部经历了哪些变化
React 挂载的时候有 3 个组件，textComponent、composeComponent、domComponent，区别和关系，Dom 结构发生变化时怎么区分 data 的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
key 主要是解决哪一类的问题，为什么不建议用索引 index（重绘）
Redux 中异步的请求怎么处理
Redux 中间件是什么东西，接受几个参数（两端的柯里化函数）
柯里化函数两端的参数具体是什么东西
中间件是怎么拿到 store 和 action，然后怎么处理
state 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程
koa 中 response.send、response.rounded、response.json 发生了什么事，浏览器为什么能识别到它是一个 json 结构或是 html
koa-bodyparser 怎么来解析 request
webpack 整个生命周期，loader 和 plugin 有什么区别

跨域怎么解决，有没有使用过 Apache 等方案

今日头条

对 async、await 的理解，内部原理
介绍下 Promise，内部实现
清除浮动  
定位问题（绝对定位、相对定位等）
从输入 URL 到页面加载全过程
tcp3 次握手
tcp 属于哪一层（1 物理层 -> 2 数据链路层 -> 3 网络层(ip)-> 4 传输层(tcp) -> 5 应用层(http)）
redux 的设计思想
接入 redux 的过程
绑定 connect 的过程
connect 原理
webpack 介绍
== 和 ===的区别，什么情况下用相等==
bind、call、apply 的区别
动画的了解
介绍下原型链（解决的是继承问题吗）
对跨域的了解

有赞

介绍冒泡排序，选择排序，冒泡排序如何优化
transform 动画和直接使用 left、top 改变位置有什么优缺点
如何判断链表是否有环
介绍二叉搜索树的特点
介绍暂时性死区
ES6 中的 map 和原生的对象有什么区别
观察者和发布-订阅的区别
react 异步渲染的概念,介绍 Time Slicing 和 Suspense
16.X 声明周期的改变
16.X 中 props 改变后在哪个生命周期中处理
介绍纯函数
前端性能优化
pureComponent 和 FunctionComponent 区别
介绍 JSX
如何做 RN 在安卓和 IOS 端的适配
RN 为什么能在原生中绘制成原生组件（bundle.js）
介绍虚拟 DOM
如何设计一个 localStorage，保证数据的实效性
如何设计 Promise.all()
介绍高阶组件
sum(2, 3)实现 sum(2)(3)的效果
react 性能优化
两个对象如何比较

挖财

JS 的原型
变量作用域链
call、apply、bind 的区别
防抖和节流的区别
介绍各种异步方案
react 生命周期
介绍 Fiber
前端性能优化
介绍 DOM 树对比
react 中的 key 的作用
如何设计状态树
介绍 css，xsrf
http 缓存控制
项目中如何应用数据结构
native 提供了什么能力给 RN
如何做工程上的优化
shouldComponentUpdate 是为了解决什么问题
如何解决 props 层级过深的问题
前端怎么做单元测试
webpack 生命周期
webpack 打包的整个过程
常用的 plugins

沪江

介绍下浏览器跨域
怎么去解决跨域问题
jsonp 方案需要服务端怎么配合
Ajax 发生跨域要设置什么（前端）
加上 CORS 之后从发起到请求正式成功的过程
xsrf 跨域攻击的安全性问题怎么防范
使用 Async 会注意哪些东西
Async 里面有多个 await 请求，可以怎么优化（请求是否有依赖）
Promise 和 Async 处理失败的时候有什么区别
Redux 在状态管理方面解决了 React 本身不能解决的问题
Redux 有没有做过封装
react 生命周期，常用的生命周期
对应的生命周期做什么事
遇到性能问题一般在哪个生命周期里解决
怎么做性能优化（异步加载组件...）
写 react 有哪些细节可以优化
React 的事件机制（绑定一个事件到一个组件上）
介绍下事件代理，主要解决什么问题
前端开发中用到哪些设计模式
React/Redux 中哪些功能用到了哪些设计模式
JS 变量类型分为几种，区别是什么
JS 里垃圾回收机制是什么，常用的是哪种，怎么处理的
一般怎么组织 CSS（Webpack）

饿了么

React 子父组件之间如何传值
Emit 事件怎么发，需要引入什么
介绍下 React 高阶组件，和普通组件有什么区别
一个对象数组，每个子对象包含一个 id 和 name，React 如何渲染出全部的 name
在哪个生命周期里写
其中有几个 name 不存在，通过异步接口获取，如何做
渲染的时候 key 给什么值，可以使用 index 吗，用 id 好还是 index 好
webpack 如何配 sass，需要配哪些 loader
配 css 需要哪些 loader
如何配置把 js、css、html 单独打包成一个文件
div 垂直水平居中（flex、绝对定位）
两个元素块，一左一右，中间相距 10 像素
上下固定，中间滚动布局如何实现
[1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]
取数组的最大值（ES5、ES6）
apply 和 call 的区别
ES5 和 ES6 有什么区别
some、every、find、filter、map、forEach 有什么区别
上述数组随机取数，每次返回的值都不一样
如何找 0-5 的随机数，95-99 呢
页面上有 1 万个 button 如何绑定事件
如何判断是 button
页面上生成一万个 button，并且绑定事件，如何做（JS 原生操作 DOM）
循环绑定时的 index 是多少，为什么，怎么解决
页面上有一个 input，还有一个 p 标签，改变 input 后 p 标签就跟着变化，如何处理
监听 input 的哪个事件，在什么时候触发

携程

### 对 React 看法，有没有遇到一些坑

React 快速的原因之一就是 React 很少直接操作 DOM,浏览器事件也是一样。原因是太多的浏览器事件会占用很大内存。
组件化很强大

1. react 项目的部署问题，nginx 部署成功后刷新下会 404
   解决方案：nginx 根目录指向 index.html

```
location / {
        try_files $uri $uri/ /index.html;
}
```

2. this.setState 方法是异步的
   this.setState()会调用 render 方法，但并不会立即改变 state 的值，state 是在 render 方法中赋值的。所以执行 this.setState()后立即获取 state 的值是不变的。同样的直接赋值 state 并不会出发更新，因为没有调用 render 函数。
   调用 setState 函数后，react 将传入参数对象和组件当前的状态合并，然后触发调和过程，经过调和过程，react 以高效的方式根据新的状态构建 react 元素树并且重新渲染整个 UI 界面。react 得到元素树后，会自动计算出新老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异算法中，react 知道精准的知道哪些位置发生了改变，以及应该如何改变，这就保证了按需更新，而不是全部更新渲染
   setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
3. 路由跳转的时候必须在组件卸载周期清除定时器和监听事件（`removeEventListener`），react 不会自动清除
4. `componentWillUpdate`中可以直接改变`state`的值，而不能用`setState`

### 对闭包的看法，为什么要用闭包

### 手写数组去重函数

```js
function unique(arr){
	reutrn Array.from(new Set(arr))
}
```

### 手写数组扁平化函数

数组扁平化是指将一个多维数组变为一维数组
[1, [2, 3, [4, 5]]] ------> [1, 2, 3, 4, 5]

1. reduce
   遍历数组每一项，若值为数组则递归遍历，否则 concat。

```js
function flatten(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}
reduce是数组的一种方法，它接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

reduce包含两个参数：回调函数，传给total的初始值


// 求数组的各项值相加的和：
arr.reduce((total, item)=> {  // total为之前的计算结果，item为数组的各项值
    return total + item;
}, 0);
```

2. toString & split
   调用数组的 toString 方法，将数组变为字符串然后再用 split 分割还原为数组

```js
function flatten(arr) {
  return arr
    .toString()
    .split(',')
    .map(function(item) {
      return Number(item)
    })
}
```

因为 split 分割后形成的数组的每一项值为字符串，所以需要用一个 map 方法遍历数组将其每一项转换为数值型

3. join & split
   和上面的 toString 一样，join 也可以将数组转换为字符串

```js
function flatten(arr) {
  return arr
    .join(',')
    .split(',')
    .map(function(item) {
      return parseInt(item)
    })
}
```

4. 递归
   递归的遍历每一项，若为数组则继续遍历，否则 concat

```js
function flatten(arr) {
  var res = []
  arr.map(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res.push(item)
    }
  })
  return res
}
```

5. 扩展运算符
   es6 的扩展运算符能将二维数组变为一维

```js
;[].concat(...[1, 2, 3, [4, 5]]) // [1, 2, 3, 4, 5]
//根据这个结果我们可以做一个遍历，若arr中含有数组则使用一次扩展运算符，直至没有为止。

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
```

总结
虽然说写了 5 种方法，但是核心也只有一个：

遍历数组 arr，若 arr[i]为数组则递归遍历，直至 arr[i]不为数组然后与之前的结果 concat。

### 介绍下 Promise 的用途和性质

**性质**
（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
**用途**
有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。
Promise 的出现主要是解决地狱回调的问题，比如你需要结果需要请求很多个接口，这些接口的参数需要另外那个的接口返回的数据作为依赖，这样就需要我们一层嵌套一层，但是有了 Promise 我们就无需嵌套
**缺点**
Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```js
function promise () {
    return new Promise ( function (resolve, reject) {
        if ( success ) {
            resolve(a)
        } else {
            reject(err)
        }
})
```

### Promise 和 Callback 有什么区别

### React 生命周期

React 生命周期分为三种状态 1. 初始化 2.更新 3.销毁
1、getDefaultProps()

设置默认的 props，也可以用 dufaultProps 设置组件的默认属性.

2、getInitialState()

在使用 es6 的 class 语法时是没有这个钩子函数的，可以直接在 constructor 中定义 this.state。此时可以访问 this.props

3、componentWillMount()

组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改 state。

4、 render()

react 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了。

5、componentDidMount()

组件渲染之后调用，只调用一次。

更新
6、componentWillReceiveProps(nextProps)

组件初始化时不调用，组件接受新的 props 时调用。

7、shouldComponentUpdate(nextProps, nextState)

react 性能优化非常重要的一环。组件接受新的 state 或者 props 时调用，我们可以设置在此对比前后两个 props 和 state 是否相同，如果相同则返回 false 阻止更新，因为相同的属性状态一定会生成相同的 dom 树，这样就不需要创造新的 dom 树和旧的 dom 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候

8、componentWillUpdata(nextProps, nextState)

组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改 state

9、render()

组件渲染

10、componentDidUpdate()

组件初始化时不调用，组件更新完成后调用，此时可以获取 dom 节点。

卸载
11、componentWillUnmount()

组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

两道手写算法题
编程第一题：

```js
function test(str) {
  var arr = str.split('')
  var numArr = [],
    alpArr = []
  arr.forEach(function(item) {
    if (/[0-9]/.test(item) && numArr.indexOf(item) === -1) {
      numArr.push(item)
    } else if (/[a-zA-Z]/.test(item)) {
      alpArr.push(item)
    }
  })
  return numArr.concat(alpArr).join('')
}

var result = test('携程C2t0r1i8p2020校招')
console.log(result) // 2018Ctrip
```

```js
function groupList(list) {
  /* 对 list 参数做类型判断 */
  if (!(list instanceof Array) || list.length === 0) {
    return []
  }
  var map = {},
    res = []
  /* 遍历 list 数组的每一项，过滤掉不符合规范的数据项，同时将有效数据存入 map 对象 */
  list.forEach(function(item) {
    if (typeof item === 'object' && item !== null) {
      var type = item.type
      if (type && type in map) {
        map[type].content.push(item.content)
      } else {
        map[type] = {
          type: type,
          content: [item.content]
        }
      }
    }
  })
  /* 将 map 对象的数据 push 到结果数组中 */
  for (let key of Object.keys(map)) {
    res.push(map[key])
  }
  return res
}

var list = [
  null,
  2,
  'test',
  undefined,
  {
    type: 'product',
    content: 'product1'
  },
  {
    type: 'product',
    content: 'product2'
  },
  {
    type: 'tag',
    content: 'tag1'
  },
  {
    type: 'product',
    content: 'product3'
  },
  {
    type: 'tag',
    content: 'tag2'
  }
]

var result = groupList(list)
console.log(JSON.stringify(result))
/*
 
[{
  "type": "product",
  "content": ["product1", "product2", "product3"]
}, {
  "type": "tag",
  "content": ["tag1", "tag1"]
}]
 
 */
```

喜马拉雅

ES6 新的特性

说一下闭包
React 的生命周期
componentWillReceiveProps 的触发条件是什么
React16.3 对生命周期的改变
介绍下 React 的 Filber 架构
画 Filber 渲染树
介绍 React 高阶组件
父子组件之间如何通信
Redux 怎么实现属性传递，介绍下原理
React-Router 版本号

介绍下 HTTP 状态码
403、301、302 是什么
缓存相关的 HTTP 请求头
介绍 HTTPS
HTTPS 怎么建立安全通道
前端性能优化（JS 原生和 React）
用户体验做过什么优化
对 PWA 有什么了解
对安全有什么了解
介绍下数字签名的原理
前后端通信使用什么方案
RESTful 常用的 Method
介绍下跨域
Access-Control-Allow-Origin 在服务端哪里配置
csrf 跨站攻击怎么解决
前端和后端怎么联调

兑吧

localStorage 和 cookie 有什么区别
CSS 选择器有哪些
盒子模型，以及标准情况和 IE 下的区别
如何实现高度自适应

### prototype 和——proto——区别

——proto——是每个对象都有的一个属性，而 prototype 是函数才会有的属性
几乎所有的函数（除了一些内建函数）都有一个名为 prototype（原型）的属性，这个属性是一个指针，而这个对象的用途是包含可以有特定类型的所有实例共享的属性和方法。
prototype 是通过调用构造函数而创建的那个对象实例的原型对象。
示例：自有属性&原型属性

```js
var obj = { a: 1 }
obj.hasOwnProperty('a') // true
obj.hasOwnProperty('toString') // false
'a' in obj // true
'toString' in obj // true
```

示例：鉴别原型属性

```js
function hasPrototypeProperty(obj, name) {
  return name in obj && !obj.hasOwnProperty(name)
}
```

\_construct 是什么
new 是怎么实现的
promise 的精髓，以及优缺点
如何实现 H5 手机端的适配
rem、flex 的区别（root em）
em 和 px 的区别
React 声明周期
如何去除 url 中的#号
Redux 状态管理器和变量挂载到 window 中有什么区别
webpack 和 gulp 的优缺点
如何实现异步加载
如何实现分模块打包（多入口）
前端性能优化（1js css；2 图片；3 缓存预加载； 4 SSR； 5 多域名加载；6 负载均衡）
并发请求资源数上限（6 个）
base64 为什么能提升性能，缺点
介绍 webp 这个图片文件格式
介绍 koa2
Promise 如何实现的
异步请求，低版本 fetch 如何低版本适配
ajax 如何处理跨域
CORS 如何设置
jsonp 为什么不支持 post 方法
介绍同源策略
React 使用过的一些组件
介绍 Immuable
介绍下 redux 整个流程原理
介绍原型链
如何继承

微医

介绍 JS 数据类型，基本数据类型和引用数据类型的区别
Array 是 Object 类型吗
数据类型分别存在哪里
`var a = {name: "前端开发"}`; `var b = a; a = null`那么 b 输出什么
`var a = {b: 1}`存放在哪里
`var a = {b: {c: 1}}`存放在哪里
栈和堆的区别
垃圾回收时栈和堆的区别
数组里面有 10 万个数据，取第一个元素和第 10 万个元素的时间相差多少
栈和堆具体怎么存储
介绍闭包以及闭包为什么没清除
闭包的使用场景
JS 怎么实现异步
异步整个执行周期
Promise 的三种状态
Async/Await 怎么实现
Promise 和 setTimeout 执行先后的区别
JS 为什么要区分微任务和宏任务
Promise 构造函数是同步还是异步执行，then 呢
发布-订阅和观察者模式的区别
JS 执行过程中分为哪些阶段
词法作用域和 this 的区别
平常是怎么做继承
深拷贝和浅拷贝
loadsh 深拷贝实现原理
ES6 中 let 块作用域是怎么实现的
React 中 setState 后发生了什么
setState 为什么默认是异步
setState 什么时候是同步的
为什么 3 大框架出现以后就出现很多 native（RN）框架（虚拟 DOM）
虚拟 DOM 主要做了什么
虚拟 DOM 本身是什么（JS 对象）
304 是什么
打包时 Hash 码是怎么生成的
随机值存在一样的情况，如何避免
使用 webpack 构建时有无做一些自定义操作
webpack 做了什么
a，b 两个按钮，点击 aba，返回顺序可能是 baa，如何保证是 aba（Promise.then）
node 接口转发有无做什么优化
node 起服务如何保证稳定性，平缓降级，重启等
RN 有没有做热加载
RN 遇到的兼容性问题
RN 如何实现一个原生的组件
RN 混原生和原生混 RN 有什么不同
什么是单页项目
遇到的复杂业务场景
Promise.all 实现原理

寺库

介绍 Promise 的特性，优缺点
介绍 Redux
RN 的原理，为什么可以同时在安卓和 IOS 端运行
RN 如何调用原生的一些功能
介绍 RN 的缺点
介绍排序算法和快排原理
堆和栈的区别
介绍闭包
闭包的核心是什么
网络的五层模型
HTTP 和 HTTPS 的区别
HTTPS 的加密过程
介绍 SSL 和 TLS
介绍 DNS 解析
JS 的继承方法
介绍垃圾回收
cookie 的引用为了解决什么问题
cookie 和 localStorage 的区别
如何解决跨域问题
前端性能优化

宝宝树

使用 canvas 绘图时如何组织成通用组件
formData 和原生的 ajax 有什么区别
介绍下表单提交，和 formData 有什么关系
介绍 redux 接入流程
rudux 和全局管理有什么区别（数据可控、数据响应）
RN 和原生通信
介绍 MVP 怎么组织
介绍异步方案
promise 如何实现 then 处理
koa2 中间件原理
常用的中间件
服务端怎么做统一的状态处理
如何对相对路径引用进行优化
node 文件查找优先级
npm2 和 npm3+有什么区别

海康威视

knex 连接数据库响应回调
介绍异步方案
如何处理异常捕获
项目如何管理模块
前端性能优化
JS 继承方案
如何判断一个变量是不是数组
变量 a 和 b，如何交换
事件委托
多个<li>标签生成的 Dom 结构是一个类数组
类数组和数组的区别
dom 的类数组如何转成数组
介绍单页面应用和多页面应用
redux 状态树的管理
介绍 localstorage 的 API

蘑菇街

html 语义化的理解
<b>和<strong>的区别
对闭包的理解
工程中闭包使用场景
介绍 this 和原型
使用原型最大的好处
react 设计思路
为什么虚拟 DOM 比真实 DOM 性能好
react 常见的通信方式
redux 整体的工作流程
redux 和全局对象之间的区别
Redux 数据回溯设计思路
单例、工厂、观察者项目中实际场景
项目中树的使用场景以及了解
工作收获

酷家乐

react 生命周期
react 性能优化
添加原生事件不移除为什么会内存泄露
还有哪些地方会内存泄露
setInterval 需要注意的点
定时器为什么是不精确的
setTimeout(1)和 setTimeout(2)之间的区别
介绍宏任务和微任务
promise 里面和 then 里面执行有什么区别
介绍 pureComponet
介绍 Function Component
React 数据流
props 和 state 的区别
介绍 react context
介绍 class 和 ES5 的类以及区别
介绍箭头函数和普通函数的区别
介绍 defineProperty 方法，什么时候需要用到
for..in 和 object.keys 的区别
介绍闭包，使用场景
使用闭包特权函数的使用场景
get 和 post 有什么区别

百分点

重新渲染 render 会做些什么
哪些方法会触发 react 重新渲染
state 和 props 触发更新的生命周期分别有什么区别
setState 是同步还是异步
对无状态组件的理解
介绍 Redux 工作流程
介绍 ES6 的功能
介绍 Promise 和 then
算法：前 K 个最大的元素

海风教育

对 react 看法，它的优缺点
使用过程中遇到的问题，如何解决的
react 的理念是什么（拿函数式编程来做页面渲染）
JS 是什么范式语言(面向对象还是函数式编程)
koa 原理，为什么要用 koa(express 和 koa 对比)
使用的 koa 中间件
ES6 使用的语法
Promise 和 async/await 和 callback 的区别
Promise 有没有解决异步的问题（promise 链是真正强大的地方）
Promise 和 setTimeout 的区别（Event Loop）
进程和线程的区别（一个 node 实例就是一个进程，node 是单线程，通过事件循环来实现异步
）
介绍下 DFS 深度优先
介绍下观察者模式
观察者模式里面使用的数据结构(不具备顺序 ，是一个 list)
