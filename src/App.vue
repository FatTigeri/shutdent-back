<template>
    <div id="container">
        <!-- 首页就是home.vue的展示 -->
        <router-link to="/math/home"></router-link>
        <!-- router占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
import layout from '@/components/Layout.vue'
import administrator from '@/components/Administrator.vue'
export default {
    components: { layout, administrator },
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