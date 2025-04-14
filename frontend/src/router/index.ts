import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import axios from '@/plugins/axios'
import LoginView from '@/views/LoginView.vue'


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    meta: { requiresAuth: true } // 需要认证的路由
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 导航守卫
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ path: '/login' })
    } else {
      // 验证 token 是否有效
      try {
        const authResponse = await axios.post('/auth', {}, {
          headers: {
            'token': `${token}`
          }
        })
        if (authResponse.data.code === 1) {
          next()
        } else {
          localStorage.removeItem('token')
          next({ path: '/login' })
        }
      } catch (error) {
        localStorage.removeItem('token')
        next({ path: '/login' })
      }
    }
  } else {
    next()
  }
})

export default router
