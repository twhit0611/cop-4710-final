import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'

Vue.use(Router)

let router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Homepage,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if the record requires authentication
  if (to.matched.some(record => record.meta.requiresAuth))  {
    // if the user is not authenticated, navigate them to login
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    }
    // the user is authenticated in this case
    else {
      let user = JSON.parse(localStorage.getItem('user'))
      // if the record requires you to be admin
      if (to.matched.some(record => record.meta.is_admin)) {
        // if admin, navigate to the record
        if (user.is_admin == 1) {
          next()
        }
        // otherwise, nagivate to normal dashboard
        else {
          next({name: 'dashboard'})
        }
      }
      next()
    }
  }
  else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.is_admin == 1) {
        next({name: 'admin'})
      }
      else {
        next({name: 'dashboard'})
      }
    }
  }
})

export default router