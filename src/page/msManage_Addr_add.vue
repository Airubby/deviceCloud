<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">位置管理 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    位置信息
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
                                <em>*</em>编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="code">
                                    <el-input size="small" placeholder="请输入编码" v-model="form_info.code"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>类型：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="type">
                                    <el-input size="small" placeholder="请输入类型" v-model="form_info.type"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>状态：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.isVaild">
                                    <el-radio label="true">正常</el-radio>
                                    <el-radio label="false">异常</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                备注：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input type="textarea" v-model="form_info.remark"></el-input>
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
            this.topInfo="新增位置信息";
        }else{
            this.topInfo="编辑位置信息"
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
               code:'',
               type:'',
               remark:'',
               isVaild:"true",
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
                type:[
                    { required: true, message: '请输入类型', trigger: 'blur' },
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