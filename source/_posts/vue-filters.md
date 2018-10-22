---
title: vue过滤器（八）
date: 2018-08-27 10:20:32
tags: Vue
categories: Front-End
---

## 一、全局过滤器

```javascript
// 第一个参数表示：过滤器的名称
// 第二个参数表示：函数，使用过滤器的时候，这个函数中的代码会被执行
Vue.filter('filterName', function (value) {
  // value 表示要过滤的内容
})
```

**例子**

```javascript
Vue.filter('date', function (input, format = 'yyyy-MM-dd hh:mm:ss'）{
      var o = {
        "M+": input.getMonth() + 1, //月份 
        "d+": input.getDate(), //日 
        "h+": input.getHours(), //小时 
        "m+": input.getMinutes(), //分 
        "s+": input.getSeconds(), //秒 
        "q+": Math.floor((input.getMonth() + 3) / 3), //季度 
        "S": input.getMilliseconds() //毫秒 
      };

      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (input.getFullYear() + "").substr(4 - RegExp.$1.length));
      // 不够2位的前面补0
      for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) 
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return format;
    })
```

使用

```html
<h1>{{item.time | date('yyyy-MM-dd hh:mm:ss')}}</h1>
```

> 一个项目中，可能要用到很多过滤器来处理数据，多个组件公用的，可以注册全局过滤器。单个组件使用的，就挂载到实例`filters`中。项目做的多了以后，可以整理一套常用的`filters`，不用反复的写。比如：时间等各种操作，数据格式转化，单位换算，部分数据的`md5`加密等…

**创建一个filters专门放各种过滤器**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-0bab828b656d1753.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> filter.js

![image.png](https://upload-images.jianshu.io/upload_images/1480597-2fd4231409acdea4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>  main.js

![image.png](https://upload-images.jianshu.io/upload_images/1480597-631dabdbf85a1bd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 页面上直接用 ’｜过滤器名‘ 即可

![image.png](https://upload-images.jianshu.io/upload_images/1480597-0941a212212fa3aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 或者直接在`main.js`中直接自定义全局过滤器


![image.png](https://upload-images.jianshu.io/upload_images/1480597-0efefc41d3b8e530.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 二、局部过滤器

> 在某一个vue实例的内创建的，只在当前实例中起作用

```javascript
new Vue({
  data:{
      
  },
   // 通过 filters 属性创建局部过滤器
   // 注意：此处为 filters
  filters: {
    filterName: function(value, format) {}
  }
})
```
