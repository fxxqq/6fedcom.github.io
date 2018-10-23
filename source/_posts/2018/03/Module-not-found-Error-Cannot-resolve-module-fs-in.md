---
title: 'Module not found: Error: Cannot resolve module ''fs'' in'
categories: 前端
tags:
  - npm
abbrlink: 9782d4af
date: 2018-09-22 18:32:13
---

控制台报错：
```js
However I see this error

./~/adal-node/lib/util.js
Module not found: Error: Cannot resolve module 'fs' in /Users/luis.valencia/Documents/GraphSamples/Sample1/node_modules/adal-node/lib
resolve module fs in /Users/luis.valencia/Documents/GraphSamples/Sample1/node_modules/adal-node/lib
  looking for modules in /Users/luis.valencia/Documents/GraphSamples/Sample1/node_modules/adal-node/lib
    /Users/luis.valencia/Documents/GraphSamples/Sample1/node_modules/adal-node/lib/fs doesn't exist (module as directory)
    resolve 'file' fs in /Users/luis.valencia/Documents/GraphSamples/Sample1/node_modules/adal-node/lib
      resolve file
```

解决方案：

add this to webpack.config.js
```js
target: 'node',
```

原文：https://stackoverflow.com/questions/40541044/module-not-found-error-cannot-resolve-module-fs-in

