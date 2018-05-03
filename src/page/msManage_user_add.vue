<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">用户管理 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    用户信息
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
                                <em>*</em>邮箱：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="email">
                                    <el-input size="small" placeholder="请输入账号" v-model="form_info.email"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>电话：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="phoneNo">
                                    <el-input size="small" placeholder="请输入联系人" v-model="form_info.phoneNo"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>所属客户：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="custName">
                                    <el-select v-model="form_info.custName" placeholder="请选择">
                                        <el-option v-for="item in custNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>角色：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="roleNames">
                                    <el-select v-model="form_info.roleNames" placeholder="请选择">
                                        <el-option v-for="item in roleNamesList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>状态：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.isVaild">
                                    <el-radio :label="true">启用</el-radio>
                                    <el-radio :label="false">停用</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </el-form>
                </div>
                <SubmitBtnInfo v-bind:submitBtnInfo="activeBtn" v-on:submitInfo="submitInfo('formInfo')"></SubmitBtnInfo>
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
            this.topInfo="新增用户信息";
        }else{
            this.topInfo="编辑用户信息"
            this.activeBtn=false;
        }
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           //新增编辑控制器头部显示
           topInfo:'',
           activeBtn:true,  //默认新增
           form_info:{
               name:'',
               fullName:'',
               contacts:'',
               phoneNo:'',
               isVaild:true,
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                fullName:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                contacts:[
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                ],
                phoneNo:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                ],
           },
           //客户信息
           custNameList:[],
           //角色信息
           roleNamesList:[],
       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.activeBtn){  //新增

                    }else{  //编辑

                    }
                }
            })
       },

    },
    components:{SubmitBtnInfo}
}
</script>