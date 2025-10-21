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
