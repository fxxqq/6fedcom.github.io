---
title: vue生命周期和react生命周期对比
categories: front-end
tags:
  - vue
  - react
abbrlink: 73225ea8
date: 2018-10-27 17:29:11
---

react和vue的业务逻辑是差不多，vue在react上封装了更简洁的方法，使用起来更加的便捷，如：提供了便捷的指令（v-for,v-if,v-model），还提供了更多的属性（computed,watch），我还是比较喜欢用react的，更接近js原生，更容易于理解它。

# vue的生命周期
### 一 如下图所示(很清晰)初始化、编译、更新、销毁
 
![vue生命周期](https://cdn.ru23.com/img/2018/10/vue-life-cycle.png)
 

### 二 vue生命周期的栗子

 注意触发vue的created事件以后,this便指向vue实例,这点很重要
```js
var myVue = new Vue({
	el: ".test",
	data: {
		a: "我是内容,在控制台输入myVue.a=123456,可以改变我的值"
	},
	created: function() {
		//在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。
		//但是还没有开始 dom 编译，$el 还不存在,但是实例存在,即this.a存在,可打印出来 。
		console.log("建立");
	},
	beforeCompile: function() {
		console.log("未开始编译");
	},
	compiled: function() {
		//在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 dom 更新。但是不担保 $el 已插入文档。
		console.log("编译完成");
	},
	ready: function() {
		//在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
		console.log("一切准备好了");
	},
	attached: function() { //myVue.$appendTo(".test2")暂时触发不了,不知道怎么解决
		//在 vm.$el 插入 dom 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。
		console.log("插入dom成功");
	},
	detached: function() { //触发事件 myVue.$destroy(true),其中参数true控制是否删除dom节点或者myVue.$remove()
		//在 vm.$el 从 dom 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。
		console.log("删除dom成功");
	},
	beforeDestroy: function() { //触发方式,在console里面打myVue.$destroy();
		//在开始销毁实例时调用。此时实例仍然有功能。
		console.log("销毁前");
	},
	destroyed: function() { //触发方式,在console里面打myVue.$destroy();其中myVue.$destroy(true)是删除dom节点,会触发detached函数,但是实例仍然存在
		//在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
		console.log("已销毁");
	}
});
```

#  react生命周期

### React 生命周期分为三种状态 1. 初始化 2.更新 3.销毁
![React生命周期](https://cdn.ru23.com/img/2018/10/react-life-cycle.jpg)


•初始化

1、`getDefaultProps()`
设置默认的props，也可以用ufaultProps设置组件的默认属性.

2、`getInitialState()`
在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props

3、`componentWillMount()`
组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

4、 `render()`
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

5、`componentDidMount()`
组件渲染之后调用，只调用一次。

•更新

6、`componentWillReceiveProps(nextProps)`
组件初始化时不调用，组件接受新的props时调用。

7、`shouldComponentUpdate(nextProps, nextState)`
react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候

8、`componentWillUpdata(nextProps, nextState)`
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

9、`render()`
组件渲染

10、`componentDidUpdate()`
组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

•卸载

11、`componentWillUnmount()`

组件将要卸载时调用，一些事件监听和定时器需要在此时清除。