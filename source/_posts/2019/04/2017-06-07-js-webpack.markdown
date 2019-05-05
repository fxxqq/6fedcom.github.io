---
layout:     post
title:      "webpack"
subtitle:   "webpack原理与实战"
date:        2017-06-07 13:00:00
author:     ""
header-img: "img/post-bg-2015.jpg"
tags:
   - javascript
---


## webpack原理与实战

webpack是一个js打包工具，不一个完整的前端构建工具。它的流行得益于模块化和单页应用的流行。webpack提供扩展机制，在庞大的社区支持下各种场景基本它都可找到解决方案。本文的目的是教会你用webpack解决实战中常见的问题。

## webpack原理

在深入实战前先要知道webpack的运行原理

### webpack核心概念

- entry 一个可执行模块或库的入口文件。
- chunk 多个文件组成的一个代码块，例如把一个可执行模块和它所有依赖的模块组合和一个 - - - chunk 这体现了webpack的打包机制。
- loader 文件转换器，例如把es6转换为es5，scss转换为css。
- plugin 插件，用于扩展webpack的功能，在webpack构建生命周期的节点上加入扩展hook为- webpack加入功能。



### webpack构建流程

从启动webpack构建到输出结果经历了一系列过程，它们是：

1. 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
2. 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
3. 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
4. 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
5. 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
6. 输出所有chunk到文件系统。

需要注意的是，在构建生命周期中有一系列插件在合适的时机做了合适的事情，比如UglifyJsPlugin会在loader转换递归完后对结果再使用UglifyJs压缩覆盖之前的结果。

## 场景和方案

通过各种场景和对应的解决方案让你深入掌握webpack


## 单页应用

一个单页应用需要配置一个entry指明执行入口，webpack会为entry生成一个包含这个入口所有依赖文件的chunk，但要让它在浏览器里跑起来还需要一个HTML文件来加载chunk生成的js文件，如果提取出了css还需要让HTML文件引入提取出的css。web-webpack-plugin里的WebPlugin可以自动的完成这些工作。

```
const { WebPlugin } = require('web-webpack-plugin');
module.exports = {
  entry: {
    app: './src/doc/index.js',
  },
  plugins: [
    // 一个WebPlugin对应生成一个html文件
    new WebPlugin({
      //输出的html文件名称
      filename: 'index.html',
      //这个html依赖的`entry`
      requires: ['app'],
    }),
  ],
};
```
requires: ['doc']指明这个HTML依赖哪些entry，entry生成的js和css会自动注入到HTML里。
你还可以配置这些资源的注入方式，支持如下属性：


- _dist 只有在生产环境下才引入该资源
- _dev 只有在开发环境下才引入该资源
- _inline 把该资源的内容潜入到html里
- _ie 只有IE浏览器才需要引入的资源

要设置这些属性可以通过在js里配置

```
new WebPlugin({
    filename: 'index.html',
    requires: {
         app:{
              _dist:true,
              _inline:false,
         }
    },
}),
```
或者在模版里设置，使用模版的好处是灵活的控制资源注入点。

```
new WebPlugin({
      filename: 'index.html',
      template: './template.html',
}),


<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <link rel="stylesheet" href="app?_inline">
    <script src="ie-polyfill?_ie"></script>
</head>
<body>
<div id="react-body"></div>
<script src="app"></script>
</body>
</html>
```

WebPlugin插件借鉴了fis3的思想，补足了webpack缺失的以HTML为入口的功能。想了解WebPlugin的更多功能，见文档。


一个项目里管理多个单页应用

一般项目里会包含多个单页应用，虽然多个单页应用也可以合并成一个但是这样做会导致用户没访问的部分也加载了。如果项目里有很多个单页应用，为每个单页应用配置一个entry和WebPlugin？如果项目又新增了一个单页应用，又去新增webpack配置？这样做太麻烦了，web-webpack-plugin里的AutoWebPlugin可以方便的解决这些问题。

```
module.exports = {
    plugins: [
        // 所有页面的入口目录
        new AutoWebPlugin('./src/'),
    ]
};
```

AutoWebPlugin会把./src/目录下所有每个文件夹作为一个单页页面的入口，自动为所有的页面入口配置一个WebPlugin输出对应的html。要新增一个页面就在./src/下新建一个文件夹包含这个单页应用所依赖的代码，AutoWebPlugin自动生成一个名叫文件夹名称的html文件。AutoWebPlugin的更多功能见文档。

## 代码分割优化

一个好的代码分割对浏览器首屏效果提升很大。比如对于最常见的react体系你可以

1. 先抽出基础库react react-dom redux react-redux到一个单独的文件而不是和其它文件放在一起打包为一个文件，这样做的好处是只要你不升级他们的版本这个文件永远不会被刷新。如果你把这些基础库和业务代码打包在一个文件里每次改动业务代码都会导致文件hash值变化从而导致缓存失效浏览器重复下载这些包含基础库的代码。以上的配置为：

```
// vender.js 文件抽离基础库到单独的一个文件里防止跟随业务代码被刷新
// 所有页面都依赖的第三方库
// react基础
import 'react';
import 'react-dom';
import 'react-redux';
// redux基础
import 'redux';
import 'redux-thunk';
```

```
// webpack配置
{
  entry: {
    vendor: './path/to/vendor.js',
  },
}

```

2. 再通过CommonsChunkPlugin可以提取出多个代码块都依赖的代码形成一个单独的chunk。在应用有多个页面的场景下提取出所有页面公共的代码减少单个页面的代码，在不同页面之间切换时所有页面公共的代码之前被加载过而不必重新加载。


