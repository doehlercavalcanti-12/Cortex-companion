import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { CreateUserRequest } from '../../application/interfaces/controllers/dto/CreateUserRequest';
import { UserRepository } from '../../application/interfaces/storage/UserRepository';
import { User } from '../model/User';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(payload: CreateUserRequest): Promise<User> {
    const exists = await this.repository.findByEmail(payload.email);

    if (exists) {
      throw new Error('E-mail já cadastrado');
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);

    return this.repository.create({
      id: randomUUID(),
      name: payload.name,
      email: payload.email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
