<template>
    <div class="loncom_content">
        <el-search-table-pagination type="remote"
            url="/itom/api/v1/baseStation/query"
            list-field="data.Rows" 
            total-field="data.RecordCount"
            :show-pagination="true"
             border :columns="table_columns" :page-sizes="[1,2]">    
        </el-search-table-pagination>
         
        <el-table
    :data="table_data"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.local">
            <el-table-column label="名称" prop="localname"></el-table-column>
            <el-table-column label="名称1" prop="localaddr"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="desc" prop="desc"></el-table-column>
  </el-table>

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
            table_data:[{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          local:[{
              localname:'123',
              localaddr:'sldfalfj'
          },{
              localname:'1233333',
              localaddr:'sldfalfj3333'
          }]
        }],
        test_columns:[
            { prop: 'id', label: '名称',minWidth:100},
              { prop: 'name', label: '账号',minWidth:100},
              { prop: 'desc', label: '联系人',minWidth:100},
        ],
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