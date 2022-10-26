<template>
    <div id="video-container">
        <div class="video-box">
            1
        </div>
        <div class="video-wrap">
            1
        </div>
    </div>
</template>

<script>
export default {
    name: 'video'
}
</script>

<style lang="less" scoped>
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {

    html,
    #home-container {
        font-size: 12px;
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

body,
html {
    width: 100%;
    height: 100%;
}

#video-container {
    display: flex;
    width: 100%;
    min-height: 500px;
    box-sizing: border-box;
    border: 1px solid red;

    .video-box {
        width: 60%;
        height: 380px;
        margin: 1rem;
        box-sizing: border-box;
        border: 1px solid red;
    }

    .video-wrap {
        width: 30%;
        min-height: 400px;
        margin: 1rem;
        box-sizing: border-box;
        border: 1px solid red;
    }
}
</style>