<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">GIS视图</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right" style="position:relative;">
            <div id="container" style="width:100%;height:100%;"></div>
            <div class="gis_left">
                <div class="gis_left_box" @dblclick="runChild">
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
                            <h2><span @click="projectInfo(item.id)" class="loncom_color">{{item.name}}</span><i class="el-icon-location-outline" @click="addrCenter(item)"></i></h2>
                            <p>单位：{{item.fullName}}</p>
                            <p>项目位置：<span v-if="item.loca!=null&&item.loca!=''">{{item.loca.fullAddress}}</span></p>
                            <p>设备数量：<span class="loncom_mr20">{{item.devNum}}</span>告警数量：<span>{{item.alarmNum}}</span></p>
                            <p>接入设备类型：
                                <span v-for="(initem,index) in item.devTypeCount">
                                    <em v-if="index==0">{{initem.name}}[<i class="loncom_color_main">{{initem.count}}</i>]</em>
                                    <em v-else-if="index<3">，{{initem.name}}[<i class="loncom_color_main">{{initem.count}}</i>]</em>
                                </span>
                            </p>
                            <p>[<span class="loncom_color dangan" @click="custInfo(item.id)">客户档案</span>]</p>
                        </div>
                    </div>
                </div>
            </div>
            <gisBottomAlarm ref="runChildFun"></gisBottomAlarm>
        </div>
        <dialogCustInfo v-bind:dialogInfo="cust_Info" v-if="cust_Info.visible"></dialogCustInfo>
    </div>
</template>


<script>
import gisBottomAlarm from '../components/gisBottomAlarm.vue'
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
            //获取项目列表
            this.getProList()
        }); 

    },
    mounted() {
        var _this=this;
        this.map = new BMap.Map("container");
        this.map.centerAndZoom("成都",5); 
        this.map.enableScrollWheelZoom();

    
        
        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
                _this.getProList()
            }
        }
        numScroll(0)
        
       
    },
    data() {
       return {
            //设备总数
            countDevAll:'--',
            //告警总数
            countPointWarn:'--',
           //项目信息
           projectList:[],
           map:'',
           searchInfo:'',
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
            // <router-link :to="/realControl/gis/info"></router-link>

            this.map.clearOverlays();
            for(var i=0;i<this.projectList.length;i++){
                if(this.projectList[i].loca!=null&&this.projectList[i].loca!=''){
                    var iconurl='./static/images/index_normal.svg';
                    var router='<a href="#/realControl/gis/info?projectId='+this.projectList[i].id+'">'+this.projectList[i].name+'</a>'
                    var content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop">'+router+'</div>' +
                                '<div class="loncom_map_boxcon">'+
                                    '<p>公司：'+this.projectList[i].fullName+'</p>'+
                                    '<p>联系人：'+this.projectList[i].contacts+'</p>'+
                                    '<p>联系电话：'+this.projectList[i].phoneNo+'</p>'+
                                    '<p>告警数量：'+this.projectList[i].alarmNum+'</p>'+
                                '</div>' +
                            '</div>';
                    if(this.projectList[i].alarmNum>0){
                        iconurl='./static/images/index_warning.svg'
                        content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop loncom_map_boxtopalarm">'+router+'</div>' +
                                '<div class="loncom_map_boxcon">'+
                                    '<p>公司：'+this.projectList[i].fullName+'</p>'+
                                    '<p>联系人：'+this.projectList[i].contacts+'</p>'+
                                    '<p>联系电话：'+this.projectList[i].phoneNo+'</p>'+
                                    '<p>告警数量：'+this.projectList[i].alarmNum+'</p>'+
                                '</div>' +
                            '</div>';
                    }
                    var icon = new BMap.Icon(iconurl, new BMap.Size(14, 20));
                    var point = new BMap.Point(this.projectList[i].loca.lng, this.projectList[i].loca.latl);
                    var marker = new BMap.Marker(point,{icon:icon});
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
    
       //单位档案
       custInfo:function(id){
            this.cust_Info.projectId=id;
            this.cust_Info.visible=true;
       },
       //项目详情
       projectInfo:function(id){
           this.$router.push({path:'/realControl/gis/info',query:{projectId:id}});
       },
       //点击弹出告警列表
       runChild:function(){this.$refs.runChildFun.showalarm()},


    },
     watch:{
        map:function(val,oldval){
            this.getMap();
        },
        
   },
    components:{dialogCustInfo,gisBottomAlarm}
}
</script>