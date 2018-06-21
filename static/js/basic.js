var index_getacc,index_getal;  //index页面的定时器
//ajax请求没用ajax请求
function open_ajax(url, parameter, request,type, error, async) {
    type = type ? type : "Get";
    $.ajax({
        type: type,
        url: url,
        data: parameter,
        async: async ? async : true,
        cache:false,
        error: function () {
            if (error != null && error != "") {
                error();
            }
        },
        success: function (msg) {
            if (request)
                request(msg);
        }
    });
}
//获取url传递的参数
function getQueryParams(url) {
    var match,
    pl = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query = window.location.search.substring(1);
    if (url) query = url.substr(url.indexOf("?") + 1)

    var urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    
    return urlParams;
} 
//生成树形JSON
function getJsonTree(dataJson,parentId){
    var itemArr=[];
    for(var i=0;i<dataJson.length;i++){ 
        var node=dataJson[i];
        if(node.pid==parentId){ 
            var newNode=node;
            newNode.children=getJsonTree(dataJson,node.id);
            itemArr.push(newNode);              
        }
    }
    return itemArr;
}
//树形JSon生成list  自己定义个menuArr全局变量
// function spread(menus) {
//     for (var i=0; i < menus.length; i++ ) {
//         menu = menus[i]
//         if (menu.children) {
//             spread(menu.children)
//             delete menu.children
//         }
//         menuArr.push(menu)
//     }
// }

//超出滚动
function scrollCon(){
	//获取要滚动的dom高度
    if($(".loncom_scroll_con").length>0){
    	var docHeight=$(window).height();
        var scrollHieght=$(".loncom_public_top").outerHeight();
        var thisHeight=$(".loncom_scroll_con").height();
        if($(".loncom_scroll_con").siblings().hasClass("loncom_public_top")){
        	$(".loncom_scroll_con").height(docHeight-scrollHieght);
        }else{
        	$(".loncom_scroll_con").height(thisHeight);
        }
        //添加滚动
        $('.loncom_scroll_con').niceScroll({
            cursorcolor: "rgba(204, 204, 204, 0.4)",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "2px", //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            cursorborderradius: "2px",//以像素为光标边界半径
            autohidemode: true //是否隐藏滚动条
        });
    }
    if($(".loncom_public_add_con").length>0){
        $('.loncom_public_add_con').niceScroll(".loncom_public_add_form",{
            cursorcolor: "rgba(204, 204, 204, 0.4)",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "2px", //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            cursorborderradius: "2px",//以像素为光标边界半径
            autohidemode: true //是否隐藏滚动条
        });
    }
}

$(window).resize(function () {
	scrollCon();
});
//全屏切换
var isFullScreen=false;//是否是全屏状态
function switcFullScreen(){
    if(isFullScreen){//是全屏就退出全屏
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }else{//不是就全屏
        var element=document.documentElement;
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    isFullScreen=!isFullScreen;
}	
//打开window弹窗
function windowOpen(url,Width,Height){
    var iWidth,iHeight;
    if(Width!=undefined&&Height!=undefined){
        iWidth=Width;
        iHeight=Height;
    }else{
        iWidth=1000;
        iHeight=600;
    }
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 10 - iHeight) / 2;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, "_blank", 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}
//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//tabs页面级的切换的滚动
function numScroll(num){
    $('.numScroll'+num).niceScroll(".numScrollCon"+num,{
        cursorcolor: "rgba(204, 204, 204, 0.4)",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "2px",//以像素为光标边界半径
        autohidemode: true //是否隐藏滚动条
    });
}

//websocket的连接函数
function wsConnection(port, type, callback) {
    // var url = location.host.indexOf(":")!=-1?location.host.slice(0, location.host.indexOf(":")):location.host
    var url="192.168.10.134"
    try {
        var SOCKECT_ADDR = "ws://" + url +":"+ port+'/websocket';
        ws = new WebSocket(SOCKECT_ADDR);
        ws.onopen = function (event) {
            console.log("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState);
            ws.send(type);
        };
       
        ws.onmessage = callback;
        ws.onclose = function (event) {
        };
        ws.onerror = function (event) {
           // console("WebSocket异常！" + event.toString());
        };
    } catch (ex) {
        console(ex.message);
    }
}
// wsConnection('80','',function(r){
//     console.log(r)
// })



//echarts 图
function echartLine(ID,xData,yData){
    var myChart = echarts.init(document.getElementById(ID));
    option = {
        color:["#DA632A","#33C466"],
        tooltip : {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            axisTick:{
                    show:false
                }, 
            data: xData
        },
        yAxis: {
            axisLabel:{
                formatter: '{value}'
            }
        },
        series: [{
            data: yData,
            type: 'line',
            smooth: true,
            symbol:"line", //不要圆圈
            symbolSize:0, //平滑的时候设置为0
        }]
    };
    myChart.setOption(option, true);
    return myChart;
}

// index的
function barChar(ID,xData,yData){
    var color=['#2f8fbe','#f00','#f00','#c98','#76f'];
    var myChart = echarts.init(document.getElementById(ID));
    option = {
        //color:['#2f8fbe','#f00','#09c','#c98','#76f'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:'{b}：{c}'
        },
        grid: {
            top:'40px',
            bottom: '15px',
            left:'15px',
            right:'15px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : xData,
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#000"
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#333",
                        width:1,
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{
                    color:"#000"
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#333",
                        width:1,
                    }
                },
            }
        ],
        series : [
            {
                type:'bar',
                barWidth: '50%',
                itemStyle:{
                    normal:{
                        color: function(params){
                            var index_color = params.name;
                            if(index_color=="客户"){
                                return '#2f8fbe';
                            }else if(index_color=="项目") {
                                return '#0dff00';
                            }else if(index_color=="模块"){
                                return '#09c';
                            }else if(index_color=="设备"){
                                return '#fd0000';
                            }else{
                                return '#ccc'
                            }
                        } 
                    }
                },
                data:yData
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}
function LineChar(ID,xData,yData,color){
    //color=["#DA632A","#f7bca0","#ffe9de"]
    var myChart = echarts.init(document.getElementById(ID));
    option = {
        color:[color[0]],
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            left: '20px',
            right: '20px',
            top:'5px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick:{
                show:false
            }, 
            axisLine:{
                show:false,
                lineStyle:{
                    color:"#304a5d",
                    width:1,
                }
            },
            axisLabel:{
                color:"#ccc"    
            },     
            data: xData
        },
        yAxis: {
            axisTick:{
                show:false,
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:"#EAEEF1",
                    width:1,
                    type:"solid",
                }
            },
            axisLine:{
                show:false
            },
            axisLabel:{
                color:"#ccc",
                formatter: '{value}'
            }
        },
        series: [{
            data: yData,
            type: 'line',
            lineStyle:{
                width:5,
                color:'#DA632A'
            },
            smooth: true,
            symbol:"line", //不要圆圈
            symbolSize:0, //平滑的时候设置为0
            areaStyle: {normal: {color:new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: color[1]},
                    {offset: 0.99, color: color[2]}
                ]
            )}},

        }]
    };
    myChart.setOption(option, true);
    return myChart;
}
function piemoreChar(ID,xData,yData,allAlarm,color) {
    var myChart = echarts.init(document.getElementById(ID));
    var _color=["#e92f0d","#fbf320","#09c","#3ff504"];
    if(color){
        for(var i=0;i<color.length;i++){
            if(color[i]!=""){
                _color[i]=color[i];
            }
        }
    }
    var option = {
        color:_color,
        title:{
            text:"告警总数："+allAlarm,  
            top: 15,
            left:15,
            textStyle:{
                color:_color[0],
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            y: 'center',
            orient: 'vertical',
            x: '20px',
            textStyle:{
                color:'#000'
            },
            data:xData
        },
        series: [
            {
                type:'pie',
                radius: ['70%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:yData
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}

function twoLineChar(ID,xData,yData1,yData2,color1,color2,name){
    // var xData=['23','234','54'];
    // var yData1=[123,124,323]
    // var yData2=[173,324,323]
    // var name=['大大','xia']
    // color1=["#5085FF","#B5CAFE","#F4F8FF"];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:[color1[0],color2[0]],
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            bottom: 5,
            textStyle:{
                color:"#ccc"
            },
            data:name
        },
        grid: {
            left: '20px',
            right: '20px',
            top:'5px',
            bottom: '40px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:"#333",
                        width:1,
                    }
                },
                axisTick:{
                    show:false
                },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                data :xData
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show:true,
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:"#333",
                        width:1,
                    }
                },
                 splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#EAEEF1",
                        width:1,
                        type:"solid",
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#ccc",
					formatter: '{value}'
                }
            }
        ],
        series : [
         {
            name:name[0],
            type:'line',
            smooth:"true", 
            symbol:"line",
            symbolSize:0,
            areaStyle: {normal: {color:new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: color1[1]},
                    {offset: 0.99, color: color1[2]}
                ]
            )}},
            data:yData1
        },
        {
            name:name[1],
            type:'line',
            smooth:"true", //平滑
            symbol:"line", //不要圆圈
            symbolSize:0, //平滑的时候设置为0
            areaStyle: {normal: {color:new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: color2[1]},
                    {offset: 0.99, color: color2[2]}
                ]
            )}},
            data:yData2
        },
    ]
    };
    myChart.setOption(option, true);
    return myChart; 
}
function gaugeChar(ID,title,value,max){
    var myChart = echarts.init(document.getElementById(ID));
   var option = {
        
        tooltip : {
            formatter: "{a} : {c}"
        },
        series: [
            {
                name: 'PUE',
                type: 'gauge',
                radius:'95%',
                min:0,
                max:max,
                splitNumber:0,
                axisLine:{
                    lineStyle:{
                        color:[[value/max, new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#F8666B'},
                                        {offset: 0.99, color: '#5C72F7'}
                                    ]
                                )],[1, "#E2E2EA"]],
                        width:'10',
                    }
                },
                splitLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                pointer:{
                    length:'75%',
                    width:'4%'
                },
                itemStyle:{
                    normal:{
                        color:new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#F8666B'},
                                        {offset: 0.99, color: '#5C72F7'}
                                    ]
                                )
                    }
                },
                title:{
                    show:false
                },
                detail: {
                        show: true,
						textStyle: {
							fontSize: 15,
							color:'#5E73F6',
						},
                        formatter: title+':' + '{value}',
                        offsetCenter: [0, '88%'],
                        

                    },
                data: [{value: value}]
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}

//编辑时下拉框中判断编辑返回的信息在下拉信息中是否存在
function checkHasId(id,list){
    for(var i=0;i<list.length;i++){
        if(id==list[i].id){
            return list[i].id;
        }
    }
    return '';
}





























