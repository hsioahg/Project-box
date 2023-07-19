import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import pathArr from '@/router/pathArr.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/', redirect:'/home'},
    {path:'/user', component:resolve => require(['@/views/User/user.vue'], resolve)},
    {path:'/home', component:resolve => require(['@/views/home/home.vue'], resolve), children: [
      {path:'/home', component:resolve => require(['@/views/home/homebody/homepage.vue'], resolve)},
      {path:'/home/detail', component:resolve => require(['@/views/home/homebody/detailsPage.vue'], resolve), name:'details'},
      {path:'/home/article', component:resolve => require(['@/views/home/homebody/writeArticle.vue'], resolve), name:'update'},
      {path:'/home/adminhome', component:resolve => require(['@/views/home/homebody/adminHome.vue'], resolve)},
    ]},
  ]
})

router.afterEach((to, from, next) => {
  document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});

router.beforeEach(function (to,from,next) { 
  if (pathArr.indexOf(to.path) !== -1) {
    axios.get('/api/blog/user/log').then(res => {
      if (res.data.errno === 0) {
        next()
      } else {
        next('/user')
      }
    })
  } else {
    next()
  }
})

export default router
