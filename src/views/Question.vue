<template>
    <div id="question-container">
        <div class="question-box">
            <el-form>
                <!-- 输入框内容 -->
                <el-input type="textarea" :rows="4" placeholder="请输入您出现的数学问题" v-model="textarea"></el-input>
                <el-upload class="upload-demo" action="http://1.12.235.213:8088/api/upload" :on-preview="handlePreview"
                    :on-remove="handleRemove" :before-remove="beforeRemove" multiple :on-success="handleAvatarSuccess"
                    :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <!-- 年级单选框 -->
            <el-radio-group v-model="grade" style="margin: 0.5rem 0">
                <el-radio label="一年级">一年级</el-radio>
                <el-radio label="二年级">二年级</el-radio>
                <el-radio label="三年级">三年级</el-radio>
                <el-radio label="四年级">四年级</el-radio>
                <el-radio label="五年级">五年级</el-radio>
                <el-radio label="六年级">六年级</el-radio>
            </el-radio-group>
            <!-- 问题类型单选框 -->
            <el-radio-group v-model="type">
                <el-radio label="基础知识">基础知识问题</el-radio>
                <el-radio label="三角和问题">三角和问题</el-radio>
                <el-radio label="数运算问题">数运算问题</el-radio>
                <el-radio label="圆计算问题">圆计算问题</el-radio>
                <el-radio label="试卷真题问题">试卷真题问题</el-radio>
            </el-radio-group>
            <div class="btns">
                <el-button plain size="mini">取消</el-button>
                <el-button type="primary" size="mini" @click="submit">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'question',
    data() {
        return {
            textarea: '',
            grade: '一年级',
            type: '三角和问题',
            // 表单模态框宽度变量
            formLabelWidth: '120px',
            fileList: [],
            // 接收后端传过来的图片
            imgName: '',
        }
    },
    methods: {
        async submit() {
            if (this.textarea !== '') {
                // 获取当前用户的姓名
                var questioner = window.localStorage.getItem('token')
                // 将评论内容发送到后端，并存进数据库
                const { data: res } = await this.$http.get('/question', {
                    params: {
                        "question": this.textarea,
                        "grade": this.grade,
                        "problem": this.type,
                        "questioner": questioner,
                        "image": this.imgName
                    }
                })
                // 当后端返回的数据res > 0 时(即此时插入语句成功执行了)， 进行对应的消息提醒
                if (res > 0) {
                    const h = this.$createElement;
                    this.$notify({
                        title: '消息提示',
                        message: h('i', { style: 'color: teal' }, '您的疑惑已提交到后台~~~')
                    })
                }
            } else {
                // 若用户提问的问题内容为空
                this.$message.error('提问内容不能为空！！')
            }
            // 最后将后续的变量修改
            this.textarea = ''
        },
        // 当用户图片上传成功后，接收后端返回来的图片名
        handleAvatarSuccess(res, file) {
            // 使用imgName变量进行接收图片在服务器中的名称
            this.imgName = res
            this.flag = false
            console.log(this.imgName);
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        handlePreview(file) {
            console.log(file);
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
}
</script>

<style lang="less" scoped>
#question-container {
    display: table;
    width: 100%;
    height: 100%;
    align-items: center;
    border: 0.0333rem solid #ccc;
    box-sizing: border-box;

    .question-box {
        display: table-cell;
        vertical-align: middle;
        width: 80%;
        height: 100%;
        margin: 0 auto;
        box-sizing: border-box;

        .el-textarea {
            margin: 0 0 1rem 0;
            width: 80% !important;
        }

        .btns {
            margin: 1.5rem 0 0 0;

            .el-button {
                margin: 0 5rem;
            }
        }
    }
}
</style>