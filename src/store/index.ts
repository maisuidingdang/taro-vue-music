import Vue from "vue";
import Vuex from "vuex";
import song from "./song";
Vue.use(Vuex);

const store = {
  state: {
    // song: []
  },

  mutations: {},
  modules: {
    song
  }
};

export default new Vuex.Store(store);
