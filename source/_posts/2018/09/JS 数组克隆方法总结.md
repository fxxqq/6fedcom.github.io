---
title: JS 数组克隆方法总结
categories: 前端
issues: 112
tags:
  - js代码片段
abbrlink: 207f8587
date: 2018-09-21 19:22:37
---


## ES5 方法总结
#### slice
```js
let arr = [2,4,434,43]
let arr1= arr.slice()
arr[0] = 'a'
console.log(arr,arr1) // [ 2, 4, 434, 43 ]
console.log(arr1 === arr) // false
```

#### 遍历数组   

```js
Array.prototype.clone = function(){
    let a=[];
    for(let i=0,l=this.length;i<l;i++) {
        a.push(this[i]);
    }
    return a;
}
let arr = ['aaa','bbb','ccc','wwwww','ddd']
let arr2 = arr.clone()
console.log(arr2)
console.log( arr2 === arr )
```
 
#### concat()

```js
Array.prototype.clone=function(){ 
    return [].concat(this); 
    //或者 return this.concat();
}
let arr = ['aaa','asss']
let arr1 = arr.clone()
arr[0] = 123
console.log(arr,arr1)
```
## ES6 方法总结
#### Object.assign() 浅复制，也可以实现数组的克隆
```js
let arr = ['sdsd',123,123,123]
let arr1 = []
Object.assign(arr1,arr)
arr[1] = 'aaaa'
console.log(arr,arr1) // [ 'sdsd', 'aaaa', 123, 123 ] [ 'sdsd', 123, 123, 123 ]
```
#### 扩展运算符
```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
a1[0] = 'aaa'
console.log(a1,a2)
```