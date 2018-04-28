<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">GIS视图</span>
            <div class="realControl_loginInfo">
                <span class="top_time">{{top_time}}</span>
                <span class="top_people"><img src="static/images/top_people.svg"><em>系统管理员</em></span>
                <span class="top_logout"><img src="static/images/top_logout.svg"></span>
            </div>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div id="container" style="width:100%;height:100%;"></div>
            <div class="realControl_search_box">
                <input type="text" id="realControl_search_info" placeholder=""><span><i class="fa fa-search" id="search_btn"></i></span>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        this.top_time= new Date().Format("yyyy-MM-dd hh:mm:ss");
        var _this=this;
        setInterval(function(){
            _this.top_time= new Date().Format("yyyy-MM-dd hh:mm:ss");
        },1000)
        scrollCon();
        //地图信息
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(116.206929, 40.059111), 13); //初始化地图,设置中心点坐标和地图级别3-19
        //map.centerAndZoom("成都",15); 
        map.enableScrollWheelZoom();
    },
    data() {
       return {
           top_time:'',
       }
   },
    methods:{
       
    },
    components:{}
}
</script>