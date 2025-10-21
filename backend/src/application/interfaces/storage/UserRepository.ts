import { User } from '../../../domain/model/User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: User): Promise<User>;
}
