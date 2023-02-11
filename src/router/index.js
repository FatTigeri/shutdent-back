import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue'
import Home from '@/components/Home.vue'
import Room from '@/components/Room.vue'
import Chat from '@/views/Chat.vue'
import Resource from '@/components/Resource.vue'
import Video from '@/components/Video.vue'
import Examination from '@/views/Examination.vue'
import Back from '@/components/Back.vue'
import Classes from '@/views/Classes.vue'
import Course from '@/components/Course.vue'
import TResource from '@/views/TResource.vue'
import Contest from '@/components/Contest.vue'

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/math', component: Layout, children: [
        { path: 'home', component: Home },
        { path: 'home-container', redirect: '/math/home' },
        { path: 'room', component: Room },
        { path: 'chat', component: Chat },
        {
          path: 'resource', component: Resource, redirect: '/math/resource/classes', children: [
            { path: 'examination', component: Examination },
            { path: 'back', component: Back },
            { path: 'classes', component: Classes }
          ]
        },
        { path: 'video/:url/:id', component: Video },
        { path: 'activity', component: () => import('@/views/Activity.vue') },
        { path: 'courses', component: Course },
        { path: 'TResource', component: TResource },
        { path: 'contest/:status', component: Contest },
        { path: 'act_content/:id', component: () => import('@/components/MyActivity.vue') }
      ]
    },
    { path: '', redirect: '/math/home' },
    { path: '/login', component: () => import('@/components/Login.vue') },
    { path: '/register', component: () => import('@/components/Register.vue') },
    {
      path: '/administrator', component: () => import('@/components/Administrator.vue'), redirect: '/administrator/teacher', children: [
        { path: 'teacher', component: () => import('@/views/Teacher.vue') },
        { path: 'answer', component: () => import('@/views/Answer.vue') },
        { path: 'problem', component: () => import('@/views/Problem.vue') },
        { path: 'student', component: () => import('@/views/Student.vue') },
        { path: 'upload', component: () => import('@/views/Upload.vue') },
        { path: 'schedule', component: () => import('@/views/Schedule.vue') },
        { path: 'upActivity', component: () => import('@/views/UpActivity.vue') },
        { path: 'feedback', component: () => import('@/views/FeedBack.vue') }
      ]
    },
    {
      path: '/stuAdmin', component: () => import('@/components/StuAdmin.vue'), redirect: '/stuAdmin/info', children: [
        { path: 'answer', component: () => import('@/views/Answer.vue') },
        { path: 'info', component: () => import('@/components/Info.vue') },
        { path: 'question', component: () => import('@/views/Question.vue') }
      ]
    }
  ]
})

// 使用路由守卫, 对页面的跳转进行限制
router.beforeEach(function (to, from, next) {
  if (to.path === '/administrator/teacher' || to.path === '/administrator/problem'
    || to.path === '/administrator/student' || to.path === '/stuAdmin/answer' || to.path === '/stuAdmin/info'
    || to.path === '/stuAdmin/question') {
    // 读取浏览器中的token缓存
    const token = window.localStorage.getItem('token')

    if (token) {
      next()
    } else {
      window.sessionStorage.setItem('index', 0)
      next('/math/home')
    }
  } else {
    next()
  }
})

export default router
