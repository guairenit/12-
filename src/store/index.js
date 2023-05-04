import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    monitoring:[],
    questionsTitle:''
  },
  mutations: {
    setMonitoring(state,data){
      state.monitoring.push({
        ...data,
        nowPage:window.location.href,
        steps:state.monitoring.length+1,
        time:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      })
    },
    setquestionsTitle(state,val){
      state.questionsTitle = val
    }
  },
  actions: {
  },
  modules: {
  }
})

