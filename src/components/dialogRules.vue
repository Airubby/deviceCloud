<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width" :append-to-body='true'>
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <div style="text-align:right;">
                <el-button type="primary" size="small" @click="add">新增</el-button>
            </div>           
            <h2 class="loncom_mb10 loncom_color_main">触发告警：</h2>
            <el-search-table-pagination type="local" border :data="table_data" :columns="table_columns"
            @selection-change="handleSelectionChange" class="loncom_mb20">  
            <el-table-column slot="prepend" type="selection"></el-table-column>  
                   <template slot-scope="scope" slot="preview-alarmType">
                        <div v-for="item in alarm_data">
                            <span v-if="item.code==scope.row.alarmType">{{item.label}}</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-action">
                        <div>
                            <span v-if="scope.row.action==1">触发告警</span>
                            <span v-else-if="scope.row.action==0">解除告警</span>
                            <span v-else>状态错误</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                        <em>|</em> 
                        <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button type="info" plain size="mini" @click="del">删除</el-button>
                    </div>
                </el-search-table-pagination>
            <h2 class="loncom_mb10 loncom_color_main">解除告警：</h2>
            <el-search-table-pagination type="local" border :data="table_data1" :columns="table_columns"
            @selection-change="handleSelectionChange1">    
            <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-alarmType">
                        <div v-for="item in alarm_data">
                            <span v-if="item.code==scope.row.alarmType">{{item.label}}</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-action">
                        <div>
                            <span v-if="scope.row.action==1">触发告警</span>
                            <span v-else-if="scope.row.action==0">解除告警</span>
                            <span v-else>状态错误</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                        <em>|</em> 
                        <a href="javascript:;" class="loncom_color" @click="del1(scope.row)">删除</a>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button type="info" plain size="mini" @click="del1">删除</el-button>
                    </div>
                </el-search-table-pagination>
        </div>
        <dialogEditRules v-bind:dialogRulesInfo="dialog_Info" v-if="dialog_Info.visible"></dialogEditRules>
    </el-dialog>
</template>

<script>
import dialogEditRules from './dialogEditRules.vue'
export default {
    created () {
        //触发告警：
        this.getList();
        //解除告警：
        this.getList1();
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'ALARMACTION_TYPE'},r => { //告警类型
            console.log(r.data)
            if(r.success){
                this.alarm_data=r.data;
            }else{this.$message.warning(r.msg);}
        });

    },
    mounted() {
        
    },
    data() {
        return {
            alarm_data:[],  //告警类型
            table_data:[],
            table_data1:[],
            table_columns:[
                { prop: 'name', label: '事件名称',minWidth:150},
                { prop: 'alarmType', label: '告警类型',minWidth:100,slotName:'preview-alarmType'},
                { prop: 'desc', label: '事件规则',minWidth:300},
                { prop: 'action', label: '事件动作',minWidth:100,slotName:'preview-action'},
                { prop: 'eventLibName', label: '事件库',minWidth:100},
                { prop: 'eventLevelName', label: '事件等级',minWidth:100},
                { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
            ],
            multipleSelection:[],
            multipleSelection1:[],
            dialog_Info:{
                visible:false,
                width:"1000px",
                id:'',
                pointId:'',  //测点id
            },
        }
    },
    methods:{
        //触发告警：
        getList:function(){
            this.$api.post('/device/getRules', {id:this.dialogInfo.id,action:1}, r => {
                console.log(r)
                if(r.success){
                    this.table_data=r.data;
                }
            }); 
        },
        //解除告警：
        getList1:function(){
            this.$api.post('/device/getRules', {id:this.dialogInfo.id,action:0}, r => {
                console.log(r)
                if(r.success){
                    this.table_data1=r.data;
                }
            }); 
        },
      //勾选框
        handleSelectionChange:function(val){
            console.log(val)
            this.multipleSelection=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
       //删除
       del:function(row){
           console.log(row.id)
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
		    	 this.$api.post('/device/deleteEventRules', {"ids":thisID,'id':this.dialogInfo.id}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getList();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
           
       },
       //勾选框解除告警
        handleSelectionChange1:function(val){
            console.log(val)
            this.multipleSelection1=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection1.push(val[i].id);
            }
        },
       //删除 解除告警
       del1:function(row){
           console.log(row)
           var ids=[];
            if(row!=undefined&&row.id!=undefined){ //单条删除
               ids.push(row.id);
           }else{  //多条删除
                if(this.multipleSelection1.length>0){
                    ids=this.multipleSelection1;
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
		    	 this.$api.post('/device/deleteEventRules', {"ids":thisID,'id':this.dialogInfo.id}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.getList1();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
           
       },
       //编辑
       edit:function(row){
           this.dialog_Info.title="编辑事件规则";
           this.dialog_Info.id=row.id;
           this.dialog_Info.visible=true;
       },
       //新增
       add:function(){
            this.dialog_Info.title="新增事件规则";
            this.dialog_Info.id='';
            this.dialog_Info.pointId=this.dialogInfo.id;
            this.dialog_Info.visible=true;
       },

       
    },
    props:["dialogInfo"],
    components:{dialogEditRules}

}
</script>

