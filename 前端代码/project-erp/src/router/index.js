
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import pathArr from '@/router/pathArr.js'
import adminArr from '@/router/adminArr.js'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes:[
    {path:'/', redirect:'/index'},
    {path:'/login',component:resolve => require(['@/views/login.vue'], resolve)},
    {path:'/index',component:resolve => require(['@/views/index.vue'], resolve), children:[
      {path:'/index',component:resolve => require(['@/views/indexList/HomePage.vue'], resolve)},
      {path:'/member',component:resolve => require(['@/components/member.vue'], resolve)},
      {path:'/user/page1',component:resolve => require(['@/components/Floor.vue'], resolve)},
      {path:'/user/page2',component:resolve => require(['@/components/Floor.vue'], resolve)},
      {path:'/user/page3',component:resolve => require(['@/components/Floor.vue'], resolve)},
      {path:'/user/page4',component:resolve => require(['@/components/Floor.vue'], resolve)},
      {path:'/user/page5',component:resolve => require(['@/components/Floor.vue'], resolve)},
      {path:'/user/page6',component:resolve => require(['@/components/Floor.vue'], resolve)}
    ]}
  ]
})

router.beforeEach(function (to,from,next) { 
  if (pathArr.indexOf(to.path) !== -1) {
    axios.get('/api/erp/user/log').then(res => {
      if (res.data.errno === 0) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

router.beforeEach(function (to,from,next) { 
  if (adminArr.indexOf(to.path) !== -1) {
    axios.get('/api/erp/user/log').then(res => {
      if (res.data.msg.level === '超级管理员') {
        next()
      } else {
        next('/index')
      }
    })
  }else {
    next()
  }
})

export default router
