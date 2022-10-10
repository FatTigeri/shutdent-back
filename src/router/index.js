import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue'
import Home from '@/components/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Circular from '@/components/Circular.vue'
import Room from '@/views/Room.vue'
import Chat from '@/views/Chat.vue'
import Course from '@/views/Course.vue'
import Administrator from '@/components/Administrator.vue'
import Teacher from '@/views/Teacher.vue'
import Answer from '@/views/Answer.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/math', component: Layout, children: [
        { path: 'home', component: Home },
        { path: 'home-container', redirect: '/math/home' },
        { path: 'circular', component: Circular },
        { path: 'room', component: Room },
        { path: 'chat', component: Chat },
        { path: 'course', component: Course },
      ]
    },
    { path: '', redirect: '/math/home' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/administrator', component: Administrator, redirect: '/administrator/teacher', children: [
        { path: 'teacher', component: Teacher },
        { path: 'answer', component: Answer },
      ]
    }
  ]
})

export default router
