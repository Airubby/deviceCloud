<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">事件规则模板</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination type="remote" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                url="/eventrule/list"
                list-field="list" 
                total-field="total"
                method='post' 
                @resultData="resultInfo"
                :formOptions="table_forms"
                @selection-change="handleSelectionChange" ref="thisRef" > 
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>                                          
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                     <template slot-scope="scope" slot="preview-alarmType">
                        <div v-for="item in alarm_data">
                            <span v-if="item.code==scope.row.alarmType">{{item.label}}</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-action">
                        <div>
                            <span v-if="scope.row.action==1">触发告警</span>
                            <span v-else-if="scope.row.action==0">解除告警</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <div>
                            <p>
                                <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                                <em>|</em> 
                                <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                            </p>
                        </div>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button type="info" plain size="mini" @click="del">删除</el-button>
                    </div>
                </el-search-table-pagination>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created () {
        //this.getList();
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'ALARMACTION_TYPE'},r => { //告警类型
            console.log(r.data)
            if(r.success){
                this.alarm_data=r.data;
            }else{this.$message.warning(r.msg);}
        });
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           alarm_data:[], //告警类型
           table_data:[
                // {id:'1',name:'小张',vara1:'12',opta:'true'}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey', label: '',placeholder:'名称' },
                ]
            },
           table_columns:[
              { prop: 'name', label: '模板名称',minWidth:150},
              { prop: 'alarmType', label: '告警类型',minWidth:100,slotName:'preview-alarmType'},
              { prop: 'desc', label: '事件规则',minWidth:300},
              { prop: 'action', label: '事件动作',minWidth:100,slotName:'preview-action'},
              { prop: 'eventLibName', label: '事件库',minWidth:100},
              { prop: 'eventLevelName', label: '事件等级',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //勾选信息
          multipleSelection:[],

       }
   },
    methods:{
        getList:function(){
            // this.$api.post('/eventRuleTemplate/list', {}, r => {
            //     console.log(r)
            //     if(r.success){
            //         this.table_data=r.data;
            //     }
            // }); 
        },
         //勾选框
        handleSelectionChange:function(val){
            this.multipleSelection=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
       //删除
       del:function(row){
            var ids=[];
            if(row!=undefined&&row.id!=undefined){ //单条删除
               ids.push(row.id);
           }else{  //多条删除
                if(this.multipleSelection.length>0){
                    ids=this.multipleSelection;
                }else{
                    this.$message.warning("请勾选需要删除的项");
                    return;
                }
           }

           this.$confirm("确定删除?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/eventrule/delete', {"ids":thisID}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       
       //编辑
       edit:function(row){
            this.$router.push({path:'/templateManage/eventRule/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/templateManage/eventRule/add'});
       },

    },
    components:{}
}
</script>