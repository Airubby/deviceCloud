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
                    <el-button slot="append" icon="el-icon-search" @click="getDevList"></el-button>
                </el-input>
                <div class="searchbox numScroll0">
                    <div class="searchboxcon numScrollCon0">
                        <div class="searchlist" v-for="item in devList">
                            <h2><span @click="pointInfo(item)" class="loncom_color">{{item.name}}</span><i class="el-icon-location-outline" @click="addrCenter(item)"></i></h2>
                            <p>设备编码：{{item.code}}</p>
                            <p>启用状态：<span v-if="item.state==1">启用</span><span v-else>停用</span></p>
                            <p>在线状态：<span v-if="item.online==true" style="color:#33C466">在线</span><span style="color:#E9664B" v-else>离线</span></p>
                            <p>告警数量：<span>{{item.alarmNum}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <gisBottomAlarm v-bind:info="obj" v-if="obj.projectId" ref="runChildFun"></gisBottomAlarm>
        </div>
        <dialogPointInfo v-bind:dialogInfo="point_Info" v-if="point_Info.visible"></dialogPointInfo>
    </div>
</template>


<script>
import gisBottomAlarm from '../components/gisBottomAlarm.vue'
import dialogPointInfo from '../components/dialogGisPointInfo.vue'
export default {
    created () {
        this.obj = this.$route.query;
        if(JSON.stringify(this.obj) != "{}"){
            //告警数量和接入设备数量
            this.$api.post('/gitMap/warnAndDevCount', {projectId:this.obj.projectId}, r => {
                console.log(r)
                if(r.success){
                    this.countDevAll=r.data.countDevAll;
                    this.countPointWarn=r.data.countPointWarn;
                }
                //设备列表
                this.getDevList();
            }); 
        }

    },
    mounted() {
        
        numScroll(0)
        //地图信息
        this.map = new BMap.Map("container");
        this.map.centerAndZoom("成都",6); 
        this.map.enableScrollWheelZoom();

        var _this=this;
        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
                _this.getDevList()
            }
        }
        

    },
    data() {
       return {
            //设备总数
            countDevAll:'--',
            //告警总数
            countPointWarn:'--',
            //设备列表
           devList:[],
           devList:[],
           obj:'',   //接收传递的参数id对象
           
           searchInfo:'',
           map:'',
        
           //d设备测点信息
           point_Info:{
                title:'设备测点信息',
                visible:false,
                width:'1100px',
                devId:'',
                name:'',
           },

       }
   },
    methods:{
        
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
       
        //点击设备查看测点信息
        pointInfo:function(item){
            this.point_Info.devId=item.id;
            this.point_Info.name=item.name;
            this.point_Info.visible=true;
        },
        //设备列表
        getDevList:function(){
            this.$api.post('/gitMap/devList', {projectId:this.obj.projectId,queryKey:this.searchInfo}, r => {
                console.log(r)
                if(r.success){
                    this.devList=r.list;
                    this.getMap();
                }
            }); 
        },
        //地图设备坐标展示
        getMap:function(){
            this.map.clearOverlays();
            for(var i=0;i<this.devList.length;i++){
                if(this.devList[i].loca!=null&&this.devList[i].loca!=''){
                    var iconurl='./static/images/index_normal.svg';
                    var content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop">'+this.devList[i].name+'</div>' +
                                '<div class="loncom_map_boxcon">'+
                                    '<p>设备编码：'+this.devList[i].code+'</p>'+
                                    '<p>启用状态：<span v-if="'+this.devList[i].state+'==1">启用</span><span v-else>停用</span></p>'+
                                    '<p>告警数量：'+this.devList[i].alarmNum+'</p>'+
                                '</div>' +
                            '</div>';
                    if(this.devList[i].alarmNum>0){
                        iconurl='./static/images/index_warning.svg'
                        var content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop loncom_map_boxtopalarm">'+this.devList[i].name+'</div>' +
                                '<div class="loncom_map_boxcon">'+
                                    '<p>设备编码：'+this.devList[i].code+'</p>'+
                                    '<p>启用状态：<span v-if="'+this.devList[i].state+'==1">启用</span><span v-else>停用</span></p>'+
                                    '<p>告警数量：'+this.devList[i].alarmNum+'</p>'+
                                '</div>' +
                            '</div>';
                    }
                    var icon = new BMap.Icon(iconurl, new BMap.Size(14, 20));
                    var point = new BMap.Point(this.devList[i].loca.lng, this.devList[i].loca.latl);
                    
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
        //点击弹出告警列表
        runChild:function(){this.$refs.runChildFun.showalarm()},

    },
    components:{dialogPointInfo,gisBottomAlarm}
}
</script>