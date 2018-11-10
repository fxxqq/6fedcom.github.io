---
title: 韦博成人项目webuploader上传文件的一系列坑总结
categories: front-end
tags:
  - 踩过的坑
top: 3
abbrlink: 2bf1a5b6
date: 2018-11-09 14:16:01
---

### 坑1：new FormData() - FormData对象的作用及用法 

#### 一、概述 

```html
FormData 对象的使用：
1.用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成
一个queryString
2. 异步上传二进制文件。
```

#### 二、使用 
1.FormData对象的操作方法，全部在原型中，自己本身没任何的属性及方法。

![image](https://user-images.githubusercontent.com/22697565/39160831-291476d4-47a0-11e8-9820-0dbf99e92a4a.png)

**1、append()**

append()方法用于向 FormData 对象中添加键值对：

```js
fd.append('key1',"value1");
fd.append('key2',"value2");
```

fd是 FormData 对象，可以新建的空的对象，也可以是已经包含 form 表单或其他键值对。

**2、set()**

设置对应的键 key 对应的值 value(s)

```js
fd.set('key1',"value1");
fd.set('key2',"value2");
```

看起来跟append() 方法有点类似，这两者的区别就是，当指定的 key 值存在时，append()方法是将新增的添加的所以的键值对最后，而set()方法将会覆盖前面的设置的键值对。还是通过实例来对比，我们在前面的 form 的基础上 append() 或 set() 新的键值对：

```js
fd.append('name',"will");
```

有两个key为name的键值对： 
![image](https://user-images.githubusercontent.com/22697565/39161290-93da87ae-47a2-11e8-97ce-a12961039b37.png)

```js
fd.set('name',"will");
```

只有一个key为name的键值对： 
![image](https://user-images.githubusercontent.com/22697565/39161302-a021ec50-47a2-11e8-8cec-7381bfd243e9.png)

以上就是 append() 和 set() 的区别。如果设置的key值不存在，那么两者的效果是一样的。

**3、delete()**

接收一个参数，表示你要删除的 key 值的名字，如果有多个相同 key 值，会一并删除：

```js
fd.append('name','will');
fd.delete('name');
```

form 中的 name 信息以及通过append() 新增的name 的信息都被删除了。

**4、get() 和 getAll()**

接收一个参数，表示需要查找的 key 的名称，返回第一个该 key 对应的 value 值。如果有多个相同的 key， 而且要返回所有的这个 key 对应的 value 值。

同样以上面的 form 表单为基础：

```js
fd.append('name','will');
console.log(fd.get('name')); // sean
 
fd.append('name','will');
console.log(fd.getAll('name')); // ["sean", "will"]
 ```

**5、has()**

该方法也接收一个参数，同样是 key 的名称，返回一个Boolean 值， 用来判断FormData 对象是否含有该 key。以上面的form为例：

```js
console.log(fd.has('name')); // true
console.log(fd.has('Name')); // false
 ```

**6、keys()**

该方法不需要接收参数，返回一个迭代器，通过这个迭代器，我们可以遍历FormData 对象中所有的 key。以上面的form为例：

```js
for (var key of fd.keys()) {
    console.log(key); 
}
```

结果为：

```html
name
gender
number
photo
```

**7、values()**

有遍历 key 的迭代，当然也就少不了遍历 value 的迭代器了。values()就是遍历value 的迭代器，用法与 keys() 类似：

```js
for (var value of fd.values()) {
    console.log(value); 
}
```

结果：
![image](https://user-images.githubusercontent.com/22697565/39161320-b2c89a48-47a2-11e8-87d0-43f0d22b8812.png)


**8、entries()**

有遍历 key 的迭代器，也有遍历 value 的迭代器，为何不搞一个两者一起的呢！entries()就是返回一个包含键值对的迭代器：

```js
for(var pair of fd.entries()) {
    console.log(pair[0]+ ', '+ pair[1]); 
}
```

结果：
![image](https://user-images.githubusercontent.com/22697565/39161365-ec6d92d0-47a2-11e8-8362-3b8d520b2354.png)

2.使用FormData对象发送文件

```html
HTML部分
<form action="">
        <label for="">
            姓名: <input type="text" name="name">
        </label>
        <label for="">
            文件：<input id="file" type="file" name="file">
        </label>
        <label for="">
            <input type="button" value="保存">
        </label>
</form>
JS部分
```

```js
var btn = document.querySelector('[type=button]');
btn.onclick = function () {
    // 文件元素
    var file = document.querySelector('[type=file]');
    // 通过FormData将文件转成二进制数据
    var formData = new FormData();
    // 将文件转二进制
    *****注意2******
    formData.append('upload', file.files[0]);
    *****注意1******
    var xhr = new XMLHttpRequest;
    xhr.open('post', 'file.php');
    // 监听上传进度
    xhr.upload.onprogress = function (ev) {
    // 事件对象
    // console.log(ev);

        var percent = (ev.loaded / ev.total) * 100 + '%';

        console.log(percent);

        progress.style.width = percent;
    }

    xhr.send(formData);

    xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200) {
                    //
            }
    }
}
```

**注意1：使用jQuery**

```js
 $.ajax({
    url: 'file.php',
    type: 'POST',
    data: formdata,                    // 上传formdata封装的数据
    dataType: 'JSON',
    cache: false,                      // 不缓存
    processData: false,                // jQuery不要去处理发送的数据
    contentType: false,                // jQuery不要去设置Content-Type请求头
    success:function (data) {           //成功回调
        console.log(data);
    }
});
```

**注意2：参数**
new FormData的参数是一个DOM对象，而非jQuery对象

```js
var formData = new FormData($("#file")[0]);
```

#### 三、jQuery的参数序列化方法serialize()
序列表表格内容为字符串，用于 Ajax 请求。 
$("form").serialize()

### 坑2：webuploader 上传传自定义参数
<br>
@WebUploader 是由百度开发的一个上传文件的框架，简单上传文件可以查看官网的两个demo。 
由于自己需要上传用户信息，和用户照片，直接使用官网的demo，只能得到图片，于是花了一下午时间研究了一下WebUploader。

   我们可以通过设置FormData内的值，来实现图片和信息一起传入服务器中。 
这里需要注意一点，formdata内的值不能在WebUploader实例化式赋值，因为在此时赋值时，表单信息为空，所以得到的值一直为空

![image](https://user-images.githubusercontent.com/22697565/39161837-38068308-47a5-11e8-8c4f-5f0fee6be362.png)

##### 全局设置

```js
// 初始化的时候直接添加  
var uploader = new WebUploader.Uploader({  
    ...  
    formData: {  
        uid: 123  
    }  
    ...  
});  

// 初始化以后添加  
uploader.options.formData.uid = 123; 
```

#### 局部设置

```js
uploader.on( 'uploadBeforeSend', function( block, data ) {  
    // block为分块数据。  
  
    // file为分块对应的file对象。  
    var file = block.file;  
  
  
    // 修改data可以控制发送哪些携带数据。  
    data.uid = 123;  
});  
```


