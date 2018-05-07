<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">设备类型</span>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="msManage_tree">
                    <div class="msManage_tree_title">
                        设备选择
                    </div>
                    <div class="msManage_tree_con numScroll0">
                        <el-tree
                        :data="tree_data"
                        node-key="id"
                        class="numScrollCon0"
                        >
                        </el-tree>
                    </div>
                </div>
                <div class="msManage_table">
                    <div class="loncom_public_filter loncom_mtb20">
                        <div class="loncom_fr">
                            <el-button type="primary" size="small" @click="add">新增</el-button>
                            <el-button type="primary" size="small" @click="del">删除</el-button>
                            <el-button type="primary" size="small" @click="save('formInfo')">保存</el-button>
                        </div>
                    </div>
                    <div class="loncom_public_table numScroll1">
                        <div class="numScrollCon1 templateManage_informright">
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
                                        <em>*</em>编码：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="code">
                                            <el-input size="small" placeholder="请输入编码" v-model="form_info.code"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>是否可用：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-radio-group v-model="form_info.vaild">
                                            <el-radio label="true">可用</el-radio>
                                            <el-radio label="false">不可用</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>设备类型模板：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="tempId">
                                            <el-select v-model="form_info.tempId" placeholder="请选择">
                                                <el-option
                                                v-for="item in templist"
                                                :key="item.tempId"
                                                :label="item.name"
                                                :value="item.tempId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-form>
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
        
    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           form_info:{
               name:'',
               code:'',
               vaild:'true',
               tempId:'',
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入采集周期', trigger: 'blur' },
                ],
                tempId:[
                    { required: true, message: '请选择设备模板', trigger: 'change' },
                ],
           },

          tree_data: [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                id: 9,
                label: '三级 1-1-1'
                }, {
                id: 10,
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
            }, 
            {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],

            //设备类型模板
            templist:[{tempId:'123',name:'模板已'}],

       }
   },
    methods:{
       //删除
       del:function(){

       },
       //启用
       save:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.activeBtn){  //新增

                    }else{  //编辑

                    }
                }
            })
       },
       //编辑
       edit:function(){

       },
       //新增
       add:function(){

       },

    },
    components:{}
}
</script>