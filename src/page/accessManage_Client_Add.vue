<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">客户管理 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    客户信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                        <div class="loncom_list_boxform">                            
                            <div class="loncom_list_box_left">
                                <em>*</em>客户编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="code">
                                    <el-input size="small" placeholder="请输入客户编码" v-model="form_info.code"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">                            
                            <div class="loncom_list_box_left">
                                <em>*</em>客户名称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="name">
                                    <el-input size="small" placeholder="请输入客户名称" v-model="form_info.name"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>客户全称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="fullName">
                                    <el-input size="small" placeholder="请输入客户全称" v-model="form_info.fullName"></el-input>
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
            this.topInfo="新增客户信息";
        }else{
            this.topInfo="编辑客户信息"
            this.$api.post('/cust/get', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        this.form_info[item]=r.data[item];    
                    } 
                }
            }); 
        }
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           //新增编辑控制器头部显示
           topInfo:'',
           form_info:{
               id:'',
               code:'',
               name:'',
               fullName:'',
               contacts:'',
               phoneNo:'',
           },
           formRules:{
                code:[
                    { required: true, message: '请输入客户编码', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '请输入客户名称', trigger: 'blur' },
                ],
                fullName:[
                    { required: true, message: '请输入客户全称', trigger: 'blur' },
                ],
                contacts:[
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                ],
                phoneNo:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                ],
           },
       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log(this.form_info)
                    this.$api.post('/cust/save', this.form_info, r => {
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
    components:{SubmitBtnInfo}
}
</script>