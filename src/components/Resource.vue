<template>
    <div id="resource-container">
        <el-container>
            <el-row :gutter="0" style="height: 100%;">
                <!-- 侧边栏内容 -->
                <el-col :xs="0" :sm="3" style="height: 100% !important;">
                    <el-aside>
                        <ul>
                            <li>
                                <a href="/math/resource/classes" :class="{ actived: cur === 0 }" @click="change(0)">
                                    <span class="iconfont icon-ketang"></span> 优质课堂
                                </a>
                            </li>
                            <li>
                                <a href="/math/resource/examination" :class="{ actived: cur === 1 }" @click="change(1)">
                                    <span class="iconfont icon-fenshijuan"></span> 试卷真题
                                </a>
                            </li>
                        </ul>
                    </el-aside>
                </el-col>
                <!-- 右侧内容搜索行 -->
                <el-col :xs="24" :sm="21" style="height: 100% !important;">
                    <el-main>
                        <div class="choice">
                            <el-row :gutter="0">
                                <div class="grade">
                                    <el-col :xs="0" :sm="2">
                                        <div><i>年级:</i></div>
                                    </el-col>
                                    <el-col :xs="24" :sm="22">
                                        <el-radio-group v-model="grade">
                                            <el-radio :label="1">一年级</el-radio>
                                            <el-radio :label="2">二年级</el-radio>
                                            <el-radio :label="3">三年级</el-radio>
                                            <el-radio :label="4">四年级</el-radio>
                                            <el-radio :label="5">五年级</el-radio>
                                            <el-radio :label="6">六年级</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </div>
                            </el-row>
                            <el-row :gutter="0">
                                <div class="type">
                                    <el-col :xs="0" :sm="2">
                                        <div><i>类型:</i></div>
                                    </el-col>
                                    <el-col :xs="24" :sm="22">
                                        <el-radio-group v-model="type">
                                            <el-radio :label="1">课堂知识</el-radio>
                                            <el-radio :label="2">考试时解</el-radio>
                                            <el-radio :label="3">名人故事</el-radio>
                                            <el-radio :label="4">趣味数学</el-radio>
                                            <el-radio :label="5">考点总结</el-radio>
                                            <el-radio :label="6">解题技巧</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </div>
                            </el-row>
                            <el-row :gutter="0">
                                <div class="other">
                                    <el-col :xs="0" :sm="2">
                                        <div><i>其他:</i></div>
                                    </el-col>
                                    <el-col :xs="12" :sm="8">
                                        <el-radio-group v-model="other">
                                            <el-radio :label="1">好评率</el-radio>
                                            <el-radio :label="2">点击率</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col :xs="12" :sm="14">
                                        <div class="btns">
                                            <el-button size="mini" type="primary" @click="submit">确定</el-button>

                                        </div>
                                    </el-col>
                                </div>
                            </el-row>
                        </div>
                        <div class="contents">
                            <router-link to="/math/resource/classes"></router-link>
                            <router-view></router-view>
                        </div>
                    </el-main>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'resource',
    mounted() {
        // 动态设置不同设备不同高度
        const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const header = document.querySelector('.el-header').offsetHeight
        document.querySelector('#resource-container').style.height = (vh - header - 3) + 'px'
    },
    data() {
        return {
            // 获取当前控制左侧侧边栏样式的变量cur
            cur: window.sessionStorage.getItem('cur') === null ? 0 : parseInt(window.sessionStorage.getItem('cur')),
            // 试卷年级变量
            grade: 1,
            // 试卷类型变量
            type: 1,
            // 试卷点击率 / 好评率变量
            other: 1,
            // 用户搜索框内容变量
            input: '',
            // 试卷年级数组
            grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
            // 试卷类型数组
            types: ['课堂知识', '考试时解', '名人故事', '趣味数学', '考点总结', '解题技巧'],
            // 试卷搜索方式数组
            others: ['rate', 'popular']
        }
    },
    methods: {
        // 改变侧边栏的索引位置
        change(index) {
            window.sessionStorage.setItem('cur', index)
        },
        // 用户进行试卷搜索功能
        async submit() {
            const { data: res } = await this.$http.get('/searchPages', {
                params: {
                    "grade": this.grades[this.grade - 1],
                    "type": this.types[this.type - 1],
                    "other": this.others[this.other - 1]
                }
            })

            // 将当前页数更新为1
            this.cur = 1

            this.$store.commit('setPageList', res)
            this.$store.commit('setGrade', this.grade)
            // 使用中间组件进行当前页面数据的刷新
            this.$router.replace("/math/resource/back/")
        }
    }
}
</script>

<style lang="less" scoped>
@media (min-width: 345px) and (max-width: 768px) {

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

    .search-btn {
        display: none;
    }

}

// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {
    html {
        font-size: 12px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

    .search-btn {
        display: none;
    }

}

// 当用户的手机屏幕小于992px但大于758px时，对应的字体大小为13px
@media (min-width: 768px) and (max-width: 992px) {
    html {
        font-size: 12px;
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
        font-size: 13px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }



}

// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) and (max-width: 1279.9px) {
    html {
        font-size: 14px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }
}

@media (min-width:1280px) and (max-width: 1399.9px) {
    html {
        font-size: 15px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }
}

@media (min-width: 1399.9px) and (max-width: 1559.9px) {
    html {
        font-size: 16px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

}

@media(max-width: 2059.9px) and (min-width: 1560px) {
    html {
        font-size: 22.5px;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

}

#resource-container {
    width: 100%;

    .el-container {
        height: 100%;
    }

    /deep/ .el-radio__label {
        font-size: .875rem;
    }

    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    // 侧边栏样式
    .el-aside {
        width: 100% !important;
        height: 100%;
        color: #333;
        text-align: center;
        box-shadow: 0 0 0.6666rem #c9c9c9;

        // 侧边栏ul标签样式
        ul {
            display: flex;
            list-style: none;
            flex-direction: column;
            justify-content: space-between;
            height: 60%;

            // 侧边栏li标签样式
            li {
                display: table;
                width: 90%;
                height: 10.3%;
                font-weight: 600;
                margin: auto;

                // 侧边狼a链接标签样式
                a {
                    position: relative;
                    display: table-cell;
                    vertical-align: middle;
                    width: 90%;
                    height: 30%;
                    top: 50%;
                    left: 50%;
                    color: #800080;
                    border-radius: 1rem;
                    line-height: 2.09333rem;
                    text-decoration: none;
                    transform: translate(-50%, -50%);
                }

                // 侧边栏a标签被选中时样式
                .actived {
                    border-radius: 1rem;
                    background: rgba(20, 116, 202, 0.1);
                }
            }
        }
    }

    .el-main {
        width: 100%;
        color: #333;
        padding: 1rem !important;
        margin: 0 0 0 0 !important;

        .choice {
            width: 98%;
            height: 22%;
            text-align: left;
            font-size: 0.9rem;
            font-weight: 600;
            padding: 0.333rem;

            .el-row {
                height: 30%;
            }

            i {
                margin: 0 1rem 0 0;
            }

            .grade,
            .type,
            .other {
                width: 100%;
                height: 100%;
                display: flex;
                justify-items: center;
                align-content: center;
                align-items: center;

                .el-radio {
                    margin-right: 1rem;
                }

                .el-button {
                    margin: 0 0 0 2rem;
                }


            }

            .btns {
                display: flex;
                justify-content: space-between;
            }
        }

        .contents {
            width: 98%;
            height: 75%;
            border-radius: 0.65rem;
            box-shadow: 0 0 0.6666rem #c9c9c9;
        }
    }

    body>.el-container {
        margin-bottom: 2.5rem;
    }
}
</style>