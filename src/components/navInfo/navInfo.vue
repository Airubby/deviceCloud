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
                                <em><img src="static/images/morenav.png"></em><span>设备监控</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/realControl/listView">
                                <em><img src="static/images/morenav.png"></em><span>当前告警</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/realControl/hisData">
                                <em><img src="static/images/morenav.png"></em><span>设备历史数据</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/realControl/hisAlarm">
                                <em><img src="static/images/morenav.png"></em><span>告警历史数据</span>
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
                                <em><img src="static/images/morenav.png"></em><span>客户管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/project">
                                <em><img src="static/images/morenav.png"></em><span>项目管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/gateway">
                                <em><img src="static/images/morenav.png"></em><span>接入网关</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/device">
                                <em><img src="static/images/morenav.png"></em><span>接入设备</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/accessManage/deviceType">
                                <em><img src="static/images/morenav.png"></em><span>设备类型管理</span>
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
                                <em><img src="static/images/morenav.png"></em><span>系统异常日志</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/operationManage/operationLog">
                                <em><img src="static/images/morenav.png"></em><span>系统操作日志</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/operationManage/control">
                                <em><img src="static/images/morenav.png"></em><span>队列监控</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/operationManage/informLog">
                                <em><img src="static/images/morenav.png"></em><span>通知消息日志</span>
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
                                <em><img src="static/images/morenav.png"></em><span>采集控制模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/deviceType">
                                <em><img src="static/images/morenav.png"></em><span>设备类型模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/eventRule">
                                <em><img src="static/images/morenav.png"></em><span>事件规则模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/inform">
                                <em><img src="static/images/morenav.png"></em><span>消息模板</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/templateManage/eventBase">
                                <em><img src="static/images/morenav.png"></em><span>事件库</span>
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
                                <em><img src="static/images/morenav.png"></em><span>用户管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/msManage/roleManage">
                                <em><img src="static/images/morenav.png"></em><span>角色管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/msManage/limitsManage">
                                <em><img src="static/images/morenav.png"></em><span>权限管理</span>
                                </router-link>
                            </dd>
                            <dd>
                                <router-link to="/msManage/datadicManage">
                                <em><img src="static/images/morenav.png"></em><span>数据字典管理</span>
                                </router-link>
                            </dd>
                        </dl>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>
export default {
    created () {
        
    },
    mounted() {
        if(JSON.stringify(localStorage.navInfo) == undefined){
            localStorage.navInfo = JSON.stringify({navbtn:'open'});
        }else{
            this.navbtn = JSON.parse(localStorage.navInfo).navbtn;
            this.init();
            this.alink() //初始化要判断用
        }
    },
    
    data() {
       return {
           navbtn:'',
           navList:[
               {url:'/',name:'首页',children:[]},
               {url:'/realControl',name:'实时监控',children:[
                   {url:'/realControl/gis',name:'Gis视图'},
                   {url:'/realControl/listView',name:'列表视图'}
               ]},
               {url:'/msConfig',name:'系统配置',children:[]},
           ]
       }
   },
    methods:{
        init:function(){
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
        },
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
            var _this=this;
            if(this.navbtn=='open'){ //展开的
                $(this.$refs.sidebar_list).find(".loncom_morenav").css({
                    'position':'relative',
                    'left':'15px',
                    'height':'auto',
                    'display':'none',
                    "transition":"all 0.4s ease-in"
                })
                $(this.$refs.sidebar_list).find("li").hover(function(){
                    if($(this).find(".loncom_morenav").length>0){
                        $(this).find(".loncom_morenav").css({
                            'display':'none'
                        })
                    }
                },function(){
                    if($(this).find(".loncom_morenav").length>0){
                        $(this).find(".loncom_morenav").css({
                            'display':'none'
                        })
                    }
                })
                if($(this.$refs.sidebar_list).find(".router-link-active").find(".loncom_morenav").length>0){
                    setTimeout(function(){
                        $(_this.$refs.sidebar_list).find(".router-link-active").find(".loncom_morenav").css({
                            'display':'block',
                            'padding-top':'15px',
                        })
                    },800)
                    $(this.$refs.sidebar_list).find("li").hover(function(){
                        if($(this).find(".loncom_morenav").length>0){
                            $(this).find(".loncom_morenav").css({
                                'display':'block'
                            })
                        }
                    },function(){
                        if($(this).find(".loncom_morenav").length>0){
                            $(this).find(".loncom_morenav").css({
                                'display':'block'
                            })
                        }
                    })
                }
                
                
            }else{
                $(this.$refs.sidebar_list).find(".loncom_morenav").css({
                    'position':'absolute',
                    'left':'58px',
                    'height':'auto',
                    'padding-top':'15px',
                    'background':'#285688',
                    'display':'none',
                })
                $(this.$refs.sidebar_list).find("li").hover(function(){
                    if($(this).find(".loncom_morenav").length>0){
                        $(this).find(".loncom_morenav").css({
                            'display':'block'
                        })
                    }
                },function(){
                    if($(this).find(".loncom_morenav").length>0){
                        $(this).find(".loncom_morenav").css({
                            'display':'none'
                        })
                    }
                })
            }
        },
        //初始化时候的用的
        alink:function(){
            if(this.navbtn=='open'){ //展开的
                $(this.$refs.sidebar_list).find(".loncom_morenav").css({
                    'position':'relative',
                    'left':'15px',
                    'height':'0',
                    'display':'none',
                    'padding-top':'15px',
                    "transition":"all 0.4s ease-in"
                })
                if($(this.$refs.sidebar_list).find(".router-link-active").find(".loncom_morenav").length>0){
                    $(this.$refs.sidebar_list).find(".router-link-active").find(".loncom_morenav").css({
                        'display':'block',
                        'height':'auto',
                    })
                }
            }else{
                $(this.$refs.sidebar_list).find(".loncom_morenav").css({
                    'position':'absolute',
                    'left':'58px',
                    'height':'auto',
                    'padding-top':'15px',
                    'background':'#285688',
                    'display':'none',
                    "transition":"all 0.4s ease-in"
                })
                $(this.$refs.sidebar_list).find("li").hover(function(){
                    if($(this).find(".loncom_morenav").length>0){
                        $(this).find(".loncom_morenav").css({
                            'display':'block'
                        })
                    }
                },function(){
                    if($(this).find(".loncom_morenav").length>0){
                        $(this).find(".loncom_morenav").css({
                            'display':'none'
                        })
                    }
                })
            }
            
        },
    },
    components:{}
}
</script>

