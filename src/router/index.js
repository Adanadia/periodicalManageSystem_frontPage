import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import MainPage from '../views/MainPage'
import Notfound from "../views/Notfound";
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/main',
    name:'main',
    component: MainPage
  },
  {
    path: '/',
    redirect:'/main'
  },
  {
    path:'*',
    component: Notfound
  }
]

const router = new VueRouter({
  mode:"history",
  base: process.env.BASE_URL,
  routes
})

export default router
