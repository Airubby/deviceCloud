<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">系统消息日志详情</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    消息日志详情
                </div>
                <div class="loncom_public_add_con">
                    <div class="loncom_public_add_form">
                        <el-row>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                项目名称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.projectName" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                邮件地址：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.addr" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                标题：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.title" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                称谓：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.appellation" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                发送时间：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.sendTime" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                状态：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.state" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                类型：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.bizType" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                业务主键：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.bizKey" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                发送通道：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.channelType" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                消息内容：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input type="textarea" v-model="form_info.content" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        </el-row>
                    </div>
                </div>
                <noSubmitBtnInfo></noSubmitBtnInfo>
            </div>
        </div>
    </div>
</template>

<script>
import noSubmitBtnInfo from '../components/nosubmitBtnInfo.vue'
export default {

    created () {
        var obj = this.$route.query;
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'MSG_STATE'},r => { //消息通知状态
            if(r.success){
                this.msg_data=r.data;
            }else{this.$message.warning(r.msg);}
        });
        this.$api.post('/msgLog/getMsgLog', {id:obj.id}, r => {
            if(r.success){
                for(var item in this.form_info){
                    if(item=="sendTime"){
                        this.form_info[item]=(new Date(r.data[item]).Format("yyyy-MM-dd hh:mm:ss"))
                    }else if(item=="state"){
                        for(var i=0;i<this.msg_data.length;i++){
                            if(r.data[item]==this.msg_data[i].code){
                                this.form_info[item]=this.msg_data[i].label;
                                continue;
                            }
                        }
                        
                    }else{
                        this.form_info[item]=r.data[item];    
                    }
                    
                } 
            }
        }); 
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           msg_data:[],
           form_info:{
               id:'',
               projectName:'',
               addr:'',
               title:'',
               appellation:'',
               sendTime:'',
               state:'',
               bizType:'',
               bizKey:'',
               channelType:'',
               content:'',
           },
       }
   },
    methods:{
    },
    components:{noSubmitBtnInfo}
}
</script>