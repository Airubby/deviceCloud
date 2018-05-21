<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_dialog_con loncom_public_add_con" style="height:500px;overflow:auto;">
            
        </div>
    </el-dialog>
</template>

<script>
export default {
    created () {
        this.$api.post('/gitMap/custInfo', {projectId:this.dialogInfo.projectId}, r => {
            console.log(r)
            if(r.success){

            }
        });
    },
    mounted() {
        
    },
    data() {
        return {
           

        }
    },
    methods:{
        
       

    },
    props:["dialogInfo"],
    components:{}
}
</script>

