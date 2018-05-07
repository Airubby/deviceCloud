<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">数据字典管理 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    数据字典信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>名称：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="name">
                                    <el-input size="small" placeholder="请输入名称" v-model="form_info.name"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>编码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="code">
                                    <el-input size="small" placeholder="请输入编码" v-model="form_info.code"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>是否有效：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.vaild">
                                    <el-radio :label="true">有效</el-radio>
                                    <el-radio :label="false">无效</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                备注：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input type="textarea" v-model="form_info.remark" style="height:150px;"></el-input>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">&nbsp;</div>
                            <div class="loncom_list_box_right">
                                <el-button type="primary" size="small" @click="save">保存</el-button>
                            </div>
                        </div>
                        <div class="">
                            <div class="loncom_public_filter loncom_mtb20">
                                <div class="loncom_fl">字典项列表</div>
                                <div class="loncom_fr">
                                    <el-button type="primary" size="small" @click="add">新增</el-button>
                                </div>
                            </div>
                            <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" 
                            @selection-change="handleSelectionChange" >                                           
                                <el-table-column slot="prepend" type="selection"></el-table-column>
                                <template slot-scope="scope" slot="vaild">
                                    <div>
                                        <span v-if="scope.row.vaild==true||scope.row.vaild=='true'">有效</span>
                                        <span v-else>无效</span>
                                    </div>
                                </template>
                                <template slot-scope="scope" slot="preview-handle">
                                    <div>
                                        <p>
                                            <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                                            <em>|</em> 
                                            <a href="javascript:;" class="loncom_color" @click="remove(scope.row)">删除</a>
                                        </p>
                                    </div>
                                </template>
                                <div class="loncom_table_btn">
                                    <el-button type="info" plain size="mini" @click="start">启用</el-button>
                                    <el-button type="info" plain size="mini" @click="stop">停用</el-button>
                                    <el-button type="info" plain size="mini" @click="del">删除</el-button>
                                </div>
                            </el-search-table-pagination>
                        </div>
                    </el-form>
                </div>
                <noSubmitBtnInfo></noSubmitBtnInfo>
            </div>
        </div>
        <dialogDatadic v-bind:dialogInfo="dialogInfo" v-if="dialogInfo.visible"></dialogDatadic>
    </div>
</template>

<script>
import noSubmitBtnInfo from '../components/nosubmitBtnInfo.vue'
import dialogDatadic from '../components/dialog_msManage_datadic_add_list.vue'

export default {

    created () {
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增数据字典信息";
        }else{
            this.topInfo="编辑数据字典信息"
            this.$api.get('', {id:obj.id}, r => {
                if(r.success){
                    this.form_info=r.data[0];
                }
            }); 
        }
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           //新增编辑控制器头部显示
           topInfo:'',
           form_info:{
               id:'',
               name:'',
               code:'',
               remark:'',
               vaild:true,
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
           },

           table_data:[
                {id:'1',label:'321',code:'2342',remark:'12313123',vaild:true}
           ],
           table_columns:[
              { prop: 'label', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'remark', label: '备注',minWidth:100},
              { prop: 'vaild', label: '是否有效',slotName:'vaild',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

          //新增字典项列表信息
          dialogInfo:{
                title:'新增字典项信息',
                visible:false,
                width:"600px",
                add:true,  //默认新增
                 //存字典的id，因为先保存字典，才可以添加列表项
                dicId:"",
                data:{},
            },
            //勾选信息
            multipleSelection:[],

       }
   },
    methods:{
        //勾选信息
        handleSelectionChange:function(val){
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
        //新增字典项列表信息
        add:function(){
            if(this.dialogInfo.dicId!=""){
                this.dialogInfo.visible=true;
            }else{
                this.$message.warning("请先保存字典信息");
            }
        },
        //保存字典信息，保存了才能增加字典列表
        save:function(){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    //form_info.id为空为新增
                    this.$api.post('/sysDic/saveOrUpdateEntity', this.form_info , r => {
                        console.log(r)
                        if(r.success){
                            this.$message.success(r.msg);
                            this.dialogInfo.dicId=r.id;
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
            
        },
        //删除字典项列表信息
       del:function(row){
            var ids=[];
            if(JSON.stringify(row)!='{}'&&row.id){ //单条删除
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
		    	 this.$api.post('', {"ids":thisID,"action":9}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //启用字典项列表信息
       start:function(row){
           var ids=[];
            if(this.multipleSelection.length>0){
                ids=this.multipleSelection;
            }else{
                this.$message.warning("请勾选需要启用的项");
                return;
            }
            this.$confirm("确定启用?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
		    	 this.$api.post('', {"ids":thisID,"action":1}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //停用字典项列表信息
       stop:function(){
            var ids=[];
            if(this.multipleSelection.length>0){
                ids=this.multipleSelection;
            }else{
                this.$message.warning("请勾选需要停用的项");
                return;
            }
            this.$confirm("确定停用?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
		    	 this.$api.post('', {"ids":thisID,"action":0}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //编辑字典项列表信息
       edit:function(row){
            this.dialogInfo.visible=true;
            this.dialogInfo.add=false;
            this.dialogInfo.title="编辑字典项信息"
       },
       

    },
    components:{noSubmitBtnInfo,dialogDatadic}
}
</script>