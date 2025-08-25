import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];

        if (typeof token !== 'string' || !token) {
            throw new UnauthorizedException();
        }

        try{
            await this.jwtService.verifyAsync(token);
            return true;
        } catch {
            throw new UnauthorizedException();
        }
        
    }
}