<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备类型模板 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    设备类型模板信息
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
                                <em>*</em>模板编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="code">
                                    <el-input size="small" placeholder="请输入设备模板编码" v-model="form_info.code"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>是否可用：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.isVaild">
                                    <el-radio label="true">可用</el-radio>
                                    <el-radio label="false">不可用</el-radio>
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
            this.topInfo="新增设备类型模板信息";
        }else{
            this.topInfo="编辑设备类型模板信息"
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