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
                    <el-button slot="append" icon="el-icon-search" @click="getProList"></el-button>
                </el-input>
                <div class="searchbox numScroll0">
                    <div class="searchboxcon numScrollCon0">
                        <div class="searchlist" v-for="item in projectList">
                            <h2><span @click="projectInfo(item.id)">{{item.name}}</span><i class="el-icon-location-outline" @click="addrCenter(item)"></i></h2>
                            <p>单位：{{item.fullName}}</p>
                            <p>项目位置：<span v-if="item.loca!=null&&item.loca!=''">{{item.loca.fullAddress}}</span></p>
                            <p>告警数量：<span>{{item.alarmNum}}</span></p>
                            <p>接入：
                                <span v-for="(initem,index) in item.devTypeCount">
                                    <em v-if="index==0">{{initem.name}}[{{initem.count}}]</em>
                                    <em v-else-if="index<3">，{{initem.name}}[{{initem.count}}]</em>
                                </span>
                            </p>
                            <p><span class="loncom_color_main dangan" @click="custInfo(item.id)">[单位档案]</span></p>
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
                                <h2>{{item.name}}</h2>
                                <p>
                                    <span>项目名称：{{item.projectName}}</span>，
                                    <span>设备名称：{{item.devName}}</span>，
                                    <span>测点名称：{{item.pointName}}</span>，
                                    <span>触发时间：{{new Date(item.occurTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
                                    <span>最后更新时间：{{new Date(item.updateTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
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
            //获取项目列表
            this.getProList()
            this.getAlarm();  //底部告警信息
        }); 
    },
    mounted() {
        var _this=this;
        this.map = new BMap.Map("container");
        this.map.centerAndZoom("成都",6); 
        this.map.enableScrollWheelZoom();

    
        
        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
                _this.getProList()
            }
        }
        $(this.$refs.showalarm).find(".gis_bottom_top").on("dblclick",function(){
            _this.showalarm();
        })
        numScroll(0)
        numScroll(1)
        
       
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
           show_alarm:true, //点击底部是否展示显示告警列表
           alarmInfo:[],  //底部告警列表

           cust_Info:{
                title:'客户档案信息',
                visible:false,
                width:'800px',
                projectId:'',
           },

           //底部告警分页
           pagin:{
                pageNo:1,
                pageSize:10,
                total:'',
                pageTotal:'',
           }
           

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
                 console.log($(this))
                 console.log($(this).hasClass("disabled"))
                 if(!$(this).hasClass("disabled")){
                     console.log($(this).find("a").data("num"))
                     if($(this).find("a").data("num")=="add"){
                         _this.pagin.pageNo+=1;
                     }else if($(this).find("a").data("num")=="min"){
                         _this.pagin.pageNo-=1;
                     }else{
                        _this.pagin.pageNo=$(this).find("a").data("num");
                     }  
                    console.log(_this.pagin.pageNo)
                 }
                
            })
        },
        //获取底部告警
        getAlarm:function(){
            this.alarmInfo=[];
            this.$api.post('/gitMap/listPointWarn', {pageNo:this.pagin.pageNo,pageSize:this.pagin.pageSize}, r => {
                console.log(r)
                if(r.success){
                    this.alarmInfo=r.list;
                    this.pagin.pageTotal=r.pageTotal;
                }
            }); 
        },
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
                    var iconurl='./static/images/index_normal.svg';
                    var content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop">'+this.projectList[i].name+'</div>' +
                                '<div class="loncom_map_boxcon">'+
                                    '<p>公司：'+this.projectList[i].fullName+'</p>'+
                                    '<p>联系人：'+this.projectList[i].contacts+'</p>'+
                                    '<p>联系电话：'+this.projectList[i].phoneNo+'</p>'+
                                    '<p>告警数量：'+this.projectList[i].alarmNum+'</p>'+
                                '</div>' +
                            '</div>';
                    if(this.projectList[i].alarmNum>0){
                        iconurl='./static/images/index_warning.svg'
                         var content = '<div class="loncom_map_box">'+
                                '<div class="loncom_map_boxtop loncom_map_boxtopalarm">'+this.projectList[i].name+'</div>' +
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
            this.getMap();
        },
        pagin:{
          handler:function(val,oldval){
              console.log(this.pagin)
              this.getAlarm();
              this.paginationFn();
          },
          deep: true
        },

   },
    components:{dialogCustInfo}
}
</script>