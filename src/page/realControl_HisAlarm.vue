<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备历史数据</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination 
                type="local"
                url=""
                list-field="list" 
                total-field="total"
                method='post' 
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef" >                                                   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
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
               { prop: 'name', label: '名称',minWidth:100},
            //   { prop: 'fullName', label: '单位',minWidth:100},
            //   { prop: 'contacts', label: '联系人',minWidth:100},
            //   { prop: 'phoneNo', label: '联系电话',minWidth:100},
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