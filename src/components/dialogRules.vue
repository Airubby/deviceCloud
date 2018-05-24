<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <h2 class="loncom_mb20 loncom_color_main">触发告警：</h2>
            <el-search-table-pagination type="local" border :data="table_data" :columns="table_columns"
            @selection-change="handleSelectionChange">  
            <el-table-column slot="prepend" type="selection"></el-table-column>  
                   <template slot-scope="scope" slot="preview-useFel">
                        <div>
                            <span v-if="scope.row.useFel">是</span>
                            <span v-else>否</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button type="info" plain size="mini" @click="del">删除</el-button>
                    </div>
                </el-search-table-pagination>
            <h2 class="loncom_mtb20 loncom_color_main">解除告警：</h2>
            <el-search-table-pagination type="local" border :data="table_data1" :columns="table_columns"
            @selection-change="handleSelectionChange1">    
            <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-useFel">
                        <div>
                            <span v-if="scope.row.useFel">是</span>
                            <span v-else>否</span>
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
                        <a href="javascript:;" class="loncom_color" @click="del1(scope.row)">删除</a>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button type="info" plain size="mini" @click="del1">删除</el-button>
                    </div>
                </el-search-table-pagination>
        </div>
    </el-dialog>
</template>

<script>

export default {
    created () {
        //触发告警：
        this.getList();
        //解除告警：
        this.getList1();
    },
    mounted() {
        
    },
    data() {
        return {
            table_data:[],
            table_data1:[],
            table_columns:[
              { prop: 'name', label: '规则名称',minWidth:100},
              { prop: 'vara1', label: '值a',minWidth:100},
              { prop: 'opta', label: '运算符a',minWidth:100},
              { prop: 'vara2', label: '值a',minWidth:100},
              { prop: 'optc', label: '逻辑符',minWidth:100},
              { prop: 'varb1', label: '值b',minWidth:100},
              { prop: 'optb', label: '运算符b',minWidth:100},
              { prop: 'varb2', label: '值b',minWidth:100},
              { prop: 'action', label: '规则动作',minWidth:100,slotName:'preview-action'},
              { prop: 'useFel', label: '自定义脚本',minWidth:100,slotName:'preview-useFel'},
              { prop: 'fel', label: '脚本',minWidth:100},
              { prop: 'eventLibName', label: '事件库',minWidth:100},
              { prop: 'eventLevelName', label: '事件等级',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:60},
            ],
            multipleSelection:[],
            multipleSelection1:[],
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
                    this.$message.warning("请勾选需要删除的用户");
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
                if(this.multipleSelection.length>0){
                    ids=this.multipleSelection;
                }else{
                    this.$message.warning("请勾选需要删除的用户");
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
       
    },
    props:["dialogInfo"]  
}
</script>

