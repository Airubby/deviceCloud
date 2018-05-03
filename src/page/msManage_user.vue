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
                <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" >                                           
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                     <template slot-scope="scope" slot="vaild">
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
                                <a href="javascript:;" class="loncom_color" @click="remove(scope.row)">删除</a>
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
        
    },
    mounted() {

    },
    data() {
       return {
           table_data:[
                {name:'小张',email:'admin.qq.com',phoneNo:'小明',custName:'xiaoxiao',roleNames:'管理员',vaild:'123'}
           ],
           table_columns:[
              { prop: 'name', label: '用户名',minWidth:100},
              { prop: 'email', label: '邮箱',minWidth:100},
              { prop: 'phoneNo', label: '电话',minWidth:100},
              { prop: 'custName', label: '所属客户',minWidth:100},
              { prop: 'roleNames', label: '角色',minWidth:100},
              { prop: 'vaild', label: '状态',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //删除
       del:function(){

       },
       //启用
       start:function(){

       },
       //停用
       stop:function(){

       },
       //编辑
       edit:function(row){
            var id='1';
            this.$router.push({path:'/msManage/userManage/add',query:{id:id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/userManage/add'});
       },

    },
    components:{}
}
</script>