<template>
    <div class="photo-card">
        <!-- <div
            :style="{
                backgroundImage: `url('../../static/${photo.imgurl}.jpg')`,
            }"
            class="photo-img"
        ></div> -->
        <img :src="`../../static/${photo.imgurl}.jpg`" class="photo-img">
        <div class="photo-bg"></div>
        <div class="photo-like">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-heart-fill"></use>
            </svg>
            <span class="like-data">{{ photo.like }}</span>
        </div>
    </div>
</template>


<script setup>
import { computed } from "vue";
import { label, cardColor } from "../utils/data";
import { dateOne } from "../utils/Yksg";

const props = defineProps({
    photo: {
        type: Object,
        default: {},
    },
});

const card = computed(() => {
    return props.note;
});
// console.log(props.photo);

</script>


<style lang="scss" scoped>
@import '../styles/commons.scss';
    .photo-card{
        position: relative;
        .photo-img{
            width: 100%;
            height: 100%;
            background-size: cover;
        }
        .photo-bg{
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.2);
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        .photo-like{
            position: absolute;
            top: 8px;
            left: 8px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 20px;
            height: 28px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            backdrop-filter: blur(30px);
            opacity: 0;
            transition: opacity 0.4s ease;
            cursor: pointer;
            .icon{
                color: $gray-2;
                transition: color 0.4s ease;
            }
            &:hover {
                .icon{
                    color: $like;
                }
            }
            .like-data{
                color: $gray-1;
                padding-left: 4px;
                
            }
        }
        &:hover{
            .photo-bg,.photo-like{
                opacity: 1;
            }
        }
    }

</style>