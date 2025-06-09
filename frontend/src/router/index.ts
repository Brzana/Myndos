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
      name: 'student',
      component: StudentTasksView,
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherTasksView,
    },
  ],
})

export default router
