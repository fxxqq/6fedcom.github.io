---
title: NodeJS连接MySQL时遇到的问题 Error Connection lost The server closed the connection.
issues: 114
categories: 前端
tags: node
abbrlink: 500f0fbd
date: 2018-09-07 15:54:30
---

今天用NodeJS连接Mysql时遇到点折磨人的问题，记录下解决方法。

NodeJS和Mysql都已经正确安装了，但是NodeJS和Mysql的连接出现问题，查找网上一些解决办法都不能解决问题。
报错如下：
![image](https://user-images.githubusercontent.com/22697565/45206239-1cfe7e80-b2b7-11e8-96d3-c104fa5c7b14.png)

经过查找定位，在mysql官网找到了解决方案：

[官网链接 》》MySQL Connector/Node.js](https://dev.mysql.com/doc/dev/connector-nodejs/8.0/)
MySql 针对node的连接器对mysql的版本有要求，且需要另外的插件：

![image](https://user-images.githubusercontent.com/22697565/45206324-520ad100-b2b7-11e8-8814-8d6d5b2fb7ae.png)

然后下载的最新版的mysql mysql-installer-community-5.7.20.0.msi
 
执行 :
```
npm install mysql

npm install @mysql/xdevapi
```

运行[官方示例](https://github.com/mysqljs/mysql#introduction)，成功。
