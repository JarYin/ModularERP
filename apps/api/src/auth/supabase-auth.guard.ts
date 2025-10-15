import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import jwt, { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  private supabase = createClient(
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.SUPABASE_URL!,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.SUPABASE_ANON_KEY!
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      this.logger.warn('Missing Authorization header');
      throw new UnauthorizedException('Missing token');
    }

    const [scheme, token] = String(authHeader).split(' ');
    if (scheme !== 'Bearer' || !token) {
      this.logger.warn(`Invalid Authorization header format: ${authHeader}`);
      throw new UnauthorizedException('Invalid token');
    }

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) {
      this.logger.error('SUPABASE_JWT_SECRET is not configured');
      throw new UnauthorizedException('Token verification failed');
    }

    try {
      this.logger.debug('Verifying JWT with HS256 secret');
      const verified = await new Promise<JwtPayload | string>((resolve, reject) => {
        jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
          if (err) {
            this.logger.error('JWT verification failed', err as any);
            reject(err);
          } else {
            resolve(decoded!);
          }
        });
      });

      const payload = typeof verified === 'string' ? undefined : (verified as JwtPayload);
      this.logger.debug(`JWT verified for sub=${payload?.sub ?? 'unknown'}`);

      this.logger.debug('Calling supabase.auth.getUser to validate token with Supabase');
      const { data, error } = await this.supabase.auth.getUser(token);
      if (error || !data?.user) {
        this.logger.warn(`Supabase getUser failed: ${error?.message ?? 'no user returned'}`);
        throw new UnauthorizedException('Invalid Supabase user');
      }

      req.user = {
        ...data.user,
        ...(payload ?? {}),
      };

      this.logger.debug('Authorization successful');
      return true;
    } catch (err) {
      this.logger.error('AuthGuard error during token processing', err as any);
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
