<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">用户管理 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    用户信息
                </div>
                <div class="loncom_public_add_con">
                    <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form loncom_add_form">
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
                                <em>*</em>邮箱：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="email">
                                    <el-input size="small" placeholder="请输入账号" v-model="form_info.email"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>电话：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="phoneNo">
                                    <el-input size="small" placeholder="请输入联系人" v-model="form_info.phoneNo"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                所属客户：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="customerId">
                                    <el-select v-model="form_info.customerId" placeholder="请选择" size="small">
                                        <el-option v-for="item in custNameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>角色：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-form-item prop="roleIds">
                                    <el-select v-model="form_info.roleIds" multiple collapse-tags placeholder="请选择" size="small">
                                        <el-option v-for="item in roleNamesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="loncom_list_boxform">
                            <div class="loncom_list_box_left">
                                <em>*</em>状态：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-radio-group v-model="form_info.vaild">
                                    <el-radio :label="true">启用</el-radio>
                                    <el-radio :label="false">停用</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="loncom_list_boxform" v-if="form_info.id!=''">
                            <div class="loncom_list_box_left">
                                密码：
                            </div>
                            <div class="loncom_list_box_right">
                                <el-button type="primary" size="small" @click="resizePass">重置密码</el-button>
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
        //获取角色信息
        this.$api.post('/role/allRole', {}, r => {
            console.log(r)
            if(r.success){
                this.roleNamesList=r.data;
            }
        }); 
        //获取客户信息
        this.$api.post('/cust/getSelect', {}, r => {
            console.log(r)
            if(r.success){
                this.custNameList=r.data;
                this.custNameList.unshift({id:'',name:''})
            }
        }); 
    },
    mounted() {
        scrollCon();
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增用户信息";
        }else{
            this.topInfo="编辑用户信息"
            this.$api.post('/user/getById', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        if(item=='roleIds'){
                            for(var i=0;i<r.data['roles'].length;i++){
                                var id=checkHasId(r.data['roles'][i].id,this.roleNamesList);
                                this.form_info.roleIds.push(id);
                            }
                        }else if(item=="customerId"){
                            this.form_info.customerId=checkHasId(r.data[item],this.custNameList);
                        }else{
                            this.form_info[item]=r.data[item]; 
                        }
                    } 
                }
            }); 
        }
    },
    data() {
       return {
           //新增编辑控制器头部显示
           topInfo:'',
           form_info:{
               id:'',
               name:'',
               email:'',
               phoneNo:'',
               customerId:'',
               roleIds:[],
               vaild:true,
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                phoneNo:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                ],
                roleIds:[
                    { required: true, message: '请选择角色', trigger: 'change' },
                ],
           },
           //客户信息
           custNameList:[],
           //角色信息
           roleNamesList:[],
       }
   },
    methods:{
       //提交
       submitInfo:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    
                    this.form_info.roleIds=this.form_info.roleIds.toString();
                    console.log(this.form_info)
                    this.$api.post('/user/saveOrUpdateEntity', this.form_info, r => {
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
       //重置密码
       resizePass:function(){
            this.$api.post('/user/resetPwd', {id:this.form_info.id}, r => {
                if(r.success){
                    this.$message.success(r.msg);
                }else{
                    this.$message.warning(r.msg);
                }
            }); 
       },
    },
    components:{SubmitBtnInfo}
}
</script>