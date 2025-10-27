# Cortex Companion Monorepo

Projeto full stack moderno unindo aplicativo React Native, interface web em React e API Node.js com TypeScript, seguindo Clean Architecture e práticas de segurança OWASP Top 10.

## Estrutura

```
frontend/
  App.js
  app.json
  babel.config.js
  package.json
  src/
    components/
    screens/
    hooks/
    services/
    constants/
    features/
    assets/
    tests/
frontend-web/
  package.json
  vite.config.js
  src/
    components/
    screens/
    hooks/
    services/
    constants/
    styles/
    tests/
backend/
  package.json
  tsconfig.json
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

Cada módulo inclui exemplos de código, testes automatizados e configurações de segurança (rate limit, validação, logging estruturado e monitoramento do event loop) para acelerar a implementação de features reais.
