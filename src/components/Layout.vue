<template>
    <div id="layout-container">
        <!-- (一) 首页导航栏 -->
        <el-header>
            <div class="header-container">
                <!-- 1.1 使用响应式布局进行设计 -->
                <el-row style="height: 100%" :gutter="0">
                    <!-- 1.1.1 导航栏logo -->
                    <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3" style="height: 100%">
                        <!-- 1.1.1 网站logo -->
                        <div class="logo">
                            <!-- 1.1.1.1 logo图片 -->
                            <img src="@/assets/logo.jpg" alt="blank" style="border-radius: 50%;">
                            <!-- 1.1.1.2 网站的名称介绍 -->
                            <div><a href="#">希冀数学</a></div>
                        </div>
                    </el-col>
                    <!-- 1.1.2 导航栏功能链接 -->
                    <el-col :xs="24" :sm="13" :md="12" :lg="12" :xl="12" style="height: 100%">
                        <!-- 1.1.2 导航栏功能选择 -->
                        <div class="functions">
                            <ul>
                                <!-- 1.1.3 具体的a标签内容 -->
                                <li><a href="#/math/home" :class="{active: 0 ===  cur}" @click="change(0)">首页</a></li>
                                <li><a href="#/math/chat" :class="{active: 1 ===  cur}" @click="change(1)">线上答疑</a></li>
                                <li><a href="#/math/room" :class="{active: 2 ===  cur}" @click="change(2)">趣味课堂</a></li>
                                <li><a href="#" :class="{active: 3 ===  cur}" @click="change(3)">线下活动</a></li>
                                <li><a href="#/math/resource" :class="{active: 4 ===  cur}" @click="change(4)">资源推荐</a>
                                </li>
                                <li><a href="#" :class="{active: 5 ===  cur}" @click="change(5)">教师资源</a></li>
                            </ul>
                        </div>
                    </el-col>
                    <!-- 1.1.3 导航栏搜索框 -->
                    <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" style="height: 100%">
                        <!-- 1.1.3 内容搜索框 -->
                        <div class="user-login">
                            <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入内容" size="small"
                                @keyup.enter.native="search"></el-input>
                        </div>
                    </el-col>
                    <!-- 1.1.4 导航栏登录按钮和用户头像 -->
                    <el-col :xs="0" :sm="4" :md="5" :lg="5" :xl="5" style="height: 100%">
                        <div class="user">
                            <!-- 1.1.4.1 用户登录跳转按钮 -->
                            <el-button size="mini" plain style="border: 1px solid black" @click="login"
                                v-show="this.$store.state.flag === true">登录
                            </el-button>
                            <!-- 1.1.4.2 用户登录图片 -->
                            <el-row class="demo-avatar demo-basic">
                                <el-col :xs="0">
                                    <div class="demo-basic--circle">
                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <img :src="getSrc('' + this.$store.state.imgSrc)" alt="blank"
                                                    style="width: 100%;">
                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="el-icon-turn-off">
                                                    <span @click="logout">注销</span>
                                                </el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-chat-dot-round" class="clearfix">
                                                    消息
                                                    <el-badge class="mark" :value="12" />
                                                </el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-setting" class="clearfix">
                                                    <span @click="admin">教师后台管理</span>
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-header>
        <router-link to="/math/home"></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import { mydebounce } from '@/utils/index.js'
export default {
    created() {
        this.$store.commit('changeCurrent', 0)

        // 判断用户的token是否已经存在于客户端电脑
        if (window.localStorage.getItem("token")) {
            // 改变控制按钮的变量的状态
            this.$store.commit('changeFlag', false)
            // 获取头像路径
            this.$store.commit('getImgSrc', window.localStorage.getItem("avatar"))

            // 对再次登录的用户进行消息的提示
            const h = this.$createElement;
            this.$notify({
                title: '消息提示',
                message: h('i', { style: 'color: teal' }, window.localStorage.getItem('token') + '欢迎回来~！'),
                position: 'top-left'
            })
        } else {
            console.log("用户没有登录~~~!");
        }
    },
    computed: {
        // 时刻计算当前的功能索引位置
        cur: function () {
            return this.$store.state.current
        }
    },
    data() {
        return {
            // 用户搜索内容变量
            input: '',
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            sizeList: ["medium"],
            dialogFormVisible: false,
            // 控制反馈模态框宽度变量
            formLabelWidth: '6.66666rem',
            // 当前导航栏的索引
        }
    },
    methods: {
        // 更改导航索引的方法
        change(index) {
            this.$store.commit('changeCurrent', index)
            this.cur = index
        },
        // 导航栏搜索功能(新增设置了防抖操作)
        search: mydebounce(function () {
            if (this.input === '') {
                // 当用户点击了搜索框，但是并没有进行内容的输入时，浏览器进行信息的提示
                this.$message({
                    type: 'error',
                    message: '搜索内容不能为空！！！'
                })
            } else {
                // TODO: 进行对应的内容查询
                this.$message({
                    type: 'info',
                    message: '功能还未开放, 抱歉~~~'
                })
            }
        }, 1000),


        // 用户登录方法
        login() {
            this.$message({
                type: 'success',
                message: '前往登录页面成功!!!'
            })
            // 编程式路由-将页面跳转到登录页
            this.$router.push('/login')
        },

        // 用户注销方法
        logout() {
            if (window.localStorage.getItem('token')) {
                // 用户调用vuex中的changeFlag方法，将后续的flag进行转换
                this.$store.commit('changeFlag', true)
                // 用户调用Vuex中的getImgSrc方法，获取从接口中得到的头像地址
                this.$store.commit('getImgSrc', '')

                // 将本地存储的伪token删除
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('user')

                // 用户登录注销后，调用Vuex中getImgSrc方法，赋值为没有头像的样式
                this.$store.commit('getImgSrc', 'avatar.png')

                // 网页进行对应的消息提醒
                this.$message({
                    type: 'success',
                    message: "退出登录成功!"
                })
            } else {
                // 用户还没登录点击了注销按钮的网页提醒
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '您还未登录，不能进行用户注销操作！！！')
                })
            }
        },

        // 返回后端传输到前端的图片地址
        getSrc(src) {
            return require('@/assets/' + src)
        },

        // 用户判断是否为教师方法
        async admin() {
            // 先对客户端中的token进行读取
            const username = window.localStorage.getItem('token')
            // 若用户已经登陆
            if (username) {
                // 异步发送get请求进行当前用户是否为教师的判断
                const { data: res } = await this.$http.get('/checkTeacher?username=' + username)
                // 用户是教师
                if (res) {
                    this.$router.replace('/administrator')
                    this.$store.commit('changeAlive')
                    this.$message({
                        type: 'success',
                        message: username + '欢迎您!!!'
                    })
                    // 用户不是教师
                } else {
                    const h = this.$createElement;
                    this.$notify({
                        title: '消息提示',
                        message: h('i', { style: 'color: teal' }, '您不是教师，无权进入！！！')
                    })
                }
            } else {
                // 用户还没登录点击了后台管理页面的网页提醒
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '请先登录！！！')
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
body {
    position: fixed;
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;
}

// home页面导航栏样式
.el-header {
    // background-color: rgb(184, 187, 250);
    background-color: rgba(199, 201, 201, 0.3);
    color: #333;
    font-weight: 600;
    text-align: center;
    // line-height: 60px;

    .header-container {
        width: 100%;
        height: 100%;

        // home页面logo样式
        .logo {
            width: 100%;
            height: 100%;
            display: flex;
            text-align: center;
            justify-content: space-around;

            // home页面图片样式设置
            img {
                height: 100%;
            }

            // home页面网站名称样式
            div {
                line-height: 4rem;

                a {
                    color: purple;
                    text-decoration: none;
                    font-family: Arial, Helvetica, sans-serif;
                }
            }
        }

        // home页面功能链接样式设置
        .functions {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

            ul {
                width: 100%;
                height: 2.1875rem;
                list-style: none;

                li {
                    float: left;
                    width: 15%;
                    height: 100%;
                    line-height: 2.1875rem;
                    margin-left: 0.3125rem;

                    // 对应a的标签样式
                    a {
                        display: block;
                        width: 100%;
                        height: 100%;
                        font-weight: 600;
                        color: black;
                        font-size: 0.9333rem;
                        text-decoration: none;
                        border-radius: 1.3333rem;

                    }

                    // a标签鼠标经过时的样式
                    a:hover {
                        color: purple;
                        transform: scale(0.9);
                        border: 1px solid black;
                        background: rgba(0, 0, 0, 0.3);
                    }
                }

                // a标签被选中时的样式
                .active {
                    color: purple;
                    transform: scale(0.9);
                    border: 1px solid black;
                    background: rgba(0, 0, 0, 0.3);

                    // 使用伪元素设置对应的三角
                    &::after {
                        display: block;
                        position: absolute;
                        top: 2.2rem;
                        left: 2.666rem;
                        content: '';
                        width: 0;
                        height: 0;
                        border: 0.333rem solid rgba(0, 0, 0, 0);
                        border-top-color: rgba(0, 0, 0, 0.6);
                    }
                }
            }
        }

        // 导航栏搜索框样式
        .el-input__inner {
            // border: 1px solid white;
            border: 0.13333rem solid black !important;
        }

        // 内容搜索框
        .user-login {
            width: 100%;
            height: 100%;
            line-height: 4rem;
        }

        // 用户登录内容样式
        .user {
            height: 100%;
            display: flex;
            font-weight: 600;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

            .demo-basic--circle {
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
                overflow: hidden;

                .el-dropdown-link {
                    cursor: pointer;
                    color: #409EFF;
                }

                .el-icon-arrow-down {
                    font-size: 12px;
                }
            }
        }
    }

}
</style>