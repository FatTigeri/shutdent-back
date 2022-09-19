import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/components/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: "/", redirect: '/home' },
    { path: "/login", component: Login },
    { path: "/register", component: Register}
  ]
})

export default router
