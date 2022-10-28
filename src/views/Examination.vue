<template>
    <!-- 试卷真题页面 -->
    <div id="examination-container">
        <!-- (一) 试卷真题页面内容框 -->
        <div class="contents-box">
            <ul>
                <!-- 1.1 使用v-for循环进行数据库数据的读取 -->
                <li v-for="item in pagesList" :key="item.id">
                    <div class="pages">
                        <i>试卷:</i>&nbsp;&nbsp;
                        <!-- 1.1.1 不同试卷对应的链接 -->
                        <span><a :href="src + item.pdf">{{ item.test }}</a></span>
                    </div>
                    <div class="type">
                        <!-- 1.1.2 不同试卷对应的类型 -->
                        <span>{{ item.type }}</span>
                        <!-- 1.1.3 不同书卷对应的好评 -->
                        <span>好评率:{{ item.rate }}</span>
                        <!-- 1.1.4 不同试卷的年级 -->
                        <span>{{ item.grade }}</span>
                    </div>
                </li>
                <!-- (二) 分页按钮 -->
                <div class="pagination">
                    <!-- 2.1 上一页按钮 -->
                    <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="pre"></el-button>
                    <!-- 2.2 下一页按钮 -->
                    <el-button type="primary" size="mini" @click="next">
                        <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    // vue组件的名字
    name: 'examination',
    created() {
        // 执行获取数据的函数
        this.getPages();
        this.getMaxPage();
    },
    data() {
        return {
            // 固定的pdf路径写法
            src: '/static/page.html?pdf=',
            // 接收试卷数据的数组变量
            pagesList: [],
            // 当前页数变量
            current: 1,
            // 最大页数变量
            maxPage: 0
        }
    },
    methods: {
        // 当用户点击了资源推荐后的连接后自动执行获取信息的接口
        async getPages() {
            // 使用axois发送GET请求，获取试卷数据
            const { data: res } = await this.$http.get('/getPages', { params: { "number": this.current } })
            // 数据赋值
            this.pagesList = res
        },
        // 获取后台数据的最大页数
        async getMaxPage() {
            const { data: res } = await this.$http.get('/getMaxPage')
            this.maxPage = res
        },

        // 下一页功能
        async pre() {
            // 先对页面当前页数进行判断
            if (this.current === 1) {
                // 信息提示
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '当前已是第一页!!'),
                    position: 'top-left'
                })
            } else {
                // 使用axois发送GET请求，获取试卷数据
                const { data: res } = await this.$http.get('/getPages', { params: { "number": this.current - 1 } })
                // 数据赋值
                this.pagesList = res
                // 当前页面页数减一
                this.current = this.current - 1
            }
        },
        // 下一页功能
        async next() {
            // 先对页面当前页数进行判断
            if (this.current === this.maxPage) {
                // 信息提示
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '当前已最后一页!!'),
                    position: 'top-left'
                })
            } else {
                // 使用axois发送GET请求，获取试卷数据
                const { data: res } = await this.$http.get('/getPages', { params: { "number": this.current + 1 } })
                // 数据赋值
                this.pagesList = res
                // 当前页面页数减一
                this.current = this.current + 1
            }
        }
    }
}
</script>

<style lang="less" scoped>
// 最外层盒子样式
#examination-container {
    width: 100%;
    height: 100%;
    padding: 0.65rem;
    box-sizing: border-box;

    // 试卷内容盒子样式
    .contents-box {
        width: 100%;
        height: 88%;
        box-sizing: border-box;

        // 数据盒子样式
        ul {
            position: relative;
            width: 98%;
            height: 90%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            list-style: none;

            // 每一条数据样式
            li {
                width: 100%;
                height: 18%;
                box-sizing: border-box;
                border: 1px solid black;

                // 试卷名字样式
                .pages {
                    width: 100%;
                    height: 55%;
                    text-align: left;
                    font-size: 14px;
                    line-height: 26.14px;
                    margin: 0 0.5rem;
                    box-sizing: border-box;
                    color: rgb(212, 39, 97);

                    // 试卷链接样式
                    a {
                        color: green;
                        text-decoration: none;
                    }
                }

                // 试卷类型样式
                .type {
                    width: 100%;
                    height: 40%;
                    font-size: 12px !important;
                    text-align: right;
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
</style>