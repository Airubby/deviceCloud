<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">权限管理</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="msManage_tree">
                    <div class="msManage_tree_title">
                        权限选择
                    </div>
                    <div class="msManage_tree_con numScroll0">
                        <el-tree
                        :data="tree_data"
                        show-checkbox
                        node-key="id"
                        class="numScrollCon0"
                        default-expand-all
                        >
                        </el-tree>
                    </div>
                </div>
                <div class="msManage_table">
                    <div class="loncom_public_filter loncom_mtb20">
                        <div class="loncom_fr">
                            <el-button type="primary" size="small" @click="add">新增</el-button>
                        </div>
                    </div>
                    <div class="loncom_public_table numScroll1">
                        <div class="numScrollCon1">
                        <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" >                                           
                            <el-table-column slot="prepend" type="selection"></el-table-column>
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
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created () {
        
    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           table_data:[
                {code:'12',url:'11232131',name:'小明'},
                {code:'123',url:'11232131',name:'小明'},
           ],
           table_columns:[
              { prop: 'code', label: 'code',minWidth:100},
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'url', label: 'url',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

          tree_data: [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                id: 9,
                label: '三级 1-1-1'
                }, {
                id: 10,
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
            }, 
            {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],

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
            this.$router.push({path:'/msManage/limitsManage/add',query:{id:id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/limitsManage/add'});
       },

    },
    components:{}
}
</script>