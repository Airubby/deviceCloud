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
                    <el-button slot="append" icon="el-icon-search" @click="getDevList"></el-button>
                </el-input>
                <div class="searchbox numScroll0">
                    <div class="searchboxcon numScrollCon0">
                        <div class="searchlist" v-for="item in devList">
                            <h2><span @click="pointInfo(item)">{{item.name}}</span><i class="el-icon-location-outline" @click="addrCenter(item)"></i></h2>
                            <p>设备编码：{{item.code}}</p>
                            <p>启用状态：<span v-if="item.state==1">启用</span><span v-else>停用</span></p>
                            <p>在线状态：<span v-if="item.online==true" style="color:#33C466">在线</span><span style="color:#E9664B" v-else>离线</span></p>
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
                            <div class="gis_bottomlist_left loncom_fl">
                                <span :class="'alarm'+item.topLevel">{{item.topLevelName}}</span>
                            </div>
                            <div class="gis_bottomlist_center">
                                <h2>{{item.name}}<span class="loncom_ml15">触发时间：{{new Date(item.occurTime).Format('yyyy-MM-dd hh:mm:ss')}}</span></h2>
                                <p>
                                    <span>项目：{{item.projectName}}</span>，
                                    <span>设备：{{item.devName}}</span>，
                                    <span>测点：{{item.pointName}}</span>，
                                    <span>当前值：{{item.currValue}}</span>，
                                    <span>先前值：{{item.preValue}}</span>，
                                    <span>触发条件：{{item.conds}}</span>，
                                    <span>更新时间：{{new Date(item.updateTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="el-pagination is-background paginationbox">
                            <ul class="pagination el-pager"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dialogPointInfo v-bind:dialogInfo="point_Info" v-if="point_Info.visible"></dialogPointInfo>
    </div>
</template>


<script>
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
                this.getAlarm();  //底部告警信息
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

        var _this=this;
        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
                _this.getDevList()
            }
        }
        $(this.$refs.showalarm).find(".gis_bottom_top").on("dblclick",function(){
            _this.showalarm();
        })


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
           //底部告警信息
           alarmInfo:[],
           searchInfo:'',
           map:'',
           show_alarm:true, //点击底部是否展示显示告警列表

           //底部告警分页
           pagin:{
                pageNo:1,
                pageSize:10,
                total:'',
                pageTotal:'',
           },

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
        //分页
        paginationFn:function(){
            var _this=this;
            var current = this.pagin.pageNo;  //当前页
            var total = this.pagin.pageTotal;  //总共页
            var show = 7;  //显示几个页
            var begin = current - Math.floor(show/2);  //正常情况下当前页的最左边的页码
            begin = begin < 1 ? 1 : begin;
            var end = begin + show; //正常情况下当前页的最右边的页码
            if(end>total){
                end = total + 1;
                begin = end -show;
                begin = begin < 1 ? 1 : begin;
            }
            var container = document.getElementsByClassName('pagination')[0];
            container.innerHTML = "";
            var prevElement = document.createElement('li');
            prevElement.classList.add('active');
            prevElement.innerHTML='<a href="#" aria-label="Previous" data-num="min"><span aria-hidden="true">&laquo;</span></a>';
            if(current==1){
                prevElement.classList.add('disabled');
            }
            container.appendChild(prevElement);
            for(var i=begin;i<end;i++){
                var liElement = document.createElement('li');
                liElement.innerHTML = '<a href="#" data-num="'+i+'">' + i + '</a>';
                if (i == current) {
                    // 此时是当前页
                    liElement.classList.add('active');
                }
                container.appendChild(liElement);
            }
            var nextElement = document.createElement('li');
                nextElement.classList.add('active');
                nextElement.innerHTML = '<a href="#" aria-label="Next" data-num="add"><span aria-hidden="true">&raquo;</span></a>';
                if(current == total){
                nextElement.classList.add('disabled');
                }
                container.appendChild(nextElement);
            
             $('.pagination').find("li").on("click",function(){
                 if(!$(this).hasClass("disabled")){
                     if($(this).find("a").data("num")=="add"){
                         _this.pagin.pageNo+=1;
                     }else if($(this).find("a").data("num")=="min"){
                         _this.pagin.pageNo-=1;
                     }else{
                        _this.pagin.pageNo=$(this).find("a").data("num");
                     }  
                    _this.getAlarm();
                 }
                
            })
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
        //获取底部告警
        getAlarm:function(){
            this.alarmInfo=[];
            this.$api.post('/gitMap/listPointWarn', {projectId:this.obj.projectId,pageNo:this.pagin.pageNo,pageSize:this.pagin.pageSize}, r => {
                console.log(r)
                if(r.success){
                    this.alarmInfo=r.list;
                    this.pagin.pageTotal=r.pageTotal;
                    this.paginationFn();
                }
            }); 
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
       
      

    },
    watch:{
        // pagin:{
        //   handler:function(val,oldval){
        //       console.log(this.pagin)
        //       this.getAlarm();
        //       if(this.alarmInfo.length>0){
        //         this.paginationFn();
        //       }
        //   },
        //   deep: true
        // },

   },
    components:{dialogPointInfo}
}
</script>