<template>
    <div class="node-card" :style="{ width: width, background: cardColor[card.color] }">
        <div class="top">
            <div class="time">{{ dateOne(card.moment) }}</div>
            <div class="label">{{ label[card.type][card.label] }}</div>
        </div>
        <p class="message">{{ card.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="like">
                    <svg class="icon icon-1" :class="{ isLike: card.isLike > 0 }" aria-hidden="true">
                        <use xlink:href="#icon-heart-fill"></use>
                    </svg>
                    <p class="value">{{ card.like }}</p>
                </div>
                <div class="like">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-interactive_fill"></use>
                    </svg>
                    <p class="value">{{ card.comment }}</p>
                </div>
            </div>
            <div class="name">{{ card.name }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { label, cardColor } from "../utils/data";
import { dateOne } from "../utils/Yksg";

const props = defineProps({
    width: {
        type: String,
        default: "100%",
    },
    note: {
        type: Object,
        default: {},
    },
    feedList: {
        type: Object,
        default: {}
    }
});

const card = computed(() => {
    return props.note;
});

// console.log(card.value.like);

const card1 = computed(() => {
    return props.feedList;
});



</script>

<style lang="scss" scoped>
@import "../styles/commons.scss";

.node-card {
    height: 240px;
    padding: 10px 20px;
    box-sizing: border-box;
    // position: relative;
    cursor: default;

    .top {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: $gray-2;
        padding-bottom: 16px;
    }

    .message {
        height: 140px;
        font-family: Arial, "PingFangChangAnTi-2";
        font-size: 17px;
        color: $gray-1;
        cursor: pointer;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        // position: absolute;
        // bottom: 16px;
        padding: 20px 0px;
        width: auto;
        box-sizing: border-box;

        .foot-left {
            display: flex;

            .like {
                display: flex;
                padding-right: 8px;
                align-items: center;
            }

            .common {
                display: flex;
            }

            .icon {
                font-size: 16px;
                color: $gray-2;
            }

            .value {
                font-size: 16px;
                color: $gray-2;
                height: 16px;
                line-height: 16px;
                padding-left: 4px;
            }

            .icon-1 {
                cursor: pointer;
                transition: $tr;

                &:hover {
                    color: $like;
                }
            }

            .isLike{
                color: $like;
            }
        }
    }

    .name {
        // font-family: Arial, "Microsoft YaHei";
        font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
        font-size: 17px;
        color: $gray-1;
        // font-weight: 600;
    }
}
</style>