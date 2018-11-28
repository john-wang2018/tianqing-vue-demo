/*
vuex的核心管理对象模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态对象
const state = { // 初始化状态
  currentUser:null,
  isLogin:false,
}

// 包含多个更新state函数的对象
const mutations = {
  userStatus (state, user) {
    if(user){
      state.currentUser = user
      state.isLogin = true
    }else if(user === null){
      //登出的时候，清空sessionStorage里的东西
      sessionStorage.setItem("username",null);
      state.currentUser=null;
      state.isLogin=false;
    }
  },
}
// 包含多个对应事件回调函数的对象
const actions = {
  saveUser: async ({commit}, user) => {
    commit("userStatus",user)
  }
}
//包含多个getter计算属性函数的对象
const getters = {
  getCurrentUser: (state, getters, rootState) => {
    return state.currentUser
  },
  getIsLogin:(state, getters, rootState) =>{
    return state.isLogin
  }

}

export default new Vuex.Store({
  state,// 状态
  mutations, // 包含多个更新state函数的对象
  actions, // 包含多个对应事件回调函数的对象
  getters //包含多个getter计算属性函数的对象
})
