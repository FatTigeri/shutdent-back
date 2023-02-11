<template>
    <div id="activity-container">
        <div class="functions-fix">
            <ul>
                <!-- 返顶 -->
                <li @click="to"><i class="el-icon-caret-top"></i> 返顶</li>
            </ul>
        </div>
        <!--大图推荐活动-->
        <div class="recommend">
            <!--照片-->
            <img src="../assets/teach.png" class="myimg">
            <!--文字描述-->
            <div class="word">
                <div style="margin-top: 35px;">
                    <a href="#" class="mya1">活动预告 | 希望小学志愿义教活动</a>
                </div>
                <el-divider></el-divider>
                <a href="#" class="mya2">此次志愿者走进希望小学活动，旨在宣传希望工程等公益事业，
                    从而吸引更多的爱心人士与企业投身公益事业，关心与帮助青少年，引起更多人对希望工程的关注。</a>
                <div style="margin-top:150px;float:right;">
                    <el-badge :value="200" :max="99" class="item">
                        <el-button size="small">点赞</el-button>
                    </el-badge>
                    <el-badge :value="100" :max="10" class="item">
                        <el-button size="small">评论</el-button>
                    </el-badge>
                </div>
            </div>
        </div>
        <!--两个活动分类，使用分页标签tab-->
        <div class="mytab">
            <el-tabs type="border-card">
                <!--第一个活动页，使用vue的事件绑定-->
                <el-tab-pane label="活动预告">
                    <el-row v-for="item in activity" :key="item.id" class="myrow">
                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <img :src="getSrc('' + item.image)" class="imgs">
                            </div>
                        </el-col>
                        <el-col :span="19" class="mycol">
                            <div class="grid-content bg-purple-light">
                                <div class="mytitle">
                                    <a :href="'/math/act_content/' + item.id" class="mya3">{{ item.title }}</a>
                                </div>
                                <a :href="'/math/act_content/' + item.id" class="mya4">{{ item.activity }}</a>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!--第二个活动页，同上-->
                <el-tab-pane label="活动回顾">
                    <el-row v-for="ff in forwards" :key="ff.id" class="myrow">
                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <img :src="ff.path" class="imgs">
                            </div>
                        </el-col>
                        <el-col :span="19" class="mycol">
                            <div class="grid-content bg-purple-light">
                                <div class="mytitle">
                                    <a :href="'/math/act_content/' + ff.id" class="mya3">{{ ff.title }}</a>
                                </div>
                                <a :href="'/math/act_content/' + ff.id" class="mya4">{{ ff.contents }}</a>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!--第三个活动页，使用折叠面板-->
                <el-tab-pane label="注意事项">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="1.注意平安" name="1">
                            <div>不攀爬铁架、树木、电线塔、屋顶、窗台、围墙等不平安设施，并与表演台保持适当间隔。不拥挤、不起哄、不酒后驾车，确保自身平安。</div>
                        </el-collapse-item>
                        <el-collapse-item title="2.举止文明" name="2">
                            <div>不乱扔烟头、不随地吐痰、不乱丢食品包装袋等杂物及吃剩的食物。</div>
                        </el-collapse-item>
                        <el-collapse-item title="3.有序停车" name="3">
                            <div>电瓶车、自行车请停放至公共自行车停放点，机动车按现场工作人员指引停放至指定地点。 </div>
                        </el-collapse-item>
                        <el-collapse-item title="4.遵守秩序" name="4">
                            <div>自觉服从管理人员的疏导和劝解，遇有部分人员拥挤时，请保持平稳情绪慢行。 </div>
                            <div>如果发生有人倒地，要立即停顿前进，同时大声呼喊，告之后面的人，防止出现踩踏事故。</div>
                        </el-collapse-item>
                        <el-collapse-item title="5.物品保管" name="5">
                            <div>请保管好自己随身携带的钱包、手机等贵重物品。</div>
                        </el-collapse-item>
                        <el-collapse-item title="6.不惊慌" name="6">
                            <div>遇到停电、下、设备故障等突发情况，不要惊慌乱跑，要在公安民-警和现场工作人员的指挥下有序疏散，并注意收听现场播送提示。 </div>
                        </el-collapse-item>
                        <el-collapse-item title="7.保持联系" name="7">
                            <div>如有拾到遗失物、寻人等紧急事项，请与前台播音控制席联系；如有其它矛盾纠纷，请及时报警或向现场工作人员报告。 </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { toTop } from '@/utils/scrollTop';
import { scrollTop } from '@/utils/scrollTop';
export default {
    name: 'activity',
    created() {
        this.initActivityList()
    },
    mounted() {
        window.addEventListener('scroll', function () {
            scrollTop('.functions-fix')
        })
    },
    data: function () {
        return {
            activity: [],
            forwards: [
                { id: 1, path: require("../assets/team.png"), title: "回顾 | 线下师生交流团建", contents: "活动本着全园师生家长共同参与的原则，营造一个温馨、感恩、细腻的活动氛围，更好的突出活动主题和内容，增强活动的感染力和影响力。" },
                { id: 2, path: require("../assets/lecture.png"), title: "回顾 | 线上名师讲座", contents: "本周将迎来我们特邀的名师来进行一次教师交流讲座，该讲座可以让教师们丰富眼界。" },
                { id: 3, path: require("../assets/voluntary.png"), title: "回顾 | 敬老院志愿活动", contents: "为老年人献上自己的一份爱心，为老年人做一些力所能及的事，送上大学生对老年人的一份关怀，让我们的志愿精神传遍于社会的每一个角落。" },
                { id: 4, path: require("../assets/love.png"), title: "回顾 | 筹书义卖活动", contents: "为了进一步弘扬“奉献，友爱，互助，进步“的志愿者精神，为了给需要帮助的人做一些实实在在的事情，给慈善事业献出自己的一份力量，特此组织这次义卖活动。" }
            ],
            activeNames: ['1']
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        // 初始化线下活动数据
        async initActivityList() {
            const { data: res } = await this.$http.get('/activity')
            this.activity = res
        },
        // 获取图片
        getSrc(src) {
            return 'http://1.12.235.213/img/' + src
        },
        to() {
            toTop()
        }
    }

}
</script>


<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.functions-fix {
    display: none;
    position: fixed;
    width: 7rem;
    top: 88%;
    right: 15px;
    font-size: 14px;
    font-weight: 600;
    z-index: 1000;

    ul {
        list-style: none;
        text-align: center;

        li {
            width: 100%;
            height: 2.3333rem;
            line-height: 2.3333rem;
            margin-bottom: 1rem;
            border-radius: 1rem;
            color: rgb(58, 139, 255, 1);
            background: rgba(250, 250, 249, 0.95);
            box-shadow: 0px 2px 10px 0px rgba(31, 35, 41, .38);
            cursor: pointer;

            &:hover {
                color: rgba(58, 139, 255, .65);
            }


            a {
                display: block;
                color: rgb(58, 139, 255, 1);
                width: 100%;
                font-weight: 600;
                text-decoration: none;
                border-radius: 1rem;

                &:hover {
                    color: rgba(58, 139, 255, .65);
                }
            }
        }
    }
}

.recommend {
    width: 80%;
    height: 28.125rem;
    margin: 1.875rem 10%;
}

.myimg {
    width: 65%;
    height: 100%;
    float: left;
}

.word {
    float: right;
    width: 29%;
    height: 100%;
    padding-left: 3%;
    padding-right: 3%;
    background-color: #FFFAF0;
}

.mya1 .mya2 {
    display: block;
}

.mya1 {
    font-weight: 600;
    color: black;
    font-size: 1.625rem;
    text-decoration: none;
}

.mya2 {
    text-decoration: none;
    color: black;
    opacity: 0.6;
    font-size: 0.875rem;
}

.mya1:hover {
    color: red;
}

.mya2:hover {
    color: red;
}

.item {
    margin-top: 0.625rem;
    margin-right: 2.5rem;
}

.mytab {
    width: 80%;
    height: 28.125rem;
    margin: 1.875rem 10%;
}

.myrow {
    height: 6.875rem;
    margin: 0.3125rem;

    &:hover {
        a {
            color: #2291f7;
            text-decoration: none;
        }

        background-color: rgb(243, 246, 248);
    }
}

.imgs {
    width: 100%;
    height: 6.25rem;
}

.mycol {
    padding-left: 1.875rem;
    padding-top: 0.25rem;
}

.mya4 {
    width: 85%;
    display: block;
}

.mytitle {
    margin-bottom: 0.5rem;
}

.mya3 {
    color: black;
    font-weight: 400;
    font-size: 1.25rem;
    text-decoration: none;
}

.mya4 {
    color: black;
    font-size: 0.875rem;
    text-decoration: none;
    opacity: 0.7;
}

.mya3:hover {
    text-decoration: underline;
}
</style>