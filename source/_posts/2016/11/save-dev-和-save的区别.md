---
title: save-dev 和--save的区别
categories: front-end
abbrlink: 3c8059e3
date: 2016-11-09 15:29:08
tags: [npm]
---

--save 会把依赖包名称添加到 package.json 文件 dependencies 键下，

devDependencies 下列出的模块，是我们**开发**时用的，比如 我们安装 js的压缩包gulp-uglify 时我们采用的是 “npm install --save-dev gulp-uglify ” 命令安装，因为我们在发布后用不到它，而只是在我们开发才用到它

--save-dev 则添加到 package.json 文件 devDependencies 键

dependencies 下的模块，则是我们**发布后**还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了

