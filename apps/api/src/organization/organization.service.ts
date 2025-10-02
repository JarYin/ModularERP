import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Organization } from './organization.interface';
import { randomUUID } from 'crypto';

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

        if (teamEmails && teamEmails.length > 0) {
            for (const email of teamEmails) {
                const token = randomUUID();

                const { data, error } = await this.supabaseService.getClient()
                    .from('invitation')
                    .insert({
                        org_id: orgId,
                        email,
                        invited_by: userId,
                        role_suggestion: "member",
                        token,
                        status: "pending",
                        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        created_at: new Date(),
                    })

                if (error) {
                    console.error("Failed to insert invitation:", error.message, error.details);
                    throw new Error(`Failed to insert invitation: ${error.message}`);
                }
            }
        }

        return res.data;
    }
}