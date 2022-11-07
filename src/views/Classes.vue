<template>
    <!-- 优质课堂页面布局 -->
    <div id="classes-container">
        <!-- 包裹各课程的外层盒子 -->
        <div class="classes-box">
            <!-- 最上方的搜索盒子 -->
            <div class="search-btn">
                <!-- 课程信息搜索框 -->
                <el-input size="mini" placeholder="老师 / 关键字" suffix-icon="el-icon-search" v-model.trim="input"
                    @keydown.enter.native="search">
                </el-input>
            </div>
            <ul>
                <!-- v-for指令展示得到的课程内容信息 -->
                <li v-for="item in List" :key="item.cid" @click="player(item.url, item.cid)">
                    <a href="javascript:void(0)"><img :src="getSrc(item.cover)" alt="blank"></a>
                </li>

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
</template>

<script>
// 导入防抖函数
import { mythrollte } from '@/utils/index.js'
export default {
    name: 'classes',
    created() {
        // 执行初始化课程信息函数
        this.initCourseList()
    },
    data() {
        return {
            // 总课程变量
            courseLists: [],
            // 当前页面需要展示的课程变量
            List: [],
            // 接收输入框内容变量
            input: '',
            // 当前课程页变量
            current: 1,
            // 最大课程页变量
            maxCourse: 0
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
            const size = this.courseLists.length > 10 ? 10 : this.courseLists.length
            // 当前页面需要展示的课程变量进行赋值
            for (let i = 0; i < size; i++) {
                this.List.push(this.courseLists[i])
            }
            // 对最大课程页变量进行计算
            this.maxCourse = this.courseLists.length % 10 === 0 ? parseInt(this.courseLists.length / 10) : parseInt(this.courseLists.length / 10) + 1
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
            }
        }, 5000),
        // 获取图片方法
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
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
        },
    }
}
</script>

<style lang="less" scoped>
// 优质课程页面总样式
#classes-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    // 课程盒子样式
    .classes-box {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        box-sizing: border-box;

        // 搜索框盒子样式
        .search-btn {
            width: 40%;
            padding: 1rem;
            margin: 0 auto;
        }

        // 课程内容最外层盒子样式
        ul {
            display: flex;
            width: 100%;
            height: 75%;
            flex-wrap: wrap;
            list-style: none;
            box-sizing: border-box;

            // 个课程内容样式
            li {
                position: relative;
                width: 20%;
                height: 50%;
                box-sizing: border-box;

                // li伪元素样式
                &::before {
                    display: none;
                    position: absolute;
                    width: 50%;
                    height: 75%;
                    left: 25%;
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
                    height: 87%;
                }

                // 课程图片样式
                img {
                    width: 50%;
                    box-shadow: 5px 5px 8px #888888;
                }
            }
        }

        // 分页按钮样式
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