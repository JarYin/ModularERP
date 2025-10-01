import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Organization } from './organization.interface';

@Injectable()
export class OrganizationService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async createOrganization(data: Organization, userId: string): Promise<Organization> {
        // Exclude 'logo' property if present
        const { logo, teamEmails, ...dataWithoutLogo } = data;
        const res = await this.supabaseService
            .getClient()
            .from('organization')
            .insert(dataWithoutLogo)
            .select()
            .single();

        if (!res || res.error) {
            console.error("Failed to create organization:", res?.error?.message || "Unknown error");
            throw new Error(`Failed to create organization: ${res?.error?.message || "Unknown error"}`);
        }

        const orgId = res.data.org_id;

        if (res) {
            const userOrg = await this.supabaseService
                .getClient()
                .from('user_organization')
                .insert({
                    user_id: userId, org_id: orgId,
                    is_active: true
                })
                .select()
                .single();

            if (userOrg.error) {
                console.error("Failed to link user to org:", userOrg.error.message);
                throw new Error(`Failed to link user to org: ${userOrg.error.message}`);
            }

        }

        return res.data;
    }
}