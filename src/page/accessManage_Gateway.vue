<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">网关接入</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding accessManage">
                <div class="loncom_public_filter loncom_mtb20">
                    <div class="loncom_filter_group">
                        <span class="loncom_filter_label">类型：</span>
                        <el-select v-model="type" size="small">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="loncom_filter_group">
                        <span class="loncom_filter_label">状态：</span>
                        <el-select v-model="status" size="small">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="loncom_filter_group">
                        <span class="loncom_filter_label">是否启用：</span>
                        <el-select v-model="judge" size="small">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in judge_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="loncom_filter_group">
                        <el-input placeholder="编号" v-model="code" size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div class="loncom_fr">
                        <el-button type="primary" size="small" @click="add">新增</el-button>
                    </div>
                </div>
                <el-search-table-pagination type="local" :show-pagination="true" border :data="table_data" :columns="table_columns" >                                           
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-name">
                        <div>
                            <p>{{scope.row.code}}</p>
                            <p>{{scope.row.name}}</p>
                        </div>
                    </template>
                    <template slot-scope="scope" slot="preview-state">
                        <span v-if="scope.row.state==1||scope.row.state=='1'">启用</span>
                        <span v-else>停用</span>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <div>
                            <p>
                                <a href="javascript:;" class="loncom_color" v-if="scope.row.state=='0'||scope.row.state==0" @click="start(scope.row)">启用</a> 
                                <a href="javascript:;" class="loncom_color" v-if="scope.row.state=='1'||scope.row.state==1" @click="stop(scope.row)">停用</a> 
                                <em>|</em> 
                                <a href="javascript:;" class="loncom_color" @click="protection(scope.row)">维护</a>
                            </p>
                            <p>
                                <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a> 
                                <em>|</em> 
                                <a href="javascript:;" class="loncom_color" @click="remove(scope.row)">删除</a>
                            </p>
                        </div>
                    </template>
                    <div class="loncom_table_btn">
                        <el-button @click="start()" type="info" size="mini" plain>启用</el-button>
                        <el-button @click="protection()" type="info" size="mini" plain>维护</el-button>
                        <el-button @click="stop()" type="info" size="mini" plain>停用</el-button>
                        <el-button @click="del()" type="info" size="mini" plain>删除</el-button>
                    </div>
                    
                </el-search-table-pagination>
            </div>
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
           //筛选信息
           type:'全部',
           status:'全部',
           judge:'全部',
           code:'',
           type_options: [
                {value: '1',label: '空调'}
           ],
           status_options: [
                {value: '1',label: '空调'}
           ],
           judge_options: [
                {value: '1',label: '启用'},
                {value: '2',label: '停用'},
           ],
           table_data:[
                {name:'物联网关',code:'123',type:'物联网卡',state:1,devNum:20,loca:'四川省，成都市，武侯区，科园南二路2号'}
           ],
           table_columns:[
              { prop: 'name', label: '名称',slotName:'preview-name'},
              { prop: 'code', label: '编码'},
              { prop: 'type', label: '类型'},
              { prop: 'state', label: '状态',slotName:'preview-state'},
              { prop: 'devNum', label: '接入设备'},
              { prop: 'loca', label: '位置',minWidth:100},
              { prop: 'handel', label: '操作',slotName:'preview-handle',width:100},
          ],

       }
   },
    methods:{
       //启用
       start:function(){

       },
       //维护
       protection:function(){

       },
       //停用
       stop:function(){

       },
       //删除
       del:function(){

       },
       //新增
       add:function(){
        
       },

    },
    components:{}
}
</script>