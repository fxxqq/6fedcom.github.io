---
title: 'ie和safari浏览器new Date(yyyy-MM-dd HH:mm:ss )为NaN的解决方案'
categories: front-end
tags:
  - javascript
abbrlink: f192b16c
date: 2018-11-09 14:22:27
---

今天碰到一个bug，在Safari浏览器里从日历选择器里面获取时间的时候，传给后台会报错，经排查发现，通过IE开发者工具控制台执行js代码，new Date("2018-04-03 13:11:12").getTime() 在IE下和Safari会返回NaN，而其他浏览器可以正常返回毫秒数。
chorme
![image](https://user-images.githubusercontent.com/22697565/38230382-2911a2b2-3740-11e8-8ff1-ae8dbbb27098.png)

ie和safari
![image](https://user-images.githubusercontent.com/22697565/38230404-41cc0b62-3740-11e8-9cb6-f2b14a0a4cb4.png)

由于毫秒数在IE浏览器下没有正确获得，所以在之后的计算中，计算结果为undefined

<h3>解决方案</h3>
<h4>方法1：自定义一个NewDate方法，通过调用NewDate方法获得毫秒数</h4>

```js
function NewDate(str){  
  if(!str){  
    return 0;  
  }  
  arr=str.split(" ");  
  d=arr[0].split("-");  
  t=arr[1].split(":");  
  var date = new Date();   
  date.setUTCFullYear(d[0], d[1] - 1, d[2]);   
  date.setUTCHours(t[0], t[1], t[2], 0);   
  return date;  
}  
```
<h4>方法2：通过Date.parse()方法</h4>
parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
由于parse()方法参数的日期格式为yyyy/MM/dd，所以需要将现有的日期格式通过replace()方法将日期字符串替换成yyyy/MM/dd格式。

```js
var date="2014-01-01 12:11:12";  
Date.parse(date.replace(/-/g,"/")); 
```


