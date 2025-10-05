import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(SupabaseAuthGuard)
  @Get()
  getProfile(@Req() req) {
    const user = req.user;
    console.log('Decoded user:', user);

    const roles = user['roles'] || [];

    return {
      user: {
        ...user,
        roles
      }
    };
  }
}

