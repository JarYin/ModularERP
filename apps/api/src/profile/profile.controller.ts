import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(SupabaseAuthGuard)
  @Get()
  getProfile(@Req() req) {
    return req.user; // JWT payload from Supabase
  }
}
