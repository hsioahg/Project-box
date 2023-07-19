import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //所有任务列表
    memolist: [],
    inputValue: '',
    userData:[],
    nickname: '',
    level: '',
    juris: '',
    loading: false,
    floor: ''
  },
  mutations: {
    inituserData(state, userData){
      state.userData = userData
    },
    initmemo(state, memolist) {
      state.memolist = memolist
    },
    initnickname(state, nickname) {
      state.nickname = nickname
    },
    initlevel(state, level) {
      state.level = level
    },
    initjuris(state, juris) {
      state.juris = juris
    },
    serInputValue(state, val) {
      state.inputValue = val
    },
    initloading(state, loading) {
      state.loading = loading
    },
    onloading(state, buer) {
      state.loading = buer
    },
    initfloor(state, floornum) {
      state.floor = floornum
    }
  },
  actions: {
    memolist(context){
      axios.get('/api/erp/user/memo').then(res => {
        if (res.data.errno === 0) {
          context.commit('initmemo', res.data.data)
          context.commit('initloading', false)
        }
      })
    },
    userData(context){
      axios.get('/api/erp/user/log').then(res => {
        context.commit('inituserData', res.data)
        context.commit('initnickname', res.data.msg.nickname)
        context.commit('initlevel', res.data.msg.level)
        context.commit('initjuris', res.data.msg.juris)
      })
    },
    
  },
  modules: {
  },
  
})
