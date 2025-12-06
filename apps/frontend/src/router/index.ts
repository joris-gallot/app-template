import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Settings.vue'),
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Signin.vue'),
      meta: {
        layout: 'auth',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue'),
      meta: {
        layout: 'auth',
      },
    },
  ],
})

export default router
