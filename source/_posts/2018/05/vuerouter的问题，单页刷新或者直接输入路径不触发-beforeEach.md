---
title: vuerouter的问题，单页刷新或者直接输入路径不触发 beforeEach
categories: front-end
tags:
  - vue
abbrlink: b79658e7
date: 2018-05-28 15:55:13
---


```js
{
        path: '/course',
        component: Layout,
        redirect: '/course/catalog',
        name: 'Course',
        meta: { title: '课程管理', icon: 'example' },
        children: [{
                path: 'catalog',
                name: 'Catalog',
                component: () =>
                    import ('@/views/course/catalog/index'),
                meta: { title: '课程目录管理' }
            },
            {
                path: 'content',
                name: 'Content',
                component: () =>
                    import ('@/views/course/content/index'),
                meta: { title: '课程内容管理' }
            }
        ]
    },
```
```js
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  console.log(to) //没有执行？？？？？
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})
```

刷新页面（此时路由是 /course/catalog），并没有触发此函数跳转，新开一个页面输入地址也没有触发，（直接显示/course/catalog路由组件的内容）

> 解决方案 ：  查阅了好多资料才发现之前把 router.beforeEach 放在 文件最后了
> 放在 router.start 前面就好了

```js
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  console.log(to)
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
```


