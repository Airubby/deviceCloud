<template>
    <div class="loncom_content">
        <div class="loncom_public_top">
            <span class="loncom_public_topinfo">权限管理</span>
            <loginInfo></loginInfo>
        </div>
        <div class="loncom_public_right loncom_scroll_con">
            <div class="loncom_tpadding">
                <div class="msManage_tree">
                    <div class="msManage_tree_title">
                        权限选择
                    </div>
                    <div class="msManage_tree_con numScroll0">
                        <el-tree
                        ref="tree"
                        :props="defaultProps"
                        :data="tree_data"
                        node-key="id"
                        default-expand-all
                        @node-click="nodeClick"
                        class="numScrollCon0"
                        >
                        </el-tree>
                    </div>
                </div>
                <div class="msManage_table">
                    <div class="loncom_public_table numScroll1">
                        <div class="numScrollCon1">
                            <div class="loncom_public_filter loncom_mb20">
                                <div class="loncom_fr">
                                    <el-button type="primary" size="small" @click="add">新增</el-button>
                                    <el-button type="primary" size="small" @click="del">删除</el-button>
                                    <el-button type="primary" size="small" @click="save('formInfo')">保存</el-button>
                                </div>
                            </div>
                            <el-form :model="form_info" :rules="formRules" ref="formInfo">
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>名称：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="name">
                                            <el-input size="small" placeholder="请输入名称" v-model="form_info.name" :disabled="form_info.parentId==null || form_info.parentId==''"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="loncom_list_boxform">
                                    <div class="loncom_list_box_left">
                                        <em>*</em>编码：
                                    </div>
                                    <div class="loncom_list_box_right">
                                        <el-form-item prop="code">
                                            <el-input size="small" placeholder="请输入编码" v-model="form_info.code" :disabled="form_info.parentId==null || form_info.parentId==''"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div v-if="form_info.parentId!=null && form_info.parentId!=''">
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            <em>*</em>权限类型：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-radio-group v-model="form_info.menuType">
                                                <el-radio label="module">模块</el-radio>
                                                <el-radio label="menu">菜单</el-radio>
                                                <el-radio label="func">功能</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                    <div v-if="form_info.menuType=='module'||form_info.menuType=='menu'">
                                        <div class="loncom_list_boxform">
                                            <div class="loncom_list_box_left">
                                                <em>*</em>图标：
                                            </div>
                                            <div class="loncom_list_box_right">
                                                <el-form-item prop="icon">
                                                    <el-input size="small" placeholder="请输入图标" v-model="form_info.icon"></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="loncom_list_boxform">
                                            <div class="loncom_list_box_left">
                                                <em>*</em>链接：
                                            </div>
                                            <div class="loncom_list_box_right">
                                                <el-form-item prop="url">
                                                    <el-input size="small" placeholder="请输入链接" v-model="form_info.url"></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div class="loncom_list_boxform">
                                            <div class="loncom_list_box_left">
                                                排序：
                                            </div>
                                            <div class="loncom_list_box_right">
                                                <el-form-item prop="idx">
                                                    <el-input size="small" placeholder="排序号又小到大依次显示" v-model="form_info.idx"></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="loncom_list_boxform">
                                        <div class="loncom_list_box_left">
                                            备注：
                                        </div>
                                        <div class="loncom_list_box_right">
                                            <el-input type="textarea" v-model="form_info.remark"></el-input>
                                        </div>
                                    
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
        //获取权限树
        this.getTree(); 
    },
    mounted() {
        numScroll(0);
        numScroll(1);
    },
    data() {
       return {
           form_info:{
               parentId:'',
               id:'',
               name:'',
               code:'',
               menuType:'module',
               icon:'',
               url:'',
               idx:'',
               remark:'',
           },
           formRules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code:[
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
                icon:[
                    { required: true, message: '请输入图片地址', trigger: 'blur' },
                ],
                url:[
                    { required: true, message: '请输入链接', trigger: 'blur' },
                ],
           },

            tree_data: [],
            defaultProps: {
                children: 'subMenu',
                label: 'name'
            },


       }
   },
    methods:{
        //获取权限树
        getTree:function(){
            this.tree_data=[];
            this.$api.post('/menu/getById', {id:1,parentOrSub:'parent'}, r => {
                console.log(r)
                if(r.success){
                    this.tree_data.push(r.data);
                }
            });
        },
        //点击树形节点
        nodeClick:function(node){
            console.log(node)
            this.table_data=[];
            this.treeId=node.id;
            this.$api.post('/menu/getById', {"id":node.id,parentOrSub:'subMenu'}, r => {
                console.log(r)
                if(r.success){
                    for(var item in this.form_info){
                        this.form_info[item]=r.data[item]
                    }
                }
            }); 
        },
        //删除
       del:function(){
           if(this.form_info.id==""){
               this.$message.warning("点击需要删除的节点");
               return false;
           }
           if(this.form_info.parentId==null||this.form_info.parentId==""){
               this.$message.warning("根节点不让删除");
               return false;
           }
            this.$confirm("确定删除 "+this.form_info.name+" 节点？", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
            type:'warning',
	        }).then(() => {
		    	 this.$api.post('/menu/batchUpdateUserState', {"ids":this.form_info.id}, r => {
		       		if(r.success){
                        this.$message.success(r.msg);
                        for(var item in this.form_info){
                            this.form_info[item]='';
                        }
                        this.getTree();
		       		}else{
                        this.$message.warning(r.msg);
                    }
		       	});
	          
	      });
       },
       //保存
       save:function(formName){
           if(this.form_info.parentId==""||this.form_info.parentId==null){
               this.$message.warning("根节点不让修改");
               return false;
           }
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$api.post('/menu/saveEntity', this.form_info, r => {
                        console.log(r)
                        if(r.success){
                            this.$message.success(r.msg);
                            this.getTree();
                        }else{
                            this.$message.warning(r.msg);
                        }
                    }); 
                }
            })
       },
       //新增
       add:function(){
            if(this.form_info.id!=""&&this.form_info.id!=null){
                var _info=Object.assign({}, this.form_info);
                console.log(_info)
                for(var item in this.form_info){
                    if(item=="parentId"){
                        this.form_info[item]=_info.id;
                    }else if(item=="menuType"){
                        this.form_info[item]='module';
                    }else{
                        this.form_info[item]="";
                    }
                }
                console.log(this.form_info)
           }else{
                this.$message.warning("请选择需要添加的到的树形节点");
           }
       },
    

    },
    components:{}
}
</script>