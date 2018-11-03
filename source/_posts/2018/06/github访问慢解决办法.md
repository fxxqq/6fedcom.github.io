---
title: github访问慢解决办法
categories: front-end
tags:
  - github
abbrlink: a35b8659
date: 2018-06-11 18:13:12
---

### 原因
为什么慢？github的CDN被某墙屏了。

### 解决方法
绕过dns解析，在本地直接绑定host，该方法也可加速其他因为CDN被屏蔽导致访问慢的网站。

### 实现
在本地host文件中添加映射，步骤如下：

用文本编辑器打开hosts文件，位于C:\Windows\System32\drivers\etc目录下

打开 http://tool.chinaz.com/dns ,这是一个查询域名映射关系的工具

查询 github.global.ssl.fastly.net 和 assets-cdn.github.com 两个地址

多查几次，选择一个稳定，延迟较低的 ip 按如下方式添加到host文件

保存文件，重新打开浏览器，起飞。

```
......
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#   127.0.0.1       localhost
#   ::1             localhost

# github
192.30.253.112 assets-cdn.github.com
151.101.88.249 github.global.ssl.fastly.net
```

**修改的github对应的完整hosts为：**
```
# github
151.101.44.249 github.global.ssl.fastly.net 
192.30.253.113 github.com 
103.245.222.133 assets-cdn.github.com 
23.235.47.133 assets-cdn.github.com 
203.208.39.104 assets-cdn.github.com 
204.232.175.78 documentcloud.github.com 
204.232.175.94 gist.github.com 
107.21.116.220 help.github.com 
207.97.227.252 nodeload.github.com 
199.27.76.130 raw.github.com 
107.22.3.110 status.github.com 
204.232.175.78 training.github.com 
207.97.227.243 www.github.com 
185.31.16.184 github.global.ssl.fastly.net 
185.31.18.133 avatars0.githubusercontent.com 
185.31.19.133 avatars1.githubusercontent.com
```

修改完hosts还不会立即生效，你需要刷新DNS缓存，告诉电脑我的hosts文件已经修改了。

输入指令：sudo /etc/init.d/networking restart 即可。

然后，你关闭浏览器再访问github就不会出现速度很慢的现象了

> windows下刷新DNS的方法：
> 
> 打开CMD
> 
> 输入ipconfig /flushdns