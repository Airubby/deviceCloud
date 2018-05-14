<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">采集控制模板 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
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
                                    <el-input size="small" placeholder="请输入传输周期" v-model="form_info.transferCycle"></el-input>
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
            this.topInfo="新增采集控制模板信息";
        }else{
            this.topInfo="编辑采集控制模板信息"
            this.$api.post('/accessConfigTemplate/getById', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for (var item in this.form_info){
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
                    { max: 11, message: '长度最长11位', trigger: 'blur' },
                ],
                transferCode:[
                    { required: true, message: '请输入传输规则', trigger: 'blur' },
                    { max: 11, message: '长度最长11位', trigger: 'blur' },
                ],
                transferCycle:[
                    { required: true, message: '请输入传输周期', trigger: 'blur' },
                    { max: 11, message: '长度最长11位', trigger: 'blur' },
                ],
                clientHBeat:[
                    { required: true, message: '请输入模块心跳', trigger: 'blur' },
                    { max: 11, message: '长度最长11位', trigger: 'blur' },
                ],
                devHBeat:[
                    { required: true, message: '请输入设备心跳', trigger: 'blur' },
                    { max: 11, message: '长度最长11位', trigger: 'blur' },
                ],
           },
       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){

                     this.$api.post('/accessConfigTemplate/saveOrUpdateEntity', this.form_info, r => {
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