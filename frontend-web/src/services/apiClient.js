import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const safeConfig = { ...config };
  if (safeConfig.headers) {
    safeConfig.headers['X-Requested-With'] = 'XMLHttpRequest';
  }
  return safeConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.warn('Sessão expirada. Faça login novamente.');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
