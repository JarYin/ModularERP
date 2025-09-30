import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SupabaseService } from './supabase/supabase.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ProfileModule } from './profile/profile.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [LinksModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule, SupabaseModule, ProfileModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule { }
