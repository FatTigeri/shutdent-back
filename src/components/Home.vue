<template>
  <div id="home-container">
    <!-- 右侧的内容固定栏(响应式布局) -->
    <el-row :gutter="0">
      <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
        <!-- 固定栏内容 -->
        <div class="functions-fix">
          <ul>
            <!-- 客服 -->
            <li @click="dialogCommentVisible = true"><i class="el-icon-phone-outline"></i> 留言</li>
            <!-- 提问 -->
            <li @click="ask"><i class="el-icon-chat-dot-round"></i> 提问</li>
            <!-- 返顶 -->
            <li @click="toTop"><i class="el-icon-caret-top"></i> 返顶</li>
          </ul>
        </div>

        <el-dialog title="信息反馈。" :visible.sync="dialogCommentVisible">
          <el-form :model="form">
            <!-- 输入框内容 -->
            <el-form-item label="内容:" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="5" placeholder="请输入您反馈内容" v-model="form.textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCommentVisible = false">取 消</el-button>
            <el-button type="primary" @click="comment">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 点击反馈弹出的模态框 -->
        <el-dialog title="问题收集。" :visible.sync="dialogFormVisible">
          <el-form>
            <!-- 输入框内容 -->
            <el-form-item label="内容:" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="5" placeholder="请输入您出现的数学问题" v-model="textarea"></el-input>
            </el-form-item>
          </el-form>
          <!-- 年级单选框 -->
          <el-radio-group v-model="grade">
            <el-radio label="一年级">一年级</el-radio>
            <el-radio label="二年级">二年级</el-radio>
            <el-radio label="三年级">三年级</el-radio>
            <el-radio label="四年级">四年级</el-radio>
            <el-radio label="五年级">五年级</el-radio>
            <el-radio label="六年级">六年级</el-radio>
          </el-radio-group>
          <!-- 问题类型单选框 -->
          <el-radio-group v-model="problem">
            <el-radio label="基础知识">基础知识问题</el-radio>
            <el-radio label="三角和问题">三角和问题</el-radio>
            <el-radio label="数运算问题">数运算问题</el-radio>
            <el-radio label="圆计算问题">圆计算问题</el-radio>
            <el-radio label="试卷真题问题">试卷真题问题</el-radio>
          </el-radio-group>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="question" size="mini" :disabled="flag">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <!-- home页面对应的固定栏功能(响应式布局) -->
    <el-container>
      <!-- (二)  首页主要内容-->
      <el-row :gutter="0">
        <el-container>
          <!-- 2.1 侧边栏内容 -->
          <el-col :xs="0" :sm="1" :md="5" :lg="5" style="height: 100%" v-show="screenWidth >= 992">
            <div class="aside">
              <!-- 2.1.1 侧边栏内容一：教师排答疑排班表 -->
              <div class="courses">
                <div class="course-title">
                  <h4>
                    线上答疑排班表</h4>
                </div>
                <!-- 2.1.1.1 教师排班内容 -->
                <div>
                  <!-- 2.1.1.1.1 教师排班当天日期 -->
                  <div class="day">
                    <a href="/math/home">
                      <i class="el-icon-date" style="color: rgba(128, 0, 128, 1);"></i>
                      {{ currentDay + ' (' + currentWeek + ')' }}
                    </a>
                  </div>
                  <!-- 2.1.1.1.2 教师排版当天具体时间段对应的排版老师 -->
                  <ul class="courses-item">
                    <li v-for="item in teacherList" :key="item.id">
                      {{ item.date }}&nbsp;&nbsp;<span> {{ item.name }} </span>
                    </li>

                    <li class="special" v-if="teacherList.length === 0">当天暂无教师值班</li>
                  </ul>
                  <!-- 2.1.1.1.3 教师排班下一天日期 -->
                  <div class="day">
                    <a href="/math/home">
                      <i class="el-icon-date" style="color: rgba(128, 0, 128, 1);"></i>
                      {{ nextDay + ' (' + nextweek + ')' }}
                    </a>
                  </div>
                  <!-- 2.1.1.4 教师排版下一天具体时间段对应的排版老师 -->
                  <ul class="courses-item">
                    <li v-for="item in teacherList1" :key="item.id">
                      {{ item.date }}&nbsp;&nbsp;
                      <span> {{ item.name }} </span>
                    </li>
                    <li class="special" v-if="teacherList1.length === 0">当天暂无教师值班</li>
                  </ul>
                </div>
              </div>

              <!-- 2.1.2 侧边栏内容二：线下活动内容展示 -->
              <div class="activities">
                <h4>线下活动</h4>
                <!-- 2.1.1.1 侧边栏线下活动内容具体展示 -->
                <ul class="activities-item">
                  <li v-for="item in activityList" :key="item.id">
                    <a href="javascript:void(0)" @click="link(item.id)">
                      <h4>
                        <i class="el-icon-view" style="rgba(128, 0, 128, .4);"></i>
                        {{ item.title }}
                      </h4>
                      <span>{{ item.activity }}</span>
                    </a>
                  </li>
                </ul>
                <!-- 2.1.1.2 侧边栏线下活动内容分页按钮 -->
                <div class="pagination">
                  <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="pre"></el-button>
                  <el-button type="primary" size="mini" @click="next"><i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </div>
              </div>

              <!-- 2.1.3 侧边栏内容三：用户调查 -->
              <div class="asideNewNps">
                <h3 class="aside-title">您愿意向朋友推荐“希冀数学”吗？</h3>
                <div class="aside-content">
                  <ul class="newnps-list">
                    <li class="newnps-item" v-for="item in imgList" :key="item.id" :data-type="item.type"
                      @click="clickChange(item.id)">
                      <div class="newnps-img-box">
                        <img class="img1" :src="item.src1" alt="blank" v-show="item.state1">
                        <img class="img2" :src="item.src2" alt="blank" v-show="item.state2">
                      </div>
                      <div class="newnps-text">{{ item.type }}</div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </el-col>
          <!-- 2.2 home首页主内容区域 -->
          <el-col class="main" :xs="24" :sm="24" :md="19" :lg="19" style="height: 100%;">
            <div>
              <el-container style="height: 100%">
                <el-main>
                  <div>
                    <!-- 2.2.1 home首页轮播图内容-->
                    <el-row :gutter="0" style="padding: 1.25rem; margin: 2rem 0 0 0;">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="text" ref="text1">
                          <p class="line animation">Welcome to xijiMath!</p>
                        </div>
                        <div class="text margin" ref="text2">
                          <p class="line animation it">Let’s begin the math adventure!</p>
                        </div>

                        <el-carousel :interval="4000" type="card" height="14.3333rem"
                          style="line-height: 5.333rem; box-shadow: 0 0 0.2rem black;">
                          <el-carousel-item>
                            <h3 class="medium" style="width: 100%; height: 100%">
                              <a href="/math/video/1/1">
                                <img src="@/assets/carousel1.jpg" alt="blank" style="width: 100%; height: 100%">
                              </a>
                            </h3>
                          </el-carousel-item>
                          <el-carousel-item>
                            <h3 class="medium" style="width: 100%; height: 100%">
                              <a href="/math/video/4/4">
                                <img src="@/assets/carousel2.jpg" alt="blank" style="width: 100%; height: 100%">
                              </a>
                            </h3>
                          </el-carousel-item>
                          <el-carousel-item>
                            <h3 class="medium" style="width: 100%; height: 100%">
                              <a href="/math/video/5/5">
                                <img src="@/assets/carousel6.jpg" alt="blank" style="width: 100%; height: 100%">
                              </a>
                            </h3>
                          </el-carousel-item>
                          <el-carousel-item>
                            <h3 class="medium" style="width: 100%; height: 100%">
                              <a href="javascript:void(0);">
                                <img src="@/assets/carousel7.png" alt="blank" style="width: 100%; height: 100%">
                              </a>
                            </h3>
                          </el-carousel-item>
                          <el-carousel-item>
                            <h3 class="medium" style="width: 100%; height: 100%">
                              <a href="javascript:void(0)">
                                <img src="@/assets/carousel8.png" alt="blank" style="width: 100%; height: 100%">
                              </a>
                            </h3>
                          </el-carousel-item>
                          <el-carousel-item>
                            <h3 class="medium" style="width: 100%; height: 100%">
                              <a href="javascript:void(0)">
                                <img src="@/assets/carousel9.png" alt="blank" style="width: 100%; height: 100%">
                              </a>
                            </h3>
                          </el-carousel-item>
                        </el-carousel>
                      </el-col>
                    </el-row>

                    <!-- 2.2.2 home页面主题内容 -->
                    <div class="resources">
                      <el-row :gutter="0" style="width: 100%; margin: 0 !important">
                        <!-- 2.2.2.1 home页面主题内容 - 教学推荐和趣味课堂内容 -->
                        <el-col :xs="24" :sm="24" :md="14" :lg="14" style="float: left; margin: 1.5rem 0 0 0.33rem">
                          <div class="resources-item">
                            <div class="title1">
                              <a href="/math/home" alt="blank">
                                <span class="iconfont icon-tuijian" style="color: red;"></span> 资源推荐
                                <i class="el-icon-d-arrow-right"></i>
                              </a>
                            </div>
                            <div class="item1">
                              <el-row :gutter="20" style="margin: 0 !important">
                                <ul>
                                  <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="item in resource1" :key="item.id">
                                    <li @click="player(item.id)">
                                      <img :src="item.src" alt="blank">
                                      <a href="/math/video/1/1">课题:{{ item.course }}</a>
                                      <a href="/math/video/1/1">授课人: {{ item.teacher }}</a>
                                    </li>
                                  </el-col>
                                </ul>
                              </el-row>
                            </div>
                            <div class="title1">
                              <a href="/math/home" alt="blank">
                                <span class="iconfont icon-ketang" style="color: blue;"></span> 趣味课堂
                                <i class="el-icon-d-arrow-right"></i>
                              </a>
                            </div>
                            <div class="item1">
                              <el-row :gutter="20" style="margin: 0 !important">
                                <ul>
                                  <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="item in c" :key="item.id">
                                    <li>
                                      <img ref="img" :src="item.src" :data-src="item.Rsrc" alt="blank">
                                      <router-link to="/circular">{{ item.title }}</router-link>
                                    </li>
                                  </el-col>
                                </ul>
                              </el-row>
                            </div>
                          </div>
                        </el-col>

                        <!-- 2.2.2.2 home页面主题内容 - 最受欢迎老师内容 -->
                        <el-col :xs="0" :sm="1" :md="8" :lg="8" style="float:right; margin: 1.5rem 0.33rem 0 0;"
                          v-show="screenWidth >= 992">
                          <div class="resources-favor">
                            <div class="title2">
                              <a href="javascript:void(0)" alt="blank">
                                <span class="iconfont icon-shiziduiwu1" style="color: black;"></span>
                                最受欢迎老师排行榜<i class="el-icon-d-arrow-right"></i>
                              </a>
                              <ul style="list-style: none;">
                                <li v-for="(item, index) in popularList" :key="item.id">
                                  <el-badge :value="index + 1" class="item" type="primary"></el-badge>
                                  <span class="teacher-name" @click="dialogTableVisible = true">
                                    {{ item.tName }}
                                  </span>
                                  <el-rate v-model="values[index]" show-text style="float: right;">
                                  </el-rate>
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
                  </div>
                </el-main>
                <!-- (三) 页脚内容 -->
                <el-row :gutter="0">
                  <el-col :xs="0" :sm="24" :md="24" :lg="24">
                    <el-footer ref="footer" height="none">
                      <div class="schools">
                        <h4>支持院校</h4>
                        <ul>
                          <li>
                            <i class="el-icon-school"></i>
                            <h6>广东第二师范学院</h6>
                          </li>
                          <li><i class="el-icon-office-building"></i>
                            <h6>希望小学</h6>
                          </li>
                          <li><i class="el-icon-school"></i>
                            <h6>广东第二师范学院</h6>
                          </li>
                          <li><i class="el-icon-office-building"></i>
                            <h6>希望小学</h6>
                          </li>
                        </ul>
                      </div>
                    </el-footer>
                  </el-col>
                </el-row>
              </el-container>
            </div>
          </el-col>
        </el-container>
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


  },

  mounted() {
    // 设置一个setTimeout定时器，用作延迟获取首页的main内容的高度
    setTimeout(() => {
      // 获取高度
      const height = document.querySelector('.main').offsetHeight
      // 将main内容的高度进行赋值
      document.querySelector('.aside').style.height = height + 'px'
    }, 500)

    const _this = this
    setTimeout(function () {
      _this.$refs.text1.style.display = 'none'
      _this.$refs.text2.style.display = 'none'
    }, 6500)

    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        _this.screenWidth = window.screenWidth
      })()
    }

    this.getScroll()
    window.addEventListener('scroll', this.getScroll) //实时监听滚动条的变化
  },

  destroyed() { //注意：监听的函数要在关闭页面时销毁掉,不然会影响到其它页面
    window.removeEventListener('scroll', this.getScroll)
  },

  data() {
    return {
      values: [5, 4, 3, 4, 1, 2, 3, 5],
      count: 1,
      // 用户搜索内容变量
      input: '',
      // 用户未登录时的头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      // 资源推荐信息
      resource1: [{
        id: 1,
        src: require('@/assets/math_course1.jpg'),
        course: '分数除法',
        teacher: '广东二师'
      }, {
        id: 2,
        src: require('@/assets/math_course2.jpg'),
        course: '负数的认识',
        teacher: '李如煜'
      }, {
        id: 3,
        src: require('@/assets/math_course3.jpg'),
        course: '平移与旋转',
        teacher: '卡通人物'
      }, {
        id: 4,
        src: require('@/assets/math_course4.jpg'),
        course: '分数的认识',
        teacher: '周宇轩'
      }],
      // 趣味课堂信息
      c: [{
        id: 1,
        src: require('@/assets/avatar.png'),
        Rsrc: require('@/assets/math5.jpg'),
        title: 'Π的由来'
      },
      {
        id: 2,
        src: require('@/assets/avatar.png'),
        Rsrc: require('@/assets/math6.jpg'),
        title: '数学界的"罪人'
      },
      {
        id: 3,
        src: require('@/assets/avatar.png'),
        Rsrc: require('@/assets/math7.png'),
        title: '先行者-祖冲之'
      },
      {
        id: 4,
        src: require('@/assets/avatar.png'),
        Rsrc: require('@/assets/math8.png'),
        title: '数学的对称美'
      }],
      // 表情图片
      imgList: [
        {
          id: 1,
          type: '强烈不推荐',
          src1: require('@/assets/npsFeel1.png'),
          src2: require('@/assets/npsFeelGrey1.png'),
          state1: true,
          state2: false
        },
        {
          id: 2,
          type: '不推荐',
          src1: require('@/assets/npsFeel2.png'),
          src2: require('@/assets/npsFeelGrey2.png'),
          state1: true,
          state2: false
        },
        {
          id: 3,
          type: '一般般',
          src1: require('@/assets/npsFeel3.png'),
          src2: require('@/assets/npsFeelGrey3.png'),
          state1: true,
          state2: false
        },
        {
          id: 4,
          type: '推荐',
          src1: require('@/assets/npsFeel4.png'),
          src2: require('@/assets/npsFeelGrey4.png'),
          state1: true,
          state2: false
        },
        {
          id: 5,
          type: '强烈推荐',
          src1: require('@/assets/npsFeel5.png'),
          src2: require('@/assets/npsFeelGrey5.png'),
          state1: true,
          state2: false
        }
      ],
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
      dialogCommentVisible: false,
      // 控制反馈表单模态框显示变量
      dialogFormVisible: false,
      // 控制反馈模态框宽度变量
      formLabelWidth: '6.66666rem',
      // 用户提问内容变量
      textarea: '',
      img: '',
      // 年级可选数组
      grade: '一年级',
      // 问题类型
      problem: '试卷真题问题',
      // 接收课程信息对象
      course: {},
      // 对应的屏幕判断
      screenWidth: 992,
      // 
      form: {
        textarea: '',
      }
    }
  },
  computed: {
    // 根据系统的当前时间动态生成今天的日期
    currentDay: function () {
      const now = new Date()
      return '2023-' + (now.getMonth() + 1) + '-' + now.getDate()
    },
    // 根据系统的当前时间动态生成明天的日期
    nextDay: function () {
      const now = new Date()
      return '2023-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1)
    },
    // 根据系统的当前时间动态生成今天是周几
    currentWeek: function () {
      const now = new Date()
      switch (now.getDay()) {
        case 0:
          return '周日'
          break
        case 1:
          return '周一'
          break
        case 2:
          return '周二'
          break
        case 3:
          return '周三'
          break
        case 4:
          return '周四'
          break
        case 5:
          return '周五'
          break
        case 6:
          return '周六'
          break
      }
    },
    // 根据系统的当前时间动态生成明天是周几
    nextweek: function () {
      const now = new Date()
      switch (now.getDay()) {
        case 0:
          return '周一'
          break
        case 1:
          return '周二'
          break
        case 2:
          return '周三'
          break
        case 3:
          return '周四'
          break
        case 4:
          return '周五'
          break
        case 5:
          return '周六'
          break
        case 6:
          return '周日'
          break
      }
    },
    // 时刻监控提问模态框下的确认按钮是否为禁用变量
    flag() {
      return this.textarea === '';
    },

    getImgs() {
      return this.imgList;
    }
  },
  methods: {
    getScroll() {
      // 获取对应的img标签
      const imgs = this.$refs.img

      // 获取可视范围的高度
      const vh = document.documentElement.clientHeight

      // 获取滚动条的高度
      var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      for (const i in imgs) {

        // 如果图片进入可视范围就替换加载过来的图片
        if ((imgs[i].offsetTop + vh) < (vh + top)) {
          if (imgs[i].src !== imgs[i].dataset.src) imgs[i].src = imgs[i].dataset.src
        }
      }
    },
    // 最受欢迎老师可打分题型(使用到了节流操作)
    open1: mythrollte(function () {
      const h = this.$createElement;
      this.$notify({
        title: '消息提示',
        message: h('i', { style: 'color: teal' }, '可以给自己喜欢的老师进行打分哦~~~')
      })
    }, 5000),

    // 最受欢迎老师打分确定(使用到了节流操作)
    open2: mythrollte(async function () {
      // 先对相应的数据进行更新
      for (let i = 0; i < this.popularList.length; i++) {
        // 对不同老师的分数total进行更新
        this.popularList[i].total += this.values[i];
        // 每次都发送对应的post请求进行数据的更新
        await this.$http.get("/likes",
          { params: { "tID": this.popularList[i].tID, "total": this.popularList[i].total } }
        )
      }

      // 对应样式显示的代码
      const h = this.$createElement;
      this.$notify({
        title: '消息提示',
        message: h('i', { style: 'color: teal' }, '感谢您的喜欢~~~')
      })
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

    // 当用户点击了home页面中的客服按钮时进行的操作
    linkTo() {
      // 改变vuex中的current状态
      this.$store.commit('changeCurrent', 1)
      // 使用编程式路由将页面改为线上答疑页面
      this.$router.push('/math/chat')
    },

    async comment() {
      if (this.form.textarea) {
        const { data: res } = await this.$http.get('/insetFeedback', {
          params: {
            'feedback': this.form.textarea
          }
        })

        if (res === 1) {
          this.$message.success('留言成功!')
        } else {
          this.$message.error('留言失败!')
        }
        this.dialogCommentVisible = false
      } else {
        this.$message.error('留言内容不能为空!')
      }
    },

    // 控制提问模态框的展示函数
    ask() {
      if (window.localStorage.getItem('token')) {
        this.dialogFormVisible = true
      } else {
        const h = this.$createElement;
        this.$notify({
          title: '消息提示',
          message: h('i', { style: 'color: teal' }, '请先登录~！')
        })
      }
    },

    // home首页中的返顶方法
    toTop() {
      document.documentElement.scrollTop = 0;
    },

    // 点击线下活动跳转函数
    link(id) {
      this.$store.commit('changeCurrent', 3)
      this.$router.push('/math/act_content/' + id)
    },

    // 上一页按钮函数
    pre() {
      console.log("111");
      this.$message.info('功能后续开发中~!')
    },

    // 下一页按钮函数
    next() {
      console.log("111");

      this.$message.info('功能后续开发中~!')
    },

    // 用户点击不同头像效果
    clickChange(id) {
      this.imgs = this.imgList.map(item => {
        if (item.id !== id) {
          item.state1 = false;
          item.state2 = true;
        } else {
          item.state1 = true;
          item.state2 = false;
          const target = document.querySelectorAll('.img1')[id - 1];
          target.style.transform = 'translate(0,  -0.25rem)';

        }
        return item;
      })

    },

    // 用户点击提问调用的函数
    async question() {
      if (this.textarea !== '') {
        // 获取当前用户的姓名
        var questioner = window.localStorage.getItem('token')
        // 将评论内容发送到后端，并存进数据库
        const { data: res } = await this.$http.get('/question', {
          params: {
            "question": this.textarea,
            "grade": this.grade,
            "problem": this.problem,
            "questioner": questioner,
            "image": ''
          }
        })
        // 当后端返回的数据res > 0 时(即此时插入语句成功执行了)， 进行对应的消息提醒
        if (res > 0) {
          const h = this.$createElement;
          this.$notify({
            title: '消息提示',
            message: h('i', { style: 'color: teal' }, '您的疑惑已提交到后台~~~')
          })
        }
      } else {
        // 若用户提问的问题内容为空
        const h = this.$createElement;
        this.$notify({
          title: '消息提示',
          message: h('i', { style: 'color: teal' }, '提问内容不能为空!!!')
        })
      }
      // 最后将后续的变量修改
      this.textarea = ''
      // 将表单模态框隐藏变量
      this.dialogFormVisible = false
    },

    // 调用axois中的get方法发送请求，得到系统当天的日期中的教师排班数据
    async getTeacherList() {
      const { data: res } = await this.$http.get('/teacher', { params: { "day": this.currentDay } });
      this.teacherList = res
    },

    // 调用axois中的get方法发送请求，得到系统下一天的日期中的教师排班数据
    async getTeacherList1() {
      const { data: res } = await this.$http.get('/teacher', { params: { "day": this.nextDay } });
      this.teacherList1 = res
    },

    // 调用axois中的get方法发送请求，得到线下活动数据
    async getActivityList() {
      const { data: res } = await this.$http.get('/activity');
      this.activityList = res
    },

    // 调用axois中的get方法发送请求，得到最受老师欢迎数据
    async getPopularList() {
      const { data: res } = await this.$http.get('/popular');
      this.popularList = res;
    },

    // 前往视频播放页面方法
    async player(id) {
      // 先获取当前视频的id值
      const { data: res } = await this.$http.get('/getCourseById?id=' + id)
      // 将获取到数据进行赋值操作
      this.course = res
      // 将数据对象中的url属性作为video组件的动态参数
      this.$router.push("/math/video/" + this.course[0].url + "/" + id)
    }
  },
}
</script>

<style lang="less">
// 当用户的手机屏幕小于768px时, 对应的字体大小为12px
@media (max-width: 768px) {

  html,
  #home-container {
    font-size: 12px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }

  .el-dialog {
    width: 85% !important;
  }
}

// 当用户的手机屏幕小于992px但大于758px时，对应的字体大小为13px
@media (min-width: 768px) and (max-width: 992px) {

  html,
  #home-container {
    font-size: 12px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }

  .el-dialog {
    width: 85% !important;
  }

  .el-container {
    height: 71.5rem !important;
  }
}

// 当用户的手机屏幕大于992px但小于1200px时, 对应的字体大小为14px
@media (min-width:992px) and (max-width: 1200px) {

  html,
  #home-container {
    font-size: 13px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }
}

// 当用户的屏幕大于1200px时，对应的字体大小为15px
@media (min-width: 1200px) and (max-width: 1279.9px) {

  #home-container,
  html {
    font-size: 14px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }
}

@media (min-width:1280px) and (max-width: 1399.9px) {

  #home-container,
  html {
    font-size: 15px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }
}

@media (min-width: 1399.9px) and (max-width: 1559.9px) {

  #home-container,
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }
}

@media(max-width: 2059.9px) and (min-width: 1560px) {

  #home-container,
  html {
    font-size: 23.5px;
    scroll-behavior: smooth;
  }

  .resources-item {
    width: 100%;
  }

  .el-notification,
  .right,
  .left {
    background-color: white !important;
  }
}

/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  src: url("//at.alicdn.com/wf/webfont/bthrPwqDl4GP/sp4BJgkN5olwaSmNDvOeI.woff2") format("woff2"),
    url("//at.alicdn.com/wf/webfont/bthrPwqDl4GP/s7bLHD2mQQJtIquhpEfUz.woff") format("woff");
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.el-radio {
  margin: 0.666rem 0.333rem;
}

.el-dialog {
  border-radius: 0.45rem !important;
}

// 侧边栏固定部内容样式
.functions-fix {
  position: fixed;
  width: 7rem;
  height: 9rem;
  top: 73%;
  right: .9375rem;
  font-size: .875rem;
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
      box-shadow: 0 .125rem .625rem 0 rgba(31, 35, 41, .38);
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

// home页面的图片样式设置
.img {
  height: 100%;
}

// home页面页脚样式
.el-footer {
  padding: 0.5rem 20px 0 20px !important;
  border-top: 0.06666rem solid #c9c9c9;
  background-color: rgba(201, 201, 201, 0.2);

  i {
    font-size: 0.6rem;
    font-weight: 600;
  }

  // 致谢学校内容包括框样式
  .schools {
    width: 100%;
    height: 100%;
    text-align: center;
    font-family: "阿里妈妈数黑体 Bold" !important;

    ul {
      display: flex;
      min-height: 3rem;
      margin: .3125rem 0 0 0;
      flex-direction: row;
      align-content: center;
      justify-content: space-around;
      list-style-type: none;

      li {
        display: flex;
        width: 15.5%;
        margin: 0.2333rem;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        box-shadow: 0 5px 10px #7272720d;
        border-radius: 10px;

        i {
          margin: 0 .6875rem;
        }

        a {
          color: black;
          font-size: 0.75rem;
          text-decoration: none;
        }

      }
    }
  }
}

// home页面侧边栏样式
.aside {
  display: flex;
  color: #333;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: hsla(0, 0%, 79%, .2);

  // 侧边栏内容一：线上答疑教师排班表样式
  .courses {
    display: flex;
    width: 90%;
    min-height: 20rem;
    border-radius: 0.1rem;
    font-family: 'Montserrat';
    flex-direction: column;
    justify-content: center;
    margin: 1.875rem 0 0 0;
    border: 0.0666rem solid #c9c9c9;
    box-shadow: 0 0 0.2rem #c9c9c9;
    background: rgba(250, 250, 250, 1);

    .course-title {
      min-height: 2.5rem;
      text-align: center;
    }

    // 教师排班当天日期样式
    .day {
      text-align: left;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 0.9rem;
      border-bottom: 0.06666rem solid #c9c9c9;

      a {
        color: black;
        text-decoration: none;
      }
    }

    // 教师排班内容展示样式
    .courses-item {
      display: flex;
      min-height: 4rem;
      list-style: none;
      text-align: left;
      font-size: .75rem;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding-left: 0.6666rem;
      color: rgba(0, 0, 0, .8);

      li {
        padding: 0.2rem;
        font-weight: 600;
      }

      .special {
        color: rgba(0, 0, 0, .7);
        text-align: center;
        margin: 0 auto;
        font-size: .75rem;
      }
    }
  }

  // 侧边内容二：线上活动展示样式
  .activities {
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    border-radius: 0.1rem;
    justify-content: space-around;
    border: 0.0666rem solid #c9c9c9;
    box-shadow: 0 0 0.2rem #c9c9c9;
    background: rgba(250, 250, 250, 1);

    // 线上活动数据展示样式
    .activities-item {
      list-style: none;
      font-size: 0.8rem;
      padding: 0.3333rem;
      box-sizing: border-box;
      text-align: left;

      // 具体的数据样式
      li {
        height: 25%;
        font-weight: 500;
        padding: 0.3333rem;
        margin-bottom: 0.13333rem;
        box-sizing: border-box;
        border: 0.06666rem solid #c9c9c9;



        // 线上内容链接样式
        a {
          text-decoration: none;
          color: black;

          span {
            display: inline-block;
            font-size: .75rem;
            margin: 0.2rem 0;
            text-indent: 1rem;
            font-family: fantasy;

            overflow: hidden;
            text-overflow: ellipsis;
            /* 将对象作为弹性伸缩盒子模型显示 */
            display: -webkit-box;
            /* 限制在一个块元素显示的文本的行数 */
            /* -webkit-line-clamp 其实是一个不规范属性，使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；*/
            -webkit-line-clamp: 3;
            /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-box-orient: vertical;
          }
        }
      }
    }

    // 分页按钮样式
    .pagination {
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: space-around;
      color: rgb(0, 66, 149);
      margin: 1rem 0;
    }
  }

  // 侧边内容三：用户反馈调查
  .asideNewNps {
    width: 92%;
    height: 12%;
    margin: 0 auto;
    text-align: center;
    box-shadow: 0 0 0.2rem #c9c9c9;
    border: 0.0666rem solid #c9c9c9;
    background-color: #fff;

    .aside-title {
      background-size: 300px 38px;
      color: #3d3d3d;
      padding: 0 1rem;
      height: 2.375rem;
      font-size: .75rem;
      line-height: 2.375rem;
      border-bottom: .0625rem solid #ccc;
      background: url(@/assets/bg-nav.png) no-repeat center;
    }

    .aside-content {
      padding: .75rem .3125rem;
      overflow: hidden;

      ul {
        display: flex;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        font-size: .75rem;
        padding-top: 8px;
        list-style: none;
        justify-content: space-between;


        li {
          color: #777888;
          cursor: pointer;

          &:hover {
            img {
              transform: translate(0, -0.25rem); // 鼠标悬浮时box向上浮动的距离
            }
          }

          img {
            width: 1.375rem;
            height: 1.375rem;
            margin: 0 0 .3125rem 0;
          }
        }
      }
    }
  }
}


// home页面主体内容样式
.el-main {
  height: 100%;
  color: #333;
  text-align: center;
  padding: 0 !important;
  font-family: 'Montserrat';
  border-left: 0.06666rem solid #c9c9c9;

  .el-rate__icon {
    font-size: 1.125rem;
  }

  .el-rate__text {
    font-size: .875rem;
  }

  .text {
    position: absolute;
    top: 100%;
    left: 35%;
    font-weight: bold;
    font-size: 1.2rem;
    z-index: 999;
  }

  .text.margin {
    top: 115%;
  }

  .line {
    width: 100%;
    border-right: 2px solid #000;
    white-space: nowrap;
    overflow: hidden;
  }

  .animation {
    animation: grow 2s steps(70) 1s normal both, blink 200ms infinite normal;
  }

  /*对动画设置时间和分段，对右边框设置动画样式*/
  .it {
    animation-delay: 3.5s;
  }

  /*下一段延时执行动画*/
  @keyframes grow {
    from {
      width: 0;
    }

    to {
      width: 100%;
      /*段落长度 */
      border-right-color: transparent;
    }

    0% {
      border-right: 0;
    }

    /*光标起始位置不显示*/
    1% {
      color: purple;
      border-right: 2px solid #000;
    }

    /*光标显示*/
    99% {
      color: #c9c9c9;
      border-right: 2px solid #000;
    }

    100% {
      border-right: 0;
    }

    /*结束位置光标不显示*/
  }

  @keyframes blink {
    from {
      border-right-color: #000;
    }

    to {
      border-right-color: transparent;
      /*文字透明化*/
    }
  }


  // 资源推荐样式
  .resources {
    margin: 0 0 1.25rem 0;
    width: 100%;
    height: 59%;
    padding: 1.25rem;

    // 资源推荐具体内容样式
    .resources-item {
      height: 100%;
      border: 0.0666rem solid #c9c9c9;
      box-shadow: 0 0 0.2rem #c9c9c9;

      /deep/ .el-rate__text {
        font-size: 16px;
      }

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

        // 资源推荐总内容包括框样式
        ul {
          width: 100%;
          height: 100%;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 1rem;

          // 资源推荐个课程包括框样式
          li {
            position: relative;
            width: 98%;
            font-size: 0.65rem;
            text-align: left;
            margin-bottom: 0.26666rem;
            border-radius: 0.33333rem;
            border: 0.0666rem solid #c9c9c9;
            box-shadow: 5px 5px 8px #888888;
            z-index: 999;

            // 不同内容的文字介绍样式
            a {
              color: black;
              display: block;
              text-decoration: none;
              margin: 0.13333rem;
            }

            // 课程图片样式
            img {
              width: 100%;
              height: 72%;
            }
          }

          li::before {
            display: none;
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .4) url(@/assets/arr.png) no-repeat center;
            background-size: 2rem;
          }

          li:hover::before {
            display: block;
          }

          li:hover {
            transform: scale(1.02);
            overflow: hidden;
            transition: 0.8s;
          }
        }
      }
    }

    // 最受欢迎老师样式
    .resources-favor {
      width: 100%;
      height: 100%;
      font-weight: 600;
      border: 0.0666rem solid #c9c9c9;
      box-shadow: 0 0 0.2rem #c9c9c9;

      // 最受欢迎老师-标题内容样式
      .title2 {
        height: 10%;
        text-align: left;

        // 资源推荐各老师包括框样式
        li {
          height: 2.25rem;
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
          text-shadow: 0.1em 0.1em 7.2em #333;
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


.el-container {
  // margin-bottom: 40px;
  display: block !important;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 17.333rem;
}
</style>