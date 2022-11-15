<template>
    <!-- teacher页面响应式布局 -->
    <el-row :gutter="0" style="height: 100%;">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" style="height: 99%;">
            <!-- 页面的最外层盒子 -->
            <div id="teacher-container">
                <!-- 页面的数据内容盒子 -->
                <div class="container">
                    <!-- 数据信息显示卡片 -->
                    <el-card class="box-card" v-for="item in StudentInfo" :key="item.id">
                        <!-- 卡片头部数据 -->
                        <div slot="header" class="clearfix">
                            <img :src="getSrc('' + imgSrc)" alt="">
                        </div>
                        <!-- 卡片内容数据一-昵称 -->
                        <div class="info-text item">
                            <div class="word">昵称: </div>
                            <div>{{ item.username }}</div>
                        </div>
                        <!-- 卡片内容数据二-简介 -->
                        <div class="info-text item">
                            <div class="word">角色: </div>
                            <div>学生</div>
                        </div>
                        <!-- 卡片数据内容四-邮箱 -->
                        <!-- <div class="info-text item">
                            <div class="word">邮箱: </div>
                            <div>{{ teacherInfo.email }}</div>
                        </div> -->
                        <!-- 卡片数据内容五-联系方式 -->
                        <!-- <div class="info-text item">
                            <div class="word">联系方式: </div>
                            <div>{{ teacherInfo.tel }}</div>
                        </div> -->
                    </el-card>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'teacher',
    created() {
        this.getStudentInfo()
    },
    data() {
        return {
            // 教师信息数组
            StudentInfo: [],
            // 获取教师头像
            imgSrc: window.localStorage.getItem('avatar')
        }
    },
    methods: {
        // 返回后端传输到前端的图片地址
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
        },
        // 获取教师资料信息方法
        async getStudentInfo() {
            let name = window.localStorage.getItem('token')
            const { data: res } = await this.$http.get("/getUser?name=" + name)
            this.StudentInfo = res
        }
    }
}
</script>

<style lang="less" scoped>
@media (min-width: 345px) and (max-width: 768px) {
    .word {
        width: 25% !important;
        letter-spacing: 0 !important;
    }
}

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

// 整个页面盒子样式
#teacher-container {
    height: 100%;
    border: 0.1rem solid #c9c9c9;
    background: rgba(250, 250, 250, 1);

    // 数据信息盒子样式
    .container {
        width: 80%;
        height: 80%;
        font-weight: 600;
        margin: 2rem auto;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.6666rem #c9c9c9;

        // 卡片文字样式
        .info-text {
            font-size: 14px;
        }

        // 卡片内容样式
        .item {
            margin-bottom: 18px;
            display: flex;

            // 信息显示文字样式
            .word {
                width: 50%;
                text-align: right;
                letter-spacing: 0.8rem;
            }
        }

        .clearfix {
            img {
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
            }
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }

        .box-card {
            height: 100%;
            margin: 0 auto;
        }
    }
}
</style>