---
title: React生命周期以及注意事项
categories: front-end
abbrlink: 9a17caa7
date: 2018-11-29 11:36:28
tags: [react]
---
react快速入门

### react组件的生命周期

在组件的整个生命周期中，随着该组件的props或者state发生改变，其DOM表现也会有相应的变化 

>State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。


组件的生命主要包括3个阶段： 挂载、更新、卸载，React 16开始还添加了错误处理。

韦博青少微信端用的是react15版本的，先简述下15版本的生命周期，react16的生命周期也是基于15上修改

![react生命周期](https://cdn.ru23.com/img/2018/12/react-life-cycle.png)

### 第一个是组件初始化(initialization)阶段

```jsx
import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
  }
}
```

构造方法(`constructor()` ),Test类继承了react Component这个基类，也就继承这个react的基类，才能有render(),生命周期等方法可以使用
super(props)用来调用基类的构造方法( `constructor()` ), 也将父组件的props注入给子组件，供子组件读取(组件中props只读不可变，state可变)
而`constructor()`用来做一些组件的初始化工作，如定义this.state的初始内容。

### 第二个是组件的挂载(Mounting)阶段

**此阶段分为componentWillMount，render，componentDidMount三个时期**
`componentWillMount`:
在组件挂载到DOM前调用，且只会被调用一次，在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到`constructor()`中，所以项目中很少用。
`render`:
根据组件的props和state（无两者的重传递和重赋值，论值是否有变化，都可以引起组件重新render） ，return 一个React元素（描述组件，即UI），不负责组件实际渲染工作，之后由React自身根据此元素去渲染出页面DOM。render是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用），不能在里面执行this.setState，会有改变组件状态的副作用。

`componentDidMount`:
组件挂载到DOM后调用，且只会被调用一次
1.在`componentDidMount`请求异步加载的数据
2.添加事件监听 — Adding event listeners (or subscriptions)

### 第三个是组件的更新(update)阶段
在讲述此阶段前需要先明确下**react组件更新机制**。
1. 父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render
2. setState引起的state更新,可通过`shouldComponentUpdate`方法优化。
```jsx
class Child extends Component {
   constructor(props) {
        super(props);
        this.state = {
          someThings:1
        }
   }
 
   handleClick = () => { // 虽然调用了setState ，但state并无变化
        const preSomeThings = this.state.someThings
         this.setState({
            someThings: preSomeThings
         })
   }
   shouldComponentUpdate(nextStates){ // 应该使用这个方法，否则无论state是否有变化都将会导致组件重新渲染
        if(nextStates.someThings === this.state.someThings){
          return false
        }
    }
    render() {
        return <div onClick = {this.handleClick}>{this.state.someThings}</div>
    }
}
```  
`componentWillReceiveProps(nextProps)`
此方法只调用于props引起的组件更新过程中，参数nextProps是父组件传给当前组件的新props。但父组件render方法的调用不能保证重传给当前组件的props是有变化的，所以在此方法中根据nextProps和this.props来查明重传的props是否改变，以及如果改变了要执行啥，比如根据新的props调用this.setState出发当前组件的重新render

`shouldComponentUpdate(nextProps, nextState)`

此方法通过比较nextProps，nextState及当前组件的this.props，this.state，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能。
ps：这边也可以看出，就算componentWillReceiveProps()中执行了this.setState，更新了state，但在render前（如shouldComponentUpdate，componentWillUpdate），this.state依然指向更新前的state，不然nextState及当前组件的this.state的对比就一直是true了。

`componentWillUpdate(nextProps, nextState)`

此方法在调用render方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。

`render`

render方法在上文讲过，这边只是重新调用。

`componentDidUpdate(prevProps, prevState)`

此方法在组件更新后被调用，可以操作组件更新的DOM，prevProps和prevState这两个参数指的是组件更新前的props和state


### 卸载阶段
此阶段只有一个生命周期方法：`componentWillUnmount`
`componentWillUnmount`
此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清除定时器，清除componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏。
 
### react16 生命周期函数做的更改
旧的生命周期十分完整，基本可以捕捉到组件更新的每一个state/props/ref，没有什么逻辑上的毛病。

但是架不住官方自己搞事情，react打算在17版本推出新的Async Rendering，提出一种可被打断的生命周期，而可以被打断的阶段正是实际dom挂载之前的虚拟dom构建阶段，也就是要被去掉的三个生命周期。

生命周期一旦被打断，下次恢复的时候又会再跑一次之前的生命周期，
因此componentWillMount，componentWillReceiveProps， componentWillUpdate都不能保证只在挂载/拿到props/状态变化的时候刷新一次了，所以这三个方法被标记为不安全。

##### 两个新生命周期
`static getDerivedStateFromProps`
触发时间：在组件构建之后(虚拟dom之后，实际dom挂载之前) ，以及每次获取新的props之后。
每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state.
配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

```jsx
class Example extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // 没错，这是一个static
  }
}

```
`getSnapshotBeforeUpdate`
触发时间: update发生的时候，在render之后，在组件dom渲染之前。
返回一个值，作为componentDidUpdate的第三个参数。
配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法。

##### react错误处理
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### setState方法可能是同步的，也可能是异步的

由 React 控制的事件处理过程 setState 不会同步更新 this.state

基于性能考虑，React 通常是批量合并更新，调用 setState() 之后，this.state 并没有马上修改，而是创建了一个中间态作为过渡。

但是有些例外情况，它是同步执行的，比如：eventListeners，Ajax，setTimeout 等。
原因是这些 JS 原生的 API 不在 React 的上下文控制范围，无法进行优化。

 
```jsx
this.setState(
  { count: 1 }, () => {
      console.log(this.state.count)//输出count=1
  }
)

```

### react事件绑定

由于类的方法默认不会绑定this，因此在调用的时候如果忘记绑定，this的值将会是undefined。
通常如果不是直接调用，应该为方法绑定this。绑定方式有以下几种：

1. 在构造函数中使用bind绑定this
```js
class Button extends React.Component {
constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

2. 在调用的时候使用bind绑定this
```js
class Button extends React.Component {
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Click me
      </button>
    );
  }
}
```
3. 在调用的时候使用箭头函数绑定this
```js
class Button extends React.Component {
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={()=>this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

4. 使用属性初始化器语法绑定this(实验性)
```jsx
class Button extends React.Component {
  handleClick=()=>{
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

方式1是官方推荐的绑定方式，也是性能最好的方式。方式2和方式3会有性能影响并且当方法作为属性传递给子组件的时候会引起重渲问题。方式4目前属于实验性语法，但是是最好的绑定方式，需要结合bable转译

### react列表渲染时为什么尽量不要把索引设置为key值

使用数组下标做key是不被推荐的，如果遇到数组排序的情况下，将降低渲染性能。


### React中的核心概念
1. 虚拟DOM（Virtual DOM） 
https://github.com/livoras/blog/issues/13

2. Diff算法（虚拟DOM的加速器，提升React性能的法宝）
https://github.com/zmmbreeze/blog/issues/9

 

