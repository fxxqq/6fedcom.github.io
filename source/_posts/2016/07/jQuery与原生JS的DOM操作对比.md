---
title: jquery与原生JS的dom操作对比
tags:
  - jquery
  - javascript
categories: front-end
abbrlink: 99d7d7a9
date: 2016-07-27 13:50:20
---



### 1. 创建元素节点

- 原生JS创建元素节点: `document.createElement("p");`
- jquery创建元素节点：`$('<p></p>');`
<!--more-->
### 2. 创建并添加文本节点:

- 原生JS创建文本节点：`document.createTextnode("Text Content");`
- 通常创建文本节点和创建元素节点配合使用，比如：
```js
var textEl = document.createTextnode("Hello World.");
var pEl = document.createElement("p");
pEl.appendChild(textEl);
```

- jquery创建并添加文本节点：`var $p = $('<p>Hello World.</p>');`

### 3. 复制节点

- 原生JS复制节点: `var newEl = pEl.clonenode(true);  `
	- `true`和`false`的区别：
        - `true` ：克隆整个`'<p>Hello World.</p>'`节点
        - `false`：只克隆`'<p></p>' `，不克隆文本`'Hello World.'`

- `jquery`复制节点：`$newEl = $('#pEl').clone(true);`

**注意：**克隆节点要避免`ID`重复

### 4. 插入节点

- 原生JS向子节点列表的末尾添加新的子节点：
`El.appendChild(newnode);`
- 原生JS在节点的已有子节点之前插入一个新的子节点：
`El.insertBefore(newnode, targetnode);`

- 在jquery中，插入节点的方法比原生JS多的多：
  - `$('#El').append('<p>Hello World.</p>');`		     在匹配元素子节点列表结尾添加内容
  - `$('<p>Hello World.</p>').appendTo('#El');  `   	 把匹配元素添加到目标元素子节点列表结尾
  - `$('#El').prepend('<p>Hello World.</p>');	`	 在匹配元素子节点列表开头添加内容
  - `$('<p>Hello World.</p>').prependTo('#El');   `  把匹配元素添加到目标元素子节点列表开头
  - `$('#El').before('<p>Hello World.</p>');	`	     在匹配元素之前添加目标内容
  - `$('<p>Hello World.</p>').insertBefore('#El');` 	  把匹配元素添加到目标元素之前
  - `$('#El').after('<p>Hello World.</p>');	`	      在匹配元素之后添加目标内容
  - `$('<p>Hello World.</p>').insertAfter('#El');	`  	  把匹配元素添加到目标元素之后

### 5. 删除节点

- 原生JS删除节点: `El.parentnode.removeChild(El);`
- jquery删除节点:` $('#El').remove();`

### 6. 替换节点

- 原生JS替换节点: `El.repalceChild(newnode, oldnode);`
注意：`oldnode`必须是`parentEl`真实存在的一个子节点

- jquery替换节点:` $('p').replaceWith('<p>Hello World.</p>');`

### 7. 设置属性/获取属性

- 原生JS设置属性/获取属性:
   - `imgEl.setAttribute("title", "logo");`
   - `imgEl.getAttribute("title");`
   - `checkboxEl.checked = true;`
   - `checkboxEl.checked;`

- jquery设置属性/获取属性:

   -` $("#logo").attr({"title": "logo"});`
   - `$("#logo").attr("title");`
   - `$("#checkbox").prop({"checked": true});`
   - `$("#checkbox").prop("checked");`
