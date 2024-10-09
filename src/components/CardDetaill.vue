

<template>
    <div class="card-detaill">
        <div class="top-bt">
            <p class="revoke">联系墙主撕掉该标签</p>
            <p class="report">举报</p>
        </div>
        <NoteCard :note="card"></NoteCard>
        <div class="form">
            <textarea class="message" placeholder="请输入评论..."></textarea>
            <div class="form-bt">
                <input type="text" class="name" placeholder="签名..." />
                <YkButton>确定</YkButton>
            </div>
        </div>
        <p class="title">评论 {{ card.comment }}</p>
        <div class="comment">
            <div class="comment-li" v-for="(item,index) in comments" :key="index">
                <div class="user-head" :style="{backgroundImage:protrait[item.imgurl]}"></div>
                <div class="comm-m">
                    <div class="m-top">
                        <p class="name">{{ item.name }}</p>
                        <p class="time">{{ dateOne(item.moment) }}</p>
                    </div>
                    <div class="mm">{{ item.message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import NoteCard from "./NoteCard.vue";
import YkButton from "./YkButton.vue";
import { comment } from "../../mock/index";
import { protrait } from "../utils/data";
import { dateOne } from "../utils/Yksg";

const comments=comment.data
// console.log(comments);


const props = defineProps({
    card: {
        type: Object,
        default: {},
    },
});
</script>


<style lang="scss" scoped>
@import "../styles/commons.scss";
.card-detaill {
    position: relative;
    padding: 0 20px;
    .top-bt {
        position: fixed;
        // border: 1px solid red;
        top: 0;
        left: 0;
        padding: 20px;
        display: flex;

        .revoke {
            color: $primary-color;
            cursor: pointer;
            padding-right: 30px;
            font-size: 16px;
        }
        .report {
            font-size: 16px;
            color: $warning-color;
            cursor: pointer;
        }
    }
    .form {
        .message {
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            padding: 8px;
            box-sizing: border-box;
            resize: none;
            height: 56px;
            width: 100%;
            margin-top: 12px;
            font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
        }
        .form-bt {
            display: flex;
            padding-top: 6px;
            justify-content: space-between;
        }
        .name {
            padding: 7px;
            box-sizing: border-box;
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            line-height: 20px;
            width: 200px;
            font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
        }
    }
    .title {
        font-weight: 600;
        padding-top: 30px;
        padding-bottom: 20px;
    }
    .comment-li{
        display: flex;
        padding-bottom: 30px;
        .user-head{
            flex: none;
            width: 26px;
            height: 26px;
            border-radius: 20px;
            overflow: hidden;
            // background-image: linear-gradient(180deg,#FFA9D9 0%,#E83D3D 100%);
        }
        .comm-m{
            padding-left: 8px;
            .m-top{
                display: flex;
                align-items: center;
                .name{
                    font-weight: 600;
                }
                .time{
                    font-size: 12px;
                    padding-left: 4px;
                    color: $gray-2;
                }
            }
            .mm{
                padding-top: 4px;
                font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
            }
        }
        
    }
}
</style>