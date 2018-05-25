<template>
<!--
    <div class="loncom_content">
        <navInfo></navInfo>
        <div class="loncom_sidebar_right" ref="content">
            <router-view v-if="isRouterAlive"></router-view>
        </div>
    </div>
    -->
    <navInfo></navInfo>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {

    },
    data() {
       return {
        //    isRouterAlive:true,
       }
   },
    methods:{
    //    reload () {
    //         this.isRouterAlive = false
    //         this.$nextTick(() => (this.isRouterAlive = true))
    //     }   
    },
    components:{}
}
</script>