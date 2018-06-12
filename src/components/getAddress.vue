<template>
    <div style="height:100%;">
        <div class="loncom_list_boxform">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item prop="address">
                        <el-input placeholder="请输入地址搜索" v-model="form_info.address" size="small" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" id="search"></el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item prop="fullAddress">
                        <el-input v-model="form_info.fullAddress" size="small" placeholder="请输入全地址" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div class="loncom_list_boxform">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item prop="provinceName">
                        <el-input v-model="form_info.provinceName" :disabled="true" size="small" placeholder="省"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item prop="cityName">
                        <el-input v-model="form_info.cityName" :disabled="true" size="small" placeholder="市"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item prop="areaName">
                        <el-input v-model="form_info.areaName" :disabled="true" size="small" placeholder="区"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="lng">
                        <el-input v-model="form_info.lng" :disabled="true" size="small" placeholder="经度"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="latl">
                        <el-input v-model="form_info.latl" :disabled="true" size="small" placeholder="纬度"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div id="container" style="width:100%;height:calc(100% - 120px);border:1px solid #ccc;"></div>
    </div>
</template>

<script>
export default {
    created () {
        console.log(this.addressInfo)
    },
    mounted() {
        var _this=this;
        var map = new BMap.Map("container");
        var myGeo = new BMap.Geocoder();  
        //map.centerAndZoom("北京",13); 
        if(this.addressInfo.lng!=""&&this.addressInfo.latl!=""){
            map.centerAndZoom(new BMap.Point(this.addressInfo.lng, this.addressInfo.latl), 13); 
            moveOverlay({lng:this.addressInfo.lng, lat:this.addressInfo.latl})
        }else{
            map.centerAndZoom("北京",13);   
        }
        map.enableScrollWheelZoom();
        map.addEventListener("click",function(e){
            setPoint(e.point)
		});  
        
        $("#search").on('click', function () {  
            var searchTxt = _this.form_info.address;  
            myGeo.getPoint(searchTxt, function (point) {  
                console.log(point)
                map.centerAndZoom(point, 13); 
                setPoint(point);  
            }, "全国");  
        }); 
        function setPoint(point) {  
            if (point) {  
                //坐标赋值  
                _this.form_info.lng=point.lng;
                _this.form_info.latl=point.lat;
                Geocoder(point);  
                moveOverlay(point);
                
            }  
        }
        function moveOverlay(point){
            map.clearOverlays();
            var marker = new BMap.Marker(point);  
            map.addOverlay(marker);  
            marker.enableDragging();//可以拖动   
            //拖动监听  
            marker.addEventListener("dragend", function (e) {  
                //坐标赋值  
                _this.form_info.lng=e.point.lng;
                _this.form_info.latl=e.point.lat;
                Geocoder(e.point);  
            });  
        }  
        function Geocoder(point) {  
            var gc = new BMap.Geocoder();  
            gc.getLocation(point, function (rs) {  
                console.log(rs)
                var addComp = rs.addressComponents;  
                console.log(addComp)
                _this.form_info.provinceName=addComp.province;
                _this.form_info.cityName=addComp.city;
                _this.form_info.areaName=addComp.district;
                _this.form_info.fullAddress=addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber;  
                _this.form_info.address=addComp.street+addComp.streetNumber;  
            });  
        } 
        document.onkeyup = function (event) {
            if (event.keyCode == 13) {
               var searchTxt = _this.form_info.address;  
                myGeo.getPoint(searchTxt, function (point) {  
                    map.centerAndZoom(point, 13); 
                    setPoint(point);  
                }, "全国");  
            }
        }


    },
    data() {
        return {
        //     form_info:{
        //         nationId:'',
        //         nationName:'',
        //         provinceId:'',
        //         provinceName:'',
        //         cityId:'',
        //         cityName:'',
        //         areaId:'',
        //         areaName:'',
        //         address:'',
        //         fullAddress:'',
        //         lng:'',
        //         latl:'',
        //    },
            form_info:this.addressInfo
        }
    },
    methods:{
        
    },
    props:["addressInfo"],
}
</script>

