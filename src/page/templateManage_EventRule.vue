<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">事件规则模板</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="loncom_public_filter loncom_mtb20">
                    <div class="loncom_fr">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>
                </div>
                <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                @selection-change="handleSelectionChange" >                                           
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
        this.getList();
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           table_data:[
                // {id:'1',name:'小张',vara1:'12',opta:'true'}
           ],
           table_columns:[
              { prop: 'name', label: '模板名称',minWidth:100},
              { prop: 'vara1', label: '值',minWidth:100},
              { prop: 'opta', label: '运算符',minWidth:100},
              { prop: 'vara2', label: '值',minWidth:100},
              { prop: 'optc', label: '逻辑符',minWidth:100},
              { prop: 'varb1', label: '值',minWidth:100},
              { prop: 'optb', label: '运算符',minWidth:100},
              { prop: 'varb2', label: '值',minWidth:100},
              { prop: 'action', label: '',minWidth:100},
              { prop: 'useFel', label: '是否使用自定义',minWidth:100},
              { prop: 'fel', label: '自定义',minWidth:100},
              { prop: 'eventLibId', label: '事件库id',minWidth:100},
              { prop: 'eventLevel', label: '事件等级',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //勾选信息
          multipleSelection:[],

       }
   },
    methods:{
        getList:function(){
            this.$api.post('/eventRuleTemplate/list', {}, r => {
                console.log(r)
                if(r.success){
                    this.table_data=r.data;
                }
            }); 
        },
         //勾选框
        handleSelectionChange:function(val){
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
       //删除
       del:function(row){
            var ids=[];
            if(JSON.stringify(row)!='{}'&&row.id){ //单条删除
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
		    	 this.$api.post('/eventRuleTemplate/deleteEntity', {"ids":thisID,"action":9}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
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