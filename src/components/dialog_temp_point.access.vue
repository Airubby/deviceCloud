<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:450px;overflow:auto;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo">
                <el-row>
                    <el-col :span="12">
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
                    </el-col>
                    <el-col :span="12">
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
                    </el-col>
                    <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>序号：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="serialNO">
                                    <el-input size="small" placeholder="" v-model="form_info.serialNO"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>值类型：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="valueType">
                                    <el-select v-model="form_info.valueType" placeholder="请选择" size="small">
                                        <el-option
                                        v-for="item in valueType_data"
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
                                <em>*</em>读标志：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="readFlag">
                                    <el-select v-model="form_info.readFlag" placeholder="请选择" size="small">
                                        <el-option
                                        v-for="item in readType_data"
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
                                <em>*</em>写标志：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="writeFlag">
                                    <el-select v-model="form_info.writeFlag" placeholder="请选择" size="small">
                                        <el-option
                                        v-for="item in writeType_data"
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
                                单位：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="unit">
                                    <el-select v-model="form_info.unit" placeholder="请选择" size="small">
                                        <el-option
                                        v-for="item in unit_data"
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
                                <em>*</em>日志存储策略：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="storePolicy">
                                    <el-select v-model="form_info.storePolicy" placeholder="请选择" size="small">
                                        <el-option
                                        v-for="item in store_data"
                                        :key="item.code"
                                        :label="item.label"
                                        :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <div v-if="form_info.valueType=='float'">
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    偏移量：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="offSet">
                                        <el-input size="small" placeholder="" v-model="form_info.offSet"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                    </div>
                    <div v-if="form_info.valueType=='int' || form_info.valueType=='float'">
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    最大有效值：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="maxVaild">
                                        <el-input size="small" placeholder="" v-model="form_info.maxVaild"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    最小有效值：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="minVaild">
                                        <el-input size="small" placeholder="" v-model="form_info.minVaild"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    抖动类型：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="shakeType">
                                        <el-select v-model="form_info.shakeType" placeholder="请选择" size="small">
                                            <el-option
                                            v-for="item in shakeType_data"
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
                                    抖动值：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="shakeValue">
                                        <el-input size="small" placeholder="" v-model="form_info.shakeValue"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    计算最大值：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="cmax">
                                        <el-select v-model="form_info.cmax" placeholder="请选择" size="small">
                                            <el-option value="" label=""></el-option>
                                            <el-option :value="true" label="是"></el-option>
                                            <el-option :value="false" label="否"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    计算最小值：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="cmin">
                                        <el-select v-model="form_info.cmin" placeholder="请选择" size="small">
                                            <el-option value="" label=""></el-option>
                                            <el-option :value="true" label="是"></el-option>
                                            <el-option :value="false" label="否"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    计算平均值：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="cavg">
                                        <el-select v-model="form_info.cavg" placeholder="请选择" size="small">
                                            <el-option value="" label=""></el-option>
                                            <el-option :value="true" label="是"></el-option>
                                            <el-option :value="false" label="否"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    计算增量：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="cincr">
                                        <el-select v-model="form_info.cincr" placeholder="请选择" size="small">
                                            <el-option value="" label=""></el-option>
                                            <el-option :value="true" label="是"></el-option>
                                            <el-option :value="false" label="否"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    <em>*</em>动作类型：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="actionType">
                                        <el-select v-model="form_info.actionType" placeholder="请选择" size="small">
                                            <el-option
                                            v-for="item in action_data_alarm"
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
                                    <em>*</em>告警类型：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="alarmType">
                                        <el-select v-model="form_info.alarmType" placeholder="请选择" size="small">
                                            <el-option
                                            v-for="item in alarm_data_thr"
                                            :key="item.code"
                                            :label="item.label"
                                            :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                    </div>
                    <div v-if="form_info.valueType=='enum'">
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    状态字：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="enumDic">
                                        <el-input size="small" placeholder="0,高压;1,低压;" v-model="form_info.enumDic"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    <em>*</em>动作类型：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="actionType">
                                        <el-select v-model="form_info.actionType" placeholder="请选择" size="small">
                                            <el-option
                                            v-for="item in action_data"
                                            :key="item.code"
                                            :label="item.label"
                                            :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                        <div v-if="form_info.actionType=='alarm'">
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>告警类型：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="alarmType">
                                            <el-select v-model="form_info.alarmType" placeholder="请选择" size="small">
                                                <el-option
                                                v-for="item in alarm_data_thr"
                                                :key="item.code"
                                                :label="item.label"
                                                :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                        <div v-if="form_info.actionType=='timelength'">
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>统计目标值：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="timingTarget">
                                            <el-input size="small" v-model="form_info.timingTarget"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>统计值：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="timingTotal">
                                            <el-input size="small" v-model="form_info.timingTotal"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </div>
                    <div v-if="form_info.valueType=='bits'">
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    <em>*</em>动作类型：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="actionType">
                                        <el-select v-model="form_info.actionType" placeholder="请选择" size="small">
                                            <el-option
                                            v-for="item in action_data_alarm"
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
                                    <em>*</em>告警类型：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="alarmType">
                                        <el-select v-model="form_info.alarmType" placeholder="请选择" size="small">
                                            <el-option
                                            v-for="item in alarm_data_bits"
                                            :key="item.code"
                                            :label="item.label"
                                            :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                    </div>
                    <el-col :span="12">
                        <div class="loncom_list_box_left">
                            备注：
                        </div>
                        <div class="loncom_list_box_right">
                            <el-input type="textarea" v-model="form_info.remark"></el-input>
                        </div>
                    </el-col>
                    
                </el-row>
            </el-form>
        </div>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogInfo" v-on:dialogSure="dialogSure('formInfo')"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from './dialogBtnInfo.vue'
export default {
    created () {
        this.getType();
        this.getDatay();
        this.getDatan();
        if(this.dialogInfo.add){
            this.change_info=true;
        }else{ //编辑
            this.$api.post('/device/getDevicePointInfoById', {pointId:this.dialogInfo.data.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        if(item=='readFlag'||item=='writeFlag'){
                            this.form_info[item]=(r.data[item]).toString();
                        }else{
                            this.form_info[item]=r.data[item];
                        }
                        //this.form_info[item]=r.data[item];
                    }
                    
                }
            }); 
        }
    },
    mounted() {
        var _this=this;
        setTimeout(function(){
            _this.change_info=true;
        },2000)
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value != '') {
                var re=/(([\u4e00-\u9fa5\w]{1,})([,，]{1})([\u4e00-\u9fa5\w]{1,})([;；]{1})){1,}/;
                console.log(re.test(value))
                if (!re.test(value)) {
                    callback(new Error('请输入正确的格式'));
                }
                callback();
            }
       };
        return {
            //
            change_info:false,  //初始化后，给一定时间才让watch中的切换生效
            //值类型：
            valueType_data:[],
            //抖动类型：
            shakeType_data:[],
            writeType_data:[],  //写类型
            readType_data:[],  //写类型
            unit_data:[], //单位
            action_data:[],  //测点动作类型
            action_data_alarm:[],  //测点动作类型-告警
            action_data_timelength:[],  //测点动作类型-timelength
            alarm_data:[], //事件触发类型
            alarm_data_bits:[],  //事件触发类型-bits
            alarm_data_thr:[],  //事件触发类型-thr
            store_data:[],//日志存储策略：
            
            form_info:{
               typeTempId:'',
               id:'',
               name:'',
               code:'',
               serialNO:'',
               valueType:'',
               offSet:'',
               writeFlag:'',
               readFlag:'',
               unit:'',
               enumDic:'',
               maxVaild:'',
               minVaild:'',
               shakeValue:'',
               shakeType:'',
               cmax:'',
               cmin:'',
               cavg:'',
               cincr:'',
               actionType:'', //动作类型
               alarmType:'',  //告警类型
               storePolicy:'',  //日志存储策略：
               timingTarget:'',  // 统计目标值
               timingTotal:'',  //统计值
               remark:'',  
           },
           formRules:{
               enumDic:[
                   { validator: validatePass, trigger: 'blur' }
                ],
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
                serialNO:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                valueType:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                writeFlag:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                readFlag:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                storePolicy:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                actionType:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                alarmType:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                timingTarget:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                timingTotal:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
               
           },
            //源数据
            transfer_datay: [],
            transfer_datan: [],
            renderFunc(h, option) {
                return <span>{ option.name }</span>;
            },
            filterMethod(query, item) {
                return item.name.indexOf(query) > -1;
            }

        }
    },
    methods:{
        
        //获取类型
        getType:function(){
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'POINT_VALUETYPE'},r => { //值类型
                console.log(r.data)
                if(r.success){
                    this.valueType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'POINT_SHAKETYPE'},r => { //抖动类型
                if(r.success){
                    this.shakeType_data=r.data;
                    this.shakeType_data.unshift({code:'',label:''});
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'POINT_WRITETYPE'},r => { //写类型
                if(r.success){
                    this.writeType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'POINT_READTYPE'},r => { //读类型
                if(r.success){
                    this.readType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'POINT_UNIT'},r => { //单位
                console.log(r.data)
                if(r.success){
                    this.unit_data=r.data;
                    this.unit_data.unshift({code:'',label:''});
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'PSTORE_POLICY'},r => { //日志存储策略
                if(r.success){
                    this.store_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'PACTION_TYPE'},r => { //测点动作类型
                console.log(r.data)
                if(r.success){
                    this.action_data=r.data;
                    for(var i=0;i<r.data.length;i++){
                        if(r.data[i].code=="timelength"){
                            this.action_data_timelength.push(r.data[i])
                        }else if(r.data[i].code=="alarm"){
                            this.action_data_alarm.push(r.data[i])
                        }
                    }
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/comm/getDicItemByDicCode',{dicCode:'ALARMACTION_TYPE'},r => { //告警类型
                console.log(r.data)
                if(r.success){
                    this.alarm_data=r.data;
                    for(var i=0;i<r.data.length;i++){
                        if(r.data[i].code=="thr"){
                            this.alarm_data_thr.push(r.data[i])
                        }else if(r.data[i].code=="bits"){
                            this.alarm_data_bits.push(r.data[i])
                        }
                    }
                }else{this.$message.warning(r.msg);}
            });
        },
        //获取触发告警条件
        getDatay:function(){
             this.$api.post('/eventrule/getRulesByAction', {"action":1,"alarmType":this.form_info.alarmType}, r => {
                 console.log(r)
                if(r.success){
                    this.transfer_datay=r.list;
                }else{
                    this.$message.warning(r.msg);
                }
            });
        },
        //获取解除告警条件
        getDatan:function(){
            this.$api.post('/eventrule/getRulesByAction', {"action":0,"alarmType":this.form_info.alarmType}, r => {
                 console.log(r)
                if(r.success){
                    this.transfer_datan=r.list;
                }else{
                    this.$message.warning(r.msg);
                }
            });
        },
        //保存的操作
        dialogSure:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log(this.form_info)
                    //var _form_info=Object.assign({}, this.form_info)
                    this.form_info.typeTempId=this.dialogInfo.typeTempId;
                    this.$api.post('/device/updateDevPoint', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.transfer_datan=r.data;
                            this.dialogInfo.visible=false;
                            this.$message.success(r.msg);
                            this.$parent.getList();
                        }else{
                            this.$message.warning(r.msg);
                        }
                    });
                }
            })
        },

    },
    watch:{
        'form_info.valueType':function(val,oldval){
            if(this.change_info){
                this.form_info.actionType='';
                this.form_info.alarmType="";
            }
        },
        'form_info.actionType':function(val,oldval){
            if(this.change_info){
                this.form_info.alarmType="";
            }
        },
    },
    props:["dialogInfo"],
    components:{dialogBtnInfo}
}
</script>

