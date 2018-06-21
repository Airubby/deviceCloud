import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const storeInfo=new Vuex.Store({
   state:{
    //    navInfo:{
    //        show:true  //v-if="this.$store.state.navInfo.show"
    //    }
        navList:{},
        realControl:{

        },
        accessManage:{

        },
        templateManage:{

        },
        msManage:{
            
        },
        operationManage:{

        },
   },
   getters:{
    //    getNavInfo(state){
    //        return state.navInfo;
    //    }
   },
   mutations:{ //设置或依赖多个状态的处理地方
    //    setNavInfo(state,navInfo){
    //        state.navInfo=navInfo;
    //    }
   },
   actions:{
    //    setNavInfo({commit}){
    //        commit('setNavInfo');
    //    },
    //    switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
    //         context.commit('Fn'); //这里的Fn是mutations中的Fn(){}
    //         //你还可以在这里触发其他的mutations方法
    //     },
   }

})


export default storeInfo;