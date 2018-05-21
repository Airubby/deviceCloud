<template>
    <div class="loncom_content">
        <navInfo></navInfo>
        <div class="loncom_sidebar_right" ref="content">
            <div class="loncom_content">
                <div class="loncom_public_top">
                    <span class="loncom_public_topinfo">设备云监控系统</span>
                    <loginInfo></loginInfo>
                </div>
                <div class="loncom_public_right loncom_scroll_con">
                    <div class="index_content">
                        <div class="index_box index_box1">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    注册概况
                                </div>
                                <div class="index_box_con" id="indexbarChar"></div>
                            </div>
                        </div>
                        <div class="index_box index_box2">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    告警等级
                                </div>
                                <div class="index_box_con" id="indexpieChar"></div>
                            </div>
                        </div>
                        <div class="index_box index_box3">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    活动模块数量
                                </div>
                                <div class="index_box_con" id="activeModuleNum"></div>
                            </div>
                        </div>
                        <div class="index_box index_box3">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    接入数据包/分钟
                                </div>
                                <div class="index_box_con" id="pointPkgNum"></div>
                            </div>
                        </div>
                        <div class="index_box index_box4">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                   活动趋势
                                </div>
                                <div class="index_box_con" id="alarmLine"></div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        scrollCon();
        var _this=this;
        //注册概况
        this.$api.post('/dash/getSysInfo', {}, r => {
            console.log(r)
            if(r.success){
                var xData=[];
                var yData=[];
                for(var item in r.data){
                    if(item=="custNum"){
                        xData.push("客户")
                    }else if(item=="projectNum"){
                        xData.push("项目")
                    }else if(item=="modulNum"){
                        xData.push("模块")
                    }else if(item=="devNum"){
                        xData.push("设备")
                    }else if(item=="pointNum"){
                        xData.push("测点")
                    }
                    yData.push(r.data[item])
                }
                barChar("indexbarChar",xData,yData)
            }
        }); 
        //告警等级;活动趋势
        this.$api.post('/dash/getActiveAlarmInfo', {}, r => {
            console.log(r)
            if(r.success){
                var xData=[];
                var yData=[];
                var allAlarm=r.data.alarmTotal;
                for(var item in r.data.amap){
                    xData.push("告警等级"+item);
                    yData.push({value:r.data.amap[item],name:"告警等级"+item})
                }
                piemoreChar("indexpieChar",xData,yData,allAlarm)
            }
        });
        this.getAlarm();
        //接入数据
        this.getAccesInfo();
        setInterval(function () {
            _this.getAccesInfo();
        },10000);
        //活动趋势
        setInterval(function () {
            _this.getAlarm();
        },600000);

    },
    data() {
       return {
            dateTime:[],  //接入数据时间
          activeModule:[],  //活动模块数量
          pointPkg:[], //接入数据包/分钟
          //告警line信息
          alarmDate:[],
          yData1:[],
          yData2:[],
          alarmName:["24H产生告警数", "24H解除告警数"],
       }
   },
    methods:{
        //告警信息
        getAlarm:function(){
            this.$api.post('/dash/getActiveAlarmInfo', {}, r => {
                console.log(r)
                if(r.success){
                   this.alarmDate.push(new Date().Format('hh:mm:ss'));
                   this.yData1.push(r.data.nearNewAlarm);
                   this.yData2.push(r.data.nearEvictAlarm);
                   twoLineChar("alarmLine",this.alarmDate,this.yData1,this.yData2,this.alarmName)
                }
            });
        },
        //接入数据
       getAccesInfo:function(){
            this.$api.post('/dash/getAccesInfo', {}, r => {
                console.log(r)
                if(r.success){
                    this.dateTime.push(new Date().Format('hh:mm:ss'));
                    this.activeModule.push(r.data.activeModuleNum);
                    this.pointPkg.push(r.data.pointPkgNum);
                    echartLine("activeModuleNum",this.dateTime,this.activeModule);
                    echartLine("pointPkgNum",this.dateTime,this.pointPkg);
                }
            });
       },
    },
    components:{}
}
</script>