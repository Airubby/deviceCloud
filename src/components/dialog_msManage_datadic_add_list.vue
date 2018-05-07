<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:400px;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
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
                        <em>*</em>是否有效：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-radio-group v-model="form_info.isVaild">
                            <el-radio :label="true">有效</el-radio>
                            <el-radio :label="false">无效</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        备注：
                    </div>
                    <div class="loncom_list_box_right">
                        <el-input type="textarea" v-model="form_info.remark"></el-input>
                    </div>
                    
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
        return {
            form_info:{
                id:'',
               label:'',
               code:'',
               remark:'',
               isVaild:true,
               dicId:dialogInfo.dicId,
           },
           formRules:{
                label:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
           },
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
                    this.$api.post('', form_info, r => {
                        if(r.success){
                            this.$message.success(r.msg);
                            this.dialogInfo.visible=false;
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
        },

    },
    props:["dialogInfo"],
    components:{dialogBtnInfo}
}
</script>

