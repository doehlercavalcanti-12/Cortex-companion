import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import config from '../config/appConfig';
import logger from '../logger';
import { ZodError } from 'zod';

export const createServer = () => {
  const app = express();

  app.use(cors({ origin: config.get('env') === 'development' ? '*' : false }));
  app.use(morgan('combined'));
  app.use('/api', router);

  app.use(
    (err: unknown, req: Request, res: Response, _next: NextFunction): Response => {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Dados inválidos fornecidos na requisição.',
          issues: err.issues,
        });
      }

      if (err instanceof Error) {
        if (err.message === 'E-mail já cadastrado') {
          return res.status(409).json({ message: err.message });
        }

        logger.error({ err, path: req.path }, 'Erro não tratado na API');
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }

      logger.error({ err, path: req.path }, 'Erro desconhecido na API');
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    },
  );

  return app;
};

const app = createServer();

if (config.get('env') !== 'test') {
  const port = config.get('api.port');
  const host = config.get('api.host');

  app.listen(port, host, () => {
    logger.info(`API disponível em http://${host}:${port}`);
  });
}

export default app;
