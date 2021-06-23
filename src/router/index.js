import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import Welcome from '../components/welcome'
import Users from '../components/user/Users'
import Register from '@/components/Register'
import test from '@/components/test'
import RecoverPassword from '@/components/RecoverPassword'
import Center from '@/components/user/Center'
import BasicInf from '@/components/user/center_child/BasicInf'
import Repass from '@/components/user/center_child/Repass'
import Message from '@/components/Message'
import Home from '@/components/Home'
import SearchInfo from '@/components/SearchInfo'
import SearchDetail from '@/components/SearchDetail'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/searchDetail', component: SearchDetail },
    { path: '/searchInfo', component: SearchInfo },
    { path: '/home', component: Home },
    { path: '/test', component: test },
    { path: '/recoverPassword', component: RecoverPassword },
    {
      path: '/center',
      component: Center,
      redirect: '/basic',
      children: [
        { path: '/basic', component: BasicInf },
        { path: '/repass', component: Repass }
      ]
    },
    {
      path: '/',
      component: Home,
      redirect: '/home'
    },
    { path: '/register', component: Register },
    {
      path: '/index',
      component: Index,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/message', component: Message }
      ]
    }
  ]
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
// // to将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   // next()放行 next('/login') 强制跳转
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
