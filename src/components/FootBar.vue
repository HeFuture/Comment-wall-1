<template>
    <div class="foot-bar">
        <div class="foot-bar-inner">
            <div class="foot-left">
                <div class="logo">
                    <img src="../assets/images/H.svg" style="height: 30px" />
                    <p class="logo-name">一刻时光</p>
                </div>
                <p class="top-p">
                    一刻时光是本人独自开发，为便于用户交流的留言平台
                </p>
                <p class="top-p">
                    用户将留言贴在留言墙上，用户可以自定义颜色和内容属性，不仅可以用于交流，也是一次记录
                </p>
                <p class="state">
                    <span>声明</span><span>备案/许可证 粤 ICP 备 19012866 号</span
                    ><span>网站备案/许可证 粤 ICP 备 19012866 号 -1</span>
                </p>
            </div>
            <div class="link">
                <p class="title">链接</p>
                <div class="line-inner">
                    <a href="/" target="_blank" class="link-name">一刻时光</a>
                    <a href="/" target="_blank" class="line-name">B 站</a>
                </div>
            </div>
            <div class="foot-right">
                <p class="title">打赏</p>
                <div class="right-inner">
                    <div>
                        <img src="../assets/images/1.jpg" />
                        <p class="ds-name">微信支付</p>
                    </div>
                    <div>
                        <img src="../assets/images/1.jpg" />
                        <p class="ds-name">支付宝</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "../styles/commons.scss";
.foot-bar {
    width: 100%;
    height: 200px;
    background: $gray-0;
    padding: 20px;
    box-sizing: border-box;
    background-size: cover;
    position: relative;
    overflow: hidden;
    margin-top: 40px;
    .foot-bar-inner {
        display: flex;
        width: 100%;
        // margin:0 auto;
        justify-content: space-between;
        top: 50%;
        position: absolute;
        transform: translateY(-50%);
        
        .foot-left {
            margin-left: 10%;
            .logo {
                display: flex;
                align-items: center;
                margin-bottom: 24px;
                .logo-name {
                    font-size: 20px;
                    color: $gray-4;
                    font-weight: 600;
                    padding-left: 10px;
                }
            }
            .top-p {
                font-size: $font-12;
                padding-top: 4px;
                width: 400px;
                color: $gray-2;
            }
            .state {
                font-size: $font-12;
                padding-top: 26px;
                color: $gray-2;
                span {
                    padding-right: 20px;
                }
            }
        }
        .link {
            padding:0 40px;
            flex: 1;
            color: $gray-2;
            .title {
                font-size: $font-16;
                padding-bottom: 12px;
            }
            .line-inner {
                a {
                    color: rgba(255, 255, 255, 0.5);
                    padding-right: 20px;
                    font-size: $font-12;
                }
            }
        }
        .foot-right {
            margin-right: 10%;
            color: $gray-2;
            .title {
                font-size: $font-16;
                padding-bottom: 12px;
            }
            .right-inner {
                display: flex;
                img{

                    width: 100px;
                    height: 100px;
                    padding-right: 40px;
                }
                .ds-name{
                    font-size: $font-12;
                    padding-top: 10px;
                }
            }
        }
    }
}
</style>