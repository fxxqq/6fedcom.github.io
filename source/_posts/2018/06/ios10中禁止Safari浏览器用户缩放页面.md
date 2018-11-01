---
title: ios10中禁止Safari浏览器用户缩放页面
categories: front-end
tags:
  - 移动端
abbrlink: a48a072
date: 2018-06-29 18:05:59
---

在ios10前我们能通过设置meta来禁止用户缩放页面：
```html
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" /> 
```

在ios10系统中meta设置失效了： 
为了提高Safari中网站的辅助功能，即使网站在视口中设置了user-scalable = no，用户也可以手动缩放。 
解决方法：监听事件来阻止

```js
window.onload=function () {  
        document.addEventListener('touchstart',function (event) {  
            if(event.touches.length>1){  
                event.preventDefault();  
            }  
        })  
        var lastTouchEnd=0;  
        document.addEventListener('touchend',function (event) {  
            var now=(new Date()).getTime();  
            if(now-lastTouchEnd<=300){  
                event.preventDefault();  
            }  
            lastTouchEnd=now;  
        },false)  
}
```

禁用页面的touches事件，click事件依然可以用的