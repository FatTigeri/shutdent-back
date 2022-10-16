import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 
  state: {
    // 全局变量flag用来控制home页面中的登录按钮的消失
    flag: true,
    // 全局变量imgSrc用来保存用户登录后获取到的图片地址
    imgSrc: 'avatar.png',
    // 全局变量upLoadImg用来保存用户注册中上传的图片名字
    upLoadImg: '',
    // 项目导航栏处的当前位置变量
    current: 0,
    alive: true
  },

  // 
  getters: {
    
  },

  // 
  mutations: {
    changeAlive(state) {
      state.alive = !state.alive
    },
    // 控制全局变量state的状态
    changeFlag(state, result) {
      state.flag = result
    },

    // 控制后台中获取到的图片地址
    getImgSrc(state, src) {
      state.imgSrc = src
    },

    // 设置头像名
    setImgName(state, name) {
      state.upLoadImg = name
    },

    // 切换当前页面被选中的索引
    changeCurrent(state, index) {
      state.current = index
    }
  },

  // 
  actions: {

  },

  // 
  modules: {

  }
})
