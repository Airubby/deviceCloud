import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
//实时监控
import realControl from '@/page/realControl'
import realControlGis from '@/page/realControl_GIS'
import realControlListView from '@/page/realControl_ListView'
import realControlEventView from '@/page/realControl_EventView'
//接入管理
import accessManage from '@/page/accessManage'
import accessManageGateway from '@/page/accessManage_Gateway'
import accessManageDevice from '@/page/accessManage_Device'
import accessManageTemplate from '@/page/accessManage_Template'
import accessManageEvent from '@/page/accessManage_Event'
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
        {path:'/realControl/eventView',component:realControlEventView},
      ]
    },{
      path:'/accessManage',
      component:accessManage,
      redirect:'/accessManage/gateway',
      children:[
        {path:'/accessManage/gateway',component:accessManageGateway},
        {path:'/accessManage/device',component:accessManageDevice},
        {path:'/accessManage/template',component:accessManageTemplate},
        {path:'/accessManage/event',component:accessManageEvent},
      ]
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
