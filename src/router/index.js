import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import MainPage from '../views/MainPage'
import Notfound from "../views/Notfound";
import Register from "@/views/Register";
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/main',
    name:'main',
    component: MainPage,
    meta:{requireAuth:true}
  },
  {
    path: '/',
    redirect:'/main',
    meta:{requireAuth:true}
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
