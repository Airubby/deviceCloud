<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">消息模板</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="msManage_tree">
                    <div class="msManage_tree_title">
                        项目选择
                    </div>
                    <div class="msManage_tree_con numScroll0">
                        <div class="numScrollCon0">
                            <div v-for="item in project_data" class="templateManage_inform_probox">
                                <div class="el-collapse-item__header" :class="{'active':item.id==project_id}" @click="proclick(item)">
                                    <i class="el-collapse-item__arrow el-icon-arrow-right"></i>{{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="msManage_table">
                    <div class="loncom_public_filter loncom_mtb20">
                        <div class="loncom_fr">
                            <el-button type="primary" size="small" @click="save">保存</el-button>
                        </div>
                    </div>
                    <div class="loncom_public_table numScroll1">
                        <div class="numScrollCon1 templateManage_informright">
                            <div class="templateManage_inform_form">
                                <el-form :model="form_info" :rules="formRules" ref="formInfo" class="loncom_public_add_form">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>名称：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="name">
                                                <el-input size="small" placeholder="请输入名称" v-model="form_info.name"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>标题：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="title">
                                                <el-input size="small" placeholder="请输入标题" v-model="form_info.title"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>发生告警：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="occurContent">
                                                <el-input type="textarea" v-model="form_info.occurContent"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>告警升级：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="upContent">
                                                <el-input type="textarea" v-model="form_info.upContent"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>告警降级：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="downContent">
                                                <el-input type="textarea" v-model="form_info.downContent"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>解除告警：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="removeContent">
                                                <el-input type="textarea" v-model="form_info.removeContent"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>确认告警：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-form-item prop="confirmContent">
                                                <el-input type="textarea" v-model="form_info.confirmContent"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                            <div class="templateManage_inform_info">
                                <el-collapse accordion>
                                    <el-collapse-item>
                                        <template slot="title">发生告警模板说明：</template>
                                        <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警事件,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。</div>
                                    </el-collapse-item>
                                    <el-collapse-item>
                                        <template slot="title">升级告警模板说明：</template>
                                        <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警事件,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$prealarmlevel 变化前等级，$utime 更新，$preeventvalue  上次告警触发值</div>
                                    </el-collapse-item>
                                    <el-collapse-item>
                                        <template slot="title">降级告警模板说明：</template>
                                        <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警事件,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$prealarmlevel 变化前等级，$utime 更新，$preeventvalue  上次告警触发值</div>
                                    </el-collapse-item>
                                    <el-collapse-item>
                                        <template slot="title">解除告警模板说明：</template>
                                        <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警事件,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$etime 解除时间，$preeventvalue 上次告警触发值</div>
                                    </el-collapse-item>
                                    <el-collapse-item>
                                        <template slot="title">确认告警模板说明：</template>
                                        <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警事件,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$cmtime 确认时间，$cmman 确认人</div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created () {
        //获项目
        this.$api.post('', {}, r => {
            console.log(r)
            if(r.success){
                this.project_data=r.data;
            }
        }); 
    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           project_id:'',
           project_data:[{name:'项目一',id:'1'},{name:'项目2',id:'2'},{name:'项目3',id:'3'}],
           form_info:{
               name:'',
               title:'',
               occurContent:'',
               upContent:'',
               downContent:'',
               removeContent:'',
               confirmContent:'',

           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                occurContent:[
                    { required: true, message: '请输入发生告警', trigger: 'blur' },
                ],
                upContent:[
                    { required: true, message: '请输入告警升级', trigger: 'blur' },
                ],
                downContent:[
                    { required: true, message: '请输入告警降级', trigger: 'blur' },
                ],
                removeContent:[
                    { required: true, message: '请输入解除告警', trigger: 'blur' },
                ],
                confirmContent:[
                    { required: true, message: '请输入确认告警', trigger: 'blur' },
                ],
           },
       }
   },
    methods:{
        //点击项目
       proclick:function(item){
            this.project_id=item.id;

       },
       //编辑
       edit:function(row){
            var id='1';
            this.$router.push({path:'/templateManage/deviceType/add',query:{id:id}});
       },
       //新增
       save:function(){
            
       },

    },
    components:{}
}
</script>