<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">接入网关 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    地点信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
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
                                    <el-input v-model="form_info.provinceName" :disabled="true" size="small" placeholder="省"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="cityName">
                                    <el-input v-model="form_info.cityName" :disabled="true" size="small" placeholder="市"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="areaName">
                                    <el-input v-model="form_info.areaName" :disabled="true" size="small" placeholder="区"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                        <div class="loncom_list_boxform">
                            <el-col :span="12">
                                <el-form-item prop="lng">
                                    <el-input v-model="form_info.lng" :disabled="true" size="small" placeholder="经度"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="latl">
                                    <el-input v-model="form_info.latl" :disabled="true" size="small" placeholder="纬度"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                        <div class="loncom_list_boxform">
                            <el-form-item prop="fullAddress">
                                <el-input v-model="form_info.fullAddress" size="small" placeholder="请输入全地址" ></el-input>
                            </el-form-item>
                        </div>
                        <div id="container" style="width:100%;height:400px;border:1px solid #ccc;"></div>
                    </el-form>
                </div>
                <SubmitBtnInfo v-on:submitInfo="submitInfo('formInfo')" ref="goBack"></SubmitBtnInfo>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnInfo from '../components/submitBtnInfo.vue'

export default {

    created () {
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="地点信息";
        }else{
            this.topInfo="地点信息"
            
        }
    },
    mounted() {
        scrollCon();
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
                _this.form_info.address=addComp.street+addComp.streetNumber;  
            });  
        } 
    },
    data() {
       return {
           topInfo:'',
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
        ///提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log(this.form_info)
                    this.$api.post('', this.form_info, r => {
                        if(r.success){
                            this.$message.success(r.msg);
                            this.$refs.goBack.giveUp();
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
       },
    

    },
    components:{SubmitBtnInfo}
}
</script>