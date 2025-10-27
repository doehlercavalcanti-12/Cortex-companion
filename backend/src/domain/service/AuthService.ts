import { randomUUID, createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../application/interfaces/storage/UserRepository';
import { SessionRepository } from '../../application/interfaces/storage/SessionRepository';
import { AuthenticationError, InvalidTokenError } from '../errors/ApplicationError';
import { Session } from '../model/Session';
import { User } from '../model/User';

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

type JwtPayload = jwt.JwtPayload & { sub: string; sid?: string };

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly sessions: SessionRepository,
    private readonly jwtSecret: string,
    private readonly accessTokenTtl: number,
    private readonly refreshTokenTtl: number,
  ) {}

  async login(email: string, password: string): Promise<TokenPair & { sessionId: string }> {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new AuthenticationError();
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new AuthenticationError();
    }

    return this.issueTokensForUser(user);
  }

  async refresh(refreshToken: string): Promise<TokenPair & { sessionId: string }> {
    const payload = this.verifyRefreshToken(refreshToken);
    const hash = this.hashToken(refreshToken);
    const session = await this.sessions.findByRefreshTokenHash(hash);

    if (!session || session.userId !== payload.sub) {
      throw new InvalidTokenError();
    }

    if (session.expiresAt.getTime() < Date.now()) {
      await this.sessions.deleteById(session.id);
      throw new InvalidTokenError();
    }

    const user = await this.users.findById(payload.sub);

    if (!user) {
      await this.sessions.deleteById(session.id);
      throw new InvalidTokenError();
    }

    await this.sessions.deleteById(session.id);

    return this.issueTokensForUser(user);
  }

  async logout(refreshToken: string): Promise<void> {
    const hash = this.hashToken(refreshToken);
    await this.sessions.deleteByRefreshTokenHash(hash);
  }

  private async issueTokensForUser(user: User): Promise<TokenPair & { sessionId: string }> {
    const sessionId = randomUUID();

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email },
      this.jwtSecret,
      {
        expiresIn: this.accessTokenTtl,
        jwtid: sessionId,
      },
    );

    const refreshToken = jwt.sign(
      { sub: user.id, sid: sessionId },
      this.jwtSecret,
      {
        expiresIn: this.refreshTokenTtl,
      },
    );

    const session: Session = {
      id: sessionId,
      userId: user.id,
      refreshTokenHash: this.hashToken(refreshToken),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.refreshTokenTtl * 1000),
    };

    await this.sessions.create(session);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.accessTokenTtl,
      sessionId,
    };
  }

  private verifyRefreshToken(refreshToken: string): JwtPayload {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as JwtPayload;

      if (!decoded.sub) {
        throw new InvalidTokenError();
      }

      return decoded;
    } catch (error) {
      throw new InvalidTokenError();
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
