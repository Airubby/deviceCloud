<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备类型模板管理</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="loncom_public_filter loncom_mtb20">
                    <div class="loncom_filter_group">
                        <el-input placeholder="编号/名称" v-model="search_info" size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
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
                    <!--
                        <el-button type="info" plain size="mini" @click="start">启用</el-button>
                        <el-button type="info" plain size="mini" @click="stop">停用</el-button>
                        -->
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
           search_info:'',
           table_data:[
                // {name:'123',code:'123',vaild:true}
           ],
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
            //   { prop: 'vaild', label: '是否有效',slotName:'vaild',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //勾选的信息
          multipleSelection:[],


       }
   },
    methods:{
        //获取设备类型模板
        getList:function(){
            this.$api.post('/typeTemplate/list', {}, r => {
                console.log(r)
                if(r.success){
                    this.table_data=r.data;
                }
            }); 
        },
        //勾选框角色
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
		    	 this.$api.post('/typeTemplate/batchUpdateState', {"ids":thisID,"action":9}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getList();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //启用
    //    start:function(){
    //        var ids=[];
    //         if(this.multipleSelection.length>0){
    //             ids=this.multipleSelection;
    //         }else{
    //             this.$message.warning("请勾选需要启用的项");
    //             return;
    //         }
    //         this.$confirm("确定启用?", '提示', {
	//         confirmButtonText: '确定',
	//         cancelButtonText: '取消',
    //         type:'warning',
	//         }).then(() => {
    //             var thisID=ids.toString();
	// 	    	 this.$api.post('/typeTemplate/batchUpdateState', {"ids":thisID,"action":1}, r => {
	// 	       		if(r.success){
    //                     this.$message.success(r.msg);
    //                     this.getList();
	// 	       		}else{
    //                     this.$message.warning(r.msg);
    //                 }
	// 	       	});
	          
	//       });
    //    },
    //    //停用
    //    stop:function(){
    //         var ids=[];
    //         if(this.multipleSelection.length>0){
    //             ids=this.multipleSelection;
    //         }else{
    //             this.$message.warning("请勾选需要停用的项");
    //             return;
    //         }
    //         this.$confirm("确定停用?", '提示', {
	//         confirmButtonText: '确定',
	//         cancelButtonText: '取消',
    //         type:'warning',
	//         }).then(() => {
    //             var thisID=ids.toString();
	// 	    	 this.$api.post('/typeTemplate/batchUpdateState', {"ids":thisID,"action":0}, r => {
	// 	       		if(r.success){
    //                     this.$message.success(r.msg);
    //                     this.getList();
	// 	       		}else{
    //                     this.$message.warning(r.msg);
    //                 }
	// 	       	});
	          
	//       });
    //    },
       //编辑
       edit:function(row){
            this.$router.push({path:'/templateManage/deviceTypeTemp/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/templateManage/deviceTypeTemp/add'});
       },

    },
    components:{}
}
</script>