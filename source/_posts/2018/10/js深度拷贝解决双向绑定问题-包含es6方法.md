---
title: js深度拷贝解决双向绑定问题(包含es6方法)
categories: 前端
tags:
  - Javascript
abbrlink: 284d188d
date: 2018-10-26 15:44:21
---

>当我们利用v-bind：来绑定属性向子组件传递对象的时候，有时候我们需要子组件改变的时候不改变父组件的值，一般可以利用JSON.stringify(JSON.parse(jsonstr))将传递来的对象赋值到子组件自己的data，这样做的原理是对传过来的值重新赋予一个空间，从而解决双向绑定。，但是es6有一个深度赋值的方法也可以解决这个问题, let obj= Object.assign({}, obj)也可以解决。
 
比如一个数组（array）浅度拷贝是当数组a变量成数组b的时候，b改变里面的数组数值的时候，a也随着改变.

深度拷贝是当当数组a变量成数组b的时候，b改变里面的数组数值的时候，a里面的数组数组不随着改变，
```js
var arr = ["a", "b", "c", "d", "e"];      
var Arr = JSON.stringify(arr); //先转化为string字符串的类型
      
var Brr = JSON.parse(Arr); //在解析字符串的类型
Brr[1] = 'h';             //这样修改Brr中的数组的时候就不会影响到arr里面数组的值
console.log('arr:' + arr); //结果是arr:a,h,c,d,e
console.log("Arr:" + Brr); //结果是Arr:a,h,c,d,e
```
 

那么为什么浅度拷贝会改变a的数组值而深度拷贝则不会呢？

因为浅度拷贝指向的是同一个内存，而深度拷贝是增加了一个新的内存，所以不会影响到原来a的内存， 所 以就不会改变原来的值
`eg.`
```js
var arr = ["a", "b", "c", "d", "e"];      
var Arr = arr;    
Arr[1] = 'h';     
console.log('arr:' + arr);  //arr的下标1的‘b’也变成了‘h’ 结果是：arr:a,h,c,d,e
console.log("Arr:" + Arr); //结果是：Arr:a,h,c,d,e
```


## 数组的深拷贝

对于数组的深拷贝常规的有三种方法：

**方法一：遍历复制**
```js
var arr = ["a", "b"], arrCopy = [];
for (var item in arr) arrCopy[item] = arr[item];
arrCopy[1] = "c";
arr   // => ["a", "b"]
arrCopy   // => ["a", "c"]
```
考虑伪多维数组可以写成函数形式：

```js
function arrDeepCopy(source){
    var sourceCopy = [];
    for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? arrDeepCopy(source[item]) : source[item];
    return sourceCopy;
}
```
 
这种方法简单粗暴，但是利用JS本身的函数我们可以更加便捷地实现这个操作。


**方法二：slice()**

可以参考 W3School 对 slice() 方法的描述：slice() 方法可从已有的数组中返回选定的元素。

调用格式为：

`arrayObject.slice(start,end)`
方法返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。该方法并不会修改数组，而是返回一个子数组。

在这里我们的思路是直接从数组开头截到尾：

arrCopy = arr.slice(0);
arrCopy[1] = "c";
arr   // => ["a", "b"] 
arrCopy   // => ["a", "c"]
可以看出成功创建了一份原数组的拷贝。

**方法三：concat()**

可以参考 W3School 对 `concat()` 方法的描述：`concat()` 方法用于连接两个或多个数组。

调用格式为：
`arrayObject.concat(arrayX,arrayX,......,arrayX)`
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

使用这种方法的思路是我们用原数组去拼接一个空内容，放回的便是这个数组的拷贝：
```js
arrCopy = arr.concat();
arrCopy[1] = "c";
arr   // => ["a", "b"] 
arrCopy   // => ["a", "c"]
```

## 对象的深拷贝

对于数组的深拷贝我们有了概念，那么一般对象呢？

我们给出一个对象：
```js
var obj = { "a": 1, "b": 2 };
```
同样做测试：
```js
var objCopy = obj;
objCopy.b = 3;
obj   // => { "a": 1, "b": 3 }
objCopy   // => { "a": 1, "b": 3 }
```
同样，简单的赋值运算只是创建了一份浅拷贝。

而对于对象的深拷贝，没有内置方法可以使用，我们可以自己命名一个函数进行这一操作：
```js
var objDeepCopy = function(source){
    var sourceCopy = {};
    for (var item in source) sourceCopy[item] = source[item];
    return sourceCopy;
}
```
但是对于复杂结构的对象我们发现这个函数并不适用，例如：
```js
var obj = { "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 };
```
所以需要进行一点修改：

```js
var objDeepCopy = function(source){
    var sourceCopy = {};
    for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    return sourceCopy;
}
var objCopy = objDeepCopy(obj);
objCopy.a.a1[1] = "a13";
obj   // => { "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }
objCopy   // => { "a": { "a1": ["a11", "a13"], "a2": 1 }, "b": 2 }
```
 

**3、对象数组的深拷贝**

 如果再考虑更奇葩更复杂的情况，例如我们定义：

var obj = [{ "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 5 }]];
这是一个由对象、数组杂合成的奇葩数组，虽然我们平时写程序基本不可能这么折腾自己，但是可以作为一种特殊情况来考虑，这样我们就可以结合之前说的方法去拓展拷贝函数：

```js
var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
var objCopy = objDeepCopy(obj);
objCopy[0].a.a1[1] = "a13";
objCopy[1][1].e = "6";
obj   // => [{ "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 5 }]]
objCopy   // => [{ "a": { "a1": ["a11", "a13"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 6 }]]
```