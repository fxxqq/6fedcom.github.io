---
title: get请求中特殊字符&的处理
categories: Front-End
date: 2018-11-01 11:39:23
tags: [踩过的坑]
---

当我们的请求的url为:
http://localhost:8080/interface?parameter=kalman03&kalman&1
或许你预期在服务器端获得的parameter的结果为kalman03#kalman#1,错！！！实际上得到parameter的值为kalman03。

这究竟是为什么呢？
#####原因：
parameter的值含有特殊字符&，浏览器自动截断&字符和其后面的值，这样得到的值就为kalman03。

**拓展**
当参数值中含有特殊字符 `?!=()#%&` 的时候，获得的值同样也会出现与预期结果不一致的情况。

#####解决方案：
方法1：通过post方式传递数据；
方法2：对参数进行一次编码parameter=escape(parameter)；

JavaScript escape() 函数的功能是把其中某些字符替换成了十六进制的转义序列。该方法不会对ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。其他所有的字符都会被转义序列替换。具体参考：http://www.w3school.com.cn/js/jsref_escape.asp.
这样来就不会出现自动截断或者其他意想不到的效果。
