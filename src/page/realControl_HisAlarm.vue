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
                class="hisalarm_table"
                @selection-change="handleSelectionChange"
                :formOptions="table_forms" :show-pagination="true" border :data="table_data" :columns="table_columns" ref="thisRef" >    
                    <div class="form_add">
                        <el-button type="primary" size="small" @click="clear">手动解除</el-button>
                    </div>                                                     
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-state">
                        <div v-for="item in eventType">
                            <span v-if="item.code==scope.row.state">{{item.label}}</span>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-occurTime">
                        <div>
                            {{new Date(scope.row.occurTime).Format('yyyy-MM-dd hh:mm:ss')}}
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-removeTime">
                        <div v-if="scope.row.removeTime">
                            {{new Date(scope.row.removeTime).Format('yyyy-MM-dd hh:mm:ss')}}
                        </div>
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
        this.$api.post('/project/getSelect', {}, r => {
            console.log(r)
            if(r.success){
                this.table_forms.forms[0].options=r.data;
                this.table_forms.forms[0].options.unshift({'id':'',name:''})
            }
        }); 
        
        //获取事件状态
        this.$api.post('/comm/getDicItemByDicCode',{dicCode:'EVENT_STATE'},r => { 
            console.log(r)
            if(r.success){
                this.eventType=r.data;
            }else{this.$message.warning(r.msg);}
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
        }

    },
    data() {
       return {
           //获取事件状态
           eventType:[],
           devType:[],
           table_data:[
                //  {id:'1',name:'小张',fullName:'admin',contacts:'小明',phoneNo:'15225252525',vaild:true}
           ],
           table_forms: {
            inline: true,
            size:'small',
            submitBtnText: '搜索',
            forms: [
                    { prop: 'queryKey1', placeholder:'项目',itemType: 'select',options:[],valueKey:'id',labelKey:'name' },
                    {prop:'queryKey2', placeholder:'设备类型',itemType: 'select',options:[{'id':'',name:''}],valueKey:'id',labelKey:'name'},
                    {prop:'queryKey3',placeholder:'设备编码/名称'},
                    {prop:'queryKey4',placeholder:'省份名'},
                    {prop:'queryKey5',placeholder:'城市名'},
                    {prop:'queryKey6',placeholder:'事件编码/名称'},
                    { prop: 't1-t2', label: '',placeholder:'时间',itemType: 'datetimerange' },
                ]
            },
           table_columns:[
              { prop: 'projectName', label: '项目',minWidth:100},
              { prop: 'moduleName', label: '模块',minWidth:100},
              { prop: 'devName', label: '设备',minWidth:100},
              { prop: 'devTypeName', label: '设备类型',minWidth:90},              
              { prop: 'pointName', label: '属性',minWidth:100},
              { prop: 'name', label: '事件名称',minWidth:110},              
              { prop: 'topLevelName', label: '事件等级',minWidth:60},              
              { prop: 'state', label: '状态',minWidth:60,slotName:'preview-state'},              
              { prop: 'occurTime', label: '触发时间',minWidth:90,slotName:'preview-occurTime'},
              { prop: 'removeTime', label: '解除时间',minWidth:90,slotName:'preview-removeTime'},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],
           //勾选的
          multipleSelection:[],

       }
   },
    methods:{
        //勾选框
        handleSelectionChange:function(val){
            this.multipleSelection=[];
            for(var i=0;i<val.length;i++){
                this.multipleSelection.push(val[i].id);
            }
        },
       //详情
       detail:function(row){
            this.$router.push({path:'/realControl/hisAlarm/detail',query:{id:row.id}});
       },
       clear:function(){
           var ids=[];
           if(this.multipleSelection.length>0){
                ids=this.multipleSelection;
            }else{
                this.$message.warning("请勾选需要手动解除的项");
                return;
            }
            this.$confirm("确定解除勾选的项吗?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
	        }).then(() => {
                var thisID=ids.toString();
                console.log(thisID);
		    	 this.$api.post('/eventlog/removeEvent', {"ids":thisID}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        this.$refs['thisRef'].searchHandler(false)
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
            
       },

    },
    components:{}
}
</script>