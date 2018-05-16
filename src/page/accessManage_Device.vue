<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">网关接入</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding accessManage">
                <el-search-table-pagination type="remote"  
                url="/device/list"
                list-field="list" 
                total-field="total"
                method='post' 
                 @selection-change="handleSelectionChange"
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef">     
                                                 
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-state">
                        <span v-if="scope.row.state==1||scope.row.state=='1'">启用</span>
                        <span v-else>停用</span>
                    </template>
                    <template slot-scope="scope" slot="preview-dtype">
                        {{scope.row.name}}
                    </template>
                    <template slot-scope="scope" slot="preview-aclient">
                        {{scope.row.name}}
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <div>
                            <a href="javascript:;" class="loncom_color" v-if="scope.row.state=='0'||scope.row.state==0" @click="start(scope.row)">启用</a> 
                            <a href="javascript:;" class="loncom_color" v-if="scope.row.state=='1'||scope.row.state==1" @click="stop(scope.row)">停用</a>  
                            <em>|</em> 
                            <a href="javascript:;" class="loncom_color" @click="detail(scope.row)">详情</a> 
                        </div>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button @click="start()" type="info" size="mini" plain>启用</el-button>
                        <el-button @click="stop()" type="info" size="mini" plain>停用</el-button>
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
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'state', label: '状态',slotName:'preview-state',minWidth:100},
              { prop: 'dtype', label: '设备类型',minWidth:100,slotName:'preview-dtype'},
              { prop: 'aclient', label: '接入模块',minWidth:100,slotName:'preview-aclient'},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:140},
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
       //启用
       start:function(row){
            var ids=[];
            if(row!=undefined){ //单条删除
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
		    	 this.$api.post('/device/updateState', {"ids":thisID,"state":1}, r => {
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
            if(row!=undefined){
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
		    	 this.$api.post('/device/updateState', {"ids":thisID,"state":0}, r => {
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
       detail:function(row){
            this.$router.push({path:'/accessManage/device/detail',query:{id:row.id}});
       },
       

    },
    components:{}
}
</script>