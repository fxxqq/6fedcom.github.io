---
title: 配置webpack本地用ip访问
categories: front-end
tags:
  - webpack
abbrlink: 162b4a3d
date: 2018-06-05 11:52:56
---

### 第一步，先拿到本地ip
ipconfig找到 IPv4地址 后面的就是你本地的IP

## 网上的解决方案
然后在项目根目录中找到config进入打开index.js
![image](https://user-images.githubusercontent.com/22697565/40957555-4543f8f4-68c8-11e8-89ad-fd411958a713.png)
修改后发现，ip是可以访问了，但是多人开发的项目，这个项目在别人的电脑上就跑不起来。
每次开发的时候都去修改一下index.js或者隐藏index.js文件的提交，似乎都不是很好的解决方案

经过多番查阅资料：https://github.com/webpack/webpack-dev-server/issues    终于找到解决方案了
修改package.json

![image](https://user-images.githubusercontent.com/22697565/40957667-b60696dc-68c8-11e8-86b7-c93d92883644.png)
npm run frank 或者npm run eva
这样在不同的电脑上运行不同的命令就可以了。
