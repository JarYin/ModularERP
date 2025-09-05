import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@Module({
  controllers: [ProfileController],
  providers: [SupabaseAuthGuard],
})
export class ProfileModule {}
