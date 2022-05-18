import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/pcPage',
    component: () => import('@/views/TableConfig/index.vue')
  },
  {
    path: '/pcPage/detail',
    component: () => import('@/views/TableConfig/Detail/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
