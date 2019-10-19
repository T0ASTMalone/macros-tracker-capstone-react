import config from '../config';
import jwtDecode from 'jwt-decode';

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },

  parsJWT(jwt) {
    return jwtDecode(jwt);
  },

  readJwtToken() {
    return TokenService.parsJWT(TokenService.getAuthToken());
  },

  _getMsUntilExpiry(paylaod) {
    return paylaod.exp * 1000 - Date.now();
  },

  queueCallBackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
    );

    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },

  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
