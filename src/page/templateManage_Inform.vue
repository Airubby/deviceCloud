<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">消息模板</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination type="remote"
                 url="/msgTemplate/list"
                list-field="list" 
                total-field="total"
                method='post' 
                @resultData="resultInfo"
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                @selection-change="handleSelectionChange" ref="thisRef">                                           
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>      
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                   
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
        
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           table_data:[
                // {id:'1',name:'小张',collectCycle:'12',transferCode:'123',transferCycle:'12321',clientHBeat:'124',devHBeat:'123'}
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
              { prop: 'name', label: '名称',minWidth:50},
              { prop: 'title', label: '标题',minWidth:100},
              { prop: 'occurContent', label: '发生告警',minWidth:150},
              { prop: 'upContent', label: '告警升级',minWidth:150},
              { prop: 'downContent', label: '告警降级',minWidth:150},
              { prop: 'removeContent', label: '解除告警',minWidth:150},
              { prop: 'confirmContent', label: '确认告警',minWidth:150},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //勾选信息
          multipleSelection:[],
       }
   },
    methods:{
        //勾选框角色
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
		    	 this.$api.post('/msgTemplate/delete', {"ids":thisID}, r => {
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
            this.$router.push({path:'/templateManage/inform/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/templateManage/inform/add'});
       },
    },
    components:{}
}
</script>