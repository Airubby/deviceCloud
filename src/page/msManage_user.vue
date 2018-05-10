<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">用户管理</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="loncom_public_filter loncom_mtb20">
                    <div class="loncom_fr">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>
                </div>
                <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns"
                 @selection-change="handleSelectionChange">                                           
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    
                     <template slot-scope="scope" slot="preview-roles">
                        <div>
                            <span v-for="(item,index) in scope.row.roles">
                                <em v-if="index=='0'">{{item.name}}</em>
                                <em v-else>，{{item.name}}</em>
                            </span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-vaild">
                        <div>
                            <span v-if="scope.row.vaild==true||scope.row.vaild=='true'">启用</span>
                            <span v-else>停用</span>
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
        this.getList();
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           table_data:[
                // {id:'1',name:'小张',email:'admin.qq.com',phoneNo:'小明',custName:'xiaoxiao',roleNames:'管理员',vaild:'123'},
                // {id:'2',name:'小张',email:'admin.qq.com',phoneNo:'小明',custName:'xiaoxiao',roleNames:'管理员',vaild:'123'}
           ],
           table_columns:[
              { prop: 'name', label: '用户名',minWidth:100},
              { prop: 'email', label: '邮箱',minWidth:100},
              { prop: 'phoneNo', label: '电话',minWidth:100},
              { prop: 'custName', label: '所属客户',minWidth:100},
              { prop: 'roles', label: '角色',minWidth:100,slotName:'preview-roles'},
              { prop: 'vaild', label: '状态',minWidth:100,slotName:'preview-vaild'},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //存勾选的id
          multipleSelection:[],

       }
   },
    methods:{
        //获取列表信息
        getList:function(){
            this.$api.post('/user/list', {}, r => {
                console.log(r)
                if(r.success){
                    this.table_data=r.data;
                }
            }); 
        },
        //勾选框
        handleSelectionChange:function(val){
            console.log(val)
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
       //删除
       del:function(row){
           console.log(row)
           var ids=[];
            if(JSON.stringify(row)!='{}'&&row.id){ //单条删除
               ids.push(row.id);
           }else{  //多条删除
                if(this.multipleSelection.length>0){
                    ids=this.multipleSelection;
                }else{
                    this.$message.warning("请勾选需要删除的用户");
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
		    	 this.$api.post('/user/batchUpdateUserState', {"ids":thisID,"action":9}, r => {
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
		    	 this.$api.post('/user/batchUpdateUserState', {"ids":thisID,"action":true}, r => {
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
		    	 this.$api.post('/user/batchUpdateUserState', {"ids":thisID,"action":false}, r => {
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
            this.$router.push({path:'/msManage/userManage/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/userManage/add'});
       },

    },
    components:{}
}
</script>