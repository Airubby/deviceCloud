<template>
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
                <!--
                <li>
                    <router-link to="/" exact>
                        <div class="loncom_nav">
                            <em><img src="static/images/home.svg"></em><span class="loncm_menu">首页</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/realControl">
                        <div class="loncom_nav">
                            <em><img src="static/images/realControl.svg"></em><span class="loncm_menu">实时监控</span>
                        </div>
                        <dl class="loncom_morenav">
                            <dd>
                                <router-link to="/realControl/gis">
                                <em><img src="static/images/morenav.svg"></em><span>设备监控</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/realControl/listView">
                                <em><img src="static/images/morenav.svg"></em><span>当前告警</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/realControl/hisData">
                                <em><img src="static/images/morenav.svg"></em><span>设备历史数据</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/realControl/hisAlarm">
                                <em><img src="static/images/morenav.svg"></em><span>告警历史数据</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
                <li>
                    <router-link to="/accessManage">
                        <div class="loncom_nav">
                            <em><img src="static/images/realControl.svg"></em><span class="loncm_menu">接入管理</span>
                        </div>
                        <dl class="loncom_morenav">
                            <dd>
                                <router-link to="/accessManage/client">
                                <em><img src="static/images/morenav.svg"></em><span>客户管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/project">
                                <em><img src="static/images/morenav.svg"></em><span>项目管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/gateway">
                                <em><img src="static/images/morenav.svg"></em><span>接入网关</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/device">
                                <em><img src="static/images/morenav.svg"></em><span>接入设备</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/deviceType">
                                <em><img src="static/images/morenav.svg"></em><span>设备类型管理</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
                <li>
                    <router-link to="/operationManage">
                        <div class="loncom_nav">
                            <em><img src="static/images/realControl.svg"></em><span class="loncm_menu">运维管理</span>
                        </div>
                        <dl class="loncom_morenav">
                            <dd>
                                <router-link to="/operationManage/abnormalLog">
                                <em><img src="static/images/morenav.svg"></em><span>系统异常日志</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/operationManage/operationLog">
                                <em><img src="static/images/morenav.svg"></em><span>系统操作日志</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/operationManage/control">
                                <em><img src="static/images/morenav.svg"></em><span>队列监控</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/operationManage/informLog">
                                <em><img src="static/images/morenav.svg"></em><span>通知消息日志</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
                <li>
                    <router-link to="/templateManage">
                        <div class="loncom_nav">
                            <em><img src="static/images/realControl.svg"></em><span class="loncm_menu">模板管理</span>
                        </div>
                        <dl class="loncom_morenav">
                            <dd>
                                <router-link to="/templateManage/collection">
                                <em><img src="static/images/morenav.svg"></em><span>采集控制模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/deviceTypeTemp">
                                <em><img src="static/images/morenav.svg"></em><span>设备类型模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/eventRule">
                                <em><img src="static/images/morenav.svg"></em><span>事件规则模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/inform">
                                <em><img src="static/images/morenav.svg"></em><span>消息模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/eventBase">
                                <em><img src="static/images/morenav.svg"></em><span>事件库</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
                <li>
                    <router-link to="/msManage">
                        <div class="loncom_nav">
                            <em><img src="static/images/realControl.svg"></em><span class="loncm_menu">系统管理</span>
                        </div>
                        <dl class="loncom_morenav">
                            <dd>
                                <router-link to="/msManage/userManage">
                                <em><img src="static/images/morenav.svg"></em><span>用户管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/msManage/roleManage">
                                <em><img src="static/images/morenav.svg"></em><span>角色管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/msManage/limitsManage">
                                <em><img src="static/images/morenav.svg"></em><span>权限管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/msManage/datadicManage">
                                <em><img src="static/images/morenav.svg"></em><span>数据字典管理</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
                -->
            </ul>
        </div>
    </div>
    
</template>

<script>
export default {
    created () {
        var loginInfo=localStorage.loginInfo?JSON.parse(localStorage.loginInfo):{};
        if(JSON.stringify(loginInfo) == "{}"){
            this.$message.warning("请登录系统");
            this.$router.push({path:'/login'});
            return;
        }
        var loginInfo={};
        if(localStorage.loginInfo){
            loginInfo=JSON.parse(localStorage.loginInfo);
        }
        this.$api.post('/comm/getUserRoleMenu', {userId:loginInfo.id}, r => {
            console.log(r)
            if(r.code=='-1'){
                this.$message.warning("请登录系统");
                this.$router.push({path:'/login'});
            }else{
                if(r.success){
                    this.navList=r.data.subMenu;
                }else{
                    this.$message.warning("菜单获取异常");
                }
            }
            
        }); 

    },
    mounted() {
        if(JSON.stringify(localStorage.navInfo) == undefined){
                localStorage.navInfo = JSON.stringify({navbtn:'open'});
            }else{
                this.navbtn = JSON.parse(localStorage.navInfo).navbtn;
            }
    },
    
    data() {
       return {
           navbtn:'open',
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
        
        //初始化
        init:function(){
            console.log(1321)
            var _this=this;
            if(!(this.$route.path=="/index")){  //清除定时器
                clearInterval(index_getacc);
                clearInterval(index_getal);
            }
            
            if(this.navbtn==='open'){
                $(this.$refs.sidebar).css({
                    "width":"160px",
                });
                $(this.$parent.$refs.content).css({
                    "padding-left":"160px",
                });
                //logo操作
                $(this.$refs.sidebar).find(".loncom_logo").show();
                $(this.$refs.sidebar).find(".loncom_logosmall").hide();
            }else{
                $(this.$refs.sidebar).css({
                    "width":"60px",
                });
                $(this.$parent.$refs.content).css({
                    "padding-left":"60px",
                });
                //logo操作
                $(this.$refs.sidebar).find(".loncom_logo").hide();
                $(this.$refs.sidebar).find(".loncom_logosmall").show();
            }

            $(this.$refs.sidebar_list).find("a").on("click",function(){
                //点击刷新
                _this.$parent.reload()
            })
            

        },
        //展开收缩
        navclick:function(){
            var navInfo = JSON.parse(localStorage.navInfo);
            var _this=this;
            if(this.navbtn=='open'){
                $(this.$refs.sidebar).css({
                    "width":"60px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$parent.$refs.content).css({
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
                    $(_this.$parent.$refs.content).css({
                        "padding-left":"160px",
                        "transition":"all 0.4s ease-in"
                    });
                },400)
                this.navbtn='open';
                navInfo.navbtn='open';
            }
            this.navlink();
            localStorage.navInfo = JSON.stringify(navInfo);
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
                        })
                    setTimeout(function(){
                        $(_this.$refs.sidebar_list).find(".alink.router-link-active").find(".loncom_morenav").css({
                            'display':'block',
                            "transition":"all 0.4s ease-in"
                        })
                    },300)
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
            this.$nextTick(function(){
                this.init();
                this.alink();
            })
        },
        '$route' (to, from) {
            console.log('数据更新操作')
        },
   },
    components:{}
}
</script>

