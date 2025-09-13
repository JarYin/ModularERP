// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

   @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { newPassword: string }) {
    return this.authService.resetPassword(body.newPassword);
  }
}