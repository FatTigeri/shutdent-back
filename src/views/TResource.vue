<template>
    <div id="TResource-container">
        <div>
            <el-tabs type="border-card" :tab-position="tabPosition">
                <el-tab-pane v-for="grade in grades" :key="grade.id">
                  <span slot="label">{{grade.gra}}</span>
                  <el-card class="box-card" shadow="always" v-for="(teacher,id) in teachers" :key="id" style="margin:10px;width:80%;margin-left:9%;">
                    <div slot="header" class="clearfix">
                      <span style="font-size:22px;">{{teacher.tname}}</span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="Tenter">进入主页</el-button>
                    </div>
                    <div class="text item">
                        <span style="float:left">好评&nbsp;&nbsp;&nbsp;</span>
                        <el-rate
                            v-model="teachers[id].score"
                            disabled
                            show-score
                            text-color="#ff9900"
                            :score-template="teacher.score"
                            style="float:left">
                        </el-rate>
                    </div>
                    <br>
                    <div>
                        优秀讲解视频:&nbsp;&nbsp;
                        <span style="color:blueviolet">{{teacher.videos}}</span>
                    </div>
                  </el-card>
                </el-tab-pane>
                
              </el-tabs>
        </div>
    </div>
</template>
<script>

    export default {
        data:function(){
            return{
                grades:[
                    {id:1,gra:"一年级"},
                    {id:2,gra:"二年级"},
                    {id:3,gra:"三年级"},
                    {id:4,gra:"四年级"},
                    {id:5,gra:"五年级"},
                    {id:6,gra:"六年级"}
                ],
                teachers:[
                    {id:1,tname:"张三",score:'3.7',videos:"加法与减法计算 | 20以内的口算"},
                    {id:2,tname:"赵四",score:'4.6',videos:"词语讲解 | 生字学习"},
                    {id:3,tname:"王五",score:'3.6',videos:"生字学习 | 阅读理解"},
                    {id:4,tname:"李六",score:'4.2',videos:"阅读理解 | 词语讲解"},
                    {id:5,tname:"梅梅",score:'3.3',videos:"20以内的口算 | 20以内的进位加法"},
                    {id:6,tname:"万华",score:'4.1',videos:"20以内的进位加法 | 加法与减法计算"}
                ],
                tabPosition: 'left',
                value:3.7
            }
        }
    }

</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    

</style>

