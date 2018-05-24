<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">事件规则模板 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    事件规则模板信息
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
                                <em>*</em>自定义表达式：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.useFel">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <el-col :span="8">
                                <el-form-item prop="action">
                                    <el-select v-model="form_info.action" placeholder="告警条件" size="small">
                                        <el-option :value="1" label="触发告警"></el-option>
                                        <el-option :value="0" label="解除告警"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="6">
                                <el-form-item prop="eventLibId">
                                    <el-select v-model="form_info.eventLibId" placeholder="事件库" size="small">
                                        <el-option
                                        v-for="item in event_lib"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item prop="eventLevel">
                                    <el-select v-model="form_info.eventLevel" placeholder="事件等级" size="small">
                                        <el-option
                                        v-for="item in event_level"
                                        :key="item.code"
                                        :label="item.label"
                                        :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </div>
                        <div v-if="!form_info.useFel">
                             <div class="loncom_list_boxform">
                                <el-col :span="8">
                                    <el-form-item prop="vara1">
                                        <el-select v-model="form_info.vara1" placeholder="请选择" size="small">
                                            <el-option value="oldvalue" label="原值"></el-option>
                                            <el-option value="newvalue" label="新值"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="6">
                                    <el-form-item prop="opta">
                                        <el-select v-model="form_info.opta" placeholder="请选择" size="small">
                                            <el-option value="+" label="+"></el-option>
                                            <el-option value="-" label="-"></el-option>
                                            <el-option value="*" label="*"></el-option>
                                            <el-option value="/" label="/"></el-option>
                                            <el-option value=">" label=">"></el-option>
                                            <el-option value="<" label="<"></el-option>
                                            <el-option value=">=" label=">="></el-option>
                                            <el-option value="<=" label="<="></el-option>
                                            <el-option value="!=" label="!="></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="vara2">
                                        <el-select v-model="form_info.vara2" placeholder="请选择" size="small">
                                            <el-option value="oldvalue" label="原值"></el-option>
                                            <el-option value="newvalue" label="新值"></el-option>
                                        </el-select>
                                        
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="vara2">
                                        <el-input size="small" placeholder="" v-model="form_info.vara2"></el-input>
                                    </el-form-item>
                                </el-col>
                            </div>
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    <el-form-item prop="optc">
                                        <el-select v-model="form_info.optc" placeholder="请选择" size="small">
                                            <el-option value="||" label="||"></el-option>
                                            <el-option value="&&" label="&&"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="loncom_list_boxform">
                                <el-col :span="8">
                                    <el-form-item prop="varb1">
                                        <el-select v-model="form_info.varb1" placeholder="请选择" size="small">
                                            <el-option value="oldvalue" label="原值"></el-option>
                                            <el-option value="newvalue" label="新值"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="6">
                                    <el-form-item prop="optb">
                                        <el-select v-model="form_info.optb" placeholder="请选择" size="small">
                                            <el-option value="+" label="+"></el-option>
                                            <el-option value="-" label="-"></el-option>
                                            <el-option value="*" label="*"></el-option>
                                            <el-option value="/" label="/"></el-option>
                                            <el-option value=">" label=">"></el-option>
                                            <el-option value="<" label="<"></el-option>
                                            <el-option value=">=" label=">="></el-option>
                                            <el-option value="<=" label="<="></el-option>
                                            <el-option value="!=" label="!="></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="varb2">
                                        <el-select v-model="form_info.varb2" placeholder="请选择" size="small">
                                            <el-option value="oldvalue" label="原值"></el-option>
                                            <el-option value="newvalue" label="新值"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="varb2">
                                        <el-input size="small" placeholder="" v-model="form_info.varb2"></el-input>
                                    </el-form-item>
                                </el-col>
                            </div>
                        </div>
                       
                        <div class="loncom_list_boxform" v-if="form_info.useFel">
                            <div class="loncom_list_box_left">
                                <em>*</em>自定义表达式：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-input type="textarea" v-model="form_info.fel"></el-input>
                            </div>
                        </div>
                    </el-form>
                </div>
                <SubmitBtnInfo v-on:submitInfo="submitInfo('formInfo')" ref="goBack"></SubmitBtnInfo>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnInfo from '../components/submitBtnInfo.vue'
export default {

    created () {
        this.getELib();
        this.getELevel();

        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增事件规则模板信息";
        }else{
            this.topInfo="编辑事件规则模板信息";
            this.$api.post('/eventrule/get', {id:obj.id}, r => {
                if(r.success){
                    console.log(r)
                    for(var item in this.form_info){
                        this.form_info[item]=r.data[item]
                    }
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
               useFel:false,
               vara1:'',
               opta:'',
               vara2:'',
               optc:'',
               varb1:'',
               optb:'',
               varb2:'',
               action:'',
               eventLibId:'',
               eventLevel:'',
               fel:'',
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                vara1:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                opta:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                vara2:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                optc:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                varb1:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                optb:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                varb2:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                action:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                eventLibId:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                eventLevel:[
                    { required: true, message: '请选择', trigger: 'change' },
                ],
           },

           //事件库
           event_lib:[],
           //事件等级
           event_level:[],

       }
   },
    methods:{
        //事件库
        getELib:function(){
            this.$api.post('/eventLib/list', {}, r => {
                console.log(r)
                if(r.success){
                    this.event_lib=r.list;
                }
            }); 
        },
        //事件等级
        getELevel:function(){
            this.$api.post('/sysDic/getDicItemByDicCode',{dicCode:'EVENT_LEVEL'},r => { 
                console.log(r)
                if(r.success){
                    this.event_level=r.data;
                }else{this.$message.warning(r.msg);}
            }); 
        },
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){

                    this.$api.post('/eventrule/save', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.$message.success(r.msg);
                            this.$refs.goBack.giveUp();
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
       },

    },
    components:{SubmitBtnInfo}
}
</script>