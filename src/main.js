import Vue from 'vue'
import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'

Vue.use(Loading)
Vue.component(Message.name, Message)
Vue.prototype.$message = Message

import BgaBackTop from 'bga-back-top-vue'
Vue.use(BgaBackTop)

import lodash from 'lodash'
import moment from 'moment'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'

import App from './App'
import store from './store'
import router from './router'
import './css/main.css'
import './css/app-base.scss'

import { gitHubApi, isGetUserInfo, queryParse, queryStringify } from './utils'
import { showMessage, successMessage, errorMessage, warningMessage, infoMessage } from './utils/toastUtil'

Vue.prototype._ = lodash
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.$http = axios
Vue.prototype.$highlight = highlight
Vue.prototype.$showMessage = showMessage
Vue.prototype.$successMessage = successMessage
Vue.prototype.$errorMessage = errorMessage
Vue.prototype.$warningMessage = warningMessage
Vue.prototype.$gitHubApi = gitHubApi
Vue.prototype.$infoMessage = infoMessage
Vue.prototype.$isGetUserInfo = isGetUserInfo
Vue.prototype.$queryParse = queryParse
Vue.prototype.$queryStringify = queryStringify

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return Vue.prototype.$highlight.highlightAuto(code).value
    }
})
Vue.prototype.$marked = marked

/* eslint-disable no-new */
const vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

let loadingInstance

// request拦截器
axios.interceptors.request.use((config) => {
    let isGetUserInfo = vm.$isGetUserInfo(vm, config)
    if (!isGetUserInfo) {
        loadingInstance = Loading.service({
            text: '拼命加载中...'
        })
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// response拦截器
axios.interceptors.response.use((response) => {
    let isGetUserInfo = vm.$isGetUserInfo(vm, response.config)
    if (isGetUserInfo) {
        return response
    } else {
        setTimeout(() => {
            loadingInstance.close()
        }, 500)
        return response
    }
}, (error) => {
    let isGetUserInfo = vm.$isGetUserInfo(vm, error.config)
    if (!isGetUserInfo) {
        loadingInstance.close()

        if (error.response) {
            if (error.response.status === 401) {
                vm.$warningMessage('登录信息已过期，请重新登录!')
            } else if (error.response.status === 403) {
                vm.$warningMessage('您操作的太频繁，请稍后再试!')
            } else if (error.response.statusText) {
                vm.$errorMessage(error.response.status + ' ' + error.response.statusText)
            }
        }
    }

    return Promise.reject(error)
})

console.log("%c%c博客名称%c前端迷", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#3fa9f5;line-height:28px;font-size:16px;");
console.log("%c%c网站地址%chttp://www.ye63.com", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#ff9900;line-height:28px;font-size:16px;");
console.log("%c%cqq号码%c188105274", "line-height:28px;", "line-height:28px;padding:4px;background:#222;color:#fff;font-size:16px;margin-right:15px", "color:#008000;line-height:28px;font-size:16px;");
console.log("%c%c前端不仅仅是我的工作，更是我的爱好~", "line-height:28px;", "line-height:28px;padding:4px 0px;color:#fff;font-size:16px;background-image:-webkit-gradient(linear,left top,right top,color-stop(0,#ff22ff),color-stop(1,#5500ff));color:transparent;-webkit-background-clip:text;");