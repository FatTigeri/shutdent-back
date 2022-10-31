<template>
    <!-- 教师后台管理页面 -->
    <el-row :gutter="0">
        <!-- 响应式布局 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div id="administrator-container">
                <div class="system">
                    <el-row :gutter="0">
                        <el-col :xs="0" :sm="24" :md="24" :lg="24">
                            <!-- (一) 最上方的导航 -->
                            <div class="nav">
                                <!-- 1.1 左侧内容 -->
                                <div class="nav-l">
                                    <div class="content-l">
                                        <el-badge is-dot class="item" type="danger"></el-badge>
                                        <el-badge is-dot class="item" type="warning "></el-badge>
                                        <el-badge is-dot class="item" type="success"></el-badge>
                                        <i class="el-icon-reading"></i>
                                        <i class="el-icon-arrow-left"></i>
                                        <i class="el-icon-arrow-right"></i>
                                    </div>
                                </div>
                                <!-- 1.2 中间搜索框内容 -->
                                <div class="nav-m">
                                    <div class="content-m">
                                        <el-input size="mini" placeholder="请输入搜索内容" suffix-icon="el-icon-search"
                                            v-model="input1">
                                        </el-input>
                                    </div>
                                </div>
                                <!-- 1.3 右侧内容 -->
                                <div class="nav-r">
                                    <div class="content-r">
                                        <i class="el-icon-loading"></i>
                                        <i class="el-icon-plus"></i>
                                        <i class="el-icon-document-copy"></i>
                                        <el-button type="primary" size="mini" @click="logout">退出</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- (二) 非导航内容，数据的展示区域 -->
                    <el-row :gutter="0" class="el-row2" style="height: 100%">
                        <div class="contents">
                            <el-container>
                                <!-- 使用响应式布局 -->
                                <el-col :xs="0" :sm="8" :md="6" :lg="6" :xl="6">
                                    <!-- 2.1 侧边栏 -->
                                    <el-aside width="13.3333rem">
                                        <ul>
                                            <!-- 2.1.1 用户的头像与名称 -->
                                            <li class="user">
                                                <img :src="getSrc('' + imgSrc)" alt="blank">
                                                <div class="teacher"><i>{{ teacher }}</i></div>
                                            </li>
                                            <!-- 2.1.2 用户资料选项 -->
                                            <li>
                                                <a href="#/administrator/teacher" :class="{ actived: cur === 0 }"
                                                    @click="change(0)"><i
                                                        class="el-icon-user-solid"></i>&nbsp;&nbsp;教师资料</a>
                                            </li>
                                            <!-- 2.1.3 答疑入口选项 -->
                                            <li>
                                                <a href="#/math/chat" :class="{ actived: cur === 1 }"
                                                    @click="change(1)"><i class="el-icon-s-comment"></i>&nbsp;答疑入口</a>
                                            </li>
                                            <!-- 2.1.4 课程上传选项 -->
                                            <li>
                                                <a href="#" :class="{ actived: cur === 2 }" @click="change(2)"><i
                                                        class="el-icon-upload"></i>&nbsp;课程上传</a>
                                            </li>
                                            <!-- 2.1.5 互动窗口选项 -->
                                            <li>
                                                <a href="#" :class="{ actived: cur === 3 }" @click="change(3)"><i
                                                        class="el-icon-monitor"></i>&nbsp;互动窗口</a>
                                            </li>
                                            <!-- 2.1.6 上班预约选项 -->
                                            <li>
                                                <a href="#" :class="{ actived: cur === 4 }" @click="change(4)"><i
                                                        class="el-icon-service"></i>&nbsp;上班预约</a>
                                            </li>
                                            <!-- 2.1.7 线下活动选项 -->
                                            <li>
                                                <a href="#" :class="{ actived: cur === 5 }" @click="change(5)"><i
                                                        class="el-icon-location"></i>&nbsp;线下活动</a>
                                            </li>
                                        </ul>
                                    </el-aside>
                                </el-col>
                                <el-col :xs="24">
                                    <!-- 2.2 头部内容与主体内容 -->
                                    <el-container>
                                        <el-header height="70px">
                                            <!-- 2.2.1 头部区域 -->
                                            <ul>
                                                <li><a href="#/administrator/student" :class="{ active: current === 0 }"
                                                        @click="change1(0)">学生</a>
                                                </li>
                                                <li><a href="#/administrator/problem" :class="{ active: current === 1 }"
                                                        @click="change1(1)">问题</a>
                                                </li>
                                                <li><a href="#" :class="{ active: current === 2 }"
                                                        @click="change1(2)">其他</a>
                                                </li>
                                            </ul>
                                        </el-header>
                                        <!-- 2.2.2 主体内容区域 -->
                                        <el-main>
                                            <router-link to="/administrator/teacher"></router-link>
                                            <router-view></router-view>
                                        </el-main>
                                    </el-container>
                                </el-col>
                            </el-container>
                        </div>
                    </el-row>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    // 组件名称
    name: 'administrator',
    data() {
        return {
            // 控制左侧栏区域active属性
            cur: 0,
            // 控制头部区域active属性
            current: 0,
            // 输入框内容
            input1: '',
            // 教师名字
            teacher: window.localStorage.getItem('token'),
            // 教师头像
            imgSrc: window.localStorage.getItem('avatar')
        }
    },
    methods: {
        // 教师退出登录方法
        logout() {
            this.$store.commit('changeAlive')
            this.$router.replace('/math/home')
        },
        // 控制选项转换方法
        change(index) {
            this.cur = index
        },
        // 控制上方选项方法
        change1(index) {
            this.current = index
        },
        // 返回后端传输到前端的图片地址
        getSrc(src) {
            return require('@/assets/' + src)
        },
    }
}
</script>

<style lang="less" scoped>
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {
    html {
        font-size: 12px;
    }

    .contents {
        height: 100% !important;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

}

// 当用户的手机屏幕小于992px但大于758px时，对应的字体大小为13px
@media (min-width: 768px) and (max-width: 992px) {
    html {
        font-size: 13px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }


}

// 当用户的手机屏幕大于992px但小于1200px时, 对应的字体大小为14px
@media (min-width:992px) and (max-width: 1200px) {
    html {
        font-size: 14px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }


}

// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) {
    html {
        font-size: 15px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }


}

// teacher组件样式
#administrator-container {
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: rgba(226, 230, 245, 0.8);
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;
    -webkit-font-smoothing: antialiased;

    // 最外层展示框样式
    .system {
        position: relative;
        width: 80%;
        height: 90%;
        top: 50%;
        left: 50%;
        overflow: hidden;
        border-radius: 0.6666rem;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0.6666rem #c9c9c9;
        background: rgba(250, 250, 250, 1);

        // 导航栏样式
        .nav {
            display: flex;
            width: 100%;
            height: 8%;
            flex-direction: row;
            justify-content: space-around;
            background: rgba(29, 44, 73, 1);

            // 导航中间区域和右区域样式
            .nav-m,
            .nav-r {
                // display: inline-block;
                width: 36%;
                line-height: 3.0000rem;
            }

            // 导航左区域样式
            .nav-l {
                width: 28%;
                text-align: left;
                line-height: 3.0000rem;

                // 左内容样式
                .content-l {
                    width: 80%;
                    margin: 0 auto;
                    color: #c9c9c9;
                    // border: 1px solid red;

                    // 
                    .item {
                        height: 2.7333rem;
                        margin-top: 0.26666rem;
                        margin-right: 0.666rem;
                    }

                    i {
                        margin-left: 1rem;
                    }
                }
            }

            // 导航右内容样式
            .nav-r {
                text-align: right;

                // 对应内容样式
                .content-r {
                    width: 80%;
                    margin: 0 auto;
                    color: #c9c9c9;

                    i {
                        font-size: 0.7rem;
                        margin-right: 1rem;
                    }
                }
            }
        }

        // 非导航内容样式
        .contents,
        .el-row2 {
            width: 100%;
            height: 33.6347333rem;

            // 最外层样式
            .el-container {
                display: flex !important;
                height: 100%;
            }

            // 头部样式
            .el-header {
                color: #333;
                text-align: center;

                // a标签包含框样式
                ul {
                    width: 100%;
                    height: 100%;
                    list-style: none;

                    li {
                        display: inline-block;
                        width: 30%;
                        height: 100%;
                        line-height: 4.666rem;
                        font-size: 0.93336rem;

                        // a标签样式
                        a {
                            position: relative;
                            display: block;
                            width: 75%;
                            height: 50%;
                            top: 50%;
                            left: 50%;
                            color: #000;
                            font-weight: 600;
                            text-decoration: none;
                            line-height: 2.8rem;
                            transform: translate(-50%, -50%);
                        }

                        // 选项被选中时的样式
                        .active {
                            position: relative;

                            // 小三角样式 注意：content是必须要写的
                            &::after {
                                position: absolute;
                                left: 7rem;
                                top: 1.3333rem;
                                display: block;
                                content: "";
                                width: 0;
                                height: 0;
                                border: 0.333rem solid rgba(0, 0, 0, 0);
                                border-top-color: black;
                            }

                        }

                    }
                }
            }

            // 侧边栏样式
            .el-aside {
                height: 100%;
                color: #333;
                text-align: center;
                border-right: 1px solid white;

                // 侧边栏内容包含框样式
                ul {
                    width: 100%;
                    height: 100%;
                    list-style: none;

                    // 用户框样式
                    .user {
                        height: 30%;

                        // 图片样式
                        img {
                            width: 50%;
                            border-radius: 50%;
                            margin: 0.666rem 0 0 0;
                        }

                        // 教师样式
                        .teacher {
                            font-weight: 900;
                            margin: 0.666rem 0 0 0;
                        }
                    }

                    li {
                        height: 10%;
                        font-size: 0.93336rem;

                        a {
                            position: relative;
                            display: block;
                            width: 75%;
                            height: 60%;
                            top: 50%;
                            left: 50%;
                            color: #000;
                            font-weight: 600;
                            text-decoration: none;
                            line-height: 2.07366rem;
                            transform: translate(-50%, -50%);
                        }

                        // 选项被选中样式
                        .actived {
                            border-radius: 1rem;
                            background: rgba(20, 116, 202, 0.1);
                        }
                    }
                }
            }

            // 主内容样式
            .el-main {
                padding: 0 0 0 0;
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
            }

            body>.el-container {
                margin-bottom: 40px;
            }

            .el-container:nth-child(5) .el-aside,
            .el-container:nth-child(6) .el-aside {
                line-height: 260px;
            }

            .el-container:nth-child(7) .el-aside {
                line-height: 320px;
            }
        }
    }
}
</style>