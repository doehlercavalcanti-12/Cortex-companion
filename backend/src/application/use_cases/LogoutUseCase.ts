import { AuthService } from '../../domain/service/AuthService';

export class LogoutUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(refreshToken: string): Promise<void> {
    await this.authService.logout(refreshToken);
  }
}
