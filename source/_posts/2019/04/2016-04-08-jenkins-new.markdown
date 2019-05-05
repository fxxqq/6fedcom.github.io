---
layout:     post
title:      "Jenkins构建Android项目持续集成之创建项目"
subtitle:   "Jenkins的创建项目"
date:        2016-04-07 12:00:00
author:     ""
header-img: "img/post-bg-2015.jpg"
tags:
   - android
---


 
# 新建项目

前面，已经介绍了，系统相关配置，接下来就可以开始创建项目了。


![](http://img.blog.csdn.net/20151211111025317)

选择新建—>构建一个自由风格的软件项目，然后填写项目名称。项目如下：

![](http://img.blog.csdn.net/20151211112209518)

# 注意：
项目名称不能包含有中文，否则在跑job的时候会出错，所以上图的项目名是错误的，在此修正。

# 项目配置

1.源码管理

![](http://img.blog.csdn.net/20151211153335459)

在Git->Repository URL，填入项目的git仓库地址，图上的地址是我的github地址.选择的是master分支，你也可以填写自己的其他分支。 
SVN 项目类似，填写SVN Respository URL

点击“Add”添加凭证 



这里我使用“用户名和密码”的方式。

2.构建触发器

![](http://img.blog.csdn.net/20151211140412021)

构建触发器配置，这里有四种构建触发器，上图采用的是“Poll SCM”，即按一定规则抓取代码进行构建，H/5 * * * *，表示每五分钟抓取代码，如果代码版本发生改变则触发构建命令。
其他触发器，可以自行查看配置提示。

# 填写注册信息

然后使用刚才注册的用户登录，”系统管理—>Configure Global Security”到安全管理界面 
![](http://img.blog.csdn.net/20151209141912841)

3.添加构建步骤

![](http://img.blog.csdn.net/20151211144020416)

上图显示的是所有能增加的构建步骤。首先，选择“Invoke Gradle script”添加gradle命令脚本。

![](http://img.blog.csdn.net/20151211155858313)

这里注意下，如果你不知道如何填写项目目录的话（或者构建失败时，可能是这里配置不正确），可以看这里,如果build.gradle就在workspace目录下，那么 


![](http://img.blog.csdn.net/20151211163056916)

如果没有找到以上目录时，保存配置后手动执行构建就会出现了。

4.添加构建后操作步骤

项目构建完成之后可以做什么？可以获取构建产物、通过邮箱发送构建报告等。 


这里先配置构建产物以及发送邮箱通知。
在上图中选择“Archive the artifacts” 

![](http://img.blog.csdn.net/20151211165702914)


如果构建产物需要多个，那么可以用”,”隔开。

5.邮箱设置

![](http://img.blog.csdn.net/20151211175010719)


设置完上面之后，还需要高级设置，如下： 


![](http://img.blog.csdn.net/20151211183226899)

高级设置，配置了，任何构建失败的时候，通过邮件通知开发者，构建成功的时候，邮件通知相关人。

6.执行构建

配置以上之后，保存。 

![](http://img.blog.csdn.net/20151211175443142)

回到项目面板后，可以等待时间到了以后自动构建，也可以自己手动执行构建，如上图。
执行构建以后，你可能会遇到各种问题，没关系，构建过程发生问题时，都会有日志输出，我们可以查阅日志，然搜索相关问题的解决办法。这里我举出我所遇到的问题：
 1、上文有提到过了，就是项目名称不能含有中文
 2、由于在github上的项目，不包含local.properties文件，导致执行的时候，报找不到Android sdk路径
一般这个文件是写入一些本地的配置，所以我们都不会上传到github上，解决的办法就是给它添加上这个文件，文件简单的内容就是sdk的路径，

    sdk.dir=F\:\\Gray\\android\\sdk

 3、Failed connect to github.com:443; No error ，网络太差。。有时正常有时就报这个问题，最好就是FQ！

如果顺利构建成功的话，那么结果如下图： 

![](http://img.blog.csdn.net/20151211184944094)

最重要的是，你的邮箱会接收到如下内容： 

![](http://img.blog.csdn.net/20151211185113078)



将刚才的授权策略改为“安全矩阵”，在这个矩阵里，可以指定用户的权限，如上图。

###注意：
如果忘记了管理员的密码怎么办呢？这里还有一个补救的办法。打开目录/Users/<用户>/.jenkins/config.xml or c:/<用户>/.jenkins/config.xml


![](http://img.blog.csdn.net/20151209142755532)


删掉上图红色圈圈的部分，即：

    <useSecurity>true</useSecurity>
    <authorizationStategy class="hudson.sucrity.FullControlOnceLoggedInAuthorizationStrategy">
        ......
    </authorizationStategy>
    <securityRealm class="hudson.security.HudsonPrivateSecurityRealm">
       <disableSignup>false</disableSignup>
        .. 
    </securityRealm>

这样用户权限等于是初始化了，要重新配置。


# 系统设置

“系统管理—>系统设置”，进入到系统设置界面 

![](http://img.blog.csdn.net/20151209144123275)

该页面，如果没有说到的就保持默认设置。

![](http://img.blog.csdn.net/20151209150159681)

在点击测试的时候，可能会报错，大概意识是提示没有授权，原因是qq邮箱在使用SMTP发送邮箱时，需要开启一个设置。解决方法如下：
登录要用来发送的qq邮箱 

![](http://img.blog.csdn.net/20151209154457867)

开启SMTP的服务，之后会获取到一个授权码，将这个授权码填到上面的密码中。


最后保存即可。

注：用个人qq邮箱会需要授权问题，但使用企业qq邮箱时，直接填写邮箱密码即可，不知道其他邮箱会不会有这个问题。

