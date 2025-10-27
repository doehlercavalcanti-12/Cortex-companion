import { UserService } from '../../src/domain/service/UserService';
import { UserRepository } from '../../src/application/interfaces/storage/UserRepository';

const createRepository = (): UserRepository => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
});

describe('UserService', () => {
  it('hashes passwords securely before persisting', async () => {
    const repository = createRepository();
    repository.findByEmail = jest.fn().mockResolvedValue(null);
    repository.create = jest.fn().mockImplementation(async (data) => data as any);

    const service = new UserService(repository);

    const result = await service.create({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'Sup3rSecret#2025',
    });

    expect(repository.create).toHaveBeenCalled();
    expect(result.passwordHash).not.toEqual('Sup3rSecret#2025');
  });
});
