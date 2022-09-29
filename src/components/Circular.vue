<template>
    <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div id="circular-container">
                <div class="header">
                    希冀数学趣味小课堂
                </div>
                <div class="contents">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="故事起源" name="first">故事起源</el-tab-pane>
                        <el-tab-pane label="数学家介绍" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'circular',
    created() {
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    }
}
</script>

<style lang="less" scoped>
body,
html {
    width: 100%;
    height: 100%;
}

#circular-container {
    width: 100%;
    height: 44.53333rem;
    color: white;
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;

    .header {
        width: 100%;
        height: 4rem;
        font-size: 1.3333rem;
        font-weight: 600;
        line-height: 4rem;
        color: purple;
        text-align: center;
        text-shadow: 0.1em 0.1em 0.5em #333;
        // border: 1px solid red;
    }

    .contents {
        position: relative;
        top: 30%;
        left: 50%;
        width: 90%;
        height: 60%;
        transform: translate(-50%, -50%);
        border: 1px solid red;
    }
}
</style>