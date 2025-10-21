import axios from 'axios';
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  const requestConfig = config;
  requestConfig.headers['X-Requested-With'] = 'XMLHttpRequest';
  return requestConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Emitir evento global para forçar logout e rotação de tokens.
    }
    return Promise.reject(error);
  },
);

export default apiClient;
