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
                url="/msgLog/msgLogList"
                list-field="list" 
                total-field="total"
                method='post' 
                @resultData="resultInfo"
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef" >     
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="clear">清除</el-button>
                    </div>                                                
                    <template slot-scope="scope" slot="preview-state">
                        <div v-for="item in msg_data">
                            <span v-if="item.code==scope.row.state">{{item.label}}</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-sendTime">
                        <span v-if="scope.row.sendTime">{{(new Date(scope.row.sendTime)).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
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
        this.$api.post('/project/getSelect', {}, r => {
            console.log(r)
            if(r.success){
                this.table_forms.forms[0].options=r.data;
                this.table_forms.forms[0].options.unshift({'id':'',name:''})
            }
        }); 

        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'MSG_STATE'},r => { //消息通知状态
            console.log(r.data)
            if(r.success){
                this.msg_data=r.data;
            }else{this.$message.warning(r.msg);}
        });

    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           msg_data:[],  //消息通知状态
           table_data:[
                // {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey1', label: '',placeholder:'项目',itemType: 'select',options:[],valueKey:'id',labelKey:'name' },
                    { prop: 'queryKey2', label: '',placeholder:'邮件地址' },
                    { prop: 'queryKey3-queryKey4', label: '',placeholder:'时间',itemType: 'datetimerange' },
                ]
            },
           table_columns:[
              { prop: 'projectName', label: '项目',minWidth:100},
              { prop: 'addr', label: '邮件地址',minWidth:100},
              { prop: 'title', label: '标题',minWidth:160},
              { prop: 'appellation', label: '称谓',minWidth:80},
              { prop: 'sendTime', label: '发送时间',minWidth:120,slotName:'preview-sendTime'},
              { prop: 'state', label: '状态',minWidth:60,slotName:'preview-state'},
              { prop: 'bizType', label: '类型',minWidth:60},
              { prop: 'bizKey', label: '业务主键',minWidth:100},
              { prop: 'channelType', label: '发送通道',minWidth:60},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //详情
       detail:function(row){
            this.$router.push({path:'/operationManage/informLog/detail',query:{id:row.id}});
       },
       clear:function(){
            this.$api.post('/msgLog/delLogs', {}, r => {
                console.log(r)
                if(r.success){
                    this.$message.success(r.msg);
                    this.$refs['thisRef'].searchHandler(false);
                }else{
                    this.$message.warning(r.msg);
                }
            }); 
       },

    },
    components:{}
}
</script>