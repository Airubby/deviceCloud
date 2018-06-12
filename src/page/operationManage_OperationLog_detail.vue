<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">系统异常日志详情</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    异常日志详情
                </div>
                <div class="loncom_public_add_con">
                    <div class="loncom_public_add_form">
                        <el-row>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                用户ID：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.userId" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                用户名：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.userName" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                业务类：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.actionName" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                业务方法：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.methodName" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                业务逻辑：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.opName" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                请求路径：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.requestUri" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                请求时间：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.createTime" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        </el-col>
                        <el-col :span="12">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                日志内容：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input type="textarea" v-model="form_info.remark" :disabled="true" size="small"></el-input>
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
        this.$api.post('/optLog/getOptLog', {id:obj.id}, r => {
            console.log(r)
            if(r.success){
                for(var item in this.form_info){
                    this.form_info[item]=r.data[item];    
                } 
            }
        }); 
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           form_info:{
               id:'',
               userId:'',
               userName:'',
               actionName:'',
               methodName:'',
               opName:'',
               requestUri:'',
               createTime:'',
               remark:'',
           },
       }
   },
    methods:{
    },
    components:{noSubmitBtnInfo}
}
</script>