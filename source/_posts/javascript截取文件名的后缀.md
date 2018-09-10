---
title: javascript截取文件名的后缀
date: 2018-09-06 19:22:37
categories: "前端" 
issues: 112
tags: [js代码片段]
---

```js
const fileName="text.png";

//带.的格式
let fileFormat=fileName.substring(fileName.lastIndexOf('.'))

// 不带.的格式
let fileFormat2=fileName.substring(fileName.lastIndexOf('.')+1);
console.log(fileFormat,fileFormat2)
```
![image](https://user-images.githubusercontent.com/22697565/45154907-b8d2b080-b20b-11e8-944d-3adde64b69dd.png)



