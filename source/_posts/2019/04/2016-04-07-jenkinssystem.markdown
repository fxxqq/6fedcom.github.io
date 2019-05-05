---
layout:     post
title:      "Jenkins构建Android项目持续集成之系统配置篇"
subtitle:   "Jenkins的系统配置"
date:       2016-04-07 10:00:00
author:     ""
header-img: "img/post-bg-2015.jpg"
tags:
   - android
---


 
# 用户设置

jenkins有自有的用户数据库，为了安全考虑，可以启用用户注册，使用权限控制登录。 

![](http://img.blog.csdn.net/20151209140649542)

切记，授权策略要先选择“登录用户可以做任何事”，因为现在还没有任何用户，不能指定管理员，设置之后保存退出。 

![](http://img.blog.csdn.net/20151209141152934)

![](http://img.blog.csdn.net/20151209141437679)

# 填写注册信息

然后使用刚才注册的用户登录，”系统管理—>Configure Global Security”到安全管理界面 
![](http://img.blog.csdn.net/20151209141912841)

将刚才的授权策略改为“安全矩阵”，在这个矩阵里，可以指定用户的权限，如上图。

# 注意：
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

