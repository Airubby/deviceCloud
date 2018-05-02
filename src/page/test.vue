<template>
    <div class="loncom_content">
        <el-search-table-pagination type="remote" 
            
            :show-pagination="true" 
             border :columns="table_columns" :page-sizes="[1,2]">                                           
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
</template>


<script>
export default {
    created () {
        
    },
    mounted() {
        //url="/api/itom/api/v1/baseStation/query"
        //  http://120.25.226.251:18089/itom/api/v1/baseStation/query
        console.log(123)
        this.$api.get('/api/itom/api/v1/baseStation/query', {}, r => {
            console.log(r)
            //this.table_data=r.data.Rows;
        }); 

    },
    data() {
       return {
            table_data:[],
           table_columns:[
              { prop: 'code', label: '名称',minWidth:100},
              { prop: 'grade', label: '账号',minWidth:100},
              { prop: 'group_name', label: '联系人',minWidth:100},
              { prop: 'province', label: '联系电话',minWidth:100},
              { prop: 'monitor_center', label: '是否有效',slotName:'isVaild',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
       }
   },
    methods:{
       
    },
    components:{}
}
</script>