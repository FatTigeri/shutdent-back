<template>
    <div id="container">
        <!-- 首页就是home.vue的展示 -->
        <router-link to="/math/home"></router-link>
        <!-- router占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="less" scoped>
html,
body {
    width: 100%;
    height: 100%;
    font-family: 'Montserrat';
}
</style>