---
title: '错误码：events.js:183 throw er; // Unhandled ''error'' event—解决办法'
date: 2018-08-30 22:48:30
tags: 
    - npm
issues: 109
---

#### 控制台报错：
```
Hash: 78f0873c3eb47a64bfae
Version: webpack 1.14.0
Time: 16ms
webpack: Compiled successfully.
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 127.0.0.1:8080
    at Object._errnoException (util.js:1022:11)
    at _exceptionWithHostPort (util.js:1044:20)
    at Server.setupListenHandle [as _listen2] (net.js:1367:14)
    at listenInCluster (net.js:1408:12)
    at GetAddrInfoReqWrap.doListen [as callback] (net.js:1517:7)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:97:10)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! webpack-demos@1.0.0 dev: `webpack-dev-server --devtool eval --progress --colors`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the webpack-demos@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\qian\AppData\Roaming\npm-cache\_logs\2018-08-30T14_46_37_546Z-debug.log
```

#### 错误原因： 
端口号被占用


#### 解决方案 
1.Win+R,cmd查询使用的端口号是否被占用：
netstat  -aon|findstr  "8080"
按回车显示占用8080端口对应的程序的PID号；
2.根据PID号找到对应的程序：继续输入命令：
tasklist|findstr "15008"
按回车后显示出占用该端口的程序；
3.按快捷键“Ctrl+Shift+Esc”调出Windows任务管理器，根据PID/
程序对应名称结束该程序进程即可。