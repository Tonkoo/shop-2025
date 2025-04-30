import axios from 'axios';
import { process } from 'std-env';

export const api = axios.create({
  // TODO: вынести в env
  // baseURL: 'http://localhost/api/v1/',
  baseURL: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost/api/v1/',
  withCredentials: true,
});
