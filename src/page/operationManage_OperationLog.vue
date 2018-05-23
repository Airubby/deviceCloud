<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">系统操作日志</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination 
                type="remote"
                url="/log/optLogList"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef" >                                                    
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <a href="javascript:;" class="loncom_color" @click="detail(scope.row)">详情</a> 
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
        scrollCon();
    },
    data() {
       return {
           table_data:[
                // {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey1', label: '',placeholder:'userName' },
                    { prop: 'queryKey3-queryKey4', label: '',placeholder:'时间',itemType: 'datetimerange' },
                ]
            },
           table_columns:[
              { prop: 'userId', label: '用户id',minWidth:100},
              { prop: 'userName', label: '用户名',minWidth:100},
              { prop: 'actionName', label: '系统编码',minWidth:100},
              { prop: 'methodName', label: '系统编码',minWidth:100},
              { prop: 'opName', label: '逻辑名称',minWidth:100},
              { prop: 'requestUri', label: '系统编码',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //详情
       detail:function(row){
            this.$router.push({path:'/operationManage/operationLog/detail',query:{id:row.id}});
       },

    },
    components:{}
}
</script>