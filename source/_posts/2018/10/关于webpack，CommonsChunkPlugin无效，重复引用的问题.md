---
title: 关于webpack，CommonsChunkPlugin无效，重复引用的问题
categories: Front-End
abbrlink: 9aead141
date: 2018-10-29 15:49:29
tags: [webpack]
---
**坑1**
CommonChunkPlugin需要加上minChunks属性，minChunks是指一个文件至少被require几次才会被放到CommonChunk里，如果minChunks等于2，说明一个文件至少被require两次才能放在CommonChunk里。
```js
new CommonsChunkPlugin({
        name: "common",
        minChunks: 2
   });
```
**坑2**
UglifyJsPlugin现在不支持es6，必须要用babel转换成es5。

