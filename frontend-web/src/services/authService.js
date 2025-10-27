import apiClient from './apiClient.js';

const authService = {
  async login(provider) {
    const { data } = await apiClient.post('/auth/login', { provider });
    return data;
  },
  async logout() {
    await apiClient.post('/auth/logout');
  },
  async refreshToken() {
    const { data } = await apiClient.post('/auth/refresh');
    return data;
  },
};

Object.freeze(authService);

export default authService;
