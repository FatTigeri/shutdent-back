<template>
    <div id="contest-container">
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>答题结束！！！</span>
            <div style="margin: 1.5625rem 0 0 0; letter-spacing: .125rem">恭喜, 本次得分: {{ score }}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 右侧栏的答题情况框提示 -->
        <div class="answerCard">
            <div class="answerCard_score clearfix">
                <span>总分</span><em>15</em>
            </div>

            <div class="topic_list">
                <h3 class="answerCard_tit clearfix active" @click="show3 = !show3">
                    <span class="fl">第1部分</span>
                    <em class="iconfont icon-xiangshang fr" v-show="show3"></em>
                    <em class="iconfont icon-xiangxia2 fr" v-show="!show3"></em>
                </h3>
                <el-collapse-transition>
                    <div class="Card_list" v-show="show3">
                        <div class="answerCard_list clearfix">
                            <i v-for="(item, i) in topic" :key="item.id" @click="go(i)">
                                <span :class="'list-count-' + i">{{ item.count }}<em></em></span>
                            </i>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>

        <div class="container">
            <!-- 头部内容 -->
            <div class="nav">
                <el-row :gutter="0" style="height: 100%">
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="height: 100%">
                        <!-- 头部内容一---答题信息 -->
                        <div class="nav-title">
                            <div class="accuracy">
                                <i class="el-icon-star-off"></i> 正确率 : {{ count }} / 15
                            </div>
                            <div class="score">
                                <i class="el-icon-star-off"></i> 得分 : {{ score }}
                            </div>
                            <div class="rate">
                                <i class="el-icon-star-off"></i> 目前排名: 2
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="height: 100%">
                        <!-- 头部内容一---当前答题次序 -->
                        <div class="nav-num">
                            <div class="number-box">
                                <div> 题 </div>
                                <div> 目 </div>

                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="height: 100%">
                        <div class="nav-timer">
                            <div class="timer">
                                <div>倒计时</div>
                                <div><i class="el-icon-timer"></i> {{ min }} 分 {{ sec }} 秒</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <!-- 主体内容部分 -->
            <div class="main-content-wrap" v-for="(item, i) in contestLists" :key="item.id">
                <div style="height: 60px;display: none;" :class="'topic-count-' + i"></div>
                <div class="content-topic">
                    <ul>
                        <li>
                            <span class="iconfont icon-zonghewendang"></span>
                            <div><span>{{ i + 1 + '.' }}</span> {{ item.topic }}</div>
                        </li>
                    </ul>
                </div>
                <!--  -->
                <div class="content-area">
                    <ul>
                        <li>
                            <el-input :class="'tar' + i" type="textarea" :rows="4" placeholder="请输入答案(直接输入结果即可)"
                                v-model="textareas[i]" :disabled="false" @keydown.native.enter="submit(i)">
                            </el-input>
                            <el-button :class="'sum' + i" type="primary" size="mini" @click="submit(i)">提交</el-button>
                        </li>
                    </ul>
                </div>
                <!--  -->
                <div :class="'answer-wrap-' + i + ' answer-wrap'" style="display: none">
                    <div>
                        <span :class="'answer' + i"></span>
                        <span>正确答案: {{ item.answer }}</span>
                    </div>
                    <div>
                        <span :class="'correct' + i">1.0 分</span>
                        <span :class="'error' + i">0.0 分</span>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="btn">
                <el-button type="primary" size="mini" @click="over">交卷</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { token } from '@/utils/config'
export default {
    name: 'contest',
    created() {
        this.initContest()
    },
    mounted() {
        const time = window.sessionStorage.getItem('time1') ? window.sessionStorage.getItem('time1') : 900000
        this.countdown(time)

        const _this = this
        setTimeout(function () {
            _this.getHeight()
        }, 500)
    },
    computed: {
        // 控制上一题按钮是否禁用变量
        isFirst() {
            return this.index === 0;
        },
        // 控制下一题按钮是否禁用变量
        isEnd() {
            return this.index === this.contestLists.length - 1;
        },
        // 计算用户当前得分
        score() {
            this.total = this.count * 1;
            return this.count * 1;
        }
    },
    data() {
        return {
            min: '',
            sec: '',
            // 接收页面的题目变量数组
            contestLists: [],
            // 用户答题框v-model绑定数组
            textareas: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '',],
            // 答对的题数
            count: 0,
            // 右侧固定框的题号数组
            topic: [
                { id: 1, count: 1 },
                { id: 2, count: 2 },
                { id: 3, count: 3 },
                { id: 4, count: 4 },
                { id: 5, count: 5 },
                { id: 6, count: 6 },
                { id: 7, count: 7 },
                { id: 8, count: 8 },
                { id: 9, count: 9 },
                { id: 10, count: 10 },
                { id: 11, count: 11 },
                { id: 12, count: 12 },
                { id: 13, count: 13 },
                { id: 14, count: 14 },
                { id: 15, count: 15 },
            ],
            // 控制右侧框折叠变量
            show3: true,
            // 控制模态框显示和隐藏
            dialogVisible: false,
            total: 0,
        }
    },
    methods: {
        // 初始化题目方法
        async initContest() {
            // 调用获取数据的接口
            const { data: res } = await this.$http.get('/getOlympiad', {
                params: {
                    "status": this.$route.params.status
                }
            })
            // 护数据赋值
            this.contestLists = res;
        },
        countdown(msec) {
            let min = parseInt(msec / 1000 / 60 % 60)
            let sec = parseInt(msec / 1000 % 60)
            this.min = min > 9 ? min : '0' + min
            this.sec = sec > 9 ? sec : '0' + sec
            const that = this
            if (min >= 0 && sec >= 0) {
                let timer = '';
                //倒计时结束关闭订单
                if (min == 0 && sec == 0) {
                    clearTimeout(timer);
                    this.min = '00';
                    this.sec = '00';
                    window.sessionStorage.removeItem('time1');
                    this.dialogVisible = true;
                    return
                }
                window.sessionStorage.setItem('time1', msec - 1000)
                timer = setTimeout(function () {
                    that.countdown(window.sessionStorage.getItem('time1'))
                }, 1000)
            }
        },
        // 动态获取不同设备高度方法
        getHeight() {
            // 获取导航栏的高度
            const header = document.querySelector('.el-header').offsetHeight
            // 获取设备可视高度
            const vh = document.documentElement.clientHeight || document.body.clientHeight || window.pageYOffset
            // 获取展示页面的DOM元素并进行赋值
            document.querySelector('#contest-container').style.minHeight = (vh - header) + 'px'
        },
        // 用户点击确定执行方法
        submit(id) {
            //若用户没有填入答案就提交着，提醒用户且结束该函数
            if (this.textareas[id] === '') {
                this.$message.error('请填入答案内容！')
                return;
            }
            // 使用Element-UI内置的方法进行本题提交的再确认
            this.$confirm('是否提交本题?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                document.querySelector('.answer-wrap-' + id).style.display = 'flex';
                document.querySelector('.answer' + id).innerHTML = '我的答案是: ' + this.textareas[id]
                if (this.textareas[id] === this.contestLists[id].answer) {
                    // 答对题数加一
                    this.count++;
                    // 本题的得分信息提示正确内容显示
                    document.querySelector('.correct' + id).style.display = 'block'
                    // 右侧固定答题框对应的题号显示背景颜色，绿色为正确
                    document.querySelector('.list-count-' + id).style.background = 'rgba(0,215,137,.3)'
                } else {
                    // 本题的得分信息提示错误内容显示
                    document.querySelector('.error' + id).style.display = 'block'
                    // 右侧固定答题框对应的题号显示背景颜色，绿色为正确
                    document.querySelector('.list-count-' + id).style.background = 'red'
                }

                // 当用户将该题进行确认提交后，对应的输入框元素消失
                document.querySelector('.tar' + id).parentElement.parentElement.parentElement.style.display = 'none';
                // 信息框提示
                this.$message({
                    type: 'success',
                    message: '答题成功!'
                });
            }).catch(() => {
                // 取消提交信息框提示
                this.$message({
                    type: 'info',
                    message: '再思考一下吧~'
                });
            });
        },
        // 用户点击右侧的题号自动跳转到对应的题目
        go(id) {
            for (let i = 0; i < 15; i++) {
                if (i === id) {
                    document.querySelector('.topic-count-' + id).style.display = 'block';
                } else {
                    document.querySelector('.topic-count-' + i).style.display = 'none';
                }
            }
            // 进行对应的页面滚动
            document.querySelector('.topic-count-' + id).scrollIntoView({ block: 'start', inline: 'start' });
        },
        // 关闭模态框
        handleClose() {
            // 自动结束答卷调用对应的接口
            this.over();
            // 
            this.$router.go(-1)
        },
        // 最下方的交卷按钮, 对本次的分数进行用户更新
        over() {
            // 调用更新用户分数的接口
            if (this.total !== 0) {                
                // 接口的调用
                this.$http.get('/updateScore', {
                    params: {
                        'score': this.total,
                        'username': token
                    }
                })
            }
            // 返回上一页
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
#contest-container {
    width: 100%;
    padding: 1.875rem;
    box-sizing: border-box;
    background: url(@/assets/skin-1024-bg.bd0d57de.gif);


    // 右侧栏的答题情况框提示样式
    .answerCard {
        position: fixed;
        // height: 16.3125rem;
        width: 10.625rem;
        top: 13rem;
        right: 0;
        font-size: .75rem;
        background: rgb(42, 42, 42);

        .answerCard_score {
            width: 10.625rem;
            height: 1.875rem;
            background: rgb(42, 42, 42);
            border-bottom: .0625rem solid rgb(58, 58, 58);

            span {
                float: left;
                font-size: 0.75rem;
                line-height: 1.875rem;
                margin-left: 0.9375rem;
                color: rgb(119, 119, 119);
            }

            em {
                float: right;
                font-size: 1rem;
                font-weight: 400;
                font-style: normal;
                line-height: 1.875rem;
                margin-right: 0.625rem;
                color: rgb(255, 255, 255);
            }
        }

        .topic_list {
            width: 10.625rem;
            // height: 14.375rem;

            .answerCard_tit {
                font-size: .75rem;
                font-weight: 400;
                text-align: center;
                height: 1.875rem;
                line-height: 1.875rem;
                color: rgb(255, 255, 255);
                letter-spacing: 0.0106rem;
                color: rgb(119, 119, 119);
                background: rgb(42, 42, 42);
                border-bottom: .0625rem solid rgb(58, 58, 58);
                cursor: pointer;

                span {
                    display: inline;
                    float: left;
                    margin-left: .9375rem;
                    color: rgb(119, 119, 119);
                }

                .fr {
                    float: right;
                    margin: .15rem 1.25rem 0 0;
                }
            }

            .Card_list {
                width: 100%;
                // height: 13.25rem;
                padding: .625rem .4375rem;
                background: #2a2a2a;
                border-bottom: .0625rem solid #3d3d3d;
                overflow: scroll;

                &::-webkit-scrollbar {
                    display: none
                }

                .answerCard_list {
                    color: #fff;
                    background: #2a2a2a;
                    border-bottom: .625rem solid #3d3d3d;

                    i {
                        font-style: normal;

                        span {
                            display: inline-block;
                            width: 1.5rem;
                            height: 1.5rem;
                            font-size: .75rem;
                            text-align: center;
                            position: relative;
                            line-height: 1.5rem;
                            border-radius: 1.5rem;
                            margin: 0 .875rem 1.8125rem;
                            color: rgb(255, 255, 255);
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .container {
        width: 90%;
        border-radius: .125rem;
        margin: 2.1875rem auto;
        background: rgb(255, 255, 255);

    }

    .nav {
        width: 90%;
        height: 7.5rem;
        margin: 0 auto;
        box-sizing: border-box;

        .nav-title,
        .nav-num,
        .nav-timer {
            height: 100%;
            box-sizing: border-box;
            padding: 0.5rem 0 0 0.5rem;
        }

        .nav-title {
            display: flex;
            font-size: .9375rem;
            font-weight: 500;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-around;

            div:nth-child(1) span {
                font-size: .75rem;
                font-weight: 500;
                margin: 0 0 0 1rem;
                color: rgb(21, 71, 135);
            }


            .rate {
                color: purple;
            }
        }

        .number-box {
            display: flex;
            width: 75%;
            height: 90%;
            margin: 0 auto;
            font-weight: 600;
            text-align: center;
            align-items: center;
            justify-content: center;

            div {
                width: 2.5rem;
                text-align: center;
            }
        }

        .timer {
            display: flex;
            width: 11.25rem;
            height: 5rem;
            margin: 0 auto;
            font-size: .875rem;
            align-items: center;
            color: rgb(21, 71, 135);
            justify-content: space-around;

            div:nth-child(2) {
                color: red;
                font-weight: 600;
            }
        }
    }

    .main-content-wrap {
        display: flex;
        width: 80%;
        margin: 1.25rem auto;
        flex-direction: column;
        justify-content: space-between;

        .content-topic {
            width: 100%;
            height: 7.5rem;

            ul {
                height: 100%;
                list-style: none;
                padding: 1.25rem;

                li {
                    display: flex;
                    height: 100%;
                    background: rgba(247, 248, 250);
                    border-radius: .625rem;
                    flex-direction: row;
                    align-items: center;
                    border: .0625rem solid #ccc;

                    .iconfont {
                        font-size: 1.5625rem;
                        margin: 0 1.25rem;
                        color: skyblue;
                    }
                }
            }
        }

        .content-area {
            width: 100%;
            height: 9.375rem;

            ul {
                height: 100%;
                list-style: none;
                padding: 1.25rem;

                li {
                    display: flex;
                    position: relative;
                    height: 100%;
                    background: rgba(247, 248, 250);
                    flex-direction: row;
                    align-items: center;
                    overflow: hidden;
                    border: .0625rem solid #ccc;

                    /deep/ .el-textarea__inner {
                        resize: none;
                        border: none;
                        outline: none;
                        padding: 2.5rem;
                    }

                    .el-button {
                        position: absolute;
                        bottom: .3125rem;
                        right: .3125rem;
                    }

                    span {
                        font-size: 1.5625rem;
                        margin: 0 1.25rem;
                        color: skyblue;
                    }
                }
            }
        }

        .answer-wrap {
            display: flex;
            min-height: 1.25rem;
            line-height: 1.25rem;
            padding: 1rem 1.25rem;
            margin-top: 1rem;
            flex-direction: row;
            font-weight: bold;
            justify-content: space-between;
            border: solid #F0F3F7 1px;
            border-left: .3125rem solid #e1e7f0;
            margin-left: 1.25rem;

            div:nth-child(1) {
                width: 35%;
                display: flex;
                font-size: .8125rem;
                flex-direction: row;
                justify-content: space-between;

                span:nth-child(2) {
                    color: green;
                }
            }

            div:nth-child(2) span {
                display: none;
            }
        }
    }
}



.btn {
    display: flex;
    width: 25%;
    margin: .625rem auto;
    justify-content: center;
}
</style>