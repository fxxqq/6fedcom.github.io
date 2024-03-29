---
title: 前端开发周刊-(2018年09月第2周)
categories: fed-shared
tags:
  - 优质文章分享
abbrlink: d53aad1e
date: 2018-09-10 11:48:21
issues:
---

#### [es6常用基础合集](https://www.jianshu.com/p/cfb0893c34f1)

##### url:https://www.jianshu.com/p/cfb0893c34f1

##### 知识点:
let,const 
箭头函数  
模板字符串  
解析结构  
函数默认参数 
展开运算符 
对象字面量与class 
Promise
#### [ES6新特性概览](http://www.cnblogs.com/Wayou/p/es6_new_features.html)

##### url： http://www.cnblogs.com/Wayou/p/es6_new_features.html

##### 知识点:
箭头操作符
类的支持
增强的对象字面量
字符串模板
解构
参数默认值，不定参数，拓展参数
let与const 关键字
for of 值遍历
iterator, generator
模块
Map，Set 和 WeakMap，WeakSet
Proxies
Symbols
Math，Number，String，Object 的新api
#### [透彻掌握Promise的使用，读这篇就够了](https://www.jianshu.com/p/fe5f173276bd)
##### url：https://www.jianshu.com/p/fe5f173276bd
##### 知识点：
实现方法
1.new Promise(fn),创建一个新的Promise对象并传入第一个执行方法。 
2.resolve。成功的执行方法 
3.reject。失败的执行方法 
4.catch。失败的捕获。 
5.then。链式调用下一步。
原理：
内部使用一个数组报错需要执行的所有方法，使用then来添加新的方法。旧的方法执行完毕之后检测数组，如果有新的就执行
```js
class Promise {
	result: any;
	callbacks = [];
	failbacks = [];
	constructor(fn) {
		fn(this.resolve.bind(this), this.reject.bind(this));
	}
	resolve(res) {
		if (this.callbacks.length > 0) this.callbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
	}
	reject(res) {
		this.callbacks = [];
		if (this.failbacks.length > 0) this.failbacks.shift()(res, this.resolve.bind(this), this.reject.bind(this));
	} catch (fn) {
		this.failbacks.push(fn);
	}
	then(fn) {
		this.callbacks.push(fn);
		return this;
	}
}
```
调用示例：
```js
var a = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve("成功");
	}, 1000);
}).then(function(result, resolve, reject) {
	console.log(result)
	reject("失败")
}).
catch (function(err) {
	console.log(err);
});
```

es6写法：
```js
//创建promise
var promise = new Promise(function(resolve, reject) {
    // 进行一些异步或耗时操作
    if ( /*如果成功 */ ) {
        resolve("Stuff worked!");
    } else {
        reject(Error("It broke"));
    }
});
//绑定处理程序
promise.then(function(result) {
	//promise成功的话会执行这里
    console.log(result); // "Stuff worked!"
}, function(err) {
	//promise失败会执行这里
    console.log(err); // Error: "It broke"
});
```
#### 4.[前端算法相关](https://github.com/qianbin01/frontend_train#sort)

##### url:https://github.com/qianbin01/frontend_train#sort

##### 知识点

冒泡排序
> 比较两个相邻的项，如果第一个大于第二个则交换他们的位置,元素项向上移动至正确的顺序，就好像气泡往上冒一样

快速排序:
>  1) 首先，在数组中选择一个中间项作为主元
2) 创建两个指针，左边的指向数组第一个项，右边的指向最后一个项，移动左指针，直到找到一个比主元大的项，接着，移动右边的指针，直到找到一个比主元小的项，然后交换它们。重复这个过程，直到
 左侧的指针超过了右侧的指针。这个使比主元小的都在左侧，比主元大的都在右侧。这一步叫划分操作
3) 接着，算法对划分后的小数组（较主元小的值组成的的小数组， 以及较主元大的值组成的小数组）重复之前的两个步骤，直到排序完成

选择排序:
> 大概思路是找到最小的放在第一位，找到第二小的放在第二位，以此类推 算法复杂度O(n^2)

归并排序:
> 归并排序：Mozilla Firefox 使用归并排序作为Array.prototype.sort的实现，而chrome使用快速排序的一个变体实现的,前面三种算法性能不好，但归并排序性能不错 算法复杂度O(nlog^n)
归并排序是一种分治算法。本质上就是把一个原始数组切分成较小的数组，直到每个小数组只有一个位置，接着把小数组归并成较大的数组，在归并过程中也会完成排序，直到最后只有一个排序完毕的大数组

堆排序：
> 堆排序把数组当中二叉树来排序而得名。
1）索引0是树的根节点；2）除根节点为，任意节点N的父节点是N/2；3）节点L的左子节点是2*L；4）节点R的右子节点为2*R + 1
本质上就是先构建二叉树，然后把根节点与最后一个进行交换，然后对剩下对元素进行二叉树构建，进行交换，直到剩下最后一个

#### 5.[javascript常用知识点](https://github.com/qianbin01/frontend_train#javascript)

##### url: https://github.com/qianbin01/frontend_train#javascript

##### 知识点
map,reduce,filter的用法
js数据类型(7种)
> 1.number;
2.string;
3.boolean;
4.undefined;
5.null;
6.symbol（ES6新增，文章后面有对着新类型的解释）Symbol 生成一个全局唯一的值。
7.Object.（包括Object，Array，Function）
闭包
```js
function foo(x) {
    var tmp = 3;
    return function (y) {
        alert(x + y + (++tmp));
    }
}
var bar = foo(2); // bar 现在是一个闭包
bar(10);
```
结果是16
es6通常用let const块级作用域代替，
闭包缺点，ie中会引起内存泄漏，严格来说是ie的缺点不是闭包的问题

什么是立即执行函数？使用立即执行函数的目的是什么？
```js
//常见两种方式
1.(function(){...})()
  (function(x){
	  console.log(x);
  })(12345)
2.(function(){...}())
  (function(x){
	  console.log(x);
  }(12345))
//作用 不破坏污染全局的命名空间，若需要使用，将其用变量传入如
（function(window){...}(window)）
```
async/await 语法
深浅拷贝
数组去重
思路1：定义一个新数组，并存放原数组的第一个元素，然后将元素组一一和新数组的元素对比，若不同则存放在新数组中
思路2：先将原数组排序，在与相邻的进行比较，如果不同则存入新数组。
思路3：利用对象属性存在的特性，如果没有该属性则存入新数组。
思路4（最常用）：使用es6 set
```js
let arr= [1, 2, 3, 3, 5, 7, 2, 6, 8];
console.log([...new Set(arr)]);
```
JS原型