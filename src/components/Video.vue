<template>
    <el-row :gutter="0">
        <div id="video-container">
            <el-col :xs="24" :sm="17" :md="17" :lg="17">
                <div class="functions-fix">
                    <ul>
                        <!-- 返顶 -->
                        <li @click="to"><i class="el-icon-caret-top"></i> 返顶</li>
                    </ul>
                </div>

                <div class="video-box" @click="update">
                    <video-player
                        style="width: 85%;height: 100%;margin:1rem auto;box-shadow:0.3125rem 0.3125rem 0.5rem #888888"
                        class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                        :options="playerOptions">
                    </video-player>

                    <div class="course-info">
                        <div class="teacher-img">
                            <img :src="circleUrl" alt="blank">
                        </div>
                        <div class="course" v-for="item in course" :key="item.cid">
                            <div class="teacher">
                                授课人: {{ item.tname }}
                            </div>
                            <div class="content">
                                课程简介: {{ item.contents }}
                            </div>
                        </div>
                    </div>

                    <div class="video-info">
                        <span><strong>评论</strong></span>
                        <span>{{ numbers }}</span>
                        <span>最热</span>
                        <span> | </span>
                        <span>最新</span>
                    </div>
                    <!-- 用户评论发表 -->
                    <div class="comments">
                        <div class="user">
                            <img :src="circleUrl" alt="blank" v-if="this.$store.state.flag === true">
                            <img :src="getSrc('' + this.$store.state.imgSrc)" alt="blank" v-else>
                        </div>
                        <div class="input">
                            <el-input v-model="input" placeholder="发一条友善的评论" @keydown.enter.native="submit">
                            </el-input>
                        </div>
                        <div class="button">
                            <el-button type="primary" @click="submit">发布</el-button>
                        </div>
                    </div>

                    <!-- 视频评论展示(响应式布局) -->
                    <div class="comment-box" v-for="item in comments" :key="item.id">
                        <!-- 评论头像盒子 -->
                        <el-row :gutter="0">
                            <el-col :xs="4" :sm="4" :md="3" :lg="3" :xl="3">
                                <div class="user-box">
                                    <img :src="getSrc('' + item.avatar)" alt="blank">
                                </div>
                            </el-col>
                            <!-- 评论内容信息 -->
                            <el-col :xs="20" :sm="20" :md="21" :lg="21" :xl="21">
                                <div class="infos-box">
                                    <!-- 评论者名称 -->
                                    <div class="name">{{ item.author }}</div>
                                    <!-- 评论内容 -->
                                    <div class="infos">
                                        <div class="text">{{ item.comments }}</div>
                                    </div>
                                    <!-- 评论日期 -->
                                    <div class="date">
                                        <span>{{ item.date }}</span>
                                        <span class="iconfont icon-dianzan" @click="like">点赞</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 底部的信息提示 -->
                    <el-row :gutter="0">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="reply-end">没有更多评论</div>
                            <div class="reply-end-mask"></div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <el-col :xs="0" :sm="7" :md="7" :lg="7">
                <div class="video-wrap">
                    <div class="text">
                        <h4>猜你喜欢</h4>
                    </div>
                    <ul>
                        <el-row :gutter="0">
                            <li v-for="item in List" :key="item.cid">
                                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                                    <div class="img">
                                        <img :src="getCover(item.cover)" alt="blacnk">
                                    </div>
                                </el-col>
                                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                                    <div class="information">
                                        <div>{{ item.contents }}</div>
                                        <div>
                                            <i class="el-icon-video-play"> {{ item.click }} 次</i>
                                            <i class="el-icon-chat-line-square"> 0 </i>
                                        </div>
                                    </div>
                                </el-col>
                            </li>
                        </el-row>
                    </ul>
                </div>
            </el-col>
        </div>
    </el-row>
</template>

<script>
import { toTop } from '@/utils/scrollTop.js'
import { scrollTop } from '@/utils/scrollTop.js'
export default {
    name: 'videos',
    created() {
        this.initCourse()
        this.initCourseList()
        this.getComments()
    },
    mounted() {
        window.addEventListener('scroll', function () {
            scrollTop('.functions-fix')
        })
    },
    computed: {
        // 计算返回的评论数
        numbers() {
            return this.comments.length;
        }
    },
    data() {
        return {
            course: {},
            // 用户评论内容变量
            textarea: '',
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",
                    src: "http://1.12.235.213/media/" + this.$route.params.url + ".mp4" //url地址
                }],
                poster: "", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            // 用户输入的评论内容变量
            input: '',
            // 推荐课程列表
            courseLists: [],

            List: [],
            // 评论列表
            comments: []
        }
    },
    methods: {
        // 初始化页面课程方法
        async initCourseList() {
            // 调用接口，获取course表的全部内容
            const { data: res } = await this.$http.get('/getCourse')
            // 对总课程变量进行赋值
            this.courseLists = res
            // 计算course表中的总内容数是否符合后续的赋值使用
            const size = this.courseLists.length > 7 ? 7 : this.courseLists.length
            // 当前页面需要展示的课程变量进行赋值
            for (let i = 0; i < size; i++) {
                let randNum = Math.floor(Math.random() * 10) + 1;
                this.List.push(this.courseLists[randNum])
            }
        },
        // 用户点击播放视频对应的视频点击数加一
        async update() {
            const { data: res } = await this.$http.get('/updateClick', {
                params: {
                    "cid": this.$route.params.id
                }
            })
        },
        // 获取当前课程的所有评论
        async getComments() {
            // 调用后端评论接口
            const { data: res } = await this.$http.get('/getComment', {
                params: {
                    "cid": this.$route.params.id
                }
            })
            // 将获取到得评论内容赋值给comments变量
            this.comments = res
            return res.length
        },
        // 用户发表评论方法
        async submit() {
            if (!window.localStorage.getItem('token')) {
                this.$message.error('登录后才能发表评论~')
                return
            }
            // 倘若评论内容为空
            if (this.input === '') {
                this.$message.error('评论内容不能为空！！')
            } else {
                // 调用对饮的api接口
                const { data: res } = await this.$http.get('/insertComment', {
                    params: {
                        "cid": this.$route.params.id,
                        "comment": this.input,
                        "author": window.localStorage.getItem('token'),
                        "avatar": this.$store.state.imgSrc
                    }
                })
                // 对后端返回的结果进行判断
                if (res === 1) {
                    this.$message.success('评论发表成功!!!')
                } else {
                    this.$message.error('评论发布失败!!!')
                }
                // 置空处理
                this.input = ''
                // 使用$nextTick实现
                this.$nextTick(() => {
                    this.getComments()
                })
            }
        },
        // 初始化当前课程视频方法
        async initCourse() {
            const { data: res } = await this.$http.get('/getCourseById?id=' + this.$route.params.id)
            this.course = res
        },
        // 返回后端传输到前端的图片地址
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
        },
        getCover(src) {
            return require('@/assets/' + src)
        },
        // 返顶方法
        to() {
            toTop()
        },
        // 用户点赞方法
        like(e) {
            // 将对应的颜色改为红色
            let color = e.target.style.color;
            // 使用三元运算符进行字体颜色的变换
            e.target.style.color = color === 'rgb(221, 0, 0)' ? '' : 'rgb(221, 0, 0)';
        }
    }

}
</script>

<style lang="less" scoped>
@mainColor: #dd0000;

// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {

    html {
        font-size: 12px;
    }

    .infos-box {
        height: 10rem !important;
    }
}

// 当用户的手机屏幕小于992px但大于758px时，对应的字体大小为13px
@media (min-width: 768px) and (max-width: 992px) {

    html {
        font-size: 13px;
    }

    .infos-box {
        height: 9rem !important;
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

body,
html {
    width: 100%;
    height: 100%;
}

#video-container {
    display: flex;
    width: 100%;
    min-height: 600px;
    box-sizing: border-box;

    .functions-fix {
        display: none;
        position: fixed;
        width: 7rem;
        top: 88%;
        right: 15px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;

        ul {
            list-style: none;
            text-align: center;

            li {
                width: 100%;
                height: 2.3333rem;
                line-height: 2.3333rem;
                margin-bottom: 1rem;
                border-radius: 1rem;
                color: rgb(58, 139, 255, 1);
                background: rgba(250, 250, 249, 0.95);
                box-shadow: 0px 2px 10px 0px rgba(31, 35, 41, .38);
                cursor: pointer;

                &:hover {
                    color: rgba(58, 139, 255, .65);
                }


                a {
                    display: block;
                    color: rgb(58, 139, 255, 1);
                    width: 100%;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 1rem;

                    &:hover {
                        color: rgba(58, 139, 255, .65);
                    }
                }
            }
        }
    }

    .video-box {
        margin: 1rem;

        box-sizing: border-box;
        border: 1px solid white;
        box-shadow: 0 0 15px #c9c9c9;

        .course-info {
            display: flex;
            width: 85%;
            height: 4.6875rem;
            margin: 1rem auto;
            border-bottom: 0.0333rem solid #c9c9c9;
            box-sizing: border-box;

            .teacher-img {
                width: 3.75rem;
                height: 3.75rem;
                box-sizing: border-box;

                img {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
            }

            .course {
                width: 80%;
                height: 100%;
                box-sizing: border-box;

                .teacher,
                .content {
                    widows: 100%;
                    height: 50%;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    line-height: 1.75rem;
                    text-indent: 1rem;
                    box-sizing: border-box;
                }
            }
        }

        .video-info {
            width: 85%;
            height: 3.125rem;
            line-height: 3.125rem;
            margin: 1rem auto;

            span:nth-child(1) {
                font-size: 1rem;
            }

            span:nth-child(2) {
                color: rgba(155, 160, 164, .8);
                font-size: 0.75rem;
                margin: 0 1rem;
            }

            span:nth-child(3) {
                font-size: 0.75rem;
            }

            span:nth-child(5) {
                color: rgba(155, 160, 164, .8);
                font-size: 0.75rem;
            }
        }

        // 用户发表评论框样式
        .comments {
            display: flex;
            width: 80%;
            height: 6.25rem;
            margin: 1rem auto;
            font-weight: 600;
            align-content: center;
            align-items: center;

            img {
                width: 3.125rem;
                height: 3.125rem;
                border-radius: 50%;
            }

            .input {
                width: 70%;
                margin: 0 1rem;
                box-sizing: border-box;
            }
        }

        // 评论展示样式
        .comment-box {
            width: 80%;
            height: 6.5rem;
            margin: 0 auto;
            box-sizing: border-box;

            // 用户头像盒子样式
            .user-box {
                float: left;
                width: 3.125rem;
                height: 3.125rem;
                box-sizing: border-box;

                // 用户图片样式
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .infos-box {
                float: right;
                width: 100%;
                height: 7.0rem;
                font-weight: 500;
                font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
                cursor: pointer;

                .name {
                    width: 100%;
                    height: 20%;
                    font-size: 0.75rem;
                    color: rgba(95, 98, 116, .95);
                    // border: 0.0625rem solid red;
                }

                .infos {
                    width: 100%;
                    margin: 0.6rem 0;
                    font-size: 0.875rem;
                    line-height: 23px;
                    box-sizing: border-box;
                    // border: 0.0625rem solid red;

                    .text {
                        width: 90%;
                    }
                }

                .date {
                    width: 100%;
                    height: 20%;
                    color: rgba(95, 98, 116, .95);

                    span:nth-child(2) {
                        float: right;
                        margin: 0 35px 0 0;

                        &:hover {
                            color: @mainColor;
                        }
                    }
                }
            }
        }

        .reply-end {
            clear: both;
            text-align: center;
            color: #9499a0;
            font-size: 0.8125rem;
        }

        .reply-end-mask {
            height: 3.125rem;
        }

    }

    .video-wrap {
        min-height: 25rem;
        margin: 1rem 0;
        padding: 0.30rem;
        box-sizing: border-box;
        border: 0.0625rem solid white;
        box-shadow: 0 0 15px #c9c9c9;

        .text {
            box-sizing: border-box;
            margin: 0 0 0.5rem 0;
        }

        ul {
            width: 100%;
            min-height: 25rem;

            li {
                display: flex;
                width: 90%;
                height: 20%;
                margin: 1.25rem auto;
                flex-wrap: wrap;
                list-style: none;
                align-items: center;
                align-content: center;

                .img::before {
                    position: absolute;
                    display: none;
                    width: 27%;
                    height: 11.5%;
                    content: '';
                    border-radius: 0.625rem;
                    background-size: 1.4rem;
                    background: rgba(0, 0, 0, .4) url(@/assets/arr.png) no-repeat center;
                }

                .img:hover::before {
                    display: block;
                }

                .img {
                    width: 100%;

                    img {
                        width: 6.25rem;
                        height: 6.25rem;
                        border-radius: 0.625rem;
                        border: 0.0625rem solid #ccc;
                    }
                }

                .information {
                    width: 100%;
                    height: 100%;
                    font-size: 0.8125rem;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.5rem;
                    box-sizing: border-box;

                    div:nth-child(2) {
                        color: #9499a0;
                    }

                    i {
                        margin: 0 0.3rem;
                    }
                }
            }
        }
    }
}
</style>