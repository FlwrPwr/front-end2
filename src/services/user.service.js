/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    return axios.get('/Auth/userDetails', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get('/Accounts', { headers: authHeader() });
  }
}

export default new UserService();
