---
title: vue组件之间传值
categories: front-end
tags:
  - vue
abbrlink: 8b0c3b50
date: 2018-11-09 15:25:13
---

vue2.0组件之间的传值

“down”—>指的是下的意思，即父组件向子组件传值，用props；“up”—>指的是上的意思，即子组件想父组件传值，用emit。

### 1.子组件向父组件的传值：

*Child.vue*
```vue
<template>
  <div class="child">
    <h1>子组件</h1>
    <button v-on:click="childToParent">想父组件传值</button>
  </div>
</template>
<script>
  export default{
    name: 'child',
    data(){
      return {}
    },
    methods: {
      childToParent(){
        this.$emit("childToParentMsg", "子组件向父组件传值");
      }
    }
  }
</script>
```

*parent.vue*
```vue
<template>
  <div class="parent">
    <h1>父组件</h1>
    <Child v-on:childToParentMsg="showChildToParentMsg" ></Child>
  </div>
</template>
<script>
  import Child from './child/Child.vue'
  export default{
      name:"parent",
    data(){
      return {
      }
    },
    methods: {
      showChildToParentMsg:function(data){
        alert("父组件显示信息："+data)
      }
    },
    components: {Child}
  }
</script>
```

### 2.父组件向子组件传值

*parent.vue*

```vue
<template>
  <div class="parent">
    <h1>父组件</h1>
    <Child v-bind:parentToChild="parentMsg"></Child>
  </div>
</template>
<script>
  import Child from './child/Child.vue'
  export default{
     name:"parent",
    data(){
      return {
        parentMsg:'父组件向子组件传值'
      }
    },
    components: {Child}
  }
</script>
```

*child.vue*

```vue
<template>
  <div class="child">
    <h1>子组件</h1>
    <span>子组件显示信息：{{parentToChild}}</span><br>
  </div>
</template>
<script>
  export default{
    name: 'child',
    data(){
      return {}
    },
    props:["parentToChild"]
  }
</script>
```

### 3.采用eventBus.js传值---兄弟组件间的传值

*eventBus.js*
```js
import Vue from 'Vue'

export default new Vue()
```
*App.vue*
```vue
<template>
  <div id="app">
    <secondChild></secondChild>
    <firstChild></firstChild>
  </div>
</template>

<script>
import FirstChild from './components/FirstChild'
import SecondChild from './components/SecondChild'

export default {
  name: 'app',
  components: {
    FirstChild,
    SecondChild,
  }
}
</script>
```

*FirstChild.vue*
```vue
<template>
  <div class="firstChild">
    <input type="text" placeholder="请输入文字" v-model="message">
    <button @click="showMessage">向组件传值</button>
    <br>
    <span>{{message}}</span>
  </div>
</template>
<script>
  import bus from '../assets/eventBus';
  export default{
    name: 'firstChild',
    data () {
      return {
        message: '你好'
      }
    },
    methods: {
      showMessage () {
       alert(this.message)
        bus.$emit('userDefinedEvent', this.message);//传值
      }
    }
  }
</script>
 ```

*SecondChild.vue*
```vue
<template>
    <div id="SecondChild">
        <h1>{{message}}</h1>
    </div>
</template>
<script>
    import bus from '../assets/eventBus';
    export default{
        name:'SecondChild',
        data(){
            return {
                message: ''
            }
        },
        mounted(){
            var self = this;
            bus.$on('userDefinedEvent',function(message){
                self.message = message;//接值
            });
        }
    }
</script>
```