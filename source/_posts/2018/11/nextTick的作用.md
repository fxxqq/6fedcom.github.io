---
title: $nextTick的作用
categories: front-end
tags:
  - vue
abbrlink: 891492f1
date: 2018-11-09 15:23:02
---

请看如下一段代码：
```js
new Vue({
  el: '#app',
  data: {
    list: []
  },
  mounted: function () {
    this.get()
  },
  methods: {
    get: function () {
      this.$http.get('/api/article').then(function (res) {
        this.list = res.data.data.list
        // ref  list 引用了ul元素，我想把第一个li颜色变为红色
        this.$refs.list.getElementsByTagName('li')[0].style.color = 'red'
      })
    },
  }
})
```
在获取到数据后赋值给数据模型中list属性，然后想引用ul元素找到第一个li把它的颜色变为红色，但是事实上，这个要报错了，我们知道，在执行这句话时，ul下面并没有li，也就是说刚刚进行的赋值操作，当前并没有引起视图层的更新。因此，在这样的情况下，vue给我们提供了$nextTick方法，如果我们想对未来更新后的视图进行操作，我们只需要把要执行的函数传递给this.$nextTick方法，vue就会给我们做这个工作。

```js
 that.$nextTick(function() {
      this.$http.get("/api/article").then(function(res) {
          this.list = res.data.data.list;
            // ref  list 引用了ul元素，我想把第一个li颜色变为红色
             this.$refs.list.getElementsByTagName("li")[0].style.color ="red";
        });
});
```
>   这就是一个this.$nextTick的实现，其中利用了优雅降序的巧妙手法，使代码尽可能优化。而且还提供了promise的写法，虽然我们不经常用，但是有总比没有好。