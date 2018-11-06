---
title: nginx错误：unknown directive "锘? in D:\nginx/conf/nginx.conf:3
categories: front-end
tags:
  - 踩过的坑
abbrlink: 240b8f24
date: 2018-06-01 11:39:23
---

conf文件被记事本编辑过，保存成了含BOM头的文件
**使用其他编辑器将文件另存为UTF-8不含Bom头的格式**
注：记事本编辑UTF-8都会加BOM头