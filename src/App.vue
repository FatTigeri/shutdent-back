<template>
    <div id="container">
        <router-link to="/home"></router-link>
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
}
</style>