<template>
    <div class="loncom_login">
        <div class="loncom_login_con loncom_public_shadow">
            <div class="loncom_logo_img"></div>
            <div class="loncom_logo_text">设备云管理系统</div>
            <div class="loncom_login_input">
                <el-form :model="user" :rules="rules" ref="userName">
                    <div class="loncom_user">
                        <el-form-item prop="userid">
                            <el-input v-model.trim="user.userid" placeholder="请输入用户名称"></el-input>
                        </el-form-item>
                    </div>
                    <div class="loncom_pass">
                        <el-form-item prop="psword">
                            <el-input v-model.trim="user.psword" type="password" placeholder="请输入登录密码" @keyup.native="keyLogin($event,'userName')"></el-input>
                        </el-form-item>
                    </div>
                    <el-button type="warning" @click="loginIn('userName')" @keydown="keyLogin($event,'userName')">登录</el-button>
                </el-form>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  created () {
      sessionStorage.clear();
      clearInterval(index_getacc);
      clearInterval(index_getal); 
 },
 data(){
  
  	return {
        user:{
            userid:"",
            psword:""
        },
        rules: {
			userid:[
				{ required: true, message: '请输入用户名', trigger: 'blur' },
			],
			psword:[
				{ required: true, message: '请输入密码', trigger: 'blur' },
			]
		 }
  	}
  },
  methods:{
      keyLogin:function(ev,user){
		if(ev.keyCode == 13){
			this.loginIn(user);
		}
	  },
      loginIn:function(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$api.post('/login/getSalt', {}, r => {
                    if(r.success){
                        var md5pwd= b64_md5(b64_md5(this.user.userid+ r.salt1 + b64_md5(this.user.psword)) + r.salt2);
                        this.$api.post('/login/login', {user:this.user.userid,pagePwd:md5pwd}, re => {
                            if(re.success){
                                this.$message.success('登录成功！');
                                //存登录信息
                                var loginInfo={};
                                if(sessionStorage.loginInfo){
                                    loginInfo=JSON.parse(sessionStorage.loginInfo);
                                }
                                loginInfo.username=this.user.userid;
                                loginInfo.id=re.data.id;
                                sessionStorage.loginInfo = JSON.stringify(loginInfo);
                                this.getComponent(re.data.id);
                                this.$router.push({path:'/'});
                            }else{
                                this.$message.warning(re.msg);
                            }
                        });
                    }
                });
            } 
        });
          
      }
  }
}
</script>