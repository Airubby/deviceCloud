<template>
  <div class="gis_bottom" ref="showalarm">
        <div class="gis_bottom_top">
            <h2>当前活动告警</h2>
            <span class="fa fa-eye" ref="eye" @click="showalarm"></span>
        </div>
        <div class="gis_bottom_con numScroll1">
            <div class="gis_bottom_conbox numScrollCon1">
                <div class="gis_bottomlist" v-for="item in alarmInfo">
                    <div class="gis_bottomlist_left loncom_fl">
                        <span :class="'alarm'+item.currLevel" :style="'background:'+item.currLevelColor" v-if="item.currLevelColor">{{item.currLevelName}}</span>
                        <span :class="'alarm'+item.currLevel" v-else>{{item.currLevelName}}</span>
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
                    <ul class="pagination el-pager" v-show="alarmInfo.length>0"></ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    created () {
        
        this.getAlarm();  //底部告警信息
    },
    mounted() {
        var _this=this;
        
        $(this.$refs.showalarm).find(".gis_bottom_top").on("dblclick",function(){
            _this.showalarm();
        })
        numScroll(1)
       
    },
    data() {
       return {
          show_alarm:true, //点击底部是否展示显示告警列表
           alarmInfo:[],  //底部告警列表
           event_level:[],  //事件等级
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
            var show = this.pagin.pageTotal<7?this.pagin.pageTotal:7;  //显示几个页
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
        //获取底部告警
        getAlarm:function(){
            this.alarmInfo=[];
            var _form_info={pageNo:this.pagin.pageNo,pageSize:this.pagin.pageSize};
            console.log(this.info)
            if(this.info!=undefined){
                _form_info.projectId=this.info.projectId;
            }
            console.log(_form_info)
            this.$api.post('/gitMap/listPointWarn', _form_info, r => {
                console.log(r)
                if(r.success){
                    this.alarmInfo=r.list;
                    this.pagin.pageTotal=r.pageTotal;
                    this.paginationFn();
                }
            }); 
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


    },
    props:["info"],
}
</script>