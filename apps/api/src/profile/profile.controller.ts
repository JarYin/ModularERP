import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(SupabaseAuthGuard)
  @Get()
  getProfile(@Req() req) {
    const user = req.user;

    const roles = user.app_metadata?.roles || []; // หรือ user.user_metadata?.roles

    return {
      user: {
        ...user,
        roles
      }
    };
  }
}

