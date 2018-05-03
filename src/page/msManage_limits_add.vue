<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">权限管理 &gt; {{topInfo}}</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    权限信息
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
                                <em>*</em>权限类型：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.menuType">
                                    <el-radio label="module">模块</el-radio>
                                    <el-radio label="menu">菜单</el-radio>
                                    <el-radio label="func">功能</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="loncom_list_boxform" v-if="form_info.menuType=='module'||form_info.menuType=='menu'">
                            <div class="loncom_list_box_left">
                                <em>*</em>图标：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="icon">
                                    <el-input size="small" placeholder="请输入图标" v-model="form_info.icon"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform" v-if="form_info.menuType=='module'||form_info.menuType=='menu'">
                            <div class="loncom_list_box_left">
                                <em>*</em>链接：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="url">
                                    <el-input size="small" placeholder="请输入链接" v-model="form_info.url"></el-input>
                                </el-form-item>
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
            this.topInfo="新增角色信息";
        }else{
            this.topInfo="编辑角色信息"
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
               menuType:'module',
               icon:'',
               url:'',
               remark:'',
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
                icon:[
                    { required: true, message: '请输入图片地址', trigger: 'blur' },
                ],
                url:[
                    { required: true, message: '请输入链接', trigger: 'blur' },
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
                }
            })
       },

    },
    components:{SubmitBtnInfo}
}
</script>