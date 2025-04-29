import axios from 'axios';

export const api = axios.create({
  // TODO: вынести в env
  baseURL: 'http://localhost/api/v1/',
  withCredentials: true,
});
