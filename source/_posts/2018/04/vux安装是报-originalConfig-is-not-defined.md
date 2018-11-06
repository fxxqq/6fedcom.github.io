---
title: vux安装是报 originalConfig is not defined
categories: front-end
tags:
  - vue
abbrlink: 571af9df
date: 2018-04-29 14:07:29
---

webpack.base.conf.js
```js
//将module.exports = {
改为
var originalConfig = {
```

文件底部加上
```js
const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
```