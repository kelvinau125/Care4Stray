// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transaction: null,
  },
  mutations: {
    setTransaction(state, transaction) {
      state.transaction = transaction;
    },
  },
  actions: {
    saveTransaction({ commit }, transaction) {
      commit('setTransaction', transaction);
    },
  },
  getters: {
    transaction: state => state.transaction,
  },
});
