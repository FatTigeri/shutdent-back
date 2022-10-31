<template>
    <div>
        <!-- 此页面用来进行网页间的跳转，没有其他意义 -->
    </div>
</template>

<script>
export default {
    created() {
        this.$router.replace('/math/resource/examination')
    },
    data() {
        return {
            yes: 'yes',
        }
    }
}
</script>

<style>

</style>