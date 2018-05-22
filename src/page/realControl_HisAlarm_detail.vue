<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">告警历史数据详情</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    告警历史数据详情
                </div>
                <div class="loncom_public_add_con">
                    <div class="loncom_public_add_form">
                        <el-table :data="table_data" border style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table :data="props.row.logs" border>
                                    <el-table-column label="创建时间" prop="createTime"></el-table-column>
                                    <el-table-column label="事件等级" prop="eventAction"></el-table-column>
                                    <el-table-column label="occurValue" prop="occurValue"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column label="名称" prop="name"></el-table-column>
                        <el-table-column label="设备名称" prop="devName"></el-table-column>
                        <el-table-column label="所在城市" prop="cityName"></el-table-column>
                        <el-table-column label="所属工程" prop="projectName"></el-table-column>
                        <el-table-column label="设备编码" prop="devCode"></el-table-column>
                        <el-table-column label="所属工程" prop="projectName"></el-table-column>
                    </el-table>
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
        this.form_info.id=obj.id;
    },
    mounted() {
        scrollCon();
        this.getData();
        
    },
    data() {
       return {
           typelist:[],
           form_info:{
                id:''
           },
           table_data:[],

       }
   },
    methods:{
        getData:function(){
            this.$api.post('/eventlog/get',this.form_info,r => { 
                console.log(r)
                if(r.success){
                    this.table_data.push(r.data)
                }else{this.$message.warning(r.msg);}
            });
        },
       //
       

    },
    components:{noSubmitBtnInfo}
}
</script>