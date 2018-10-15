---
title: vue子组件改变父组件数据的方法 emit方法
categories: 前端
date: 2018-07-18 16:45:09
tags: [vue]
---

**场景**：自己封装的插件需要点击子组件的按钮去操作父组件的数据

**方法**
子组件代码
```vue
<template>
    <child @click="close"></child>
</template>
<script>
methods: {
   close() {
        this.$emit('close',true); //触发close方法，true为向父组件传递的数据
    }
}
</script>
```
父组件
```vue
<template>
     <parent @close="toClose"  :msg="msg"></parent> //监听子组件触发的close事件,然后调用toClose方法
     <div>{{ msg }}</div>
</template>
<script>
data () {
    return {
      msg: false,
    }
}，
methods: {
    toClose(msg) {
        this.msg = msg;
    }
}
</script>
```

**拓展：vue emit 有多个参数该如何写**
```vue
this.$emit('transferName', {name: this.name, dev: this.des})
```
父组件
HTML代码
```html
<child @transferName="getNameAndDes"></child>
```
JS代码
```vue
getNameAndDes(msg) {
     this.name = msg.name
     this.dev = msg.dev
}
```