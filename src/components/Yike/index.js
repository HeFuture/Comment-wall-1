
import Message from './message/message'
import { provide } from 'vue';

// vue3 注册全局组件库写法
// app.component(组件名,组件文件)

// 导出一个配置，用于app.use() 安装组件使用
export default {
    install(app) {
        // 全局挂载原型函数，通过组件实例调用的属性
        // app.config.globalProperties.$message = Message;
        app.provide('$message',Message)
    }
}