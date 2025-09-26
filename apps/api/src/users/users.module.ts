import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@Module({
  providers: [UsersService, SupabaseAuthGuard],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [SupabaseModule]
})
export class UsersModule {}
