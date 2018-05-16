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
                        <getAddress v-bind:addressInfo="form_info"></getAddress>
                    </el-form>
                </div>
                <SubmitBtnInfo v-on:submitInfo="submitInfo('formInfo')" ref="goBack"></SubmitBtnInfo>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnInfo from '../components/submitBtnInfo.vue'
import getAddress from '../components/getAddress.vue'
export default {

    created () {
        var obj = this.$route.query;
        if(obj.locaId!=undefined){
            this.topInfo="编辑地点信息";
            this.$api.post('/module/get', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        this.form_info[item]=r.data.loca[item];
                    }
                }else{
                    this.$message.warning(r.msg);
                }
            }); 
        }else{
            this.form_info.clientId=obj.id;
            this.topInfo="配置地点信息";
        }
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           topInfo:'',
            form_info:{
                id:'',
                clientId:'',  //网关模块id
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
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                fullAddress:[
                    { required: true, message: '请输入全地址', trigger: 'blur' },
                ],
                lng:[
                    { required: true, message: '请输入地址搜索经度', trigger: 'blur' },
                ],
                latl:[
                    { required: true, message: '请输入地址搜索纬度', trigger: 'blur' },
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
                    this.$api.post('/module/saveLoca', this.form_info, r => {
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
    components:{SubmitBtnInfo,getAddress}
}
</script>