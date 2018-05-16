<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">通知消息日志</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination 
                type="remote"
                url="/log/msgLogList"
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
        this.$api.post('/project/list', {}, r => {
            console.log(r)
            if(r.success){
                this.table_forms.forms[0].options=r.list;
            }
        }); 
    },
    mounted() {

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
                    { prop: 'queryKey1', label: '',placeholder:'项目ID',itemType: 'select',
                        options:[],valueKey:'id',labelKey:'name' },
                    { prop: 'queryKey2', label: '',placeholder:'邮件信息' },
                    { prop: 'queryKey3-queryKey4', label: '',placeholder:'时间',itemType: 'datetimerange' },
                ]
            },
           table_columns:[
              { prop: 'projectId', label: '项目ID',minWidth:100},
              { prop: 'addr', label: '邮件地址',minWidth:100},
              { prop: 'title', label: '标题',minWidth:100},
              { prop: 'appellation', label: '应用者',minWidth:100},
              { prop: 'sendTime', label: '发送时间',minWidth:100},
              { prop: 'state', label: '状态',minWidth:100},
              { prop: 'bizType', label: '类型',minWidth:100},
              { prop: 'bizKey', label: '编码',minWidth:100},
              { prop: 'channelType', label: '通道',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //详情
       detail:function(row){
            this.$router.push({path:'/operationManage/informLog/detail',query:{id:row.id}});
       },

    },
    components:{}
}
</script>