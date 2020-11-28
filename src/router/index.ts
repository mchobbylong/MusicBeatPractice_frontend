import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import Home from '@/views/Home.vue'
import Create from '@/views/Create.vue'
import Show from '@/views/Show.vue'
import ErrorPage from '@/views/Error.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        redirect: { name: 'Create' }
      },
      {
        path: '/create',
        name: 'Create',
        component: Create,
        meta: {
          title: 'Home'
        }
      },
      {
        path: '/show/:id',
        name: 'Show',
        component: Show,
        props: true,
        meta: {
          title: 'Practice'
        }
      },
      {
        path: '/error',
        name: 'ErrorPage',
        component: ErrorPage,
        props: true,
        meta: {
          title: 'Error'
        }
      },
      {
        path: '/404',
        name: '404',
        component: ErrorPage,
        props: { errorType: '404' },
        meta: {
          title: 'Not Found'
        }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.meta && (typeof to.meta.title !== 'undefined'))
    setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  next()
})

export default router
