import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportAuthController } from './passport.auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      }),
    }),
    SupabaseModule
  ],
  providers: [AuthService, JwtStrategy, SupabaseService],
  exports: [],
  controllers: [AuthController, PassportAuthController]
})
export class AuthModule {}