import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axois用来进行请求数据的发送
import axios from 'axios'
// 导入qs
import qs from 'qs'
// 导入Elemen-ui进行后续的页面开发
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// 将相同的后端接口进行挂载
axios.defaults.baseURL = "http://1.12.235.213:8088/api"
// axios.defaults.baseURL = "http://localhost:8088/api"

Vue.prototype.$http = axios

Vue.prototype.$qs = qs
Vue.config.productionTip = false


Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
