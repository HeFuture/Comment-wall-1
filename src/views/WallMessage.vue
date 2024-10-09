<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p class="label-list" :class="{ leselected: nlabel == -1 }" @click="selectcNode(-1)">
                全部
            </p>
            <p class="label-list" :class="{ leselected: nlabel == index }" v-for="(item, index) in label[id]"
                :key="index" @click="selectcNode(index)">
                {{ item }}
            </p>
        </div>
        <div class="card" :style="{ width: width1 + 'px' }" v-show="id == 0">
            <NodeCard v-for="(item, index) in note" :key="index" :note="item" :feedList="feedList" class="card-inner"
                :style="{ width: '288px' }" :class="{ cardSelected: index == cardSelected }"
                @click="selectedCard(index)">
            </NodeCard>
        </div>
        <div class="photo" v-show="id == 1">
            <PhotoCard :photo="item" class="photo-card" v-for="(item, index) in photo.data" :key="index"
                @click="selectedCard(index)"></PhotoCard>
        </div>

        <!-- 卡片状态 -->
        <div class="none-msg" v-if="isOk == 0">
            <img :src="none[id].url" />
            <p>{{ none[id].msg }}</p>
        </div>

        <!-- loading加载动画 -->
        <div class="loading" v-show="isOk == -1">
            <div id="lottie"></div>
            <p>加载中...</p>
        </div>

        <!-- 加载完成动画 -->
        <p class="bottom-tip" v-show="page == 0">没有更多了...</p>

        <div class="add" :style="{ bottom: addBotton + 'px' }" @click="addCard" v-show="!isModal">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </div>
        <YkModal :title="title" @close="changeModal" :isModal="isModal">
            <NewCard :id="id" @addClose="changeModal" v-if="cardSelected == -1" @clickbt="newCard"></NewCard>
            <CardDetaill v-if="cardSelected != -1" :card="note.data[cardSelected]"></CardDetaill>
        </YkModal>
        <YkViewer :isView="view" :phots="photoarr" :nowNumber="cardSelected" @viewSwitch="viewSwitch"></YkViewer>
    </div>
</template>

<script setup>
import { wallType, label, none } from "../utils/data";
import { ref, onMounted, onUnmounted, watchEffect, watch, nextTick } from "vue";
import NodeCard from "../components/NoteCard.vue";
import { photo } from "../../mock/index";
import YkModal from "../components/YkModal.vue";
import NewCard from "../components/NewCard.vue";
import CardDetaill from "../components/CardDetaill.vue";
import { useRoute, useRouter } from "vue-router";
import PhotoCard from "../components/PhotoCard.vue";
import YkViewer from "../components/YkViewer.vue";
import lottie from "lottie-web";
import loading from "@/assets/images/Animation - 1728379749234.json";
import NewCardStore from "../store/index";
import { findWallPage } from "@/api";


// 存储查询的数据
const note = ref([])
const feedList = ref({})

// store里的userid
const userIdStore = NewCardStore();

// 是否加载中 -1为加载中  0为没有拿到数据
const isOk = ref(2);

// 当前页面
const page = ref(1);

// 照片图片
const photoarr = ref([])

const route = useRoute();
const router = useRouter();

// 控制照片墙照片点击显示
const view = ref(false);
// 照片墙左右按钮切换图片
const viewSwitch = (number) => {
    if (number == 0) {
        cardSelected.value--;
    } else {
        cardSelected.value++;
    }
};

// 卡片选择
const cardSelected = ref(-1);

// 新建标题
const title = ref("写留言");

// 留言墙与照片墙切换的 id
const id = ref(0);
watchEffect(() => {
    // 当路由变化时，更新 id
    id.value = route.query.id;
});

// 监听页面变化，控制卡片显示,将数据重置到初始
watch(id, () => {
    isModal.value = false;
    view.value = false;
    selectedCard.value = -1;
    nlabel.value = -1;
});

// 当前对应的标签
const nlabel = ref(-1);

// 切换标签 id
const selectcNode = (index) => {
    nlabel.value = index;
    page.value = 1
    note.value = []
    getWallcard(nlabel.value)

};
// 卡片模块宽度
const width1 = ref(0);
const noteWidth = () => {
    let width2 = document.body.clientWidth;
    width1.value = Math.floor((width2 - 120) / 300) * 300;
};
// 在组件挂载后调用 noteWidth 函数
onMounted(() => {
    noteWidth();
    getWallcard(nlabel.value);
    loaDing();
});

// 监听窗口大小变化，以便动态更新宽度
window.addEventListener("resize", noteWidth);

// 组件卸载时移除事件监听器，避免内存泄漏
onUnmounted(() => {
    window.removeEventListener("resize", noteWidth);
});

// add 按钮距离底部高度
const addBotton = ref(35);
// 页面滚动
const scrollBotton = () => {
    // 距离顶部高度  获取当前网页或文档滚动条在垂直方向上的滚动距离
    // 文档的根元素（document.documentElement）和文档的 body 元素（document.body）
    let scrllTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    // 获得视口  (屏幕) 高度
    let clientHeight = document.documentElement.clientHeight;
    // 内容高度（返回的是文档的根元素（通常是 <html> 元素）的总高度，包括因溢出而不可见的部分）
    let scrollHeight = document.documentElement.scrollHeight;

    if (scrllTop + clientHeight + 230 >= scrollHeight) {
        addBotton.value = scrllTop + clientHeight + 230 - scrollHeight;
    } else {
        addBotton.value = 35;
    }
    // console.log(scrllTop,clientHeight,scrollHeight);
};
// 监听页面滚动
window.addEventListener("scroll", scrollBotton);

// 控制留言窗口出现
const isModal = ref(false);
const changeModal = (item) => {
    // 子传父，传过来的测试参数
    // console.log(item);
    isModal.value = !isModal.value;
    // console.log("控制",cardSelected.value,isModal.value);
    cardSelected.value = -1;
    if (id.value == 1) {
        view.value = false;
    }
};

// 卡片选择方法
const selectedCard = (e) => {
    title.value = "";
    if (e !== cardSelected.value) {
        cardSelected.value = e;
        isModal.value = true;
        // console.log("开",cardSelected.value,isModal.value);
        if (id.value == 1) {
            view.value = true;
        }
    } else {
        cardSelected.value = -1;
        isModal.value = false;
        // console.log("关",cardSelected.value,isModal.value);
        if (id.value == 1) {
            view.value = false;
        }
    }
};

// 新建card
const addCard = () => {
    title.value = "写留言";
    // console.log("新建",cardSelected.value,isModal.value);
    changeModal();
};

// 存储照片数组和方法
// const phots = ref([]);
// const getPhoto = () => {
//     for (let i = 0; i < photo.data.length; i++) {
//         // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
//         phots.value.push(photo.data[i].imgurl);
//     }
//     // console.log(phots.value);
// };

// 接收NewsCard的方法
function newCard(data) {
    console.log(data);
}

// loading 加载动画
async function loaDing() {
    if (isOk.value == -1) {
        nextTick(async () => {
            var parmsl = {
                container: document.getElementById("lottie"),
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: loading,
            };
            lottie.loadAnimation(parmsl);
        });
    }
}

async function getWallcard(nlabel) {
    if (page.value > 0) {
        isOk.value = -1
        let data = {
            type: id.value,
            page: page.value,
            label: nlabel
        }
        // 获取留言墙
        const res = await findWallPage(data)
        note.value = note.value.concat(res.data)
        if (res.data.length) {
            page.value++;
        } else {
            page.value = 0;
        }
        setTimeout(() => {
            if (res.data.length > 0) {
                isOk.value = 1
            } else {
                isOk.value = 0
            }
        }, 10)

        // 如果为照片墙，将图片单独拿出来
        if (id.value == 1) {
            for (let i = 0; i < res.data.length; i++) {
                photoarr.value.push(res.data[i].imgurl)
            }
        }
    }
}





</script>

<style lang="scss" scoped>
@import "../styles/commons.scss";

.wall-message {
    min-height: 735px;
    padding-top: 52px;

    .title {
        padding-top: 10px;
        padding-bottom: $padding-8;
        font-size: 56px;
        color: $gray-0;
        text-align: center;
        font-weight: 600;
    }

    .slogan {
        color: $gray-1;
        text-align: center;
    }

    .label {
        display: flex;
        justify-content: center;
        margin-top: 40px;

        .label-list {
            display: flex;
            padding: 0 14px;
            height: 30px;
            line-height: 28px;
            margin: $padding-4;
            color: $gray-1;
            cursor: pointer;
            box-sizing: border-box;
            align-items: center;
            transition: 0.1s;
            border-radius: 14px;

            &:hover {
                transform: scale(1.1);
                box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
            }
        }

        .leselected {
            color: $gray-1;
            font-weight: 600;
            outline: 1px solid $gray-1;
            border-radius: 14px;
            box-sizing: border-box;
        }
    }

    .card {
        display: flex;
        flex-wrap: wrap;
        // border: 1px solid red;
        padding-top: 28px;
        // justify-content: center;
        margin: auto;

        .card-inner {
            margin: 6px;
            transition: $tr;

            &:hover {
                // transform: rotateX(20deg);
                box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.1);
                filter: drop-shadow(0px 0px 15px #dedede);
            }
        }

        .cardSelected {
            // border: 1px solid $primary-color;
            box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
            filter: drop-shadow(0px 0px 15px #dedede);
        }
    }

    .photo {
        width: 88%;
        margin: 0 auto;
        columns: 6; //用来设置元素的列宽和列数
        column-gap: 4px;
        padding-top: 30px;
    }

    .photo-card {
        margin-bottom: 4px;
        break-inside: avoid;
    }

    .add {
        width: 56px;
        height: 56px;
        background: $gray-1;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 28px;
        position: fixed;
        right: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: $tr;

        &:hover {
            // transform: scale(1.1);
            box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);
            transform: scale(1.1) rotate(90deg);
        }

        .icon {
            color: $gray-4;
            font-size: 24px;
        }
    }

    .none-msg {
        width: 100%;
        text-align: center;
        padding-top: 100px;
        position: absolute;
        top: 300px;

        img {
            display: inline;
        }

        p {
            font-family: serif;
            font-weight: 700;
            font-size: 24px;
            color: $gray-2;
        }
    }

    .loading {
        text-align: center;
        width: 100%;

        p {
            margin-top: -62px;
            font-family: serif;
            font-size: 24px;
            color: $gray-2;
        }

        #lottie {
            margin-top: 20px;
            height: 200px;
        }
    }

    .bottom-tip {
        padding: 20px;
        text-align: center;
        font-family: serif;
        // font-size: 24px;
        color: $gray-2;
    }
}
</style>