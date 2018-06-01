<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    客户名称：
                </div>
                <div class="loncom_list_box_right">
                    <el-input size="small" v-model="form_info.name" :disabled="true"></el-input>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    客户全称：
                </div>
                <div class="loncom_list_box_right">
                    <el-input size="small" v-model="form_info.fullName" :disabled="true"></el-input>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    客户编码：
                </div>
                <div class="loncom_list_box_right">
                    <el-input size="small" v-model="form_info.code" :disabled="true"></el-input>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    联系人：
                </div>
                <div class="loncom_list_box_right">
                    <el-input size="small" v-model="form_info.contacts" :disabled="true"></el-input>
                </div>
            </div>
            <div class="loncom_list_boxform">
                <div class="loncom_list_box_left">
                    联系电话：
                </div>
                <div class="loncom_list_box_right">
                    <el-input size="small" v-model="form_info.phoneNo" :disabled="true"></el-input>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    created () {
        this.$api.post('/gitMap/custInfo', {projectId:this.dialogInfo.projectId}, r => {
            console.log(r)
            if(r.success){
                this.form_info=r.data;
            }
        });
    },
    mounted() {
        
    },
    data() {
        return {
           form_info:{
               name:'',
               fullName:'',
               code:'',
               contacts:'',
               phoneNo:'',
           }

        }
    },
    methods:{
        
       

    },
    props:["dialogInfo"],
    components:{}
}
</script>

