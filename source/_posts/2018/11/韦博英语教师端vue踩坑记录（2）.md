---
title: 韦博英语教师端vue踩坑记录（2）
categories: front-end
abbrlink: a9e5fae8
date: 2018-11-09 15:12:15
tags:
---

### vue项目在nginx中部署

**nginx的配置文件：**
添加如下server
```
server {
	listen 7070;
	server_name localhost;


	error_page 500 502 503 504 / 50x.html;
	location = /50x.html {
        root html;
        }


        root /data / xytest / project / zkview - ui / dist;
	index index.html;


	location / {
		try_files $uri $uri / @router;
		index index.html;
	}


	location@router {
		rewrite ^ . * $ / index.html last;
	}
}
```

添加完成后热加载nginx
```
nginx - s reload
```
nginx如何正确配置部署在子目录的vue项目（History模式）
**Q1：Vue项目用Webpack打包后放到服务器上，但访问是404页面？**
原因是vue的项目为单页应用，路由找不到所致。所以要在nginx服务器配置对所有的路径或者文件夹进行跳转。重定向到首页index下，这样就都能找到路由了。
nginx配置
```
location / {
  try_files $uri $uri/ /index.html;
}
```

因为项目是子项目，所以不能放在根目录下，index.html需要放在一个新建的teacher目录 

**Q2：配置好nginx后，发现这样虽然不会404，但是页面全部转到了根目录的index.html，访问的是空白页面？**

于是调整了nginx和vue-router的配置如下：
nginx配置文件
```
###教师端 vue项目
location /teacher/ {
    index  index.html index.htm index.php;
    try_files $uri $uri/ /teacher/index.html;
}
```
vue路由配置
```js
 routes: [{
 	path: '/teacher/login',
 	name: 'Login',
 	component: Login,
 	meta: {
 		title: '教师端登录中心'
 	}
 }, {
 	path: '/teacher/courseCenter',
 	name: 'CourseCenter',
 	component: CourseCenter,
 	meta: {
 		title: 'CourseCenter'
 	}
 }]
```



> 拓展：
apache 做web服务器的虚拟空间，开启.htaccess文件支持,也可以解决vue项目配置子目录的问题。

```
<IfModule mod_rewrite.c>
  Options +FollowSymlinks
  RewriteEngine On
  
  RewriteCond %{REQUEST_URI} ^/(teacher|teacher/.*)$
  RewriteRule ^/teacher/index\.html$ - [L,NC]
  
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(teacher|teacher/.*)$ teacher/index.html [L]
</IfModule>
```


### element-ui 的 upload组件的clearFiles方法调用方法
```vue
<template>
  <div>
    <el-button @click="clearUploadedImage">重新上传</el-button>
    <el-upload ref="upload"></el-upload>
  </div>
</template>

<script>
export default {
  methods: {
    clearUploadedImage () {
      this.$refs.upload.clearFiles();
    }
  }
}
</script>
```

### vue模板初始化报错：
vue模板初始化报错：

```
Failed to compile with 2 errors                                                                                                                                                                                                                                                           21:49:02
 error  in ./src/App.vue

Module build failed: Error: No parser and no file path given, couldn't infer a parser.
    at normalize (path\node_modules\prettier\index.js:7051:13)
    at formatWithCursor (path\node_modules\prettier\index.js:10370:12)
    at path\node_modules\prettier\index.js:31115:15
    at Object.format (path\node_modules\prettier\index.js:31134:12)
    at Object.module.exports (path\node_modules\vue-loader\lib\template-compiler\index.js:80:23)

 @ ./src/App.vue 11:0-354
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:8080 webpack/hot/dev-server ./src/main.js

 error  in ./src/components/HelloWorld.vue

Module build failed: Error: No parser and no file path given, couldn't infer a parser.
    at normalize (path\node_modules\prettier\index.js:7051:13)
    at formatWithCursor (path\node_modules\prettier\index.js:10370:12)
    at path\node_modules\prettier\index.js:31115:15
    at Object.format (path\node_modules\prettier\index.js:31134:12)
    at Object.module.exports (path\node_modules\vue-loader\lib\template-compiler\index.js:80:23)
```


Prettier has caused this regression in their 1.13.0 update which occurred today. Downgrade to the previous version to fix this error:
```
npm install --save-dev prettier@1.12.0

npm run dev
```

That should do the trick.