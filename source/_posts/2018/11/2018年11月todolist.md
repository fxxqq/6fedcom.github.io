---
title: 2018年11月todolist
categories: todolist
password: ms
abbrlink: b66af66b
date: 2018-11-03 20:38:59
tags:
---

博客加谷歌广告：https://www.google.com/adsense/signup/new/lead?subid=ww-ww-et-HC-acqpage&referer=https://support.google.com/adsense/troubleshooter/1631343?url%3Dhttps://alili.tech/archive/9d64fe09/%26gl%3DCN%26hl%3Dzh-Hans%26client%3Dca-pub-1769617155450062%26ai0%3DCeH7Chq3iW7DaLYndrQSvxrXAA_2-u7YFnbqB9NMBACDi1LZtYJ0ByAEBqAMByAMCqgSpAU_QSc7k8r3BriICKin68qdBijZ2SvkreI1koA6qHAhyKAQS6Vq0RIoWFraEDLju3KfB8nKyJSCjN7G1OCngG0myI6qrtDHofJ0P6Rqj5etujv7AsfprcLibhqLctGps-V3vfziqbHGHte1AOoF7LrZwqrU1Duw3DxkUmx9DsLCLR84wcfSB9X06Y8wIri6fStl6NGcKvaTIPEvI0UJiXRKlnTktueQFOqiQBgGgBkvABguIBwGQBwKoB47OG6gH1ckbqAeoBqgH2csbqAfPzBuoB6a-G9gHAdIIBggAEAIYAoAKAQ%26visit_id%3D636771790511970373-3385297102%26rd%3D1&gsessionid=VV8FusznMGAeRmt157LTKHL0mb-AMI8m

1,时区是一个基本的技术领域，叫做Globalizaton，是有一些实践技巧的，时区，币种，语言，都是这个范畴，通常在UI层面会有所体现，比如同一个系统，不同国家的人进入看到的都是一个换算过的本地时间，例如某些国际性网站比如facebook，gmail, hotmail，都有让用户选择自己的区域。
2,如果两块业务线有相同的业务逻辑，那么应该考虑如何复用。一块同样的代码写了两次以上，那么肯定要考虑重构了。

如何提高自己

看书

HTTP/HTTPS
10分钟理解JS引擎的执行机制
https://segmentfault.com/a/1190000012806637?utm_source=tag-newest

巩固一下携程前端面试题

css3 transition哪些属性 flex布局问题，js原型链作用域链 es6了解多少最好多了解一些，
箭头函数和匿名函数区别，如果会redux会问redux，react高阶组件，react同级组件传值除redux，promise了解多少 主要问题

阿里

React生命周期及自己的理解

 
如何配置React-Router
路由的动态加载模块
服务端渲染SSR
介绍路由的history
介绍Redux数据流的流程
Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理
多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
使用过的Redux中间件
如何解决跨域的问题
常见Http请求头
### 移动端适配1px的问题

### 介绍flex布局
display:flex; flexbox模型只适用于直系子代
flex-direction: row | row-reverse | column | column-reverse;子元素是如何排列
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;子元素水平排列方式
align-items: flex-start | flex-end | center | baseline | stretch;子元素垂直排列方式
flex-wrap: nowrap | wrap | wrap-reverse; 
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
其他css方式设置垂直居中
居中为什么要使用transform（为什么不使用marginLeft/Top）
使用过webpack里面哪些plugin和loader
webpack里面的插件是怎么实现的
dev-server是怎么跑起来
项目优化
#### 抽取公共文件是怎么配置的
CommonsChunkPlugin
将webpack入口的chunk文件中所有公共的代码提取出来，减少代码体积；同时提升webpack打包速度。
利用缓存机制：依赖的公共模块文件一般很少更改或者不会更改，这样独立模块文件提取出可以长期缓存。

项目中如何处理安全问题

怎么实现this对象的深拷贝


网易

介绍redux，主要解决什么问题
文件上传如何做断点续传
表单可以跨域吗
promise、async有什么区别
搜索请求如何处理（防抖）
搜索请求中文如何请求
介绍观察者模式
介绍中介者模式
观察者和订阅-发布的区别，各自用在哪里
介绍react优化
介绍http2.0
通过什么做到并发请求
http1.1时如何复用tcp连接
介绍service worker
介绍css3中position:sticky
redux请求中间件如何处理并发
介绍Promise，异常捕获
介绍position属性包括CSS3新增
浏览器事件流向
介绍事件代理以及优缺点
React组件中怎么做事件代理
React组件事件代理的原理
介绍this各种情况
前端怎么控制管理路由
使用路由时出现问题如何解决
React怎么做数据的检查和变化


滴滴

react-router怎么实现路由切换
react-router里的<Link>标签和<a>标签有什么区别
<a>标签默认事件禁掉之后做了什么才实现了跳转
React层面的性能优化
整个前端性能提升大致分几类
import { Button } from 'antd'，打包的时候只打包button，分模块加载，是怎么做到的
使用import时，webpack对node_modules里的依赖会做什么
JS异步解决方案的发展历程以及优缺点
Http报文的请求会有几个部分
cookie放哪里，cookie能做的事情和存在的价值
cookie和token都存放在header里面，为什么只劫持前者
cookie和session有哪些方面的区别
React中Dom结构发生变化后内部经历了哪些变化
React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
key主要是解决哪一类的问题，为什么不建议用索引index（重绘）
Redux中异步的请求怎么处理
Redux中间件是什么东西，接受几个参数（两端的柯里化函数）
柯里化函数两端的参数具体是什么东西
中间件是怎么拿到store和action，然后怎么处理
state是怎么注入到组件的，从reducer到组件经历了什么样的过程
koa中response.send、response.rounded、response.json发生了什么事，浏览器为什么能识别到它是一个json结构或是html
koa-bodyparser怎么来解析request
webpack整个生命周期，loader和plugin有什么区别
 
跨域怎么解决，有没有使用过Apache等方案


今日头条

对async、await的理解，内部原理 
介绍下Promise，内部实现 
清除浮动  
定位问题（绝对定位、相对定位等） 
从输入URL到页面加载全过程 
tcp3次握手 
tcp属于哪一层（1 物理层 -> 2 数据链路层 -> 3 网络层(ip)-> 4 传输层(tcp) -> 5 应用层(http)） 
redux的设计思想 
接入redux的过程 
绑定connect的过程 
connect原理 
webpack介绍 
== 和 ===的区别，什么情况下用相等== 
bind、call、apply的区别 
动画的了解 
介绍下原型链（解决的是继承问题吗） 
对跨域的了解 


有赞

介绍冒泡排序，选择排序，冒泡排序如何优化
transform动画和直接使用left、top改变位置有什么优缺点
如何判断链表是否有环
介绍二叉搜索树的特点
介绍暂时性死区
ES6中的map和原生的对象有什么区别
观察者和发布-订阅的区别
react异步渲染的概念,介绍Time Slicing 和 Suspense
16.X声明周期的改变
16.X中props改变后在哪个生命周期中处理
介绍纯函数
前端性能优化
pureComponent和FunctionComponent区别
介绍JSX
如何做RN在安卓和IOS端的适配
RN为什么能在原生中绘制成原生组件（bundle.js）
介绍虚拟DOM
如何设计一个localStorage，保证数据的实效性
如何设计Promise.all()
介绍高阶组件
sum(2, 3)实现sum(2)(3)的效果
react性能优化
两个对象如何比较


挖财

JS的原型
变量作用域链
call、apply、bind的区别
防抖和节流的区别
介绍各种异步方案
react生命周期
介绍Fiber
前端性能优化
介绍DOM树对比
react中的key的作用
如何设计状态树
介绍css，xsrf
http缓存控制
项目中如何应用数据结构
native提供了什么能力给RN
如何做工程上的优化
shouldComponentUpdate是为了解决什么问题
如何解决props层级过深的问题
前端怎么做单元测试
webpack生命周期
webpack打包的整个过程
常用的plugins

沪江

介绍下浏览器跨域
怎么去解决跨域问题
jsonp方案需要服务端怎么配合
Ajax发生跨域要设置什么（前端）
加上CORS之后从发起到请求正式成功的过程
xsrf跨域攻击的安全性问题怎么防范
使用Async会注意哪些东西
Async里面有多个await请求，可以怎么优化（请求是否有依赖）
Promise和Async处理失败的时候有什么区别
Redux在状态管理方面解决了React本身不能解决的问题
Redux有没有做过封装
react生命周期，常用的生命周期 
对应的生命周期做什么事 
遇到性能问题一般在哪个生命周期里解决 
怎么做性能优化（异步加载组件...）
写react有哪些细节可以优化 
React的事件机制（绑定一个事件到一个组件上）
介绍下事件代理，主要解决什么问题
前端开发中用到哪些设计模式
React/Redux中哪些功能用到了哪些设计模式
JS变量类型分为几种，区别是什么
JS里垃圾回收机制是什么，常用的是哪种，怎么处理的
一般怎么组织CSS（Webpack）


饿了么

React子父组件之间如何传值
Emit事件怎么发，需要引入什么
介绍下React高阶组件，和普通组件有什么区别
一个对象数组，每个子对象包含一个id和name，React如何渲染出全部的name
在哪个生命周期里写
其中有几个name不存在，通过异步接口获取，如何做
渲染的时候key给什么值，可以使用index吗，用id好还是index好
webpack如何配sass，需要配哪些loader
配css需要哪些loader
如何配置把js、css、html单独打包成一个文件
div垂直水平居中（flex、绝对定位）
两个元素块，一左一右，中间相距10像素
上下固定，中间滚动布局如何实现
[1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]
取数组的最大值（ES5、ES6）
apply和call的区别
ES5和ES6有什么区别
some、every、find、filter、map、forEach有什么区别
上述数组随机取数，每次返回的值都不一样
如何找0-5的随机数，95-99呢
页面上有1万个button如何绑定事件
如何判断是button
页面上生成一万个button，并且绑定事件，如何做（JS原生操作DOM）
循环绑定时的index是多少，为什么，怎么解决
页面上有一个input，还有一个p标签，改变input后p标签就跟着变化，如何处理
监听input的哪个事件，在什么时候触发


携程

### 对React看法，有没有遇到一些坑
React快速的原因之一就是React很少直接操作DOM,浏览器事件也是一样。原因是太多的浏览器事件会占用很大内存。
组件化很强大

1. react项目的部署问题，nginx部署成功后刷新下会404
解决方案：nginx根目录指向index.html
```
location / {
        try_files $uri $uri/ /index.html;
}
```
2. this.setState方法是异步的 
this.setState()会调用render方法，但并不会立即改变state的值，state是在render方法中赋值的。所以执行this.setState()后立即获取state的值是不变的。同样的直接赋值state并不会出发更新，因为没有调用render函数。
调用setState函数后，react将传入参数对象和组件当前的状态合并，然后触发调和过程，经过调和过程，react以高效的方式根据新的状态构建react元素树并且重新渲染整个UI界面。react得到元素树后，会自动计算出新老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异算法中，react知道精准的知道哪些位置发生了改变，以及应该如何改变，这就保证了按需更新，而不是全部更新渲染
setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
3. 路由跳转的时候必须在组件卸载周期清除定时器和监听事件（`removeEventListener`），react不会自动清除
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
[1, [2, 3, [4, 5]]]  ------>    [1, 2, 3, 4, 5]

1. reduce
遍历数组每一项，若值为数组则递归遍历，否则concat。
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
调用数组的toString方法，将数组变为字符串然后再用split分割还原为数组
```js
function flatten(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
} 
```
因为split分割后形成的数组的每一项值为字符串，所以需要用一个map方法遍历数组将其每一项转换为数值型

3. join & split
和上面的toString一样，join也可以将数组转换为字符串
```js
function flatten(arr) {
    return arr.join(',').split(',').map(function(item) {
        return parseInt(item);
    })
}
```
4. 递归
递归的遍历每一项，若为数组则继续遍历，否则concat

```js
function flatten(arr) {
    var res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}
```
5. 扩展运算符
es6的扩展运算符能将二维数组变为一维
```js
[].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]
根据这个结果我们可以做一个遍历，若arr中含有数组则使用一次扩展运算符，直至没有为止。

function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```
总结
虽然说写了5种方法，但是核心也只有一个：

遍历数组arr，若arr[i]为数组则递归遍历，直至arr[i]不为数组然后与之前的结果concat。 

### 介绍下Promise的用途和性质
**性质**
（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
**用途**
有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。
Promise的出现主要是解决地狱回调的问题，比如你需要结果需要请求很多个接口，这些接口的参数需要另外那个的接口返回的数据作为依赖，这样就需要我们一层嵌套一层，但是有了Promise 我们就无需嵌套
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
### Promise和Callback有什么区别

### React生命周期
React 生命周期分为三种状态 1. 初始化 2.更新 3.销毁
1、getDefaultProps()

设置默认的props，也可以用dufaultProps设置组件的默认属性.

2、getInitialState()

在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props

3、componentWillMount()

组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

4、 render()

react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

5、componentDidMount()

组件渲染之后调用，只调用一次。

更新
6、componentWillReceiveProps(nextProps)

组件初始化时不调用，组件接受新的props时调用。

7、shouldComponentUpdate(nextProps, nextState)

react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候

8、componentWillUpdata(nextProps, nextState)

组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

9、render()

组件渲染

10、componentDidUpdate()

组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

卸载
11、componentWillUnmount()

组件将要卸载时调用，一些事件监听和定时器需要在此时清除。


两道手写算法题
编程第一题：
 
```js
function test (str) {
  var arr = str.split('');
  var numArr = [],
     alpArr = [];
  arr.forEach(function (item) {
    if ((/[0-9]/.test(item)) && (numArr.indexOf(item) === -1)) {
      numArr.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      alpArr.push(item);
    }
  });
  return numArr.concat(alpArr).join('');
}
 
var result = test('携程C2t0r1i8p2020校招');
console.log(result);    // 2018Ctrip
```
```js
function groupList (list) {
  /* 对 list 参数做类型判断 */
  if (!(list instanceof Array) || list.length === 0) {
    return [];
  }
  var map = {},
     res = [];
  /* 遍历 list 数组的每一项，过滤掉不符合规范的数据项，同时将有效数据存入 map 对象 */
  list.forEach(function (item) {
    if ((typeof item === 'object') && (item !== null)) {
      var type = item.type;
      if (type && (type in map)) {
        map[type].content.push(item.content);
      } else {
        map[type] = {
          type: type,
          content: [item.content]
        };
      }
    }
  });
  /* 将 map 对象的数据 push 到结果数组中 */
  for (let key of Object.keys(map)) {
    res.push(map[key]);
  }
  return res;
}
 
var list = [null, 2, "test", undefined, {
  "type": "product",
  "content": "product1"
}, {
  "type": "product",
  "content": "product2"
}, {
  "type": "tag",
  "content": "tag1"
}, {
  "type": "product",
  "content": "product3"
}, {
  "type": "tag",
  "content": "tag2"
}];
 
var result = groupList(list);
console.log(JSON.stringify(result));
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

ES6新的特性
介绍Promise
Promise有几个状态
说一下闭包
React的生命周期
componentWillReceiveProps的触发条件是什么
React16.3对生命周期的改变
介绍下React的Filber架构
画Filber渲染树
介绍React高阶组件
父子组件之间如何通信
Redux怎么实现属性传递，介绍下原理
React-Router版本号
网站SEO怎么处理
介绍下HTTP状态码
403、301、302是什么
缓存相关的HTTP请求头
介绍HTTPS
HTTPS怎么建立安全通道
前端性能优化（JS原生和React）
用户体验做过什么优化
对PWA有什么了解
对安全有什么了解
介绍下数字签名的原理
前后端通信使用什么方案
RESTful常用的Method
介绍下跨域
Access-Control-Allow-Origin在服务端哪里配置
csrf跨站攻击怎么解决
前端和后端怎么联调


兑吧

localStorage和cookie有什么区别
CSS选择器有哪些
盒子模型，以及标准情况和IE下的区别
如何实现高度自适应
prototype和——proto——区别
_construct是什么
new是怎么实现的
promise的精髓，以及优缺点
如何实现H5手机端的适配
rem、flex的区别（root em）
em和px的区别
React声明周期
如何去除url中的#号
Redux状态管理器和变量挂载到window中有什么区别
webpack和gulp的优缺点
如何实现异步加载
如何实现分模块打包（多入口）
前端性能优化（1js css；2 图片；3 缓存预加载； 4 SSR； 5 多域名加载；6 负载均衡）
并发请求资源数上限（6个）
base64为什么能提升性能，缺点
介绍webp这个图片文件格式
介绍koa2
Promise如何实现的
异步请求，低版本fetch如何低版本适配
ajax如何处理跨域
CORS如何设置
jsonp为什么不支持post方法
介绍同源策略
React使用过的一些组件
介绍Immuable
介绍下redux整个流程原理
介绍原型链
如何继承


微医

介绍JS数据类型，基本数据类型和引用数据类型的区别
Array是Object类型吗
数据类型分别存在哪里
var a  = {name: "前端开发"}; var b = a; a = null那么b输出什么
var a = {b: 1}存放在哪里
var a = {b: {c: 1}}存放在哪里
栈和堆的区别
垃圾回收时栈和堆的区别
数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
栈和堆具体怎么存储
介绍闭包以及闭包为什么没清除
闭包的使用场景
JS怎么实现异步
异步整个执行周期
Promise的三种状态
Async/Await怎么实现
Promise和setTimeout执行先后的区别
JS为什么要区分微任务和宏任务
Promise构造函数是同步还是异步执行，then呢
发布-订阅和观察者模式的区别
JS执行过程中分为哪些阶段
词法作用域和this的区别
平常是怎么做继承
深拷贝和浅拷贝
loadsh深拷贝实现原理
ES6中let块作用域是怎么实现的
React中setState后发生了什么
setState为什么默认是异步
setState什么时候是同步的
为什么3大框架出现以后就出现很多native（RN）框架（虚拟DOM）
虚拟DOM主要做了什么
虚拟DOM本身是什么（JS对象）
304是什么
打包时Hash码是怎么生成的
随机值存在一样的情况，如何避免
使用webpack构建时有无做一些自定义操作
webpack做了什么
a，b两个按钮，点击aba，返回顺序可能是baa，如何保证是aba（Promise.then）
node接口转发有无做什么优化
node起服务如何保证稳定性，平缓降级，重启等
RN有没有做热加载
RN遇到的兼容性问题
RN如何实现一个原生的组件
RN混原生和原生混RN有什么不同
什么是单页项目
遇到的复杂业务场景
Promise.all实现原理


寺库

介绍Promise的特性，优缺点
介绍Redux
RN的原理，为什么可以同时在安卓和IOS端运行
RN如何调用原生的一些功能
介绍RN的缺点
介绍排序算法和快排原理
堆和栈的区别
介绍闭包
闭包的核心是什么
网络的五层模型
HTTP和HTTPS的区别
HTTPS的加密过程
介绍SSL和TLS
介绍DNS解析
JS的继承方法
介绍垃圾回收
cookie的引用为了解决什么问题
cookie和localStorage的区别
如何解决跨域问题
前端性能优化


宝宝树

使用canvas绘图时如何组织成通用组件
formData和原生的ajax有什么区别
介绍下表单提交，和formData有什么关系
介绍redux接入流程
rudux和全局管理有什么区别（数据可控、数据响应）
RN和原生通信
介绍MVP怎么组织
介绍异步方案
promise如何实现then处理
koa2中间件原理
常用的中间件
服务端怎么做统一的状态处理
如何对相对路径引用进行优化
node文件查找优先级
npm2和npm3+有什么区别


海康威视

knex连接数据库响应回调
介绍异步方案
如何处理异常捕获
项目如何管理模块
前端性能优化
JS继承方案
如何判断一个变量是不是数组
变量a和b，如何交换
事件委托
多个<li>标签生成的Dom结构是一个类数组
类数组和数组的区别
dom的类数组如何转成数组
介绍单页面应用和多页面应用
redux状态树的管理
介绍localstorage的API


蘑菇街

html语义化的理解
<b>和<strong>的区别
对闭包的理解
工程中闭包使用场景
介绍this和原型
使用原型最大的好处
react设计思路
为什么虚拟DOM比真实DOM性能好
react常见的通信方式
redux整体的工作流程
redux和全局对象之间的区别
Redux数据回溯设计思路
单例、工厂、观察者项目中实际场景
项目中树的使用场景以及了解
工作收获


酷家乐

react生命周期
react性能优化
添加原生事件不移除为什么会内存泄露
还有哪些地方会内存泄露
setInterval需要注意的点
定时器为什么是不精确的
setTimeout(1)和setTimeout(2)之间的区别
介绍宏任务和微任务
promise里面和then里面执行有什么区别
介绍pureComponet
介绍Function Component
React数据流
props和state的区别
介绍react context
介绍class和ES5的类以及区别
介绍箭头函数和普通函数的区别
介绍defineProperty方法，什么时候需要用到
for..in 和 object.keys的区别
介绍闭包，使用场景
使用闭包特权函数的使用场景
get和post有什么区别


百分点

重新渲染render会做些什么
哪些方法会触发react重新渲染
state和props触发更新的生命周期分别有什么区别
setState是同步还是异步
对无状态组件的理解
介绍Redux工作流程
介绍ES6的功能
介绍Promise和then
介绍快速排序
算法：前K个最大的元素


海风教育 

对react看法，它的优缺点 
使用过程中遇到的问题，如何解决的 
react的理念是什么（拿函数式编程来做页面渲染）
JS是什么范式语言(面向对象还是函数式编程)
koa原理，为什么要用koa(express和koa对比) 
使用的koa中间件 
ES6使用的语法 
Promise 和 async/await 和 callback的区别 
Promise有没有解决异步的问题（promise链是真正强大的地方）
Promise和setTimeout的区别（Event Loop）
进程和线程的区别（一个node实例就是一个进程，node是单线程，通过事件循环来实现异步 
）
介绍下DFS深度优先 
介绍下观察者模式 
观察者模式里面使用的数据结构(不具备顺序 ，是一个list) 
 