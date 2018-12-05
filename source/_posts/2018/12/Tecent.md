---
title: 腾讯面试题总结
categories: front-end
abbrlink: 8b81e52c
date: 2018-12-03 20:04:57
tags:
---


### JS基础数据类型
Number String Null Undefined Boolean, Symbol都属于础数据类型，往往都保存在栈内存中，栈空间先进后出，后进先出
引用数据类型：Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型 等。
引用类型的复制同样也会为新的变量自动分配一个新的值保存在栈内存中，但不同的是，这个新的值，仅仅只是引用类型的一个地址指针。当地址指针相同时，尽管他们相互独立，但是在堆内存中访问到的具体对象实际上是同一个

### HTTP三次握手以及原因

ACK 确认序列编号
（表示应答域有效，就是说前面所说的TCP应答号将会包含在TCP数据包中；有两个取值：0和1，为1的时候表示应答域有效，反之为0）
SYN 同步序列编号
(在连接建立时用来同步序号。当SYN=1而ACK=0时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使SYN=1和ACK=1. 因此, SYN置1就表示这是一个连接请求或连接接受报文。)
FIN （finis）即完，终结的意思， 用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。

第一次握手：建立连接。
客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；
第二次握手：服务端收到SYN报文段。
服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，同时，自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；
第三次握手：客户端收到服务器的SYN+ACK报文段。
然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。
完成了三次握手，客户端和服务器端就可以开始传送数据。

为什么要三次握手
两次握手的问题在于服务器端不知道一个SYN是否是无效的，而三次握手机制因为客户端会给服务器回复第二次握手，也意味着服务器会等待客户端的第三次握手，如果第三次握手迟迟不来，服务器便会认为这个SYN是无效的，释放相关资源。但这时有个问题就是客户端完成第二次握手便认为连接已建立，而第三次握手可能在传输中丢失，服务端会认为连接是无效的，这时如果Client端向Server写数据，Server端将以RST包响应，这时便感知到Server的错误
防止了服务器端的一直等待而浪费资源

四次分手
第一次分手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；
第二次分手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我“同意”你的关闭请求；
第三次分手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；
第四次分手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。

为什么要四次分手
那四次分手又是为何呢？TCP协议是一种面向连接的、可靠的、基于字节流的运输层通信协议。TCP是全双工模式，这就意味着，当主机1发出FIN报文段时，只是表示主机1已经没有数据要发送了，主机1告诉主机2，它的数据已经全部发送完毕了；但是，这个时候主机1还是可以接受来自主机2的数据；当主机2返回ACK报文段时，表示它已经知道主机1没有数据发送了，但是主机2还是可以发送数据到主机1的；当主机2也发送了FIN报文段时，这个时候就表示主机2也没有数据要发送了，就会告诉主机1，我也没有数据要发送了，之后彼此就会愉快的中断这次TCP连接。

### AMD，CMD规范
AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
define(id?, dependencies?, factory)
- id:字符串，模块名称(可选)
- dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式
- factory: 工厂方法，返回一个模块函数

CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。 
CMD与AMD一样，也是采用特定的define()函数来定义,用require方式来引用模块
define(id?, dependencies?, factory)

### websocket 
webSocket和http一样，同属于应用层协议。它最重要的用途是实现了客户端与服务端之间的全双工通信，当服务端数据变化时，可以第一时间通知到客户端。
除此之外，它与http协议不同的地方还有：
http只能由客户端发起，而webSocket是双向的。
webSocket传输的数据包相对于http而言很小，很适合移动端使用
没有同源限制，可以跨域共享资源

WebSocket握手的过程。
当Web应用程序调用new WebSocket(url)接口时，Browser就开始了与地址为url的WebServer建立握手连接的过程。
1. Browser与WebSocket服务器通过TCP三次握手建立连接，如果这个建立连接失败，那么后面的过程就不会执行，Web应用程序将收到错误消息通知。
2. 在TCP建立连接成功后，Browser/UA通过http协议传送WebSocket支持的版本号，协议的字版本号，原始地址，主机地址等等一些列字段给服务器端。
3. WebSocket服务器收到Browser/UA发送来的握手请求后，如果数据包数据和格式正确，客户端和服务器端的协议版本号匹配等等，就接受本次握手连接，并给出相应的数据回复，同样回复的数据包也是采用http协议传输。
4. Browser收到服务器回复的数据包后，如果数据包内容、格式都没有问题的话，就表示本次连接成功，触发onopen消息，此时Web开发者就可以在此时通过send接口想服务器发送数据。否则，握手连接失败，Web应用程序会收到onerror消息，并且能知道连接失败的原因。
**(一)socket和http区别**
    1,传输层的TCP是基于网络层的IP协议的，
    2,而应用层的HTTP协议又是基于传输层的TCP协议的，
    3,而Socket本身不算是协议，就像上面所说，它只是提供了一个针对TCP或者UDP编程的接口.
**(二)websocket 和socket区别**
    1,websocket是应用层的协议,而socket是传输控制层的协议.      
**(三)websocket和http区别**       
相同点:
    1,都是应用层的协议
    2,都是基于tcp,并且都是可靠的协议
不同点:
    1,websocket是持久连接的协议,而http是非持久连接的协议.
    2,websocket是双向通信协议,模拟socket协议,可以双向发送消息,而http是单向的.
    3,websocket的服务端可以主动向客服端发送信息,而http的服务端只有在客户端发起请求时才能发送数据,无法主动向客户端发送信息.
**(四)HTTPS和HTTP的区别主要为以下四点：**
    1、https协议需要到ca申请证书，一般免费证书很少，需要交费。
    2、http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
    3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
    4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

### js原型链

https://juejin.im/post/58f94c9bb123db411953691b
http://yujiangshui.com/javascript-prototype-and-create-object/

### 继承（http://yujiangshui.com/javascript-inheritance/）
**1.原型链继承**

### 对闭包的理解以及应用场景
```js
var foo = (function() {
  var secret = 'secret';
  return {
    get_secret : function () {
      // 通过定义的接口来访问secret
      return secret;
    },
    new_secret: function (new_secret) {
      // 通过定义的接口来修改secret
      secret = new_secret;
    }
  };
})();
console.log(foo.get_secret());
console.log(foo.secret)
foo.get_secret();//secret
foo.secret;//Type error
foo.new_secret('a new secret');
foo.get_secret()//a new secret
```

### css盒模型

### css选择器优先级
important>内联(1000)>id(100>class(10)>标签（1）  数字表示权重

### js里事件的三个阶段
事件流被分为三个阶段捕获过程、目标过程、冒泡过程
冒泡型事件流：事件的传播是从最特定的事件目标到最不特定的事件目标。即从DOM树的叶子到根。 
捕获型事件流：事件的传播是从最不特定的事件目标到最特定的事件目标。即从DOM树的根到叶子。
**事件代理：**
原理：靠事件冒泡实现的
优点：
大量减少内存占用，减少事件注册
新增子对象时无需再次对其绑定事件，对于动态内容不符尤其适用
缺点：
适用于表格/列表等重复性dom元素,事件代理用不好可能出现事件误判，即本不应该触发事件的元素被绑定了事件
**e.target和e.currentTarget**
　target和currentTarget都是event上面的属性，target是真正发生事件的DOM元素，而currentTarget是当前事件发生在哪个DOM元素上。
　目标阶段也就是 target == currentTarget的时候。

### event loop
1. js是单线程，js解析方法时，将同步任务排队到执行栈中，异步任务排队到事件队列中。
2. 事件队列分为:
宏任务：setTimeout，setInterval，setImmediate，I/O，UI交互事件
微任务：process.nextTick，Promise.then
3. 浏览器环境中执行方法时，先将执行栈中的任务清空，再将微任务推到执行栈中并清空，之后检查是否存在宏任务，若存在则取出一个宏任务，执行完成检查是否有微任务，以此循环…

### vue-router原理（还需要整理一下）
利用URL中的hash；
利用H5中history；
重点说其中的两个新增的API history.pushState 和 history.replaceState
状态对象（state object） — 一个JavaScript对象，与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
标题（title） — FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。
地址（URL） — 新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

### html的缓存机制 （2个缓存的属性总结一下）
Etag首部怎么产生的

### webpack的loader

### this

### 数据绑定

### 输入url发生了什么

### js作用域的理解

### with在项目中的应用

### web安全以及怎么防范
csrf xxs验证码好处

### 性能优化

### http和https

### 页面渲染过程

### 前端工程化

### cookie和session区别
1、cookie数据存放在客户的浏览器上，session数据放在服务器上。
2、cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
   考虑到安全应当使用session。
3、session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   考虑到减轻服务器性能方面，应当使用COOKIE。
4、单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
5、所以个人建议：
   将登陆信息等重要信息存放为SESSION
   其他信息如果需要保留，可以放在COOKIE中

### localStorage和sessionStorage的区别

特性	Cookie	localStorage	sessionStorage
数据的生命期	一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效	除非被清除，否则永久保存	仅在当前会话下有效，关闭页面或浏览器后被清除
存放数据大小	4K左右	一般为5MB
与服务器端通信	每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题	仅在客户端（即浏览器）中保存，不参与和服务器的通信
易用性	需要程序员自己封装，源生的Cookie接口不友好	源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

### get和post区别
GET和POST的重大区别是，GET产生一个TCP数据包，POST产生两个数据包，对于GET请求，浏览器会把header与data一起发送出去，服务端响应200的状态码，但是POST首先会发送一个header，服务端响应100 continue，然后在发送data到服务端，所以产生两个数据包，并不是所有的浏览器都发送两次数据包，例如，Firefox只发送一次。

### 为什么需要虚拟DOM
浏览器的引擎工作流程
创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting
第一步，用HTML分析器，分析HTML元素，构建一颗DOM树。
第二步：用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表。
第三步：将上面的DOM树和样式表，关联起来，构建一颗Render树。这一过程又称为Attachment。每个DOM节点都有attach方法，接受样式信息，返回一个render对象（又名renderer）。这些render对象最终会被构建成一颗Render树。
第四步：有了Render树后，浏览器开始布局，会为每个Render树上的节点确定一个在显示屏上出现的精确坐标值。
第五步：Render数有了，节点显示的位置坐标也有了，最后就是调用每个节点的paint方法，让它们显示出来。

### 继承

css里面的定位：absolute ，relative，fixed，分别相对于什么进行定位
css引入样式的方式，优先级，性能最好；外部文件的样式覆盖标签的样式
JS对象原型链，检测对象,数组的数据类型Object.prototype.toString()
apply()，call()，区别，this指向了谁，
闭包是什么，函数作为返回值用来干什么（难道不是调用另一个函数的作用域）
JS中this的指向，最普通的指向（没有环境，没有方法）——>指向全局；在函数中的this指向调用这个函数的对象；箭头函数的this指向定义它的对象；
Object中定义了一个方法，方法中this指向了谁？ 不是箭头函数的时候，this指向调用这个函数的对象；箭头函数中指向这个Object
Ajax的了解
Promise的了解
DOM选择一个元素有哪些方法？（getElementById,getElementByClassName;getElementByTagName,querySelected）
http状态码，常用的（200，204，301，302，304，404,500，502）
进程，线程区别；
数据结构Set，Map
map的实现，红黑树了解吗？哈希表？
linux的了解？基本命令应该知道吧？（no）

### vue底层怎么实现双向数据绑定
```html
<!DOCTYPE html>
<head>
  <title>myVue</title>
</head>
<style>
  #app {
    text-align: center;
  }
</style>
<body>
  <div id="app">
    <form>
      <input type="text"  v-model="number">
      <button type="button" v-click="increment">增加</button>
    </form>
    <h3 v-bind="number"></h3>
    <form>
      <input type="text"  v-model="count">
      <button type="button" v-click="incre">增加</button>
    </form>
    <h3 v-bind="count"></h3>
  </div>
</body>

<script>
  function myVue(options) {
    this._init(options);
  }

  myVue.prototype._init = function (options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;

    this._binding = {};
    this._obverse(this.$data);
    this._complie(this.$el);
  }
 
  myVue.prototype._obverse = function (obj) {
    var _this = this;
    Object.keys(obj).forEach(function (key) {
      if (obj.hasOwnProperty(key)) {
        _this._binding[key] = {                                                                                                                                                          
          _directives: []
        };
        console.log(_this._binding[key])
        var value = obj[key];
        if (typeof value === 'object') {
          _this._obverse(value);
        }
        var binding = _this._binding[key];
        Object.defineProperty(_this.$data, key, {
          enumerable: true,
          configurable: true,
          get: function () {
            console.log(`${key}获取${value}`);
            return value;
          },
          set: function (newVal) {
            console.log(`${key}更新${newVal}`);
            if (value !== newVal) {
              value = newVal;
              binding._directives.forEach(function (item) {
                item.update();
              })
            }
          }
        })
      }
    })
  }

  myVue.prototype._complie = function (root) {
    var _this = this;
    var nodes = root.children;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.children.length) {
        this._complie(node);
      }

      if (node.hasAttribute('v-click')) {
        node.onclick = (function () {
          var attrVal = nodes[i].getAttribute('v-click');
          return _this.$methods[attrVal].bind(_this.$data);
        })();
      }

      if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
        node.addEventListener('input', (function(key) {
          var attrVal = node.getAttribute('v-model');
          _this._binding[attrVal]._directives.push(new Watcher(
            'input',
            node,
            _this,
            attrVal,
            'value'
          ))

          return function() {
            _this.$data[attrVal] =  nodes[key].value;
          }
        })(i));
      } 

      if (node.hasAttribute('v-bind')) {
        var attrVal = node.getAttribute('v-bind');
        _this._binding[attrVal]._directives.push(new Watcher(
          'text',
          node,
          _this,
          attrVal,
          'innerHTML'
        ))
      }
    }
  }

  function Watcher(name, el, vm, exp, attr) {
    this.name = name;         //指令名称，例如文本节点，该值设为"text"
    this.el = el;             //指令对应的DOM元素
    this.vm = vm;             //指令所属myVue实例
    this.exp = exp;           //指令对应的值，本例如"number"
    this.attr = attr;         //绑定的属性值，本例为"innerHTML"

    this.update();
  }

  Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp];
  }

  window.onload = function() {
    var app = new myVue({
      el:'#app',
      data: {
        number: 0,
        count: 0,
      },
      methods: {
        increment: function() {
          this.number ++;
        },
        incre: function() {
          this.count ++;
        }
      }
    })
  }
</script>
```







 
 











