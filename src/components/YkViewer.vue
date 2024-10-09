

<template>
    <transition name="view">
        <div class="yk-viewer" v-if="isView">
            <div class="bg"></div>
            <div class="viewer-photo">
                <img :src="`../../static/${props.phots[props.nowNumber]}.jpg`" class="photo-img" >
            </div>
            <div class="switch sw-left" @click="changeNumber(0)" v-show="props.nowNumber>0">
                <svg class="icon i-left" aria-hidden="true">
                    <use xlink:href="#icon-left"></use>
                </svg>
            </div>
            <div class="switch sw-right" @click="changeNumber(1)" v-show="props.nowNumber<props.phots.length-1">
                <svg class="icon i-right" aria-hidden="true">
                    <use xlink:href="#icon-right"></use>
                </svg>
            </div>
        </div>
    </transition>
</template>


<script setup>
    const props=defineProps({
        phots:{
            type:Object,
            default:[]
        },
        // 照片id，用来切换照片
        nowNumber:{
            type:Number,
            default:0
        },
        // 是否打开图片预览窗口
        isView:{
            type:Boolean,
            default:false
        }
    })
    // console.log(props.nowNumber);
    
    const emit=defineEmits(['viewSwitch'])
    function changeNumber(number){
        emit('viewSwitch',number)
    }
</script>


<style lang="scss" scoped>
    @import '../styles/commons.scss';

    .view {
        // 入场动画
        &.v-enter-active {
            transition: opacity 0.5s,;
            // animation-timing-function: ease-out;
        }
        &.v-enter-from {
            opacity: 0;
        }
        &.v-enter-to {
            opacity: 1;
        }

        // 出场动画
        &.v-leave-active {
            transition: opacity 0.5s;
            // animation-timing-function: ease-in;
        }
        &.v-leave-from {
            opacity: 1;
        }
        &.v-leave-to {
            opacity: 0;
        }
    }
    .yk-viewer{
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%; 
        // transition: all 1s;
        .bg{
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(255, 255, 255, 0.80);
            backdrop-filter: blur(25px);
            height: 100%;
            width: 100%;
        }
        .viewer-photo{
            position: absolute;
            // z-index: 10;
            padding: 82px 458px 32px 96px;
            width: 100%;
            box-sizing: border-box;
            height: 100%;
            overflow-y: auto;
            text-align: center;
            display: flex;
            justify-content: center;
            img{
                max-width: 100%;
                object-fit: contain;
            }
        }
        .switch{
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: $gray-2;
            color: $gray-3;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.5;
            transition: 0.4s ease;
        }
        .sw-left{
            left: 20px;
            &:hover{
                background: $gray-1;
                box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.3);
                opacity: 1;
                .i-left{
                    transform: scale(1.2);
                }
            }
            
        }
        .i-left{
            transition: transform 0.4s ease;
        }
        .sw-right{
            right: 384px;
            .i-right{
                transition: transform 0.4s ease;
            }
            &:hover{
                background: $gray-1;
                box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.3);
                opacity: 1;
                .i-right{
                    transform: scale(1.2);
                }
            }
        }

        
    }
</style>