<template>
    <div id="schedule-container">
        <div class="schedule-box">
            <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
                <el-form-item label="教师姓名">
                    <el-input v-model="sizeForm.name" placeholder="需要预约排班的教师"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="sizeForm.age" placeholder="教师年龄" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="排班时间">
                    <el-select v-model="sizeForm.date2" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系">
                    <el-select v-model="sizeForm.department" clearable placeholder="请选择">
                        <el-option v-for="item in departments" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm('sizeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sizeForm: {
                name: '',
                date1: '',
                date2: '',
                age: '',
                // 教师院系变量
                department: ''
            },
            options: [{
                value: '08:00 ~ 10:00',
                label: '08:00 ~ 10:00'
            }, {
                value: '10:00 ~ 12:00',
                label: '10:00 ~ 12:00'
            }, {
                value: '14:00 ~ 16:00',
                label: '14:00 ~ 16:00'
            }, {
                value: '16:00 ~ 18:00',
                label: '16:00 ~ 18:00'
            }],
            departments: [{
                value: '计算机学院',
                label: '计算机学院'
            }, {
                value: '数学学院',
                label: '数学学院'
            }, {
                value: '文学院',
                label: '文学院'
            }, {
                value: '外文学院',
                label: '外文学院'
            }, {
                value: '美术学院',
                label: '美术学院'
            }],

        };
    },
    methods: {
        async submitForm() {
            const date1 = this.sizeForm.date1
            const date = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ' (' + this.currentWeek() + ')'

            const { data: res } = await this.$http.get('/insertSchedule', {
                params: {
                    "name": this.sizeForm.name,
                    "age": this.sizeForm.age,
                    "department": this.sizeForm.department,
                    "date": this.sizeForm.date2,
                    "day": date
                }
            })

            if (res === 1) {
                this.$message.success('添加成功！')
            } else {
                this.$message.error('添加失败')
            }

            this.resetForm()
        },
        resetForm() {
            this.sizeForm = {
                name: '',
                date1: '',
                date2: '',
                age: '',
                // 教师院系变量
                department: ''
            }
        },
        currentWeek() {
            const now = new Date()
            switch (now.getDay()) {
                case 0:
                    return '周日'
                    break
                case 1:
                    return '周一'
                    break
                case 2:
                    return '周二'
                    break
                case 3:
                    return '周三'
                    break
                case 4:
                    return '周四'
                    break
                case 5:
                    return '周五'
                    break
                case 6:
                    return '周六'
                    break
            }
        }
    }
}
</script>

<style lang="less" scoped>
#schedule-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // background-color: rgba(245, 247, 250, 1);

    .schedule-box {
        display: table;
        width: 60%;
        height: 100%;
        margin: 0 auto;

        /deep/.el-form {
            display: table-cell;
            vertical-align: middle;
        }

        .el-select {
            display: block;
        }
    }
}
</style>