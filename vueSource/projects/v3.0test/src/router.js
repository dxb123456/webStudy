import {createRouter, createWebHistory} from "vue-router";

import App from './App.vue'
// import Test from './test.vue'
const routes = [
    {//方式二: 使用了webpack的方式进行导入的
        path: '/test/:id',
        name: 'Test',
        component: () =>import('./test.vue')
    },
    {//方式一: 使用import的方式导入(推荐)
        path: '/app2/:id',
        name: 'Home',
        component: App
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router
