---
layout:     post
title:      "Virtual Dom"
subtitle:   "浅析Virtual Dom"
tags:
   - javascript
---
# 浅析Virtual Dom

### 1.思考

从我自己的经历说起，最开始是做Android开发，接触前端是从React开始的，没用经历过像JS，JQuery等这种传统的前端技术，不过也庆幸没有经历兼容IE6的痛苦(逃。写多了React，Vue这种目前比较流行的前端框架就觉得MVVM，双向数据绑定，高性能Virtual Dom这些技术是理所当然的，直到面试的时候被问的哑口无言才下定决心要好好学习这些“理所当然”的技术。

### 2.举个栗子

假如现在需要写一个像下面一样的表格的应用程序，这个表格可以根据不同的字段进行升序或者降序的展示。（这时候让我们忘了Vue，忘了React，忘了v-model，忘了setState）
<center><img src='../../../../img/201810/vd1.png'></center>

这时候我们首先想到的可能是这样:

```
const sortKey = "new" // 排序的字段，新增（new）、取消（cancel）、净关注（gain）、累积（cumulate）人数
const sortType = 1 // 升序还是逆序
const data = [{...}, {...}, {..}, ..] // 表格数据
```
用三个字段分别存储当前排序的字段、排序方向、还有表格数据；然后给表格头部加点击事件：当用户点击特定的字段的时候，根据上面几个字段存储的内容来对内容进行排序，然后用 JS 或者 jQuery 操作 DOM，更新页面的排序状态（表头的那几个箭头表示当前排序状态，也需要更新）和表格内容。

但是随着应用程序越来越复杂，需要维护的字段也会越来越多，需要监听的事件和在事件回调操作DOM也越来越多，程序会变得越来越难维护。后来人们发明了MVC,MVP架构模式，希望能从代码组织方式来降低维护这种复杂应用程序的难度。但是这并没有减少所维护的状态，也没有降低状态更新对DOM的操作，只是换了一个地方。

后来人们发明了MVVM模式，就是把视图和状态进行绑定，状态更新了视图就自动更新，只要在模版中声明视图组件是和什么状态进行绑定的，双向绑定引擎就会在状态更新的时候自动更新视图。MVVM可以极大降低我们维护状态->更新视图的复杂程度。

但是这不是唯一的办法，还有一个非常直观的方法就是一旦状态发生了变化，就用模版引擎重新渲染整个视图，然后用新的视图更换掉旧的视图。就像上面的表格，当用户点击或者在JS里面更新状态，不用手动操作DOM，直接把整个表格用模版引擎重新渲染一遍，在重新innerHTML就好了。但是你会发现这样做有一个致命的缺点，就是**慢慢慢**。哪怕一个小小的状态变化都要重新构造整DOM树，性价比太低。所以最后的结论是：对于局部的小视图更新，没有问题（Backbone就是这么干的）,但是对于大型视图，这样的做法就不可取了。

但是要记住这个方法，因为Virtual Dom就是基于这个方法的，只是加了一些特别的步骤来避免了整棵DOM树变更。

上述的方法其实都是在做一件事：**维护状态，更新视图**。

### 3.Virtual Dom算法
DOM是慢的，我在控制台把一个简单的div属性打印出来见下图:
<center><img src='../../../../img/201810/vd2.png'></center>
这仅仅是第一层，真正的DOM元素非常庞大，我们在操作的DOM的时候都是小心翼翼的，轻微的改变可能就会引起浏览器重排，这可是杀死性能的罪魁祸首。

相比于DOM对象，原生的JS对象处理起来的更快更简单，DOM树的结构和属性信息我们可以很简单的用JS对象标识：

```
const element = {
  tagName: 'ul', // 节点标签名
  props: {id: 'list'}, // DOM的属性
  children: [ // 子节点
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
  ]
};
```
对应的HTML：


```
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```
既然可以用JS对象可以表示DOM树，那么之前说的状态变更->重新渲染整个视图的方式可以稍微修改一下：当状态变更的时候，重新渲染这个JS的对象结构，然后用新渲染的对象树去和旧的树进行对比，记录这两棵树差异。记录下来的不同就是我们需要对页面真正的DOM操作，然后把它们应用在真正的DOM树上，页面就变更了。这样就可以做到：视图的结构确实是整个全新渲染了，但是最后操作DOM的时候确实只变更有不同的地方。

简要概括为以下三个步骤：
1. 用JS对象结构表示DOM树的结构；然后用这个树构建一个真正的DOM树，插到文档当中。
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异。
3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。

Virtual DOM的本质其实是在JS和DOM之间做了一个缓存，可以类比CPU和硬盘，硬盘这么慢，就在它们之间加了一个缓存。CPU（JS）只操作内存（Virtual DOM），最后再把变更写入硬盘（DOM）。

### 4.算法实现
上面说了Virtual Dom主要有三个步骤，那么下面就简述一下三个步骤的具体实现：

#### 4.1 用JS对象模拟DOM树

用JS表示一个DOM节点很简单，只需要记录它的节点类型、属性，还有子节点：
element.js

```
function Element (tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children);
}
```

那么2里面的DOM结构我们可以这样表示：

```
const el = require('./element');

const ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
]);
```

现在ul只是一个JS对象表示的DOM结构，页面上并没有这个结构。我们可以根据这个ul构建真正的ul：

```
Element.prototype.render = function () {
  const el = document.createElement(this.tagName); // 根据tagName构建
  const props = this.props;

  for (const propName in props) { // 设置节点的DOM属性
    const propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  const children = this.children || [];

  children.forEach(function (child) {
    const childEl = (child instanceof Element)
      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
      : document.createTextNode(child); // 如果字符串，只构建文本节点
    el.appendChild(childEl);
  })

  return el;
}
```

render方法会根据tagName构建一个真正的DOM节点，然后设置这个节点的属性，最后递归地把自己的子节点也构建起来。所以只需要：

```
const ulRoot = ul.render();
document.body.appendChild(ulRoot);
```

上面的ulRoot是真正的DOM节点，把它塞入文档中，这样body里面就有了真正的ul的DOM结构：

```
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```

#### 4.2 比较两棵虚拟DOM树的差异
比较两棵DOM树的差异是Virtual DOM算法最核心的部分，也就是所谓的Virtual Dom的diff算法，两个树的完全的 diff 算法是一个时间复杂度为O(n ^ 3)的问题。但是在前端实际操作中很少会跨越层级地移动DOM元素。所以Virtual DOM只会对同一个层级的元素进行对比：

<center><img src='../../../../img/201810/vd3.png'></center>

上面的div只会跟同一层级的div进行对比，第二层级只会跟第二层级对比，这样的话算法的时间复杂度可以降到O(n)。

**4.2.1深度优先遍历，记录差异**

对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记：

<center><img src='../../../../img/201810/vd4.png'></center>

在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。

```
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
例如，上面的div和新的div有差异，当前的标记是0，那么：

```
patches[0] = [{difference}, {difference}, ...] // 用数组存储新旧节点的不同
```
那么以此类推,p就是patches[1]，ul就是patches[2]。

**4.2.2差异类型**

上面说的节点差异指什么？对DOM的操作可能会：
1.替换掉原来的节点。
2.移动、删除、新增子节点。
3.修改了节点的属性。
4.对于文本节点，文本内容可能会改变。

所以定义了几个类型：

```
const REPLACE = 0;
const REORDER = 1;
const PROPS = 2;
const TEXT = 3;
```
针对第一点，判断新旧节点的tagName和是不是一样的，如果不一样的说明需要替换掉：

```
patches[0] = [{
  type: REPALCE,
  node: newNode
}]
```
针对第三点，如果新增了属性id为container：

```
patches[0] = [{
  type: PROPS,
  props: {
    id: "container"
  }
}]
```

针对第四点，记录为文本节点：

```
patches[0] = [{
  type: TEXT,
  content: "NEW TEXT"
}]
```

第二点的排序：
例如p, ul, div的顺序换成了div, p, ul。这个该怎么对比？如果按照同层级进行顺序对比的话，它们都会被替换掉。如p和div的tagName不同，p会被div所替代。最终，三个节点都会被替换，这样DOM开销就非常大。而实际上是不需要替换节点，而只需要经过节点移动就可以达到。这个问题抽象出来其实是字符串的最小编辑距离问题，然后可以这样记录：

```
patches[0] = [{
  type: REORDER,
  moves: [{remove or insert}, {remove or insert}, ...]
}]
```
是要注意的是，因为tagName是可重复的，不能用这个来进行对比。所以需要给子节点加上唯一标识key，列表对比的时候，使用key进行对比，这样才能复用老的 DOM 树上的节点。

这样，我们就可以通过深度优先遍历两棵树，对每层的节点进行对比，记录下每个节点的差异了。
#### 4.3 把差异应用到真正的DOM树上：
因为步骤一所构建的JS对象树和render出来真正的DOM树的信息、结构是一样的。所以我们可以对那棵DOM树也进行深度优先的遍历，遍历的时候从步骤二生成的patches对象中找出当前遍历的节点差异，然后进行 DOM 操作。

```
function patch (node, patches) {
  const walker = {index: 0};
  dfsWalk(node, walker, patches);
}

function dfsWalk (node, walker, patches) {
  const currentPatches = patches[walker.index]; // 从patches拿出当前节点的差异

  const len = node.childNodes
    ? node.childNodes.length
    : 0
  for (var i = 0; i < len; i++) { // 深度遍历子节点
    const child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches); // 对当前节点进行DOM操作
  }
}
```

applyPatches，根据不同类型的差异对当前节点进行 DOM 操作：

```
function applyPatches (node, currentPatches) {
  currentPatches.forEach(function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node);
        break
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break
      case PROPS:
        setProps(node, currentPatch.props);
        break
      case TEXT:
        node.textContent = currentPatch.content;
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  })
}
```
### 5.小结
Virtual Dom算法主要分为三个步骤：

1.create element

2.diff

3.patch

```
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
Vue官网上贴了这样一段话：

<center><img src='../../../../img/201810/vd5.png'></center>


尤大也在知乎上给出了答案：


<center><img src='../../../../img/201810/vd6.png'></center>

Vue和React的diff算法几乎一样，每state改变时，Vue会根据依赖找到最上层的vdom并以该组件为根，重新渲染整个VDom树而React会根据调用setState这个方法的这个组件， 以该组件为根重新渲染整个VDom树。

当项目比较小的时候，Vue的依赖追踪可以比React做更少的工作，而React要达到相同的效果需要在每个组件内用shouldComponentUpdate或者是使用PureComponent因此相比Vue比较繁复。

当项目变得庞大的时候，Vue的re-render相比React可以利用PureComponent或者shouldComponentUpdate方法优化的情况下，将变得重复且多余。
