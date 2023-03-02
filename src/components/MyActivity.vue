<template>
    <div id="container">
        <div class="functions-fix">
            <ul>
                <!-- 返顶 -->
                <li @click="to"><i class="el-icon-caret-top"></i> 返顶</li>
            </ul>
        </div>
        <!-- （一）当前页面的信息显示 -->
        <div class="main-content" v-for="item in content" :key="item.id">
            <!-- 1.1 页面banner条 -->
            <div class="main-banner"></div>
            <!-- 1.2 内容上方的链接 -->
            <div class="main-link">
                <img src="../assets/log.png" title="图标" alt="blank">
                <span><a href="/math/home">希冀数学</a> > </span>
                <span><a href="/math/activity">线下活动</a> > </span>
                <span><a href="javascript:void(0)">活动预告</a> > </span>
                <span>正文</span>
            </div>
            <!-- 1.3 活动标题区域 -->
            <div class="main-title">
                {{ item.title }}
            </div>
            <!-- 1.4 活动时间 -->
            <div class="top-bar-wrap">
                <!-- 1.4.1 活动文章日期 -->
                <div class="date-source">
                    <i class="el-icon-date"></i>
                    <span>{{ item.date }}</span>
                    <a href="/math/home">希冀数学</a>
                </div>
                <!-- 1.4.2 活动页面的工具 -->
                <div class="page-tools">
                    <span @click="sizeChange('lower')" title="减小字号">
                        <i class="el-icon-remove-outline"></i>
                    </span>
                    <span @click="sizeChange('upper')" title="增大字号">
                        <i class="el-icon-circle-plus-outline"></i>
                    </span>
                    <span class="start-tool" title="收藏本页">
                        <i class="el-icon-star-off"></i>
                    </span>
                    <span title="分享到微信">
                        <i class="iconfont icon-weixin" style="font-size: 1.65rem;"></i>
                    </span>
                    <span class="comment-tool" title="评论数" @click="go">
                        <a href="javascript:void(0);">
                            <i class="el-icon-chat-dot-square"></i>
                            {{ getCommentCount }}
                        </a>
                    </span>
                </div>
            </div>
            <!-- 1.5 线下活动内容介绍 -->
            <div class="main-article">
                <!-- 1.5.1 左侧文章图片和文章内容区域 -->
                <div class="article-img" ref="content">
                    <div>
                        <img :src="getSrc(item.image)" alt="blank" title="活动图片">
                    </div>
                    <p v-for="(art, i) in getArticle(item.content)" :key="i">
                        {{ art }}
                    </p>
                    <p>（云烟波客）</p>

                    <h4>声明：希冀数学独家稿件，未经授权禁止转载！</h4>

                    <h4>关键词 : <span>校园 青春 志愿者</span> </h4>
                </div>
                <!-- 1.5.2 右侧文章推荐区域 -->
                <div class="article-list">
                    <div class="article-text">
                        <h3>推荐阅读</h3>
                    </div>
                    <ul class="wrap-pictxt clearfix" node-type="list" id="list_55a07552_9f6c_12b3_4f25_921db3cc5584">
                        <li v-for="item in activity" :key="item.id">
                            <div class="pic">
                                <a :href="'/math/act_content/' + item.id" title="活动图片">
                                    <img class="imgS" :src="getSrc(item.image)" alt="blank">
                                </a>
                            </div>
                            <div class="txt">
                                <a :href="'/math/act_content/' + item.id" title="活动主题"> {{ item.title }}
                                </a>
                                <div class="extra" title="活动时间">{{ item.date }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 1.6 线下活动对应的评论 -->
            <div class="main-comment" id="main-comment">
                <!-- 1.6.1 评论区域的标题文字 -->
                <div class="comment-title">
                    <!-- 1.6.1.1 文字内容一 -->
                    <div class="text1">
                        <i class="el-icon-chat-dot-square"></i>
                        <span>网友评论</span>
                    </div>
                    <!-- 1.6.1.2 文字内容二 -->
                    <div class="text2">
                        <span> <a href="">{{ getCommentCount }}</a> 条评论</span>
                        <span>|</span>
                        <span> <a href="">{{ getCommentCount }}</a> 人参与</span>
                    </div>
                </div>
                <!-- 1.6.2 评论区域用户发布评论 -->
                <div class="p-comment">
                    <div class="c-user">
                        <img :src="getAvatar" alt="blank" title="评论者头像">
                    </div>
                    <div class="c-textarea">
                        <textarea class="box" cols="70" rows="4" v-model="textarea" placeholder="我有话要说..."></textarea>
                    </div>
                </div>
                <!-- 1.6.3 评论发布按钮 -->
                <div class="btns-comment">
                    <span> <a href="/login">登录</a></span>
                    <span>|</span>
                    <span><a href="/register">注册</a></span>
                    <el-button type="primary" size="small" class="submit" :disabled="active" @click="submit">发布</el-button>
                </div>
            </div>

            <!-- 1.7 文章评论展示(响应式布局) -->
            <h3 class="info">最热评论</h3>
            <div class="comment-box">
                <!-- 评论头像盒子 -->
                <el-row :gutter="0" v-for="item in comment" :key="item.id" style="margin: 0 0 22px 0;">
                    <el-col :xs="4" :sm="4" :md="3" :lg="3" :xl="3">
                        <div class="user-box">
                            <img src="@/assets/avatar.png" alt="blank">
                        </div>
                    </el-col>
                    <!-- 评论内容信息 -->
                    <el-col :xs="20" :sm="20" :md="21" :lg="21" :xl="21">
                        <div class="infos-box">
                            <!-- 评论者名称 -->
                            <div class="name">用户{{ item.reviewer }}</div>
                            <!-- 评论内容 -->
                            <div class="infos">
                                <div class="text">{{ item.comment }}</div>
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

        </div>
    </div>
</template>

<script>
import { toTop } from '@/utils/scrollTop.js'
import { scrollTop } from '@/utils/scrollTop.js'
import { token } from '@/utils/config.js'
export default {
    name: 'MyActivity',
    created() {
        // 组件在该生命周期下直接调用对应的方法
        this.initContent();
        // 初始化线下活动内容
        this.initActivityList();
        // 初始化评论内容
        this.initComment();
    },
    mounted() {
        window.addEventListener('scroll', function () {
            scrollTop('.functions-fix')
        })
    },
    updated() {
        this.$nextTick(() => {
            this.$refs["content"][0].style.fontSize = '18px'
        })
    },
    data() {
        return {
            // 活动内容变量
            content: [],
            // 线下活动变量
            activity: [],
            // 评论内容变量
            textarea: '',
            // 线下活动文章的评论内容变量
            comment: [],
        }
    },
    computed: {
        active() {
            return this.textarea == '';
        },
        // 获取用户头像
        getAvatar() {
            return "http://1.12.235.213/img/" + this.$store.state.imgSrc;
        },
        // 获取从后台返回的评论数
        getCommentCount() {
            return this.comment.length;
        }
    },
    methods: {
        // 内容初始化方法
        async initContent() {
            // 使用axios对接口进行调用获取数据
            const { data: res } = await this.$http('/getActContent', {
                params: {
                    aId: this.$route.params.id
                }
            })
            // 将返回的数据赋值给content
            this.content = res;
        },
        // 初始化线下活动数据
        async initActivityList() {
            const { data: res } = await this.$http.get('/activity')
            this.activity = res
        },
        // 初始化活动评论内容方法
        async initComment() {
            const { data: res } = await this.$http.get('/getCommentByAid', {
                params: {
                    aid: this.$route.params.id
                }
            })
            this.comment = res;
        },
        // 获取活动图像方法
        getSrc(src) {
            return require('@/assets/' + src)
        },
        // 将从api接口获取到的线下内容进行分解
        getArticle(str) {
            // 初始化需要的变量
            let count = 1, strs = str, article = [];
            // 使用循环进行线下文章内容的分解
            while (strs.length) {
                let t = strs.slice(0, 40 * count++);
                article.push(t);
                strs = strs.slice(t.length, strs.length)
            }
            // 返回一个数组为view中的循环做封装
            return article;
        },
        // 用户点击页面的评论数页面进行滑动方法
        go() {
            document.querySelector('#main-comment').scrollIntoView();
        },
        // 字体变换（变大变小）方法
        sizeChange(mode) {
            // 通过$refs获取对应的dom元素
            const size = this.$refs["content"][0].style.fontSize
            let t = parseInt(size.slice(0, 2), 10);
            if (mode == 'lower') {
                t = t == 16 ? t : t - 2;
            } else {
                t = t == 20 ? t : t + 2;
            }
            this.$refs["content"][0].style.fontSize = t + 'px'
        },
        // 用户提交评论方法
        async submit() {
            // 若用户还没有登录
            if (!token) {
                this.$notify.error({
                    title: '错误',
                    message: '请先登录!',
                    position: 'bottom-right'
                });
                return;
            } else {
                // TODO: 进行相关的ajax操作
                await this.$http.get('/addActivityComment', {
                    params: {
                        "aid": this.$route.params.id,
                        "comment": this.textarea,
                        "reviewer": token
                    }
                })
                // 消息推送
                this.$notify.error({
                    title: 'success',
                    message: '评论成功!',
                });
                // 评论内容清空
                this.textarea = '';
                // 页面自刷新
                this.$router.go(0);
            }
        },
        // 用户点赞方法
        like(e) {
            // 将对应的颜色改为红色
            let color = e.target.style.color;
            // 使用三元运算符进行字体颜色的变换
            e.target.style.color = color === 'rgb(221, 0, 0)' ? '' : 'rgb(221, 0, 0)';
        },
        // 返顶方法
        to() {
            toTop()
        },
    }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 768px) and (max-width: 1480px) {
    .main-content {
        width: 1000px;
    }
}

@media screen and (min-width: 1481px) {
    .main-content {
        width: 1240px;
    }
}

// 将常用的属性设置为less变量，提高可用性
@bSize: 0.0625rem;
@mainColor: #dd0000;

#container {
    width: 100%;
    padding: 2.1875rem 0;
    box-sizing: border-box;
    font-family: 'Montserrat';

    .functions-fix {
        display: none;
        position: fixed;
        width: 7rem;
        top: 88%;
        right: 0.9375rem;
        font-size: .875rem;
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
                box-shadow: 0px .125rem .625rem 0px rgba(31, 35, 41, .38);
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

    ::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 1.125rem;
        font-weight: bold;
    }

    a {
        text-decoration: none;
    }

    .main-content {
        margin: 0 auto;

        .main-banner {
            width: 100%;
            height: 12.5rem;
            background: url(../assets/activity.jpg) no-repeat center;
            background-size: contain;
        }

        .main-link {
            width: 100%;
            margin: .9375rem 0 0 0;

            img {
                width: 3.125rem;
                margin: 0 .625rem;
                vertical-align: middle;
            }

            span {
                margin: 0 .125rem;
                font-size: 0.875rem;

                a {
                    color: #333;

                    &:hover {
                        color: @mainColor;
                    }
                }
            }
        }

        .main-title {
            font-weight: bold;
            font-size: 2.375rem;
            color: #4D4F53;
            line-height: 38px;
            padding: 2.5rem 0;
        }

        .top-bar-wrap {
            display: flex;
            height: 4rem;
            align-items: center;
            align-content: center;
            justify-content: space-between;
            border-top: @bSize solid #c9c9c9;
            border-bottom: @bSize solid #c9c9c9;

            .date-source {
                width: 30%;

                a {
                    float: right;
                    color: @mainColor;
                    letter-spacing: @bSize;
                }

                span {
                    padding: 0 .625rem;
                    font-size: 1rem;
                    color: #888;
                }

                i {
                    color: #888;
                }
            }

            .page-tools {
                display: flex;
                width: 50%;
                font-size: 1.65rem;
                text-align: center;
                flex-direction: row;
                justify-content: space-around;
                cursor: pointer;

                span {
                    &:hover {
                        color: @mainColor;
                    }
                }

                .comment-tool {
                    a {
                        color: @mainColor;
                    }

                    i {
                        margin: 0 .1875rem;
                    }
                }
            }
        }

        .main-article {
            width: 100%;
            min-height: 12.5rem;
            margin: 1.25rem 0 0 0;
            overflow: hidden;

            .article-img {
                float: left;
                width: 70%;
                letter-spacing: .0625rem;
                color: #4D4F53;
                line-height: 2rem;
                border-right: @bSize dotted #ccc;

                div:nth-child(1) {
                    float: left;
                    width: 65%;
                    margin-right: .625rem;
                    overflow: hidden;
                }

                p {
                    text-indent: 2.25rem;
                    margin: 0 0 1.25rem 0;
                }

                img {
                    width: 100%;
                    vertical-align: top;

                    &:hover {
                        transform: scale(1.03);
                        transition: 0.5s;
                    }
                }

                h4 {
                    margin: 0 0 .75rem 0;

                    span {
                        font-weight: 400;
                    }
                }
            }

            .article-list {
                float: right;
                width: 25%;
                min-height: 12.5rem;

                .article-text {
                    border-top: .125rem solid @mainColor;
                    height: 3.75rem;
                    line-height: 3.75rem;

                    h3 {
                        font-size: 1.25rem;
                        color: @mainColor;
                        display: inline-block;
                        font-weight: 400;
                    }
                }

                ul {
                    list-style: none;

                    li {
                        display: flex;
                        margin-bottom: 1.5625rem;

                        .txt {
                            display: flex;
                            margin: 0 0 0 .9375rem;
                            flex-direction: column;
                            justify-content: space-between;
                        }

                        a {
                            letter-spacing: .125rem;
                            font-size: .875rem;

                            &:active {
                                color: #333;
                            }

                            &:hover {
                                color: @mainColor
                            }
                        }

                        div {
                            font-size: .75rem;
                            color: rgba(0, 0, 0, .6);
                        }

                        .pic {
                            width: 100%;

                            img {
                                width: 100%;

                                &:hover {
                                    transform: scale(1.03);
                                    transition: 0.5s;
                                }
                            }
                        }
                    }
                }
            }
        }

        .main-comment {
            display: flex;
            width: 100%;
            min-height: 12.5rem;
            margin: 1.25rem 0 0 0;
            padding: .9375rem 1.875rem;
            flex-direction: column;
            border: .0625rem solid #e8e8e8;
            justify-content: space-between;
            border-top: .125rem solid @mainColor;

            .comment-title {
                display: flex;
                width: 100%;
                height: 1.75rem;
                flex-direction: row;
                justify-content: space-between;

                .text1 {
                    width: 25%;
                    height: 100%;
                    font-size: 1.625rem;
                    line-height: 1.75rem;
                    color: @mainColor;

                    i {
                        margin: 0 .625rem 0 0;
                    }
                }

                .text2 {
                    width: 30%;
                    height: 100%;
                    font-size: .875rem;
                    line-height: 1.75rem;
                    text-align: right;

                    a {
                        color: #EE231B;
                    }

                    span:nth-child(2) {
                        margin: 0 10px;
                    }
                }
            }

            .p-comment {
                width: 100%;
                height: 5.1875rem;
                overflow: hidden;

                .c-user {
                    display: flex;
                    float: left;
                    width: 25%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;

                    img {
                        height: 90%;
                        border-radius: 50%;
                    }
                }

                .c-textarea {
                    position: relative;
                    float: left;
                    width: 60%;
                    padding: .625rem 0;
                    height: 100%;
                    text-align: center;
                    background: #f5f5f5;
                    border: @bSize solid #c5c5c5;

                    &::before {
                        position: absolute;
                        content: '';
                        top: 1.5625rem;
                        left: -0.875rem;
                        width: 0;
                        height: 0;
                        border-top: .9375rem solid transparent;
                        border-right: .9375rem solid #f5f5f5;
                        border-bottom: .9375rem solid transparent;
                    }

                    .box {
                        border: none;
                        outline: none;
                        resize: none;
                        overflow-y: auto;
                        background-color: #f5f5f5;
                    }
                }
            }

            .btns-comment {
                display: flex;
                width: 100%;
                height: 2.5rem;
                font-size: 1.125rem;
                text-align: right;
                align-items: center;
                justify-content: end;

                span:nth-child(1),
                span:nth-child(3) {
                    margin: 0 .625rem;
                }

                a {
                    color: #000;

                    &:hover {
                        color: @mainColor;
                    }
                }

                .submit {
                    height: 80%;
                    margin: 0 .625rem;
                }
            }
        }

        .info {
            width: 6.25rem;
            line-height: 2.9375rem;
            font-size: 1.125rem;
            text-align: center;
            font-weight: bold;
            color: #dd0000;
            margin: 1.5625rem 0 0 0;
            border-bottom-color: #dd0000;
            border-bottom: .125rem solid #FA536F;
        }

        .comment-box {
            width: 100%;
            font-size: 1rem;
            padding: .625rem 1.875rem;
            border: .0625rem solid #e8e8e8;

            // 用户头像盒子样式
            .user-box {
                float: left;
                width: 4.125rem;
                height: 4.125rem;
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
                    color: @mainColor;
                    font-weight: bold;
                }

                .infos {
                    width: 100%;
                    margin: 0.6rem 0;
                    line-height: 1.4375rem;
                    box-sizing: border-box;

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
                        margin: 0 2.1875rem 0 0;

                        &:hover {
                            color: @mainColor;
                        }
                    }
                }
            }
        }


    }

}
</style>