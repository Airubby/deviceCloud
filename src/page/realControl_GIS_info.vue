<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">GIS视图</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right" style="position:relative;">
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
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class="searchbox numScroll0">
                    <div class="searchboxcon numScrollCon0">
                        <div class="searchlist" v-for="item in devList">
                            <h2><span @click="devInfo(item.id)">{{item.name}}</span><i class="el-icon-location-outline" @click="addrCenter(item)"></i></h2>
                            <p>设备编码：{{item.code}}</p>
                            <p>启用状态：<span v-if="item.state==1">启用</span><span v-else>停用</span></p>
                            <p>告警数量：<span>{{item.alarmNum}}</span></p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

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
            }); 
 
            //设备列表
            this.getDevList();
            //底部告警信息
            this.$api.post('/gitMap/listPointWarn', {projectId:this.obj.projectId}, r => {
                console.log(r)
                if(r.success){
                    this.alarmInfo=r.list;
                }
            }); 
            

        }
        

    },
    mounted() {
        
        numScroll(0)
        numScroll(1)
        //地图信息
        this.map = new BMap.Map("container");
        this.map.centerAndZoom("成都",6); 
        this.map.enableScrollWheelZoom();


        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
                _this.getDevList()
            }
        }



    },
    data() {
       return {
            //设备总数
            countDevAll:'',
            //告警总数
            countPointWarn:'',
            //设备列表
           devList:[],
           devList:[],
           obj:'',  
           //底部告警信息
           alarmInfo:[],
           searchInfo:'',
           map:'',
           show_alarm:true, //点击底部是否展示显示告警列表


       }
   },
    methods:{
        //设备列表
        getDevList:function(){
            this.$api.post('/gitMap/devList', {projectId:this.obj.projectId}, r => {
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
        //底部告警信息
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
       //
       devInfo:function(){

       },
      

    },
    components:{}
}
</script>