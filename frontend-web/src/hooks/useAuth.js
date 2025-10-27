import { useCallback, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService.js';
import { TOKEN_STORAGE_KEY, AUTH_PROVIDERS } from '../constants/security.js';

const isBrowser = typeof window !== 'undefined';

const readTokenFromStorage = () => {
  if (!isBrowser) return null;
  try {
    const raw = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error('Falha ao ler token seguro da sessão.', error);
    return null;
  }
};

const persistToken = (token) => {
  if (!isBrowser) return;
  try {
    if (token) {
      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
    } else {
      window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Não foi possível persistir o token com segurança.', error);
  }
};

const useAuth = () => {
  const [token, setToken] = useState(() => readTokenFromStorage());

  useEffect(() => {
    persistToken(token);
  }, [token]);

  const login = useCallback(async () => {
    const response = await authService.login(AUTH_PROVIDERS.OAUTH);
    if (response?.token) {
      setToken(response.token);
    }
    return response;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token],
  );

  return value;
};

export default useAuth;
