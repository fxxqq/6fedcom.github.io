---
title: 详解angularJS动态生成的页面中ng-click无效解决办法
categories: 前端
tags:
  - angular
  - 踩过的坑
abbrlink: f99d9594
date: 2018-04-24 16:34:39
---

今天碰到了一个这样的需求，在自己写的动态的页面中，写入的AngularJS无效不能点击响应事件，以下给出代码以及解决方案

<h5> 1.首先将我们要赋值给页面的数据new一下</h5>

```html
var html = "<a href='javascript:void(0);' ng-click='test()'></a>"
```  

<h5>2.用$compile函数编译一下上边的内容</h5>

```html
var $html = $compile(html)($scope);
```

<h5>3.将编译好的内容插入到页面中</h5>

```html
$("body").append($html);
 ```
<h4>以下是完整版本</h4>

```js
app.controller('customersCtrl', function ($scope, $http,$compile) { 
$scope.test = function(){ 
  alert('test'); 
} 
// TODO 动态生成html中 ng-click无效 解决方法 $compile 是传进来的 
//下边这句话就是要写入页面中的内容，首先把你写入的内容赋值给html 
var html = "<a href='javascript:void(0);' ng-click='test()'></a>"
//用$compile进行编译 
var $html = $compile(html)($scope); 
//添加到页面中，或者你任何想添加的位置。}); 
$("body").append($html); 

```

ng-click就可以触发function了  