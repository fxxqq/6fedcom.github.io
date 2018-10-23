[ru63.github.io](https://ru63.github.io/)
frank的前端养成记(hexo博客)

### hexo 新建一篇文章给它添加分类和标签:
```
hexo new "移动端限制input框只能输入数字"
```

### 通过mou编辑器打开：添加tags和categories
```hexo 
---
title: title #文章標題
date: 2016-06-01 23:47:44 #文章生成時間
categories: "Hexo教程" #文章分類目錄 可以省略
tags: #文章标签 可以省略
     - 标签1
     - 标签2
description: #你對本頁的描述 可以省略
---
```

### 发布
```
hexo clean && hexo g && hexo d
```



### 创建新页面

```
hexo new page "about"
```