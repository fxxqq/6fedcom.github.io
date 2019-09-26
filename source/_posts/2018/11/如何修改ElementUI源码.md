---
title: 如何修改ElementUI源码
categories: front-end
tags:
  - vue
abbrlink: 2d4f9329
date: 2018-11-09 14:23:59
---

在使用 element-ui 的时候，有些功能不能满足我们的需求，就需要修改源码来满足。阅读官方给的教程，对于我这小菜鸟过于简略，结合自己的实践整理一下修改方法：

克隆 element 官方的仓库到本地

```
git clone https://github.com/ElemeFE/element.git
```

下载到本地之后安装依赖包

```
cd element && npm install
npm run dev
```

依赖包安装成后在 默认会在 http://localhost:8085/ 打开本地网页，会看到 element 首页

进入 element 文件夹，packages 文件夹就是我们要修改源码的目录文件夹
比如我们进入 button 文件夹里面的 src 文件，找到 button.vue，我们修改 class="el-button"，添加 class="el-button el-button-customize"一个自定义的 class,然后保存。切换本地 element 首页，找到 button 组件，可以用审查元素查看，就会看到 class="el-button el-button-customize"已经被修改了。

切换到命令行工具 执行
npm run dist

命令行执行完毕，会在 element 文件夹里面生成 lib 文件夹

复制 lib 文件夹到自己的项目目录
找到 node_modules 并进入,找到 element-ui 文件夹替换里面的 lib 文件夹

验证是否成功
进入自己的项目文件目录，打开并运行项目，然后找到任意的 button 组件，验证 button 是否添加了自定义的 el-button-customize 。
