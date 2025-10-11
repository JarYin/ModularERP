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

    @UseGuards(SupabaseAuthGuard)
    @Post('get-by-id')
    async getOrganizationById(@Req() req): Promise<Organization | null> {
        return this.organizationService.getOrganizationById(req);
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('get-by-organization')
    async getOrganizationsByUser(@Req() req): Promise<Organization[]> {
        const orgId: string = req.user.org_id;
        return this.organizationService.getUserOrganizations(orgId);
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('update')
    async updateOrganization(@Body() body: Partial<Organization>, @Req() req): Promise<Organization | null> {
        const orgId: string = req.user.org_id;
        return this.organizationService.updateOrganization(orgId, body);
    }
}