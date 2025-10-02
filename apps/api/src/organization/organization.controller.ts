import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Organization } from './organization.interface';

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) { }

    @UseGuards(SupabaseAuthGuard)
    @Post()
    async createOrganization(@Body() body: Organization, @Req() req) {
        const userId = req.user.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return this.organizationService.createOrganization(body, userId);
    }
}
