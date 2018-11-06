---
title: Node Sass could not find a binding for W64-bit and Node.js 6.x
categories: front-end
tags:
  - npm
  - 踩过的坑
abbrlink: a3acb1c1
date: 2018-11-06 14:14:22
---


ERROR in ./src/app/css/index.scss
```
Module build failed: Error: Missing binding D:\projects\living\user-platform\project\node_modules
-x64-48\binding.node
Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 6.x
```

The problem was up since I had installed Node.js 7.x previously, and node-sass was build on Node.js 7.x version.

So:
```
npm rebuild node-sass
```
It's been solved.