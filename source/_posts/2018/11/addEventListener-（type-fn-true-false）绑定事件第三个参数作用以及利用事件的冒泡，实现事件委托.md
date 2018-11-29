---
title: 'addEventListener （type, fn , true/false）绑定事件第三个参数作用以及利用事件的冒泡，实现事件委托'
categories: front-end
tags:
  - js
abbrlink: f078bfb
date: 2018-11-23 15:00:11
---

 
第一个参数type，事件的类型，如click，mouseover等；

fn，事件监听执行的function；

第三参数，决定事件执行的过程（大概这样解释。。），捕获或者冒泡，首先我们看一张图片：

![事件流原理](/img/2018/11/shijianliu.gif)

由此可以知道
　　1、一个完整的JS事件流是从window开始，最后回到window的一个过程
　　2、事件流被分为三个阶段(1~5)捕获过程、(5~6)目标过程、(6~10)冒泡过程

e.target和e.currentTarget

　　target和currentTarget都是event上面的属性，target是真正发生事件的DOM元素，而currentTarget是当前事件发生在哪个DOM元素上。

　　可以结合控制台打印出来的信息理解下，目标阶段也就是 target == currentTarget的时候。我没有打印它们两个因为太长了，所以打印了它们的nodeName，但是由于window没有nodeName这个属性，所以是undefined。