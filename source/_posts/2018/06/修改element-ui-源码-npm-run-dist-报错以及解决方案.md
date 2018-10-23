---
title: 修改element ui 源码 npm run dist 报错以及解决方案
categories: 前端
tags:
  - npm
  - elementUI
  - vue
abbrlink: 47bf543f
date: 2018-06-25 16:36:54
---
报错
```jsx
D:\astudy\element-dev\packages\theme-chalk\src\fonts\element-icons.ttf
  1:1  error  Parsing error: Unexpected character ''

D:\astudy\element-dev\packages\theme-chalk\src\fonts\element-icons.woff
  1:5  error  Parsing error: Unexpected character ''

✖ 2 problems (2 errors, 0 warnings)

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! element-ui@2.4.1 lint: `eslint src/**/* test/**/* packages/**/* build/**/* --quiet`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the element-ui@2.4.1 lint script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\terry.wt\AppData\Roaming\npm-cache\_logs\2018-06-25T06_12_46_026Z-debug.log
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! element-ui@2.4.1 dist: `npm run clean && npm run build:file && npm run lint && webpack --config build/webpack.conf.js && webpack --config build/webpack.common.js && webpack --config build/webpack.component.js
&& npm run build:utils && npm run build:umd && npm run build:theme`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the element-ui@2.4.1 dist script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\terry.wt\AppData\Roaming\npm-cache\_logs\2018-06-25T06_12_46_124Z-debug.log
```

报错是因为eslint检测出空格导致的，网上找了很多在webpack配置关闭eslint的方法不生效

修改方案 找到package.json文件
找到script里面的dist方法，删除&&npm run lint方法 就可以了