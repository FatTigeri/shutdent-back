<template>
    <!-- 试卷真题页面 -->
    <div id="examination-container">
        <!-- (一) 试卷真题页面内容框 -->
        <div class="contents-box">
            <ul>
                <!-- 1.1 使用v-for循环进行数据库数据的读取 -->
                <li v-for="item in currentList" :key="item.id">
                    <div class="pages">
                        <i>试卷:</i>&nbsp;&nbsp;
                        <!-- 1.1.1 不同试卷对应的链接 -->
                        <span><a :href="src + item.pdf" @click="update(item.id)">{{ item.test }}</a></span>
                    </div>
                    <div class="type">
                        <!-- 1.1.2 不同试卷对应的类型 -->
                        <span>{{ item.type }}</span>
                        <!-- 1.1.3 不同书卷对应的好评 -->
                        <span>好评率:{{ item.rate }}%</span>
                        <!-- 1.1.4 不同试卷的年级 -->
                        <span>{{ item.grade }}</span>
                    </div>
                </li>
                <!-- 当用户选择的试卷类型在数据库中没有寻找到时现实的标签 -->
                <li class="special" style="color: #9499a0; font-size: 0.75rem; border: none;"
                    v-if="currentList.length === 0">
                    没有对应的试卷内容...
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
        // 先进行当当前是否为第一次点击页面情况
        if (this.$store.state.grade === '') {
            this.initPages();
            this.getMaxPage();
        } else {
            this.getPages();
        }
    },
    data() {
        return {
            // 固定的pdf路径写法
            src: '/static/page.html?pdf=',
            // 用来接收store中获取的到试卷数据
            List: [],
            // 当前要展示的页面数据
            currentList: [],
            // 当前页数变量
            current: 1,
            // 最大页数变量
            maxPage: 0
        }
    },
    methods: {
        // 当用户点击了资源推荐后的连接后自动执行获取信息的接口
        async initPages() {
            // 使用axois发送GET请求，获取试卷数据
            const { data: res } = await this.$http.get('/getPages')

            // 数据赋值Vux中的pagesList变量
            this.$store.commit('setPageList', res)

            // 本组件再进行读取Vux中的pagesList变量
            this.List = this.$store.state.pagesList

            // 中间分页查询数组变量List进行赋值
            for (let i = 0; i < 6; i++) {
                this.currentList.push(this.List[i])
            }
        },

        // 获取后台数据的最大页数
        async getMaxPage() {
            // 调用获取examination表的数据数接口
            const { data: res } = await this.$http.get('/getMaxPage')
            // 对获取到的数据进行赋值操作
            this.maxPage = res
        },

        // 用户点击详细数据定位搜索后，获取vuex已经存在的数据
        getPages() {
            // 先将初始化数据的结果进行清除
            this.currentList.splice(0, this.currentList.length);

            // 本组件再进行读取Vux中的pagesList变量
            this.List = this.$store.state.pagesList

            // 中间分页查询数组变量List进行赋值
            if (this.List.length >= 6) {
                // 搜索数据值大于6条时
                if (this.List % 6 === 0) {
                    this.maxPage = this.List.length / 6
                } else {
                    this.maxPage = this.List.length / 6 + 1
                }
                // 对当前数据变量数组currentList进行赋值
                for (let i = 0; i < 6; i++) {
                    this.currentList.push(this.List[i])
                }
            } else {
                // 搜索值小于6条时
                this.maxPage = 1
                // 对当前数据变量数组currentList进行赋值
                for (let i = 0; i < this.List.length; i++) {
                    this.currentList.push(this.List[i])
                }
            }
            // 将当前页面变量进行归一操作
            this.current = 1
        },
        // 上一页功能
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
                // 将当前的数据进行清除操作
                this.currentList = []
                // 将当前页面变量进行减一操作
                this.current--
                // 对应的赋值算法
                for (var i = (this.current - 1) * 6; i < this.current * 6; i++) {
                    this.currentList.push(this.List[i])
                }
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
                // 将当前的数据进行清除操作
                this.currentList = []
                // 对当前要展示数据的数组长度进行计算
                const size = (this.current + 1) * 6 > this.List.length ? this.List.length : (this.current + 1) * 6

                // 对应的赋值算法
                for (var i = this.current * 6; i < (this.current + 1) * 6; i++) {
                    this.currentList.push(this.List[i])
                }
                // 将当前页面变量进行加一操作
                this.current++;
            }
        },
        // 用户点击了哪个试卷，对应的更新数据库中的popular点击变量
        async update(id) {
            // 调用更新接口，后台自动更新即可
            await this.$http.get('/updatePage', { params: { "id": id } })
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