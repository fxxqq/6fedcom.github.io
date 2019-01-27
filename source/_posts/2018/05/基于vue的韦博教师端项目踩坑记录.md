---
title: 基于vue的韦博教师端项目踩坑记录
categories: front-end
tags:
  - Vue
  - vuex
abbrlink: cd9fe451
date: 2018-05-26 15:51:09
---

### 1.vue的生命周期
- 详细讲解：[https://segmentfault.com/a/1190000011381906](https://segmentfault.com/a/1190000011381906)
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

### 2.axios
>  封装方法详见api文件，使用方法如下：
```js
beforeMount(){
	this.loading2 = true;
	let that = this;
	let params = {
		api:"/getdbdata2",
		param:"exec xFool_p_getapp '',1"
	};
	api.get(params)
		.then(function(res){
			console.log(JSON.parse(res.data))
			that.tableData = JSON.parse(res.data).data;
			that.loading2 = false;
		})
		.catch(function(err){
			console.log(err);
			that.loading2 = false;
			api.reqFail(that,"获取列表失败请刷新");
		});
},
```

### 3.vue 全局公用函数

如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上。

**注册**
main.js 中
```js
Vue.prototype.$method = function () {}
```
>  一般建议函数名使用 $ 前缀。像 vue-router 的 $route 和 $router。

**使用**

那么组件代码里
```js
export default {
  created () {
    this.$method()
  }
}
```
**说明**
挂载到 prototype 上是为了方便组件内直接用 this.$method 来使用，你也可以直接用 Vue.method，这样同样可以全局使用，不过在组件内就需要再 import 一次 Vue 了。

### 4.重写console.log 实现自己的逻辑

>  重写console.log 实现自己的逻辑
>  可以通过如下代码重写console.log

```js
console.log = (function(oriLogFunc){
    return function(str)
    {
        oriLogFunc.call(console,"hello:"+str);
    }
})(console.log);
console.log("userName");
```

### 5.使用vue-router设置每个页面的title
**进入 router 文件夹底下的index.js文件**

**首先引入：**
```js
import Vue from 'vue'
import Router from 'vue-router'
```

**然后在路由里面配置每个路由的地址：**
```js
  routes: [
    {          /* （首页）默认路由地址 */
      path: '/',
      name: 'Entrance',
      component: Entrance,
      meta: {
        title: '首页入口'
      }
    },
    {          /* 修改昵称 */
      path: '/modifyName/:nickName',
      name: 'modifyName',
      component: modifyName,
      meta: {
        title: '修改昵称'
      }
    },
    {          /* 商品详情 */
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail,
      meta: {
        title: '商品详情'
      }
    },
    { /* Not Found 路由，必须是最后一个路由 */
      path: '*',
      component: NotFound,
      meta: {
        title: '找不到页面'
      }
    }
  ]
```
**在每一个meta里面设置页面的title名字，最后在遍历**
```js
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
```

### 6.密码加密逻辑
登录密码加密规则：首先把js sha512把原密码加密，然后在加密后的密码后面加上当前服务器时间（格式为：YYYY-MM-DD），
最后把加密后的密码加服务器时间再次进行一次sha512加密
```
npm install js-sha512 --save
```

```js
sha512('password'+YYYY-MM-DD);
```

### 7.webpack解决开发环境的跨域问题
```js
    devServer: {
        proxy: {
            '/api/teacherCenter*': {
                target: 'http://192.168.250.241:8764',
                secure: false
            }
        },
        disableHostCheck: true
	},
```

### 8.弹窗组件文档
- [详细讲解](https://sweetalert.js.org)

### 9.nginx如何正确配置部署在子目录的vue项目

**nginx配置文件**

```
location /teacher/ {
    index  index.html index.htm index.php;
    try_files $uri $uri/ /teacher/index.html;
}
```

**vue路由配置**

```js
 routes: [{
 	path: '/teacher/login',
 	name: 'Login',
 	component: Login,
 	meta: {
 		title: '教师端登录中心'
 	}
 }, {
 	path: '/teacher/courseCenter',
 	name: 'CourseCenter',
 	component: CourseCenter,
 	meta: {
 		title: 'CourseCenter'
 	}
 }]
 ```

 ### 10.vue 哪个生命周期进行数据请求
 不考虑服务器端渲染，一般选在 mounted 周期内请求数据，因为这个周期开始时，当前组件已经被挂载到真实的元素上了。
 如果要进行服务器渲染，则在created周期内
 
