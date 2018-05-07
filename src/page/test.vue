<template>
    <div class="loncom_content">
        <el-search-table-pagination type="remote"
            url="/itom/api/v1/baseStation/query"
            list-field="data.Rows" 
            total-field="data.RecordCount"
            :show-pagination="true"
             border :columns="table_columns" :page-sizes="[1,2]">    
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
        this.$api.post('/user/getById', {'id':1}, r => {
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
              { prop: 'monitor_center', label: '是否有效',slotName:'vaild',minWidth:100},
          ],
       }
   },
    methods:{
       
    },
    components:{}
}
</script>