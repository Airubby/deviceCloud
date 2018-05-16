<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">客户管理</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination 
                type="remote"
                url=""
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                @selection-change="handleSelectionChange" ref="thisRef" >                                                   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <a href="javascript:;" class="loncom_color" @click="detail(scope.row)">详情</a>
                    </template>
                </el-search-table-pagination>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created () {
        //获取项目
        this.$api.post('/project/list', {}, r => {
            console.log(r)
            if(r.success){
                this.table_forms.forms[0].options=r.list;
            }
        }); 
    },
    mounted() {

    },
    data() {
       return {
           table_data:[
                // {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey1', label: '',placeholder:'项目ID',itemType: 'select',
                        options:[],valueKey:'id',labelKey:'name' },
                ]
            },
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'fullName', label: '单位',minWidth:100},
              { prop: 'contacts', label: '联系人',minWidth:100},
              { prop: 'phoneNo', label: '联系电话',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

          //勾选的
          multipleSelection:[],

       }
   },
    methods:{
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
            if(row!=undefined){ //单条删除
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
		    	 this.$api.post('/cust/delete', {"ids":thisID}, r => {
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