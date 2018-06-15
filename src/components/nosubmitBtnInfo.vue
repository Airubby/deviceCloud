<template>
  <div class="loncom_public_submit">
      <span>
          <el-button type="info" size="mini" plain @click="giveUp">返回</el-button>
      </span>
      <span>
          <el-button type="primary" size="mini" @click="submitInfo">确定</el-button>
      </span>
  </div>
</template>

<script>
export default {
   beforeRouteLeave(to, from, next) {
        console.log('dddddddddddddddddddd')
        // 设置下一个路由的 meta
        //to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
        next();
    },
    methods:{
      giveUp:function(){
        var str=this.$route.path;
        var index=str.lastIndexOf("\/")
        var _path=str.substring(0, index);
        this.$router.push({path:_path});
      },
      submitInfo:function(){
        this.giveUp();
      },
    },
    props:["submitBtnInfo"],
}
</script>