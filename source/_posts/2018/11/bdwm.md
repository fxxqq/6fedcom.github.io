---
title: bdwm
categories: front-end
date: 2018-11-13 18:11:23
tags:
password : ms
---

一面
先完成笔试题
1 实现一个函数，判断输入是不是回文字符串。

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