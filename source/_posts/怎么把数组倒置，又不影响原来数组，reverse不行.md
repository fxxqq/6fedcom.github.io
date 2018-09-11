---
title: 怎么把数组倒置，又不影响原来数组，reverse不行
date: 2018-08-18 23:33
tags: [js代码片段]
issues: 105
---

### 情景：
怎么把数组倒置，又不影响原来数组，reverse不行，会把原数组也给反过来。
```js
var arr = ["1","2","3","4"];
var bbb = arr.reverse()
console.log(arr); //["4", "3", "2", "1"]
console.log(bbb); //["4", "3", "2", "1"]
```

直接改的话bbb和arr指向是同一个数组对象。reverse改变的是数组对象，a指向它，所以改变了，要改变就要让其指向不同

### 解决方案
```js
var arr = ["1","2","3","4"];
//列举4个解决方案
var bbb = [...arr].reverse() //方法1
var bbb = [].concat(arr).reverse()  //方法2
var bbb = Object.assign([],arr).reverse()//方法3
var bbb = arr.slice().reverse()//方法4
console.log(arr); 
console.log(bbb); 
```

 ES6语法很方便~