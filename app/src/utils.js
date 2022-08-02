import axios from 'axios';
import config from './config.json';

const publicFetch = axios.create({
  baseURL: config.API_URL
})

export { publicFetch}