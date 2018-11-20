---
title: bdwm
categories: front-end
date: 2018-11-13 18:11:23
tags:
password : ms
---

Vue 的使用主要考虑以下几点：

体积小，复杂度低
业务上移动端项目占比 70% 以上，Vue 的体积小，网络性能角度相比 React 更适合移动端
移动端一般巨型项目很少，从代码结构上来讲，使用 Vue 实现更符合我们的场景复杂度，React 更适合大型相对更复杂的 SPA
上手成本和迁移成本低
Vue 的学习和上手成本相对更低，团队成员对于 Vue 的认可度和热情也比较高
组件内双向绑定、数据依赖收集
组件内支持双向绑定，更方便的去进行组件内的数据响应与交互
独有的数据依赖收集模式使其默认的数据响应和渲染效率都要比 React 高一些
React 的使用主要考虑以下原因：

有一部分现有后台项目采用 React 技术栈，迭代和维护较少，老的项目如果没有足够的迁移价值则不额外投入资源
保留很小的一部分 React 技术生态也可以一定程度上保持一些技术多样性


一面
先完成笔试题
#### 1 实现一个函数，判断输入是不是回文字符串。
```js
function isPalindrome(str){
    let flag
    if(typeof str!=='string'|| str.constructor !== String){
        return
    }
    for(var i=0,j=str.length-1;i<j;i++,j--){
        console.log(i,j)
        if(str.charAt(i) !== str.charAt(j)){
            return false;
        }
    }
    return true;
   
}
console.log(isPalindrome('adddddda'));//true
console.log(isPalindrome('addddda'));//true
console.log(isPalindrome('adddasd'));//false

```


拓展
对象的constructor属性用于返回创建该对象的函数，也就是我们常说的构造函数。在JavaScript中，每个具有原型的对象都会自动获得constructor属性。除了arguments、Enumerator、Error、Global、Math、RegExp、Regular Expression等一些特殊对象之外，其他所有的JavaScript内置对象都具备constructor属性。例如：Array、Boolean、Date、Function、Number、Object、String等。

 
#### 2 居中
 transform:translate(-50%,-50%); (ie9以上兼容)
 flex;align-items: center;justify-content: center （ 移动端首选）

3 实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置。

4 请简单实现双向数据绑定mvvm。

 Object.defineProperty 来实现一个简单的数据双向绑定
```html
<input type="text" id="input" />
<div id="div"></div>
```
```js
var obj = {};
var input = document.getElementById("input");
var div = document.getElementById("div");

Object.defineProperty(obj, "name", {
    set: function(newVal) {
        input.value = newVal;
        div.innerHTML = newVal;
    }
});
input.addEventListener('input', function(event){
    obj.name = event.target.value;
});
```

5 实现Storage，使得该对象为单例，并对localStorage进行封装设置值setItem(key,value)和getItem(key)

```js
let instance =null;

class Storage {
    constructor(props) {
         super(props)
         this.state={

         }
    }
   //实例化
    static getInstance(name) {
        if(!this.instance) {
            this.instance = new Singleton(name);
        }
        return this.instance;
    }

    setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getItem = key => localStorage.getItem(key)
 
}
```


#### Q1 你的技术栈主要是react，那你说说你用react有什么坑点？
1.在JSX语法种，需要将 class改写成 className
2.react 打包后，项目部署完毕，刷新页面报错（404） 配置nginx 把目录指向index.html就可以解决
3.this.setState()会调用render方法，但并不会立即改变state的值，state是在render方法中赋值的。所以执行this.setState()后立即获取state的值是不变的。同样的直接赋值state并不会出发更新，因为没有调用render函数
4.监听事件和定时器需要在组件卸载的时候清除，否则切换路由的话这些事件还会一直执行下去
5.react列表渲染时为什么尽量不要把索引设置为key值
用state和jsx模板生成虚拟DOM，然后用虚拟DOM生成真实的 DOM，当我们state发生变化时,render函数执行，生成新的 虚拟DOM，然后比较新旧虚拟DOM的区别，找到区别，然后直接操作DOM，改变有区别的内容，这样比传统的操作DOM，极大的提升了性能。
再说虚拟DOM，虚拟DOM其实就是一个JS对象(['div',{class:'app'},'item']),虚拟DOM核心之一是diff算法，diff算法的核心之一是同层对比，

因为react中渲染dom是通过render方式，也就是通过虚拟的dom与真实的存在的dom树比较之后发现哪不一样，再进行渲染，这样的渲染对于性能的提升很有帮助，所以键值在保证稳定性,唯一性的时候，在遍历寻找需要改变的地方时候就能很块的找见并对其进行操作，如果键值不是稳定的而是变化的就会使渲染更改dom的效率大大的打折。

我们如果不用索引为key , 程序能快速的对比出差异，反之也能对出差异，但是必须对比整个虚拟DOM，
这样，程序仍然能正常执行，只不过大大消耗了新旧虚拟DOM的对比的性能，并可能导致组件状态问题。

componentDidMount处理http请求，shouldComponentUpdate允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。
调用setState之后发生了什么
调用setState函数之后，react会将传入的参数对象与组件当前的状态合并，然后触发调和过程(Reconciliation)。以高效方式根据新的状态构建React元素树并且着手重新渲染整个UI界面。在React得到元素树之后，React会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。（按需渲染，不是全部渲染）
React中keys的作用是什么
Keys是React用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。在React Diff算法中React会借助元素的Key值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。

#### Q2 我现在有一个button，要用react在上面绑定点击事件，我要怎么做？
第一种是在构造函数中绑定this，第二种是在render()函数里面绑定this，第三种就是使用箭头函数，都能实现上述方法；

但是哪一种方法的性能最好，是我们要考虑的问题。应该大家都知道答案：第一种的性能最好。

因为第一种，构造函数每一次渲染的时候只会执行一遍；

而第二种方法，在每次render()的时候都会重新执行一遍函数；

第三种方法的话，每一次render()的时候，都会生成一个新的箭头函数，即使两个箭头函数的内容是一样的。

第三种方法我们可以举一个例子，因为react判断是否需要进行render是浅层比较，简单来说就是通过===来判断的，如果state或者prop的类型是字符串或者数字，只要值相同，那么浅层比较就会认为其相同；

但是如果前者的类型是复杂的对象的时候，我们知道对象是引用类型，浅层比较只会认为这两个prop是不是同一个引用，如果不是，哪怕这两个对象中的内容完全一样，也会被认为是两个不同的prop。

作者：darrell
链接：https://www.jianshu.com/p/333f390f2e84
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

Q3 接上一个问题，你觉得你这样设置点击事件会有什么问题吗？


#### Q4 你说说event loop吧
对象放在heap（堆）里，常见的基础类型和函数放在stack（栈）里，函数执行的时候在栈里执行。栈里函数执行的时候可能会调一些Dom操作，ajax操作和setTimeout定时器，这时候要等stack（栈）里面的所有程序先走 （注意：栈里的代码是先进后出）， 走完后再走WebAPIs，WebAPIs执行后的结果放在callback queue（回调的队列里，注意：队列里的代码先放进去的先执行），也就是当栈里面的程序走完之后，再从任务队列中读取事件，将队列中的事件放到执行栈中依次执行，这个过程是循环不断的。

1.所有同步任务都在主线程上执行，形成一个执行栈
2.主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列之中放置一个事件。
3.一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列,将队列中的事件放到执行栈中依次执行
4.主线程从任务队列中读取事件，这个过程是循环不断的

#### Q5 说说事件流吧
https://segmentfault.com/a/1190000015719043
#### Q6 我现在有一个进度条，进度条中间有一串文字，当我的进度条覆盖了文字之后，文字要去进度条反色，怎么实现？
css反色属性 mix-blend-mode
CSS 文字反色

Q1 你为什么要离开上一家公司？

Q2 你觉得理想的前端地位是什么？
 
Q3 那你意识到问题所在，你又尝试过解决问题吗

Q1 说一下你上一家公司的一个整体开发流程吧

###  react 的虚拟dom是怎么实现的
```js
Element.prototype.render=function(){
    var dom=document.createElement(this.tagName);
    for (key in this.props){
        dom.setAttribute(key,this.props[key]);
    }
    this.children.forEach()
    this.children.forEach( function(child){
        if(child instanceof Element) {
            tnode = child.render();
        }  else
        {
            tnode = document.createTextNode(child);
        }
        dom.appendChild(tnode);
    })
    return dom;
}
```


Q3 react 的渲染过程中，兄弟节点之间是怎么处理的？也就是key值不一样的时候。

Q4 我现在有一个数组[1,2,3,4]，请实现算法，得到这个数组的全排列的数组，如[2,1,3,4]，[2,1,4,3]。。。。你这个算法的时间复杂度是多少



Q5 我现在有一个背包，容量为m，然后有n个货物，重量分别为w1,w2,w3...wn，每个货物的价值是v1,v2,v3...vn，w和v没有任何关系，请求背包能装下的最大价值。

四面
#### Q1 请说一下你的上一家公司的研发发布流程。
1.需求会议，完成最终功能需求确认，
2.并且选取合适的sprint master，sprint master完成排期预估，并且主导每天的晨会，
3.UI原型图和需求会上传到tfs，
4.在git的master上新建分支，分支名字前端是

#### Q2 你说一下webpack的一些plugin，怎么使用webpack对项目进行优化。

webpack DllPlugin、webpack DllReferencePlugin 预编译第三方库文件

使用 HappyPack 来加速代码构建
原理：

由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的事情只能一件一件地做，不能多件事一起做。
而 HappyPack 的处理思路是：将原有的 webpack 对 loader 的执行过程，从单一进程的形式扩展多进程模式，从而加速代码构建。

2.配置loader的 include & exclude
原理：

webpack 的 loaders 里的每个子项都可以有 include 和 exclude 属性：


include：导入的文件将由加载程序转换的路径或文件数组（把要处理的目录包括进来）
exclude：不能满足的条件（排除不处理的目录）


我们可以使用 include 更精确地指定要处理的目录，这可以减少不必要的遍历，从而减少性能损失。
同时使用 exclude 对于已经明确知道的，不需要处理的目录，予以排除，从而进一步提升性能。

 

Q4 es6 class 的new实例和es5的new实例有什么区别

Q5 请手写实现一个promise 

五面
Q1 你说一下你的技术有什么特点

Q2 说一下你觉得你最得意的一个项目？你这个项目有什么缺陷，弊端吗？

Q3 现在有那么一个团队，假如让你来做技术架构，你会怎么做？



Q4 说一下你上一家公司的主要业务流程，你参与到其中了吗？




#### Q10 说一下浏览器的缓存机制 
http://note.youdao.com/noteshare?id=74c654bea765bb13b618c30ee90025f4

