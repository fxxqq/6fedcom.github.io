---
title: webpack4定制前端开发环境
tags: webpack
categories: Build
abbrlink: 97542e7b
date: 2018-09-04 15:10:12
---

> 来源掘金小册笔记

# 一、webpack概念和基础使用

## 1.1 安装和使用

```shell
npm install webpack webpack-cli -g 

# 或者
yarn global add webpack webpack-cli

# 然后就可以全局执行命令了
webpack --help
```

## 1.2 webpack 的基本概念

> webpack 本质上是一个打包工具，它会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包

![image.png](https://upload-images.jianshu.io/upload_images/1480597-9bd38573bdc1456c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> webpack 会把我们项目中使用到的多个代码模块（可以是不同文件类型），打包构建成项目运行仅需要的几个静态文件


**入口**

> 入口可以使用 `entry `字段来进行配置，`webpack` 支持配置多个入口来进行构建

```js
module.exports = {
  entry: './src/index.js' 
}

// 上述配置等同于
module.exports = {
  entry: {
    main: './src/index.js'
  }
}

// 或者配置多个入口
module.exports = {
  entry: {
    foo: './src/page-foo.js',
    bar: './src/page-bar.js', 
    // ...
  }
}

// 使用数组来对多个文件进行打包
module.exports = {
  entry: {
    main: [
      './src/foo.js',
      './src/bar.js'
    ]
  }
}...

```

**loader**

> 可以把 `loader `理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块

- 当我们需要使用不同的 `loader` 来解析处理不同类型的文件时，我们可以在 `module.rules` 字段下来配置相关的规则，例如使用 `Babel` 来处理 `.js` 文件

```js
module: {
  // ...
  rules: [
    {
      test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
      include: [
        path.resolve(__dirname, 'src') // 指定哪些路径下的文件需要经过 loader 处理
      ],
      use: 'babel-loader', // 指定使用的 loader
    },
  ],
}...
```

**plugin**

> 模块代码转换的工作由 `loader` 来处理，除此之外的其他任何工作都可以交由 `plugin` 来完成。通过添加我们需要的 `plugin`，可以满足更多构建中特殊的需求。例如，要使用压缩 `JS `代码的 `uglifyjs-webpack-plugin` 插件，只需在配置中通过 `plugins `字段添加新的 `plugin `即可...


```js
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyPlugin()
  ],
}
```

> `plugin` 理论上可以干涉 `webpack` 整个构建流程，可以在流程的每一个步骤中定制自己的构建需求

**输出**

> 构建结果的文件名、路径等都是可以配置的，使用 `output `字段

```js
module.exports = {
  // ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}

// 或者多个入口生成不同文件
module.exports = {
  entry: {
    foo: './src/foo.js',
    bar: './src/bar.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
}

// 路径中使用 hash，每次构建时会有一个不同 hash 值，避免发布新版本时线上使用浏览器缓存
module.exports = {
  // ...
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/[hash]',
  },
}...
```

> 我们一开始直接使用 `webpack` 构建时，默认创建的输出内容就是 `./dist/main.js`

**一个简单的 webpack 配置**

> 我们把上述涉及的几部分配置内容合到一起，就可以创建一个简单的 `webpack` 配置了，`webpack` 运行时默认读取项目下的 `webpack.config.js` 文件作为配置。所以我们在项目中创建一个 `webpack.config.js` 文件

```js
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new UglifyPlugin(), 
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
  ],
}...
```


# 二、搭建基础的前端开发环境

## 2.1 关联 HTML

> `webpack` 默认从作为入口的 `.js` 文件进行构建（更多是基于 `SPA` 去考虑），但通常一个前端项目都是从一个页面（即 HTML）出发的，最简单的方法是，创建一个 HTML 文件，使用 `script` 标签直接引用构建好的 JS 文件，如...

```
<script src="./dist/bundle.js"></script>
```

- 但是，如果我们的文件名或者路径会变化，例如使用 `[hash]` 来进行命名，那么最好是将 `HTML` 引用路径和我们的构建结果关联起来，这个时候我们可以使用 `html-webpack-plugin`
- `html-webpack-plugin` 是一个独立的 `node package`，所以在使用之前我们需要先安装它，把它安装到项目的开发依赖中

```
npm install html-webpack-plugin -D 
```

> 然后在 `webpack `配置中，将 `html-webpack-plugin` 添加到 `plugins` 列表中

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(),
  ],
}...
```

> 这样配置好之后，构建时 `html-webpack-plugin` 会为我们创建一个 `HTML` 文件，其中会引用构建出来的 JS 文件。实际项目中，默认创建的 `HTML` 文件并没有什么用，我们需要自己来写 `HTML` 文件，可以通过 `html-webpack-plugin` 的配置，传递一个写好的 HTML 模板...

```js
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', // 配置文件模板
    }),
  ],
}...
```

> 这样，通过 `html-webpack-plugin` 就可以将我们的页面和构建 `JS` 关联起来，回归日常，从页面开始开发。如果需要添加多个页面关联，那么实例化多个 `html-webpack-plugin`， 并将它们都放到 `plugins` 字段数组中就可以了...

## 2.2 构建 CSS

> 我们编写 `CSS`，并且希望使用 `webpack` 来进行构建，为此，需要在配置中引入 `loader` 来解析和处理 `CSS` 文件

```js
module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  }
}...
```

- `css-loader` 负责解析 `CSS` 代码，主要是为了处理 `CSS` 中的依赖，例如 `@import` 和 `url()` 等引用外部文件的声明；
- `style-loader` 会将 `css-loader` 解析的结果转变成 `JS `代码，运行时动态插入 `style` 标签来让 `CSS` 代码生效...

> 经由上述两个 `loader` 的处理后，CSS 代码会转变为 JS，和 `index.js `一起打包了。如果需要单独把 CSS 文件分离出来，我们需要使用 `extract-text-webpack-plugin` 插件

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: 'css-loader',
        }), 
      },
    ],
  },
  plugins: [
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin('index.css'),
  ],
}...
```

## 2.3 CSS 预处理器

> 在上述使用 CSS 的基础上，通常我们会使用 `Less/Sass` 等 CSS 预处理器，webpack 可以通过添加对应的 `loader` 来支持，以使用 `Less` 为例，我们可以在官方文档中找到对应的 `loader`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            'css-loader', 
            'less-loader',
          ],
        }), 
      },
    ],
  },
  // ...
}...
```

## 2.4 处理图片文件

> 在前端项目的样式中总会使用到图片，虽然我们已经提到 `css-loader` 会解析样式中用 `url()` 引用的文件路径，但是图片对应的 `jpg/png/gif` 等文件格式，`webpack` 处理不了。是的，我们只要添加一个处理图片的 `loader` 配置就可以了，现有的 `file-loader` 就是个不错的选择...

- `file-loader` 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。配置很简单，在 `rules`中添加一个字段，增加图片类型文件的解析配置

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
}...
```

## 2.5 使用 Babel

> `Babel` 是一个让我们能够使用 `ES` 新特性的 `JS` 编译工具，我们可以在 `webpack` 中配置 Babel，以便使用 `ES6`、`ES7` 标准来编写 `JS `代码

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
    ],
  },
}...
```

## 2.6 启动静态服务

> 至此，我们完成了处理多种文件类型的 webpack 配置。我们可以使用 `webpack-dev-server` 在本地开启一个简单的静态服务来进行开发


```js
"scripts": {
  "build": "webpack --mode production",
  "start": "webpack-dev-server --mode development"
}
```

> 尝试着运行 `npm start` 或者 `yarn start`，然后就可以访问` http://localhost:8080/` 来查看你的页面了。默认是访问 `index.html`，如果是其他页面要注意访问的 URL 是否正确

## 2.7 完整示例代码

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            'css-loader', 
            'less-loader',
          ],
        }), 
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
    }),
    new ExtractTextPlugin('[name].css'),
  ],
}
```


# 三、webpack如何解析代码模块路径

> webpack 中有一个很关键的模块 `enhanced-resolve` 就是处理依赖模块路径的解析的，这个模块可以说是 Node.js 那一套模块路径解析的增强版本，有很多可以自定义的解析配置

- 在 webpack 配置中，和模块路径解析相关的配置都在 `resolve `字段下

```
module.exports = {
  resolve: {
    // ...
  }
}
```

## 3.1 常用的一些配置

**resolve.alias**

> 假设我们有个 `utils` 模块极其常用，经常编写相对路径很麻烦，希望可以直接 `import 'utils'` 来引用，那么我们可以配置某个模块的别名，如

```js
alias: {
  utils: path.resolve(__dirname, 'src/utils') // 这里使用 path.resolve 和 __dirname 来获取绝对路径
}
```

> 上述的配置是模糊匹配，意味着只要模块路径中携带了 utils 就可以被替换掉，如：

```
import 'utils/query.js' // 等同于 import '[项目绝对路径]/src/utils/query.js'
```

> 如果需要进行精确匹配可以使用：

```js
alias: {
  utils$: path.resolve(__dirname, 'src/utils') // 只会匹配 import 'utils'
}
```

**resolve.extensions**

```js
extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
// 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
```

> 这个配置的作用是和文件后缀名有关的,这个配置可以定义在进行模块路径解析时，webpack 会尝试帮你补全那些后缀名来进行查找


# 四、配置loader

## 4.1 loader 匹配规则

> 当我们需要配置 `loader` 时，都是在 `module.rules` 中添加新的配置项，在该字段中，每一项被视为一条匹配使用 `loader `的规则

```js
module.exports = {
  // ...
  module: {
    rules: [ 
      {
        test: /\.jsx?/, // 条件
        include: [ 
          path.resolve(__dirname, 'src'),
        ], // 条件
        use: 'babel-loader', // 规则应用结果
      }, // 一个 object 即一条规则
      // ...
    ],
  },
}...
```

> `loader` 的匹配规则中有两个最关键的因素：一个是匹配条件，一个是匹配规则后的应用

## 4.2 规则条件配置

> 大多数情况下，配置 `loader` 的匹配条件时，只要使用 `test` 字段就好了，很多时候都只需要匹配文件后缀名来决定使用什么 `loader`，但也不排除在某些特殊场景下，我们需要配置比较复杂的匹配条件。webpack 的规则提供了多种配置形式...

- `{ test: ... }` 匹配特定条件
- `{ include: ... }` 匹配特定路径
- `{ exclude: ... } `排除特定路径
- `{ and: [...] }`必须匹配数组中所有条件
- `{ or: [...] } `匹配数组中任意一个条件
- `{ not: [...] }` 排除匹配数组中所有条件...

> 上述的所谓条件的值可以是：

- 字符串：必须以提供的字符串开始，所以是字符串的话，这里我们需要提供绝对路径
- 正则表达式：调用正则的 `test` 方法来判断匹配
- 函数：`(path) => boolean`，返回 `true` 表示匹配
- 数组：至少包含一个条件的数组
- 对象：匹配所有属性值的条件...

```js
rules: [
  {
    test: /\.jsx?/, // 正则
    include: [
      path.resolve(__dirname, 'src'), // 字符串，注意是绝对路径
    ], // 数组
    // ...
  },
  {
    test: {
      js: /\.js/,
      jsx: /\.jsx/,
    }, // 对象，不建议使用
    not: [
      (value) => { /* ... */ return true; }, // 函数，通常需要高度自定义时才会使用
    ],
  },
],...
```

## 4.3 使用 loader 配置

> `module.rules` 的匹配规则最重要的还是用于配置 `loader`，我们可以使用 `use` 字段

```js
rules: [
  {
    test: /\.less/,
    use: [
      'style-loader', // 直接使用字符串表示 loader
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        },
      }, // 用对象表示 loader，可以传递 loader 配置等
      {
        loader: 'less-loader',
        options: {
          noIeCompat: true
        }, // 传递 loader 配置
      },
    ],
  },
],...

```

> `use `字段可以是一个数组，也可以是一个字符串或者表示 `loader` 的对象。如果只需要一个 `loader`，也可以这样：`use: { loader: 'babel-loader'`, `options: { ... } }`

## 4.4 loader 应用顺序

- 对于上面的 `less` 规则配置，一个 `style.less` 文件会途径 `less-loader`、`css-loader`、`style-loader` 处理，成为一个可以打包的模块。
- `loader` 的应用顺序在配置多个 `loader` 一起工作时很重要，通常会使用在 CSS 配置上，除了 `style-loader` 和 `css-loader`，你可能还要配置 `less-loader `然后再加个 `postcss` 的 `autoprefixer` 等。
- 上述从后到前的顺序是在同一个 `rule` 中进行的，那如果多个 `rule` 匹配了同一个模块文件，`loader` 的应用顺序又是怎样的呢？看一份这样的配置...

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
],...

```

> 这样无法法保证 `eslint-loader` 在 `babel-loader` 应用前执行。`webpack `在 r`ules` 中提供了一个 `enforce` 的字段来配置当前 `rule` 的 `loader` 类型，没配置的话是普通类型，我们可以配置 `pre `或` post`，分别对应前置类型或后置类型的 `loader`...

- 所有的 `loader` **按照前置** -> **行**内 -> **普通** -> **后置**的顺序执行。所以当我们要确保 `eslint-loader` 在 `babel-loader` 之前执行时，可以如下添加 `enforce` 配置

```js
rules: [
  {
    enforce: 'pre', // 指定为前置类型
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },
]...
```

> 当项目文件类型和应用的 `loader` 不是特别复杂的时候，通常建议把要应用的同一类型 `loader` 都写在同一个匹配规则中，这样更好维护和控制

## 4.5 完整代码

```js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        enforce: 'pre', // 指定为前置类型
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils'), // 这里使用 path.resolve 和 __dirname 来获取绝对路径
      log$: path.resolve(__dirname, 'src/utils/log.js') // 只匹配 log
    },
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      TWO: '1+1',
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2'), // const CONSTANTS = { APP_VERSION: '1.1.2' }
      },
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/favicon.ico', to: 'favicon.ico', }, // 顾名思义，from 配置来源，to 配置目标路径
    ]),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
  ],

  devServer: {
    port: '1234',
    before(app){
      app.get('/api/test.json', function(req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
        res.json({ code: 200, message: 'hello world' })
      })
    }
  },
}
```


# 五、使用plugin

> 更多的插件可以在这里查找：[plugins in awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins)

## 5.1 DefinePlugin

> `DefinePlugin` 是 `webpack` 内置的插件，可以使用 `webpack.DefinePlugin` 直接获取

- 这个插件用于创建一些在编译时可以配置的全局常量，这些常量的值我们可以在 `webpack` 的配置中去指定，例如

```js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),
  ],
}...
```

> 有了上面的配置，就可以在应用代码文件中，访问配置好的变量了，如：

```js
console.log("Running App version " + VERSION);

if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

> 上面配置的注释已经简单说明了这些配置的效果，这里再简述一下整个配置规则。

- 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值，如上面的 `"1+1"`，最后的结果是 `2`
- 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 `true`，最后的结果是 `'true'`
- 如果配置的是一个对象字面量，那么该对象的所有 `key `会以同样的方式去定义
- 这样我们就可以理解为什么要使用 `JSON.stringify()` 了，因为 `JSON.stringify(true)` 的结果是 `'true'`，`JSON.stringify("5fa3b9")` 的结果是 `"5fa3b9"`。

> 社区中关于 `DefinePlugin` 使用得最多的方式是定义环境变量，例如 `PRODUCTION = true` 或者 `__DEV__ = true` 等。部分类库在开发环境时依赖这样的环境变量来给予开发者更多的开发调试反馈，例如 react 等。

- 建议使用 `process.env.NODE_ENV`: ... 的方式来定义 `process.env.NODE_ENV`，而不是使用 `process: { env: { NODE_ENV: ... } }` 的方式，因为这样会覆盖掉 `process` 这个对象，可能会对其他代码造成影响...

## 5.2 copy-webpack-plugin

> 我们一般会把开发的所有源码和资源文件放在 `src/` 目录下，构建的时候产出一个 `build/` 目录，通常会直接拿 `build` 中的所有文件来发布。有些文件没经过 `webpack` 处理，但是我们希望它们也能出现在 `build` 目录下，这时就可以使用 `CopyWebpackPlugin` 来处理了...

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/file.txt', to: 'build/file.txt', }, // 顾名思义，from 配置来源，to 配置目标路径
      { from: 'src/*.ico', to: 'build/*.ico' }, // 配置项可以使用 glob
      // 可以配置很多项复制规则
    ]),
  ],
}...
```

## 5.3 extract-text-webpack-plugin

> 我们用它来把依赖的 `CSS` 分离出来成为单独的文件。这里再看一下使用 `extract-text-webpack-plugin` 的配置

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: 'css-loader',
        }), 
      },
    ],
  },
  plugins: [
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin('index.css'),
  ],
}...
```

> 在上述的配置中，我们使用了 `index.css` 作为单独分离出来的文件名，但有的时候构建入口不止一个，`extract-text-webpack-plugin` 会为每一个入口创建单独分离的文件，因此最好这样配置

```js
// 这样确保在使用多个构建入口时，生成不同名称的文件
plugins: [
  new ExtractTextPlugin('[name].css'),
],
```


# 六、更好使用webpack-dev-server

> `webpack-dev-server` 是 `webpack` 官方提供的一个工具，可以基于当前的 `webpack` 构建配置快速启动一个静态服务。当 `mode` 为 `development` 时，会具备 `hot reload` 的功能，即当源码文件变化时，会即时更新当前页面，以便你看到最新的效果...

## 6.1 基础使用

> `webpack-dev-server` 是一个 `npm package`，安装后在已经有 `webpack` 配置文件的项目目录下直接启动就可以

- `webpack-dev-server` 默认使用 `8080` 端口

```shell
npm install webpack-dev-server -g
webpack-dev-server --mode development 
```

> `package` 中的 `scripts` 配置：

```js
{
  // ...
  "scripts": {
    "start": "webpack-dev-server --mode development"
  }
}
```

## 6.2 配置

> 在 webpack 的配置中，可以通过 `devServer` 字段来配置 `webpack-dev-server`，如端口设置、启动 `gzip` 压缩等，这里简单讲解几个常用的配置

- `public `字段用于指定静态服务的域名，默认是 `http://localhost:8080/` ，当你使用 `Nginx` 来做反向代理时，应该就需要使用该配置来指定 `Nginx` 配置使用的服务域名
- `port` 字段用于指定静态服务的端口，如上，默认是 `8080`，通常情况下都不需要改动
- `publicPath` 字段用于指定构建好的静态文件在浏览器中用什么路径去访问，默认是 `/`，例如，对于一个构建好的文件 `bundle.js`，完整的访问路径是 `http://localhost:8080/bundle.js`，如果你配置了 `publicPath: 'assets/'`，那么上述 `bundle.js` 的完整访问路径就是 `http://localhost:8080/assets/bundle.js`。可以使用整个 `URL` 来作为 `publicPath `的值，如 `publicPath: 'http://localhost:8080/assets/'`。如果你使用了 `HMR`，那么要设置 `publicPath` 就必须使用完整的 `URL`


> 建议将 `devServer.publicPath` 和 `output.publicPath` 的值保持一致

- `proxy `用于配置 `webpack-dev-server `将特定 `URL` 的请求代理到另外一台服务器上。当你有单独的后端开发服务器用于请求 API 时，这个配置相当有用。例如

```js
proxy: {
  '/api': {
    target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
    pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
  },
}...
```

- `before` 和 `after` 配置用于在 `webpack-dev-server` 定义额外的中间件，如

```js
before(app){
  app.get('/some/path', function(req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
    res.json({ custom: 'response' })
  })
}...
```

- `before` 在 `webpack-dev-server` 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 `mock`。
- `after` 在 `webpack-dev-server` 静态资源中间件处理之后，比较少用到，可以用于打印日志或者做一些额外处理...


# 七、开发和生产环境的构建配置差异

- 我们在日常的前端开发工作中，一般都会有两套构建环境：一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印 `debug` 信息，包含` sourcemap` 文件
- 另外一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 `debug` 信息，静态文件不包括 `sourcemap` 的。有的时候可能还需要多一套测试环境，在运行时直接进行请求 `mock` 等工作
- `webpack 4.x` 版本引入了 `mode` 的概念，在运行 `webpack` 时需要指定使用 `production `或 `development` 两个 `mode` 其中一个，这个功能也就是我们所需要的运行两套构建环境的能力。

## 7.1 在配置文件中区分 mode

> 之前我们的配置文件都是直接对外暴露一个 `JS` 对象，这种方式暂时没有办法获取到 `webpack` 的 `mode` 参数，我们需要更换一种方式来处理配置。根据官方的文档多种配置类型，配置文件可以对外暴露一个函数，因此我们可以这样做

```js
module.exports = (env, argv) => ({
  // ... 其他配置
  optimization: {
    minimize: false,
    // 使用 argv 来获取 mode 参数的值
    minimizer: argv.mode === 'production' ? [
      new UglifyJsPlugin({ /* 你自己的配置 */ }), 
      // 仅在我们要自定义压缩配置时才需要这么做
      // mode 为 production 时 webpack 会默认使用压缩 JS 的 plugin
    ] : [],
  },
})...
```

> 这样获取 `mode` 之后，我们就能够区分不同的构建环境，然后根据不同环境再对特殊的 `loader `或` plugin` 做额外的配置就可以了

- 以上是 `webpack 4.x` 的做法，由于有了 `mode` 参数，区分环境变得简单了。不过在当前业界，估计还是使用 `webpack 3.x` 版本的居多，所以这里也简单介绍一下 `3.x` 如何区分环境

> `webpack` 的运行时环境是` Node.js`，我们可以通过 `Node.js `提供的机制给要运行的 `webpack` 程序传递环境变量，来控制不同环境下的构建行为。例如，我们在 `npm` 中的 `scripts` 字段添加一个用于生产环境的构建命令...

```js
{
  "scripts": {
    "build": "NODE_ENV=production webpack",
    "develop": "NODE_ENV=development webpack-dev-server"
  }
}...
```

> 然后在 `webpack.config.js` 文件中可以通过 `process.env.NODE_ENV` 来获取命令传入的环境变量

```js
const config = {
  // ... webpack 配置
}

if (process.env.NODE_ENV === 'production') {
  // 生产环境需要做的事情，如使用代码压缩插件等
  config.plugins.push(new UglifyJsPlugin())
}

module.exports = config...
```

## 7.2 运行时的环境变量

> 我们使用 webpack 时传递的 mode 参数，是可以在我们的应用代码运行时，通过 `process.env.NODE_ENV` 这个变量获取的。这样方便我们在运行时判断当前执行的构建环境，使用最多的场景莫过于控制是否打印 `debug` 信息...

- 下面这个简单的例子，在应用开发的代码中实现一个简单的 `console `打印封装

```js
export default function log(...args) {
  if (process.env.NODE_ENV === 'development' && console && console.log) {
    console.log.apply(console, args)
  }
}...

```

> 同样，以上是 `webpack 4.x` 的做法，下面简单介绍一下 `3.x` 版本应该如何实现。这里需要用到 `DefinePlugin` 插件，它可以帮助我们在构建时给运行时定义变量，那么我们只要在前面 `webpack 3.x` 版本区分构建环境的例子的基础上，再使用 `DefinePlugin` 添加环境变量即可影响到运行时的代码...

```js
module.exports = {
  // ...
  // webpack 的配置

  plugins: [
    new webpack.DefinePlugin({
      // webpack 3.x 的 process.env.NODE_ENV 是通过手动在命令行中指定 NODE_ENV=... 的方式来传递的
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}...

```

## 7.3 常见的环境差异配置

**常见的 webpack 构建差异配置**

- 生产环境可能需要分离 `CSS`成单独的文件，以便多个页面共享同一个 `CSS` 文件
- 生产环境需要压缩 `HTML/CSS/JS` 代码
- 生产环境需要压缩图片
- 开发环境需要生成 `sourcemap` 文件
- 开发环境需要打印 `debug` 信息
- 开发环境需要 `live reload `或者 `hot reload` 的功能...

> `webpack 4.x` 的 `mode` 已经提供了上述差异配置的大部分功能，`mode` 为 `production` 时默认使用 `JS` 代码压缩，而` mode` 为 `development` 时默认启用 `hot` `reload`，等等。这样让我们的配置更为简洁，我们只需要针对特别使用的 `loader` 和 `plugin` 做区分配置就可以了...

- `webpack 3.x` 版本还是只能自己动手修改配置来满足大部分环境差异需求，所以如果你要开始一个新的项目，建议直接使用 `webpack 4.x `版本

## 7.4 拆分配置

> 前面我们列出了几个环境差异配置，可能这些构建需求就已经有点多了，会让整个 `webpack` 的配置变得复杂，尤其是有着大量环境变量判断的配置。我们可以把 `webpack` 的配置按照不同的环境拆分成多个文件，运行时直接根据环境变量加载对应的配置即可。基本的划分如下...

- `webpack.base.js`：基础部分，即多个文件中共享的配置
- `webpack.development.js`：开发环境使用的配置
- `webpack.production.js`：生产环境使用的配置
- `webpack.test.js`：测试环境使用的配置...

**如何处理这样的配置拆分**

> 首先我们要明白，对于 `webpack` 的配置，其实是对外暴露一个 `JS` 对象，所以对于这个对象，我们都可以用 `JS` 代码来修改它，例如

```js
const config = {
  // ... webpack 配置
}

// 我们可以修改这个 config 来调整配置，例如添加一个新的插件
config.plugins.push(new YourPlugin());

module.exports = config;...
```

> 因此，只要有一个工具能比较智能地合并多个配置对象，我们就可以很轻松地拆分 webpack 配置，然后通过判断环境变量，使用工具将对应环境的多个配置对象整合后提供给 webpack 使用。这个工具就是 `webpack-merge`

- 我们的 webpack 配置基础部分，即 `webpack.base.js` 应该大致是这样的

```js
module.exports = {
  entry: '...',
  output: {
    // ...
  },
  resolve: {
    // ...
  },
  module: {
    // 这里是一个简单的例子，后面介绍 API 时会用到
    rules: [
      {
        test: /\.js$/, 
        use: ['babel'],
      },
    ],
    // ...
  },
  plugins: [
    // ...
  ],
}...
```

> 然后 `webpack.development.js` 需要添加 `loader` 或 `plugin`，就可以使用 `webpack-merge `的 `API`，例如

```js
const { smart } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')

module.exports = smart(base, {
  module: {
    rules: [
      // 用 smart API，当这里的匹配规则相同且 use 值都是数组时，smart 会识别后处理
      // 和上述 base 配置合并后，这里会是 { test: /\.js$/, use: ['babel', 'coffee'] }
      // 如果这里 use 的值用的是字符串或者对象的话，那么会替换掉原本的规则 use 的值
      {
        test: /\.js$/,
        use: ['coffee'],
      },
      // ...
    ],
  },
  plugins: [
    // plugins 这里的数组会和 base 中的 plugins 数组进行合并
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})...
```

> 可见 `webpack-merge` 提供的 `smart` 方法，可以帮助我们更加轻松地处理 `loader` 配置的合并。`webpack-merge` 还有其他 `API` 可以用于自定义合并行为 https://github.com/survivejs/webpack-merge


## 7.5 完整代码

> `webpack.config.js`

```js
module.exports = function(env, argv) {
  return argv.mode === 'production' ?
    require('./configs/webpack.production') :
    require('./configs/webpack.development')
}
```

> `configs/webpack.base.js`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
    }),
  ],
}
```

> `configs/webpack.development.js`

```js
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
      },
    ],
  },

  devServer: {
    port: '1234',
    before(app){
      app.get('/api/test.json', function(req, res) {
        res.json({ code: 200, message: 'hello world' })
      })
    },
  },
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  })
)

module.exports = config
```

> `configs/webpack.production.js`

```js
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'less-loader',
          ],
        }),
      },
    ],
  }
})

config.plugins.push(new ExtractTextPlugin('[name].css'))

module.exports = config
```


# 八、模块热替换提高开发效率

> `HMR` 全称是 `Hot Module Replacement`，即模块热替换。在这个概念出来之前，我们使用过 `Hot Reloading`，当代码变更时通知浏览器刷新页面，以避免频繁手动刷新浏览器页面。HMR 可以理解为增强版的 `Hot Reloading`，但不用整个页面刷新，而是局部替换掉部分模块代码并且使其生效，可以看到代码变更后的效果。所以，`HMR` 既避免了频繁手动刷新页面，也减少了页面刷新时的等待，可以极大地提高前端页面开发效率...

## 8.1 配置使用 HMR

> `HMR` 是 `webpack` 提供的非常有用的一个功能，跟我们之前提到的一样，安装好 `webpack-dev-server`， 添加一些简单的配置，即在` webpack` 的配置文件中添加启用` HMR `需要的两个插件

```js
const webpack = require('webpack')

module.exports = {
  // ...
  devServer: {
    hot: true // dev server 的配置要启动 hot，或者在命令行中带参数开启
  },
  plugins: [
    // ...
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ],
}...
```

## 8.2 module.hot 常见的 API


> 前面 `HMR `实现部分已经讲解了实现 HMR 接口的重要性，下面来看看常见的 `module.hot` `API` 有哪些，以及如何使用

- `module.hot.accept` 方法指定在应用特定代码模块更新时执行相应的 `callback`，第一个参数可以是字符串或者数组，如

```js
if (module.hot) {
  module.hot.accept(['./bar.js', './index.css'], () => {
    // ... 这样当 bar.js 或者 index.css 更新时都会执行该函数
  })
}...
```

- `module.hot.decline` 对于指定的代码模块，拒绝进行模块代码的更新，进入更新失败状态，如 `module.hot.decline('./bar.js')`。这个方法比较少用到
- `module.hot.dispose` 用于添加一个处理函数，在当前模块代码被替换时运行该函数，例如

```js
if (module.hot) {
  module.hot.dispose((data) => {
    // data 用于传递数据，如果有需要传递的数据可以挂在 data 对象上，然后在模块代码更新后可以通过 module.hot.data 来获取
  })
}...
```

- `module.hot.accept` 通常用于指定当前依赖的某个模块更新时需要做的处理，如果是当前模块更新时需要处理的动作，使用 `module.hot.dispose` 会更加容易方便
- `module.hot.removeDisposeHandler `用于移除 `dispose` 方法添加的 `callback`

# 九、图片加载优化

## 9.1 CSS Sprites

- 如果你使用的 `webpack 3.x` 版本，需要 `CSS Sprites` 的话，可以使用 `webpack-spritesmith` 或者 `sprite-webpack-plugin`。
- 我们以 `webpack-spritesmith` 为例，先安装依赖...

```js
module: {
  loaders: [
    // ... 这里需要有处理图片的 loader，如 file-loader
  ]
},
resolve: {
  modules: [
    'node_modules', 
    'spritesmith-generated', // webpack-spritesmith 生成所需文件的目录
  ],
},
plugins: [
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'src/ico'), // 多个图片所在的目录
      glob: '*.png' // 匹配图片的路径
    },
    target: {
      // 生成最终图片的路径
      image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'), 
      // 生成所需 SASS/LESS/Stylus mixins 代码，我们使用 Stylus 预处理器做例子
      css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl'), 
    },
    apiOptions: {
      cssImageRef: "~sprite.png"
    },
  }),
],...
```

> 在你需要的样式代码中引入 `sprite.styl` 后调用需要的` mixins` 即可

```
@import '~sprite.styl'

.close-button
    sprite($close)
.open-button
    sprite($open)
```

> 如果你使用的是 `webpack 4.x`，你需要配合使用 `postcss `和 `postcss-sprites`，才能实现 `CSS Sprites` 的相关构建

## 9.2 图片压缩

- 在一般的项目中，图片资源会占前端资源的很大一部分，既然代码都进行压缩了，占大头的图片就更不用说了
- 我们之前提及使用` file-loader` 来处理图片文件，在此基础上，我们再添加一个 `image-webpack-loader`来压缩图片文件。简单的配置如下...

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {}
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
          },
        ],
      },
    ],
  },
}...
```

## 9.3 使用 DataURL

> 有的时候我们的项目中会有一些很小的图片，因为某些缘故并不想使用 `CSS Sprites` 的方式来处理（譬如小图片不多，因此引入 CSS Sprites 感觉麻烦），那么我们可以在 webpack 中使用 `url-loader` 来处理这些很小的图片...

- `url-loader` 和 `file-loader` 的功能类似，但是在处理文件的时候，可以通过配置指定一个大小，当文件小于这个配置值时，`url-loader` 会将其转换为一个 `base64` 编码的 `DataURL`，配置如下

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
            },
          },
        ],
      },
    ],
  },
}...
```

## 9.4 代码压缩

- `webpack 4.x` 版本运行时，`mode` 为 `production` 即会启动压缩 `JS` 代码的插件，而对于 `webpack` `3.x`，使用压缩 `JS` 代码插件的方式也已经介绍过了。在生产环境中，压缩 `JS` 代码基本是一个必不可少的步骤，这样可以大大减小 `JavaScript` 的体积，相关内容这里不再赘述。
- 除了 JS 代码之外，我们一般还需要 HTML 和 CSS 文件，这两种文件也都是可以压缩的，虽然不像 JS 的压缩那么彻底（替换掉长变量等），只能移除空格换行等无用字符，但也能在一定程度上减小文件大小。在 webpack 中的配置使用也不是特别麻烦，所以我们通常也会使用。
- 对于 HTML 文件，之前介绍的 `html-webpack-plugin` 插件可以帮助我们生成需要的 HTML 并对其进行压缩...

```js
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      }
    }),
  ],
}...
```

- 如上，使用 `minify` 字段配置就可以使用 `HTML` 压缩，这个插件是使用 `html-minifier` 来实现` HTML` 代码压缩的，`minify `下的配置项直接透传给 `html-minifier`，配置项参考 `html-minifier` 文档即可。
- 对于 CSS 文件，我们之前介绍过用来处理 CSS 文件的 `css-loader`，也提供了压缩 CSS 代码的功能：...

```js
module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true, // 使用 css 的压缩功能
            },
          },
        ],
      },
    ],
  }
}...
```

> 在 `css-loader` 的选项中配置 `minimize` 字段为 `true `来使用`CSS` 压缩代码的功能。`css-loader` 是使用 `cssnano `来压缩代码的，`minimize` 字段也可以配置为一个对象，来将相关配置传递给 `cssnano`...


# 十、分离代码文件

- 关于分离 CSS 文件这个主题，之前在介绍如何搭建基本的前端开发环境时有提及，在 `webpack` 中使用 `extract-text-webpack-plugin` 插件即可。
- 先简单解释一下为何要把 CSS 文件分离出来，而不是直接一起打包在 JS 中。最主要的原因是我们希望更好地利用缓存。
- 假设我们原本页面的静态资源都打包成一个 JS 文件，加载页面时虽然只需要加载一个 JS 文件，但是我们的代码一旦改变了，用户访问新的页面时就需要重新加载一个新的 JS 文件。有些情况下，我们只是单独修改了样式，这样也要重新加载整个应用的 JS 文件，相当不划算。
- 还有一种情况是我们有多个页面，它们都可以共用一部分样式（这是很常见的，CSS Reset、基础组件样式等基本都是跨页面通用），如果每个页面都单独打包一个 JS 文件，那么每次访问页面都会重复加载原本可以共享的那些 CSS 代码。如果分离开来，第二个页面就有了 CSS 文件的缓存，访问速度自然会加快。虽然对第一个页面来说多了一个请求，但是对随后的页面来说，缓存带来的速度提升相对更加可观...

> `3.x` 以前的版本是使用 `CommonsChunkPlugin` 来做代码分离的，而 `webpack 4.x` 则是把相关的功能包到了` optimize.splitChunks` 中，直接使用该配置就可以实现代码分离。

## 10.1 webpack 4.x 的 optimization

```js
module.exports = {
  // ... webpack 配置

  optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
}...
```

> 我们需要在 HTML 中引用两个构建出来的 JS 文件，并且 `commons.js` 需要在入口代码之前。下面是个简单的例子

```html
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```

> 如果你使用了 `html-webpack-plugin`，那么对应需要的 JS 文件都会在 HTML 文件中正确引用，不用担心。如果没有使用，那么你需要从 `stats` 的 `entrypoints` 属性来获取入口应该引用哪些 JS 文件，可以参考 Node API 了解如何从 stats 中获取信息...

**显式配置共享类库可以这么操作**

```js
module.exports = {
  entry: {
    vendor: ["react", "lodash", "angular", ...], // 指定公共使用的第三方类库
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  },
  // ... 其他配置
}

// 或者
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /react|angluar|lodash/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
}

// 或者
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "node_modules") // 路径在 node_modules 目录下的都作为公共部分
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  },
}...
```

> 上述第一种做法是显示指定哪些类库作为公共部分，第二种做法实现的功能差不多，只是利用了 test 来做模块路径的匹配，第三种做法是把所有在 node_modules 下的模块，即作为依赖安装的，都作为公共部分。你可以针对项目情况，选择最合适的做法..

## 10.2 webpack 3.x 的 CommonsChunkPlugin

> `webpack 3.x `以下的版本需要用到 webpack 自身提供的 `CommonsChunkPlugin` 插件。我们先来看一个最简单的例子

```js
module.exports = {
  // ...
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons", // 公共使用的 chunk 的名称
      filename: "commons.js", // 公共 chunk 的生成文件名
      minChunks: 3, // 公共的部分必须被 3 个 chunk 共享
    }),
  ],
}...
```

- `chunk` 在这里是构建的主干，可以简单理解为一个入口对应一个 `chunk`。
- 以上插件配置在构建后会生成一个 `commons.js` 文件，该文件就是代码中的公共部分。上面的配置中 `minChunks `字段为 3，该字段的意思是当一个模块被 3 个以上的 `chunk` 依赖时，这个模块就会被划分到 `commons chunk` 中去。单从这个配置的角度上讲，这种方式并没有 `4.x` 的 `chunks: "all" `那么方便。

**CommonsChunkPlugin 也是支持显式配置共享类库的**

```js
module.exports = {
  entry: {
    vendor: ['react', 'react-redux'], // 指定公共使用的第三方类库
    app: './src/entry',
    // ...
  },
  // ...
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // 使用 vendor 入口作为公共部分
      filename: "vendor.js", 
      minChunks: Infinity, // 这个配置会让 webpack 不再自动抽离公共模块
    }),
  ],
}...
```

> 上述配置会生成一个名为 `vendor.js` 的共享代码文件，里面包含了 `React` 和` React-Redux` 库的代码，可以提供给多个不同的入口代码使用。这里的 `minChunks` 字段的配置，我们使用了 `Infinity`，可以理解为` webpack` 不自动抽离公共模块。如果这里和之前一样依旧设置为 3，那么被 3 个以上的` chunk `依赖的模块会和 `React`、`React-Redux` 一同打包进 `vendor`，这样就失去显式指定的意义了。

> `minChunks `其实还可以是一个函数，如：

```js
minChunks: (module, count) => {
  console.log(module, count);
  return true;
},
```

> 该函数在分析每一个依赖的时候会被调用，传入当前依赖模块的信息 `module`，以及已经被作为公共模块的数量 `count`，你可以在函数中针对每一个模块做更加精细化的控制。看一个简单的例子：

```js
minChunks: (module, count) => {
  return module.context && module.context.includes("node_modules"); 
  // node_modules 目录下的模块都作为公共部分，效果就如同 webpack 4.x 中的 test: path.resolve(__dirname, "node_modules")
},
```

- 更多使用 `CommonsChunkPlugin `的配置参考官方文档 `commons-chunk-plugin`。



# 十一、进一步控制JS大小

## 11.1 按需加载模块

> 在 webpack 的构建环境中，要按需加载代码模块很简单，遵循 ES 标准的动态加载语法 `dynamic-import` 来编写代码即可，`webpack` 会自动处理使用该语法编写的模块

```js
// import 作为一个方法使用，传入模块名即可，返回一个 promise 来获取模块暴露的对象
// 注释 webpackChunkName: "lodash" 可以用于指定 chunk 的名称，在输出文件时有用
import(/* webpackChunkName: "lodash" */ 'lodash').then((_) => { 
  console.log(_.lash([1, 2, 3])) // 打印 3
})...
```

- 注意一下，如果你使用了 `Babel` 的话，还需要 `Syntax Dynamic Import` 这个 `Babel` 插件来处理 `import()` 这种语法。
- 由于动态加载代码模块的语法依赖于 `promise`，对于低版本的浏览器，需要添加 `promise` 的 `polyfill` 后才能使用。
- 如上的代码，webpack 构建时会自动把 `lodash` 模块分离出来，并且在代码内部实现动态加载 `lodash` 的功能。动态加载代码时依赖于网络，其模块内容会异步返回，所以 import 方法是返回一个 `promise` 来获取动态加载的模块内容。
- `import` 后面的注释 `webpackChunkName: "lodash"` 用于告知 `webpack `所要动态加载模块的名称。我们在 webpack 配置中添加一个 `output.chunkFilename` 的配置...

```js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[hash:8].js',
  chunkFilename: '[name].[hash:8].js' // 指定分离出来的代码文件的名称
},...
```

> 这样就可以把分离出来的文件名称用 lodash 标识了，如下图：

![image.png](https://upload-images.jianshu.io/upload_images/1480597-ae36b6816feed422.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 如果没有添加注释 `webpackChunkName: "lodash" 以及 output.chunkFilename` 配置，那么分离出来的文件名称会以简单数字的方式标识，不便于识别


## 11.2 以上完整示例代码

```js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            },
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        removeComments: true,
      },
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    hot: true
  }
}
```
