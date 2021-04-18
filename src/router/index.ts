import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'
import Role from '../views/role.vue'
import Permission from '../views/permission.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/role',
    name: 'role',
    component: Role
  },
  {
    path: '/permission',
    name: 'permission',
    component: Permission
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

export default router
