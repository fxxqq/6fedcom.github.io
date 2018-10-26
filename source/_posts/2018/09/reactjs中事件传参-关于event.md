---
title: reactjs中事件传参(关于event)
tags:
  - React
issues: 115
abbrlink: 7205ee34
date: 2018-09-10 15:06:44
---

#### 问题描述
我们在事件中通常需要获取控件的值，通常通过event.target.value的方式来取值，在绑定事件时，event参数也不需要传递，在方法中直接使用即可。
但是，有些时候需要传入一些其他的参数，比如需要循环绑定一些输入框，在绑定onChange事件时，需要传入索引index和数据源的索引进行对应
```jsx
onHandleChange(index,event){
    let val=event.target.value
}
//关键代码
source.map((item,index)=>{
      return <input type="text" value={item.name} 
      onChange={this.onHandleChange.bind(this,index)} />
});
```  

#### 代码解释
有的同学应该已经看出区别了，onHandleChange在声明时有两个参数，但在调用时却只传递了一个参数，这就是今天要讲的:

> **在给方法传递新参数时，方法原有的参数会排在新参数之后**

做过reactjs的同学都知道，event这个参数是不需要手动传递的，直接在方法中声明就可以使用，如下代码：
```jsx
onChangeHandle(event){
      let val=event.target.value;
}

render(){
  return (<div>
    <input type="text" onChange={this.onChangeHandle.bind(this)} />
</div>)
}
```

#### 摘自
> 作者：不将就人生
链接：https://www.jianshu.com/p/1026d71d04d6
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
