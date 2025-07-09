import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingPage from '../views/LandingPage.vue'
import StudentOptionsView from '../views/StudentOptionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/student',
      name: 'student-options',
      component: StudentOptionsView,
    },
    {
      path: '/student/exam',
      name: 'student-exam',
      component: () => import('../views/StudentExamView.vue'),
    },
    {
      path: '/student/chat',
      name: 'student-chat',
      component: () => import('../views/StudentChatView.vue'),
    },
    {
      path: '/student/add-examples',
      name: 'student-add-examples',
      component: () => import('../views/StudentAddExamplesView.vue'),
    },
  ],
})

export default router
