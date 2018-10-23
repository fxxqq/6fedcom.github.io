---
title: lazyload页面中间有滚动条，滑动鼠标无法触发图片预加载
categories: 前端
tags:
  - jQuery
abbrlink: 79c56a00
date: 2018-03-22 16:55:50
---

图片在容器里面你可以将插件用在可滚动容器的图片上, 例如带滚动条的 DIV 元素. 你要做的只是将容器定义为 jQuery 对象并作为参数传到初始化方法里面.
css代码
```css
# container {
	height: 600px;
	overflow: scroll;
}
```
Javascript代码
```js
$("img").lazyload({
	placeholder: "img/grey.gif",
	container: $("#container")
});
```