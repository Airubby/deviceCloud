<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">接入设备 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    设备信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                        <el-row>
                            <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    <em>*</em>设备序列号：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="sno">
                                        <el-input size="small" placeholder="请输入序列号" v-model="form_info.sno" :disabled="true"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            </el-col>
                            <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    设备编码：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="code">
                                        <el-input size="small" placeholder="请输入编码" v-model="form_info.code" :disabled="true"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            </el-col>
                            <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    设备名称：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-form-item prop="name">
                                        <el-input size="small" placeholder="请输入名称" v-model="form_info.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </div>
                            </div>    
                            </el-col>
                            <el-col :span="12">                    
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    接入模块：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-input size="small" placeholder="" v-model="form_info.aclient.name" :disabled="true"></el-input>
                                </div>
                            </div>
                            </el-col>
                            <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                设备类型：
                                </div>
                                <div class="loncom_list_box_right">
                                <el-input size="small" placeholder="" v-model="form_info.dtype.name" :disabled="true"></el-input>
                                </div>
                            </div>
                            </el-col>
                            <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    是否启用：
                                </div>
                                <div class="loncom_list_box_right">
                                    <el-radio-group v-model="form_info.state":disabled="true">
                                        <el-radio :label="1">启用</el-radio>
                                        <el-radio :label="0">停用</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            </el-col>
                        </el-row>
                        <h2 class="loncom_mt20">设备测点信息</h2>
                        <el-search-table-pagination type="remote"
                           :params="table_forms.initParams"
                            url="/gitMap/listPointVOForDev"
                            list-field="list" 
                            total-field="total"
                            method='post' 
                            :formOptions="table_forms" border :data="table_data" :columns="table_columns" 
                            ref="thisRef" >   
                            <template slot-scope="scope" slot="preview-readFlag">
                               <span v-if="scope.row.readFlag==1||scope.row.readFlag=='1'">是</span>
                               <span v-else>否</span>
                            </template>
                            <template slot-scope="scope" slot="preview-writeFlag">
                               <span v-if="scope.row.writeFlag==1||scope.row.writeFlag=='1'">是</span>
                               <span v-else>否</span>
                            </template>
                            <template slot-scope="scope" slot="preview-action">
                                <div v-for="item in action_data">
                                    <span v-if="scope.row.actionType==item.code">{{item.label}}</span>
                                </div>
                            </template>
                            <template slot-scope="scope" slot="preview-alarm">
                                <div v-for="item in alarm_data">
                                    <span v-if="scope.row.alarmType==item.code">{{item.label}}</span>
                                </div>
                            </template>
                            <template slot-scope="scope" slot="preview-time">
                                <span v-if="scope.row.lastUpdateTime">{{new Date(scope.row.lastUpdateTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                            </template>
                            <template slot-scope="scope" slot="preview-handle">
                               <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                               <em>|</em> 
                               <a href="javascript:;" class="loncom_color" @click="detail(scope.row)">规则详情</a> 
                            </template>
                        </el-search-table-pagination>
                    </el-form>
                </div>
                <noSubmitBtnInfo></noSubmitBtnInfo>
            </div>
        </div>
        <dialogRules v-bind:dialogInfo="dialogInfo" v-if="dialogInfo.visible"></dialogRules>
        <dialogTempPoiint v-bind:dialogInfo="dialog_Info" v-if="dialog_Info.visible"></dialogTempPoiint>
    </div>
</template>

<script>
import noSubmitBtnInfo from '../components/nosubmitBtnInfo.vue'
import dialogRules from '../components/dialogRules.vue'
import dialogTempPoiint from '../components/dialog_temp_point.access.vue'

export default {

    created () {
        
        this.obj = this.$route.query;
        this.$api.post('/device/get', {id:this.obj.id}, r => {
            console.log(r)
            if(r.success){
                this.table_data=r.data.plist;
                for(var item in this.form_info){
                    this.form_info[item]=r.data[item];    
                } 
            }
        }); 

        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'PACTION_TYPE'},r => { //测点动作类型
            if(r.success){
                this.action_data=r.data;
            }else{this.$message.warning(r.msg);}
        });
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'ALARMACTION_TYPE'},r => { //告警类型
            if(r.success){
                this.alarm_data=r.data;
            }else{this.$message.warning(r.msg);}
        });

    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           //新增编辑控制器头部显示
           topInfo:'设备详情',
           action_data:[],  //测点动作类型
           alarm_data:[],  //告警类型
           obj:'',
           form_info:{
               id:'',
               sno:'',
               name:'',
               code:'',
               dtype:'',
               aclient:'',
               state:1,
           },
           formRules:{
                sno:[
                    { required: true, message: '请输入序列号', trigger: 'blur' },
                ],
           },

           table_data:[],
           table_forms: {
                inline: true,
                size:'small',
                submitBtnText: '搜索',
                initParams:{queryKey:""},
                forms: [
                    { prop: 'queryKey1', label: '',placeholder:'名称/编码' },
                ]
            },
           table_columns:[
              { prop: 'serialNO', label: '序号',minWidth:50},
              { prop: 'name', label: '名称',minWidth:130},
              { prop: 'code', label: '编码',minWidth:220},
              { prop: 'valueType', label: '值类型',minWidth:60},
              { prop: 'offSet', label: '偏移量',minWidth:50},
              { prop: 'readFlag', label: '可读',minWidth:40,slotName:'preview-readFlag'},
              { prop: 'writeFlag', label: '可写',minWidth:40,slotName:'preview-writeFlag'},
              { prop: 'unit', label: '单位',minWidth:50},
              { prop: 'actionType', label: '动作类型',minWidth:80,slotName:'preview-action'},
              { prop: 'alarmType', label: '告警触发类型',minWidth:80,slotName:'preview-alarm'},
              { prop: 'currValue', label: '当前读数',minWidth:60},
              { prop: 'lastUpdateTime', label: '最后更新时间',minWidth:80,slotName:'preview-time'},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:120},
          ],
          dialogInfo:{
                title:"事件规则详情",
                visible:false,
                width:"1200px",
                id:'',
            },
            dialog_Info:{
                title:'新增测点信息',
                visible:false,
                width:"900px",
                add:true,  //默认新增
                typeTempId:'',
                data:{},
            },

       }
   },
    methods:{
        //事件规则详情
      detail:function(row){
          this.dialogInfo.id=row.id;
          this.dialogInfo.visible=true;
      },
      //编辑设备类型模板项测点信息
       edit:function(row){
            this.dialog_Info.visible=true;
            this.dialog_Info.add=false;
            this.dialog_Info.title="编辑测点信息";
            this.dialog_Info.data=row;
       },

    },
    watch:{
        'form_info.id':function(val,oldval){
            this.table_forms.initParams.queryKey=val;
        },
        
    },
    components:{noSubmitBtnInfo,dialogRules,dialogTempPoiint}
}
</script>