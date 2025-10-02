// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string, firstName: string, lastName: string }) {
    return this.authService.signUp(body.email, body.password, body.firstName, body.lastName);
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

  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('me')
  getProfile(@Req() req) {
    const user = req.user;
    return {
      user: {
        id: user.id,
        email: user.email,
        roles: user.app_metadata?.roles || [],
      },
    };
  }
}