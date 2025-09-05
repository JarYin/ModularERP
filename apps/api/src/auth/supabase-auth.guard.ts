import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];

        if (!authHeader) throw new UnauthorizedException('Missing token');
        const token = authHeader.split(' ')[1];

        try {
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);
            req.user = decoded;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}