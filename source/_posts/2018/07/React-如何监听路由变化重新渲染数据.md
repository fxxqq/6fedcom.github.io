---
title: React 如何监听路由变化重新渲染数据
categories: 前端
tags:
  - React
abbrlink: 85383de6
date: 2018-07-17 16:46:55
---
**应用场景：**
```jsx
// route.js
<Router>
  <Switch>
    <Route path="/" component={NewsList} />
    <Route path="/a" component={NewsList} />
    <Route path="/b" component={NewsList} />
    <Route path="/c" component={NewsList} />
    <Route path="/d" component={NewsList} />
  </Switch>
</Router>
```
```jsx
class NewsList extends Component {
  componentWillMount () {
    const type = this.props.location.pathname.replace('/', '') || 'top'
    this.props.dispatch(fetchListData(type))
  }
    
  render () {
    ...
  }
}
```

**分析：**
React组件的生命周期钩子。第一次加载时:
```jsx
"constructor"
"componentWillMount"
"render"
"componentDidMount"
```
当组件的props发生改变时，组件更新，会调用如下的生命周期钩子
```
"componentWillReceiveProps"
"shouldComponentUpdate"
"componentWillUpdate"
"render"
"componentDidUpdate"
```

> 当路由变化时，即组件的props发生了变化，会调用componentWillReceiveProps等生命周期钩子

**怎么做呢？**
```jsx
class NewsList extends Component {
  componentDidMount () {
     this.fetchData(this.props.location);
  }
  
  fetchData(location) {
    const type = location.pathname.replace('/', '') || 'top'
    this.props.dispatch(fetchListData(type))
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.location.pathname != this.props.location.pathname) {
         this.fetchData(nextProps.location);
     } 
  }

  render () {
    ...
  }
}
```

