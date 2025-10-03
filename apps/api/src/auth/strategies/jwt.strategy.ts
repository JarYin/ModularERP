// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET'),
    });
  }

  // Method นี้จะถูกเรียกหลังจาก Token ผ่านการตรวจสอบ Signature แล้ว
  async validate(payload: any) {
    // payload คือข้อมูลที่ถอดรหัสจาก JWT
    // Supabase จะใส่ข้อมูล user ไว้ในนี้ เช่น sub (user_id), email
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles ?? [],
      positions: payload.positions ?? [],
    };
  }
}