# Cortex Companion Backend

API Node.js estruturada com Clean Architecture, TypeScript e práticas OWASP Top 10.

## Scripts

- `npm run dev` - executa API com recarga automática
- `npm run build` - compila para produção
- `npm run test` - executa suíte Jest
- `npm run audit` - verifica vulnerabilidades

## Estrutura

```
src/
  application/
    use_cases/
    interfaces/
      controllers/
      storage/
      validators/
  domain/
    model/
    service/
  infrastructure/
    api/
    db/
    logger/
    config/
tests/
  unit/
  integration/
```

O projeto valida e sanitiza entrada com `zod` + `validator`, aplica rate limit, logging estruturado (`pino`) e monitora o event loop (`toobusy-js`).

## Endpoints

- `POST /api/users` — cadastra um novo usuário.
- `POST /api/auth/login` — autentica credenciais e retorna `accessToken`, `refreshToken` e `expiresIn`.
- `POST /api/auth/refresh` — valida o `refreshToken`, rotaciona a sessão e retorna novo par de tokens.
- `POST /api/auth/logout` — invalida o `refreshToken` informado e encerra a sessão associada.
