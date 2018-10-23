---
title: vue路由传参的三种基本方式
categories: 前端
tags:
  - vue
abbrlink: 701e9ca3
date: 2018-08-15 18:31:11
---

现有如下场景，点击父组件的li元素跳转到子组件中，并携带参数，便于子组件获取数据。
父组件中：

```html
<li v-for="article in articles" @click="getDescribe(article.id)">
```

methods：
##### 方案一：
```js
      getDescribe(id) {
//   直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/describe/${id}`,
        })
```

方案一，需要对应路由配置如下：
```js
   {
     path: '/describe/:id',
     name: 'Describe',
     component: Describe
   }
```
很显然，需要在path中添加/:id来对应 $router.push 中path携带的参数。在子组件中可以使用来获取传递的参数值。
```js
$route.params.id
```

##### 方案二：
父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。
```js
this.$router.push({
          name: 'Describe',
          params: {
            id: id
          }
        })
```
对应路由配置: 注意这里不能使用:/id来传递参数了，因为父组件中，已经使用params来携带参数了。
```js
   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }
```
子组件中: 这样来获取参数
```js
$route.params.id
```
方案三：
父组件：使用path来匹配路由，然后通过query来传递参数
这种情况下 query传递的参数会显示在url后面?id=？
```js
    this.$router.push({
          path: '/describe',
          query: {
            id: id
          }
        })
```
对应路由配置：
```js
   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }
```
对应子组件: 这样来获取参数
```js
$route.query.id
```
> **这里要特别注意 在子组件中 获取参数的时候是$route.params 而不是$router 这很重要~~~** 