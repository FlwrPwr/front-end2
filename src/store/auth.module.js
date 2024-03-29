/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    refresh({ commit }) {
      return AuthService.refreshToken(this.state.auth.user).then(
        () => {
          commit('refreshToken');
          return Promise.resolve();
        },
        (error) => {
          commit('refreshTokenFailure');
          return Promise.reject(error);
        },
      );
    },
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
    },
    logout({ commit }) {
      return AuthService.logout(this.state.auth.user).then(
        () => {
          commit('logout');
          return Promise.resolve();
        },
        (error) => Promise.reject(error),
      );
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        (error) => {
          commit('registerFailure');
          return Promise.reject(error);
        },
      );
    },
  },
  mutations: {
    refreshToken(state) {
      state.status.loggedIn = true;
    },
    refreshTokenFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
