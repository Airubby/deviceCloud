<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">GIS视图</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con" style="position:relative;">
            <div id="container" style="width:100%;height:100%;"></div>
            <div class="gis_left">
                <div class="gis_left_box">
                    <h2>告警统计</h2>
                    <span>{{countPointWarn}}</span>
                </div>
                <div class="gis_left_box">
                    <h2>接入设备</h2>
                    <span>{{countDevAll}}</span>
                </div>
            </div>
            <div class="gis_right">
                <el-input placeholder="请输入内容" v-model="searchInfo" size="small">
                    <el-button slot="append" icon="el-icon-search" @click="getProList"></el-button>
                </el-input>
                <div class="searchbox numScroll0">
                    <div class="searchboxcon numScrollCon0">
                        <div class="searchlist" v-for="item in projectList">
                            <h2><span @click="projectInfo(item.id)">{{item.name}}</span><i class="el-icon-location-outline" @click="addrCenter(item)"></i></h2>
                            <p>单位：{{item.fullName}}</p>
                            <p>位置：<span v-if="item.loca!=null&&item.loca!=''">{{item.loca.fullAddress}}</span></p>
                            <p>接入：
                                <span v-for="(initem,index) in item.devTypeCount">
                                    <em v-if="index==0">{{initem.name}}[{{initem.count}}]</em>
                                    <em v-else-if="index<3">，{{initem.name}}[{{initem.count}}]</em>
                                </span>
                            </p>
                            <p><span class="loncom_color_main" @click="custInfo(item.id)">[单位档案]</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gis_bottom" ref="showalarm">
                <div class="gis_bottom_top">
                    <h2>当前活动告警</h2>
                    <span class="fa fa-eye" ref="eye" @click="showalarm"></span>
                </div>
                <div class="gis_bottom_con numScroll1">
                    <div class="gis_bottom_conbox numScrollCon1">
                        <div class="gis_bottomlist" v-for="item in alarmInfo">
                            <div class="gis_bottomlist_left loncom_fl"><span class="alarm">故障</span></div>
                            <div class="gis_bottomlist_center">
                                <h2>{{item.name}}-[{{new Date(item.createTime).Format('yyyy-MM-dd hh:mm:ss')}}]</h2>
                                <p>{{item.projectName}}项目，{{item.devName}}告警</p>
                            </div>
                            <!--
                            <div class="gis_bottomlist_right loncom_fr">
                                <i class="el-icon-location-outline"></i>
                            </div>
                            -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dialogCustInfo v-bind:dialogInfo="cust_Info" v-if="cust_Info.visible"></dialogCustInfo>
    </div>
</template>


<script>

import dialogCustInfo from '../components/dialogCustInfo.vue'
export default {
    created () {
        //告警数量和接入设备数量
        this.$api.post('/gitMap/warnAndDevCount', {}, r => {
            console.log(r)
            if(r.success){
                this.countDevAll=r.data.countDevAll;
                this.countPointWarn=r.data.countPointWarn;
            }
        }); 

        
        //底部告警信息
        this.$api.post('/gitMap/listPointWarn', {}, r => {
            console.log(r)
            if(r.success){
                this.alarmInfo=r.list;
            }
        }); 




    },
    mounted() {
        var _this=this;
        this.map = new BMap.Map("container");
        this.map.centerAndZoom("成都",6); 
        this.map.enableScrollWheelZoom();

        //获取项目列表
        this.getProList()
        
        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
                _this.getProList()
            }
        }

        numScroll(0)
        numScroll(1)
        
       
    },
    data() {
       return {
            //设备总数
            countDevAll:'',
            //告警总数
            countPointWarn:'',
           //项目信息
           projectList:[],
           map:'',
           searchInfo:'',
           show_alarm:true, //点击底部是否展示显示告警列表
           alarmInfo:[],  //底部告警列表

           cust_Info:{
                title:'客户档案信息',
                visible:false,
                width:'800px',
                projectId:'',
           },

       }
   },
    methods:{
        //获取项目列表，搜索项目列表
        getProList:function(){
            this.$api.post('/gitMap/projectList', {queryKey:this.searchInfo}, r => {
                console.log(r)
                if(r.success){
                    this.projectList=r.list;
                    this.getMap();
                }
            }); 
        },
        //地图项目坐标展示
        getMap:function(){
            this.map.clearOverlays();
            for(var i=0;i<this.projectList.length;i++){
                if(this.projectList[i].loca!=null&&this.projectList[i].loca!=''){
                    var point = new BMap.Point(this.projectList[i].loca.lng, this.projectList[i].loca.latl);
                    var content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop">'+this.projectList[i].name+'</div>' +
                                '<div class="loncom_map_boxcon">'+
                                    '<p>公司：'+this.projectList[i].fullName+'</p>'+
                                    '<p>联系人：'+this.projectList[i].contacts+'</p>'+
                                    '<p>联系电话：'+this.projectList[i].phoneNo+'</p>'+
                                '</div>' +
                            '</div>';
                    var marker = new BMap.Marker(point);
                    this.map.addOverlay(marker);
                    var infoBox = new BMapLib.InfoBox(this.map, content);
                    addClickHandler(marker, infoBox)
                }
            }
            function addClickHandler(marker,infoBox) {
                marker.addEventListener("mouseover", function () {
                    infoBox.open(this)
                })
            }
        },
        //项目列表右边的定位：
        addrCenter:function(item){
            console.log(item)
            if(item.loca!=null&&item.loca!=''){
                if(item.loca.lng!=null&&item.loca.lng!=''){
                    this.map.centerAndZoom(new BMap.Point(item.loca.lng,item.loca.latl),16); 
                }else{
                    this.$message.warning("还没有设置经纬坐标，请到项目管理中设置经纬坐标");
                }
            }else{
                this.$message.warning("还没有设置位置信息，请到项目管理中添加位置信息");
            }
        },
        
        //底部告警信息显示隐藏
       showalarm:function(){
            if(this.show_alarm){
                $(this.$refs.showalarm).css({
                    "bottom":"0px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.eye).addClass("fa-eye-slash");
                this.show_alarm=false;
            }else{
                $(this.$refs.showalarm).css({
                    "bottom":"-300px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.eye).removeClass("fa-eye-slash");
                this.show_alarm=true;
            }
       },
       //单位档案
       custInfo:function(id){
            this.cust_Info.projectId=id;
            this.cust_Info.visible=true;
       },
       //项目详情
       projectInfo:function(id){
           this.$router.push({path:'/realControl/gis/info',query:{projectId:id}});
       }


    },
     watch:{
        map:function(val,oldval){
            this.getMap()
        },
   },
    components:{dialogCustInfo}
}
</script>