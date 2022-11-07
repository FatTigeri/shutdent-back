<template>
    <el-row :gutter="0" style="height: 100%;">
        <el-col :xs="24" style="height: 99%;">
            <div id="problem-container">
                <!-- 内容盒子 -->
                <div class="content-box">
                    <!-- 搜索框盒子 -->
                    <div class="search-box">
                        <div class="search">
                            <el-input placeholder="问题类型 / 年级" prefix-icon="el-icon-search" v-model="input1"
                                @keydown.enter.native="search">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </div>

                    <div class="problems-box">
                        <!-- 学生问题内容显示 -->
                        <ul>
                            <li v-for="item in currentList" :key="item.id" @click="getProblem(item.id)">
                                <div class="problem">
                                    <i>问:</i>&nbsp;&nbsp;
                                    <span>{{ item.comments }}</span>
                                </div>
                                <div class="type">
                                    <span>{{ item.problem }}</span>
                                    <span>{{ item.grade }}</span>
                                    <span>{{ item.questioner }}</span>
                                </div>
                            </li>
                            <div class="pagination">
                                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="pre">
                                </el-button>
                                <el-button type="primary" size="mini" @click="next"><i
                                        class="el-icon-arrow-right el-icon--right"></i>
                                </el-button>
                            </div>
                        </ul>
                    </div>
                    <el-dialog title="问题回复" :visible.sync="dialogFormVisible" append-to-body>
                        <el-form :model="form">
                            <el-form-item label="" :label-width="formLabelWidth">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="答案上传:" :label-width="formLabelWidth">
                                <el-upload class="upload-demo" action="http://1.12.235.213:8088/api/upload"
                                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                                    :on-success="handleAvatarSuccess" multiple :limit="1" :on-exceed="handleExceed"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                            <el-button type="primary" @click="submit" size="mini" :disabled="flag">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mydebounce } from '@/utils/index.js'
export default {
    name: 'problem',
    created() {
        // 调用初始化学生问题方法
        this.initProblem()
    },
    computed: {
        flag: function () {
            return this.textarea === '';
        }
    },
    data() {
        return {
            input1: '',
            problemList: [],
            currentList: [],
            current: 1,
            maxPages: 0,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            centerDialogVisible: false,
            fileList: [],
            // 问题回复框内容
            textarea: '',
            // 接收后端返回来的图片名
            imgName: '',
            // 接收当前问题的id
            qid: 0,
        }
    },
    methods: {
        // 获取后台学生问题数据的方法
        async initProblem() {
            // 调用后台接口
            const { data: res } = await this.$http.get('/getProblems')
            // 将获取到的数据进行接收赋值
            this.problemList = res

            // 计算当前获取的数据长度
            const size = this.problemList.length > 5 ? 5 : this.problemList.length

            // 将需要展示的数据通过for循环赋值给currentList
            for (let i = 0; i < size; i++) {
                this.currentList.push(this.problemList[i])
            }

            // 计算数据的最大页数
            if (this.problemList.length % 5 === 0) {
                // 刚好整除，直接赋值
                this.maxPages = parseInt(this.problemList.length / 5)
            } else {
                // 非整除，加一操作
                this.maxPages = parseInt(this.problemList.length / 5) + 1
            }
        },
        // 教师问题信息搜索方法(使用防抖限制)
        search: mydebounce(function () {
            if (this.input1 === '') {
                this.$notify({
                    title: '信息提示',
                    type: 'error',
                    message: '搜索内容不能为空！'
                })
            } else {
                console.log(this.input1);
                this.$notify({
                    title: '信息提示',
                    type: 'info',
                    message: '功能后续开发中！'
                })
            }
        }, 3000),
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
                this.currentList = []
                // 将当前页面变量进行减一操作
                this.current--
                // 对应的赋值算法
                for (var i = (this.current - 1) * 5; i < this.current * 5; i++) {
                    this.currentList.push(this.problemList[i])
                }
            }
        },
        // 下一页功能
        next() {
            // 先对页面当前页数进行判断
            if (this.current === this.maxPages) {
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
                // 计算数组的size值
                const size = (this.current + 1) * 5 > this.problemList.length ? this.problemList.length : (this.current + 1) * 5
                // 对应的赋值算法
                for (var i = this.current * 5; i < size; i++) {
                    this.currentList.push(this.problemList[i])
                }
                // 将当前页面变量进行加一操作
                this.current++;
            }

        },
        // 教师点击了哪个问题得到对应的问题id值
        getProblem(id) {
            // 将控制问题回复模态框显示的变量赋值为true
            this.dialogFormVisible = true
            // 接收被点击的问题id值用做后续的问题回复做准备
            this.qid = id
        },
        // 教师上传回复信息确定键
        async submit() {
            // 将回复模态框进行隐藏
            this.dialogFormVisible = false
            console.log(this.textarea);
            console.log(typeof this.imgName);
            console.log(this.qid);
            console.log(window.localStorage.getItem('token'))
            // TODO: 调用接口将教师回复的信息进行存进数据库answer中
            const { data: res } = await this.$http.get("/addAnswer", {
                params: {
                    "content": this.textarea,
                    "answerer": window.localStorage.getItem('token'),
                    "image": this.imgName,
                    "qid": this.qid
                }
            })
            if (res === 1) {
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '答案提交成功！')
                })
            }

            // 将答案内容置为空
            this.textarea = ''
        },

        // 当用户图片上传成功后，接收后端返回来的图片名
        handleAvatarSuccess(res, file) {
            // 使用imgName变量进行接收图片在服务器中的名称
            this.imgName = res
        },
        // 用户删除图片成功后触发的函数
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //
        handlePreview(file) {
            console.log(file);
        },
        // 上传图片多于限制时触发的函数
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        // 用户删除图片时触发的函数
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
}
</script>

<style lang="less" scoped>
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {
    html {
        font-size: 12px;
    }

    .contents {
        height: 100% !important;
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

#problem-container {
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border: 0.1rem solid #c9c9c9;
    background: rgba(250, 250, 250, 1);

    .content-box {
        width: 100%;
        height: 100%;

        .search-box {
            width: 100%;
            height: 12%;
            line-height: 49.66px;
            box-sizing: border-box;

            .search {
                width: 70%;
                margin: 0 auto;
            }
        }

        .problems-box {
            width: 100%;
            height: 88%;
            box-sizing: border-box;

            ul {
                position: relative;
                width: 85%;
                height: 90%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                list-style: none;
                // border: 1px solid red;

                li {
                    width: 100%;
                    height: 17%;
                    box-sizing: border-box;
                    border: 1px solid black;

                    .problem {
                        width: 100%;
                        height: 60%;
                        text-align: left;
                        margin: 0 0.5rem;
                        font-weight: 600;
                        font-size: 0.9333rem;
                        line-height: 2.058rem;
                        box-sizing: border-box;
                        color: rgb(212, 39, 97);
                    }

                    .type {
                        width: 100%;
                        height: 40%;
                        text-align: right;
                        padding: 0 1rem;
                        box-sizing: border-box;
                        font-size: 12px !important;


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
}
</style>