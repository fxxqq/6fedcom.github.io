<div class="site-meta {% if theme.custom_logo.enabled %}custom-logo{% endif %}">
  {% if theme.custom_logo.image and not theme.scheme %}
    <div class="site-meta-headline">
      <a>
        <img class="custom-logo-image" src="{{ theme.custom_logo.image }}"
             alt="{{ config.title }}"/>
      </a>
    </div>
  {% endif %}

  <div class="custom-logo-site-title">
    <a href="{{ config.root }}"  class="brand" rel="start">
      <span class="logo-line-before"><i></i></span>
      <span class="site-title">{{ config.title }}</span>
      <span class="logo-line-after"><i></i></span>
    </a>
  </div>
  <p class="site-subtitle">{{ config.subtitle }}</p>
</div>

<div class="site-nav-toggle">
  <button>
    <span class="btn-bar"></span>
    <span class="btn-bar"></span>
    <span class="btn-bar"></span>
  </button>
</div>

<nav class="site-nav">
  {% set hasSearch = theme.swiftype_key || theme.tinysou_Key %}

  {% if theme.menu %}
    <ul id="menu" class="menu {{ hasSearch and 'menu-left' }}">
      {% for name, path in theme.menu %}
        {% set itemName = name.toLowerCase() %}
        <li class="menu-item menu-item-{{ itemName }}">
          <a href="{{ url_for(path) }}" rel="section">
            {% if theme.menu_icons.enable %}
              <i class="menu-item-icon fa fa-{{theme.menu_icons[itemName] || 'question-circle'}}"></i> <br />
            {% endif %}
            {{ __('menu.' + itemName) }}
          </a>
        </li>

        
      {% endfor %}

      <!--<li class="menu-item" style="opacity: 1; transform: translateY(0px);"> <a  href='javascript:(function() {
          function c() {
              var e = document.createElement("link");
              e.setAttribute("type", "text/css");
              e.setAttribute("rel", "stylesheet");
              e.setAttribute("href", f);
              e.setAttribute("class", l);
              document.body.appendChild(e)
          }

          function h() {
              var e = document.getElementsByClassName(l);
              for (var t = 0; t < e.length; t++) {
                  document.body.removeChild(e[t])
              }
          }

          function p() {
              var e = document.createElement("div");
              e.setAttribute("class", a);
              document.body.appendChild(e);
              setTimeout(function() {
                  document.body.removeChild(e)
              }, 100)
          }

          function d(e) {
              return {
                  height : e.offsetHeight,
                  width : e.offsetWidth
              }
          }

          function v(i) {
              var s = d(i);
              return s.height > e &amp;&amp; s.height < n &amp;&amp; s.width > t &amp;&amp; s.width < r
          }

          function m(e) {
              var t = e;
              var n = 0;
              while (!!t) {
                  n += t.offsetTop;
                  t = t.offsetParent
              }
              return n
          }

          function g() {
              var e = document.documentElement;
              if (!!window.innerWidth) {
                  return window.innerHeight
              } else if (e &amp;&amp; !isNaN(e.clientHeight)) {
                  return e.clientHeight
              }
              return 0
          }

          function y() {
              if (window.pageYOffset) {
                  return window.pageYOffset
              }
              return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
          }

          function E(e) {
              var t = m(e);
              return t >= w &amp;&amp; t <= b + w
          }

          function S() {
              var e = document.createElement("audio");
              e.setAttribute("class", l);
              e.src = i;
              e.loop = false;
              e.addEventListener("canplay", function() {
                  setTimeout(function() {
                      x(k)
                  }, 500);
                  setTimeout(function() {
                      N();
                      p();
                      for (var e = 0; e < O.length; e++) {
                          T(O[e])
                      }
                  }, 15500)
              }, true);
              e.addEventListener("ended", function() {
                  N();
                  h()
              }, true);
              e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
              document.body.appendChild(e);
              e.play()
          }

          function x(e) {
              e.className += " " + s + " " + o
          }

          function T(e) {
              e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
          }

          function N() {
              var e = document.getElementsByClassName(s);
              var t = new RegExp("\\b" + s + "\\b");
              for (var n = 0; n < e.length; ) {
                  e[n].className = e[n].className.replace(t, "")
              }
          }

          var e = 30;
          var t = 30;
          var n = 350;
          var r = 350;
          var i = "https://ss0.bdstatic.com/y0s1hSulBw92lNKgpU_Z2jR7b2w6buu/data2/music/8b77e748d030862ea6ed5ef0fcf7832d/242078559/242078559.mp3?xcode=0683c9c47ce11a94766f476e85847328";
          var s = "mw-harlem_shake_me";
          var o = "im_first";
          var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
          var a = "mw-strobe_light";
          var f = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
          var l = "mw_added_css";
          var b = g();
          var w = y();
          var C = document.getElementsByTagName("*");
          var k = null;
          for (var L = 0; L < C.length; L++) {
              var A = C[L];
              if (v(A)) {
                  if (E(A)) {
                      k = A;
                      break
                  }
              }
          }
          if (A === null) {
              console.warn("Could not find a node of the right size. Please try a different page.");
              return
          }
          c();
          S();
          var O = [];
          for (var L = 0; L < C.length; L++) {
              var A = C[L];
              if (v(A)) {
                  O.push(A)
              }
          }
          })()' class="okmemo-tmp-unselect"><i class="menu-item-icon fa fa-music fa-fw"></i>High一下</a> </li>-->

      {# Search icon for default scheme #}
      {% if not theme.scheme and theme.swiftype_key %}
        <li class="menu-item menu-item-search">
          <a href="#" class="st-search-show-outputs">
            {% if theme.menu_icons.enable %}
              <i class="menu-item-icon fa fa-search icon-next-search"></i> <br />
            {% endif %}
            {{ __('menu.search') }}
          </a>

        </li>

		
      {% endif %}
    </ul>
  {% endif %}
    

  {% if hasSearch %}
    <div class="site-search">
      {% include 'search.swig' %}
    </div>

  {% endif %}
</nav>


