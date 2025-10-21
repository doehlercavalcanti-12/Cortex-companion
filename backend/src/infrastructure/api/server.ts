import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import config from '../config/appConfig';
import logger from '../logger';

export const createServer = () => {
  const app = express();

  app.use(cors({ origin: config.get('env') === 'development' ? '*' : false }));
  app.use(morgan('combined'));
  app.use('/api', router);

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
