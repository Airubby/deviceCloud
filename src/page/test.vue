<template>
    <div class="loncom_content">
        <el-search-table-pagination 
                type="remote"
                url="/cust/list"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                @selection-change="handleSelectionChange" ref="thisRef" >   
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>                                                   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <div>
                            <p>
                                <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                                <em>|</em> 
                                <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                            </p>
                        </div>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button type="info" plain size="mini" @click="del">删除</el-button>
                    </div>
                </el-search-table-pagination>
        <el-button type="primary" @click="test">测试按钮</el-button>
        <div style="height:300px;"></div>
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
           table_data:[
                //  {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true},
           ],
            table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey', label: '',placeholder:'名称',propValue:'' },
                ]
            },
           table_columns:[
              { prop: 'code', label: '客户编码',minWidth:100},
              { prop: 'name', label: '客户名称',minWidth:100},
              { prop: 'fullName', label: '客户全称',minWidth:100},
              { prop: 'contacts', label: '联系人',minWidth:100},
              { prop: 'phoneNo', label: '联系电话',minWidth:100},
              { prop: 'createTime', label: '创建时间',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       test:function(){
            console.log(this.template_data)
            console.log(this.template_data1)
       },
    },
    components:{}
}
</script>