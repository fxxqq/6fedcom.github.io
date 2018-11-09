---
title: html5 Drop 事件详解（摘自w3school）
tags:
  - html5
abbrlink: '40559693'
date: 2018-11-09 15:22:12
---

### 设置元素为可拖放
首先，为了使元素可拖动，把 draggable 属性设置为 true ：
```html
<img draggable="true">
```

### 拖动什么 - ondragstart 和 setData()
然后，规定当元素被拖动时，会发生什么。
在上面的例子中，ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。
dataTransfer.setData() 方法设置被拖数据的数据类型和值：
```js
function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
}
```
在这个例子中，数据类型是 "Text"，值是可拖动元素的 id ("drag1")。

### 放到何处 - ondragover
ondragover 事件规定在何处放置被拖动的数据。
默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
这要通过调用 ondragover 事件的 event.preventDefault() 方法：
```js
event.preventDefault()
```

### 进行放置 - ondrop
当放置被拖数据时，会发生 drop 事件。
在上面的例子中，ondrop 属性调用了一个函数，drop(event)：
```js
function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("Text");
	ev.target.appendChild(document.getElementById(data));
}
```

**代码解释：**
1. 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
2. 通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
3. 被拖数据是被拖元素的 id ("drag1")
4. 把被拖元素追加到放置元素（目标元素）中