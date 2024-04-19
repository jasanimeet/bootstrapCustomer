import { STORAGE_KEY } from '../constant/storage';

class Storage {
  static setStorageData(key, data) {
    localStorage.setItem(key, data);
  }

  static setStorageJsonData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static getJson(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static delete(key) {
    localStorage.removeItem(key);
  }

  // Others
  static getToken() {
    return localStorage.getItem(STORAGE_KEY.token);
  }

  static isUserAuthenticated() {
    return (localStorage.getItem(STORAGE_KEY.token) !== null);
  }

  static deauthenticateUser() {
    localStorage.removeItem(STORAGE_KEY.token);
  }
}

export default Storage;
