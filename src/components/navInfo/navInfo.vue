<template>
<div class="loncom_content">
    <div class="loncom_sidebar" ref="sidebar">
        <div class="loncom_sidebar_top">
            <div class="loncom_fl">
                <router-link to="/" class="loncom_logo"><img src="static/images/logo.svg"></router-link>
                <router-link to="/" class="loncom_logosmall"><img src="static/images/logo_small.svg"></router-link>
            </div>
            <span class="loncom_fr loncom_navbtn" @click="navclick" ref="navbtn">
                <img src="static/images/top_change.svg">
            </span>
        </div>
        <div class="loncom_sidebar_list" ref="sidebar_list">
            <ul>
                <li>
                    <router-link to="/index" exact>
                        <div class="loncom_nav">
                            <em><img src="static/images/home.svg"></em><span class="loncm_menu">首页</span>
                        </div>
                    </router-link>
                </li>
                <li v-for="item in navList" v-if="navList.length>0">
                    <router-link :to="item.url" class="alink">
                        <div class="loncom_nav">
                            <em><img :src="item.icon"></em><span class="loncm_menu">{{item.name}}</span>
                        </div>
                        <dl class="loncom_morenav">
                            <dd v-for="initem in item.subMenu">
                                <router-link :to="initem.url">
                                <em><img :src="initem.icon"></em><span>{{initem.name}}</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="loncom_sidebar_right" ref="content">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</div>
</template>

<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
export default {
    created () {
    },
    mounted() {
        this.loginInfo=sessionStorage.loginInfo?JSON.parse(sessionStorage.loginInfo):{};
        if(JSON.stringify(this.loginInfo) == "{}"){
            this.$message.warning("请登录系统");
            this.$router.push({path:'/login'});
            return;
        }else{
            this.init();  //先设置宽度
        }
        
    },
    
    data() {
       return {
           loginInfo:{},
           navbtn:'open',
           isRouterAlive:true,  //默认view-router显示的，点击刷新用
           navList:[
            //    {url:'/',name:'首页',icon:'',subMenu:[]},
            //    {url:'/realControl',name:'实时监控',icon:'static/images/realControl.svg',subMenu:[
            //        {url:'/realControl/gis',name:'设备监控',icon:'static/images/morenav.svg'},
            //        {url:'/realControl/hisData',name:'设备历史数据',icon:'static/images/morenav.svg'},
            //        {url:'/realControl/hisAlarm',name:'告警历史数据',icon:'static/images/morenav.svg'},
            //    ]},
            //    {url:'/accessManage',name:'接入管理',icon:'static/images/access.svg',subMenu:[
            //         {url:'/accessManage/client',name:'客户管理',icon:'static/images/morenav.svg'},
            //         {url:'/accessManage/project',name:'项目管理',icon:'static/images/morenav.svg'},
            //         {url:'/accessManage/gateway',name:'接入网关',icon:'static/images/morenav.svg'},
            //         {url:'/accessManage/device',name:'接入设备',icon:'static/images/morenav.svg'},
            //         {url:'/accessManage/deviceType',name:'设备类型管理',icon:'static/images/morenav.svg'},
            //    ]},
            //    {url:'/operationManage',name:'运维管理',icon:'static/images/operation.svg',subMenu:[
            //         {url:'/operationManage/abnormalLog',name:'系统异常日志',icon:'static/images/morenav.svg'},
            //         {url:'/operationManage/operationLog',name:'系统操作日志',icon:'static/images/morenav.svg'},
            //         {url:'/operationManage/informLog',name:'通知消息日志',icon:'static/images/morenav.svg'},
            //    ]},
            //    {url:'/templateManage',name:'模板管理',icon:'static/images/template.svg',subMenu:[
            //         {url:'/templateManage/collection',name:'采集控制模板',icon:'static/images/morenav.svg'},
            //         {url:'/templateManage/deviceTypeTemp',name:'设备类型模板',icon:'static/images/morenav.svg'},
            //         {url:'/templateManage/eventRule',name:'事件规则模板',icon:'static/images/morenav.svg'},
            //         {url:'/templateManage/inform',name:'消息模板',icon:'static/images/morenav.svg'},
            //         {url:'/templateManage/eventBase',name:'事件库',icon:'static/images/morenav.svg'},
            //    ]},
            //    {url:'/msManage',name:'系统管理',icon:'static/images/sys.svg',subMenu:[
            //        {url:'/msManage/userManage',name:'用户管理',icon:'static/images/morenav.svg'},
            //        {url:'/msManage/roleManage',name:'角色管理',icon:'static/images/morenav.svg'},
            //        {url:'/msManage/limitsManage',name:'权限管理',icon:'static/images/morenav.svg'},
            //        {url:'/msManage/datadicManage',name:'数据字典管理',icon:'static/images/morenav.svg'},
            //    ]},
           ]
       }
   },
    methods:{
        getMenu:function(){
            // console.log(this.loginInfo)
            // this.getComponent(this.loginInfo.id)
            // console.log(123)
            this.$api.post('/comm/getUserRoleMenu', {userId:this.loginInfo.id}, r => {
                if(r.success){
                        this.navList=r.data.subMenu;
                        // var urlStr=this.$route.path;
                        // var urlHas=true;
                        // for(var i=0;i<this.navList.length;i++){
                        //     // if(this.navList[i].subMenu.length>0){
                        //     //     for(var j=0;j<this.navList[i].subMenu.length;j++){
                        //     //         if(this.navList[i].subMenu[j].url==urlStr){
                        //     //             urlHas=true;
                        //     //             break;
                        //     //         }
                        //     //     }
                        //     // }else{
                        //     //     if(this.navList[i].url==urlStr){
                        //     //         urlHas=true;
                        //     //         break;
                        //     //     }
                        //     // }
                            
                        // }
                        // if(urlStr=='/index'){
                        //     urlHas=true;
                        // }
                        // if(!urlHas){
                        //     this.$router.push({path:'/notFoundComponent'});
                        // }
                    }else{
                        this.$message.warning("菜单获取异常");
                    }
                
            }); 
        },
        //点击刷新
        reload:function() {
            //清除定时器
            if(this.$route.path=="/index"){
                clearInterval(index_getacc);
                clearInterval(index_getal);
            }
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },   
        //初始化
        init:function(){
            var _this=this;
            if(!(this.$route.path=="/index")){  
                clearInterval(index_getacc);
                clearInterval(index_getal);
            }
            if(JSON.stringify(sessionStorage.navInfo) == undefined){
                sessionStorage.navInfo = JSON.stringify({navbtn:'open'});
            }else{
                this.navbtn = JSON.parse(sessionStorage.navInfo).navbtn;
            }
            if(this.navbtn==='open'){
                $(this.$refs.sidebar).css({
                    "width":"160px",
                });
                $(this.$refs.content).css({
                    "padding-left":"160px",
                });
                //logo操作
                $(this.$refs.sidebar).find(".loncom_logo").show();
                $(this.$refs.sidebar).find(".loncom_logosmall").hide();
            }else{
                $(this.$refs.sidebar).css({
                    "width":"60px",
                });
                $(this.$refs.content).css({
                    "padding-left":"60px",
                });
                //logo操作
                $(this.$refs.sidebar).find(".loncom_logo").hide();
                $(this.$refs.sidebar).find(".loncom_logosmall").show();
            }
            this.getMenu();

        },
        //展开收缩
        navclick:function(){
            var navInfo = JSON.parse(sessionStorage.navInfo);
            var _this=this;
            if(this.navbtn=='open'){
                $(this.$refs.sidebar).css({
                    "width":"60px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.content).css({
                    "padding-left":"60px",
                    "transition":"all 0.4s ease-in"
                });
                //logo操作
                setTimeout(function(){
                    $(_this.$refs.sidebar).find(".loncom_logo").hide(300);
                    $(_this.$refs.sidebar).find(".loncom_logosmall").show(400);
                },400)
                this.navbtn='close';
                navInfo.navbtn='close';
            }else{
                $(this.$refs.sidebar).find(".loncom_logosmall").hide(300);
                $(this.$refs.sidebar).find(".loncom_logo").show(400);
                setTimeout(function(){
                    $(_this.$refs.sidebar).css({
                        "width":"160px",
                        "transition":"all 0.4s ease-in"
                    });
                    $(_this.$refs.content).css({
                        "padding-left":"160px",
                        "transition":"all 0.4s ease-in"
                    });
                },400)
                this.navbtn='open';
                navInfo.navbtn='open';
            }
            this.navlink();
            sessionStorage.navInfo = JSON.stringify(navInfo);
        },

        //切换大小导航后用的
        navlink:function(){
            console.log(this.navbtn)
            var _this=this;
            if(this.navbtn=='open'){ //展开的
                if($(this.$refs.sidebar_list).find(".alink.router-link-active").find(".loncom_morenav").length>0){
                    setTimeout(function(){
                        $(_this.$refs.sidebar_list).find(".alink.router-link-active").find(".loncom_morenav").css({
                            'position':'relative',
                            'left':'15px',
                            'display':'block',
                            'padding-top':'10px',
                            'padding-bottom':'10px',
                            "transition":"all 0.6s ease-in"
                        })
                    },800)
                }
            }else{
                $(this.$refs.sidebar_list).find(".loncom_morenav").css({
                    'position':'absolute',
                    'left':'58px',
                    'padding-top':'10px',
                    'padding-bottom':'10px',
                    'display':'none',
                    "transition":"all 0.4s ease-in"
                })
            }
            $(this.$refs.sidebar_list).find("li").hover(function(){
                if(_this.navbtn=='open'){
                     $(this).find(".loncom_morenav").css({'display':'none'})
                    $(_this.$refs.sidebar_list).find('.alink.router-link-active').find(".loncom_morenav").css({'display':'block'})
                }else{
                    $(this).find(".loncom_morenav").css({'display':'block'})
                }
            },function(){
                $(this).find(".loncom_morenav").css({'display':'none'})
                if(_this.navbtn=='open'){
                    $(_this.$refs.sidebar_list).find('.alink.router-link-active').find(".loncom_morenav").css({'display':'block'})
                }
            })
        },
        //初始化时候的用的
        alink:function(){
            var _this=this;
            if(this.navbtn=='open'){ //展开的
                if($(this.$refs.sidebar_list).find(".alink.router-link-active").find(".loncom_morenav").length>0){
                    $(_this.$refs.sidebar_list).find(".alink.router-link-active").find(".loncom_morenav").css({
                        'position':'relative',
                        'left':'15px',
                        'padding-top':'10px',
                        'padding-bottom':'10px',
                        'display':'block',
                        "transition":"all 0.4s ease-in"
                    })
                }
            }else{
                $(this.$refs.sidebar_list).find(".loncom_morenav").css({
                    'position':'absolute',
                    'left':'58px',
                    'padding-top':'10px',
                    'padding-bottom':'10px',
                    'display':'none',
                    "transition":"all 0.4s ease-in"
                })
                $(this.$refs.sidebar_list).find("li").hover(function(){
                    $(this).find(".loncom_morenav").css({'display':'block'})
                },function(){
                    $(this).find(".loncom_morenav").css({'display':'none'})
                })
            }
            
            
        },
    },
    watch:{
        navList:function(val,oldval){
            var _this=this;
            this.$nextTick(function(){
                $(this.$refs.sidebar_list).find("dd a").on("click",function(){
                    //点击刷新
                    _this.reload()
                })
                this.alink();
            })
        },
   },
    components:{CollapseTransition}
}
</script>

