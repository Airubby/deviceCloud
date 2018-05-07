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
                        ref="tree"
                        :data="tree_data"
                        node-key="id"
                        @node-click="nodeClick"
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
                        <el-search-table-pagination type="local" :show-pagination="false" border :data="table_data" :columns="table_columns" >                                           
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
        //获取权限树
        this.$api.get('', {}, r => {
            if(r.success){
                this.tree_data=r.data;
            }
        }); 
    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           table_data:[
                {id:'1',code:'12',url:'11232131',name:'小明'},
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
        //点击树形节点
        nodeClick:function(node){
            console.log(node)
            this.$api.get('', {"id":node.id}, r => {
                if(r.success){
                    this.table_data=r.data;
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
            this.$router.push({path:'/msManage/limitsManage/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/msManage/limitsManage/add'});
       },

    },
    components:{}
}
</script>