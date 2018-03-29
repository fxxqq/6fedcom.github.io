import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    routes: routes,
    mode: 'history' //去除router里面的#
})

export default router