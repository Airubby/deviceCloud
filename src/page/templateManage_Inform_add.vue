<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">消息模板 &gt; {{topInfo}}</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_public_add">
                <div class="loncom_public_add_title">
                    消息模板信息
                </div>
                <div class="loncom_public_add_con">
                    <div class="loncom_public_add_form loncom_overflow_hidden">
                        <div class="templateManage_inform_form">
                            <el-form :model="form_info" :rules="formRules" ref="formInfo">
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
                                    <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警时间,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。</div>
                                </el-collapse-item>
                                <el-collapse-item>
                                    <template slot="title">升级告警模板说明：</template>
                                    <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警时间,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$prealarmlevel 变化前等级，$utime 更新，$preeventvalue  上次告警触发值</div>
                                </el-collapse-item>
                                <el-collapse-item>
                                    <template slot="title">降级告警模板说明：</template>
                                    <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警时间,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$prealarmlevel 变化前等级，$utime 更新，$preeventvalue  上次告警触发值</div>
                                </el-collapse-item>
                                <el-collapse-item>
                                    <template slot="title">解除告警模板说明：</template>
                                    <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警时间,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$etime 解除时间，$preeventvalue 上次告警触发值</div>
                                </el-collapse-item>
                                <el-collapse-item>
                                    <template slot="title">确认告警模板说明：</template>
                                    <div>$eventname 事件名称,$eventcode 事件编码,$realvalue  当前读数,$prevalue  上次采集读数,$alarmlevel  告警等级,$btime 发生告警时间,$action 事件动作，解除确认等,$pointcode 测点编码,$pointname 测点名称,$unit 单位,$devcode 设备编码,$devname 设备名称,$modulecode 模块编码,$modulesno 模块序号,$moduleaddr 模块位置。$cmtime 确认时间，$cmman 确认人</div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </div>
                <SubmitBtnInfo v-on:submitInfo="submitInfo('formInfo')" ref="goBack"></SubmitBtnInfo>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnInfo from '../components/submitBtnInfo.vue'
export default {
    
    created () {
        var obj = this.$route.query;
        if(JSON.stringify(obj) == "{}"){
            this.topInfo="新增消息模板信息";
        }else{
            this.topInfo="编辑消息模板信息"
            this.$api.post('/msgTemplate/get', {id:obj.id}, r => {
                console.log(r)
                if(r.success){
                    for (var item in this.form_info){
                        this.form_info[item]=r.data[item]; 
                    }
                }
            }); 
        }

    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
           topInfo:'',
           form_info:{
               id:'',
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
       //保存
       submitInfo:function(formName){
           this.$refs[formName].validate((valid) => {
                if(valid){
                    this.form_info.projectId=this.projectId;
                    this.$api.post('/msgTemplate/save', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.$message.success(r.msg);
                            this.$refs.goBack.giveUp();
                        }else{
                            this.$message.warning(r.msg);
                        }
                    });
                }
            })
            
       },

    },
    components:{SubmitBtnInfo}
}
</script>