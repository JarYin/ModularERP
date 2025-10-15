import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(SupabaseAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request) {
        return this.usersService.getProfile(req);
    }
}
