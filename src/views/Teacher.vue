<template>
    <el-row :gutter="0" style="height: 100%;">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" style="height: 99%;">
            <div id="teacher-container">
                <div class="container">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <img :src="getSrc('' + this.$store.state.imgSrc)" alt="">
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        <div class="text item">
                            <div class="word">昵称: </div>
                            <div>{{ teacherInfo.tname }}</div>
                        </div>
                        <div class="text item">
                            <div class="word">简介: </div>
                            <div>{{ teacherInfo.info }}</div>
                        </div>
                        <div class="text item">
                            <div class="word">微信: </div>
                            <div>{{ teacherInfo.weChat }}</div>
                        </div>
                        <div class="text item">
                            <div class="word">邮箱: </div>
                            <div>{{ teacherInfo.email }}</div>
                        </div>
                        <div class="text item">
                            <div class="word">联系方式: </div>
                            <div>{{ teacherInfo.tel }}</div>
                        </div>
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
        this.getTeacherInfo()
    },
    data() {
        return {
            teacherInfo: []
        }
    },
    methods: {
        // 返回后端传输到前端的图片地址
        getSrc(src) {
            return require('@/assets/' + src)
        },
        async getTeacherInfo() {
            let name = window.localStorage.getItem('token')
            const { data: res } = await this.$http.get("/teacherInfo?name=" + name)
            this.teacherInfo = res
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

#teacher-container {
    height: 100%;
    border: 0.1rem solid #c9c9c9;
    background: rgba(250, 250, 250, 1);

    .container {
        width: 80%;
        height: 80%;
        font-weight: 600;
        margin: 2rem auto;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.6666rem #c9c9c9;

        .text {
            font-size: 14px;
        }

        .item {
            margin-bottom: 18px;
            display: flex;

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