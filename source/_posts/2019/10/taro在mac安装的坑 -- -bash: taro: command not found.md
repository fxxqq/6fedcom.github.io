---
title: taro在mac安装的坑 bash： taro： command not found
categories: front-end
tags:
  - 小程序
abbrlink: 66fc267
date: 2019-10-08 09:55:52
---


首先安装脚手架cli：
```
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
```
在windows系统，就可以初始化项目了，但是在mac会出现问题：

**-bash: taro: command not found**  -- 没有配置环境变量

解决教程：

1. 先找到taro安装的路径，如果忘了重新跑一遍 -- **npm install -g @tarojs/cli**

![找到taro安装的路径](//cdn.ru23.com/img/2019/10/taro1.1.jpg)

红框内为安装路径，注意：位置指向**bin**目录，没有taro目录

2. open -e .bash_profile -- 配置环境变量
```
# taro add
export TARO=/Users/XXXXXX/.npm-global/lib/node_modules/@tarojs/cli/bin
export PATH=$TARO:$PATH
```

3、保存配置，关闭，最后读取文件并执行，就会立刻生效。
```
source .bash_profile
```
4、问题解决

![问题解决](//cdn.ru23.com/img/2019/10/taro2.1.jpg)




