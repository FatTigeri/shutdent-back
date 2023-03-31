<template>
    <div id="container">
        <el-card class="box-card" shadow="always" v-for="(teacher, tid) in teachers" :key="tid"
            style="margin:0.625rem;width:80%;margin-left:9%;">
            <div slot="header" class="clearfix">
                <span style="font-size:1.375rem;" ref='tname'>{{ teacher.tname }}</span>
                <el-button style="float: right; padding: 0.1875rem 0" type="text"
                    @click="Tenter(teacher.tid, teacher.tname)">进入主页</el-button>
            </div>
            <div class="text item">
                <span style="float:left;font-size:1.0625rem;">好评&nbsp;&nbsp;&nbsp;</span>
                <el-rate v-model="teacher.tscore" disabled show-score text-color="#ff9900" :score-template="teacher.tscore"
                    style="float:left">
                </el-rate>
            </div>
            <br>
            <div>
                学科优势:&nbsp;&nbsp;
                <a href="javascript:void(0)">{{ teacher.tvideos }}</a>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    beforecreate() {
        window.sessionStorage.setItem("grade", this.$route.params.id);
    },
    data: function () {
        return {
            teachers: [],
        }
    },
    created: function () {
        this.$http.get("/findtByg?tgrade=" + this.$route.params.id).then((response) => {
            this.teachers = response.data;
        })
    },
    methods: {
        Tenter(tid, tname) {
            window.sessionStorage.setItem("tid", tid);
            window.sessionStorage.setItem("tname", tname);
            this.$router.push("/math/Tresource/tInfo/");
        }
    }
}
</script>

<style lang="less" scoped>
#container {
    margin: 1.875rem 0;

    a {
        color: purple;
        text-decoration: none;
    }

    .box-card {
        width: 30rem;

        .text {
            font-size: 0.875rem;
        }

        .item {
            margin-bottom: 1.125rem;
        }
    }
}

.myfont1 {
    font-size: 1.25rem;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
