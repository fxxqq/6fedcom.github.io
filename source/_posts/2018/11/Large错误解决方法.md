---
layout: nginx出现413
title: Large错误解决方法
date: 2018-05-09 15:08:31
tags:
---

Nginx出现的413 Request Entity Too Large错误,这个错误一般在上传文件的时候出现，打开nginx主配置文件nginx conf，找到http{}段，添加解决方法就是打开nginx主配置文件nginx conf，一般在 usr local ngin

Nginx出现的413 Request Entity Too Large错误,这个错误一般在上传文件的时候出现，打开nginx主配置文件nginx.conf，找到http{}段，添加
解决方法就是

打开nginx主配置文件nginx.conf，一般在/usr/local/nginx/conf/nginx.conf这个位置，找到http{}段，修改或者添加

```
client_max_body_size 2m;
```

然后重启nginx，

前后端限制文件大小应该最大值差不多或者稍大，这样就不会因为提交数据大小不一致导致接口出现错误。

