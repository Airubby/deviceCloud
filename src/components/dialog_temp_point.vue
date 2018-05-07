<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo">
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>名称：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="label">
                            <el-input size="small" placeholder="请输入名称" v-model="form_info.label"></el-input>
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
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                            <el-input size="small" placeholder="" v-model="form_info.unit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>读标志：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="readFlag">
                            <el-input size="small" placeholder="1可读，0不可读" v-model="form_info.readFlag"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>写标志：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="writeFlag">
                            <el-input size="small" placeholder="1可写，0不可写" v-model="form_info.writeFlag"></el-input>
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
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                                <el-option label="true">是</el-option>
                                <el-option label="false">否</el-option>
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
                                <el-option label="true">是</el-option>
                                <el-option label="false">否</el-option>
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
                                <el-option label="true">是</el-option>
                                <el-option label="false">否</el-option>
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
                                <el-option label="true">是</el-option>
                                <el-option label="false">否</el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div style="margin:0 auto;width:560px;">
                    <h2 style="height: 40px;line-height:30px;">触发告警条件</h2>
                    <el-transfer
                    v-model="transfer_value"
                    filterable
                    :render-content="renderFunc"
                    :titles="['条件选择', '触发告警条件']"
                    :button-texts="['移出条件', '选择条件']"
                    :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                    }"
                    @change="handleChange"
                    :data="transfer_data">
                    </el-transfer>
                </div>
                <div style="margin:0 auto;width:560px;">
                    <h2 style="height: 40px;line-height:40px;">解除告警条件</h2>
                    <el-transfer
                    v-model="transfer_value"
                    filterable
                    :render-content="renderFunc"
                    :titles="['条件选择', '解除告警条件']"
                    :button-texts="['移出条件', '选择条件']"
                    :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                    }"
                    @change="handleChange"
                    :data="transfer_data">
                    </el-transfer>
                </div>
            </el-form>
        </div>
        <dialogBtnInfo v-bind:dialogInfo="dialogInfo" v-on:dialogSure="dialogSure('formInfo')"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from './dialogBtnInfo.vue'
export default {
    created () {
        
    },
    mounted() {
        
    },
    data() {
        const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            name: `备选项 ${ i }`,
          });
        }
        return data;
      };
        return {
            //值类型：
            valueType_data:[],

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
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
           },

            transfer_data: generateData(),
            transfer_value: [1],
            renderFunc(h, option) {
            return <span>{ option.key } - { option.name }</span>;
            }

        }
    },
    methods:{
      
        //保存的操作
        dialogSure:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.dialogInfo.add){  //新增

                    }else{  //编辑

                    }
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

