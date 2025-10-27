import { renderHook, act } from '@testing-library/react';
import useAuth from '../hooks/useAuth.js';

const loginResponse = { token: 'secure-token' };

vi.mock('../services/authService.js', () => ({
  default: {
    login: vi.fn(async () => loginResponse),
    logout: vi.fn(async () => undefined),
    refreshToken: vi.fn(async () => loginResponse),
  },
}));

let authService;

beforeAll(async () => {
  ({ default: authService } = await import('../services/authService.js'));
});

describe('useAuth', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('persiste o token após login bem sucedido', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login();
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(window.sessionStorage.getItem('cortex-companion::token')).toBe(JSON.stringify(loginResponse.token));
  });

  it('limpa o token ao deslogar', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login();
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(window.sessionStorage.getItem('cortex-companion::token')).toBeNull();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
