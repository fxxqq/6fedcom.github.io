---
layout:     post
title:      "javascript Deep Copy"
subtitle:   "javascript深度拷贝对象"
tags:
   - javascript
---
#javascript深度拷贝对象
在代码复用模式里面有一种叫做“复制属性模式”（copying properties pattern）。谈到代码复用的时候，很有可能想到的是代码的继承性（inheritance）,但重要的是要记住其最终目标——我们要复用代码。继承性只是实现代码复用的一种手段，而不是唯一的方法。复制属性也是一种复用模式，它跟继承性是有所不同的。这种模式中，对象将从另外一个在对象中获取成员，其方法是仅需将其复制即可。用过jQuery的都知道，它有一个$.extend()方法，它的用途除了扩展第三方插件之外，还可以用来复制属性的。

```
function extend(parent, child) {
var i;
//如果不传入第二参数child
//那么就创建一个新的对象
child = child || {};
//遍历parent对象的所有属性
//并且过滤原型上的属性
//然后将自身属性复制到child对象上
for(i in parent) {
if(parent.hasOwnProperty(i)) {
child[i] = parent[i];
}
}
//返回目标对象child
return child;
}
```
上面的代码是一个简单的实现，它仅遍历父对象的成员并将其复制到子对象中去。下面我们用上面的extend()方法来测试一下：

```
var dad = {name: "Adam"};
var kid = extend(dad);
console.log(kid.name); //Adam
```
我们发现，extend()方法已经可以正常工作了。但是有一个问题，上面给出的是一种所谓的浅复制（shallow clone）。在使用浅复制的时候，如果改变了子对象的属性，并且该属性恰好又是一个对象，那么这种操作也会修改父对象，单是很多情况这不是我们想要的结果。考虑下列情况：

```
var dad = {
counts: [1, 2, 3],
reads: {paper: true}
};
var kid = extend(dad) //调用extend()方法将dad的属性复制到kid上面
kid.counts.push(4); //把4追加到kid.counts数组里面
console.log(dad.counts); //[1, 2, 3, 4]
```
通过上面的例子，我们会发现，修改了kid.counts属性以后（把元素4追加进去了），dad.counts也会受到影响。这是因为在使用浅复制的时候，由于对象是通过引用传递的，即kid.counts和dad.counts指向的是同一个数组（或者说在内存上他们指向同一个堆的地址）。
下面，让我们修改extend()函数以实现深度复制。我们需要做的事情就是检查父对象的每一个属性，如果该属性恰好是对象的话，那么就递归复制出该对象的属性。另外，还需要检测该对象是否为一个数组，这是因为数组的字面量创建方式和对象的字面量创建方式不一样，前者是[]，后者是{}。检测数组可以使用Object.prototype.toString()方法进行检测，如果是数组的话，他会返回"[object Array]"。下面我们来看一下深度复制版本的extend()函数：

```
function extendDeep(parent, child) {
child = child || {};
for(var i in parent) {
if(parent.hasOwnProperty(i)) {
//检测当前属性是否为对象
if(typeof parent[i] === "object") {
//如果当前属性为对象，还要检测它是否为数组
//这是因为数组的字面量表示和对象的字面量表示不同
//前者是[],而后者是{}
child[i] = (Object.prototype.toString.call(parent[i]) === "[object Array]") ? [] : {};
//递归调用extend
extendDeep(parent[i], child[i]);
} else {
child[i] = parent[i];
}
}
}
return child;
}
```
好了，深度复制的函数已经写好了，下面来测试一下看是否能够预期那样子工作，即是否可以实现深度复制：

```
var dad = {
counts: [1, 2, 3],
reads: {paper: true}
};
var kid = extendDeep(dad);
//修改kid的counts属性和reads属性
kid.counts.push(4);
kid.reads.paper = false;
console.log(kid.counts); //[1, 2, 3, 4]
console.log(kid.reads.paper); //false
console.log(dad.counts); //[1, 2, 3]
console.log(dad.reads.paper); //true
```
通过上面例子，我们可以发现，即使修改了子对象的kid.counts和kid.reads，父对象的dad.counts和kid.reads并没有改变，因此我们的目的实现了。

**下面来总结一下实现深复制的的基本思路：**
1.检测当前属性是否为对象
2.因为数组是特殊的对象，所以，在属性为对象的前提下还需要检测它是否为数组。
3.如果是数组，则创建一个[]空数组，否则，创建一个{}空对象，并赋值给子对象的当前属性。然后，递归调用extendDeep函数。
上面例子使我们自己使用递归算法实现的一种深度复制方法。事实上，ES5新增的JSON对象提供的两个方法也可以实现深度复制，分别是JSON.stringify()和JSON.parse();前者用来将对象转成字符串，后者则把字符串转换成对象。下面我们使用该方法来实现一个深度复制的函数：

```
function extendDeep(parent, child) {
var i,
proxy;
proxy = JSON.stringify(parent); //把parent对象转换成字符串
proxy = JSON.parse(proxy) //把字符串转换成对象，这是parent的一个副本
child = child || {};
for(i in proxy) {
if(proxy.hasOwnProperty(i)) {
child[i] = proxy[i];
}
}
proxy = null; //因为proxy是中间对象，可以将它回收掉
return child;
}
```
下面是测试例子：

```
var dad = {
counts: [1, 2, 3],
reads: {paper: true}
};
var kid = extendDeep(dad);
//修改kid的counts属性和reads属性
kid.counts.push(4);
kid.reads.paper = false;
console.log(kid.counts); //[1, 2, 3, 4]
console.log(kid.reads.paper); //false
console.log(dad.counts); //[1, 2, 3]
console.log(dad.reads.paper); //true
```
测试发现，它也实现了深度复制。一般推荐使用后面这种方法，因为JSON.parse和JSON.stringify是内置函数，处理起来会比较快。另外，前面的那种方法使用了递归调用，我们都知道，递归是效率比较低的一种算法。
