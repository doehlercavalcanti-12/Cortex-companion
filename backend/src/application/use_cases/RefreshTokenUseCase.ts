import { AuthService, TokenPair } from '../../domain/service/AuthService';

export class RefreshTokenUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(refreshToken: string): Promise<TokenPair> {
    const { accessToken, refreshToken: newRefreshToken, expiresIn } =
      await this.authService.refresh(refreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    };
  }
}
