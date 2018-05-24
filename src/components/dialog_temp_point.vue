<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo">
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
                        <em>*</em>序号：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="serialNO">
                            <el-input size="small" placeholder="" v-model="form_info.serialNO"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>值类型：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="valueType">
                            <el-select v-model="form_info.valueType" placeholder="请选择">
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
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>偏移量：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="offSet">
                            <el-input size="small" placeholder="" v-model="form_info.offSet"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>单位：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="unit">
                            <el-select v-model="form_info.unit" placeholder="请选择">
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
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>读标志：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="readFlag">
                            <el-select v-model="form_info.readFlag" placeholder="请选择">
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
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>写标志：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="writeFlag">
                            <el-select v-model="form_info.writeFlag" placeholder="请选择">
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
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>状态字：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="enumDic">
                            <el-input size="small" placeholder="格式,[0,高压;1,低压]" v-model="form_info.enumDic"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>最大有效值：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="maxVaild">
                            <el-input size="small" placeholder="" v-model="form_info.maxVaild"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>最小有效值：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="minVaild">
                            <el-input size="small" placeholder="" v-model="form_info.minVaild"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>抖动类型：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="shakeType">
                            <el-select v-model="form_info.shakeType" placeholder="请选择">
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
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>抖动值：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="shakeValue">
                            <el-input size="small" placeholder="" v-model="form_info.shakeValue"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>计算最大值：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="cmax">
                            <el-select v-model="form_info.cmax" placeholder="请选择">
                                <el-option :value="true" label="是"></el-option>
                                <el-option :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>计算最小值：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="cmin">
                            <el-select v-model="form_info.cmin" placeholder="请选择">
                                <el-option :value="true" label="是"></el-option>
                                <el-option :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>计算平均值：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="cavg">
                            <el-select v-model="form_info.cavg" placeholder="请选择">
                                <el-option :value="true" label="是"></el-option>
                                <el-option :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>计算增量：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="cincr">
                            <el-select v-model="form_info.cincr" placeholder="请选择">
                                <el-option :value="true" label="是"></el-option>
                                <el-option :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div style="margin:0 auto;width:560px;">
                    <h2 style="height: 40px;line-height:30px;">
                        <span class="loncom_fl">触发告警条件</span>
                        <div class="loncom_fr" style="width: 100px;">
                            <el-form-item prop="triggerRules">
                                <el-input size="small" placeholder="" v-model="form_info.triggerRules" style="display:none;float:right:width:100px;"></el-input>
                            </el-form-item>
                        </div>
                    </h2>
                    
                    <el-transfer
                    v-model="form_info.triggerRules"
                    filterable
                    :props="{
                    key: 'id',
                    }"
                    :render-content="renderFunc"
                    :titles="['条件选择', '触发告警条件']"
                    :button-texts="['移出', '选择']"
                    :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                    }"
                    @change="handleChange"
                    :data="transfer_datay">
                    </el-transfer>
                </div>
                <div style="margin:0 auto;width:560px;">
                    <h2 style="height: 40px;line-height:40px;">
                        <span class="loncom_fl">解除告警条件</span>
                        <div class="loncom_fr" style="width: 100px;">
                            <el-form-item prop="noTriggerRules">
                                <el-input size="small" placeholder="" v-model="form_info.noTriggerRules" style="display:none;float:right:width:100px;"></el-input>
                            </el-form-item>
                        </div>
                    </h2>
                    
                    <el-transfer
                    v-model="form_info.noTriggerRules"
                    filterable
                    :props="{
                    key: 'id',
                    }"
                    :render-content="renderFunc"
                    :titles="['条件选择', '解除告警条件']"
                    :button-texts="['移出', '选择']"
                    :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                    }"
                    @change="handleChange"
                    :data="transfer_datan">
                    </el-transfer>
                </div>
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

        if(!this.dialogInfo.add){  //编辑
            this.$api.post('/pointTemplate/getById', {id:this.dialogInfo.data.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        // if(item=='triggerRules'){
                        //     this.form_info.triggerRules=r.data.triggerRules.split(",");
                        // }else if(item=='noTriggerRules'){
                        //     this.form_info.noTriggerRules=r.data.noTriggerRules.split(",");
                        // }else{
                        //     this.form_info[item]=r.data[item];
                        // }
                        this.form_info[item]=r.data[item];
                    }
                    
                    this.form_info.triggerRules=this.form_info.triggerRules.split(",");
                    this.form_info.noTriggerRules=this.form_info.noTriggerRules.split(",");
                }
            }); 
        }
    },
    mounted() {
        
    },
    data() {
        return {
            //值类型：
            valueType_data:[],
            //抖动类型：
            shakeType_data:[],
            writeType_data:[],  //写类型
            readType_data:[],  //写类型
            unit_data:[], //单位
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
               triggerRules:[],
               noTriggerRules:[],
           },
           formRules:{
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
                offSet:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                writeFlag:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                readFlag:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                unit:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                enumDic:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                maxVaild:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                minVaild:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                shakeValue:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                shakeType:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                cmax:[
                    { required: true, message: '请输入', trigger: 'change' },
                ],
                cmin:[
                    { required: true, message: '请输入', trigger: 'change' },
                ],
                cavg:[
                    { required: true, message: '请输入', trigger: 'change' },
                ],
                cincr:[
                    { required: true, message: '请输入', trigger: 'change' },
                ],
                triggerRules:[
                    { type:'array',required: true, message: '请选择', trigger: 'change' },
                ],
                noTriggerRules:[
                    { type:'array',required: true, message: '请选择', trigger: 'change' },
                ],
           },
            //源数据
            transfer_datay: [],
            transfer_datan: [],
            renderFunc(h, option) {
                return <span>{ option.name }</span>;
            }

        }
    },
    methods:{
        
        //获取类型
        getType:function(){
            this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_VALUETYPE'},r => { //值类型
                if(r.success){
                    this.valueType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_SHAKETYPE'},r => { //抖动类型
                if(r.success){
                    this.shakeType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_WRITETYPE'},r => { //写类型
                if(r.success){
                    this.writeType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_READTYPE'},r => { //读类型
                if(r.success){
                    this.readType_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
            this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_UNIT'},r => { //单位
                if(r.success){
                    this.unit_data=r.data;
                }else{this.$message.warning(r.msg);}
            });
        },
        //获取触发告警条件
        getDatay:function(){
             this.$api.post('/eventrule/getRulesByAction', {"action":1}, r => {
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
            this.$api.post('/eventrule/getRulesByAction', {"action":0}, r => {
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
                    // var _form_info=Object.assign({}, this.form_info)
                    this.form_info.typeTempId=this.dialogInfo.typeTempId;
                    this.form_info.triggerRules=this.form_info.triggerRules.toString();
                    this.form_info.noTriggerRules=this.form_info.noTriggerRules.toString();
                    this.$api.post('/pointTemplate/saveOrUpdateEntity', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.transfer_datan=r.data;
                            this.dialogInfo.visible=false;
                            this.$parent.getList();
                        }else{
                            this.$message.warning(r.msg);
                        }
                    });
                }
            })
        },
        handleChange(value, direction, movedKeys) {
            // console.log(this.form_info.triggerRules)
            // console.log(this.form_info.noTriggerRules)
            // console.log(value, direction, movedKeys);
        }

    },
    props:["dialogInfo"],
    components:{dialogBtnInfo}
}
</script>

