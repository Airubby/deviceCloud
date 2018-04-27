import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const storeInfo=new Vuex.Store({
   state:{
       navInfo:{
           navbtn:"open"
       }
   },
   getters:{
       getNavInfo(state){
           return state.navInfo;
       }
   },
   mutations:{
       setNavInfo(state,navInfo){
           state.navInfo=navInfo;
       }
   },
   actions:{
       setNavInfo({commit}){
           commit('setNavInfo');
       }
   }

})


export default storeInfo;