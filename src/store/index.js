import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局变量flag用来控制home页面中的登录按钮的消失
    flag: true,
    // 全局变量imgSrc用来保存用户登录后获取到的图片地址
    imgSrc: ''
  },

  getters: {

  },

  mutations: {
    // 控制全局变量state的状态
    changeFlag(state) {
      state.flag = !state.flag
    },

    // 控制后台中获取到的图片地址
    getImgSrc(state, src) {
      state.imgSrc = src
    }
  },

  actions: {

  },

  modules: {

  }
})
