import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

const loginMock = vi.fn();

vi.mock('../hooks/useAuth.js', () => ({
  default: () => ({
    isAuthenticated: false,
    login: loginMock,
    logout: vi.fn(),
    token: null,
  }),
}));

describe('App', () => {
  beforeEach(() => {
    loginMock.mockClear();
  });

  it('renderiza o título da home', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /cortex companion/i })).toBeInTheDocument();
  });

  it('aciona o fluxo de login com segurança', async () => {
    const user = userEvent.setup();
    render(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar com oauth/i });

    await user.click(loginButton);

    expect(loginMock).toHaveBeenCalledTimes(1);
  });
});
