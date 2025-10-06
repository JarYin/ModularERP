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

            const { data: ownerRole, error: ownerRoleError } = await this.supabaseService
                .getClient()
                .from('role')
                .select('role_id')
                .eq('name', 'owner')
                .single();

            if (ownerRoleError || !ownerRole) {
                console.error("Failed to find 'owner' role:", ownerRoleError?.message || 'role not found');
                throw new Error(`Failed to find 'owner' role: ${ownerRoleError?.message || 'role not found'}`);
            }

            const userRole = await this.supabaseService
                .getClient()
                .from('user_role')
                .insert({
                    id: randomUUID(),
                    user_id: userId,
                    org_id: orgId,
                    role_id: ownerRole.role_id,
                    assigned_by: userId,
                    assigned_at: new Date(),
                })
                .select()
                .single();

            if (userRole.error) {
                console.error("Failed to assign role to user:", userRole.error.message);
                throw new Error(`Failed to assign role to user: ${userRole.error.message}`);
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

    async getOrganizationById(req): Promise<Organization | null> {
        const userId = req.user.id;
        console.log("Fetching organization for user ID:", userId);
        const res = await this.supabaseService
            .getClient()
            .from('user_organization')
            .select('*, organization(*)')
            .eq('user_id', userId)
            .single();

        // if we got a joined row, replace res.data with the nested organization so the function returns Organization
        if (res.data && (res.data as any).organization) {
            (res as any).data = (res.data as any).organization;
        } else if (!res.data) {
            (res as any).data = null;
        }
        if (res.error) {
            console.error("Failed to get organization:", res.error.message);
            throw new Error(`Failed to get organization: ${res.error.message}`);
        }
        return res.data;
    }
}