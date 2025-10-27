import bcrypt from 'bcryptjs';
import { AuthService } from '../../src/domain/service/AuthService';
import { UserRepository } from '../../src/application/interfaces/storage/UserRepository';
import { SessionRepository } from '../../src/application/interfaces/storage/SessionRepository';
import { User } from '../../src/domain/model/User';
import { Session } from '../../src/domain/model/Session';
import { AuthenticationError, InvalidTokenError } from '../../src/domain/errors/ApplicationError';

const createUser = async (): Promise<User> => ({
  id: 'user-1',
  name: 'Grace Hopper',
  email: 'grace@example.com',
  passwordHash: await bcrypt.hash('Sup3rSecret#2025', 10),
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createSessionRepository = () => {
  const sessions: Session[] = [];

  const repository: SessionRepository = {
    create: jest.fn(async (session) => {
      sessions.push(session);
      return session;
    }),
    findByRefreshTokenHash: jest.fn(async (hash) => sessions.find((session) => session.refreshTokenHash === hash) ?? null),
    deleteById: jest.fn(async (id) => {
      const index = sessions.findIndex((session) => session.id === id);
      if (index >= 0) {
        sessions.splice(index, 1);
      }
    }),
    deleteByRefreshTokenHash: jest.fn(async (hash) => {
      const index = sessions.findIndex((session) => session.refreshTokenHash === hash);
      if (index >= 0) {
        sessions.splice(index, 1);
      }
    }),
  };

  return { repository, sessions };
};

describe('AuthService', () => {
  const jwtSecret = 'unit-test-secret';
  const accessTtl = 60;
  const refreshTtl = 120;

  it('authenticates users with valid credentials and issues tokens', async () => {
    const user = await createUser();
    const users: UserRepository = {
      findById: jest.fn().mockResolvedValue(user),
      findByEmail: jest.fn().mockResolvedValue(user),
      create: jest.fn(),
    };
    const { repository: sessions } = createSessionRepository();

    const service = new AuthService(users, sessions, jwtSecret, accessTtl, refreshTtl);

    const result = await service.login('grace@example.com', 'Sup3rSecret#2025');

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(result.expiresIn).toBe(accessTtl);
    expect(sessions.create).toHaveBeenCalled();
  });

  it('rejects invalid credentials', async () => {
    const user = await createUser();
    const users: UserRepository = {
      findById: jest.fn().mockResolvedValue(user),
      findByEmail: jest.fn().mockResolvedValue(user),
      create: jest.fn(),
    };
    const { repository: sessions } = createSessionRepository();

    const service = new AuthService(users, sessions, jwtSecret, accessTtl, refreshTtl);

    await expect(service.login('grace@example.com', 'wrong-password')).rejects.toBeInstanceOf(
      AuthenticationError,
    );
  });

  it('rotates refresh tokens when refreshing a session', async () => {
    const user = await createUser();
    const users: UserRepository = {
      findById: jest.fn().mockResolvedValue(user),
      findByEmail: jest.fn().mockResolvedValue(user),
      create: jest.fn(),
    };
    const { repository: sessions } = createSessionRepository();

    const service = new AuthService(users, sessions, jwtSecret, accessTtl, refreshTtl);

    const firstLogin = await service.login('grace@example.com', 'Sup3rSecret#2025');

    const refreshed = await service.refresh(firstLogin.refreshToken);

    expect(refreshed.refreshToken).not.toEqual(firstLogin.refreshToken);
    expect(sessions.deleteById).toHaveBeenCalled();
  });

  it('throws when refresh token is invalid', async () => {
    const user = await createUser();
    const users: UserRepository = {
      findById: jest.fn().mockResolvedValue(user),
      findByEmail: jest.fn().mockResolvedValue(user),
      create: jest.fn(),
    };
    const { repository: sessions } = createSessionRepository();

    const service = new AuthService(users, sessions, jwtSecret, accessTtl, refreshTtl);

    await expect(service.refresh('invalid-token')).rejects.toBeInstanceOf(InvalidTokenError);
  });
});
