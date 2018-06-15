<template>
  <div class="loncom_public_submit">
      <span>
          <el-button type="info" size="mini" plain @click="cancel">取消返回</el-button>
      </span>
      <span>
          <el-button type="primary" size="mini" @click="submitInfo">提交信息</el-button>
      </span>
  </div>
</template>

<script>
export default {
    
    methods:{
      cancel:function(){
        var str=this.$route.path;
        var index=str.lastIndexOf("\/")
        var _path=str.substring(0, index);
        this.$router.push({path:_path});
      },
      giveUp:function(){
        var str=this.$route.path;
        var index=str.lastIndexOf("\/")
        var _path=str.substring(0, index);
        this.$router.push({path:_path});
        this.$emit('giveUp');    //v-on:giveUp
        // this.$parent.$parent.reload();
        
      },
      submitInfo:function(){
        this.$emit('submitInfo');
      },
    },
    props:["submitBtnInfo"],
}
</script>