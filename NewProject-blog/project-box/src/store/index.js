import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isRight: false,
    loginState: false,
    userlog:{},
    activeName: 'first',
    window: false
  },
  mutations: {
    initisRight(state,step) {
      state.isRight = step
    },
    initloginState(state,step) {
      state.loginState = step
    },
    inituserlog(state,step){
      state.userlog = step
    },
    initactiveName(state,step){
      state.activeName = step
    },
    initwindow(state,step){
      state.window = step
    }
  },
  actions: {
    
  },
  modules: {
  }
})
