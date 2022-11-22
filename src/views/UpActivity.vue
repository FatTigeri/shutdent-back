<template>
    <el-row :gutter="0" style="height: 100%;">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 100%;">
            <!-- 线下活动最外层盒子 -->
            <div id="container">
                <!-- 线下活动里层盒子 -->
                <div class="activity-form">
                    <!-- 控制表单标签的位置单选按钮 -->
                    <el-radio-group v-model="labelPosition" size="small">
                        <el-radio-button label="left">左对齐</el-radio-button>
                        <el-radio-button label="right">右对齐</el-radio-button>
                    </el-radio-group>
                    <!-- 线下活动表单 -->
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                        <!-- 活动标题 -->
                        <el-form-item label="活动标题:">
                            <el-input v-model="formLabelAlign.title"></el-input>
                        </el-form-item>
                        <!-- 活动标题内容 -->
                        <el-form-item label="活动介绍:">
                            <el-input v-model="formLabelAlign.contents"></el-input>
                        </el-form-item>
                        <!-- 活动举办院系 -->
                        <el-form-item label="举办院系:">
                            <el-select v-model="activity.department" placeholder="请选择院系" style="float: left;">
                                <el-option label="计算机学院" value="计算机学院"></el-option>
                                <el-option label="数学学院" value="数学学院"></el-option>
                                <el-option label="文学院" value="文学院"></el-option>
                                <el-option label="外文学院" value="外文学院"></el-option>
                                <el-option label="美术学院" value="美术学院"></el-option>
                                <el-option label="音乐学院" value="音乐学院"></el-option>
                                <el-option label="政法学院" value="政法学院"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 活动图片上传 -->
                        <el-form-item label="图片上传:">
                            <el-upload class="upload-demo" action="http://1.12.235.213:8088/api/upload"
                                :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                                multiple :on-success="handleAvatarSuccess" :limit="1" :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <!-- 表单按钮 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submit" size="mini" :disabled="flag">确 定
                        </el-button>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            // 控制表单标签位置标签
            labelPosition: 'right',
            // 活动表单对象
            formLabelAlign: {
                name: '',
                contents: '',
            },
            // 活动表单对象
            activity: {
                department: ''
            },
            // 图片文件数组
            fileList: [],
            // 控制上传按钮是否禁用变量
            flag: true,
            // 接收后端返回来的图片名
            imgName: ''
        };
    },
    methods: {
        // 确定提交活动表单对象数组
        async submit() {
            const { data: res } = await this.$http.get('/addActivity', {
                params: {
                    "activity": this.formLabelAlign.contents,
                    "department": this.activity.department,
                    "title": this.formLabelAlign.name,
                    "image": this.imgName
                }
            })
            if (res === 1) {
                this.$message.success('活动添加成功!')
            } else {
                this.$message.error('活动添加失败！')
            }
            this.formLabelAlign = {}
            this.activity = {}
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
// 最外层盒子样式
#container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    // 活动盒子样式
    .activity-form {
        width: 75%;
        height: 95%;
        box-sizing: border-box;
        // border: 1px solid red;
    }
}
</style>