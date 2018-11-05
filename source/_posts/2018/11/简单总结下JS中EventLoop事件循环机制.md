---
title: 简单总结下JS中EventLoop事件循环机制
categories: front-end
date: 2018-11-04 22:58:16
tags: [javascript]
---

### Event Loop 是什么

> JavaScript的事件分两种，**宏任务(macro-task)**和**微任务(micro-task)**

*   **宏任务**：包括整体代码script，setTimeout，setInterval
*   **微任务**：Promise.then(非new Promise)，process.nextTick(node中)
    
*   事件的执行顺序，`是先执行宏任务，然后执行微任务`，这个是基础，任务可以有同步任务和异步任务，同步的进入主线程，异步的进入Event Table并注册函数，异步事件完成后，会将回调函数放入Event Queue中(`宏任务和微任务是不同的Event Queue`)，同步任务执行完成后，会从Event Queue中读取事件放入主线程执行，回调函数中可能还会包含不同的任务，因此会循环执行上述操作。
```js
setTimeout(() => {
    console.log('延时1秒');
},1000)
console.log("开始")
输出：
开始
延时1秒
```

上述代码，setTimeout函数是宏任务，且是异步任务，因此会将函数放入Event Table并注册函数，经过指定时间后，把要执行的任务加入到Event Queue中，等待同步任务`console.log("开始")`执行结束后，读取Event Queue中setTimeout的回调函数执行。

上述代码不包含微任务，接下来看包含微任务的代码：
```js
setTimeout(function() {
    console.log('setTimeout');
},1000)

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');
```

*   首先setTimeout，放入Event Table中，1秒后将回调函数放入宏任务的Event Queue中
*   new Promise 同步代码，立即执行`console.log('promise')`,然后看到微任务then，因此将其放入微任务的Event Queue中
*   接下来执行同步代码`console.log('console')`
*   主线程的宏任务，已经执行完毕，接下来要执行微任务，因此会执行Promise.then，到此，第一轮事件循环执行完毕
*   第二轮事件循环开始，先执行宏任务，即setTimeout的回调函数，然后查找是否有微任务，没有，时间循环结束
    
> 到此做个总结，事件循环，先执行宏任务，其中同步任务立即执行，异步任务，加载到对应的的Event Queue中(setTimeout等加入宏任务的Event Queue，Promise.then加入微任务的Event Queue)，所有同步宏任务执行完毕后，如果发现微任务的Event Queue中有未执行的任务，会先执行其中的任务，这样算是完成了一次事件循环。接下来查看宏任务的Event Queue中是否有未执行的任务，有的话，就开始第二轮事件循环，依此类推。
    

上述例子只是简单的一层嵌套，接下来看一个稍微复杂了一点点的例子：
```js
console.log('1');
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
输出：
1
2
4
3
5
```
*   宏任务同步代码`console.log('1')`,不多说
*   setTimeout，加入宏任务Event Queue，没有发现微任务，第一轮事件循环走完
*   第二轮事件循环开始，先执行宏任务，从宏任务Event Queue中独取出setTimeout的回调函数
*   同步代码`console.log('2')`,发现process.nextTick，加入微任务Event Queue
*   new Promise，同步执行`console.log('4')`,发现then，加入微任务Event Queue
*   宏任务执行完毕，接下来执行微任务，先执行process.nextTick，然后执行Promise.then
*   微任务执行完毕，第二轮事件循环走完，没有发现宏任务，事件循环结束

