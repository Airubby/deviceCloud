<template>
    <el-dialog :title="dialogRulesInfo.title" :visible.sync="dialogRulesInfo.visible" :width="dialogRulesInfo.width" :append-to-body='true'>
        <div class="loncom_dialog_con loncom_public_add_con" style="height:450px;overflow:auto;">
           <el-search-table-pagination type="remote"  
                url="/eventLib/getSelect"
                list-field="list" 
                total-field="total"
                method='post' 
                 @selection-change="handleSelectionChange"
                :formOptions="table_forms" border :data="table_data" :columns="table_columns" ref="thisRef">  
                <el-table-column slot="prepend" type="selection"></el-table-column>  
            </el-search-table-pagination>
        </div>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogRulesInfo" v-on:dialogSure="dialogSure()"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from './dialogBtnInfo.vue'
export default {
    created () {

    },
    mounted() {
        
    },
    data() {
        return {
            table_data:[],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey', label: '',placeholder:'名称/编码' },
                ]
            },
           table_columns:[
              { prop: 'code', label: '事件编码',minWidth:100},
              { prop: 'name', label: '事件名称',minWidth:100},  
          ],
            multipleSelection:[],
        }
    },
    methods:{
       
      //勾选框
        handleSelectionChange:function(val){
            console.log(val)
            if(val.length>1){
                this.$message.info("请选择一条信息");
            }else{
                if(val.length==1){
                    this.multipleSelection=val;
                }
            }
        },
        //保存的操作
        dialogSure:function(){
            console.log(12321)
            if(this.multipleSelection.length>0){
                if(this.multipleSelection.length!=1){
                    this.$message.warning("请选择一条信息");
                }else{
                    // this.$parent.form_info.eventLibId=this.multipleSelection[0].id;
                    // this.$parent.form_info.eventLibName=this.multipleSelection[0].name;

                    this.dialogRulesInfo.eventLibId=this.multipleSelection[0].id;
                    this.dialogRulesInfo.eventLibName=this.multipleSelection[0].name;
                    this.dialogRulesInfo.visible=false;
                } 
            }else{
                this.$message.warning("请勾选需要的项");
                return;
            }
            
        },
       
       
    },
    props:["dialogRulesInfo"],
    components:{dialogBtnInfo}
}
</script>

