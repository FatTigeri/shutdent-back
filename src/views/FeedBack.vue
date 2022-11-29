<template>
    <div id="feedback-container">
        <ul>
            <li v-for="item in currentList" :key="item.id">
                <div class="feedback-box"><span>留言: {{ item.feedback }}</span></div>
                <div class="date-box"><span>发布时间: {{ item.date }}</span></div>
            </li>
            <div class="pagination">
                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="pre">
                </el-button>
                <el-button type="primary" size="mini" @click="next"><i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'feedback',
    created() {
        this.initFeedbackList()
    },
    data() {
        return {
            currentList: [],
            feedbackList: [],
            current: 1,
            maxPages: 0
        }
    },
    methods: {
        async initFeedbackList() {
            const { data: res } = await this.$http.get('/getFeedBack')

            if (res !== '') {
                this.feedbackList = res
            }

            const size = this.feedbackList >= 5 ? 5 : this.feedbackList.length

            for (let i = 0; i < size; i++) {
                this.currentList.push(this.feedbackList[i])
            }
            if (this.feedbackList.length % 5 === 0) {
                // 刚好整除，直接赋值
                this.maxPages = parseInt(this.feedbackList.length / 5)
            } else {
                // 非整除，加一操作
                this.maxPages = parseInt(this.feedbackList.length / 5) + 1
            }
        },
        // 上一页功能
        pre() {
            // 先对页面当前页数进行判断
            if (this.current === 1) {
                // 信息提示
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '当前已是第一页!!'),
                    position: 'top-left'
                })
            } else {
                // 将当前的数据进行清除操作
                this.currentList = []
                // 将当前页面变量进行减一操作
                this.current--
                // 对应的赋值算法
                for (var i = (this.current - 1) * 5; i < this.current * 5; i++) {
                    this.currentList.push(this.feedbackList[i])
                }
            }
        },
        // 下一页功能
        next() {
            // 先对页面当前页数进行判断
            if (this.current === this.maxPages) {
                // 信息提示
                const h = this.$createElement;
                this.$notify({
                    title: '消息提示',
                    message: h('i', { style: 'color: teal' }, '当前已最后一页!!'),
                    position: 'top-left'
                })
            } else {
                // 将当前的数据进行清除操作
                this.currentList = []
                // 计算数组的size值
                const size = (this.current + 1) * 5 > this.feedbackList.length ? this.feedbackList.length : (this.current + 1) * 5
                // 对应的赋值算法
                for (var i = this.current * 5; i < size; i++) {
                    this.currentList.push(this.feedbackList[i])
                }
                // 将当前页面变量进行加一操作
                this.current++;
            }

        },
    }
}
</script>

<style lang="less" scoped>
#feedback-container {
    display: flex;
    height: 100%;
    padding: 1rem;
    align-items: center;
    box-sizing: border-box;
    border: 0.1rem solid #c9c9c9;
    background: rgba(250, 250, 250, 1);

    ul {
        width: 80%;
        height: 90%;
        margin: 0 auto;
        list-style: none;

        li {
            width: 100%;
            height: 15%;
            font-size: 0.9rem;
            box-sizing: border-box;
            border: 1px solid black;

            .feedback-box {
                height: 49%;
                padding: 0 1rem;
                text-align: left;
                box-sizing: border-box;
                color: rgb(212, 39, 97);
            }

            .date-box {
                height: 50%;
                padding: 0 1rem;
                text-align: right;
                box-sizing: border-box;

                span {
                    color: green;
                }
            }
        }

        .pagination {
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 0.7rem;
            color: rgb(0, 66, 149);
        }

    }

}
</style>