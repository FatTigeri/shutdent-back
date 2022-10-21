<template>
    <div id="student-container">
        <div class="student-box">
            <ul>
                <li>
                    <img :src="getSrc('' + studentsList[0].imgSrc)" alt="blank">
                    <span>{{ studentsList[0].username }}</span>
                </li>
                <li>
                    <img :src="getSrc('' + studentsList[1].imgSrc)" alt="blank">
                    <span>{{ studentsList[1].username }}</span>
                </li>
                <li>
                    <img :src="getSrc('' + studentsList[2].imgSrc)" alt="blank">
                    <span>{{ studentsList[2].username }}</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
                <li>
                    <img :src="circleUrl" alt="blank">
                    <span>XXX</span>
                </li>
            </ul>
        </div>
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
            imgSrc: ''
        }
    },
    methods: {
        async getStudents() {
            const { data: res } = await this.$http.get('/getUsers')
            this.studentsList = res
            console.log(this.studentsList);
        },
        getSrc(src) {
            return require('@/assets/' + src)
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
    height: 100%;
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
        border: 1px solid red;

        ul {
            display: flex;
            width: 100%;
            height: 100%;
            list-style: none;
            box-sizing: border-box;
            border: 1px solid red;
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