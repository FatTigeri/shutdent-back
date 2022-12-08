<template>
    <div id="contest-container">
        <div class="container">
            <!-- 头部内容 -->
            <div class="nav">
                <el-row :gutter="0" style="height: 100%">
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="height: 100%">
                        <!-- 头部内容一---答题信息 -->
                        <div class="nav-title">
                            <div class="accuracy">
                                <i class="el-icon-star-off"></i> 正确率 : 12 / 15 <span>(选择题2分 填空题3分)</span>
                            </div>
                            <div class="score">
                                <i class="el-icon-star-off"></i> 得分 : 24
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
                                <div>第</div>
                                <div>一</div>
                                <div>题</div>
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
            <div class="contents">
                <div class="content-title">奥数竞赛抢答题 <span>总题数: 15</span></div>
                <div class="content-name">
                    <div class="title">1. 下面哪个是企业法人资格的解释( )。</div>
                    <el-radio-group v-model="radio">
                        <div class="option"><el-radio :label="3">A. 有必要的财产或经费</el-radio></div>
                        <div class="option"> <el-radio :label="6">B. 其余选项都是</el-radio></div>
                        <div class="option"><el-radio :label="9">C. 要依法成立，符合国家和社会利益的要求</el-radio></div>
                        <div class="option"><el-radio :label="12">D. 要有自己的名称，组织机构和场所，能够独立承担民事责任</el-radio></div>
                    </el-radio-group>
                    <div class="content-score">本题总得分 <span>1分</span></div>
                </div>
            </div>

            <div class="btn">
                <el-button size="mini">上一题</el-button>
                <el-button type="primary" size="mini">下一题</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contest',
    mounted() {
        const time = window.sessionStorage.getItem('time1') ? window.sessionStorage.getItem('time1') : 480000
        this.countdown(time)

        const _this = this
        setTimeout(function () {
            _this.getHeight()
        }, 500)
    },
    data() {
        return {
            min: '',
            sec: '',
            radio: 0
        }
    },
    methods: {
        countdown(msec) {
            let min = parseInt(msec / 1000 / 60 % 60)
            let sec = parseInt(msec / 1000 % 60)
            this.min = min > 9 ? min : '0' + min
            this.sec = sec > 9 ? sec : '0' + sec
            const that = this
            if (min >= 0 && sec >= 0) {
                //倒计时结束关闭订单
                if (min == 0 && sec == 0) {
                    this.min = '00'
                    this.sec = '00'
                    window.sessionStorage.removeItem('time1')

                    this.$message.error('答题结束！！！')

                    return
                }
                window.sessionStorage.setItem('time1', msec - 1000)
                setTimeout(function () {
                    that.countdown(window.sessionStorage.getItem('time1'))
                }, 1000)
            }

        },
        getHeight() {
            // 获取导航栏的高度
            const header = document.querySelector('.el-header').offsetHeight
            console.log(header);
            // 获取设备可视高度
            const vh = document.documentElement.clientHeight || document.body.clientHeight || window.pageYOffset
            console.log(vh);
            // 获取展示页面的DOM元素并进行赋值
            document.querySelector('#contest-container').style.height = (vh - header) + 'px'
        }
    }
}
</script>

<style lang="less" scoped>
#contest-container {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;

    .container {
        width: 100%;
    }

    .nav {
        width: 100%;
        height: 120px;
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
            font-size: 15px;
            font-weight: 500;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-around;

            div:nth-child(1) span {
                font-size: 12px;
                font-weight: 500;
                color: rgb(21, 71, 135);
                margin: 0 0 0 1rem;
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
            justify-content: space-around;
        }

        .timer {
            display: flex;
            width: 180px;
            height: 80px;
            margin: 0 auto;
            font-size: 14px;
            align-items: center;
            color: rgb(21, 71, 135);
            justify-content: space-around;

            div:nth-child(2) {
                color: red;
                font-weight: 600;
            }
        }
    }

    .contents {
        width: 100%;
        padding: 1rem;
        margin: 1.0rem 0 0 0;
        box-sizing: border-box;

        .content-title {
            font-weight: 600;
            box-sizing: border-box;

            span {
                margin: 0 0 0 8.5rem;
            }
        }

        .content-name {
            width: 100%;
            padding: 1rem;
            font-weight: 500;
            margin: 1rem 0 0 0;
            box-sizing: border-box;

            .option {
                margin: 1rem;
            }

            .content-score {
                font-size: 13px;
                color: rgba(0, 0, 0, .6);

                span {
                    margin: 0 0 0 2rem;
                }
            }
        }
    }

    .btn {
        display: flex;
        width: 25%;
        margin: 0 auto;
        justify-content: space-between;
    }
}
</style>