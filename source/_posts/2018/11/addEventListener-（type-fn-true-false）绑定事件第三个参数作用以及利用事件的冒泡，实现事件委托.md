---
title: 'addEventListener （type, fn , true/false）绑定事件第三个参数作用以及利用事件的冒泡，实现事件委托'
categories: front-end
date: 2018-11-23 15:00:11
tags: [js]
---

(一)
第一个参数type，事件的类型，如click，mouseover等；

fn，事件监听执行的function；

第三参数，决定事件执行的过程（大概这样解释。。），捕获或者冒泡，首先我们看一张图片：

