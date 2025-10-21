import { useCallback, useMemo, useState } from 'react';
import { AUTH_PROVIDERS } from '../constants/security';
import authService from '../services/authService';

const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = useCallback(async () => {
    const response = await authService.login(AUTH_PROVIDERS.OAUTH);
    setToken(response.token);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setToken(null);
  }, []);

  return useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token],
  );
};

export default useAuth;
