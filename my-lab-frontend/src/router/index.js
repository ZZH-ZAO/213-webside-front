import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../pages/Home.vue'
import Members from '../pages/Members.vue'
import projects from '../pages/Projects.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'home', component: homepage },
  { path: '/members', name: 'members', component: Members },
  { path: '/projects', name: 'projects', component: projects },
  { path: '/login', name: 'login', component: Login },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (!auth.token) auth.loadToken()
  if (to.meta.requiresAuth && !auth.isLogged) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  next()
})

export default router