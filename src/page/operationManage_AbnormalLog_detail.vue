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
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                名称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.typeName" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.typeCode" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                系统编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.sysCode" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                发生时间：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input v-model="form_info.createTime" :disabled="true" size="small"></el-input>
                            </div>
                        </div>
                        <div>
                            <h2 class="loncom_mb10">日志内容：</h2>
                            <el-input type="textarea" v-model="form_info.content" :disabled="true" size="small"></el-input>
                        </div>
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
        this.$api.post('/errLog/getErrLog', {id:obj.id}, r => {
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
               typeName:'',
               typeCode:'',
               sysCode:'',
               createTime:'',
               content:'',
           },
       }
   },
    methods:{
    },
    components:{noSubmitBtnInfo}
}
</script>