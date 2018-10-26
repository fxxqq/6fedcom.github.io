---
title: vuex学习笔记
categories: 前端
tags:  [Vuex]
abbrlink: caef00ab
date: 2018-10-17 17:25:59
---


>组件是Vue最强大的功能之一，而组件实例的作用域是相互独立的，意味着不同组件之间的数据是无法相互使用。组件间如何传递数据就显得至关重要，这篇文章主要是介绍Vuex。尽量以通俗易懂的实例讲述这其中的差别，希望对小伙伴有些许帮助。

### 一、Vuex 是什么？
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### 二、什么是“状态管理模式”？
一个简单的 Vue 计数应用开始：
```js
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```
这个状态自管理应用包含以下几个部分：

`state`，驱动应用的数据源；
`view`，以声明方式将 `state` 映射到视图；
`actions`，响应在 `view` 上的用户输入导致的状态变化。
![111](https://user-images.githubusercontent.com/22697565/47031776-3a224900-d1a3-11e8-8d97-a75b1f522555.png)
`state` 的数据会在 `view` 上显示出来，用户会根据 `view` 上的内容进行操作，从而触发 `actions`，接着再去影响 `state`（vue 是单向数据流的方式驱动的）。

当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏。下面的图，是把组件的共享状态抽取出来，以一个全局单例模式管理。

![222](https://user-images.githubusercontent.com/22697565/47031803-4908fb80-d1a3-11e8-9237-a76a2eb199b4.png)


### 三、核心概念
###### 1. state
`state`：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取。
```js
  <div>
    {{ $store.state.count }}
  </div>
   console.log(this.$store.state.count)
```
###### 2. getters
`getters`：Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。（getters从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工。getters就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。）

定义getter：
```js
  getters: {
    done(state) {    
      return state.count + 1;
    },
  }
```
###### 3. mutations
`mutations`：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
组件通过commit提交mutations的方式来请求改变state
```js
this.$store.commit('increment')
```
提交载荷（Payload）
mutations方法中是可以传参的，具体用法如下：
```js
  mutations: {
    // 提交载荷 Payload
    add(state, n) {
      state.count += n
    }
  },
this.$store.commit('add', 10)
```
######　4.Action
`Action`：类似于 `mutation`，不同在于Action 提交的是 `mutation`，而不是直接变更状态；`Action` 可以包含任意异步操作。
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```
不同于`mutations`使用`commit`方法，`actions`使用`dispatch`方法。
```js
this.$store.dispatch('incrementAsync')
```
context
context是与 store 实例具有相同方法和属性的对象。可以通过context.state和context.getters来获取 state 和 getters。
以载荷形式分发
```js
incrementAsyncWithValue (context, value) {
  setTimeout(() => {
    context.commit('add', value)
  }, 1000)
}
this.$store.dispatch('incrementAsyncWithValue', 5)
```
###### 5.Module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
模块的局部状态
对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },    
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```
Vuex计数器的例子：
在src目录下创建一个store文件夹。

store/store.js
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    show: ''
  },
  getters: {
    counts: (state) => {
      return state.count
    }
  },
  mutations: {
    increment: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    },
    changVal: (state, v) => {
      state.show = v
    }
  }
})
export default store
```
state就是我们的需要的状态，状态的改变只能通过提交mutations,例如：
```js
increase() {
      this.$store.commit('increment')
    }
```

带有载荷的提交方式：
```js
changObj () {
      this.$store.commit('changVal', this.obj)
}
```
载荷也可以是一个对象，这样可以提交多个参数。
```js
changObj () {
      this.$store.commit('changVal', {
          key:''
      })
}
```
在main.js中引入store.js
```js
import store from './store/store'
export default new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
```
在组件中使用
在组建可以通过$store.state.count获得状态
更改状态只能以提交mutation的方式。
```html
<div class="store">
  <p>
    {{$store.state.count}}
  </p>
  <button @click="increase"><strong>+</strong></button>
  <button @click="decrease"><strong>-</strong></button>
  <hr>
  <h3>{{$store.state.show}}</h3>
  <input
    placeholder="请输入内容"
    v-model="obj"
    @change="changObj"
    clearable>
  </input>
</div>
</template>
<script>
export default {
  data () {
    return {
      obj: ''
    }
  },
  methods: {
    increase() {
      this.$store.commit('increment')
    },
    decrease() {
      this.$store.commit('decrement')
    },
    changObj () {
      this.$store.commit('changVal', this.obj)
    }
  }
}
</script>
```