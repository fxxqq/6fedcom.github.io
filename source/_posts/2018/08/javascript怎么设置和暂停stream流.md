---
title: Javascript怎么设置和暂停stream流
categories: 前端
tags:
  - Javascript
abbrlink: 84de6d80
date: 2018-08-16 16:43:46
---

```js
function stopStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
}
```
```js
function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
}
```