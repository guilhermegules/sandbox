import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({});
  }

  validate(payload: { sub: string; email: string; role: string }) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
