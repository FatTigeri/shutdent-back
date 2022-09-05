import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axois用来进行请求数据的发送
import axois from 'axois'

Vue.config.productionTip = false

Vue.prototype.$http = axois

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
