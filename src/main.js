import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入qs
import qs from 'qs'
// 导入Elemen-ui进行后续的页面开发
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
// 将iconfont样式导入
import '@/assets/iconfont/iconfont.css'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// 将axios封装文件进行导入
import api from '@/utils/api.js'

// 挂载到vue实例
Vue.prototype.$http = api

Vue.prototype.$qs = qs
Vue.config.productionTip = false


Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
