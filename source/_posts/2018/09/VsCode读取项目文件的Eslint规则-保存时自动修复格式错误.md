---
title: VsCode读取项目文件的Eslint规则 保存时自动修复格式错误
categories: 前端
date: 2018-09-17 16:29:10
tags:
---

####  配置：
##### 安装VsCode的EsLint和vetur插件
##### 为项目安装EsLint包
注意要安装在开发环境上，还有就是如果你使用的是脚手架的话，选了Eslint选项，会自带这些包。
##### 在项目的根目录下添加.eslintrc.js
用于校验代码格式，根据项目情况，可自行编写校验规则：
```js
module.exports = {
    // Eslint规则
}
```
首选项设置：
将下面这部分放入首选项设置中：
```js
 "eslint.autoFixOnSave": true,  //  启用保存时自动修复,默认只支持.js文件
 "eslint.validate": [
    "javascript",  //  用eslint的规则检测js文件
    {
      "language": "vue",   // 检测vue文件
      "autoFix": true   //  为vue文件开启保存自动修复的功能
    },
    {
      "language": "html",
      "autoFix": true
    },
  ],

``` 

### 大功告成：
点开文件，你可能会看到如下报错，无需一个一个去改，只要保存一下文件，就可以自动修复这些代码格式上的问题了。

> 注意：
如果整个文件都飘红的话，不会一次性修改如果的格式问题，会一下改一部分，你可能需要多按几次保存。


