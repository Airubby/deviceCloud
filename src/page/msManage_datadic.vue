<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">数据字典管理</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination type="remote"
                url="/sysDic/list"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                 @selection-change="handleSelectionChange" ref="thisRef">    
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>                                          
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                     <template slot-scope="scope" slot="vaild">
                        <div>
                            <span v-if="scope.row.vaild==true||scope.row.vaild=='true'">有效</span>
                            <span v-else>无效</span>
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
                        <el-button type="info" plain size="mini" @click="start">启用</el-button>
                        <el-button type="info" plain size="mini" @click="stop">停用</el-button>
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
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           search_info:'',
           table_data:[
                // {id:'1',name:'小张',code:'编码',remark:'12313123',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey', label: '' ,placeholder:'名称/编码'},
                ]
            },
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'remark', label: '备注',minWidth:100},
              { prop: 'vaild', label: '是否有效',slotName:'vaild',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //勾选框
          multipleSelection:[],

       }
   },
    methods:{
        //获取列表
        getList:function(){
            //获取字典列表
            // this.$api.post('/sysDic/list', {}, r => {
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
		    	 this.$api.post('/sysDic/batchUpdateState', {"ids":thisID,"action":9}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //启用
       start:function(){
            var ids=[];
            if(this.multipleSelection.length>0){
                ids=this.multipleSelection;
            }else{
                this.$message.warning("请勾选需要启用的项");
                return;
            }
            this.$confirm("确定启用?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
		    	 this.$api.post('/sysDic/batchUpdateState', {"ids":thisID,"action":1}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getList();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //停用
       stop:function(){
            var ids=[];
            if(this.multipleSelection.length>0){
                ids=this.multipleSelection;
            }else{
                this.$message.warning("请勾选需要停用的项");
                return;
            }
            this.$confirm("确定停用?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
		    	 this.$api.post('/sysDic/batchUpdateState', {"ids":thisID,"action":0}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getList();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //编辑
       edit:function(row){
            this.$router.push({path:'/msManage/datadicManage/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/datadicManage/add'});
       },

    },
    components:{}
}
</script>