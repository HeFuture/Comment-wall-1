<template>
    <div class="newCrad">
        <div class="card-color" v-show="props.id == 0">
            <div class="color-list" v-for="(item, index) in cardColor" :key="index" :style="{ background: item }"
                :class="{ colorSelect: index == selected }" @click="changeColor(index)"></div>
        </div>

        <!-- 照片 -->
        <div class="add-photo" v-show="props.id == 1">
            <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto" />
            <div class="add-bt" v-if="url == ''">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-plus"></use>
                </svg>
            </div>
            <div class="change-bt" v-if="url != ''">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-edit-square"></use>
                </svg>
            </div>
            <div class="photo-div"><img :src="url" /></div>
        </div>

        <!-- 卡片 -->
        <div class="card-main" :style="{
            background: id == 0 ? cardColor[selected] : cardColor[0],
        }">
            <textarea placeholder="留言..." class="message" maxlength="96" v-model="noteMessage"></textarea>
            <input type="text" placeholder="签名..." class="name" v-model="noteName" />
        </div>

        <div class="labels">
            <p class="title">选择标签</p>
            <div class="label">
                <p v-for="(iten, index) in label[id]" :key="index" class="label-li"
                    :class="{ labelSelected: index == lbselected }" @click="changelabel(index)">
                    {{ iten }}
                </p>
            </div>
        </div>

        <div>
            <p class="title">免责声明</p>
            <div class="mzsm">
                <p>
                    一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：
                </p>
                <p>1、反对宪法所确定的基本原则的；</p>
                <p>
                    2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家
                    统一的；
                </p>
                <p>3、损害国家荣誉和利益的；</p>
                <p>4、煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                <p>5、破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                <p>6、散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                <p>7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                <p>8、侮辱或者诽谤他人，侵害他人合法权益的；</p>
                <p>9、含有法律、行政法规禁止的其他内容的信息。</p>
            </div>
        </div>

        <div class="footbar">
            <YkButton size="max" nom="secondary" @click="closeModal(0)">丢弃</YkButton>
            <YkButton size="max" class="submit" @click="submit()">确定</YkButton>
        </div>
    </div>
</template>

<script setup>
import { cardColor, label } from "../utils/data";
import { ref, inject } from "vue";
import YkButton from "./YkButton.vue";
import NewCardStore from "../store/index";
import { insertWall } from "../api/index";
import { getObjectURL } from '@/utils/Yksg'

const $message = inject('$message')
const newcardStore = NewCardStore();

// 添加照片url
const url = ref("");
// 添加图片方法
const showPhoto = () => {
    // 判断url是否为空在进行赋值
    if (url.value == "") {
        url.value = URL.createObjectURL(
            document.getElementById("file").files[0]
        );
        // console.log(url.value);
    } else {
        url.value = "";
        url.value = URL.createObjectURL(
            document.getElementById("file").files[0]
        );
        // console.log(url.value);
    }
};
// 留言信息
const noteMessage = ref("");
// 签名
const noteName = ref("");

// 留言颜色选择
const selected = ref(0);
const changeColor = (item) => {
    selected.value = item;
};
const props = defineProps({
    id: {
        type: String,
        default: 0,
    },
});

// 标签颜色选择
const lbselected = ref(0);
const changelabel = (item) => {
    lbselected.value = item;
};

// 定义可以触发的自定义事件
const emit = defineEmits(["addClose"]);
// 定义一个关闭模态框的方法
// 关闭留言窗口
const closeModal = (data) => {
    emit("addClose", data);
};

// 提交新建wall
const submit = async () => {
    let name = "匿名";
    if (noteName.value) {
        name = noteName.value;
    }
    let data = {
        type: props.id,
        message: noteMessage.value,
        name: noteName.value,
        userId: newcardStore.userIp,
        moment: new Date(),
        label: lbselected.value,
        color: 5,
        imgurl: "",
    };
    console.log(data.label,lbselected.value);
    
    if (noteMessage.value && props.id == 0) {
        data.color = selected.value;
        try {
            const res = await insertWall(data)
            if (res.data.status == 0) {
                noteMessage.value = "";
                noteName.value = "";
                // 传递存储成功的数据传递给WallMessage
                emit("clickbt", data);
                $message({ message: "感谢你的记录！", type: "success" })
            }

        } catch (error) {
            console.log(error, "插入错误");
        }
    }
};



</script>


<style lang="scss" scoped>
@import "../styles/commons.scss";

.newCrad {
    position: relative;
    padding: 0 20px 140px;

    .card-color {
        display: flex;
        padding-bottom: 12px;

        .color-list {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            cursor: pointer;
            transition: $tr;

            &:hover {
                transform: scale(1.1);
                box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
            }
        }

        .colorSelect {
            // border: 1px solid rgba(252, 175, 162, 1);
            box-shadow: 2px 3px 3px 0 rgba(0, 0, 0, 0.3);
        }
    }

    .add-photo {
        padding: 5px 0 15px 0;
        // outline: 1px solid red;
        position: relative;

        #file {
            position: absolute;
            z-index: 10;
            top: -3px;
            // outline: 1px solid red;
            height: 74px;
            width: 64px;
            opacity: 0;
            cursor: pointer;

            &:hover~.add-bt {
                box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
                transform: rotate(180deg);
            }

            &:hover~.change-bt {
                box-shadow: 0 0 4px 1px rgba(199, 199, 199, 0.3);
                transform: scale(1.1);
            }
        }

        .add-bt {
            width: 64px;
            height: 64px;
            border: 1px solid $gray-2;
            border-radius: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            .icon {
                font-size: 24px;
                color: $gray-2;
            }
        }

        .photo-div {
            max-height: 200px;
            width: 100%;
            background: #333;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                width: 100%;
            }
        }

        .change-bt {
            position: absolute;
            top: 12px;
            left: 12px;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            .icon {
                font-size: 24px;
                color: #c9c9c9;
            }
        }
    }

    .card-main {
        height: 240px;
        width: 100%;
        // background: rgba(146, 230, 245, 0.4);
        padding: 12px;
        box-sizing: border-box;

        .message {
            background: none;
            border: none;
            padding: 8px;
            box-sizing: border-box;
            resize: none;
            height: 172px;
            width: 100%;
            font-family: Arial, "PingFangChangAnTi-2";
            font-size: 17px;
        }

        .name {
            font-family: Arial, "PingFangChangAnTi-2";
            font-size: 15px;
            padding: 8px;
            box-sizing: border-box;
            background: none;
            border: #fff 1px solid;
            line-height: 20px;
        }
    }

    .labels {
        .title {
            color: $gray-0;
            font-weight: 600;
            padding-top: 30px;
        }

        .label {
            display: flex;
            flex-wrap: wrap;
            // border: 1px solid red;
            width: 320px;

            .label-li {
                padding: 2px 10px;
                border-radius: 20px;
                margin: 20px 4px 0 0;
                color: $gray-2;
                cursor: pointer;
                transition: $tr;

                &:hover {
                    background: #ebebeb;
                    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);
                }
            }

            .labelSelected {
                background: #ebebeb;
                box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);
                font-weight: 600;
                color: $gray-1;
            }
        }
    }

    .title {
        padding: 30px 0 0 0;
        color: $gray-0;
        font-weight: 600;
    }

    .mzsm {
        font-size: 12px;
        color: $gray-2;
        padding: 20px 0 20px 0;
    }

    .footbar {
        padding: 20px;
        box-sizing: border-box;
        position: fixed;
        bottom: 52px;
        left: 0;
        background: rgba(255, 255, 255, 0.3);
        width: 100%;
        backdrop-filter: blur(20px);
        display: flex;

        .submit {
            margin-left: 20px;

            :deep(.yk-btn) {
                width: 200px;
            }
        }
    }
}
</style>