---
title: 函数柯里化curry
categories: front-end
abbrlink: 4bf41c9b
date: 2018-11-28 22:45:45
---

 
### 函数柯里化

```js
// add 函数柯里化
function add() {
  //建立args,利用闭包特性，不断保存arguments
  var args = [].slice.call(arguments)
  //方法一，新建_add函数实现柯里化;
  console.log(arguments)
  console.log(args)
  var _add = function() {
    if (arguments.length === 0) {
      //参数为空，对args执行加法
      return args.reduce((a, b) => {
        return a + b
      })
    } else {
      console.log([].push.apply(args, arguments))

      //否则，保存参数到args，返回一个函数
      ;[].push.apply(args, arguments)
      return _add
    }
  }
  //返回_add函数
  return _add

  // //方法二，使用arguments.callee实现柯里化
  // return function () {
  //       if (arguments.length === 0) {
  //           return args.reduce(function(a,b){return a+b});
  //       }
  //       Array.prototype.push.apply(args, arguments);
  //       return arguments.callee;
  //   }
}
console.log(add(1, 2, 3)(1)(2)(3)(4, 5, 6)(7, 8)()) //42
```
