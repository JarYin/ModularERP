import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { email: string, password: string };
type SignInData = { userId: number, email: string };
type AuthToken = { accessToken: string, userId: number, email: string };

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async authenticate(input: AuthInput): Promise<AuthToken> {
        const user = await this.validateUser(input);
        if(!user) {
            throw new UnauthorizedException()
        }
        return this.signIn(user);
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findByEmail(input.email);
        if (user && user.password === input.password) {
            return { userId: user.userId, email: user.email };
        }
        return null;
    }

    async signIn(user: SignInData): Promise<AuthToken> {
        const tokenPayload = {
            sub: user.userId,
            email: user.email
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return { accessToken, userId: user.userId, email: user.email };
    }
}
