---
title: 输入框input类型为number时，去掉上下箭头样式
categories: 前端
date: 2018-10-22 16:57:28
tags: [html5]
---

```html
<input type="number" ...>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
```