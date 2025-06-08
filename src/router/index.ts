import { createRouter, createWebHistory } from 'vue-router'
import Home from '../features/home-module/home-module.vue'
import Calc from '../features/calculator/calculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/test',
      name: 'test calc',
      component: Calc,
    }
  ],
})

export default router
