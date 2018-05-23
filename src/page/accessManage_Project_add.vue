<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">项目管理 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    项目信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>名称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="name">
                                    <el-input size="small" placeholder="请输入名称" v-model="form_info.name"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>单位：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="fullName">
                                    <el-input size="small" placeholder="请输入单位" v-model="form_info.fullName"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>联系人：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="contacts">
                                    <el-input size="small" placeholder="请输入联系人" v-model="form_info.contacts"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>联系电话：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="phoneNo">
                                    <el-input size="small" placeholder="请输入联系电话" v-model="form_info.phoneNo"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <getAddress v-bind:addressInfo="addr_info" v-if="showAddr"></getAddress>
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
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增项目信息";
            this.showAddr=true;
        }else{
            this.topInfo="编辑项目信息";
            this.$api.post('/project/get', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        if(item=="loca"){
                            for(var initem in this.addr_info){
                                this.addr_info[initem]=r.data[item][initem];
                            }
                        }else{
                            this.form_info[item]=r.data[item];    
                        }
                    } 
                    this.showAddr=true;
                    console.log(this.addr_info)
                }
            }); 
        }
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           showAddr:false,  //判断编辑时获取了信息才加载
           //新增编辑控制器头部显示
           topInfo:'',
           form_info:{
               id:'',
               name:'',
               fullName:'',
               contacts:'',
               phoneNo:'',
               loca:'',
           },
           addr_info:{
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
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                fullName:[
                    { required: true, message: '请输入单位', trigger: 'blur' },
                ],
                contacts:[
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                ],
                phoneNo:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                ],
                // address:[
                //     { required: true, message: '请输入地址', trigger: 'blur' },
                // ],
                // fullAddress:[
                //     { required: true, message: '请输入全地址', trigger: 'blur' },
                // ],
                // lng:[
                //     { required: true, message: '请输入地址搜索经度', trigger: 'blur' },
                // ],
                // latl:[
                //     { required: true, message: '请输入地址搜索纬度', trigger: 'blur' },
                // ],
           },
       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    //form_info.id为空表示新增
                    this.form_info.loca=this.addr_info;
                    console.log(this.form_info)
                    this.$api.post('/project/save', this.form_info, r => {
                        console.log(r)
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