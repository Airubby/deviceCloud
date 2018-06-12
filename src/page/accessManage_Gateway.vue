<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">接入模块</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding accessManage">
                <el-search-table-pagination type="remote"  
                url="/module/list"
                list-field="list" 
                total-field="total"
                method='post' 
                 @selection-change="handleSelectionChange"
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef">     
                <div class="form_add">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>                                           
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-loca">
                        <span v-if="scope.row.loca!=null&&scope.row.loca!=''">{{scope.row.loca.fullAddress}}</span>
                    </template>
                    <template slot-scope="scope" slot="preview-project">
                        <span v-if="scope.row.project!=null&&scope.row.project!=''">{{scope.row.project.name}}</span>
                    </template>
                    <template slot-scope="scope" slot="preview-state">
                        <span v-if="scope.row.state==1||scope.row.state=='1'">启用</span>
                        <span v-else>停用</span>
                    </template>
                    <template slot-scope="scope" slot="preview-online">
                        <span v-if="scope.row.online==true||scope.row.online=='true'">在线</span>
                        <span v-else>离线</span>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <div>
                            <p>
                            <a href="javascript:;" class="loncom_color" @click="addr(scope.row)">位置</a> 
                            <em>|</em>
                            <a href="javascript:;" class="loncom_color" v-if="scope.row.state=='0'||scope.row.state==0" @click="start(scope.row)">启用</a> 
                            <a href="javascript:;" class="loncom_color" v-if="scope.row.state=='1'||scope.row.state==1" @click="stop(scope.row)">停用</a>  
                            </p>
                            <p>
                            <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                            <em>|</em> 
                            <a href="javascript:;" class="loncom_color" @click="del(scope.row)">删除</a>
                            </p>
                        </div>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button @click="start()" type="info" size="mini" plain>启用</el-button>
                        <el-button @click="stop()" type="info" size="mini" plain>停用</el-button>
                        <el-button @click="del()" type="info" size="mini" plain>删除</el-button>
                        
                        <el-button @click="getState()" type="info" size="mini" plain>获取状态</el-button>
                        <el-button @click="sendParam()" type="info" size="mini" plain>发送参数</el-button>
                        <el-button-group>
                            <el-button @click="startCollect()" type="info" size="mini" plain>启用采集</el-button>
                            <el-button @click="stopCollect()" type="info" size="mini" plain>停用采集</el-button>
                        </el-button-group>
                        <el-button-group>
                            <el-button @click="startReport()" type="info" size="mini" plain>启用上报</el-button>
                            <el-button @click="stopReport()" type="info" size="mini" plain>停用上报</el-button>
                        </el-button-group>
                    </div>
                    
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
                // {name:'物联网关',code:'123',state:1,devNum:20,loca:'四川省，成都市，武侯区，科园南二路2号'}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey', label: '',placeholder:'名称/编码' },
                ]
            },
           table_columns:[
              { prop: 'code', label: '模块编码',minWidth:100},
              { prop: 'name', label: '模块名称',minWidth:100},  
              { prop: 'sno', label: '模块序列号',minWidth:100},            
              { prop: 'state', label: '状态',slotName:'preview-state',minWidth:50},
              { prop: 'online', label: '在线状态',slotName:'preview-online',minWidth:60},
              { prop: 'project', label: '所属项目',slotName:'preview-project',minWidth:150},
              { prop: 'loca', label: '位置',minWidth:300,slotName:'preview-loca'},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
          multipleSelection:[],

       }
   },
    methods:{
        //勾选框
        handleSelectionChange:function(val){
            console.log(val)
            this.multipleSelection=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
        //位置
        addr:function(row){
            console.log(row)
            if(row.locaId!=null&&row.locaId!=""){  //编辑
                this.$router.push({path:'/accessManage/gateway/address',query:{id:row.id,locaId:row.locaId}});
            }else{
                this.$router.push({path:'/accessManage/gateway/address',query:{id:row.id}});
            }
            
        },
       //启用
       start:function(row){
            var ids=[];
            if(row!=undefined&&row.id!=undefined){ //单条删除
               ids.push(row.id);
           }else{  //多条删除
                if(this.multipleSelection.length>0){
                    ids=this.multipleSelection;
                }else{
                    this.$message.warning("请勾选需要启用的项");
                    return;
                }
           }

           this.$confirm("确定启用?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/module/updateState', {"ids":thisID,"state":1}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //停用
       stop:function(row){
            var ids=[];
            if(row!=undefined&&row.id!=undefined){
                ids.push(row.id);
            }else{
                if(this.multipleSelection.length>0){
                    ids=this.multipleSelection;
                }else{
                    this.$message.warning("请勾选需要停用的项");
                    return;
                }
            }
           console.log(123123)
           this.$confirm("确定停用?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/module/updateState', {"ids":thisID,"state":0}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //删除
       del:function(row){
           console.log(row)
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

           this.$confirm("删除模块会同时删除模块下的设备，确定删除?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/module/delete', {"ids":thisID}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //编辑
       edit:function(row){
            this.$router.push({path:'/accessManage/gateway/add',query:{id:row.id}});
       },
       //新增
       add:function(){
            this.$router.push({path:'/accessManage/gateway/add'});
       },
       //获取模块在线状态
       getState:function(){
            if(this.multipleSelection.length==0){
                this.$message.warning("请勾选需要的项");
                return;
            }
            this.$confirm("确定获取模块在线状态?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=this.multipleSelection.toString();
		    	 this.$api.post('/module/getModuleOnlineStatus', {"ids":thisID}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },
       //发送模块控制参数
       sendParam:function(){
            if(this.multipleSelection.length==0){
                this.$message.warning("请勾选需要的项");
                return;
            }
            this.$confirm("确定发送模块控制参数?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=this.multipleSelection.toString();
		    	 this.$api.post('/module/sendModuleConfig', {"ids":thisID}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },
       //启用模块数据采集
       startCollect:function(){
            if(this.multipleSelection.length==0){
                this.$message.warning("请勾选需要的项");
                return;
            }
            this.$confirm("确定启用模块数据采集?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=this.multipleSelection.toString();
		    	 this.$api.post('/module/enableModuleGather', {"ids":thisID,state:1}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },
       //停用模块数据采集
       stopCollect:function(){
            if(this.multipleSelection.length==0){
                this.$message.warning("请勾选需要的项");
                return;
            }
            this.$confirm("确定停用模块数据采集?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=this.multipleSelection.toString();
		    	 this.$api.post('/module/enableModuleGather', {"ids":thisID,state:0}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },
       //启用模块数据上报
       startReport:function(){
            if(this.multipleSelection.length==0){
                this.$message.warning("请勾选需要的项");
                return;
            }
            this.$confirm("确定启用模块数据上报?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=this.multipleSelection.toString();
		    	 this.$api.post('/module/enableModuleTrans', {"ids":thisID,state:1}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },
       //停用模块数据上报
       stopReport:function(){
            if(this.multipleSelection.length==0){
                this.$message.warning("请勾选需要的项");
                return;
            }
            this.$confirm("确定停用模块数据上报?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=this.multipleSelection.toString();
		    	 this.$api.post('/module/enableModuleTrans', {"ids":thisID,state:0}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });

       },

       
       

    },
    components:{}
}
</script>