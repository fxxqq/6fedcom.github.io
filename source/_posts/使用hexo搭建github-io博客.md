---
title: 使用hexo搭建github.io博客
categories: "Hexo教程" #文章分類目錄 可以省略,
issues: 113
date: 2018-09-07 10:57:11
tags:
---

### Introduction
> 回顾一下我三年搭建博客的历程，最初是选择wordpress，Wordpress全部由php编写，数组库采用MySQL。优点：用户只需要将Wordpress的源代码复制到网站根目录下，然后访问网站，之后的安装操作全部在浏览器上完成。即使不是软件行业的人，也可以在几分钟之内完成安装工作。甚至很多虚拟主机供应商都提供了Wordpress的一键式安装工具。用户连上传文件的步骤都省了。缺点：项目太臃肿了，Wordpress耗损CPU严重，不容易操作，运行稍慢。尤其是后期文章数目较多的时候，想要登陆下网站的管理后台，心态简直是抓狂的。loading了好久，有时候还会失败，发一篇文章也很费劲，索性就不维护了。
后来在github网站上找到一个vue模板：[github地址](https://github.com/ye63/vue-blog-use-github-issues)和[demo预览](https://ye63.com/jy/)二次开发了一下，的确是实现了很多功能，也挺轻便的，样式也可以自定义，博客可以直接写在github的issue，很方便，用了三个月后才发现百度的搜索引擎居然只收录了首页，搜索引擎的基础爬虫的原理就是抓取你的url，然后获取你的html源代码并解析。 而你的页面通常用了vue等js的数据绑定机制来展示页面数据，爬虫获取到的html是你的模型页面而不是最终数据的渲染页面，所以说用js来渲染数据对seo并不友好。而且github api在国内访问速度也没有想象中那么快，可能是github的CDN被墙屏了。
 使用github.io可以搭建一个自己的博客,把静态文件项目托管到github上,可以写博客,可以使用markdown语法,也可以展示作品.灵活性高.但是有较大的难度,但是这对于一个熟悉git操作的前端开发工程师来说，都不算什么的。重点是hexo和github.io的域名和服务器都是**免费**的。当然也可以选择用自己的服务器和域名。

 ### Quick Start
 #### 安装 node,git，注册好github账号
 (网站有很多教程，安装方法这里就不详细展开了，**注意:github账号用户名一定不能有大写.**)

 #### 安装hexo:
 ```
 npm install -g hexo
 ```
 
#### 创建hexo文件夹:
cmd窗口切换到对应的目录下,然后执行: `hexo init`
也可以在 E:\hexo 下右键,选择git bash,在窗口中执行`hexo init`
自动安装了需要的文件.

#### 安装依赖:
继续执行: `npm install`

#### 完成本地安装:

继续在 `E:\hexo` 下执行:  `hexo generate`

继续执行: `hexo server`

然后在打开浏览器 `localhost:4000` ,就可以看到,本地已经安装好了.

#### 在github上创建博客仓库:
![image](https://user-images.githubusercontent.com/22697565/45201116-7ca05e00-b2a6-11e8-8e6c-8658ee49dc8f.png)
 跳转的后如下填写:(其中Repository name的格式是 '用户名'.github.io  ),然后点创建仓库，Repository name必须和用户名（Owner）一致，不能有大写字母
![image](https://user-images.githubusercontent.com/22697565/45201238-1e27af80-b2a7-11e8-8eb4-ad31cfbaf6f6.png)
![image](https://user-images.githubusercontent.com/22697565/45201369-a73ee680-b2a7-11e8-9c20-8a347e477f0b.png)
#### 创建SSH keys

##### 监测是否有已经存在的SSH keys:
打开 `git bash` 终端(可以在  E:\hexo 下右键打开,也可以直接在开始菜单里打开)

执行:  `$ ls -al ~/.ssh `
![image](https://user-images.githubusercontent.com/22697565/45201445-f7b64400-b2a7-11e8-91d2-704c587815a6.png)

##### 如果没有的话,就生成一个SSH keys: 写自己的邮箱
`$ ssh-keygen -t rsa -C "your_email@example.com" `

然后会出现:
```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/you/.ssh/id_rsa): 
```

就是让你输入SSH keys要保存在哪里,一般不用改,就直接回车就好了.输入一个密码,这个密码后面会用到,所以要记住咯

##### 保存SSH keys:
创建成功后,他会提示你SSH keys保存在哪里:
```
Your identification has been saved in /Users/you/.ssh/id_rsa.

# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.

# The key fingerprint is:

# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```
##### 找到SSH keys:
根据上一步里告诉你的路径,找到保存SSH keys的地方,我的是在 C:\Users\2000104591\.ssh

其中 id_rsa.pub 就是SSH keys 如果为了防止以后找不到,可以把他们自己另存到其它地方

#### 为github仓库添加SSH keys

然后把创建的id_rsa.pub里的内容复制到Key里去,Title部分随便填. 点击'Add key'

添加的过程中,还要再输入一次github的密码
![image](https://user-images.githubusercontent.com/22697565/45201608-c0946280-b2a8-11e8-94f4-f091267ce8d7.png)

#### 配置_config.yml文件并发布:

在 `E:\hexo`(文件根目录下) 下,有一个文件叫 _config.yml ,打开它,拉到最底下,做如下修改:　

然后再执行:

`hexo generate`

`hexo deploy`

然后访问: https://ye63.github.io/ (用户名改成自己的),就可以看到了.

#### 快捷命令
##### hexo 新建一篇文章给它添加分类和标签:
```
hexo new "移动端限制input框只能输入数字"
```

##### 通过mou编辑器打开：添加tags和categories
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

##### 发布
```
hexo clean && hexo g && hexo d
```

##### 创建新页面
```
hexo new page "about"
```

 

 







