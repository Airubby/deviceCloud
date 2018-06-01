import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/notFoundComponent', component: (resolve) => require(['@/page/notFoundComponent'], resolve) },
    {
      path: '',
      component: (resolve) => require(['@/page/index'], resolve),
      redirect:'/index',
      children:[
        {path:'/index',component:(resolve) => require(['@/page/indexContent'], resolve)},
      ]
    },{
      path: '/',
      component: (resolve) => require(['@/page/index'], resolve),
      redirect:'/index',
      children:[
        {path:'/index',component:(resolve) => require(['@/page/indexContent'], resolve)},
      ]
    },{
      path: '/login',
      component: (resolve) => require(['@/page/login'], resolve)
    },
    
    
    ,{
      path: '/test',
      component: (resolve) => require(['@/page/test'], resolve),
    },
    
  ]
})
