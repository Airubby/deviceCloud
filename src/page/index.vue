<template>
    <div class="loncom_content">
        <navInfo></navInfo>
        <div class="loncom_sidebar_right" ref="content">
            <el-form :model="form_info" :rules="formRules" ref="formInfo">
                <div class="loncom_list_boxform">
                    <el-form-item prop="address">
                        <el-input placeholder="请输入地址搜索" v-model="form_info.address" size="small" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" ref="search"></el-button>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="loncom_list_boxform">
                    <el-col :span="8">
                        <el-form-item prop="provinceName">
                            <el-input v-model="form_info.provinceName" :disabled="true" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="cityName">
                            <el-input v-model="form_info.cityName" :disabled="true" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="areaName">
                            <el-input v-model="form_info.areaName" :disabled="true" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </div>
                <div class="loncom_list_boxform">
                    <el-form-item prop="fullAddress">
                        <el-input v-model="form_info.fullAddress" size="small" placeholder="请输入全地址" ></el-input>
                    </el-form-item>
                </div>
                <div id="container" style="width:100%;height:400px;"></div>
            </el-form>
        </div>
    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        var _this=this;
        var map = new BMap.Map("container");
        var myGeo = new BMap.Geocoder();  
        map.centerAndZoom("北京",13); 
        map.enableScrollWheelZoom();
        map.addEventListener("click",function(e){
            setPoint(e.point)
		});  

        $(this.$refs.search).on('click', function () {  
            var searchTxt = this.form_info.address;  
            myGeo.getPoint(searchTxt, function (point) {  
                console.log(point)
                setPoint(point);  
            }, "全国");  
        }); 
        function setPoint(point) {  
            if (point) {  
                //坐标赋值  
                _this.form_info.lng=point.lng;
                _this.form_info.latl=point.lat;
                Geocoder(point);  

                map.centerAndZoom(point, 13);  
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
            });  
        } 
    },
    data() {
       return {
          form_info:{
                id:'',
                nationId:'',
                nationName:'',
                provinceId:'',
                provinceName:'',
                cityId:'',
                cityName:'',
                areaId:'',
                areaName:'',
                address:'',
                fullAddress:'',
                lng:'',
                latl:'',
           },
           formRules:{
                address:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
           },
       }
   },
    methods:{
       
    },
    components:{}
}
</script>