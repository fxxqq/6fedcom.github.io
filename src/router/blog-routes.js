export default [{
        path: '/docs',
        redirect: {
            name: 'BlogList'
        }
    },
    {
        path: '/docs/BlogList',
        name: 'BlogList',
        component: resolve => require(['@/views/BlogList.vue'], resolve)
    },
    {
        path: '/docs/BlogDetail/:number',
        name: 'BlogDetail',
        component: resolve => require(['@/views/BlogDetail.vue'], resolve)
    }
]