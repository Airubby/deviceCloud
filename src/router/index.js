import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import realControl from '@/page/realControl'
import realControlGis from '@/page/realControl_GIS'
import realControlListView from '@/page/realControl_ListView'

import msConfig from '@/page/msConfig'


import Test from '@/page/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Index
    },{
      path: '/',
      component: Index
    },{
      path: '/home',
      component: Index
    },{
      path:'/realControl',
      component:realControl,
      redirect:'/realControl/gis',
      children:[
        {path:'/realControl/gis',component:realControlGis},
        {path:'/realControl/listView',component:realControlListView},
      ]
    },{
      path:'/msConfig',
      component:msConfig
    }
    




    ,{
      path: '/test',
      component: Test,
    },
    
  ]
})
