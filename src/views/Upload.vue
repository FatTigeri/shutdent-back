<template>
    <div id="classUpload">
        <el-button type="text" @click="dialogFormVisible = true">填写课程信息</el-button>
        <div class="test2">
            <el-upload class="avatar-uploader el-upload--text" :drag="Plus"
                action="http://1.12.235.213:8088/api/uploadVideo" multiple :show-file-list="false"
                :data="{ SavePath: this.Path.url }" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo"
                :on-progress="uploadVideoProcess">
                <i v-if="Plus" class="el-icon-upload"></i>
                <div v-if="Plus" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent"
                    style="margin-top:30px;"></el-progress>
                <div class="el-upload__tip" slot="tip">只能上传mp4/flv/avi文件，且不超过300M</div>
            </el-upload>

            <el-dialog title="课程信息" :visible.sync="dialogFormVisible" append-to-body center>
                <el-form :model="course">
                    <el-form-item label="课程名称:" :label-width="formLabelWidth">
                        <el-input v-model="course.cname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="授课老师:" :label-width="formLabelWidth">
                        <el-select v-model="course.tname" placeholder="请选择教师">
                            <el-option label="小黄老师" value="小黄老师"></el-option>
                            <el-option label="小江老师" value="小江老师"></el-option>
                            <el-option label="小李老师" value="小李老师"></el-option>
                            <el-option label="小王老师" value="小王老师"></el-option>
                            <el-option label="小梁老师" value="小梁老师"></el-option>
                            <el-option label="小陈老师" value="小陈老师"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程内容介绍:" :label-width="formLabelWidth">
                        <el-input v-model="course.contents" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="封面上传:" :label-width="formLabelWidth">
                        <el-upload class="upload-demo" action="http://1.12.235.213:8088/api/upload"
                            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                            :on-success="handleAvatarSuccess" :limit="1" :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="submit" size="mini" :disabled="flag">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'test2',
    data() {
        return {
            videoForm: {
                videoId: '',
                videoUrl: ''
            },
            videoFlag: false,
            Plus: true,
            Path: {
                url: '/project/math/dist/media/'
            },
            videoUploadPercent: 0,
            dialogFormVisible: false,
            // 接收课程信息对象
            course: {
                // 课程名称
                cname: '',
                // 授课名称
                tname: '',
                // 课程介绍
                contents: ''
            },
            // 表单模态框宽度变量
            formLabelWidth: '120px',
            fileList: [],
            // 控制上传按钮是否禁用变量
            flag: true,
            // 接收后端返回来的图片名
            imgName: ''
        }
    },
    mounted: function () {
    },
    methods: {
        // 课程信息上传函数
        async submit() {
            this.dialogFormVisible = false
            const { data: res } = await this.$http.get("/addCourse", {
                params: {
                    "cname": this.course.cname,
                    "tname": this.course.tname,
                    "contents": this.course.contents,
                    "cover": this.imgName
                }
            })
            if (res === 1) {
                this.$message.success('添加课程信息!')
            } else {
                this.$message.error('添加课程信息失败！')
            }
        },
        // 视频上传前执行
        beforeUploadVideo(file) {
            const isLt300M = file.size / 1024 / 1024 < 300
            if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
                this.$message.error('请上传正确的视频格式')
                return false
            }
            if (!isLt300M) {
                this.$message.error('上传视频大小不能超过300MB哦!')
                return false
            }
        },
        // 视频上传过程中执行
        uploadVideoProcess(event, file, fileList) {
            this.Plus = false
            this.videoFlag = true
            this.videoUploadPercent = file.percentage.toFixed(0)
        },
        // 视频上传成功是执行
        handleVideoSuccess(res, file) {
            this.Plus = false
            this.videoUploadPercent = 100
            console.log(res)
            // 如果为200代表视频保存成功
            if (res.resCode === '200') {
                // 接收视频传回来的名称和保存地址
                // 至于怎么使用看你啦~
                this.videoForm.videoId = res.newVidoeName
                this.videoForm.videoUrl = res.VideoUrl
                this.$message.success('视频上传成功！')
            } else {
                this.$message.error('视频上传失败，请重新上传！')
            }
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
.el-form-item {
    margin-bottom: 1rem;
}

#classUpload {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 0.1rem solid #c9c9c9;



    .test2 {
        width: 100%;
        height: 90%;
        display: table;


        .avatar-uploader {
            margin: 0 auto;
            height: 100%;
            display: table-cell;
            vertical-align: middle;
        }

    }
}
</style>