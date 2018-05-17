<template>
    <div class="top_loginInfo">
        <span class="top_time">{{top_time}}</span>
        <span class="top_people"><img src="static/images/top_people.svg"><em>{{username}}</em></span>
        <span class="top_logout" @click="logout"><img src="static/images/top_logout.svg"></span>
    </div>
</template>

<script>
export default {
    created () {
        var loginInfo=localStorage.loginInfo?JSON.parse(localStorage.loginInfo):{};
        if(JSON.stringify(loginInfo) != "{}"){
            this.username=loginInfo.username
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
           username:'',
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
       }
    },
    components:{}
}
</script>

