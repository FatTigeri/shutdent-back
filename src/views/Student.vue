<template>
    <div id="student-container">
        <el-row :gutter="0" style="height: 100%">
            <el-col :xs="24" style="height: 100%">
                <div class="student-box">
                    <ul>
                        <li v-for="item in studentsList" :key="item.id">
                            <img :src="getSrc('' + item.imgSrc)" alt="blank" @click="show(item.username)">
                            <span>{{ item.username }}</span>
                        </li>
                    </ul>
                </div>
                <el-dialog title="ta问过:" :visible.sync="dialogTableVisible" append-to-body>
                    <el-table :data="gridData">
                        <el-table-column property="date" label="日期" width="190"></el-table-column>
                        <el-table-column property="comments" label="问题" width="280"></el-table-column>
                        <el-table-column property="grade" label="年级"></el-table-column>
                    </el-table>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'student',
    created() {
        this.getStudents()
    },
    data() {
        return {
            studentsList: [],
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            imgSrc: '',
            dialogTableVisible: false,
            gridData: [],
        }
    },
    methods: {
        // 初始化页面学生信息方法
        async getStudents() {
            // 调用接口
            const { data: res } = await this.$http.get('/getUsers')
            // 结果赋值
            this.studentsList = res
        },
        // 教师点击学生头像展示该学生问过的问题方法
        async show(name) {
            this.dialogTableVisible = true
            const { data: res } = await this.$http.get('/getQuestion?questioner=' + name)
            this.gridData = res
        },
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
        },
        click(index) {
            console.log(index);
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

* {
    margin: 0;
    padding: 0;
}

#student-container {
    width: 100%;
    height: 99%;
    padding: 1rem;
    box-sizing: border-box;
    border: 0.1rem solid #c9c9c9;
    background: rgba(250, 250, 250, 1);

    .student-box {
        position: relative;
        height: 95%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        ul {
            display: flex;
            width: 100%;
            height: 100%;
            list-style: none;
            box-sizing: border-box;
            flex-wrap: wrap;
            flex-direction: row;

            li {
                width: 25%;
                height: 33%;
                text-align: center;
                box-sizing: border-box;

                img {
                    width: 80px;
                    height: 80px;
                    cursor: pointer;
                    margin: 0.5rem 0 0 0;
                    border-radius: 50%;
                }

                span {
                    display: block;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>