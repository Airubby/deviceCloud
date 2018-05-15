<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">权限管理</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="msManage_tree">
                    <div class="msManage_tree_title">
                        权限选择
                    </div>
                    <div class="msManage_tree_con numScroll0">
                        <el-tree
                        ref="tree"
                        :props="defaultProps"
                        :data="tree_data"
                        node-key="id"
                        @node-click="nodeClick"
                        class="numScrollCon0"
                        >
                        </el-tree>
                    </div>
                </div>
                <div class="msManage_table">
                    <div class="loncom_public_table numScroll1">
                        <div class="numScrollCon1">
                        <el-search-table-pagination type="local" 
                        :formOptions="table_forms" :show-pagination="false" border :data="table_data" :columns="table_columns" >     
                            <div class="form_add">
                                <el-button type="primary" size="small" @click="add">新增</el-button>
                            </div>                                                   
                            <el-table-column slot="prepend" type="selection"></el-table-column>
                            <template slot-scope="scope" slot="preview-handle">
                                <div>
                                    <p v-if="treeId=='1'">
                                        <a href="javascript:;" style="color:#999">编辑</a> 
                                        <em>|</em> 
                                        <a href="javascript:;" style="color:#999">删除</a>
                                    </p>
                                    <p v-else>
                                        <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                                        <em>|</em> 
                                        <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                                    </p>
                                </div>
                            </template>
                        </el-search-table-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.el-form-item{
    height:40px;
}
.el-form-item__content{
    display:none;
}
</style>
<script>

export default {
    created () {
        //获取权限树
        this.getTree(); 
    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           table_data:[
                // {id:'1',code:'12',url:'11232131',name:'小明'},
           ],
           table_forms: {
            forms: []
           },
           table_columns:[
              { prop: 'code', label: 'code',minWidth:100},
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'url', label: 'url',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
            ],

            tree_data: [],
            defaultProps: {
                children: 'subMenu',
                label: 'name'
            },

            //存树形id，新增用
            treeId:'',

       }
   },
    methods:{
        //获取权限树
        getTree:function(){
            this.$api.post('/menu/getById', {id:1,parentOrSub:'parent'}, r => {
                console.log(r)
                if(r.success){
                    this.tree_data.push(r.data);
                }
            });
        },
        //点击树形节点
        nodeClick:function(node){
            console.log(node)
            this.table_data=[];
            this.treeId=node.id;
            this.$api.post('/menu/getById', {"id":node.id}, r => {
                console.log(r)
                if(r.success){
                    this.table_data.push(r.data);
                }
            }); 
        },
       //删除
       del:function(row){
            var ids=[];
            if(JSON.stringify(row)!='{}'&&row.id){ //单条删除
               ids.push(row.id);
           }
           this.$confirm("确定删除?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/menu/batchUpdateUserState', {"ids":thisID,"action":9}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getTree();
                        this.table_data=[];
                        this.treeId="";
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //编辑
       edit:function(row){
            this.$router.push({path:'/msManage/limitsManage/add',query:{id:row.id}});
       },
       //新增
       add:function(){
           if(this.treeId!=""){
                this.$router.push({path:'/msManage/limitsManage/add',query:{treeId:this.treeId}});
           }else{
                this.$message.warning("请选择需要添加的到的树形节点");
           }
            
       },

    },
    components:{}
}
</script>