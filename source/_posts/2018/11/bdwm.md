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
### 1 实现一个函数，判断输入是不是回文字符串。
```js
function isPalindrome(str){
    if(typeof str!=='string'|| str.constructor !== String){
        return
    }
    str.map((item, key, ary)=>{
        if(item!==ary[ary.length-1-key]){
           return 
        }
    })
    return true
}
console.log(isPalindrome('adddddda'));//true
console.log(isPalindrome('addddda'));//true
console.log(isPalindrome('adddasd'));//false

```

拓展
对象的constructor属性用于返回创建该对象的函数，也就是我们常说的构造函数。在JavaScript中，每个具有原型的对象都会自动获得constructor属性。除了arguments、Enumerator、Error、Global、Math、RegExp、Regular Expression等一些特殊对象之外，其他所有的JavaScript内置对象都具备constructor属性。例如：Array、Boolean、Date、Function、Number、Object、String等。

 
2 

3 实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置。

4 请简单实现双向数据绑定mvvm。

5 实现Storage，使得该对象为单例，并对localStorage进行封装设置值setItem(key,value)和getItem(key)

Q1 你的技术栈主要是react，那你说说你用react有什么坑点？

Q2 我现在有一个button，要用react在上面绑定点击事件，我要怎么做？

Q3 接上一个问题，你觉得你这样设置点击事件会有什么问题吗？

Q4 你说说event loop吧

Q5 说说事件流吧

Q6 我现在有一个进度条，进度条中间有一串文字，当我的进度条覆盖了文字之后，文字要去进度条反色，怎么实现？
 
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
Q1 请说一下你的上一家公司的研发发布流程。

Q2 你说一下webpack的一些plugin，怎么使用webpack对项目进行优化。

Q5 请手写实现一个promise 

五面
Q1 你说一下你的技术有什么特点

Q2 说一下你觉得你最得意的一个项目？你这个项目有什么缺陷，弊端吗？

Q3 现在有那么一个团队，假如让你来做技术架构，你会怎么做？

Q4 说一下你上一家公司的主要业务流程，你参与到其中了吗？

Q1 自我介绍

Q2 说说从输入URL到看到页面发生的全过程，越详细越好。

Q3 你刚刚说了三次握手，四次挥手，那你描述一下？

Q4 刚刚Q2中说的CSS和JS的位置会影响页面效率，为什么？

Q5 现在有一个函数A和函数B，请你实现B继承A

Q6 刚刚你在Q5中说的几种继承的方式，分别说说他们的优缺点

Q7 说说CSS中几种垂直水平居中的方式

Q8 Q7中说的flex布局，垂直水平居中必须知道宽度吗？

Q9 描述一下this

Q10 说一下浏览器的缓存机制 

Q11 ETag是这个字符串是怎么生成的？

Q12 现在要你完成一个Dialog组件，说说你设计的思路？它应该有什么功能？

Q13 你觉得你做过的你觉得最值得炫耀的项目？



蚂蚁金服-体验技术部 资深数据可视化研发工程师 电话面 全程1小时24分钟

Q1 描述一下你最近做的可视化的项目

Q2 刚刚说的java调用js离线生成数据报告？java调用js的promise异步返回结果怎么实现的？

Q3 说说svg和canvas各自的优缺点？

Q4 你刚刚说的canvas渲染较大画布的时候性能会较低？为什么？

Q6 假设我现在有5000个圆，完全绘制出来，点击某一个圆，该圆高亮，另外4999个圆设为半透明，分别说说用svg和canvas怎么实现？

Q7 刚刚说的canvas的点击事件，怎么样实现？假如不是圆，这些图形是正方形、长方形、规则图形、不规则图形呢？

Q8 那个这个canvas的点击事件，点击的时候怎么样快速的从这5000个圆中找到你点击的那个圆（不完全遍历5000个节点）？

Q9 那你用过@antv/g6，里面有一个tree，说说你大学时候接触到的tree的数据结构是怎么实现的？

Q10 还记得二叉树吗？描述二叉树的几种遍历方式？

Q11 说说你记得的所有的排序，他们的原理是什么？

Q12 说一下你觉得你做过的最复杂的项目？中间遇到的困难，以及你是怎么解决的？

面试官：我这边问题差不多问完了，你还有什么问题？

我：很惊讶今天全都是问可视化相关的，没怎么问js，css，html。

面试官：那我们继续吧

我：。。。

Q13 那给我介绍一下react吧

jquery -> mvvm -> 虚拟dom -> diff -> state -> setState -> redux -> mobx -> react异步渲染。

Q14 假如我一个组件有一个状态count为1，然后我在componentDidMount()里面执行执行了两次this.setState({count: this.state.count++})，然后又执行了两次setTimeout(() => { this.setState({count: this.state.count++}) }, 0)，最后count为多少？为什么？

count为4

Q15 说一下你觉得你做过的最值得你说的吧

webpack前端工程化 -> 构建优化 -> 针对webpack的性能优化。

 先写个二叉搜索树 然后怎么平衡  然后红黑树怎么回事
 