/*
*@author diqye
*@desc 引入js ，css 返回promise
*/
(function(exports){
    //{String:(Element,*)}
    var STATE_CACHE={};
    var HEAD = document.head = document.head || document.getElementsByTagName('head')[0];
  
  
    // String -> (Error -> Element -> Void) -> Void
    function loadCss(src,fn){
        var node=document.createElement('link');
        node.rel='stylesheet';
        node.href=src;
        HEAD.appendChild(node);
        if(node.attachEvent){
            node.attachEvent('onload', function(){fn(null,node)});
        }else{
           setTimeout(function() {
             poll(node, fn);
           }, 0); // for cache
        }
        function poll(node,callback){
            var isLoaded = false;
            if(/webkit/i.test(navigator.userAgent)) {//webkit
                if (node['sheet']) {
                    isLoaded = true;
                  }
            }else if(node['sheet']){// for Firefox
                try{
                    if (node['sheet'].cssRules) {
                          isLoaded = true;
                    }
                  }catch(ex){
                    // NS_ERROR_DOM_SECURITY_ERR
                    if (ex.code === 1000) {
                         isLoaded = true;
                    }
                }
            }
            if(isLoaded){
                setTimeout(function(){
                    callback(null,node);
                },1);
            }else{
                setTimeout(function(){
                    poll(node,callback);
                },10);
            }
        }
        node.onLoad=function(){
            fn(null,node);
        }
    }
  
    // String -> (Error -> Element -> Void) -> Void
    function loadScript(src,fn){
        var node = document.createElement("script");
        node.setAttribute('async','async');
        var timeID
        var supportLoad = "onload" in node
        var onEvent = supportLoad ? "onload" : "onreadystatechange"
        node[onEvent] = function onLoad() {
            if (!supportLoad && !timeID && /complete|loaded/.test(node.readyState)) {
                timeID = setTimeout(onLoad)
                return
            }
            if (supportLoad || timeID) {
                clearTimeout(timeID)
                fn(null,node);
            }
        }
        HEAD.appendChild(node);
        node.src=src;
        node.onerror=function(e){
            fn(e);
        }
    }
  
  
    // String -> String
    function toAbsPath(src){
      var author = document.createElement("a");
      author.setAttribute("href",src);
      return author.href;
    }
  
    // String -> Promsie
    function wiptcss(osrc){
      if(osrc.slice(0,2) == '//' && location.protocol == 'file:'){
        osrc = 'http:'+osrc
      }else{
        void null
      }
      var src = toAbsPath(osrc);
      if(STATE_CACHE[src]){
        return new Promise(function(resolve,reject){
          resolve(STATE_CACHE[src]);
        });
      }else{
        return new Promise(function(resolve,reject){
          loadCss(src,function(err,r){
            if(err){
              reject(err);
            }else{
              STATE_CACHE[src] = r;
              resolve(r);
            }
          })
        });
      }
    }
  
    // String -> Promise
    function wiptjs(osrc){
      if(osrc.slice(0,2) == '//' && location.protocol == 'file:'){
        osrc = 'http:'+osrc
      }else{
        void null
      }
      var src = toAbsPath(osrc);
      if(STATE_CACHE[src]){
        return new Promise(function(resolve,reject){
          getData(STATE_CACHE[src],resolve,reject);
        });
      }else{
        return new Promise(function(resolve,reject){
          loadScript(src,function(err,r){
            if(err){
              reject(err);
            }else{
              var nr = STATE_CACHE[src];
              if(nr != null){
                getData(STATE_CACHE[src],resolve,reject);
              }else{
                STATE_CACHE[src] = r;
                resolve(r);
              }
            }
          })
        });
      }
    }
  
    // Void -> ScriptElement
    function currentjsPath(){
      if (document.currentScript) return document.currentScript;
      var r = null;
      var dochead = document.getElementsByTagName("head")[0];
      var scripts = dochead.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if(script.readyState == 'interactive') return script;
      }
      try {
         "呵呵".恶心的浏览器只能以恶心的方式去处理();
      } catch (e) {
         var stack = e.stack;
         if (!stack) {
             stack = (String(e).match(/if linked scipt \s+/g) || []).join(' ');
         }
         stack = stack.split(/[@ ]/g).pop();
         stack = stack[0] === '(' ? stack.slice(1, -1) : stack.replace(/\s/, '');
         return {
             src: stack.replace(/(:\d+)?:\d+$/i, "")
         };
      }
    }
  
    function cacheMod(obj){
      var key = currentjsPath().src;
      var origin = STATE_CACHE[key];
      if(origin == null){
        STATE_CACHE[key] = {
          type:'signle',
          objs:[obj]
        };
      }else{
        origin.objs.push(obj)
        origin.type = 'multiple'
      }
    }
    // (* -> Void) -> Object
    function mod(fn){
      var obj = fn();
      cacheMod(obj)
    }
    // [a] -> (a->b) -> [b]
    function map(xs,fn){
      var b = [];
      for (var i = 0; i < xs.length; i++) {
        var x = xs[i];
        b.push(fn(x));
      }
      return b;
    }
    function getBasicData(nr){
      if(nr.type == 'signle'){
        return nr.objs[0];
      }else if(nr.type == 'multiple'){
        return nr.objs;
      }else{
        return nr
      }
    }
    function getData(nr,fn,efn){
      if(nr instanceof Promise){
       return nr.then(fn).catch(efn)
      }else{
        return fn(getBasicData(nr))
      }
    }
    // [String] -> (* -> *) -> Void
    function mod1(xs,fn){
      if(typeof xs == 'function'){
        return mod(xs)
      }else{
        cacheMod(Promise.all(map(xs,function(src){
          return wiptjs(src)
        })).then(function(xs1){
          var obj = fn.apply(null,map(xs1,getBasicData))
          return obj
        }))
      }
    }
    // [a] -> (a->Void) -> Void
    function each(xs,fn){
      for (var i = 0; i < xs.length; i++) {
        var x = xs[i];
        fn(x);
      }
    }
  
  
    function main(){
      var el = document.querySelector('script[main]')
      var jspath = el.getAttribute('main')+'?'+(new Date() - 0)
      wiptjs(jspath)
    }
    main()
  
    exports.imptjs = wiptjs;
    exports.imptcss = wiptcss;
    exports.mod = mod1;
  
  }(this))
  