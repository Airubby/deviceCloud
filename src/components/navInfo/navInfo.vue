<template>
    <div class="loncom_sidebar" ref="sidebar">
        <div class="loncom_sidebar_top">
            <span class="loncom_fl">iSmartSite</span>
            <span class="loncom_fr loncom_navbtn" @click="navclick" ref="navbtn"><i class="fa fa-navicon"></i></span>
        </div>
        <div class="loncom_sidebar_list">
            <ul>
                <li>
                    <router-link to="/" exact>
                        <div>
                            <em></em>
                            <span>首页</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/realControl">
                        <div>
                            <em></em>
                            <span>实时监控</span>
                        </div>
                        <dl>
                            <dd><router-link to="/realControl/gis">Gis视图</router-link></dd>
                            <dd><router-link to="/realControl/listView">列表视图</router-link></dd>
                        </dl>
                    </router-link>
                </li>
                <li>
                    <router-link to="/msConfig">
                        <em></em>
                        <span>系统配置</span>
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
        console.log(this.$parent.$refs.content)
        
    },
    data() {
       return {
           navbtn:'open',
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
       navclick(){
            if(this.navbtn=='open'){
                $(this.$refs.sidebar).css({
                    "left":"-200px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$parent.$refs.content).css({
                    "padding-left":"0",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.navbtn).css({
                    "right":"-33px",
                    "color":"#17C4BB"
                })
                this.navbtn='close';
            }else{
                $(this.$refs.sidebar).css({
                    "left":"0px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$parent.$refs.content).css({
                    "padding-left":"200px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.navbtn).css({
                    "right":"0",
                    "color":"#fff"
                })
                this.navbtn='open';
            }
             
        }
    },
    components:{}
}
</script>

