---
title: vue.js 兄弟组件传值
categories: front-end
tags:
  - vue
abbrlink: '83060485'
date: 2018-11-09 15:20:45
---

1、兄弟之间传递数据需要借助于事件车，通过事件车的方式传递数据

2、创建一个Vue的实例，让各个兄弟共用同一个事件机制。

3、传递数据方，通过一个事件触发bus.$emit(方法名，传递的数据)。

4、接收数据方，通过mounted(){}触发bus.$on(方法名，function(接收数据的参数){用该组件的数据接收传递过来的数据})，此时函数中的this已经发生了改变，可以使用箭头函数。

源码：

我们可以创建一个单独的js文件**eventVue.js,**内容如下
```js
import Vue from 'vue'
export default new Vue
```
假如父组件如下：
```vue
<template>
     <components-a></components-a>
     <components-b></components-b>
</template>
```
**组件a**
```vue
<template>
      <div class="components-a">
           <button @click="abtn">A按钮</button>
      </div>
</template>
<script>
import eventVue from '../../js/event.js'
export default {
    ...
      methods:{
           abtn:function(){
                   eventVue .$emit("myFun","组件A的值")   //$emit这个方法会触发一个事件
           }
      }
}
</script>
```
**组件b**
```html
<template>
     <div class="components-a">
         <div>{{btext}}</div>
     </div>
</template>
<script>
import eventVue from '../../js/event.js'
export default {
    ....
   created:function(){
       this.bbtn();
   },
   methods:{
       bbtn:function(){
            eventVue .$on("myFun",(message)=>{   //这里最好用箭头函数，不然this指向有问题
                 this.btext = message      
            })
       }
    }
}
</script>
```
