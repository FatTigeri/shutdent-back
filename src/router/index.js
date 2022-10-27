import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Room from '@/views/Room.vue'
import Chat from '@/views/Chat.vue'
import Course from '@/views/Course.vue'
import Administrator from '@/components/Administrator.vue'
import Teacher from '@/views/Teacher.vue'
import Answer from '@/views/Answer.vue'
import Resource from '@/components/Resource.vue'
import Problem from '@/views/Problem.vue'
import Student from '@/views/Student.vue'
import Video from '@/views/Video.vue'
import Activity from '@/views/Activity.vue'
import Examination from '@/views/Examination.vue'

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/math', component: Layout, children: [
        { path: 'home', component: Home },
        { path: 'home-container', redirect: '/math/home' },
        { path: 'room', component: Room },
        { path: 'chat', component: Chat },
        { path: 'course', component: Course },
        {
          path: 'resource', component: Resource, redirect: '/math/resource/examination' ,children: [
            { path: 'examination', component: Examination },
          ]
        },
        { path: 'video/:id', component: Video },
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
        { path: 'student', component: Student }
      ]
    }
  ]
})

export default router
