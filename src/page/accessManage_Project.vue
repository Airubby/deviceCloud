<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">项目管理</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination type="remote"
                url="/project/list"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                @selection-change="handleSelectionChange" ref="thisRef">          
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>                                      
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <div>
                            <p>
                                <a href="javascript:;" class="loncom_color" @click="msgGroup(scope.row)">消息接收组</a> 
                            </p>
                            <p>
                                <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                                <em>|</em> 
                                <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                            </p>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-loca">
                        <div v-if="scope.row.loca!=null&&scope.row.loca!=''">
                            {{scope.row.loca.fullAddress}}
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
        // this.$api.post('', {}, r => {
        //     console.log(r)
        //     if(r.success){
        //         this.table_data=r.data;
        //     }
        // }); 
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           table_data:[
                // {id:'1',name:'小微产品',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
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
              { prop: 'code', label: '项目编码',minWidth:60},
              { prop: 'name', label: '项目名称',minWidth:100},
              { prop: 'fullName', label: '项目全称',minWidth:150},
              { prop: 'custName', label: '所属客户',minWidth:100},
              { prop: 'contacts', label: '联系人',minWidth:60},
              { prop: 'phoneNo', label: '联系电话',minWidth:80},
              { prop: 'loca', label: '项目位置',slotName:'preview-loca',minWidth:250},
              { prop: 'createTime', label: '创建时间',minWidth:120},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          //勾选项
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

           this.$confirm("删除项目会同时删除接入的模块，确定删除?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/project/delete', {"ids":thisID}, r => {
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
            this.$router.push({path:'/accessManage/project/add',query:{id:row.id}});
       },
       //消息接收组
       msgGroup:function(row){
            this.$router.push({path:'/accessManage/project/msg',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/accessManage/project/add'});
       },

    },
    components:{}
}
</script>