---
title: 前端开发规范-used by frank
tags:
  - 前端自动化
categories: 前端
abbrlink: bf4c76a0
date: 2018-09-21 16:20:34
---

### js方法注释规范

### 规范的注释很重要
代码是写给人看的，顺便给机器运行，多谢注释可以增加代码的可读性

```js

/** 
**************
 * @func 教师端请假功能 ;
 * @param {String} token 教师端头部的token;
 * @param {string} a - 参数a;
 * @param {number} b=1 - 参数b默认值为1;
 * @param {string} c=1 - 参数c有两种支持的取值</br>1—表示x</br>2—表示xx;
 * @param {object} d - 参数d为一个对象;
 * @param {string} d.e - 参数d的e属性;
 * @param {string} d.f - 参数d的f属性;
 * @param {object[]} g - 参数g为一个对象数组;
 * @param {string} g.h - 参数g数组中一项的h属性;
 * @param {string} g.i - 参数g数组中一项的i属性;
 * @param {string} [j] - 参数j是一个可选参数;
 * @description  2018年4月19日被frank开发于dev_sprint65分支，
 *   XX年XX月被XX在xx分支修改（原因或者修改的功能）;
 ****************/
```

### 变量命名规范

1.标准变量命名使用驼峰式命名           `eg. let thisIsMyName;` 
2.常量全部大写，并使用下划线连接       `eg.  const MAX_COUNT = 10; `

### 项目规范

**变量声明尽量提在函数首部，用一个var声明，不允许出现连着的两个var声明(也包括let，const)**

```js
function doSomethingWithItems(items) {
    // use one var
    var value = 10,
        result = value + 10,
        i,
        len;

    for (i = 0, len = items.length; i < len; i++) {
        result += 10;
    }
}
```

**undefind使用规范（永远不要直接使用undefined进行变量判断，使用typeof和字符串’undefined’对变量进行判断。）**

```js
// not good
if (person === undefined) {
    ...
}

// good
if (typeof person === 'undefined') {
    ...
}
```
**用’===’和’!==’代替’==’, ‘!=’**
**使用对象的属性简写**
```js
const job = 'FrontEnd'
// bad
const item = {
  job: job
}
// good
const item = {
  job
}
```

**使用拓展运算符 … 复制数组**
```js
// bad
const items = []
const itemsCopy = []
const len = items.length
let i
// bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i]
}
// good
itemsCopy = [...items]
```

**render使用**
```js
render: (h, params) => {
    return h('div', [
        h('span', {
            attrs: {
                class: "table_details"
            },
            on: {
                click: () => {
                    this.edit(params.index)
                }
            }
        },),
        h('span', {
            attrs: {
                class: "table_continue"
            },
            on: {
                click: () => {
                    this.show(params.index)
                }
            }
        },),
        h('span', {
            attrs: {
                class: "table_more no_border_right"
            },
            on: {
                click: () => {
                    this.remove(params.row.id)
                }
            }
        },),
        h('Poptip', {
            props: {
                title:"项目变更",
                content:"项目迁出",
                placement:"bottom-end"
            },
            on: {
                'on-ok': () => {
                }
            }
        }, [
            h('span', {
                attrs: {
                    class: "table_more no_border_right"
                }
            })
        ])
    ])
}     
```

文档：有时间整理一下http://taobaofed.org/blog/2017/01/05/writing-readable-code/
