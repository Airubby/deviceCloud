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
                                <em>*</em>是否有效：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.isVaild">
                                    <el-radio :label="true">有效</el-radio>
                                    <el-radio :label="false">无效</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="">
                            <div class="loncom_public_filter loncom_mtb20">
                                <div class="loncom_fl">测点列表</div>
                                <div class="loncom_fr">
                                    <el-button type="primary" size="small" @click="save">保存</el-button>
                                    <el-button type="primary" size="small" @click="add">新增</el-button>
                                </div>
                            </div>
                            <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" >                                           
                                <el-table-column slot="prepend" type="selection"></el-table-column>
                                <template slot-scope="scope" slot="isVaild">
                                    <div>
                                        <span v-if="scope.row.isVaild==true||scope.row.isVaild=='true'">有效</span>
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
                                
                            </el-search-table-pagination>
                        </div>
                    </el-form>
                </div>
                <SubmitBtnInfo v-bind:submitBtnInfo="activeBtn" v-on:submitInfo="submitInfo('formInfo')"></SubmitBtnInfo>
            </div>
        </div>
        <dialogTempPoiint v-bind:dialogInfo="dialogInfo" v-if="dialogInfo.visible"></dialogTempPoiint>
    </div>
</template>

<script>
import SubmitBtnInfo from '../components/submitBtnInfo.vue'
import dialogTempPoiint from '../components/dialog_temp_point.vue'

export default {

    created () {
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增设备类型模板";
        }else{
            this.topInfo="编辑设备类型模板"
            this.activeBtn=false;
        }
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           //新增编辑控制器头部显示
           topInfo:'',
           activeBtn:true,  //默认新增
           form_info:{
               name:'',
               code:'',
               isVaild:true,
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
                {num:'1',label:'321',code:'2342',isVaild:true}
           ],
           table_columns:[
              { prop: 'num', label: '序号',minWidth:100},
              { prop: 'label', label: '名称',minWidth:100},
              { prop: 'code', label: '编码',minWidth:100},
              { prop: 'code', label: '值类型',minWidth:100},
              { prop: 'code', label: '偏移量',minWidth:100},
              { prop: 'code', label: '可读',minWidth:100},
              { prop: 'code', label: '可写',minWidth:100},
              { prop: 'code', label: '单位',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

          //新增字典项列表信息
          dialogInfo:{
                title:'新增测点信息',
                visible:false,
                width:"650px",
                add:true,  //默认新增
                data:{},
            },

       }
   },
    methods:{
        //新增字典项列表信息
        add:function(){
            this.dialogInfo.visible=true;
        },
        //保存字典项列表信息
        save:function(){

        },
        //删除字典项列表信息
       del:function(){

       },
      
       //编辑字典项列表信息
       edit:function(row){
            this.dialogInfo.visible=true;
            this.dialogInfo.add=false;
            this.dialogInfo.title="编辑测点信息"
       },
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.activeBtn){  //新增

                    }else{  //编辑

                    }
                }
            })
       },

    },
    components:{SubmitBtnInfo,dialogTempPoiint}
}
</script>