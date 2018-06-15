<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">项目管理 &gt; 消息接收组</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    消息接收组
                </div>
                <div class="loncom_public_add_con">
                    <el-search-table-pagination type="local" class="loncom_public_add_form"
                    border :data="table_data" :columns="table_columns" 
                    @selection-change="handleSelectionChange" ref="thisRef"> 
                        <div class="loncom_public_filter">         
                            <div class="form_add">
                                <el-button type="primary" size="small" @click="add">新增</el-button>
                            </div>                            
                        </div>          
                        <el-table-column slot="prepend" type="selection"></el-table-column>
                        <template slot-scope="scope" slot="preview-vaild">
                            <span v-if="scope.row.vaild">启用</span>
                            <span v-else>不启用</span>
                        </template>
                        <template slot-scope="scope" slot="preview-msg">
                            <div v-for="item in msg_type">
                                <span v-if="item.code==scope.row.msgChannel">{{item.label}}</span>
                            </div>
                        </template>
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
                </div>
                <noSubmitBtnInfo></noSubmitBtnInfo>
            </div>
        </div>
        <dialogMsgInfo v-bind:dialogInfo="dialog_Info" v-if="dialog_Info.visible"></dialogMsgInfo>
    </div>
</template>

<script>
import noSubmitBtnInfo from '../components/nosubmitBtnInfo.vue'
import dialogMsgInfo from '../components/dialogMsgInfo.vue'
export default {

    created () {
        this.obj = this.$route.query;
         //消息通道类型
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'MSG_CHANNELTYPE'},r => { 
            console.log(r)
            if(r.success){
                this.msg_type=r.data;
            }else{this.$message.warning(r.msg);}
        }); 

        this.getList();
       
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           obj:'',
           msg_type:[],
           table_data:[
                // {id:'1',name:'小微产品',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_columns:[
              { prop: 'appellation', label: '称谓',minWidth:100},
              { prop: 'addr', label: '接收地址',minWidth:300},
              { prop: 'msgChannel', label: '通道类型',minWidth:100,slotName:'preview-msg'},
              { prop: 'vaild', label: '是否启用',slotName:'preview-vaild',width:100},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
          ],
          dialog_Info:{
                title:'新增消息组',
                visible:false,
                width:'800px',
                projectId:'',
                id:'',
           },
           //勾选项
          multipleSelection:[],

       }
   },
    methods:{
        //获取列表
        getList:function(){
            this.$api.post('/msgReceiveAddr/list',{queryKey:this.obj.id},r => { 
                console.log(r)
                if(r.success){
                    this.table_data=r.list;
                }else{this.$message.warning(r.msg);}
            });
        },
        //勾选框
        handleSelectionChange:function(val){
            this.multipleSelection=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
      //新增
       add:function(){
            this.dialog_Info.title='新增消息组';
            this.dialog_Info.projectId=this.obj.id;
            this.dialog_Info.visible=true;
       },
       //新增
       edit:function(row){
            this.dialog_Info.title='编辑消息组';
            this.dialog_Info.projectId=this.obj.id;
            this.dialog_Info.id=row.id;
            this.dialog_Info.visible=true;
       },
       //删除
       del:function(row){
            var ids=[];
            if(row!=undefined&&row.id!=undefined){ //单条删除
               ids.push(row.id);
           }else{  //多条删除
                if(this.multipleSelection.length>0){
                    ids=this.multipleSelection;
                }else{
                    this.$message.warning("请勾选需要删除的项");
                    return;
                }
           }

           this.$confirm("确定删除?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/msgReceiveAddr/deleteVaild', {"ids":thisID,"operType":9}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getList();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },

    },
    components:{noSubmitBtnInfo,dialogMsgInfo}
}
</script>