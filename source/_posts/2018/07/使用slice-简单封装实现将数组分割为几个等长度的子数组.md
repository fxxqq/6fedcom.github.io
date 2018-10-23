---
title: 使用slice()简单封装实现将数组分割为几个等长度的子数组
categories: 前端
tags:
  - Javascript
abbrlink: d7aaf523
date: 2018-07-16 16:42:32
---

使用数组的时候，我们有时候希望将一个数组分成几个相同长度的子数组，使用slice()方法可以返回一个子数组，所以我们可以将slice()再进行封装一下，以实现上面的功能。

首先我们先来看一下slice()方法：

**slice()**
1. 定义和用法 
slice() 方法可从已有的数组中返回选定的元素。
2. 语法 
arrayObject.slice(start,end)

参数 | 描述
-- | --
start | 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
end | 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

3. 返回值 
返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。 
4. 说明 
请注意，该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。 
5. 提示和注释 
注释：您可使用负值从数组的尾部选取元素。 
注释：如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。

**封装slice()**
加入现在有一个数组[1,2,3,4,5,6,7,8,9]，将其分为长度为4的子数组 
子数组1：[1,2,3,4] 是从数组下标0–>3 
子数组2：[5,6,7,8] 是从数组下标4–>7 
子数组3：[9] 是从数组下标8，因为不满4个 
从上面我们可以看到，一共分为3个数组，所以我们可以使用循环来进行封装。
```js
/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}  
```
例如：
```js
var array = [1,2,3,4,5,6,7,8,9];
var array = sliceArray(array, 4);
console.log(array);
```

### 将几个数组合并为一个数组concat()
1.定义和用法 
concat() 方法用于连接两个或多个数组。 
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
2.语法 
arrayObject.concat(arrayX,arrayX,……,arrayX)

参数 | 描述
-- | --
arrayX | 必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。

3. 返回值 
返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
例如
```js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr = [];
arr.concat(arr1, arr2); //输出[1, 2, 3, 4, 5, 6]
```



