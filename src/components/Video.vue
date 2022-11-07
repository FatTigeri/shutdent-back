<template>
    <el-row :gutter="0">
        <div id="video-container">
            <el-col :xs="24" :sm="17">
                <div class="video-box">
                    <video-player style="width: 85%;height: 100%;margin:0 auto;box-shadow:5px 5px 8px #888888"
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
                        <span>204</span>
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
                            <el-input v-model="input" placeholder="发一条友善的评论"></el-input>
                        </div>
                        <div class="button">
                            <el-button type="primary">发布</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="0" :sm="7">
                <div class="video-wrap">
                    <div class="text">
                        <h4>猜你喜欢</h4>
                    </div>
                    <ul>
                        <li v-for="item in List" :key="item.cid">
                            <div class="img"><img :src="getCover(item.cover)" alt="blacnk"></div>
                            <div>{{ item.contents }}</div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </div>
    </el-row>
</template>

<script>
export default {
    name: 'videos',
    created() {
        this.initCourse()
        this.initCourseList()
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
            input: '',
            courseLists: [],
            List: []
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
        e() {
            console.log('评论成功!');
        },
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
        }
    }

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

    .video-box {
        margin: 1rem;
        box-sizing: border-box;
        border: 1px solid red;

        .course-info {
            display: flex;
            width: 85%;
            height: 75px;
            margin: 1rem auto;
            border-bottom: 0.0333rem solid #c9c9c9;
            box-sizing: border-box;

            .teacher-img {
                width: 60px;
                height: 60px;
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
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 28px;
                    text-indent: 1rem;
                    box-sizing: border-box;
                }
            }
        }

        .video-info {
            width: 85%;
            height: 50px;
            line-height: 50px;
            margin: 1rem auto;

            span:nth-child(1) {
                font-size: 16px;
            }

            span:nth-child(2) {
                color: rgba(155, 160, 164, .8);
                font-size: 12px;
                margin: 0 1rem;
            }

            span:nth-child(3) {
                font-size: 12px;
                // margin: 0 1rem;
            }

            span:nth-child(5) {
                color: rgba(155, 160, 164, .8);
                font-size: 12px;
            }
        }

        .comments {
            display: flex;
            width: 80%;
            height: 100px;
            margin: 1rem auto;
            font-weight: 600;
            border: 0.0333rem solid black;
            align-content: center;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .input {
                width: 70%;
                margin: 0 1rem;
                box-sizing: border-box;
            }
        }
    }

    .video-wrap {
        min-height: 400px;
        margin: 1rem;
        padding: 0.5rem;
        box-sizing: border-box;
        border: 1px solid red;

        .text {
            box-sizing: border-box;
            margin: 0 0 0.5rem 0;
        }

        ul {
            width: 100%;
            min-height: 400px;

            li {
                display: flex;
                width: 100%;
                height: 20%;
                margin: 0.5rem 0;
                flex-wrap: wrap;
                list-style: none;
                align-items: center;
                align-content: center;
                border: 1px solid red;

                .img::before {
                    position: absolute;
                    display: none;
                    width: 8%;
                    height: 8%;
                    content: '';
                    background: rgba(0, 0, 0, .4) url(@/assets/arr.png) no-repeat center;
                    background-size: 1.4rem;
                }

                .img:hover::before {
                    display: block;
                }

                & div:nth-child(1) {
                    width: 40%;

                    img {
                        width: 100px;
                        height: 60px;
                        border: 1px solid black;

                    }
                }

                & div:nth-child(2) {
                    font-size: 12px;
                    font-weight:600;
                    margin: 0 0 0 1rem;
                }
            }
        }
    }
}
</style>