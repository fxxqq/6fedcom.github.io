---
title: 手写一个promise，彻底掌握它的原理
categories: front-end
date: 2018-11-27 22:35:58
tags:
---

Promise 是异步编程的一种解决方案,解决传统的回调嵌套问题

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
 
### 首先，我们先搭建好代码的骨架：
```js
function Promise(callback) {
	var self = this;
	self.status = 'pending';
	self.data = undefined;
	self.onResolvedCallback = [];
	self.onRejectedCallback = [];
	callback(resolve, reject);

	function resolve(value) {
		if (self.status === 'pending') {
			self.status == 'fulfilled';
			self.data = value;
			for (var i = 0; i < self.onResolvedCallback.length; i++) {
				self.onResolvedCallBack[i].value
			}
		}
	};

	function reject(error) {
		if (self.status === 'pending') {
			self.status == 'rejected';
			self.data = error;
			for (var i = 0; i < self.onRejectedCallback.length; i++) {
				self.onResolvedCallback[i].value
			}
		}
	}
}

Promise.prototype.then = function(onResolved, onRejected) {
	var self = this;
	var promise2;
	if (typeof onResolved === 'function') {
		onResolved = onResolved
	} else {
		onResolved = function(value) {}
	}
	if (typeof onRejected === 'function') {
		onResolved = onResolved
	} else {
		onResolved = function(value) {}
	}

	if (self.status == 'resolved') {
		return promise2 = new Promise(function(resolve, reject) {
			try {
				var x = onResolved(self.data)
				if (x instanceof Promise) {
					x.then(resolve, reject)
				}
				resolve(x)
			} catch (e) {
				reject(e)
			}
		})
	}

	if (self.status == 'rejected') {
		return promise2 = new Promise(function(resolve, reject) {
			try {
				var x = onRejected(self.data)
				if (x instanceof Promise) {
					x.then(resolve, reject)
				}
				resolve(x)
			} catch (e) {
				reject(e)
			}
		})
	}

	if (self.status == 'pending') {
		return promise2 = new Promise(function(resolve, reject) {
			self.onResolvedCallback.push(function(value) {
				try {
					var x = onResolved(self.data)
					if (x instanceof Promise) {
						x.then(resolve, reject)
					}
				} catch (e) {
					reject(e)
				}
			})

            self.onRejected.push(function(reason){
                try {
					var x = onRejected(self.data)
					if (x instanceof Promise) {
						x.then(resolve, reject)
					}
				} catch (e) {
					reject(e)
				}
            })
		})
	}
}

Promise.prototype.catch=function(onRejected){
    return this.then(null,onRejected)
}

```
ES6实现Promise