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
import store from './store'
import 'babel-polyfill'  //兼容低版本浏览器

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.prototype.getComponent = function (id){
  var componentList=[   
    {
      path:'/realControl',  //监控管理
      component:(resolve) => require(['@/page/realControl'], resolve),
      redirect:'/realControl/gis',
      children:[
        {path:'/realControl/gis',meta:{keepAlive:false},component:(resolve) => require(['@/page/realControl_GIS'], resolve)}, //设备监控
        {path:'/realControl/gis/info',meta:{keepAlive:false},component:(resolve) => require(['@/page/realControl_GIS_info'], resolve)}, //设备监控
        // {path:'/realControl/listView',meta:{keepAlive:false},component:(resolve) => require(['@/page/realControl_ListView'], resolve)},
        {path:'/realControl/hisData',meta:{keepAlive:true},component:(resolve) => require(['@/page/realControl_HisData'], resolve)},//设备历史数据
        {path:'/realControl/hisData/detail',meta:{keepAlive:false},component:(resolve) => require(['@/page/realControl_HisData_detail'], resolve)},//设备历史数据
        {path:'/realControl/hisAlarm',meta:{keepAlive:true},component:(resolve) => require(['@/page/realControl_HisAlarm'], resolve)},//设备历史告警
        {path:'/realControl/hisAlarm/detail',meta:{keepAlive:false},component:(resolve) => require(['@/page/realControl_HisAlarm_detail'], resolve)},//设备历史告警
      ]
    },{ //接入管理
      path:'/accessManage',
      component:(resolve) => require(['@/page/accessManage'], resolve),
      redirect:'/accessManage/client',
      children:[
        {path:'/accessManage/client',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Client'], resolve)},//客户管理
        {path:'/accessManage/client/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Client_Add'], resolve)}, //新增客户信息
        {path:'/accessManage/project',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Project'], resolve)},//项目管理
        {path:'/accessManage/project/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Project_add'], resolve)},//项目管理新增
        {path:'/accessManage/project/msg',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Project_msg'], resolve)},//项目管理消息接收组
        {path:'/accessManage/gateway',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Gateway'], resolve)}, //接入网关
        {path:'/accessManage/gateway/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Gateway_add'], resolve)}, //接入网关
        {path:'/accessManage/gateway/address',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Gateway_address'], resolve)}, //地点信息
        {path:'/accessManage/device',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Device'], resolve)},//接入设备
        {path:'/accessManage/device/detail',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_Device_add'], resolve)},//接入设备
        {path:'/accessManage/deviceType',meta:{keepAlive:false},component:(resolve) => require(['@/page/accessManage_DeviceType'], resolve)},//设备类型管理
        
      ]
    },{
      path:'/operationManage', //运维管理
      component:(resolve) => require(['@/page/operationManage'], resolve),
      redirect:'/operationManage/abnormalLog',
      children:[
        {path:'/operationManage/abnormalLog',meta:{keepAlive:true},component:(resolve) => require(['@/page/operationManage_AbnormalLog'], resolve)},//系统异常日志
        {path:'/operationManage/abnormalLog/detail',meta:{keepAlive:false},component:(resolve) => require(['@/page/operationManage_AbnormalLog_detail'], resolve)},//系统异常日志
        {path:'/operationManage/operationLog',meta:{keepAlive:true},component:(resolve) => require(['@/page/operationManage_OperationLog'], resolve)},//系统操作日志
        {path:'/operationManage/operationLog/detail',meta:{keepAlive:false},component:(resolve) => require(['@/page/operationManage_OperationLog_detail'], resolve)},//系统操作日志
        // {path:'/operationManage/control',meta:{keepAlive:false},component:(resolve) => require(['@/page/operationManage_Control'], resolve)}, //队列监控
        {path:'/operationManage/informLog',meta:{keepAlive:true},component:(resolve) => require(['@/page/operationManage_InformLog'], resolve)},//通知消息日志
        {path:'/operationManage/informLog/detail',meta:{keepAlive:false},component:(resolve) => require(['@/page/operationManage_InformLog_detail'], resolve)},//通知消息日志
      ]
    },{
      path:'/templateManage',  //模板管理
      component:(resolve) => require(['@/page/templateManage'], resolve),
      redirect:'/templateManage/collection',
      children:[
          {path:'/templateManage/collection',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_Collection'], resolve)},//采集控制模板
          {path:'/templateManage/collection/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_collection_add'], resolve)},
          {path:'/templateManage/deviceTypeTemp',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_DeviceTypeTemp'], resolve)},//设备类型模板
          {path:'/templateManage/deviceTypeTemp/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_DeviceTypeTemp_add'], resolve)},//设备类型模板增加
          {path:'/templateManage/eventRule',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_EventRule'], resolve)},//事件规则模板
          {path:'/templateManage/eventRule/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_EventRule_add'], resolve)},//事件规则增加
          {path:'/templateManage/inform',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_Inform'], resolve)},//消息模板
          {path:'/templateManage/inform/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_Inform_add'], resolve)},//消息模板新增
          {path:'/templateManage/eventBase',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_EventBase'], resolve)},//事件库
          {path:'/templateManage/eventBase/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/templateManage_EventBase_add'], resolve)},
      ]
    },{
      path:'/msManage',  //系统管理
      component:(resolve) => require(['@/page/msManage'], resolve),
      redirect:'/msManage/userManage',
      children:[
        {path:'/msManage/userManage',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_User'], resolve)},//用户管理
        {path:'/msManage/userManage/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_user_add'], resolve)},  //新增用户信息
        {path:'/msManage/roleManage',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_Role'], resolve) },
        {path:'/msManage/roleManage/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_role_add'], resolve)},  //新增角色信息
        {path:'/msManage/limitsManage',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_Limits'], resolve) },//权限管理
        {path:'/msManage/datadicManage',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_Datadic'], resolve) },//数据字典管理
        {path:'/msManage/datadicManage/add',meta:{keepAlive:false},component:(resolve) => require(['@/page/msManage_datadic_add'], resolve) },  //数据字典新增
        
      ]
    },
    
 
  ];
  var routerList=[];
  Vue.prototype.$api.post('/comm/getUserRoleMenu', {userId:id}, r => {
      if(r.success){
          var menu=r.data.subMenu;
          Vue.prototype.getFunc(menu)
          store.commit('resetNavList',menu)
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
          routerList.push({ path: '*', component: (resolve) => require(['@/page/notFoundComponent'], resolve)  })
          for(var i=0;i<routerList.length;i++){
            router.options.routes.push(routerList[i]);
          }
          router.addRoutes(routerList);
      }else{
          if(sessionStorage.loginInfo){
              ElementUI.Message.warning("菜单获取异常");
          }
          
      }
      
  }); 
}

Vue.prototype.getFunc=function(menu){
  store.commit('resetModel',{})
  for(var i=0;i<menu.length;i++){
    for(var j=0;j<menu[i].subMenu.length;j++){
      for(var k=0;k<menu[i].subMenu[j].subMenu.length;k++){
        var arr=(menu[i].subMenu[j].subMenu[k].code).split("/");
        var key=arr[arr.length-1]
        store.commit('setModel',[menu[i].code,key])
      }
    }
  }
}

Vue.prototype.resultInfo=function(response){
  if(response.code=="-1"){
        ElementUI.Message.warning("请登录系统");
        router.push({path:'/login'});
    }
    if(response.code=="-2"){
        ElementUI.Message.warning(res.data.msg);
    }
    if(response.code=="-9"){
        ElementUI.Message.warning(res.data.msg);
    }
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
  store,
  components: { App },
  template: '<App/>'
})
