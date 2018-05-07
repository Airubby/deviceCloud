<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">事件规则模板 &gt; {{topInfo}}</span>
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
                        <div v-if="!form_info.useFel">
                             <div class="loncom_list_boxform">
                                <el-col :span="8">
                                    <el-form-item prop="vara1">
                                        <el-select v-model="form_info.vara1" placeholder="请选择" size="small">
                                            <el-option value="oldvalue">原值</el-option>
                                            <el-option value="newvalue">新值</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="6">
                                    <el-form-item prop="opta">
                                        <el-select v-model="form_info.opta" placeholder="请选择" size="small">
                                            <el-option value="+">+</el-option>
                                            <el-option value="-">-</el-option>
                                            <el-option value="*">*</el-option>
                                            <el-option value="/">/</el-option>
                                            <el-option value=">">></el-option>
                                            <el-option value="<"><</el-option>
                                            <el-option value=">=">>=</el-option>
                                            <el-option value="<="><=</el-option>
                                            <el-option value="!=">!=</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="vara2">
                                        <el-select v-model="form_info.vara2" placeholder="请选择" size="small">
                                            <el-option value="oldvalue">原值</el-option>
                                            <el-option value="newvalue">新值</el-option>
                                        </el-select>
                                        
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="vara2">
                                        <el-input size="small" placeholder="浮点数" v-model="form_info.vara2"></el-input>
                                    </el-form-item>
                                </el-col>
                            </div>
                            <div class="loncom_list_boxform">
                                <div class="loncom_list_box_left">
                                    <el-form-item prop="optc">
                                        <el-select v-model="form_info.optc" placeholder="请选择" size="small">
                                            <el-option value="||">||</el-option>
                                            <el-option value="&&">&&</el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="loncom_list_boxform">
                                <el-col :span="8">
                                    <el-form-item prop="varb1">
                                        <el-select v-model="form_info.varb1" placeholder="请选择" size="small">
                                            <el-option value="oldvalue">原值</el-option>
                                            <el-option value="newvalue">新值</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="6">
                                    <el-form-item prop="optb">
                                        <el-select v-model="form_info.optb" placeholder="请选择" size="small">
                                            <el-option value="+">+</el-option>
                                            <el-option value="-">-</el-option>
                                            <el-option value="*">*</el-option>
                                            <el-option value="/">/</el-option>
                                            <el-option value=">">></el-option>
                                            <el-option value="<"><</el-option>
                                            <el-option value=">=">>=</el-option>
                                            <el-option value="<="><=</el-option>
                                            <el-option value="!=">!=</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="varb2">
                                        <el-select v-model="form_info.varb2" placeholder="请选择" size="small">
                                            <el-option value="oldvalue">原值</el-option>
                                            <el-option value="newvalue">新值</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="vara2">
                                        <el-input size="small" placeholder="浮点数" v-model="form_info.vara2"></el-input>
                                    </el-form-item>
                                </el-col>
                            </div>
                            <div class="loncom_list_boxform">
                                <el-col :span="8">
                                    <el-form-item prop="action">
                                        <el-select v-model="form_info.action" placeholder="请选择" size="small">
                                            <el-option value="1">触发告警</el-option>
                                            <el-option value="0">解除告警</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="6">
                                    <el-form-item prop="eventLibId">
                                        <el-select v-model="form_info.eventLibId" placeholder="请选择" size="small">
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item prop="eventLevel">
                                        <el-select v-model="form_info.eventLevel" placeholder="请选择" size="small">
                                        </el-select>
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
                <SubmitBtnInfo v-bind:submitBtnInfo="activeBtn" v-on:submitInfo="submitInfo('formInfo')"></SubmitBtnInfo>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnInfo from '../components/submitBtnInfo.vue'
export default {

    created () {
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增事件规则模板信息";
        }else{
            this.topInfo="编辑事件规则模板信息"
            this.activeBtn=false;
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
           activeBtn:true,  //默认新增
           form_info:{
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
       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.activeBtn){  //新增

                    }else{  //编辑

                    }
                    this.$api.post('', this.form_info, r => {
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