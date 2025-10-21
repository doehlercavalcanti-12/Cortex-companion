import { UserRepository } from '../../application/interfaces/storage/UserRepository';
import { User } from '../../domain/model/User';

const inMemoryUsers: User[] = [];

export const userRepository: UserRepository = {
  async findByEmail(email: string): Promise<User | null> {
    return inMemoryUsers.find((user) => user.email === email) ?? null;
  },
  async create(data: User) {
    const user: User = {
      ...data,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    };

    inMemoryUsers.push(user);
    return user;
  },
};
