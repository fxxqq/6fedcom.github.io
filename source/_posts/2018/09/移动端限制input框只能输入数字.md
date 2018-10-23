---
title: 移动端限制input框只能输入数字
categories: 前端
issues: 111
tags:
  - html5
description: 在安卓端设置input类型为number，可限制键盘只输入数字，在ios端，要加入pattern验证输入字段的模式，才能限制数字输入
abbrlink: bef00dcb
date: 2018-09-03 16:56:58
---

html5 中，input 的 type 属性规定 input 元素的类型。
```html
<input type="value">
```

有很多选项，详细可以参考[HTML 5 type 属性](http://www.w3school.com.cn/html5/att_input_type.asp)

但是在移动端，还要区分是安卓用户，还是ios用户，所以这样写：

```html
<input class="num_input" type='number' pattern="[0-9]*"/>
```

在安卓端设置input类型为number，可限制键盘只输入数字，在ios端，要加入pattern验证输入字段的模式，才能限制数字输入。

另： `autofocus="autofocus"`可以自动对焦。
