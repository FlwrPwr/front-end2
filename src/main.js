/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */

import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/main.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import utils from './utils/utils';

import auth from './services/auth.service';
import axios from 'axios';
import authHeader from './services/auth-header';

import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

library.add(fas);
library.add(far);
library.add(fab);
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VueMultiselect', VueMultiselect);

app.use(store);
app.use(router);
app.use(VueSweetalert2);
app.config.globalProperties.$utils = utils;
app.config.globalProperties.$auth = auth;

const axiosConfig = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: authHeader(),
  },
});
axiosConfig.interceptors.request.use(
  (config) => {
    store.commit('toggle');
    // if (store.getters.GetState.status.loggedIn) {
    //   console.log('1');
    //   store.dispatch('auth/refresh');
    //   axiosConfig.defaults.headers.Authorization = authHeader();
    // }
    return config;
  },
  (error) => {
    store.commit('toggle');
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  (res) => {
    store.commit('toggle');
    return res;
  },
  (err) => {
    const originalConfig = err.config;
    console.log(originalConfig);
    if (
      originalConfig.url !== '/api/Auth/login' &&
        originalConfig.url !== '/api/Account/register' &&
        err.response
    ) {
      if (err.response.status === 401) {
        return store.dispatch('auth/refresh').then(() => {
          originalConfig.headers.Authorization = authHeader();
          axiosConfig.defaults.headers.Authorization = authHeader();
          store.commit('toggle');
          return axiosConfig(originalConfig);
        });
      }
    }
    store.commit('toggle');
    return Promise.reject(err);
  },
);

app.config.globalProperties.$axios = {
  ...axiosConfig,
};
app.mount('#app');
