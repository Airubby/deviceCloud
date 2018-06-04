<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:250px;overflow:auto;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    客户名称：
                </div>
                <div class="loncom_list_box_right">
                    <el-input size="small" v-model="dialogInfo.username" :disabled="true"></el-input>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    原密码：
                </div>
                <div class="loncom_list_box_right">
                    <el-form-item prop="oldPwd">
                        <el-input size="small" placeholder="" v-model="form_info.oldPwd" type="password"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                   新密码：
                </div>
                <div class="loncom_list_box_right">
                    <el-form-item prop="newPwd">
                        <el-input size="small" placeholder="" v-model="form_info.newPwd" type="password"></el-input>
                    </el-form-item>
                </div>
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
        
    },
    mounted() {
        
    },
    data() {
        return {
           form_info:{
               userId:'',
               oldPwd:'',
               newPwd:'',
           },
           formRules:{
                oldPwd:[
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                ],
                newPwd:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
           },

        }
    },
    methods:{
        //保存的操作
        dialogSure:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    
                    this.form_info.userId=this.dialogInfo.id;
                    this.form_info.oldPwd= b64_md5(this.form_info.oldPwd);
                    this.form_info.newPwd=b64_md5(this.form_info.newPwd);
                    console.log(this.form_info)
                    this.$api.post('/user/updatePwd', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.$message.success(r.msg);
                            this.dialogInfo.visible=false;
                            this.$router.push({path:'/login'});
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

