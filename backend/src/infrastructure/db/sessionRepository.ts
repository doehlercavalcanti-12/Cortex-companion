import { SessionRepository } from '../../application/interfaces/storage/SessionRepository';
import { Session } from '../../domain/model/Session';

const sessions: Session[] = [];

export const sessionRepository: SessionRepository = {
  async create(session: Session): Promise<Session> {
    const entry: Session = {
      ...session,
      createdAt: session.createdAt ?? new Date(),
      expiresAt: session.expiresAt ?? new Date(),
    };

    sessions.push(entry);
    return entry;
  },

  async findByRefreshTokenHash(hash: string): Promise<Session | null> {
    return sessions.find((session) => session.refreshTokenHash === hash) ?? null;
  },

  async deleteById(id: string): Promise<void> {
    const index = sessions.findIndex((session) => session.id === id);

    if (index >= 0) {
      sessions.splice(index, 1);
    }
  },

  async deleteByRefreshTokenHash(hash: string): Promise<void> {
    const index = sessions.findIndex((session) => session.refreshTokenHash === hash);

    if (index >= 0) {
      sessions.splice(index, 1);
    }
  },
};
