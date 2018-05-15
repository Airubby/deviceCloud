<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">接入网关 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    网关信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>序列号：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="sno">
                                    <el-input size="small" placeholder="请输入序列号" v-model="form_info.sno"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                名称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="name">
                                    <el-input size="small" placeholder="请输入名称" v-model="form_info.name"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="code">
                                    <el-input size="small" placeholder="请输入编码" v-model="form_info.code"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                所属项目：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="projectId">
                                    <el-select v-model="form_info.projectId" placeholder="请选择">
                                        <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                采集控制模板：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="configId">
                                    <el-select v-model="form_info.configId" placeholder="请选择">
                                        <el-option v-for="item in configList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                是否启用：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.state">
                                    <el-radio label="1">启用</el-radio>
                                    <el-radio label="0">停用</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                采集模块直连：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="isDirect">
                                    <el-select v-model="form_info.isDirect" placeholder="请选择">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                处理数据抖动：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="handleShake">
                                    <el-select v-model="form_info.handleShake" placeholder="请选择">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                维护告警：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="handleEvent">
                                    <el-select v-model="form_info.handleEvent" placeholder="请选择">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
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
        //获项目
        this.$api.post('/project/list', {}, r => {
            console.log(r)
            if(r.success){
                this.projectList=r.list;
            }
        }); 
        //采集控制模板：
        this.$api.post('/accessConfigTemplate/list', {}, r => {
            console.log(r)
            if(r.success){
                this.configList=r.list;
            }
        }); 
        
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增网关信息";
        }else{
            this.topInfo="编辑网关信息"
            this.$api.post('', {id:obj.id}, r => {
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
           //项目信息
           projectList:[],
           //采集控制模板信息
           configList:[],
           form_info:{
               id:'',
               sno:'',
               name:'',
               code:'',
               projectId:'',
               configId:'',
               state:'1',
               isDirect:'',
               handleShake:'',
               handleEvent:'',
           },
           formRules:{
                sno:[
                    { required: true, message: '请输入序列号', trigger: 'blur' },
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
                    this.$api.post('', this.form_info, r => {
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