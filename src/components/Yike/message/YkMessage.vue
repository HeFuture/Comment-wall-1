

<template>
    <transition name="down">
        <div class="yk-message" v-if="isShow">
            <div class="yk-m-i">
                <svg class="icon" :class="props.type" aria-hidden="true">
                    <use :href="`#${icon}`"></use>
                </svg>
                <span class="text">{{ props.message }}</span>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
    message: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        // warn 警告  error错误  success 成功
        default: "warn",
        validator: (value) => ['warn', 'error', 'success'].includes(value),
    },
});

// 定义一个对象，包含三种情况的样式，icon的名称
const iconMap = {
    warn: "icon-info-circle-fill",
    error: "icon-close-circle-fill",
    success: "icon-check-circle-fill"
};
const icon = computed(() => iconMap[props.type]);  
// console.log(icon.value,"111");

const typeClass = computed(() => `yk-message-${props.type}`);  
// 控制显示隐藏
const isShow = ref(false);
// console.log(isShow.value,"外面的");

onMounted(() => {
    // 需要调用钩子函数，等dom渲染完成，再进行赋值
    isShow.value = true;
    // console.log(isShow.value,"里面的");
    setTimeout(() => {
        isShow.value = false;
        // console.log(isShow.value,"settime");
    }, 3000);
    // return {style,isShow}
});
</script>


<style lang="scss" scoped>
@import '../../../styles/commons.scss';
.down {
    // 入场动画
    &.v-enter-active {
        transition: transform 0.3s, opacity 1s;
        animation-timing-function: ease-out;
    }
    &.v-enter-from {
        transform: translateY(-30px);
        opacity: 0;
    }
    &.v-enter-to {
        transform: translateY(0);
        opacity: 1;
    }

    // 出场动画
    &.v-leave-active {
        transition: transform 0.3s, opacity 1s;
        animation-timing-function: ease-in;
    }
    &.v-leave-from {
        transform: translateY(0);
        opacity: 1;
    }
    &.v-leave-to {
        transform: translateY(-30px);
        opacity: 0;
    }
}

.yk-message{
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 1100;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    
    .yk-m-i{
        border-radius: 8px;
        padding: 0 20px;
        color: $gray-0;
        background: $gray-4;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        .icon{
            margin-right: 6px;
            // vertical-align: middle;
        }
        .text{
            vertical-align: middle;
            
        }
    }
}

.error{
    color: $error-color;
}
.warning{
    color: $warning-color;
}
.success{
    color: $success-color;
}
</style>