import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Room from '@/views/Room.vue'
import Chat from '@/views/Chat.vue'
import Administrator from '@/components/Administrator.vue'
import Teacher from '@/views/Teacher.vue'
import Answer from '@/views/Answer.vue'
import Resource from '@/components/Resource.vue'
import Problem from '@/views/Problem.vue'
import Student from '@/views/Student.vue'
import Video from '@/components/Video.vue'
import Activity from '@/views/Activity.vue'
import Examination from '@/views/Examination.vue'
import Back from '@/components/Back.vue'
import Classes from '@/views/Classes.vue'
import Upload from '@/views/Upload.vue'
import stuAdmin from '@/components/StuAdmin.vue'
import Schedule from '@/views/Schedule.vue'
import Info from '@/components/Info.vue'
import Question from '@/views/Question.vue'

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  // base: process.env.BASE_URL,
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
        { path: 'activity', component: Activity },
      ]
    },
    { path: '', redirect: '/math/home' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/administrator', component: Administrator, redirect: '/administrator/teacher', children: [
        { path: 'teacher', component: Teacher },
        { path: 'answer', component: Answer },
        { path: 'problem', component: Problem },
        { path: 'student', component: Student },
        { path: 'upload', component: Upload },
        { path: 'schedule', component: Schedule }
      ]
    },
    {
      path: '/stuAdmin', component: stuAdmin, redirect: '/stuAdmin/info', children: [
        { path: 'answer', component: Answer },
        { path: 'info', component: Info },
        { path: 'question', component: Question }
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
