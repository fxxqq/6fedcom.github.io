---
layout:     post
title:      "Understanding browser default styles"
subtitle:   "理解浏览器默认样式"
tags:
   - css
---
# 理解浏览器默认样式


　　不同浏览器的默认样式多少有些区别，特别是老版本的浏览器之间，现在高级浏览器越来越向统一的标准靠拢,虽然有些许差异，但是绝大部分还是相同的。

```
  1 html, address,
  2 blockquote,
  3 body, dd, div,
  4 dl, dt, fieldset, form,
  5 frame, frameset,
  6 h1, h2, h3, h4,
  7 h5, h6, noframes,
  8 ol, p, ul,center,
  9 dir, hr, menu, pre{ display: block}
 10 /* 以上按照block显示，没有规定的则按照默认的inline显示 */
 11
 12 li { display: list-item}
 13 /* 程序猿常用的display值是：inline/block/inline-block，很少用到 list-item
 14 list-item到底是什么样的显示效果，可以通过例子验证。。。。
 15 第一，你可以不用ul-li，而用其他标签实现list-item的效果
 16 第二，要意识到，浏览器对待html只是把它当作一个dom树，至于显示成什么效果，是通过浏览器默认的css实现的，即样式全部通过css设计，和html无关 */
 17
 18 head { display: none}
 19 table { display: table }
 20 /* display:table 和 block 最大的区别在于：包裹性。 提到包裹性，就不得不提一下float和absolute*/
 21
 22 tr { display: table-row}
 23 thead { display: table-header-group}
 24 tbody { display: table-row-group}
 25 tfoot { display: table-footer-group}
 26 col { display: table-column}
 27 colgroup { display: table-column-group}
 28 td, th { display: table-cell; }
 29 /* 与table相关的其他display值，研究的意义不大，但是table-cell值得一说。
 30 table-cell是多列布局的最新解决方案，比使用float更加有效（不兼容IE6、7）
 31 实际上table-cell是要依赖其他table相关的display，但是浏览器会为我们做这些工作，不必手动填写 */
 32
 33 caption{ display: table-caption}
 34 th { font-weight: bolder; text-align: center}
 35 /* 标题默认设置了粗体和文字居中 */
 36
 37 caption{ text-align: center}
 38 body { margin: 8px; line-height: 1.12}
 39 /* 不同浏览器的margin不一样，所以要设置【 *{margin:0} 】
 40 line-height:1.12 针对英文没问题，但是中文看起来很别扭
 41 另外，1.12是一个相对值（即1.12em），与文字有关的距离设置最好用相对值*/
 42
 43 h1{ font-size: 2em; margin: .67em 0}
 44 h2{ font-size:1.5em; margin: .75em 0}
 45 h3{ font-size: 1.17em; margin: .83em 0}
 46 h4, p,
 47 blockquote, ul,
 48 fieldset, form,
 49 ol, dl, dir,
 50 menu { margin:1.12em 0}
 51 /* em是相对单位，1em就是一单位，浏览器默认的一单位是16px，
 52 可以通过 body{font-size:20px} 来修改一单位的值
 53 p的字体大小是1em，h1是2em，h2是1.5em，等等
 54 另外，与文字相关的距离值，最好用相对单位，例如 line-height:1.4; margin:.5em等等，这样做的好处就是当自定义了1em的绝对px时，line-height也会跟着变 */
 55
 56 /* 注意，如果我们自己写css【 * {margin:0} 】，可以把p、h1、h2等标签的margin覆盖掉
 57 我们都知道，*选择器的权重是最低的，但是它却能覆盖掉标签选择器，说明浏览器已经在这里面做了手脚
 58 浏览器没有让默认样式和用户自定义样式“公平竞争”，而是优先用户自定义样式 */
 59
 60 h5{ font-size: .83em; margin: 1.5em 0}
 61 h6{ font-size: .75em; margin: 1.67em 0}
 62 h1, h2, h3, h4,
 63 h5, h6, b,
 64 strong { font-weight: bolder}
 65 /* 这里可以看到哪些标签文字是加粗的 */
 66
 67 blockquote { margin-left: 40px; margin-right: 40px}
 68 i, cite, em,
 69 var, address { font-style: italic}
 70 /* 这里可以看到哪些标签是斜体 */
 71
 72 pre, tt, code,
 73 kbd, samp { font-family: monospace}
 74 pre{ white-space: pre}
 75 button, textarea,
 76 input, object,
 77 select { display:inline-block; }
 78 /* 不知道inline-block是什么样子的？或者不知道inline-block有什么特性？
 79 在这里看看哪些标签是inline-block，就知道inline-block的用处了
 80 具体inline-block的用途，我们会在后面详细介绍，此处只是点出来 */
 81
 82 big { font-size: 1.17em}
 83 small, sub, sup { font-size: .83em}
 84 sub{ vertical-align:sub}
 85 sup { vertical-align: super}
 86 table { border-spacing: 2px; }
 87 thead, tbody,
 88 tfoot { vertical-align: middle}
 89 td, th { vertical-align: inherit }
 90 s, strike, del { text-decoration: line-through}
 91 hr {border: 1px inset}
 92 /* 为什么<hr/>默认是那么个难看的样子，特别是IE下，这就是罪魁祸首 */
 93
 94 ol, ul, dir,
 95 menu, dd { margin-left: 40px}
 96 ol {list-style-type: decimal}
 97 /* ul 和 ol 在默认情况下都会有一篇左边的间距，在这里可以看到为何会有间距，以及间距的具体大小是多少。
 98  */
 99
100 ol ul, ul ol,
101 ul ul, ol ol { margin-top: 0;margin-bottom: 0}
102 u, ins { text-decoration: underline}
103 br:before {content: "A"}
104 /* ？？？？？？？？？？？？？ */
105 :before, :after { white-space: pre-line }
106 /* <br/>为何能实现换行？浏览器得到html的br标签，只会解析成一个dom节点而已，
107 而“换行”这一功能是通过这里实现的？？？？？ */
108
109 center{text-align: center}
110 abbr, acronym { font-variant: small-caps; letter-spacing: 0.1em}
111 :link, :visited { text-decoration: underline}
112 :focus {outline: thindottedinvert}
113
114 /* Begin bidirectionality settings (do not change) */
115 BDO[DIR="ltr"] { direction: ltr; unicode-bidi: bidi-override}
116 BDO[DIR="rtl"] { direction: rtl; unicode-bidi: bidi-override}
117
118 *[DIR="ltr"] { direction: ltr; unicode-bidi: embed}
119 *[DIR="rtl"] { direction:rtl; unicode-bidi: embed}
120 /* 这些标签或属性都不常用 */
121
122 @media print{
123 h1{ page-break-before:always}
124 h1, h2, h3,
125 h4, h5, h6{ page-break-after: avoid}
126 ul, ol, dl { page-break-before: avoid}
127 /* 对于打印页面时的设置，不常用 */
128
129 /* 以下都是按照标签选择器来的，标签选择器比类、id选择器的权重都低。
130 所以，用户自定义的样式，无论是用标签、类还是id，都能覆盖默认的标签选择器 */
```

浏览器加载了html之后只为一件东西——dom树，浏览器把html变为dom树结构，就完成了对html的结构化。至于后来对视图的渲染，p是block、br换行，那是整合了css之后的事情。而浏览器整合css又是另一个路线，和解析html是分开的。这里的“css”就包含了浏览器默认样式。
<img src='../../../../img/201709/15053535769958.jpg'>

浏览器将载入的html变为dom树，但是此时没有任何显示样式。所以显示的样式，都是css定义的，浏览器只会通过css来渲染视图样式。

##block元素
<img src='../../../../img/201709/15053537026943.jpg'>
浏览器默认样式天生规定了div是block——所以才导致了div是block！是默认样式规定的，不是浏览器的内核规定的。没有设置block的元素，默认为inline显示。
