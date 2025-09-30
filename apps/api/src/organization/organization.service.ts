import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Organization } from './organization.interface';

@Injectable()
export class OrganizationService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async createOrganization(data: Organization): Promise<Organization> {
        const { data: organization, error } = await this.supabaseService
            .getClient()
            .from('organization')
            .insert(data)
            .select()
            .single();
        if (error) {
            throw new Error(`Failed to create organization: ${error.message}`);
        }
        return organization;
    }
}