export class ApplicationError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
    this.name = new.target.name;
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message = 'Credenciais inválidas.') {
    super(message, 401);
  }
}

export class InvalidTokenError extends ApplicationError {
  constructor(message = 'Token de atualização inválido ou expirado.') {
    super(message, 401);
  }
}
