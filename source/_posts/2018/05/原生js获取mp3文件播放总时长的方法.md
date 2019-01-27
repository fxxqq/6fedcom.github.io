---
title: '原生js获取mp3文件播放总时长的方法 '
categories: front-end
abbrlink: f8a3521c
date: 2018-05-06 13:20:57
tags:
---
两种情况：1.页面一开始就已经加载了音频，2.点击的时候为audio动态的更改音频路径，播放不同的音频

现象：第一种时长正常，第二种时长audio.duration为nan

分析：第一种情况，获取时长时，已经加载了音频，点击时可以获取音频时长；第二种，点击的时候，音频没有加载（虽然已经开始播放），获取不到时长。

解决方法：
```js
audio.addEventListener("canplay", function(){
    duration=parseInt(audio.duration);
});
```
监听是否准备好音频，将需要的属性放进去（如：时长），此方法会一直监听，不建议进行其他js操作

audio就是页面的audio的dom，但是有的时候我们遍历太多，js遍历取dom节点又不是方便，这种情况下可以自己生成dom，将上面的方法封装一下
```js
getAudioDuration(src) {
	let audio = document.createElement('audio') //生成一个audio元素 
	audio.src = src //音乐的路径 
	audio.addEventListener("canplay", function() {
		console.log(parseInt(audio.duration));
	});
        
},
```
ok!大工告成。