<template>
    <!-- 使用响应式布局 -->
    <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div id="login-container">
                <!-- 使用原生的Div+Css进行登录页面的样式设计 -->
                <div class="login">
                    <form action="" style="height: 100%" method="post">
                        <!-- 整个的登录框内容 -->
                        <div class="login-box">
                            <!-- 登录框标题内容 -->
                            <div class="login-text">
                                <h3>希冀数学用户登录</h3>
                            </div>
                            <!-- 登录框用户名内容 -->
                            <div class="login-username">
                                <el-input type="text" v-model="username" placeholder="请输入用户名"
                                    prefix-icon="el-icon-user"></el-input>
                                <span class="info1" v-if="context === 'user_err'"><strong>{{ info1 }}</strong></span>
                                <span class="info1" v-if="context === 'isnull'"><strong>{{ info3 }}</strong></span>
                            </div>
                            <!-- 登录框密码内容 -->
                            <div class="login-password">
                                <el-input type="password" v-model="password" placeholder="请输入用户密码" show-password
                                    prefix-icon="el-icon-lock"></el-input>
                                <span class="info2" v-if="context === 'psw_err'"><strong>{{ info2 }}</strong></span>
                            </div>
                            <div class="code">
                                <el-input placeholder="验证码" prefix-icon="el-icon-key" v-model="input_code">
                                    <template slot="append">{{ code }}</template>
                                </el-input>
                                <span class="info4" v-if="context === 'code_err'"><strong>{{ info4 }}</strong></span>
                            </div>
                            <!-- 新用户登录注册链接 -->
                            <div class="register-link">
                                <router-link to="/register">没有账号? 前往注册!</router-link>
                            </div>
                            <!-- 登录框提交内容 -->
                            <div class="login-submit">
                                <router-link to="">
                                    <el-button type="primary" id="submit" @click="login">
                                        <i class="el-icon-upload el-icon--right"></i> 登录
                                    </el-button>
                                </router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'login',
    // 管理员登录页面中使用到的数据
    data() {
        return {
            // 用户登录名变量
            username: '',
            // 用户登录密码变量
            password: '',
            // 用户输入的验证号码
            input_code: '',
            // 系统随机产生的验证号码
            code: Math.random().toString().slice(-6),
            // 登录信息一
            info1: '用户不存在！！',
            // 登录信息二
            info2: '密码错误！！',
            // 登录信息三
            info3: '用户名不能为空！！',
            // 登录信息四
            info4: '验证码错误！！',
            // 控制登录信息显示变量
            context: '',
            // 登录成功前往页面变量
            url: '/home'
        }
    },
    // 管理员登录页面中需要用到的事件方法
    methods: {
        // 登录函数login，用来发送ajax异步判断数据库表administrator表中是否存在该用户
        async login() {
            // 调用ajax进行Post请求(注意：下方使用了qs模块中的一个功能，在后续开发也要使用到的)
            if (this.username !== '') {

                // 当且仅当用户输入的验证码全等于初始化的验证码
                if (this.input_code === this.code) {
                    const { data: res } = await this.$http.post("/user", this.$qs.stringify({
                        "username": this.username,
                        "password": this.password
                    }))

                    // 调用vuex中的changeFlag方法将flag进行更改
                    this.$store.commit("changeFlag", false)
                    // 调用Vuex中的setToken方法将state中的token变量进行赋值
                    this.$store.commit("setUsername", this.username)

                    // 如果后端返回的数据均不为以下的信息时进行对应的信息提示和返回到home页面
                    if (res !== 'user_err' && res !== 'psw_err') {
                        this.$store.commit("getImgSrc", res)
                        this.$message({
                            type: "info",
                            message: this.username + "欢迎您!"
                        })

                        // 设置对应的token变量
                        window.localStorage.setItem('token', this.username)
                        window.sessionStorage.setItem("user", JSON.stringify(this.username))

                        // 将从后台中获取到的用户头像名设置为avatar变量
                        window.localStorage.setItem('avatar', res)

                        // 使用编程式导航将页面退返回首页
                        this.$router.push("/math/home")
                    } else {
                        // 控制提示信息展示变量的赋值
                        this.context = res
                    }
                } else {
                    this.context = 'code_err'
                }
            } else {
                // 控制提示信息展示变量的赋值
                this.context = 'isnull'
            }
        }
    }
}
</script>

<style lang="less" scoped>
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {
    html {
        font-size: 12px;
    }
}

// 当用户的手机屏幕小于992px但大于758px时，对应的字体大小为13px
@media (min-width: 768px) and (max-width: 992px) {
    html {
        font-size: 13px;
    }
}

// 当用户的手机屏幕大于992px但小于1200px时, 对应的字体大小为14px
@media (min-width:992px) and (max-width: 1200px) {
    html {
        font-size: 14px;
    }

}

// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) {
    html {
        font-size: 15px;
    }

}

* {
    margin: 0;
    padding: 0;
}

// 这是给login页面单独进行背景图的设置
#login-container {
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    background: url('../assets/login-bg.jpg');
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;

    // 登录框样式
    .login,
    .el-row {
        position: relative;
        top: 50%;
        left: 50%;
        width: 31rem;
        height: 24rem;
        text-align: center;
        background: rgba(250, 250, 250, 0.92);
        transform: translate(-50%, -50%);

        // 登录具体框样式
        .login-box {
            width: 80%;
            height: 100%;
            margin: 0 auto;

            // 登录文字样式
            .login-text {
                height: 20%;
                width: 100%;
                color: purple;
                line-height: 5rem;
                text-shadow: 0.1em 0.1em 0.5em #333;
            }

            // 登录名，密码，提交按钮样式
            .login-username,
            .login-password,
            .login-submit {
                height: 20%;
                width: 100%;
            }

            .code {
                width: 100%;
                height: 10%;

                .el-input__inner {
                    width: 50%;
                }
            }

            // 注册链接样式
            .register-link {
                height: 12%;
                width: 100%;
                font-size: 14px;
                text-align: right;
                line-height: 2.4rem;

                a {
                    color: purple;
                    text-decoration: none;
                }
            }

        }

        // 登录各输入框样式
        .login-username input,
        .login-password input,
        .login-submit button {
            width: 100%;
            height: 35px;
            outline: none;
            border-radius: 3px;
            border: 1px solid #c9c9c9;
        }

        .login-username input,
        .login-password input {
            text-indent: 1rem;
        }

        // 登录提交按钮样式
        .login-submit button {
            background: rgb(64, 158, 255);
            color: white
        }

        // 各登录信息样式
        span {
            float: left;
            margin-top: 4px;
            color: red;
            font-size: 12px;
            line-height: 1rem;
        }
    }
}
</style>