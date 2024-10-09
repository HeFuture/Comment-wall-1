<template>
    <div>
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>

            <div class="cover"></div>

            <el-main>
                <router-view></router-view>
            </el-main>

            <el-footer>
                <FootBar></FootBar>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup>
import Topbar from "../components/Topbar.vue";
import FootBar from "../components/FootBar.vue";

import { getUserIp } from '../api/index';
import NewCard from '../store/index'

const newcard = NewCard()

// 获取用户ip
async function getuserip() {
    const res = await getUserIp()
    newcard.userIp = res.data.ip;
}
getuserip()


</script>

<style lang="scss" scoped>
.cover {
    position: fixed;
    top: 50px;
    left: 0;
    // height: calc(100vh);
    height: 100vh;
    width: 100%;
    background-image: url('../assets/images/白素描纸_.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    z-index: -1;
}

:deep(.el-footer) {
    padding: 0;
}

:deep(.el-main) {
    padding: 0;
    overflow: hidden;
}
</style>