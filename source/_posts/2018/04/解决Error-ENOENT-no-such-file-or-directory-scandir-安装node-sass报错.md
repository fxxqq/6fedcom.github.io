---
title: '解决Error: ENOENT: no such file or directory, scandir 安装node-sass报错'
categories: front-end
tags:
  - 踩过的坑
  - npm
abbrlink: ff8303e0
date: 2018-04-06 14:08:55
---

webpack打包时出现 Error: ENOENT: no such file or directory, scandir 


解决方案是执行以下方法：

npm rebuild node-sass

可是有时就是网络问题导致上面命令安装失败,查下失败提示,有可能是
Cannot download "https://github.com/sass/node-sass/releases/download/v4.5.3/win32-x64-48_binding.node":
然后下面就是nodejs给你的暗示
========暗示=========
Hint: If github.com is not accessible in your location
      try setting a proxy via HTTP_PROXY, e.g.
      export HTTP_PROXY=http://example.com:1234
or configure npm proxy via
      npm config set proxy http://example.com:8080
> node-sass@4.5.3 postinstall K:\mypro\nodePro\node_modules\_node-sass@4.5.3@node-sass
========暗示=========
意思是就说下载这个链接失败,你可以直接在浏览器打开这个链接(应该也打不开,或者特别慢),到这里我只能说你要翻墙了,上面也暗示你翻墙了.
翻墙后再试试几次npm rebuild node-sass,
还是不行也要想办法把win32-x64-48_binding.node 文件下载下来(在公司或者家里换不同的网络试试),
win32-x64-48_binding.node 到手后,打开项目下面的路径 node_modules\_node-sass_node-sass@4.5.3@node-sass\vendor (上面暗示的最后一句就有,版本号可能不一样)
然后在vendor文件夹下面创建win32-x64-48(要对应版本)文件夹,win32-x64-48文件夹下面放binding.node(文件名去掉前面的win32-x64-48_)
然后再一次命令: npm rebuild node-sass
应该安装成功

---------------------

本文摘自 迷失道 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/lhwomg/article/details/74781828?utm_source=copy 