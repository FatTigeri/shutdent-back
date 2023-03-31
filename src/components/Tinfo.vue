<template>
    <div id="container">
        <el-card class="mybox-card">
            <div>
                <span class="tname">{{ tname }}</span>
            </div>
            <el-tabs v-model="activeName" type="card" class="myeltab">
                <el-tab-pane label="个人主页" name="first">
                    <el-descriptions title="个人信息" direction="vertical" :column="4" border class="mydes">
                        <el-descriptions-item label="姓名" content-class-name="my-content">
                            {{ teacher.tname }}
                        </el-descriptions-item>
                        <el-descriptions-item label="从事" content-class-name="my-content1">
                            {{ teacher.tinfo }}
                        </el-descriptions-item>
                        <el-descriptions-item label="手机号" :span="2" content-class-name="my-content">
                            {{ teacher.tphone }}
                        </el-descriptions-item>
                        <el-descriptions-item label="邮箱" content-class-name="my-content1">
                            {{ teacher.temail }}
                        </el-descriptions-item>
                        <el-descriptions-item label="善长教学内容" content-class-name="my-content">
                            {{ teacher.tvideos }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-tab-pane>
                <el-tab-pane label="发布视频" name="second">
                    <el-row class="myrrow">
                        <el-col :span="6" v-for="(tvideo, tname) in tvideos" :key="tname">
                            <div class="myvideo" @click="linkTo(tvideo.url, tvideo.cid)">
                                <img :src="'http://1.12.235.213/img/' + tvideo.cover">
                                <a href="javascript:void(0);" style="font-size:0.75rem;">{{
                                    tvideo.contents }}</a>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="私聊TA" name="third"></el-tab-pane>
            </el-tabs>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
            tname: "",
            teacher: {},
            tvideos: [],
        };
    },
    created: function () {
        this.tname = window.sessionStorage.getItem("tname");
        this.$http.get("/getByid?tid=" + window.sessionStorage.getItem("tid")).then((response) => {
            this.teacher = response.data[0];
        });
        this.$http.get("/getCourseByTeacher?teacher=" + window.sessionStorage.getItem("tname")).then((response) => {
            this.tvideos = response.data;
        });
    },
    methods: {
        linkTo(url, cid) {
            this.$message.success('前往视频播放页面成功!');
            this.$router.push('/math/video/' + url + '/' + cid);
        }
    }
};
</script>

<style lang="less" scoped>
#container {
    .text {
        font-size: 1.25rem;
    }

    .item {
        margin-bottom: 1.125rem;
    }

    /deep/ .my-content {
        background: #E1F3D8;
    }

    /deep/ .my-content1 {
        background: #FDE2E2;
    }

    .tname {
        font-size: 1.5rem;
        margin-left: 44%;
    }

    .mybox-card {
        width: 50rem;
        margin-left: 15%;
        margin-top: 2.5rem;
        height: 34.375rem;
        padding-bottom: 1.25rem;
    }

    .myeltab {
        margin-top: .9375rem;
    }

    .mydes {
        margin-top: 3.125rem;
        margin-left: 9%;
        width: 82%;
    }

    .myvideo {
        position: relative;
        margin: 0 1.25rem;

        img {
            display: block;
            width: 120px;
            height: 120px;
        }

        a {
            color: black;
            font-weight: normal;
            text-decoration: none;
            text-overflow: ellipsis;
            overflow: hidden;

            &:hover {
                color: purple
            }
        }
    }
}
</style>
