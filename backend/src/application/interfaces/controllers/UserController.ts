import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../use_cases/CreateUserUseCase';
import { validator } from '../validators/userValidator';

export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  register = async (request: Request, response: Response): Promise<Response> => {
    const payload = validator.parse(request.body);
    const user = await this.createUser.execute(payload);
    return response.status(201).json({ id: user.id, email: user.email });
  };
}
