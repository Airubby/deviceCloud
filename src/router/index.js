import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
//实时监控
import realControl from '@/page/realControl'
import realControlGis from '@/page/realControl_GIS'  //设备监控
import realControlListView from '@/page/realControl_ListView'  //当前告警
import realControlHisData from '@/page/realControl_HisData'  //设备历史数据
import realControlHisAlarm from '@/page/realControl_HisAlarm'  //设备历史告警

// import realControlEventView from '@/page/realControl_EventView'  


//接入管理
import accessManage from '@/page/accessManage'
import accessManageClient from '@/page/accessManage_Client'  //客户管理
import accessManageProject from '@/page/accessManage_Project'  //项目管理
import accessManageGateway from '@/page/accessManage_Gateway'  //接入网关
import accessManageDevice from '@/page/accessManage_Device'  //接入设备
import accessManageDeviceType from '@/page/accessManage_DeviceType'   //设备类型管理


// import accessManageTemplate from '@/page/accessManage_Template'
// import accessManageEvent from '@/page/accessManage_Event'
//运维管理
import operationManage from '@/page/operationManage'
import operationManageAbnormalLog from '@/page/operationManage_AbnormalLog'  //系统异常日志
import operationManageOperationLog from '@/page/operationManage_OperationLog'  //系统操作日志
import operationManageControl from '@/page/operationManage_Control'  //队列监控
import operationManageInformLog from '@/page/operationManage_InformLog'  //通知消息日志

//模板管理
import templateManage from '@/page/templateManage'
import templateManage_Collection from '@/page/templateManage_Collection'  //采集控制模板
import templateManage_DeviceType from '@/page/templateManage_DeviceType'  //设备类型模板
import templateManage_EventRule from '@/page/templateManage_EventRule'  //事件规则模板
import templateManage_Inform from '@/page/templateManage_Inform'  //消息模板
import templateManage_EventBase from '@/page/templateManage_EventBase'  //事件库

//系统管理
import msManage from '@/page/msManage'
import msManageUser from'@/page/msManage_User'
import msManageRole from'@/page/msManage_Role'
import msManageLimits from'@/page/msManage_Limits'
import msManageDatadic from'@/page/msManage_Datadic'
import msManageAddr from'@/page/msManage_Addr'


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
      path:'/realControl',  //监控管理
      component:realControl,
      redirect:'/realControl/gis',
      children:[
        {path:'/realControl/gis',component:realControlGis},
        {path:'/realControl/listView',component:realControlListView},
        {path:'/realControl/hisData',component:realControlHisData},
        {path:'/realControl/hisAlarm',component:realControlHisAlarm},
        // {path:'/realControl/eventView',component:realControlEventView},
      ]
    },{ //接入管理
      path:'/accessManage',
      component:accessManage,
      redirect:'/accessManage/client',
      children:[
        {path:'/accessManage/client',component:accessManageClient},
        {path:'/accessManage/project',component:accessManageProject},
        {path:'/accessManage/gateway',component:accessManageGateway},
        {path:'/accessManage/device',component:accessManageDevice},
        {path:'/accessManage/deviceType',component:accessManageDeviceType},
        
        // {path:'/accessManage/template',component:accessManageTemplate},
        // {path:'/accessManage/event',component:accessManageEvent},
      ]
    },{
      path:'/operationManage', //运维管理
      component:operationManage,
      redirect:'/operationManage/abnormalLog',
      children:[
        {path:'/operationManage/abnormalLog',component:operationManageAbnormalLog},
        {path:'/operationManage/operationLog',component:operationManageOperationLog},
        {path:'/operationManage/control',component:operationManageControl},
        {path:'/operationManage/informLog',component:operationManageInformLog},
      ]
    },{
      path:'/templateManage',  //模板管理
      component:templateManage,
      redirect:'/templateManage/collection',
      children:[
          {path:'/templateManage/collection',component:templateManage_Collection},
          {path:'/templateManage/deviceType',component:templateManage_DeviceType},
          {path:'/templateManage/eventRule',component:templateManage_EventRule},
          {path:'/templateManage/inform',component:templateManage_Inform},
          {path:'/templateManage/eventBase',component:templateManage_EventBase},
      ]
    },{
      path:'/msManage',  //系统管理
      component:msManage,
      redirect:'/msManage/userManage',
      children:[
        {path:'/msManage/userManage',component:msManageUser},
        {path:'/msManage/roleManage',component:msManageRole },
        {path:'/msManage/limitsManage',component:msManageLimits },
        {path:'/msManage/datadicManage',component:msManageDatadic },
        {path:'/msManage/addrManage',component:msManageAddr },
      ]
    }
    




    ,{
      path: '/test',
      component: Test,
    },
    
  ]
})
