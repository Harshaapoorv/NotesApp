import axios from 'axios';
// import { BASE_URL } from '@env';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
});

export default api;
