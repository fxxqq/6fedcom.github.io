---
title: React Js 微信分享封装
categories: 前端
issues: 110
tags:
  - React
description: 本篇文章给大家分享的内容是代码详解React Js 微信分享封装，有着一定的参考价值，有需要的朋友可以参考一下 话不多说，直接上源代码：
abbrlink: 73d22f41
date: 2018-09-03 15:17:54
---

## Introductions
本篇文章给大家分享的内容是代码详解React Js 微信分享封装，有着一定的参考价值，有需要的朋友可以参考一下 话不多说，直接上源代码：

## Quick Start

### 分享功能
```jsx
import Fetch from './FetchIt';
import API_URL from './url';
import Share from './Share';

let wxUtils = {};

//////////////////////////////////////////////////////////////////////////////////////
//
// 分享
//
//////////////////////////////////////////////////////////////////////////////////////

/**
 getshareinfo?type=
 type :goods 课程详情 team 团详情
 id 课程id
 tid 团ID
 * @param config
 * @param shareInfo {imgUrl,title,description,link}
 */

function share2wx(config, shareInfo) {
    const share = new Share({
        appid: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名
    });
    share.init(Object.assign({}, shareInfo));
}

function getConfig(shareInfo) {
    let href = window.location.href.split('#')[0];
    const url = encodeURIComponent(href /*window.location.href*/);
    Fetch.get(`${API_URL.mobile.signature_path}?url=${url}`).then(data => {
        share2wx(data, shareInfo);
    });
}

/**
 * @param shareInfo
 */

wxUtils.share = function (shareInfo) {
    getConfig(shareInfo);
};

//////////////////////////////////////////////////////////////////////////////////////
//
// 分享结束
//
//////////////////////////////////////////////////////////////////////////////////////

/**
 * 是否开启右上角Menu
 * @param open
 */

wxUtils.optionMenu = function (open = true) {
    if (open) {
        openOptionMenu();
    } else {
        disabledOptionMenu();
    }
};

/**
 * 是否禁用右上角
 */

function disabledOptionMenu() {
    if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(true), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(true));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(true));
        }
    } else {
        onBridgeReady(true);
    }
}

/**
 * 开启menu
 */

function openOptionMenu() {
    if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(false), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(false));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(false));
        }
    } else {
        onBridgeReady(false);
    }
}

function onBridgeReady(disable = true) {
    if (typeof WeixinJSBridge !== "undefined") WeixinJSBridge.call(disable ? 'hideOptionMenu' : 'showOptionMenu');
}
/**
 * 隐藏微信网页底部的导航栏
 * @param disable
 */

wxUtils.disabledToolbar = function (disable = true) {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏底部导航栏
        WeixinJSBridge.call(disable ? 'hideToolbar' : 'showToolbar');
    });
};

export default wxUtils;
```
### 分享配置
```jsx
// 分享
function Share(config) {
    wx.config({
        debug: false, // 开启调试模式
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

Share.prototype = {
    constructor: Share,

    init(config) {
        this.imgUrl = config.imgUrl;
        this.link = config.link;
        // this.musicPath = config.musicPath;
        this.description = config.description;
        this.title = config.title;

        wx.ready(() => {
            // if (this.musicPath) {
            //     document.getElementById('musicIcon').play();
            // }
            this.toFriend();
            this.toTimeline();
        });

        wx.error(res => {
            console.log(`${res}`);
        });
    },

    toFriend() {
        wx.onMenuShareAppMessage({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
        });
    },

    toTimeline() {
        wx.onMenuShareTimeline({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
        });
    },
};

export default Share;
```
### 开启分享
```jsx
//开启分享
BaseComponent.wxUtils.optionMenu(true);
BaseComponent.wxUtils.share({
    imgUrl: activityData.sharePicUrl,
    title: activityData.shareTitle,
    description: activityData.shareContent,
    link: url,
});
```