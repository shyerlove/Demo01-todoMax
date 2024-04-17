import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'note',
      component: () => import('../views/Note.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/Todo.vue')
    }
  ]
})

export default router
