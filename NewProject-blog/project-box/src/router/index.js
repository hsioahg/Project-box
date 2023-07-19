import Vue from 'vue'
import VueRouter from 'vue-router'
import url from '@/request/url.js'
import { getRequest } from '../request/api'
import store from '../store/index'

import pathArr from '@/router/pathArr.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/', redirect:'/home'},
    {path:'/user', component:resolve => require(['@/views/User/user.vue'], resolve)},
    {path:'/home', component:resolve => require(['@/views/Home/home.vue'], resolve), children: [
      {path:'/home', component:resolve => require(['@/views/Home/home_list/homeBody.vue'], resolve)},
      {path:'/home/essay', component:resolve => require(['@/views/Essay/writingPage.vue'], resolve)},
    ]}
  ]
})

router.beforeEach((to,from,next) => {
  // store.commit('initwindow', false)
  getRequest(url.userlog).then(res => {
    if (res.errno === 0) {
      next()
      store.commit('inituserlog', res.data[0])
      store.commit('initloginState', true)
    } else if (res.errno === -2) {
      store.commit('initloginState', false)
      next()
    }
  })
})

//全局前置守卫
router.beforeEach((to,from,next) => { 
  if (pathArr.indexOf(to.path) !== -1) {
    getRequest(url.userlog).then((res) => {
      if (res.errno === 0) {
        next()
      } else if (res.errno === -2) {
        next('/user')
      }
    })
  } else {
    next()
  }
})

export default router
