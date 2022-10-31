<template>
    <el-row :gutter="0">
        <div id="video-container">
            <el-col :xs="24" :sm="18">
                <div class="video-box">
                    <video-player style="width: 80%;height: 100%;margin:0 auto;box-shadow:5px 5px 8px #888888"
                        class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                        :options="playerOptions">
                    </video-player>

                    <!-- 用户评论发表 -->
                    <div class="comments">
                        <span>评论发表:</span>
                        <el-input type="textarea" @keydown.enter.native="e" placeholder="请输入内容" v-model="textarea"
                            maxlength="30" show-word-limit>
                        </el-input>
                    </div>
                </div>
            </el-col>
            <el-col :xs="0" :sm="6">
                <div class="video-wrap">
                    1
                </div>
            </el-col>
        </div>
    </el-row>
</template>

<script>
export default {
    name: 'videos',
    data() {
        return {
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
                    src: "http://1.12.235.213/media/" + this.$route.params.id + ".mp4" //url地址
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
            textarea: ''
        }
    },
    methods: {
        e() {
            console.log('评论成功!');
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


* {
    margin: 0;
    padding: 0;
}

body,
html {
    width: 100%;
    height: 100%;
}

#video-container {
    display: flex;
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    border: 1px solid red;

    .video-box {
        margin: 1rem;
        box-sizing: border-box;
        border: 1px solid red;

        .comments {
            margin: 1rem;
            font-weight: 600;

            span {
                display: block;
                margin: 1rem 0;
            }

            /deep/ .el-textarea__inner {
                border: 1px solid black;
            }
        }
    }

    .video-wrap {
        min-height: 400px;
        margin: 1rem;
        box-sizing: border-box;
        border: 1px solid red;
    }
}
</style>