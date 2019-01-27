---
title: vue父组件给子组件传值方法
categories: front-end
tags:
  - vue
abbrlink: 7ee1b4c2
date: 2018-05-29 14:05:56
---
父组件：
```html
<template>
  <div>
    <!-- 课前资源 -->
    <describe  :type="before" :dataList={} />
  </div>
</template>

<script>
import headerBar from "./headerBar/index";
import describe from "./describe/index";

export default {
    components: { headerBar, describe },
    data() {
        return {
            before: "课前",
            
        };
    },
    methods: {}
};
</script>
```

子组件接收:
```html
<template>
    <div>
        <h3>
            {{type}}-描述
        </h3>
    </div>
</template>

<script>
export default {
    props: ["type"],
    methods: {}
};
</script>
```
