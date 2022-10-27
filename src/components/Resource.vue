<template>
    <div id="resource-container">
        <el-container>
            <!-- 侧边栏内容 -->
            <el-aside width="140px">
                <ul>
                    <li><a href="#" :class="{ actived: cur === 0 }" @click="change(0)">优质课堂</a></li>
                    <li><a href="#/math/resource/examination" :class="{ actived: cur === 1 }" @click="change(1)">试卷真题</a></li>
                    <li><a href="#" :class="{ actived: cur === 2 }" @click="change(2)">巩固提升</a></li>
                </ul>
            </el-aside>
            <el-main>
                <div class="choice">
                    <div class="grade">
                        <i>年级:</i>
                        <el-radio-group v-model="grade">
                            <el-radio :label="1">一年级</el-radio>
                            <el-radio :label="2">二年级</el-radio>
                            <el-radio :label="3">三年级</el-radio>
                            <el-radio :label="4">四年级</el-radio>
                            <el-radio :label="5">五年级</el-radio>
                            <el-radio :label="6">六年级</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="type">
                        <i>类型:</i>
                        <el-radio-group v-model="type">
                            <el-radio :label="1">课堂知识</el-radio>
                            <el-radio :label="2">考试时解</el-radio>
                            <el-radio :label="3">名人故事</el-radio>
                            <el-radio :label="9">名人故事</el-radio>
                            <el-radio :label="4">趣味数学</el-radio>
                            <el-radio :label="5">考点总结</el-radio>
                            <el-radio :label="6">解题技巧</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="other">
                        <i>其他:</i>
                        <el-radio-group v-model="other">
                            <el-radio :label="1">好评率</el-radio>
                            <el-radio :label="2">点击率</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="contents">
                    <router-link to="/math/resource/examination"></router-link>
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'resource',
    data() {
        return {
            cur: 1,
            grade: 1,
            type: 1,
            other: 1,
            input: ''
        }
    },
    methods: {
        change(index) {
            this.cur = index
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

    .el-notification,
    .left,
    .right {
        background: white !important;
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

#resource-container {
    width: 100%;
    height: 532px;

    .el-container {
        height: 100%;
        display: flex !important;
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
        height: 100%;
        color: #333;
        text-align: center;
        box-shadow: 0 0 0.6666rem #c9c9c9;

        // 侧边栏ul标签样式
        ul {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 60%;

            // 侧边栏li标签样式
            li {
                width: 90%;
                height: 33.3%;
                font-weight: 600;
                margin: auto;

                // 侧边狼a链接标签样式
                a {
                    position: relative;
                    display: block;
                    width: 90%;
                    height: 30%;
                    top: 50%;
                    left: 50%;
                    color: purple;
                    border-radius: 1rem;
                    line-height: 31.4px;
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
        color: #333;

        .choice {
            width: 98%;
            height: 22%;
            text-align: left;
            font-size: 0.9rem;
            font-weight: 600;
            padding: 0.333rem;

            i {
                margin: 0 1rem 0 0;
            }

            .grade,
            .type,
            .other {
                height: 30%;
                line-height: 35.59px;

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
        margin-bottom: 40px;
    }
}
</style>