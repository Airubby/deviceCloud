// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import App from './App'
import router from './router'
import navInfo from './components/navInfo'
import loginInfo from './components/loginInfo'

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api



Vue.prototype.getComponent = function (id,loginIn){
  var componentList=[   
    {
      path:'/realControl',  //监控管理
      component:(resolve) => require(['@/page/realControl'], resolve),
      redirect:'/realControl/gis',
      children:[
        {path:'/realControl/gis',component:(resolve) => require(['@/page/realControl_GIS'], resolve)}, //设备监控
        {path:'/realControl/gis/info',component:(resolve) => require(['@/page/realControl_GIS_info'], resolve)}, //设备监控
        {path:'/realControl/listView',component:(resolve) => require(['@/page/realControl_ListView'], resolve)},
        {path:'/realControl/hisData',component:(resolve) => require(['@/page/realControl_HisData'], resolve)},//设备历史数据
        {path:'/realControl/hisData/detail',component:(resolve) => require(['@/page/realControl_HisData_detail'], resolve)},//设备历史数据
        {path:'/realControl/hisAlarm',component:(resolve) => require(['@/page/realControl_HisAlarm'], resolve)},//设备历史告警
        {path:'/realControl/hisAlarm/detail',component:(resolve) => require(['@/page/realControl_HisAlarm_detail'], resolve)},//设备历史告警
      ]
    },{ //接入管理
      path:'/accessManage',
      component:(resolve) => require(['@/page/accessManage'], resolve),
      redirect:'/accessManage/client',
      children:[
        {path:'/accessManage/client',component:(resolve) => require(['@/page/accessManage_Client'], resolve)},//客户管理
        {path:'/accessManage/client/add',component:(resolve) => require(['@/page/accessManage_Client_Add'], resolve)}, //新增客户信息
        {path:'/accessManage/project',component:(resolve) => require(['@/page/accessManage_Project'], resolve)},//项目管理
        {path:'/accessManage/project/add',component:(resolve) => require(['@/page/accessManage_Project_add'], resolve)},//项目管理新增
        {path:'/accessManage/project/msg',component:(resolve) => require(['@/page/accessManage_Project_msg'], resolve)},//项目管理消息接收组
        {path:'/accessManage/gateway',component:(resolve) => require(['@/page/accessManage_Gateway'], resolve)}, //接入网关
        {path:'/accessManage/gateway/add',component:(resolve) => require(['@/page/accessManage_Gateway_add'], resolve)}, //接入网关
        {path:'/accessManage/gateway/address',component:(resolve) => require(['@/page/accessManage_Gateway_address'], resolve)}, //地点信息
        {path:'/accessManage/device',component:(resolve) => require(['@/page/accessManage_Device'], resolve)},//接入设备
        {path:'/accessManage/device/detail',component:(resolve) => require(['@/page/accessManage_Device_add'], resolve)},//接入设备
        {path:'/accessManage/deviceType',component:(resolve) => require(['@/page/accessManage_DeviceType'], resolve)},//设备类型管理
        
      ]
    },{
      path:'/operationManage', //运维管理
      component:(resolve) => require(['@/page/operationManage'], resolve),
      redirect:'/operationManage/abnormalLog',
      children:[
        {path:'/operationManage/abnormalLog',component:(resolve) => require(['@/page/operationManage_AbnormalLog'], resolve)},//系统异常日志
        {path:'/operationManage/abnormalLog/detail',component:(resolve) => require(['@/page/operationManage_AbnormalLog_detail'], resolve)},//系统异常日志
        {path:'/operationManage/operationLog',component:(resolve) => require(['@/page/operationManage_OperationLog'], resolve)},//系统操作日志
        {path:'/operationManage/operationLog/detail',component:(resolve) => require(['@/page/operationManage_OperationLog_detail'], resolve)},//系统操作日志
        {path:'/operationManage/control',component:(resolve) => require(['@/page/operationManage_Control'], resolve)}, //队列监控
        {path:'/operationManage/informLog',component:(resolve) => require(['@/page/operationManage_InformLog'], resolve)},//通知消息日志
        {path:'/operationManage/informLog/detail',component:(resolve) => require(['@/page/operationManage_InformLog_detail'], resolve)},//通知消息日志
      ]
    },{
      path:'/templateManage',  //模板管理
      component:(resolve) => require(['@/page/templateManage'], resolve),
      redirect:'/templateManage/collection',
      children:[
          {path:'/templateManage/collection',component:(resolve) => require(['@/page/templateManage_Collection'], resolve)},//采集控制模板
          {path:'/templateManage/collection/add',component:(resolve) => require(['@/page/templateManage_collection_add'], resolve)},
          {path:'/templateManage/deviceTypeTemp',component:(resolve) => require(['@/page/templateManage_DeviceTypeTemp'], resolve)},//设备类型模板
          {path:'/templateManage/deviceTypeTemp/add',component:(resolve) => require(['@/page/templateManage_DeviceTypeTemp_add'], resolve)},//设备类型模板增加
          {path:'/templateManage/eventRule',component:(resolve) => require(['@/page/templateManage_EventRule'], resolve)},//事件规则模板
          {path:'/templateManage/eventRule/add',component:(resolve) => require(['@/page/templateManage_EventRule_add'], resolve)},//事件规则增加
          {path:'/templateManage/inform',component:(resolve) => require(['@/page/templateManage_Inform'], resolve)},//消息模板
          {path:'/templateManage/inform/add',component:(resolve) => require(['@/page/templateManage_Inform_add'], resolve)},//消息模板新增
          {path:'/templateManage/eventBase',component:(resolve) => require(['@/page/templateManage_EventBase'], resolve)},//事件库
          {path:'/templateManage/eventBase/add',component:(resolve) => require(['@/page/templateManage_EventBase_add'], resolve)},
      ]
    },{
      path:'/msManage',  //系统管理
      component:(resolve) => require(['@/page/msManage'], resolve),
      redirect:'/msManage/userManage',
      children:[
        {path:'/msManage/userManage',component:(resolve) => require(['@/page/msManage_User'], resolve)},//用户管理
        {path:'/msManage/userManage/add',component:(resolve) => require(['@/page/msManage_user_add'], resolve)},  //新增用户信息
        {path:'/msManage/roleManage',component:(resolve) => require(['@/page/msManage_Role'], resolve) },
        {path:'/msManage/roleManage/add',component:(resolve) => require(['@/page/msManage_role_add'], resolve)},  //新增角色信息
        {path:'/msManage/limitsManage',component:(resolve) => require(['@/page/msManage_Limits'], resolve) },//权限管理
        
        {path:'/msManage/datadicManage',component:(resolve) => require(['@/page/msManage_Datadic'], resolve) },//数据字典管理
        {path:'/msManage/datadicManage/add',component:(resolve) => require(['@/page/msManage_datadic_add'], resolve) },  //数据字典新增
        
      ]
    },
    
 
  ];
  var routerList=[];
  Vue.prototype.$api.post('/comm/getUserRoleMenu', {userId:id}, r => {
      if(r.success){
          var menu=r.data.subMenu;
          console.log(menu);
          for(var i=0;i<menu.length;i++){
            for(var j=0;j<componentList.length;j++){
              if(menu[i].url==componentList[j].path){
                var obj={};
                obj.children=[];
                obj.path=componentList[j].path;
                obj.component=componentList[j].component;
                obj.redirect=menu[i].subMenu[0].url;
                for(var m=0;m<menu[i].subMenu.length;m++){
                  for(var n=0;n<componentList[j].children.length;n++){
                    if(componentList[j].children[n].path.indexOf(menu[i].subMenu[m].url)!=-1){
                      obj.children.push(componentList[j].children[n]);
                    }
                  }
                }
                if(JSON.stringify(routerList).indexOf(JSON.stringify(obj))==-1){
                  routerList.push(obj);
                }
              }
              
            }
          }
          console.log(routerList)
          routerList.push({ path: '*', component: (resolve) => require(['@/page/notFoundComponent'], resolve)  })
          for(var i=0;i<routerList.length;i++){
            router.options.routes.push(routerList[i]);
          }
          router.addRoutes(routerList);

          // for(var i=0;i<menu.length;i++){
          //     for(var j=0;j<componentList.length;j++){
          //         if(menu[i].url==componentList[j].path){
          //             componentList[j].redirect=menu[i].subMenu[0].url;
          //         }
          //     }
          // }
          // for(var i=0;i<componentList.length;i++){
          //   router.options.routes.push(componentList[i]);
          // }
          // router.addRoutes(componentList);
          console.log(router)
      }else{
          if(loginIn=='true'){
            this.$message.warning("菜单获取异常");
          }
          
      }
      
  }); 
}






Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ElSearchTablePagination)
Vue.use(navInfo)
Vue.use(loginInfo)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
