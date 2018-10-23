---
title: 好物快应用、H5端开发小结
date: 2018-10-19 16:50:43
tags: 
   - JavaScript
   - 快应用
categories: Front-End
---

## 一、deepLink跳转

### 1.1 快应用中呼起deepLink

**第一步：检测是安装了app**

> 前提条件：需要知道app的包名

```javascript
// 判断用户是否安装了app
export const checkInstalledApp = (pkg_name) => {
  const pkg = require('@system.package')
  return new Promise((resolve,reject)=>{
    pkg.hasInstalled({
      package: pkg_name,
      success: function (data) {
        resolve(data.result) //返回true、false
      },
      fail: function (data, code) {
        reject(code)
      }
    })
  })
}
```

**第二步：调起deepLink**

```javascript
let pkg = 'com.newsqq.fda' // 传入包名
let deep_link = '' // 跳转到app的地址
let params = {}

checkInstalledApp(pkg).then(hasInstalledApp=>{
    // 用户已经安装了app, deep_link直接跳转
    if(hasInstalledApp && deep_link){
      params = {uri:deep_link}
    }else{ // 否则跳转到H5地址
      params = {
        uri:'Webview',//对应于manifest中的配置
        params:{
          url,
          title:goods_name
        }
      }
    }
    this.$app.$def.router.push(params)
})

```

### 1.2 `H5`页面呼起快应用

> 引入快应用[官方提供的代码](https://doc.quickapp.cn/tutorial/platform/url-jump-configuration.html),这里做了一下处理

```javascript
export const quickapp = (function(){
  !function(e) {
        "use strict";
        window.appRouter = function(e, t, a, o) {
            return a = a || {},
            o && (a.__PROMPT__ = 1, a.__NAME__ = o),
            n(e, t, a)
        },
        window.installShortcut = function(e, t) {
            return n("command", "", {
                type: "shortcut",
                package: e,
                name: t
            })
        },
        window.channelReady = function(e) {
            var n = {
                available: new Function,
                availableTimeout: 2e3
            };
            return "function" == typeof e ? n.available = e: "object" == typeof e &&
            function(e, n) {
                n = n || {};
                for (var t in n) e[t] = n[t]
            } (n, e),
            function(e) {
                var n = "http://thefatherofsalmon.com/images",
                t = document.createElement("img");
                if (t.style.width = "1px", t.style.height = "1px", t.style.display = "none", n += "/" + 1e20 * Math.random(), t.src = n, document.body.appendChild(t), t.complete) e.available.call(null, !0);
                else {
                    t.onload = function() {
                        clearTimeout(a),
                        e.available.call(null, !0)
                    };
                    var a = setTimeout(function() {
                        e.available.call(null, !1)
                    },
                    e.availableTimeout)
                }
            } (n)
        };
        function n(e, n, t) {
            var a = "http://thefatherofsalmon.com/",
            o = "";
            if (e && (a = a + "?i=" + e), n && (a = a + "&p=" + n),
            function(e) {
                if (!e) return ! 0;
                var n = void 0;
                for (n in e) return ! 1;
                return ! 0
            } (t)) {
                var i = window.location.search;
                i.indexOf("?") > -1 && (o = i.substr(1))
            } else {
                o = Object.keys(t).map(function(e) {
                    return e + "=" + encodeURIComponent(t[e])
                }).join("&")
            }
            "" !== o && (a = a + "&a=" + encodeURIComponent(o));
            var l = document.createElement("img");
            l.src = a,
            l.style.width = "1px",
            l.style.height = "1px",
            l.style.display = "none",
            document.body.appendChild(l)
        }

    } ();

    return {
      appRouter:window.appRouter,
      installShortcut:window.installShortcut,
      channelReady:window.channelReady
    }
})()
```

> 或者在网页中嵌入以下 `js`，支持`HTTP`与`HTTPS`访问。上面的代码和这个一样的，只是做了一下模块化处理


```html
<script type="text/javascript" src="//statres.quickapp.cn/quickapp/js/routerinline.min.js"></script>
```

**调起应用**

> `appRouter(packageName, path, params, confirm)`，[更多详情](https://doc.quickapp.cn/tutorial/platform/url-jump-configuration.html)

**第一步：检测手机型号**

> 只有在对应的应用商店上架才可以打开

- 主要用到了这个库 https://github.com/hgoebl/mobile-detect.js

```javascript
// 检测手机型号
export const checkPhone = ()=>{
  const MobileDetect = require('mobile-detect')
  let device_type = navigator.userAgent;//获取userAgent信息
  let md = new MobileDetect(device_type);//初始化mobile-detect
  let os = md.os();//获取系统
  let model = "";

  //判断数组中是否包含某字符串
  Array.prototype.contains = function(needle) {
      for (i in this) {
          if (this[i].indexOf(needle) > 0)
              return i;
      }
      return -1;
  }

  if (os == "iOS") {//ios系统的处理
      os = md.os() + md.version("iPhone");
      model = md.mobile();
  } else if (os == "AndroidOS") {//Android系统的处理
      os = md.os() + md.version("Android");
      var sss = device_type.split(";");
      var i = sss.contains("Build/");
      if (i > -1) {
          model = sss[i].substring(0, sss[i].indexOf("Build/"));
      }
  	let phoneModel = model.toLocaleLowerCase()
      //判断是否是oppo
      if(phoneModel.indexOf('oppo')!==-1){
      	return true
      }

  }
  return false
}
```

**第二步：调起快应用**

> 以呼起`OPPO`手机下已经上架的快应用为例

```javascript
// H5页面中呼起快应用

// page你所在的页面标志，goods_id是传递的参数
export const openQuickapp = ({page,goods_id})=>{
  const appRouter = (path,params={})=>quickapp.appRouter('com.yesdat.poem',`/${path}`,params)

  // 检测OPPO手机下呼起唐诗三百首快应用首页
  if(!checkPhone()){
    return false
  }
  if(page == 'home'){
    appRouter('Home')
  }else if(page == 'detail'){
    appRouter('Detail',{goods_id})
  }else if(page == 'search'){
    appRouter('Search')
  }

}
```




### 1.3 H5页面呼起deepLink

> H5 页检测手机是否安装 app 相关流程

**uri获取**

> 这里的`uri`,指得就是通过 `Url scheme` 来实现的`H5`与安卓、苹果应用之间的跳转链接。


我们需要找到客户端的同事，来获取如下格式的链接。

```
xx://'跳转页面'/'携带参数'
```

> 简单解释下`url scheme`。

- `url` 就是我们平常理解的链接。
- `scheme` 是指`url`链接中的最初位置，就是上边链接中 `‘xx’`的位置。
- 详细介绍可以看这里：[使用url scheme详解](https://sspai.com/post/31500)

> 用这个链接我们可以跳转到 应用中的某个页面,并可以携带一定的参数


**具体实现**

**第一步：通过iframe打开App**

> `Android`平台则各个`app`厂商差异很大，比如`Chrome`从25及以后就不再支持通过`js`触发（非用户点击），所以这里使用`iframe src`地址等来触发`scheme`。

```javascript
//在iframe 中打开APP
var ifr = document.createElement('iframe');
ifr.src = openUrl;
ifr.style.display = 'none';
```

**第二步： 判断是否安装某应用**

> 原理：若通过`url scheme` 打开`app`成功，那么当前`h5`会进入后台，通过计时器会有明显延迟。利用时间来判断。

- 由于安卓手机,页面进入后台，定时器`setTimeout`仍会不断运行，所以这里使用`setInterval`,较小间隔时间重复多次。来根据累计时间判断。
- 根据返回`true` `false`来判断是否安装。
- `document.hidden`对大于`4.4` `webview`支持很好，为页面可见性`api`

```javascript
// 检测app是否安装 
export const hasInstalledApp = (deepLink)=>{
  return new Promise((resolve,reject)=>{
      var timeout, t = 1000, hasApp = true;
      setTimeout(function () {
        if (hasApp) {
          resolve(true)
        } else {
          resolve(false)
        }
        document.body.removeChild(ifr);
      }, 2000)

      var t1 = Date.now();
      var ifr = document.createElement("iframe");
      ifr.setAttribute('src', deepLink);
      ifr.setAttribute('style', 'display:none');
      document.body.appendChild(ifr);

      timeout = setTimeout(function () {
         var t2 = Date.now();
         if (!t1 || t2 - t1 < t + 100) {
           hasApp = false;
         }
      }, t);
  })
}
```

> 使用方式

```javascript
// deep_link与h5链接跳转区分
if(deepLink){
	Toast.loading('正在跳转中...',0)
	hasInstalledApp(deepLink).then(hasInstall=>{
		Toast.hide()
 		if(!hasInstall){//未安装 直接跳H5
 		  window.location.href = h5Url
 		}
 	})
}else{
	window.location.href = h5Url
}
```


## 二、剪贴板分享 

> 主要是使用到`clipboard`简化

```javascript
import ClipboardJS from 'clipboard'

class Test extends Component {
    showShare = ()=>{
    	//实例化 ClipboardJS对象;
        const copyBtn = new ClipboardJS('.copyBtn');
        
        copyBtn.on("success",function(e){
            // 复制成功
        	Toast.info('复制成功，可分享到微信、浏览器打开',2);
        });
        copyBtn.on("error",function(e){
            //复制失败；
            Toast.fail(`复制失败${e.action}`,1);
        });
    }
}

//复制功能：需要复制的文本内容传递data-clipboard-text，定义类copyBtn用于实例化 
<Flex.Item
	data-clipboard-text={window.location.href}
	className="copyBtn"
	onClick={()=>showShare()}>
	<IconWrapper><IoMdShare/></IconWrapper>复制
</Flex.Item>
```

> 更多使用方式详情：https://github.com/zenorocha/clipboard.js


## 三、加载更多  

> `h5`页面需要分页加载优化，`react`中为例

**第一步：封装一个loadMore组件**

```javascript
import React from 'react'
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components'

const LoadMoreWrapper = styled.div`
  border-top: 1px dashed #ddd;
  .load-more{
    text-align: center;
    padding: 10px 0;
    background-color: #fff;
    color: #999;
  }
`
class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    _loadMoreHandle(){
        // 执行传递过来的loadMoreData
        this.props.loadMoreFn()
    }
    render() {
        const {hasMore} = this.props

        return (
            <LoadMoreWrapper>
              <div className="load-more" ref='wrapper'>
                 {
                     this.props.isLoadingMore && hasMore
                     ? <span className="loading"><Spin tip="Loading..."/> </span>
                     : (hasMore?<span onClick={this._loadMoreHandle.bind(this)}>加载更多</span>:<span>没有更多了</span>)
                 }
              </div>
            </LoadMoreWrapper>
        )
    }
    componentDidMount(){
        const wrapper = this.refs.wrapper;

        let timeoutId;
        window.addEventListener('scroll',()=>{
            if (this.props.isLoadingMore) return;
            if(timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(()=>{
                // 获取加载更多这个节点距离顶部的距离
                const top = wrapper.getBoundingClientRect().top;
                const windowHeight = window.screen.height;

                if (top && top < windowHeight) {
                    // 当wrapper已经在页面可视范围之内触发
                    this.props.loadMoreFn();
                }
            },50)
        },false)
    }
}

LoadMore.propTypes = {
  isLoadingMore:PropTypes.bool.isRequired,
  hasMore:PropTypes.bool.isRequired,
  loadMoreFn:PropTypes.func.isRequired
}

export default LoadMore
```

**第二步：处理分页**

> 需要后台支持分页

```javascript
import React, {Component} from 'react'

class Home extends Component {
	state = {
		goodsList:[], // 存储列表信息
		hasMore:true, // 记录当前状态下还有没有更多的数据可供加载
		isLoadingMore:false, //记录当前状态下，是加载中，还是点击可加载更多
		page:1, //页码
	}

	constructor(props) {
		super(props)
	}
	componentDidMount() {
		// 获取首屏数据
		this.props.fetchTopGoods({page:this.state.page})
	}
	// 加载更多
	 _loadMoreData(){
		const {topGoods} = this.props
		const _this = this

		_this.setState({
			isLoadingMore:true
		})

		if(_this.state.hasMore){
			_this.setState({page:++_this.state.page})// 页码累加

			_this.props.fetchGoods({page:_this.state.page}).then(res=>{

				const data = res.goods.list
				let dataList = _this.state.goodsList

				if(!dataList.length){
					dataList = topGoods.data
				}

				if(data && data.length < PAGE_SIZE) {
					_this.setState({
						hasMore:false
					})
				}else{
					_this.setState({
						goodsList:dataList.concat(data),
						hasMore:true,
						isLoadingMore:false
					})
				}

			})

		}else{
			this.setState({
				isLoadingMore:false
			})
		}

	}

	render() {
		return <LoadMore isLoadingMore={this.state.isLoadingMore} hasMore={this.state.hasMore} loadMoreFn={this._loadMoreData.bind(this)} />
	}
}


```


## 四、搜索历史

**封装cache**

```javascript
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15 // 最大保存15条

// 搜索条目更新到数组中
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 从数组中移除
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 暴露方法：保存搜索关键词 query传入的关键词
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 暴露方法: 逐条删除搜索记录 query传入的历史记录
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 暴露方法: 清空所有历史
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
// 暴露方法: 加载所有历史记录
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
```

![search-history](https://upload-images.jianshu.io/upload_images/1480597-34867938a0263a19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 五、骨架屏的应用

> 封装一个骨架屏组件

```javascript
import React,{PureComponent} from 'react'
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components'

const Wrapper = styled.div`
    .skeleton {
      display: flex;
      padding: 10px;
      width: 380px;
    }

    .skeleton .skeleton-head,
    .skeleton .skeleton-title,
    .skeleton .skeleton-content {
        background: rgba(220, 228, 232, 0.41);
    }
    .skeleton .skeleton-head{
      padding:20px;
      margin-right:10px;
    }

    .skeleton-body {
        width: 100%;
    }

    .skeleton-title {
        width: 100%;
        height: 15px;
        transform-origin: left;
        animation: skeleton-stretch .5s linear infinite alternate;
        border-radius: 5px;
    }

    .skeleton-content {
        width: 100%;
        height: 15px;
        margin-top: 10px;
        transform-origin: left;
        animation: skeleton-stretch .5s -.3s linear infinite alternate;
        border-radius: 5px;
    }

    @keyframes skeleton-stretch {
        from {
            transform: scalex(1);
        }
        to {
            transform: scalex(.3);
        }
    }

`
export default class Skeleton extends PureComponent {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {count} = this.props
        const arr = []
        if(count){
          for(let i=0;i<count;i++){
            arr.push({})
          }
        }
        return (
            <Wrapper>
              {arr.map(v=><div className="skeleton">
                <div className="skeleton-head"></div>
                <div className="skeleton-body">
                   <div className="skeleton-title"></div>
                   <div className="skeleton-content"></div>
                </div>
              </div>)}
            </Wrapper>
        )
    }
}

Skeleton.propTypes = {
  count:PropTypes.number.isRequired
}

```

使用

```
// count 显示的条数
<Skeleton count={10}/>
```

![Skeleton](https://upload-images.jianshu.io/upload_images/1480597-497efe18e83ceac7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- `H5`端在线体验 http://goods.yesdat.com
- 快应用端在`OPPO`应用商店搜“好物”（标有快应用的那个）


