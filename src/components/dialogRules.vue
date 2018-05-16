<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <h2 class="loncom_mb20">触发告警：</h2>
            <el-search-table-pagination type="local" border :data="table_data" :show-pagination="false" :columns="table_columns">    
                   <template slot-scope="scope" slot="preview-useFel">
                        <div>
                            <span v-if="scope.row.useFel">是</span>
                            <span v-else>否</span>
                        </div>
                    </template>
                </el-search-table-pagination>
            <h2 class="loncom_mtb20">解除告警：</h2>
            <el-search-table-pagination type="local" border :data="table_data1" :show-pagination="false" :columns="table_columns">    
                    <template slot-scope="scope" slot="preview-useFel">
                        <div>
                            <span v-if="scope.row.useFel">是</span>
                            <span v-else>否</span>
                        </div>
                    </template>
                </el-search-table-pagination>
        </div>
    </el-dialog>
</template>

<script>

export default {
    created () {
        //触发告警：
        this.$api.post('/device/getRules', {id:this.dialogInfo.id,action:1}, r => {
            console.log(r)
            if(r.success){
                this.table_data=r.data;
            }
        }); 
        //解除告警：
        this.$api.post('/device/getRules', {id:this.dialogInfo.id,action:0}, r => {
            console.log(r)
            if(r.success){
                this.table_data1=r.data;
            }
        }); 
    },
    mounted() {
        
    },
    data() {
        return {
            table_data:[],
            table_data1:[],
            table_columns:[
              { prop: 'name', label: '模板名称',minWidth:100},
              { prop: 'vara1', label: '值',minWidth:100},
              { prop: 'opta', label: '运算符',minWidth:100},
              { prop: 'vara2', label: '值',minWidth:100},
              { prop: 'optc', label: '逻辑符',minWidth:100},
              { prop: 'varb1', label: '值',minWidth:100},
              { prop: 'optb', label: '运算符',minWidth:100},
              { prop: 'varb2', label: '值',minWidth:100},
              { prop: 'action', label: '告警条件',minWidth:100},
              { prop: 'useFel', label: '是否使用自定义',minWidth:100,slotName:'preview-useFel'},
              { prop: 'fel', label: '自定义',minWidth:100},
              { prop: 'eventLibName', label: '事件库',minWidth:100},
              { prop: 'eventLevelName', label: '事件等级',minWidth:100},
            ],
        }
    },
    methods:{
      
    },
    props:["dialogInfo"]  
}
</script>

