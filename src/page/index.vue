<template>
    <div class="loncom_content">
        <navInfo></navInfo>
        <div class="loncom_sidebar_right" ref="content">
            <div class="loncom_content">
                <div class="loncom_public_top">
                    <span class="loncom_public_topinfo">设备云监控系统</span>
                    <loginInfo></loginInfo>
                </div>
                <div class="loncom_public_right loncom_scroll_con">
                    <div class="index_content">
                        <div class="index_box index_box1">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    注册概况
                                </div>
                                <div class="index_box_con" id="indexbarChar"></div>
                            </div>
                        </div>
                        <div class="index_box index_box2">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    告警等级
                                </div>
                                <div class="index_box_con">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="index_box index_box3">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    24H产生告警趋势
                                </div>
                                <div class="index_box_con">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="index_box index_box3">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    24H解除告警趋势
                                </div>
                                <div class="index_box_con">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="index_box index_box4">
                            <div class="boxcontent">
                                <div class="index_box_title">
                                    接入情况
                                </div>
                                <div class="index_box_con">
                                    
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    created () {
        this.$api.post('/dash/getAccesInfo', {}, r => {
            console.log(r)
            if(r.success){

            }
        });
        this.$api.post('/dash/getActiveAlarmInfo', {}, r => {
            console.log(r)
            if(r.success){
                
            }
        });
        this.$api.post('/dash/getSysInfo', {}, r => {
            console.log(r)
            if(r.success){
                
            }
        }); 
    },
    mounted() {
        scrollCon();

        barChar("indexbarChar")

    },
    data() {
       return {
          
       }
   },
    methods:{
       
    },
    components:{}
}
</script>