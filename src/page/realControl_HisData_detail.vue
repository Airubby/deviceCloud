<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备历史数据详情</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    设备历史数据详情
                </div>
                <div class="loncom_public_add_con">
                    <div class="loncom_public_add_form">
                        <el-form :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-date-picker
                                v-model="form_info.datetime"
                                size="small"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="form_info.type" size="small" placeholder="请选择">
                                    <el-option
                                    v-for="item in typelist"
                                    :key="item.code"
                                    :label="item.label"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="hisDataecharts" id="echartLine"></div>
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
        this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_REGULARTYPE'},r => { //测点规整类型
            console.log(r)
            if(r.success){
                this.typelist=r.data
            }else{this.$message.warning(r.msg);}
        });
    },
    mounted() {
        scrollCon();
        var xData=["one",'two','three'];
        var yData=['1','33','10'];
        echartLine("echartLine",xData,yData)
    },
    data() {
       return {
           typelist:[],
           form_info:{
                datetime:'',
                type:'',
           },
           

       }
   },
    methods:{
       //
       onSubmit:function(){
            
       },

    },
    components:{noSubmitBtnInfo}
}
</script>