
import { createVNode, render, nextTick } from 'vue'
import YkMessage from './YkMessage.vue'


// 消息提示函数  
const Message = ({ message, type, duration = 6000 }) => {
    // 创建一个临时的 div 容器  
    const container = document.createElement('div');
    document.body.appendChild(container);

    // 创建并渲染 YkMessage 组件  
    const comVNode = createVNode(YkMessage, { message, type });
    render(comVNode, container);

    // 使用 nextTick 确保 DOM 更新完成  
    nextTick(() => {
        // 设置定时器，在指定时间后移除组件  
        setTimeout(() => {
            render(null, container);
            container.remove(); // 移除 DOM 元素  
        }, duration);
    });
};

export default Message