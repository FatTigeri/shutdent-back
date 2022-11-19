<template>
    <!-- 整个页面响应式布局 -->
    <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- (一) 用户全部标签 -->
            <div id="register-container">
                <!-- 1.2 用户注册内容框内容 -->
                <div class="register">
                    <!-- 1.2.1 用户注册框头部文字 -->
                    <div class="text">
                        <h3>希冀数学用户注册</h3>
                    </div>
                    <!-- 1.2.2 用户注册内容框 -->
                    <div class="container">
                        <!-- 1.2.2.1 用户注册表单内容 -->
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                            class="demo-ruleForm">
                            <!-- 1.2.2.1.1 用户名输入框 -->
                            <el-form-item label="用户名:" prop="username">
                                <el-input type="username" v-model.trim="ruleForm.username" autocomplete="off"
                                    prefix-icon="el-icon-user">
                                </el-input>
                            </el-form-item>
                            <!-- 1.2.2.1.2 密码输入框 -->
                            <el-form-item label="密码:" prop="pass">
                                <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off"
                                    prefix-icon="el-icon-lock" show-password></el-input>
                            </el-form-item>
                            <!-- 1.2.2.1.3 确认密码输入框 -->
                            <el-form-item label="确认密码:" prop="checkPass">
                                <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off"
                                    prefix-icon="el-icon-lock" show-password>
                                </el-input>
                            </el-form-item>
                            <!-- 1.2.2.1.4 头像上传按钮框 -->
                            <el-form-item label="头像上传:">
                                <el-button type="" size="mini" @click="dialogFormVisible = true"
                                    :disabled="ruleForm.username === '' || ruleForm.password === '' || ruleForm.checkPass === ''">
                                    上传<i class="el-icon-upload el-icon--right"></i>
                                </el-button>
                            </el-form-item>
                            <!-- 1.2.2.1.5 用户确定和取消按钮框 -->
                            <el-form-item>
                                <el-button type="primary" size="mini" @click="submitForm" :disabled="flag">提交
                                </el-button>
                                <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <!-- (二) 用户头像上传模态框-->
            <el-dialog title="头像上传功能" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <!-- 进行头像消息的提醒  -->
                    <el-form-item label="">
                        <i><strong>提议:为防止缩放,请上传1:1图片</strong></i>
                    </el-form-item>
                    <!-- 2.1 头像上传 -->
                    <el-form-item label="" :label-width="formLabelWidth">
                        <!-- 2.1.1 头像上传框 -->
                        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:178px">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <!-- 用户注册确定和取消按钮 -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="success" size="mini">确 定</el-button>
                </div>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'register',
    data() {
        // 使用异步交互进行新用户注册名验证功能
        var validateUsername = async (rule, value, callback) => {
            // 当且仅当用户名不为空才进行下列的内容验证
            if (value === '') {
                callback(new Error('请输入数字, 字母或下划线的4-16位用户名。'));
            } else if (value !== '') {
                // 先使用正则表达式进行用户名表单认证
                const reg = /^[a-zA-Z0-9_-]{4,16}$/
                if (reg.test(value)) {
                    const { data: res } = await this.$http.post("/cUsername", this.$qs.stringify({
                        "username": value
                    }))
                    // 当后端接口返回的是已存在该用户的字符串信息时，进行相应的提示
                    if (res === 'exists') {
                        // 提示用户存在
                        callback(new Error('用户已存在。'))
                    } else {
                        callback();
                    }
                } else {
                    callback('用户名非法。')
                }
            }
        };
        // 用户新密码验证
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入6-16位至少1个大写字母,1个小写字母,1个数字,1个特殊字符密码。'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                // 先使用正则表达式进行密码表单认证
                const req = /^\S*(?=\S{6,16})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
                if (!req.test(value)) {
                    callback('密码非法。')
                }
                callback();
            }
        };
        // 用户确认新密码验证
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                this.flag = true;
                callback(new Error('请再次输入密码。'));
            } else if (value !== this.ruleForm.pass) {
                this.flag = true;
                callback(new Error('两次输入密码不一致!'));
            } else {
                this.flag = false;
                callback();
            }
        };
        return {
            // 用户注册表单内容
            ruleForm: {
                username: '',
                pass: '',
                checkPass: '',
            },
            // 用户注册规则
            rules: {
                username: [{
                    validator: validateUsername, trigger: 'blur'
                }],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            dialogFormVisible: false,
            form: {
                name: '',
            },
            formLabelWidth: '120px',
            dialogImageUrl: '',
            dialogVisible: false,
            // 新用户头像上传到服务器的网址
            uploadUrl: 'http://1.12.235.213:8088/api/upload',
            imageUrl: '',
            // 控制注册功能按钮是否为禁用变量
            flag: true
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 用户注册提交表单方法，进行注册信息的传输
        async submitForm() {
            // 获取Vuex中用户上传的头像名
            const fileName = this.$store.state.upLoadImg;
            // 调用后端的接口进行用户信息的注册
            const { data: res } = await this.$http.post("/insertUser", this.$qs.stringify({
                "username": this.ruleForm.username,
                "password": this.ruleForm.pass,
                "img_url": fileName
            }))
            // 对接收到前端的结果集进行判断
            if (res === 'success') {
                // 页面对用户进行消息的提示
                this.$message({
                    type: 'success',
                    message: '注册成功!'
                })
                // 使用编程式导航，前往用户登录页面
                this.$router.push("/login")
            }
        },
        // 用户注册头像上传按钮信息提示函数
        success() {
            this.dialogFormVisible = false
            this.$notify({
                title: '成功',
                message: '头像上传成功！',
                type: 'success'
            });
        },
        handleAvatarSuccess(res, file) {
            this.$store.commit('setImgName', res)
            this.imageUrl = URL.createObjectURL(file.raw);

        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是JPG');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style lang="less" scoped>
// 使用响应式布局会产生对应的布局偏差，因此使用媒体特征进行布局
@media (min-width: 345px) and (max-width: 768px) {
    .register {
        width: 28.839333rem !important;
        height: 24.404rem !important;
    }

    /deep/ .el-dialog {
        width: 90%;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }
}

// 当用户显示屏小于768px时对应的样式
@media (max-width: 768px) {
    html {
        font-size: 12px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

}

// 当用户显示屏大于768px小于992px时对应的样式
@media (min-width: 768px) and (max-width: 992px) {
    html {
        font-size: 13px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

}

// 当用户的显示屏大于992px但是小于1200px时对应的样式
@media (min-width: 992px) and (max-width: 1200px) {
    html {
        font-size: 14px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

}


// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) and (max-width: 1279.9px) {
    html {
        font-size: 15px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }
}

@media (min-width:1280px) and (max-width: 1399.9px) {
    html {
        font-size: 16px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }
}

@media (min-width: 1399.9px) and (max-width: 1559.9px) {
    html {
        font-size: 17px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

    .register {
        height: 24.404rem !important;

        /deep/.el-form-item {
            height: 2.8rem !important;
        }
    }

}

@media(max-width: 2059.9px) and (min-width: 1560px) {
    html {
        font-size: 22.5px;
        font-family: Arial, sans-serif;
    }

    .el-notification,
    .left,
    .right {
        background: white !important;
    }

    .register {
        height: 24.404rem !important;

        /deep/.el-form-item {
            height: 2.8rem !important;
        }
    }
}


// register页面的最大包含框样式
#register-container {
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    background: url('../assets/login-bg.jpg') no-repeat;
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;

    // register页面的文字介绍内容
    .register-text {
        width: 30%;
        height: 25%;
        color: purple;
        line-height: 6.6666rem;
        margin: 0 0 0 8.5rem;
        font-size: 22px;

        h3 {
            width: 100%;
            height: 100%;
        }
    }

    // 用户注册内容样式
    .register {
        position: relative;
        width: 35.839333rem;
        height: 26.404rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(250, 250, 250, .95);

        .el-form-item {
            margin-bottom: 1.4666rem !important;
        }

        // 用户注册文字样式
        .text {
            width: 100%;
            height: 15%;
            color: purple;
            text-align: center;
            line-height: 3.960666rem;
            text-shadow: 0.1em 0.1em 0.5em #333;
        }

        // 各输入框内容样式
        .container {
            width: 100%;
            height: 85%;
            margin: 2% 0 0 0;

            // 输入框样式
            /deep/ .el-input__inner {
                width: 88%;
            }
        }
    }
}


.avatar-uploader,
.el-upload {
    width: 11.8666rem;
    height: 11.8666rem;
    border: 0.0666rem dashed #d9d9d9;
    border-radius: 0.4rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 1.8666rem;
    color: #8c939d;
    width: 11.8666rem;
    height: 11.8666rem;
    line-height: 11.8666rem;
    text-align: center;
}

.avatar {
    height: 11.8666rem;
    display: block;
}
</style>