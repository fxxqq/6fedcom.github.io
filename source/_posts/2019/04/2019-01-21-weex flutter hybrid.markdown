---
layout:     post
title:      "Weex Flutter Hybrid"
subtitle:   "聊一聊Weex Flutter Hybrid"
tags:
   - javascript
---
# 聊一聊Weex Flutter Hybrid

## 前言

随着移动互联网的兴起，移动端被各类原生应用所占据，而这些应用依托于应用市场进行更新，每次更新，必须依赖用户的主动更新，从而造成了一定的用户成本，不利于产品的快速迭代，在这个时间就是金钱，效率至上的时代，而且现在很多互联网公司都在搞敏捷开发，这显然是不符合大家的目标。因此移动端动态化方案也逐渐走进大众的视野，并被广泛关注。

说道这里要顺便插一句，原生开发就不能支持动态化吗？答案肯定是可以的。Android一直都有成熟的动态化方案，Google在2018年还提供了 **Android App Bundles**让开发者们可以更好的支持动态化。反观IOS，如果你做过游戏开发，想必对JSPatch这项技术一点也陌生，JSPatch是腾讯开源的针对IOS的热更新技术，不过Apple官方对动态化是不带支持的，原因就是担忧动态化的风险，所以在2017年还大肆封杀了一波JSPathc等热更新技术的应用。因此在IOS平台是没有比较通用的动态化方案，只有每个大厂各自实现的一些框架。

说回正题，既然前面说到动态化已经越来越被大众关注，那么因此各类框架就层出不穷，下面我们就来聊一聊几个备受业界关注的明星框架。

##Hybrid
**Hybrid**顾名思义，就是结合Web和Native两个技术各自的优势，例如Web的跨平台特性和Native的功能和性能等。其实后面要讲的Weex，Flutter都是属于Hybrid的范畴，但是大多时候圈内人谈到Hybrid技术的时候，一般是指移动端内嵌WebView的开发方案。下面我们主要聊一聊这个方向的Hybrid。

Hybrid App最核心的点就是Native端和H5端之间的双向通讯层，其实我们可以理解为我们需要一套**跨语言解决方案**，来完成Native和JS之间的通讯，这就是我们经常提起的JSBridge，而实现的关键便是作为容器的Webview。

#### 1.JS通知Native

一般有三种解决方案

* **API注入** Native获取JS环境上下文，并直接在上面挂载对象或者方法，使JS可以直接调用，Android与IOS分别拥有对应的挂载方式。

* **WebView 中的 prompt/console/alert 拦截** 通常使用 prompt，因为这个方法在前端中使用频率低，比较不会出现冲突。

* **WebView URL Scheme 跳转拦截**

#### 2.Native通知JS

由于Native可以算作H5的宿主，因此拥有更大的权限，上面也提到了**Native可以通过WebView API直接执行JS代码**。这样的权限也就让这个方向的通讯变得十分的便捷。


```
// IOS
webview.stringByEvaluatingJavaScriptFromString("alert('NativeCall')")
```


```
// Android(4.4-)
webView.loadUrl("javascript:JSBridge.trigger('NativeCall')")
```

```
// Android(4.4+)
mWebView.evaluateJavascript（"javascript:JSBridge.trigger('NativeCall')",      
new ValueCallback<String>() {
    @Override
    public void onReceiveValue(String value) {
        //此处为 js 返回的结果
    }
});
```
当Android系统低于4.4时，evaluateJavascript 是无法使用的，因此单纯的使用 loadUrl 无法获取 JS 返回值，这时我们需要使用前面提到的 prompt 的方法进行兼容，让 H5端 通过 prompt 进行数据的发送，客户端进行拦截并获取数据。

基于上面的知识，我们已经大致明白JSBridge的原理了。


#### App中H5的接入方式

* **在线H5** 这是最常见的一种方式。只需将H5代码部署到服务器上。把对应的URL给到客户端，用 WebView 打开该URL，即可嵌入。其优点是：
  1. 独立性强，有非常独立的开发/调试/更新/上线能力；
  2. 资源放在服务器上，完全不会影响客户端的包体积；
  3. 接入成本很低，完全的热更新机制；

  缺点:
  1. 完全的网络依赖，在离线的情况下无法打开页面
  2. 首屏加载速度依赖于网络，网络较慢时，首屏加载也较慢；


* **离线H5** 这是一种本地化的嵌入方式，我们需要将代码进行打包后下发到客户端，并由客户端直接解压到本地储存中。其优点是：
  1. 由于其本地化，首屏加载速度快
  2. 可以不依赖网络，离线运行
  
  缺点：
  1. 开发流程/更新机制复杂化，需要客户端，甚至服务端的共同协作
  2. 会相应的增加 App 包体积
  
## Weex
Weex是阿里在2016年6月开源的一种用于构建移动跨平台的UI框架，在2017年托管在Apache基金会上。

**“Write once, run everywhere”** 这是Weex倡导的思想，借鉴如今大火的FaceBook开源的React Native的思想，选择使用Vue.js框架的语法开发weex代码，也可以使用Rax，无论是哪种语法，经过编译都可以被app中的weex sdk所解析，并在底层以Native的形式渲染。

* Weex 的开发和 web 开发体验可以说是几乎一样。包括语法设计和工程链路等。
* Weex 的组件、模块设计都是 iOS、Android、Web 的开发者共同讨论出来的，有一定的通用性和普遍性。
* Weex 开发同一份代码，可以在不同的端上分别执行，避免了多端的重复研发成本。

在同构这条路上，Weex 比 React Native做得更彻底，几乎做到了**你来使用 vue 写一个webapp，我顺便给你编译成了 ios 和 android 的原生 app**

至于为什么要造这个轮子，官方给了以下说法：

`
1、今天在技术社区有大量的 web 开发者，Weex 可以赋能更多的 web 开发者构建高性能和高体验的移动应用。
2、Web 开发本身具有非常强的高效率和灵活性，这和 Weex 想解决的移动端动态性问题不谋而合。
3、Web 标准和开发体验是很多顶尖而优秀的科技公司共同讨论和建设的结果，本身的设计和理念都有极高的品质保障
4、同时 Weex 也希望可以借此机会努力为标准贡献一点自己的微薄之力。
5、Web 是一种标准化的技术，标准本身就是一种力量，基于标准、尊重标准、贴近标准都意味着拥有更多的可能性。
6、Web 今天的生态和社区是非常繁荣的，有很多成熟的工具、库、工程体系、最佳实践可以使用、引入和借鉴。
`

### Vue在Weex中的不同
**1.Weex环境中没有DOM**
因为 Weex 解析 vue 得到的并不是 dom，而是原生布局树

**2.支持有限的事件**
并不支持 Web 中所有的事件类型，详情请参考[通用事件](http://weex.apache.org/cn/wiki/common-events.html)

**3.没有BOM但可以调用原生API**
在 Weex 中能够调用移动设备原生 API，使用方法是通过注册、调用模块来实现。其中有一些模块是 Weex 内置的，如 clipboard 、 navigator 、storage 等。
为了保持框架的通用性，Weex 内置的原生模块有限，不过 Weex 提供了横向扩展的能力，可以扩展原生模块，具体的扩展方法请参考[iOS扩展](http://weex.apache.org/cn/guide/extend-ios.html)和[Android扩展](http://weex.apache.org/cn/guide/extend-android.html)。

### 样式差异
Weex 中的样式是由原生渲染器解析的，出于性能和功能复杂度的考虑，Weex 对 CSS 的特性做了一些取舍

**1.Weex 中只支持单个类名选择器，不支持关系选择器，也不支持属性选择器。**
**2.组件级别的作用域，为了保持 web 和 Native 的一致性，需要`<style scoped>`写法。**
**3、支持了基本的盒模型和flexbox布局，详情可参考[Weex通用样式文档](http://weex.apache.org/cn/wiki/common-styles.html)。但是需要注意的是**
1.不支持`display: none;`可用`opacity: 0;`代替 (`opacity<=0.01`时，元素可点透）
2.样式属性暂不支持简写（提高解析效率）
3.flex布局需要注意web的兼容
4.css不支持3D变换


### 打包
熟悉 React Native 的人都知道， React Native 的发布实际上就是发布一个 JSBundle，Weex 也是这样，但不同的是，Weex 将工程进行分包，发布多个 JSBundle。因为 Weex 是单页独立开发的，每个页面都将通过 Weex 打包器将 vue/we 页面打包成一个单独的 JSBundle，这样的好处在于减少单个 bundle 包的大小，使其变的足够小巧轻量，提高增量更新的效率。

打包后的 JSBundle 有两种格式


```
# 由.vue文件打包出来的包格式（简写），使用 vue 2.0 语法编写
// { "framework": "Vue"} 
/******/ (function(modules) { 
          .......
/******/ })
```

```
# 由.we文件打包出来的包格式（简写），使用 weex 语法编写
// { "framework": "Weex" }
/******/ (function(modules) { 
          .......
/******/ })
```

### 执行
Weex 的 iOS 和 Android 客户端的【JSFramework】中都会运行一个 JavaScript 引擎，来执行 JS bundle，同时向各端的渲染层发送规范化的指令，调度客户端的渲染和其它各种能力。iOS 下选择了 JavaScriptCore 内核，而在 Android 下选择了 UC 提供的 v8 内核（RN两端都是JavaScriptCore 内核）。

JSBundle 被 push 到客户端后就会在 JSFramework 中执行，最终输出三端可读性的 VNode 节点，数据结构简化如下：


```
{
  tag: 'div',
  data: {
    staticStyle: { justifyContent: 'center' }
  },
  children: [{
    tag: 'text',
    data: {
      staticClass: 'txt'
    },
    context: {
      $options: {
        style: {
          freestyle: {
            textAlign: 'center',
            fontSize: 200
          }
        }
      }
    },
    children: [{
      tag: '',
      text: '文字'
    }]
  }]
}
```

有了统一的 VNode 节点，各端即可根据自己的方法解析渲染原生UI了，之前的所有操作都是一致的，包括文件格式、打包编译过程、模板指令、组件的生命周期、数据绑定等。

官方配图：
<center><img src='../../../../img/201901/weex1.png'></center>
扩展配图：
<center><img src='../../../../img/201901/weex2.jpeg'></center>


## Flutter

我们先看看官方对它的定义：
`
Flutter 是 Google 用以帮助开发者在 iOS 和 Android 两个平台开发高质量原生 UI 的移动 SDK。Flutter 兼容现有的代码，免费并且开源，在全球开发者中广泛被使用。
`
看上去好像还不错，但 Flutter 究竟有哪些与众不同呢？我们按照官方描述的四个方面，分别来说说：

* Beautiful - Flutter 允许你控制屏幕上的每一寸像素，这让「设计」不用再对「实现」妥协；
* Fast - 一个应用不卡顿的标准是什么，你可能会说 16ms 抑或是 60fps，这对桌面端应用或者移动端应用来说已足够，但当面对广阔的 AR/VR 领域，60fps 仍然会成为使人脑产生眩晕的瓶颈，而 Flutter 的目标远不止 60fps；借助 Dart 支持的 AOT 编译以及 Skia 的绘制，Flutter 可以运行的很快；
* Productive - 前端开发可能已经习惯的开发中 hot reload 模式，但这一特性在移动开发中还算是个新鲜事。Flutter 提供有状态的 hot reload 开发模式，并允许一套 codebase 运行于多端；其他的，再比如开发采用 JIT 编译与发布的 AOT 编译，都使得开发者在开发应用时可以更加高效；
* Open - Dart / Skia / Flutter (Framework)，这些都是开源的，Flutter 与 Dart 团队也对包括 Web 在内的多种技术持开放态度，只要是优秀的他们都愿意借鉴吸收。而在生态建设上，Flutter 回应 GitHub Issue 的速度更是让人惊叹，因为是真的快（closed 状态的 issue 平均解决时间为 0.29天）；

下面我们来看一下Flutter的架构图：
<center><img src='../../../../img/201901/weex3.jpg'></center>


从上至下分别为 Framework，Engine 和 EmEmbedder：

* Framework 层是框架使用者需要直接面对的，包含文本/图片/按钮等基础 Widgets、渲染、动画、手势等。如果你写 Flutter 应用，那么大致可以理解为调用这些 package 然后再用 Dart 「拼装」些自己的代码。
* Engine 层使用 C++ 实现，这一层包含 Skia，Dart 和 Text。后两个不太熟，说说 Skia。这是一个二维图形库，提供了适用于多种软/硬件平台的通用 API，既是 Chrome，Chrome OS，Android，Firefox，Firefox OS 等产品的图形引擎，也支持 Windows 7+，macOS 10.10.5+，iOS8+，Android4.1+，Ubuntu14.04+ 等平台；Dart 可能包含 Dart Runtime 等（JIT/AOT），Text 则负责文字渲染部分。
* Embedder 是一个嵌入层，做的事情是 Flutter to Platforms。比如渲染 Surface，线程设置，插件等。Flutter 的平台层很低，比如 iOS 只是提供一个画布，剩余的所有渲染相关的逻辑都在 Flutter 内部，而这就是 Flutter 所宣传的可以精准控制每一个像素的原因；但不可否认，对于插件部分，还是需要特定操作系统底层的建设（比如支付、地图等）。
  