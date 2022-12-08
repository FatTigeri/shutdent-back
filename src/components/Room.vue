<template>
    <!-- 希冀数学涨知识页面 -->
    <div id="room-container">
        <el-row :gutter="0" style="height: 100%;">
            <!-- 左侧内容响应式布局 -->
            <el-col :xs="0" :sm="6" style="height: 100%">
                <!-- (一) 左侧内容(包含小游戏和技能提升链接) -->
                <div class="left-aside">
                    <!-- 1.1 小游戏内容 -->
                    <div class="games">
                        <div class="aside-text1">小游戏</div>
                        <!-- 1.1.1 小游戏罗列展示 -->
                        <div class="contents1">
                            <el-row :gutter="20" style="height: 100%">
                                <ul>
                                    <li><a href="/static/index1.html"><img src="@/assets/game1.webp" alt="blank"></a>
                                    </li>
                                    <li><a href="/static/2048.html"><img src="@/assets/game2.webp" alt="blank"></a></li>
                                    <li><a href="/static/labyrinth.html"><img src="@/assets/mg-map1.svg"
                                                alt="blank"></a></li>
                                    <li><a href="/static/snake.html"><img src="@/assets/snake.webp" alt="blank"></a>
                                    </li>
                                    <li><a href="/static/word.html"><img src="@/assets/word.webp" alt="blank"></a></li>
                                    <li><a href="/static/Tiger.html"><img src="@/assets/tiger.webp" alt="blank"></a>
                                    </li>
                                    <li><a href="/static/bird.html"><img src="@/assets/bird.webp" alt="blank"></a></li>
                                    <li><a href="/static/number.html"><img src="@/assets/number.jpg" alt="blank"></a>
                                    </li>
                                    <li><a href="/static/white.html"><img src="@/assets/white.png" alt="blank"></a></li>
                                </ul>
                            </el-row>
                        </div>
                    </div>
                    <!-- 1.2 技能提升内容 -->
                    <div class="skills">
                        <!-- 1.2.1 技能大闯关罗列展示 -->
                        <div class="contents2">
                            <el-row :gutter="20" style="height: 100%">
                                <ul>
                                    <li><a href="/math/contest"><i class="el-icon-tickets"></i>奥数竞赛抢答题</a></li>
                                    <li><a href="/math/contest"><i class="el-icon-document-remove"></i>趣味数学抢答题</a>
                                    </li>
                                    <li><a href="/math/contest"><i class="el-icon-document"></i>知识巩固通关题</a></li>
                                </ul>
                            </el-row>
                        </div>
                        <div class="aside-text2">技能大闯关</div>
                    </div>
                </div>
            </el-col>
            <!-- 中间内容响应式布局 -->
            <el-col :xs="24" :sm="13" style="height: 100%">
                <!-- (二) 中间内容(最具体的希冀数学知识展示区域) -->
                <div class="main">
                    <div class="text">希冀数学涨知识</div>
                    <div class="resources-item">
                        <div class="title1">
                            <a href="javascript:void(0)" alt="blank">猜你喜欢 <i class="el-icon-d-arrow-right"></i></a>
                        </div>
                        <!-- 2.1 猜你喜欢内容，主要是根据用户的爱好进行资源的推荐 -->
                        <div class="item1">
                            <el-row :gutter="20">
                                <ul>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li @click="player(1)">
                                            <a href="javascript:void(0)"><img src="@/assets/math_course1.jpg"
                                                    alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li @click="player(2)">
                                            <a href="javascript:void(0)"><img src="@/assets/math_course2.jpg"
                                                    alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li @click="player(3)">
                                            <a href="javascript:void(0)"><img src="@/assets/math_course3.jpg"
                                                    alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li @click="player(4)">
                                            <a href="javascript:void(0)"><img src="@/assets/math_course4.jpg"
                                                    alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li @click="player(5)">
                                            <a href="javascript:void(0)"><img src="@/assets/math_course5.jpg"
                                                    alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li @click="player(6)">
                                            <a href="javascript:void(0)"><img src="@/assets/math_course6.jpg"
                                                    alt="blank"></a>
                                        </li>
                                    </el-col>
                                </ul>
                            </el-row>
                        </div>
                        <div class="title1">
                            <a href="javascript:void(0)" alt="blank">数学名人馆 <i class="el-icon-d-arrow-right"></i></a>
                        </div>
                        <!-- 2.2 数学名人堂内容，对数学家进行对应的详细介绍 -->
                        <div class="item1">
                            <el-row :gutter="20">
                                <ul>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math5.jpg" alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math6.jpg" alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math7.png" alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math8.png" alt="blank"></a>
                                        </li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course2.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course2.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                </ul>
                            </el-row>
                        </div>
                        <div class="title1">
                            <a href="javascript:void(0)" alt="blank">不一样的数学<i class="el-icon-d-arrow-right"></i></a>
                        </div>
                        <!-- 2.3 不一样的数学内容，进行课外数学知识的拓展 -->
                        <div class="item1">
                            <el-row :gutter="20">
                                <ul>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course2.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course2.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course1.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course1.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course3.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="8" :lg="4">
                                        <li><a href="javascript:void(0)"><img src="@/assets/math_course2.jpg"
                                                    alt="blank"></a></li>
                                    </el-col>
                                </ul>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <!-- 右侧内容响应式布局 -->
            <el-col :xs="0" :sm="5" style="height: 100%">
                <div class="right-aside">
                    <!-- 3.1 用户积分榜（降序展示用户信息） -->
                    <div class="ranking">
                        <div class="rank-text">积分排行榜</div>
                        <el-table v-loading="loading" element-loading-text="数据拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(250, 250, 250, 0.8)" :data="tableData" style="width: 100%"
                            stripe>
                            <!-- 3.1.1 用户的ID展示 -->
                            <el-table-column label="ID" width="48">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.id }}</span>
                                </template>
                            </el-table-column>
                            <!-- 3.1.2 用户的名字以及鼠标悬浮到该区域，进行信息的展示 -->
                            <el-table-column label="姓名" width="125">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>姓名: {{ scope.row.username }}</p>
                                        <p>积分: {{ scope.row.score }} 分</p>
                                        <div slot="reference" class="name-wrapper">
                                            <i class="el-icon-user-solid"></i>
                                            <el-tag size="medium">{{ scope.row.username }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <!-- 3.1.3 用户的得分展示 -->
                            <el-table-column label="得分">
                                <template slot-scope="scope">
                                    <i class="el-icon-aim"></i>
                                    <span style="margin-left: 10px">{{ scope.row.score }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'room',
    created() {
        this.getTableDatas()
    },
    mounted() {
        const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const header = document.querySelector('.el-header').offsetHeight
        document.querySelector('#room-container').style.height = (vh - header - 10) + 'px'
    },
    methods: {
        // 获取用户积分数据方法
        async getTableDatas() {
            const { data: res } = await this.$http.get("/getUsers")
            this.tableData = res
            // 2s后将对应的数据进行展示
            setTimeout(() => {
                this.loading = false
            }, 2000)

            // 封装对应的方法把对象进行排序
            function objectSort(property) {
                return function (Obj1, Obj2) {
                    return Obj2[property] - Obj1[property]
                }
            }
            // 方法调用
            this.tableData.sort(objectSort("score"))
        },
        // 视频播放功能
        player(id) {
            this.$router.push("/math/video/" + id + "/" + id)
        }

    },
    data() {
        return {
            // 用户数据变量
            tableData: [],
            // 懒加载变量
            loading: true
        };
    },
}
</script>

<style lang="less" scoped>
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {

    html,
    #home-container {
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
        font-size: 13px;
    }
}

// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) and (max-width: 1279.9px) {
    html {
        font-size: 14px;
    }
}

@media (min-width:1280px) and (max-width: 1399.9px) {
    html {
        font-size: 14px;
    }
}

@media (min-width: 1399.9px) and (max-width: 1559.9px) {
    html {
        font-size: 16px;
    }
}

@media(max-width: 2059.9px) and (min-width: 1560px) {
    html {
        font-size: 23.5px;
    }
}




* {
    margin: 0;
    padding: 0;
}

body,
html {
    width: 100%;
    height: 100%;
}

// room页面的root标签样式
#room-container {
    box-sizing: border-box;

    // 左侧边框的样式
    .left-aside {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        // 小游戏和技能提升样式
        .games,
        .skills {
            display: flex;
            width: 90%;
            height: 45%;
            margin: 0 auto;
            border-radius: 0.4444rem;
            box-shadow: 0 0 0.6666rem #c9c9c9;
            border: 0.10000rem solid rgb(92, 48, 21);
        }

        // 文字信息1样式
        .aside-text1 {
            width: 1.5033rem;
            height: 100%;
            font-weight: 700;
            line-height: 500%;
            text-align: center;
            color: rgb(92, 48, 21);
        }

        .contents1 {
            width: 90%;
            height: 100%;

            ul {
                display: flex;
                width: 100%;
                height: 100%;
                list-style: none;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-evenly;

                li {
                    width: 30%;
                    height: 30%;
                    text-align: center;

                    img {
                        width: 70%;
                        margin: 0 auto;

                    }

                }
            }
        }

        // 具体的游戏链接样式
        .contents2 {
            width: 90%;
            height: 100%;

            ul {
                display: flex;
                width: 100%;
                height: 100%;
                padding: 0.0633rem;
                list-style: none;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-around;

                li {
                    width: 80%;
                    height: 16%;
                    font-weight: 600;
                    text-align: center;
                    border-radius: 0.666rem;
                    box-shadow: 0 0 0.8888rem rgba(92, 48, 21, 0.5);


                    a {
                        display: flex;
                        width: 80%;
                        height: 100%;
                        margin: 0 auto;
                        align-items: center;
                        color: rgb(92, 48, 21);
                        text-decoration: none;
                        letter-spacing: 0.266666rem;
                    }

                }
            }
        }

        // 文字信息2样式
        .aside-text2 {
            width: 1.5033rem;
            height: 100%;
            font-weight: 700;
            line-height: 310%;
            text-align: center;
            color: rgb(92, 48, 21);
            // border-left: 0.10000rem solid rgb(92, 48, 21);
        }

    }

    // 中间边框样式
    .main {
        width: 100%;
        height: 100%;

        // 中间区域文字信息样式
        .text {
            font-weight: 700;
            margin: 0.5555rem;
            text-align: center;
            font-size: 1.333rem;
            color: rgb(92, 48, 21);
        }

        // 中间区域具体选项样式
        .resources-item {
            height: 90%;
            width: 97%;
            margin: 0 auto;
            border-radius: 0.3333rem;
            border: 0.0666rem solid #c9c9c9;
            box-shadow: 0 0 0.6666rem #c9c9c9;

            // 不同推荐-标题内容样式
            .title1 {
                height: 10%;
                text-align: left;

                // 不同推荐-标题链接内容样式
                a {
                    display: block;
                    height: 95%;
                    font-size: 0.9333rem;
                    padding: 0.533333rem;
                    text-decoration: none;
                    line-height: 2.866666rem;
                    color: rgb(92, 48, 21);
                }
            }

            // 不同内容-课程图片和文字介绍样式
            .item1 {
                width: 100%;

                // 资源推荐总内容包括框样式
                ul {
                    width: 100%;
                    height: 100%;
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    justify-items: center;
                    justify-content: space-around;
                    margin-bottom: 0.333rem;

                    // 不同推荐个课程包括框样式
                    li {
                        position: relative;
                        width: 98%;
                        font-size: 0.8rem;
                        text-align: left;
                        margin-bottom: 0.26666rem;
                        border-radius: 0.33333rem;
                        // border: 0.088888rem solid rgb(92, 48, 21);

                        // 使用伪元素进行布局样式
                        &::before {
                            display: none;
                            position: absolute;
                            content: '';
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, .4) url(@/assets/arr.png) no-repeat center;
                            background-size: 2rem;
                        }

                        // 当用户鼠标经过时显示伪元素的内容
                        &:hover::before {
                            display: block;
                        }

                        // 不同内容的文字介绍样式
                        a {
                            display: block;
                            color: purple;
                            margin: 0.13333rem;
                        }

                        // 课程图片样式
                        img {
                            width: 100%;
                            box-shadow: 5px 5px 8px #888888;
                        }
                    }
                }
            }

        }
    }

    // 右侧边框样式
    .right-aside {
        width: 100%;
        height: 100%;

        // 积分排行榜样式
        .ranking {
            position: relative;
            width: 95%;
            height: 99%;
            top: 51%;
            left: 50%;
            transform: translate(-50%, -50%);
            // box-shadow: 0 0 0.6666rem #c9c9c9;

            // 积分排行榜文字信息样式
            .rank-text {
                text-align: center;
                font-weight: 700;
                padding: 0.4444rem;
                color: rgb(92, 48, 21);

            }

            // table标签每一行的高度样式
            /deep/ .el-table tr {
                height: 3.3333rem;
                font-weight: 700;
            }
        }
    }

}
</style>