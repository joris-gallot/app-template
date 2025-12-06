import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        layout: 'app',
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Settings.vue'),
      meta: {
        layout: 'app',
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Signin.vue'),
      meta: {
        noAuth: true,
        layout: 'auth',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue'),
      meta: {
        noAuth: true,
        layout: 'auth',
      },
    },
  ],
})

export default router
