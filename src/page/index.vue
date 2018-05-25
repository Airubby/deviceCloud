<template>
    <div class="loncom_content">
        <navInfo></navInfo>
        <div class="loncom_sidebar_right" ref="content">
            <router-view v-if="isRouterAlive"></router-view>
        </div>
    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        
    },
    data() {
       return {
          isRouterAlive:true,
       }
   },
    methods:{
        reload () {
            clearInterval(index_getacc);
            clearInterval(index_getal);
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }   
    },
    components:{}
}
</script>