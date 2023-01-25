import {createRouter, createWebHashHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      name: `home`,
      component: HomeView
    },
    {
      path: `/books`,
      name: `books`,
      component: () => import('@/views/BookListView.vue')
    },
    {
      path: `/books/add`,
      name: `books-add`,
      component: () => import('@/views/AddBookView.vue')
    },
    {
      path: `/authors`,
      name: `authors`,
      component: () => import('@/views/AuthorListView.vue')
    },
    {
      path: `/authors/add`,
      name: `authors-add`,
      component: () => import('@/views/AddAuthorView.vue')
    },
  ],
})

export default router
