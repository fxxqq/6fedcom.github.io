---
title: 【ElementUI】日期选择器时间选择范围限制插入、替换
categories: 前端
tags:
  - elementUI
abbrlink: 5e4f4766
date: 2018-05-14 17:27:47
---


>ElementUI是饿了么推出的一套基于vue2.x的一个ui框架。官方文档也很详细，这里做一个element-ui日期插件的补充。
>官方文档中使用picker-options属性来限制可选择的日期，这里举例子稍做补充。

<h3>单个输入框的</h3>

**组件代码：**
```html
<el-date-picker  v-model="value1"   type="date" 
          placeholder="选择日期" :picker-options="pickerOptions0"> 
</el-date-picker>
```

**情景1: 设置选择今天以及今天之后的日期**
```js
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },  
   }     
}  
```  

**情景2: 设置选择今天以及今天以前的日期**

```js
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },  
   }     
}   
```
 
**情景3: 设置选择今天之后的日期（不能选择当天时间）**
```js
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },  
   }     
}  
```  
 
**情景4: 设置选择今天之前的日期（不能选择当天）**

```js
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },  
   }     
}    
```

**情景5: 设置选择三个月之前到今天的日期**

```js
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths;;
          }
        },  
   }     
} 
```

<h3>两个输入框</h3>

**组件代码**

```html
<el-date-picker v-model="value1" type="date" 
       placeholder="开始日期" :picker-options="pickerOptions0">
</el-date-picker>
<el-date-picker v-model="value2" type="date" 
       placeholder="结束日期":picker-options="pickerOptions1">
</el-date-picker>
```

**情景1: 限制结束日期不能大于开始日期**

```js
data(){
    return {
         pickerOptions0: {
                disabledDate: (time) => {
                    if (this.value2 != "") {
                        return time.getTime() > Date.now() || time.getTime() > this.value2;
                    } else {
                        return time.getTime() > Date.now();
                    }

                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < this.value1 || time.getTime() > Date.now();
                }
            },
    }      
}       
```