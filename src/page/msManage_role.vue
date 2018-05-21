<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">角色管理</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="msManage_table">
                    <div class="loncom_public_table numScroll1">
                        <div class="numScrollCon1">
                        <el-search-table-pagination  type="remote"
                url="/role/roleList"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                            @selection-change="handleSelectionChange" @cell-click="handleCellChange" ref="thisRef">   
                            <div class="form_add">
                                <span class="loncom_color_main">提示：给角色赋权限时，需要同时勾选角色和权限点击保存！</span>
                                <el-button type="primary" size="small" @click="save">保存</el-button>
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
                <div class="msManage_tree">
                    <div class="msManage_tree_title">
                        权限选择
                    </div>
                    <div class="msManage_tree_con numScroll0">
                        <el-tree
                        ref="tree"
                        :props="defaultProps"
                        :data="tree_data"
                        show-checkbox
                        node-key="id"
                        class="numScrollCon0"
                        >
                        </el-tree>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created () {
        //this.getList();
        this.getTree();

    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           table_data:[
                // {id:'1',code:'234',name:'234',remark:'小明'},
                // {id:'2',code:'234',name:'34',remark:'小明'},
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey', label: '', placeholder:'名称/编号'},
                ]
            },
           table_columns:[
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'remark', label: '备注',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //存角色勾选的id
          multipleSelection:[],
          tree_data: [],
          defaultProps: {
                children: 'subMenu',
                label: 'name'
            },

       }
   },
    methods:{
         //获取角色列表信息
        getList:function(){
            // this.$api.post('/role/roleList', {}, r => {
            //     console.log(r)
            //     if(r.success){
            //         this.table_data=r.data;
            //     }
            // }); 
        },
        //获取权限树
        getTree:function(){
            this.tree_data=[];
            this.$api.post('/menu/getById', {id:1}, r => {
                if(r.success){
                    this.tree_data.push(r.data);
                }
            }); 
        },
        //勾选框角色
        handleSelectionChange:function(val){
            this.multipleSelection=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
        //点击单元行，获取角色拥有的权限
        handleCellChange:function(row){
            console.log(row)
            this.$api.post('/role/getById', {"id":row.id}, r => {
                console.log(r)
                var ids=[];
                for(var i=0;i<r.data.menus.length;i++){
                    ids.push(r.data.menus[i].id);
                }
                if(r.success){
                    this.$refs.tree.setCheckedKeys(ids)
                }else{
                    this.$message.warning(r.msg);
                }
            }); 
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
		    	 this.$api.post('/role/batchDelete', {"ids":thisID}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
                        this.getTree();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },
       
       //编辑
       edit:function(row){
            this.$router.push({path:'/msManage/roleManage/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/roleManage/add'});
       },
       //保存
       save:function(){
            if(this.multipleSelection.length>0){
                var treeSelect=this.$refs.tree.getCheckedNodes();
                console.log(treeSelect)
                var treeID=[];
                for(var i=0;i<treeSelect.length;i++){
                    treeID.push(treeSelect[i].id);
                }
                if(treeSelect.length>0){
                    console.log(this.multipleSelection.toString())
                    console.log(treeID.toString())
                    this.$api.post('/role/batchUpdateRoleMenu', {"ids":this.multipleSelection.toString(),"menuIds":treeID.toString()}, r => {
                        if(r.success){
                            this.$message.success(r.msg);
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }else{
                    this.$message.warning("请勾选权限");
                    return;
                }
            }else{
                this.$message.warning("请勾选角色");
                return;
            }
       },

    },
    components:{}
}
</script>