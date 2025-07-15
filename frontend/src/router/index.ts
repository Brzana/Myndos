import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingPage from '../views/LandingPage.vue'
import StudentTasksView from '../views/StudentTasksView.vue'
import TeacherTasksView from '../views/TeacherTasksView.vue'

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
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/student',
      name: 'student-options',
      component: () => import('../views/StudentOptionsView.vue'),
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
      path: '/student/edit-questions',
      name: 'student-add-examples',
      component: () => import('../views/StudentAddExamplesView.vue'),
    },

    // Teacher routes
    {
      path: '/teacher',
      name: 'teacher-options',
      component: () => import('../views/TeacherOptionsView.vue'),
    },
    {
      path: '/teacher/exam',
      name: 'teacher-exam',
      component: () => import('../views/TeacherExamView.vue'),
    },
    {
      path: '/teacher/edit-questions',
      name: 'teacher-edit-questions',
      component: () => import('../views/TeacherEditQuestionsView.vue'),
    },
  ],
})

export default router
