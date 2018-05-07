<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">客户管理</span>
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
                                <a href="javascript:;" class="loncom_color" @click="remove(scope.row)">删除</a>
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
        this.$api.post('/customer/customerList', {}, r => {
            console.log(r)
            if(r.success){
                this.table_data=r.data;
            }
        }); 
    },
    mounted() {

    },
    data() {
       return {
           table_data:[
                {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'fullName', label: '单位',minWidth:100},
              { prop: 'contacts', label: '联系人',minWidth:100},
              { prop: 'phoneNo', label: '联系电话',minWidth:100},
              { prop: 'vaild', label: '是否有效',slotName:'vaild',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

          //勾选的
          multipleSelection:[],

       }
   },
    methods:{
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
		    	 this.$api.post('', {"ids":thisID,"action":9}, r => {
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
            this.$router.push({path:'/accessManage/client/add',query:{id:row.id}});
       },
       //新增
       add:function(){
           //,query:{id:data.id}
            this.$router.push({path:'/accessManage/client/add'});
       },

    },
    components:{}
}
</script>