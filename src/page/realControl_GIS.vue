<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">GIS视图</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con" style="position:relative;">
            <div id="container" style="width:100%;height:100%;"></div>
            <div class="gis_left">
                <div class="gis_left_box">
                    <h2>告警统计</h2>
                    <span>50</span>
                </div>
                <div class="gis_left_box">
                    <h2>接入设备</h2>
                    <span>120</span>
                </div>
            </div>
            <div class="gis_right">
                <el-input placeholder="请输入内容" v-model="searchInfo" size="small">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class="searchbox numScroll0">
                    <div class="searchboxcon numScrollCon0">
                        <div class="searchlist">
                            <h2>龙控数据中心<i class="el-icon-location-outline"></i></h2>
                            <p>单位：四川龙控</p>
                            <p>位置：收到两份酸辣粉</p>
                            <p>接入：空调[10],微模块[22]</p>
                            <p><span>[单位档案]</span><span>[项目档案]</span><span>[监控详情]</span></p>
                        </div>
                        <div class="searchlist">
                            <h2>龙控数据中心<i class="el-icon-location-outline"></i></h2>
                            <p>单位：四川龙控</p>
                            <p>位置：收到两份酸辣粉</p>
                            <p>接入：空调[10],微模块[22]</p>
                            <p><span>[单位档案]</span><span>[项目档案]</span><span>[监控详情]</span></p>
                        </div>
                        <div class="searchlist">
                            <h2>龙控数据中心<i class="el-icon-location-outline"></i></h2>
                            <p>单位：四川龙控</p>
                            <p>位置：收到两份酸辣粉</p>
                            <p>接入：空调[10],微模块[22]</p>
                            <p><span>[单位档案]</span><span>[项目档案]</span><span>[监控详情]</span></p>
                        </div>
                        <div class="searchlist">
                            <h2>龙控数据中心<i class="el-icon-location-outline"></i></h2>
                            <p>单位：四川龙控</p>
                            <p>位置：收到两份酸辣粉</p>
                            <p>接入：空调[10],微模块[22]</p>
                            <p><span>[单位档案]</span><span>[项目档案]</span><span>[监控详情]</span></p>
                        </div>
                        <div class="searchlist">
                            <h2>龙控数据中心<i class="el-icon-location-outline"></i></h2>
                            <p>单位：四川龙控</p>
                            <p>位置：收到两份酸辣粉</p>
                            <p>接入：空调[10],微模块[22]</p>
                            <p><span>[单位档案]</span><span>[项目档案]</span><span>[监控详情]</span></p>
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
                        <div class="gis_bottomlist">
                            <div class="gis_bottomlist_left loncom_fl"><span class="alarm">故障</span></div>
                            <div class="gis_bottomlist_center">
                                <h2>四川依米康科技</h2>
                                <p>2018-12-11 12:12:12,四川slsafsafl水电费了收到两份</p>
                            </div>
                            <div class="gis_bottomlist_right loncom_fr">
                                <i class="el-icon-location-outline"></i>
                            </div>
                        </div>
                        <div class="gis_bottomlist">
                            <div class="gis_bottomlist_left loncom_fl"><span class="alarm">故障</span></div>
                            <div class="gis_bottomlist_center">
                                <h2>四川依米康科技</h2>
                                <p>2018-12-11 12:12:12,四川slsafsafl水电费了收到两份</p>
                            </div>
                            <div class="gis_bottomlist_right loncom_fr">
                                <i class="el-icon-location-outline"></i>
                            </div>
                        </div>
                        <div class="gis_bottomlist">
                            <div class="gis_bottomlist_left loncom_fl"><span class="alarm">故障</span></div>
                            <div class="gis_bottomlist_center">
                                <h2>四川依米康科技</h2>
                                <p>2018-12-11 12:12:12,四川slsafsafl水电费了收到两份</p>
                            </div>
                            <div class="gis_bottomlist_right loncom_fr">
                                <i class="el-icon-location-outline"></i>
                            </div>
                        </div>
                        <div class="gis_bottomlist">
                            <div class="gis_bottomlist_left loncom_fl"><span class="alarm">故障</span></div>
                            <div class="gis_bottomlist_center">
                                <h2>四川依米康科技</h2>
                                <p>2018-12-11 12:12:12,四川slsafsafl水电费了收到两份</p>
                            </div>
                            <div class="gis_bottomlist_right loncom_fr">
                                <i class="el-icon-location-outline"></i>
                            </div>
                        </div>
                        <div class="gis_bottomlist">
                            <div class="gis_bottomlist_left loncom_fl"><span class="alarm">故障</span></div>
                            <div class="gis_bottomlist_center">
                                <h2>四川依米康科技</h2>
                                <p>2018-12-11 12:12:12,四川slsafsafl水电费了收到两份</p>
                            </div>
                            <div class="gis_bottomlist_right loncom_fr">
                                <i class="el-icon-location-outline"></i>
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
        
    },
    mounted() {
        
        numScroll(0)
        numScroll(1)
        //地图信息
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(116.206929, 40.059111), 13); //初始化地图,设置中心点坐标和地图级别3-19
        //map.centerAndZoom("成都",15); 
        map.enableScrollWheelZoom();
    },
    data() {
       return {
           searchInfo:'',
           show_alarm:true,

       }
   },
    methods:{
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
    components:{}
}
</script>