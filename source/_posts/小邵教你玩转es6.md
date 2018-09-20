---
title: ES6学习笔记
categories: "好文分享" #文章分類目錄 可以省略,
date: 2018-09-07 10:57:11
tags: [优质文章分享]
---


前言：大家好，我叫邵威儒，大家都喜欢喊我小邵，学的金融专业却凭借兴趣爱好入了程序猿的坑，从大学买的第一本vb和自学vb，我就与编程结下不解之缘，随后自学易语言写游戏辅助、交易软件，至今进入了前端领域，看到不少朋友都写文章分享，自己也弄一个玩玩，以下文章纯属个人理解，便于记录学习，肯定有理解错误或理解不到位的地方，意在站在前辈的肩膀，分享个人对技术的通俗理解，共同成长！

> 后续我会陆陆续续更新javascript方面，尽量把javascript这个学习路径体系都写一下  
> 包括前端所常用的es6、angular、react、vue、nodejs、koa、express、公众号等等  
> 都会从浅到深，从入门开始逐步写，希望能让大家有所收获，也希望大家关注我~

> 文章列表：https://juejin.im/user/5a84f871f265da4e82634f2d/posts

> Author: 邵威儒  
> Email: 166661688@qq.com  
> Wechat: 166661688  
> github: https://github.com/iamswr/

***

接下来我主要给大家讲下我对常用的es6的理解，我们工作当中，其实有很多用不上的，如果想详细了解的话可以看看阮一峰老师的es6：http://es6.ruanyifeng.com/  

这篇文章主要让你学会工作当中常用的es6技巧，以及扩展如实现数据双向绑定，class用es5如何实现、如何给伪数组添加迭代器等等。

***

# var、let、const

```
// 1.var存在变量作用域的提升
console.log(a) // 打印输出 undefined
var a = 1

// 怎么理解作用域的提升呢？
// var str = 'hello swr'
// function(){
//     console.log(str) // 打印输出 undefined
//     var str = 'goodbye swr'
// }
// test()

// 上面这段代码实际上是
var str = 'hello swr'
function(){
    var str
    console.log(str) // 打印输出undefined
                     // 实际上就是var声明的变量，拿到
                     // 当前作用域的最顶层，而此时尚未赋值
                     // 只是声明，所以打印出undefined，而非当运行
                     // 到这段代码时才声明，优先声明，
                     // 当运行到那行的时候，实际上是赋值
                     // 同样的，function xx(){}也存在作用域提升
    str = 'goodbye swr'
}
test()

// var 不存在块级作用域的概念
// 我的理解是在es6之前，是没有块级作用域的概念，
// 变量只有遇到函数的时候才会变为局部变量
{
    var str 1 = 'hello swr'
}

console.log(str1) // 打印输出 hello swr
```

```
// 2.let
// 2.1 不存在变量作用域提升，这样可以避免了我们还没声明变量就拿变量来用
// 2.2 同一作用域的同一个变量不能够重复声明，避免我们重复声明变量
// 2.3 let声明的变量不会到全局上
// 2.4 let和代码块{}结合使用会形成块级作用域

// 2.1
// console.log(a) // 报错，a未声明
// let a = 'hello swr'

// 2.2
// let a = 'hello swr'
// let a = 'hello swr' // 报错，变量被重复声明

// 2.3
// let a = 'hello swr'
// console.log(window.a) // undefined

// 2.4
// 在代码块以外调用str2，会报错
{
    let str2 = 'hello swr'
}

console.log(str2) // 报错，未找到变量

// 上面这种写法，也有点类型es6之前的立即执行函数
(function(){
    var str2 = 'hello swr'
})()

// 一个例子
// 使用var，会发现最终console.log中打印的i都是3
// 因为for循环不是函数，而此时var i是处于全局当中
// for循环是同步代码，所以会执行完同步代码后
// 再执行setTimeout的异步代码，此时i已为3，所以打印出来都是3
for(var i = 0;i < 3;i++){
    setTimeout(function(){
        console.log(i)
    },1000)
}

// 那么我们用let试下
// let和代码块结合起来使用会形成块级作用域
// 那么当for时，这3个setTimeout会分别在3个不同的块级作用域
// 当执行setTimeout的console.log(i)时，会先寻找最近的块级作用域中的i
// 所以会依次打印出0 1 2
for(let j = 0;j < 3;j++){
    setTimeout(function(){
        console.log(i)
    },1000)
}
```

```
// 3.const
// 3.1 const和let基本上可以说是完全一致的，但是const声明的对象不能更改其指向的引用地址（即堆区）


// 3.1
// 当用普通值赋值给const声明的变量后，再重新赋值时
// 值引用会被更改，所以会报错
const STR1 = 'hello swr'
STR1 = 'goodbye swr' // 报错,Assignment to constant variable

// 当我们修改这个引用地址里面的内容时，则不会报错
// 因为这个变量是指向这个引用地址的
const OBJ = {name:"swr"}
OBJ.name = 'hello swr'
console.log(OBJ) // {name:"hello swr"}
// 但是当我们把这个变量重新赋值一个引用地址时，则会报错
OBJ = {} // 报错
```
***
# 解构赋值

解构赋值主要分为对象的解构和数组的解构，在没有解构赋值的时候，我们赋值是这样的
```
let arr = [0,1,2]
let a = arr[0]
let b = arr[1]
let c = arr[2]
```

这样写很繁琐，那么我们有没办法既声明，又赋值，更优雅的写法呢？肯定是有的，那就是解构赋值，解构赋值，简单理解就是等号的左边和右边相等。

### 数组的解构赋值
```
let arr = [0,1,2]
let [a,b,c] = arr
console.log(a) // 0
console.log(b) // 1
console.log(c) // 2
```
但是很多时候，数据并非一一对应的，并且我们希望得到一个默认值
```
let arr = [,1,2]
let [a='我是默认值',b,c] = arr
console.log(a) // '我是默认值'
console.log(b) // 1
console.log(c) // 2
// 从这个例子可以看出，在解构赋值的过程中，a=undefined时，会使用默认值
// 那么当a=null时呢？当a=null时，那么a就不会使用默认值，而是使用null
```
```
// 数组的拼接
let a = [0,1,2]
let b = [3,4,5]
let c = a.concat(b)
console.log(c) // [0,1,2,3,4,5]

let d = [...a,...b]
console.log(d) // [0,1,2,3,4,5]
```
```
// 数组的克隆
// 假如我们简单地把一个数组赋值给另外一个变量
let a = [0,1,2,3]
let b = a
b.push(4)
console.log(a) // [0,1,2,3,4]
console.log(b) // [0,1,2,3,4]
// 因为这只是简单的把引用地址赋值给b，而不是重新开辟一个内存地址，所以
// a和b共享了同一个内存地址，该内存地址的更改，会影响到所有引用该地址的变量
// 那么用下面的方法，把数组进行克隆一份，互不影响

let a = [0,1,2,3]
let b = [...a]
b.push(4)
console.log(a) // [0,1,2,3]
console.log(b) // [0,1,2,3,4]
```

### 对象的解构赋值
对象的解构赋值和数组的解构赋值其实类似，但是数组的数组成员是有序的  
而对象的属性则是无序的，所以对象的解构赋值简单理解是等号的左边和右边的结构相同  
```
let {name,age} = {name:"swr",age:28}
console.log(name) // 'swr'
console.log(age) // 28
```
对象的解构赋值是根据key值进行匹配
```
// 这里可以看出，左侧的name和右侧的name，是互相匹配的key值
// 而左侧的name匹配完成后，再赋值给真正需要赋值的Name
let { name:Name,age } = { name:'swr',age:28 }
console.log(Name) // 'swr'
console.log(age) // 28
```
那么当变量已经被声明了呢？
```
let name,age
// 需要用圆括号，包裹起来
({name,age} = {name:"swr",age:28})
console.log(name) // 'swr'
console.log(age) // 28
```
变量能否也设置默认值？
```
let {name="swr",age} = {age:28}
console.log(name) // 'swr'
console.log(age) // 28
// 这里规则和数组的解构赋值一样，当name = undefined时，则会使用默认值
```

```
let [a] = [{name:"swr",age:28}]
console.log(a) // {name:"swr",age:28}

let { length } = "hello swr"
console.log(length) // 9
```
```
function ajax({method,url,type='params'}){
    console.log(method) // 'get'
    console.log(url) // '/'
    console.log(type) // 'params'
}

ajax({method:"get",url:"/"})
```

***

### 扩展运算符

我们先看下代码
```
// 在以往，我们给函数传不确定参数数量时，是通过arguments来获取的
function sum() {
  console.log(arguments) // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6 }
                         // 我们可以看出，arguments不是一个数组，而是一个伪数组
  let total = 0
  let { length } = arguments
  for(let i = 0;i < length;i++){
    total += arguments[i]
  }
  return total
}

console.log(sum(1,2,3,4,5,6)) // 21
```

```
// 接下来我们用扩展运算符看看
function sum(...args){ // 使用...扩展运算符
    console.log(args) // [ 1, 2, 3, 4, 5, 6 ] args是一个数组
    return eval(args.join('+'))
}

console.log(sum(1,2,3,4,5,6)) // 21
```
得到的args是一个数组，直接对数组进行操作会比对伪数组进行操作更加方便，还有一些注意点需要注意
```
// 正确的写法 扩展运算符只能放在最后一个参数
function sum(a,b,...args){
    console.log(a) // 1
    console.log(b) // 2
    console.log(args) // [ 3, 4, 5, 6 ]
}

sum(1,2,3,4,5,6)

// 错误的写法 扩展运算符只能放在最后一个参数
function sum(...args,a,b){
    // 报错
}

sum(1,2,3,4,5,6)
```

我们可以对比下扩展运算符的方便之处
```
// 以往我们是这样拼接数组的
let arr1 = [1,2,3]
let arr2 = [4,5,6]
let arr3 = arr1.concat(arr2)
console.log(arr3) // [ 1, 2, 3, 4, 5, 6 ]

// 现在我们用扩展运算符看看
let arr1 = [1,2,3]
let arr2 = [4,5,6]
let arr3 = [...arr1,...arr2]
console.log(arr3) // [ 1, 2, 3, 4, 5, 6 ]
```

```
// 以往我们这样来取数组中最大的值
function max(...args){
    return Math.max.apply(null,args)
}
console.log(max(1,2,3,4,5,6)) // 6

// 现在我们用扩展运算符看看
function max(...args){
    return Math.max(...args) // 把args [1,2,3,4,5,6]展开为1,2,3,4,5,6
}
console.log(max(1,2,3,4,5,6)) // 6
```

```
// 扩展运算符可以把argument转为数组
function max(){
    console.log(arguments) // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6 }
    let arr = [...arguments]
    console.log(arr) // [1,2,3,4,5,6]
}

max(1,2,3,4,5,6)

// 但是扩展运算符不能把伪数组转为数组（除了有迭代器iterator的伪数组，如arguments）
let likeArr = { "0":1,"1":2,"length":2 }
let arr = [...likeArr] // 报错 TypeError: likeArr is not iterable

// 但是可以用Array.from把伪数组转为数组
let likeArr = { "0":1,"1":2,"length":2 }
let arr = Array.from(likeArr)
console.log(arr) // [1,2]
```

对象也可以使用扩展运算符

```
// 以往我们这样合并对象
let name = { name:"邵威儒" }
let age = { age:28 }
let person = {}
Object.assign(person,name,age)
console.log(person) // { name: '邵威儒', age: 28 }

// 使用扩展运算符
let name = { name:"邵威儒" }
let age = { age:28 }
let person = {...name,...age}
console.log(person) // { name: '邵威儒', age: 28 }
```
需要注意的是，通过扩展运算符和Object.assign对对象进行合并的行为，是属于浅拷贝，那么我们在开发当中，经常需要对对象进行深拷贝，接下来我们看看如何进行深拷贝。

```
// 方法一：利用JSON.stringify和JSON.parse
let swr = {
    name:"邵威儒",
    age:28
}

let swrcopy = JSON.parse(JSON.stringify(swr))
console.log(swrcopy) // { name:"邵威儒",age:28 }
// 此时我们修改swr的属性
swr.age = 29
console.log(swr) // { name:"邵威儒",age:29 }
// 但是swrcopy却不会受swr影响
console.log(swrcopy) // { name:"邵威儒",age:28 }
// 这种方式进行深拷贝，只针对json数据这样的键值对有效
// 对于函数等等反而无效，不好用，接着继续看方法二、三。
```

```
// 方法二：
function deepCopy(fromObj,toObj) { // 深拷贝函数
  // 容错
  if(fromObj === null) return null // 当fromObj为null
  if(fromObj instanceof RegExp) return new RegExp(fromObj) // 当fromObj为正则
  if(fromObj instanceof Date) return new Date(fromObj) // 当fromObj为Date

  toObj = toObj || {}
  
  for(let key in fromObj){ // 遍历
    if(typeof fromObj[key] !== 'object'){ // 是否为对象
      toObj[key] = fromObj[key] // 如果为普通值，则直接赋值
    }else{
      toObj[key] = new fromObj[key].constructor // 如果为object，则new这个object指向的构造函数
      deepCopy(fromObj[key],toObj[key]) // 递归
    }
  }
  return toObj
}

let dog = {
  name:"小白",
  sex:"公",
  firends:[
    {
      name:"小黄",
      sex:"母"
    }
  ]
}

let dogcopy = deepCopy(dog)
// 此时我们把dog的属性进行修改
dog.firends[0].sex = '公'
console.log(dog) // { name: '小白',
                      sex: '公',
                      firends: [ { name: '小黄', sex: '公' }] }
// 当我们打印dogcopy，会发现dogcopy不会受dog的影响
console.log(dogcopy) // { name: '小白',
                          sex: '公',
                          firends: [ { name: '小黄', sex: '母' } ] }

```

```
// 方法三：
let dog = {
  name:"小白",
  sex:"公",
  firends:[
    {
      name:"小黄",
      sex:"母"
    }
  ]
}

function deepCopy(obj) {
  if(obj === null) return null
  if(typeof obj !== 'object') return obj
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  let newObj = new obj.constructor
  for(let key in obj){
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}

let dogcopy = deepCopy(dog)
dog.firends[0].sex = '公'
console.log(dogcopy)
```
***
# Object.defineProperty

Object.defineProperty这个并不是es6的语法，这个是给一个对象，添加属性，但是目前框架很多实用这个方法，来实现数据劫持，也就是数据双向绑定

```
// 平时我们这样给一个对象添加属性
let obj = {str:"hello swr"}
obj.str = 'goodbye swr'
console.log(obj.str) // 'goodbye swr'
```
那么当我们想在给一个对象，读取值或写入值时，进行别的操作，该怎么做呢？
```
// 使用Object.defineProperty()
// 接收的第一个参数为对象，第二个参数为属性名，第三个参数为配置对象
let obj = {}
Object.defineProperty(obj,'name',{
    enumerable:true,// 是否可枚举，默认值 true
                    // 如果为false的话，打印这个obj对象，是看不到name这个属性
    writable:true,  // 是否可写，默认值 true
                    // 如果为false的话，给name赋值，不会生效
    configurable:true, // 是否可配置（是否可删除），默认值 true
                       // 如果为true，delete obj.name，再打印obj，则显示{}
                       // 如果为false，delete obj.name，再打印obj,则显示{name:undefined}
   value:'swr', // name对应的值
})

// 上面的写法其实和下面的写法是一样的
let obj = {}
obj.name = 'swr'
```
那么既然一样，我们有必要写这么大串的代码吗？

其实核心是get和set，我们继续往下看
```
// 需要注意的是，当使用get set时，则不能使用value和writable
let obj = {}
let str
Object.defineProperty(obj,'name',{
    enumerable:true,
    configurable:true, 
    get(){ // 读，当我们读取时，则会执行到get，比如obj.name
        // return 'swr' // 当我们obj.name进行读取时，会返回'swr'
        return str
    },
    set(newValue){ // 写，当我们写入时，则会执行到set，比如obj.name = 'swr'
                   // 并且会把newValue作为参数传进去
        str = newValue
    }
})

obj.name = 'swr' // 写入
console.log(obj.name) // 'swr'  // 读取
```
这样一来，我们可以在get set函数中，写出对应的业务逻辑，

包括很多框架底层，例如
```
// 一般不再选择这样的写法
Fn.prototype.xxx = xxx

// 更多的是选择这样的写法
// 这样的好处就是当读取值的时候，可以做一系列我们想做的事情
Object.defineProperty(Fn.prototype,'xxx',{...})
```

## 那么我们实现数据双向绑定呢？

这个问题在面试当中，会经常问这个问题，但是面试官更希望听到的是具体底层的实现方式，那么接下来我们也实现一下吧~ （ 简陋版的……(#^.^#)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>对象的数据双向绑定</title>
</head>

<body>
  <input id='input' type="" name="" value="">
  <script>
    let el = document.getElementById('input') // 1. 获取输入框的dom节点
    let obj = { // 2. 创建一个对象
      name: ""
    }

    function oberseve(obj) { // 3. 对对象进行观察
      if (typeof obj !== 'object') return // 3.1 判断参数是否为对象
      for (let key in obj) { // 3.2 对对象进行遍历，目的是为了把每个属性都设置get/set
        defineReactive(obj, key, obj[key])
        oberseve(obj[key]) // 3.3 obj[key] 有可能还是一个函数，需要递归，给obj[key]里的属性进行设置get/set
      }
    }

    function defineReactive(target, property, value) { // 4. 使用Object.defineProperty
      Object.defineProperty(target, property, {
        get() {
          el.value = value // 4.1 当读取时，把值赋值给input框
          return value
        },
        set(newVal) {
          el.value = newVal // 4.1 当设置时，把赋值给input框
          value = newVal
        }
      })
    }

    oberseve(obj) // 5.执行该函数，对obj对象里的属性进行设置get/set
    el.addEventListener('input', function () { // 6.给输入框绑定input事件
      obj.name = this.value // 7.当输入框输入内容时，我们会把输入框的
                            //   内容赋值给obj.name，触发obj.name的set方法
    })
  </script>
</body>
</html>
```

当我们在输入框输入内容时，再到控制台输入obj.name查看这个值时，会发现打印出"hello swr"


![](https://user-gold-cdn.xitu.io/2018/8/23/165667de41433ef6?w=736&h=592&f=png&s=37794)

当我们在控制台，给obj.name赋值时，会发现输入框的内容也会作出相应更改

![](https://user-gold-cdn.xitu.io/2018/8/23/165667ee2ec6da30?w=590&h=504&f=png&s=39703)

这样我们就实现了一个简陋版的数据双向绑定了，但是这也是有缺点的，这个只是针对对象进行了数据双向绑定,而尤大大的Vuejs就是基于Object.defineProperty实现的。

除了Object.defineProperty可以实现数据双向绑定之外，还有其他方式吗？

肯定是有其他方式可以实现的，利用es6的proxy代理也可以实现数据双向绑定，但是目前的框架还是比较少使用这种方式。
***
# Proxy

Proxy代理也可以进行数据劫持，但是和Object.defineProperty不同的是，Proxy是在数据外层套了个壳，然后通过这层壳访问内部的数据，目前Proxy支持13种方式。


![](https://user-gold-cdn.xitu.io/2018/8/24/1656b6202ef1d745?w=1128&h=1602&f=png&s=538332)

Proxy，我的理解是在数据外层套了个壳，然后通过这层壳访问内部的数据，就像下面的图


![](https://user-gold-cdn.xitu.io/2018/8/29/16583897f9a176f8)

```
let dog = {
  name:"小黄",
  firends:[{
    name:"小红"
  }]
}

// 1.首先new一个Proxy对象
let proxy = new Proxy(dog,{ // 2.参数一为需要代理的数据，参数二为上图可以代理的13种的配置对象
    get(target,property){ // 3.参数1为上面dog对象，参数2为dog的属性
        console.log('get被监控到了')
        return target[property]
    },
    set(target,property,value){ // 4.参数1为上面dog对象，参数2为dog的属性，参数3为设置的新值
                                // 有点类似Object.defineProperty
        console.log('set被监控到了')
        target[property] = value
    }
})

// 那么接下来我们设置一下这个属性
// dog.name = '小红'  // set值时，发现不会打印 'set被监控到了'
// dog.name // get值时，发现不会打印 'get被监控到了'

// 思考：为什么在set/get值的时候不会打印出来我们需要的东西呢？

// 上面说得很明白了，proxy相当于是一个壳，代理我们需要监控的数据，也就是我们要通过proxy来访问内部数据才会被监控到

proxy.name = '小红' // 打印输出 'set被监控到了'
proxy.name // 打印输出 'get被监控到了'
```

```
// Reflect经常和Proxy搭配使用
// 比如我们上面的例子中
let proxy = new Proxy(dog,{ 
    get(target,property){ 
        console.log('get被监控到了')
        return target[property]
    },
    set(target,property,value){ 
        console.log('set被监控到了')
        // target[property] = value 
        // 这里的target[property] = value 可以用下面的写法
        Reflect.set(target,property,value)
    }
})
```

```
// 那么我们该怎样实现深度的数据劫持呢？
let dog = {
  name:"小黄",
  firend:{
    name:"小红"
  }
}

// 我们首先写一个set方法，希望是通过这样来调用
set(dog.firend,funtion(obj){
    console.log(obj) // { name:"小红" }  回调函数中的obj代表的是dog.firend的对象
})
```

```
// 实现
let dog = {
  name:"小黄",
  firend:{
    name:"小红"
  }
}

function set(obj,callback){
    let proxy = new Proxy(obj,{
        set(target,property,value){
            target[property] = value
        }
    })
    // 最后把proxy传给我们的回调函数
    callback(proxy)
}

set(dog.firend,function(obj){
    console.log(obj) // { name:"小红" } 实际就是从set函数中传出来的proxy对象
})
```
***
# Symbol

在js中，常见的数据类型有undefined null string number boolean object，而es6中，则新增了第七种数据类型symbol。  

symbol会生成一个独一无二的值，为常量

```
let s1 = Symbol()
let s2 = Symbol()
console.log(s1 === s2) // false

// 因为Symbol生成的是一个独一无二的值，为常量，一般是作为对象的属性
let obj = {
  [s1]:1,
  [s2]:2
}

console.log(obj) // { [Symbol()]: 1, [Symbol()]: 2 }
```

Symbol.for与Symbol差不多，但是Symbol.for会生成一个唯一的标识

```
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')
console.log(s1 === s2) // true

// 也可以通过Symbol.keyFor把标识找出来
console.log(Symbol.keyFor(s1)) // foo
```
***
# Array

Array的常用方法有from reduce map forEach findIndex find every some filter includes等等

用法也很简单，我主要讲一下from和reduce。

### Array.from
把伪数组(包括不含有迭代器的伪数组)转化为数组

```
// 声明一个伪数组
let likeArr = { 0:1,1:2,2:3,length:3 }

// 转换为数组
Array.from(likeArr) // [1,2,3]
```
那么我们用前面所说的扩展运算符，能够把伪数组转为数组吗？
```
// 声明一个伪数组
let likeArr = { 0:1,1:2,2:3,length:3 }

// 用扩展运算符转换为数组
let arr = [...likeArr] // 报错 likeArr is not iterable
```
likeArr is not iterable意思是，likeArr这个伪数组没有迭代器， 

那么可以看出，Array.from和...扩展运算符的区别了，  

Array.from可以将伪数组（包含没有迭代器的伪数组）转为数组，  

而...扩展运算符只能把拥有迭代器的伪数组转为数组，如arguments、map、set，  

那么我们如果想用...扩展运算符转为数组，该怎么办呢？
```
// 既然扩展运算符只能把有迭代器的伪数组转为数组，
// 那么我们就给伪数组添加一个迭代器
// 迭代器iterator需要一个generator生成器生成
// 我们给这个伪数组新增一个[Symbol.iterator]的迭代器
let likeArr = { 0:1,1:2,2:3,length:3,[Symbol.iterator]:function *() {
  for(let i = 0;i < this.length;i++){
    yield this[i]
  }
} }

console.log([...likeArr]) // [1,2,3]
```

### reduce

```
let arr = [1,2,3,4,5]

// 参数一：前一个值
// 参数二：下一个值（当前值）
// 参数三：当前的索引
// 参数四：arr数组
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next
})

console.log(total) // 15
```

```
// 那么reduce是怎样一个运行流程呢？
// 我们一步步拆解出来看
let arr = [1,2,3,4,5]

// arr会一直是[1,2,3,4,5]
// 第一步：此时的prev为1，next为2，currentIndex为1
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 1+2=3   并且把3当做下一次的prev
})

// 第二步：此时的prev为3，next为3，currentIndex为2
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 3+3=6   并且把6当做下一次的prev
})

// 第三步：此时的prev为6，next为4，currentIndex为3
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 6+4=10   并且把10当做下一次的prev
})

// 第四步：此时的prev为10，next为5，currentIndex为4
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 10+5=15 最终结果会作为返回值返回
})
```
那我们自己实现一个reduce，看看是如何实现的
```
Array.prototype.myReduce = function (callback) {
  let prev = this[0]
  for(let i = 0;i < this.length-1;i++){
    prev = callback(prev,this[i+1],i+1,this)
  }
  return prev
}

let arr = [1,2,3,4,5]
let total = arr.myReduce(function(prev,next,currentIndex,arr){
  console.log(prev,next)
  return prev + next
})

console.log(total) // 15
```

### map映射

可以把数组返回成一个映射后的数组

```
let arr = [1,2,3].map(item => item+1)
console.log(arr) // [2,3,4]
```

### find

查找，查找到后不再继续查找，查找不到则返回undefined，内部返回true的话，则返回当前item，
```
let arr = [1,2,3,4]

let val = arr.find(item=>item === 3)
console.log(val) // 3
```

### every

每个值是否满足条件，如果是则返回true，如果不是则返回false

```
let arr = [1,2,3,4]
let isTrue = arr.every(item => {
    return item > 0
})

console.log(isTrue) // true

let isTrue2 = arr.every(item => {
    return item > 2
})

console.log(isTrue2) // false
```

### some

是否有其中一个值满足条件，如果是则返回true，如果不是则返回false

```
let arr = [1,2,3,4]
let isTrue = arr.every(item => {
    return item > 2
})

console.log(isTrue) // true

let isTrue2 = arr.every(item => {
    return item > 4
})

console.log(isTrue2) // false
```

### filter

过滤，在回调函数中返回的为false的话，相当于过滤掉当前项，返回一个过滤后的数组

```
let arr = [1,2,3,4]

let newArr = arr.filter(item=>{
  return item > 2
})

console.log(newArr) // [3,4]
```

### includes

基本和some一样

***
# Set

set是放不重复的项，也就是去重

```
let set = new Set([1,2,3,4,3,2,1])
console.log(set) // Set { 1, 2, 3, 4 }
```

Set有几个常用的方法，add clear delete entries

```
// add
let set = new Set([1,2,3,4,3,2,1])
set.add(5)
console.log(set) // Set { 1, 2, 3, 4, 5 }

// 添加一个已有的值，则不会添加进去
set.add(1)
console.log(set) // Set { 1, 2, 3, 4, 5 }

// delete
set.delete(3)
console.log(set) // Set { 1, 2, 4, 5 }

// entries
console.log(set.entries()) // SetIterator { [ 1, 1 ],
                                            [ 2, 2 ],
                                            [ 4, 4 ], 
                                            [ 5, 5 ] }

// clear
set.clear()
console.log(set) // Set {}
```

Set常用于去重（并集）

```
function distinct(arr1,arr2){
    return [...new Set([...arr1,...arr2])]
}

let arr = distinct([1,2,3],[2,3,4,5])
console.log(arr) // [1,2,3,4,5]
```

求交集

```
function intersect(arr1,arr2) {
  // 利用Set里的方法has，来判断new Set(arr2)中是否含有item，
  // 如果含有，那么则是true，当为true时，filter函数则会保留该项
  // 如果没有，则是false,当为false时，filter函数则不会保留该项
  return arr1.filter(item => new Set(arr2).has(item))
}

console.log(intersect([1,2,3],[2,3,4,5])) // [2,3]
```

求差集

```
function difference(arr1,arr2){
    return arr1.filter(item => !new Set(arr2).has(item))
}

console.log(difference([1,2,3],[2,3,4,5])) // [1]
```

***
# Map

也是集合，主要格式是 key => value，同样是不能放重复的key

```
// 如果放重复的key会怎样呢？会被覆盖
let map = new Map()
map.set('name','邵威儒')
map.set('name','swr')
console.log(map) // Map { 'name' => 'swr' }

// 取的话用get
map.get('name') // 'swr'

// 删的话用delete
map.delete('name')
console.log(map) // Map {}

// 很多方法和set差不多
```

```
let map = new Map()
map.set('name','邵威儒')
map.set('age',28)
// 一般使用for ... of ... 遍历
for(let [key,value] of map.entries()){
    console.log(key,value) // name 邵威儒
                           // age 28
}

// 也可以用forEach
map.forEach(item => {
    console.log(item) // 邵威儒
                      // 28
})
```

Set我用得最多的就是去重了，实际上Set Map我在开发中还是比较少会用到

***

# Class类

核心还是继承，而Class我认为是es5面向对象的语法糖。

在看Class之前建议看一下js的面向对象 https://juejin.im/post/5b8a8724f265da435450c591

看完后，我们开始进入es6的class

```
// 语法
// 声明一个类
Class Person{ 
    // 在constructor中写实例属性、方法
    constructor(){ 
        this.name = "邵威儒" // 实例属性
        this.say = function(){ // 实例方法
            console.log("我是实例方法上的say")
        }
    }
    // 原型方法
    eat(){
        console.log("我是原型方法上的eat")
    }
    // 静态方法 也会被继承
    static myName(){ 
        return "我是静态方法的myName"
    }
    
    // 在es6中静态属性不能这样写 static name = "邵威儒"  这样会报错
    // 在es7中可以这样写static name = "邵威儒"
}

let p = new Person() // new一个对象
console.log(p.name) // 邵威儒
p.eat() // 我是原型方法上的eat
console.log(Person.myName()) // 我是静态方法的myName
```

那么子类怎么继承父类呢？

```
// 父类
class Person{
    constructor(){
        this.name = "swr"
    }
    static myName(){
        return "Person"
    }
    eat(){
        console.log('eat')
    }
}

// 子类
// 子类Child继承父类Person
// class Child extends Person实际上相当于
// Child.prototype = Object.create(Person.prototype)
// 打印出来可以看到
// console.log(Child.prototype === Person.prototype) // false
// console.log(Child.prototype.__proto__ === Person.prototype) // true
class Child extends Person{
    constructor(){
        super() // 此处的super相当于Person.call(this)
    }
}

```

前面我说了Class就类型es5面向对象的语法糖，为什么这样说呢？

接下来我们看一下通过es5怎么模拟实现一个Class（可以用babel转一下，看看转为es5的代码是怎样的）

```
let Child = (function(){
    // 这种闭包的写法，好处可以把作用域封闭起来 
    // 在Child构造函数外写一系列变量
    // 如 let name = "邵威儒";let age = 28 等等…
    function Child(){
        console.log(this) // 打印内部this，看看指向哪里
    }
    return Child
})()

// 通过直接调用函数，看看什么情况
console.log(Child()) // 此时里面的this是指向全局的

// 通过new来生成对象
console.log(new Child()) // 此时里面的this是指向这个new出来的新对象
```

在es6中，不使用new来调用类，会报错 `Class constructor Child cannot be invoked without 'new'`

```
class Child {
    
}

Child() // TypeError: Class constructor Child cannot be invoked without 'new'
```

也就是说，想在es5中，模拟类，那么没使用new来调用构造函数时，也要抛出一个错误，那么我们会想到类的校验方法

```
// * 1.声明一个类的校验方法
// *   参数一：指向的构造函数
// *   参数二：被调用时，this的指向
function _classCallCheck(constructor,instance) {
  // * 2.如果这个instance指向的不是constructor的话，意味着不是通过new来调用构造函数
  if(!(instance instanceof constructor)){
    // * 3.不满足时，则抛出异常
    throw TypeError("Class constructor Child cannot be invoked without 'new'")
  }
}

let Child = (function(){
  function Child(){
    // * 4.在调用该构造函数的时候，先执行以下类的校验方法
    _classCallCheck(Child,this)
  }
  return Child
})()

// 不通过new调用时，会报错
Child() // 报错 Class constructor Child cannot be invoked without 'new'
```

那么我们类上，有实例属性方法、原型属性方法、静态属性方法

```
function _classCallCheck(constructor,instance) {
  if(!(instance instanceof constructor)){
    throw TypeError("Class constructor Child cannot be invoked without 'new'")
  }
}

// * 4.描述器 descriptor
//     参数一：构造函数
//     参数二：描述原型属性方法数组
//     参数三：描述静态属性方法数组
function _createClass(constructor,protoProperties,staticProperties) {
  // * 5.如果protoProperties数组有数组成员
  if(protoProperties.length){
    // * 6.遍历
    for(let i = 0;i < protoProperties.length;i++){
      // * 7.通过Object.defineProperty把属性方法添加到constructor的原型对象上
      Object.defineProperty(constructor.prototype,protoProperties[i].key,{
        // * 8.利用扩展运算符，把{key:"say",value:function(){console.log("hello swr")}}展开
        ...protoProperties[i]
      })
    }
  }
}

// * 1.实例属性方法、原型属性方法、静态属性方法
//     在es6中，原型属性方法不是通过prototype实现的
//     而是通过一个叫描述器的东西实现的
let Child = (function(){
  function Child(){
    _classCallCheck(Child,this)
    // * 2.实例属性方法还是写在构造函数内
    this.name = '邵威儒'
  }
  // * 3.描述器 descriptor
  //     参数一：构造函数
  //     参数二：描述原型属性方法
  //     参数三：描述静态属性方法
  _createClass(Child,
    [
      {key:"say",value:function(){console.log("hello swr")}},
      {key:"myname",value:"iamswr"}
    ],
    [
      {key:"total",value:function(){return 100}}
    ])
  return Child
})()


// * 9.最后我们new一个对象出来，并且调用原型属性方法，看能否调用成功
let c = new Child()
c.say() // 'hello swr'    调用成功
```

接下来，我们把静态方法，staticProperties也处理一下，  
此时会发现，protoProperties和staticProperties都会遍历然后使用Object.defineProperty  
那么我们封装一个方法进行处理
```
function _classCallCheck(constructor,instance) {
  if(!(instance instanceof constructor)){
    throw TypeError("Class constructor Child cannot be invoked without 'new'")
  }
}

// * 1.封装一个方法，处理遍历和Object.defineProperty
function _defineProperty(target,properties) {
  for (let i = 0; i < properties.length; i++) {
    Object.defineProperty(target, properties[i].key, {
      ...properties[i]
    })
  }
}

function _createClass(constructor,protoProperties,staticProperties) {
  if(protoProperties.length){
    _defineProperty(constructor.prototype, protoProperties)
  }
  // * 2.如果staticProperties数组有数组成员
  if(staticProperties.length){
    // * 3.静态方法需要添加在constructor
    _defineProperty(constructor, staticProperties)
  }
}

let Child = (function(){
  function Child(){
    _classCallCheck(Child,this)
    this.name = '邵威儒'
  }
  _createClass(Child,
    [
      {key:"say",value:function(){console.log("hello swr")}},
      {key:"myname",value:"iamswr"}
    ],
    [
      {key:"total",value:function(){return 100}}
    ])
  return Child
})()


let c = new Child()
c.say()
// * 4.最后我们通过Child来调用静态方法
console.log(Child.total())  // 100
```

这样完成了一个雏形，但是还有最重要的继承还没实现，接下来我们实现继承。

```
function _classCallCheck(constructor,instance) {
  if(!(instance instanceof constructor)){
    throw TypeError("Class constructor Parent cannot be invoked without 'new'")
  }
}

function defineProperty(target,properties) {
  for (let i = 0; i < properties.length; i++) {
    Object.defineProperty(constructor.prototype, properties[i].key, {
      ...properties[i]
    })
  }
}

function _createClass(constructor,protoProperties,staticProperties) {
  if(protoProperties.length){
    defineProperty(constructor.prototype, protoProperties)
  }
  if(staticProperties.length){
    defineProperty(constructor, staticProperties)
  }
}

// * 6.继承方法
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  // * 7.把子类的原型对象指向新的原型对象 组合寄生式继承 继承原型属性方法
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass, // 把constructor指向子类
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  // * 8.继承父类的静态方法
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

// * 1.父类
let Parent = (function(){
  function Parent(){
    _classCallCheck(Parent,this)
    this.name = '父类实例属性'
  }
  _createClass(Parent,
    [
      {key:"say",value:function(){console.log("父类原型方法say")}},
      {key:"myname",value:"父类原型属性myname"}
    ],
    [
      {key:"total",value:function(){return 100}}
    ])
  return Parent
})()

// * 2.子类
let Child = (function (Parent) { // * 4.这里接收传进的参数 父类
  // * 5.写一个继承方法，继承原型属性方法和静态方法
  _inherits(Child, Parent);
  function Child() {
    _classCallCheck(Child, this)
    // * 9.继承实例属性方法
    return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
  }
  return Child
})(Parent) // * 3.在这里通过传参，把父类传进去

let c = new Child()
console.log(c.name) // '父类实例属性'
```

这样就可以用es5模拟es6的class了，会发现其实es6的class是es5面向对象的一个语法糖，经过这样解剖一下源码实现，会对class有更深刻的理解。

还有个问题，我们在react中，会这样写class

```
class Parent{
    name = "邵威儒"
}
// 在正常情况下会报错，但是因为平时项目是使用了babel插件
// 会帮我们自动编译语法，这种写法目前还处于草案阶段
// 上面的写法实际等价于下面的写法
class Parent{
    constructor(){
        this.name = "邵威儒"
    }
}
```

***

# decorator 装饰器

装饰器是用来装饰类的

```
class Person {

}

function myFunction(target) {
  target['myName'] = "邵威儒"
}
myFunction(Person)
console.log(Person['myName']) // 邵威儒
```
这种写法，相当于给Person这个类添加了myName的属性  
那么换成decorator该怎么写呢？

```
// 在类前面写@myFunction
@myFunction
class Person {

}

function myFunction(target) {
  target['myName'] = "邵威儒"
}
// myFunction(Person)  这一步可以不写
console.log(Person['myName']) // 邵威儒
```
那么我们该怎么给myName传参呢？
```
@myFunction('邵威儒')
class Person {

}

function myFunction(value) {
  return function(target){ // target代表的是类
      target['myName'] = value
  }
}
console.log(Person['myName']) // 邵威儒
```

修饰符也可以修饰类的方法
```
class Person {
    @myFunction
    say(){}
}

// 如果修饰的是方法
// 参数一：是Person.prototype
// 参数二：是say
// 参数三：是描述器
function myFunction(target,key,descriptor){
    // 给这个类添加一个原型属性
    Object.assign(target,{name:"邵威儒"})
}

let p = new Person()
console.log(p.name) // 邵威儒
```

修饰符也可以修饰类的属性，比如我们有个不可修改的属性
```
class Person {
    @onlyRead
    name = '邵威儒'
}

function onlyRead(target,key,descriptor){
    descriptor.writable = false
}

let p = new Person()
p.name = 'swr' // 报错，不能赋值
```
decorator的用处很多，包括重写函数
```
function myFunction(target,key,descriptor){
    // 拿出原本的函数
    let fn = descriptor.value
    // 并且在原有的fn上加上自己的业务逻辑，比如console.log('哈哈哈')
    descriptor.value = function(){
        // 这里写我们需要加入的内容
        console.log('哈哈哈')
        // 这里执行原来的fn
        fn()
    }
}
```


装饰器经常在react中使用~其实decorator是简写，逼格高一些。
***

#### es6其实还有很多新语法，但是我们平时并不常用，所以也没一一列举，可以到阮大神的es6看看~