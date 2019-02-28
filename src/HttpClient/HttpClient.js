import axios from 'axios';
import DataStore from '../DataStore/DataStore';

class HttpClient {
  apiUrl;
  headers;

  constructor() {
    this.apiUrl = 'http://localhost:5000/';
  }

  generateHeader() {
    this.headers = {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    };
    return this.headers;
  }

  generateAuthenticatedHeader() {
    const token = DataStore.get('token');
    this.headers = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        token: token
      }
    };
    return this.headers;
  }

  async login(user) {
    return await axios.post(
      this.apiUrl + 'auth/login',
      user,
      this.generateHeader()
    );
  }

  async signUp(user) {
    return await axios.post(
      this.apiUrl + 'auth/signup',
      user,
      this.generateHeader()
    );
  }

  async getDetails() {
    return await axios.get(
      this.apiUrl + 'auth/details',
      this.generateAuthenticatedHeader()
    );
  }
}

export default new HttpClient();
