<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">GIS视图</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div id="container" style="width:100%;height:100%;"></div>
            
        </div>
    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        
        scrollCon();
        //地图信息
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(116.206929, 40.059111), 13); //初始化地图,设置中心点坐标和地图级别3-19
        //map.centerAndZoom("成都",15); 
        map.enableScrollWheelZoom();
    },
    data() {
       return {
           
       }
   },
    methods:{
       
    },
    components:{}
}
</script>