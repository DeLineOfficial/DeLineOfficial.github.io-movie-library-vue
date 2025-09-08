import { createRouter, createWebHistory } from 'vue-router'
import Home from '../features/home-module/home-module.vue'
import UserAccount from '../features/user-account/user-account.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'house',
      component: Home,
    },
    {
      path: '/account',
      name: 'user',
      component: UserAccount,
    }
  ],
})

export default router
