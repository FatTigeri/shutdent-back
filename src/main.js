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

Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false


Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
