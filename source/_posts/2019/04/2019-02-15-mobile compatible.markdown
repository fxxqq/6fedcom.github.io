---
layout:     post
title:      "mobile compatible"
subtitle:   "移动前端兼容实践"
tags:
   - 前端开发
---

## IOS click事件300ms延迟问题

这个起因是由于区分单击和双击的历史原因造成的。

解决方案：

* 引入fastclick
* 触摸事件的响应顺序为 touchstart --> touchmove --> touchend --> click,也可以通过绑定ontouchstart事件，加快对事件的响应

## Android4.4以下图片无法使用base64

## 1px问题

这个问题基本上是个老生常谈的问题，可以看下我的博客详细描述了如何解决1px的问题 [1px](https://invictusnightmares.github.io/2017/07/14/css-1px/)

## 兼容刘海屏

可以看下这篇文章 [兼容iphone x * 刘海的正确姿势](https://imweb.io/topic/5baa38c279ddc80f36592efb)

## css动画卡顿

* 尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位
* 开启硬件加速
  
  ```
-webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
```

## requestAnimate兼容

在日常开发中如果遇到CSS无法完成的动画（比如页面滚动），通常的解决方案就是使用**setInterval**设置定时器来实现动画特效，但是定时器不是那么可靠，存在误差。

一般情况下，每秒平均刷新次数能够达到60帧，就能够给人流畅的体验，即每过 1000/60 毫秒渲染新一帧即可，光靠定时器是无法保证的。**requestAnimationFrame**就是解决这个问题的。在日常开发中，这个api是个很有用的帮手。关于它的兼容引入这段代码就可以了：

```
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
```

## fixed定位问题
IOS下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位。这里引用一下这篇经典文章
[移动端Fixed布局的解决方案](https://efe.baidu.com/blog/mobile-fixed-layout/)

## Input的placeholder会出现文本位置偏上的情况

设置 **line-height：normal**

## 禁止长按复制和缩放

在app里内嵌的一些网页有时候我们是不需要长按复制这些功能的，可以这样禁止：

```
.no-touch {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
```

缩放可以这样禁止：

```
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1, user-scalable=no">
```

## 移动端适配

可以参考一下淘宝团队出的Flexible方案，接触了几个大厂，基本是比较主流的适配方案：
[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

## 部分Android系统中元素被点击会产生边框

解决方案：

```
a,button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0;)
-webkit-user-modify:read-write-plaintext-only; 
}
```

## audio问题

这块不经常接触，但是IOS下考虑到用户体验问题，限制audio必须在用户主动交互之后才能够播放。

解决方案：提前创建audio标签，用户交互之后触发自动播放



