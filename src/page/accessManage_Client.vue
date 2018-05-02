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
                <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" >                                           
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                     <template slot-scope="scope" slot="isVaild">
                        <div>
                            <span v-if="scope.row.isVaild==true||scope.row.isVaild=='true'">有效</span>
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

    },
    data() {
       return {
           table_data:[
                {name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',isVaild:true}
           ],
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'fullName', label: '账号',minWidth:100},
              { prop: 'contacts', label: '联系人',minWidth:100},
              { prop: 'phoneNo', label: '联系电话',minWidth:100},
              { prop: 'isVaild', label: '是否有效',slotName:'isVaild',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //删除
       del:function(){

       },
       //编辑
       edit:function(){

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