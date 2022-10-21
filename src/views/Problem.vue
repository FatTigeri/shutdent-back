<template>
    <el-row :gutter="0" style="height: 100%;">
        <el-col :xs="24" style="height: 99%;">
            <div id="problem-container">
                <!-- 内容盒子 -->
                <div class="content-box">
                    <!-- 搜索框盒子 -->
                    <div class="search-box">
                        <div class="search">
                            <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input2">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </div>

                    <div class="problems-box">
                        <!-- 学生问题内容显示 -->
                        <ul>
                            <li>
                                <div class="problem">
                                    <i>问:</i>&nbsp;&nbsp;
                                    <span>三角形的内和为多少?</span>
                                </div>
                                <div class="type">
                                    <span>三角形</span>
                                    <span>三角内角和</span>
                                    <span>六年级</span>
                                </div>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <div class="pagination">
                                <el-button type="primary" icon="el-icon-arrow-left" size="mini"></el-button>
                                <el-button type="primary" size="mini"><i class="el-icon-arrow-right el-icon--right"></i>
                                </el-button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'problem',
    data() {
        return {
            input2: ''
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

    .contents {
        height: 100% !important;
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

#problem-container {
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border: 0.1rem solid #c9c9c9;
    background: rgba(250, 250, 250, 1);

    .content-box {
        width: 100%;
        height: 100%;

        .search-box {
            width: 100%;
            height: 12%;
            line-height: 49.66px;
            box-sizing: border-box;

            .search {
                width: 70%;
                margin: 0 auto;
            }
        }

        .problems-box {
            width: 100%;
            height: 88%;
            box-sizing: border-box;

            ul {
                position: relative;
                width: 85%;
                height: 90%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                list-style: none;
                border: 1px solid red;

                li {
                    width: 100%;
                    height: 17%;
                    box-sizing: border-box;
                    border: 1px solid black;

                    .problem {
                        width: 100%;
                        height: 60%;
                        text-align: left;
                        font-size: 14px;
                        line-height: 30.88px;
                        margin: 0 0.5rem;
                        box-sizing: border-box;
                        color: rgb(212, 39, 97);
                    }

                    .type {
                        width: 100%;
                        height: 40%;
                        font-size: 12px !important;
                        text-align: left;
                        box-sizing: border-box;

                        span {
                            display: inline-block;
                            margin: 0.09rem 0.5rem;
                            box-sizing: border-box;
                        }

                        span:nth-child(1),
                        span:nth-child(2) {
                            color: green;
                            border: 0.1rem solid green;
                        }

                        span:nth-child(3) {
                            color: purple;
                            border: 0.1rem solid purple;
                        }
                    }
                }

                // 分页按钮样式
                .pagination {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    margin-top: 0.7rem;
                    color: rgb(0, 66, 149);
                }
            }
        }
    }
}
</style>