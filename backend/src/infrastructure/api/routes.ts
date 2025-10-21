import rateLimit from 'express-rate-limit';
import express from 'express';
import helmet from 'helmet';
import toobusy from 'toobusy-js';
import { UserController } from '../../application/interfaces/controllers/UserController';
import { CreateUserUseCase } from '../../application/use_cases/CreateUserUseCase';
import { UserService } from '../../domain/service/UserService';
import { userRepository } from '../db/userRepository';
import logger from '../logger';
import config from '../config/appConfig';

const limiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
});

const router = express.Router();

router.use((req, res, next) => {
  if (toobusy()) {
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
const userController = new UserController(createUser);

router.post('/users', userController.register);

export default router;
