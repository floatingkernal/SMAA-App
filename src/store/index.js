import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import sheets from "@/secrets/g-sheets";

export default new Vuex.Store({
  state: {
    sheetsLoading: true,
    sheetRows: null,
    sheetItems: null,
  },
  mutations: {
    loadItems: (state, items) => {state.sheetItems = items},
    loadRows: (state, rows) => {state.sheetRows = rows},
    setLoading: (state, loading) => {state.sheetsLoading = loading}
  },
  actions: {
    loadData: ({commit}) => {
      sheets().then(res => {
        if (!res.items || !res.rows) {
          console.log("Error occured when loading Sheets")
        }
        else {
          commit('loadItems', res.items);
          commit('loadRows', res.rows);
        }
        commit('setLoading', false)
      }) 
    }
  },
  modules: {
  }
})
