<template>
    <div class="top_loginInfo">
        <div class="top_loginInfo_con">
            <span class="top_time">{{top_time}}</span>
            <span class="top_people" @click="showInfo"><img src="/static/images/top_people.svg"><em>{{user_info.username}}</em></span>
            <span class="top_logout" @click="logout"><img src="/static/images/top_logout.svg"></span>
        </div>
        <userInfo v-bind:dialogInfo="user_info"></userInfo>
    </div>
</template>

<script>
import userInfo from '../dialogUserInfo.vue'
export default {
    created () {
        var loginInfo=sessionStorage.loginInfo?JSON.parse(sessionStorage.loginInfo):{};
        if(JSON.stringify(loginInfo) != "{}"){
            this.user_info.username=loginInfo.username
            this.user_info.id=loginInfo.id;
        }
    },
    mounted() {
        this.top_time= new Date().Format("yyyy-MM-dd hh:mm:ss");
        var _this=this;
        setInterval(function(){
            _this.top_time= new Date().Format("yyyy-MM-dd hh:mm:ss");
        },1000)
    },
    
    data() {
       return {
           top_time:'',
           user_info:{
               title:'修改密码',
               visible:false,
                width:"550px",
                username:'',
                id:'',
           }
       }
   },
    methods:{
       logout:function(){
           this.$confirm("确定注销登录?", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
		    	 this.$api.post('/login/logout', {}, r => {
                console.log(r)
                if(r.success){
                    this.$message.success(r.msg);
                    this.$router.push({path:'/login'});
                }else{
                    this.$message.warning(r.msg);
                }
            }); 
	          
	      });
       },
       showInfo:function(){
            this.user_info.visible=true;
       },
    },
    components:{userInfo}
}
</script>

