import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
//实时监控
import realControl from '@/page/realControl'
import realControlGis from '@/page/realControl_GIS'
import realControlListView from '@/page/realControl_ListView'
//接入管理
import accessManage from '@/page/accessManage'
//运维管理
import operationManage from '@/page/operationManage'
//数据分析
import dataAnalysis from '@/page/dataAnalysis'
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
      path:'/accessManage',
      component:accessManage
    },{
      path:'/operationManage',
      component:operationManage
    },{
      path:'/dataAnalysis',
      component:dataAnalysis
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
