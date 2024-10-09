
<template>
    <transition class="modal">
        <div class="yk-modal" v-if="props.isModal">
            <div class="yk-modal-head">
                <p class="modal-name">{{ props.title }}</p>
                <svg class="icon" aria-hidden="true" @click="closeModal">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <div class="yk-modal-main">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup>
// import { onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: "标题",
    },
    isModal: {
        type: Boolean,
        default: false,
    },
});
// 定义可以触发的自定义事件
const emit = defineEmits(["close"]);
// 定义一个关闭模态框的方法
function closeModal() {
    emit("close", "我是关闭");
    // console.log("111");
    
}
</script>

<style lang="scss" scoped>
@import "../styles/commons.scss";
.yk-modal {
    // 入场动画
    &.v-enter-active {
        transition: transform 0.3s, opacity 1s;
        animation-timing-function: ease-out;
    }
    &.v-enter-from {
        transform: translateX(360px);
        opacity: 0.3;
    }
    &.v-enter-to {
        transform: translateX(0);
        opacity: 1;
    }

    // 出场动画
    &.v-leave-active {
        transition: transform 0.3s, opacity 1s;
        animation-timing-function: ease-in;
    }
    &.v-leave-from {
        transform: translateX(0);
        opacity: 1;
    }
    &.v-leave-to {
        transform: translateX(360px);
        opacity: 0.3;
    }
}

.yk-modal {
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 50px;
    z-index: 500;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(30px);

    .yk-modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        .modal-name {
            font-size: 16px;
            color: $gray-0;
            font-weight: 600;
        }
        .icon {
            // color: $gray-1;
            cursor: pointer;
            // border: 1px solid red;
            // padding: 0 10px 10px 10px;
            // padding: 8px;
            font-size: 20px;
            transition: $tr;
            &:hover{
                transform: scale(1.2) rotate(180deg);
            }
        }
    }
    .yk-modal-main {
        // border: 1px solid #eee;
        height: 90%;
        overflow-y: auto;
        // padding: 20px;
        box-sizing: border-box;
        overflow-x: auto;
        margin: 2px;
    }

    .slot{
        height: 1200px;
        background: #eee;
    }

    .yk-modal-main::-webkit-scrollbar {
        // 滚动条整体样式
        width: 4px;
        // 高宽分别对应横竖滚动条的尺寸
        height: 4px;
    }
    .yk-modal-main::-webkit-scrollbar-thumb {
        // 滚动条的小方块
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.2);
    }
    .-yk-modal-main::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 4px;
        background: rgba(0, 0, 0, 0);
    }
}
</style>