---
title: '[react]-动态添加class'
categories: 前端
tags:
  - React
abbrlink: 76ba0f83
date: 2018-06-17 19:09:19
---

```jsx
<li className={['mingxi-tit-one', this.state.buttonType === 1 
&& 'mingxi-active'].join(' ')}></li>
// 数组元素为className，
// && 符号为判断符，若条件成立则执行后面的内容
// join为数组的方法，将数组元素拼接为字符串，链接符为一个空字符串
```