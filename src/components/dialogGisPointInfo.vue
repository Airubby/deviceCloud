<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            <h2 class="loncom_mb20">设备基本信息</h2>
            <div>
                <el-form class="loncom_public_add_form">
                    <el-row>
                        <el-col :span="12">
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    设备序列号：
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
                    </el-row>
                    <el-row>
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
                </el-form>
            </div>
            <h2 class="loncom_mt20">设备测点信息</h2>
            <el-search-table-pagination type="remote"
                url="/gitMap/listPointVOForDev"
                :params="table_forms.initParams"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" border :data="table_data" :columns="table_columns" 
                ref="thisRef" >   
                <template slot-scope="scope" slot="prev-lastTitme">
                    <span v-if="scope.row.lastUpdateTime!=null && scope.row.lastUpdateTime!=''">
                       {{new Date(scope.row.lastUpdateTime).Format("yyyy-MM-dd hh:mm:ss")}}
                    </span>
                </template>
            </el-search-table-pagination>
        </div>
    </el-dialog>
</template>

<script>
export default {
    created () {
        //设备详情
        this.$api.post('/device/get', {id:this.dialogInfo.devId}, r => {
            console.log(r)
            if(r.success){
                for(var item in this.form_info){
                    this.form_info[item]=r.data[item];    
                } 
            }
        }); 
    },
    mounted() {
       //this.table_forms.forms[0].propValue=this.dialogInfo.devId;
    },
    data() {
        return {
            form_info:{
               id:'',
               sno:'',
               name:'',
               code:'',
               dtype:'',
               aclient:'',
               state:1,
           },
           table_data:[],
           table_forms: {
                inline: true,
                size:'small',
                submitBtnText: '搜索',
                 initParams:{},
                forms: [
                    { prop: 'queryKey1', label: '',placeholder:'名称/编码' },
                ]
            },
           table_columns:[
                { prop: 'serialNO', label: '序号',minWidth:60},
              { prop: 'name', label: '名称',minWidth:150},
             { prop: 'code', label: '编码',minWidth:250},
              { prop: 'currValue', label: '当前值',minWidth:80},
              { prop: 'unit', label: '单位',minWidth:60},
              { prop: 'lastUpdateTime', label: '最后更新时间',minWidth:120,slotName:'prev-lastTitme'},
          ],

        }
    },
    methods:{
        
    },
    watch:{
        'form_info.id':function(val,oldval){
            this.table_forms.initParams[queryKey]=val;
        },
        
    },
    props:["dialogInfo"],
    components:{}
}
</script>

