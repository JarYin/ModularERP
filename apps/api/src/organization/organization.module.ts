import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [SupabaseModule]
})
export class OrganizationModule {}
