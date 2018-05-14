<template>
    <div class="realControl_loginInfo">
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
            console.log(loginInfo)
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

       }
    },
    components:{}
}
</script>

