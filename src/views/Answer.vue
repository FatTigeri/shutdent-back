<template>
  <el-row :gutter="0" style="height: 100%;">
    <el-col :xs="24" style="height: 99%;">
      <div id="answer-container">
        <!-- 内容盒子 -->
        <div class="content-box">
          <!-- 搜索框盒子 -->
          <div class="search-box">
            <div class="search">
              <el-input placeholder="" prefix-icon="el-icon-search" v-model="input1" @keydown.enter.native="search">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>

          <div class="answer-box">
            <!-- 学生问题内容显示 -->
            <ul>
              <div class="answer-end" v-if="currentList.length === 0">暂无消息</div>
              <li v-for="item in currentList" :key="item.id">
                <div class="answer">
                  <i>{{ item.answerer }}回答:</i>&nbsp;&nbsp;
                  <span @click="show(item.image)">{{ item.contents }}</span>
                  <el-button type="text" @click="open(item.id, item.qid)">我已阅读</el-button>
                </div>
                <div class="type">
                  <i>问过:</i>&nbsp;&nbsp;
                  <span>{{ item.comments }}</span>
                </div>
              </li>
              <div class="pagination">
                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="pre">
                </el-button>
                <el-button type="primary" size="mini" @click="next"><i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </div>
            </ul>
            <el-dialog title="提示" :visible.sync="centerDialogVisible" width="40%" center append-to-body>
              <span v-if="this.image === ''">老师没有上传对应的图片解答</span>
              <img :src="image" alt="" style="width: 200px;" v-else>
              <span slot="footer" class="dialog-footer">
                <el-button @click="confirm">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mydebounce } from '@/utils/index.js'
export default {
  name: 'answer',
  created() {
    // 调用初始化学生问题方法
    this.initProblem()
  },
  computed: {
    flag: function () {
      return this.textarea === '';
    }
  },
  data() {
    return {
      input1: '',
      problemList: [],
      currentList: [],
      current: 1,
      maxPages: 0,
      dialogFormVisible: false,
      // 接收后端返回来的图片名
      imgName: '',
      // 接收当前问题的id
      qid: 0,
      centerDialogVisible: false,
      image: ''
    }
  },
  methods: {
    // 获取后台学生问题数据的方法
    async initProblem() {
      // 调用后台接口
      const { data: res } = await this.$http.get('/getInfos', {
        params: {
          "questioner": window.localStorage.getItem('token')
        }
      })
      // 将获取到的数据进行接收赋值
      this.problemList = res

      // 计算当前获取的数据长度
      const size = this.problemList.length > 5 ? 5 : this.problemList.length

      // 将需要展示的数据通过for循环赋值给currentList
      for (let i = 0; i < size; i++) {
        this.currentList.push(this.problemList[i])
      }

      // 计算数据的最大页数
      if (this.problemList.length % 5 === 0) {
        // 刚好整除，直接赋值
        this.maxPages = parseInt(this.problemList.length / 5)
      } else {
        // 非整除，加一操作
        this.maxPages = parseInt(this.problemList.length / 5) + 1
      }
    },
    // 教师问题信息搜索方法(使用防抖限制)
    search: mydebounce(function () {
      if (this.input1 === '') {
        this.$notify({
          title: '信息提示',
          type: 'error',
          message: '搜索内容不能为空！'
        })
      } else {
        this.$notify({
          title: '信息提示',
          type: 'info',
          message: '功能后续开发中！'
        })
      }
    }, 3000),
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
          this.currentList.push(this.problemList[i])
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
        const size = (this.current + 1) * 5 > this.problemList.length ? this.problemList.length : (this.current + 1) * 5
        // 对应的赋值算法
        for (var i = this.current * 5; i < size; i++) {
          this.currentList.push(this.problemList[i])
        }
        // 将当前页面变量进行加一操作
        this.current++;
      }
    },
    open(id, qid) {
      this.$confirm('是否置为已读?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        // 调用后端的api接口进行对应回答进行删除操作
        this.$http.get('/deleteAnswer?id=' + id);
        // 调用后端的api接口进行对应的问题删除操作
        this.$http.get('/deleteQuestion?id=' + qid)
        // 页面刷新
        this.$router.go(0)

        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    // 返回对应的图片地址
    show(src) {
      this.centerDialogVisible = true
      if (src !== '') {
        this.image = 'http://1.12.235.213/img/' + src;
      }
    },
    confirm() {
      this.image = ''
      this.centerDialogVisible = false
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


#answer-container {
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border: 0.1rem solid #c9c9c9;
  background: rgba(250, 250, 250, 1);


  .content-box {
    width: 100%;
    height: 100%;

    .search-box {
      width: 100%;
      height: 12%;
      line-height: 49.66px;
      box-sizing: border-box;

      .search {
        width: 70%;
        margin: 0 auto;
      }
    }

    .answer-box {
      width: 100%;
      height: 88%;
      box-sizing: border-box;

      ul {
        position: relative;
        width: 85%;
        height: 90%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        list-style: none;

        .answer-end {
          height: 3.125rem;
          text-align: center;
          color: #9499a0;
          margin-top: 1.25rem;
          font-size: 0.8125rem;
        }

        li {
          width: 100%;
          height: 17%;
          box-sizing: border-box;
          border: 1px solid black;


          .answer {
            width: 95%;
            height: 60%;
            text-align: left;
            margin: 0 0.5rem;
            font-weight: 600;
            font-size: 0.9333rem;
            line-height: 1.9786rem;
            box-sizing: border-box;
            color: rgb(212, 39, 97);
            cursor: pointer;

            .el-button {
              float: right;
            }
          }

          .type {
            width: 100%;
            height: 40%;
            text-align: right;
            padding: 0 1rem;
            box-sizing: border-box;
            font-size: 12px !important;


            span {
              display: inline-block;
              margin: 0.09rem 0.5rem;
              box-sizing: border-box;
            }

            i {
              color: green;
            }

            span:nth-child(1),
            span:nth-child(2) {
              color: green;
            }

            span:nth-child(3) {
              color: purple;
              border: 0.1rem solid purple;
            }
          }
        }

        // 分页按钮样式
        .pagination {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-top: 0.7rem;
          color: rgb(0, 66, 149);
        }
      }

      .el-dialog {
        text-align: center;
      }
    }
  }
}
</style>