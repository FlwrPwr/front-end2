import { createStore } from 'vuex';
import { auth } from './auth.module';

export default createStore({
  modules: {
    auth,
  },
  state: {
    loader: false,
    sidebar: '',
    locationId: 19,
  },
  mutations: {
    toggle(state) {
      state.loader = !state.loader;
    },
    ChangePage(state, page) {
      state.sidebar = page;
    },
  },
  getters: {
    GetState(state) {
      return state.auth;
    },
  },
});
