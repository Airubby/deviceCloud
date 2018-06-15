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
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form loncom_add_form">
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
                                <em>*</em>采集周期(秒)：
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
                                    <el-select v-model="form_info.transferCode" placeholder="请输入传输规则" size="small">
                                        <el-option
                                        v-for="item in transferCode_data"
                                        :key="item.code"
                                        :label="item.label"
                                        :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>传输周期(秒)：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="transferCycle">
                                    <el-input size="small" placeholder="请输入传输周期" v-model="form_info.transferCycle"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>模块心跳周期(秒)：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="clientHBeat">
                                    <el-input size="small" placeholder="请输入模块心跳" v-model="form_info.clientHBeat"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>设备心跳周期(秒)：
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
                if(r.success){
                    for (var item in this.form_info){
                        if(item=="transferCode"){
                            this.form_info[item]=(r.data[item]).toString();
                        }else{
                            this.form_info[item]=r.data[item]; 
                        }
                    }
                }
            }); 
        }

        
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'TRANS_CODE'},r => { //传输规则
            if(r.success){
                this.transferCode_data=r.data;
            }else{this.$message.warning(r.msg);}
        });
        

    },
    mounted() {
        scrollCon();
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('不能为空'));
            } else {
                var re=/^[0-9]*$/; 
                if (!re.test(parseInt(value))) {
                    callback(new Error('请输入整数数字'));
                }else if(parseInt(value)>86400){
                    callback(new Error('最大值为86400'));
                } 
                callback();
            }
       };
       return {
           //新增编辑控制器头部显示
           topInfo:'',
           transferCode_data:[],  //传输规则
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
                    { validator: validatePass, trigger: 'blur' }
                ],
                transferCode:[
                    { required: true, message: '请输入传输规则', trigger: 'blur' },
                ],
                transferCycle:[
                    { required: true, message: '请输入传输周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                clientHBeat:[
                    { required: true, message: '请输入模块心跳周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                devHBeat:[
                    { required: true, message: '请输入设备心跳周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
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
                    console.log(typeof(this.form_info.transferCode) )
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