import rateLimit from 'express-rate-limit';
import express from 'express';
import helmet from 'helmet';
import toobusy from 'toobusy-js';
import { UserController } from '../../application/interfaces/controllers/UserController';
import { AuthController } from '../../application/interfaces/controllers/AuthController';
import { CreateUserUseCase } from '../../application/use_cases/CreateUserUseCase';
import { LoginUseCase } from '../../application/use_cases/LoginUseCase';
import { RefreshTokenUseCase } from '../../application/use_cases/RefreshTokenUseCase';
import { LogoutUseCase } from '../../application/use_cases/LogoutUseCase';
import { AuthService } from '../../domain/service/AuthService';
import { UserService } from '../../domain/service/UserService';
import { userRepository } from '../db/userRepository';
import { sessionRepository } from '../db/sessionRepository';
import logger from '../logger';
import config from '../config/appConfig';

const limiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
});

const router = express.Router();

router.use((req, res, next) => {
  if (config.get('env') !== 'test' && toobusy()) {
    logger.warn('Loop de eventos sobrecarregado');
    return res.status(503).json({ message: 'Servidor ocupado, tente novamente.' });
  }
  return next();
});

router.use(helmet());
router.use(express.json({ limit: '1mb' }));
router.use(limiter);

const userService = new UserService(userRepository);
const createUser = new CreateUserUseCase(userService);
const authService = new AuthService(
  userRepository,
  sessionRepository,
  config.get('auth.jwtSecret'),
  config.get('auth.tokenTtl'),
  config.get('auth.refreshTtl'),
);
const loginUseCase = new LoginUseCase(authService);
const refreshTokenUseCase = new RefreshTokenUseCase(authService);
const logoutUseCase = new LogoutUseCase(authService);
const userController = new UserController(createUser);
const authController = new AuthController(loginUseCase, refreshTokenUseCase, logoutUseCase);

router.post('/users', userController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/refresh', authController.refresh);

export default router;
