<template>
    <div id="container">
        <layout></layout>
        <router-link to="/home"></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import layout from '@/components/Layout.vue'
export default {
    components: { layout },
    name: 'App',
}
</script>

<style lang="less" scoped>
html,
body {
    width: 100%;
    height: 100%;
}
</style>