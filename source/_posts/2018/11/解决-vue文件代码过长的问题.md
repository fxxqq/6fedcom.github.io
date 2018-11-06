---
title: 解决.vue文件代码过长的问题
categories: front-end
tags:
  - vue
  - 前端优化
abbrlink: 511d4361
date: 2018-11-06 14:04:11
---

在工作中，用vue进行开发的，后来发现.vue文件中的逻辑处理特别多的话，那么会导致代码会特别长，即使你打了标签，都觉得写起来很不方便，所以就引发了我的思考，能不能把js和scss单独拎出去，vue文件只是负责写html的，后来我就在网上一顿查啊，终于，功夫不负有心人，让我给查到了，下面我就给大家演示一下把vue文件的html、scss、js如何分开写：

首先先在vue统计目录下新建一个js、scss文件，如下图所示，名字无所谓，你叫index.js和index.scss都行
然后在vue文件中这样写
```vue
<template>
    <div class = "loginModuel">

    </div>
</template>

<script>
    import index from "./index"
    export default{
        ...index
    }
</script>
<style lang = "scss" scoped>
    @import "./index.scss";
</style>
```

index.js
```js
export default{
    data(){
        return{
            msg:"这是登录页面"
        }
    }
}
```
棒极了
