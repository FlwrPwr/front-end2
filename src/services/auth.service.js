/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

class AuthService {
  login(user) {
    return axios
      .post('/api/Auth/login', user)
      .then((response) => {
        if (response.data.Token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout(user) {
    console.log({ headers: authHeader() });
    localStorage.removeItem('user');
    return axios.post('/api/Auth/logout', user, { headers: authHeader() }).then((response) => response).catch((error) => error);
  }

  register(user) {
    console.log(user);
    return axios.post('/api/Auth/register', user);
  }

  refreshToken(user) {
    const refreshToken = {
      AccessToken: user.Token,
      RefreshToken: user.RefreshToken,
    };
    return axios.post('/api/Auth/refreshToken', refreshToken, { headers: authHeader() })
      .then((response) => {
        if (response.data.RefreshToken) { localStorage.setItem('user', JSON.stringify(response.data)); }
        return response.data;
      }).catch((error) => error);
  }
}

export default new AuthService();
