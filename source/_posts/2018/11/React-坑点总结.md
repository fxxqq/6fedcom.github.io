---
title: React 坑点总结
categories: front-end
abbrlink: 9a17caa7
date: 2018-11-29 11:36:28
tags:
---

### setState 异步特性

基于性能考虑，React 通常是批量合并更新，调用 setState() 之后，this.state 并没有马上修改，而是创建了一个中间态作为过渡。

但是有些例外情况，它是同步执行的，比如：eventListeners，Ajax，setTimeout 等。
原因是这些 JS 原生的 API 不在 React 的上下文控制范围，无法进行优化。

如何解决？

setState 第二个参数可以传入 callback
```js
console.log('State before : ' + JSON.stringify(this.state));
this.setState({
	dollars: 50
}, () => {
	console.log('Here state will always be updated to latest version!');
	console.log('State after : ' + JSON.stringify(this.state));
});
```

### shouldComponentUpdate() 检查
```js
export default class AutocompleteItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.url !== this.props.url ||
      nextProps.selected !== this.props.selected;
  }

  render() {
    const {props} = this;
    const selectedClass = props.selected === true ? "selected" : "";
    var path = parseUri(props.url).path;
    path = path.length <= 0 ? props.url : "..." + path;

    return (
      <li
        onMouseLeave={props.onMouseLeave}
        className={selectedClass}>
        <i className="ion-ios-eye"
           data-image={props.image}
           data-url={props.url}
           data-title={props.title}
           onClick={props.handlePlanetViewClick}/>
        <span
          onMouseEnter={props.onMouseEnter}>
          <div className="dot bg-mint"/>
          {path}
        </span>
      </li>
    );
  }
}
```