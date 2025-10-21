import { User } from '../../domain/model/User';
import { UserService } from '../../domain/service/UserService';
import { CreateUserRequest } from '../interfaces/controllers/dto/CreateUserRequest';

export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(payload: CreateUserRequest): Promise<User> {
    const user = await this.userService.create(payload);
    return user;
  }
}
