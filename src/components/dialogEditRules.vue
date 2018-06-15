<template>
    <el-dialog :title="dialogRulesInfo.title" :visible.sync="dialogRulesInfo.visible" :width="dialogRulesInfo.width" :append-to-body='true'>
        <div class="loncom_dialog_con loncom_public_add_con" style="height:420px;overflow:auto;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                <el-row>
                    <el-col :span="12">
                    <div class="loncom_list_boxform">
                        <div class="loncom_list_box_left">
                            <em>*</em>事件名称：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-form-item prop="name">
                                <el-input size="small" placeholder="请输入名称" v-model="form_info.name"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    </el-col>
                    <el-col :span="12">
                    <div class="loncom_list_boxform">
                        <div class="loncom_list_box_left">
                            <em>*</em>告警触发类型：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-form-item prop="alarmType">
                                <el-select v-model="form_info.alarmType" placeholder="告警触发类型" size="small">
                                    <el-option
                                    v-for="item in alarm_type"
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
                            <em>*</em>触发事件：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-form-item prop="eventLibName">
                                <el-input size="small" @focus="triggerEvents" placeholder="触发事件" v-model="form_info.eventLibName" suffix-icon="el-icon-tickets" readonly></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    </el-col>
                    <el-col :span="12">
                    <div class="loncom_list_boxform">
                        <div class="loncom_list_box_left">
                            <em>*</em>事件等级：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-form-item prop="eventLevel">
                                <el-select v-model="form_info.eventLevel" placeholder="事件等级" size="small">
                                    <el-option
                                    v-for="item in event_level"
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
                            <em>*</em>事件动作：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-form-item prop="action">
                                <el-select v-model="form_info.action" placeholder="事件动作" size="small">
                                    <el-option :value="1" label="触发告警"></el-option>
                                    <el-option :value="0" label="解除告警"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    </el-col>
                    <div v-if="form_info.alarmType=='bits'">
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>比特位：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="bitIndex">
                                    <el-input size="small" placeholder="请输入位置" v-model="form_info.bitIndex"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>比特值：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="vara2">
                                    <el-input size="small" placeholder="请输入比特值" v-model="form_info.vara2"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        </el-col>
                    </div>
                    <div v-if="form_info.alarmType=='thr'">
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>自定义表达式：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.useFel">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        </el-col>
                    </div>
                </el-row>
                <div v-if="form_info.alarmType=='thr'">
                    
                    <div v-if="!form_info.useFel">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>采集值：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="vara1">
                                            <el-select v-model="form_info.vara1" placeholder="请选择" size="small">
                                                <el-option value="oldvalue" label="上次采集值"></el-option>
                                                <el-option value="newvalue" label="当前采集值"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>运算符：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="opta">
                                            <el-select v-model="form_info.opta" placeholder="请选择" size="small">
                                                <el-option value=">" label=">"></el-option>
                                                <el-option value="<" label="<"></el-option>
                                                <el-option value=">=" label=">="></el-option>
                                                <el-option value="<=" label="<="></el-option>
                                                <el-option value="==" label="=="></el-option>
                                                <el-option value="!=" label="!="></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>采集值：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="vara2">
                                            <el-autocomplete
                                            class="inline-input"
                                            v-model="form_info.vara2"
                                            :fetch-suggestions="querySearch"
                                            placeholder="请输入或选择内容"
                                                size="small"
                                                style="width:100%"
                                            ></el-autocomplete>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div style="padding-top: 60px;text-align:center;">
                                    <el-form-item prop="optc">
                                        <el-select v-model="form_info.optc" placeholder="请选择" size="small">
                                            <el-option value="||" label="||"></el-option>
                                            <el-option value="&&" label="&&"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        采集值：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="varb1">
                                            <el-select v-model="form_info.varb1" placeholder="请选择" size="small">
                                                <el-option value="" label=""></el-option>
                                                <el-option value="oldvalue" label="上次采集值"></el-option>
                                                <el-option value="newvalue" label="当前采集值"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        运算符：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="optb">
                                            <el-select v-model="form_info.optb" placeholder="请选择" size="small">
                                                <el-option value=">" label=">"></el-option>
                                                <el-option value="<" label="<"></el-option>
                                                <el-option value=">=" label=">="></el-option>
                                                <el-option value="<=" label="<="></el-option>
                                                <el-option value="==" label="=="></el-option>
                                                <el-option value="!=" label="!="></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        采集值：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="varb2">
                                            <el-autocomplete
                                            class="inline-input"
                                            v-model="form_info.varb2"
                                            :fetch-suggestions="querySearch"
                                            placeholder="请输入或选择内容"
                                                size="small"
                                                style="width:100%"
                                            ></el-autocomplete>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                
                    <div class="loncom_list_boxform loncom_add_form" v-if="form_info.useFel">
                        <div class="loncom_list_box_left">
                            <em>*</em>自定义表达式：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-input type="textarea" v-model="form_info.fel"></el-input>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogRulesInfo" v-on:dialogSure="dialogSure('formInfo')"></dialogBtnInfo>
        <dialogTriggerEvents v-bind:dialogRulesInfo="dialogrules_Info" v-if="dialogrules_Info.visible"></dialogTriggerEvents>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from './dialogBtnInfo.vue'
import dialogTriggerEvents from './dialogTriggerEvents.vue'
export default {
    created () {
        this.getELevel();
        this.getAlarmType();
        if(this.dialogRulesInfo.id!=''){ //编辑
            this.$api.post('/device/getRule',{id:this.dialogRulesInfo.id},r => { //获取测点事件规则
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        if(item=="eventLevel"){
                            this.form_info[item]=(r.data[item]).toString();
                        }else{
                            this.form_info[item]=r.data[item]
                        }
                    }
                }else{this.$message.warning(r.msg);}
            });
        }else{ //新增
            this.form_info.pointId=this.dialogRulesInfo.pointId;
        }
        
    },
    mounted() {
        
    },
    data() {
        return {
            form_info:{
               id:'',
               pointId:'',
               name:'',
               useFel:false,
               vara1:'',
               opta:'',
               vara2:'',
               optc:'',
               varb1:'',
               optb:'',
               varb2:'',
               action:'',
               eventLibId:'',
               eventLibName:'',
               eventLevel:'',
               fel:'',
               alarmType:'',
               bitIndex:'',
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                vara1:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                opta:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                vara2:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                action:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                eventLibName:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                eventLevel:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                alarmType:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                bitIndex:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
           },
           //事件等级
           event_level:[],
           //告警触发类型
           alarm_type:[],
           //触发事件
           dialogrules_Info:{
                title:'触发事件选择',
                visible:false,
                width:'800px',
                eventLibId:'',
                eventLibName:'',
           },
           //输入框带提示选择
           restaurants:[{label:'newvalue',value:'当前采集值'},{label:'oldvalue',value:'上次采集值'}],

        }
    },
    methods:{
         //输入框带提示选择   
        querySearch:function(queryString, cb) {
            cb(this.restaurants);
        },
        //事件等级
        getELevel:function(){
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'EVENT_LEVEL'},r => { 
                console.log(r)
                if(r.success){
                    this.event_level=r.data;
                }else{this.$message.warning(r.msg);}
            }); 
        },
        //告警触发类型
        getAlarmType:function(){
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'ALARMACTION_TYPE'},r => { 
                console.log(r)
                if(r.success){
                    this.alarm_type=r.data;
                }else{this.$message.warning(r.msg);}
            }); 
        },
         //触发事件弹窗
       triggerEvents:function(){
            this.dialogrules_Info.visible=true;
       },
       //提交
       dialogSure:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.form_info.alarmType=='thr'){
                        if(this.form_info.varb2=="当前采集值"){
                            this.form_info.varb2="newvalue"
                        }else if(this.form_info.varb2=="上次采集值"){
                            this.form_info.varb2="oldvalue"
                        }
                        if(this.form_info.vara2=="当前采集值"){
                            this.form_info.vara2="newvalue"
                        }else if(this.form_info.vara2=="上次采集值"){
                            this.form_info.vara2="oldvalue"
                        }
                    }
                    this.$api.post('/device/saveEventRule', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.dialogRulesInfo.visible=false;
                            this.$message.success(r.msg);
                            this.$parent.$parent.getList();
                            this.$parent.$parent.getList1();
                            
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
       },

    },
    watch:{
        'dialogrules_Info.eventLibId':function(val,oldval){
            this.form_info.eventLibId=this.dialogrules_Info.eventLibId;
            this.form_info.eventLibName=this.dialogrules_Info.eventLibName;
        },
    },
    props:["dialogRulesInfo"],
    components:{dialogBtnInfo,dialogTriggerEvents}

}
</script>

