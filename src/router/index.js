import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'
import SuperAdmin from '@/components/SuperAdmin'
import Events from '@/components/Events'

Vue.use(Router)

let router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Homepage
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
        requiresAuth: true,
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
    },
    {
      path: '/superadmin',
      name: 'superadmin',
      component: SuperAdmin,
      meta: {
        requiresAuth: true,
        is_super_admin: true
      }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // handle recor that require authentication
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
        // if superadmin, navigate to superadmin record
        else if (user.is_admin == 2) {
          next({name: 'superadmin'})
        }
        // if user, navigate to userboard
        else {
          next({name: 'dashboard'})
        }
      }

      // if the record requires you to be super admin
      if (to.matched.some(record => record.meta.is_super_admin)) {
        // if superadmin, navigate to the record
        if (user.is_admin == 2) {
          next()
        }
        // if admin, redirect to admin dashboard
        else if (user.is_admin == 1) {
          next({name: 'admin'})
        }
        // if user, redirect to user dashboard
        else {
          next({name: 'dashboard'})
        }
      }
      next()
    }
  }
  // handle guest records
  else if (to.matched.some(record => record.meta.guest)) {
    // if not authenticated, navigate to the record
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    // ifauthenticated, go to corresponding dashboard
    else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.is_admin == 2) {
        next({name: 'superadmin'})
      }
      else if (user.is_admin == 1) {
        next({name: 'admin'})
      }
      else {
        next({name: 'dashboard'})
      }
    }
  }
  // if no restriction, just open the record
  else {
    next()
  }
})

export default router