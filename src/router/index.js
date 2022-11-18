import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import UserHomePage from '../views/UserHomePage.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  ,{
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/:userId',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    beforeEnter(to, from, next) {
        if(JSON.parse(localStorage.getItem("loggedUser"))) {
          next();
        } else {
          next('/');
        }
    },
    name: 'UserHomePage',
    component: UserHomePage
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
