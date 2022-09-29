<template>
  <div id="home-container">

    <!-- 右侧的内容固定栏 -->
    <el-row :gutter="0">
      <el-col :xs="0">
        <div class="functions-fix">
          <ul>
            <li><a href="#">客服</a></li>
            <li @click="dialogFormVisible = true"><a href="#">反馈</a></li>
            <li><a href="#home-container">返顶</a></li>
          </ul>
        </div>

        <!-- 点击反馈弹出的模态框 -->
        <el-dialog title="反馈信息" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="feedback">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <!-- home页面对应的固定栏功能 -->
    <el-container>
      <!-- (一) 首页导航栏 -->
      <el-header>
        <div class="header-container">
          <!-- 1.1 使用响应式布局进行设计 -->
          <el-row style="height: 100%" :gutter="0">
            <!-- 1.1.1 导航栏logo -->
            <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3" style="height: 100%">
              <!-- 1.1.1 网站logo -->
              <div class="logo">
                <!-- 1.1.1.1 logo图片 -->
                <img src="@/assets/logo.png" alt="blank">
                <!-- 1.1.1.2 网站的名称介绍 -->
                <div><a href="#">希冀数学</a></div>
              </div>
            </el-col>
            <!-- 1.1.2 导航栏功能链接 -->
            <el-col :xs="24" :sm="13" :md="12" :lg="12" :xl="12" style="height: 100%">
              <!-- 1.1.2 导航栏功能选择 -->
              <div class="functions">
                <ul>
                  <!-- 1.1.3 具体的a标签内容 -->
                  <li><a href="#" class="actived">首页</a></li>
                  <li><a href="#" @click="online">线上答疑</a></li>
                  <li><a href="#">趣味课堂</a></li>
                  <li><a href="#">线下活动</a></li>
                  <li><a href="#">资源推荐</a></li>
                  <li><a href="#">教师资源</a></li>
                </ul>
              </div>
            </el-col>
            <!-- 1.1.3 导航栏搜索框 -->
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" style="height: 100%">
              <!-- 1.1.3 内容搜索框 -->
              <div class="user-login">
                <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入内容" size="small"
                  @keyup.enter.native="search"></el-input>
              </div>
            </el-col>
            <!-- 1.1.4 导航栏登录按钮和用户头像 -->
            <el-col :xs="0" :sm="4" :md="5" :lg="5" :xl="5" style="height: 100%">
              <div class="user">
                <!-- 1.1.4.1 用户登录跳转按钮 -->
                <el-button size="mini" plain style="border: 1px solid black" @click="login"
                  v-show="this.$store.state.flag === true">登录
                </el-button>
                <!-- 1.1.4.2 用户登录图片 -->
                <el-row class="demo-avatar demo-basic">
                  <el-col :xs="0">
                    <div class="demo-basic--circle">
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          <img :src="getSrc('' + this.$store.state.imgSrc)" alt="blank" style="width: 100%;">
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item icon="el-icon-turn-off"><span @click="logout">注销</span></el-dropdown-item>
                          <el-dropdown-item icon="el-icon-chat-dot-round" class="clearfix">
                            消息
                            <el-badge class="mark" :value="12" />
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>

      <!-- (二)  首页主要内容-->
      <el-row :gutter="0">
        <el-container style="height: 52rem">
          <!-- 2.1 侧边栏内容 -->
          <el-col :xs="0" :sm="6" :md="5" :lg="5">
            <div class="aside">
              <!-- 2.1.1 侧边栏内容一：教师排答疑排班表 -->
              <div class="courses">
                <h4>线上答疑排班表</h4>
                <!-- 2.1.1.1 教师排班内容 -->
                <div style="">
                  <!-- 2.1.1.1.1 教师排班当天日期 -->
                  <div class="day">
                    {{ teacherList[0].day }}
                  </div>
                  <!-- 2.1.1.1.2 教师排版当天具体时间段对应的排版老师 -->
                  <ul class="courses-item">
                    <li v-for="item in teacherList" :key="item.id">
                      {{ item.date }}<span> {{ item.name }} </span>
                    </li>
                  </ul>
                  <!-- 2.1.1.1.3 教师排班下一天日期 -->
                  <div class="day">
                    {{ teacherList1[0].day }}
                  </div>
                  <!-- 2.1.1.4 教师排版下一天具体时间段对应的排版老师 -->
                  <ul class="courses-item">
                    <li v-for="item in teacherList1" :key="item.id">
                      {{ item.date }}&nbsp;&nbsp;
                      <span> {{ item.name }} </span>
                    </li>
                  </ul>
                </div>
                <!-- 2.1.1.2 分页查询按钮 -->
                <div class="pagination">
                  <el-button type="primary" icon="el-icon-arrow-left" size="mini"></el-button>
                  <el-button type="primary" size="mini"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </div>
              </div>
              <!-- 2.1.2 侧边栏内容二：线下活动内容展示 -->
              <div class="activities">
                <h4>线下活动</h4>
                <!-- 2.1.1.1 侧边栏线下活动内容具体展示 -->
                <ul class="activities-item">
                  <li v-for="item in activityList" :key="item.id">
                    <a href="#">{{ item.activity }}</a>
                  </li>
                </ul>
                <!-- 2.1.1.2 侧边栏线下活动内容分页按钮 -->
                <div class="pagination">
                  <el-button type="primary" icon="el-icon-arrow-left" size="mini"></el-button>
                  <el-button type="primary" size="mini"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </div>
              </div>
            </div>
          </el-col>
          <!-- 2.2 home首页主内容区域 -->
          <el-col :xs="24" :sm="18" :md="19" :lg="19">
            <el-container style="height: 100%">
              <el-main>
                <!-- 2.2.1 home首页轮播图内容-->
                <el-row :gutter="0">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-carousel :interval="4000" type="card" height="13.3333rem"
                      style="line-height: 80px; box-shadow: 0 0 5px #c9c9c9; border-radius: 8px;">
                      <!-- v-for="item in 6" :key="item" -->
                      <el-carousel-item>
                        <h3 class="medium" style="width: 100%; height: 100%">
                          <img src="@/assets/img1.webp" alt="blank" style="width: 100%; height: 100%">
                        </h3>
                      </el-carousel-item>
                      <el-carousel-item>
                        <h3 class="medium" style="width: 100%; height: 100%">
                          <img src="@/assets/img2.webp" alt="blank" style="width: 100%; height: 100%">
                        </h3>
                      </el-carousel-item>
                      <el-carousel-item>
                        <h3 class="medium" style="width: 100%; height: 100%">
                          <img src="@/assets/img4.webp" alt="blank" style="width: 100%; height: 100%">
                        </h3>
                      </el-carousel-item>
                    </el-carousel>
                  </el-col>
                </el-row>
                <!-- 2.2.2 home页面主题内容 -->
                <div class="resources">
                  <el-row :gutter="0" style="width: 100%;">
                    <!-- 2.2.2.1 home页面主题内容 - 教学推荐和趣味课堂内容 -->
                    <el-col :xs="24" :lg="14" style="float: left; margin: 15px 0 0 0">
                      <div class="resources-item">
                        <div class="title1">
                          <a href="#" alt="blank">资源推荐 <i class="el-icon-d-arrow-right"></i></a>
                        </div>
                        <div class="item1">
                          <el-row :gutter="20">
                            <ul>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math2.jpg" alt="blank">
                                  <a href="#">课题:解三角问题</a>
                                  <a href="#">授课人: 于静</a>
                                </li>
                              </el-col>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math1.png" alt="blank">
                                  <a href="#">课题:"加""减"法</a>
                                  <a href="#">授课人: 江玉婷</a>
                                </li>
                              </el-col>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math3.png" alt="blank">
                                  <a href="#">课题:长方形问题</a>
                                  <a href="#">授课人: 于静</a>
                                </li>
                              </el-col>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math2.jpg" alt="blank">
                                  <a href="#">解三角问题</a>
                                  <a href="#">授课人: 于静</a>
                                </li>
                              </el-col>
                            </ul>
                          </el-row>
                        </div>
                        <div class="title1">
                          <a href="#" alt="blank">趣味课堂 <i class="el-icon-d-arrow-right"></i></a>
                        </div>
                        <div class="item1">
                          <el-row :gutter="20">
                            <ul>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math5.jpg" alt="blank">
                                  <router-link to="/circular">Π的由来</router-link>
                                </li>
                              </el-col>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math6.jpg" alt="blank">
                                  <a href="#">数学界的"罪人"</a>
                                </li>
                              </el-col>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math2.jpg" alt="blank">
                                  <a href="#">解三角问题</a>
                                </li>
                              </el-col>
                              <el-col :xs="12" :sm="12" :md="8" :lg="6">
                                <li>
                                  <img src="@/assets/math2.jpg" alt="blank">
                                  <a href="#">解三角问题</a>
                                </li>
                              </el-col>
                            </ul>
                          </el-row>
                        </div>
                      </div>
                    </el-col>

                    <!-- 2.2.2.2 home页面主题内容 - 最受欢迎老师内容 -->
                    <el-col :xs="0" :lg="8" style="float:right; margin: 15px 15px 0 0;">
                      <div class="resources-favor">
                        <div class="title2">
                          <a href="#" alt="blank">最受欢迎老师排行榜<i class="el-icon-d-arrow-right"></i></a>
                          <ul style="list-style: none;">
                            <li v-for="(item , index) in popularList" :key="item.id">
                              <el-badge :value="index + 1" class="item" type="primary"></el-badge>
                              <span class="teacher-name" @click="dialogTableVisible = true">
                                {{ item.tName }}
                              </span>
                              <el-rate v-model="values[index]" show-text style="float: right; width: 160px"></el-rate>
                            </li>
                          </ul>
                          <!-- 2.2.2.2.1 最受欢迎老师介绍模态框 -->
                          <el-dialog title="教师介绍" :visible.sync="dialogTableVisible"
                            style="border-radius: 15px !important;">
                            <el-table :data="popularList">
                              <el-table-column property="tName" label="教师名字" width="150"></el-table-column>
                              <el-table-column property="age" label="年龄" width="200"></el-table-column>
                              <el-table-column property="department" label="院系部门"></el-table-column>
                            </el-table>
                          </el-dialog>
                          <!-- 2.2.2.2.2 最受欢迎老师分页按钮 -->
                          <div
                            style="width: 100%; display: flex;flex-direction: row;align-items: center;justify-content: space-around;">
                            <el-button plain @click="open1" size="small" center style="margin-bottom: 10px">
                              点击提示
                            </el-button>
                            <el-button plain @click.once="open2" size="small" center
                              style="margin-bottom: 10px; float: right">
                              打分确定
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
            </el-container>
          </el-col>
        </el-container>
      </el-row>

      <!-- (三) 页脚内容 -->
      <el-row :gutter="0">
        <el-col :xs="24" :sm=24 :md="24" :lg="24">
          <el-footer height="70px">
            <div class="schools">
              <h5>&copy; 特别鸣谢</h5>
              <ul>
                <li><a href="#">广东二师</a></li>
                <li><a href="#">希望小学</a></li>
                <li><a href="#">广东二师</a></li>
                <li><a href="#">广东二师</a></li>
                <li><a href="#">希望小学</a></li>
                <li><a href="#">广东二师</a></li>
              </ul>
            </div>
          </el-footer>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import { mythrollte } from '@/utils/index.js'
import { mydebounce } from '@/utils/index.js'

export default {
  created() {
    // 执行获取教师答疑排班数据一方法
    this.getTeacherList();
    // 执行获取教师答疑排班数据二方法
    this.getTeacherList1();
    // 执行获取资源推荐数据方法
    this.getActivityList();
    // 执行获取最受欢迎老师数据方法
    this.getPopularList();

    if (window.localStorage.getItem("token")) {
      this.$store.commit('changeFlag', false)
      console.log("获取头像成功!");
      this.$store.commit('getImgSrc', window.localStorage.getItem("avatar"))
    }
  },
  data() {
    return {
      values: [5, 4, 3, 4, 1, 2],
      count: 1,
      // 用户搜索内容变量
      input: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["medium"],
      // 线上答疑教师排班变量1
      teacherList: [],
      // 线上答疑教师排班变量2
      teacherList1: [],
      // 线下活动变量
      activityList: [],
      // 最受欢迎老师变量
      popularList: [],
      // 控制表格模态框显示变量
      dialogTableVisible: false,
      // 控制反馈表单模态框显示变量
      dialogFormVisible: false,
      // 控制反馈模态框宽度变量
      formLabelWidth: '6.66666rem',
      // 用户反馈内容变量
      textarea: '',
      img: ''
    }
  },
  methods: {
    // 最受欢迎老师可打分题型(使用到了节流操作)
    open1: mythrollte(function () {
      const h = this.$createElement;
      this.$notify({
        title: '消息提示',
        message: h('i', { style: 'color: teal' }, '可以给自己喜欢的老师进行打分哦~~~')
      })
    }, 5000),

    // 最受欢迎老师打分确定(使用到了节流操作)
    open2: mythrollte(function () {
      const h = this.$createElement;
      this.$notify({
        title: '消息提示',
        message: h('i', { style: 'color: teal' }, '感谢您的喜欢~~~')
      })

      // 先对相应的数据进行更新
      // for(let i = 0; i < this.popularList.length; i++) {
      //   this.popularList[i].total += this.values[i];
      // }
      // console.log(this.popularList);
      // // TODO: 后续是将实现当用户点击了打分确定后进行数据的传输到数据库
      // this.$http.post("http://localhost:8088/api/likes", {
      //   "teachers": this.popularList
      // })
    }, 5000),

    // 导航栏搜索功能(新增设置了防抖操作)
    search: mydebounce(function () {
      if (this.input === '') {
        // 当用户点击了搜索框，但是并没有进行内容的输入时，浏览器进行信息的提示
        this.$message({
          type: 'error',
          message: '搜索内容不能为空！！！'
        })
      } else {
        // TODO: 进行对应的内容查询
        this.$message({
          type: 'info',
          message: '功能还未开放, 抱歉~~~'
        })
      }
    }, 1000),


    // 用户登录方法
    login() {
      this.$message({
        type: 'success',
        message: '前往登录页面成功!!!'
      })
      // 编程式路由-将页面跳转到登录页
      this.$router.push('/login')
    },

    // 用户注销方法
    logout() {
      if (window.localStorage.getItem('token')) {
        // 用户调用vuex中的changeFlag方法，将后续的flag进行转换
        this.$store.commit('changeFlag', true)
        // 用户调用Vuex中的getImgSrc方法，获取从接口中得到的头像地址
        this.$store.commit('getImgSrc', '')

        // 将本地存储的伪token删除
        window.localStorage.removeItem('token')

        // 用户登录注销后，调用Vuex中getImgSrc方法，赋值为没有头像的样式
        this.$store.commit('getImgSrc', 'avatar.png')

        // 网页进行对应的消息提醒
        this.$message({
          type: 'success',
          message: "退出登录成功!"
        })
      } else {
        // 用户还没登录点击了注销按钮的网页提醒
        const h = this.$createElement;
        this.$notify({
          title: '消息提示',
          message: h('i', { style: 'color: teal' }, '您还未登录，不能进行用户注销操作！！！')
        })
      }
    },

    // 返回后端传输到前端的图片地址
    getSrc(src) {
      return require('@/assets/' + src)
    },


    // 用户点击反馈调用的数据
    async feedback() {
      if (this.textarea !== '') {
        // 将评论内容发送到后端，并存进数据库
        const { data: res } = await this.$http.get('http://localhost:8088/api/feedback', {
          params: {
            "feedback": this.textarea
          }
        })
        // 当后端返回的数据res > 0 时(即此时插入语句成功执行了)， 进行对应的消息提醒
        if (res > 0) {
          const h = this.$createElement;
          this.$notify({
            title: '消息提示',
            message: h('i', { style: 'color: teal' }, '感谢您宝贵的评价，我们会继续努力的~~~')
          })
        }
      }
      // 最后将后续的变量修改
      this.textarea = ''
      this.dialogFormVisible = false
    },

    // 导航栏线上答疑功能
    online() {
      // 当用户点击了导航栏中的线上答疑链接时，页面进行对饮的跳转
      this.$router.push("/chat");
    },

    // 调用axois中的get方法发送请求，得到系统当天的日期中的教师排班数据
    async getTeacherList() {
      const { data: res } = await this.$http.get('http://localhost:8088/api/teacher', { params: { "day": "9月11日(周日)" } });
      this.teacherList = res
    },

    // 调用axois中的get方法发送请求，得到系统下一天的日期中的教师排班数据
    async getTeacherList1() {
      const { data: res } = await this.$http.get('http://localhost:8088/api/teacher', { params: { "day": "9月12日(周一)" } });
      this.teacherList1 = res
      this.height = document.body.clientWidth;
    },

    // 调用axois中的get方法发送请求，得到线下活动数据
    async getActivityList() {
      const { data: res } = await this.$http.get('http://localhost:8088/api/activity');
      this.activityList = res
    },

    // 调用axois中的get方法发送请求，得到最受老师欢迎数据
    async getPopularList() {
      const { data: res } = await this.$http.get('http://localhost:8088/api/popular');
      this.popularList = res;
    }
  },

}
</script>

<style lang="less" >
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {

  html,
  #home-container {
    font-size: 12px;
  }

  .resources-item {
    width: 100%;
  }
}

// 当用户的手机屏幕小于992px但大于758px时，对应的字体大小为13px
@media (min-width: 768px) and (max-width: 992px) {

  html,
  #home-container {
    font-size: 13px;
  }

  .resources-item {
    width: 100%;
  }

  // .user {
  //   display: none;
  // }
}

// 当用户的手机屏幕大于992px但小于1200px时, 对应的字体大小为14px
@media (min-width:992px) and (max-width: 1200px) {

  html,
  #home-container {
    font-size: 14px;
  }

  .resources-item {
    width: 100%;
  }
}

// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) {
  #home-container {
    font-size: 15px;
  }

  html {
    font-size: 15px;
  }

  .resources-item {
    width: 100%;
  }
}

* {
  margin: 0;
  padding: 0;
}

// 侧边栏固定部内容样式
.functions-fix {
  position: fixed;
  width: 3rem;
  height: 7rem;
  top: 48%;
  right: 0;
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  background: rgba(128, 0, 128, 0.8);
  z-index: 1000;

  ul {
    list-style: none;
    text-align: center;

    li {
      width: 100%;
      height: 2.3333rem;
      line-height: 2.3333rem;

      a {
        color: black;
        font-weight: 600;
        text-decoration: none;
      }
    }
  }
}

// home页面的图片样式设置
.img {
  height: 100%;
}

// home页面导航栏样式
.el-header {
  // background-color: rgb(184, 187, 250);
  background-color: rgba(199, 201, 201, 0.3);
  color: #333;
  text-align: center;
  // line-height: 60px;

  .header-container {
    width: 100%;
    height: 100%;

    // home页面logo样式
    .logo {
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      justify-content: space-around;
      text-shadow: 0.1em 0.1em 0.5em #333;

      // home页面图片样式设置
      img {
        height: 100%;
      }

      // home页面网站名称样式
      div {
        line-height: 4rem;

        a {
          color: purple;
          text-decoration: none;
          font-family: Arial, Helvetica, sans-serif;
        }
      }
    }

    // home页面功能链接样式设置
    .functions {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

      ul {
        width: 100%;
        height: 2.1875rem;
        list-style: none;

        li {
          float: left;
          width: 15%;
          height: 100%;
          line-height: 2.1875rem;
          margin-left: 0.3125rem;

          a {
            display: block;
            color: black;
            width: 100%;
            height: 100%;
            text-decoration: none;
            border-radius: 1.3333rem;
          }

          a:hover {
            color: purple;
            // background: rgba(255, 165, 0, 0.3);
            border: 1px solid black;
            transform: scale(0.9);
            background: rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
          }
        }

        .actived {
          color: purple;
          border: 1px solid black;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }

    // 导航栏搜索框样式
    .el-input__inner {
      // border: 1px solid white;
      border: 0.01333rem solid black;
    }

    // 内容搜索框
    .user-login {
      width: 100%;
      height: 100%;
      line-height: 4rem;
    }

    // 用户登录内容样式
    .user {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      .demo-basic--circle {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        overflow: hidden;

        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }

        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
  }

}

// home页面页脚样式
.el-footer {
  // background-color: rgb(184, 187, 250);
  background-color: rgba(201, 201, 201, 0.2);

  // 致谢学校内容包括框样式
  .schools {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    text-align: center;
    font-weight: 600;

    ul {
      list-style-type: none;
      // border: 1px solid red;
      height: 65%;
      line-height: 3.13333rem;

      li {
        display: inline-block;
        width: 15%;
        height: 80%;
        margin: 0.3333rem;
        line-height: 224%;
        border-radius: 0.333rem;
        border: 0.0666rem solid black;
      }
    }
  }
}

// home页面侧边栏样式
.aside {
  height: 100%;
  // background-color: rgb(184, 187, 222);
  background-color: rgba(201, 201, 201, 0.2);
  color: #333;
  text-align: center;
  // border-bottom: 1px solid #c9c9c9;
  // border-top: 1px solid #c9c9c9;
  border-right: 0.06666rem solid #c9c9c9;
  border-radius: 0.3333rem;

  // 侧边栏内容一：线上答疑教师排班表样式
  .courses {
    position: relative;
    width: 85%;
    top: 25%;
    left: 50%;
    min-height: 19.33333rem;
    border-radius: 0.53333rem;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px white;
    background: rgba(250, 250, 250, 1);
    border: 2px solid rgb(64, 158, 255);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    // 分页按钮样式
    .pagination {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 0.666rem;
      color: rgb(0, 66, 149);
    }

    // 教师排班当天日期样式
    .day {
      text-align: left;
      padding: 0.8rem;
      font-size: 0.73333rem;
      font-weight: 600;
      border-bottom: 0.06666rem solid #c9c9c9;
    }

    // 教师排班内容展示样式
    .courses-item {
      list-style: none;
      font-size: 0.86666rem;
      padding-left: 0.6666rem;
      text-align: left;

      li {
        padding: 0.2rem;
        font-weight: 600;
      }
    }
  }

  // 侧边内容二：线上活动展示样式
  .activities {
    position: relative;
    top: 33%;
    left: 50%;
    width: 85%;
    min-height: 45%;
    border-radius: 0.53333rem;
    box-shadow: 0 0 1.3333rem white;
    background: rgba(250, 250, 250, 1);
    transform: translate(-50%, -50%);
    border: 0.13333rem solid rgb(255, 235, 59);

    // 线上活动数据展示样式
    .activities-item {
      list-style: none;
      font-size: 0.8rem;
      padding: 0.666666rem;
      text-align: left;

      // 具体的数据样式
      li {
        padding: 0.3333rem;
        margin-bottom: 0.13333rem;
        font-weight: 600;
        border: 0.06666rem solid #c9c9c9;

        // 线上内容链接样式
        a {
          text-decoration: none;
          color: purple;
        }
      }
    }

    // 分页按钮样式
    .pagination {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 0.6666rem;
      color: rgb(0, 66, 149);
    }
  }
}

// home页面主体内容样式
.el-main {
  height: 100%;
  // background-color: #E9EEF3;
  // background-color: rgba(201, 201, 201, 0.1);
  color: #333;
  text-align: center;

  // 资源推荐样式
  .resources {
    margin: 0 auto;
    width: 98%;
    height: 59%;
    background: rgba(250, 250, 250, 1);

    // 资源推荐具体内容样式
    .resources-item {
      height: 100%;
      border-radius: 0.3333rem;
      border: 0.0666rem solid #c9c9c9;
      box-shadow: 0 0 0.6666rem #c9c9c9;

      // 资源推荐-标题内容样式
      .title1 {
        height: 10%;
        text-align: left;

        // 资源推荐-标题链接内容样式
        a {
          display: block;
          height: 95%;
          padding: 0.533333rem;
          color: black;
          line-height: 2.866666rem;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.5);
        }
      }

      // 资源内容-课程图片和文字介绍样式
      .item1 {
        width: 100%;
        // border: 0.0666rem solid yellow;

        // 资源推荐总内容包括框样式
        ul {
          width: 100%;
          height: 100%;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-items: center;
          justify-content: space-around;
          margin-bottom: 0.333rem;

          // 资源推荐个课程包括框样式
          li {
            width: 98%;
            font-size: 0.8rem;
            text-align: left;
            margin-bottom: 0.26666rem;
            border-radius: 0.33333rem;
            border: 0.0666rem solid #c9c9c9;

            // 不同内容的文字介绍样式
            a {
              display: block;
              color: purple;
              margin: 0.13333rem;
            }

            // 课程图片样式
            img {
              width: 100%;
              height: 72%;
            }
          }
        }
      }
    }

    // 最受欢迎老师样式
    .resources-favor {
      width: 100%;
      height: 100%;
      border-radius: 0.3333rem;
      box-shadow: 0 0 0.6666rem #c9c9c9;

      // 最受欢迎老师-标题内容样式
      .title2 {
        height: 10%;
        text-align: left;

        // 资源推荐各老师包括框样式
        li {
          height: 2rem;
          margin: 0.6666rem 0.3333rem;

        }

        .item {
          line-height: 0;
          padding-right: 0.6666rem;
        }

        // 不同老师的名字介绍样式
        a {
          display: block;
          height: 95%;
          padding: 0.5333rem;
          color: black;
          line-height: 2.86666rem;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.5);
        }

        // 最受欢迎老师名字样式
        .teacher-name {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 0.93333rem;
    opacity: 0.75;
    line-height: 13.3333rem;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}

// body>.el-container {
//   margin-bottom: 40px;
// }

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 17.333rem;
}

// .el-container:nth-child(7) .el-aside {
//   line-height: 320px;
// }
</style>