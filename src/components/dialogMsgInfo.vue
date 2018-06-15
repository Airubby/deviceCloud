<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:300px;overflow:auto;">
            <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    <em>*</em>称谓：
                </div>
                <div class="loncom_list_box_right">
                    <el-form-item prop="appellation">
                        <el-input size="small" placeholder="请输入称谓" v-model="form_info.appellation"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    <em>*</em>接收地址：
                </div>
                <div class="loncom_list_box_right">
                    <el-form-item prop="addr">
                        <el-input size="small" placeholder="请输入接收地址" v-model="form_info.addr"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    <em>*</em>通道类型：
                </div>
                <div class="loncom_list_box_right">
                    <el-form-item prop="msgChannel">
                        <el-select v-model="form_info.msgChannel" placeholder="请输入通道类型" size="small">
                            <el-option
                            v-for="item in msg_type"
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
                    <em>*</em>是否启用：
                </div>
                <div class="loncom_list_box_right">
                    <el-radio-group v-model="form_info.vaild">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
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
        this.form_info.projectId=this.dialogInfo.projectId;
        if(this.dialogInfo.id!=""){
            this.$api.post('/msgReceiveAddr/get', {id:this.dialogInfo.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        this.form_info[item]=r.data[item]
                    }
                }else{this.$message.warning(r.msg);}
            }); 
        }
        //消息通道类型
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'MSG_CHANNELTYPE'},r => { 
            console.log(r)
            if(r.success){
                this.msg_type=r.data;
            }else{this.$message.warning(r.msg);}
        }); 


    },
    mounted() {
        
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value != '') { 
                var re=/(\w+@\w+([-]\w+)*(\.\w+)+)|(1[3578]\d{9})/;
                if (!re.test(value)) {
                    callback(new Error('请输入邮箱格式或手机号'));
                }
                callback();
            }
        };
        return {
            msg_type:[],
           form_info:{
               id:'',
               projectId:'',
               appellation:'',
               addr:'',
               msgChannel:'',
               vaild:true,
           },
           formRules:{
                appellation:[
                    { required: true, message: '请输入称谓', trigger: 'blur' },
                ],
                addr:[
                    { required: true, message: '请输入接收地址', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
                msgChannel:[
                    { required: true, message: '请输入通道类型', trigger: 'blur' },
                ],
           },

        }
    },
    methods:{
        //提交
       dialogSure:function(formName){
           console.log(this.form_info)
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$api.post('/msgReceiveAddr/saveUpdate', this.form_info, r => {
                        console.log(r)
                        if(r.success){
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
    props:["dialogInfo"],
    components:{dialogBtnInfo}
}
</script>

