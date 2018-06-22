import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const storeInfo=new Vuex.Store({
   state:{
        navList:{},
        realControl:{},
        accessManage:{},
        templateManage:{},
        msManage:{},
        operationManage:{},
   },
   getters:{
       getNavInfo(state){
           return state.navList;
       }
   },
   mutations:{
        resetNavList(state,navList){
            state.navList=navList;
        },
        resetModel(state,obj){
            state.realControl=obj;
            state.accessManage=obj;
            state.templateManage=obj;
            state.msManage=obj;
            state.operationManage=obj;
        },
        setModel(state,arr){
            state[arr[0]][arr[1]]=true;
        }
   },

})


export default storeInfo;