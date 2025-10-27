import { Session } from '../../../domain/model/Session';

export interface SessionRepository {
  create(session: Session): Promise<Session>;
  findByRefreshTokenHash(hash: string): Promise<Session | null>;
  deleteById(id: string): Promise<void>;
  deleteByRefreshTokenHash(hash: string): Promise<void>;
}
