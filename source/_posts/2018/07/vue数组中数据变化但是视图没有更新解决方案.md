---
title: vue数组中数据变化但是视图没有更新解决方案
categories: 前端
tags:
  - vue
abbrlink: d6f8e949
date: 2018-07-11 16:41:15
---

## 数组更新检测
**变异方法**
Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
```js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

你打开控制台，然后用前面例子的 items 数组调用变异方法：<code>example1.items.push({ message: 'Baz' }) </code>。
 

**替换数组**
变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

**注意事项**
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength
举个例子：
```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 <code>vm.items[indexOfItem] = newValue</code> 相同的效果，同时也将触发状态更新：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```
你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：

```js
vm.$set(vm.items, indexOfItem, newValue)
```
为了解决第二类问题，你可以使用 splice：
```js
vm.items.splice(newLength)
```
## 对象更改检测注意事项 
还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```
对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```
你可以添加一个新的 age 属性到嵌套的 userProfile 对象：
```js
Vue.set(vm.userProfile, 'age', 27)
```
你还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：
```js
vm.$set(vm.userProfile, 'age', 27)
```
有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：
```js
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```
你应该这样做：
```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```