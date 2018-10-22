---
title: 虚拟DOM（一）
date: 2018-10-20 22:12:12
tags: 
   - JavaScript
   - 虚拟DOM
categories: Front-End
---

## 一、什么是 vdom

- 用 `JS` 模拟 `DOM` 结构
- `DOM` 变化的对比，放在 `JS` 层来做
- 提高重绘性能


## 二、设计一个需求场景

![image.png](https://upload-images.jianshu.io/upload_images/1480597-ecb5ff293ddc8aed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**用jQuery实现**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-68270e52c16db126.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/1480597-f6538e3e5d70378a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/1480597-4245c22334b69ed9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**遇到的问题**

- DOM 操作是“昂贵”的，js 运行效率高
- 尽量减少 DOM 操作，而不是“推倒重来”
- 项目越复杂，影响就越严重
- vdom 即可解决这个问题

![image.png](https://upload-images.jianshu.io/upload_images/1480597-e6482808654c0d90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 三、vdom 的如何应用，核心 API 是什么

**什么是 vdom**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-cd7999ff2c9f675c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**介绍 snabbdom**


![image.png](https://upload-images.jianshu.io/upload_images/1480597-6315c360edc1b4af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1480597-06a5989e70e0a367.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**介绍 snabbdom - h 函数**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-6f5499e3221909fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**介绍 snabbdom - patch 函数**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-ddd86c5acbcc2c1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**重做jQuery的demo**

- 使用 `data `生成 `vnode`
- 第一次渲染，将 `vnode` 渲染到 `#container `中
- 并将 `vnode` 缓存下来
- 修改 `data` 之后，用新 `data` 生成 `newVnode`
- 将 `vnode` 和 `newVnode` 对比

![image.png](https://upload-images.jianshu.io/upload_images/1480597-66ffa5d864b85710.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**核心 API**

- `h(‘<标签名>’, {…属性…}, […子元素…])`
- ` h(‘<标签名>’, {…属性…}, ‘….’)`
- `patch(container, vnode) `
- `patch(vnode, newVnode) `

## 四、介绍一下 diff 算法

### 4.1 vdom 为何使用 diff 算法

- DOM 操作是“昂贵”的，因此尽量减少 DOM 操作
- 找出本次 DOM 必须更新的节点来更新，其他的不更新
- 这个“找出”的过程，就需要 diff 算法

![image.png](https://upload-images.jianshu.io/upload_images/1480597-20f2d2d895fd2e52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**patch(container, vnode)**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-2f58b6165b164eb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1480597-58e4ff61b032df41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**演示过程**

![image.png](https://upload-images.jianshu.io/upload_images/1480597-998b7db0afe63fef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1480597-ee8fc075196cdbcd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1480597-0480ea04b8e028a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](https://upload-images.jianshu.io/upload_images/1480597-d4dd9e91b9397a67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.2 diff 实现过程

- `patch(container, vnode)` 和 `patch(vnode, newVnode)`
- `createElment`
- `updateChildren`
