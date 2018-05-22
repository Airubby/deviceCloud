<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">告警历史数据</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <el-search-table-pagination 
                type="remote"
                url="/eventlog/list"
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
                this.table_forms.forms[0].options.unshift({'id':'',name:'全部'})
            }
        }); 
        
        
        // //获取设备
        // this.$api.post('/device/list', {}, r => {
        //     console.log(r)
        //     if(r.success){
        //         this.table_forms.forms[1].options=r.list;
        //     }
        // }); 

    },
    mounted() {
        scrollCon();
        //获取设备类型
        this.$api.post('/devType/tree',{},r=>{
            console.log(r)
            if(r.success){
                if(r.data.subTypes){
                    spread(r.data.subTypes)
                }
                
            }
        })
        var _this=this;
        var dev_type=[];
        function spread(menus) {
            console.log(menus)
            if(menus!=undefined&&menus.length>0){
                for (var i=0; i < menus.length; i++ ) {
                    var menu = Object.assign({}, menus[i])
                    if (menu.subTypes) {
                        delete menu.subTypes
                        _this.table_forms.forms[1].options.push(menu)
                        spread(menus[i].subTypes)
                    }
                }
            }
            console.log(_this.table_forms.forms[1].options)
        }

    },
    data() {
       return {
           devType:[],
           table_data:[
                //  {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey1', placeholder:'项目',itemType: 'select',options:[{'id':'',name:'全部'}],valueKey:'id',labelKey:'name' },
                    {prop:'queryKey2', placeholder:'设备类型',itemType: 'select',options:[{'id':'',name:'全部'}],valueKey:'id',labelKey:'name'},
                    {prop:'queryKey3',placeholder:'设备编码/名称'},
                    {prop:'queryKey4',placeholder:'省份名'},
                    {prop:'queryKey5',placeholder:'城市名'},
                    {prop:'queryKey6',placeholder:'事件编码/名称'},
                    { prop: 't1-t2', label: '',placeholder:'时间',itemType: 'datetimerange' },
                ]
            },
           table_columns:[
               { prop: 'name', label: '名称',minWidth:100},
              { prop: 'devName', label: '设备名称',minWidth:100},
              { prop: 'cityName', label: '所在城市',minWidth:100},
              { prop: 'projectName', label: '所属工程',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //详情
       detail:function(row){
            this.$router.push({path:'/realControl/hisAlarm/detail',query:{id:row.id}});
       },

    },
    components:{}
}
</script>