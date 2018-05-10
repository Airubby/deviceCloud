<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备类型模板管理 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    设备类型模板信息
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
                                &nbsp;
                            </div>
                            <div class="loncom_list_box_right">
                                <el-button type="primary" size="small" @click="save('formInfo')">保存</el-button>
                            </div>
                        </div>
                        <div class="">
                            <div class="loncom_public_filter loncom_mtb20">
                                <div class="loncom_fl">测点列表</div>
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
                                    <el-button type="info" plain size="mini" @click="del">删除</el-button>
                                </div>
                            </el-search-table-pagination>
                        </div>
                    </el-form>
                </div>
                <noSubmitBtnInfo></noSubmitBtnInfo>
            </div>
        </div>
        <dialogTempPoiint v-bind:dialogInfo="dialogInfo" v-if="dialogInfo.visible"></dialogTempPoiint>
    </div>
</template>

<script>
import noSubmitBtnInfo from '../components/nosubmitBtnInfo.vue'
import dialogTempPoiint from '../components/dialog_temp_point.vue'

export default {

    created () {
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增设备类型模板";
        }else{
            this.topInfo="编辑设备类型模板";
            this.dialogInfo.typeTempId=obj.id;
            //获取设备类型模板
            this.$api.post('/typeTemplate/getById', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        this.form_info[item]=r.data[item]; 
                    }
                }
            }); 
            //获取设备类型测点信息
            this.$api.post('', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    this.table_data=r.data;
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
                // {id:'1',serialNO:'1',name:'321',code:'2342'}
           ],
           table_columns:[
              { prop: 'serialNO', label: '序号',minWidth:100},
              { prop: 'name', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'valueType', label: '值类型',minWidth:100},
              { prop: 'offSet', label: '偏移量',minWidth:100},
              { prop: 'readFlag', label: '可读',minWidth:100},
              { prop: 'writeFlag', label: '可写',minWidth:100},
              { prop: 'unit', label: '单位',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

          //新增设备类型模板项列表信息
          dialogInfo:{
                title:'新增测点信息',
                visible:false,
                width:"650px",
                add:true,  //默认新增
                typeTempId:'1',
                data:{},
            },
            //勾选的测点信息
            multipleSelection:[],

       }
   },
    methods:{
        //勾选测点信息
        handleSelectionChange:function(val){
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
        //新增设备类型模板项列表信息
        add:function(){
            if(this.dialogInfo.typeTempId!=""){
                this.dialogInfo.visible=true;
            }else{
                this.$message.warning("请先保存设备类型模板信息");
            }
        },
        //保存设备类型模板项列表信息
        save:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    //form_info.id为空为新增
                    this.$api.post('/typeTemplate/saveOrUpdateEntity', this.form_info , r => {
                        console.log(r)
                        if(r.success){
                            this.$message.success(r.msg);
                            this.dialogInfo.typeTempId=r.id;
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
        },
        //删除设备类型模板项测点信息
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
       
       //编辑设备类型模板项测点信息
       edit:function(row){
            this.dialogInfo.visible=true;
            this.dialogInfo.add=false;
            this.dialogInfo.title="编辑测点信息"
       },
       
    },
    components:{noSubmitBtnInfo,dialogTempPoiint}
}
</script>