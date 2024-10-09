
import { createRouter, createWebHashHistory } from 'vue-router'
import Yikeindex from "../views/Yikeindex.vue"
import WallMessage from '../views/WallMessage.vue'

const routes = [
    {
        path: '/',
        // redirect 重定向到子页面
        redirect:'/wall?id=0',
        name: 'yikeindex',
        component: Yikeindex,
        // 嵌套路由
        children: [
            {
                path: "/wall",
                component: WallMessage
            }
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router