
<template>
    <div class="topbar">
        <div class="logo">
            <!-- E:\C-js\ASP.NET\11-项目实战\02-留言墙\web\src\assets\images\H.svg -->
            <img src="../assets/images/H.svg" class="logo-img" />
            <p class="logo-name">一刻时光</p>
        </div>
        <div class="menu">
            <YkButton
                :nom="route.query.id == 0 ? 'cprimary' : 'csecondary'"
                class="menu-message"
                @click="changeIndexId(0)"
                >留言墙</YkButton
            >
            <YkButton
                :nom="route.query.id == 1 ? 'cprimary' : 'csecondary'"
                class="menu-photo"
                @click="changeIndexId(1)"
                >照片墙</YkButton
            >
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import YkButton from "./YkButton.vue";

const router = useRouter();
const route = useRoute();
// 页面id，用来判断是留言还是照片
// const indexId = ref(route.query.id || 0);

// 切换页面id
const changeIndexId = (id) => {
    router.push({ query: { id: id } });
};
</script>

<style lang="scss" scoped>
// E:\C-js\ASP.NET\11-项目实战\02-留言墙\web\src\styles\commons.scss
@import "../styles/commons.scss";
.topbar {
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    .logo {
        width: 200px;
        display: flex;
        align-items: center;
        .logo-img {
            height: 30px;
        }
        .logo-name {
            font-size: 20px;
            color: $gray-0;
            font-weight: 600;
            padding-left: 10px;
        }
    }
    .menu {
        display: flex;
        .menu-message {
            margin-right: 24px;
        }
    }
    .user {
        width: 200px;
        .user-head {
            float: right;
            border-radius: 50%;
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, #7be7ff 2%, #1e85e2 100%);
        }
    }
}
</style>