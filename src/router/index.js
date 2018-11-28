import Vue from 'vue'
import Router from 'vue-router'
import User from '@/views/user'
import Org from '@/views/org'
import Login from '@/views/frame/login'
import Manager from '@/views/frame/manager'
import NotFound from '@/views/frame/404.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'manager',
      component: Manager,
      children: [{
        path: 'user-index',
        component: User,
        name: '用户管理'
      }, {
        path: 'org-index',
        component: Org,
        name: '组织机构',
      }]
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
    },
    {
      path: '*',
      hidden: true,
      redirect: {path: '/404'}
    }

  ]
})

// 登陆拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let username = sessionStorage.getItem('username')
  if (!username && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})
export default router
