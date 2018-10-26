---
title: react-router v4中，不提供browserHistory等的导出~~怎么解决
categories: 前端
tags:
  - React
abbrlink: 45e7735c
date: 2018-07-17 16:48:04
---

**问题**
当我们使用react-router v3的时候，我们想跳转路由，我们一般这样处理
我们从react-router导出browserHistory。 
我们使用browserHistory.push()等等方法操作路由跳转。 
问题来了，在react-router v4中，不提供browserHistory等的导出~~
那怎么办？我如何控制路由跳转呢？？？

**解决方法**
使用 withRouter
withRouter高阶组件，提供了history让你使用~

```jsx
import React from "react";
import {withRouter} from "react-router-dom";

class MyComponent extends React.Component {
  ...
  myFunction() {
    this.props.history.push("/some/Path");
  }
  ...
}
export default withRouter(MyComponent);
```



> 我们可以不使用推荐的BrowserRouter，依旧使用Router组件。我们自己创建history，其他地方调用自己创建的history。
