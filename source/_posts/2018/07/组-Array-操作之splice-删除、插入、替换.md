---
title: 组(Array)操作之splice() --删除、插入、替换
categories: 前端
tags:
  - Javascript
abbrlink: c9afb08d
date: 2018-07-19 17:23:41
---

splice()方法，号称最强大的数组方法！！

splice()的主要用途是向数组的中部插入项，但是用这种方法的方式则有如下3中。

1、删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。例如，splice(0, 2)会删除数组中的前两项。

2、插入：可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0(要删除的项数)和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如，splice(2, 0, "red", "green")会从当前数组的位置2开始插字符串"red"和"green"。

3、替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项不必与删除的项相等。例如，splice(2, 1, "red", "green")，会删除当前数组位置2的项，然后再从位置2开始插入字符串"red"和"green"。

splice()方法始终都会返回一个数组，该数组中包含从原数组删除的项（如果没有删除任何项，则返回一个空数组）。下面的代码展示了上述3中使用splice()方法的方式。

```js
var colors = ["red", "green", "blue"];
var removed = colors.splice(0, 1);    //删除第一项
console.log("colors：" + colors);    //green, blue
console.log("返回的数组：" + removed);    //red,返回的数组中只包含一项

removed = colors.splice(1, 0, "yellow", "orange");  //从位置1开始插入两项
console.log("colors：" + colors);    //green, yellow, orange, blue
console.log("返回的数组：" + removed);    //返回的是一个空数组

removed = colors.splice(1, 1, "red", "purple");   //从位置1 删除一项，插入两项
console.log("colors：" + colors);    //green, red, purple, orange, blue
console.log("返回的数组：" + removed);    //yellow,返回的数组中只包含一项
```