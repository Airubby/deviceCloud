import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Index from '@/page/index'
//实时监控
import realControl from '@/page/realControl'
import realControlGis from '@/page/realControl_GIS'  //设备监控
import realControlListView from '@/page/realControl_ListView'  //当前告警
import realControlHisData from '@/page/realControl_HisData'  //设备历史数据
import realControlHisAlarm from '@/page/realControl_HisAlarm'  //设备历史告警



//接入管理
import accessManage from '@/page/accessManage'
import accessManageClient from '@/page/accessManage_Client'  //客户管理
import accessManage_Client_Add from '@/page/accessManage_Client_Add'  //客户管理新增

import accessManageProject from '@/page/accessManage_Project'  //项目管理
import accessManage_Project_add from '@/page/accessManage_Project_add'  //项目管理新增
import accessManageGateway from '@/page/accessManage_Gateway'  //接入网关
import accessManageDevice from '@/page/accessManage_Device'  //接入设备
import accessManageDeviceType from '@/page/accessManage_DeviceType'   //设备类型管理




//运维管理
import operationManage from '@/page/operationManage'
import operationManageAbnormalLog from '@/page/operationManage_AbnormalLog'  //系统异常日志
import operationManageOperationLog from '@/page/operationManage_OperationLog'  //系统操作日志
import operationManageControl from '@/page/operationManage_Control'  //队列监控
import operationManageInformLog from '@/page/operationManage_InformLog'  //通知消息日志

//模板管理
import templateManage from '@/page/templateManage'
import templateManage_Collection from '@/page/templateManage_Collection'  //采集控制模板
import templateManage_collection_add from '@/page/templateManage_collection_add' 
import templateManage_DeviceTypeTemp from '@/page/templateManage_DeviceTypeTemp'  //设备类型模板
import templateManage_DeviceTypeTemp_add from '@/page/templateManage_DeviceTypeTemp_add'  //设备类型模板增加
import templateManage_EventRule from '@/page/templateManage_EventRule'  //事件规则模板
import templateManage_EventRule_add from '@/page/templateManage_EventRule_add' //事件规则增加
import templateManage_Inform from '@/page/templateManage_Inform'  //消息模板
import templateManage_EventBase from '@/page/templateManage_EventBase'  //事件库
import templateManage_EventBase_add from '@/page/templateManage_EventBase_add'

//系统管理
import msManage from '@/page/msManage'
import msManageUser from '@/page/msManage_User'
import msManage_user_add from '@/page/msManage_user_add'
import msManageRole from '@/page/msManage_Role'
import msManage_role_add from '@/page/msManage_role_add'
import msManageLimits from '@/page/msManage_Limits'
import msManage_limits_add from '@/page/msManage_limits_add'
import msManageDatadic from '@/page/msManage_Datadic'
import msManage_datadic_add from '@/page/msManage_datadic_add'


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
      path: '/login',
      component: Login
    },{
      path:'/realControl',  //监控管理
      component:realControl,
      redirect:'/realControl/gis',
      children:[
        {path:'/realControl/gis',component:realControlGis},
        {path:'/realControl/listView',component:realControlListView},
        {path:'/realControl/hisData',component:realControlHisData},
        {path:'/realControl/hisAlarm',component:realControlHisAlarm},
      ]
    },{ //接入管理
      path:'/accessManage',
      component:accessManage,
      redirect:'/accessManage/client',
      children:[
        {path:'/accessManage/client',component:accessManageClient},
        {path:'/accessManage/client/add',component:accessManage_Client_Add}, //新增客户信息
        {path:'/accessManage/project',component:accessManageProject},
        {path:'/accessManage/project/add',component:accessManage_Project_add},
        
        {path:'/accessManage/gateway',component:accessManageGateway},
        {path:'/accessManage/device',component:accessManageDevice},
        {path:'/accessManage/deviceType',component:accessManageDeviceType},
        
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
          {path:'/templateManage/collection/add',component:templateManage_collection_add},
          {path:'/templateManage/deviceTypeTemp',component:templateManage_DeviceTypeTemp},
          {path:'/templateManage/deviceTypeTemp/add',component:templateManage_DeviceTypeTemp_add},
          {path:'/templateManage/eventRule',component:templateManage_EventRule},
          {path:'/templateManage/eventRule/add',component:templateManage_EventRule_add},
          {path:'/templateManage/inform',component:templateManage_Inform},
          {path:'/templateManage/eventBase',component:templateManage_EventBase},
          {path:'/templateManage/eventBase/add',component:templateManage_EventBase_add},
      ]
    },{
      path:'/msManage',  //系统管理
      component:msManage,
      redirect:'/msManage/userManage',
      children:[
        {path:'/msManage/userManage',component:msManageUser},
        {path:'/msManage/userManage/add',component:msManage_user_add},  //新增用户信息
        {path:'/msManage/roleManage',component:msManageRole },
        {path:'/msManage/roleManage/add',component:msManage_role_add},  //新增角色信息
        {path:'/msManage/limitsManage',component:msManageLimits },
        {path:'/msManage/limitsManage/add',component:msManage_limits_add }, //新增权限
        
        {path:'/msManage/datadicManage',component:msManageDatadic },
        {path:'/msManage/datadicManage/add',component:msManage_datadic_add },  //数据字典新增
        
      ]
    }
    




    ,{
      path: '/test',
      component: Test,
    },
    
  ]
})
