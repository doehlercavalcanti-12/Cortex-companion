import { NextFunction, Request, Response } from 'express';
import { LoginUseCase } from '../../use_cases/LoginUseCase';
import { RefreshTokenUseCase } from '../../use_cases/RefreshTokenUseCase';
import { LogoutUseCase } from '../../use_cases/LogoutUseCase';
import { loginValidator, tokenValidator } from '../validators/authValidators';

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email, password } = loginValidator.parse(req.body);
      const tokens = await this.loginUseCase.execute(email, password);

      return res.status(200).json(tokens);
    } catch (error) {
      return next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { refreshToken } = tokenValidator.parse(req.body);
      const tokens = await this.refreshUseCase.execute(refreshToken);

      return res.status(200).json(tokens);
    } catch (error) {
      return next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { refreshToken } = tokenValidator.parse(req.body);
      await this.logoutUseCase.execute(refreshToken);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };
}
