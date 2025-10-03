// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { RoleGuard } from './guards/roles.guard';
import { JobPositions } from './decorators/positions.decorator';
import { JobPositionGuard } from './guards/positions.guard';

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

  @Get('me')
  @UseGuards(SupabaseAuthGuard, RoleGuard, JobPositionGuard)
  @Roles('employee')
  @JobPositions('hr_officer')
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