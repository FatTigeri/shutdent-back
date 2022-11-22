<template>
    <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div id="course-container">
                <div class="search-input">
                    <el-input placeholder="请输入内容" v-model="input" prefix-icon="el-icon-search"
                        @keydown.enter.native="search">
                        <el-button slot="append" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-input>
                </div>

                <div class="search-box">
                    <ul>
                        <!-- v-for指令展示得到的课程内容信息 -->
                        <li v-for="item in List" :key="item.cid" @click="player(item.url, item.cid)">
                            <a href="javascript:void(0)"><img :src="getSrc(item.cover)" alt="blank"></a>
                            <div>
                                <!-- 对数据检索内容进行判断 -->
                                <em v-for="(ll, index) in strSplit(item.contents)" :key="index"
                                    :class="{ keyword: ll === content }">{{ ll }}</em>
                            </div>
                        </li>
                        <div class="reuslt" v-if="List.length === 0" style="">没有对应的索引结果</div>
                    </ul>
                    <!-- 分页按钮盒子 -->
                    <div class="pagination">
                        <!-- 2.1 上一页按钮 -->
                        <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="pre"></el-button>
                        <!-- 2.2 下一页按钮 -->
                        <el-button type="primary" size="mini" @click="next">
                            <i class="el-icon-arrow-right el-icon--right"></i>
                        </el-button>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
// 导入防抖函数
import { mythrollte } from '@/utils/index.js'
import { mapState } from 'vuex'
export default {
    name: 'course',
    created() {
        this.initCourseList()

    },
    data() {
        return {
            // 输入框内容
            input: '',
            // 总课程变量
            courseLists: [],
            // 当前页面需要展示的课程变量
            List: [],
            // 当前课程页变量
            current: 1,
            // 最大课程页变量
            maxCourse: 0
        }
    },
    computed: {
        // 使用Vuex中的辅助工具
        ...mapState({ 'content': 'search' })
    },
    methods: {
        // 初始化页面课程方法
        async initCourseList() {
            // 调用接口，进行数据的查询
            const { data: res } = await this.$http.get('/searchCourse', { params: { "params": this.$store.state.search } })
            // 清空courseLists数组中原有的课程数据
            this.courseLists = []
            // 清空List数组中原有的课程数据
            this.List = []
            // 对courseLists数据进行赋值
            this.courseLists = res
            // 将当前页设为1
            this.current = 1
            // 计算courseLists表中的总内容数是否符合后续的赋值使用
            const size = this.courseLists.length > 20 ? 20 : this.courseLists.length
            // 当前页面需要展示的课程变量进行赋值
            for (let i = 0; i < size; i++) {
                this.List.push(this.courseLists[i])
            }
            // 对最大课程页变量进行计算
            this.maxCourse = this.courseLists.length % 20 === 0 ? parseInt(this.courseLists.length / 20) : parseInt(this.courseLists.length / 20) + 1
        },
        // 获取图片方法
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
        },
        // 搜索指定课程方法（使用防抖进行限制）
        search: mythrollte(async function () {
            // 先判断用户是否已经输入内容
            if (this.input === '') {
                this.$message({
                    type: 'error',
                    message: '搜索内容不能为空！'
                })
            } else {
                // 调用接口，进行数据的查询
                const { data: res } = await this.$http.get('/searchCourse', { params: { "params": this.input } })
                // 清空courseLists数组中原有的课程数据
                this.courseLists = []
                // 清空List数组中原有的课程数据
                this.List = []
                // 对courseLists数据进行赋值
                this.courseLists = res
                // 将当前页设为1
                this.current = 1
                // 计算courseLists表中的总内容数是否符合后续的赋值使用
                const size = this.courseLists.length > 10 ? 10 : this.courseLists.length
                // 当前页面需要展示的课程变量进行赋值
                for (let i = 0; i < size; i++) {
                    this.List.push(this.courseLists[i])
                }
                // 对最大课程页变量进行计算
                this.maxCourse = this.courseLists.length % 10 === 0 ? parseInt(this.courseLists.length / 10) : parseInt(this.courseLists.length / 10) + 1
                this.$store.commit('setSearch', this.input)
            }
        }, 5000),
        // // 将数据进行拆分并重组
        strSplit(str) {
            // 先对目标字段进行定位
            const index = str.indexOf('' + this.content)
            // 创建结果数组进行数据
            const result = []
            // 当索引为0时的情况(对应的算法设计)
            if (index === 0) {
                result.push(str.substring(index, index + this.content.length))
                result.push(str.substring(index + this.content.length, str.length))
            } else {
                // 当索引不为0时的情况(对应的算法设计)
                result.push(str.substring(0, index))
                result.push(str.substring(index, index + this.content.length))
                result.push(str.substring(index + this.content.length, str.length))
            }
            // 返回结果集
            return result
        },
        // 点击对应视频跳转方法
        player(url, id) {
            this.$router.push('/math/video/' + url + "/" + id)
        },
        // 上一页功能
        pre() {
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
                this.List = []
                // 将当前页面变量进行减一操作
                this.current--
                // 对应的赋值算法
                for (var i = (this.current - 1) * 10; i < this.current * 10; i++) {
                    this.List.push(this.courseLists[i])
                }
            }
        },
        // 下一页功能
        next() {
            // 先对页面当前页数进行判断
            if (this.current === this.maxCourse) {
                // 信息提示
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '当前已最后一页!!'),
                    position: 'top-left'
                })
            } else {
                // 将当前的数据进行清除操作
                this.List = []

                const size = (this.current + 1) * 10 > this.courseLists.length ? this.courseLists.length : (this.current + 1) * 10
                // 对应的赋值算法
                for (var i = this.current * 10; i < size; i++) {
                    this.List.push(this.courseLists[i])
                }
                // 将当前页面变量进行加一操作
                this.current++;
            }
        }
    }

}
</script>

<style lang="less" scoped>
#course-container {
    width: 100%;

    // height: 36rem;
    padding: 1rem;
    box-sizing: border-box;

    .search-input {
        display: flex;
        width: 70%;
        height: 5rem;
        margin: 0 auto;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;

        .el-input {
            width: 70%;
        }
    }

    .search-box {
        width: 90%;
        min-height: 400px;
        margin: 1rem auto 0 auto;
        box-sizing: border-box;

        // 课程内容最外层盒子样式
        ul {
            display: flex;
            width: 100%;
            height: 75%;
            flex-wrap: wrap;
            list-style: none;
            box-sizing: border-box;

            .reuslt {
                width: 60%;
                color: #9499a0;
                font-size: 0.8rem;
                text-align: center;
                margin: 0.5rem auto 0 auto;

                overflow: hidden;
                text-overflow: ellipsis;
                /* 将对象作为弹性伸缩盒子模型显示 */
                display: -webkit-box;
                /* 限制在一个块元素显示的文本的行数 */
                /* -webkit-line-clamp 其实是一个不规范属性，使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；*/
                -webkit-line-clamp: 2;
                /* 设置或检索伸缩盒对象的子元素的排列方式 */
                -webkit-box-orient: vertical;
            }

            // 个课程内容样式
            li {
                position: relative;
                width: 20%;
                height: 60%;
                text-align: center;
                margin: 0 0 2rem 0;
                box-sizing: border-box;

                div {
                    width: 60%;
                    text-align: left;
                    font-size: 0.8rem;
                    margin: 0.5rem auto 0 auto;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    /* 将对象作为弹性伸缩盒子模型显示 */
                    display: -webkit-box;
                    /* 限制在一个块元素显示的文本的行数 */
                    /* -webkit-line-clamp 其实是一个不规范属性，使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；*/
                    -webkit-line-clamp: 2;
                    /* 设置或检索伸缩盒对象的子元素的排列方式 */
                    -webkit-box-orient: vertical;
                }

                .keyword {
                    color: #f25d8e;
                }

                // li伪元素样式
                &::before {
                    display: none;
                    position: absolute;
                    width: 60%;
                    height: 83%;
                    left: 20%;
                    top: 0;
                    content: '';
                    background: rgba(0, 0, 0, .3) url(@/assets/arr.png) no-repeat center;
                    background-size: 2rem;
                }

                // 鼠标经过li盒子样式
                &:hover::before {
                    display: block;
                }

                // a标签样式
                a {
                    display: block;
                    // height: 87%;
                }

                // 课程图片样式
                img {
                    width: 60%;
                    box-shadow: 5px 5px 8px #888888;
                }
            }
        }

        .pagination {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 0.1rem;
            color: rgb(0, 66, 149);
        }
    }
}
</style>