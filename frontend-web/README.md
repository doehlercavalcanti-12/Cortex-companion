# Cortex Companion Web

Interface web segura e responsiva inspirada no aplicativo React Native existente do projeto Cortex Companion.

## Tecnologias

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- [Axios](https://axios-http.com)
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com/)
- ESLint com regras de segurança e acessibilidade

## Como executar

```bash
cd frontend-web
npm install
npm run dev
```

O servidor roda por padrão em `https://localhost:5173`. Ajuste a variável `VITE_API_BASE_URL` conforme necessário (veja `.env.example`).

### Build de produção

```bash
npm run build
```

### Testes

```bash
npm test
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme o ambiente alvo.
