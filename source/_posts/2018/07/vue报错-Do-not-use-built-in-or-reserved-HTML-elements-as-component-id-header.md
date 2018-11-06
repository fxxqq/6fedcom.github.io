---
title: 'vue报错 Do not use built-in or reserved HTML elements as component id:header'
categories: front-end
tags:
  - 踩过的坑
abbrlink: 10409f6e
date: 2018-07-06 13:15:35
---

vue报错 Do not use built-in or reserved HTML elements as component id:header
或者vue报错 Do not use built-in or reserved HTML elements as component id:footer

组件，不能和html标签重复

header组件，h5新标签重复

Do not use built-in or reserved HTML elements as component id:header

![image](https://user-images.githubusercontent.com/22697565/39401471-7ec9d552-4b78-11e8-9524-b9eac189273b.png)


由于在模板需要插入到 DOM 中，所以模板中的标签名必须能够被 DOM 正确地解析。主要有三种情况：

　　　　一是完全不合法的标签名，例如 </>；

　　　　二是与 HTML 元素重名会产生不确定的行为，例如使用 input 做组件名不会解析到自定义组件，使用 button 在 Chrome 上正常但在 IE 上不正常；

　　　　三是与 Vue 保留的 slot、partial、component 重名，因为会优先以本身的意义解析，从而产生非预期的结果。