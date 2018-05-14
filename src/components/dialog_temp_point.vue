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
                    <h2 style="height: 40px;line-height:30px;">触发告警条件</h2>
                    <el-transfer
                    v-model="form_info.eventActionRuleIds"
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
                    <h2 style="height: 40px;line-height:40px;">解除告警条件</h2>
                    <el-transfer
                    v-model="form_info.eventRemoveRuleIds"
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
                        this.form_info[item]=r.data[item];
                    }
                    
                    this.form_info.eventActionRuleIds==this.form_info.eventActionRuleIds.split(",");
                    this.form_info.eventRemoveRuleIds==this.form_info.eventRemoveRuleIds.split(",");
                }
            }); 
        }
    },
    mounted() {
        
    },
    data() {
    //     const generateData = _ => {
    //     const data = [];
    //     for (let i = 1; i <= 15; i++) {
    //       data.push({
    //         id: i,
    //         name: `备选项 ${ i }`,
    //       });
    //     }
    //     return data;
    //   };
        return {
            //值类型：
            valueType_data:[],
            //抖动类型：
            shakeType_data:[],
            writeType_data:[],  //写类型
            readType_data:[],  //写类型
            unit_data:[], //单位
            form_info:{
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
               eventActionRuleIds:[],
               eventRemoveRuleIds:[],
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
                eventActionRuleIds:[
                    { type:'array',required: true, message: '请选择', trigger: 'change' },
                ],
                eventRemoveRuleIds:[
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
            this.$api.post('/sysDic/list', {} ,r => {
                 console.log(r)
                if(r.success){
                    for(var i=0;i<r.data.length;i++){
                        if(r.data[i].code=="POINT_VALUETYPE"){  //值类型
                            this.valueType_data=r.data[i].itemSet;
                        }
                        if(r.data[i].code=="POINT_SHAKETYPE"){  //抖动类型
                            this.shakeType_data=r.data[i].itemSet;
                        }
                        if(r.data[i].code=="POINT_WRITETYPE"){  //写类型
                            this.writeType_data=r.data[i].itemSet;
                        }
                        if(r.data[i].code=="POINT_READTYPE"){  //读类型
                            this.readType_data=r.data[i].itemSet;
                        }
                        if(r.data[i].code=="POINT_UNIT"){  //单位
                            this.unit_data=r.data[i].itemSet;
                        }
                    }
                    
                }else{
                    this.$message.warning(r.msg);
                }
            });
        },
        //获取触发告警条件
        getDatay:function(){
             this.$api.post('/eventRuleTemplate/list', {"action":1}, r => {
                 console.log(r)
                if(r.success){
                    this.transfer_datay=r.data;
                }else{
                    this.$message.warning(r.msg);
                }
            });
        },
        //获取解除告警条件
        getDatan:function(){
            this.$api.post('/eventRuleTemplate/list', {"action":0}, r => {
                 console.log(r)
                if(r.success){
                    this.transfer_datan=r.data;
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
                    this.form_info.eventActionRuleIds=this.form_info.eventActionRuleIds.toString();
                    this.form_info.eventRemoveRuleIds=this.form_info.eventRemoveRuleIds.toString();
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
        console.log(value, direction, movedKeys);
      }

    },
    props:["dialogInfo"],
    components:{dialogBtnInfo}
}
</script>

