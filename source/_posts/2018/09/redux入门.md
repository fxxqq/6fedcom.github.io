---
title: redux入门
categories: 前端
tags:
  - React
abbrlink: c5bbc436
date: 2018-09-28 19:43:17
---
Redux由Flux演变而来，提供几个简单的API来实现状态管理，所谓状态指的是应用数据，所以，Redux本质上是用来管理数据的。
进一步，Redux配合支持数据绑定的视图库使用，就可以将应用状态和视图一一对应，开发者不需要再去关心DOM操作，只关心如何组织数据即可。

>由于Redux对于数据的管理拆分很细，一时间会有很多概念，并且Redux有自己丰富的生态，所以容易眼花缭乱。
所以强烈建议从头开始一步一步的来，深入体验并理解Redux的思想，不要步子迈太大。
✦ 不要一开始过多的纠结代码放在哪个目录
✦ 不要一开始就想对action和reducer的代码做精简
✦ 不要一开始就考虑数据缓存，离线数据等问题
✦ 不要一开始就过度设计数据，考虑数据扁平化的问题
反正一句话，饭要一口一口的吃，路要一步一步的走，Redux对于状态管理的东西拆得太细，需要多花一些时间去体会。

## Redux是什么？
Redux其实很简单，总结起来就三句话：
✦ 将整个应用的state储存在唯一的store对象中。
✦ state只能通过触发action来修改，其中action就是一个描述性的普通对象。
✦ 使用reducer来描述action如何改变state。

是的，简而言之就是：Redux让应用的数据被集中管理，并且只能通过触发action的方式来修改，而具体如何修改state，是由reducer来决定的。

那么问题来了：
✦ store是什么鬼？
✦ action是什么鬼？
✦ reducer是什么鬼?
✦ 最重要的是，为啥要使用Redux，它能给我们带什么什么好处？或者说，引入这么一个状态理器到底有啥用？

接下来，我们先捉这三只鬼。

store是什么鬼？
前面提过，Redux的目的就是为了对应用数据进行集中管理，也就是state，而state是个普通对象。为了防止state被不小心更新，Redux创建了store对象，专门用来管理state数据。

所以，store就是state的守门员，管理并维护应用数据。

### 创建store
我们通过createStore(reducer, [initialState], enhancer)的方式来创建store。需要注意的是，应用中应该有且只有一个store。
```js
import { createStore } from 'redux'

// 这是reducer，后文会详细介绍
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}

// 创建store，并且给state一个初始值['HTML']
let store = createStore(todos, [ 'HTML' ])

// state.dispatch()，最常用的API
// 修改state的唯一方式就是调用store.dispatch()方法
// 显然，其中的描述性对象
// {
//  type: 'ADD_TODO',
//  text: 'CSS'
// }
// 就是action
store.dispatch({
  type: 'ADD_TODO',
  text: 'CSS'
})

// store.getState()，另一个常用的API
// 用来获取state的值
console.log(store.getState());  // [ 'HTML', 'CSS' ]
```

### store的API们
store的API很简单，这儿我按重要顺序列出所有的API，主要记住前两个。
✦ dispatch(action)：触发action，再次声明，这是改变state的唯一方式，请默念两次
✦ getState()：获取当前的state
✦ subscribe(listener)：注册一个监听函数，state发生变化时触发
✦ replaceReducer(nextReducer)：替换reducer，用得较少

总结一下，store提供了简单的API，用来管理应用内的数据，它限制了只能通过dispatch(action)来修改state，那么这个action是什么呢？

### action是什么鬼？
前文提过，action就是一个描述性的普通对象，所以它非常简单！说白了，就是一坨数据，然后这坨数据有名字。

##### action
action是一个描述性的普通对象。推荐如下的action结构，type是action的名称，payload是附带的数据。
```js
{
    // 显然，这个名字取得很浅显易懂
    type: UPDATE_ARTICLES_LIST,
    payload: {
        articles: articles,
        lastkey: lastkey
    }
}
```
值得注意的是：实际项目中，我们应该尽量减少action中附带的数据，比如想要更新某篇文章的标题，我们只需要携带文章id和文章新标题即可，而不需要携带整个新文章字段。
为了让action更便于维护，我们通常使用action creator而不是action。

##### action creator
action create就是一个简单的函数，直接将action作为返回值。
```js
// action creator，返回一个action
// 除此之外，没有其他的动作
function updateArticlesList(normalizeData, lastkey) {
    return {
        type: UPDATE_ARTICLES_LIST,
        payload: {
            normalizeData: normalizeData,
            listLastkey: lastkey
        }
    }
}


// 通过dispatch触发一个action，这是我们修改state的唯一方式
dispatch(updateArticlesList(
    normalizeData,
    lastkey
));

// 将dispatch(action)整个动作取个别名，方便调用
const updatePosts = (normalizeData, lastkey) => {
    return dispatch(updateArticlesList(
        normalizeData,
        lastkey
    ));
}

updatePosts(...);
```
### 那么为什么需要action creatore呢？
试想一个场景，我们有好几处dispatch(action)，现在突然想要修改这个action的定义，那么我们需要修改所有地方，代码也比较冗余!
而使用action creator，相当于对action做了简单的封装，避免了这些问题。既灵活又便于维护！

##### 异步action creator
我们已经知道，修改state的唯一方式就是触发action，也就是dispatch(action)。
但是如果是异步操作，比如一个网络请求，我们需要等到请求返回之后才会返回action，怎么办呢？
```jsx
function updateArticlesList() {
    return GET(url).then(function(res) {
        // 难道直接return action？
        // 显然是不行的，这儿的返回值并不是updateArticlesList函数的返回值
        return action;
    }).catch(function(err) {
        console.log(err);
    });
}
```
对于异步场景，我们的解决方案是返回函数而不是直接返回action。就像下面这样。
为了让dispatch方法可以接受函数作为参数，我们需要使用redux-thunk这个中间件。

```jsx
import thunk from 'redux-thunk';
import { rootReducer } from './reducer.js';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
```
然后你就可以dispatch一个函数了
```jsx
function fetchArticlesList() {
    // 传入dispatch/getstate，当然是为了获取state以及更新state
    return (dispatch, getState) => {
        return GET(url).then(function(res) {
            dispatch(updateArticlesList(
                normalizeData,
                lastkey
            ));
        }).catch(function(err) {
            console.log(err);
        });
    }
}
```
看起来有点迷糊？其实就是把异步请求抽象成action creator，然后放到了redux的代码中。
试想一下，如果没有这种方式，你会怎么去处理异步请求？
是不是会在组件或者页面中去发异步请求，然后在回调函数中dispatch(action)更新state。本质上也没太大区别。但是好处却是很明显的。

稍微提一下，如果我们可以使用async/await的话，异步action creator可以长得和同步action creator差不多。

action就是一坨数据，它并没有告诉Redux应该怎么去更新state，接下来介绍的reducer就是负责如何更新state这个工作的。

##### reducer是什么鬼？
action本身没有任何意义，就是一个描述性的普通对象。它并没有说明这个数据应该如何更新state。
具体如何更新state，是由reducer决定的。reducer的核心就一行代码：(state, action) => newstate
```js
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [UPDATE_ARTICLES_DETAIL]: (articles, action) => articles,
    [UPDATE_ARTICLES_LIST]: (articles, action) => {
        let payload = action.payload,
            normalizeData = payload.normalizeData,
            list = articles.list.concat(normalizeData.result),
            listLastkey = payload.listLastkey;

        // 更新articles.list字段和articles.lastkey字段
        // 这儿为什么不是state，而是articles呢？留着后文介绍
        return updateObject(articles, {
            list,
            listLastkey
        });
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function articlesReducer(articles = {
    list: [],
    listLastkey: 0
}, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(articles, action) : articles
}
```

reducer函数应该是纯函数，它要保证：只要传入参数相同，那么返回的新state就一定相同。
所以永远不要再reducer中做如下操作：
✦ 修改传入的state参数
✦ 执行有副作用的操作，比如API请求，路由跳转等
✦ 调用非纯函数，比如Math.random()或Date.now()

而一旦state变得复杂、层级较多的时候，如何设计reducer就是一个比较复杂的话题了。
关于如何设计state？如何分拆reducer？reducer之间如何共享数据？以及如何重构reducer的代码？可以移步另一篇博客：如何最佳实践的设计reducer。

那么，回到最初的话题，引入Redux到我们的应用中，到底有什么好处？我们为什么需要一个专门的状态管理器？

### 为啥要使用redux？
早些时候，前端并没有这么复杂，几乎不怎么涉及数据管理。
随着前端的发展，前端也开始引入MVC之类的架构，对数据、视图、逻辑进行拆分处理。为了保持数据和视图的同步，我们会频繁的操作DOM元素。简直是噩梦。
而后KnockoutJS，angularJS等出现了，他们都支持数据绑定，终于让开发可以不在频繁的操作DOM，而是仅仅修改数据，然后自动同步到view。
但这还不够彻底，数据仍然是分散的。我们会在controller中写很多操作数据、操作视图的代码，甚至存在冗余数据，想要修改、更新、同步的话，有很大的隐患。
Redux的出现，提供了对数据的集中管理，让单向数据流成为了可能。
另外，Redux还让前后端彻底分离变成了可能，这一点也有极大的意义。

### Redux的数据流
Redux通过一些限制告诉你：数据只能保存在我这儿，别想太分散！想要修改数据？告诉我一个带新数据的action，我会通过reducer自动修改，然后返回修改后的数据给你！
是的，redux很想“数据库”，数据被集中存储，并且只能通过“预先定义的action操作”来修改。

更厉害的是，配上支持数据绑定的视图库，你会发现一个神奇的事情：
之前我们是面向view和controller编程，随着项目的复杂，代码会彼此影响而且数据会分散到各处。
而引入redux之后，我们单纯的面向数据编程即可，我们在Redux中统一的管理数据，然后数据变换会反映到view上，而数据上的交互，本质上也是触发了Redux中的action。如下图


### Redux数据流
所以，设计redux程序的时候，提前想清楚state的结构尤其重要，就好比设计数据库表结构之于后台。

服务器渲染让前后端彻底分离成为了可能
上图也可以看出，Redux构建出一份单向数据流。这让服务端渲染变成了可能，而这个特性，让前后端彻底分离变成了可能，还不用担心SEO的问题。
想当初，为了解决前后端分离的问题，大家费尽心思，奈何进展甚微，淘宝甚至提出中途岛midway项目，通过中间搭建由前端维护的Nodejs服务器来实现简单的渲染然后返回HTML，但其实这个Nodejs服务器一点都不简单，需要考虑太多东西，比如安全、性能、缓存等。

### 总结
Redux主要用于对数据进行集中管理，并且让整个应用的数据流变得清晰。让应用开发更流畅，数据管理更有效。有了Redux，开发者们慢慢的转化为面向数据编程，而不再是频繁的操作DOM，维护越来越复杂的controller逻辑。
简单来说，Redux的东西不多，更重要的是理解它的思路：
✦ 将整个应用的state储存在唯一的store对象中。
✦ state只能通过触发action来修改，其中action就是一个描述性的普通对象。
✦ 使用reducer来描述action如何改变state。
✦ Redux的单向数据流，可以实现服务端渲染，让前后端彻底分离成为可能，这个有里程碑的意义。
✦ Redux非常适合复杂的应用，尤其是多交互、多数据源的应用。

还是那句话，Redux将数据管理拆得很细，所以会有很多新东西去了解，但其实只要了解它的思想，其他的就很顺其自然了。

作者：齐修_qixiuss
链接：https://www.jianshu.com/p/d296a8c34936
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。