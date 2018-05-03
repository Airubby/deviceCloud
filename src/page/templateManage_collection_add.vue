<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">采集控制模板 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    采集控制模板信息
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
                                <em>*</em>采集周期：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="collectCycle">
                                    <el-input size="small" placeholder="采集周期以秒为单位" v-model="form_info.collectCycle"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>传输规则：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="transferCode">
                                    <el-input size="small" placeholder="请输入传输规则" v-model="form_info.transferCode"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>传输周期：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="transferCycle">
                                    <el-input size="small" placeholder="请输入传输规则" v-model="form_info.transferCycle"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>模块心跳：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="clientHBeat">
                                    <el-input size="small" placeholder="请输入模块心跳" v-model="form_info.clientHBeat"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>设备心跳：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="devHBeat">
                                    <el-input size="small" placeholder="请输入模块心跳" v-model="form_info.devHBeat"></el-input>
                                </el-form-item>
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
            this.topInfo="新增采集控制模板信息";
        }else{
            this.topInfo="编辑采集控制模板信息"
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
               collectCycle:'',
               transferCode:'',
               transferCycle:'',
               clientHBeat:'',
               devHBeat:'',
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                collectCycle:[
                    { required: true, message: '请输入采集周期', trigger: 'blur' },
                ],
                transferCode:[
                    { required: true, message: '请输入传输规则', trigger: 'blur' },
                ],
                transferCycle:[
                    { required: true, message: '请输入传输周期', trigger: 'blur' },
                ],
                clientHBeat:[
                    { required: true, message: '请输入模块心跳', trigger: 'blur' },
                ],
                devHBeat:[
                    { required: true, message: '请输入设备心跳', trigger: 'blur' },
                ],
           },
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