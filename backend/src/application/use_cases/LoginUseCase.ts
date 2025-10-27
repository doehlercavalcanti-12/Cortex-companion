import { AuthService, TokenPair } from '../../domain/service/AuthService';

export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(email: string, password: string): Promise<TokenPair> {
    const { accessToken, refreshToken, expiresIn } = await this.authService.login(email, password);

    return { accessToken, refreshToken, expiresIn };
  }
}
