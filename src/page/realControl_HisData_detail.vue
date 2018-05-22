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
                                <el-select v-model="form_info.type" size="small" placeholder="请选择测点规整类型">
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
        var obj = this.$route.query;
        this.forms.queryKey1=obj.id;
        this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'POINT_REGULARTYPE'},r => { //测点规整类型
            console.log(r)
            if(r.success){
                this.typelist=r.data
            }else{this.$message.warning(r.msg);}
        });
    },
    mounted() {
        scrollCon();
        this.getData();
        
    },
    data() {
       return {
           typelist:[],
           forms:{
               queryKey1:'',
               queryKey2:'',
               t1:'',
               t2:'',
           },
           form_info:{
                datetime:'',
                type:'',
           },
           

       }
   },
    methods:{
        getData:function(){
            this.$api.post('/hisdata/getPointHis',this.forms,r => { 
                console.log(r)
                if(r.success){
                    var xData=[];
                    var yData=[];
                    for(var i=0;i<r.list.length;i++){
                        xData.push(r.list[i][0])
                        yData.push(r.list[i][1])
                    }
                    echartLine("echartLine",xData,yData)
                }else{this.$message.warning(r.msg);}
            });
        },
       //
       onSubmit:function(){
           if(this.form_info.datetime!=''&&this.form_info.datetime!=null&&this.form_info.datetime.length>0){
               this.forms.t1=this.form_info.datetime[0].Format("yyyy-MM-dd hh:mm:ss")
               this.forms.t2=this.form_info.datetime[1].Format("yyyy-MM-dd hh:mm:ss")
               this.forms.queryKey2=this.form_info.type
           }else{
               this.forms.t1='';
               this.forms.t2='';
               this.forms.queryKey2='';
           }
           this.getData();
       },

    },
    components:{noSubmitBtnInfo}
}
</script>