<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备历史数据</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination 
                type="remote"
                url="/hisdata/pointList"
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef" >                                                   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-readFlag">
                        <span v-if="scope.row.readFlag==1||scope.row.readFlag=='1'">是</span>
                        <span v-else>否</span>
                    </template>
                    <template slot-scope="scope" slot="preview-writeFlag">
                        <span v-if="scope.row.writeFlag==1||scope.row.writeFlag=='1'">是</span>
                        <span v-else>否</span>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <a href="javascript:;" class="loncom_color" @click="detail(scope.row)">详情</a>
                    </template>
                </el-search-table-pagination>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created () {
        //获取项目
        this.$api.post('/project/list', {}, r => {
            console.log(r)
            if(r.success){
                this.table_forms.forms[0].options=r.list;
            }
        }); 
        //获取设备
        this.$api.post('/device/list', {}, r => {
            console.log(r)
            if(r.success){
                this.table_forms.forms[1].options=r.list;
            }
        }); 

    },
    mounted() {

    },
    data() {
       return {
           table_data:[
                 {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey1', placeholder:'项目',itemType: 'select',options:[],valueKey:'id',labelKey:'name' },
                    {prop:'queryKey2', placeholder:'设备',itemType: 'select',options:[],valueKey:'id',labelKey:'name'},
                    {prop:'queryKey3',placeholder:'测点'},
                ]
            },
           table_columns:[
               { prop: 'serialNO', label: '序号',minWidth:100},
               { prop: 'name', label: '名称',minWidth:100},
               { prop: 'code', label: '编码',minWidth:100},
              { prop: 'valueType', label: '值类型',minWidth:100},
              { prop: 'offSet', label: '偏移量',minWidth:100},
              { prop: 'readFlag', label: '可读',minWidth:100,slotName:'preview-readFlag'},
              { prop: 'writeFlag', label: '可写',minWidth:100,slotName:'preview-writeFlag'},
              { prop: 'unit', label: '单位',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //详情
       detail:function(row){
            this.$router.push({path:'/realControl/hisData/detail',query:{id:row.id}});
       },

    },
    components:{}
}
</script>