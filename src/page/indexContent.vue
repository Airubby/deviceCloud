<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备云监控系统</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="index_content">
                <div class="index_box">
                    <div class="boxcontent">
                        <div class="index_box_title">
                            活动模块数量（刷新频率10s）
                        </div>
                        <div class="index_box_con" id="activeModuleNum"></div>
                    </div>
                </div>
                <div class="index_box">
                    <div class="boxcontent">
                        <div class="index_box_title">
                            接入数据包/分钟（刷新频率10s）
                        </div>
                        <div class="index_box_con" id="pointPkgNum"></div>
                    </div>
                </div>
                <div class="index_box">
                    <div class="boxcontent">
                        <div class="index_box_title">
                            活动趋势（刷新频率60s）
                        </div>
                        <div class="index_box_con" id="alarmLine"></div>
                    </div>
                </div>
                <div class="index_box">
                    <div class="boxcontent">
                        <div class="index_box_title">
                            告警等级（刷新频率60s）
                        </div>
                        <div class="index_box_con" id="indexpieChar"></div>
                    </div>
                </div>
                <div class="index_box index_box2">
                    <div class="boxcontent">
                        <div class="index_box_title">
                            注册概况
                        </div>
                        <div class="index_box_con">
                            <div class="index_boxgauge" id="gaugeChar1"></div>
                            <div class="index_boxgauge" id="gaugeChar2"></div>
                            <div class="index_boxgauge" id="gaugeChar3"></div>
                            <div class="index_boxgauge" id="gaugeChar4"></div>
                            <div class="index_boxgauge" id="gaugeChar5"></div>
                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    created () {
        clearInterval(index_getacc);
        clearInterval(index_getal);
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'EVENT_LEVEL'},r => { //事件等级字典
            if(r.success){
                this.event_level=r.data;
            }else{this.$message.warning(r.msg);}
            //告警等级;活动趋势
            this.getAlarm();
        }); 

    },
    mounted() {
        scrollCon();
        
        var _this=this;
        //注册概况
        this.$api.post('/dash/getSysInfo', {}, r => {
            console.log(r)
            if(r.success){
                var max='';
                for(var item in r.data){
                    if(parseInt(r.data[item])<95){
                        max=100;
                    }else if(parseInt(r.data[item])<195){
                        max=200;
                    }else if(parseInt(r.data[item])<495){
                        max=500;
                    }else if(parseInt(r.data[item])<995){
                        max=1000;
                    }else if(parseInt(r.data[item])<4995){
                        max=5000;
                    }else if(parseInt(r.data[item])<9995){
                        max=10000;
                    }else{
                        max=2*parseInt(r.data[item]);
                    }
                    if(item=="custNum"){
                        this._gaugeChar1=gaugeChar("gaugeChar1","客户",r.data[item],max);
                    }else if(item=="projectNum"){
                        this._gaugeChar2=gaugeChar("gaugeChar2","项目",r.data[item],max);
                    }else if(item=="modulNum"){
                        this._gaugeChar3=gaugeChar("gaugeChar3","模块",r.data[item],max);
                    }else if(item=="devNum"){
                        this._gaugeChar4=gaugeChar("gaugeChar4","设备",r.data[item],max);
                    }else if(item=="pointNum"){
                        this._gaugeChar5=gaugeChar("gaugeChar5","测点",r.data[item],max);
                    }
                }
                
            }
        }); 
        
        //接入数据
        this.getAccesInfo();



        var str=this.$route.path;
        
        index_getacc=setInterval(function () {
            _this.getAccesInfo();
        },10000);
        //活动趋势
        index_getal=setInterval(function () {
            _this.getAlarm();
        },60000);


        $(window).resize(function () {
            //_this._barChar.resize();
            _this._twoLineChar.resize();
            _this._piemoreChar.resize();
            _this._LineChar1.resize();
            _this._LineChar2.resize();
        });

        

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
          _gaugeChar1:"",
          _gaugeChar2:"",
          _gaugeChar3:"",
          _gaugeChar4:"",
          _gaugeChar5:"",
          //_barChar:'',  //
          _twoLineChar:'',
          _piemoreChar:'',
          _LineChar1:'',
          _LineChar2:'',
          //事件等级字典
          event_level:[],

       }
   },
    methods:{
        //告警信息
        getAlarm:function(){
            this.$api.post('/dash/getActiveAlarmInfo', {}, r => {
                console.log(r)
                if(r.success){
                    var xData=[];
                    var yData=[];
                    var color=[];
                    var allAlarm=r.data.alarmTotal;
                    for(var item in r.data.amap){
                        for(var i=0;i<this.event_level.length;i++){
                            if(parseInt(item)==parseInt(this.event_level[i].code)){
                                xData.push(this.event_level[i].label);
                                yData.push({value:r.data.amap[item],name:this.event_level[i].label});
                                if(this.event_level[i].var1!=""&&this.event_level[i].var1!=null){
                                    color.push(this.event_level[i].var1);
                                }else{
                                    //这些颜色和css中.gis_bottomlist_left span.alarm的颜色对应的
                                    if(parseInt(item)==1){
                                        color.push("#ded941");
                                    }else if(parseInt(item)==2){
                                        color.push("#e69836");
                                    }else if(parseInt(item)==3){
                                        color.push("#f38905");
                                    }else if(parseInt(item)==4){
                                        color.push("#ec4444");
                                    }else if(parseInt(item)==5){
                                        color.push("#ff0000");
                                    }else{
                                        color.push("#ded941");
                                    }
                                }
                                
                            }
                        }
                    }
                    this._piemoreChar=piemoreChar("indexpieChar",xData,yData,allAlarm,color)
                    
                   this.alarmDate.push(new Date().Format('hh:mm:ss'));
                   this.yData1.push(r.data.nearNewAlarm);
                   this.yData2.push(r.data.nearEvictAlarm);
                   var color1=["#5085FF","#B5CAFE","#F4F8FF"];
                   var color2=["#52FED5","#C4EDEB","#e9f9f8"];
                   this._twoLineChar=twoLineChar("alarmLine",this.alarmDate,this.yData1,this.yData2,color1,color2,this.alarmName)
                }
            });
        },
        //接入数据
       getAccesInfo:function(){
            this.$api.post('/dash/getAccesInfo', {}, r => {
                if(r.success){
                    var color1=["#5085FF","#B5CAFE","#F4F8FF"];
                    var color2=["#52FED5","#C4EDEB","#e9f9f8"];
                    this.dateTime.push(new Date().Format('hh:mm:ss'));
                    this.activeModule.push(r.data.activeModuleNum);
                    this.pointPkg.push(r.data.pointPkgNum);
                    this._LineChar1=LineChar("activeModuleNum",this.dateTime,this.activeModule,color1);
                    this._LineChar2=LineChar("pointPkgNum",this.dateTime,this.pointPkg,color2);
                }
            });
       },
    },
    components:{}
}
</script>