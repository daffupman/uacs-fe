import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/home.vue'
import {message} from "ant-design-vue";
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      anon: true
    }
  },
  {
    path: '/role',
    name: 'role',
    component: () => {
      return import('../views/role.vue');
    }
  },
  {
    path: '/permission',
    name: 'permission',
    component: () => {
      return import('../views/permission.vue');
    }
  },
  {
    path: '/hierarchy',
    name: 'hierarchy',
    component: () => {
      return import('../views/hierarchy.vue');
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => {
      return import('../views/user.vue');
    }
  },
  {
    path: '/detail/role',
    name: 'roleDetail',
    component: () => {
      return import('../views/role-detail.vue');
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.anon || store.state.user) {
    next()
  } else {
    message.warning("请先登录", 3)
    next('/')
  }
})

export default router
