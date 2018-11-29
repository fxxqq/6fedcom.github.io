---
title: 前端开发者进阶之函数柯里化Currying
categories: front-end
abbrlink: 260f9819
date: 2018-11-27 19:03:00
tags:
---

```js
function currying(fn) {
    var slice = Array.prototype.slice,
    __args = slice.call(arguments, 1);
    return function () {
        var __inargs = slice.call(arguments);
        return fn.apply(null, __args.concat(__inargs));
    };
}
 

```