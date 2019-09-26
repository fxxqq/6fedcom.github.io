---
layout: post
title: Virtual Dom 算法
subtitle: 浅析Virtual Dom
tags:
  - javascript
abbrlink: 7cca498
date: 2019-04-05 17:29:11
---

### 1.Virtual Dom 算法

DOM 是慢的，我在控制台把一个简单的 div 属性打印出来见下图:

<center><img src='../../../../img/0405/vd2.png'></center>
这仅仅是第一层，真正的DOM元素非常庞大，我们在操作的DOM的时候都是小心翼翼的，轻微的改变可能就会引起浏览器重排，这可是杀死性能的罪魁祸首。

相比于 DOM 对象，原生的 JS 对象处理起来的更快更简单，DOM 树的结构和属性信息我们可以很简单的用 JS 对象标识：

```js
const element = {
  tagName: 'ul', // 节点标签名
  props: { id: 'list' }, // DOM的属性
  children: [
    // 子节点
    { tagName: 'li', props: { class: 'item' }, children: ['Item 1'] },
    { tagName: 'li', props: { class: 'item' }, children: ['Item 1'] },
    { tagName: 'li', props: { class: 'item' }, children: ['Item 1'] }
  ]
}
```

对应的 HTML：

```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
  <li class="item">Item 3</li>
</ul>
```

既然可以用 JS 对象可以表示 DOM 树，那么之前说的状态变更->重新渲染整个视图的方式可以稍微修改一下：当状态变更的时候，重新渲染这个 JS 的对象结构，然后用新渲染的对象树去和旧的树进行对比，记录这两棵树差异。记录下来的不同就是我们需要对页面真正的 DOM 操作，然后把它们应用在真正的 DOM 树上，页面就变更了。这样就可以做到：视图的结构确实是整个全新渲染了，但是最后操作 DOM 的时候确实只变更有不同的地方。

简要概括为以下三个步骤：

1. 用 JS 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中。
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异。
3. 把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

`Virtual DOM` 的本质其实是在 JS 和 DOM 之间做了一个缓存，可以类比 CPU 和硬盘，硬盘这么慢，就在它们之间加了一个缓存。CPU（JS）只操作内存（`Virtual DOM`），最后再把变更写入硬盘（DOM）。

### 2.算法实现

上面说了 `Virtual Dom` 主要有三个步骤，那么下面就简述一下三个步骤的具体实现：

#### 2.1 用 JS 对象模拟 DOM 树

用 JS 表示一个 DOM 节点很简单，只需要记录它的节点类型、属性，还有子节点：
element.js

```js
function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

module.exports = function(tagName, props, children) {
  return new Element(tagName, props, children)
}
```

那么 2 里面的 DOM 结构我们可以这样表示：

```js
const el = require('./element')

const ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
])
```

现在 ul 只是一个 JS 对象表示的 DOM 结构，页面上并没有这个结构。我们可以根据这个 ul 构建真正的 ul：

```js
Element.prototype.render = function() {
  const el = document.createElement(this.tagName) // 根据tagName构建
  const props = this.props

  for (const propName in props) {
    // 设置节点的DOM属性
    const propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  const children = this.children || []

  children.forEach(function(child) {
    const childEl =
      child instanceof Element
        ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
        : document.createTextNode(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
  })

  return el
}
```

render 方法会根据 tagName 构建一个真正的 DOM 节点，然后设置这个节点的属性，最后递归地把自己的子节点也构建起来。所以只需要：

```js
const ulRoot = ul.render()
document.body.appendChild(ulRoot)
```

上面的 ulRoot 是真正的 DOM 节点，把它塞入文档中，这样 body 里面就有了真正的 ul 的 DOM 结构：

```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
  <li class="item">Item 3</li>
</ul>
```

#### 2.2 比较两棵虚拟 DOM 树的差异

比较两棵 DOM 树的差异是 Virtual DOM 算法最核心的部分，也就是所谓的 Virtual Dom 的 diff 算法，两个树的完全的 diff 算法是一个时间复杂度为 O(n ^ 3)的问题。但是在前端实际操作中很少会跨越层级地移动 DOM 元素。所以 Virtual DOM 只会对同一个层级的元素进行对比：

<center><img src='../../../../img/0405/vd3.png'></center>

上面的 div 只会跟同一层级的 div 进行对比，第二层级只会跟第二层级对比，这样的话算法的时间复杂度可以降到 O(n)。

**2.2.1 深度优先遍历，记录差异**

对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记：

<center><img src='../../../../img/0405/vd4.png'></center>

在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。

```js
// diff 函数，对比两棵树
function diff (oldTree, newTree) {
  const index = 0; // 当前节点的标志
  const patches = {}; // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}

// 对两棵树进行深度优先遍历
function dfsWalk (oldNode, newNode, index, patches) {
  // 对比oldNode和newNode的不同，记录下来
  patches[index] = [...];

  diffChildren(oldNode.children, newNode.children, index, patches);
}

// 遍历子节点
function diffChildren (oldChildren, newChildren, index, patches) {
  let leftNode = null;
  let currentNodeIndex = index;
  oldChildren.forEach(function (child, i) {
    const newChild = newChildren[i];
    currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1;
    dfsWalk(child, newChild, currentNodeIndex, patches); // 深度遍历子节点
    leftNode = child;
  })
}
```

例如，上面的 div 和新的 div 有差异，当前的标记是 0，那么：

```js
patches[0] = [{difference}, {difference}, ...] // 用数组存储新旧节点的不同
```

那么以此类推,p 就是 patches[1]，ul 就是 patches[2]。

**2.2.2 差异类型**

上面说的节点差异指什么？对 DOM 的操作可能会： 1.替换掉原来的节点。 2.移动、删除、新增子节点。 3.修改了节点的属性。 4.对于文本节点，文本内容可能会改变。

所以定义了几个类型：

```js
const REPLACE = 0
const REORDER = 1
const PROPS = 2
const TEXT = 3
```

针对第一点，判断新旧节点的 tagName 和是不是一样的，如果不一样的说明需要替换掉：

```js
patches[0] = [
  {
    type: REPALCE,
    node: newNode
  }
]
```

针对第三点，如果新增了属性 id 为 container：

```js
patches[0] = [
  {
    type: PROPS,
    props: {
      id: 'container'
    }
  }
]
```

针对第四点，记录为文本节点：

```js
patches[0] = [
  {
    type: TEXT,
    content: 'NEW TEXT'
  }
]
```

第二点的排序：
例如 p, ul, div 的顺序换成了 div, p, ul。这个该怎么对比？如果按照同层级进行顺序对比的话，它们都会被替换掉。如 p 和 div 的 tagName 不同，p 会被 div 所替代。最终，三个节点都会被替换，这样 DOM 开销就非常大。而实际上是不需要替换节点，而只需要经过节点移动就可以达到。这个问题抽象出来其实是字符串的最小编辑距离问题，然后可以这样记录：

```js
patches[0] = [{
  type: REORDER,
  moves: [{remove or insert}, {remove or insert}, ...]
}]
```

是要注意的是，因为 tagName 是可重复的，不能用这个来进行对比。所以需要给子节点加上唯一标识 key，列表对比的时候，使用 key 进行对比，这样才能复用老的 DOM 树上的节点。

这样，我们就可以通过深度优先遍历两棵树，对每层的节点进行对比，记录下每个节点的差异了。

#### 2.3 把差异应用到真正的 DOM 树上：

因为步骤一所构建的 JS 对象树和 render 出来真正的 DOM 树的信息、结构是一样的。所以我们可以对那棵 DOM 树也进行深度优先的遍历，遍历的时候从步骤二生成的 patches 对象中找出当前遍历的节点差异，然后进行 DOM 操作。

```js
function patch(node, patches) {
  const walker = { index: 0 }
  dfsWalk(node, walker, patches)
}

function dfsWalk(node, walker, patches) {
  const currentPatches = patches[walker.index] // 从patches拿出当前节点的差异

  const len = node.childNodes ? node.childNodes.length : 0
  for (var i = 0; i < len; i++) {
    // 深度遍历子节点
    const child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches) // 对当前节点进行DOM操作
  }
}
```

`applyPatches`，根据不同类型的差异对当前节点进行 DOM 操作：

```js
function applyPatches(node, currentPatches) {
  currentPatches.forEach(function(currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node)
        break
      case REORDER:
        reorderChildren(node, currentPatch.moves)
        break
      case PROPS:
        setProps(node, currentPatch.props)
        break
      case TEXT:
        node.textContent = currentPatch.content
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}
```

### 5.小结

Virtual Dom 算法主要分为三个步骤：

1.create element

2.diff

3.patch

```js
// 1. 构建虚拟DOM
var tree = el('div', {'id': 'container'}, [
  el('h1', {style: 'color: blue'}, ['simple virtal dom']),
  el('p', ['Hello, virtual-dom']),
  el('ul', [el('li')])
])

// 2. 通过虚拟DOM构建真正的DOM
const root = tree.render()；
document.body.appendChild(root)；

// 3. 生成新的虚拟DOM
const newTree = el('div', {'id': 'container'}, [
  el('h1', {style: 'color: red'}, ['simple virtal dom']),
  el('p', ['Hello, virtual-dom']),
  el('ul', [el('li'), el('li')])
])；

// 4. 比较两棵虚拟DOM树的不同
const patches = diff(tree, newTree)；

// 5. 在真正的DOM元素上应用变更
patch(root, patches)；
```

### 6.Vue Virtual Dom VS React Virtual Dom

Vue 官网上贴了这样一段话：

<center><img src='../../../../img/0405/vd5.png'></center>

尤大也在知乎上给出了答案：

<center><img src='../../../../img/0405/vd6.png'></center>

Vue 和 React 的 diff 算法几乎一样，每 state 改变时，Vue 会根据依赖找到最上层的 vdom 并以该组件为根，重新渲染整个 VDom 树而 React 会根据调用 setState 这个方法的这个组件， 以该组件为根重新渲染整个 VDom 树。

当项目比较小的时候，Vue 的依赖追踪可以比 React 做更少的工作，而 React 要达到相同的效果需要在每个组件内用 `shouldComponentUpdate` 或者是使用 `PureComponent` 因此相比 Vue 比较繁复。

当项目变得庞大的时候，Vue 的 re-render 相比 React 可以利用 `PureComponent` 或者 `shouldComponentUpdate` 方法优化的情况下，将变得重复且多余。
