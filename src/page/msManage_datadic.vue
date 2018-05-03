<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">数据字典管理</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="loncom_public_filter loncom_mtb20">
                    <div class="loncom_filter_group">
                        <el-input placeholder="编号" v-model="code" size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div class="loncom_fr">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>
                </div>
                <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" >                                           
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
                {name:'小张',code:'编码',remark:'12313123',vaild:true}
           ],
           table_columns:[
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'remark', label: '备注',minWidth:100},
              { prop: 'vaild', label: '是否有效',slotName:'vaild',minWidth:100},
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
            this.$router.push({path:'/msManage/datadicManage/add',query:{id:id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/datadicManage/add'});
       },

    },
    components:{}
}
</script>