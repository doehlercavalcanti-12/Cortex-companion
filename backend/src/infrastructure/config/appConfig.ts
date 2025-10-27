import convict, { Schema } from 'convict';
import { readFileSync } from 'fs';
import { join } from 'path';
import validator from 'validator';

type AppConfig = {
  env: 'production' | 'development' | 'test';
  api: {
    host: string;
    port: number;
  };
  auth: {
    jwtSecret: string;
    tokenTtl: number;
    refreshTtl: number;
  };
  database: {
    url: string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
};

convict.addFormat({
  name: 'ipaddress',
  validate(value: unknown) {
    if (typeof value !== 'string' || !validator.isIP(value)) {
      throw new Error('O host da API deve ser um endereço IP válido.');
    }
  },
});

const schema: Schema<AppConfig> = {
  env: {
    doc: 'Ambiente de execução',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  api: {
    host: {
      doc: 'Host HTTP',
      format: 'ipaddress',
      default: '0.0.0.0',
      env: 'API_HOST',
    },
    port: {
      doc: 'Porta HTTP',
      format: 'port',
      default: 3333,
      env: 'API_PORT',
    },
  },
  auth: {
    jwtSecret: {
      doc: 'Segredo para assinar tokens JWT',
      format: String,
      default: 'insecure-development-secret',
      env: 'JWT_SECRET',
      sensitive: true,
    },
    tokenTtl: {
      doc: 'TTL dos tokens de acesso',
      format: Number,
      default: 900,
      env: 'JWT_TTL',
    },
    refreshTtl: {
      doc: 'TTL dos tokens de atualização',
      format: Number,
      default: 604800,
      env: 'JWT_REFRESH_TTL',
    },
  },
  database: {
    url: {
      doc: 'URL de conexão com o banco de dados',
      format: String,
      default: '',
      env: 'DATABASE_URL',
      sensitive: true,
    },
  },
  rateLimit: {
    windowMs: {
      doc: 'Janela de rate limit em ms',
      format: Number,
      default: 60_000,
      env: 'RATE_LIMIT_WINDOW_MS',
    },
    max: {
      doc: 'Máximo de requisições por janela',
      format: Number,
      default: 100,
      env: 'RATE_LIMIT_MAX',
    },
  },
};

const config = convict<AppConfig>(schema);

const env = config.get('env');
const envFile = join(process.cwd(), 'config', `${env}.json`);

try {
  const envConfig = JSON.parse(readFileSync(envFile, 'utf-8'));
  config.load(envConfig);
} catch (error) {
  if (env !== 'production') {
    console.warn(`Arquivo de configuração opcional não encontrado: ${envFile}`);
  }
}

config.validate({ allowed: 'strict' });

export default config;
