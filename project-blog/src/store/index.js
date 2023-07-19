import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isRight: false,
    LRon: true,
    log: true,
    nickname: ''
  },
  mutations: {
    initnickname(state, step){
      state.nickname = step
    },
    initisRight(state, step) {
      state.isRight = step
    },
    initLRon(state, step) {
      state.LRon = step
    },
    initlog(state, step) {
      state.log = step
    },
  },
  actions: {
    userData(context){
      axios.get('/api/blog/user/log').then(res => {
        if (res.data.errno === 0) {
          context.commit('initnickname', res.data.msg.nickname)
          context.commit('initlog', false)
        } else {
          context.commit('initlog', true)
        }
      })
    },
  },
  modules: {
  }
})
