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
                        <el-button type="primary" size="small" @click="clear" class="loncom_fr loncom_mb10">手动解除</el-button>     
                        <el-table :data="table_data" border style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table :data="props.row.logs" border>
                                    <el-table-column label="发生时间" prop="occurTime">
                                        <template slot-scope="prop">
                                            {{new Date(prop.row.occurTime).Format('yyyy-MM-dd hh:mm:ss')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事件等级" prop="eventLevel">
                                        <template slot-scope="prop">
                                            <div v-for="item in eventLevel">
                                                <span v-if="item.code==prop.row.eventLevel">{{item.label}}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="读数" prop="occurValue"></el-table-column>
                                    <el-table-column label="触发条件" prop="conds"></el-table-column>
                                    <el-table-column label="事件动作" prop="eventAction">
                                        <template slot-scope="prop">
                                            <div v-for="item in eventAction">
                                                <span v-if="item.code==prop.row.eventAction">{{item.label}}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>       
                        <el-table-column label="所属工程" prop="projectName"></el-table-column>
                        <el-table-column label="设备名称" prop="devName"></el-table-column>
                        <el-table-column label="测点名称" prop="pointName"></el-table-column>
                        <el-table-column label="事件名称" prop="name"></el-table-column>
                        <el-table-column label="最高等级" prop="topLevelName"></el-table-column>
                        <el-table-column label="触发时间" prop="occurTime">
                            <template slot-scope="prop">
                                {{new Date(prop.row.occurTime).Format('yyyy-MM-dd hh:mm:ss')}}
                            </template>
                        </el-table-column>
                        <el-table-column label="解除时间" prop="removeTime">
                            <template slot-scope="prop">
                                <span v-if="prop.row.removeTime">
                                    {{new Date(prop.row.removeTime).Format('yyyy-MM-dd hh:mm:ss')}}
                                </span>
                            </template>
                        </el-table-column>   
                                      
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

        //获取事件等级
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'EVENT_LEVEL'},r => { 
            console.log(r)
            if(r.success){
                this.eventLevel=r.data;
            }else{this.$message.warning(r.msg);}
        });
        //事件动作
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'EVENT_ACTION'},r => { 
            console.log(r)
            if(r.success){
                this.eventAction=r.data;
            }else{this.$message.warning(r.msg);}
        });
    },
    mounted() {
        scrollCon();
        this.getData();
        
    },
    data() {
       return {
           //事件等级
           eventLevel:[],
           //事件动作
           eventAction:[],
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
                    this.table_data=[];
                    this.table_data.push(r.data)
                }else{this.$message.warning(r.msg);}
            });
        },
       //
       clear:function(){
            this.$confirm("确定手动解除吗?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
		    	 this.$api.post('/eventlog/removeEvent', {"ids":this.form_info.id}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getData()
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
            
       },


    },
    components:{noSubmitBtnInfo}
}
</script>