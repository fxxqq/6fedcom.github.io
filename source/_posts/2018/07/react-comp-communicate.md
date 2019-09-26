---
title: react之组件通信方式
tags:
  - react
categories: front-end
abbrlink: 6d683f02
date: 2018-07-29 23:20:24
---

![组件通信](https://upload-images.jianshu.io/upload_images/1480597-e9f0c8c8e859eed9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 组件之进行通信的几种情况

- 父组件向子组件通信
- 子组件向父组件通信
- 跨级组件通信
- 没有嵌套关系组件之间的通信

## 一、父组件向子组件通信

> `React`数据流动是单向的,父组件向子组件通信也是最常见的;父组件通过`props`向子组件传递需要的信息

```js
// Child.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function Child({ name }) {
    return <h1>Hello, {name}</h1>;
}

Child.propTypes = {
    name: PropTypes.string.isRequired,
}


// Parent.jsx
import React, { Component } from 'react';

import Child from './Child';

class Parent extends Component {
    render() {
        return (
            <div>
                <Child name="Sara" />
            </div>
        );
    }
}

export default Parent;
```

## 二、子组件向父组件通信

- 利用回调函数
- 利用自定义事件机制

> 实现在子组件中点击隐藏组件按钮可以将自身隐藏的功能

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List3 extends Component {
    static propTypes = {
        hideConponent: PropTypes.func.isRequired,
    }
    render() {
        return (
            <div>
                哈哈,我是List3
                <button onClick={this.props.hideConponent}>隐藏List3组件</button>
            </div>
        );
    }
}

export default List3;

//app.jsx

import React, { Component } from 'react';

import List3 from './components/List3';
export default class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            isShowList3: false,
        };
    }
    showConponent = () => {
        this.setState({
            isShowList3: true,
        });
    }
    hideConponent = () => {
        this.setState({
            isShowList3: false,
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.showConponent}>显示Lists组件</button>
                {
                    this.state.isShowList3 ?
                        <List3 hideConponent={this.hideConponent} />
                    :
                    null
                }

            </div>
        );
    }
}

```

## 三、跨级组件通信

**层层组件传递 props**

> 例如 A 组件和 B 组件之间要进行通信,先找到 A 和 B 公共的父组件,A 先向 C 组件通信,C 组件通过 props 和 B 组件通信,此时 C 组件起的就是中间件的作用

**使用 context**

- context 是一个全局变量,像是一个大容器,在任何地方都可以访问到,我们可以把要通信的信息放在 context 上,然后在其他组件中可以随意取到
- 但是 React 官方不建议使用大量 context,尽管他可以减少逐层传递,但是当组件结构复杂的时候,我们并不知道 context 是从哪里传过来的;而且 context 是一个全局变量,全局变量正是导致应用走向混乱的罪魁祸首

> 下面例子中的组件关系: ListItem 是 List 的子组件,List 是 app 的子组件

```js
// ListItem.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
    // 子组件声明自己要使用context
    static contextTypes = {
        color: PropTypes.string,
    }
    static propTypes = {
        value: PropTypes.string,
    }
    render() {
        const { value } = this.props;
        return (
            <li style={{ background: this.context.color }}>
                <span>{value}</span>
            </li>
        );
    }
}

export default ListItem;


// List.jsx
import ListItem from './ListItem';

class List extends Component {
    // 父组件声明自己支持context
    static childContextTypes = {
        color: PropTypes.string,
    }
    static propTypes = {
        list: PropTypes.array,
    }
    // 提供一个函数,用来返回相应的context对象
    getChildContext() {
        return {
            color: 'red',
        };
    }
    render() {
        const { list } = this.props;
        return (
            <div>
                <ul>
                    {
                        list.map((entry, index) =>
                            <ListItem key={`list-${index}`} value={entry.text} />,
                       )
                    }
                </ul>
            </div>
        );
    }
}

export default List;


// App.jsx

import React, { Component } from 'react';
import List from './components/List';

const list = [
    {
        text: '题目一',
    },
    {
        text: '题目二',
    },
];
export default class App extends Component {
    render() {
        return (
            <div>
                <List
                    list={list}
                />
            </div>
        );
    }
}
```

## 四、没有嵌套关系的组件通信

**使用自定义事件机制**

- 在`componentDidMount`事件中,如果组件挂载完成,再订阅事件;在组件卸载的时候,在`componentWillUnmount`事件中取消事件的订阅;
- 以常用的发布/订阅模式举例,借用`node.js Events`模块的浏览器版实现

> 下面例子中的组件关系: List1 和 List2 没有任何嵌套关系,App 是他们的父组件

实现这样一个功能: 点击 List2 中的一个按钮,改变 List1 中的信息显示

```
npm install events --save
```

> 在 src 下新建一个 util 目录里面建一个 events.js

```
import { EventEmitter } from 'events';

export default new EventEmitter();
```

```js
// List.jsx
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'List1',
        };
    }
    componentDidMount() {
        // 组件装载完成以后声明一个自定义事件
        this.eventEmitter = emitter.addListener('changeMessage', (message) => {
            this.setState({
                message,
            });
        });
    }
    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter);
    }
    render() {
        return (
            <div>
                {this.state.message}
            </div>
        );
    }
}

export default List;

//List2.jsx
import React, { Component } from 'react';
import emitter from '../util/events';

class List2 extends Component {
    handleClick = (message) => {
        emitter.emit('changeMessage', message);
    };
    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this, 'List2')}>点击我改变List1组件中显示信息</button>
            </div>
        );
    }
}

// APP.jsx

import React, { Component } from 'react';
import List1 from './components/List1';
import List2 from './components/List2';


export default class App extends Component {
    render() {
        return (
            <div>
                <List1 />
                <List2 />
            </div>
        );
    }
}
```

> 自定义事件是典型的发布订阅模式,通过向事件对象上添加监听器和触发事件来实现组件之间的通信

## 五、总结

- 父组件向子组件通信: `props`
- 子组件向父组件通信: 回调函数/自定义事件
- 跨级组件通信: 层层组件传递`props/context`
- 没有嵌套关系组件之间的通信: 自定义事件
