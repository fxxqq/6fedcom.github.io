---
title: How to resolve iOS 11 Safari getUserMedia “Invalid constraint” issue
categories: front-end
tags:
  - 踩过的坑
abbrlink: e4a16398
date: 2018-11-26 13:01:05
---



I'm attempting to run the following code in Safari in iOS 11. It should prompt the user to give access to their devices camera and then display it in my <video autoplay id="video"></video> element. However, when running in iOS 11, it results in an OverconstrainedError to be thrown:
```js
{message: "Invalid constraint", constraint: "width"}
```

The code runs fine in Chorme and successfully opens the camera.
I've attempted multiple valid configurations with no luck.

**Code**
```js
var video = document.getElementById('video');
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
     navigator.mediaDevices.getUserMedia({video: true})
         .then(function(stream) {
             video.src = window.URL.createObjectURL(stream);
             video.play();
         })
         .catch(function(err) {
             console.log(err);
         });
}
```

Answer
-----

The invalid constraint error in safari is because the browser expects that you pass a correct width, one of:

- 320
- 640
- 1280
the height is auto calculate in an aspect ratio of 4:3 for 320 or 640, and 16:9 for 1280, then if you pass a width of 320, you video stream is set in:

- 320x240
if you set a width of 640, you video stream is set in:

- 640x480
And if you set a width of 1280, then you video stream is set in:

- 1280x720
In any other case you got a error "InvalidConstrain" for width value.

Also you can use a min, max, exact or ideal constrains for width, please check the MDN documentation

Here an example in this codepen
```js
var config = { video: { width: 320/*320-640-1280*/ } };
var start = () => navigator.mediaDevices.getUserMedia(config)
  .then(stream => v.srcObject = stream)
  .then(() => new Promise(resolve => v.onloadedmetadata = resolve))
  .then(() => log("Success: " + v.videoWidth + "x" + v.videoHeight))
  .catch(log);

var log = msg => div.innerHTML += "<p>" + msg + "</p>";
```
PD: In chrome you can set a width of height and the video stream is set in these sizes, Firefox do a fitness distance, and Safari expect a exact match.
