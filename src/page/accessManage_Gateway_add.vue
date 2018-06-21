<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">接入模块 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    模块信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                        <el-row>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>模块序列号：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="sno">
                                            <el-input size="small" placeholder="请输入模块序列号" v-model="form_info.sno"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        模块编码：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="code">
                                            <el-input size="small" placeholder="请输入模块编码" v-model="form_info.code"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        模块名称：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="name">
                                            <el-input size="small" placeholder="请输入模块名称" v-model="form_info.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>所属项目：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="projectId">
                                            <el-select v-model="form_info.projectId" placeholder="请选择" size="small">
                                                <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12" v-if="hide">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>采集控制模板：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="configId">
                                            <el-select v-model="form_info.configId" placeholder="请选择" size="small">
                                                <el-option v-for="item in configList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <div v-if="!hide">
                                <el-col :span="12">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>采集周期(秒)：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="config.collectCycle">
                                                <el-input size="small" placeholder="采集周期以秒为单位" v-model="form_info.config.collectCycle"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>

                                </el-col>
                                <el-col :span="12">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>传输规则：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="config.transferCode">
                                                <el-select v-model="form_info.config.transferCode" placeholder="请输入传输规则" size="small">
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
                                </el-col>
                                <el-col :span="12">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>传输周期(秒)：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="config.transferCycle">
                                                <el-input size="small" placeholder="请输入传输周期" v-model="form_info.config.transferCycle"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>模块心跳周期(秒)：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="config.clientHBeat">
                                                <el-input size="small" placeholder="请输入模块心跳" v-model="form_info.config.clientHBeat"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>设备心跳周期(秒)：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="config.devHBeat">
                                                <el-input size="small" placeholder="请输入模块心跳" v-model="form_info.config.devHBeat"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </el-col>
                            </div>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        是否启用：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-radio-group v-model="form_info.state" size="small">
                                            <el-radio :label="1">启用</el-radio>
                                            <el-radio :label="0">停用</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        采集模块直连：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="directConnect">
                                            <el-select v-model="form_info.directConnect" placeholder="请选择" size="small">
                                                <el-option label="" value=""></el-option>
                                                <el-option label="是" :value="true"></el-option>
                                                <el-option label="否" :value="false"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        处理数据抖动：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="handleShake">
                                            <el-select v-model="form_info.handleShake" placeholder="请选择" size="small">
                                                <el-option label="" value=""></el-option>
                                                <el-option label="是" :value="true"></el-option>
                                                <el-option label="否" :value="false"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        维护告警：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="handleEvent">
                                            <el-select v-model="form_info.handleEvent" placeholder="请选择" size="small">
                                                <el-option label="" value=""></el-option>
                                                <el-option label="是" :value="true"></el-option>
                                                <el-option label="否" :value="false"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <h2 class="loncom_mtb20">接入设备：</h2>
                        <el-search-table-pagination type="local"  
                        :show-pagination="true" border :data="table_data" :columns="table_columns">    
                            <template slot-scope="scope" slot="preview-state">
                                <span v-if="scope.row.state==1||scope.row.state=='1'">启用</span>
                                <span v-else>停用</span>
                            </template>
                        </el-search-table-pagination>
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
        this.$api.post('/accessConfigTemplate/getSelect', {}, r => {
            console.log(r)
            if(r.success){
                this.configList=r.data;
            }
        }); 
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'TRANS_CODE'},r => { //传输规则
            if(r.success){
                this.transferCode_data=r.data;
            }else{this.$message.warning(r.msg);}
        });
        
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增网关信息";
        }else{
            this.topInfo="编辑网关信息"
            this.hide=false;
            this.$api.post('/module/get', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    this.table_data=r.data.devList;  //接入设备 
                    console.log(r.data.configId)
                    for(var item in this.form_info){
                        if(item=="config"){
                            for(var intem in this.form_info.config){
                                if(intem=="transferCode"){
                                    this.form_info.config[intem]=(r.data[item][intem]).toString();
                                }else{
                                    this.form_info.config[intem]=r.data[item][intem];
                                }
                                
                            }
                        }else{
                            this.form_info[item]=r.data[item];    
                        }
                        
                    } 
                }
            }); 
        }
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
           //项目信息
           projectList:[],
           transferCode_data:[],  //传输规则
           //采集控制模板信息
           configList:[],
           hide:true,
           form_info:{
               id:'',
               sno:'',
               name:'',
               code:'',
               projectId:'',
               configId:'',  //
               config:{
                    id:'',
                    acTemplId:'',
                    clientHBeat:'',
                    collectCycle:'',
                    devHBeat:'',
                    transferCode:'',
                    transferCycle:'',
               },
               state:1,
               directConnect:'',
               handleShake:'',
               handleEvent:'',
           },
           formRules:{
                sno:[
                    { required: true, message: '请输入模块序列号', trigger: 'blur' },
                ],
                projectId:[
                    { required: true, message: '请选择项目', trigger: 'change' },
                ],
                configId:[
                    { required: true, message: '请选择采集控制模板', trigger: 'change' },
                ],
                'config.collectCycle':[
                    { required: true, message: '请输入采集周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                'config.transferCode':[
                    { required: true, message: '请输入传输规则', trigger: 'blur' },
                ],
                'config.transferCycle':[
                    { required: true, message: '请输入传输周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                'config.clientHBeat':[
                    { required: true, message: '请输入模块心跳周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                'config.devHBeat':[
                    { required: true, message: '请输入设备心跳周期', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
           },

           table_data:[],
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'state', label: '状态',slotName:'preview-state',minWidth:100},
          ],


       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log(this.form_info)
                    this.$api.post('/module/save', this.form_info, r => {
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